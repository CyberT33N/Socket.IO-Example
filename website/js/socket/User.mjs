/** Sockets that are related to User */
export class User {
  /** Catch click on friend in left sidebar, connect to room and change text */
  friendClick() {
    const friends = document.querySelectorAll('.person');
    friends.forEach(elem => elem.addEventListener('click', event => {
      const friend = event.currentTarget;

      // connect to room
      const roomID = friend.dataset.room;
      socketIO.emit('room connect', roomID);

      // change header name
      const name = friend.querySelector('.name')?.textContent;
      document.querySelector('.top .name').textContent = name;

      // mark current active person li as active and all other as inactive
      friends.forEach(elem => elem.dataset.active = 'false');
      friend.dataset.active = 'true';
    })); // $(document).on('click', '.person', event=>{
  }; // friendClick() {
}; // export class User{
