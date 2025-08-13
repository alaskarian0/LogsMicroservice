import { Injectable, Logger } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory } from '@nestjs/microservices';
import { getRabbitMQConfig } from './rabbitmq.config';

@Injectable()
export class RabbitMQService {
  private readonly logger = new Logger(RabbitMQService.name);
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create(getRabbitMQConfig());
  }

  async onModuleInit() {
    try {
      await this.client.connect();
      this.logger.log('Connected to RabbitMQ');
    } catch (error) {
      this.logger.error('Failed to connect to RabbitMQ:', error);
    }
  }

  async onModuleDestroy() {
    try {
      await this.client.close();
      this.logger.log('Disconnected from RabbitMQ');
    } catch (error) {
      this.logger.error('Error while disconnecting from RabbitMQ:', error);
    }
  }

  async publishMessage(pattern: string, data: any) {
    try {
      const result = await this.client.emit(pattern, data).toPromise();
      this.logger.log(`Message published with pattern: ${pattern}`);
      return result;
    } catch (error) {
      this.logger.error(`Failed to publish message with pattern ${pattern}:`, error);
      throw error;
    }
  }

  async sendMessage(pattern: string, data: any) {
    try {
      const result = await this.client.send(pattern, data).toPromise();
      this.logger.log(`Message sent with pattern: ${pattern}`);
      return result;
    } catch (error) {
      this.logger.error(`Failed to send message with pattern ${pattern}:`, error);
      throw error;
    }
  }

  async publishAuthEvent(eventType: string, data: any) {
    const pattern = `auth.${eventType}`;
    return this.publishMessage(pattern, {
      timestamp: new Date().toISOString(),
      eventType,
      data,
    });
  }

  async publishUserRegistered(userData: any) {
    return this.publishAuthEvent('user.registered', userData);
  }

  async publishUserLogin(userData: any) {
    return this.publishAuthEvent('user.login', userData);
  }

  async publishUserLogout(userData: any) {
    return this.publishAuthEvent('user.logout', userData);
  }

  async publishPasswordChanged(userData: any) {
    return this.publishAuthEvent('user.password.changed', userData);
  }

  async publishRoleAssigned(userData: any) {
    return this.publishAuthEvent('user.role.assigned', userData);
  }

  async publishSessionRevoked(userData: any) {
    return this.publishAuthEvent('user.session.revoked', userData);
  }
}