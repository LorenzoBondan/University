import { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { Class, Subject } from 'types';
import { requestBackend } from 'util/requests';

type UrlParams = {
    classId: string;
}

const Form = () => {

    const { classId } = useParams<UrlParams>();
    
    const isEditing = classId !== 'create';

    const { register, handleSubmit, formState: {errors}, setValue } = useForm<Class>();

    const [selectSubject, setSelectSubject] = useState<Subject[]>();

    useEffect(() => {
        requestBackend({url: '/subjects'})
            .then(response => {
                setSelectSubject(response.data.content)
            })
    }, []);

    const subjectsIds = selectSubject?.map(subject => subject.id);
    const subjectsNames = selectSubject?.map(subject => subject.name);

    useEffect(() => {
        if (isEditing) {
            requestBackend({url:`/classes/${classId}`})
                .then((response) => {

                    const c = response.data as Class;

                    setValue('code', c.code);
                    setValue('limitOfStudents', c.limitOfStudents);
                    setValue('subjectId', c.subjectId);
                    
                    subjectsIds?.map(m => m)
                })
        }
    }, [isEditing, classId, setValue, subjectsIds]);

    const history = useHistory();

    const onSubmit = (formData : Class) => {

        // data: formData
        const params : AxiosRequestConfig = {
            method: isEditing? "PUT" : "POST",
            url: isEditing? `/classes/${classId}` : "/classes",
            data: formData,
            withCredentials: true
          };

        requestBackend(params)
        .then(response => {
            console.log('SUCCESS', response.data);
            history.push("/admin/classes");

            /*toast.success('Student cadastrado com sucesso!');*/
        })
        .catch(() => {
            console.log('error');
        })
        ;
    };

    const handleCancel = () => {
        history.push("/admin/classes")
    }

    return(
        <div className="courses-crud-container">
            <div className="base-card courses-card-form-card">
                <h1>ADD OR EDIT CLASS</h1>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='row courses-crud-inputs-container'>
                        <div className='courses-crud-inputs-left-container'>

                            <div className='margin-bottom-30'>
                                <label htmlFor="" style={{color:"white"}}>Code</label>  
                                <input 
                                    {...register("code", {
                                    required: 'Campo obrigatório',
                                    })}
                                    type="text"
                                    className={`form-control base-input ${errors.code ? 'is-invalid' : ''}`}
                                    placeholder="Code"
                                    name="code"
                                />
                                <div className='invalid-feedback d-block'>{errors.code?.message}</div>
                            </div>
                            
                            <div className='margin-bottom-30'>
                                <label htmlFor="" style={{color:"white"}}>Limit of Students</label>  
                                <input 
                                    {...register("limitOfStudents", {
                                    required: 'Campo obrigatório',
                                    })}
                                    type="number"
                                    className={`form-control base-input ${errors.limitOfStudents ? 'is-invalid' : ''}`}
                                    placeholder="Limit of Students"
                                    name="limitOfStudents"
                                />
                                <div className='invalid-feedback d-block'>{errors.limitOfStudents?.message}</div>
                            </div>

                            <div className='margin-bottom-30'>
                                <label htmlFor="" style={{color:"white"}}>Subject Id</label>  
                                <select
                                    {...register("subjectId", {
                                        required: 'Campo obrigatório',
                                    })}
                                    className={`form-control base-input ${errors.subjectId ? 'is-invalid' : ''}`}
                                    placeholder='Subject Id' 
                                    name="subjectId"
                                    >
                                    {subjectsIds?.map(id => <option key={id} value={id} label={subjectsNames && subjectsNames[id-1]}></option>)}
                                </select>
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