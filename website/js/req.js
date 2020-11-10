async function getUserDetails(token) { console.log( 'getUserDetails() - token: ' + token + '\nhost: ' + window.location.origin );
  return await axios.post(  window.location.origin + '/api/getUserDetails', { usertoken: token  }, {
    headers: { authorization: 'sample_auth_token..' }
  });
}; // async function getUserDetails(token) {

async function getRoomDetails(roomID) { console.log( 'getRoomDetails() - roomID: ' + roomID + '\nhost: ' + window.location.origin );
  return await axios.post(  window.location.origin + '/api/getRoomDetails', { id: roomID  }, {
    headers: { authorization: 'sample_auth_token..' }
  });
}; // async function getRoomDetails(roomID) {
