import './assets/Profile.css';
import './assets/Dashboard.css';
import Profile from './components/Profile';
import { useEffect, useState } from 'react';
import { PageContext } from './PageContext';
import { Footer, Modal, NavBar } from '@gestor-tareas/react-components';
import '@gestor-tareas/react-components/styles.css';

function App() {
  const [isMsgShow, setMsgShow] = useState(false);
  const [message, setMessage] = useState("");

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
      <NavBar/>
      <Profile />
      <Footer/>
    </PageContext.Provider>
  )
}

export default App
