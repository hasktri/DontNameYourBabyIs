// Helper for updating all data (for updateName)
export const _writeAll = (data) => {
  writeData(data);
};
// src/models/nameModel.js
// JSON file-based data store for persistence
import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_PATH = join(__dirname, 'names.json');

function readData() {
  try {
    const raw = readFileSync(DATA_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

function writeData(data) {
  writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

export const getAll = () => readData();

export const getById = (id) => {
  const names = readData();
  return names.find((item) => item.id === id);
};

export const add = (name, description) => {
  const names = readData();
  const newId = names.length ? names[names.length - 1].id + 1 : 1;
  const newItem = { id: newId, name, description };
  names.push(newItem);
  writeData(names);
  return newItem;
};
