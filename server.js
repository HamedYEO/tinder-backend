//On configure un projet dans mongodb
//On intalle tout d'abord Express et Mongoose 
//ensuite on installe nodemon
//on lance "nodemon server.js"

import express from 'express' ;
import mongoose from 'mongoose';
import Cors from 'cors';
import Cards from './dbCards.js'

//App Config
const app = express()
const port = 8001
const connection_url = 'mongodb+srv://admin:aRksP97649LWY3N@cluster0.mtda7.mongodb.net/tinderdb?retryWrites=true&w=majority'

//Middlewares

app.use(express.json());
app.use(Cors());

//DB config 

mongoose.connect(connection_url, {
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
});

//API Endpoints

app.get('/', (req, res) => {
    res.send('Hello World!')
  })
app.post('/tinder/cards', (req, res)=> {
    const dbCard =  req.body;

    Cards.create(dbCard, (err, data)=>{
        if (err){
           res.status(500).send(err);
        } else{
            res.status(201).send(data);
        }
    })
});

app.get('/tinder/cards', (req,res)=>{
    const dbCard =  req.body;

    Cards.find(dbCard, (err, data)=>{
        if (err){
           res.status(500).send(err);
        } else{
            res.status(200).send(data);
        }
    })
    });

//Listeners
app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
  })






