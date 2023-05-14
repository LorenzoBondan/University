
import { useParams } from 'react-router-dom';
import './styles.css';
import { useContext, useEffect, useState } from 'react';
import { Course, User } from 'types';
import axios, { AxiosRequestConfig } from 'axios';
import { BASE_URL, requestBackend } from 'util/requests';
import { ReactComponent as Arrow} from 'assets/images/arrow.svg';
import Plus from 'assets/images/plus.png';
import { AuthContext } from 'AuthContext';
import { getTokenData, isAuthenticated } from 'util/auth';

type UrlParams = {
    courseId: string;
}


const CourseDetails = () => {

    const { courseId } = useParams<UrlParams>();

    const [course, setCourse] = useState<Course>();

    useEffect(() => {
        axios
        .get(`${BASE_URL}/courses/${courseId}`)
        .then((response) => {
            setCourse(response.data);
            window.scrollTo(0,0);
        })
    }, [courseId]);

    const [showSelect, setShowSelect] = useState(false);
    const [showClasses, setShowClasses] = useState(false);

    const openAndCloseSelect = () => {
        if(showSelect){
            setShowSelect(false);
        }
        else{
            setShowSelect(true);
        }
    }

    const openAndCloseClasses = () => {
        if(showClasses){
            setShowClasses(false);
        }
        else{
            setShowClasses(true);
        }
    }

    // user
    let email: string;

    const { authContextData, setAuthContextData } = useContext(AuthContext);
    const [userPage, setUserPage] = useState<User>();

    useEffect(() => {
        if(isAuthenticated()){
            setAuthContextData({
            authenticated: true,
            tokenData: getTokenData(),
            })

            const userParams : AxiosRequestConfig = {
                method:"GET",
                url: `/users/email/${email}`,
                withCredentials:true
                }
        
                requestBackend(userParams) 
                    .then(response => {
                        setUserPage(response.data);  
                })
        }
        else{
            setAuthContextData({
            authenticated: false,
            })
        }
        }, [authContextData.tokenData?.user_name, setAuthContextData]);
    
    authContextData.authenticated && (
        authContextData.tokenData?.user_name && (
        email = authContextData.tokenData?.user_name)
    ) //

    
    
    const subscribeInCourse = (courseId : number) => {

        const params : AxiosRequestConfig = {
            method:"PUT",
            url: `/courses/registerInCourse/${courseId}/${userPage?.id}`,
            withCredentials: true
          }
      
          requestBackend(params) 
            .then(response => {
              console.log("registered: ", response.data)
              
              course && setSubscribes([...subscribes, course]);
              setSubscribedToCourse(true);
            })
    }

    const unsubscribeInCourse = (courseId : number | undefined) => {

        const params : AxiosRequestConfig = {
            method:"PUT",
            url: `/courses/unregisterInCourse/${courseId}/${userPage?.id}`,
            withCredentials: true
          }
      
          requestBackend(params) 
            .then(response => {
              console.log("unregistered: ", response.data)
              setSubscribedToCourse(false);
            })
    }

    const subscribeInClass = (classId : number) => {

        const params : AxiosRequestConfig = {
            method:"PUT",
            url: `/classes/registerInClass/${classId}/${userPage?.id}`,
            withCredentials: true
          }
      
          requestBackend(params) 
            .then(response => {
              console.log("registered in class: ", response.data)
              setSubscribedToClass(true);
            })
    }

    const unsubscribeInClass = (classId : number) => {

        const params : AxiosRequestConfig = {
            method:"PUT",
            url: `/classes/unregisterInClass/${classId}/${userPage?.id}`,
            withCredentials: true
          }
      
          requestBackend(params) 
            .then(response => {
              console.log("unregistered in class: ", response.data)
              setSubscribedToClass(false);
            })
    }


    // state for button 'subscribe' in course
    const [subscribedToCourse, setSubscribedToCourse] = useState(false);
    const [subscribedToClass, setSubscribedToClass] = useState(false);
    const [subscribes, setSubscribes] = useState<Course[]>([]);

    return(
        <div className='course-details-container'>
            <div className='course-details-card'>
                <div className='course-details-info-container'>
                    <p>{course?.name}</p>
                    <span>{course?.description}</span>

                    {isAuthenticated() && (
                        subscribedToCourse ? (
                            <button className='btn btn-primary' onClick={() => unsubscribeInCourse(course?.id)}>Unsubscribe</button>
                            ) : (
                            <button className='btn btn-primary' onClick={() => course?.id && subscribeInCourse(course?.id)}>Subscribe</button> 
                            )   
                        )
                    }

                </div>

                <div className='course-details-img-container'>
                    <img src={course?.imgUrl} alt="" />
                </div>

            </div>

            <div className='subjects-container'>
                <div className='subjects-top-container'>
                    <h2>Subjects</h2>
                    <button onClick={() => openAndCloseSelect()} className='btn btn-primary btn-subjects'>
                        <Arrow/>
                    </button>
                </div>

                    {showSelect && course?.subjects.sort((a,b) => a.semester > b.semester ? 1 : -1).map(subject => (

                        <div className='subject' key={subject.id}>
                            <div className='subject-properties'>
                                <h4>{subject.name}</h4>
                                <img src={Plus} onClick={() => openAndCloseClasses()} className='' alt=""/>
                            </div>
                            
                            <div className='subject-bottom'>
                                <p>{subject.semester}th Semester</p>
                            </div>

                            {showClasses && 

                                <div className='classes-container'>
                                    <h3>Classes</h3>
                                    {subject.classes.map(c => (
                                        <div className='classes' key={c.id}>
                                            <h6>{subject.name} + {c.code}</h6>
                                            <p>Limit of students: {c.limitOfStudents}</p>

                                            {isAuthenticated() && (
                                                subscribedToClass ? (
                                                    <button className='btn btn-primary' onClick={() => unsubscribeInClass(c.id)}>Unsubscribe</button>
                                                    ) : (
                                                    <button className='btn btn-primary' onClick={() => subscribeInClass(c.id)}>Subscribe</button> 
                                                    )   
                                                )
                                            }
                                        </div>
                                    ))}
                                </div>
                            }

                        </div>
                    ))}
                </div>
        </div>
    );
}

export default CourseDetails;