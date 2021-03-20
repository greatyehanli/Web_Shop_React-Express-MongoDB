const users = [];

const addUser = ({ id, name, room }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const existingUser = users.find((user) => user.room === room && user.name === name);

  if(!name || !room) return { error: 'Username and room are required.' };
  if(existingUser) return { error: 'Username is taken.' };

  const user = { id, name, room };

  users.push(user);
//   console.log("aaaaaaadddddddd<<<<<:", users);


  return { user };
}

const removeUser = (id) => {
    // console.log("deletedasdadsdasaddasadsadsdUser<<<<<:", users);

  const index = users.findIndex((user) => user.id === id);
  const deletedUser = users.splice(index, 1)[0];

  if(index !== -1) return deletedUser

}

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };