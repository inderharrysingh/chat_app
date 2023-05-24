import  express from 'express';
import http from 'http';
import { Server } from 'socket.io'
import  cors from 'cors';



const app = express();
app.use( cors({ origin : "*", methods : ["POST", "GET"]}));

const socketCorsSetting = {
    origin : "*"
}


const httpServer = http.createServer(app);
const io = new Server( httpServer, { cors : socketCorsSetting  } ); // adding middle ware and custome options



app.get( "/" , ( req  : express.Request , res : express.Response ) => {
    res.status(200).json( { "success"  : " Hi bitch you are lodu"})
})



io.on( "connection", (socket) => {
    console.log('someone connected !');
    io.emit("message" , "What's your name bitch ");

    socket.on("message", (msg) => {
        console.log(msg);
        io.emit("message", "got it bro");
    })


    socket.on('disconnect', function() {
        console.log('Client disconnected.');
    });

})

httpServer.listen( 3000, () => {
    console.log("Listening on port 3000, bitch !");
})

