const net = require("net");
const Router = require("./Router");




class Server{

    constructor()
    {
        this.router = new Router(this);
        this.server = net.createServer(this.handler.bind(this));
        this.sockets = {};
        this.usernames = {};
    }


    handler(socket){

        socket.on("data" , requestHandler.bind(this));
        socket.on("end" , closeHandler.bind(this));
        socket.on("error" , closeHandler.bind(this));

        function closeHandler()
        {
            if(!this.usernames[socket])
            {
                const username = this.usernames[socket];
                this.usernames[socket] = undefined;
                this.sockets[username] = undefined;
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
                socket.write("Invalid Request");
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
        this.sockets[username] = client;
        this.usernames[client] = username;
    }

    
    broadcast(message, username){
        Object.keys(this.sockets).forEach((key) => {
            this.sockets[key].write(`message-${username}-${message}`);
        });
    }

    send(message, username){
        this.sockets[username].write(message);
    }


    isRegistered(username, client){

        return true;

        if(this.sockets[username] === client)
            return true;
        else
            return false;
    }

    getUserName(socket){
        return this.usernames[socket]; 
    }
};


module.exports = Server;

