import express from 'express'
import cors from 'cors'

import user from './routes/userRoute'
import pandaAssistent from './routes/pandaAssistant'

const app = express();
app.use(express.json());
app.use(cors())
app.use(user)
app.use(pandaAssistent)

app.get("/", (req, res) => {
  res.send({message: "Udało się HEHEHEH m"});
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});