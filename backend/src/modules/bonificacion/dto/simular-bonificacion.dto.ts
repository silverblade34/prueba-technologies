import { IsString, IsNumber, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class ProductoDto {
  @IsString()
  codigo: string;

  @IsString()
  grupo: string;

  @IsNumber()
  cantidad: number;
}

export class SimularBonificacionDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductoDto)
  productos: ProductoDto[];
}