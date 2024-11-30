import model from "./model.js";

export function findAllCourses() {
    return model.find();
}

export function findCoursesForEnrolledUser(userId) {
    const { courses, enrollments } = Database;
    return courses.filter((course) =>
        enrollments.some(
            (enrollment) =>
                enrollment.user === userId && enrollment.course === course._id
        )
    );
}

export function createCourse(course) {
    delete course._id;
    return model.create(course);

}

export function updateCourse(courseId, courseUpdates) {
    return model.updateOne({ _id: courseId }, courseUpdates);
}

export function deleteCourse(courseId) {
    return model.deleteOne({ _id: courseId });
}