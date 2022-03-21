import React, { useEffect, useState } from "react";
import Collapse from "@mui/material/Collapse";

import MostActiveTable from "./MostActiveTable";
import { Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
// import tstData from "./testData";
const tstData = [];

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
}));
export default function Dashboard() {
  const testData = tstData;
  const [users, setUsers] = useState(null);
  const classes = useStyles();
  const [activity, setActivity] = useState({});
  // const [activity2, setActivity2] = useState({});

  // useEffect(() => {
  //   (async () => {
  //     await fetch(`${process.env.REACT_APP_BASE_URL}/api/users`, {
  //       credentials: "include",
  //     })
  //       .then(async (res) => {
  //         const json = await res.json();
  //         setUsers(json);
  //       })
  //       .catch((err) => {});
  //   })();
  // }, []);
  useEffect(() => {
    (async () => {
      await fetch(`${process.env.REACT_APP_BASE_URL}/api/users`, {
        credentials: "include",
      })
        .then(async (res) => {
          const json = await res.json();
          // setUsers(testData);
          setUsers(json);
        })
        .catch((err) => {});
    })();
  }, []);

  useEffect(() => {
    if (users && !activity.recentlyActive) {
      const beginningOfDay = (day) => {
        const date = new Date(Date.now() - day * 24 * 3600 * 1000);
        date.setHours(0, 0, 0, 0);
        return date;
      };
      const timeWasOnDaysAgo = (time, daysAgo) => {
        const endTime = beginningOfDay(daysAgo - 1);
        const startTime = beginningOfDay(daysAgo);
        return time < endTime && time > startTime;
      };
      const getDailyCheckInPast = (checkins, days) => {
        const dailyCheckPastWeek = [];
        let i = 0;
        while (i < days) {
          const checkIn = checkins.find((check) => timeWasOnDaysAgo(check, i));
          dailyCheckPastWeek.push(checkIn || null);
          i++;
        }
        return dailyCheckPastWeek;
      };
      const getWeeklyCheckInPast = (checkIns, weeks) => {
        const weeklyCheckPastWeek = [];
        let i = 0;
        while (i < weeks) {
          const checkIn = checkIns.find((checkIn) =>
            timeWasOnDaysAgo(checkIn, i)
          );
          weeklyCheckPastWeek.push(checkIn || null);
          i++;
        }
        return weeklyCheckPastWeek;
      };
      const userCopy = [...users];

      const latest = userCopy.map((user) => {
        let lastActivity;
        let last7;
        let last31;

        try {
          let hourly = user.userActivity.hourly;
          hourly = hourly.map((h) => new Date(h));
          lastActivity = hourly[hourly.length - 1];
          const dailyCheckins = getDailyCheckInPast(hourly, 31);
          last31 = dailyCheckins.filter((ci) => ci);
          last7 = dailyCheckins.slice(0, 7).filter((ci) => ci);
        } catch (err) {}
        return {
          user,
          lastActivity,
          last7,
          last31,
          // timestamp,
          // chicagoTime: date ? date.toLocaleString('en-US', { timeZone: 'America/Chicago' }) : null, // already my time zone
        };
      });

      const recentlyActive = latest
        .filter((p) => p.lastActivity !== undefined)
        .sort((a, b) => b.lastActivity - a.lastActivity)
        .filter((user) => user.lastActivity);
      const mostDailyCheckinsPastWeek = latest
        .filter((a) => a.last7 && a.last7.length)
        .sort((a, b) => b.last7.length - a.last7.length);
      const mostDailyCheckinsPastMonth = latest
        .filter((a) => a.last31 && a.last31.length)
        .sort((a, b) => b.last31.length - a.last31.length);
      //  recentlyActive[9].user.userActivity.hourly.find(h=>h < Date.now() - 2*24 * 3600 * 1000 &&  h > Date.now() - 3*24 * 3600 * 1000)
      const activeLastHour = recentlyActive.filter(
        (u) => u.lastActivity > Date.now() - 1 * 3600 * 1000
      );
      const activitiesCopy = { ...activity };
      activitiesCopy.updated = true;
      activitiesCopy.activeLastHour = activeLastHour;
      activitiesCopy.recentlyActive = recentlyActive.slice(0, 20);
      activitiesCopy.mostDailyCheckins = {
        pastWeek: {
          top: mostDailyCheckinsPastWeek.slice(0, 20),

          total: mostDailyCheckinsPastWeek.length,
        },
        pastMonth: {
          top: mostDailyCheckinsPastMonth.slice(0, 20),
          total: mostDailyCheckinsPastMonth.length,
        },
      };

      setActivity(activitiesCopy);
    }
  }, [activity, users]);

  return (
    <>
      {activity && activity.recentlyActive && (
        <>
          <Paper className={classes.paper}>
            <MostActiveTable
              title="Last Hour"
              userActivity={activity.activeLastHour}
            ></MostActiveTable>
          </Paper>
          <MostActiveTable
            title="Most Recent"
            userActivity={activity.recentlyActive}
          ></MostActiveTable>
          <MostActiveTable
            title="Most Daily Checkins Past Week"
            userActivity={activity.mostDailyCheckins.pastWeek.top.slice(0, 20)}
          ></MostActiveTable>
          <MostActiveTable
            title="Most Daily Checkins Past Month"
            userActivity={activity.mostDailyCheckins.pastMonth.top.slice(0, 20)}
          ></MostActiveTable>

          <div> {activity.mostDailyCheckins.pastWeek.total} past week</div>
          <div> {activity.mostDailyCheckins.pastMonth.total} past month</div>
        </>
      )}
    </>
  );
}
