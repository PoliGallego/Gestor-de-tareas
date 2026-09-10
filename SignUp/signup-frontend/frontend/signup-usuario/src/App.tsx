import { useEffect, useState } from 'react'
import { PageContext } from './PageContext';
import SignUp from './SignUp'
import Info from './Info';

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
      <SignUp />
    </PageContext.Provider>
  )
}

export default App
