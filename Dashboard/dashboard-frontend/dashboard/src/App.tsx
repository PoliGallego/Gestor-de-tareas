import './assets/Profile.css';
import './assets/Dashboard.css';
import Profile from './components/Profile';
import { useEffect, useState } from 'react';
import { PageContext } from './PageContext';
import { Footer, Modal, NavBar } from '@gestor-tareas/react-components';
import '@gestor-tareas/react-components/styles.css';
import Dashboard from './components/Dashboard';
import { getInfo, type TaskData, type Totals } from './services/dashboardService';

function App() {
  const [isMsgShow, setMsgShow] = useState(false);
  const [message, setMessage] = useState("");
  const [totals, setTotals] = useState<Totals | null | undefined>();
  const [pending, setPending] = useState<TaskData[]>();
  const [progress, setProgress] = useState<TaskData[]>();

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getInfo();
        if (data) {
          setTotals(data.count);
          setPending(data.pending);
          setProgress(data.inprog);
        }
      } catch (error) {
        console.error(error);
      }
    }
    getData();
  }, []);

  useEffect(() => {
    if (message && message.trim().length > 0) {
      setMsgShow(true);
    }
  }, [message]);

  useEffect(() => {
    if (!isMsgShow) {
      setMessage("");
    }
  }, [isMsgShow]);


  return (
    <PageContext.Provider value={{ message, setMessage }}>
      {isMsgShow && <Modal text={message} setShow={setMsgShow} title={'Información'} isChoose={false} />}
      <NavBar />
      <div className='body'>
        <Profile totals={totals} />
        <div className='title'>
            <h1>Resumen</h1>
        </div>
        <Dashboard progress={progress} pending={pending} />
      </div>
      <Footer />
    </PageContext.Provider>
  )
}

export default App
