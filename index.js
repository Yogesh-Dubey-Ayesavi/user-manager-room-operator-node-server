import express from "express"
import {JanusInteractor} from './src/create_janus_session.js';
import {UserManager} from './src/user_manager.js'

const app = express();
app.use(express.json())


const janusInteractor = new JanusInteractor()
// app.use(express.urlencoded({extended: true}))
const userManager = new UserManager(); 
    

app.get('/',(req,res)=>res.send("Hello Yogesh"))

app.get('/create', async (req,res)=>{
    let result = await janusInteractor.createRoom();
    res.send(`Your room id is ${result.data.room}`);
});

app.post('/register',(req,res)=>{
        // console.log(req.body,req);
        userManager.add(req.body?.user);
        res.send('registered');});

app.get('/get_users',(req,res)=>{
    res.send(JSON.stringify(userManager.userList));
});

app.get('/dlt',(req,res)=>{
    console.log(req)
    res.send (`Your val is ${userManager.delete(req.body,res)}`);
});



app.listen(3000,()=>console.log("server started"))

