import { Body, Controller, Logger, Post } from '@nestjs/common';
import { SmsGateway } from './sms.gateway';
import { SendMessageDto } from './dto/send-message.dto';
import { AcknowledgeDto } from './dto/acknowledge.dto';

@Controller('sms')
export class SmsController {
    private readonly logger = new Logger(SmsController.name);  // Instantiate the logger

  constructor(
    private readonly smsGateway: SmsGateway

) {}

  @Post('send')
  async sendMessage(@Body() sendMessageDto: SendMessageDto) {
    console.log('Received message:', sendMessageDto);
    // log
    // this.logger.log('Received message:', sendMessageDto);

    
    this.smsGateway.broadcastEvent('sms:send', sendMessageDto);

    return { status: 'Message sent', data: sendMessageDto };
  }
// TODO just demo
  @Post('acknowledge')
  async acknowledgeMessage(@Body() acknowledgeDto: AcknowledgeDto) {
    console.log('Acknowledgment received:', acknowledgeDto);

    this.smsGateway.broadcastEvent('sms:acknowledge', acknowledgeDto);

    return { status: 'Acknowledgment received', data: acknowledgeDto };
  }
}
