import express from "express";
import cors from "cors";

const bcrypt = require("bcrypt")

const PORT = 8080;
const app = express();
const database = { data: "Hello World" };
const saltRounds = 10
let salt:string

app.use(cors());
app.use(express.json());


const verifiedData = {data:"",hash:""}

const  generateSalt = async() => {
  salt = await bcrypt.genSalt(saltRounds)
}

const hashData = async (data: string) => {
  await generateSalt();
  verifiedData.hash = await bcrypt.hash(data,salt)
}

// Routes

app.get("/", (req, res) => {
  res.json(database);
});

app.post("/", (req, res) => {
  database.data = req.body.data;
  verifiedData.data = req.body.data;
  hashData(req.body.data)
  res.sendStatus(200);
});


const verify = async(data: string) => {
    const client_hash = await bcrypt.hash(data,salt)
    if (client_hash === verifiedData.hash){
      verifiedData.data = data;
      return true
    }
   else{
    return false
   }
}

app.post("/verify", (req, res) => { 
    verify(req.body.data).then((ans=> {
      if (ans){
        res.sendStatus(200)
      }
      else{
        res.sendStatus(203)
      }
     
    }))
})

//sending the last trusted data 
app.get("/recover", (req, res) => { 
  res.json(verifiedData.data)
})

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
