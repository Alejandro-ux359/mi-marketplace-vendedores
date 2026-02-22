export interface Product {
  idProducto: number;
  producto: string;
  categoria: string;
  precioUnitario: number;
  stockActual: number;
  stockMinimo: number;
  sku: string;
  fechaIngreso: string;
  estado: string;
}

export interface HeaderColumn {
  key: string;
  label: string;
  align?: "left" | "center" | "right";
  width?: number | string;
}

export interface HeaderTableProps {
  columns: HeaderColumn[];
  selectable?: boolean;
}

export interface UsuarioFormData {
  nombre: string;
  apellido: string;
  rol: string;
  movil: number;
  verificado: boolean;
  estado: "Activo" | "Pendiente" | "Inactivo";
}

