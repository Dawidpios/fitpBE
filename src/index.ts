import express from 'express'

import user from './routes/userRoute'

const app = express();
app.use(express.json());

app.use(user)
app.get("/", (req, res) => {
  res.send({message: "Udało się HEHEHEH m"});
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});