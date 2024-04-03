import { useState } from "react";
import "./App.css";

import EventTable from "./components/eventTable";

function App() {
  const [events, setEvents] = useState([
    { name: 'Jan Novák', department: 'IT', terminalId: '123', arrivalTime: '08:00', departureTime: '16:30' },
    { name: 'Václav Hrbsky', department: 'FIN', terminalId: '456', arrivalTime: '09:00', departureTime: '17:30' },
    { name: 'Petr Novák', department: 'IT', terminalId: '789', arrivalTime: '10:00', departureTime: '18:30' },
    { name: 'Pavel Novák', department: 'HR', terminalId: '321', arrivalTime: '11:00', departureTime: '19:30' },
    { name: 'Jiri Novák', department: 'IT', terminalId: '654', arrivalTime: '12:00', departureTime: '20:30' },
    { name: 'Václav Novák', department: 'IT', terminalId: '987', arrivalTime: '13:00', departureTime: '21:30' },
    { name: 'Jan Hrbsky', department: 'IT', terminalId: '147', arrivalTime: '14:00', departureTime: '22:30' },
    { name: 'Pavel Hrbsky', department: 'IT', terminalId: '258', arrivalTime: '15:00', departureTime: '23:30' },
    { name: 'Jiri Hrbsky', department: 'HR', terminalId: '369', arrivalTime: '16:00', departureTime: '00:30' },
    { name: 'Václav Hrbsky', department: 'FIN', terminalId: '159', arrivalTime: '17:00', departureTime: '01:30' },
    { name: 'Pavel Hrbsky', department: 'IT', terminalId: '753', arrivalTime: '18:00', departureTime: '02:30' },
    { name: 'Jiri Hrbsky', department: 'IT', terminalId: '147', arrivalTime: '19:00', departureTime: '03:30' },
  ]);

  return (
    <>
      <div className="EventTable">
        <EventTable events={events} />
      </div>
    </>
  );
}

export default App;
