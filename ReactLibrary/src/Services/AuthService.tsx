export interface User {
    picture: string | null,
    name: string | null,
    email: string | null
}

export async function auth(): Promise<User> {

    const response = await fetch(
        '/auth', { credentials: 'include' }
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
            '/logout', { credentials: 'include' }
        );

        if (response && response.ok) {
            try {
                await setPage("login");
                window.open(window.location.href);
                window.close();
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
    let pathname: string = window.location.pathname;

    if (window.location.hostname.includes("localhost")) {
        let port: string = window.location.port;
        switch (page) {
            case "home":
                port = "3001";
                break;
            case "prin":
                port = "3020";
                break;
            case "perf":
                port = "3030";
                break;
            case "reportes":
                port = "3040";
                break;
            case "signup":
                port = "3010";
                break;
            case "login":
                port = "3000";
                break;
        }

        await isPageLoad("http://" + window.location.hostname + ":" + port);
        window.location.href = "http://" + window.location.hostname + ":" + port;
        return;
    }

    switch (page) {
        case "home":
            pathname = import.meta.env.VITE_HOME_URL;
            break;
        case "prin":
            pathname = import.meta.env.VITE_PRIN_URL;
            break;
        case "perf":
            pathname = import.meta.env.VITE_PRIN_URL;
            break;
        case "reportes":
            pathname = import.meta.env.VITE_PRIN_URL;
            break;
        case "signup":
            pathname = import.meta.env.VITE_PRIN_URL;
            break;
        case "login":
            pathname = import.meta.env.VITE_PRIN_URL;
            break;
    }
    await isPageLoad("http://" + window.location.host + pathname);
    window.location.pathname = pathname;
}

export async function isPageLoad(url: string) {
    const response = await fetch(url, { method: 'GET' });

    if (!response.ok) {
        throw new Error("Page not load");
    }
}