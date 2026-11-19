import { useState } from "react";
import TaskCard from "./TaskCard";
import type { TaskData } from "../services/dashboardService";
import { Button } from "@gestor-tareas/react-components";

interface dashboardProps {
    progress: TaskData[] | null | undefined;
    pending: TaskData[] | null | undefined;
}

function Dashboard({progress, pending}: dashboardProps) {
    const [isPDown, setPDown] = useState(false);
    const [isQDown, setQDown] = useState(false);

    function tasks(tasks: TaskData[] | null | undefined) {
        if (!tasks || tasks.length === 0) {
            return <p>No hay tareas.</p>;
        }

        return (<div className="tasks-list">
            {tasks.map((task) => (
                <TaskCard
                    key={task.nombre}
                    task={task}
                />
            ))}
        </div>);
    }

    return (<div className='dashboard'>
        <div className='container'>
            <div className="container-header">
                <h2>Tareas en progreso: </h2>
                <Button variant="quiet" onClick={() => setPDown(!isPDown)}>{isPDown ? "Ocultar" : "Mostrar"}</Button>
            </div>
            {isPDown && <div className="list-cont">
                {tasks(progress)}
            </div>}
        </div>

        <div className='container'>
            <div className="container-header">
                <h2>Tareas pendientes: </h2>
                <Button variant="quiet" onClick={() => setQDown(!isQDown)}>{isQDown ? "Ocultar" : "Mostrar"}</Button>
            </div>
            {isQDown && <div className="list-cont">
                {tasks(pending)}
            </div>}
        </div>
    </div>);
}

export default Dashboard;