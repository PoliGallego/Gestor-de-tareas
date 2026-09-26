export interface User {
    picture: string | null,
    name: string | null,
    email: string | null
}

export async function auth(): Promise<User> {

    const response = await fetch(
        'http://localhost:8090/auth', { credentials: 'include' }
    );

    if (response.status !== 302) {
        throw new Error(`Auth error: ${response.status}`);
    }

    const data: User = await response.json();
    return data;
}

export async function logOut() {
    try {
        const response = await fetch(
            'http://localhost:8090/logout', { credentials: 'include' }
        );

        if (response && response.ok) {
            window.location.href = "http://localhost:3000/";
        }
    } catch (error) {
        console.error(error);
    }
}

export function setPage(page: string) {
    let url: string = window.location.href;
    switch (page) {
        case "home":
            url = "http://localhost:3001";
            break;
        case "prin":
            url = "http://localhost:3020";
            break;
        case "perf":
            url = "http://localhost:3030";
            break;
        case "signup":
            url = "http://localhost:3010";
            break;
    }
    window.location.href = url;
}