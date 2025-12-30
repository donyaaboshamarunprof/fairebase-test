export function getFirebaseAuthErrorMessage(code: string) {
    switch (code) {
        case "auth/invalid-email":
            return "Please enter a valid email address.";
        case "auth/user-not-found":
            return "No account found with this email.";
        case "auth/wrong-password":
            return "Incorrect password.";
        case "auth/too-many-requests":
            return "Too many attempts. Try again later.";
        case "auth/popup-closed-by-user":
            return "Login popup was closed.";
        case "auth/network-request-failed":
            return "Network error. Please check your connection.";
        default:
            return "Login failed. Please try again.";
    }
}
