import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super();
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  async clearDatabase() {
    if (process.env.NODE_ENV === 'production') return;

    const models = Object.keys(this).filter((key) => {
      return key[0] !== '_' && key[0] !== '$' && this[key]?.deleteMany;
    });

    return Promise.all(models.map((modelKey) => (this as any)[modelKey].deleteMany()));
  }
}