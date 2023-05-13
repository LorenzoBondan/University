
import { Course, SpringPage } from 'types';
import './styles.css';
import { useCallback, useEffect, useState } from 'react';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';
import CourseCard from 'components/CourseCard';
import { Link } from 'react-router-dom';

const Courses = () => {

    const [page, setPage] = useState<SpringPage<Course>>();

    const getCourses = useCallback(() => {
        const params : AxiosRequestConfig = {
          method:"GET",
          url: "/courses",
          params: {
            page: 0,
            size: 300
          },
        }
    
        requestBackend(params) 
          .then(response => {
            setPage(response.data);
            window.scrollTo(0, 0);
          })
      }, [])
  
      useEffect(() => {
        getCourses();
      }, [getCourses]);

    return(
        <div className='courses-container'>
            <h1>Courses</h1>

            <div className="row">
                {page?.content
                .sort((a,b) => a.name > b.name ? 1 : -1)
                .map(course => (
                    <div className="col-sm-6 col-lg-6 col-xl-3 courses-column" key={course.id}>
                        <Link to={`/courses/${course.id}`}>
                            <CourseCard course={course}/>
                        </Link>
                    </div>
                    )
                )
                }
            </div>

        </div>
    );
}

export default Courses;