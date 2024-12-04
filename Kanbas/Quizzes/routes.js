import db from "../Database/index.js";

function QuizRoutes(app) {
    app.get("/api/courses/:cid/quizzes", (req, res) => {
        const { cid } = req.params;
        console.log("Received request for course:", cid);
        console.log("All quizzes:", db.quizzes);
        const quizzes = db.quizzes.filter((quiz) => quiz.course === cid);
        console.log("Filtered quizzes for course:", quizzes);
        res.json(quizzes);
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
        db.quizzes = db.quizzes.filter((q) => q._id !== qid);
        res.sendStatus(200);
    });
}

export default QuizRoutes;
