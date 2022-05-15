const styles = (theme) => ({
  animatedBounce: {
    animationName: "$bounce",
    animationTimingFunction: "cubic-bezier(0.280, 0.840, 0.420, 1)",
    animationDuration: "2s",
    animationIterationCount: "2",
  },
  "@keyframes bounce": {
    "0%": { transform: "scale(1,1)      translateY(0)" },
    "12%": { transform: "scale(1,1)      translateY(-5px)" },
    "30%": { transform: "scale(1,1)      translateY(0)" },
    "45%": { transform: "scale(1,1)      translateY(-5px)" },
    "60%": { transform: "scale(1,1)      translateY(0)" },
    "70%": { transform: "scale(1,1)      translateY(-5px)" },
    "80%": { transform: "scale(1,1)      translateY(0)" },
    "100%": { transform: "scale(1,1)      translateY(0) " },
  },

  animatedBreath: {
    animation: "$breath 2.7s ease-out 5 normal",
    "-webkit-font-smoothing": "antialiased",
  },

  "@keyframes breath": {
    "0%": {
      "-webkit-transform": "scale(1)",
      "-ms-transform": "scale(1)",
      transform: "scale(1)",
    },
    "50%": {
      "-webkit-transform": "scale(0.9)",
      "-ms-transform": "scale(0.9)",
      transform: "scale(0.9)",
    },
    "80%": {
      "-webkit-transform": "scale(1)",
      "-ms-transform": "scale(1)",
      transform: "scale(1)",
    },
    "100%": {
      "-webkit-transform": "scale(1)",
      "-ms-transform": "scale(1)",
      transform: "scale(1)",
    },
  },
  wishlistWrapper1: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    // alignItems: "center",
    alignItems: "flex-start",
    flexDirection: "column",
    // flexDirection: "row",
    padding: "0 2%",

    [theme.breakpoints.down("sm")]: {
      display: "block",
    },
  },
  addWishButton: {
    [theme.breakpoints.down("xl")]: {
      width: "10vw",
    },
    [theme.breakpoints.down("xl")]: {
      width: "15vw",
    },
    [theme.breakpoints.down("lg")]: {
      width: "22vw",
    },
    [theme.breakpoints.down("md")]: {
      width: "28vw",
    },
    [theme.breakpoints.down("sm")]: {
      width: "-webkit-fill-available",
      marginLeft: 0,
      marginRight: 0,
    },
  },
});

export default styles;
