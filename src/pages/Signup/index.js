import { Button, Paper, TextField, Grid, Fade } from "@material-ui/core";
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import useStyles from "./styles";
import api from '../../services/api'
import { toast } from "material-react-toastify";
import { Link, Redirect } from "react-router-dom";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';



const Signup = () => {

    const history = useHistory();

    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const nameRegex = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/;

    const schema = yup.object().shape({
        name: yup.string().required('Campo obrigatório').matches(nameRegex, 'Somente letras'),
        email: yup.string().required('Campo obrigatório').email('Email inválido'),
        password: yup.string().min(8, 'Min. 8 caracteres').required('Campo obrigatório').matches(passRegex, 'Senha inválida'),
        confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'As senhas devem ser iguais'),
        bio: yup.string().required('Campo obrigatório').matches(nameRegex, 'Somente letras'),
        contact: yup.string().required('Campo obrigatório'),
        course_module: yup.string().required('Campo obrigatório').matches(nameRegex, 'Somente letras'),
    });

    const { register, handleSubmit, formState: { errors } } = useForm({resolver: yupResolver(schema)})
    

    const onSubmitForm = ({ email, password, name, bio, contact, course_module }) => {
        const user = { email, password, name, bio, contact, course_module };
        
        api.post('/users', user).then((response) => {
            toast.success('Sucesso ao criar a conta')
            return history.push('/login')
        }).catch((err) => toast.error('Erro ao criar a conta'));
    }

    const classes = useStyles();    

    return(

        <Grid sx={{ minHeight: '100vh' }}  container className={classes.container}>
            <Grid className={classes.grid} item xs={12} sm={10} md={8} xl={4} lg={6}>

            <Fade in timeout={1500}>

            <Paper className={classes.paper} elevation={10} >
    
            <form className={classes.form} onSubmit={handleSubmit(onSubmitForm)} >                           

                <div>

                    <TextField 
                        required
                        fullWidth                                                                  
                        label='Nome'
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
                        required   
                        fullWidth                
                        label='Email'
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
                        required   
                        fullWidth                
                        label='Senha'
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
                        required
                        fullWidth                   
                        label='Confirmar senha'
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
                        required
                        fullWidth                                                   
                        label='Bio'
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
                        required 
                        fullWidth                                                   
                        label='Contato'
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
                        required
                        fullWidth                                                   
                        label='Módulo do curso'
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
                </p>

            </form>
            </Paper>
            </Fade>
            
            
        
            </Grid>
        </Grid>
  
    )
}

export default Signup;