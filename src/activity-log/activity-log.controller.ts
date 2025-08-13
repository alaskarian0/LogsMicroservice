import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ActivityLogService } from './activity-log.service';
import { CreateActivityLogDto, UpdateActivityLogDto } from './dto';

@Controller('activity-logs')
export class ActivityLogController {
  constructor(private readonly activityLogService: ActivityLogService) {}

  @Post()
  create(@Body() createActivityLogDto: CreateActivityLogDto) {
    return this.activityLogService.create(createActivityLogDto);
  }

  @Get()
  findAll(
    @Query('skip') skip?: string,
    @Query('take') take?: string,
    @Query('userId') userId?: string,
    @Query('systemId') systemId?: string,
    @Query('action') action?: string,
  ) {
    const where: any = {};
    
    if (userId) where.userId = parseInt(userId);
    if (systemId) where.systemId = parseInt(systemId);
    if (action) where.action = { contains: action, mode: 'insensitive' };

    return this.activityLogService.findAll({
      skip: skip ? parseInt(skip) : undefined,
      take: take ? parseInt(take) : undefined,
      where,
      orderBy: { createdAt: 'desc' },
    });
  }

  @Get('count')
  count(
    @Query('userId') userId?: string,
    @Query('systemId') systemId?: string,
    @Query('action') action?: string,
  ) {
    const where: any = {};
    
    if (userId) where.userId = parseInt(userId);
    if (systemId) where.systemId = parseInt(systemId);
    if (action) where.action = { contains: action, mode: 'insensitive' };

    return this.activityLogService.count(where);
  }

  @Get('user/:userId')
  findByUserId(@Param('userId', ParseIntPipe) userId: number) {
    return this.activityLogService.findByUserId(userId);
  }

  @Get('system/:systemId')
  findBySystemId(@Param('systemId', ParseIntPipe) systemId: number) {
    return this.activityLogService.findBySystemId(systemId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.activityLogService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateActivityLogDto: UpdateActivityLogDto,
  ) {
    return this.activityLogService.update(id, updateActivityLogDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.activityLogService.remove(id);
  }
}