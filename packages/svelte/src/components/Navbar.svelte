<script lang="ts">
	import { page } from '$app/stores';
	$: data = $page.data;
</script>

<nav class="">
	<div class="content flex items-center justify-between py-4">
		<a href="/" class=" flex items-center text-lg font-bold tracking-wide"> CFB Belt </a>
		<div class="flex gap-8">
			<a href="/history" class=" text-sm font-semibold transition-colors">History</a>
			<a href="/teams" class=" text-sm font-semibold transition-colors">Teams</a>
		</div>
	</div>
</nav>
