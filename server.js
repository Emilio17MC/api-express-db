const express = require('express');
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

// Require para usar Prisma
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

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

app.listen(port, () => {
  console.log(`Listening to requests on port ${port}`);
});