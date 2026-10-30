import { Button } from "@gestor-tareas/react-components";
import type { Tablero } from "../services/tablerosService";

interface BoardSelectorProps {
  tableros: Tablero[];
  tableroActual: Tablero | null;
  onSelect: (tablero: Tablero) => void;
  onCreate: () => void;
}

export default function BoardSelector({ tableros, tableroActual, onSelect, onCreate }: BoardSelectorProps) {

  function handleChange(tableroId: string) {
    const tablero = tableros.find((t) => t.id === tableroId);
    if (tablero) {
      onSelect(tablero);
    }
  }

  return (
    <div className="board-selector">
      <label htmlFor="board-selector">Tablero</label>
      <select
        id="board-selector"
        value={tableroActual?.id ?? ""}
        onChange={(event) => handleChange(event.target.value)}
      >
        {tableros.map((tablero) => (
          <option key={tablero.id} value={tablero.id}>
            {tablero.nombre}
          </option>
        ))}
      </select>
      <Button text="Nuevo tablero" onClick={onCreate} />
    </div>
  );
}
