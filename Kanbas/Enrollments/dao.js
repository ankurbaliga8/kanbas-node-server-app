import Database from "../Database/index.js";

export const findEnrollmentsForUser = (userId) => {
    return Database.enrollments
        .filter((enrollment) => enrollment.user === userId)
        .map((enrollment) => enrollment.course);
};

export const enrollUserInCourse = (userId, courseId) => {
    const enrollment = {
        _id: new Date().getTime().toString(),
        user: userId,
        course: courseId,
    };
    Database.enrollments.push(enrollment);
    return enrollment;
};

export const unenrollUserFromCourse = (userId, courseId) => {
    Database.enrollments = Database.enrollments.filter(
        (enrollment) =>
            !(enrollment.user === userId && enrollment.course === courseId)
    );
};