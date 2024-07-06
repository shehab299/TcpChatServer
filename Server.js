const net = require("net");
const Router = require("./Router");
const { Socket } = require("dgram");




class Server{

    constructor()
    {
        this.router = new Router(this);
        this.server = net.createServer(this.handler.bind(this));
        this.sockets = new Map();
        this.usernames = new Map();
    }


    handler(socket){

        socket.on("data" , requestHandler.bind(this));
        socket.on("end" , closeHandler.bind(this));
        socket.on("error" , closeHandler.bind(this));

        function closeHandler()
        {
            if(!this.usernames.get(socket))
            {
                const username = this.usernames.get(socket);
                this.sockets.delete(username);
                this.usernames.delete(socket);
            }
        }
        
        function requestHandler(data)
        {    
            try
            {
                const request = JSON.parse(data);
                this.router.navigate(request.type, request, socket);
            }
            catch(error){
                socket.write("Invalid JSON Request");
            }

        }
    }

    route(type, callback) {
        this.router.bind(type, callback);
    }

    listen(port, host){
        this.server.listen(port, host);
    }


    registerSocket(client, username){
        this.sockets.set(username, client);
        this.usernames.set(client, username);
    }

    
    broadcast(message, username){
        this.sockets.forEach((socket, user) => {
            socket.write(`message-${username}-${message}`);
        });
    }

    send(message, username){
        this.sockets.get(username).write(message);
    }


    isRegistered(username, client){

        return true;

        if(this.sockets.get(username) === client)
            return true;
        else
            return false;
    }

    getUserName(socket){
        return this.usernames.get(socket); 
    }
};


module.exports = Server;

