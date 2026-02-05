import { MongoClient } from 'mongodb';
import './dotenv';

const DEV_URI = process.env.MONGO_URI;
const MAIN_URI = process.env.MAIN_MONGO_URI;

async function syncDatabases() {
  const devClient = new MongoClient(DEV_URI);
  const mainClient = new MongoClient(MAIN_URI);

  try {
    await devClient.connect();
    await mainClient.connect();

    const devDb = devClient.db('dev');
    const mainDb = mainClient.db('main');

    const collections = await devDb.listCollections().toArray();

    for (const { name: collectionName } of collections) {
      console.log(`Syncing collection: ${collectionName}`);

      const devCollection = devDb.collection(collectionName);
      const mainCollection = mainDb.collection(collectionName);

      const docs = await devCollection.find().toArray();

      await mainCollection.deleteMany({});
      if (docs.length > 0) {
        await mainCollection.insertMany(docs);
      }

      console.log(`✔ Synced ${docs.length} docs into '${collectionName}'`);
    }

    console.log('✅ Sync complete');
  } catch (err) {
    console.error('❌ Error syncing databases:', err);
  } finally {
    await devClient.close();
    await mainClient.close();
  }
}

syncDatabases();
