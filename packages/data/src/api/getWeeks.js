import config from '../utils/config.js';

const getWeeks = async (year) => {
  const searchParams = new URLSearchParams({ year }).toString();
  console.log(searchParams);
  const url = config.baseUrl + '/calendar?' + searchParams;

  const res = await fetch(url, config.reqOptions);
  if (!res.ok)
    throw new Error(
      `error fetching ${url} : ${res.status} : ${JSON.stringify(config.reqOptions)}`
    );
  const data = await res.json();
  const weeks = data.map((x) => ({ week: x.week, type: x.seasonType }));
  return weeks;
};

export default getWeeks;
