import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('ads')
// @Index(['bid', 'updatedAt'], { name: 'idx_bid_updated' })
export class Ad {
  @PrimaryColumn({ type: 'varchar', length: 50, comment: '广告唯一ID' })
  @ApiProperty({ description: '广告唯一ID', example: 'abc123xyz' })
  id: string;

  @Column({ type: 'varchar', length: 255, comment: '广告标题' })
  @ApiProperty({ description: '广告标题', example: '超值优惠广告' })
  title: string;
  @Column({ type: 'varchar', length: 255, comment: '发布人' })
  @ApiProperty({ description: '发布人', example: '张三' })
  author: string;

  @Column({ type: 'text', comment: '广告内容' })
  @ApiProperty({ description: '广告内容', example: '这是一个很棒的广告内容' })
  content: string;

  @Column({
    name: 'image_url',
    type: 'varchar',
    length: 500,
    comment: '广告图片URL',
    nullable: true,
  })
  @ApiProperty({
    description: '广告图片URL',
    example: 'https://picsum.photos/400/300',
  })
  imageUrl: string;

  @Column({
    name: 'landing_url',
    type: 'varchar',
    length: 500,
    comment: '落地页URL',
  })
  @ApiProperty({ description: '落地页URL', example: 'https://example.com' })
  landingUrl: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
    comment: '竞价出价（元）',
  })
  @ApiProperty({ description: '竞价出价', example: 100.0 })
  bid: number;

  @Column({ type: 'int', default: 0, comment: '点击次数' })
  @ApiProperty({ description: '点击次数', example: 5 })
  clicks: number;

  @Column({ type: 'tinyint', default: 1, comment: '状态：1-启用，0-禁用' })
  @ApiProperty({ description: '状态', example: 1 })
  status: number;

  @CreateDateColumn({ name: 'created_at', comment: '创建时间' })
  @ApiProperty({ description: '创建时间', example: '2023-11-24T10:00:00Z' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', comment: '更新时间' })
  @ApiProperty({ description: '更新时间', example: '2023-11-24T10:00:00Z' })
  updatedAt: Date;
}
