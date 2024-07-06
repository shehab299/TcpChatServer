const { promisify } = require('util');


function login(data, client, server){

    const username = data.username;
    const password = data.password;

    if(!username || !password){
        client.write("failure");
    }

    server.registerSocket(client, username);
    client.write("success");
}


function signup(data, client, server){

    const username = data.username;
    const password = data.password;

    if(!username || !password){
        client.write("Invalid Request");
    }

    // add to database
}


function message(data, client, server){

    const message = data.message;
    const username = server.getUserName(client);
    
    console.log(username);

    if(!username){
        client.write("Unauthorized");
    }

    server.broadcast(message, username);
}

module.exports = {
    login,
    signup,
    message
}