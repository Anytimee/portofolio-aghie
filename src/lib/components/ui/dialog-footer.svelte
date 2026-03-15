<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { cn } from "$lib/utils";

	type Props = HTMLAttributes<HTMLDivElement>;

	let { class: className, ...restProps }: Props = $props();
</script>

<div
	class={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}
	{...restProps}
>
	<slot />
</div>
