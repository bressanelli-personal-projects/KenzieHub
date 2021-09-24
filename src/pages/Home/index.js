import { Container, Box, Button, Paper } from "@material-ui/core";
import { Link } from "react-router-dom";
import useStyles from "./styles";


const Home = () => {

    const classes = useStyles();

    return(

        <Box container className={classes.container}>

        
            <h1 className={classes.title}>KENZIE HUB</h1>
        

        

            <Paper className={classes.paper} container elevation={10}>

                <Link className={classes.link} to='login'>

                    <Button
                        fullWidth 
                        variant='contained'
                        color='primary'
                        size='large'
                        type='submit'
                    >
                    LOGIN
                    </Button>           
                </Link>
            </Paper>

            <Paper className={classes.paper} container elevation={10}>

                <Link className={classes.link} to='signup'>

                    <Button
                    
                        fullWidth                         
                        variant='contained'
                        color='primary'
                        size='large'
                        type='submit'
                    >
                    SIGNUP
                    </Button> 

                </Link>
            </Paper>

            
        </Box>

    )
}

export default Home;