import React from "react";
import {
  TableRow,
  TableHeaderCell,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "semantic-ui-react";

const EventTable = ({ events }) => {
  return (
    <Table striper>
      <TableHeader>
        <TableRow>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell>Department</TableHeaderCell>
          <TableHeaderCell>Terminal ID</TableHeaderCell>
          <TableHeaderCell>Arrival Time</TableHeaderCell>
          <TableHeaderCell>Departure Time</TableHeaderCell>
        </TableRow>
      </TableHeader>
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
