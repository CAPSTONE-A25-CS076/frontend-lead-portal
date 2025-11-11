// Enumerations for filters and form options
export const JOBS = [
  "admin.",
  "unknown",
  "unemployed",
  "management",
  "housemaid",
  "entrepreneur",
  "student",
  "blue-collar",
  "self-employed",
  "retired",
  "technician",
  "services",
];
export const MARITALS = ["married", "divorced", "single"];
export const EDUCATIONS = ["unknown", "secondary", "primary", "tertiary"];
export const CONTACTS = ["unknown", "telephone", "cellular"];
export const POUTCOMES = ["unknown", "other", "failure", "success"];

// Helper to generate a few demo rows
function r(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
function n(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function scoreFrom(features) {
  // naive demo score; replace with model output in production
  let s =
    0.1 +
    (features.previous > 0 ? 0.15 : 0) +
    (features.poutcome === "success" ? 0.25 : 0) +
    (features.campaign <= 2 ? 0.1 : 0);
  s +=
    (features.education === "tertiary" ? 0.05 : 0) +
    (features.contact === "cellular" ? 0.05 : 0);
  s = Math.min(0.98, Math.max(0.02, s + (Math.random() * 0.2 - 0.1)));
  return Number(s.toFixed(3));
}

export const LEADS = Array.from({ length: 60 }).map((_, i) => {
  const age = n(18, 75);
  const job = r(JOBS);
  const marital = r(MARITALS);
  const education = r(EDUCATIONS);
  const _default = r(["yes", "no"]);
  const balance = n(-100, 40000);
  const housing = r(["yes", "no"]);
  const loan = r(["yes", "no"]);
  const contact = r(CONTACTS);
  const day = n(1, 31);
  const month = r([
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec",
  ]);
  const duration = n(30, 1800);
  const campaign = n(1, 5);
  const pdays = r([-1, n(1, 30)]);
  const previous = n(0, 3);
  const poutcome = r(POUTCOMES);
  const y = r(["yes", "no"]);
  const score = scoreFrom({ previous, poutcome, campaign, education, contact });

  return {
    id: i + 1,
    age,
    job,
    marital,
    education,
    default: _default,
    balance,
    housing,
    loan,
    contact,
    day,
    month,
    duration,
    campaign,
    pdays,
    previous,
    poutcome,
    y,
    score,
  };
});
