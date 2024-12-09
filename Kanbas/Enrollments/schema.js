import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema(
    {
        user: { 
            type: String,
            required: true,
            ref: "UserModel"
        },
        course: { 
            type: String,
            required: true,
            ref: "CourseModel"
        },
        status: {
            type: String,
            enum: ["ENROLLED", "DROPPED", "COMPLETED"],
            default: "ENROLLED"
        }
    },
    { 
        collection: "enrollments",
        timestamps: true 
    }
);


enrollmentSchema.index({ user: 1, course: 1 }, { unique: true });

export default enrollmentSchema;