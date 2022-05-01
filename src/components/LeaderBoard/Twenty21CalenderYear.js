import React, { useEffect, useState } from "react";
import UserTable from "./UserTable";

const getYearStartEnd = (year) => {
  const start = new Date(year, 0, 1).getTime();
  const end = new Date(year + 1, 0, 1).getTime();
  return { start, end };
};
export default function Twenty21CalenderYear({ limit, link }) {
  const [users, setUsers] = useState();
  useEffect(() => {
    const year = getYearStartEnd(2021);
    fetch(
      `${process.env.REACT_APP_BASE_URL}/api/orders/mostProfitableUsers?start=${year.start}&end=${year.end}&limit=${limit}`,
      { credentials: "include" }
    ).then(async (res) => {
      const data = await res.json();
      setUsers(data);
    });
  }, []);
  return (
    <>
      {users ? (
        <UserTable
          limit={limit}
          users={users}
          title={"2021"}
          link={link}
        ></UserTable>
      ) : (
        "loading..."
      )}
    </>
  );
}
