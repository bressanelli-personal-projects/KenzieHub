import { makeStyles } from "@material-ui/styles";
import background from '../../assets/background.png'

const useStyles = makeStyles((theme) => ({
    root: {
        flexBasis: 1,       
    }, 
    
    container: {        
        backgroundColor: '#007aff',
        backgroundImage: `url(${background})`,
        backgroundSize: '100%',
        backgroundAttachment: 'fixed',
        // alignItems:'center',
        justifyContent: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        // height: '100%',  
        padding: '10px',
    },

    paper: {               
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',       
        padding: '20px 0px',   
        background: 'linear-gradient(45deg, #bbdefb 40%, #fff9c4 90%)',  
        boxSizing: 'border-box', 
        // opacity: 0.2,                         
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