import express from 'express'

import user from './routes/userRoute'
import { authUser } from './controllers/userController';

const app = express();
app.use(express.json());

app.use(user)
app.use(authUser)

app.get("/", (req, res) => {
  res.send({message: "Udało się HEHEHEH m"});
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});