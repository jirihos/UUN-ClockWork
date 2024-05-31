import { useState } from "react";
import {
  Button,
  Form,
  FormField,
  FormGroup,
  Input,
  Segment,
} from "semantic-ui-react";
import { useCall } from "../helpers/call-helper";
import Header from "../components/header";

const ExportPage = () => {
  const call = useCall();
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  async function submit() {
    const csvBlob = await call("POST", "/api/event/exportAllShifts", {
      timestampFrom: new Date(dateFrom).toISOString(),
      timestampTo: new Date(dateTo).toISOString(),
    });
    // TODO handle errors

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
    <>
      <Header />
      <Segment>
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
      </Segment>
    </>
  );
};

export default ExportPage;
