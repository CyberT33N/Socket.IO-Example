export const getUserDetails = async token=>{
  return await axios.post(
      `${window.location.origin}/api/getUserDetails`, {usertoken: token},
  ); // return await axios.post(
}; // export const getUserDetails = async token=>{

export const getRoomDetails = async roomID=>{
  return await axios.post(
      `${window.location.origin}/api/getRoomDetails`, {id: roomID},
  );
}; // export const getRoomDetails = async roomID=>{
