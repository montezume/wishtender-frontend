import React, { useEffect, useState } from "react";
import Collapse from "@material-ui/core/Collapse";

export default function Dashboard() {
  const [users, setUsers] = useState(null);
  const [activity, setActivity] = useState({});

  useEffect(() => {
    (async () => {
      await fetch(`${process.env.REACT_APP_BASE_URL}/api/users`, {
        credentials: "include",
      })
        .then(async (res) => {
          const json = await res.json();
          setUsers(json);
        })
        .catch((err) => {});
    })();
  }, []);

  useEffect(() => {
    if (users) {
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

      const latest = users.map((user) => {
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
      const activitiesCopy = activity;
      activitiesCopy.activeLastHour = activeLastHour;
      setActivity(activitiesCopy);
    }
  }, [activity, users]);

  const signedUpEmail = (wisher) =>
    `mailto:${
      wisher.email
    }?subject=${wisher.aliases[0]?.aliasName.trim()}+saw+you+created+a+wishlist-+Just+checking+in&body=Hey+${wisher.aliases[0]?.aliasName.trim()}%2C+this+is+Dash%2C+the+founder+of+WishTender.%0D%0A%0D%0AI+saw+you+created+a+wishlist.+Thanks+for+joining.+Let+me+know+if+you+need+anything.%0D%0A%0D%0AIf+you+want+live+help%2C+or+a+walk+through%2C+schedule+a+chat+here%3A++++%3Ca+href%3D%22https%3A%2F%2Fcalendly.com%2Fdashiell%2F20min%22+target%3D%22_blank%22%3E++++++++calendly%0D%0A++++%3C%2Fa%3E%0D%0A%0D%0ADashiell+Rose+Bark-Huss%0D%0AFounder+WishTender%0D%0Amy+twitter%0D%0A%3Ca+href%3D%22https%3A%2F%2Ftwitter.com%2FDashBarkHuss%22+target%3D%22_blank%22%3Emy+twitter%3C%2Fa%3E+`;
  const copy = (id) => {
    var r = document.createRange();
    r.selectNode(document.getElementById(id));
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(r);
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
  };

  return (
    <>
      {users && activity && (
        <div>
          {activity.activeLastHour.length} user{activity.activeLastHour.length}{" "}
          active in the last hour
        </div>
      )}
    </>
  );
}
