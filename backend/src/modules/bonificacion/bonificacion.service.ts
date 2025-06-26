import { Injectable } from '@nestjs/common';
import { ProductoDto } from './dto/simular-bonificacion.dto';
import { BonificacionResponseDto } from './dto/bonificacion-response.dto';

@Injectable()
export class BonificacionService {
  simularBonificacion(productos: ProductoDto[]): BonificacionResponseDto[] {
    const productosJugos = productos.filter(producto =>
      producto.grupo.toUpperCase() === 'JUGOS'
    );

    if (productosJugos.length === 0) {
      return [];
    }

    const totalUnidadesJugos = productosJugos.reduce(
      (total, producto) => total + producto.cantidad,
      0
    );

    const bonificacionTotal = Math.floor(totalUnidadesJugos / 10) * 2;

    if (bonificacionTotal === 0) {
      return productosJugos.map(producto => ({
        codigo: producto.codigo,
        bonificacion: 0
      }));
    }

    const bonificaciones: BonificacionResponseDto[] = [];
    let bonificacionRestante = bonificacionTotal;

    for (let i = 0; i < productosJugos.length; i++) {
      const producto = productosJugos[i];

      const proporcion = producto.cantidad / totalUnidadesJugos;

      let bonificacionProducto: number;

      if (i === productosJugos.length - 1) {
        bonificacionProducto = bonificacionRestante;
      } else {
        bonificacionProducto = Math.round(bonificacionTotal * proporcion);
        bonificacionRestante -= bonificacionProducto;
      }

      bonificaciones.push({
        codigo: producto.codigo,
        bonificacion: bonificacionProducto
      });
    }

    return bonificaciones;
  }
}