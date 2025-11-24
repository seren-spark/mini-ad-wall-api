/*
 * @Author: serendipity 2843306836@qq.com
 * @Date: 2025-11-24 15:07:48
 * @LastEditors: serendipity 2843306836@qq.com
 * @LastEditTime: 2025-11-24 20:21:13
 * @FilePath: \mini-ad-wall-api\src\ads\dto\create-ad.dto.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, Min, IsUrl, IsOptional } from 'class-validator';

export class CreateAdDto {
  @ApiProperty({ description: '广告标题' })
  @IsString()
  @IsNotEmpty({ message: 'title is required' })
  title: string;

  @ApiProperty({ description: '发布人' })
  @IsString()
  @IsNotEmpty({ message: 'author is required' })
  author: string;
  @ApiProperty({
    description: '广告内容',
  })
  @IsNotEmpty({ message: 'content is required' })
  content: string;
  // 添加 imageUrl 字段（可选）
  @ApiPropertyOptional({ description: '广告图片URL' })
  @IsString()
  @IsOptional()
  @IsUrl({}, { message: 'imageUrl must be a valid URL' })
  imageUrl?: string;
  @ApiProperty({
    description: '落地页URL',
    example: 'https://example.com',
  })
  @IsString()
  @IsNotEmpty({ message: 'landingUrl is required' })
  landingUrl: string;

  @ApiProperty({
    description: '竞价出价（用于排序）',
    example: 100,
    minimum: 0,
  })
  @IsNumber({}, { message: 'bid must be a number' })
  @Min(0, { message: 'bid must be >= 0' })
  bid: number;
}
