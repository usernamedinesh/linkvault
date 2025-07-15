export type ApiResponse<T  = undefined >  = {
    message: string;
    success: true;
    status: number;
    data?: T;
};

export type ApiError = {
    status: number;
    message: string;
    error?: string | Record<string, string>;
};

//exportable  files are here 
export * from "./link";
export * from "./auth";
