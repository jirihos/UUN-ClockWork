import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../components/header";

const EmployeeDetails = () => {
  const { code } = useParams();
  const [shiftData, setShiftData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShiftData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/event/listShiftsByEmployeeCode?pageIndex=0&pageSize=30&employeeCode=${code}`,
        );
        setShiftData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchShiftData();
  }, [code]);

  return (
    <div>
      <Header />
      <h1>Employee Code: {code}</h1>
      {loading && <div>Loading...</div>}
      {error && <div>Error loading data</div>}
      {!loading && !error && (
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
                  <td>{entry.date}</td>
                  <td>{entry.arrival}</td>
                  <td>{entry.departure}</td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EmployeeDetails;
