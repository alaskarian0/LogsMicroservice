import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from '../prisma/prisma.module';
import { RabbitMQModule } from './rabbitmq/rabbitmq.module';
import { ActivityLogModule } from './activity-log/activity-log.module';
import { UserFeedbackModule } from './user-feedback/user-feedback.module';

@Module({
  imports: [
    PrismaModule,
    RabbitMQModule,
    ActivityLogModule,
    UserFeedbackModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
