const Server = require("./Server")
const { login, signup, message } = require("./controller");

const app = new Server();

app.route("login", login);
app.route("signup", signup);
app.route("message",message);


app.listen(3000, "localhost");













