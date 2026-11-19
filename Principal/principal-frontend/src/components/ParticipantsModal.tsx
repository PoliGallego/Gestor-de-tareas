import { useEffect, useState } from "react";
import { agregarMiembro, getParticipantes, quitarMiembro } from "../services/tablerosService";
import type { Participante, Tablero } from "../services/tablerosService";

interface ParticipantsModalProps {
    tablero: Tablero;
    onClose: () => void;
}

export default function ParticipantsModal({ tablero, onClose }: ParticipantsModalProps) {
    const [participantes, setParticipantes] = useState<Participante[]>([]);
    const [email, setEmail] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    // Al abrir el modal se consultan los participantes del tablero
    useEffect(() => {
        const fetchParticipantes = async () => {
            try {
                setParticipantes(await getParticipantes(tablero.id));
            } catch (err) {
                setError(err instanceof Error ? err.message : "No se pudieron cargar los participantes");
            } finally {
                setIsLoading(false);
            }
        };

        fetchParticipantes();
    }, [tablero.id]);

    async function handleAddMember(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        setError(null);

        if (email.trim().length === 0) {
            setError("Escribe el correo de la persona que quieres agregar");
            return;
        }

        setIsSaving(true);

        try {
            const nuevoParticipante = await agregarMiembro(tablero.id, email.trim());
            setParticipantes((currentParticipantes) => [...currentParticipantes, nuevoParticipante]);
            setEmail("");
        } catch (err) {
            setError(err instanceof Error ? err.message : "No se pudo agregar el participante");
        } finally {
            setIsSaving(false);
        }
    }

    async function handleRemoveMember(usuarioId: string) {
        setError(null);

        try {
            await quitarMiembro(tablero.id, usuarioId);
            setParticipantes((currentParticipantes) =>
                currentParticipantes.filter((participante) => participante.usuarioId !== usuarioId));
        } catch (err) {
            setError(err instanceof Error ? err.message : "No se pudo quitar el participante");
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
                aria-labelledby="participants-modal-title"
                onMouseDown={(event) => event.stopPropagation()}
            >
                <div className="task-modal__header">
                    <div>
                        <p className="task-modal__eyebrow">{tablero.nombre}</p>
                        <h2 id="participants-modal-title">Participantes</h2>
                    </div>
                </div>

                <div className="task-form">
                    {error && <p className="task-form__error">{error}</p>}

                    {isLoading ? <p className="participants__empty">Cargando participantes...</p> :
                        <ul className="participants">
                            {participantes.map((participante) => (
                                <li key={participante.usuarioId} className="participants__item">
                                    <div>
                                        <p className="participants__name">
                                            {participante.nombre}
                                            {participante.esPropietario && <span className="participants__badge">Propietario</span>}
                                        </p>
                                        <p className="participants__email">{participante.email}</p>
                                    </div>
                                    {tablero.esPropietario && !participante.esPropietario &&
                                        <button type="button" className="task-modal__cancel"
                                            onClick={() => handleRemoveMember(participante.usuarioId)}>
                                            Quitar
                                        </button>}
                                </li>
                            ))}
                        </ul>}

                    {tablero.esPropietario &&
                        <form className="task-form" onSubmit={handleAddMember}>
                            <label>
                                Agregar por correo
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    placeholder="correo@ejemplo.com"
                                />
                            </label>

                            <div className="task-modal__actions">
                                <button type="button" className="task-modal__cancel" onClick={closeModal}>
                                    Cerrar
                                </button>
                                <button type="submit" className="task-modal__save" disabled={isSaving}>
                                    {isSaving ? "Agregando..." : "Agregar"}
                                </button>
                            </div>
                        </form>}

                    {!tablero.esPropietario &&
                        <div className="task-modal__actions">
                            <button type="button" className="task-modal__cancel" onClick={closeModal}>
                                Cerrar
                            </button>
                        </div>}
                </div>
            </section>
        </div>
    );
}
