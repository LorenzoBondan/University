import './styles.css';
import { useCallback, useEffect, useState } from 'react';
import { getTokenData } from 'util/auth';
import ProfileCard from './ProfileCard';
import { User } from 'types';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';

const Profile = () => {

  const [user, setUser] = useState<User | null>(null);

  const getUser = useCallback(async () => {
      try {
          const email = getTokenData()?.user_name;

          if (email) {
              const params: AxiosRequestConfig = {
              method: "GET",
              url: `/users/email/${email}`,
              withCredentials: true,
          };

          const response = await requestBackend(params);
          setUser(response.data);
      }
      } catch (error) {
          console.log("Error: " + error);
      }
  }, []);

  useEffect(() => {
      getUser();
  }, [getUser]);

    return(
        <div className='profile-container'>
          {user && <ProfileCard user={user}/>}
        </div>
    );
}

export default Profile;