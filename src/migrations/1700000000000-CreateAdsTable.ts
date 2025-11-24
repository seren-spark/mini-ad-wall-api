import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class CreateAdsTable1700000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'ads',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            length: '50',
            isPrimary: true,
            comment: '广告唯一ID',
          },
          {
            name: 'title',
            type: 'varchar',
            length: '255',
            comment: '广告标题',
          },
          {
            name: 'author',
            type: 'varchar',
            length: '255',
            comment: '发布人',
          },
          {
            name: 'content',
            type: 'text',
            comment: '广告内容',
          },
          {
            name: 'image_url',
            type: 'varchar',
            length: '500',
            isNullable: true,
            comment: '广告图片URL',
          },
          {
            name: 'landing_url',
            type: 'varchar',
            length: '500',
            comment: '落地页URL',
          },
          {
            name: 'bid',
            type: 'decimal',
            precision: 10,
            scale: 2,
            default: 0,
            comment: '竞价出价（元）',
          },
          {
            name: 'clicks',
            type: 'int',
            default: 0,
            comment: '点击次数',
          },
          {
            name: 'status',
            type: 'tinyint',
            default: 1,
            comment: '状态：1-启用，0-禁用',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            comment: '创建时间',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
            comment: '更新时间',
          },
        ],
      }),
      true,
    );

    // 创建索引
    await queryRunner.createIndex(
      'ads',
      new TableIndex({
        name: 'idx_bid_updated',
        columnNames: ['bid', 'updated_at'],
      }),
    );

    await queryRunner.createIndex(
      'ads',
      new TableIndex({
        name: 'idx_status',
        columnNames: ['status'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('ads');
  }
}