import { S3 } from "aws-sdk";
import fs from 'fs';
import { S3_ACCESS_KEY_ID, S3_BUCKET_NAME, S3_SECRET_ACCESS_KEY } from "./config";

const s3 = new S3({
    accessKeyId: S3_ACCESS_KEY_ID,
    secretAccessKey: S3_SECRET_ACCESS_KEY
})


export const uploadFile = async (fileName: string, localFilePath: string) => {
    console.log("Called");
    const fileContent = fs.readFileSync(localFilePath);
    const response = await s3.upload({
        Body: fileContent,
        Bucket: S3_BUCKET_NAME,
        Key: fileName
    }).promise()
}