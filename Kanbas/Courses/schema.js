import mongoose from "mongoose";
const courseSchema = new mongoose.Schema(
    {
        _id: { type: String, required: true },
        name: { type: String, required: true },
        number: { type: String, required: true },
        startDate: { type: Date },
        endDate: { type: Date },
        department: { type: String },
        credits: { type: Number, default: 3 },
        description: String,
        image: String
    },
    { 
        collection: "courses",
        timestamps: true 
    }
);
export default courseSchema;