import fs from 'fs';
import path from 'node:path';
import { IUser } from './user.types.js';

let users = loadUsers();

function createFileIfNotExists(dbPath: string) {
  if (!fs.existsSync(dbPath)) {
    fs.appendFileSync(dbPath, '{}');
    console.log(`File ${dbPath} created`);
  }
}

function loadUsers(): { [id: number]: IUser } {
  try {
    const dbPath = path.resolve('db/users.json');
    console.log('[SSA] dbPath: ', dbPath);
    createFileIfNotExists(dbPath);
    const data = fs.readFileSync(dbPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error ${error}`);
    return {};
  }
}

function saveUsers() {
  try {
    const dbPath = path.resolve('db/users.json');
    fs.writeFileSync(dbPath, JSON.stringify(users), 'utf-8');
  } catch (error) {
    console.error(`Error : ${error}`);
  }
}

export const findAll = async (): Promise<IUser[]> => Object.values(users);
export const findAdmins = async (): Promise<IUser[]> => findAll().then((users) => users.filter((u) => u.isAdmin));

export const findOne = async (id: number): Promise<IUser | null> => users[id] || null;

export const create = async (userData: IUser): Promise<IUser> => {
  let existingUser = await findOne(userData.chatId);

  if (existingUser) {
    return existingUser;
  }

  users[userData.chatId] = userData;
  saveUsers();

  return userData;
};

export const update = async (chatId: number, updateValues: Partial<IUser>): Promise<IUser | null> => {
  const userExists = await findOne(chatId);

  if (!userExists) {
    return null;
  }

  users[chatId] = {
    ...userExists,
    ...updateValues,
  };

  saveUsers();

  return users[chatId];
};

export const remove = async (chatId: number): Promise<null | void> => {
  const user = await findOne(chatId);

  if (!user) {
    return null;
  }

  delete users[chatId];

  saveUsers();
};

export default {
  findAll,
  findAdmins,
  findOne,
  update,
  create,
  remove,
};
