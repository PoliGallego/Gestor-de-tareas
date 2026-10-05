import { useEffect, useState } from 'react'
import { PageContext } from './PageContext';
import Home from './components/Home'
import { auth, Footer, Modal, NavBar } from "@gestor-tareas/react-components";
import "@gestor-tareas/react-components/styles.css";

function App() {
  const [isMsgShow, setMsgShow] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const authUs = async () =>{
      try {
        const data = await auth();
        if (data) {
          setIsAuth(true);
        }
      } catch (error) {}
    };
    authUs();
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
    <PageContext.Provider value={{ isAuth, isMsgShow, message, setMessage }}>
      {isMsgShow && <Modal text={message} setShow={setMsgShow} title={'Información'} isChoose={false} />}
      {isAuth ? <NavBar /> : <div className='alt navBar'></div>}
      <Home />
      <Footer />
    </PageContext.Provider>
  )
}

export default App
