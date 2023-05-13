
import { useParams } from 'react-router-dom';
import './styles.css';
import { useEffect, useState } from 'react';
import { Course } from 'types';
import axios from 'axios';
import { BASE_URL } from 'util/requests';

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


    return(
        <div className='course-details-container'>
            <div className='course-details-card'>
                <div className='course-details-info-container'>
                    <p>{course?.name}</p>
                    <button className='btn btn-primary'>Subscribe</button>
                </div>

                <div className='course-details-img-container'>
                    <img src={course?.imgUrl} alt="" />
                </div>

            </div>

            <div className='subjects-container'>
                <h2>Subjects</h2>
                    {course?.subjects.sort((a,b) => a.semester > b.semester ? 1 : -1).map(subject => (
                        <div className='subject'>
                            <h4>{subject.name}</h4>
                            <div className='subject-bottom'>
                                <p>{subject.semester}th Semester</p>
                            </div>

                            <div className='classes-container'>
                                <h3>Classes</h3>
                                {subject.classes.map(c => (
                                    <div className='classes'>
                                        <h6>{subject.name} + {c.code}</h6>
                                        <p>Limit of students: {c.limitOfStudents}</p>
                                        <button className='btn btn-primary btn-classes'>Subscribe</button>
                                    </div>
                                ))}
                            </div>

                        </div>
                    ))}
                </div>

        </div>
    );
}

export default CourseDetails;