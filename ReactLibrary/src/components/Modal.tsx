import { Button } from "./Button";
import info from "../assets/info.png";

export type ModalProps = {
    title: string;
    text: string;
    isChoose: boolean;
    setChoose?: React.Dispatch<React.SetStateAction<boolean>>;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
};

export function Modal({ title = "modalrmación", text, isChoose, setChoose, setShow }: ModalProps) {

    const choose = (choo: boolean) => {
        if (isChoose && setChoose) {
            setChoose(choo);
        }
        setShow(false);
    };

    return <div className="modal-body" onClick={() => choose(false)}>
        <div className="modal-container">
            <div className="modal-div">
                <div className='modal-title'>
                    <img className="modal-icon" src={info} alt="info icon" draggable={false}/>
                    <h1>{title}</h1>
                </div>
                <p>{text || ""}</p>
                <Button type="submit" text="Aceptar" onClick={() => choose(true)} />
                {isChoose && <Button type="submit" text="Cancelar" onClick={() => choose(false)} />}
            </div>
        </div>
    </div>
}