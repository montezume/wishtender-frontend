import React from "react";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import { withRouter } from "react-router";

export default withRouter(function CommunityNoticePage(props) {
  // same as data base except can have {" "} and other react specific diffs
  const noticeHTMLSameAsDatabase = (
    <>
      <h1>Important Community Notice </h1>
      <h5>Updated June 3rd 2022</h5>
      <h2>
        To successfully use WishTender without getting your account terminated
        by our payment processor, please take note of current wishlist item
        guidelines.
      </h2>
      <br />
      <h3>Prohibited</h3>
      <ul>
        <li>
          <h4>Items that are neither gifts nor tips:</h4>
          <ul>
            <li>
              <b>Selling any services or goods on your wishlist</b> is
              prohibited.
            </li>

            <li>
              <b>
                Gift item names or descriptions that promise a good or service
                in exchange for the gift
              </b>{" "}
              are prohibited.
            </li>

            <li>
              <b>
                Wishlist item names that don't make sense in a sentence about
                gifting or tipping
              </b>{" "}
              are prohibited.
              <br />
              <br />
              <h3 style={{ color: "#376da2" }}>
                Items <u>should</u> fit in a sentence about gifting or tipping
                such as "Sam bought a ____ for Dash."{" "}
              </h3>
              <h5>Good Item Names</h5>
              <ul>
                <li>
                  <b>Rent</b>: Sam paid for Dash's rent. ✅
                </li>
                <li>
                  <b>Funds for self care</b>: Sam funded Dash's self care. ✅
                </li>
                <li>
                  <b>Nike</b>: Sam bought Nikes for Dash. ✅
                </li>
                <li>
                  <b>Treat me to a spa day because I deserve it</b>: Sam treated
                  Dash to a spa day because she deserved it. ✅
                </li>
                <li>
                  <b>$300 tip</b>: Sam tipped Dash $300. ✅
                </li>
                <li>
                  <b>Initial tip</b>: Sam tipped Dash an initial tip. ✅
                </li>
              </ul>
              <h5>Bad Item Names</h5>
              <ul>
                <li>
                  <b>Worship</b>: Sam paid for Dash's worship. ❌ unclear how
                  this is a gift
                </li>
                <li>
                  <b>Debt Contract</b>: Sam bought a debt contract for Dash. ❌
                  unclear how this is a gift
                </li>
                <li>
                  <b>💦💦💦</b>: Sam funded 💦💦💦 it for Dash. ❌ unclear how
                  this is a gift
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li>
          <h4>Nudity Or Implied Nudity:</h4>
          <ul>
            <li>
              <b>
                Gifts, or profile images, that have nudity or implied nudity in
                the image
              </b>{" "}
              are prohibited.
            </li>
            <p>
              Implied nudity means a naked peron without nipples or genitalia
              exposed in the photograph. For example, a naked person whose
              genitals are covered by pixels or emojis is not allowed.
            </p>
            <p>Wearing lingerie, a robe, or towel is allowed.</p>
          </ul>
        </li>
        <li>
          <h3>Prohibited Items and Words:</h3>

          <ul>
            <li>
              <b>Weed/drug related funds</b>
              <p>
                <em> Can I list "herbs"? </em>
                Yes.
              </p>
            </li>
            <li>
              <b>Weapons</b>
              <p>
                <em>
                  Can I list "Cosplay funds" or "Funds for military antiques
                  collection"?{" "}
                </em>
                Yes.
              </p>
            </li>
            <li>
              <b>Sex toys</b>
            </li>
            <p>
              <em> Can I list "body massaging tools"? </em>
              Yes.
            </p>

            <li>
              <b>Items with the word "tribute"</b>
              <p>
                <em> Can I use the word "appreciation tip" or "tip"? </em>
                Yes.
              </p>
            </li>

            <li>
              <b>
                Items with the word “tax”, “fee”, "session", "deposit", "game",
                "unblock"
              </b>
              <p>
                <em> Why not? </em>
                These imply a service might be exchanged. In certain contexts
                these words are ok, like "video games".
              </p>
            </li>
          </ul>
        </li>
      </ul>

      <h3>WishTender Cares</h3>

      <p>
        Our goal at WishTender is to empower all users to confidently use our
        platform no matter their outside interests or professions. In order to
        do that, we're doing our best to provide accurate guidance on how to use
        our platform successfully. These measures keep our fees low for everyone
        and enable you to be in good standing with our current payment
        processor. Some of our rules our stricter than our payment processor in
        order to stay ahead of any issues.
      </p>
      <p>
        Our priority is to serve our community. Let us know if you feel any of
        these rules are not ideal so we can understand how to make WishTender
        better.
      </p>
    </>
  );
  return (
    <>
      <div
        style={{
          height: "100%",
          width: "100%",
          maxWidth: "1000px",
          margin: "auto",
          alignItems: "center",
          justifyContent: "center",
          padding: "7vw 5vw",
          flexDirection: "column",
        }}
      >
        <PriorityHighIcon
          style={{ color: "#ecb700", fontSize: "4em" }}
        ></PriorityHighIcon>
        {noticeHTMLSameAsDatabase}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "1em",

            paddingBottom: "10em",
          }}
        ></div>
      </div>
    </>
  );
});
