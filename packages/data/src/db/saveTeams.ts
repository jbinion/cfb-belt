import { Team } from 'models';

const saveTeams = async (teamData) => {
	const teamObj = teamData.map((t) => ({
		...t,
		slug: encodeURIComponent(t.name.replace(/\s/g, '').toLowerCase()),
	}));
	return await Team.bulkWrite(
		teamObj.map((team) => ({
			updateOne: {
				filter: { name: team.name },
				update: { $set: team },
				upsert: true,
				new: true,
			},
		}))
	);
};

export default saveTeams;
