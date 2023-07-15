import { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { Class, Course, Subject } from 'types';
import { requestBackend } from 'util/requests';
import Select from 'react-select';

type UrlParams = {
    subjectId: string;
}

const Form = () => {

    const { subjectId } = useParams<UrlParams>();
    
    const isEditing = subjectId !== 'create';

    const { register, handleSubmit, formState: {errors}, setValue, control } = useForm<Subject>();

    const [selectCourses, setSelectCourses] = useState<Course[]>();

    useEffect(() => {
        requestBackend({url: '/courses', params: {page: 0, size: 2000, },})
            .then(response => {
                setSelectCourses(response.data.content)
            })
    }, []);

    const [selectClasses, setSelectClasses] = useState<Class[]>();

    useEffect(() => {
        requestBackend({url: '/classes', params: {page: 0, size: 2000, },})
            .then(response => {
                setSelectClasses(response.data.content)
            })
    }, []);

    useEffect(() => {
        if (isEditing) {
            requestBackend({url:`/subjects/${subjectId}`})
                .then((response) => {

                    const subject = response.data as Subject;

                    setValue('name', subject.name);
                    setValue('semester', subject.semester);

                    setValue('courses', subject.courses);
                    setValue('classes', subject.classes);

                })
        }
    }, [isEditing, subjectId, setValue]);

    const history = useHistory();

    const onSubmit = (formData : Subject) => {

        const params : AxiosRequestConfig = {
            method: isEditing? "PUT" : "POST",
            url: isEditing? `/subjects/${subjectId}` : "/subjects",
            data: formData,
            withCredentials: true
          };

        requestBackend(params)
        .then(response => {
            console.log('SUCCESS', response.data);
            history.push("/admin/subjects");
        })
        .catch(() => {
            console.log('error');
        });
    };

    const handleCancel = () => {
        history.push("/admin/subjects")
    }

    return(
        <div className="courses-crud-container">
            <div className="base-card courses-card-form-card">
                <h1>ADD OR EDIT SUBJECT</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='row courses-crud-inputs-container'>
                        <div className='courses-crud-inputs-left-container'>
                            <div className='margin-bottom-30'>
                                <label htmlFor="" style={{color:"white"}}>Name</label>  
                                <input 
                                    {...register("name", {
                                    required: 'Campo obrigatório',
                                    })}
                                    type="text"
                                    className={`form-control base-input ${errors.name ? 'is-invalid' : ''}`}
                                    placeholder="Name"
                                    name="name"
                                />
                                <div className='invalid-feedback d-block'>{errors.name?.message}</div>
                            </div>
                            <div className='margin-bottom-30'>
                                <label htmlFor="" style={{color:"white"}}>Semester</label>  
                                <input 
                                    {...register("semester", {
                                    required: 'Campo obrigatório',
                                    })}
                                    type="number"
                                    className={`form-control base-input ${errors.semester ? 'is-invalid' : ''}`}
                                    placeholder="Semester"
                                    name="semester"
                                />
                                <div className='invalid-feedback d-block'>{errors.semester?.message}</div>
                            </div>
                            <div className='margin-bottom-30'>
                                <label htmlFor="" style={{color:"white"}}>Courses</label>  
                                <Controller 
                                    name = 'courses'
                                    rules = {{required: false}}
                                    control = {control}
                                    render = {( {field} ) => (
                                        <Select 
                                            {...field}
                                            options={selectCourses?.sort((a,b) => a.name > b.name ? 1 : -1)}
                                            classNamePrefix="courses-crud-select"
                                            placeholder="Courses"
                                            isMulti
                                            getOptionLabel={(c: Course) => c.name}
                                            getOptionValue={(c: Course) => c.id.toString()}
                                        />    
                                    )}
                                />
                                {errors.courses && (
                                    <div className='invalid-feedback d-block'>Campo obrigatório</div>
                                )}
                            </div>
                            <div className='margin-bottom-30'>
                                <label htmlFor="" style={{color:"white"}}>Classes</label>  
                                <Controller 
                                    name = 'classes'
                                    rules = {{required: false}}
                                    control = {control}
                                    render = {( {field} ) => (
                                        <Select 
                                            {...field}
                                            options={selectClasses?.sort((a,b) => a.code > b.code ? 1 : -1)}
                                            classNamePrefix="classes-crud-select"
                                            placeholder="Classes"
                                            isMulti
                                            getOptionLabel={(c: Class) => c.code}
                                            getOptionValue={(c: Class) => c.id.toString()}
                                        />    
                                    )}
                                />
                                {errors.classes && (
                                    <div className='invalid-feedback d-block'>Campo obrigatório</div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className='courses-crud-buttons-container'>
                        <button 
                            className='btn btn-outline-danger courses-crud-buttons'
                            onClick={handleCancel}
                            >
                            CANCEL
                        </button>
                        <button className='btn btn-primary text-white courses-crud-buttons'>SAVE</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Form;