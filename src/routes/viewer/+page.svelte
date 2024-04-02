<script lang="ts">
	import { Canvas } from '@threlte/core';
	import Scene from './Scene.svelte';
	import Settings from './Settings.svelte';
	let showBox = false;
	let autoRotate: boolean = false;
	let enableDamping: boolean = true;
	let rotateSpeed: number = 1;
	let zoomToCursor: boolean = false;
	let zoomSpeed: number = 1;
	let minPolarAngle: number = 0;
	let maxPolarAngle: number = Math.PI;
	let enableZoom: boolean = true;
	let newUrl: string = "";
	let modelUrl: string = 'https://girder.hub.yt/api/v1/file/660c2f336f90214666a84b8e/download';
</script>

<div class="w-1/5 h-16">
	<input type="checkbox" bind:checked={showBox} class="m-2 checkbox" />
	<input type="text" bind:value={newUrl} class="m-2 input" />
	<button type="button" on:click={() => modelUrl = newUrl} class="m-2 btn variant-filled">Load</button>
</div>
<div class="w-full h-full min-h-[512px]">
	<Canvas>
		<Scene
			{showBox}
			{enableDamping}
			{autoRotate}
			{rotateSpeed}
			{zoomToCursor}
			{zoomSpeed}
			{minPolarAngle}
			{maxPolarAngle}
			{enableZoom}
		/>
	</Canvas>
</div>

<Settings
	bind:enableDamping
	bind:autoRotate
	bind:rotateSpeed
	bind:zoomToCursor
	bind:zoomSpeed
	bind:minPolarAngle
	bind:maxPolarAngle
	bind:enableZoom
/>