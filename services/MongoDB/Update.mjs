/** Update data in MongoDB */
export class Update {
  /**
   * Update specific field
   * @param {object} collection - MongoDB Collection
   * @param {object} query - search query
   * @param {object} update - data we will update
  */
  async updateOne(collection, query, update) {
    if (!collection || !query || !update) throw new Error('Param missing');
    const r = await collection.updateOne(query, update);
    if ( r.result.n ) return {code: 'SUCCESS'};
    return {code: 'ERROR'};
  }; // async updateOne(){
}; // export class Update {
