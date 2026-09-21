import { Button } from "./Button";

export type ModalProps = {
    title: string;
    text: string;
    isChoose: boolean;
    setChoose: React.Dispatch<React.SetStateAction<boolean>>;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
};

export function Modal({ title = "modalrmación", text, isChoose, setChoose, setShow }: ModalProps) {

    return <div className="modal-body">
        <div className="modal-container">
            <div className="modal-div">
                <div className='modal-title'>
                    <h1>{title}</h1>
                </div>
                <p>{text || ""}</p>
                <Button type="submit" value={"Aceptar"} onClick={() => {setChoose(true); setShow(false);}} />
                {isChoose && <Button type="submit" value={"Cancelar"} onClick={() => {setChoose(false); setShow(false);}} />}
            </div>
        </div>
    </div>
}