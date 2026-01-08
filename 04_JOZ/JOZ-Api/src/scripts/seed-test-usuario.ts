import prisma from '../prisma';

async function main() {
  try {
    await prisma.usuarios.upsert({
      where: { Id: 1 },
      update: {
        NombreUsuario: 'javier_1',
        Nombre: 'javier',
        Email: 'javi@aa.aa',
        FechaCreacion: new Date(),
        EstaActivo: 1,
      },
      create: {
        Id: 1,
        NombreUsuario: 'javier_1',
        Nombre: 'javier',
        Email: 'javi@aa.aa',
        FechaCreacion: new Date(),
        EstaActivo: 1,
      },
    });
    console.log('Seed user upserted (Id=1)');
  } catch (err) {
    console.error('Seed error:', err);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
}

main();
