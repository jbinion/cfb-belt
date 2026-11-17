<script lang="ts">
	interface Props {
		title: string;
		value: string;
	}

	let { title = '', value = '' }: Props = $props();
</script>

<div class="flex flex-1 flex-col justify-center p-4">
	<p class="text-[11px] tracking-wide text-foreground-muted uppercase">{title}</p>
	<p class="font-mono text-base">
		{value}
	</p>
</div>
