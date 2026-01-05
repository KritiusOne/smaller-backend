import {IUser } from "@src/Domain/entities/User"
import { Schema, model } from 'mongoose';
import { CollectionList } from '@src/helpers/collectionList';

const UserScheme = new Schema<IUser>({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
},
{
  collection: CollectionList.USERS,
});

const UserModel = model<IUser>(CollectionList.USERS, UserScheme);
export { UserModel };