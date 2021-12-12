import React, { useState, useLayoutEffect } from "react";
import { listBugs } from "./../bugs/api-bugs";
import { Grid } from "semantic-ui-react";
import DasboardList from "./DasboardList";

function Dashboard({ setState }) {
  const [list, setList] = useState([]);

  useLayoutEffect(() => {
    listBugs().then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        setList(data);
      }
    });
  }, []);

  var res = Object.values(
    list.reduce((a, { priority }) => {
      a[priority] = a[priority] || { priority, count: 0 };
      a[priority].count++;
      return a;
    }, Object.create(null))
  );

  return (
    <Grid container rows={3} style={{ height: "-webkit-fill-available" }}>
      {res.map((item, index) => (
        <DasboardList
          priority={item.priority}
          count={item.count}
          key={index}
          setState={setState}
        />
      ))}
    </Grid>
  );
}

export default Dashboard;
