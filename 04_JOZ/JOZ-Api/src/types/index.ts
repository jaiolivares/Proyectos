export interface User {
    id: string;
    name: string;
    email: string;
}

export interface ErrorResponse {
    status: number;
    message: string;
}