<script>
    import { onMount } from "svelte";

    export let src = "";
    export let alt = "";
    export let className = "";
    export let width = "100%";
    export let height = "100%";

    let canvas;
    let ctx;
    let img;
    let loaded = false;

    onMount(() => {
        if (canvas && src) {
            ctx = canvas.getContext("2d");
            img = new Image();
            img.crossOrigin = "anonymous";
            img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                loaded = true;
            };
            img.onerror = () => {
                console.error("Failed to load image:", src);
            };
            img.src = src;
        }
    });

    function preventDefault(e) {
        e.preventDefault();
        return false;
    }
</script>

<canvas
    bind:this={canvas}
    class={className}
    style="width: {width}; height: {height}; object-fit: cover;"
    {alt}
    role="img"
    aria-label={alt}
    on:contextmenu={preventDefault}
    on:dragstart={preventDefault}
    on:copy={preventDefault}
/>

<style>
    canvas {
        display: block;
        user-select: none;
        -webkit-user-drag: none;
        pointer-events: auto;
    }
</style>
