import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useMemo, useState } from "react";
import { Taller } from "../../../models/vehiculos/taller";

type Props = {
  talleres: Taller[];
  totalCount?: number;
  onEdit: (taller: Taller) => void;
  onDelete: (taller: Taller) => void;
};

export default function TallerTable({ talleres, totalCount, onEdit, onDelete }: Props) {
  type SortField = "Id" | "Nombre" | "Comuna" | "Direccion";
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedTalleres = useMemo(() => {
    if (!sortField) return talleres;
    const copy = [...talleres];
    copy.sort((a, b) => {
      let va: any;
      let vb: any;
      switch (sortField) {
        case "Id":
          va = a.Id;
          vb = b.Id;
          break;
        case "Nombre":
          va = a.Nombre ?? "";
          vb = b.Nombre ?? "";
          break;
        case "Comuna":
          va = a.Comuna?.Descripcion ?? "";
          vb = b.Comuna?.Descripcion ?? "";
          break;
        case "Direccion":
          va = a.Direccion ?? "";
          vb = b.Direccion ?? "";
          break;
        default:
          va = "";
          vb = "";
      }

      if (typeof va === "number" && typeof vb === "number") {
        return sortDirection === "asc" ? va - vb : vb - va;
      }

      const sa = String(va).toLowerCase();
      const sb = String(vb).toLowerCase();
      if (sa < sb) return sortDirection === "asc" ? -1 : 1;
      if (sa > sb) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
    return copy;
  }, [talleres, sortField, sortDirection]);

  return (
    <TableContainer component={Paper} elevation={0} variant="outlined" sx={{ width: "100%", overflowX: "auto" }}>
      <Table sx={{ minWidth: "max-content" }}>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel active={sortField === "Id"} direction={sortField === "Id" ? sortDirection : "asc"} onClick={() => handleSort("Id")}>
                #
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel active={sortField === "Nombre"} direction={sortField === "Nombre" ? sortDirection : "asc"} onClick={() => handleSort("Nombre")}>
                Nombre
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel active={sortField === "Comuna"} direction={sortField === "Comuna" ? sortDirection : "asc"} onClick={() => handleSort("Comuna")}>
                Comuna
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel active={sortField === "Direccion"} direction={sortField === "Direccion" ? sortDirection : "asc"} onClick={() => handleSort("Direccion")}>
                Dirección
              </TableSortLabel>
            </TableCell>
            <TableCell align="right">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {talleres.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5}>
                <Typography color="text.secondary">
                  {typeof totalCount === "number" && totalCount > 0
                    ? "No hay talleres que coincidan con los filtros aplicados. Ajusta o limpia los filtros para ver más resultados."
                    : "No hay talleres cargados. Usa el botón Agregar taller para crear el primero."}
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            sortedTalleres.map((taller) => (
              <TableRow key={taller.Id} hover>
                <TableCell>{taller.Id}</TableCell>
                <TableCell>{taller.Nombre}</TableCell>
                <TableCell>
                  <Typography color="text.primary">{taller.Comuna?.Descripcion}</Typography>
                  <Typography color="text.secondary">{taller.Comuna?.Codigo}</Typography>
                </TableCell>
                <TableCell>{taller.Direccion}</TableCell>
                <TableCell align="right">
                  <Tooltip title="Editar taller">
                    <IconButton onClick={() => onEdit(taller)} size="small">
                      <EditOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Eliminar taller">
                    <IconButton onClick={() => onDelete(taller)} size="small" color="error">
                      <DeleteOutlineIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
