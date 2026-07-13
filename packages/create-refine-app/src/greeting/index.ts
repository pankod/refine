import cowrizz from "cowrizz";

const texts = [
  "In a world of constraints, Refine\noffers freedom. Code on!",
  "Refine: Because real devs don't just\nclick, they code!",
  "Low-code? No-code? How about Pro-code\nwith Refine!",
  "They asked for a robust B2B solution. We\nheard 'time to shine with Refine'!",
  "They said 'Make it work, make it right, make\nit fast.' With Refine, we're already there!",
  "Building CRUD apps with Refine? That's\nudderly fantastic! Avoid the bull, focus on\nthe code!",
  "CRUD apps so sleek, even the cows\nwant in! Let's get mooo-ving with\nRefine!",
];

export const greeting = async () => {
  await cowrizz({
    text: texts[Math.floor(Math.random() * texts.length)],
    startPause: 500,
    endPause: 300,
    interval: 40,
  });
};
