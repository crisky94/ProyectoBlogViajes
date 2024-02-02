export const userAlreadyRegisteredError = () => {
    return new Error({
        httpStatus: 409, // Conflict
        code: "USER_ALREADY_REGISTERED",
        message: "El nombre de usuario ya está registrado",
    });
};

export const emailAlreadyRegisteredError = () => {
    return new Error({
        httpStatus: 409, // Conflict
        code: "EMAIL_ALREADY_REGISTERED",
        message: "El email ya está registrado",
    });
};

export const invalidCredentialsError = () => {
    return new Error({
        httpStatus: 401, // Unauthorized
        code: "INVALID_CREDENTIALS",
        message: "Credenciales inválidas",
    });
};

export const sendEmailError = () => {
    // const error =  {
    //   httpStatus: 500, // Internal server error
    //   code: "SEND_EMAIL_FAILED",
    //   message: "Error al enviar email",
    // };
    // return error;
    return new Error({
        httpStatus: 500, // Internal server error
        code: "SEND_EMAIL_FAILED",
        message: "Error al enviar email",
    });
};

export const notFoundError = (resource) => {
    return new Error({
        httpStatus: 404, // Not Found
        code: "RESOURCE_NOT_FOUND",
        message: `El recurso requerido '${resource}' no existe`,
    });
};

export const pendingActivationError = () => {
    return new Error({
        httpStatus: 403, // Forbidden
        code: "PENDING_ACTIVATION",
        message:
            "Usuario pendiente de activar. Por favor, verifica tu cuenta antes de continuar.",
    });
};

export const notAuthenticatedError = () => {
    return new Error({
        httpStatus: 401, // Unauthorized
        code: "NOT_AUTHENTICATED",
        message: `Debes enviar un token en el header 'Authorization'`,
    });
};

export const recoveryCodeError = () => {
    return new Error({
        httpStatus: 401, // Unauthorized
        code: "INVALID_RECOVERY_CODE",
        message: "Código de recuperación incorrecto",
    });
};

export const saveFileError = () => {
    return new Error({
        httpStatus: 500, // Internal Server Error
        code: "FILE_SAVE_FAILED",
        message: "Error al guardar el archivo en el disco",
    });
};

export const deleteFileError = () => {
    return new Error({
        httpStatus: 409, // Conflict
        code: "FILE_DELETED_FAILED",
        message: "Error al eliminar el archivo del disco",
    });
};

export const unauthorizedUserError = () => {
    return new Error({
        httpStatus: 409, // Conflict
        code: "UNAUTHORIZED",
        message: "El usuario no está autorizado para hacer esta operación",
    });
};

export const photoLimitReachedError = () => {
    return new Error({
        httpStatus: 409, // Conflict
        code: "PHOTO_LIMIT_REACHED",
        message: "Se ha alcanzado el límite de tres fotos en la entrada",
    });
};

export const cannotVoteOwnEntryError = () => {
    return new Error({
        httpStatus: 403, // Forbidden
        code: "CANNOT_VOTE_OWN_ENTRY",
        message: "No puedes votar tu propia entrada",
    });
};

export const voteAlreadyExistsError = () => {
    return new Error({
        httpStatus: 409, // Conflict
        code: "VOTE_ALREADY_EXISTS",
        message: "No se puede votar más de una vez la misma entrada",
    });
};

export const adminOnlyError = () => {
    return new Error({
        httpStatus: 403,
        code: "UNAUTHORIZED",
        message:
            "Solo el administrador puede cambiar role de usuario, contacte a admin por favor",
    });
};
