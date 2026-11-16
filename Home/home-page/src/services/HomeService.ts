export async function auth() {

    const response = await fetch(
        '/auth', { 
	method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }, 
    });

    if (!response.ok) {
        throw new Error(`Auth error: ${response.status}`);
    }

    const data = await response.json();
    return data;
}
