import { useState } from "react";
import { crearTablero } from "../services/tablerosService";
import type { Tablero } from "../services/tablerosService";

interface CreateBoardModalProps {
    onCreated: (tablero: Tablero) => void;
    onClose: () => void;
}

export default function CreateBoardModal({ onCreated, onClose }: CreateBoardModalProps) {
    const [nombre, setNombre] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    async function handleCreateBoard(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        setError(null);

        if (nombre.trim().length === 0) {
            setError("El nombre del tablero es obligatorio");
            return;
        }

        if (nombre.length > 50) {
            setError("El nombre debe tener menos de cincuenta caracteres");
            return;
        }

        setIsSaving(true);

        try {
            const tableroCreado = await crearTablero(nombre);
            onCreated(tableroCreado);
        } catch (err) {
            setError(err instanceof Error ? err.message : "No se pudo crear el tablero");
        } finally {
            setIsSaving(false);
        }
    }

    function closeModal() {
        if (isSaving) return;
        onClose();
    }

    return (
        <div className="task-modal__backdrop" role="presentation" onMouseDown={closeModal}>
            <section
                className="task-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="board-modal-title"
                onMouseDown={(event) => event.stopPropagation()}
            >
                <div className="task-modal__header">
                    <div>
                        <p className="task-modal__eyebrow">Nuevo tablero</p>
                        <h2 id="board-modal-title">Crear tablero</h2>
                    </div>
                </div>

                <form className="task-form" onSubmit={handleCreateBoard}>
                    {error && <p className="task-form__error">{error}</p>}

                    <label>
                        Nombre
                        <input
                            type="text"
                            value={nombre}
                            onChange={(event) => setNombre(event.target.value)}
                            placeholder="Escribe el nombre del tablero"
                            autoFocus
                            required
                        />
                    </label>

                    <div className="task-modal__actions">
                        <button type="button" className="task-modal__cancel" onClick={closeModal}>
                            Cerrar
                        </button>
                        <button type="submit" className="task-modal__save" disabled={isSaving}>
                            {isSaving ? "Creando..." : "Crear tablero"}
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
}
