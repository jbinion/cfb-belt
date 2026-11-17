<script lang="ts">
	let { value = '', title = '' } = $props();
</script>

<div class="flex flex-col justify-center space-y-1 px-6 py-4">
	<p class="text-sm font-bold tracking-tight text-foreground sm:text-2xl">
		{value.toLocaleString()}
	</p>
	<p class="text-xs font-bold tracking-wider text-foreground-muted uppercase">
		{title}
	</p>
</div>
