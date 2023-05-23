import * as express from 'express';
import * as http from 'http';
import { Server } from 'socket.io';
import * as cors from 'cors';



const app = express.default();
app.use( cors.default({ origin : "*", methods : ["POST", "GET"]}));

const socketCorsSetting = {
    origin : ['*']
}


const server = http.createServer(app);
const webSocket = new Server( server, { cors : socketCorsSetting, path : '/room'  } );



app.get( "/" , ( req  : express.Request , res : express.Response ) => {
    res.status(200).json( { "success"  : " Hi bitch you are lodu"})
})


webSocket.on( "connection", (socket) => {

})


server.listen( 3000, () => {
    console.log("Listening on port 3000, bitch !");
})

