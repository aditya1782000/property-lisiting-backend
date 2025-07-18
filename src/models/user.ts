import mongoose, { Document, Model, Schema } from 'mongoose';
import data from '../../enum';

export interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    hash: string;
    role: string;
}

const UserSchema: Schema<IUser> = new Schema<IUser>(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
        },
        hash: String,
        role: {
            type: String,
            enum: data.role,
        },
    },
    { timestamps: { createdAt: 'dCreatedAt', updatedAt: 'dUpdatedAt' } },
);

const User: Model<IUser> = mongoose.model<IUser>('users', UserSchema);

export default User;
