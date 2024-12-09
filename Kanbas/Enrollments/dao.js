import model from "./model.js";
import courseModel from "../Courses/model.js";

export async function findCoursesForUser(userId) {
    try {
        const enrollments = await model.find({ user: userId });
        const courseIds = enrollments.map(enrollment => enrollment.course);
        const courses = await courseModel.find({ _id: { $in: courseIds }});
        return courses;
    } catch (error) {
        console.error("Error in findCoursesForUser:", error);
        throw error;
    }
}

export async function findUsersForCourse(courseId) {
    try {
        const enrollments = await model.find({ course: courseId }).populate("user");
        return enrollments.map((enrollment) => enrollment.user);
    } catch (error) {
        console.error("Error in findUsersForCourse:", error);
        throw error;
    }
}

export async function enrollUserInCourse(userId, courseId) {
    try {
        // Check if enrollment already exists
        const existingEnrollment = await model.findOne({ 
            user: userId, 
            course: courseId 
        });

        if (existingEnrollment) {
            return existingEnrollment;
        }

        // Create new enrollment
        const enrollment = await model.create({ 
            user: userId, 
            course: courseId,
            status: "ENROLLED"
        });

        return enrollment;
    } catch (error) {
        console.error("Error in enrollUserInCourse:", error);
        throw error;
    }
}

export async function unenrollUserFromCourse(userId, courseId) {
    try {
        const result = await model.deleteOne({ 
            user: userId, 
            course: courseId 
        });
        
        return result.deletedCount;
    } catch (error) {
        console.error("Error in unenrollUserFromCourse:", error);
        throw error;
    }
}
