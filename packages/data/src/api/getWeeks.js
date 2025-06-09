import config from '../config.js';

const EXCLUDED_SEASON_TYPES = ['spring_regular', 'spring_postseason'];

const getWeeks = async (year) => {
  const url = `${config.baseUrl}/games?year=${year}`;
  console.log(url);

  const res = await fetch(url, config.reqOptions);
  if (!res.ok) throw new Error(`error fetching ${url} ${res.status}`);
  const data = await res.json();

  if (!data[0]) return [];

  const weeks = data.reduce((acc, cur) => {
    const item = { week: cur.week, type: cur.seasonType };
    const lastItem = acc.at(-1);
    if (
      !lastItem ||
      lastItem.week !== item.week ||
      lastItem.type !== item.type
    ) {
      acc.push(item);
    }
    return acc;
  }, []);

  return weeks.filter((week) => !EXCLUDED_SEASON_TYPES.includes(week.type));
};

export default getWeeks;

// using /calendar api
// /calendar no longer returns data for years before 2002
// const getWeeks = async (year) => {
//   const searchParams = new URLSearchParams({ year }).toString();
//   console.log(searchParams);
//   const url = config.baseUrl + '/calendar?' + searchParams;
//   console.log(url);
//   const res = await fetch(url, config.reqOptions);
//   if (!res.ok)
//     throw new Error(
//       `error fetching ${url} : ${res.status} : ${JSON.stringify(config.reqOptions)}`
//     );
//   const data = await res.json();
//   console.log(data);
//   const weeks = data
//     .map((x) => ({ week: x.week, type: x.seasonType }))
//     .filter(
//       (x) => x.type !== 'spring_regular' && x.type !== 'spring_postseason'
//     );
//   return weeks;
// };
