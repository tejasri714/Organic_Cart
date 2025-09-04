import multer from 'multer';

// ✅ Using memory storage because we upload to Cloudinary, not local disk
export const upload = multer({
  storage: multer.diskStorage({}),
});
