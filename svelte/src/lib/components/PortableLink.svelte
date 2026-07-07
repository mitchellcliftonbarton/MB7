<script>
	// Custom Portable Text `link` mark. Opens in a new tab so following a link
	// from an entry doesn't navigate away from the site. Mirrors the default
	// component's href resolution (href/url/link/value).
	let { portableText, children } = $props();

	let href = $derived.by(() => {
		const { href, url, link, value } = portableText.value ?? {};
		return href || url || link || value;
	});
</script>

{#if typeof href === 'string'}
	<a {href} target="_blank" rel="noopener noreferrer">{@render children?.()}</a>
{:else}
	{@render children?.()}
{/if}
