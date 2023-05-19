import './styles.css';

import { Link } from 'react-router-dom';
import { Class } from 'types';

type Props = {
  cla : Class;
}

function ClassCrudCard( {cla} : Props ) {

    return (
      <>
        <div className='base-card course-crud-card'>

            <div className='course-crud-card-bottom-container'>
              <h3>{cla.code}</h3>
            </div>

            <div className='course-crud-card-buttons-container'>

                <Link to={`/admin/classes/${cla.id}`} className='course-crud-card-buttons-container'>
                  <button className='btn btn-outline-secondary'>
                    EDIT
                  </button>
                </Link>
            </div>
        </div>
        
      </>
    );
  }

  export default ClassCrudCard;