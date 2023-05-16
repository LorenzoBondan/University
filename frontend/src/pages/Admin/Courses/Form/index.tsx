import { AxiosRequestConfig } from 'axios';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { Course } from 'types';
import { requestBackend } from 'util/requests';


type UrlParams = {
    courseId: string;
}

const Form = () => {

    const { courseId } = useParams<UrlParams>();
    
    const isEditing = courseId !== 'create';

    const { register, handleSubmit, formState: {errors}, setValue } = useForm<Course>();

    useEffect(() => {
        if (isEditing) {
            requestBackend({url:`/courses/${courseId}`})
                .then((response) => {

                    const course = response.data as Course;

                    setValue('name', course.name);
                    setValue('imgUrl', course.imgUrl);
                    setValue('description', course.description);
                })
        }
    }, [isEditing, courseId, setValue]);

    const history = useHistory();

    const onSubmit = (formData : Course) => {

        // data: formData
        const params : AxiosRequestConfig = {
            method: isEditing? "PUT" : "POST",
            url: isEditing? `/courses/${courseId}` : "/courses",
            data: formData,
            withCredentials: true
          };

        requestBackend(params)
        .then(response => {
            console.log('SUCCESS', response.data);
            history.push("/admin/courses");

            /*toast.success('Student cadastrado com sucesso!');*/
        })
        .catch(() => {
            console.log('error');
        })
        ;
    };

    const handleCancel = () => {
        history.push("/admin/courses")
    }

    
    return(
        <div className="courses-crud-container">
            <div className="base-card courses-card-form-card">
                <h1>ADD OR EDIT COURSE</h1>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='row courses-crud-inputs-container'>
                        <div className='col-lg-6 courses-crud-inputs-left-container'>

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
                                <label htmlFor="" style={{color:"white"}}>Description</label>  
                                <input 
                                    {...register("description", {
                                    required: 'Campo obrigatório',
                                    })}
                                    type="text"
                                    className={`form-control base-input ${errors.description ? 'is-invalid' : ''}`}
                                    placeholder="Description"
                                    name="description"
                                />
                                <div className='invalid-feedback d-block'>{errors.description?.message}</div>
                            </div>

                            <div className='margin-bottom-30'>
                                <label htmlFor="" style={{color:"white"}}>Img Url</label>  
                                <input 
                                    {...register("imgUrl", {
                                    required: 'Campo obrigatório',
                                    pattern: { 
                                        value: /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/gm,
                                        message: 'Insira uma URL válida'
                                    }
                                    })}
                                    type="text"
                                    className={`form-control base-input ${errors.imgUrl ? 'is-invalid' : ''}`}
                                    placeholder="URL of course's image"
                                    name="imgUrl"
                                />
                                <div className='invalid-feedback d-block'>{errors.imgUrl?.message}</div>
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