import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UsuarioDto } from "../../src/dtos/usuarios/usuario/usuario.dto";
import { AuthCommandService } from "../../src/services/commands/auths/auth/auth.command.service";

jest.mock("bcryptjs", () => ({
  __esModule: true,
  default: {
    hash: jest.fn(),
    compare: jest.fn(),
  },
}));

jest.mock("jsonwebtoken", () => ({
  __esModule: true,
  default: {
    sign: jest.fn(),
  },
}));

describe("AuthCommandService", () => {
  const mockedBcrypt = bcrypt as jest.Mocked<typeof bcrypt>;
  const mockedJwt = jwt as jest.Mocked<typeof jwt>;
  const obtenerPorNombreUsuario = jest.fn();

  const usuario = new UsuarioDto(1, "javier", "hash-guardado", "Javier", "", "Olivares", "Zavala", "javier@example.com", new Date("2026-01-01T00:00:00.000Z"), null, false, true);

  const buildService = () =>
    new AuthCommandService({
      obtenerPorNombreUsuario,
    } as any);

  beforeEach(() => {
    obtenerPorNombreUsuario.mockReset();
    mockedBcrypt.hash.mockReset();
    mockedBcrypt.compare.mockReset();
    mockedJwt.sign.mockReset();
  });

  it("encripta el password usando bcrypt", async () => {
    mockedBcrypt.hash.mockResolvedValue("hash-nuevo" as never);

    const result = await buildService().encriptarPassword("secreto");

    expect(result).toBe("hash-nuevo");
    expect(mockedBcrypt.hash).toHaveBeenCalledWith("secreto", expect.any(Number));
  });

  it("retorna null cuando el usuario no existe", async () => {
    obtenerPorNombreUsuario.mockResolvedValue(null);

    const result = await buildService().login("javier", "secreto");

    expect(result).toBeNull();
    expect(mockedBcrypt.compare).not.toHaveBeenCalled();
    expect(mockedJwt.sign).not.toHaveBeenCalled();
  });

  it("retorna null cuando el password no coincide", async () => {
    obtenerPorNombreUsuario.mockResolvedValue(usuario);
    mockedBcrypt.compare.mockResolvedValue(false as never);

    const result = await buildService().login("javier", "incorrecto");

    expect(result).toBeNull();
    expect(mockedBcrypt.compare).toHaveBeenCalledWith("incorrecto", "hash-guardado");
    expect(mockedJwt.sign).not.toHaveBeenCalled();
  });

  it("retorna token y usuario cuando las credenciales son válidas", async () => {
    obtenerPorNombreUsuario.mockResolvedValue(usuario);
    mockedBcrypt.compare.mockResolvedValue(true as never);
    mockedJwt.sign.mockReturnValue("jwt-token" as never);

    const result = await buildService().login("javier", "secreto");

    expect(mockedBcrypt.compare).toHaveBeenCalledWith("secreto", "hash-guardado");
    expect(mockedJwt.sign).toHaveBeenCalledWith({ Id: 1, NombreUsuario: "javier" }, expect.any(String), expect.objectContaining({ expiresIn: expect.anything() }));
    expect(result).toEqual({
      token: "jwt-token",
      usuario,
    });
  });
});
