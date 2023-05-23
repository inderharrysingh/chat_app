import * as express from 'express';
import * as http from 'http';
const app = express.default();
const server = http.createServer(app);
app.get("/", (req, res) => {
    res.status(200).json({ "success": " Hi bitch you are lodu" });
});
server.listen(3000, () => {
    console.log("Listening on port 3000, bitch !");
});
//# sourceMappingURL=server.js.map