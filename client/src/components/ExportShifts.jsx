import { useContext, useState } from "react";
import {
  Button,
  Form,
  FormField,
  FormGroup,
  Input,
  Message,
  MessageHeader,
  Segment,
} from "semantic-ui-react";
import { useCall } from "../helpers/call-helper";
import Error from "./Error";
import { UserContext } from "./UserContext";

const ExportShifts = () => {
  const call = useCall();
  const [error, setError] = useState(null);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const user = useContext(UserContext);

  async function submit() {
    let csvBlob;
    try {
      csvBlob = await call("POST", "/api/event/exportAllShifts", {
        timestampFrom: new Date(dateFrom).toISOString(),
        timestampTo: new Date(dateTo).toISOString(),
      });
    } catch (e) {
      setError(e);
      throw e;
    }

    const objectUrl = URL.createObjectURL(csvBlob);
    const a = document.createElement("a");
    a.href = objectUrl;
    a.download = "shifts_export.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(objectUrl);
  }

  return (
    <Segment>
      {user.role === "admin" ? (
        <Form onSubmit={submit}>
          <FormGroup widths="equal">
            <FormField>
              <label>From</label>
              <Input
                type="date"
                fluid
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                required
              />
            </FormField>
            <FormField>
              <label>To</label>
              <Input
                type="date"
                fluid
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                required
              />
            </FormField>
          </FormGroup>
          <div className="center-horizontal">
            <Button type="submit">Export to CSV</Button>
          </div>
        </Form>
      ) : (
        <Message error>
          <MessageHeader>Not authorized</MessageHeader>
        </Message>
      )}

      {error && <Error error={error} />}
    </Segment>
  );
};

export default ExportShifts;
