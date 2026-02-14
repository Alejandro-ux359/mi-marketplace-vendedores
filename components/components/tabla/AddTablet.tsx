"use client";

import { useState, ReactNode } from "react";
import {
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

interface AgregarDatosProps {
  titulo?: string; // Título del modal
  renderForm?: () => ReactNode; // Función que retorna el formulario
  onSave?: () => void; // Función opcional para guardar los datos
}

export default function AgregarDatos({
  titulo = "Agregar",
  renderForm,
  onSave,
}: AgregarDatosProps) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Guardar los datos (puedes reemplazar con lógica real)
  const handleGuardar = () => {
    console.log("Datos guardados!");
    if (onSave) onSave();
  };

  // Aplicar: guarda y mantiene abierto
  const handleAplicar = () => {
    handleGuardar();
    // Mantiene abierto para seguir agregando
  };

  // Aceptar: guarda y cierra
  const handleAceptar = () => {
    handleGuardar();
    handleClose();
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        {/* Botón adicionar con texto y icono a la derecha */}
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleOpen}
        >
          Adicionar
        </Button>

        {/* Modal */}
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
          {/* Título con botón X */}
          <DialogTitle
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6">{titulo}</Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>

          {/* Contenido: formulario */}
          <DialogContent dividers>{renderForm?.()}</DialogContent>

          {/* Botones de acción */}
          <DialogActions>
            <Button onClick={handleAplicar} variant="outlined">
              Aplicar
            </Button>
            <Button onClick={handleAceptar} variant="contained">
              Aceptar
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
}
