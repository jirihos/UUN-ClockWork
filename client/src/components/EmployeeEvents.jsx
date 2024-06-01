import { useEffect, useState } from "react";
import { useCall } from "../helpers/call-helper";
import "../css/employee.css";
import {
  Table,
  TableHeader,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Label,
} from "semantic-ui-react";

const Employee = ({ code }) => {
  const [shiftData, setShiftData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const call = useCall();

  useEffect(() => {
    const fetchShiftData = async () => {
      try {
        const response = await call(
          "GET",
          `/api/event/listShiftsByEmployeeCode?pageIndex=0&pageSize=30&employeeCode=${code}`,
        );
        setShiftData(response.items);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchShiftData();
  }, [code, call]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error)
    return <div className="error">Error loading data: {error.message}</div>;

  return (
    <div className="container">
      <Table celled>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Arrival</TableHeaderCell>
            <TableHeaderCell>Departure</TableHeaderCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {shiftData &&
            shiftData.map((entry, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Label ribbon>
                    {new Date(entry.arrivalTimestamp).toLocaleDateString()}
                  </Label>
                  {new Date(entry.arrivalTimestamp).toLocaleTimeString()}
                </TableCell>
                <TableCell>
                  <Label ribbon>
                    {new Date(entry.leaveTimestamp).toLocaleDateString()}
                  </Label>
                  {new Date(entry.leaveTimestamp).toLocaleTimeString()}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Employee;