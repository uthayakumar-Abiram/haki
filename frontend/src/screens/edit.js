import React, { useState } from "react";

import { Modal,  Container,Button } from "react-bootstrap"
const BookingPage = () => {
 
  const [ startDate, setstartDate] = useState('');
  const [endDate, setendDate] = useState('');
  const handlestartDateChange = (e) => {
    setstartDate(e.target.value);
  };
  const handleendDateChange = (e) => {
    setendDate(e.target.value);
  };
  
  const [totalDays, setTotalDays] = useState(null);


  const handleSubmit = async (event) => {
    event.preventDefault();
  };
 
  function calculateDateDifference(startDate,endDate) {
    const startDateObject = new Date(startDate);
    const endDateObject = new Date(endDate);
    if (!isNaN(startDateObject.getTime()) && !isNaN(endDateObject.getTime())) {
      const differenceInMilliseconds = endDateObject - startDateObject;
      const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
      return differenceInDays;
    } else {
      return 0 ; // Invalid dates, return null
    }
  }
  const dateDifference = calculateDateDifference(startDate, endDate);

// Function to calculate the total price
function calculateTotalPrice( dateDifference) {
  const servicePrices = {
    "1": 800, 
  };
  const pricePerDay = 900 || 0; 
  if (isNaN(dateDifference) || dateDifference < 0) {
    return null; 
  }
  const totalPrice = pricePerDay * dateDifference;
  return totalPrice;
}
const totalPrice = calculateTotalPrice(dateDifference);

  return (
    <main>
    <Container>
     <div className="space"></div>
   
    <div className="container mt-5">
      <div className="row">
      <div className="col-lg-6">
          
</div>
            {/* Right Side */}
            <div className="col-lg-6">
            <form className="card card-body" onSubmit={handleSubmit}>
                   <div className="form-group">
              <label htmlFor="startDate">Reservation Date</label>
              <input
                type="date"
                className="form-control"
                id="startDate"
                onChange={handlestartDateChange }
              />
            </div>
            <div className="form-group">
              <label htmlFor="endDate">Reservation End Date</label>
              <input
                type="date"
                className="form-control"
                id="endDate"
                onChange={handleendDateChange}
              />
            </div>
                 <div className="form-group">
              <label htmlFor="totalDays">Total Days</label>
              <input
                type="text"
                className="form-control"
                id="totalDays"
                value={totalDays !== null ? totalDays : (`${dateDifference} days`) }
                readOnly
              />
            </div>
            <div className="form-group">
              <label htmlFor="Price">Price</label>
              <input
                type="text"
                className="form-control"
                id="Price"
                value={totalPrice !== null ? totalPrice :(`The total price for the selected service is: $${totalPrice}`) }
                readOnly
              />
            </div>
          
          
          </form>
        </div>
      </div>
   
    </div>
    </Container>
    </main>
  );
};
export default BookingPage;










