import { useEffect, useState } from 'react'
import Dashboard from './Dashboard';

function Profile() {
    const [user, setUser] = useState({
        picture: null,
        name: null,
        email: null
    });
    const [tasks, setTasks] = useState({
        tt: 0,
        tc: 0,
        pt: 0,
        tp: 0
    });
    const [isTasks, setIsTasks] = useState(false);
    const [isRender, setIsRender] = useState(false);

    async function auth() {
        try {
            const response = await fetch(
                'http://localhost:8082/api/dash/profile', { credentials: 'include' }
            );

            const data = await response.json();
            if (response && data && response.status === 200) {
                // setMessage(msg);
                setUser(data);
            } else {
                window.location.href = "http://localhost:3000/";
            }
        } catch (error) {
            console.error(error);
            // setMessage("Error");
            window.location.href = "http://localhost:3000/";
        }
    }

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
    }

    useEffect(() => {
        if (!isRender) {
            auth();
            taks();
            setIsRender(true);
        }
    }, []);

    return (<div className='body'>
        <div className='profile'>
            <div className='title'>
                <h1>Profile information</h1>
            </div>

            <div className='grup'>
                <div className='container'>
                    <img draggable={false} src={user.picture ? user.picture : "https://static0.howtogeekimages.com/wordpress/wp-content/uploads/2023/08/tiktok-no-profile-picture.png"} alt="profile picture" />
                    <div className='basic-info'>
                        <h2><b>User name: </b>{user.name}</h2>
                        <h3><b>E-mail: </b>{user.email}</h3>
                    </div>
                    <div className='bts'>
                        <input type="button" className="btn" value="Update" />
                        <input type="button" className="del-btn" value="Delete" />
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