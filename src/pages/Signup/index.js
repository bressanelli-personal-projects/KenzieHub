import { Button, Paper, TextField, Grid, Fade } from "@material-ui/core";
import { useHistory, useLocation } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import useStyles from "./styles";
import api from '../../services/api';
import { toast } from "material-react-toastify";
import { Link } from "react-router-dom";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import Help from "../../components/Help";

const Signup = ({ authorized }) => {

    const history = useHistory();
    const location = useLocation();

    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;   

    const schema = yup.object().shape({
        name: yup.string().required('Campo obrigatório'),
        email: yup.string().required('Campo obrigatório').email('Email inválido'),
        password: yup.string().min(6, 'Min. 6 caracteres').required('Campo obrigatório').matches(passRegex, 'Senha inválida'),
        confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'As senhas devem ser iguais'),
        bio: yup.string().required('Campo obrigatório'),
        contact: yup.string().required('Campo obrigatório'),
        course_module: yup.string().required('Campo obrigatório'),
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)});    

    const onSubmitForm = ({ email, password, name, bio, contact, course_module }) => {

        const user = { email, password, name, bio, contact, course_module };
        
        api.post('/users', user).then((response) => {
            toast.success('Sucesso ao criar a conta')
            
            api.post('/sessions', {
                "email": `${email}`,
                "password": `${password}`
            }).then(response => {
                const { token, user } = response.data;
                toast.success('Login efetuado com sucesso!');

                localStorage.setItem('@Kehub:token', JSON.stringify(token));
                localStorage.setItem('@Kehub:user', JSON.stringify(user));            
                
                return authorized && history.push('/dashboard');
            })

        }).catch((err) => toast.error('Erro ao criar a conta'));        
    };
    
    const classes = useStyles();    

    return(

        <Grid sx={{ minHeight: '100vh' }}  container className={classes.container} >

            <Grid className={classes.grid} item xs={12} sm={9} md={7} lg={5} xl={4} >

                <Fade in timeout={1500} >

                    <Paper className={classes.paper} elevation={10} >
            
                        <form className={classes.form} onSubmit={handleSubmit(onSubmitForm)} >                           

                            <div>

                                <TextField                                     
                                    fullWidth                                                          
                                    label='Nome*'
                                    margin='normal'
                                    variant='filled'
                                    size='small'
                                    color='primary'
                                    {...register('name')}
                                    error={!!errors.name}
                                    helperText={errors.name?.message}
                                />
                            
                            </div>


                            <div>

                                <TextField                                    
                                    fullWidth                
                                    label='Email*'
                                    margin='normal'
                                    variant='filled'
                                    size='small'
                                    color='primary'
                                    {...register('email')}
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                />

                            </div>


                            <div>

                                <TextField                            
                                    fullWidth                
                                    label='Senha*'
                                    margin='normal'
                                    variant='filled'
                                    size='small'
                                    color='primary'
                                    type={'password'}
                                    {...register('password')}
                                    error={!!errors.password}
                                    helperText={errors.password?.message}                        
                                />
                                
                            </div>

                            <div>

                                <TextField                             
                                    fullWidth                   
                                    label='Confirmar senha*'
                                    margin='normal'
                                    variant='filled'
                                    size='small'
                                    color='primary'
                                    type='password'
                                    {...register('confirmPassword')}
                                    error={!!errors.confirmPassword}
                                    helperText={errors.confirmPassword?.message}
                                />                        

                            </div>

                            <div>

                                <TextField                                  
                                    fullWidth                                                   
                                    label='Bio*'
                                    margin='normal'
                                    variant='filled'
                                    size='small'
                                    color='primary'
                                    {...register('bio')}
                                    error={!!errors.bio}
                                    helperText={errors.bio?.message}
                                />
                            
                            </div>

                            <div>

                                <TextField                               
                                    fullWidth                                                   
                                    label='Contato*'
                                    margin='normal'
                                    variant='filled'
                                    size='small'
                                    color='primary'
                                    {...register('contact')}
                                    error={!!errors.contact}
                                    helperText={errors.contact?.message}
                                />
                            
                            </div>

                            <div>

                                <TextField                         
                                    fullWidth                                                   
                                    label='Módulo do curso*'
                                    margin='normal'
                                    variant='filled'
                                    size='small'
                                    color='primary'
                                    {...register('course_module')}
                                    error={!!errors.course_module}
                                    helperText={errors.course_module?.message}
                                />
                            
                            </div>

                            <Paper>

                                <Button
                                    endIcon={<PersonAddAltIcon className={classes.svg}/>}
                                    fullWidth
                                    variant='contained'
                                    color='primary'
                                    size='large'
                                    type='submit'
                                >
                                    Cadastrar
                                </Button>

                            </Paper>

                            <p>
                                Já é registrado? Faça seu  
                                    <Link className={classes.link} to='/login'><strong> login</strong></Link>

                                    <Help local={location.pathname}/>                                    
                            </p>

                        </form>

                        

                    </Paper>

                </Fade>          
        
            </Grid>
            
        </Grid>
  
    );
}

export default Signup;