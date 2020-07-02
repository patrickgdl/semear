import { Badge } from './badge.interface';

export interface User {
    uid: string;
    email: string;
    password?: string;
    phone?: string;
    displayName: string;
    photoURL: string;
    createdAt: Date;
    updatedAt: Date;
    status: string;

    // notifications
    ranking: boolean;
    newBooks: boolean;
    reminder: boolean;

    friends: User[];
    badges: Badge[];
}
