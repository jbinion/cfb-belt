<script lang="ts">
	let { value = '', title = '' } = $props();
</script>

<div class="flex flex-col justify-center space-y-1 border-border px-6 py-4">
	<p class="text-sm font-bold tracking-tight text-foreground sm:text-2xl">
		{value.toLocaleString()}
	</p>
	<p class="text-xs font-bold uppercase tracking-wider text-foreground-muted">
		{title}
	</p>
</div>
