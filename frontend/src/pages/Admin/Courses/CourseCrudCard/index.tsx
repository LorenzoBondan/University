import './styles.css';

import { Link } from 'react-router-dom';
import { Course } from 'types';

type Props = {
  course : Course;
}

function CourseCrudCard( {course} : Props ) {

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

                <Link to={`/admin/courses/${course.id}`} className='course-crud-card-buttons-container'>
                  <button className='btn btn-outline-secondary'>
                    EDIT
                  </button>
                </Link>
            </div>
        </div>
        
      </>
    );
  }

  export default CourseCrudCard;