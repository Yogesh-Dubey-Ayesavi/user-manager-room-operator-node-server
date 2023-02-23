import {Janus,JanusConfig,VideoRoomPublisherJanusPlugin,JanusRoomConfig} from  'janus-api';
import { eventEmitter } from '../index.js';
export class JanusInteractor{

    constructor() {
        this.janus = new Janus(new JanusConfig({
            url: 'ws://13.235.79.20:8188',
            keepAliveIntervalMs: 30000,
            options: {
            rejectUnauthorized: false
            },
        }),console);
        this.publisher = undefined;
        this.preMadeRooms = []
        this.janusConnection = undefined;
        this.roomConfig = new JanusRoomConfig({
            codec: 'vp8,vp9,h264',
            record: false,
            id : "uid1-uid2"
            })
            this.init();
            eventEmitter.on('RoomCreation',()=>{
                if (this.preMadeRooms.length < 5){
                    this.createPreMade();
                }
            });
        }

     randomIntFromInterval(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
  

    async createPreMade(){
        console.log('started premade');
    //    try{ // setTimeout(()=>{
                 for (let i = 0 ;i<5;i++){
                    let room = await this.publisher.createRoom();
            this.preMadeRooms.push(room.data.room);
        // this.preMadeRooms.push(this.randomIntFromInterval(432432432432,45242373243))

        }
            
        // },300)

    }

    async init(){
        this.janusConnection =  await this.janus.connect();
        this.createPublisher();
    }

    async createPublisher(){
        this.publisher = new VideoRoomPublisherJanusPlugin(this.roomConfig, 'operator', console, false);
        await this.janusConnection.addPlugin(this.publisher)
        this.createPreMade();

    }

    async createRoom(){
        return await this.publisher.createRoom();
    }




}