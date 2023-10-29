export enum Dev {
  Stagiaire = 'Stagiaire',
  Alternant = 'Alternant',
  Integrateur = 'Integrateur',
  FullStackJunior = 'FullStackJunior',
  FullStackSenior = 'FullStackSenior',
  Lead = 'Lead',
  Architecte = 'Architecte',
  CTO = 'CTO',
}

export const DevLvl: Record<Dev, number> = {
  [Dev.Stagiaire]: 0,
  [Dev.Alternant]: 1,
  [Dev.Integrateur]: 2,
  [Dev.FullStackJunior]: 3,
  [Dev.FullStackSenior]: 4,
  [Dev.Lead]: 5,
  [Dev.Architecte]: 6,
  [Dev.CTO]: 7,
};

export const DevInitialPrice: Record<Dev, number> = {
  [Dev.Stagiaire]: 1.5 * 10 ** 1,
  [Dev.Alternant]: 1.1 * 10 ** 3,
  [Dev.Integrateur]: 1.3 * 10 ** 5,
  [Dev.FullStackJunior]: 2 * 10 ** 7,
  [Dev.FullStackSenior]: 5.1 * 10 ** 9,
  [Dev.Lead]: 1.0 * 10 ** 12,
  [Dev.Architecte]: 1.7 * 10 ** 14,
  [Dev.CTO]: 2.6 * 10 ** 16,
};

export const DevInitialProductivity: Record<Dev, number> = {
  [Dev.Stagiaire]: 1,
  [Dev.Alternant]: 4.7 * 10 ** 1,
  [Dev.Integrateur]: 1.4 * 10 ** 3,
  [Dev.FullStackJunior]: 4.4 * 10 ** 4,
  [Dev.FullStackSenior]: 1.6 * 10 ** 6,
  [Dev.Lead]: 6.5 * 10 ** 7,
  [Dev.Architecte]: 2.9 * 10 ** 9,
  [Dev.CTO]: 1.5 * 10 ** 11,
};
