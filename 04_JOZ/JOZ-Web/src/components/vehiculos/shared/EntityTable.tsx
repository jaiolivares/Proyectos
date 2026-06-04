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
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { ReactNode } from "react";
import { CrudEntity } from "../../../models/vehiculos/crud";

export interface EntityTableColumn<TItem> {
  key: string;
  label: string;
  align?: "inherit" | "left" | "center" | "right" | "justify";
  render: (item: TItem) => ReactNode;
}

interface Props<TItem extends CrudEntity> {
  items: TItem[];
  columns: EntityTableColumn<TItem>[];
  emptyText: string;
  editLabel: string;
  deleteLabel: string;
  onEdit: (item: TItem) => void;
  onDelete: (item: TItem) => void;
}

export default function EntityTable<TItem extends CrudEntity>({ items, columns, emptyText, editLabel, deleteLabel, onEdit, onDelete }: Props<TItem>) {
  return (
    <TableContainer component={Paper} elevation={0} variant="outlined">
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.key} align={column.align}>
                {column.label}
              </TableCell>
            ))}
            <TableCell align="right">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length + 1}>
                <Typography color="text.secondary">{emptyText}</Typography>
              </TableCell>
            </TableRow>
          ) : (
            items.map((item) => (
              <TableRow key={item.Id} hover>
                {columns.map((column) => (
                  <TableCell key={column.key} align={column.align}>
                    {column.render(item)}
                  </TableCell>
                ))}
                <TableCell align="right">
                  <Tooltip title={editLabel}>
                    <IconButton onClick={() => onEdit(item)} size="small">
                      <EditOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={deleteLabel}>
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
