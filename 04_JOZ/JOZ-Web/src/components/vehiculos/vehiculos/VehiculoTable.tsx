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
import { Vehiculo } from "../../../models/vehiculos/vehiculo";
import { EntityTableColumn } from "../shared/EntityTable";
import { formatCurrency, formatDateLabel } from "../shared/formatters";

type Props = {
  vehiculos: Vehiculo[];
  onEdit: (vehiculo: Vehiculo) => void;
  onDelete: (vehiculo: Vehiculo) => void;
};

const columns: EntityTableColumn<Vehiculo>[] = [
  { key: "id", label: "ID", render: (item) => item.Id },
  { key: "asociacion", label: "Id marca-modelo", render: (item) => item.IdMarcaModeloVehiculo },
  { key: "ano", label: "Año", render: (item) => item.Ano },
  { key: "motor", label: "Motor", render: (item) => item.NumeroMotor },
  { key: "chasis", label: "Chasis", render: (item) => item.NumeroChasis },
  { key: "color", label: "Color", render: (item) => item.Color },
  { key: "compra", label: "Fecha compra", render: (item) => formatDateLabel(item.FechaCompra) },
  { key: "monto", label: "Monto compra", render: (item) => formatCurrency(item.MontoCompra) },
  { key: "vendido", label: "Vendido", render: (item) => (item.Vendido ? "Sí" : "No") },
];

export default function VehiculoTable({ vehiculos, onEdit, onDelete }: Props) {
  type SortField = "Id" | "IdMarcaModeloVehiculo" | "Ano" | "NumeroMotor" | "NumeroChasis" | "Color" | "FechaCompra" | "MontoCompra" | "Vendido";
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

  const sorted = useMemo(() => {
    if (!sortField) return vehiculos;
    const copy = [...vehiculos];
    copy.sort((a, b) => {
      let va: any;
      let vb: any;
      switch (sortField) {
        case "Id":
          va = a.Id;
          vb = b.Id;
          break;
        case "IdMarcaModeloVehiculo":
          va = a.IdMarcaModeloVehiculo;
          vb = b.IdMarcaModeloVehiculo;
          break;
        case "Ano":
          va = a.Ano;
          vb = b.Ano;
          break;
        case "NumeroMotor":
          va = a.NumeroMotor ?? "";
          vb = b.NumeroMotor ?? "";
          break;
        case "NumeroChasis":
          va = a.NumeroChasis ?? "";
          vb = b.NumeroChasis ?? "";
          break;
        case "Color":
          va = a.Color ?? "";
          vb = b.Color ?? "";
          break;
        case "FechaCompra":
          va = a.FechaCompra ?? "";
          vb = b.FechaCompra ?? "";
          break;
        case "MontoCompra":
          va = a.MontoCompra ?? 0;
          vb = b.MontoCompra ?? 0;
          break;
        case "Vendido":
          va = a.Vendido ? 1 : 0;
          vb = b.Vendido ? 1 : 0;
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
  }, [vehiculos, sortField, sortDirection]);

  return (
    <TableContainer component={Paper} elevation={0} variant="outlined" sx={{ width: "100%", overflowX: "auto" }}>
      <Table sx={{ minWidth: "max-content" }}>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel active={sortField === "Id"} direction={sortField === "Id" ? sortDirection : "asc"} onClick={() => handleSort("Id")}>
                ID
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel active={sortField === "IdMarcaModeloVehiculo"} direction={sortField === "IdMarcaModeloVehiculo" ? sortDirection : "asc"} onClick={() => handleSort("IdMarcaModeloVehiculo")}>
                Id marca-modelo
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel active={sortField === "Ano"} direction={sortField === "Ano" ? sortDirection : "asc"} onClick={() => handleSort("Ano")}>
                Año
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel active={sortField === "NumeroMotor"} direction={sortField === "NumeroMotor" ? sortDirection : "asc"} onClick={() => handleSort("NumeroMotor")}>
                Motor
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel active={sortField === "NumeroChasis"} direction={sortField === "NumeroChasis" ? sortDirection : "asc"} onClick={() => handleSort("NumeroChasis")}>
                Chasis
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel active={sortField === "Color"} direction={sortField === "Color" ? sortDirection : "asc"} onClick={() => handleSort("Color")}>
                Color
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel active={sortField === "FechaCompra"} direction={sortField === "FechaCompra" ? sortDirection : "asc"} onClick={() => handleSort("FechaCompra")}>
                Fecha compra
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel active={sortField === "MontoCompra"} direction={sortField === "MontoCompra" ? sortDirection : "asc"} onClick={() => handleSort("MontoCompra")}>
                Monto compra
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel active={sortField === "Vendido"} direction={sortField === "Vendido" ? sortDirection : "asc"} onClick={() => handleSort("Vendido")}>
                Vendido
              </TableSortLabel>
            </TableCell>
            <TableCell align="right">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sorted.length === 0 ? (
            <TableRow>
              <TableCell colSpan={10}>
                <Typography color="text.secondary">No hay vehículos cargados. Usa el botón Agregar vehículo para crear el primero.</Typography>
              </TableCell>
            </TableRow>
          ) : (
            sorted.map((item) => (
              <TableRow key={item.Id} hover>
                <TableCell>{item.Id}</TableCell>
                <TableCell>{item.IdMarcaModeloVehiculo}</TableCell>
                <TableCell>{item.Ano}</TableCell>
                <TableCell>{item.NumeroMotor}</TableCell>
                <TableCell>{item.NumeroChasis}</TableCell>
                <TableCell>{item.Color}</TableCell>
                <TableCell>{formatDateLabel(item.FechaCompra)}</TableCell>
                <TableCell>{formatCurrency(item.MontoCompra)}</TableCell>
                <TableCell>{item.Vendido ? "Sí" : "No"}</TableCell>
                <TableCell align="right">
                  <Tooltip title="Editar vehículo">
                    <IconButton onClick={() => onEdit(item)} size="small">
                      <EditOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Eliminar vehículo">
                    <IconButton onClick={() => onDelete(item)} size="small" color="error">
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
