import Database from "../Database/index.js";

export const findQuizzesForCourse = (courseId) => {
    console.log("Finding quizzes for course:", courseId);
    console.log("Available quizzes:", Database.quizzes);
    const filtered = Database.quizzes.filter((quiz) => quiz.course === courseId);
    console.log("Filtered quizzes:", filtered);
    return filtered;
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
