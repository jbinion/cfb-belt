<!--
	Shows a kickoff time in the viewer's time zone.

	The page is prerendered, and hydration does not patch mismatched text, so the first
	render (build + hydration) must be identical: it uses Eastern time. After mount it
	re-renders in the viewer's zone. The zone name is always shown, so both are accurate.
-->
<script lang="ts">
	import { onMount } from 'svelte';
	import { GAME_TIME_ZONE, isKickoffTba } from '../utils/formatDate';

	interface Props {
		iso: string;
		options?: Intl.DateTimeFormatOptions;
	}

	let { iso, options }: Props = $props();

	let mounted = $state(false);
	onMount(() => (mounted = true));

	const tba = $derived(isKickoffTba(iso));

	const text = $derived.by(() => {
		if (tba) {
			// No real time: show the Eastern game day, which must not shift with the viewer's zone.
			const { year, month, day, weekday } = options ?? {};
			const date = new Date(iso).toLocaleDateString('en-US', {
				year,
				month,
				day,
				weekday,
				timeZone: GAME_TIME_ZONE,
			});
			return `${date} · TBA`;
		}
		return new Date(iso).toLocaleString('en-US', {
			...options,
			timeZoneName: 'short',
			// undefined = the viewer's own time zone
			timeZone: mounted ? undefined : GAME_TIME_ZONE,
		});
	});
</script>

<time datetime={iso}>{text}</time>
