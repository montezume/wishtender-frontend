import React, { useState, useEffect } from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import { Container, Link, makeStyles, Typography } from "@material-ui/core";
import { matches } from "lodash";
const useStyles = makeStyles((theme) => {
  const highlightQuestion = { borderLeftColor: "#A5D8FF", color: "#007FFF" };
  return {
    root: {
      "& .MuiContainer-root": {
        paddingBottom: "100px",
        paddingTop: "50px",
      },
      display: "flex",

      width: "100%",
      "& h1": {
        fontSize: "2.5rem",
      },
      "& nav": {
        padding: "16px 32px 16px 0px",
        display: "none",
        height: "calc(100vh - 70px)",
        overflowY: "auto",
        position: "sticky",
        top: "72px",
        "&  .MuiTypography-body1": { color: "#aab4be" },
        "& a": {
          fontWeight: "600",
          color: "#20262D",
          borderLeft: "4px solid transparent",
          display: "inline-flex",
          padding: "0px 8px 0px 10px",
          margin: "4px 0px 8px 0px",
          "&.selectedQuestion": highlightQuestion,

          "&:hover": highlightQuestion,
        },
        "& li": {
          listStyle: "none",
        },
        width: "260px",
      },
      "& h2": {
        "& span": {
          marginTop: "-72px" /* Size of fixed header */,
          paddingBottom: "72px",
          display: "block",
        },
        fontSize: "1.875rem",
        margin: "40px 0px 10px",
      },
      "& .description": {
        marginBottom: "40px",
        fontSize: "1.5rem",
      },
      "& p": {
        marginBottom: "1em",
        fontSize: "1.3em",
        lineHeight: "1.5rem",
      },
      "& ul": {
        fontSize: "1.1em",
        lineHeight: "1.5rem",
      },
    },
  };
});

