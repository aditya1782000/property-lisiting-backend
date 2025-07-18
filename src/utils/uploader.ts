/* eslint-disable @typescript-eslint/no-explicit-any */
import multer from './multer';

const imageInstance = multer.createUploadInstance('uploadFile', 10, false);

interface Services {
    uploadFile: (fileType?: string) => (req: any, res: any, next: any) => any;
}

const services: Services = {
    uploadFile: (fileType = 'image') => {
        return (req, res, next) => {
            if (fileType === 'image') {
                return imageInstance(req, res, function (error: any) {
                    if (error) {
                        return res.status(400).json({
                            success: false,
                            message: error.message,
                        });
                    }
                    return next(null, null);
                });
            } else {
                return next(null, null);
            }
        };
    },
};

export default services;
