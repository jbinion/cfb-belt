<script lang="ts">
	import { page } from '$app/stores';
	$: currentPath = $page.url.pathname;
</script>

<nav class="bg-background sticky top-0 z-50 border-b-[1px] border-gray-200 py-3">
	<div class="container">
		<div class="flex items-center justify-between">
			<a href="/" class="text-lg font-semibold uppercase tracking-tight text-foreground">
				CFB Belt
			</a>
			<ul class="space-x-8">
				<a
					href="/lineage"
					class=" text-sm font-medium text-foreground-muted transition-colors hover:text-foreground"
					class:!border-black={currentPath.startsWith('/lineage')}>Lineage</a
				>
				<a
					href="/teams"
					class="text-sm font-medium text-foreground-muted transition-colors hover:text-foreground"
					class:!border-black={currentPath.startsWith('/teams')}>Teams</a
				>
			</ul>
		</div>
	</div>
</nav>
