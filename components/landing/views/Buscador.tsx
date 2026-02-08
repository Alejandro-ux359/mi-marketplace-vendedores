"use client";

import { useState, useCallback } from "react";
import { Box, Input, IconButton, ClickAwayListener } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search"; // Ícono de búsqueda de MUI
import CloseIcon from "@mui/icons-material/Close"; // Ícono de cerrar de MUI

// Función para reemplazar varAlpha sin theme
function varAlphaFallback(color: string, alpha: number) {
  if (color.startsWith("#")) {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  return color;
}

export function Searchbar({ ...other }) {
  const [open, setOpen] = useState(false); // Control del estado de apertura/cierre del campo de búsqueda
  const [searchText, setSearchText] = useState(""); // Control del texto del campo de búsqueda

  const handleOpen = useCallback(() => setOpen(true), []); // Función para abrir el campo de búsqueda
  const handleClose = useCallback(() => {
    setOpen(false);
    setSearchText(""); // Limpiar texto cuando se cierra
  }, []);

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <Box sx={{ position: "relative", display: "flex", alignItems: "center" }}>
        {/* ICONO DE BUSCAR (SIEMPRE VISIBLE CUANDO `open` ES FALSO) */}
        {!open && (
          <IconButton onClick={handleOpen}>
            <SearchIcon />
          </IconButton>
        )}

        {/* CUANDO `open` ES VERDADERO, SE MUESTRA EL CAMPO DE BÚSQUEDA */}
        {open && (
          <Box
            sx={{
              top: "50%",
              left: 110,
              display: "flex",
              alignItems: "center",
              width: 300, // Ancho del campo de búsqueda
              height: 40,
              px: 1,
              borderRadius: 10,
              backgroundColor: varAlphaFallback("#ffffff", 0.9),
              boxShadow: 3,
              transition: "width 3s ease-out", // Animación de apertura suave
            }}
            {...other}
          >
            {/* Campo de entrada de texto */}
            <Input
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              autoFocus
              fullWidth
              disableUnderline
              placeholder="Search…"
              sx={{ fontWeight: "bold" }}
              startAdornment={
                <Box sx={{ pr: 1 }}>
                  <SearchIcon sx={{ color: "text.disabled" }} />
                </Box>
              }
            />

            {/* Ícono de cerrar */}
            <IconButton onClick={handleClose} sx={{ paddingLeft: 1 }}>
              <CloseIcon />
            </IconButton>
          </Box>
        )}
      </Box>
    </ClickAwayListener>
  );
}
