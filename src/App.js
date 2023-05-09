
import './App.css';
import CustomerList from './components/Customers';
import TrainingList from './components/Trainings';
import Calendar from './components/Calendar';
import {BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
        <Link className='Link' to="/CustomerList">Customers </Link>{''}
        <Link className='Link' to="/TrainingList">Trainings </Link>{''}
        <Link className='Link' to="/Calendar">Training calendar</Link>{''}
        <Routes>
          <Route path="/CustomerList" element={<CustomerList/>}></Route>
          <Route path="/TrainingList" element={<TrainingList/>}></Route>
          <Route path="/Calendar" element={<Calendar/>}></Route>
        </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
