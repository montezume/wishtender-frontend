import confetti from "canvas-confetti";

import theme from "../../theme";

export default function confettiFireWorks() {
  var duration = 15 * 1000;
  var animationEnd = Date.now() + duration;
  var defaults = { startVelocity: 24, spread: 360, ticks: 60, zIndex: 1301 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  var interval = setInterval(function () {
    // var timeLeft = animationEnd - Date.now();

    // if () {
    //   return clearInterval(interval);
    // }

    var particleCount = 30;
    // since particles fall down, start a bit higher than random
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      })
    );
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      })
    );
  }, 400);
  return interval;
}
