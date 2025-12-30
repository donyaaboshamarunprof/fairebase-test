import { storage } from "@/lib/firebase";
import {
    ref,
    uploadBytes,
    getDownloadURL,
} from "firebase/storage";
import { User } from "firebase/auth";

export async function uploadFile(
    file: File,
    user: User,
    folder = "uploads"
) {
    const fileRef = ref(
        storage,
        `${folder}/${user.uid}/${crypto.randomUUID()}-${file.name}`
    );

    await uploadBytes(fileRef, file);
    const url = await getDownloadURL(fileRef);

    return url;
}
// https://firebasestorage.googleapis.com/v0/b/bnosa-staging.firebasestorage.app/o/images%2Fzc2009JJoKSjbpD6LFLQDW5YwZP2%2F6b97113d-d0f3-4d75-a7cd-234380b2d9f1-cursor.png?alt=media&token=ab53cd60-e1fa-4ebc-b546-384b4939d3a0