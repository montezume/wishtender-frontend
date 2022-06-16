import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";

export default function SuspiciousUsers() {
  const [users, setUsers] = useState(null);

  // pagination suspicious users
  const [pageSuspiciousNext, setPageSuspiciousNext] = useState(1);
  const [pageSuspiciousGoNext, setPageSuspiciousGoNext] = useState(true);

  const [filterActivated, setFilterActivated] = useState(null);

  useEffect(() => {
    (async () => {
      if (!setPageSuspiciousNext) return;
      await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/users?suspicious=true&page=${pageSuspiciousNext}&limit=15`,
        {
          credentials: "include",
        }
      )
        .then(async (res) => {
          const json = await res.json();
          if (!users) {
            setUsers(json.result);
          } else {
            setUsers([...users, ...json.result]);
          }
          setPageSuspiciousNext(json.next.page);
          setPageSuspiciousGoNext(false);
        })
        .catch((err) => {
          console.log(err);
        });
    })();
  }, [pageSuspiciousGoNext]);

  const verifyEmail = (user) =>
    `mailto:${
      user.email
    }?subject=${user.name.trim()}+your+account+has+been+paused&body=Your%20account%20has%20been%20temporarily%20paused.%20Please%20provide%20a%20a%20link%20to%20a%20social%20media%20that%20we%20can%20verify%20you%20at.`;

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
          <h3>{users && users.length} suspicious users loaded</h3>

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
              users.map((user) => {
                return (
                  <div
                    style={{
                      display: "flex",
                      border: "3px solid #2196F3",
                      padding: "10px",
                    }}
                  >
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <h2>
                        {user.handle && (
                          <a target="_blank" href={"/" + user.handle}>
                            {user.handle}
                          </a>
                        )}
                      </h2>
                      <div>
                        <a
                          target="_blank"
                          href={`https://dashboard.stripe.com/connect/accounts/${user.stripeAccountId}`}
                        >
                          Stripe Account
                        </a>
                      </div>
                      <div>
                        {" "}
                        Signed up:{" "}
                        {(() => {
                          const d = new Date(user.signupDate);
                          return `${
                            d.getMonth() + 1
                          }/${d.getDate()}/${d.getFullYear()}`;
                        })()}
                      </div>
                      <div style={{ display: "flex", alignItems: "baseline" }}>
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

                      <p>
                        <a
                          target="_blank"
                          href={`https://twitter.com/search?lang=en&q=wishtender.com%2F${user.handle}&src=typed_query`}
                        >
                          find on twiiter
                        </a>
                        <div>
                          <a target="_blank" href={verifyEmail(user)}>
                            open verify email template
                          </a>
                        </div>
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
          <Button
            onClick={() => {
              if (pageSuspiciousGoNext) return;
              setPageSuspiciousGoNext(true);
            }}
          >
            Load More Users
          </Button>
        </div>
      )}
    </>
  );
}
