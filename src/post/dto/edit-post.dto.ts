import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class EditPostDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  teaser: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  published: boolean;
}
