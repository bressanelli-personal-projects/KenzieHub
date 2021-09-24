import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        flexBasis: 1,       
    },

    paper: {        
        height: '550px',        
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',       
        padding: '40px 50px',   
        background: 'linear-gradient(45deg, #bbdefb 40%, #fff9c4 90%)',                             
    }, 
    
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems:'center',
        justifyContent: 'center',
        height: '100vh',  
        padding: '10px',
    },
    
    
           
}));

export default useStyles;