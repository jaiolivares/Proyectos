import express from 'express';
import jwt from 'jsonwebtoken';
import request from 'supertest';
import config from '../../src/config';

jest.mock('../../src/routes/healths/health.routes', () => {
  const express = require('express');
  const router = express.Router();
  router.get('/', (_req: unknown, res: { status: (code: number) => { json: (body: unknown) => void } }) => {
    res.status(200).json({ route: 'health' });
  });

  return { __esModule: true, default: router };
});

jest.mock('../../src/routes/auths/auth.routes', () => {
  const express = require('express');
  const router = express.Router();
  router.post('/login', (_req: unknown, res: { status: (code: number) => { json: (body: unknown) => void } }) => {
    res.status(200).json({ route: 'auth' });
  });

  return { __esModule: true, default: router };
});

jest.mock('../../src/routes/usuarios/usuario.routes', () => {
  const express = require('express');
  const router = express.Router();
  router.get('/', (_req: unknown, res: { status: (code: number) => { json: (body: unknown) => void } }) => {
    res.status(200).json({ route: 'usuario' });
  });

  return { __esModule: true, default: router };
});

jest.mock('../../src/routes/vehiculos/vehiculo.routes', () => {
  const express = require('express');
  const router = express.Router();
  router.get('/', (_req: unknown, res: { status: (code: number) => { json: (body: unknown) => void } }) => {
    res.status(200).json({ route: 'vehiculo' });
  });

  return { __esModule: true, default: router };
});

jest.mock('../../src/routes/vehiculos/marcaModeloVehiculo.routes', () => {
  const express = require('express');
  const router = express.Router();
  router.get('/', (_req: unknown, res: { status: (code: number) => { json: (body: unknown) => void } }) => {
    res.status(200).json({ route: 'marcaModeloVehiculo' });
  });

  return { __esModule: true, default: router };
});

jest.mock('../../src/routes/vehiculos/marca.routes', () => {
  const express = require('express');
  const router = express.Router();
  router.get('/', (_req: unknown, res: { status: (code: number) => { json: (body: unknown) => void } }) => {
    res.status(200).json({ route: 'marca' });
  });

  return { __esModule: true, default: router };
});

jest.mock('../../src/routes/vehiculos/modelo.routes', () => {
  const express = require('express');
  const router = express.Router();
  router.get('/', (_req: unknown, res: { status: (code: number) => { json: (body: unknown) => void } }) => {
    res.status(200).json({ route: 'modelo' });
  });

  return { __esModule: true, default: router };
});

jest.mock('../../src/routes/vehiculos/taller.routes', () => {
  const express = require('express');
  const router = express.Router();
  router.get('/', (_req: unknown, res: { status: (code: number) => { json: (body: unknown) => void } }) => {
    res.status(200).json({ route: 'taller' });
  });

  return { __esModule: true, default: router };
});

jest.mock('../../src/controllers/item.controller', () => ({
  ItemController: jest.fn().mockImplementation(() => ({
    all: (_req: unknown, res: { status: (code: number) => { json: (body: unknown) => void } }) => {
      res.status(200).json({ route: 'item' });
    },
  })),
}));

import { setRoutes } from '../../src/routes';

describe('Auth guard en routes index', () => {
  const buildApp = () => {
    const app = express();
    app.use(express.json());
    setRoutes(app);
    return app;
  };

  it('permite acceder a health sin token', async () => {
    const response = await request(buildApp()).get('/api/health');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ route: 'health' });
  });

  it('permite acceder a auth sin token', async () => {
    const response = await request(buildApp()).post('/api/auth/login').send({});

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ route: 'auth' });
  });

  it('bloquea endpoints privados cuando no hay token', async () => {
    const response = await request(buildApp()).get('/api/usuario');

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      EjecucionCorrecta: false,
      Mensaje: 'Token de acceso requerido',
      Dato: null,
    });
  });

  it('permite endpoints privados con token valido', async () => {
    const token = jwt.sign({ Id: 1, NombreUsuario: 'javier' }, config.jwt.secret as jwt.Secret, {
      expiresIn: config.jwt.expiresIn,
    } as jwt.SignOptions);

    const response = await request(buildApp())
      .get('/api/usuario')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ route: 'usuario' });
  });
});