import { Link } from 'react-router-dom';
import { requestBackend } from 'util/requests';
import { AxiosRequestConfig } from 'axios';
import { User } from 'types';

type Props = {
  user : User;
  onDelete : Function;
}

function UserCrudCard( {user, onDelete} : Props ) {

  const handleDelete = (userId : number) => {
    
    if(!window.confirm("Are you sure that you want to delete the user?")){ // messagebox
      return;
    }

    const params : AxiosRequestConfig = {
      method:"DELETE",
      url: `/users/${userId}`,
      withCredentials: true
    }

    requestBackend(params).then(() => {
      onDelete();
    })
  }

    return (
        <div className='base-card course-crud-card'>
            <div className='course-crud-card-bottom-container'>
              <h3>{user.name}</h3>
            </div>
            <div className='course-crud-card-buttons-container'>
              <button className='btn btn-outline-danger course-crud-card-button delete-button'
                onClick={() => handleDelete(user.id)}
                >
                  DELETE
                </button>
                <Link to={`/admin/users/${user.id}`}>
                  <button className='btn btn-outline-secondary course-crud-card-button'>
                    EDIT
                  </button>
                </Link>
            </div>
        </div>
    );
  }

  export default UserCrudCard;