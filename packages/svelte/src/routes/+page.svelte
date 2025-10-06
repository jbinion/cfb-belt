<script lang="ts">
	import AboutText from '../components/AboutText.svelte';
	import Card from '../components/Card.svelte';
	import Hero from '../components/hero/Hero.svelte';
	import TeamCardFull from '../components/TeamCardFull.svelte';
	import type { PageData } from './$types';
	import numberSuffix from '../lib/numberSuffix';
	import formatDate from '$lib/formatDate';
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

	<div class="mx-auto flex max-w-screen-sm flex-col gap-24">
		<Card
			title="Current Holder"
			color={data.current.team.color}
			logoFile={data.current.team.logoFile}
			teamName={data.current.team.name}
			slug={data.current.team.slug}
		>
			<div class="space-y-2">
				<div class="flex flex-row gap-8">
					<div class="">
						<p class="text-[11px] font-semibold uppercase tracking-wide text-white/70">Since</p>
						<p class="font-mono text-base text-zinc-100">
							{formatDate(data.current.startDate, { month: 'long' })}
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
			slug={data.nextChallenger.slug}
		>
			{formatDate(data.nextGameStartDate, { weekday: 'long', month: 'long' })}
		</Card>
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
