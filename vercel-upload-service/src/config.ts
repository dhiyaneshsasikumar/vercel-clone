import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

export const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME as string;
export const S3_ACCESS_KEY_ID = process.env.S3_ACCESS_KEY_ID as string;
export const S3_SECRET_ACCESS_KEY = process.env.S3_SECRET_ACCESS_KEY as string;
