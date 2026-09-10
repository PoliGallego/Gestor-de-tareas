import './assets/Info.css'
import '@fortawesome/fontawesome-free/css/all.min.css';

type InfoProps = {
  text: string;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
};

function Info({ text, setShow }: InfoProps) {

    return <div className="info-body">
        <div className="info-container">
            <div className="info-div">
                <div className='info-title'>
                    <i className="fa-solid fa-circle-info"></i>
                    <h1>Information</h1>
                </div>
                <p>{text || "Hello world!"}</p>
                <input type="button" value={"Agreed"} onClick={() => setShow(false)} />
            </div>
        </div>
    </div>
}

export default Info;