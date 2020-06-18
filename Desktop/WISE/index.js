// Creates the server and manages all the GET/POST requests.
const http = require("http"),
    fs = require("fs");
MIMETypes = {
    "html": "text/html",
    "jpg": "image/jpeg",
    "ico": "image/vnd.microsoft.icon",
    "js": "text/javascript",
    "png": "image/png",
    "ttf": "font/ttf",
    "css": "text/css"
}, // An object which holds all the different file endings and what to put in the content header when I send it over to the frontend.
    userLoggedIn = {} // A placeholder to tell whether we're logged in or not
// it will hold all the user's data once we've logged in. For now, this is empty, because we haven't logged in yet.
let serv = http.createServer((req, res) => {
    let PathToRead = req.url;
    if (req.method == "GET") {
        if (req.url == "/") {
            PathToRead = "/index.html";
        } 
        fs.readFile("Frontend" + PathToRead, (err, message) => {
            if (err) {
                res.writeHead(404, { "Content-Type": MIMETypes["html"] });
                fs.readFile("Frontend/404.html", (err, message) => {
                    if (err)
                        throw "404 Page Not Loading";
                    res.write(message);
                    res.end();
                })
            } else {
                console.log(PathToRead);
                let MType = MIMETypes[PathToRead.split(".")[1]] || "application/octet-stream";
                console.log(MType);
                res.writeHead(200, { "Content-Type": MType });
                res.write(message);
                res.end();
            }
        })
    } 
})
serv.listen(3030, "127.0.0.1", () => {
    console.log("Running at localhost:3030.");
})