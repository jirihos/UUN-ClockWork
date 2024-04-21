import { useState } from "react";
import EventTable from "../components/eventTable";

// Function to generate temporary data.
// This is temporary solution and will be replaced with actual data fetching.
const generateData = () => {
  const data = [];
  const names = ["Carl Berry", "John Doe", "Paul Smith"];
  const departments = ["IT", "HR"];
  const terminalIds = ["123", "456", "789"];
  const dates = ["2022-01-01", "2022-01-02"];
  const arrivalTime = "08:00";
  const departureTimes = ["16:30", "14:40", "15:31"];

  // Generate 35 events with random data.
  for (let i = 0; i < 35; i++) {
    const name = names[Math.floor(Math.random() * names.length)];
    const department =
      departments[Math.floor(Math.random() * departments.length)];
    const terminalId =
      terminalIds[Math.floor(Math.random() * terminalIds.length)];
    const date = dates[Math.floor(Math.random() * dates.length)];
    const departureIndex = Math.floor(Math.random() * departureTimes.length);
    const departureTime = departureTimes[departureIndex];

    data.push({
      name,
      department,
      terminalId,
      date,
      arrivalTime,
      departureTime,
    });
  }
  console.log(data);
  return data;
};

const TablePage = () => {
  // State for holding events data.
  const [events, setEvents] = useState(generateData());

  return (
    <div>
      <h1>Events Table</h1>
      {/* Render EventTable component with events data. */}
      <EventTable events={events} />
    </div>
  );
};

export default TablePage;
