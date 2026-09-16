import { useState } from 'react';
import { usePageContext } from '../PageContext';
import { deletePanel } from "../services/panelesService";

export default function DeleteModal() {
    const { setError, focusTask, setIsDModalOpen, setAllTasks, setFocusTask } = usePageContext();
    const [isSaving, setIsSaving] = useState(false);

    async function handleDeleteTask(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        setError(null);
        setIsSaving(true);

        try {
            if (!focusTask) {
                return
            }
            await deletePanel(focusTask?.id);

            setAllTasks((currentTasks) => currentTasks.filter((task) => task.id !== focusTask.id));
            setIsSaving(false);
            closeModal();
        } catch (error) {
            setError(error instanceof Error ? error.message : "No se pudo eliminar la tarea");
        } finally {
            setIsSaving(false);
        }
    };

    function closeModal() {
        if (isSaving) return;
        setFocusTask(null);
        setIsDModalOpen(false);
    };

    return <div className="task-modal__backdrop" role="presentation" onMouseDown={closeModal}>
        <section
            className="task-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="task-modal-title"
            onMouseDown={(event) => event.stopPropagation()}
        >
            <div className="task-modal__header">
                <div>
                    <h2 id="task-modal-title">Confirmar Eliminación</h2>
                </div>
            </div>
            <form className="task-form" onSubmit={handleDeleteTask}>
                <p>El panel será eliminado permanentemente</p>
                <div className="task-modal__actions">
                    <button type="button" className="task-modal__cancel" onClick={closeModal}>Cerrar</button>
                    <button type="submit" className="task-modal__save" disabled={isSaving}>
                        {isSaving ? "Eliminando..." : "Eliminar"}
                    </button>
                </div>
            </form>

        </section>
    </div>

}