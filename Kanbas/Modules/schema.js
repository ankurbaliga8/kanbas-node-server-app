import mongoose from "mongoose";
const moduleSchema = new mongoose.Schema(
    {
        _id: { type: String, required: true },
        name: { type: String, required: true },
        description: String,
        course: { 
            type: String,
            required: true,
            ref: "CourseModel"
        },
        lessons: [{
            _id: { type: String, required: true },
            name: { type: String, required: true },
            description: String,
            module: { type: String, required: true }
        }]
    },
    { 
        collection: "modules",
        timestamps: true 
    }
);
export default moduleSchema;