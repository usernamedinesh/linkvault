export type ApiResponse<T  = undefined >  = {
    message: string;
    success: true;
    status: number;
    data?: T;
}

//exportable  files are here 
export * from "./link";
export * from "./auth";
