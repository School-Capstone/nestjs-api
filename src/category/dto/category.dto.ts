import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CategoryParamsDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}

export class CategoryCreationDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
