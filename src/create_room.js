import { Janus,VideoRoomPublisherJanusPlugin } from "@techteamer/janus-api";



export async function createRoom(publisher){
    return await publisher.createRoom();
}