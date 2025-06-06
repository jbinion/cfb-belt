<script lang="ts">
	import { page } from '$app/stores';
	$: data = $page.data;
</script>

<nav class="bg-navBackground text-white shadow-md">
	<div class="content flex items-center justify-between py-2">
		<a
			href="/"
			class="text-accent flex items-center text-lg font-bold tracking-wide transition-colors hover:text-white"
		>
			CFB-Belt
		</a>
		<div class="flex gap-4">
			<a href="/teams" class="hover:text-accent transition-colors">Belt Holders</a>
			<a href="/history" class="hover:text-accent transition-colors">Reigns</a>
		</div>
	</div>
</nav>
