import Database from "../Database/index.js";

export const findQuizzesForCourse = (courseId) => {
    console.log("Finding quizzes for course:", courseId);
    const quizzes = Database.quizzes.filter((quiz) => quiz.course === courseId);
    console.log("Filtered quizzes for course:", quizzes);
    return quizzes;
};

export const createQuiz = (quiz) => {
    const newQuiz = {
        ...quiz,
        _id: Date.now().toString()
    };
    Database.quizzes = [...Database.quizzes, newQuiz];
    return newQuiz;
};

export const updateQuiz = (quizId, updatedQuiz) => {
    console.log("DAO - Before update:", Database.quizzes);

    const quizIndex = Database.quizzes.findIndex((quiz) => quiz._id === quizId);
    if (quizIndex === -1) {
        throw new Error('Quiz not found');
    }

    // Ensure published state is explicitly set
    const updatedQuizObj = {
        ...Database.quizzes[quizIndex],
        ...updatedQuiz,
        _id: quizId,
        course: Database.quizzes[quizIndex].course,
        published: updatedQuiz.published // Explicitly set published state
    };

    Database.quizzes[quizIndex] = updatedQuizObj;
    console.log("DAO - After update:", Database.quizzes);

    return updatedQuizObj;
};

export const deleteQuiz = (quizId) => {
    const initialLength = Database.quizzes.length;
    Database.quizzes = Database.quizzes.filter((quiz) => quiz._id !== quizId);
    if (initialLength === Database.quizzes.length) {
        throw new Error('Quiz not found');
    }
};

const addQuestionToQuiz = (quizId, question) => {
    const quiz = Database.quizzes.find((q) => q._id === quizId);
    if (!quiz) throw new Error("Quiz not found");
    if (!Array.isArray(quiz.questions)) {
        quiz.questions = [];
    }
    quiz.questions.push(question);
    return question;
};

const updateQuestionInQuiz = (quizId, questionId, updates) => {
    const quiz = Database.quizzes.find((q) => q._id === quizId);
    if (!quiz || !Array.isArray(quiz.questions)) {
        throw new Error("Quiz or questions not found");
    }
    const index = quiz.questions.findIndex((q) => q._id === questionId);
    if (index === -1) throw new Error("Question not found");
    quiz.questions[index] = { ...quiz.questions[index], ...updates };
    return quiz.questions[index];
};

const deleteQuestionFromQuiz = (quizId, questionId) => {
    const quiz = Database.quizzes.find((q) => q._id === quizId);
    if (!quiz || !Array.isArray(quiz.questions)) {
        throw new Error("Quiz or questions not found");
    }
    quiz.questions = quiz.questions.filter((q) => q._id !== questionId);
};

export { addQuestionToQuiz, updateQuestionInQuiz, deleteQuestionFromQuiz };
