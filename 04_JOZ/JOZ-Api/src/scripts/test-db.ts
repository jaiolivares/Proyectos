import prisma from '../prisma';

async function main() {
  try {
    const users = await prisma.usuarios.findMany();
    console.log('Usuarios encontrados:', users.length);
    console.table(users);
  } catch (err) {
    console.error('Error consultando Usuarios:', err);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
}

main();
