import { db, teamTable } from '@cfb/db';
import { eq } from 'drizzle-orm';

const saveTeams = async (teamData: any[]) => {
	const teams = teamData.map((t) => ({
		name: t.name,
		displayName: t.displayName ?? t.name,
		color: t.color ?? null,
		logoFile: t.logoFile ?? 'default',
		altColor: t.altColor ?? null,
		slug: encodeURIComponent(t.name.replace(/\s/g, '').toLowerCase()),
	}));

	for (const team of teams) {
		await db
			.insert(teamTable)
			.values(team)
			.onConflictDoUpdate({
				target: teamTable.name,
				set: {
					displayName: team.displayName,
					color: team.color,
					logoFile: team.logoFile,
					altColor: team.altColor,
					slug: team.slug,
				},
			});
	}
};

export default saveTeams;
