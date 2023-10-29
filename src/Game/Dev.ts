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

export const DevInitialPrice: Record<Dev, bigint> = {
  [Dev.Stagiaire]: 20n,
  [Dev.Alternant]: 1_100n,
  [Dev.Integrateur]: 130_000n,
  [Dev.FullStackJunior]: 20_000_000n,
  [Dev.FullStackSenior]: 5_100_000_000n,
  [Dev.Lead]: 1_000_000_000_000n,
  [Dev.Architecte]: 170_000_000_000_000n,
  [Dev.CTO]: 26_000_000_000_000_000n,
};

export const DevInitialProductivity: Record<Dev, bigint> = {
  [Dev.Stagiaire]: 1n,
  [Dev.Alternant]: 47n,
  [Dev.Integrateur]: 1_400n,
  [Dev.FullStackJunior]: 44_000n,
  [Dev.FullStackSenior]: 1_600_000n,
  [Dev.Lead]: 65_000_000n,
  [Dev.Architecte]: 2_900_000_000n,
  [Dev.CTO]: 150_000_000_000n,
};
