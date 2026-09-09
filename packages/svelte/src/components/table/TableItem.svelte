<script lang="ts">
	import type { Snippet } from 'svelte';
	interface Props {
		textEnd?: boolean;
		collapse?: boolean;
		children: Snippet;
	}

	let { textEnd = false, collapse = false, children }: Props = $props();
</script>

<td
	class={`${collapse && 'w-0'} px-4 py-3 text-[15px] text-foreground-muted ${textEnd && 'text-end'}`}
>
	{@render children()}</td
>
