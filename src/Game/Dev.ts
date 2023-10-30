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

export const DevList: Dev[] = [Dev.Stagiaire, Dev.Alternant, Dev.Integrateur, Dev.FullStackJunior, Dev.FullStackSenior, Dev.Lead, Dev.Architecte, Dev.CTO];

export const DevInitialPrice: Record<Dev, number> = {
  [Dev.Stagiaire]: 500,
  [Dev.Alternant]: 1500,
  [Dev.Integrateur]: 2000,
  [Dev.FullStackJunior]: 2500,
  [Dev.FullStackSenior]: 3000,
  [Dev.Lead]: 4000,
  [Dev.Architecte]: 5000,
  [Dev.CTO]: 7000,
};

export const DevInitialProductivity: Record<Dev, number> = {
  [Dev.Stagiaire]: 1,
  [Dev.Alternant]: 5,
  [Dev.Integrateur]: 10,
  [Dev.FullStackJunior]: 15,
  [Dev.FullStackSenior]: 20,
  [Dev.Lead]: 50,
  [Dev.Architecte]: 100,
  [Dev.CTO]: 150,
};
