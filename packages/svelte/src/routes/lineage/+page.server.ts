import { getReigns } from '$lib/getReigns';

export const prerender = true;

export async function load() {
	try {
		const reigns = await getReigns();
		return { reigns };
	} catch (error) {
		console.error('Error loading reigns:', error);
		return { reigns: [] };
	}
}
