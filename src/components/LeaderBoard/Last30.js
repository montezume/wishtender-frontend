import React, { useEffect, useState } from "react";
import UserTable from "./UserTable";

const getLastStartEnd = (days) => {
  let end = new Date();
  end.setHours(0);
  end.setMinutes(0);
  end.setSeconds(0);
  end.setMilliseconds(0);
  end.setDate(end.getDate() + 1);
  const start = new Date(end.getTime() - days * 24 * 60 * 60 * 1000).getTime();
  end = end.getTime();
  return { start, end };
};

export default function Last30({ limit, link }) {
  const [users, setUsers] = useState();

  useEffect(() => {
    const month = getLastStartEnd(30);
    fetch(
      `${process.env.REACT_APP_BASE_URL}/api/orders/mostProfitableUsers?start=${month.start}&end=${month.end}`,
      { credentials: "include" }
    ).then(async (res) => {
      const data = await res.json();
      setUsers(data);
    });
  }, []);
  return (
    <>
      {users && (
        <UserTable
          limit={limit}
          showPercent={true}
          link={link}
          users={users}
          title={"Last 30 Days "}
        ></UserTable>
      )}
    </>
  );
}
