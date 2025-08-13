import { IsInt, IsString, IsOptional, IsJSON, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateActivityLogDto {
  @IsInt()
  userId: number;

  @IsInt()
  systemId: number;

  @IsOptional()
  @IsString()
  ipAddress?: string;

  @IsString()
  @MaxLength(255)
  action: string;

  @IsOptional()
  @IsJSON()
  @Transform(({ value }) => typeof value === 'string' ? JSON.parse(value) : value)
  details?: any;
}