/*
 * @Author: serendipity 2843306836@qq.com
 * @Date: 2025-11-23 21:13:49
 * @LastEditors: serendipity 2843306836@qq.com
 * @LastEditTime: 2025-11-24 20:03:17
 * @FilePath: \mini-ad-wall-api\src\ads\ads.controller.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AdsService } from './ads.service';
// import type { UpdateAdDto } from './ads.types';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateAdDto } from './dto/create-ad.dto';
import { UpdateAdDto } from './dto/update-ad.dto';
import { Ad } from './entities/ad.entity';
@Controller('ads')
@ApiTags('广告墙管理')
export class AdsController {
  constructor(private readonly adsService: AdsService) {}

  @Get()
  @ApiOperation({
    summary: '查询广告列表',
    description: '返回所有广告，按竞价（bid）降序排序',
  })
  @ApiResponse({ status: 200, description: '成功返回广告列表' })
  async list(): Promise<Ad[]> {
    return this.adsService.list();
  }

  @Post('create')
  @ApiOperation({ summary: '创建广告', description: '创建一个新的广告' })
  async create(@Body() dto: CreateAdDto): Promise<Ad> {
    console.log(dto);
    return this.adsService.create(dto);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateAdDto): Promise<Ad> {
    return this.adsService.update(id, dto);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: '删除广告', description: '删除一个广告' })
  async remove(@Param('id') id: string): Promise<{ success: true }> {
    await this.adsService.remove(id);
    return { success: true };
  }

  @Post('click/:id')
  @ApiOperation({summary:'点击广告'})
  async click(@Param('id') id: string): Promise<Ad> {
    return this.adsService.click(id);
  }
}
