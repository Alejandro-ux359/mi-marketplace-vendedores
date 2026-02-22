import React, { useState } from "react";
import { Box, TextField, MenuItem } from "@mui/material";

export interface Product {
  idProducto: number | null;
  producto: string;
  categoria: string;
  precioUnitario: number | null;
  stockActual: number | null;
  stockMinimo: number | null;
  sku: string;
  fechaIngreso: string;
  estado: string;
}

const categorias = [
  "Electrónica",
  "Moda",
  "Hogar",
  "Deportes",
  "Salud",
  "Belleza",
  "Automotriz",
  "Industrial",
  "Digital",
];

const estados = ["Activo", "Inactivo"];

const FormInventario: React.FC = () => {
  const [product, setProduct] = useState<Product>({
    idProducto: null,
    producto: "",
    categoria: "",
    precioUnitario: null,
    stockActual: null,
    stockMinimo: null,
    sku: "",
    fechaIngreso: "",
    estado: "",
  });

  const handleChange = (field: keyof Product, value: string | number) => {
    setProduct((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Box
      component="form"
      sx={{ display: "flex", flexDirection: "column", gap: 2, width: 400 }}
    >
      <TextField
        label="ID Producto"
        type="number"
        value={product.idProducto ?? ""}
        onChange={(e) =>
          setProduct({
            ...product,
            idProducto:
              e.target.value === "" ? null : Number(e.target.value),
          })
        }
      />

      <TextField
        label="Producto"
        value={product.producto}
        onChange={(e) => handleChange("producto", e.target.value)}
      />

      <TextField
        select
        label="Categoría"
        value={product.categoria}
        onChange={(e) => handleChange("categoria", e.target.value)}
      >
        {categorias.map((cat) => (
          <MenuItem key={cat} value={cat}>
            {cat}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        label="Precio Unitario"
        type="number"
        value={product.precioUnitario ?? ""}
        onChange={(e) =>
          setProduct({
            ...product,
            precioUnitario:
              e.target.value === "" ? null : Number(e.target.value),
          })
        }
      />

      <TextField
        label="Stock Actual"
        type="number"
        value={product.stockActual ?? ""}
        onChange={(e) =>
          setProduct({
            ...product,
            stockActual:
              e.target.value === "" ? null : Number(e.target.value),
          })
        }
      />

      <TextField
        label="Stock Mínimo"
        type="number"
        value={product.stockMinimo ?? ""}
        onChange={(e) =>
          setProduct({
            ...product,
            stockMinimo:
              e.target.value === "" ? null : Number(e.target.value),
          })
        }
      />

      <TextField
        label="SKU"
        value={product.sku}
        onChange={(e) => handleChange("sku", e.target.value)}
      />

      <TextField
        label="Fecha de Ingreso"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={product.fechaIngreso}
        onChange={(e) => handleChange("fechaIngreso", e.target.value)}
      />

      <TextField
        select
        label="Estado"
        value={product.estado}
        onChange={(e) => handleChange("estado", e.target.value)}
      >
        {estados.map((st) => (
          <MenuItem key={st} value={st}>
            {st}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
};

export default FormInventario;
