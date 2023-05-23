import  express from 'express';
import http from 'http';
import { Server } from 'socket.io'
import  cors from 'cors';



const app = express();
app.use( cors({ origin : "*", methods : ["POST", "GET"]}));

const socketCorsSetting = {
    origin : ['*']
}


const server = http.createServer(app);
const webSocket = new Server( server, { cors : socketCorsSetting, path : '/room'  } ); // adding middle ware and custome options



app.get( "/" , ( req  : express.Request , res : express.Response ) => {
    res.status(200).json( { "success"  : " Hi bitch you are lodu"})
})



webSocket.on( "connection", (socket) => {

    socket.on("message", (msg : string ) => {

        webSocket.emit("panda", msg ); // sends message to everyone 
    })

})


server.listen( 3000, () => {
    console.log("Listening on port 3000, bitch !");
})

