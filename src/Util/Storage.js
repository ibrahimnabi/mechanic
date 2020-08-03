import {AsyncStorage} from 'react-native';

const storeUser = async (user) => {
  await AsyncStorage.setItem('user', JSON.stringify(user));
};
const getUser = async () => {
  const user = JSON.parse(await AsyncStorage.getItem('user'));
  return user;
};
const deleteUser = async () => {
  await AsyncStorage.removeItem('user');
};

export {storeUser, getUser, deleteUser};
