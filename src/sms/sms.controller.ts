import { Body, Controller, Logger, Post } from '@nestjs/common';
import { SmsGateway } from './sms.gateway';
import { SendMessageDto } from './dto/send-message.dto';

@Controller('sms')
export class SmsController {
  private readonly logger = new Logger(SmsController.name);

  constructor(private readonly smsGateway: SmsGateway) {}

  @Post('send')
  async sendMessage(@Body() sendMessageDto: SendMessageDto) {
    const { key, message, to } = sendMessageDto;

    // Validate key
    if (!key) {
      return { status: 'Error', message: 'Key is required' };
    }

    // Log the incoming message
    this.logger.log(`Received message for key ${key}: ${message}`);

    // Broadcast the message to clients in the room corresponding to the key
    this.smsGateway.sendMessageToKey(key, { message, to });

    return { status: 'Message sent', data: sendMessageDto };
  }
}
