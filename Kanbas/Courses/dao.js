import model from "./model.js";

export async function findAllCourses() {
    try {
        return await model.find();
    } catch (error) {
        console.error("Error in findAllCourses:", error);
        throw error;
    }
}

export async function createCourse(course) {
    try {
        // Generate a simple numeric ID if not provided
        const courseToCreate = {
            ...course,
            _id: course._id || Date.now().toString()
        };
        return await model.create(courseToCreate);
    } catch (error) {
        console.error("Error in createCourse:", error);
        throw error;
    }
}

export async function updateCourse(courseId, courseUpdates) {
    try {
        return await model.findByIdAndUpdate(courseId, courseUpdates, { new: true });
    } catch (error) {
        console.error("Error in updateCourse:", error);
        throw error;
    }
}

export async function deleteCourse(courseId) {
    try {
        return await model.findByIdAndDelete(courseId);
    } catch (error) {
        console.error("Error in deleteCourse:", error);
        throw error;
    }
}