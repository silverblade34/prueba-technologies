import { Module } from '@nestjs/common';
import { BonificacionModule } from './modules/bonificacion/bonificacion.module';

@Module({
  imports: [BonificacionModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
