import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        flexBasis: 1,       
    }, 
    
    container: {
        backgroundColor: '#007aff',
        alignItems:'center',
        justifyContent: 'center',
        alignContent: 'center',
        height: '100vh',  
        padding: '10px',
    },

    paper: {               
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',       
        padding: '40px 0px',   
        background: 'linear-gradient(45deg, #bbdefb 40%, #fff9c4 90%)',  
        boxSizing: 'border-box',                           
    },

    form: {
        width: '60%',
    },
    
    grid: {
        maxWidth: '800px',
        height: '100vh',
        justifyContent: 'center',
        alignItems:'center', 
        margin: '0 auto',
        
    },
           
}));

export default useStyles;