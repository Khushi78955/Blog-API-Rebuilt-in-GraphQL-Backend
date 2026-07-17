import validator from "validator";
import { badUserInputError } from "./errors.js";

export function validateEmail(email) {
    if (!validator.isEmail(email)) {
        badUserInputError("Invalid email");
    }
}

export function validatePassword(password) {
    if (password.length < 6) {
        badUserInputError("Password must be at least 6 characters");
    }
}

export function validateUsername(username) {
    if (username.length < 3) {
        badUserInputError("Username must be at least 3 characters");
    }
}

export function validateTitle(title) {
    if (title.trim().length < 3) {
        badUserInputError("Title must be at least 3 characters");
    }
}

export function validateContent(content) {
    if (content.trim().length < 10) {
        badUserInputError("Content must be at least 10 characters");
    }
}

export function validateTagName(name) {
    if (name.trim().length < 2) {
        badUserInputError("Tag name must be at least 2 characters");
    }
}