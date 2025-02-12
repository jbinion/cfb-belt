import Team from '../models/Team.js';

const saveTeams = async (teamData) => {
  // Set slug directly as a regular property
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
