import React, { useState } from "react";
import { Button } from "semantic-ui-react";
import ModalAddEmployee from "../components/modalAddEmployee";

const TestSite = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <h1>
        This is a test page for the purpose of creating a web application.
      </h1>
      <ModalAddEmployee open={open} setOpen={setOpen} />
    </div>
  );
};

export default TestSite;
