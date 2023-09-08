const users = [
  {
    id: 'e804079c-5192-4178-b6f1-51b58373a1c8',
    username: 'ripple_admin',
    email: 'ripple_admin@gmail.com',
    password: '$2b$10$tDTeKoIkavo4BWZIoGzbZumw8IpapBiMJ4e3/tDylKKEYpgstgrh6',  // ripple_admin
    createdAt: '2023-09-08T07:59:13.101Z',
  },
];


function getAllUsers() {
  return users;
}

function getUserByEmail({ email }) {
  return users.find((user) => {
    return user.email === email;
  });
}

function createUser({ id, username, email, password }) {
  const newUser = {
    id,
    username,
    email,
    password,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  return newUser;
}


module.exports = {
  getAllUsers,
  getUserByEmail,
  createUser,
};