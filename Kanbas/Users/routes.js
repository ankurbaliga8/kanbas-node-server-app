import * as dao from "./dao.js";
import * as courseDao from "../Courses/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";
import mongoose from "mongoose";

export default function UserRoutes(app) {
    const enrollUserInCourse = async (req, res) => {
        try {
            let { uid, cid } = req.params;
            if (uid === "current") {
                const currentUser = req.session["currentUser"];
                uid = currentUser._id;
            }
            const status = await enrollmentsDao.enrollUserInCourse(uid, cid);
            res.json(status);
        } catch (error) {
            console.error("Error in enrollUserInCourse:", error);
            res.status(500).json({ error: error.message });
        }
    };

    const unenrollUserFromCourse = async (req, res) => {
        try {
            let { uid, cid } = req.params;
            if (uid === "current") {
                const currentUser = req.session["currentUser"];
                uid = currentUser._id;
            }
            const status = await enrollmentsDao.unenrollUserFromCourse(uid, cid);
            res.json(status);
        } catch (error) {
            console.error("Error in unenrollUserFromCourse:", error);
            res.status(500).json({ error: error.message });
        }
    };

    const findCoursesForUser = async (req, res) => {
        try {
            const currentUser = req.session["currentUser"];
            if (!currentUser) {
                return res.status(401).json({ error: "Not authenticated" });
            }
            if (currentUser.role === "ADMIN") {
                const courses = await courseDao.findAllCourses();
                return res.json(courses);
            }
            let { uid } = req.params;
            if (uid === "current") {
                uid = currentUser._id;
            }
            const courses = await enrollmentsDao.findCoursesForUser(uid);
            res.json(courses);
        } catch (error) {
            console.error("Error in findCoursesForUser:", error);
            res.status(500).json({ error: error.message });
        }
    };

    const createUser = async (req, res) => {
        try {
            const user = await dao.createUser(req.body);
            res.json(user);
        } catch (error) {
            console.error("Error in createUser:", error);
            res.status(500).json({ error: error.message });
        }
    };

    const deleteUser = async (req, res) => {
        try {
            const status = await dao.deleteUser(req.params.userId);
            res.json(status);
        } catch (error) {
            console.error("Error in deleteUser:", error);
            res.status(500).json({ error: error.message });
        }
    };

    const findAllUsers = async (req, res) => {
        try {
            const { role, name } = req.query;
            if (role) {
                const users = await dao.findUsersByRole(role);
                return res.json(users);
            }
            if (name) {
                const users = await dao.findUsersByPartialName(name);
                return res.json(users);
            }
            const users = await dao.findAllUsers();
            res.json(users);
        } catch (error) {
            console.error("Error in findAllUsers:", error);
            res.status(500).json({ error: error.message });
        }
    };

    const findUserById = async (req, res) => {
        try {
            const { userId } = req.params;
            if (!mongoose.Types.ObjectId.isValid(userId)) {
                return res.status(400).json({ error: "Invalid user ID" });
            }
            const user = await dao.findUserById(userId);
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
            res.json(user);
        } catch (error) {
            console.error("Error in findUserById:", error);
            res.status(500).json({ error: error.message });
        }
    };

    const updateUser = async (req, res) => {
        try {
            const userId = req.params.userId;
            const userUpdates = req.body;
            await dao.updateUser(userId, userUpdates);
            const currentUser = req.session["currentUser"];
            if (currentUser && currentUser._id === userId) {
                req.session["currentUser"] = { ...currentUser, ...userUpdates };
            }
            res.json(currentUser);
        } catch (error) {
            console.error("Error in updateUser:", error);
            res.status(500).json({ error: error.message });
        }
    };

    const signup = async (req, res) => {
        try {
            const user = await dao.findUserByUsername(req.body.username);
            if (user) {
                return res.status(400).json({ error: "Username already in use" });
            }
            const currentUser = await dao.createUser(req.body);
            req.session["currentUser"] = currentUser;
            res.json(currentUser);
        } catch (error) {
            console.error("Error in signup:", error);
            res.status(500).json({ error: error.message });
        }
    };

    const signin = async (req, res) => {
        try {
            const { username, password } = req.body;
            const currentUser = await dao.findUserByCredentials(username, password);
            if (currentUser) {
                req.session["currentUser"] = currentUser;
                res.json(currentUser);
            } else {
                return res.status(401).json({ error: "Invalid credentials" });
            }
        } catch (error) {
            console.error("Error in signin:", error);
            res.status(500).json({ error: error.message });
        }
    };

    const signout = async (req, res) => {
        try {
            req.session.destroy((err) => {
                if (err) {
                    return res.status(500).json({ error: "Error during signout" });
                }
                res.sendStatus(200);
            });
        } catch (error) {
            console.error("Error in signout:", error);
            res.status(500).json({ error: error.message });
        }
    };

    const profile = async (req, res) => {
        try {
            const currentUser = req.session["currentUser"];
            if (!currentUser) {
                return res.status(401).json({ error: "Not authenticated" });
            }
            res.json(currentUser);
        } catch (error) {
            console.error("Error in profile:", error);
            res.status(500).json({ error: error.message });
        }
    };

    const findCoursesForEnrolledUser = async (req, res) => {
        try {
            let { userId } = req.params;
            if (userId === "current") {
                const currentUser = req.session["currentUser"];
                if (!currentUser) {
                    return res.status(401).json({ error: "Not authenticated" });
                }
                userId = currentUser._id;
            }
            const courses = await courseDao.findCoursesForEnrolledUser(userId);
            res.json(courses);
        } catch (error) {
            console.error("Error in findCoursesForEnrolledUser:", error);
            res.status(500).json({ error: error.message });
        }
    };

    const createCourse = async (req, res) => {
        try {
            const currentUser = req.session["currentUser"];
            if (!currentUser) {
                return res.status(401).json({ error: "Not authenticated" });
            }
            const newCourse = await courseDao.createCourse(req.body);
            await enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
            res.json(newCourse);
        } catch (error) {
            console.error("Error in createCourse:", error);
            res.status(500).json({ error: error.message });
        }
    };

    // Authentication routes should come first
    app.post("/api/users/signup", signup);
    app.post("/api/users/signin", signin);
    app.post("/api/users/signout", signout);  // Changed back to POST
    app.get("/api/users/profile", profile);    // Changed to GET

    // User CRUD operations
    app.post("/api/users", createUser);
    app.get("/api/users", findAllUsers);
    app.get("/api/users/:userId", findUserById);
    app.put("/api/users/:userId", updateUser);
    app.delete("/api/users/:userId", deleteUser);

    // Course-related routes
    app.post("/api/users/current/courses", createCourse);
    app.get("/api/users/:uid/courses", findCoursesForUser);
    app.post("/api/users/:uid/courses/:cid", enrollUserInCourse);
    app.delete("/api/users/:uid/courses/:cid", unenrollUserFromCourse);
}
