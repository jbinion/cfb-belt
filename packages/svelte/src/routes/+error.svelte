<script lang="ts">
	import { page } from '$app/state';
</script>

<div class="mx-auto flex max-w-xl flex-col items-center gap-4 px-4 py-24 text-center">
	<h1 class="text-4xl font-bold">{page.status}</h1>
	<p class="text-lg">
		{page.status === 404
			? "We couldn't find that page."
			: (page.error?.message ?? 'Something went wrong.')}
	</p>
	<a href="/" class="underline">Return</a>
</div>
