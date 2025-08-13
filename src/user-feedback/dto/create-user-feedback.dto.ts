import { IsInt, IsString, IsOptional, MaxLength } from 'class-validator';

export class CreateUserFeedbackDto {
  @IsInt()
  userId: number;

  @IsInt()
  systemId: number;

  @IsInt()
  activityLogId: number;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  comment?: string;
}