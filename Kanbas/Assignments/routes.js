
import * as assignmentDao from "./dao.js";

export default function AssignmentRoutes(app) {

    app.get("/api/assignments", (req, res) => {
        try {
            const assignments = assignmentDao.findAllAssignments();
            res.status(200).json(assignments);
        } catch (error) {
            console.error("Error fetching assignments:", error.message);
            res.status(500).json({ error: error.message });
        }
    });


    app.get("/api/courses/:courseId/assignments", (req, res) => {
        const { courseId } = req.params;
        try {
            const assignments = assignmentDao.findAssignmentsByCourse(courseId);
            res.status(200).json(assignments);
        } catch (error) {
            console.error(`Error fetching assignments for course ${courseId}:`, error.message);
            res.status(400).json({ error: error.message });
        }
    });


    app.get("/api/assignments/:assignmentId", (req, res) => {
        const { assignmentId } = req.params;
        try {
            const assignment = assignmentDao.findAssignmentById(assignmentId);
            if (!assignment) {
                return res.status(404).json({ error: "Assignment not found." });
            }
            res.status(200).json(assignment);
        } catch (error) {
            console.error(`Error fetching assignment ${assignmentId}:`, error.message);
            res.status(400).json({ error: error.message });
        }
    });


    app.post("/api/courses/:courseId/assignments", (req, res) => {
        const { courseId } = req.params;
        const assignmentData = req.body;
        try {
            const newAssignment = assignmentDao.createAssignment({
                ...assignmentData,
                course: courseId,
            });
            res.status(201).json(newAssignment);
        } catch (error) {
            console.error("Error creating assignment:", error.message);
            res.status(400).json({ error: error.message });
        }
    });


    app.put("/api/assignments/:assignmentId", (req, res) => {
        const { assignmentId } = req.params;
        const assignmentUpdates = req.body;
        try {
            const updatedAssignment = assignmentDao.updateAssignment(assignmentId, assignmentUpdates);
            res.status(200).json(updatedAssignment);
        } catch (error) {
            console.error(`Error updating assignment ${assignmentId}:`, error.message);
            res.status(400).json({ error: error.message });
        }
    });


    app.delete("/api/assignments/:assignmentId", (req, res) => {
        const { assignmentId } = req.params;
        try {
            const success = assignmentDao.deleteAssignment(assignmentId);
            if (success) {
                res.sendStatus(204);
            } else {
                res.status(404).json({ error: "Assignment not found." });
            }
        } catch (error) {
            console.error(`Error deleting assignment ${assignmentId}:`, error.message);
            res.status(400).json({ error: error.message });
        }
    });
}