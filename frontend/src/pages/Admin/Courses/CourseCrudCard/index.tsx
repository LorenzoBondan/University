import { AxiosRequestConfig } from 'axios';
import './styles.css';

import { Link } from 'react-router-dom';
import { Course } from 'types';
import { requestBackend } from 'util/requests';

type Props = {
  course : Course;
  onDelete : Function;
}

function CourseCrudCard( {course, onDelete} : Props ) {

  const handleDelete = (courseId : number) => {
    
    if(!window.confirm("Are you sure that you want to delete the course?")){ // messagebox
      return;
    }

    const params : AxiosRequestConfig = {
      method:"DELETE",
      url: `/courses/${courseId}`,
      withCredentials: true
    }

    requestBackend(params).then(() => {
      onDelete();
    })
  }

    return (
      <>
        <div className='base-card course-crud-card'>

            <div className='course-crud-card-top-container'>
                <img src={course.imgUrl} alt="" />
            </div>

            <div className='course-crud-card-bottom-container'>
              <h3>{course.name}</h3>
            </div>

            <div className='course-crud-card-buttons-container'>
              <button className='btn btn-outline-danger course-crud-card-button delete-button'
                onClick={() => handleDelete(course.id)}
                >
                  DELETE
                </button>

                <Link to={`/admin/courses/${course.id}`}>
                  <button className='btn btn-outline-secondary course-crud-card-button'>
                    EDIT
                  </button>
                </Link>
            </div>
        </div>
        
      </>
    );
  }

  export default CourseCrudCard;