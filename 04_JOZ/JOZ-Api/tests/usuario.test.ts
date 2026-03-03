import request from 'supertest';
import app from '../src/app'; // Asegúrate de que la ruta sea correcta según tu estructura de carpetas

describe('Usuario API', () => {
  it('should create a new usuario', async () => {
    const newUser = {
      name: 'John Doe',
      email: 'john.doe@example.com',
    };

    const response = await request(app)
      .post('/api/usuarios')
      .send(newUser);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe(newUser.name);
    expect(response.body.email).toBe(newUser.email);
  });

  it('should get a usuario by id', async () => {
    const userId = 1; // Cambia esto según tus datos de prueba

    const response = await request(app)
      .get(`/api/usuarios/${userId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', userId);
  });

  it('should update a usuario', async () => {
    const userId = 1; // Cambia esto según tus datos de prueba
    const updatedUser = {
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
    };

    const response = await request(app)
      .put(`/api/usuarios/${userId}`)
      .send(updatedUser);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe(updatedUser.name);
    expect(response.body.email).toBe(updatedUser.email);
  });

  it('should delete a usuario', async () => {
    const userId = 1; // Cambia esto según tus datos de prueba

    const response = await request(app)
      .delete(`/api/usuarios/${userId}`);

    expect(response.status).toBe(204);
  });
});
