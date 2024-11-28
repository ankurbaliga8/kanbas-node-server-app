import model from "./model.js";

// Find all users
export const findAllUsers = () => model.find();

// Find user by ID
export const findUserById = (userId) => model.findById(userId);

// Find user by username
export const findUserByUsername = (username) => model.findOne({ username });

// Find user by credentials
export const findUserByCredentials = (username, password) =>
    model.findOne({ username, password });

// Update a user by ID
export const updateUser = (userId, user) =>
    model.updateOne({ _id: userId }, { $set: user });

// Delete a user by ID
export const deleteUser = (userId) => model.deleteOne({ _id: userId });

// Find users by role
export const findUsersByRole = (role) => model.find({ role });

// Find users by partial name
export const findUsersByPartialName = (partialName) => {
    const regex = new RegExp(partialName, "i"); // Case-insensitive search
    return model.find({
        $or: [{ firstName: { $regex: regex } }, { lastName: { $regex: regex } }],
    });
};

// Create a new user
export const createUser = (user) => {
    delete user._id; // Ensure no conflicting `_id` is passed
    return model.create(user);
};

