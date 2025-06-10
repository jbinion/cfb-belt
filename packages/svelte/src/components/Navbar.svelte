<script lang="ts">
	import { page } from '$app/stores';
	$: data = $page.data;
</script>

<nav class="bg-navBackground text-white">
	<div class="content flex items-center justify-between py-4">
		<a
			href="/"
			class="text-accent flex items-center text-lg font-bold tracking-wide transition-colors hover:text-white"
		>
			CFB-Belt
		</a>
		<div class="flex gap-8">
			<a href="/history" class="hover:text-accent text-sm font-semibold transition-colors"
				>History</a
			>
			<a href="/teams" class="hover:text-accent text-sm font-semibold transition-colors">Teams</a>
		</div>
	</div>
</nav>
