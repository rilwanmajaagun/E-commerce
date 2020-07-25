import multer from 'multer';

const storage = multer.memoryStorage({
    destination: async() => ''
});

const upload = multer({ storage }).single('image');

export default { upload };
