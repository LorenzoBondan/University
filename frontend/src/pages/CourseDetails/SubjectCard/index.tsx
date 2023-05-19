import { AxiosRequestConfig } from "axios";
import { useCallback, useEffect, useState } from "react";
import { Subject } from "types";
import { isAuthenticated } from "util/auth";
import { requestBackend } from "util/requests";
import Plus from 'assets/images/plus.png';

type Props = {
    subjectId: number;
    userId: number | undefined;
}

const SubjectCard = ({subjectId, userId} : Props) => {

    const [subject, setSubject] = useState<Subject>();

    const getSubjectById = useCallback( () => {
        const params : AxiosRequestConfig = {
          method:"GET",
          url: `/subjects/${subjectId}`
        }
        requestBackend(params) 
          .then(response => {
            setSubject(response.data);
          })
      }, [subjectId])

      useEffect(() => {
         getSubjectById();
      }, [getSubjectById]);


      const [subscribedToClass, setSubscribedToClass] = useState(false);

      const subscribeInClass = (classId : number) => {

        const params : AxiosRequestConfig = {
            method:"PUT",
            url: `/classes/registerInClass/${classId}/${userId}`,
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
            url: `/classes/unregisterInClass/${classId}/${userId}`,
            withCredentials: true
          }
      
          requestBackend(params) 
            .then(response => {
              console.log("unregistered in class: ", response.data)
              setSubscribedToClass(false);
            })
    }

    const [showClasses, setShowClasses] = useState(false);

    const openAndCloseClasses = () => {
        if(showClasses){
            setShowClasses(false);
        }
        else{
            setShowClasses(true);
        }
    }

    return(
        <div className='subjects-container'>
                {subject && 
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
                }
        </div>
    );
}

export default SubjectCard;