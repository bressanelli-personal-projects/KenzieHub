import { Button, Paper } from "@material-ui/core";
import useStyles from "./styles";
import { TextField } from "@material-ui/core";
import { useState } from "react";

const Card = ({ title, status, delClick, techId, editFunction }) => {

    const [ isShow, setIsShow ] = useState(false);
    const [ value, setValue ] = useState(''); 

    const classes = useStyles();

    const handleEditForm = (e) => {
        e.preventDefault()
        setIsShow(!isShow)
    }

    return(

        <div className={classes.container}>

            <Paper className={classes.paper} elevation={10}>

                <div>Tecnologia: {title}</div>
            
                <div>Status: {status}</div>                

                <Button
                    variant='contained'
                    color="error"
                    onClick={delClick}
                >DEL
                </Button>

                <form  onSubmit={editFunction}>                

                    {isShow && <Button
                        variant='contained'
                        onClick={(e) => {
                            handleEditForm(e)
                            editFunction(value, techId)}}
                    >
                        SEND
                    </Button>}

                    {!isShow && <Button
                        variant='contained'
                        color="primary"
                        onClick={handleEditForm}                    
                    >EDIT
                    </Button>}

                    {isShow && <TextField                                
                        label="Status"
                        size='small'  
                        onChange={ (event) => setValue(event.target.value)}              
                    >   
                    </TextField>}   

                </form>

                

            </Paper>         
            
        </div>
    )
}


export default Card;