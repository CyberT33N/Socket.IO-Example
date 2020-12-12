/* ################ Controller ################ */
import ctrlLib from '../../controller/lib.mjs';

/* ################ MongoDB ################ */
import mongodb from 'mongodb';

/* ################ Logs ################ */
import log from 'fancy-log';
import chalk from 'chalk';


/** Init MongoDB connection */
export class Init {
  /** Get MongoDB details from config.yml and set as global */
  constructor() {
    const config = ctrlLib.getConfig();
    this.MongoURL = config.MongoDB.url;
    this.MongoName = config.MongoDB.dbname;
    ({MongoClient: this.MongoClient} = mongodb);
  }; // constructor(){


  /** Connect to Database and return connection */
  async connect() {
    try {
      const client = await this.MongoClient.connect(
          this.MongoURL, {useNewUrlParser: true, useUnifiedTopology: true},
      );
      return {"db": client.db(this.MongoName), "client": client};
    } // try {
    catch (e) {
      log( `${chalk.red.bold('❌ ERROR')} while try to connect to MongoDB DB
      ${chalk.white.bold('Error:\n')} ${e}` );
    } // catch (e) {
  }; // async connect() {
}; // export class Init {
