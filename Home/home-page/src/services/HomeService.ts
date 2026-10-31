export async function auth() {

    const response = await fetch(
        'http://localhost:8090/auth', { credentials: 'include' }
    );

    if (response.status !== 302) {
        throw new Error(`Auth error: ${response.status}`);
    }

    const data = await response.json();
    return data;
}