import express from "express"
import { JanusInteractor } from './src/create_janus_session.js';
import { UserManager } from './src/user_manager.js';

const app = express();
app.use(express.json())

const janusInteractor = new JanusInteractor()
const userManager = new UserManager(); 

app.get('/',(req,res)=>res.send("Hello Yogesh"))

app.get('/create', async (req,res)=>{

    let result ;
    if (janusInteractor.preMadeRooms.length == 0 ){
        result = await janusInteractor.createRoom();
    }
    else {
        result = janusInteractor.preMadeRooms.pop();
    }

     result = await janusInteractor.createRoom();
    res.send(`${result}`);
});

app.post('/register',(req,res)=>{
        userManager.add(req.body);
        res.send('registered');});

app.get('/get_users',(req,res)=>{
    res.send((userManager.userMap));
});

app.get('/dlt',(req,res)=>{
    console.log(req.body)
    res.send (`${userManager.delete(req.body,res)}`);
});


app.post("/confirm",(req,res)=>{
   let val = userManager.confirmation(req.body)
       res.send(val)
});

app.get('/recommendme',async (req,res)=>{

    let room = janusInteractor.preMadeRooms.pop()
    let val = await  userManager.recommendation(req.body.user)
    res.send({
        user:val,
        room:room
    })
    // res.send (`${userManager.delete(req.body,res)}`);
});

app.listen(4000,()=>console.log("server started"))
/// send users with their respective rooms 



