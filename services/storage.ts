import { firebaseApp } from "./firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
const storage = getStorage(firebaseApp);

export const uploadFile = async (file: File) => {
    const storageRef = ref(storage, `/files/${file.name}`);
    return uploadBytes(storageRef, file).then((snapshot) => {
        return getDownloadURL(snapshot.ref);
    })
}



