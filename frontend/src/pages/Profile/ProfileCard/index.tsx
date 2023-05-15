
import { useCallback, useEffect, useState } from 'react';
import { AxiosRequestConfig } from 'axios';
import { BASE_URL, requestBackend } from 'util/requests';

import './styles.css';
import { Course, User } from 'types';


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
      //



    const [courses, setCourses] = useState<Course[]>([]);

    useEffect(() => {
    async function fetchCourses() {
      if (page && page.coursesId.length > 0) {
        const promises = page.coursesId.map(courseId =>
          fetch(`${BASE_URL}/courses/${courseId}`).then(res => res.json())
        );
        const courseData = await Promise.all(promises);
        setCourses(courseData);
      }
    }

    fetchCourses();
  }, [page]);


    return(
        <div className='profile-card-container base-card'>
            <div className='profile-card-content-container'>
                <h1>{page?.name}</h1>
                <h4>Email: {page?.email}</h4>
            </div>

            {courses && (
                <div className='profile-card-team-container'>
                    <h2>Courses</h2>
                    {courses.map(c => (
                        <p key={c.id}>{c.name}</p>
                    ))}
                </div>
            )}

            {page?.classesId && (
                <div className='profile-card-team-container'>
                    <h2>Classes</h2>
                    {page?.classesId.map(c => (
                        <p key={c}>{c} + {c}</p>
                    ))}
                </div>
            )}

        </div>
    );
}

export default ProfileCard;