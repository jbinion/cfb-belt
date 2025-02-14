<script lang="ts">
	import AboutText from '../components/AboutText.svelte';
	import NextGame from '../components/NextGame.svelte';
	import TeamCard from '../components/TeamCard.svelte';
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

<main class="flex flex-col">
	<div class="flex flex-col-reverse md:flex-row md:space-x-24 md:space-y-0">
		<section class="about-section flex-1" aria-label="About the College Football Belt">
			<AboutText />
		</section>

		<div class="mb-12 flex-1 space-y-12">
			<section aria-label="Next Championship Game">
				<NextGame />
			</section>

			{#if data}
				<section aria-label="Recent Belt History">
					<h2 class="sectionTitle">Recent Lineage</h2>
					<ul class="space-y-2" aria-label="Recent belt holders">
						{#each data.reigns as item (item._id)}
							<TeamCard logo={item.team.logoFile} name={item.team.name} slug={item.team.slug} />
						{/each}
					</ul>
				</section>
			{/if}
		</div>
	</div>
</main>
