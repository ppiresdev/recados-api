import { User } from "../models/user";

let usersDB: User[] = [];

export const recoverDB = (): User[] => {
  return [...usersDB];
};

export const storeDB = (users: User[]) => {
  usersDB = [...users];
};

export const storeUser = (user: User) => {
  const usersList = recoverDB();
  usersList.push(user);
  storeDB(usersList);
};

export const updateDB = (userIndex: number, user: User) => {
  const usersList = recoverDB();
  usersList[userIndex] = user;
  storeDB(usersList);
};
