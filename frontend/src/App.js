import React from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar';
import PackageRetrieval from './components/packageRetrieval/PackageRetrieval';
import LockerStatus from './components/lockerStatus/LockerStatus';
import UserRegistration from './components/userRegistration/UserRegistration';
import LockerReservation from './components/lockerReservation/LockerReservation';
function App() {
  return (
    <div className="App">
      <Navbar />
      <UserRegistration />
      <LockerReservation />
      <PackageRetrieval />
      <LockerStatus />
    </div>
  );
}

export default App;

