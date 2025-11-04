import request from 'supertest';
import app from '../src/app'; // Asegúrate de que la ruta sea correcta según tu estructura de carpetas

describe('User API', () => {
  it('should create a new user', async () => {
    const newUser = {
      name: 'John Doe',
      email: 'john.doe@example.com',
    };

    const response = await request(app)
      .post('/api/users') // Asegúrate de que esta ruta esté definida en tus rutas
      .send(newUser);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe(newUser.name);
    expect(response.body.email).toBe(newUser.email);
  });

  it('should get a user by id', async () => {
    const userId = 1; // Cambia esto según tus datos de prueba

    const response = await request(app)
      .get(`/api/users/${userId}`); // Asegúrate de que esta ruta esté definida en tus rutas

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', userId);
  });

  it('should update a user', async () => {
    const userId = 1; // Cambia esto según tus datos de prueba
    const updatedUser = {
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
    };

    const response = await request(app)
      .put(`/api/users/${userId}`) // Asegúrate de que esta ruta esté definida en tus rutas
      .send(updatedUser);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe(updatedUser.name);
    expect(response.body.email).toBe(updatedUser.email);
  });

  it('should delete a user', async () => {
    const userId = 1; // Cambia esto según tus datos de prueba

    const response = await request(app)
      .delete(`/api/users/${userId}`); // Asegúrate de que esta ruta esté definida en tus rutas

    expect(response.status).toBe(204);
  });
});