import { User } from '../users/models/user.model';


export type UserAuth = [User, string];
export type UserPrivate = {
    login: string;
    email: string;
}
export type UserPublic = {
    login: string;
}