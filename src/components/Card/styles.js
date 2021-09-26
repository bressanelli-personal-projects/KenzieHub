import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
    root: {

    },

    container: {
        padding: '10px',        
    },

    paper: {
        display: 'flex',
        flexDirection: 'column',
        padding: '10px', 
        backgroundColor: '#f5f5f5',           
    },

    editControl: {
        display: 'flex',
        justifyContent: 'space-between',
    },

    techs: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: '10px 0',
    },
   
}))

export default useStyles;