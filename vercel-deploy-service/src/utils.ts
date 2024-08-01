import { exec, spawn } from "child_process"
import path from "path"

export const projectBuild = (id: string) => {

    return new Promise((resolve) => {
        const child = exec(`cd ${path.join(__dirname, `output/${id}`)} && npm install && npm run build`)

        child.stdout?.on('data', function (data) {
            console.log('stdout: ' + data);
        })

        child.stderr?.on('error', function (error) {
            console.log('Error: ' + error);
        })

        child.on('close', function (code) {
            resolve("");
        })
    })

}