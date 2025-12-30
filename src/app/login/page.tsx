"use client";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { signInWithGoogle } from "@/lib/auth";
import { getFirebaseAuthErrorMessage } from "@/lib/firebaseErrors";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleLogin = async () => {
        setError(null);
        setSuccess(null);

        if (!email || !password) {
            setError("Email and password are required.");
            return;
        }

        setLoading(true);

        try {
            await signInWithEmailAndPassword(auth, email, password);
            setSuccess("Login successful 🎉");
            setTimeout(() => router.push("/dashboard"), 800);
        } catch (err: any) {
            setError(getFirebaseAuthErrorMessage(err.code));
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setError(null);
        setSuccess(null);
        setLoading(true);

        try {
            await signInWithGoogle();
            setSuccess("Logged in with Google 🎉");
            setTimeout(() => router.push("/dashboard"), 800);
        } catch (err: any) {
            setError(getFirebaseAuthErrorMessage(err.code));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Login</h1>

            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}

            <input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={handleLogin} disabled={loading}>
                {loading ? "Logging in..." : "Login"}
            </button>

            <button onClick={handleGoogleLogin} disabled={loading}>
                Sign in with Google
            </button>
        </div>
    );
}
