import mongoose, { model, models, Schema } from "mongoose";
import bcrypt from "bcryptjs";

export const VIDEO_DIMENTION = {
    width: 1080,
    height: 1920
} as const;

export interface IVideo {
    _id?: mongoose.Types.ObjectId;
    title: string;
    description: string;
    videoUrl: string;
    thumbnailUrl: string;
    controls: boolean;
    transformations: {
        height: number;
        width: number;
        quality: number;
    }
    createdAt?: Date;
    updatedAt?: Date;
}
const videoSchema = new Schema<IVideo>({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    videoUrl: {
        type: String,
        required: true,
    },
    thumbnailUrl: {
        type: String,
        required: true,
    },
    controls: {
        type: Boolean,
        required: true,
    },
    transformations: {
        height: {
            type: Number,
            required: true,
            default: VIDEO_DIMENTION.height
        },
        width: {
            type: Number,
            required: true,
            default: VIDEO_DIMENTION.width,
        },
        quality: {
            type: Number,
            required: true,
            min:1,
            max:100
        }
    }
},
    {
        timestamps: true
    }
);

export const Video = models?.Video || model<IVideo>("Video", videoSchema);

export default Video;