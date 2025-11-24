/*
 * @Author: serendipity 2843306836@qq.com
 * @Date: 2025-11-24 15:08:28
 * @LastEditors: serendipity 2843306836@qq.com
 * @LastEditTime: 2025-11-24 15:08:34
 * @FilePath: \mini-ad-wall-api\src\ads\dto\update-ad.dto.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, Min, IsUrl } from 'class-validator';

// src/ads/dto/update-ad.dto.ts
export class UpdateAdDto {
  @ApiPropertyOptional({ description: '广告标题' })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({ description: '发布人' })
  @IsString()
  @IsOptional()
  author?: string;

  @ApiPropertyOptional({ description: '广告内容' })
  @IsString()
  @IsOptional()
  content?: string;

  @ApiPropertyOptional({ description: '落地页URL' })
  @IsString()
  @IsOptional()
  landingUrl?: string;

  @ApiPropertyOptional({ description: '竞价出价', minimum: 0 })
  @IsNumber({}, { message: 'bid must be a number' })
  @IsOptional()
  @Min(0, { message: 'bid must be >= 0' })
  bid?: number;
}
