import formatGame from '../../src/api/formatGame';

const testData = [
  {
    id: 401135279,
    season: 2019,
    week: 1,
    seasonType: 'postseason',
    startDate: '2019-12-29T01:20:00.000Z',
    startTimeTBD: false,
    completed: true,
    neutralSite: true,
    conferenceGame: false,
    attendance: 71330,
    venueId: 3970,
    venue: 'State Farm Stadium',
    homeId: 194,
    homeTeam: 'Ohio State',
    homeClassification: 'fbs',
    homeConference: 'Big Ten',
    homePoints: 23,
    homeLineScores: [10, 6, 0, 7],
    homePostgameWinProbability: 0.5945342262684744,
    homePregameElo: 2373,
    homePostgameElo: 2369,
    awayId: 228,
    awayTeam: 'Clemson',
    awayClassification: 'fbs',
    awayConference: 'ACC',
    awayPoints: 29,
    awayLineScores: [0, 14, 7, 8],
    awayPostgameWinProbability: 0.4054657737315256,
    awayPregameElo: 2396,
    awayPostgameElo: 2400,
    excitementIndex: 9.3753528302,
    highlights: 'https://www.youtube.com/watch?v=3ZhYjN0jBhc',
    notes: 'PLAYSTATION FIESTA BOWL - CFP SEMIFINAL',
  },
  {
    id: 401135295,
    season: 2019,
    week: 1,
    seasonType: 'postseason',
    startDate: '2020-01-14T01:00:00.000Z',
    startTimeTBD: false,
    completed: true,
    neutralSite: true,
    conferenceGame: false,
    attendance: 76885,
    venueId: 3493,
    venue: 'Caesars Superdome',
    homeId: 99,
    homeTeam: 'LSU',
    homeClassification: 'fbs',
    homeConference: 'SEC',
    homePoints: 42,
    homeLineScores: [7, 21, 7, 7],
    homePostgameWinProbability: 0.9844961061275428,
    homePregameElo: 2285,
    homePostgameElo: 2342,
    awayId: 228,
    awayTeam: 'Clemson',
    awayClassification: 'fbs',
    awayConference: 'ACC',
    awayPoints: 25,
    awayLineScores: [7, 10, 8, 0],
    awayPostgameWinProbability: 0.015503893872457208,
    awayPregameElo: 2400,
    awayPostgameElo: 2343,
    excitementIndex: 5.1873471877,
    highlights: 'https://www.youtube.com/watch?v=17RWyRHPe1A',
    notes: 'CFP NATIONAL CHAMPIONSHIP PRES. BY AT&T',
  },
];
const testResult = [
  {
    id: 401135279,
    start_date: '2019-12-29T01:20:00.000Z',
    home_team: 'Ohio State',
    away_team: 'Clemson',
    home_points: 23,
    away_points: 29,
    week: 1,
    type: 'postseason',
    year: 2019,
  },
  {
    id: 401135295,
    start_date: '2020-01-14T01:00:00.000Z',
    home_team: 'LSU',
    away_team: 'Clemson',
    home_points: 42,
    away_points: 25,
    week: 1,
    type: 'postseason',
    year: 2019,
  },
];

describe('formatGame', () => {
  it('should format game correctly', () => {
    const result = testData.map((x) => formatGame(x));
    console.log(result);
    expect(result).toEqual(testResult);
  });
});
