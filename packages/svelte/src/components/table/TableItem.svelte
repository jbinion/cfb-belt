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
	class={`${collapse && 'w-0'} px-2 py-2  text-sm text-foreground-muted md:px-4 md:py-3 md:text-[15px] ${textEnd && 'text-end'}`}
>
	{@render children()}</td
>
