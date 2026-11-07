<script lang="ts">
	interface Props {
		teamName?: string;
	}

	let { teamName = '' }: Props = $props();
</script>

<div class="flex flex-col justify-center p-4">
	<p class="text-[11px] font-semibold uppercase tracking-wide">Current Belt Holder</p>

	<h3 class="font-heading text-2xl font-bold leading-tight">
		{teamName}
	</h3>
	<p class="foreground-muted text-sm">Beat UCF 41-9 on Oct 30, 2026</p>
</div>
