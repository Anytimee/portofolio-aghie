<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { cn } from "$lib/utils";

	type Props = HTMLAttributes<HTMLDivElement>;

	let { class: className, ...restProps }: Props = $props();
</script>

<div class={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)} {...restProps}>
	<slot />
</div>
