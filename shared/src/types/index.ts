export type ApiResponse<T  = undefined >  = {
    message: string;
    success: true;
    status: number;
    data: T;
}

export * from "./link";
