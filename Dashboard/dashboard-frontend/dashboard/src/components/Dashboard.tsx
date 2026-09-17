import { useEffect, useState } from "react";
import TaskCard from "./TaskCard";
import type { TaskData } from "../services/dashboardService";
import { getInProgressTasks, getPendingTasks } from "../services/dashboardService";

function Dashboard() {
    const [progress, setProgress] = useState<TaskData[]>([]);
    const [pending, setPending] = useState<TaskData[]>([]);
    const [isRender, setIsRender] = useState(false);
    const [isPDown, setPDown] = useState(false);
    const [isQDown, setQDown] = useState(false);

    async function showInProgress() {
        try {
            const data = await getInProgressTasks();
            if (data) {
                setProgress(data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    async function showPending() {
        try {
            const data = await getPendingTasks();
            if (data) {
                setPending(data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    function tasks(tasks: TaskData[]) {
        if (tasks.length === 0) {
            return <p>There are no tasks.</p>;
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

    useEffect(() => {
        if (!isRender) {
            showInProgress();
            showPending();
            setIsRender(true);
        }
    }, []);

    return (<div className='dashboard'>
        <div className='container'>
            <div className="container-header">
                <h2>Tasks in progress: </h2>
                <button onClick={() => setPDown(!isPDown)}>Toggle</button>
            </div>
            {isPDown && <div className="list-cont">
                {tasks(progress)}
            </div>}
        </div>

        <div className='container'>
            <div className="container-header">
                <h2>Pending tasks: </h2>
                <button onClick={() => setQDown(!isQDown)}>Toggle</button>
            </div>
            {isQDown && <div className="list-cont">
                {tasks(pending)}
            </div>}
        </div>
    </div>);
}

export default Dashboard;