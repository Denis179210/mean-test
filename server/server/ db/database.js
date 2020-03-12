import mongoose from "mongoose";
import { dbConfig } from "./config/db.config";
import { Role } from '../models';

class Database {
  constructor() {}
  async run() {
    let uri;
    if (process.env.NODE_ENV === 'production') {
      const config = JSON.parse(process.env.APP_CONFIG)
      const mongoPassword = '0631457426denis';
      uri = "mongodb://" + config.mongo.user + ":" + encodeURIComponent(mongoPassword) + "@" + config.mongo.hostString;
    } else {
      uri = dbConfig.URI;
    }

    try {
      await mongoose.connect(uri, dbConfig.options);
      if (!(await Role.estimatedDocumentCount())) {
        await Role.create([{name: 'Artist'}, {name: 'Designer'}, {name: 'Art manager'}]);
      }
    } catch (e) {
      console.error(e);
    }

    mongoose.connection.on('error', (err) => {
      console.log(`Mongoose: connection error (${err})`);
    })
    mongoose.connection.once('open', () => {
      console.log(`Mongoose: connection (Opened to ${dbConfig.URI})`);
    })

  }
}

export const db = new Database();
