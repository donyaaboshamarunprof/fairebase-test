"use client";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { getFirebaseAuthErrorMessage } from "@/lib/firebaseErrors";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleRegister = async () => {
        setError(null);
        setSuccess(null);

        if (!email || !password) {
            setError("Email and password are required.");
            return;
        }

        setLoading(true);

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            setSuccess("Account created successfully 🎉");
            setTimeout(() => router.push("/login"), 1000);
        } catch (err: any) {
            setError(getFirebaseAuthErrorMessage(err.code));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Register</h1>

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

            <button onClick={handleRegister} disabled={loading}>
                {loading ? "Creating..." : "Sign Up"}
            </button>
        </div>
    );
}
