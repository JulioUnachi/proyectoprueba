const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    await database.category.createMany({
      data: [
        { name: "Computer Science" },
       
      ]
    });

    console.log("Success");
  } catch (error) {
    console.log("Error al cargar las categorías de la base de datos", error);
  } finally {
    await database.$disconnect();
  }
}

main();