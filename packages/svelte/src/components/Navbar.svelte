<script lang="ts">
	import { page } from '$app/stores';
	$: currentPath = $page.url.pathname;
</script>

<nav class=" flex items-center space-x-8 py-4">
	<a
		href="/"
		class="flex items-center border-b-2 border-transparent text-sm font-bold tracking-wide"
		class:border-black={currentPath === '/'}
	>
		CFB Belt
	</a>
	<a
		href="/history"
		class=" border-b-2 border-transparent text-sm font-semibold transition-colors"
		class:border-black={currentPath.startsWith('/history')}>Lineage</a
	>
	<a
		href="/teams"
		class=" border-b-2 border-transparent text-sm font-semibold transition-colors"
		class:!border-black={currentPath.startsWith('/teams')}>Teams</a
	>
</nav>
