<script>
	export let value = '';
	export let title = '';
</script>

<div
	class="flex flex-col items-center justify-center space-y-1 border-border px-3 py-4 [&:not(:last-child)]:border-r-[1px]"
>
	<p class="text-sm font-bold tracking-tight text-foreground sm:text-2xl">
		{value}
	</p>
	<p class="text-xs font-semibold uppercase tracking-wider text-foreground-muted">
		{title}
	</p>
</div>
