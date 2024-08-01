import { S3 } from "aws-sdk";
import { S3_ACCESS_KEY_ID, S3_BUCKET_NAME, S3_SECRET_ACCESS_KEY } from "./config";

const s3 = new S3({
    accessKeyId: S3_ACCESS_KEY_ID,
    secretAccessKey: S3_SECRET_ACCESS_KEY
})


export async function getFileFromBucket(path: string) {
    const response = await s3.getObject({
        Bucket: S3_BUCKET_NAME,
        Key: path
    }).promise()



    return response;
}