import { Button, Box, Paper, TextField } from "@material-ui/core";
import { Snackbar, Alert } from "@mui/material";
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import useStyles from "./styles";
import axios from "axios";


const Login = () => {

    const history = useHistory();

    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const nameRegex = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/;

    const schema = yup.object().shape({
        name: yup.string().required('Campo obrigatório').matches(nameRegex, 'Somente letras'),
        email: yup.string().required('Campo obrigatório').email('Email inválido'),
        password: yup.string().min(8, 'Min. 8 caracteres').required('Campo obrigatório').matches(passRegex, 'Senha inválida'),
        confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'As senhas devem ser iguais'),
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

        <Box style={{backgroundColor: '#007aff'}} container className={classes.container}>       
            
        <Paper className={classes.paper} elevation={10} >
    
            <form onSubmit={handleSubmit(onSubmitForm)} >                           

                <div>

                    <TextField                   
                        label='Email'
                        margin='normal'
                        variant='filled'
                        size='medium'
                        color='primary'
                        {...register('email')}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />

                </div>


                <div>

                    <TextField                   
                        label='Senha'
                        margin='normal'
                        variant='filled'
                        size='medium'
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
                        label='Confirmar senha'
                        margin='normal'
                        variant='filled'
                        size='medium'
                        color='primary'
                        type='password'
                        {...register('confirmPassword')}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword?.message}
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
                        Login
                    </Button>

                </Paper>

            </form>
            
        </Paper>

    </Box>
    
)
}

export default Login;