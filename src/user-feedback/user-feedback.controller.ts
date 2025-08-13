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
import { UserFeedbackService } from './user-feedback.service';
import { CreateUserFeedbackDto, UpdateUserFeedbackDto } from './dto';

@Controller('user-feedback')
export class UserFeedbackController {
  constructor(private readonly userFeedbackService: UserFeedbackService) {}

  @Post()
  create(@Body() createUserFeedbackDto: CreateUserFeedbackDto) {
    return this.userFeedbackService.create(createUserFeedbackDto);
  }

  @Get()
  findAll(
    @Query('skip') skip?: string,
    @Query('take') take?: string,
    @Query('userId') userId?: string,
    @Query('systemId') systemId?: string,
    @Query('activityLogId') activityLogId?: string,
  ) {
    const where: any = {};
    
    if (userId) where.userId = parseInt(userId);
    if (systemId) where.systemId = parseInt(systemId);
    if (activityLogId) where.activityLogId = parseInt(activityLogId);

    return this.userFeedbackService.findAll({
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
    @Query('activityLogId') activityLogId?: string,
  ) {
    const where: any = {};
    
    if (userId) where.userId = parseInt(userId);
    if (systemId) where.systemId = parseInt(systemId);
    if (activityLogId) where.activityLogId = parseInt(activityLogId);

    return this.userFeedbackService.count(where);
  }

  @Get('user/:userId')
  findByUserId(@Param('userId', ParseIntPipe) userId: number) {
    return this.userFeedbackService.findByUserId(userId);
  }

  @Get('system/:systemId')
  findBySystemId(@Param('systemId', ParseIntPipe) systemId: number) {
    return this.userFeedbackService.findBySystemId(systemId);
  }

  @Get('activity-log/:activityLogId')
  findByActivityLogId(@Param('activityLogId', ParseIntPipe) activityLogId: number) {
    return this.userFeedbackService.findByActivityLogId(activityLogId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userFeedbackService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserFeedbackDto: UpdateUserFeedbackDto,
  ) {
    return this.userFeedbackService.update(id, updateUserFeedbackDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userFeedbackService.remove(id);
  }
}