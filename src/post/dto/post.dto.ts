import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  teaser?: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  published: boolean;
  authorId: string;
}
