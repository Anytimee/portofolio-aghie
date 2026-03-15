<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { cn } from "$lib/utils";

	type Props = HTMLAttributes<HTMLHeadingElement>;

	let { class: className, ...restProps }: Props = $props();
</script>

<h3 class={cn("text-2xl font-semibold leading-none tracking-tight", className)} {...restProps}>
	<slot />
</h3>
