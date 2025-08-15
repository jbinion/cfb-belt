<script lang="ts">
	import { page } from '$app/stores';
	$: data = $page.data;
</script>

<nav class="content flex items-center justify-between py-4 text-black">
	<a href="/" class=" flex items-center text-sm font-bold tracking-wide"> CFB Belt </a>
	<div class="flex gap-8">
		<a href="/history" class=" text-sm font-semibold transition-colors">History</a>
		<a href="/teams" class=" text-sm font-semibold transition-colors">Teams</a>
	</div>
</nav>
