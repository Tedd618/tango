import { auth0 } from "@/lib/auth0";

export async function syncUserWithBackend() {
    const session = await auth0.getSession();
    if (!session?.user) return null;

    try {
        const response = await fetch("http://127.0.0.1:8000/api/users/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            // We pass APPLICANT as the default role for now.
            body: JSON.stringify({
                email: session.user.email,
                name: session.user.name || session.user.nickname || "Unknown",
                role: "applicant",
            }),
        });

        // Status 400 with "Email already registered" is expected for returning users
        if (!response.ok && response.status !== 400) {
            console.error("Failed to sync user to backend", await response.text());
        }
    } catch (err) {
        console.error("Error communicating with backend:", err);
    }

    return session.user;
}
