// import type { Countries } from '../types/co2.ts';

// const url: string =
//   'https://nyc3.digitaloceanspaces.com/owid-public/data/co2/owid-co2-data.json';

// const fetchCountriesData = () => {
//   let data: Countries;
//   const response = fetch(url)
//     .then((res) => res.json())
//     .then((json) => {
//       data = json;
//     })
//     .catch((err) => console.log(err));
//   return {
//     read() {
//       if (!data) {
//         throw response;
//       }
//       return data;
//     },
//   };
// };
// export default fetchCountriesData;

// temporally function
import countries from './owid-co2-data.json';
import type { Countries } from '../types/co2.ts';

export default function fetchCountriesData() {
  return {
    read(): Countries {
      return countries as Countries;
    },
  };
}
