import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PageBreadcrumbs from "../../../src/components/navigation/PageBreadcrumbs";

describe("PageBreadcrumbs", () => {
  it("muestra solo inicio como texto en home", () => {
    render(
      <MemoryRouter initialEntries={["/home"]} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <PageBreadcrumbs />
      </MemoryRouter>,
    );

    expect(screen.getByText("Inicio")).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Inicio" })).not.toBeInTheDocument();
  });

  it("muestra inicio como link y el resto segun clickabilidad", () => {
    render(
      <MemoryRouter initialEntries={["/vehiculos/talleres"]} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <PageBreadcrumbs />
      </MemoryRouter>,
    );

    expect(screen.getByRole("link", { name: "Inicio" })).toHaveAttribute("href", "/home");
    expect(screen.getByText("Vehículos")).toBeInTheDocument();
    expect(screen.getByText("Talleres")).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Vehículos" })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Talleres" })).not.toBeInTheDocument();
  });
});
