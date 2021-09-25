import { makeStyles } from "@material-ui/styles";
import background_PC from '../../assets/background_PC.png';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        
        
    },

    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems:'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundImage: `url(${background_PC})`,
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed'
    },

    paper: {
        width: '200px',
        margin: '20px',
    },

    link: {
        textDecoration: 'none',
    },

    title: {
        color: '#fff',
        fontSize: '40px',
        textShadow: '-1px 4px 25px rgba(0,0,0,1);'
    },

}));

export default useStyles;