import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class Filters {
  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'Globalfy event',
    description: 'Event`s title',
  })
  title: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: '2024-02-20',
    description: 'Date of the event in ISO format',
  })
  date: string;
}
