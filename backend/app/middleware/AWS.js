require("dotenv").config();
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const s3Client = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

let uploadFile = async (file) => {
  return new Promise(async (resolve, reject) => {
    const uploadParam = {
      ACL: "public-read",
      Bucket: "antrorse-market-place",
      Key: file.originalname,
      Body: file.buffer,
    };

    try {
      const command = new PutObjectCommand(uploadParam);
      const data = await s3Client.send(command);
      resolve(`https://${uploadParam.Bucket}.s3.${s3Client.config.region}.amazonaws.com/${uploadParam.Key}`);
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = { uploadFile };
