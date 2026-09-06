import { useState } from "react";

function Dashboard() {
    const [progress, setProgress] = useState([]);
    const [pending, setPending] = useState([]);

    function tasks(tasks: {}[]) {
        if (tasks.length <= 0) {
            return (<p>There are no tasks.</p>);
        }
        return (<div>
            
        </div>);
    };

    return (<div className='dashboard'>
        <div className='container'>
            <h2>Tasks in progress: </h2>
            <div className="tasks">
                {tasks(progress)}
            </div>
        </div>

        <div className='container'>
            <h2>Pending tasks: </h2>
            <div className="tasks">
                {tasks(pending)}
            </div>
        </div>
    </div>);
}

export default Dashboard;