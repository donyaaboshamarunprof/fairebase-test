import { auth } from "@/lib/firebase";
import {
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";

const googleProvider = new GoogleAuthProvider();

export async function signInWithGoogle() {
    await signInWithPopup(auth, googleProvider);
}
