import KanbanBoard from "./components/KanbanBoard";
import Header from "./components/Header";
import { PageContext } from "./PageContext";
import { useState } from "react";
import type { Task } from "./types";

function App() {
  const [error, setError] = useState<string | null>(null);
  const [isCModalOpen, setIsCModalOpen] = useState(false);
  const [isUModalOpen, setIsUModalOpen] = useState(false);
  const [isDModalOpen, setIsDModalOpen] = useState(false);
  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const [focusTask, setFocusTask] = useState<Task | null>(null);

  return (<PageContext.Provider value={{
    error, setError, isCModalOpen, setIsCModalOpen, isDModalOpen, setIsDModalOpen,
    isUModalOpen, setIsUModalOpen, allTasks, setAllTasks, focusTask, setFocusTask
  }}>
    <Header />
    <KanbanBoard />
  </PageContext.Provider>);
}

export default App;
