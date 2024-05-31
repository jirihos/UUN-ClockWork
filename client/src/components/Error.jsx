import { Message, MessageHeader } from "semantic-ui-react";

const Error = ({ error }) => {
  return (
    <Message negative style={{ textAlign: "left", overflow: "auto" }}>
      <MessageHeader>An error has occurred</MessageHeader>
      {error && <pre>{error.stack}</pre>}
    </Message>
  );
};

export default Error;
