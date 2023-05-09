import React, { useState } from "react";
import { Button, DialogActions, DialogContent, DialogTitle, InputLabel } from "@mui/material";
import { TextField } from "@mui/material";
import { Dialog } from "@mui/material";
import { DatePicker, DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


function AddTraining(props){
    const[open, setOpen] = useState(false);
    const[training, setTraining] = useState({date: '', duration: '', activity: '', customer: ''});
    
 const handleClickOpen = () => {
    console.log(training)
    console.log(props.customer.links[0].href)
    setTraining({...training, customer: props.customer.links[0].href})
    setOpen(true);
      }

 const handleClose = () => {
     props.addTraining(training);
     setOpen(false);
      }

    const handleCancel = () => {
        setOpen(false);
      }
    const inputChanged = (event) => {
        setTraining({...training, [event.target.name]: event.target.value});
      }
     
      const handleDateChange = (date) => {
        setTraining({...training, date: date});
    }
    
    return(
        <div>
            <Button style={{margin: 10}}  color="primary" onClick={handleClickOpen}>
                Add Training
            </Button>
            <Dialog open={open} disableEscapeKeyDown={true} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">New Training</DialogTitle>
                <DialogContent>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker format="HH:mm:ss"
                        autoFocus
                        margin="dense"
                        id="date"
                        name="date"
                        value={training.date}
                        onChange={handleDateChange}
                        label="Date and Time"
                        fullWidth
                        />
                        </LocalizationProvider>
                        <TextField
                        autoFocus
                        margin="dense"
                        id="duration"
                        name="duration"
                        value={training.duration}
                        onChange={inputChanged}
                        label="Duration in minutes"
                        fullWidth
                        />
                        <TextField
                        autoFocus
                        margin="dense"
                        id="activity"
                        name="activity"
                        value={training.activity}
                        onChange={inputChanged}
                        label="Activity"
                        fullWidth
                        />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} color="primary">
                    Cancel
                    </Button>
                    <Button onClick={handleClose} color="primary">
                    Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
export default AddTraining;