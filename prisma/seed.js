const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

(async function main() {
  try {
    const ewok = await prisma.student.upsert({
      where: { id: 1 },
      update: {},
      create: {
        name: 'Ewok',
				lang: 'JavaScript',
				missionCommander: 'Woopa 5',
        enrollments: 3,
        hasCertification: false
      },
    });

    const ewok1 = await prisma.student.upsert({
      where: { id: 2 },
      update: {},
      create: {
        name: 'Ewok 1',
				lang: 'Java',
				missionCommander: 'Woopa 5',
        enrollments: 2,
        hasCertification: true
      },
    });

    const ewok2 = await prisma.student.upsert({
      where: { id: 3 },
      update: {},
      create: {
        name: 'Ewok 2',
				lang: 'Node',
				missionCommander: 'Woopa 5',
        enrollments: 3,
        hasCertification: true
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