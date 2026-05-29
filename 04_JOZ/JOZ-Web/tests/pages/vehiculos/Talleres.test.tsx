import { fireEvent, render, screen } from "@testing-library/react";
import Talleres from "../../../src/pages/vehiculos/Talleres";

const sampleTaller = {
  Id: 10,
  Nombre: "Taller Mock",
  IdComuna: 3,
  Direccion: "Dirección mock",
};

const submitPayload = {
  Nombre: "Payload Mock",
  IdComuna: 5,
  Direccion: "Dirección payload",
};

const authContextMock = {
  user: {
    Id: 1,
    NombreUsuario: "jai",
    Nombre: "Javier",
    Email: "jai@example.com",
    token: "token",
  },
};

const crudHookMock = {
  talleres: [sampleTaller],
  loading: false,
  submitting: false,
  error: null,
  success: "Operación ok",
  formMode: "create" as const,
  formOpen: true,
  selectedTaller: sampleTaller,
  deleteTarget: sampleTaller,
  loadTalleres: vi.fn().mockResolvedValue(undefined),
  openCreateForm: vi.fn(),
  openEditForm: vi.fn(),
  closeForm: vi.fn(),
  openDeleteDialog: vi.fn(),
  closeDeleteDialog: vi.fn(),
  submitForm: vi.fn().mockResolvedValue(undefined),
  confirmDelete: vi.fn().mockResolvedValue(undefined),
  clearSuccess: vi.fn(),
};

vi.mock("../../../src/contexts/AuthContext", () => ({
  useAuthContext: () => authContextMock,
}));

vi.mock("../../../src/hooks/useTalleresCrud", () => ({
  useTalleresCrud: () => crudHookMock,
}));

vi.mock("../../../src/components/vehiculos/talleres/TalleresPageHeader", () => ({
  default: ({ displayName }: { displayName?: string }) => <div data-testid="page-header">{displayName}</div>,
}));

vi.mock("../../../src/components/vehiculos/talleres/TalleresCrudPanel", () => ({
  default: ({ onReload, onCreate }: { onReload: () => void; onCreate: () => void }) => (
    <div>
      <button onClick={onReload}>recargar</button>
      <button onClick={onCreate}>crear</button>
    </div>
  ),
}));

vi.mock("../../../src/components/vehiculos/talleres/TalleresContent", () => ({
  default: ({ onEdit, onDelete, onCloseSuccess }: { onEdit: (taller: typeof sampleTaller) => void; onDelete: (taller: typeof sampleTaller) => void; onCloseSuccess: () => void }) => (
    <div>
      <button onClick={() => onEdit(sampleTaller)}>editar</button>
      <button onClick={() => onDelete(sampleTaller)}>eliminar</button>
      <button onClick={onCloseSuccess}>cerrar-exito</button>
    </div>
  ),
}));

vi.mock("../../../src/components/vehiculos/talleres/TallerFormDialog", () => ({
  default: ({ onClose, onSubmit }: { onClose: () => void; onSubmit: (payload: typeof submitPayload) => Promise<void> }) => (
    <div>
      <button onClick={onClose}>cerrar-form</button>
      <button onClick={() => void onSubmit(submitPayload)}>guardar-form</button>
    </div>
  ),
}));

vi.mock("../../../src/components/vehiculos/talleres/TallerDeleteDialog", () => ({
  default: ({ onClose, onConfirm }: { onClose: () => void; onConfirm: () => Promise<void> }) => (
    <div>
      <button onClick={onClose}>cerrar-delete</button>
      <button onClick={() => void onConfirm()}>confirmar-delete</button>
    </div>
  ),
}));

describe("Talleres page", () => {
  beforeEach(() => {
    crudHookMock.loadTalleres.mockClear();
    crudHookMock.openCreateForm.mockClear();
    crudHookMock.openEditForm.mockClear();
    crudHookMock.closeForm.mockClear();
    crudHookMock.openDeleteDialog.mockClear();
    crudHookMock.closeDeleteDialog.mockClear();
    crudHookMock.submitForm.mockClear();
    crudHookMock.confirmDelete.mockClear();
    crudHookMock.clearSuccess.mockClear();
  });

  it("muestra el displayName obtenido desde auth context", () => {
    render(<Talleres />);

    expect(screen.getByTestId("page-header")).toHaveTextContent("Javier");
  });

  it("conecta las acciones de la página con el hook de talleres", () => {
    render(<Talleres />);

    fireEvent.click(screen.getByRole("button", { name: "recargar" }));
    fireEvent.click(screen.getByRole("button", { name: "crear" }));
    fireEvent.click(screen.getByRole("button", { name: "editar" }));
    fireEvent.click(screen.getByRole("button", { name: "eliminar" }));
    fireEvent.click(screen.getByRole("button", { name: "cerrar-exito" }));
    fireEvent.click(screen.getByRole("button", { name: "cerrar-form" }));
    fireEvent.click(screen.getByRole("button", { name: "guardar-form" }));
    fireEvent.click(screen.getByRole("button", { name: "cerrar-delete" }));
    fireEvent.click(screen.getByRole("button", { name: "confirmar-delete" }));

    expect(crudHookMock.loadTalleres).toHaveBeenCalledTimes(1);
    expect(crudHookMock.openCreateForm).toHaveBeenCalledTimes(1);
    expect(crudHookMock.openEditForm).toHaveBeenCalledWith(sampleTaller);
    expect(crudHookMock.openDeleteDialog).toHaveBeenCalledWith(sampleTaller);
    expect(crudHookMock.clearSuccess).toHaveBeenCalledTimes(1);
    expect(crudHookMock.closeForm).toHaveBeenCalledTimes(1);
    expect(crudHookMock.submitForm).toHaveBeenCalledWith(submitPayload);
    expect(crudHookMock.closeDeleteDialog).toHaveBeenCalledTimes(1);
    expect(crudHookMock.confirmDelete).toHaveBeenCalledTimes(1);
  });
});
