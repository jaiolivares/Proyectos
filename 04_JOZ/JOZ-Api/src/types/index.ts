export interface User {
    id: number;
    name: string;
    email: string;
}

export interface ErrorResponse {
    status: number;
    message: string;
}