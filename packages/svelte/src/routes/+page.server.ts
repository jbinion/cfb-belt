import getHeroStats from '$lib/getHeroStats';
import getNextChallenger from '$lib/getNextChallenger';
import { getReigns } from '$lib/getReigns';

export const prerender = true;

export async function load() {
	try {
		const [reigns, heroStats, { nextChallenger, nextGame }] = await Promise.all([
			getReigns(10),
			getHeroStats(),
			getNextChallenger(),
		]);

		return {
			reigns,
			...heroStats,
			nextGameStartDate: nextGame?.startDate ?? null,
			nextChallenger,
		};
	} catch (error) {
		console.error('Error loading page:', error);
		return { reigns: [] };
	}
}
