export type ApiResponse<T  = undefined >  = {
    message: string;
    success: true;
    data: T;
}

export * from "./types/link";
