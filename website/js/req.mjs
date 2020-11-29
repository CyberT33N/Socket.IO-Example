export const getUserDetails = async token=>{ console.log( 'getUserDetails() - token: ' + token + '\nHost: ' + window.location.origin );
  return await axios.post(  window.location.origin + '/api/getUserDetails', { usertoken: token  }, {
    headers: { authorization: 'sample_auth_token..' }
  });
}; // export const getUserDetails = async token=>{

export const getRoomDetails = async roomID=>{ console.log( 'getRoomDetails() - roomID: ' + roomID + '\nhost: ' + window.location.origin );
  return await axios.post(  window.location.origin + '/api/getRoomDetails', { id: roomID  }, {
    headers: { authorization: 'sample_auth_token..' }
  });
}; // export const getRoomDetails = async roomID=>{
