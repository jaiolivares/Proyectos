import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import RefreshIcon from '@mui/icons-material/Refresh'
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Container,
    Paper,
    Stack,
    Typography,
} from '@mui/material'
import { useCallback, useEffect, useMemo, useState } from 'react'
import TallerDeleteDialog from '../components/TallerDeleteDialog'
import TallerFormDialog from '../components/TallerFormDialog'
import TallerTable from '../components/TallerTable'
import { useAuthContext } from '../contexts/AuthContext'
import { Taller, TallerPayload } from '../models/taller'
import { TallerService } from '../services/taller.service'

function sortTalleres(items: Taller[]) {
  return [...items].sort((left, right) => right.Id - left.Id)
}

export default function Talleres() {
  const { user } = useAuthContext()
  const tallerService = useMemo(() => new TallerService(), [])
  const [talleres, setTalleres] = useState<Taller[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create')
  const [formOpen, setFormOpen] = useState(false)
  const [selectedTaller, setSelectedTaller] = useState<Taller | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Taller | null>(null)
  const displayName = user?.Nombre || user?.NombreUsuario || user?.Email

  const loadTalleres = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const data = await tallerService.fetchAll()
      setTalleres(sortTalleres(data))
    } catch (requestError: any) {
      setError(requestError?.message || 'No fue posible cargar los talleres')
    } finally {
      setLoading(false)
    }
  }, [tallerService])

  useEffect(() => {
    void loadTalleres()
  }, [loadTalleres])

  const handleCreateClick = () => {
    setSuccess(null)
    setSelectedTaller(null)
    setFormMode('create')
    setFormOpen(true)
  }

  const handleEditClick = (taller: Taller) => {
    setSuccess(null)
    setSelectedTaller(taller)
    setFormMode('edit')
    setFormOpen(true)
  }

  const handleDeleteClick = (taller: Taller) => {
    setSuccess(null)
    setDeleteTarget(taller)
  }

  const handleFormSubmit = async (payload: TallerPayload) => {
    setSubmitting(true)
    setError(null)

    try {
      if (formMode === 'create') {
        const created = await tallerService.create(payload)
        setTalleres(prev => sortTalleres([created, ...prev]))
        setSuccess(`Taller ${created.Nombre} creado correctamente.`)
      } else if (selectedTaller) {
        const updated = await tallerService.update(selectedTaller.Id, payload)
        setTalleres(prev => sortTalleres(prev.map(item => item.Id === updated.Id ? updated : item)))
        setSuccess(`Taller ${updated.Nombre} actualizado correctamente.`)
      }

      setFormOpen(false)
      setSelectedTaller(null)
    } catch (requestError: any) {
      setError(requestError?.message || 'No fue posible guardar el taller')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) {
      return
    }

    setSubmitting(true)
    setError(null)

    try {
      const message = await tallerService.remove(deleteTarget.Id)
      setTalleres(prev => prev.filter(item => item.Id !== deleteTarget.Id))
      setSuccess(message || `Taller ${deleteTarget.Nombre} eliminado correctamente.`)
      setDeleteTarget(null)
    } catch (requestError: any) {
      setError(requestError?.message || 'No fue posible eliminar el taller')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Container sx={{ py: 4 }}>
      <Stack spacing={3}>
        <Box>
          <Typography variant="h4">Talleres</Typography>
          <Typography color="text.secondary" sx={{ mt: 1 }}>
            Administra el catálogo de talleres conectado a tu API. Sesión actual: {displayName}.
          </Typography>
        </Box>

        <Paper variant="outlined" sx={{ p: 3 }}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            alignItems={{ xs: 'stretch', sm: 'center' }}
            justifyContent="space-between"
          >
            <Box>
              <Typography variant="h6">CRUD de talleres</Typography>
              <Typography color="text.secondary">
                Crea, edita, elimina y recarga talleres desde los endpoints protegidos de JOZ-Api.
              </Typography>
            </Box>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
              <Button variant="outlined" startIcon={<RefreshIcon />} onClick={() => void loadTalleres()} disabled={loading || submitting}>
                Recargar
              </Button>
              <Button variant="contained" startIcon={<AddCircleOutlineIcon />} onClick={handleCreateClick} disabled={submitting}>
                Agregar taller
              </Button>
            </Stack>
          </Stack>
        </Paper>

        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success" onClose={() => setSuccess(null)}>{success}</Alert>}

        {loading ? (
          <Paper variant="outlined" sx={{ p: 6, display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </Paper>
        ) : (
          <TallerTable talleres={talleres} onEdit={handleEditClick} onDelete={handleDeleteClick} />
        )}
      </Stack>

      <TallerFormDialog
        open={formOpen}
        mode={formMode}
        taller={selectedTaller}
        loading={submitting}
        onClose={() => {
          if (submitting) {
            return
          }

          setFormOpen(false)
          setSelectedTaller(null)
        }}
        onSubmit={handleFormSubmit}
      />

      <TallerDeleteDialog
        open={Boolean(deleteTarget)}
        taller={deleteTarget}
        loading={submitting}
        onClose={() => {
          if (submitting) {
            return
          }

          setDeleteTarget(null)
        }}
        onConfirm={handleDeleteConfirm}
      />
    </Container>
  )
}
