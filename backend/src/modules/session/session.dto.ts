import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsArray,
  ValidateNested,
  IsDateString,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { IProgram, ISession, SessionStatus } from './session.interface';
import { Type } from 'class-transformer';

export class ProgramDto implements IProgram {
  @IsString()
  @ApiProperty({
    type: String,
    description: `program's id`,
  })
  id!: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: `program's display title`,
  })
  display_title!: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: `program's thumbnail image url`,
  })
  thumbnail_img_url!: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: `program's short title`,
  })
  short_title!: string;
}

export class SessionDto implements ISession {
  @IsString()
  @ApiProperty({
    type: String,
    description: `session's id`,
  })
  id!: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: `session's name`,
  })
  name!: string;

  @IsString()
  @ApiProperty({
    type: String,
    format: 'enum',
    enum: SessionStatus,
    description: `session's status`,
  })
  status!: SessionStatus;

  @IsDateString()
  @ApiPropertyOptional({
    type: 'string',
    format: 'date-time',
    description: 'session start date',
  })
  start_date!: Date;

  @IsDateString()
  @ApiPropertyOptional({
    type: 'string',
    format: 'date-time',
    description: 'session end date',
  })
  end_date!: Date;

  @IsDateString()
  @ApiPropertyOptional({
    type: 'string',
    format: 'date-time',
    description: 'session created date',
  })
  created_at!: Date;

  @IsArray()
  @ValidateNested({ each: true, always: true })
  @Type(() => ProgramDto)
  @ApiProperty({
    type: ProgramDto,
    description: 'Programs',
    isArray: true,
  })
  program!: ProgramDto[];
}

export class SessionQueryInput {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    type: 'string',
    description: 'Short title of program',
  })
  short_title?: string;

  @IsOptional()
  @IsEnum(SessionStatus, {
    message: `status must be a valid enum value: ${Object.values(
      SessionStatus,
    ).join(', ')}`,
  })
  @ApiPropertyOptional({
    type: 'string',
    description: 'Session status',
    format: 'enum',
    enum: SessionStatus,
  })
  status?: SessionStatus;
}
