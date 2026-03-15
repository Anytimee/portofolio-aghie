<script lang="ts">
	import type { Snippet } from "svelte";

	interface Props {
		class?: string;
		children: Snippet;
	}

	let { class: className, children, ...restProps }: Props = $props();
</script>

<button class={className} {...restProps}>
	{@render children()}
</button>
