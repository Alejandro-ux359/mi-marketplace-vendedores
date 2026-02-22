"use client";

import { Box, Divider, Pagination, Typography } from "@mui/material";
import HeaderTable from "@/components/components/tabla/HeaderTable";
import AgregarDatos from "@/components/components/buttons/Add";

import DataContainer from "@/components/components/tabla/CardTable";
import TableSearch from "@/components/components/buttons/SearchTablet";
import FormInventario from "./FormInventario";

export default function Inventario() {
  return (
    <>
      <Box
        sx={{
          mb: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="body1"
          color="black"
          sx={{ fontWeight: 700, fontSize: 20 }}
        >
          Inventario
        </Typography>

        <AgregarDatos
          titulo="Constructor de columnas"
          renderForm={() => <FormInventario />}
        />
      </Box>

      <DataContainer
        header={
          <>
            <TableSearch/>

            <Divider sx={{ mb: 2 }} />
            <HeaderTable
              columns={[
                { key: "idProducto", label: "ID Producto" },
                { key: "producto", label: "Producto" },
                { key: "categoria", label: "Categoría" },
                { key: "precioUnitario", label: "Precio" },
                { key: "stockActual", label: "Stock actual" },
                { key: "stockMinimo", label: "Stock min." },
                { key: "sku", label: "SKU" },
                { key: "fechaIngreso", label: "Fecha " },
                { key: "estado", label: "Estado" },
              ]}
            />
          </>
        }
        content={<></>}
        footer={<Pagination count={5} page={1} />}
      />
    </>
  );
}
