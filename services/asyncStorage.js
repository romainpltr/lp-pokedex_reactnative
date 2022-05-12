import AsyncStorage from '@react-native-async-storage/async-storage';

async function setDataStorageItem(key, value){
    return await AsyncStorage.setItem(key, value);
};

async function getDataStorageItem(key){
    const data = await AsyncStorage.getItem(key);
    return JSON.parse(data);
}

async function eraseDataStorageItem(key){
    return await AsyncStorage.removeItem(key);
}

export { setDataStorageItem, getDataStorageItem, eraseDataStorageItem };