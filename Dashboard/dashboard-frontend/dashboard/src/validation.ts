// Regex de correo: usuario@dominio.tld (TLD de al menos 2 letras)
export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const MIN_PASSWORD_LENGTH = 8;

export type EditUserData = {
    name: string;
    email: string;
    pass: string;
};

/**
 * Valida la edición del perfil. La contraseña es opcional (vacía = no se cambia),
 * pero si se escribe debe tener al menos MIN_PASSWORD_LENGTH caracteres.
 * Retorna el mensaje de error o null si todo es correcto.
 */
export function validateEditUser(form: EditUserData): string | null {
    if (form.name.trim().length === 0) {
        return "The user name is required";
    }
    if (!EMAIL_REGEX.test(form.email.trim())) {
        return "The e-mail is not valid";
    }
    if (form.pass.length > 0 && form.pass.length < MIN_PASSWORD_LENGTH) {
        return `The password must be at least ${MIN_PASSWORD_LENGTH} characters long`;
    }
    return null;
}
