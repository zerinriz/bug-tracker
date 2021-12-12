import React, { useState, useEffect } from "react";
import { GridColumn, Card, Icon } from "semantic-ui-react";

function ViewBugsList({
  name,
  priority,
  version,
  setShow,
  id,
  setId,
  completed,
}) {
  const [color, setColor] = useState("red");
  var buffer = [];
  useEffect(() => {
    if (priority === "High") {
      setColor("#F6412D");
    } else if (priority === "Low") {
      setColor("#F5E318");
    } else if (priority === "Medium") {
      setColor("#FF9800");
    }
  }, [priority]);

  if (completed === true) {
    buffer.push(<Icon key={id} className="check square icon" />);
  }

  return (
    <GridColumn>
      <Card
        onClick={() => {
          setShow(true);
          setId(id);
        }}
      >
        <Card.Content style={{ backgroundColor: color }}>
          <Card.Header>
            {name} <span> {buffer}</span>
          </Card.Header>

          <Card.Meta>{priority}</Card.Meta>
          <Card.Description>{version}</Card.Description>
        </Card.Content>
      </Card>
    </GridColumn>
  );
}

export default ViewBugsList;
