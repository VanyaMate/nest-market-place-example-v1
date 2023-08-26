import { User } from '@/modules/api/v1/user/models/user.model';


export type UserAuth = [User, string];
export type UserPrivate = {
    login: string;
    email: string;
}
export type UserPublic = {
    login: string;
}