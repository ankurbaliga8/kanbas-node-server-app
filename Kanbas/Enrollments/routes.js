import * as dao from "./dao.js";

export default function EnrollmentRoutes(app) {

    app.get("/api/users/:userId/enrollments", (req, res) => {
        const { userId } = req.params;
        const enrollments = dao.findEnrollmentsForUser(userId);
        res.json(enrollments);
    });


    app.post("/api/users/:userId/enrollments/:courseId", (req, res) => {
        const { userId, courseId } = req.params;
        const enrollment = dao.enrollUserInCourse(userId, courseId);
        res.json(enrollment);
    });


    app.delete("/api/users/:userId/enrollments/:courseId", (req, res) => {
        const { userId, courseId } = req.params;
        const status = dao.unenrollUserFromCourse(userId, courseId);
        res.json(status);
    });
} 