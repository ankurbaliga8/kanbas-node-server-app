import * as dao from './dao.js';
import Database from "../Database/index.js";

export default function QuizRoutes(app) {
    app.get('/api/courses/:courseId/quizzes', (req, res) => {
        const { courseId } = req.params;
        console.log("Received request for course:", courseId);
        console.log("All quizzes:", Database.quizzes);
        const quizzes = dao.findQuizzesForCourse(courseId);
        console.log("Filtered quizzes for course:", quizzes);
        res.json(quizzes);
    });

    app.post('/api/courses/:courseId/quizzes', (req, res) => {
        const { courseId } = req.params;
        const quiz = { ...req.body, course: courseId };
        const newQuiz = dao.createQuiz(quiz);
        res.json(newQuiz);
    });

    app.put('/api/quizzes/:quizId', (req, res) => {
        const { quizId } = req.params;
        const quizUpdates = req.body;
        console.log("Updating quiz:", quizId);
        console.log("Update payload:", quizUpdates);
        try {
            const updatedQuiz = dao.updateQuiz(quizId, quizUpdates);
            console.log("Quiz after update:", updatedQuiz);
            res.json(updatedQuiz);
        } catch (error) {
            console.error("Update failed:", error);
            res.status(404).send({ message: 'Quiz not found' });
        }
    });

    app.delete('/api/quizzes/:quizId', (req, res) => {
        const { quizId } = req.params;
        try {
            dao.deleteQuiz(quizId);
            res.sendStatus(204);
        } catch (error) {
            res.status(404).send({ message: 'Quiz not found' });
        }
    });
}
