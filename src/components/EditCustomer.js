import React, { useState } from "react";
import { Button, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { TextField } from "@mui/material";
import { Dialog } from "@mui/material";

function EditCustomer(props){
    const[open, setOpen] = useState(false);
    const[customer, setCustomer] = useState({firstname: '', lastname: '', 
        streetaddress: '', postcode: '', city: '', 
        email: '', phone: ''});

    const handleClickOpen = () =>{
        console.log(props.customer)
        setCustomer({firstname: props.customer.firstname, lastname:props.customer.lastname,
        streetaddress: props.customer.streetaddress, postcode: props.customer.postcode, 
        city: props.customer.city, email: props.customer.email, phone: props.customer.phone});
        setOpen(true);
    }
 
    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (event) =>{
        setCustomer({...customer, [event.target.name]: event.target.value})
    }

    const editCustomer = () => {
        props.editCustomer(customer, props.customer.links[1].href)
        handleClose();
    }
     
    return(
        <div>
            <Button  color="primary" onClick={handleClickOpen}>Edit customer</Button>
            <Dialog open={open} disableEscapeKeyDown={true} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit Customer</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="firstname"
                        name="firstname"
                        value={customer.firstname}
                        onChange={e => handleInputChange(e)}
                        label="First name"
                        fullWidth
                        />
                        <TextField
                        autoFocus
                        margin="dense"
                        id="lastname"
                        name="lastname"
                        value={customer.lastname}
                        onChange={e => handleInputChange(e)}
                        label="Last name"
                        fullWidth
                        />
                        <TextField
                        autoFocus
                        margin="dense"
                        id="streetaddress"
                        name="streetaddress"
                        value={customer.streetaddress}
                        onChange={e => handleInputChange(e)}
                        label="Address"
                        fullWidth
                        />
                        <TextField
                        autoFocus
                        margin="dense"
                        id="postcode"
                        name="postcode"
                        value={customer.postcode}
                        onChange={e => handleInputChange(e)}
                        label="Postcode"
                        fullWidth
                        />
                        <TextField
                        autoFocus
                        margin="dense"
                        id="city"
                        name="city"
                        value={customer.city}
                        onChange={e => handleInputChange(e)}
                        label="City"
                        fullWidth
                        />
                        <TextField
                        autoFocus
                        margin="dense"
                        id="email"
                        name="email"
                        value={customer.email}
                        onChange={e => handleInputChange(e)}
                        label="Email"
                        fullWidth
                        />
                        <TextField
                        autoFocus
                        margin="dense"
                        id="phone"
                        name="phone"
                        value={customer.phone}
                        onChange={e => handleInputChange(e)}
                        label="Phone"
                        fullWidth
                        />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                    Cancel
                    </Button>
                    <Button onClick={editCustomer} color="primary">
                    Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
export default EditCustomer;