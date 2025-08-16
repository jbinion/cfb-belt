<script lang="ts">
	import { page } from '$app/stores';
	$: currentPath = $page.url.pathname;
</script>

<nav class="text-foreground-muted flex items-center justify-between py-4">
	<a
		href="/"
		class="hover:text-foreground flex items-center text-sm font-bold tracking-wide"
		class:text-foreground={currentPath === '/'}
	>
		CFB Belt
	</a>
	<div class="flex gap-8">
		<a
			href="/history"
			class=" hover:text-foreground text-sm font-semibold transition-colors"
			class:text-foreground={currentPath.startsWith('/history')}>History</a
		>
		<a
			href="/teams"
			class=" hover:text-foreground text-sm font-semibold transition-colors"
			class:text-foreground={currentPath.startsWith('/teams')}>Teams</a
		>
	</div>
</nav>
