<script lang="ts">
	import AboutText from '../components/AboutText.svelte';
	import Card from '../components/Card.svelte';
	import CurrentCard from '../components/CurrentCard.svelte';
	import CurrentHolderCard from '../components/CurrentHolderCard.svelte';
	import Hero from '../components/hero/Hero.svelte';
	import NextGame from '../components/NextGame.svelte';
	import TeamCardFull from '../components/TeamCardFull.svelte';
	import TeamCardSmall from '../components/TeamCardSmall.svelte';
	import type { PageData } from './$types';
	import numberSuffix from '../lib/numberSuffix';
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
	<!-- <CurrentHolderCard currentHolderTotalReigns={data.currentHolderTotalReigns} />
	<section aria-label="Next Championship Game">
		<NextGame challenger={data.nextChallenger} date={data.nextGameStartDate} />
	</section> -->
	<div class=" grid grid-cols-2 justify-center gap-8">
		<p>Complete Lineage</p>
		<p>All Teams</p>
	</div>

	<div class="mx-auto flex max-w-screen-sm flex-col gap-8">
		<!-- <CurrentCard currentHolderTotalReigns={data.currentHolderTotalReigns} /> -->
		<Card
			title="Current Holder"
			color={data.current.team.color}
			logoFile={data.current.team.logoFile}
			teamName={data.current.team.name}
		>
			<div class="space-y-2">
				<div class="flex flex-row gap-8">
					<div class="">
						<p class="text-[11px] font-semibold uppercase tracking-wide text-white/70">Since</p>
						<p class="font-mono text-base text-zinc-100">
							{new Date(data.current.startDate).toLocaleDateString('en-US', {
								year: 'numeric',
								month: 'long',
								day: 'numeric'
							})}
						</p>
					</div>

					<div class="">
						<p class="text-[11px] font-semibold uppercase tracking-wide text-white/70">Reign</p>
						<p class="font-mono text-base text-zinc-100">
							{`${data.currentHolderTotalReigns}${numberSuffix(data.currentHolderTotalReigns)}`}
						</p>
					</div>

					<div class="">
						<p class="text-[11px] font-semibold uppercase tracking-wide text-white/70">Defenses</p>
						<p class="font-mono text-base text-zinc-100">
							{data.current.games.length - 1}
						</p>
					</div>
				</div>
			</div>
		</Card>
		<Card
			title="Next Game"
			color={data.nextChallenger.color}
			logoFile={data.nextChallenger.logoFile}
			teamName={data.nextChallenger.name}
		>
			{new Date(data.nextGameStartDate).toLocaleDateString('en-US', {
				weekday: 'long', // Saturday
				year: 'numeric', // 2025
				month: 'long', // August
				day: 'numeric' // 30
			})}
			<!-- {data.nextGameStartDate} -->
		</Card>
		<!-- <div class="bg-[#005030] p-4 text-white">
			<p>Current Holder</p>
			<p>Miami</p>
		</div> -->
		<!--  -->
		<!-- <div class=" bg-zinc-200 p-4">
			<p>Next Game</p>
			<p>Florida</p>
		</div> -->
		<!-- <div class=" bg-zinc-200 p-4">
			<p>Recent</p>
			{#each data.reigns as item (item._id)}
				<TeamCardSmall
					name={item.team?.name}
					slug={item.team?.slug}
					defendCount={item.games.length - 1}
					startDate={item.startDate}
					logo={`${item.team?.logoFile}`}
				/>
			{/each}
		</div> -->
	</div>

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
