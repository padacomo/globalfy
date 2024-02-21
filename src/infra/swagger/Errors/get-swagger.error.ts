import { ApiProperty } from '@nestjs/swagger';

export class GetSwaggerError {
  @ApiProperty()
  message: string;
}
