"use client";

import DataContainer from "@/components/components/tabla/CardTable";
import HeaderTablet from "@/components/components/tabla/HeaderTable";
import { Box, Pagination, Typography } from "@mui/material";
import TableFilter from "@/components/components/tabla/Filter";
import TableSearch from "@/components/components/tabla/SearchTablet";
import AgregarDatos from "@/components/components/tabla/AddTablet";
import FormUsuarios from "@/components/components/tabla/FormTablet";

export default function Usuarios() {
  const usuariosData = [
    {
      nombre: "Alejandro",
      apellido: "Gómez",
      rol: "Admin",
      movil: "123456",
      verified: true,
      status: "Activo",
    },
    {
      nombre: "Laura",
      apellido: "Pérez",
      rol: "User",
      movil: "654321",
      verified: false,
      status: "Inactivo",
    },
    {
      nombre: "Carlos",
      apellido: "Martínez",
      rol: "User",
      movil: "789012",
      verified: true,
      status: "Activo",
    },
  ];

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
          Usuarios
        </Typography>

        <AgregarDatos 
        titulo="Agregar Usuario"
        renderForm={() => <FormUsuarios/>}
         />
      </Box>

      <DataContainer
        action={
          <>
            <TableSearch data={usuariosData} />
            <TableFilter data={usuariosData} />
          </>
        }
        header={
          <HeaderTablet
            columns={[
              { key: "nombre", label: "Nombre", width: "2fr" },
              { key: "apellido", label: "Apellido", width: "2fr" },
              { key: "rol", label: "Rol" },
              { key: "movil", label: "Móvil" },
              { key: "verified", label: "Verificado" },
              { key: "status", label: "Estado" },
            ]}
          />
        }
        footer={<Pagination count={5} page={1} />}
      />
    </>
  );
}
