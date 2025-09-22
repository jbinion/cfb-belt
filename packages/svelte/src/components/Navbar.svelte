<script lang="ts">
	import { page } from '$app/stores';
	$: currentPath = $page.url.pathname;
</script>

<nav class=" flex items-center space-x-8 py-4">
	<a
		href="/"
		class=" flex items-center text-sm font-bold tracking-wide"
		class:border-b-2={currentPath === '/'}
	>
		CFB Belt
	</a>
	<a
		href="/history"
		class=" text-sm font-semibold transition-colors"
		class:border-b-2={currentPath.startsWith('/history')}>History</a
	>
	<a
		href="/teams"
		class=" border-b-2 border-transparent text-sm font-semibold transition-colors"
		class:!border-black={currentPath.startsWith('/teams')}>Teams</a
	>
</nav>
