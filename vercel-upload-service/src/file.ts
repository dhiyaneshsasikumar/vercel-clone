import { response } from 'express';
import fs from 'fs';
import path from 'path';

export const getAllFiles = (folderPath: string) => {
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