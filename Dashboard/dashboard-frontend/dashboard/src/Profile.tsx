import { useEffect, useState } from 'react'
import { usePageContext } from "./PageContext.tsx";
import Dashboard from './Dashboard';

function Profile() {
    const { setMessage } = usePageContext();
    const [user, setUser] = useState({
        picture: null,
        name: null,
        email: null
    });
    const [editUser, setEditUser] = useState({
        name: "",
        email: "",
        pass: ""
    });
    const [tasks, setTasks] = useState({
        tt: 0,
        tc: 0,
        pt: 0,
        tp: 0
    });
    const [isTasks, setIsTasks] = useState(false);
    const [isRender, setIsRender] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    async function auth() {
        try {
            const response = await fetch(
                'http://localhost:8082/api/dash/profile', { credentials: 'include' }
            );

            const data = await response.json();
            if (data && response.status === 200) {
                setUser(data);
            } else {
                window.location.href = "http://localhost:3000/";
            }
        } catch (error) {
            console.error(error);
            setMessage("Authentication error");
            window.location.href = "http://localhost:3000/";
        }
    };

    async function taks() {
        try {
            const response = await fetch(
                'http://localhost:8082/api/dash/tasks', { credentials: 'include' }
            );

            const data = await response.json();
            if (response && data && response.status === 302) {
                setTasks(data);
                setIsTasks(true);
            }
        } catch (error) {
            console.error(error);
        }
    };

    async function deleteUser() {
        try {
            const response = await fetch("http://localhost:8090/api/users", {
                method: "DELETE",
                credentials: "include",
            });

            if (response.status === 204) {
                setMessage("User deleted");
                window.location.href = "http://localhost:3000/";
            }
        } catch (error) {
            console.error(error);
        }
    };

    async function update() {
        try {
            const response = await fetch(
                'http://localhost:8090/api/users', {
                method: 'PATCH',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(editUser)
            }
            );

            const data = await response.json();
            if (response && data && response.status === 200) {
                setUser(data);
                setMessage("User updated");
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (!isRender) {
            auth();
            taks();
            setIsRender(true);
        }
    }, []);

    useEffect(() => {
        if (user) {
            setEditUser({
                name: user.name ?? "",
                email: user.email ?? "",
                pass: "",
            });
        }
    }, [user]);

    return (<div className='body'>
        <div className='profile'>
            <div className='title'>
                <h1>Profile information</h1>
            </div>

            <div className='grup'>
                <div className='container'>
                    <img draggable={false} src={user.picture ? user.picture : "https://static0.howtogeekimages.com/wordpress/wp-content/uploads/2023/08/tiktok-no-profile-picture.png"} alt="profile picture" />
                    <div className='basic-info'>
                        <div className='user-info'>
                            <h2><b>User name: </b>{!isEditing && user.name}</h2>
                            {isEditing && <input id='editName' type='text' value={editUser.name || ""} onChange={e => setEditUser({ ...editUser, name: e.target.value })} />}
                        </div>

                        <div className='user-info'>
                            <h3><b>E-mail: </b>{!isEditing && user.email}</h3>
                            {isEditing && <input id='editEmail' type='text' value={editUser.email || ""} onChange={e => setEditUser({ ...editUser, email: e.target.value })} />}
                        </div>

                        {isEditing && <div className='user-info'>
                            <h3><b>Password: </b></h3>
                            <input type='text' id='editPass' onChange={e => setEditUser({ ...editUser, pass: e.target.value })} />
                        </div>}
                    </div>
                    <div className='bts'>
                        {isEditing && <input type="button" className="del-btn" value="Save" onClick={() => update()} />}
                        <input type="button" className="btn" value={!isEditing ? "Update" : "Cancel"} onClick={() => setIsEditing(!isEditing)} />
                        <input type="button" className="del-btn" value="Delete" onClick={() => {
                            if (confirm("Do you want to delete your acount?")) {
                                deleteUser();
                            }
                        }} />
                    </div>
                </div>

                {isTasks && <div className='container'>
                    <div className='tasks'>
                        <p><b>Total tasks: </b>{tasks.tt}</p>
                        <p><b>Tasks completed: </b>{tasks.tc}</p>
                    </div>

                    <div className='tasks'>
                        <p><b>Tasks in progress: </b>{tasks.tp}</p>
                        <p><b>Pending tasks: </b>{tasks.pt}</p>
                    </div>
                </div>}
            </div>
        </div>

        <div className='title'>
            <h1>Dashboard</h1>
        </div>
        <Dashboard></Dashboard>
    </div>);
}

export default Profile;