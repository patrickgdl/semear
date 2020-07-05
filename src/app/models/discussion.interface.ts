import { User } from './user.interface';

export interface Discussion {
    uid: string;
    message: string;
    date: string;
    storyUid: string;
    userUid: User;
}
