import { useEffect, useState } from 'react';
import { NavBar, Modal, Footer } from '@gestor-tareas/react-components';
import '@gestor-tareas/react-components/styles.css';
import { PageContext } from './PageContext';
import { ReportesDashboard } from './components/ReportesDashboard';

function App() {
  const [isMsgShow, setMsgShow] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (message && message.trim().length > 0) {
      setMsgShow(true);
    }
  }, [message]);

  useEffect(() => {
    if (!isMsgShow) {
      setMessage('');
    }
  }, [isMsgShow]);

  return (
    <PageContext.Provider value={{ message, setMessage }}>
      {isMsgShow && <Modal text={message} setShow={setMsgShow} title="Información" isChoose={false} />}
      <NavBar />
      <main>
        <ReportesDashboard />
      </main>
      <Footer/>
    </PageContext.Provider>
  );
}

export default App;