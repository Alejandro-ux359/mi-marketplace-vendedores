"use client";

import { useState, useMemo } from "react";
import {
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
} from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";
import CloseIcon from "@mui/icons-material/Close";

type FilterValue = string | number | boolean;
type DataRow = Record<string, FilterValue>;

interface TableFilterProps {
  data: DataRow[];
  onChange?: (filters: Record<string, FilterValue[]>) => void;
}

export default function TableFilter({ data, onChange }: TableFilterProps) {
  const [openModal, setOpenModal] = useState(false);
  const [activeColumns, setActiveColumns] = useState<string[]>([]);
  const [filters, setFilters] = useState<Record<string, FilterValue[]>>({});

  // Columnas con opciones (quitando nombre, apellido, movil)
  const columns = useMemo(() => {
    if (!data.length) return [];

    return Object.keys(data[0])
      .filter((key) => !["nombre", "apellido", "movil"].includes(key))
      .map((key) => {
        // verified → siempre Sí / No
        if (key === "verified") {
          return {
            key,
            label: "Verificado",
            values: ["Sí", "No"],
          };
        }

        // status → traducir a español, incluyendo Pendiente
        if (key === "status") {
          const uniqueValues = Array.from(new Set(data.map((d) => d[key]))).filter(Boolean);
          // Mapear todos los posibles estados
          const values = uniqueValues.map((v) => {
            if (v === "Active" || v === "activo") return "Activo";
            if (v === "Inactive" || v === "inactivo") return "Inactivo";
            if (v === "Pendiente" || v === "pendiente") return "Pendiente";
            return String(v);
          });

          // Asegurarse de que Pendiente esté siempre presente
          if (!values.includes("Pendiente")) values.push("Pendiente");

          return {
            key,
            label: "Estado",
            values,
          };
        }

        // rol y otras columnas → valores dinámicos solo si existen
        const uniqueValues = Array.from(new Set(data.map((d) => d[key]))).filter(Boolean);
        return {
          key,
          label: key[0].toUpperCase() + key.slice(1),
          values: uniqueValues,
        };
      });
  }, [data]);

  const toggleColumn = (key: string) => {
    setActiveColumns((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const toggleValue = (colKey: string, value: FilterValue) => {
    let actualValue: FilterValue = value;

    // Convertimos Sí / No a boolean para verified
    if (colKey === "verified" || colKey === "Verificado") {
      actualValue = value === "Sí";
    }

    // Convertimos estado de español a valor original
    if (colKey === "status" || colKey === "Estado") {
      actualValue =
        value === "Activo" ? "Active" :
        value === "Inactivo" ? "Inactive" :
        value === "Pendiente" ? "Pendiente" :
        value;
    }

    const current = filters[colKey] || [];
    const updated = current.includes(actualValue)
      ? current.filter((v) => v !== actualValue)
      : [...current, actualValue];
    const newFilters = { ...filters, [colKey]: updated };
    setFilters(newFilters);
    onChange?.(newFilters);
  };

  const handleReset = () => {
    setActiveColumns([]);
    setFilters({});
    onChange?.({});
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end", px: 2, py: 1 }}>
      <IconButton onClick={() => setOpenModal(true)}>
        <TuneIcon />
      </IconButton>

      <Dialog open={openModal} onClose={() => setOpenModal(false)} fullWidth maxWidth="sm">
        <DialogTitle
          sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
        >
          <Typography>Filtros</Typography>
          <IconButton onClick={() => setOpenModal(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          <FormGroup>
            {columns.map((col) => (
              <Box key={col.key} sx={{ mb: 2 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={activeColumns.includes(col.key)}
                      onChange={() => toggleColumn(col.key)}
                    />
                  }
                  label={col.label}
                />

                {activeColumns.includes(col.key) && (
                  <Box sx={{ pl: 3, mt: 1 }}>
                    {col.values.length ? (
                      col.values.map((val) => (
                        <FormControlLabel
                          key={String(val)}
                          control={
                            <Checkbox
                              checked={filters[col.key]?.includes(
                                col.key === "verified" || col.key === "Verificado"
                                  ? val === "Sí"
                                  : col.key === "status" || col.key === "Estado"
                                  ? val === "Activo"
                                    ? "Active"
                                    : val === "Inactivo"
                                    ? "Inactive"
                                    : val === "Pendiente"
                                    ? "Pendiente"
                                    : val
                                  : val
                              ) || false}
                              onChange={() => toggleValue(col.key, val)}
                            />
                          }
                          label={String(val)}
                        />
                      ))
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        Sin valores disponibles
                      </Typography>
                    )}
                  </Box>
                )}
              </Box>
            ))}
          </FormGroup>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleReset}>Limpiar</Button>
          <Button onClick={() => setOpenModal(false)} variant="contained">
            Aplicar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
