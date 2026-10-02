import { useEffect, useState } from 'react'
import { usePageContext } from "../PageContext.tsx";
import type { User, Totals, PassUser } from "../services/dashboardService.ts";
import { getTaskTotals, updateUser } from "../services/dashboardService.ts";
import Dashboard from './Dashboard.tsx';
import { auth, logOut, ProfilePic } from '@gestor-tareas/react-components';

function Profile() {
    const { setMessage } = usePageContext();
    const [user, setUser] = useState<User>({
        picture: null,
        name: null,
        email: null
    });
    const [editUser, setEditUser] = useState<PassUser>({
        name: "",
        email: "",
        pass: "",
        picture: ""
    });
    const [tasks, setTasks] = useState<Totals>({
        tt: 0,
        tc: 0,
        pt: 0,
        tp: 0
    });
    const [isTasks, setIsTasks] = useState(false);
    const [isRender, setIsRender] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    async function authUser() {
        try {
            const data = await auth();
            if (data) {
                setUser(data);
            } else {
                await logOut();
            }
        } catch (error) {
            await logOut();
        }
    };

    async function taks() {
        try {
            const data = await getTaskTotals();
            if (data) {
                setTasks(data);
                setIsTasks(true);
            }
        } catch (error) {
            console.error(error);
        }
    };

    // async function deleteUser() {
    //     try {
    //         const response = await fetch("http://localhost:8090/api/users", {
    //             method: "DELETE",
    //             credentials: "include",
    //         });

    //         if (response.status === 204) {
    //             setMessage("User deleted");
    //             window.location.href = "http://localhost:3000/";
    //         }
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    const validate = () : boolean => {
        const regex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;;
        const regexName: RegExp = /^[A-Za-z]{3,30}$/;;

        const passPass: boolean = editUser.pass.length === 0 ? true : editUser.pass.length > 7;

        return regexName.test(editUser.name) && regex.test(editUser.email) && passPass;
    };

    async function update() {
        if (validate()) {
            try {
                const data = await updateUser(editUser);
                if (data) {
                    setUser(data);
                    setMessage("Perfil Actualizado");
                }
            } catch (error) {
                console.error(error);
            }
        } else {
            setMessage("Datos inválidos");
        }
    }

    useEffect(() => {
        if (!isRender) {
            authUser();
            taks();
            setIsRender(true);
        }
    }, []);

    useEffect(() => {
        if (user) {
            setEditUser({
                name: user.name ?? "",
                email: user.email ?? "",
                picture: user.picture ?? "",
                pass: ""
            });
        }
    }, [user]);

    return (<div className='body'>
        <div className='profile'>
            <div className='title'>
                <h1>Información del perfil</h1>
            </div>

            <div className='grup'>
                <div className='container'>
                    <ProfilePic imgUrl={user.picture} userName={user.name ?? "No encontrado"} />
                    <div className='basic-info'>
                        <div className='user-info'>
                            <h2 className='name'><b>Nombre: </b>{!isEditing && user.name}</h2>
                            {isEditing && <input id='editName' type='text' value={editUser.name || ""} onChange={e => setEditUser({ ...editUser, name: e.target.value })} />}
                        </div>

                        <div className='user-info'>
                            <h3><b>E-mail: </b>{!isEditing && user.email}</h3>
                            {isEditing && <input id='editEmail' type='text' value={editUser.email || ""} onChange={e => setEditUser({ ...editUser, email: e.target.value })} />}
                        </div>

                        {isEditing && <div className='user-info'>
                            <h3><b>Contraseña: </b></h3>
                            <input type='text' id='editPass' onChange={e => setEditUser({ ...editUser, pass: e.target.value })} />
                        </div>}
                    </div>
                    <div className='bts'>
                        {isEditing && <input type="button" className="btn" value="Guardar" onClick={() => update()} />}
                        <input type="button" className="btn" value={!isEditing ? "Actualizar" : "Cancelar"} onClick={() => setIsEditing(!isEditing)} />
                        {/* <input type="button" className="del-btn" value="Delete" onClick={() => {
                            if (confirm("Do you want to delete your acount?")) {
                                deleteUser();
                            }
                        }} /> */}
                    </div>
                </div>

                {isTasks && <div className='container'>
                    <div className='tasks'>
                        <p><b>Total de tareas: </b>{tasks.tt}</p>
                        <p><b>Tareas completadas: </b>{tasks.tc}</p>
                    </div>

                    <div className='tasks'>
                        <p><b>Tareas en progreso: </b>{tasks.tp}</p>
                        <p><b>Tareas pendientes: </b>{tasks.pt}</p>
                    </div>
                </div>}
            </div>
        </div>

        <div className='title'>
            <h1>Resumen</h1>
        </div>
        <Dashboard></Dashboard>
    </div>);
}

export default Profile;