import { Document } from 'mongoose';


export type Data<T> = Omit<T, keyof Document>;