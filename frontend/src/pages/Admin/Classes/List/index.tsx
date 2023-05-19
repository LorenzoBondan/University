import { AxiosRequestConfig } from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { requestBackend } from 'util/requests';


import './styles.css';

import { Link } from 'react-router-dom';
import { SpringPage, Class } from 'types';
import ClassCrudCard from '../SubjectCrudCard';


const List = () => {

  const [page, setPage] = useState<SpringPage<Class>>();

  const getclasss = useCallback(() => {
    const params: AxiosRequestConfig = {
      method: "GET",
      url: "/classes",
    }

    requestBackend(params)
      .then(response => {
        setPage(response.data);
      });
  }, [])

  useEffect(() => {
    getclasss();
  }, [getclasss]);


  return (
    <div className='courses-crud-container'>
      <Link to="/admin/classes/create">
          <button className="btn btn-primary btn-crud-add">
            ADD NEW CLASS
          </button>
        </Link>
        <div className='row'>
            {page?.content
              .sort((a,b) => a.code > b.code ? 1 : -1)
              .map((item) => (
                <div className="col-sm-4 col-md-4 col-lg-3 col-xl-3 course-crud-column" key={item.id}>
                    <ClassCrudCard cla={item} key={item.id}/>
                </div>
            ))}
        </div>
    </div>
  );
};

export default List;