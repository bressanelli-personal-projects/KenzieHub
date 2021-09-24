import { Button, Box, Paper, TextField, Grid } from "@material-ui/core";
import { Snackbar, Alert } from "@mui/material";
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import useStyles from "./styles";
import axios from "axios";


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
        contact: yup.string().required('Campo obrigatório').matches(nameRegex, 'Somente letras'),
        course_module: yup.string().required('Campo obrigatório').matches(nameRegex, 'Somente letras'),
    });

    const { register, handleSubmit, formState: { errors } } = useForm({resolver: yupResolver(schema)})

    const onSubmitForm = (data) => {
        if(data) {
            // setIsAllowed(true);
            history.push(`/success/${data.name}`);
        }        
    }

    const classes = useStyles();

    

    return(

        <Grid  container className={classes.container}>
            <Grid className={classes.grid} xs={12}>
            
                <Paper className={classes.paper} elevation={10} >
    
            <form className={classes.form} onSubmit={handleSubmit(onSubmitForm)} >                           

                <div>

                    <TextField 
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

                    <Snackbar
                        open={!!errors.password}                                                    
                        anchorOrigin={ {vertical: 'top', horizontal: 'center'} }      >              
                        <Alert severity="error">A senha deve conter: letra maiúscula, letra minúscula, número e caracter especial @$!%*?&</Alert>
                    </Snackbar>


                </div>

                <div>

                    <TextField 
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
                        fullWidth
                        variant='contained'
                        color='primary'
                        size='large'
                        type='submit'
                    >
                        Cadastrar
                    </Button>

                </Paper>

            </form>
            </Paper>
        
            </Grid>
        </Grid>
  
    )
}

export default Signup;