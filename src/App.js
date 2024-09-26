import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Login';
import AdminDashboard from './Admindashboard';
import Register from './Register';
import Admincalender from './Admincalender';
import Adminmailbox from './Adminmailbox';
import Adminperformance from './Adminperformance';
import Adminsettings from './Adminsettings';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin-calender" element={<Admincalender/>} />
          <Route path="/admin-chat" element={<Adminmailbox/>} />
          <Route path="/admin-performance" element={<Adminperformance/>} />
          <Route path='/admin-settings' element={<Adminsettings/>}/>
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

// // src/App.js
// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import AdminDashboard from './Admindashboard';


// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/admin-dashboard" element={<AdminDashboard />} />
//         {/* <Route path="/calendar" element={<CalendarPage />} />
//         <Route path="/chat" element={<Chat />} />
//         <Route path="/performance" element={<Performance />} />
//         <Route path="/settings" element={<Settings />} /> */}
//       </Routes>
//     </Router>
//   );
// }

// export default App;
