import { AuthContext } from 'AuthContext';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { getTokenData } from 'util/auth';
import { requestBackendLogin } from 'util/requests';
import { getAuthData, saveAuthData } from 'util/storage';
import './styles.css';


type FormData = {
    username: string,
    password: string,
  };

  //redirecionar pra rota pretendida após o login (componente PrivateRoute)
type LocationState = {
  from: string;
}

const Login = () => {

    // redirecionamento de rota
    const location = useLocation<LocationState>();
    const {from} = location.state || { from: { pathname: '/'}}; // a rota que quis acessar, ou p rota /admin, que por sua vez, leva p admin/students

    // verificar autenticação
    const { setAuthContextData } = useContext(AuthContext);

    const [hasError, setHasError] = useState(false); // mensagem de erro ao preencher errado (bootstrap alerts)

    // eventos do formulário
    const { register, handleSubmit, formState: {errors} } = useForm<FormData>(); //formstate errors -> validação dos campos

    const history = useHistory(); // permite redirecionamentos e mudanças de rota
    

    // evento ao enviar o formulário
    const onSubmit = (formData : FormData) => {
        requestBackendLogin(formData)
        .then(response => {
            saveAuthData(response.data)

            const token = getAuthData().access_token;
            console.log('TOKEN GERADO: ' + token);

            setHasError(false);
            console.log('SUCESSO', response);

            setAuthContextData({ // da navbar, mudar login -> logout
              authenticated: true,
              tokenData: getTokenData()
            })

            history.replace(from); // faz o login e joga pra tela de admin, que por sua vez, entra direto na rota de admin/products

        })
        .catch(error => {
            setHasError(true);
            console.log('ERRO', error);
        });
    };

    return(
        <>
            <div className="base-card login-card">
                <h1>LOGIN</h1>

                { hasError && (
                    <div className="alert alert-danger">
                       Error when trying to login
                    </div>
                )}


                <form onSubmit={handleSubmit(onSubmit)}>
        
        
                    <div className="mb-4">
                        <input 
                            {...register("username", {
                            required: 'Campo obrigatório',
                            pattern: { 
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Insira um Email válido'
                            }
                            })}
                            type="text"
                            className={`form-control base-input ${errors.username ? 'is-invalid' : ''}`}
                            placeholder="Email"
                            name="username"
                        />

                        <div className='invalid-feedback d-block'>{errors.username?.message}</div>
                    </div>


                    <div className="mb-2">
                        <input
                            {...register("password", {
                            required: 'Campo obrigatório'
                            })}
                            type="password"
                            className={`form-control base-input ${errors.password ? 'is-invalid' : ''}`}
                            placeholder="Password"
                            name="password"
                        />
          
                        <div className='invalid-feedback d-block' >{errors.password?.message}</div>
                    </div>


                    <div className="login-submit">
                        <button className='btn btn-primary'>LOGIN</button>
                    </div>
                    

                    <div className="signup-container">
                        <span className="not-registered">Don't have an account?</span>

                        <Link to="/admin/auth/signup" className="login-link-register">
                            REGISTER NOW
                        </Link>
                    </div>

                </form>

            </div>
        </>
    );

}

export default Login;