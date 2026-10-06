/**
 * Site details still to be confirmed. Replace each [PLACEHOLDER] with the
 * real value; every section of the page reads from here.
 */
export const site = {
  registerUrl: "[LINK]",
  date: "[DATE]",
  email: "[EMAIL]",
};

/** True while a value is still a [PLACEHOLDER]. */
export const isPlaceholder = (value: string) => /^\[.*\]$/.test(value);

/** Registration button target: the real link once set, otherwise the For Schools section. */
export const registerHref = isPlaceholder(site.registerUrl) ? "#schools" : site.registerUrl;

export const nav = [
  { href: "#about", label: "About" },
  { href: "#objectives", label: "Objectives" },
  { href: "#levels", label: "Levels" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#certificates", label: "Certificates" },
  { href: "#topics", label: "Topics" },
  { href: "#schools", label: "For schools" },
  { href: "#faq", label: "FAQ" },
];

export const levels = [
  { n: 1, grades: "5th and 6th grade", color: "leaf" },
  { n: 2, grades: "7th and 8th grade", color: "water" },
  { n: 3, grades: "9th grade and 1st year of High School", color: "gold" },
  { n: 4, grades: "2nd and 3rd year of High School", color: "torch" },
] as const;

export const phases = [
  { n: 1, name: "Test", text: "Questions about sustainability and the environment." },
  { n: 2, name: "Riddle", text: "Solve an environmental riddle using knowledge and creativity." },
  { n: 3, name: "Final Test", text: "A final test to complete the competition." },
];
