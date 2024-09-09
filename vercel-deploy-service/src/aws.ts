import { S3 } from "aws-sdk";
import fs from "fs";
import path from "path";
import { S3_ACCESS_KEY_ID, S3_BUCKET_NAME, S3_SECRET_ACCESS_KEY } from "./config";

const s3 = new S3({
    accessKeyId: S3_ACCESS_KEY_ID,
    secretAccessKey: S3_SECRET_ACCESS_KEY
})

export async function downloadS3Folder(prefix: string) {
    const allFiles = await s3.listObjectsV2({
        Bucket: S3_BUCKET_NAME,
        Prefix: prefix
    }).promise();

    console.log(allFiles);


    const allPromises = allFiles.Contents?.map(async ({ Key }) => {
        return new Promise(async (resolve) => {
            if (!Key) {
                resolve("");
                return;
            }
            const finalOutputPath = path.join(__dirname, Key);
            const outputFile = fs.createWriteStream(finalOutputPath);
            const dirName = path.dirname(finalOutputPath);
            if (!fs.existsSync(dirName)) {
                fs.mkdirSync(dirName, { recursive: true });
            }
            s3.getObject({
                Bucket: "my.example.vercel.bucket",
                Key
            }).createReadStream().pipe(outputFile).on("finish", () => {
                resolve("");
            })
        })
    }) || []
    console.log("awaiting");

    await Promise.all(allPromises?.filter(x => x !== undefined));
}


export async function copyFinalDistFolderToS3(id: string) {
    const distFolderPath = path.join(__dirname, `output/${id}/dist`);
    const buildFolderPath = path.join(__dirname, `output/${id}/build`);

    const folderToUse = fs.existsSync(distFolderPath) ? distFolderPath : buildFolderPath;

    const files = getAllFiles(folderToUse);

    for (const file of files) {
        const relativePath = file.slice(folderToUse.length + 1);
        await uploadFile(`dist/${id}/` + relativePath, file);
    }
}



const getAllFiles = (folderPath: string) => {
    let response: string[] = [];

    const allFilesAndFolders = fs.readdirSync(folderPath);
    allFilesAndFolders.forEach(file => {
        const fullFilePath = path.join(folderPath, file)
        if (fs.statSync(fullFilePath).isDirectory()) {
            response = response.concat(getAllFiles(fullFilePath))
        } else {
            const normalizedPath = fullFilePath.replace(/\\/g, '/');
            response.push(normalizedPath);
        }
    })


    return response;
}


const uploadFile = async (fileName: string, localFilePath: string) => {
    console.log("Called");
    const fileContent = fs.readFileSync(localFilePath);
    const response = await s3.upload({
        Body: fileContent,
        Bucket: "my.example.vercel.bucket",
        Key: fileName
    }).promise()
}