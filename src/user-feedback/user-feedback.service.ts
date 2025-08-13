import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserFeedbackDto, UpdateUserFeedbackDto } from './dto';
import { UserFeedback, Prisma } from '@prisma/client';

@Injectable()
export class UserFeedbackService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserFeedbackDto: CreateUserFeedbackDto): Promise<UserFeedback> {
    const activityLogExists = await this.prisma.activityLog.findUnique({
      where: { id: createUserFeedbackDto.activityLogId },
    });

    if (!activityLogExists) {
      throw new BadRequestException(
        `ActivityLog with ID ${createUserFeedbackDto.activityLogId} does not exist`,
      );
    }

    return this.prisma.userFeedback.create({
      data: createUserFeedbackDto,
      include: {
        activityLog: true,
      },
    });
  }

  async findAll(params?: {
    skip?: number;
    take?: number;
    where?: Prisma.UserFeedbackWhereInput;
    orderBy?: Prisma.UserFeedbackOrderByWithRelationInput;
  }): Promise<UserFeedback[]> {
    const { skip, take, where, orderBy } = params || {};
    
    return this.prisma.userFeedback.findMany({
      skip,
      take,
      where,
      orderBy,
      include: {
        activityLog: true,
      },
    });
  }

  async findOne(id: number): Promise<UserFeedback> {
    const userFeedback = await this.prisma.userFeedback.findUnique({
      where: { id },
      include: {
        activityLog: true,
      },
    });

    if (!userFeedback) {
      throw new NotFoundException(`UserFeedback with ID ${id} not found`);
    }

    return userFeedback;
  }

  async findByUserId(userId: number): Promise<UserFeedback[]> {
    return this.prisma.userFeedback.findMany({
      where: { userId },
      include: {
        activityLog: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findBySystemId(systemId: number): Promise<UserFeedback[]> {
    return this.prisma.userFeedback.findMany({
      where: { systemId },
      include: {
        activityLog: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findByActivityLogId(activityLogId: number): Promise<UserFeedback[]> {
    return this.prisma.userFeedback.findMany({
      where: { activityLogId },
      include: {
        activityLog: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async update(id: number, updateUserFeedbackDto: UpdateUserFeedbackDto): Promise<UserFeedback> {
    await this.findOne(id);

    if (updateUserFeedbackDto.activityLogId) {
      const activityLogExists = await this.prisma.activityLog.findUnique({
        where: { id: updateUserFeedbackDto.activityLogId },
      });

      if (!activityLogExists) {
        throw new BadRequestException(
          `ActivityLog with ID ${updateUserFeedbackDto.activityLogId} does not exist`,
        );
      }
    }

    return this.prisma.userFeedback.update({
      where: { id },
      data: updateUserFeedbackDto,
      include: {
        activityLog: true,
      },
    });
  }

  async remove(id: number): Promise<UserFeedback> {
    await this.findOne(id);

    return this.prisma.userFeedback.delete({
      where: { id },
    });
  }

  async count(where?: Prisma.UserFeedbackWhereInput): Promise<number> {
    return this.prisma.userFeedback.count({ where });
  }
}