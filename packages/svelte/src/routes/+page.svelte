<script lang="ts">
	import AboutText from '../components/AboutText.svelte';
	import CurrentHolderCard from '../components/CurrentHolderCard.svelte';
	import Hero from '../components/hero/Hero.svelte';
	import NextGame from '../components/NextGame.svelte';
	import TeamCardFull from '../components/TeamCardFull.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>College Football Belt Tracker</title>
	<meta
		name="description"
		content="Track the history and current holder of the College Football Belt - a fan-created championship title that traces its lineage through decades of college football."
	/>
</svelte:head>

<div class="space-y-24">
	<Hero />
	<CurrentHolderCard currentHolderTotalReigns={data.currentHolderTotalReigns} />
	<section aria-label="Next Championship Game">
		<NextGame
			homeTeam={data.nextGame?.home_team_name}
			awayTeam={data.nextGame?.away_team_name}
			homeLogo={data.nextGame?.home_team.logoFile}
			awayLogo={data.nextGame?.away_team.logoFile}
			date={data.nextGame?.start_date}
		/>
	</section>

	{#if data}
		<section aria-label="Recent Belt History" class="mx-auto w-full max-w-screen-sm">
			<h2 class="sectionTitle">Recent</h2>
			<div class="divide-border divide-y" aria-label="Recent belt holders">
				{#each data.reigns as item (item._id)}
					<TeamCardFull
						name={item.team?.name}
						slug={item.team?.slug}
						defendCount={item.games.length - 1}
						startDate={item.startDate}
						logo={`${item.team?.logoFile}`}
					/>
				{/each}
			</div>
		</section>
	{/if}
	<AboutText />
</div>
