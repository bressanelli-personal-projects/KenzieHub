import { makeStyles } from "@material-ui/styles";
import background from '../../assets/background.png'

const useStyles = makeStyles((theme) => ({
    root: {
        flex: 1,
    },

    container: {
        width: '100vw',        
        display: 'flex',
        justifyContent: 'center',        
        backgroundImage: `url(${background})`,
        backgroundSize: '100%',
        padding: '20px',
    },

    form: {
        padding: '10px',
        
    },

    div: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '10px 0',
    },

    paper: {
        padding: '30px',
    },

    greeting: {
        textAlign: 'center',
        fontSize: '26px',
    },
}))

export default useStyles;