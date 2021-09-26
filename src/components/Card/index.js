import { Button, Paper } from "@material-ui/core";
import useStyles from "./styles";
import { TextField } from "@material-ui/core";
import { useState } from "react";
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Help from "../Help";

const Card = ({ title, status, delClick, techId, editFunction, local }) => {

    const [ isShow, setIsShow ] = useState(false);
    const [ value, setValue ] = useState(''); 

    const classes = useStyles();

    const handleEditForm = (e) => {
        e.preventDefault();
        setIsShow(!isShow);
    };

    return(

        <div className={classes.container}>

            <Paper className={classes.paper} elevation={10}>

                <div className={classes.techs}>

                    <div>
                        <p>Tecnologia: <strong>{title}</strong></p>
            
                        <p>Status: <strong>{status}</strong></p>

                    </div>

                    <div>
                        <Button
                            sx={{margin: '20px 0px'}}
                            variant='contained'
                            color="error"
                            onClick={delClick}
                        >
                            <DeleteOutlinedIcon />
                        </Button>

                        <Help local={local}/>

                    </div>
                    
                    
                </div>                 

                <div className={classes.editControl}>                   

                    <form  onSubmit={(e) => {
                        handleEditForm(e)
                        editFunction()
                    }}>                

                        {isShow && <Button
                            variant='contained'
                            onClick={(e) => {
                                handleEditForm(e)
                                editFunction(value, techId, status)}}
                        >
                            <SendOutlinedIcon />
                        </Button>}

                        {!isShow && <Button
                            variant='contained'
                            color="primary"
                            onClick={handleEditForm}                    
                        >
                            <ModeEditOutlineOutlinedIcon />
                        </Button>}

                        {isShow && <TextField
                            required
                            label="Novo status"
                            size='small'  
                            onChange={ (event) => setValue(event.target.value)}              
                        >   
                        </TextField>}                  
                        
                        
                    </form>                   

                </div>  

            </Paper>         
            
        </div>
    );
}

export default Card;