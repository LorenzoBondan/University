import { AxiosRequestConfig } from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { requestBackend } from 'util/requests';


import './styles.css';

import { Link } from 'react-router-dom';
import { SpringPage, Subject } from 'types';
import SubjectCrudCard from '../SubjectCrudCard';


const List = () => {

  const [page, setPage] = useState<SpringPage<Subject>>();

  const getSubjects = useCallback(() => {
    const params: AxiosRequestConfig = {
      method: "GET",
      url: "/subjects",
      params: {
        size: 2000
      },
    }

    requestBackend(params)
      .then(response => {
        setPage(response.data);
      });
  }, [])

  useEffect(() => {
    getSubjects();
  }, [getSubjects]);


  return (
    <div className='subjects-crud-container'>
      <Link to="/admin/subjects/create">
          <button className="btn btn-primary btn-crud-add">
            ADD NEW SUBJECT
          </button>
        </Link>
        <div className='row'>
            {page?.content
              .sort((a,b) => a.name > b.name ? 1 : -1)
              .map((item) => (
                <div className="col-sm-4 col-md-4 col-lg-3 col-xl-3 subject-crud-column" key={item.id}>
                    <SubjectCrudCard subject={item} key={item.id}/>
                </div>
            ))}
        </div>
    </div>
  );
};

export default List;