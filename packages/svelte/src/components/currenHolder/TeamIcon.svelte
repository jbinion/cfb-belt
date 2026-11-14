<script lang="ts">
	interface Props {
		color?: string;
		logoFile?: string;
		teamName?: string;
	}

	let { color = 'E4E4E7', logoFile = '', teamName = '' }: Props = $props();
</script>

<div class="shrink-0 rounded-lg p-3" style="background-color: #{color}18">
	<img src={`/webp/large/${logoFile}.webp`} alt={`logo of ${teamName}`} class="h-20 w-20" />
</div>
