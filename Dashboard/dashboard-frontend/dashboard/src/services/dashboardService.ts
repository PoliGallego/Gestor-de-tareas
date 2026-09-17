
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
    fecha_fin: string;
    nombre: string;
    descrip: string;
    color: string;
}

export async function auth(): Promise<User> {

    const response = await fetch(
        'http://localhost:8082/api/dash/profile', { credentials: 'include' }
    );

    if (!response.ok) {
        throw new Error(`Auth error: ${response.status}`);
    }

    const data: User = await response.json();
    return data;
}

export async function getTaskTotals(): Promise<Totals> {
    const response = await fetch(
        'http://localhost:8082/api/dash/tasks', { credentials: 'include' }
    );

    if (response.status !== 302) {
        throw new Error(`Tasks totaks error: ${response.status}`);
    }

    const data: Totals = await response.json();
    return data;
}

export async function updateUser(user: PassUser): Promise<User> {
    const response = await fetch(
        'http://localhost:8090/api/users', {
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

export async function getInProgressTasks(): Promise<TaskData[]> {
    const response = await fetch(
        'http://localhost:8082/api/dash/in-prog', { credentials: 'include' }
    );

    if (response.status !== 302) {
        throw new Error(`In-progress tasks error: ${response.status}`);
    }

    const data: TaskData[] = await response.json();
    return data;
}

export async function getPendingTasks(): Promise<TaskData[]> {
    const response = await fetch(
        'http://localhost:8082/api/dash/pending', { credentials: 'include' }
    );

    if (response.status !== 302) {
        throw new Error(`Pending tasks error: ${response.status}`);
    }

    const data: TaskData[] = await response.json();
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