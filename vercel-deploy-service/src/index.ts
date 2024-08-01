import { createClient, commandOptions } from "redis";
import { copyFinalDistFolderToS3, downloadS3Folder } from "./aws";
import { projectBuild } from "./utils";
const subscriber = createClient();
subscriber.connect();

const publisher = createClient();
publisher.connect();

async function main() {
    while (1) {
        const response = await subscriber.brPop(
            commandOptions({ isolated: true }),
            'build-queue',
            0
        )


        //@ts-ignore
        const id = response.element;


        await downloadS3Folder(`output/${id}`);
        console.log("Downloaded");
        await projectBuild(id);
        await copyFinalDistFolderToS3(id);
        console.log("Uploaded");
        publisher.hSet("status", id, "deployed")



    }
}

main();