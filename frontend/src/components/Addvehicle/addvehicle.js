import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './addvehicle.css'
 
function AddVehicle() {
    const initialState = {
        date: "",
        time: "",
        location: "",
        vehicle_no: "",
        mileage: "",
        message: "",
    };
 
    const [state, setState] = useState(initialState);
    
    const {date,time,location,vehicle_no,mileage,message} = state;

    const [registerStatus, setRegisterStatus] = useState("");
     
    const navigate = useNavigate()

    const create = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/create", {
          date: date,
          time: time,
          location: location,
          vehicle_no: vehicle_no,
          mileage: mileage,
          message: message,
          
        }).then((response) => {
          // setRegisterStatus(response);
          console.log(response);
          if(response.data.message){
            setRegisterStatus(response.data.message);
          }else{
            navigate('/')
            alert("Successfully Added Vehcile Reservation");
          }
        })
        .catch(err => console.log(err));
    }

    const handleInputChange = (e) => {    
        const { name, value} = e.target;
        setState({...state, [name]: value});
    };
 
    return (
        <div className='container'>
            <div className="header">
                <div className='text2'>Vehicle Reservation</div>
                <h1>{registerStatus}</h1>
                <div className='inputs'>
                    <div className="input">
                        <select id='coman' label="Date" value={state.date} onChange={handleInputChange} name="date" required>
                            <option value="">Select Date</option>
                            <option value="Monday">Monday</option>
                            <option value="Tuesday">Tuesday</option>
                            <option value="Wednesday">Wednesday</option>
                            <option value="Thuresday">Thuresday</option>
                            <option value="Friday">Friday</option>
                            <option value="Saturday">Saturday</option>
                        </select>
                    </div>
                    <div className="input">
                        <select id='coman' label="Time" value={state.time} onChange={handleInputChange} name="time" required>
                            <option value="">Select Time</option>
                            <option value={'10 AM'}>10 AM</option>
                            <option value={'11 AM'}>11 AM</option>
                            <option value={'12 AM'}>12 AM</option>
                        </select>
                    </div>
                    <div className="input">
                    <select id='coman' label="Location" value={state.location} onChange={handleInputChange} name="location" required> 
                            <option value="">Select Location</option>
                            <option value={"Jaffna"}>Jaffna</option>
                            <option value={"Vavuniya"}>Vavuniya</option>
                            <option value={"Mannar"}>Mannar</option>
                            <option value={"Puthalam"}>Puthalam</option>
                            <option value={"Silapam<"}>Silapam</option>
                            <option value={"Colombo"}>Colombo</option>
                            <option value={"Anurathapura"}>Anurathapuram</option>
                            <option value={"Kelaniya"}>Kelaniya</option>
                            <option value={"Kandy"}>Kandy</option>
                            <option value={"Gambaga"}>Gambaga</option>
                    </select>
                    </div>
                    <div className="input">
                        <input name='vehicle_no' type="text" value={state.vehicle_no} onChange={handleInputChange} className="form-control" placeholder="Vehicle Number-ABC 1234 or 123 - 1234" autoComplete='off'/>
                    </div>
                    <div className="input">
                        <input name="mileage" value={state.mileage} onChange={handleInputChange} placeholder="Enter your vehicle mileage" type="number" required/>
                    </div>
                    <div className="input">
                        <input name="message" value={state.message} onChange={handleInputChange} placeholder="Enter your message" type="text" required/>
                    </div>
                    <div className="submit-container">
                        <button type="submit" className="create" onClick={create}>Create</button>
                    </div>
                  </div>  
                </div>
        </div>
 
    )
}
 
export default AddVehicle