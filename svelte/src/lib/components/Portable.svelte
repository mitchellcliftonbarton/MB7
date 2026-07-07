<script>
	import { PortableText } from '@portabletext/svelte';
	import PortableLink from '$lib/components/PortableLink.svelte';

	const { value } = $props();

	// render link marks as new-tab anchors (see PortableLink)
	const components = {
		marks: { link: PortableLink },
	};
</script>

<PortableText {value} {components} />
