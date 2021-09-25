import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        flex: 1,
    },

    container: {
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        // alignItems: '',
    },

    form: {
        padding: '10px',
    },

    div: {
        display: 'flex',
        alignItems: 'center',    
    },

    paper: {
        padding: '30px',
    }

}))

export default useStyles;