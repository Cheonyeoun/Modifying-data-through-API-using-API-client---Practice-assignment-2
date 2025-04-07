const express = require('express');
const { resolve } = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const menu = require('./models/menuSchema');
dotenv.config();


const app = express();
const PORT = process.env.PORT || 3010;

mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("✔️ MongoDB Connection SUccesssful!"))
.catch((err) => console.error("❌ Connection Failed!!"));
app.use(express.static('static'));

app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});


app.put('/menu/:id', async(req,res)=>{

  try{

    const {id} = req.params;
    const {name, description,price} = req.body;
    if (!name && !description && !price) {
      return res.status(400).json({ error: "At least one field (name, description, price) is required to update." });
    }
    const uItem = await menu.findByIdAndUpdate(id,
      {name, description,price},
      {new:true}
    );
    if(!uItem){
      return res.status(400).json({error:"Unable to find the Item!!"})
    }

    return res.status(200).json({message:"Update Successful!",uItem});
  }
  catch(error){
return res.status(500).json({error:"Failed To Update!!"});
  }
})

app.delete('/menu/:id', async(req,res)=>{

  try{

    const {id} = req.params;
    const DItem = await menu.findByIdAndDelete(id);
    if(!DItem){
      return res.status(400).json({error:"Unable to find the Item!!"})
    }

    return res.status(200).json({message:"Successfully Deleted!",DItem});
  }
  catch(error){
return res.status(500).json({error:"Failed To Delete!!"});
  }
})

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
