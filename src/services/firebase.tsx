import { initializeApp } from "firebase/app";
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
    authDomain: "pipeup-a17ec.firebaseapp.com",
    databaseURL: "https://pipeup-a17ec-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "pipeup-a17ec",
    storageBucket: "pipeup-a17ec.appspot.com",
    messagingSenderId: "3550836188",
    appId: "1:3550836188:web:97a733d88f60467e894b19",
    measurementId: "G-H23KMYLW7D"
};

const getApp = () => initializeApp(firebaseConfig);
const getStore = () => getStorage(getApp())

const uploadFile = (file: any, path: string) => {
    return new Promise((resolve, reject) => {
        const storage = getStore()
        const storageRef = ref(storage, path)
        uploadBytes(storageRef, file)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
        }
    )
}

const getFileUrl = (path: string) => {
    return new Promise((resolve: (url: string) => void, reject) => {
        const storage = getStore()
        const storageRef = ref(storage, path)
        getDownloadURL(storageRef)
            .then(url => {
                resolve(url)
            })
            .catch(err => {
                reject(err)
            })
    })
}

const deleteFile = (path: string) => {
    return new Promise((resolve, reject) => {
        const storage = getStore()
        const storageRef = ref(storage, path)
        deleteObject(storageRef)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
    })
}

export {getFileUrl, uploadFile, getApp, getStore, deleteFile}