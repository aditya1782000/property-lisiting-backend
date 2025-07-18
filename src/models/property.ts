import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IProperty extends Document {
    title: string;
    description: string;
    price: number;
    location: string;
    images: string[];
    admin: mongoose.Types.ObjectId;
}

const PropertySchema: Schema<IProperty> = new Schema<IProperty>(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        images: [String],
        admin: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
        },
    },
    { timestamps: { createdAt: 'dCreatedAt', updatedAt: 'dUpdatedAt' } },
);

const Property: Model<IProperty> = mongoose.model<IProperty>(
    'property',
    PropertySchema,
);

export default Property;
