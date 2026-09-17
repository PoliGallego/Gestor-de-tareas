import './assets/Profile.css'
import './assets/Dashboard.css'
import Profile from './components/Profile'
import Header from './components/Header'
import { useEffect, useState } from 'react'
import { PageContext } from './PageContext';
import Info from './components/Info';

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
      {isMsgShow && <Info text={message} setShow={setMsgShow} />}
      <Header/>
      <Profile />
    </PageContext.Provider>
  )
}

export default App
