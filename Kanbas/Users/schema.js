import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    username: { 
        type: String, 
        required: true, 
        unique: true
    },
    password: { 
        type: String, 
        required: true
    },
    firstName: { 
        type: String,
        required: true
    },
    lastName: { 
        type: String,
        required: true
    },
    email: { 
        type: String,
        required: true,
        unique: true
    },
    dob: { type: String },  
    role: {
        type: String,
        enum: ["FACULTY", "STUDENT", "ADMIN", "USER"],
        default: "USER"
    },
    loginId: { 
        type: String
    },
    section: String,
    lastActivity: { type: String },  
    totalActivity: String
},
{ 
    collection: "users",
    timestamps: true 
});

export default userSchema;