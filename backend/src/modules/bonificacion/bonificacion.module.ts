import { Module } from '@nestjs/common';
import { BonificacionService } from './bonificacion.service';
import { BonificacionController } from './bonificacion.controller';

@Module({
  controllers: [BonificacionController],
  providers: [BonificacionService],
})
export class BonificacionModule {}
