import express from 'express'

// import user from './routes/user.ts'

// import { PrismaClient } from "@prisma/client";

const app = express();
app.use(express.json());

// const prisma = new PrismaClient()

app.get("/", (req, res) => {
  res.send({message: "Udało się HEHEHEH m"});
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});