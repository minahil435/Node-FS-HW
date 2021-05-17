const http = require("http");
const fs = require("fs");

http.createServer(function (request, response) {

    if (request.url === "/create-directory" && request.method === "POST") {

        fs.mkdir("content", function (error) {
            if (error) {
                response.end(error)

            } else {
                return response.end("content folder created");
            }
        })
    }


    if (request.url === "/create-text" && request.method === "POST") {
        let body = ""

        request.on("data", function (data) {
            body += data.toString();
        });
        request.on("end", function () {
            let parsed = JSON.parse(body);

            fs.writeFile("randomText.txt", parsed.message, function (err) {
                if (err) {
                    response.end("err");
                } else {
                    response.end("File Created");
                }
            });
        });
    }

    if (request.url === "/new-folder-and-file") {

        fs.readFile("randomText.txt", function (error, data) {
            if (error) {
                response.end("error")

            } else {
                // response.writeHead(200, { "content-Type": "text/html" });
                // response.write(data);
                // return response.end("successful");
                //verbage.txt
                fs.writeFile("content/verbage.txt", data, function (err) {
                    if (err) {
                        response.end("err");
                    } else {
                        response.end("verbage.txt created");
                    }
                });

            }
        })
    }

}).listen(3000, function () {
    console.log("server started");
});

function greet() {
    fs.unlink("content/verbage.txt", function (err) {
        if (err) { }
        else {

            fs.rmdir("content", function (err) {
            });
        }
    });
}
setTimeout(greet, 7000);