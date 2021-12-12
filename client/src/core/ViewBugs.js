import React, { useState, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import { listBugs } from "./../bugs/api-bugs";
import ViewBugsList from "./ViewBugsList";
import SingleBug from "./SingleBug";

function ViewBugs() {
  const [list, setList] = useState([]);
  const [show, setShow] = useState(false);
  const [id, setId] = useState(null);

  useEffect(() => {
    listBugs().then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        setList(data);
      }
    });
  }, []);

  return (
    <Grid columns={3} stackable>
      {list.map((item, index) => (
        <ViewBugsList
          setId={setId}
          setShow={setShow}
          id={item._id}
          key={index}
          name={item.name}
          version={item.version}
          priority={item.priority}
          completed={item.completed}
        />
      ))}
      <SingleBug show={show} setShow={setShow} id={id} />
    </Grid>
  );
}

export default ViewBugs;
