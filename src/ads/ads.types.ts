import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, Min, IsUrl } from 'class-validator';
export type AdId = string;

export interface Ad {
  id: AdId;
  title: string;
  author?: string; // 添加发布人
  content?: string; // 添加广告内容
  imageUrl?: string;
  landingUrl: string;
  bid: number;
  clicks: number;
  createdAt: number;
  updatedAt: number;
}

export interface CreateAdDto {
  title: string;
  imageUrl: string;
  landingUrl: string;
  bid: number;
}

export interface UpdateAdDto {
  title?: string;
  imageUrl?: string;
  landingUrl?: string;
  bid?: number;
}
