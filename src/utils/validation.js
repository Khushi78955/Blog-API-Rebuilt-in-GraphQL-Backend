import validator from "validator";

export function validateEmail(email) {
    if (!validator.isEmail(email)) {
        throw new Error("Invalid email");
    }
}

export function validatePassword(password) {
    if (password.length < 6) {
        throw new Error("Password must be at least 6 characters");
    }
}

export function validateUsername(username) {
    if (username.length < 3) {
        throw new Error("Username must be at least 3 characters");
    }
}

export function validateTitle(title) {
    if (title.trim().length < 3) {
        throw new Error("Title must be at least 3 characters");
    }
}

export function validateContent(content) {
    if (content.trim().length < 10) {
        throw new Error("Content must be at least 10 characters");
    }
}

export function validateTagName(name) {
    if (name.trim().length < 2) {
        throw new Error("Tag name must be at least 2 characters");
    }
}