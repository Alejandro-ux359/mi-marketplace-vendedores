"use client";

import { useState, useEffect } from "react";
import { Box, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

type DataRow = Record<string, string | number | boolean>;

interface TableSearchProps {
  data?: DataRow[];
  onSearch?: (filteredData: DataRow[]) => void; // opcional si quieres pasar resultados afuera
}

/**
 * Componente de búsqueda simple por Nombre, Apellido y Móvil
 */
export default function TableSearch({ data, onSearch }: TableSearchProps) {
  const [query, setQuery] = useState("");

  // Filtra los datos cada vez que cambia el query
  // useEffect(() => {
  //   const lowerQuery = query.toLowerCase();
  //   const filtered = data?.filter((row) =>
  //     ["nombre", "apellido", "movil"].some((key) => {
  //       const val = row[key];
  //       return val !== undefined && val !== null && String(val).toLowerCase().includes(lowerQuery);
  //     })
  //   );

  //   // Llama callback si existe
  //   if (onSearch) onSearch(filtered);
  // }, [query, data, onSearch]);

 return (
  <Box sx={{  display: "flex", justifyContent: "flex-start" }}>
    <TextField
      size="small"
      variant="outlined"
      placeholder="Buscar"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      sx={{ width: 400, p: 2 }} // <-- ancho fijo
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  </Box>
);

}
