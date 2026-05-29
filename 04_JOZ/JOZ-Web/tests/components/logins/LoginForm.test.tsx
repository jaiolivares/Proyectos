import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LoginForm from "../../../src/components/logins/LoginForm";

describe("LoginForm", () => {
  it("envia el payload escrito por el usuario", async () => {
    const onSubmit = vi.fn().mockResolvedValue(undefined);

    render(
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <LoginForm onSubmit={onSubmit} />
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByRole("textbox", { name: /Nombre de usuario/i }), {
      target: { value: "nuevo.usuario" },
    });
    fireEvent.change(screen.getByDisplayValue("123"), {
      target: { value: "secreta" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Ingresar" }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        NombreUsuario: "nuevo.usuario",
        Password: "secreta",
      });
    });
  });

  it("muestra error y estado de carga", () => {
    render(
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <LoginForm onSubmit={vi.fn().mockResolvedValue(undefined)} loading error="Credenciales inválidas" />
      </MemoryRouter>,
    );

    expect(screen.getByText("Credenciales inválidas")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Ingresando..." })).toBeDisabled();
  });
});
