class Router {
    constructor(server) {
        this.routes = {};
        this.server = server;
    }

    bind(type, callback) {

        if(!type || !callback) {
            throw new Error('Type and callback required');
        }

        this.routes[type] = callback;
    }

    navigate(type, data ,socket) {

        if(!this.routes[type]) {
            socket.write("Endpoint Not Found");
        }

        this.routes[type](data, socket, this.server);
    }
}

module.exports = Router;