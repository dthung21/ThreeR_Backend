const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const userRoutes = require("./routes/useRoutes")

const app = express();
require("dotenv").config()

app.use(cors())
app.use(express.json())

app.use("/api/auth",userRoutes)

console.log(process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,

})
.then(() => {
  console.log("DB connection successfull")
})
.catch((err) => {
  console.log(err.message)
})

const server = app.listen(process.env.PORT,() =>{
  console.log(`Server Started on Port ${process.env.PORT}`)
})