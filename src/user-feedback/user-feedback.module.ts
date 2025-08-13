import { Module } from '@nestjs/common';
import { UserFeedbackService } from './user-feedback.service';
import { UserFeedbackController } from './user-feedback.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UserFeedbackController],
  providers: [UserFeedbackService],
  exports: [UserFeedbackService],
})
export class UserFeedbackModule {}