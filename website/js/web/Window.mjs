/** Related stuff to window object */
export class Window {
  /**
   * get user token from url
   * @return {object}
   */
  getUserToken() {
    const token = window.location.search.match( /usertoken=([a-z0-9]+)/gmi );
    if (!token) return false;
    return {'token': token[0].replace('usertoken=', '')};
  }; // getUserToken() {
}; // export class Window{
