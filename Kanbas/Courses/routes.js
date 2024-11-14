import * as dao from "./dao.js";
import * as modulesDao from "../Modules/dao.js";
export default function CourseRoutes(app) {


    app.post("/api/courses/:courseId/modules", (req, res) => {
        const { courseId } = req.params;
        const module = {
            ...req.body,
            course: courseId,
        };
        const newModule = modulesDao.createModule(module);
        res.send(newModule);
    });
    app.get("/api/courses/:courseId/modules", (req, res) => {
        const { courseId } = req.params;
        const modules = modulesDao.findModulesForCourse(courseId);
        res.json(modules);
    });

    app.get("/api/courses", (req, res) => {
        const courses = dao.findAllCourses();
        res.send(courses);
    });


    app.put("/api/courses/:courseId", (req, res) => {
        const { courseId } = req.params;
        const courseUpdates = req.body;

        try {
            dao.updateCourse(courseId, courseUpdates);
            res.sendStatus(204);
        } catch (error) {
            res.status(404).send({ message: "Course not found" });
        }
    });


    app.delete("/api/courses/:courseId", (req, res) => {
        const { courseId } = req.params;

        try {
            dao.deleteCourse(courseId);
            res.sendStatus(204);
        } catch (error) {
            res.status(404).send({ message: "Course not found" });
        }
    });
}