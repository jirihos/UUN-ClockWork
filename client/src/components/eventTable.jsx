import React from "react";

const EventTable = ({ events }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Department</th>
          <th>Terminal ID</th>
          <th>Date</th>
          <th>Arrival Time</th>
          <th>Departure Time</th>
        </tr>
      </thead>
      <tbody>
        {events.map((event, index) => (
          <tr key={index}>
            <td>{event.name}</td>
            <td>{event.department}</td>
            <td>{event.terminalId}</td>
            <td>{event.date}</td>
            <td>{event.arrivalTime}</td>
            <td>{event.departureTime}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EventTable;
