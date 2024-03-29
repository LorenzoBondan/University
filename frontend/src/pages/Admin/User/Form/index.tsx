import { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import Select from 'react-select';
import { requestBackend } from 'util/requests';
import { Class, Course, Role, User } from 'types';

type UrlParams = {
    userId: string;
}

const Form = () => {

    const {userId} = useParams<UrlParams>();

    const isEditing = userId !== 'create';

    const { register, handleSubmit, formState: {errors}, setValue, control } = useForm<User>();

    useEffect(() => {
        if(isEditing){
            requestBackend({url:`/users/${userId}`, withCredentials:true})
                .then((response) => {
                    const user = response.data as User;

                    setValue('name', user.name);
                    setValue('password', user.password);
                    setValue('email', user.email);
                    setValue('imgUrl', user.imgUrl);

                    setValue('roles', user.roles);
                    setValue('courses', user.courses);
                    setValue('classes', user.classes);
                })
        }
        
    }, [isEditing, userId, setValue]);

    const history = useHistory();

    const [selectRoles, setSelectRoles] = useState<Role[]>();

    useEffect(() => {
        requestBackend({url: '/roles', params: {page: 0, size: 50, }, withCredentials: true})
            .then(response => {
                setSelectRoles(response.data.content)
        })
    }, []);

    const onSubmit = (formData : User) => {

        const params : AxiosRequestConfig = {
            method: isEditing? "PUT" : "POST",
            url : isEditing? `/users/${userId}` : "/users",
            data: formData,
            withCredentials: true
        };

        requestBackend(params)
            .then(response => {
                console.log('Sucesso', response.data);
                history.push("/admin/users");
            })
            .catch(() => {
                //toast.error('Erro ao cadastrar o User.');
            })
    };

    const handleCancel = () => {
        history.push("/admin/users")
    }

    const [selectCourses, setSelectCourses] = useState<Course[]>();

    useEffect(() => {
        requestBackend({url: '/courses'})
            .then(response => {
                setSelectCourses(response.data.content)
            })
    }, []);

    const [selectClasses, setSelectClasses] = useState<Class[]>();

    useEffect(() => {
        requestBackend({url: '/classes'})
            .then(response => {
                setSelectClasses(response.data.content)
            })
    }, []);

    return(
        <div className="courses-crud-container">
            <div className="base-card courses-card-form-card">
                <h1>ADD OR EDIT USER</h1>
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
                                <label htmlFor="" style={{color:"white"}}>Email</label> 
                                <input 
                                    {...register("email", {
                                    pattern: { 
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: 'Insira um Email válido'
                                        }
                                    })}
                                    type="text"
                                    className={`form-control base-input ${errors.email ? 'is-invalid' : ''}`}
                                    placeholder="Email"
                                    name="email"
                                />
                                <div className='invalid-feedback d-block'>{errors.email?.message}</div>
                            </div>
                        </div>
                        <div className='margin-bottom-30'>
                            <label htmlFor="" style={{color:"white"}}>Password</label> 
                                <input 
                                    {...register("password", {
                                    })}
                                    type="text"
                                    className={`form-control base-input ${errors.password ? 'is-invalid' : ''}`}
                                    placeholder="Password"
                                    name="password"
                                />
                                <div className='invalid-feedback d-block'>{errors.password?.message}</div>
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
                        <div className='margin-bottom-30'>
                            <label htmlFor="" style={{color:"white"}}>Courses</label> 
                                <Controller 
                                    name = 'courses'
                                    rules = {{required: false}}
                                    control = {control}
                                    render = {( {field} ) => (
                                        <Select 
                                            {...field}
                                            options={selectCourses}
                                            classNamePrefix="users-crud-select"
                                            placeholder="Courses"
                                            isMulti
                                            getOptionLabel={(course: Course) => course.name}
                                            getOptionValue={(course: Course) => course.id.toString()}
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
                                            options={selectClasses}
                                            classNamePrefix="users-crud-select"
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
                        <div className='margin-bottom-30'>
                            <label htmlFor="" style={{color:"white"}}>Roles</label> 
                                <Controller 
                                    name = 'roles'
                                    rules = {{required: true}}
                                    control = {control}
                                    render = {( {field} ) => (
                                        <Select 
                                            {...field}
                                            options={selectRoles}
                                            classNamePrefix="users-crud-select"
                                            placeholder="Roles"
                                            isMulti
                                            getOptionLabel={(role: Role) => role.authority}
                                            getOptionValue={(role: Role) => role.id.toString()}
                                        />    
                                    )}
                                />
                                {errors.roles && (
                                    <div className='invalid-feedback d-block'>Campo obrigatório</div>
                                )}
                        </div>
                        <div className='students-crud-buttons-container'>
                            <button 
                                className='btn btn-outline-danger students-crud-buttons'
                                onClick={handleCancel}
                                >
                                CANCELAR
                            </button>
                            <button className='btn btn-primary text-white students-crud-buttons'>SALVAR</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Form;