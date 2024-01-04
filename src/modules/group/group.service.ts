import fs from 'fs';
import path from 'node:path';
import { IGroup } from './group.types.js';

let items = load();

function createFileIfNotExists(dbPath: string) {
  if (!fs.existsSync(dbPath)) {
    fs.appendFileSync(dbPath, '{}');
    console.log(`File ${dbPath} created`);
  }
}

function load(): { [id: number]: IGroup } {
  try {
    const dbPath = path.resolve('db/groups.json');
    console.log('dbPath: ', dbPath);
    createFileIfNotExists(dbPath);
    const data = fs.readFileSync(dbPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error ${error}`);
    return {};
  }
}

function save() {
  try {
    const dbPath = path.resolve('db/groups.json');
    fs.writeFileSync(dbPath, JSON.stringify(items), 'utf-8');
  } catch (error) {
    console.error(`Error : ${error}`);
  }
}

export const findAll = async (): Promise<IGroup[]> => Object.values(items);

export const findOne = async (id: number): Promise<IGroup> => items[id];

export const create = async (data: IGroup): Promise<IGroup> => {
  let existing = await findOne(data.chatId);

  if (existing) {
    return existing;
  }

  items[data.chatId] = data;
  save();

  return data;
};

export const update = async (chatId: number, updateValues: Partial<IGroup>): Promise<IGroup | null> => {
  const exists = await findOne(chatId);

  if (!exists) {
    return null;
  }

  items[chatId] = {
    ...exists,
    ...updateValues,
  };

  save();

  return items[chatId];
};

export const remove = async (chatId: number): Promise<null | void> => {
  const item = await findOne(chatId);

  if (!item) {
    return null;
  }

  delete items[chatId];

  save();
};

export default {
  findAll,
  findOne,
  update,
  create,
  remove,
};
