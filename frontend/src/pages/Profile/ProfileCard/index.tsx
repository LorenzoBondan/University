
import { useCallback, useEffect, useState } from 'react';
import { AxiosRequestConfig } from 'axios';
import { BASE_URL, requestBackend } from 'util/requests';

import './styles.css';
import { Class, Course, User } from 'types';


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


    // courses

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


  // classes

  const [classes, setClasses] = useState<Class[]>([]);

  useEffect(() => {
  async function fetchClasses() {
    if (page && page.classesId.length > 0) {
      const promises = page.classesId.map(classId =>
        fetch(`${BASE_URL}/classes/${classId}`).then(res => res.json())
      );
      const classData = await Promise.all(promises);
      setClasses(classData);
    }
  }

  fetchClasses();
    }, [page]);

    return(
        <div className='profile-card-container'>
            <div className='profile-card-image-container'>
                <img src={page?.imgUrl} alt="" />
            </div>

            <div className='profile-card-content-container'>
                <h1>{page?.name}</h1>
                <h4>{page?.email}</h4>
            </div>

            {courses && (
                <div className='profile-card-courses-container'>
                    <h2>Courses</h2>
                    {courses.map(c => (
                        <p key={c.id}>{c.name}</p>
                    ))}
                </div>
            )}

            {classes && (
                <div className='profile-card-courses-container'>
                    <h2>Classes</h2>
                    {classes.map(c => 
                        <p> + {c.code}</p>
                    )}
                </div>
            )}

        </div>
    );
}

export default ProfileCard;