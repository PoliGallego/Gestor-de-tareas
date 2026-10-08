import { useState } from "react";
import { updatePanel } from "../services/panelesService";
import type { Task, TaskStatus } from "../types";
import { usePageContext } from "../PageContext";

const initialTaskForm: Task = {
    title: "",
    description: "",
    priority: "Media" as Task["priority"],
    status: "todo" as TaskStatus,
    color: "#afa7a7",
    startDate: "",
    dueDate: "",
    id: "",
    assigneeId: "",
    tags: []
};

export default function UpdateModal() {
    const { focusTask, error, setError, setAllTasks, setIsUModalOpen, setFocusTask } = usePageContext();
    const [isSaving, setIsSaving] = useState(false);
    const [taskForm, setTaskForm] = useState(focusTask ?? initialTaskForm);
    const [isErrorTitle, setErrorTitle] = useState(false);
    const [isErrorDate, setErrorDate] = useState(false);

    const validate = (): boolean => {
        const errorTitle: boolean = taskForm.title.length > 50;
        const startDate = new Date(taskForm.startDate);
        const endDate = new Date(taskForm.dueDate);
        const errorDate: boolean = isNaN(startDate.getTime());
        let difDate: boolean = false;

        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            if (endDate.getTime() <= startDate.getTime()) {
                difDate = true;
            }
        }

        setErrorTitle(errorTitle);
        setErrorDate(errorDate || difDate);

        return errorTitle || errorDate || difDate;
    };

    async function handleUpdateTask(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        setError(null);
        
        if (!validate()) {
            setIsSaving(true);
            try {
                if (!focusTask || !taskForm || taskForm.id.length === 0) {
                    return
                }
                const updatedTask = await updatePanel(focusTask?.id, taskForm);

                setAllTasks((currentTasks) => currentTasks.map((task) => task.id === updatedTask.id ? { ...task, ...updatedTask } : task));
                setIsSaving(false);
                closeModal();
            } catch (err) {
                setError(err instanceof Error ? err.message : "No se pudo guardar la tarea");
            } finally {
                setIsSaving(false);
            }
        }
    };

    function closeModal() {
        if (isSaving) return;
        setFocusTask(null);
        setIsUModalOpen(false);
    };

    return (<div className="task-modal__backdrop" role="presentation" onMouseDown={closeModal}>
        <section
            className="task-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="task-modal-title"
            onMouseDown={(event) => event.stopPropagation()}
        >
            <div className="task-modal__header">
                <div>
                    <h2 id="task-modal-title">Modificar tarea</h2>
                </div>
            </div>

            <form className="task-form" onSubmit={handleUpdateTask}>
                {error && <p className="task-form__error">{error}</p>}
                <label>
                    Título
                    <input
                        type="text"
                        value={taskForm.title}
                        onChange={(event) => setTaskForm({ ...taskForm, title: event.target.value })}
                        placeholder="Escribe el título de la tarea"
                        required
                    />
                    {isErrorTitle && <p className="task-form__error">Título inválido</p>}
                </label>

                {/* <label>
                    Descripción
                    <textarea
                        value={taskForm.description}
                        onChange={(event) => setTaskForm({ ...taskForm, description: event.target.value })}
                        placeholder="Describe lo que hay que hacer"
                        rows={3}
                    />
                </label> */}

                <div className="task-form__grid">
                    {/* <label>
                  Responsable
                  <select value={taskForm.assigneeId} onChange={(event) => setTaskForm({ ...taskForm, assigneeId: event.target.value })}>
                    {teamMembers.map((member) => <option key={member.id} value={member.id}>{member.name}</option>)}
                  </select>
                </label> */}

                    <label>
                        Prioridad
                        <select value={taskForm.priority} onChange={(event) => setTaskForm({ ...taskForm, priority: event.target.value as Task["priority"] })}>
                            <option value="Baja">Baja</option>
                            <option value="Media">Media</option>
                            <option value="Alta">Alta</option>
                            <option value="Urgente">Urgente</option>
                        </select>
                    </label>

                    <label>
                        Estado
                        <select value={taskForm.status} onChange={(event) => setTaskForm({ ...taskForm, status: event.target.value as TaskStatus })}>
                            <option value="todo">Por hacer</option>
                            <option value="in-progress">En progreso</option>
                            <option value="done">Hecho</option>
                        </select>
                    </label>

                    <label>
                        Color
                        <input type="color" value={taskForm.color} onChange={(event) => setTaskForm({ ...taskForm, color: event.target.value })} />
                    </label>

                    <label>
                        Fecha de inicio
                        <input type="date" value={taskForm.startDate} onChange={(event) => setTaskForm({ ...taskForm, startDate: event.target.value })} />
                        {isErrorDate && <p className="task-form__error">Fecha inválida</p>}
                    </label>

                    <label>
                        Fecha límite
                        <input type="date" value={taskForm.dueDate} onChange={(event) => setTaskForm({ ...taskForm, dueDate: event.target.value })} />
                    </label>
                </div>

                <div className="task-modal__actions">
                    <button type="button" className="task-modal__cancel" onClick={closeModal}>Cerrar</button>
                    <button type="submit" className="task-modal__save" disabled={isSaving}>
                        {isSaving ? "Guardando..." : "Guardar cambios"}
                    </button>
                </div>
            </form>
        </section>
    </div>);
}