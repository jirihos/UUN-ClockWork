import React from 'react';

const EventTable = ({ events }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Jméno</th>
          <th>Oddělení</th>
          <th>ID Terminálu</th>
          <th>Čas Příchodu</th>
          <th>Čas Odchodu</th>
        </tr>
      </thead>
      <tbody>
        {events.map((event, index) => (
          <tr key={index}>
            <td>{event.name}</td>
            <td>{event.department}</td>
            <td>{event.terminalId}</td>
            <td>{event.arrivalTime}</td>
            <td>{event.departureTime}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EventTable;