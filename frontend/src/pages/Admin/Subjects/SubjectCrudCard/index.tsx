import './styles.css';

import { Link } from 'react-router-dom';
import { Subject } from 'types';

type Props = {
  subject : Subject;
}

function SubjectCrudCard( {subject} : Props ) {

    return (
      <>
        <div className='base-card course-crud-card'>

            <div className='course-crud-card-bottom-container'>
              <h3>{subject.name}</h3>
            </div>

            <div className='course-crud-card-buttons-container'>

                <Link to={`/admin/subjects/${subject.id}`} className='course-crud-card-buttons-container'>
                  <button className='btn btn-outline-secondary'>
                    EDIT
                  </button>
                </Link>
            </div>
        </div>
        
      </>
    );
  }

  export default SubjectCrudCard;