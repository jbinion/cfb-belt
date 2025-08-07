<script lang="ts">
	import { page } from '$app/stores';
	import Stat from './Stat.svelte';
	$: data = $page.data;
</script>

<header>
	<div class="space-y-6 text-center">
		<a href="/">
			<h1 class=" mb-2 text-start uppercase tracking-wide md:text-center">
				<span class=" !text-start !text-xl">The<br /></span> College Football Belt
			</h1>
			<p class=" text-start md:text-center">Tracking the lineal championship of college football</p>
		</a>
		<div class="grid grid-cols-2 gap-4 md:grid-cols-4">
			<Stat value={data.totalReigns} title={'Reigns'} />
			<Stat value={data.teamCount} title={'Teams'} />
			<Stat value={data.totalGames} title={'Games'} />
			<Stat value={data.yearsTracked} title={'Years'} />
		</div>
	</div>
</header>
