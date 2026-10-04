export interface SignUpDTO {
    name: string,
    email: string,
    pass: string
}

export async function signup(signUpForm: SignUpDTO) {
    const response = await fetch('/signup', {
        credentials: 'include',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(signUpForm)
    });

    if (response.status !== 202) {
        throw new Error("Error en los datos");
    }
}