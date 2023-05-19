
import { AxiosRequestConfig } from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { requestBackend } from 'util/requests';


import './styles.css';

import { Link } from 'react-router-dom';
import { Course, SpringPage } from 'types';
import CourseCrudCard from '../CourseCrudCard';

const List = () => {

  const [page, setPage] = useState<SpringPage<Course>>();

  const getCourses = useCallback(() => {
    const params: AxiosRequestConfig = {
      method: "GET",
      url: "/courses",
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
    getCourses();
  }, [getCourses]);


  return (
    <div className='courses-crud-container'>
      <Link to="/admin/courses/create">
          <button className="btn btn-primary btn-crud-add">
            ADD NEW COURSE
          </button>
        </Link>
        <div className='row'>
            {page?.content
              .sort((a,b) => a.name > b.name ? 1 : -1)
              .map((item) => (
                <div className="col-sm-4 col-md-4 col-lg-3 col-xl-3 subject-crud-column" key={item.id}>
                    <CourseCrudCard course={item} key={item.id}/>
                </div>
            ))}
        </div>
    </div>
  );
};

export default List;