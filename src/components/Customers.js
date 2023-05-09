import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css';
import'ag-grid-community/styles/ag-theme-material.css';
import Button from '@mui/material/Button';
import { Snackbar } from "@mui/material";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import AddTraining from "./AddTraining";



function CustomerList(){
 const[customers, setCustomers] = useState([]);
 const[customerTrainings, setCustomerTrainings] = useState([]);
 const[open, setOpen] = useState(false);


 useEffect(() => {
   getCustomers();
 },[]);

 const getCustomerTrainings = () => {
   fetch("http://traineeapp.azurewebsites.net/api/trainings")
   .then(response => response.json())
   .then(data=> setCustomerTrainings(data.content))
   .catch(err => console.log(err))
 }

 const getCustomers = () =>{
     fetch("http://traineeapp.azurewebsites.net/api/customers")
     .then(response => response.json())
     .then(data => setCustomers(data.content))
     .catch(err => console.log(err))
    }

  
   
const deleteCustomer = (params) => {
    if(window.confirm("are you sure?")){
        const url = params.data.links[0].href
        console.log(url)
        fetch(url, {method: 'DELETE'})
        .then(response => {
            if(response.ok){
                setOpen(true) 
                getCustomers();
                }
                 else
                 alert('Something went wrong in deletion: ' + response.status);
             })
             .catch(err => console.log(err))
         }
     }
     const addCustomer = (customer) => {
        fetch("http://traineeapp.azurewebsites.net/api/customers", { 
          method: 'POST',
          headers: {'Content-type':'application/json'},
          body: JSON.stringify(customer)
        })
        .then(response => {
          if (response.ok)
            getCustomers();
          else
            alert('Something went wrong when adding a new customer');
        })
        .catch(err => console.error(err))
      }
      const editCustomer = (customers, links) => {
        fetch(links, { 
          method: 'PUT',
          headers: {'Content-type':'application/json'},
          body: JSON.stringify(customers)
        })
        .then(response => {
          if (response.ok)
            getCustomers();
          else
            alert('Something went wrong when editing a customer');
        })
        .catch(err => console.error(err))
      }
      const addTraining = (customerTraining) => {
        fetch("http://traineeapp.azurewebsites.net/api/trainings", { 
          method: 'POST',
          headers: {'Content-type':'application/json'},
          body: JSON.stringify(customerTraining)
        })
        .then(response => {
          if (response.ok)
            getCustomerTrainings();
          else
            alert('Something went wrong when adding a new training');
        })
        .catch(err => console.error(err))
      }

      
    
 
const[columns] = useState ([
    {headerName: 'First name', field: 'firstname', filter: true, sortable: true},
    {headerName: 'Last name', field: 'lastname', filter: true, sortable: true},
    {headerName: 'Addres', field: 'streetaddress', filter: true, sortable: true},
    {headerName: 'Postcode', field: 'postcode', filter: true, sortable: true},
    {headerName: 'City', field: 'city', filter: true, sortable: true},
    {headerName: 'Email',  field: 'email', filter: true, sortable: true},
    {headerName: 'Phone', field: 'phone', filter: true, sortable: true},
    {cellRenderer: row => <AddTraining addTraining = {addTraining} customer={row.data} ></AddTraining>},
    {cellRenderer: row => <EditCustomer editCustomer={editCustomer} customer={row.data}/>},
    {cellRenderer: params => <Button size = "small" color = "error" onClick={() => deleteCustomer(params)}>Delete customer</Button>}
])

 return(
     <>
     <AddCustomer addCustomer={addCustomer}/>
     <div className='ag-theme-material' 
     style={{height: '700px', width: '70%', margin: 'auto'}}>
        <AgGridReact
          rowData={customers}
          columnDefs={columns}>
        </AgGridReact>
        
        <Snackbar 
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        message='Customer deleted successfully' 
      />
     </div>
     </>
     
 )

 };
export default CustomerList