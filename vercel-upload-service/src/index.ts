import express from 'express';
import cors from "cors";
import { generate } from "./utils"
import simpleGit from 'simple-git'
import path from 'path';
import { getAllFiles } from './file';
import { uploadFile } from './aws';
import { createClient } from 'redis';
const publisher = createClient()
publisher.connect();

const subscriber = createClient()
subscriber.connect();


const app = express();
app.use(cors());
app.use(express.json());


app.post("/deploy", async (req, res) => {
    const repoUrl = req.body.repoUrl;
    const id = generate();
    const outputPath = path.join(__dirname, `output/${id}`);

    try {
        // Clone the repository
        await simpleGit().clone(repoUrl, outputPath);

        // Get all files in the cloned repository
        const files = getAllFiles(outputPath);

        // Upload files and wait for all uploads to complete
        await Promise.all(files.map(file => uploadFile(file.slice(__dirname.length + 1), file)));

        // Add to the build queue and set the status
        await publisher.lPush("build-queue", id);
        await publisher.hSet("status", id, "uploaded");

        // Respond with the ID
        res.json({
            id: id
        });
    } catch (error) {
        // Handle errors
        console.error("Error during deployment:", error);
        res.status(500).json({
            error: "Failed to deploy"
        });
    }
});



app.get("/status", async (req, res) => {
    const id = req.query.id;
    const response = await subscriber.hGet("status", id as string);

    res.json({
        status: response
    })
})

app.listen(3000)