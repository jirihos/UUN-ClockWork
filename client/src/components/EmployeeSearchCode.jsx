import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "semantic-ui-react";
import "../css/employee.css"; // Adjust the path to your CSS file

const EmployeeSearchCode = () => {
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { value } = e.target;
    // Allow only numbers and limit to 4 digits
    if (/^\d{0,4}$/.test(value)) {
      setCode(value);
    }
  };

  const handleClick = () => {
    if (code.length === 4) {
      navigate(`/employee/${code}`);
    } else {
      alert("Please enter a 4-digit code.");
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Input
        className="wide-input" // Apply the CSS class
        type="text"
        placeholder="Enter 4-digit Employee code"
        value={code}
        onChange={handleChange}
        maxLength="4"
        style={{ marginRight: "1em" }}
      />
      <Button color="teal" onClick={handleClick}>
        Search
      </Button>
    </div>
  );
};

export default EmployeeSearchCode;
