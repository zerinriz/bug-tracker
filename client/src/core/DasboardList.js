import React, { useState, useEffect } from "react";
import { Card, GridRow, Header } from "semantic-ui-react";

function DasboardList({ priority, count, setState }) {
  const [color, setColor] = useState("red");
  useEffect(() => {
    if (priority === "High") {
      setColor("#F6412D");
    } else if (priority === "Low") {
      setColor("#F5E318");
    } else if (priority === "Medium") {
      setColor("#FF9800");
    }
  }, [priority]);
  return (
    <GridRow>
      <Card fluid onClick={() => setState({ activeItem: "View Bugs" })}>
        <Card.Content style={{ backgroundColor: color }}>
          <Header as="h1" style={{ marginTop: "10px" }}>
            Total: {priority}
          </Header>
          <Card.Description as="h1" style={{ marginTop: "30px" }}>
            {count}
          </Card.Description>
        </Card.Content>
      </Card>
    </GridRow>
  );
}

export default DasboardList;
