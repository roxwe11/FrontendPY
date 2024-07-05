import { Categorias } from './categorias.models';
import { Tipos } from './tipos.models';
import { Ubicaciones } from './ubicaciones.models';

export class Productos {
  idProducto: number;
  nombreProducto: string = '';
  precioCompra: number;
  precioVenta: number;
  stock: number;
  fechaVencimiento: Date;
  categoria: Categorias;
  tipo: Tipos;
  ubicacion: Ubicaciones ;
}
