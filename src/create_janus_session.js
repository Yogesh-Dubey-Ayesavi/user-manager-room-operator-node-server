import {Janus,JanusConfig,VideoRoomPublisherJanusPlugin,JanusRoomConfig} from  'janus-api';

export class JanusInteractor{

    constructor() {
        this.janus = new Janus(new JanusConfig({
            url: 'wss://proficientio.top/websocket',
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
    }

    async createPreMade(){
        for (let i = 0 ;i<100;i++){
            this.preMadeRooms.push(await this.publisher.createRoom())
            console.log('rooms created');
        }

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