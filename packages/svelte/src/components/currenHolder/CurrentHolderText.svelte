<script lang="ts">
	interface Props {
		teamName?: string;
	}

	let { teamName = '' }: Props = $props();
</script>

<div class="flex flex-col justify-center p-4">
	<p class="text-[11px] font-semibold uppercase tracking-wide text-foreground-muted">
		Current Holder
	</p>

	<h3 class="font-heading text-3xl font-bold leading-tight">
		{teamName}
	</h3>
	<p class="text-sm text-foreground-muted">Beat UCF 41-9 on Oct 30, 2026</p>
</div>
