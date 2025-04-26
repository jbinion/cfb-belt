<script lang="ts">
	import { page } from '$app/stores';
	import Link from './Link.svelte';
	$: data = $page.data;
</script>

<header class="bg-[#1f2122] text-white shadow-md">
	<div class="container space-y-8 py-12 text-center">
		<a href="/">
			<h1 class=" mb-2 text-start uppercase tracking-wide text-white md:text-center">
				<span class="!text-start !text-xl text-[var(--color-gold)]">The<br /></span> College Football
				Belt
			</h1>
			<p class="text-start font-semibold text-[var(--color-gold)] md:text-center">
				Tracking the lineal championship of college football
			</p>
		</a>

		<div class="mx-auto flex w-full max-w-md flex-col gap-6">
			<Link dest="/teams" value={data.teamCount} title="Belt Holders" />
			<Link dest="/history" value={data.totalReigns} title="Reigns" />
			<Link dest="/history" value={data.totalGames} title="Total Games" />
		</div>
	</div>
</header>
