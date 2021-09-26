import { makeStyles } from "@material-ui/styles";
import background_signup from '../../assets/background_signup.png'

const useStyles = makeStyles((theme) => ({
    root: {
        flex: 1,
    },

    container: {
        width: '100vw',
        // height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        // backgroundColor: '#007aff',
        backgroundImage: `url(${background_signup})`,
        backgroundSize: '100%',
        padding: '20px',
    },

    form: {
        padding: '10px',
    },

    div: {
        display: 'flex',
        alignItems: 'center',
        margin: '10px 0',
    },

    paper: {
        padding: '30px',
    },

    greeting: {
        textAlign: 'center',
    },
}))

export default useStyles;