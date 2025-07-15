export  function apiSuccess<T>(data: T, message = "success", status = 200 ) {
    return {
        status,
        success : true,
        message,
        data,
    };
}

export function apiError(message = "Something went wrong", status = 500 , error?: any) {
    return {
        status,
        success: false,
        message,
        error,
    };
}
