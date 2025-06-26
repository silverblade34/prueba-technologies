import { Controller, Post, Body, ValidationPipe, HttpCode } from '@nestjs/common';
import { BonificacionService } from './bonificacion.service';
import { ProductoDto } from './dto/simular-bonificacion.dto';
import { BonificacionResponseDto } from './dto/bonificacion-response.dto';

@Controller('bonificacion')
export class BonificacionController {
  constructor(private readonly bonificacionService: BonificacionService) { }

  @Post('simular')
  @HttpCode(200)
  simularBonificacion(
    @Body(ValidationPipe) productos: ProductoDto[]
  ): BonificacionResponseDto[] {
    return this.bonificacionService.simularBonificacion(productos);
  }
}
