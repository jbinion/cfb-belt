<script lang="ts">
	import AboutText from '../components/AboutText.svelte';
	import Card from '../components/Card.svelte';
	import Hero from '../components/hero/Hero.svelte';
	import type { PageData } from './$types';
	import numberSuffix from '../utils/numberSuffix';
	import formatDate from '../utils/formatDate';
	import Teamrow from '../components/TeamRow.svelte';
	import ReignTable from '../components/ReignTable.svelte';
	import Statsbar from '../components/stats/Statsbar.svelte';
	import FancyTable from '../components/table/FancyTable.svelte';
	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>College Football Belt Tracker</title>
	<meta
		name="description"
		content="Track the history and current holder of the College Football Belt - a fan-created championship title that traces its lineage through decades of college football."
	/>
</svelte:head>

<Hero />
<Statsbar />
<div class="container">
	<Card
		title="Current Belt Holder"
		color={data.current.team.color}
		logoFile={data.current.team.logoFile}
		teamName={data.current.team.name}
		slug={data.current.team.slug}
	>
		<div class="space-y-2">
			<div class="flex flex-row gap-8">
				<div class="">
					<p class="text-[11px] font-semibold uppercase tracking-wide text-black/70">Claimed</p>
					<p class="font-mono text-base">
						{formatDate(data.current.startDate, { month: 'long' })}
					</p>
				</div>

				<div class="">
					<p class="text-[11px] font-semibold uppercase tracking-wide text-black/70">Reign</p>
					<p class="font-mono text-base">
						{`${data.currentHolderTotalReigns}${numberSuffix(data.currentHolderTotalReigns)}`}
					</p>
				</div>

				<div class="">
					<p class="text-[11px] font-semibold uppercase tracking-wide text-black/70">Defenses</p>
					<p class="font-mono text-base">
						{data.current.games.length - 1}
					</p>
				</div>
			</div>
		</div>
	</Card>
</div>

<section class="mx-auto mb-16 mt-12 max-w-[800px] px-8">
	<h2 class="mb-4 text-sm font-semibold uppercase tracking-wide text-[#737373]">Last 10 Reigns</h2>
	<div class="overflow-x-auto bg-white">
		<FancyTable reigns={data.reigns} />
	</div>
</section>

<div class="mx-auto mt-24 flex max-w-screen-sm flex-col gap-24">
	<!-- <Card
		title="Next Game"
		color={data.nextChallenger.color}
		logoFile={data.nextChallenger.logoFile}
		teamName={data.nextChallenger.name}
		slug={data.nextChallenger.slug}
	>
		{formatDate(data.nextGameStartDate, { weekday: 'long', month: 'long' })}
	</Card> -->

	<!-- <div>
		<a href="/history">
			<h2 class="sectionTitle">Recent</h2>
		</a>
		<ReignTable reigns={data.reigns} />
	</div> -->
	<!-- <AboutText />v -->
</div>
