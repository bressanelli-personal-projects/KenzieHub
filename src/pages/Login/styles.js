import { makeStyles } from "@material-ui/styles";
import background_signup from '../../assets/background_signup.png'

const useStyles = makeStyles((theme) => ({
    root: {
        flexBasis: 1,       
    },

    container: {        
        // backgroundColor: '#007aff',
        // backgroundColor: '#007aff',
        backgroundImage: `url(${background_signup})`,
        backgroundSize: '100%',
        // alignItems:'center',
        justifyContent: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        height: '100vh',  
        padding: '10px',
    },

    paper: {               
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',       
        padding: '30px 0px',   
        background: 'linear-gradient(45deg, #bbdefb 40%, #fff9c4 90%)',  
        boxSizing: 'border-box', 
        // opacity: 0.9,                          
    },   
    
    
    form: {
        width: '60%',
    },

    svg: {
        marginLeft: '20px',
    },

    link: {
        textDecoration: 'none',
    },
           
}));

export default useStyles;