
import { useCallback, useEffect, useState } from 'react';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';

import './styles.css';
import {User } from 'types';


type Props ={
    userEmail: string | undefined;
}

const ProfileCard = ({userEmail} : Props) => {

    const [page, setPage] = useState<User>();

    const getUser = useCallback(() => {
        const params : AxiosRequestConfig = {
          method:"GET",
          url: `/users/email/${userEmail}`,
          withCredentials:true
        }
        requestBackend(params) 
          .then(response => {
            setPage(response.data);
          })
      }, [userEmail])

      useEffect(() => {
        getUser();
      }, [getUser]);

    return(
        <div className='profile-card-container'>
            <div className='profile-card-image-container'>
                <img src={page?.imgUrl} alt="" />
            </div>

            <div className='profile-card-content-container'>
                <h1>{page?.name}</h1>
                <h4>{page?.email}</h4>
            </div>

            {page?.courses && (
                <div className='profile-card-courses-container'>
                    <h2>Courses</h2>
                    {page.courses.map(c => (
                        <p key={c.id}>{c.name}</p>
                    ))}
                </div>
            )}

            {page?.classes && (
                <div className='profile-card-courses-container'>
                    <h2>Classes</h2>
                    {page.classes.map(c => 
                        <p key={c.id}> + {c.code}</p>
                    )}
                </div>
            )}

        </div>
    );
}

export default ProfileCard;