import React, { useState } from "react";
import { Button, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { TextField } from "@mui/material";
import { Dialog } from "@mui/material";

function AddCustomer(props){
    const[open, setOpen] = useState(false);
    const[customer, setCustomer] = useState({firstname: '',lastname: '', streetaddress: '', postcode: '', city: '', email:'', phone: ''});
    
    const handleClickOpen = () => {
        setOpen(true);
      }

    const handleClose = () => {
        props.addCustomer(customer);
        setOpen(false);
      }

    const handleCancel = () => {
        setOpen(false);
      }
    const inputChanged = (event) => {
        setCustomer({...customer, [event.target.name]: event.target.value});
      }
    
    return(
        <div>
            <Button style={{margin: 10}} variant="outlined" color="primary" onClick={handleClickOpen}>
                Add Customer
            </Button>
            <Dialog open={open} disableEscapeKeyDown={true} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">New Customer</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="firstname"
                        name="firstname"
                        value={customer.firstname}
                        onChange={inputChanged}
                        label="First name"
                        fullWidth
                        />
                        <TextField
                        autoFocus
                        margin="dense"
                        id="lastname"
                        name="lastname"
                        value={customer.lastname}
                        onChange={inputChanged}
                        label="Last name"
                        fullWidth
                        />
                        <TextField
                        autoFocus
                        margin="dense"
                        id="streetaddress"
                        name="streetaddress"
                        value={customer.streetaddress}
                        onChange={inputChanged}
                        label="Address"
                        fullWidth
                        />
                        <TextField
                        autoFocus
                        margin="dense"
                        id="postcode"
                        name="postcode"
                        value={customer.postcode}
                        onChange={inputChanged}
                        label="Postcode"
                        fullWidth
                        />
                        <TextField
                        autoFocus
                        margin="dense"
                        id="city"
                        name="city"
                        value={customer.city}
                        onChange={inputChanged}
                        label="City"
                        fullWidth
                        />
                        <TextField
                        autoFocus
                        margin="dense"
                        id="email"
                        name="email"
                        value={customer.email}
                        onChange={inputChanged}
                        label="Email"
                        fullWidth
                        />
                        <TextField
                        autoFocus
                        margin="dense"
                        id="phone"
                        name="phone"
                        value={customer.phone}
                        onChange={inputChanged}
                        label="Phone"
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
export default AddCustomer;