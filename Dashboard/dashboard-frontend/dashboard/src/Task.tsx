import { useState } from "react";
import './assets/Task.css';

export interface TaskData {
    prioridad: string;
    fecha_fin: string;
    nombre: string;
    descrip: string;
}

function Task({ task }: { task: TaskData }) {
    const [data] = useState<TaskData>(task);

    return (<div className="task-card">
      <div className="task-card__header">
        <span className="task-card__priority">
          {data.prioridad}
        </span>
        <span className="task-card__due">{data.fecha_fin}</span>
      </div>

      <h3 className="task-card__title">{data.nombre}</h3>
      <p className="task-card__description">{data.descrip}</p>

      {/* <div className="task-card__tags">
        {task.tags.map((tag) => (
          <span key={tag} className="task-card__tag">
            #{tag}
          </span>
        ))}
      </div> */}

      {/* <div className="task-card__footer">
        {assignee ? (
          <div className="task-card__assignee">
            <Avatar member={assignee} />
            <span>{assignee.name}</span>
          </div>
        ) : (
          <span className="task-card__assignee task-card__assignee--empty">Sin asignar</span>
        )}
      </div> */}
    </div>);
}

export default Task;