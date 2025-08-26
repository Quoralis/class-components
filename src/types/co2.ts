export type Countries = Record<string, DataCountry>;

export type DataCountry = {
  data: DataYear[];
  iso_code?: string;
};

type DataYear = {
  year: number;
  population?: number;
  cement_co2?: number;
  cement_co2_per_capita?: number;
  cumulative_cement_co2?: number;
};
