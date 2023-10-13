import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './home.css'
 
function Home() {
  const [data, setData] = useState([])
 
  useEffect(()=> {
    axios.get('http://localhost:3001/getvehicle')
    .then(res => {
      if(res.data.Status === "Success") {
        setData(res.data.Result);
      } else {
        alert("Error")
      }
    })
    .catch(err => console.log(err));
  }, [])
 
  const handleDelete = (booking_id) => {
    axios.delete('http://localhost:3001/delete/'+booking_id)
    .then(res => {
      if(res.data.Status === "Success") {
        window.location.reload(true);
        alert("Account Successfully Deleted")
      } else {
        alert("Error")
      }
    })
    .catch(err => console.log(err));
  }
 
  return (
    <div className='table-container'>
      <div className='title'>
        <h3>Vehicle Reservation List</h3>
      </div>
      
      <div className='table-box'>
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Location</th>
              <th>Vehicle Number</th>
              <th>Mileage</th>
              <th>Message</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              return <tr key={index}>
                  <td>{item.date}</td>
                  <td>{item.time}</td>
                  <td>{item.location}</td>
                  <td>{item.vehicle_no}</td>
                  <td>{item.mileage}</td>
                  <td>{item.message}</td>
                  <td>
                    <button onClick={e => handleDelete(item.booking_id)} className='delete'>delete</button>
                  </td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
 
export default Home