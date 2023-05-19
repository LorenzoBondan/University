
import { useParams } from 'react-router-dom';
import './styles.css';
import { useContext, useEffect, useState } from 'react';
import { Course, User } from 'types';
import axios, { AxiosRequestConfig } from 'axios';
import { BASE_URL, requestBackend } from 'util/requests';
import { ReactComponent as Arrow} from 'assets/images/arrow.svg';
import { AuthContext } from 'AuthContext';
import { getTokenData, isAuthenticated } from 'util/auth';
import SubjectCard from './SubjectCard';

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
    
    const openAndCloseSelect = () => {
        if(showSelect){
            setShowSelect(false);
        }
        else{
            setShowSelect(true);
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

    // state for button 'subscribe' in course
    const [subscribedToCourse, setSubscribedToCourse] = useState(false);
    
    const [subscribes, setSubscribes] = useState<Course[]>([]);

    const subjectsId = course?.subjectsId;

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

            <div className='subjects-top-container'>
                <div className='subjects-title'>
                    <h2>Subjects</h2>
                    <button onClick={() => openAndCloseSelect()} className='btn btn-primary btn-subjects'>
                        <Arrow/>
                    </button>
                </div>
                
                {showSelect && subjectsId?.map(subjectId => (
                    <SubjectCard subjectId={subjectId} userId={userPage?.id} key={subjectId}/>
                ))}
            </div>

        </div>
    );
}

export default CourseDetails;