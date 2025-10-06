<script lang="ts">
	export let href = '';
	export let text = '';
</script>

<a
	{href}
	class="rounded bg-zinc-800 px-6 py-2 text-center text-lg font-semibold text-zinc-100 shadow-md transition hover:bg-zinc-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-zinc-400"
>
	{text}
</a>
