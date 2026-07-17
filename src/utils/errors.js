import { GraphQLError } from "graphql";

export function unauthenticatedError(message = "Unauthorized") {
    throw new GraphQLError(message, {
        extensions: {
            code: "UNAUTHENTICATED",
        },
    });
}

export function forbiddenError(message = "Forbidden") {
    throw new GraphQLError(message, {
        extensions: {
            code: "FORBIDDEN",
        },
    });
}

export function badUserInputError(message) {
    throw new GraphQLError(message, {
        extensions: {
            code: "BAD_USER_INPUT",
        },
    });
}

export function notFoundError(message) {
    throw new GraphQLError(message, {
        extensions: {
            code: "NOT_FOUND",
        },
    });
}