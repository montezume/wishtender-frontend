import React, { useEffect, useState } from "react";
import UserTable from "./UserTable";

const getMonthStartEnd = () => {
  const date = new Date();
  const start = new Date(date.getFullYear(), date.getMonth(), 1).getTime();
  const end = new Date(date.getFullYear(), date.getMonth() + 1).getTime();
  return { start, end };
};
export default function CurrentMonth({ limit, link }) {
  const [users, setUsers] = useState();
  var month = new Array(12);
  month[0] = "January";
  month[1] = "February";
  month[2] = "March";
  month[3] = "April";
  month[4] = "May";
  month[5] = "June";
  month[6] = "July";
  month[7] = "August";
  month[8] = "September";
  month[9] = "October";
  month[10] = "November";
  month[11] = "December";
  useEffect(() => {
    const month = getMonthStartEnd();
    fetch(
      `${process.env.REACT_APP_BASE_URL}/api/orders/mostProfitableUsers?start=${month.start}&end=${month.end}&limit=${limit}`,
      { credentials: "include" }
    ).then(async (res) => {
      const data = await res.json();
      setUsers(data);
    });
  }, []);

  return (
    <UserTable
      isLoading={!users}
      link={link}
      limit={limit}
      users={users}
      showPercent={true}
      title={"Month of " + month[new Date().getMonth()]}
    />
  );
}
