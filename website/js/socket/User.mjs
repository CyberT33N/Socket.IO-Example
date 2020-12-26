/** Sockets that are related to User */
export class User {
  /** Catch click on friend in left sidebar, connect to room and change text */
  personClick() {
    $(document).on('click', '.person', function(event) {
      const elem = event.target;

      // connect to room
      socketIO.emit('room connect', $(elem).attr('data-room'));

      // change header name
      $('.top .name').text(elem.querySelector('.name').textContent);

      // mark current active person li as active and all other as inactive
      $('.person').attr('data-active', 'false');
      $(elem).attr('data-active', 'true');
    }); // $(document).on('click', '.person', function(){
  }; // personClick() {
}; // export class User{
