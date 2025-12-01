import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ad } from './entities/ad.entity';
import { CreateAdDto } from './dto/create-ad.dto';
import { UpdateAdDto } from './dto/update-ad.dto';
import {
  FormConfigResponse,
  FormComponentType,
  FormFieldConfig,
} from './dto/form-config.dto';

@Injectable()
export class AdsService {
  // 使用 NestJS 内置 Logger，会自动使用 Winston
  private readonly logger = new Logger(AdsService.name);
  constructor(
    @InjectRepository(Ad)
    private readonly adRepository: Repository<Ad>,
  ) {}
  private genId(): string {
    return (
      Date.now().toString(36) + Math.random().toString(36).slice(2, 10)
    ).toLowerCase();
  }

  // async list(): Promise<Ad[]> {
  //   return this.adRepository.find({
  //     where: { status: 1 }, // 只查询启用的广告
  //     order: {
  //       bid: 'DESC', // 竞价降序
  //       updatedAt: 'DESC', // 更新时间降序
  //     },
  //   });
  // }
  async list(): Promise<Ad[]> {
    return this.adRepository
      .createQueryBuilder('a')
      .where('a.status = :status', { status: 1 }) // 只查询启用的广告
      .orderBy('a.bid + (a.bid * a.clicks * 0.42)', 'DESC') // 竞价排序逻辑
      .addOrderBy('a.updatedAt', 'DESC') // 更新时间降序作为次要排序
      .getMany();
  }
  async create(dto: CreateAdDto): Promise<Ad> {
    this.logger.log(`Creating ad: ${dto.title}`);
    // const ad = this.adRepository.create({
    //   id: this.genId(),
    //   title: dto.title.trim(),
    //   author: dto.author.trim(),
    //   content: dto.content.trim(),
    //   landingUrl: dto.landingUrl.trim(),
    //   bid: Number(dto.bid),
    //   clicks: 0,
    //   status: 1,
    // });

    try {
      const ad = this.adRepository.create({
        id: this.genId(),
        title: dto.title.trim(),
        author: dto.author.trim(),
        content: dto.content.trim(),
        landingUrl: dto.landingUrl.trim(),
        bid: Number(dto.bid),
        clicks: 0,
        status: 1,
      });

      const result = await this.adRepository.save(ad);
      this.logger.log(`Ad created successfully: ${result.id}`);
      return result;
    } catch (error) {
      this.logger.error(`Failed to create ad: ${error.message}`, error.stack);
      throw error;
    }
  }
  async update(id: string, dto: UpdateAdDto): Promise<Ad> {
    if (!id) throw new BadRequestException('id is required');

    const ad = await this.adRepository.findOne({
      where: { id, status: 1 },
    });

    if (!ad) throw new NotFoundException('Ad not found');

    // 更新字段
    if (dto.title !== undefined) ad.title = dto.title.trim();
    if (dto.author !== undefined) ad.author = dto.author.trim();
    if (dto.content !== undefined) ad.content = dto.content.trim();
    if (dto.landingUrl !== undefined) ad.landingUrl = dto.landingUrl.trim();
    if (dto.bid !== undefined) ad.bid = Number(dto.bid);

    return this.adRepository.save(ad);
  }
  async remove(id: string): Promise<void> {
    if (!id) throw new BadRequestException('id is required');

    const result = await this.adRepository.update(
      { id, status: 1 },
      { status: 0 }, // 软删除：设置状态为禁用
    );

    if (result.affected === 0) {
      throw new NotFoundException('Ad not found');
    }
  }
  async click(id: string): Promise<Ad> {
    if (!id) throw new BadRequestException('id is required');

    const ad = await this.adRepository.findOne({
      where: { id, status: 1 },
    });

    if (!ad) throw new NotFoundException('Ad not found');

    // 原子操作：点击次数+1
    await this.adRepository.increment({ id }, 'clicks', 1);

    // 返回更新后的数据
    const updatedAd = await this.adRepository.findOne({ where: { id } });
    if (!updatedAd) throw new NotFoundException('Ad not found');
    return updatedAd;
  }
  getFormConfig(): FormFieldConfig[] {
    return [
      {
        field: 'title',
        name: '广告标题',
        component: FormComponentType.Input,
        placeholder: '请输入广告标题',
        validator: {
          required: true,
          maxCount: 100,
          message: '标题不能超过100个字符',
        },
        tooltip: '广告的主标题，将显示在广告墙上',
      },
      {
        field: 'author',
        name: '发布人',
        component: FormComponentType.Input,
        placeholder: '请输入发布人姓名',
        validator: {
          required: true,
          maxCount: 50,
          message: '发布人名称不能超过50个字符',
        },
      },
      {
        field: 'content',
        name: '广告内容',
        component: FormComponentType.TextArea,
        placeholder: '请输入广告详细内容',
        validator: {
          required: true,
          maxCount: 500,
          message: '内容不能超过500个字符',
        },
        componentProps: {
          rows: 4,
          showCount: true,
        },
      },
      // {
      //   field: 'imageUrl',
      //   name: '广告图片',
      //   component: FormComponentType.Input,
      //   placeholder: '请输入图片URL',
      //   validator: {
      //     url: true,
      //     message: '请输入有效的图片URL',
      //   },
      //   tooltip: '可选，广告展示图片',
      // },
      {
        field: 'landingUrl',
        name: '落地页链接',
        component: FormComponentType.Input,
        placeholder: '请输入落地页URL',
        validator: {
          required: true,
          url: true,
          message: '请输入有效的URL地址',
        },
        tooltip: '用户点击广告后跳转的目标页面',
      },
      {
        field: 'bid',
        name: '出价',
        component: FormComponentType.InputNumber,
        placeholder: '请输入出价金额',
        validator: {
          required: true,
          number: true,
          min: 0,
          message: '出价必须大于等于0',
        },
        defaultValue: 0,
        componentProps: {
          min: 0,
          precision: 2,
          step: 0.01,
          addonAfter: '元',
        },
        tooltip: '出价越高，广告排名越靠前',
      },
    ];
  }
}
