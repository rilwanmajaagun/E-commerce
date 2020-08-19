import 'dotenv/config';
import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET
});

const uploadImage = async (file) => {
    try {
        const myFile = file.originalname.split('.');
        const fileType = myFile[myFile.length - 1];
        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `${uuidv4()}.${fileType}`,
            Body: file.buffer,
            ACL: 'public-read'
        };
        const datas = await s3.upload(params).promise();
        const picture = await datas;
        return picture;
    } catch (error) {
        return error;
    }
};

export default {
    uploadImage
};
