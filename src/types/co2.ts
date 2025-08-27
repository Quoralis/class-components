export type Countries = Record<string, DataCountry>;

export type DataCountry = {
  data: DataYear[];
  iso_code?: string;
};

export type DataYear = {
  year: number;
  population?: number;
  cement_co2?: number;
  cement_co2_per_capita?: number;
  cumulative_cement_co2?: number;
  co2?: number;
  co2_per_capita?: number;
  methane?: number;
  methane_per_capita?: number;
  oil_co2?: number;
  oil_co2_per_capita?: number;
  nitrous_oxide?: number;
  nitrous_oxide_per_capita?: number;
  cumulative_co2?: number;
  cumulative_oil_co2?: number;
};
