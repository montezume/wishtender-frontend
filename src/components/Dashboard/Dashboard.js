import React, { useEffect, useState } from "react";
import Collapse from "@material-ui/core/Collapse";
import { parsedCookies } from "../../scripts/helpers";

export default function Dashboard() {
  const [users, setUsers] = useState(null);
  const [openOrders, setOpenOrders] = useState(null);
  const [openIds, setOpenIds] = useState(null);
  const [filterActivated, setFilterActivated] = useState(null);
  const [sort, setSort] = useState("date");
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

  const getActivityLevel = (hourlies) => {
    // not really correct. If there are 7 hourly checkins in one day it will say 1/day I think
    hourlies = [...hourlies.map((hour) => new Date(hour), new Date())];
    const milis = hourlies
      .reduce((a, c, i, arr) => {
        if (i === arr.length - 1) {
          return a;
        }
        return [...a, arr[i + 1] - c];
      }, [])
      .reduce(function (avg, value, _, { length }) {
        return avg + value / length;
      }, 0);

    const daily = 86400000;

    const weekly = daily * 7;

    const monthly = daily * 30;

    const biweekly = (daily * 7) / 2;

    const bimonthly = (daily * 30) / 2;

    let activityLevel;

    if (milis <= daily) {
      activityLevel = "daily";
    } else if (milis <= biweekly) {
      activityLevel = "biweekly";
    } else if (milis <= weekly) {
      activityLevel = "weekly";
    } else if (milis <= bimonthly) {
      activityLevel = "bimonthly";
    } else if (milis <= monthly) {
      activityLevel = "monthly";
    } else {
      activityLevel = "less than 1/month";
    }

    return activityLevel;
  };
  const signedUpEmail = (wisher) =>
    `mailto:${
      wisher.email
    }?subject=${wisher.aliases[0]?.aliasName.trim()}+saw+you+created+a+wishlist-+Just+checking+in&body=Hey+${wisher.aliases[0]?.aliasName.trim()}%2C+this+is+Dash%2C+the+founder+of+WishTender.%0D%0A%0D%0AI+saw+you+created+a+wishlist.+Thanks+for+joining.+Let+me+know+if+you+need+anything.%0D%0A%0D%0AIf+you+want+live+help%2C+or+a+walk+through%2C+schedule+a+chat+here%3A++++%3Ca+href%3D%22https%3A%2F%2Fcalendly.com%2Fdashiell%2F20min%22+target%3D%22_blank%22%3E++++++++calendly%0D%0A++++%3C%2Fa%3E%0D%0A%0D%0ADashiell+Rose+Bark-Huss%0D%0AFounder+WishTender%0D%0Amy+twitter%0D%0A%3Ca+href%3D%22https%3A%2F%2Ftwitter.com%2FDashBarkHuss%22+target%3D%22_blank%22%3Emy+twitter%3C%2Fa%3E+`;
  const didntCompleteWishtlist = (wisher) =>
    `mailto:${wisher.email}?subject=Wishlist+setup-+did+something+go+wrong%3F&body=Hey+this+is+Dash%2C+the+founder+of+WishTender.%0D%0A%0D%0AI+saw+you+signed+but+didn%27t+complete+set+up.%0D%0A%0D%0AWas+wondering+what+happened%3F%0D%0A%0D%0AYou+can+reply+with+a+number%3A+%0D%0A1.+Decided+I+wasn%27t+interested%0D%0A2.+Something+went+wrong%0D%0A3.+Too+much+effort%0D%0A%0D%0A%0D%0ADashiell+Rose+Bark-Huss%0D%0AFounder+WishTender%0D%0A%3Ca+href%3D%22https%3A%2F%2Ftwitter.com%2FDashBarkHuss%22+target%3D%22_blank%22%3Emy+twitter%3C%2Fa%3E+`;
  const firstEmailToGifter = (gifter, wisher) =>
    `mailto:${
      gifter.email
    }?subject=${gifter.fromLine.trim()}%2C+saw+you+bought+a+gift&body=Hey+${gifter.fromLine.trim()}%2C+this+is+Dash+the+Founder+of+WishTender.+I+saw+you+bought+a+gift+for+${wisher.aliases[0].aliasName.trim()}.+Thanks+for+using+WishTender.%0D%0A%0D%0AHow+are+you+finding+WishTender+so+far%3F+Did+the+gift+giving+experience+go+ok%3F%0D%0A%0D%0AWe%27re+a+new+company+and+looking+to+improve.+%0D%0A%0D%0ADashiell+Rose+Bark-Huss%0D%0AFounder+WishTender%0D%0A%3Ca+href%3D%22https%3A%2F%2Ftwitter.com%2FDashBarkHuss%22+target%3D%22_blank%22%3Emy+twitter%3C%2Fa%3E+`;
  const firstEmailToWisher = (wisher) =>
    `mailto:${
      wisher.email
    }?subject=${wisher.aliases[0].aliasName.trim()}%2C+saw+you+got+a+gift&body=Hey+${wisher.aliases[0].aliasName.trim()}%2C+this+is+Dash+the+founder+of+WishTender.+I+saw+you+got+a+gift.%0D%0A%0D%0AHow+are+you+finding+WishTender+so+far%3F+Did+the+gift+receiving+experience+go+ok%3F%0D%0A%0D%0AWe%27re+a+new+company+and+looking+to+improve.%0D%0A%0D%0ADashiell+Rose+Bark-Huss%0D%0AFounder+WishTender%0D%0A%3Ca+href%3D%22https%3A%2F%2Ftwitter.com%2FDashBarkHuss%22+target%3D%22_blank%22%3Emy+twitter%3C%2Fa%3E`;
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
      {users && (
        <div>
          <h3>{users && users.length} Users </h3>
          <h3>
            {users && users.reduce((a, c) => c.orders?.length + a || a, 0)}{" "}
            Orders{" "}
            {(() => {
              const orders = users.reduce(
                (a, c) => (c.orders?.length ? [...c.orders, ...a] : a),
                []
              );
              let items = 0;
              orders.forEach((order) => {
                items += Object.keys(order.cart.items).length;
              });
              return `items: ${items}`;
            })()}
            {(() => {
              const orders = users.reduce(
                (a, c) => (c.orders?.length ? [...c.orders, ...a] : a),
                []
              );
              let moneyUSD = 0;
              orders.forEach((order) => {
                if (order.cashFlow.toConnect.from.currency !== "USD")
                  alert(
                    "not adding gift price in usd, error front end line 99 Dashboard.js"
                  );
                moneyUSD += order.cashFlow.toConnect.from.amount;
              });
              return (
                <p>
                  total money in gifts, not including fee: ${moneyUSD} pennies
                </p>
              );
            })()}
            {(() => {
              const orders = users.reduce(
                (a, c) => (c.orders?.length ? [...c.orders, ...a] : a),
                []
              );
              let feesUSD = 0;
              orders.forEach((order) => {
                if (order.cashFlow.toConnect.from.currency !== "USD")
                  alert(
                    "not adding gift price in usd, error front end line 99 Dashboard.js"
                  );
                feesUSD +=
                  order.cashFlow.toPlatform.amount -
                  order.cashFlow.toConnect.from.amount;
              });
              return <p>Gross fees: ${feesUSD} pennies</p>;
            })()}
          </h3>
          <button onClick={() => setOpenOrders(!openOrders)}>
            {openOrders ? "hide" : "show"} orders
          </button>
          <Collapse in={openOrders} timeout="auto" unmountOnExit>
            <p>
              price is in smallest units (pennies if usd){" "}
              <button onClick={() => setSort(!sort)}>
                order by {sort ? "user" : "newest"}
              </button>
            </p>

            {(() => {
              const orders = users.reduce(
                (a, c) => (c.orders?.length ? [...c.orders, ...a] : a),
                []
              );
              return orders
                .sort(
                  sort
                    ? (order, setOrder) =>
                        order.paidOn < setOrder.paidOn ? 1 : -1
                    : () => null
                )
                .map((order) => {
                  let items = Object.keys(order.cart.items);
                  let alias = order.cart.alias.handle;
                  const wisherUser = users.find(
                    (user) => user?.aliases[0]?._id === order.alias
                  );
                  return items.map((id) => {
                    const item = order.cart.items[id].item;
                    return (
                      <div
                        style={{
                          display: "inline-block",
                          border: "1px solid pink",
                          margin: "10px",
                          width: "300px",
                        }}
                      >
                        <p>_id: {order._id}</p>
                        to: <a href={"/" + alias}>{alias}</a>
                        <p>from: {order.buyerInfo.fromLine}</p>
                        <p id={`order-gifter-email-${order._id}`}>
                          {order.buyerInfo.email}
                          <button
                            onClick={() =>
                              copy("order-gifter-email-" + order._id)
                            }
                          >
                            copy gifter
                          </button>
                        </p>
                        <p>
                          <a
                            target="_blank"
                            href={firstEmailToWisher(wisherUser)}
                          >
                            First Email to wisher
                          </a>
                        </p>
                        <p>
                          <a
                            target="_blank"
                            href={firstEmailToGifter(
                              order.buyerInfo,
                              wisherUser
                            )}
                          >
                            First Email to gifter
                          </a>
                        </p>
                        <p id={`order-wisher-email-${order._id}`}>
                          {wisherUser.email}
                          <button
                            onClick={() =>
                              copy("order-wisher-email-" + order._id)
                            }
                          >
                            copy wisher
                          </button>
                        </p>
                        <p>Note from wisher: {order.noteToWisher.message}</p>
                        {order.noteToTender.map((noteToTender) => {
                          return (
                            <>
                              {noteToTender.message && (
                                <p>Note to wisher: {noteToTender.message}</p>
                              )}
                              {noteToTender.imageAttachment && (
                                <img
                                  alt=""
                                  width="50"
                                  src={noteToTender.imageAttachment}
                                ></img>
                              )}
                            </>
                          );
                        })}
                        <p>{item.itemName}</p>
                        <p>
                          price: {item.price}
                          {item.currency}
                        </p>
                        <p>
                          date:{" "}
                          {(() => {
                            const d = new Date(order.paidOn);
                            return `${
                              d.getMonth() + 1
                            }/${d.getDate()}/${d.getFullYear()}`;
                          })()}
                        </p>
                        <img
                          alt=""
                          width="50"
                          height="50"
                          src={item.itemImage}
                        ></img>
                      </div>
                    );
                  });
                });
            })()}
          </Collapse>
          <button onClick={() => setFilterActivated(!filterActivated)}>
            {filterActivated ? "show all" : "show only activated"}
          </button>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "auto auto auto",
              padding: "10px",
            }}
          >
            {users &&
              users
                .sort((a, b) => {
                  return (
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
                  );
                })
                .filter((usr) =>
                  filterActivated ? usr?.stripeAccountInfo?.activated : true
                )
                .map((user) => {
                  return (
                    <div
                      style={{
                        display: "flex",
                        border: "3px solid #2196F3",
                        padding: "10px",
                      }}
                    >
                      <img
                        alt=""
                        width="50"
                        height="50"
                        src={
                          user.aliases[0]?.profileImage ||
                          `${process.env.REACT_APP_BASE_URL}/data/images/profileImages/default_profileimage.png`
                        }
                      ></img>
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <button onClick={() => setOpenIds(!openIds)}>
                          {openIds ? "hide" : "show"} ids
                        </button>
                        <Collapse in={openIds} timeout="auto" unmountOnExit>
                          <div>User ID: {user._id}</div>
                          <br />
                          <div>alias ID: {user?.aliases[0]?._id}</div>
                          <br />
                          <div>
                            stripe info ID: {user?.stripeAccountInfo?._id}
                          </div>
                          <br />
                          <div>
                            stripe account:{" "}
                            {user?.stripeAccountInfo?.stripeAccountId}
                          </div>
                          <br />
                        </Collapse>
                        <div>
                          {(() => {
                            const d = new Date(user.createdAt);
                            return `${
                              d.getMonth() + 1
                            }/${d.getDate()}/${d.getFullYear()}`;
                          })()}
                        </div>
                        <div>
                          {user.wishlists[0]?.wishlistItems?.length ? (
                            <span
                              style={{ color: "#2296f3", fontWeight: "bold" }}
                            >
                              {
                                user.wishlists[0]?.wishlistItems.filter(
                                  (i) => !i.deleted
                                ).length
                              }{" "}
                              Items
                            </span>
                          ) : (
                            "No items"
                          )}
                        </div>
                        <div>
                          {user.stripeAccountInfo?.activated ? (
                            <span
                              style={{ color: "limegreen", fontWeight: "bold" }}
                            >
                              Activated
                            </span>
                          ) : (
                            "Not Activated"
                          )}
                        </div>
                        <div
                          style={{ display: "flex", alignItems: "baseline" }}
                        >
                          <div
                            style={{ fontSize: ".8em" }}
                            id={"email" + user._id}
                          >
                            {user.email}{" "}
                          </div>
                          <button onClick={() => copy("email" + user._id)}>
                            copy
                          </button>
                        </div>
                        <div>orders: {user.orders?.length}</div>{" "}
                        <div>
                          last hour active:{" "}
                          {(() => {
                            if (user.userActivity?.hourly) {
                              const d = new Date(
                                user.userActivity.hourly[
                                  user.userActivity.hourly.length - 1
                                ]
                              );
                              return `${
                                d.getMonth() + 1
                              }/${d.getDate()}/${d.getFullYear()} ${d.getHours()} TZ:+${
                                d.getTimezoneOffset() / 60
                              }`;
                            }
                            return "No info";
                          })()}
                        </div>
                        <div>
                          signup date:{" "}
                          {(() => {
                            if (user.createdAt) {
                              const d = new Date(user.createdAt);
                              return `${
                                d.getMonth() + 1
                              }/${d.getDate()}/${d.getFullYear()} ${d.getHours()} TZ:+${
                                d.getTimezoneOffset() / 60
                              }`;
                            }
                            return "No info";
                          })()}
                        </div>
                        <div>
                          {user.aliases.length && (
                            <a href={"/" + user.aliases[0].handle}>
                              {user.aliases[0].handle}
                            </a>
                          )}
                        </div>
                        <p>
                          <a target="_blank" href={signedUpEmail(user)}>
                            Signup email
                          </a>
                        </p>
                        <p>
                          <a
                            target="_blank"
                            href={didntCompleteWishtlist(user)}
                          >
                            Didn't complete signup email
                          </a>
                        </p>
                      </div>
                    </div>
                  );
                })}
          </div>
        </div>
      )}
    </>
  );
}
