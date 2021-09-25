import { Paper } from "@material-ui/core";
import useStyles from "../Dashboard/styles";
import { Button, TextField, Fade } from "@material-ui/core";
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import api from '../../services/api';
import { toast } from "material-react-toastify";
import { Link, Redirect } from "react-router-dom";
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { useEffect, useState } from "react";
import Card from '../../components/Card/index';
import { ResetTv } from "@mui/icons-material";

const Dashboard = () => {

    const [ token ] = useState(JSON.parse(localStorage.getItem('@Kehub:token')) || '');
    const [ user ] = useState(JSON.parse(localStorage.getItem('@Kehub:user')) || '');

    const [ tech, setTech ] = useState([])    
    const [ isShow, setIsShow ] = useState(false);
    
    const history = useHistory();

    const schema = yup.object().shape({       
        title: yup.string().required('Campo obrigatório'),
        status: yup.string().required('Campo obrigatório')
    });

    const { register, handleSubmit, reset, formState: { errors } } = useForm({resolver: yupResolver(schema)})

    const onSubmitForm = ({ title, status }) => {

        api.post('/users/techs', {
            'title': title,
            'status': status,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(response => {               
            showUser() 
            reset()
            toast.success('Tecnologia adicionada com sucesso!')
        })
        .catch(err => toast.error('Tecnologia não adicionada'))
    }    

    const showUser = () => {
        api.get(`/users/${user.id}`)
        .then((response) => {
            console.log(response.data.name)
            setTech(response.data.techs)
            console.log(tech)
        })        
    }    

    const handleTechs = () => {
        showUser()
        setIsShow(!isShow)
    }

    const deleteTech = ( tech_id ) => {        
        api.delete(`/users/techs/${tech_id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then((response) => {
            showUser()
            toast.success('Deletado com sucesso')
        }).catch((err) => console.log(err))
    }

    const editFunction = (data, techId) => {
        api.put(`/users/techs/${techId}`, 
        {
            "status": `${data}`
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then((response) => {
            showUser()
            toast.success('Modificado com sucesso')
        }).catch((err) => toast.error('Modificação não concluida'))
    }

    useEffect(() => {
        showUser()
    }, [])

    const classes = useStyles();
    
    return(

        <div className={classes.container} >        
           
            {/* <Container> */}
                <Fade in timeout={1500}>                   

                    <Paper className={classes.paper} elevation={10} >

                        <form className={classes.form} onSubmit={handleSubmit(onSubmitForm)} >                           

                            <div className={classes.div}>

                                <TextField 
                                    style={{margin: 0}}                      
                                    // fullWidth                   
                                    label='Tecnologia'
                                    margin='normal'                
                                    size='medium'
                                    color='primary'
                                    {...register('title')}
                                    error={!!errors.title}
                                    helperText={errors.title?.message}
                                >
                                </TextField>
                            

                                <TextField                               
                                    label="Status"
                                    // fullWidth
                                    {...register('status')}
                                    error={!!errors.status}
                                    helperText={errors.status?.message}            
                                >   
                                </TextField>

                            </div>                    

                            <Paper elevation={10}>

                                <Button
                                    endIcon={<AppRegistrationIcon className={classes.svg}/>}
                                    fullWidth
                                    variant='contained'
                                    color='primary'
                                    size='large'
                                    type='submit'
                                >
                                    Cadastrar
                                </Button>

                                <Button 
                                    onClick={handleTechs}
                                    fullWidth
                                >SHOW/HIDE TECHS                                
                                </Button>

                            </Paper>
                        
                        </form>
                            {isShow && tech.map(value => 
                                <Card
                                    key={value.id}
                                    title={value.title}
                                    status={value.status}
                                    valueId={value.id}
                                    delClick={() => deleteTech(value.id)}
                                    techId={value.id} 
                                    editFunction={editFunction}   
                                />
                            )}
                    </Paper>

                </Fade>
            {/* </Container> */}
            
            

            
        </div>

        
    )
}

export default Dashboard;