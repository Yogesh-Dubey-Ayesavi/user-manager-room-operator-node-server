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
    let result ;
    if (janusInteractor.preMadeRooms.length == 0 ){
        result = await janusInteractor.createRoom();
    }
    else {
        result = janusInteractor.preMadeRooms.pop();
    }
    res.send(`${result.data.room}`);
});

app.post('/register',(req,res)=>{
        // console.log(req.body,req);
        userManager.add(req.body?.user);
        res.send('registered');});

app.get('/get_users',(req,res)=>{
    res.send(JSON.stringify(userManager.userList));
});

app.get('/dlt',(req,res)=>{
    res.send (`${userManager.delete(req.body,res)}`);
});



app.listen(4000,()=>console.log("server started"))

