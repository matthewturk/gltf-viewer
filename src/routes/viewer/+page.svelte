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
</script>

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