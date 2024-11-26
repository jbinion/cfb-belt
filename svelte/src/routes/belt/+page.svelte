<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	console.log(data);
</script>

<div class="mt-24">
	<h1>CFB Belt</h1>
	<div class=" flex flex-row space-x-24">
		<div class="sticky top-0 flex-1">
			<p>
				This is a <a href="https://svelte.dev/docs/kit">SvelteKit</a> app. You can make your own by typing
				the following into your command line and following the prompts:
			</p>

			<pre>npx sv create</pre>

			<p>
				The page you're looking at is purely static HTML, with no client-side interactivity needed.
				Because of that, we don't need to load any JavaScript. Try viewing the page's source, or
				opening the devtools network panel and reloading.
			</p>

			<p>
				The <a href="/sverdle">Sverdle</a> page illustrates SvelteKit's data loading and form handling.
				Try using it with JavaScript disabled!
			</p>
		</div>

		<div class="flex-1">
			{#if data}
				<ul class="divide-y">
					{#each data.data as item}
						<li class="p-2">{item}</li>
					{/each}
				</ul>
			{/if}
		</div>
	</div>
</div>
