
export interface User {
    picture: string | null,
    name: string | null,
    email: string | null
}

export interface PassUser {
    picture: string,
    name: string,
    email: string,
    pass: string
}

export interface Totals {
    tt: number,
    tc: number,
    pt: number,
    tp: number
}

export interface TaskData {
    prioridad: number;
    fechaFin: string;
    nombre: string;
    descrip: string;
    color: string;
}

export interface InfoDTO {
    count: Totals;
    inprog: TaskData[];
    pending: TaskData[];
}

export async function auth() {

    const response = await fetch(
        'http://localhost:8090/auth', { credentials: 'include' }
    );

    if (response.status !== 302) {
        throw new Error(`Auth error: ${response.status}`);
    }

    const data: User = await response.json();
    return data;
}

export async function getInfo(): Promise<InfoDTO> {
    const response = await fetch(
        'http://localhost:8082/api/dash', { credentials: 'include' }
    );

    if (response.status !== 302) {
        throw new Error(`Profile info error: ${response.status}`);
    }

    const data = await response.json();
    return data;
}

export async function updateUser(user: PassUser): Promise<User> {
    const response = await fetch(
        'http://localhost:8090/edit', {
        method: 'PATCH',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
    }
    );

    if (!response.ok) {
        throw new Error(`Update user error: ${response.status}`);
    }

    const data: User = await response.json();
    return data;
}