import './styles.css';

import { Link } from 'react-router-dom';
import { Course } from 'types';

type Props = {
  course : Course;
}

function CourseCrudCard( {course} : Props ) {

    return (
      <>
        <div className='base-card player-crud-card'>

            <div className='player-crud-card-top-container'>
                <img src={course.imgUrl} alt="" />
            </div>

            <div className='player-crud-card-bottom-container'>
              <h3>{course.name}</h3>
            </div>

            <div className='player-crud-card-buttons-container'>

                <Link to={`/admin/courses/${course.id}`}>
                  <button className='btn btn-outline-secondary player-crud-card-button'>
                    EDIT
                  </button>
                </Link>
            </div>
        </div>
        
      </>
    );
  }

  export default CourseCrudCard;