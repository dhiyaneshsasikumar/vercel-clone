import express from "express";
import { getFileFromBucket } from "./aws";
import mime from "mime-types";

const app = express();

app.get("/*", async (req, res) => {
    const hostName = req.hostname; // -> 123.vercel.com/index.html
    const id = hostName.split('.')[0]; // -> [123, vercel, com]
    const path = req.path;
    console.log(`dist/${id}${path}`);
    const response = await getFileFromBucket(`dist/${id}${path}`);

    const mimeType = mime.lookup(path) || 'application/octet-stream'; 
    res.set('Content-Type', mimeType);
    res.send(response.Body);
});

app.listen(3001, () => {
    console.log('Server is listening on port 3001');
});
