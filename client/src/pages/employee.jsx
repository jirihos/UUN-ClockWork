import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { useCall } from "../helpers/call-helper"; // Adjust the import path as necessary
import Header from "../components/header";
import { UserContext } from "../components/userContext";

const Employee = () => {
  const { code } = useParams();
  const [shiftData, setShiftData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const call = useCall();
  const userContext = useContext(UserContext);

  useEffect(() => {
    const fetchShiftData = async () => {
      try {
        const response = await call(
          "GET",
          `/api/event/listShiftsByEmployeeCode?pageIndex=0&pageSize=30&employeeCode=${code}`,
        );
        setShiftData(response.items); // Assuming the response has an items property
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchShiftData();
  }, [code, call]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data: {error.message}</div>;

  return (
    <div>
      <Header />
      <h1>Employee Code: {code}</h1>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Arrival Time</th>
            <th>Departure Time</th>
          </tr>
        </thead>
        <tbody>
          {shiftData &&
            shiftData.map((entry, index) => (
              <tr key={index}>
                <td>{new Date(entry.arrivalTimestamp).toLocaleDateString()}</td>
                <td>{new Date(entry.arrivalTimestamp).toLocaleTimeString()}</td>
                <td>{new Date(entry.leaveTimestamp).toLocaleTimeString()}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Employee;