export default function FAQ(props) {
  const classes = useStyles(props);
  const matches = useMediaQuery("(min-width:600px)");

  const [selectedQuestion, setSelectedQuestion] = useState();

  const Nav = [...document.querySelectorAll("main h2")].map((header) => {
    const headerAnchor = header.innerText.split(" ").join("-");
    return (
      <li>
        <Link
          className={
            selectedQuestion === headerAnchor ? "selectedQuestion" : ""
          }
          underline="none"
          onClick={() => setSelectedQuestion(headerAnchor)}
          href={`#${headerAnchor}`}
        >
          {header.innerText}
        </Link>
      </li>
    );
  });

  [...document.querySelectorAll("main h2")].forEach((header) => {
    // set id
    header.id = header.innerText.split(" ").join("-");
    // set span for correct anchor positioning
    header.innerHTML = `<span></span>${header.innerText}`;
  });

  useEffect(() => {
    const loadedPathQuestion = window.location.hash.length
      ? window.location.hash.slice(1)
      : null;
    if (loadedPathQuestion) setSelectedQuestion(loadedPathQuestion);
  }, []);

  useEffect(() => {
    const manageSelectedQuestion = window.addEventListener("scroll", () => {
      const questions = [...document.querySelectorAll("main h2")];
      for (let i = 0; i < questions.length; i++) {
        const isLastQuestion = i === questions.length - 1;
        const scrollTopBelowThisQuestion =
          window.pageYOffset >= questions[i].offsetTop - 20;
        const scrollTopAboveNextQuestion = isLastQuestion
          ? null
          : window.pageYOffset < questions[i + 1].offsetTop - 20;
        const selectedQuestionIsCurrentQuestion =
          selectedQuestion === questions[i].id;

        if (
          isLastQuestion &&
          scrollTopBelowThisQuestion &&
          !selectedQuestionIsCurrentQuestion
        ) {
          setSelectedQuestion(questions[i].id);
          break;
        }
        if (
          !isLastQuestion &&
          scrollTopBelowThisQuestion &&
          scrollTopAboveNextQuestion &&
          !selectedQuestionIsCurrentQuestion
        ) {
          setSelectedQuestion(questions[i].id);
          break;
        }
      }
    });

    return () => {
      window.removeEventListener("scroll", manageSelectedQuestion);
    };
  }, [selectedQuestion]);

  return (
    <main className={classes.root}>
      <Container>
        <h1>Frequently Asked Questions</h1>
        <Typography className={"description"}>
          Stuck on a particular problem? Check some of these common gotchas
          first in the FAQ.
        </Typography>
        <Typography>
          If you still can't find what you're looking for, you can use the
          support chat box or reach out to support@wishtender.com.
        </Typography>
        <h2>WishTender is awesome. How can I support the project?</h2>
        <Typography>There are many ways to support WishTender:</Typography>
        <ul>
          <li>
            <strong>Spread the word.</strong> Evangelize WishTender by linking
            your wishtender.com/ wishlist link on your website, every backlink
            matters. Follow us on Twitter, Instagram, or TikTok. Like and
            retweet the important news. Or just talk about us with your friends.
          </li>
          <li>
            <strong>Give us feedback.</strong> Tell us what we're doing well or
            where we can improve. You can{" "}
            <a href="https://calendly.com/dashiell/20min">book a chat</a> to
            give us feedback, or let us interview you about your current or past
            experiences with wishlists.
          </li>
          <li>
            <strong>Send us a testimony.</strong> We're collecting testimonies
            to help build trust. Send a testimony to support@wishtender.com or
            in the support chat box.
          </li>
          <li>
            <strong>Review us on TrustPilot.</strong> To help build trust,{" "}
            <a href="https://www.trustpilot.com/review/www.wishtender.com">
              review us
            </a>
            .
          </li>
        </ul>
        <h2>How do I get help with setting up my account?</h2>
        <Typography>
          You can reach out to us at support@wishtender.com or through our chat
          tool on the site. If you want to talk to a live person on audio or
          video, <a href="https://calendly.com/dashiell/20min">book a chat</a>{" "}
          or request an instant audio chat through the chat support.
        </Typography>
        <h2>In what countries does WishTender work?</h2>
        <Typography>
          <strong>Wishlist owners</strong> can create a wishlist with a bank
          account/debit card in these <strong>countries</strong>:
        </Typography>{" "}
        <ul>
          <li>Australia</li>
          <li>Austria</li>
          <li>Belgium</li>
          <li>Bulgaria</li>
          <li>Canada</li>
          <li>Cyprus</li>
          <li>Czechia</li>
          <li>Denmark</li>
          <li>Estonia</li>
          <li>Finland</li>
          <li>France</li>
          <li>Germany</li>
          <li>Greece</li>
          <li>Hong Kong SAR China</li>
          <li>Ireland</li>
          <li>Italy</li>
          <li>Latvia</li>
          <li>Lithuania</li>
          <li>Luxembourg</li>
          <li>Malta</li>
          <li>Netherlands</li>
          <li>New Zealand</li>
          <li>Norway</li>
          <li>Poland</li>
          <li>Portugal</li>
          <li>Romania,Singapore</li>
          <li>Slovakia</li>
          <li>Slovenia</li>
          <li>Spain</li>
          <li>Sweden</li>
          <li>Switzerland</li>
          <li>United Kingdom</li>
          <li>United States</li>
        </ul>{" "}
        <Typography>
          <strong>Gift-givers</strong> can convert wishlists to any of these{" "}
          <strong>currencies</strong> in order to pay in their currency of
          choice:{" "}
        </Typography>
        <ul>
          <li>United States dollar</li>
          <li>Australian dollar</li> <li>Brazilian real</li>{" "}
          <li>Bulgarian lev</li>
          <li>Canadian dollar</li> <li>Chinese yuan</li> <li>Croatian kuna</li>
          <li>Czech koruna</li>
          <li>Danish krone</li>
          <li>Euro</li>
          <li>Hungarian forint</li>
          <li>Hong Kong dollar</li>
          <li>Icelandic króna</li>
          <li>Indian rupee</li>
          <li>Israeli new shekel</li>
          <li>Indonesian rupiah</li>
          <li>Japanese yen</li>
          <li>Malaysian ringgit</li>
          <li>Mexican peso</li>
          <li>New Zealand dollar</li>
          <li>Norwegian krone</li>
          <li>Polish złoty</li>
          <li>Philippine peso</li>
          <li>Pound sterling</li>
          <li>Russian rouble</li>
          <li>Romanian new leu</li>
          <li>Swedish krona/kronor</li>
          <li>South Korean won</li>
          <li>South African rand</li>
          <li>Singapore dollar</li>
          <li>Swiss franc</li>
          <li>Turkish lira</li>
          <li>Thai baht</li>
        </ul>
        <h2>Why are the countries different for wishers and gifters?</h2>
        <Typography>
          {" "}
          Our payment processor can accept money from many currencies, but can
          only pay out money to a limited amount of countries.
        </Typography>
        <h2>Will you add more countries?</h2>
        <Typography>
          Yes. Our payment processor is accommodating more countries and
          currencies overtime. Let us know what countries you are interested in
          and we’ll see if it can be accommodated.
        </Typography>
        <h2>How much of the money for the gift do I get?</h2>
        <Typography>
          You get the amount you listed. If there's a currency conversion then
          you may get MORE or LESS than you listed because of discrepancies
          between exchange rates. It shouldn't be too much of a difference, but
          if it is let us know.
        </Typography>
        <h2>How do you make money if it’s 100% payout?</h2>
        <Typography>
          We charge the gifter a 10% fee on top of the gift price. Wishers
          receive the price they listed, unless there's a currency conversion.
        </Typography>
        <h2>How long does it take to get my gift funds?</h2>
        <Typography>
          The <strong>first gift</strong> you receive on WishTender takes 7-14
          days to payout because of our payment processor's security protocol.
          However, users have pleasantly reported that the first payout can be
          as fast as 2 days.{" "}
        </Typography>{" "}
        <Typography>
          For every gift after the first gift, you will receive the funds on the
          next payout day. Payout days occur every{" "}
          <strong>two business days</strong>.
        </Typography>
        <h2>How can I trust WishTender?</h2>
        <Typography>
          We are a very new company, but can connect you with users who have
          received gifts using WishTender. Unlike many sites in the industry
          that are built by anonymous founders, WishTender is openly being built
          by{" "}
          <a href="https://twitter.com/DashBarkHuss">
            {" "}
            Dashiell Rose Bark-Huss
          </a>
          , a former nude model turned software developer. We are putting our
          reputation on line to keep ourselves accountable to delivering a solid
          product.
        </Typography>
        <h2>How is sex work friendly if it uses Stripe?</h2>
        <Typography>
          Stripe allows our users to get gifts from clients no matter what
          industry they are in since you are getting gifts and not selling
          content on the site.
        </Typography>
        <h2>What fees do you charge?</h2>
        <Typography>
          We charge 10% to the gift purchaser. There are no fees for the
          wishlist owner.
        </Typography>
        <h2>Do you allow refunds?</h2>
        <Typography>
          In order to keep you safe from return scams, WishTender does not allow
          refunds, except in specific cases, such as if the fan purchased the
          wrong item and in which the wisher agrees to the refund.
        </Typography>
        <h2>What of my information is visible?</h2>
        <Typography>
          If you're a wisher, gifters can only see what's on your wishlist. They
          cannot see your real name or any payment information.
        </Typography>
        <Typography>
          If you're a gifter, wishers can only see your gift message and the
          name you leave on the gift message. They cannot see your payment
          information, real name, or email.
        </Typography>
        <h2>How do gifts that I purchased show up on my credit card bill?</h2>
        <Typography>
          They will show up as WishTender LLC. You will <strong>not</strong> see
          the specific wisher's wishlist on your credit card bill.
        </Typography>
      </Container>
      <nav style={matches ? { display: "block" } : {}}>
        <Typography variant="body1" gutterBottom="true">
          Contents
        </Typography>
        {Nav}
      </nav>
    </main>
  );
}
