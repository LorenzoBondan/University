import './styles.css';
import { User } from 'types';

type Props ={
    user: User;
}

const ProfileCard = ({user} : Props) => {
    return(
        <div className='profile-card-container'>
            <div className='profile-card-image-container'>
                <img src={user?.imgUrl} alt="" />
            </div>
            <div className='profile-card-content-container'>
                <h1>{user?.name}</h1>
                <h4>{user?.email}</h4>
            </div>
            {user?.courses && (
                <div className='profile-card-courses-container'>
                    <h2>Courses <span>({user.courses.length})</span></h2>
                    {user.courses.map(c => (
                        <div className='profile-card-courses-row'>
                            <p key={c.id}>{c.name}</p>
                        </div>
                    ))}
                </div>
            )}
            {user?.classes && (
                <div className='profile-card-courses-container'>
                    <h2>Classes <span>({user.classes.length})</span></h2>
                    <div className='profile-card-courses-row'>
                        {user.classes.map(c => 
                            <p key={c.id}> + {c.code}</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProfileCard;