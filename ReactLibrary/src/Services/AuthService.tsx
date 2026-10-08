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
            try {
                await setPage("login");
            } catch (error) {
                alert("Ha ocurrido un error, la ventana se cerrará a continuación");
                window.close();
            }
        }
    } catch (error) {
        console.error(error);
    }
}

export async function setPage(page: string) {
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
        case "reportes":
            url = "http://localhost:3040";
            break;
        case "signup":
            url = "http://localhost:3010";
            break;
        case "login":
            url = "http://localhost:3000";
            break;
    }
    await isPageLoad(url);
    window.location.href = url;
}

export async function isPageLoad(url: string) {
    const response = await fetch(url, { method: 'GET' });

    if (!response.ok) {
        throw new Error("Page not load");
    }
}