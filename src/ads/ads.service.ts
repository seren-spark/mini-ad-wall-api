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

  async list(): Promise<Ad[]> {
    return this.adRepository.find({
      where: { status: 1 }, // 只查询启用的广告
      order: {
        bid: 'DESC', // 竞价降序
        updatedAt: 'DESC', // 更新时间降序
      },
    });
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
}
