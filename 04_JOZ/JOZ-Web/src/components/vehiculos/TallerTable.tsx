import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import {
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Typography,
} from '@mui/material'
import { Taller } from '../../models/taller'

type Props = {
  talleres: Taller[]
  onEdit: (taller: Taller) => void
  onDelete: (taller: Taller) => void
}

export default function TallerTable({ talleres, onEdit, onDelete }: Props) {
  return (
    <TableContainer component={Paper} elevation={0} variant="outlined">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Id comuna</TableCell>
            <TableCell>Dirección</TableCell>
            <TableCell align="right">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {talleres.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5}>
                <Typography color="text.secondary">
                  No hay talleres cargados. Usa el botón Agregar taller para crear el primero.
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            talleres.map(taller => (
              <TableRow key={taller.Id} hover>
                <TableCell>{taller.Id}</TableCell>
                <TableCell>{taller.Nombre}</TableCell>
                <TableCell>{taller.IdComuna}</TableCell>
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
  )
}