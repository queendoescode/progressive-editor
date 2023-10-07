import { openDB } from 'idb';

const idbDatabase = 'jate';
const idbObjectStore = 'jate';
const dbVersion = 1;
const contentId = 1;

const initdb = async () =>
  openDB(idbDatabase, dbVersion, {
    upgrade(db) {
      if (db.objectStoreNames.contains(idbObjectStore)) {
        console.log(`${idbObjectStore} object store already exists`);
        return;
      }
      db.createObjectStore(idbObjectStore, { keyPath: 'id', autoIncrement: true });
      console.log(`${idbObjectStore} object store created`);
    },
  });

// method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const jateDb = await openDB(idbDatabase, dbVersion);
  const tx = jateDb.transaction(idbObjectStore, 'readwrite');
  return await tx.store.put({ id: contentId, text: content });
};

// method that gets all the content from the database
export const getDb = async () => {
  const jateDb = await openDB(idbDatabase, dbVersion);
  const tx = jateDb.transaction(idbObjectStore, 'readonly');
  const data = await tx.store.get(contentId);
  return data && data.text;
};

initdb();
