import React from "react";
import {
  TableRow,
  TableHeaderCell,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "semantic-ui-react";

/**
 * EventTable component renders a table with events data.
 *
 * @component
 * @param {Array} events - Array of events objects.
 * @property {string} events[].name - The name of the event.
 * @property {string} events[].department - The department of the event.
 * @property {string} events[].terminalId - The terminal id of the event.
 * @property {string} events[].arrivalTime - The arrival time of the event.
 * @property {string} events[].departureTime - The departure time of the event.
 * @return {JSX.Element} The rendered EventTable component.
 */
const EventTable = ({ events }) => {
  return (
    <Table striped>
      {/* Table header */}
      <TableHeader>
        <TableRow>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell>Department</TableHeaderCell>
          <TableHeaderCell>Terminal ID</TableHeaderCell>
          <TableHeaderCell>Arrival Time</TableHeaderCell>
          <TableHeaderCell>Departure Time</TableHeaderCell>
        </TableRow>
      </TableHeader>

      {/* Table body */}
      <TableBody>
        {events.map((event, index) => (
          <TableRow key={index}>
            <TableCell>{event.name}</TableCell>
            <TableCell>{event.department}</TableCell>
            <TableCell>{event.terminalId}</TableCell>
            <TableCell>{event.arrivalTime}</TableCell>
            <TableCell>{event.departureTime}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default EventTable;
