import { Transport, RmqOptions } from '@nestjs/microservices';

export const getRabbitMQConfig = (): RmqOptions => ({
  transport: Transport.RMQ,
  options: {
    urls: [process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672'],
    queue: process.env.RABBITMQ_QUEUE_NAME || 'auth_queue',
    queueOptions: {
      durable: true,
    },
    socketOptions: {
      heartbeatIntervalInSeconds: 60,
      reconnectTimeInSeconds: 5,
    },
  },
});