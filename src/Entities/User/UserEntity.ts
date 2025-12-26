export interface User {
    userId: string;
    username: string;
    email: string;
    password?: string; 
    phoneNumber?: string | null;
    isActive: boolean;
    lastLogin?: string | null;
    createdAt: string;
    updatedAt?: string | null;
}
