import { useState } from "react";
import "./App.css";

import EventTable from "./components/eventTable";

function App() {
  const [events, setEvents] = useState([
    {
      name: "Carl Berry",
      department: "IT",
      terminalId: "123",
      date: "2022-01-01",
      arrivalTime: "08:00",
      departureTime: "16:30",
    },
    {
      name: "John Doe",
      department: "HR",
      terminalId: "456",
      date: "2022-01-01",
      arrivalTime: "08:00",
      departureTime: "16:30",
    },
    {
      name: "Paul Smith",
      department: "IT",
      terminalId: "789",
      date: "2022-01-01",
      arrivalTime: "08:00",
      departureTime: "16:30",
    },
    {
      name: "Carl Berry",
      department: "IT",
      terminalId: "123",
      date: "2022-01-02",
      arrivalTime: "08:00",
      departureTime: "14:40",
    },
    {
      name: "John Doe",
      department: "HR",
      terminalId: "456",
      date: "2022-01-02",
      arrivalTime: "08:00",
      departureTime: "15:31",
    },
    {
      name: "Paul Smith",
      department: "IT",
      terminalId: "789",
      date: "2022-01-02",
      arrivalTime: "08:00",
      departureTime: "16:30",
    },
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
