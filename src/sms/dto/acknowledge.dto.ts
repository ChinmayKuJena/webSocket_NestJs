import { IsString } from 'class-validator';

export class AcknowledgeDto {
  @IsString()
  to: string;

  @IsString()
  message: string;
}
