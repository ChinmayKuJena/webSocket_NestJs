import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SmsController } from './sms/sms.controller';
import { SmsGateway } from './sms/sms.gateway';
import { SmsService } from './sms/sms.service';
import { SmsModule } from './sms/sms.module';

@Module({
  imports: [SmsModule],
  controllers: [AppController, SmsController],
  providers: [AppService, SmsGateway, SmsService],
})
export class AppModule {}
