import React, { useState } from "react";
import Tabs from "@material-ui/core/Tabs";
import TabPanel from "../common/TabPanel";
import Tab from "@material-ui/core/Tab";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => {
  return {
    how_it_works: {
      margin: "60px auto",
    },
    instruction_card: {
      marginTop: theme.spacing(5),
    },
    instruction_card_content: {
      display: "flex",
      flexFlow: "row wrap",
    },
    instruction_card_text: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
      flex: "0 0 60%",
    },
    instruction_card_image_container: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
      flex: "0 0 40%",
    },
    instruction_card_image: {
      width: "100%",
    },
  };
});
const InstructionCard = ({ classes, step, body, imageSrc }) => (
  <Card className={classes.instruction_card}>
    <CardContent className={classes.instruction_card_content}>
      <div className={classes.instruction_card_text}>
        <Typography variant="h5" style={{ marginBottom: "10px" }}>
          {step}{" "}
        </Typography>
        <Typography variant="body1">{body}</Typography>
      </div>
      <div className={classes.instruction_card_image_container}>
        <img
          src={imageSrc}
          className={classes.instruction_card_image}
          alt="icon"
        />
      </div>
    </CardContent>
  </Card>
);
export default function HowItWorks(props) {
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = useState(
    props?.location?.state?.userType || "wishers"
  );
  return (
    <Container maxWidth="md" className={classes.how_it_works}>
      <Tabs
        style={{ borderBottom: "1px solid lightgrey" }}
        centered
        onChange={(e, newValue) => {
          setSelectedTab(newValue);
        }}
        value={selectedTab}
        aria-label="basic tabs example"
      >
        <Tab value={"wishers"} label="For Wishers" />
        <Tab value={"gifters"} label="For Gifters" />
      </Tabs>
      <TabPanel selectedTab={selectedTab} tab="wishers">
        <InstructionCard
          classes={classes}
          step="Step 1: Create Your Wishlist"
          body="Add items from any online store or manually add offline wishes. With our custom gift entry, you can get creative. List full outfits, trips to the spa, shopping sprees, and more."
          imageSrc="images/wishlist.png"
        />
        <InstructionCard
          classes={classes}
          step="Step 2: Set up your payments"
          body="Using our secure established third party payment processor, set up your payments. This
        information is never seen by your gifter."
          imageSrc="images/payments.png"
        />
        <InstructionCard
          classes={classes}
          step="Step 3: Add your link to your Twitter/Linktree/Other"
          body="Share you wishlist link with your fans. When a fan purchase an
          item you get the cash to purchase the item. You can send a picture
          'thank you' note within the app."
          imageSrc="images/link.png"
        />
      </TabPanel>
      <TabPanel selectedTab={selectedTab} tab="gifters">
        <InstructionCard
          classes={classes}
          step="Step 1: Visit A Wishlist"
          body="Browse your favorite creator's wishes on their wishlist. From items, to outing, to treats, you can see everything your creator wishes for and add them to your gift basket."
          imageSrc="images/wishlist.png"
        />
        <InstructionCard
          classes={classes}
          step="Step 2: Create a Gift Basket"
          body="Pick one or more items to add to your gift basket"
          imageSrc="images/basket.png"
        />
        <InstructionCard
          classes={classes}
          step="Step 2: Leave a message"
          body="You can choose to leave a message and a pseudonym. Your email will be kept hidden, but we will relay any picture messages from your fan to this email."
          imageSrc="images/message.png"
        />
        <InstructionCard
          classes={classes}
          step="Step 3: Fund the Gift Basket"
          body="Finish by checking out with our secure and established third party payment processor. All your private information will remain hidden from your wisher."
          imageSrc="images/secure.png"
        />
      </TabPanel>
    </Container>
  );
}
