import { Test, TestingModule } from '@nestjs/testing';
import { SmsGateway } from './sms.gateway';

describe('SmsGateway', () => {
  let gateway: SmsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SmsGateway],
    }).compile();

    gateway = module.get<SmsGateway>(SmsGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
