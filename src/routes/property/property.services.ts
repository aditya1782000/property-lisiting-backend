import { Request } from 'express';
import { AsyncResponseType } from '../../types/async';
import mongoose from 'mongoose';
import {
    deleteFileFromS3,
    extractS3Key,
    uploadFileToS3,
} from '../../utils/aws';
import Property from '../../models/property';

export const createProperty = async (
    req: Request,
    title: string,
    description: string,
    price: number,
    location: string,
    admin: mongoose.Types.ObjectId,
): Promise<AsyncResponseType> => {
    try {
        let imagesUrl: string[] = [];

        if (req.files && Array.isArray(req.files) && req.files.length > 0) {
            for (const file of req.files) {
                const uploadData = await uploadFileToS3(
                    file,
                    Date.now().toString() + file.originalname,
                    'property',
                );
                imagesUrl.push(uploadData.Location);
            }
        }

        await Property.create({
            title,
            description,
            price,
            location,
            images: imagesUrl,
            admin,
        });

        return {
            statusCode: 200,
            success: true,
            message: 'Property Listed successfully',
        };
    } catch (error: unknown) {
        if (error instanceof Error) {
            return {
                statusCode: 500,
                success: false,
                message: error.message || 'Something went wrong',
            };
        }

        return {
            statusCode: 500,
            success: false,
            message: 'Something went wrong',
        };
    }
};

export const editProperty = async (
    id: string,
    req: Request,
    title: string,
    description: string,
    price: number,
    location: string,
    admin: mongoose.Types.ObjectId,
): Promise<AsyncResponseType> => {
    try {
        const property = await Property.findById(id);

        if (!property) {
            return {
                statusCode: 404,
                success: false,
                message: 'Property not found',
            };
        }

        if (admin.toString() !== property.admin.toString()) {
            return {
                statusCode: 401,
                success: false,
                message: 'Unauthoized access',
            };
        }

        let imagesUrl: string[] = [];

        if (req.files && Array.isArray(req.files) && req.files.length > 0) {
            for (const file of req.files) {
                const uploadData = await uploadFileToS3(
                    file,
                    Date.now().toString() + file.originalname,
                    'property',
                );
                imagesUrl.push(uploadData.Location);
            }
        }

        await Property.findByIdAndUpdate(id, {
            title,
            description,
            price,
            location,
            images: imagesUrl,
        });

        return {
            statusCode: 200,
            success: true,
            message: 'Property Listed successfully',
        };
    } catch (error: unknown) {
        if (error instanceof Error) {
            return {
                statusCode: 500,
                success: false,
                message: error.message || 'Something went wrong',
            };
        }

        return {
            statusCode: 500,
            success: false,
            message: 'Something went wrong',
        };
    }
};

export const deleteProperty = async (
    id: string,
    admin: mongoose.Types.ObjectId,
): Promise<AsyncResponseType> => {
    try {
        const property = await Property.findById(id);

        if (!property) {
            return {
                statusCode: 404,
                success: false,
                message: 'Property not found',
            };
        }

        if (admin.toString() !== property.admin.toString()) {
            return {
                statusCode: 401,
                success: false,
                message: 'Unauthoized access',
            };
        }

        if (property.images) {
            for (const imageUrl of property.images) {
                const key = extractS3Key(imageUrl);
                await deleteFileFromS3(key);
            }
        }

        await Property.findByIdAndDelete(id);

        return {
            statusCode: 200,
            success: false,
            message: 'Property Deleted successfully',
        };
    } catch (error: unknown) {
        if (error instanceof Error) {
            return {
                statusCode: 500,
                success: false,
                message: error.message || 'Something went wrong',
            };
        }

        return {
            statusCode: 500,
            success: false,
            message: 'Something went wrong',
        };
    }
};

export const listAdminProperties = async (
    skip: number,
    limit: number,
    admin: mongoose.Types.ObjectId,
): Promise<AsyncResponseType> => {
    try {
        const properties = await Property.find({ id: admin })
            .skip(skip)
            .limit(limit)
            .lean();

        return {
            statusCode: 200,
            success: true,
            message: 'Properties fetched successfully',
            data: properties,
        };
    } catch (error: unknown) {
        if (error instanceof Error) {
            return {
                statusCode: 500,
                success: false,
                message: error.message || 'Something went wrong',
            };
        }

        return {
            statusCode: 500,
            success: false,
            message: 'Something went wrong',
        };
    }
};
