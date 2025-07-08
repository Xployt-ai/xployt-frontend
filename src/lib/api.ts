export const api = {
    login: async (email: string) => {
        return await fetch("/api/login", {
            method: "POST",
            body: JSON.stringify({ email }),
            headers: { "Content-Type": "application/json" }
        });
    }
};
