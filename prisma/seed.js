const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

(async function main() {
  try {
    const commander = await prisma.missionCommander.upsert({
      where: {id: 1},
      update: {},
      create: {
        name: 'Commander One',
        username: 'comander01',
        mainStack: 'Node',
        currentEnrollment: true,
        hasAzureCertification: true
      },
    });

    const commander2 = await prisma.missionCommander.upsert({
      where: {id: 2},
      update: {},
      create: {
        name: 'Commander Two',
        username: 'comander02',
        mainStack: 'Node',
        currentEnrollment: true,
        hasAzureCertification: true
      },
    });

    const commander3 = await prisma.missionCommander.upsert({
      where: {id: 3},
      update: {},
      create: {
        name: 'Commander Three',
        username: 'comander03',
        mainStack: 'Java',
        currentEnrollment: false,
        hasAzureCertification: true
      },
    });

    const commander4 = await prisma.missionCommander.upsert({
      where: {id: 4},
      update: {},
      create: {
        name: 'Commander Four',
        username: 'comander04',
        mainStack: 'Java',
        currentEnrollment: true,
        hasAzureCertification: true
      },
    });

    console.log('Create 3 students');
  } catch(e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();