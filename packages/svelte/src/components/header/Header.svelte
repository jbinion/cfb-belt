<script lang="ts">
	import { page } from '$app/stores';
	import Link from './Link.svelte';
	$: data = $page.data;
</script>

<header class="bg-navBackground pb-12 pt-6 text-white shadow-md">
	<div class="content space-y-8 text-center">
		<a href="/">
			<h1 class=" mb-2 text-start uppercase tracking-wide text-white md:text-center">
				<span class="text-accent !text-start !text-xl">The<br /></span> College Football Belt
			</h1>
			<p class="text-accent text-start font-semibold md:text-center">
				Tracking the lineal championship of college football
			</p>
		</a>

		<div class="mx-auto flex w-full max-w-md flex-col gap-4">
			<Link dest="/teams" value={data.teamCount} title="Belt Holders" />
			<Link dest="/history" value={data.totalReigns} title="Reigns" />
			<!-- <Link dest="/history" value={data.totalGames} title="Total Games" /> -->
		</div>
	</div>
</header>
