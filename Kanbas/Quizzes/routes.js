import db from "../Database/index.js";

function QuizRoutes(app) {
    app.get("/api/courses/:cid/quizzes", (req, res) => {
        const { cid } = req.params;
        const filteredQuizzes = db.quizzes.filter((quiz) => quiz.course === cid);
        res.json(filteredQuizzes);
    });

    app.post("/api/courses/:cid/quizzes", (req, res) => {
        const { cid } = req.params;
        const newQuiz = {
            ...req.body,
            course: cid,
            _id: new Date().getTime().toString(),
        };
        db.quizzes.push(newQuiz);
        res.json(newQuiz);
    });

    app.put("/api/quizzes/:qid", (req, res) => {
        const { qid } = req.params;
        const quizIndex = db.quizzes.findIndex((q) => q._id === qid);
        if (quizIndex !== -1) {
            db.quizzes[quizIndex] = {
                ...db.quizzes[quizIndex],
                ...req.body,
            };
            res.json(db.quizzes[quizIndex]);
        } else {
            res.status(404).json({ message: "Quiz not found" });
        }
    });

    app.delete("/api/quizzes/:qid", (req, res) => {
        const { qid } = req.params;
        const quizIndex = db.quizzes.findIndex((q) => q._id === qid);
        if (quizIndex !== -1) {
            db.quizzes.splice(quizIndex, 1);
            res.sendStatus(200);
        } else {
            res.status(404).json({ message: "Quiz not found" });
        }
    });

    app.post("/api/quizzes/:quizId/attempts", (req, res) => {
        const { quizId } = req.params;
        const attempt = req.body;

        const existingAttempts = db.attempts.filter(
            a => a.quizId === quizId && a.studentId === attempt.studentId
        );

        const newAttempt = {
            ...attempt,
            _id: new Date().getTime().toString(),
            quizId,
            attemptNumber: existingAttempts.length + 1
        };

        db.attempts.push(newAttempt);
        res.json(newAttempt);
    });

    app.get("/api/quizzes/:quizId/attempts/:studentId", (req, res) => {
        const { quizId, studentId } = req.params;
        const quizAttempts = db.attempts.filter(
            a => a.quizId === quizId && a.studentId === studentId
        ).sort((a, b) => b.attemptNumber - a.attemptNumber);
        res.json(quizAttempts);
    });

    app.get("/api/quizzes/:quizId/attempts/:studentId/:attemptNumber", (req, res) => {
        const { quizId, studentId, attemptNumber } = req.params;
        const attempt = db.attempts.find(
            a => a.quizId === quizId &&
                a.studentId === studentId &&
                a.attemptNumber === parseInt(attemptNumber)
        );

        if (attempt) {
            res.json(attempt);
        } else {
            res.status(404).json({ message: "Attempt not found" });
        }
    });
}

export default QuizRoutes;
