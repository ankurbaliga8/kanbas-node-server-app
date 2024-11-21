import Database from "../Database/index.js";

export function findAllAssignments() {
    return Database.assignments || [];
}

export function findAssignmentsByCourse(courseId) {
    if (!courseId) {
        throw new Error("Course ID is required to fetch assignments.");
    }
    return Database.assignments.filter((assignment) => assignment.course === courseId);
}

export function findAssignmentById(assignmentId) {
    if (!assignmentId) {
        throw new Error("Assignment ID is required to fetch an assignment.");
    }
    return Database.assignments.find((assignment) => assignment._id === assignmentId);
}

export function createAssignment(assignment) {
    if (!assignment.title || !assignment.course) {
        throw new Error("Assignment title and course ID are required.");
    }
    const newAssignment = {
        ...assignment,
        _id: `${Date.now()}`,
    };
    Database.assignments = [...Database.assignments, newAssignment];
    return newAssignment;
}

export function updateAssignment(assignmentId, assignmentUpdates) {
    const assignment = findAssignmentById(assignmentId);
    if (!assignment) {
        throw new Error(`Assignment with ID ${assignmentId} not found.`);
    }
    Object.assign(assignment, assignmentUpdates);
    return assignment;
}

export function deleteAssignment(assignmentId) {
    const initialLength = Database.assignments.length;
    Database.assignments = Database.assignments.filter(
        (assignment) => assignment._id !== assignmentId
    );
    return initialLength > Database.assignments.length;
}