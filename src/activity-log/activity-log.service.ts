import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateActivityLogDto, UpdateActivityLogDto } from './dto';
import { ActivityLog, Prisma } from '@prisma/client';

@Injectable()
export class ActivityLogService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createActivityLogDto: CreateActivityLogDto): Promise<ActivityLog> {
    return this.prisma.activityLog.create({
      data: createActivityLogDto,
      include: {
        feedbacks: true,
      },
    });
  }

  async findAll(params?: {
    skip?: number;
    take?: number;
    where?: Prisma.ActivityLogWhereInput;
    orderBy?: Prisma.ActivityLogOrderByWithRelationInput;
  }): Promise<ActivityLog[]> {
    const { skip, take, where, orderBy } = params || {};
    
    return this.prisma.activityLog.findMany({
      skip,
      take,
      where,
      orderBy,
      include: {
        feedbacks: true,
      },
    });
  }

  async findOne(id: number): Promise<ActivityLog> {
    const activityLog = await this.prisma.activityLog.findUnique({
      where: { id },
      include: {
        feedbacks: true,
      },
    });

    if (!activityLog) {
      throw new NotFoundException(`ActivityLog with ID ${id} not found`);
    }

    return activityLog;
  }

  async findByUserId(userId: number): Promise<ActivityLog[]> {
    return this.prisma.activityLog.findMany({
      where: { userId },
      include: {
        feedbacks: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findBySystemId(systemId: number): Promise<ActivityLog[]> {
    return this.prisma.activityLog.findMany({
      where: { systemId },
      include: {
        feedbacks: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async update(id: number, updateActivityLogDto: UpdateActivityLogDto): Promise<ActivityLog> {
    await this.findOne(id);

    return this.prisma.activityLog.update({
      where: { id },
      data: updateActivityLogDto,
      include: {
        feedbacks: true,
      },
    });
  }

  async remove(id: number): Promise<ActivityLog> {
    await this.findOne(id);

    return this.prisma.activityLog.delete({
      where: { id },
    });
  }

  async count(where?: Prisma.ActivityLogWhereInput): Promise<number> {
    return this.prisma.activityLog.count({ where });
  }
}