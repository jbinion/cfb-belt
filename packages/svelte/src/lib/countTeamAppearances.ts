interface Team {
	name: string;
	displayName: string;
	color: string;
	logoFile: string;
	altColor: string;
	slug: string;
}

interface CountAppearancesResult extends Team {
	count: number;
}

const countTeamAppearances = (teamArray: Team[]): CountAppearancesResult[] => {
	// console.log(teamArray);
	const r = teamArray.reduce((acc, cur) => {
		if (!cur) {
			console.log(teamArray);
		} else if (!acc[cur.slug]) acc[cur.slug] = { ...cur, count: 1 };
		else acc[cur.slug].count += 1;
		return acc;
	}, {});
	return Object.values(r);
};
export default countTeamAppearances;
