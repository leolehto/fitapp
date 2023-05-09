import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css';
import'ag-grid-community/styles/ag-theme-material.css';
import { Button } from "@mui/material";
import { Snackbar } from "@mui/material";
import AddTraining from "./AddTraining";




function TrainingList(){
    const[trainings, setTrainings] = useState([]);
    const[open, setOpen] = useState(false);

    useEffect(() => {
        getTrainings();
    } ,[])
  

    const getTrainings = () =>{
        fetch('https://traineeapp.azurewebsites.net/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data))
    }
    const deleteTraining = (params) => {
      if(window.confirm("are you sure?")){
          const url = `https://traineeapp.azurewebsites.net/api/trainings/${params.data.id}`
          console.log(url)
          fetch(url, {method: 'DELETE'})
          .then(response => {
              if(response.ok){
                  setOpen(true) 
                  getTrainings();
                  }
                   else
                   alert('Something went wrong in deletion: ' + response.status);
               })
               .catch(err => console.log(err))
           }
       }

    const formatDate = (date) => {
        const options = { day: "2-digit", month: "2-digit", year: "numeric" };
        const formattedDate = new Date(date).toLocaleDateString("fi-FI", options);
        const formattedTime = new Date(date).toLocaleTimeString("fi-FI");
        return `${formattedDate} ${formattedTime}`;
      };


      

    const[columns] = useState ([
        {headerName: 'Date', field: 'date',valueFormatter: (params) => formatDate(params.value), filter: true, sortable: true},
        {headerName: 'Duration in minutes', field: 'duration', filter: true, sortable: true},
        {headerName: 'Activity', field: 'activity', filter: true, sortable: true},
        {headerName: 'First name', field: 'customer.firstname', filter: true, sortable: true},
        {headerName: 'Last name', field: 'customer.lastname', filter: true, sortable: true},
        {cellRenderer: params => <Button size = "small" color = "error" onClick={() => deleteTraining(params)}>Delete</Button>}
    ]);

    
   


    return(
        <>
        <div className="ag-theme-material" style={{height: '700px', width: '70%', margin: 'auto'}}>
             <AgGridReact
                columnDefs={columns}
                rowData={trainings}>
            </AgGridReact>
        <Snackbar 
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        message='Training deleted successfully' 
      />
        </div>
        </>
    )
    
}
export default TrainingList