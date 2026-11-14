<script lang="ts">
	import GameTableHeader from './GameTableHeader.svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();
</script>

<tr>
	<td colspan="4" class="px-8">
		<table class="w-full divide-y divide-border bg-background-secondary">
			<GameTableHeader />
			<tbody class="divide-y divide-border">
				{@render children()}
			</tbody>
		</table>
	</td>
</tr>
