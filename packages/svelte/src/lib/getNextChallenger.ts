import { NextGame, Reign } from 'models';

const getNextChallenger = async () => {
	const nextGame = await NextGame.findOne().populate('home_team').populate('away_team');

	if (nextGame.start_date < Date.now()) {
		return { nextChallenger: null, nextGame };
	}

	const currentReign = await Reign.findOne().populate('team').sort({ startDate: -1 });
	let nextChallenger;

	if (nextGame && currentReign && nextGame.home_team_name === currentReign.team.name) {
		nextChallenger = nextGame.away_team;
	} else {
		nextChallenger = nextGame?.home_team;
	}

	return { nextChallenger, nextGame };
};

export default getNextChallenger;
