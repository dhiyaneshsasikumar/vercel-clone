# Vercel Clone Project

This project is a Vercel clone built using TypeScript, Redis, and AWS S3. The primary functionality allows users to upload a React project from a GitHub repository, build it, and serve the built files locally.

## Features

- Upload service to upload files from a GitHub repo to an S3 bucket
- Deploy service to build the project in the S3 bucket
- Request handler service to serve the built files
- Uses Redis for queue management
- Works entirely on a local setup with live link pointing to localhost

## Prerequisites

To run this project, you need the following:

- Node.js installed
- Redis server running
- AWS account with access to S3

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/dhiyanesh-cyber/vercel-clone.git
cd vercel-clone
```

### 2. Install Dependencies

Install the necessary dependencies for all services:

```sh
npm install
```

### 3. Configure AWS

Set up your AWS credentials and S3 bucket configurations. You can do this by setting environment variables or using an AWS configuration file. Make sure to replace the S3 credentials in each service with your own credentials.

### 4. Create and Configure `.env.local` File

Create an `.env.local` file in the root directory of your project with the following content, replacing the placeholders with your actual credentials:

```plaintext
S3_BUCKET_NAME=your-bucket-name
S3_ACCESS_KEY_ID=your-access-key-id
S3_SECRET_ACCESS_KEY=your-secret-access-key
```

### 5. Start the Services

#### Upload Service

This service uploads files from a GitHub repository to your S3 bucket.

```sh
tsc -b
node dist/index.ts
```

#### Deploy Service

This service builds the project in the S3 bucket and stores the built files in another location within the same bucket.

```sh
tsc -b
node dist/index.ts
```

#### Request Handler

This service handles requests for the built files.

```sh
tsc -b
node dist/index.ts
```

#### Frontend

Start the frontend to interact with the services.

```sh
npm run dev
```

## Running the Project

After starting all the services, you need to point the live link to your localhost by modifying your hosts file based on your operating system.

### Modifying the Hosts File

#### Windows

1. Open Notepad as an administrator.
2. Open the file `C:\Windows\System32\drivers\etc\hosts`.
3. Add a new entry for your live link pointing to `127.0.0.1`.

   ```plaintext
   127.0.0.1 your_deploy_id.vercel-clone.com
   ```

4. Replace `your_deploy_id` with your actual deploy id.
5. Save the file.

#### macOS / Linux

1. Open a terminal.
2. Open the hosts file using a text editor with sudo privileges.

   ```sh
   sudo nano /etc/hosts
   ```

3. Add a new entry for your live link pointing to `127.0.0.1`.

   ```plaintext
   127.0.0.1 your_deploy_id.vercel-clone.com
   ```

4. Replace `your_deploy_id` with your actual deploy id.
5. Save the file and exit the editor.

## Usage

1. Paste the GitHub repository link of a React project into the frontend.
2. The Upload Service will upload the files to your S3 bucket.
3. The Deploy Service will build the project and store the built files in S3.
4. The Request Handler will serve the built files.
5. Access your live project via the live link pointed to your localhost.

