import { useEffect, useState, useParams } from "react";
import axios from "axios";
import Header from "../components/header";

const Employee = () => {
  const [shiftData, setShiftData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { code } = useParams();

  useEffect(() => {
    const fetchShiftData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/event/listShiftsByEmployeeCode?pageIndex=0&pageSize=30&employeeCode=${code}`,
        );
        setShiftData(response.data.items);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchShiftData();
  }, [code]);

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
