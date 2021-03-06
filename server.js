const cors = require('cors');
const express = require('express');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

const port = process.env.PORT || 3000;

// Cors
const corsOptions = {
  origin: 'http://localhost:8081'
}

app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.json({message: 'alive'});
});

app.get('/explorers', async (req, res) => {
    const allExplorers =  await prisma.explorer.findMany({});
    res.json(allExplorers);
});

app.get('/explorers/:id', async (req, res) => {
    const id = req.params.id;
    const explorer = await prisma.explorer.findUnique({where: {id: parseInt(id)}});
    res.json(explorer);
});

app.post('/explorers', async (req, res) => {
    
    const {name, username, mission} = req.body

    const explorer = {
        name,
        username,
        mission
    };

    await prisma.explorer.create({data: explorer});
    
    const message = 'Explorer creado';
    return res.json({message});
});

app.put('/explorers/:id', async (req, res) => {
	const id = parseInt(req.params.id);

	await prisma.explorer.update({
		where: {
			id: id
		},
		data: {
			mission: req.body.mission
		}
	})

	return res.json({message: "Actualizado correctamente"});
});

app.delete('/explorers/:id', async (req, res) => {
	const id = parseInt(req.params.id);
	await prisma.explorer.delete({where: {id: id}});
	return res.json({message: "Eliminado correctamente"});
});

app.get('/students', async (req, res) => {
  const allStudents =  await prisma.student.findMany({});
  res.json(allStudents);
});

app.get('/students/:id', async (req, res) => {
  const id = req.params.id;
  const student = await prisma.student.findUnique({where: {id: parseInt(id)}});
  res.json(student);
});

app.post('/students', async (req, res) => {
    
  const {name, lang, missionCommander, enrollments, hasCertification} = req.body

  const student = { name, lang, missionCommander, enrollments, hasCertification };

  await prisma.student.create({data: student});
  
  const message = 'Student creado';
  return res.json({message});
});

app.put('/students/:id', async (req, res) => {
	const id = parseInt(req.params.id);

  const {name, lang, missionCommander, enrollments, hasCertification} = req.body

	await prisma.student.update({
		where: {
			id
		},
		data: {
			name,
      lang,
      missionCommander,
      enrollments,
      hasCertification
		}
	})

	return res.json({message: "Actualizado correctamente"});
});

app.delete('/students/:id', async (req, res) => {
	const id = parseInt(req.params.id);
	await prisma.student.delete({where: {id: id}});
	return res.json({message: "Eliminado correctamente"});
});

app.get('/mc', async (req, res) => {
  const allCommanders = await prisma.missionCommander.findMany({});
  res.json(allCommanders);
});

app.get('/mc/:id', async (req, res) => {
  const id = req.params.id;
  const missionCommander = await prisma.missionCommander.findUnique({where: {id:parseInt(id)}});
  res.json(missionCommander);
});

app.post('/mc', async (req, res) => {
  
  const {name, username, mainStack, currentEnrollment, hasAzureCertification} = req.body;
  
  const missionCommander = {
    name,
    username,
    mainStack,
    currentEnrollment,
    hasAzureCertification  
  }

  const message = 'Mission Commander creado';

  await prisma.missionCommander.create({data: missionCommander});
  return res.json({message});
});

app.put('/mc/:id', async (req, res) => {
  const id = parseInt(req.params.id);

  await prisma.missionCommander.update({
    where: {
      id
    },
    data: {
      name: req.body.name,
      username: req.body.username,
      mainStack: req.body.mainStack,
      currentEnrollment: req.body.currentEnrollment,
      hasAzureCertification: req.body.hasAzureCertification
    }
  });

  return res.json({message: "Actualizado correctamente"});
});

app.delete('/mc/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  await prisma.missionCommander.delete({where: {id}});
  return res.json({message: "Eliminado correctamente"});
});

app.listen(port, () => {
  console.log(`Listening to requests on port ${port}`);
});