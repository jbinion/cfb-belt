<script lang="ts">
	import type { PageData } from './$types';
	import ReignCard from '../../../components/ReignCard.svelte';
	import { BsShield } from 'svelte-icons-pack/bs';
	import { Icon } from 'svelte-icons-pack';
	import { BsTrophy } from 'svelte-icons-pack/bs';
	import TeamsDisplay from '../../../components/TeamsDisplay.svelte';
	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>{data.team?.name} CFB Belt History</title>
	<meta name="description" content="{data.team?.name}'s College Football Belt history" />
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

{#if data.reigns}
	<div class="container mx-auto px-4  space-y-24">
		<section
			class="flex flex-col sm:flex-row items-center sm:items-start gap-6 rounded-xl bg-white/70 dark:bg-neutral-900/70 "
			aria-label="Team Overview"
		>
			<img
				src={`/webp/original/${data.team.logoFile}.webp`}
				class="h-28 w-28 sm:h-32 sm:w-32 rounded-md bg-white "
				alt=""
				aria-hidden="true"
			/>
			<div class="flex flex-col justify-center text-black dark:text-white">
				<h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight">
					{data.team.name}
				</h1>
				<dl class="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
					<div class="flex items-center gap-3 rounded-lg bg-white/60 dark:bg-neutral-800/60 px-4 py-2">
						<span aria-hidden="true">
							<Icon src={BsTrophy} size="1.25rem" />
						</span>
						<div class="flex flex-col leading-tight">
							<dt class="sr-only">Reigns</dt>
							<dd class="text-sm text-gray-600 dark:text-gray-300">Reigns</dd>
							<dd class="text-lg font-semibold">{data.reigns.length}</dd>
						</div>
					</div>

					<div class="flex items-center gap-3 rounded-lg bg-white/60 dark:bg-neutral-800/60 px-4 py-2">
						<span aria-hidden="true">
							<Icon src={BsShield} size="1.25rem" />
						</span>
						<div class="flex flex-col leading-tight">
							<dt class="sr-only">Defenses</dt>
							<dd class="text-sm text-gray-600 dark:text-gray-300">Defenses</dd>
							<dd class="text-lg font-semibold">
								{data.reigns.reduce(
									(acc: number, curr: { games: any[] }) => acc + curr.games.length - 1,
									0
								)}
								</dd>
						</div>
					</div>
				</dl>
			</div>
		</section>

		<section class="flex flex-col space-y-6" aria-label="Opponent Matchups">
			<h2 class="text-xl font-semibold tracking-tight">Teams Faced</h2>
			<div class='grid grid-cols-2 gap-6'>
				<TeamsDisplay title="Won belt from" teams={data.teamsBeatenForBelt} />
				<TeamsDisplay title="Lost belt to" teams={data.teamsLostTo} />
			
			</div>
			{#if data.teamsDefended.length > 0}
			<TeamsDisplay title="Defended belt against" teams={data.teamsDefended} />

			{/if}
		</section>

		<section class="flex flex-col space-y-6" aria-label="Championship History">
			<h2 class="text-xl font-semibold tracking-tight">Championship Reigns</h2>
			{#each data.reigns as reign (reign._id)}
				<ReignCard
					start={reign.startDate}
					end={reign.beltLossGame?.start_date || ''}
					games={reign.games}
					beltLossGame={reign.beltLossGame || null}
				/>
			{/each}
		</section>
	</div>
{:else}
	<p class="text-center">No championship history found for {data.team?.name}.</p>
{/if}
