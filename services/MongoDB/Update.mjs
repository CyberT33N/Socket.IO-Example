/** Update data */
export class Update {
  /**
   * Set globals
   * @param {object} collection - MongoDB Collection
   * @param {object} query - search query
   * @param {object} update - data we will update
  */
  constructor(collection, query, update) {
    this.collection = collection;
    this.query = query;
    this.update = update;
  }; // constructor(){


  /** Update specific field */
  async updateOne() {
    const r = await this.collection.updateOne(this.query, this.update);
    if ( r.result.n ) return {code: 'SUCCESS'};
    return {code: 'ERROR'};
  }; // async updateOne(){
}; // export class Update {
