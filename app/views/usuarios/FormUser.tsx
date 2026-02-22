"use client";

import { useState } from "react";
import {
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  FormControlLabel,
  SelectChangeEvent,
} from "@mui/material";
import { UsuarioFormData } from "@/components/components/tabla/export";

interface FormUsuariosProps {
  onChange?: (data: UsuarioFormData) => void;
  initialData?: Partial<UsuarioFormData>;
}

export default function FormUsuarios({
  onChange,
  initialData,
}: FormUsuariosProps) {
  const [formData, setFormData] = useState<UsuarioFormData>({
    nombre: initialData?.nombre || "",
    apellido: initialData?.apellido || "",
    rol: initialData?.rol || "",
    movil: initialData?.movil ?? 0, // 🔑 default number
    verificado: initialData?.verificado || false,
    estado: initialData?.estado || "Activo",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const updated = {
      ...formData,
      [name]: name === "movil" ? Number(value) : value, // 🔑 parseamos movil
    } as UsuarioFormData;

    setFormData(updated);
    onChange?.(updated);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    const updated = { ...formData, [name]: checked } as UsuarioFormData;
    setFormData(updated);
    onChange?.(updated);
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name!]: value } as UsuarioFormData;
    setFormData(updated);
    onChange?.(updated);
  };

  return (
    <Box
      component="form"
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <TextField
        label="Nombre"
        name="nombre"
        value={formData.nombre}
        onChange={handleInputChange}
        fullWidth
      />

      <TextField
        label="Apellido"
        name="apellido"
        value={formData.apellido}
        onChange={handleInputChange}
        fullWidth
      />

      <TextField
        label="Rol"
        name="rol"
        value={formData.rol}
        onChange={handleInputChange}
        fullWidth
      />

      <TextField
        label="Móvil"
        name="movil"
        type="number"
        value={formData.movil}
        onChange={handleInputChange}
        fullWidth
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={formData.verificado}
            name="verificado"
            onChange={handleCheckboxChange}
          />
        }
        label="Verificado"
      />

      <FormControl fullWidth>
        <InputLabel id="estado-label">Estado</InputLabel>
        <Select
          labelId="estado-label"
          name="estado"
          value={formData.estado}
          onChange={handleSelectChange}
        >
          <MenuItem value="Activo">Activo</MenuItem>
          <MenuItem value="Pendiente">Pendiente</MenuItem>
          <MenuItem value="Inactivo">Inactivo</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
