<script lang="ts">
	import { page } from '$app/stores';
	import Stat from './Stat.svelte';
	$: data = $page.data;
</script>

<header class="text-start md:text-center">
	<p class="varsity !text-xl font-bold uppercase tracking-wide text-foreground">The</p>
	<h1 class="varsity mb-6 text-start text-6xl font-bold uppercase tracking-wide md:text-center">
		College Football Belt
	</h1>

	<p class=" mb-6 text-start md:text-center">
		Tracking the lineal championship of college football
	</p>
	<div class="flex flex-row justify-center gap-12">
		<Stat value={data.totalReigns} title={'Reigns'} />
		<Stat value={data.teamCount} title={'Teams'} />
		<Stat value={data.totalGames} title={'Games'} />
		<Stat value={data.yearsTracked} title={'Years'} />
	</div>
</header>
