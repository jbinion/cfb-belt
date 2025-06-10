<script lang="ts">
	import { page } from '$app/stores';
	import Stat from './Stat.svelte';
	$: data = $page.data;
</script>

<header class="bg-navBackground pb-12 text-white shadow-md">
	<div class="content space-y-8 text-center">
		<a href="/">
			<h1 class=" mb-2 text-start uppercase tracking-wide text-white md:text-center">
				<span class="text-accent !text-start !text-xl">The<br /></span> College Football Belt
			</h1>
			<p class="text-accent text-start font-semibold md:text-center">
				Tracking the lineal championship of college football
			</p>
		</a>
		<div class="grid grid-cols-2 gap-4 text-white md:grid-cols-4">
			<Stat value={data.yearsTracked} title={'Years'} />
			<Stat value={data.totalGames} title={'Games'} />

			<Stat value={data.totalReigns} title={'Reigns'} />
			<Stat value={data.teamCount} title={'Teams'} />
		</div>
	</div>
</header>
