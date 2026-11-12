/**
 * Team directory (design v3). Department and role labels are translated in
 * messages under `team.departments` and `team.roles`; names, contact details
 * and photos are the same in every language.
 */
export type Person = {
  name: string;
  role: string;
  /** Mailbox before @nicholaisen.dk. */
  email?: string;
  phone?: string;
  /** File in /public/images/Medarbejder. */
  photo: string;
};

export type Department = { key: string; people: Person[] };

export const departments: Department[] = [
  {
    key: "leadership",
    people: [
      { name: "Thomas Biehl", role: "ceo", email: "tb", photo: "Thomas Biehl.jpeg" },
      { name: "Henrik Ibsen", role: "coo", email: "hib", photo: "Henrik Ibsen.jpg" },
      { name: "Lars Sommer", role: "cfo", email: "ls", photo: "Lars Sommer.jpeg" },
    ],
  },
  {
    key: "administration",
    people: [
      { name: "Kathrine Hovesen", role: "paToCeo", email: "kh", photo: "Kathrine Hovesen.jpeg" },
      { name: "Svenja Hartmann", role: "projectCoordinator", email: "sh", photo: "Svenja Hartmann.jpeg" },
      { name: "Gitte Sandholm", role: "officeAssistant", email: "gis", photo: "Gitte Sandholm.jpeg" },
    ],
  },
  {
    key: "salesDenmark",
    people: [
      { name: "Bo Bruun Holm", role: "salesPanel", email: "bbh", phone: "+45 40 54 47 64", photo: "Bo Holm.jpeg" },
      { name: "Mark Dige Høgh", role: "salesPanel", email: "mdh", phone: "+45 26 16 92 80", photo: "Mark Dige.jpg" },
      { name: "Bo Rasmussen", role: "salesDoorWindow", email: "br", phone: "+45 40 82 55 45", photo: "Bo Rasmusen.png" },
      { name: "Peter Haahr Larsen", role: "salesDoorWindow", email: "phrl", phone: "+45 40 96 47 11", photo: "Peter Haahr.jpeg" },
      { name: "Jørn Biehl", role: "salesWoodDrying", photo: "Jørn Biehl.jpeg" },
      { name: "Claus Capion", role: "salesAutomation", email: "cca", phone: "+45 40 88 00 61", photo: "Claus Capion.jpeg" },
      { name: "René Beldam", role: "salesNichoMachines", email: "rb", phone: "+45 24 59 03 50", photo: "René Beldam.jpeg" },
    ],
  },
  {
    key: "salesBaltic",
    people: [
      { name: "Siim Türk", role: "salesManager", email: "sit", phone: "+372 5867 6119", photo: "Siim Türk.jpg" },
      { name: "Søren Jørgensen", role: "businessDevelopmentManager", email: "srj", phone: "+372 509 6780", photo: "Søren Jørgensen.jpeg" },
      { name: "John Tøttrup Christensen", role: "sales", phone: "+372 510 9486", photo: "John Tøttrup Christensen.jpg" },
      { name: "Andrejus Petrusovas", role: "sales", email: "anp", phone: "+370 605 79720", photo: "Andrejus Petrusovas.jpg" },
    ],
  },
  {
    key: "salesSweden",
    people: [{ name: "Erik Nord", role: "sales", email: "erik", phone: "+46 72 70 17 300", photo: "Erik Nord.jpg" }],
  },
  {
    key: "innovation",
    people: [{ name: "Kenneth Bech Sørensen", role: "projectManagerData", email: "kbs", photo: "Kenneth Bech Sørensen.jpeg" }],
  },
  {
    key: "service",
    people: [
      { name: "Tobias Kjærgaard", role: "serviceManager", email: "tk", photo: "Tobias Kjærgaard.jpeg" },
      { name: "Lars Skaarup Petersen", role: "sparePartsManager", email: "lsp", photo: "Lars Skaarup Petersen.jpeg" },
      { name: "Søren Solhaug Madsen", role: "consultantBusinessDevelopment", email: "ssm", photo: "Søren Solhaug Madsen.jpeg" },
      { name: "Johnny B. Kristensen", role: "serviceTechnician", email: "jbk", photo: "Johnny B. Kristensen.jpeg" },
      { name: "Søren Baldtzar Rasmussen", role: "serviceTechnician", email: "sbr", photo: "Søren Baldtzer Rasmussen.jpg" },
    ],
  },
  {
    key: "marketing",
    people: [
      { name: "Jacob Vedsø", role: "marketingManager", email: "jv", photo: "Jacob Vedsø.jpg" },
      { name: "Simone Jørgensen", role: "marketingCoordinator", email: "simone", photo: "Simone Jørgensen.jpg" },
      { name: "Dennis Harløv Madsen", role: "telemarketingManager", email: "dhm", photo: "Dennis Harløv Madsen.jpg" },
    ],
  },
  {
    key: "finance",
    people: [
      { name: "Ole Faurholt Rasmussen", role: "accountant", email: "or", photo: "Ole Faurholt Rasmussen.jpeg" },
      { name: "Andreas Wrona", role: "financialController", email: "aw", photo: "Andreas Wrona.jpg" },
    ],
  },
];

export const photoUrl = (file: string) => `/images/Medarbejder/${encodeURIComponent(file)}`;
