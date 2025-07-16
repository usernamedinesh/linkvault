import { ApiResponse } from "shared";

export function apiSuccess<T>(data: T, message = "success", status = 200) {
  return {
    status,
    success: true,
    message,
    data,
  };
}

export function apiError(message = "Something went wrong", status = 500, error?: any) {
  return {
    status,
    success: false,
    message,
    error,
  };
}

export function jsonResponse<T>(data: ApiResponse<T>, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

