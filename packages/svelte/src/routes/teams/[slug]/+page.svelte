<script lang="ts">
	import type { PageData } from './$types';
	import ReignCard from '../../../components/ReignCard.svelte';
	import { BsShield } from 'svelte-icons-pack/bs';
	import { Icon } from 'svelte-icons-pack';
	import { BsTrophy } from 'svelte-icons-pack/bs';
	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>{data.team.name} Belt History | CFB Belt Tracker</title>
	<meta
		name="description"
		content="View {data.team.name}'s College Football Belt history, including {data.reigns
			?.length || 0} championship reigns and {data.reigns?.reduce(
			(acc: number, curr: { games: any[] }) => acc + curr.games.length - 1,
			0
		) || 0} successful defenses."
	/>
	<!-- <script type="application/ld+json">
		{JSON.stringify({
			"@context": "https://schema.org",
			"@type": "SportsTeam",
			"name": data.team.name,
			"image": `https://cfb-belt.vercel.app/webp/original/${data.team.logoFile}.webp`,
			"sport": "American Football",
			"description": `${data.team.name}'s College Football Belt history, including ${data.reigns?.length || 0} championship reigns.`
		})}
	</script> -->
</svelte:head>

<main class="space-y-2">
	{#if data.reigns}
		<section
			class="mb-12 flex flex-col items-center justify-between md:flex-row"
			aria-label="Team Overview"
		>
			<div class="my-24 flex flex-row space-x-6">
				<img
					src={`/webp/original/${data.team.logoFile}.webp`}
					class="h-[90px] w-[90px]"
					alt=""
					aria-hidden="true"
				/>
				<div class="flex flex-col justify-center text-black">
					<h1 class="text-4xl font-bold">
						{data.team.name}
					</h1>
				</div>
			</div>

			<dl class="flex flex-row items-center justify-center space-x-4">
				<div class="flex flex-row items-center space-x-4 p-4">
					<dt class="sr-only">Championship Reigns</dt>
					<span aria-hidden="true">
						<Icon src={BsTrophy} className="text-blue-600" />
					</span>
					<dd>{data.reigns.length} Reigns</dd>
				</div>

				<div class="flex flex-row items-center space-x-4 p-4">
					<dt class="sr-only">Successful Defenses</dt>
					<span aria-hidden="true">
						<Icon src={BsShield} className="text-blue-600" />
					</span>
					<dd>
						{data.reigns.reduce(
							(acc: number, curr: { games: any[] }) => acc + curr.games.length - 1,
							0
						)} Defenses
					</dd>
				</div>
			</dl>
		</section>

		<section class="flex flex-col space-y-4" aria-label="Championship History">
			<h2 class="sr-only">Championship Reigns</h2>
			{#each data.reigns as reign (reign._id)}
				<ReignCard
					defenses={reign.games.length - 1}
					start={reign.games[0].start_date}
					end={reign.games.at(-1).start_date}
					games={reign.games}
				/>
			{/each}
		</section>
	{:else}
		<p class="text-center">No championship history found for {data.team.name}.</p>
	{/if}
</main>
