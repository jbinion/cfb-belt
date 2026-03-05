<script>
	export let value = '';
	export let title = '';
</script>

<div
	class="flex flex-col items-center justify-center border-border px-3 py-4 [&:not(:last-child)]:border-r-[1px]"
>
	<p class="mb-1 text-2xl font-bold tracking-tight text-foreground">
		{value}
	</p>
	<p class="text-sm font-semibold uppercase tracking-wider text-foreground-muted">
		{title}
	</p>
</div>
