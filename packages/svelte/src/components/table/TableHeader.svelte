<script lang="ts">
	interface Props {
		title: string;
		textEnd?: boolean;
	}

	let { title, textEnd = false }: Props = $props();
</script>

<th
	class={`px-4 py-3 text-xs font-semibold uppercase tracking-wide text-foreground-muted ${textEnd ? 'text-end' : 'text-left'}`}
	>{title}</th
>
