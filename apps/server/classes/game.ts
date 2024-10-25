import { Server, Socket } from "socket.io"

export class Game{
    gameStatus:"not-started"|"in-progress"|"finished"
    gameId:string
    player:{id:string,score:number,name:string}[]
    io:Server
    gameHost:string;
    paragraph:string;
    

    constructor(id:string,io:Server,host:string){
        this.gameId=id;
        this.player=[]
        this.io=io
        this.gameHost=host
        this.gameStatus="not-started"
        this.paragraph=""
    }

    setuplisteners(socket:Socket){}
    joinPlayer(id:string,name:string,socket:Socket){
        if(this.gameStatus==="in-progress") return socket.emit("error","Game has already started ,please wait for it to end")

            this.player.push({id,name,score:0})
            this.io.to(this.gameId).emit("player-joined",{
                id,name,score:0
            })
            socket.emit("player",this.player)
            socket.emit("new-host",this.gameHost)

            this.setuplisteners(socket)
   
        }
}
