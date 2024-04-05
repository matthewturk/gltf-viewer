<script lang="ts">
	import { Canvas} from '@threlte/core';
	import * as THREE from 'three';
	import Scene from './Scene.svelte';
	import Settings from './Settings.svelte';
	let autoRotate: boolean = false;
	let enableDamping: boolean = true;
	let rotateSpeed: number = 1;
	let zoomToCursor: boolean = false;
	let zoomSpeed: number = 1;
	let minPolarAngle: number = 0;
	let maxPolarAngle: number = Math.PI;
	let enableZoom: boolean = true;

	let cameraUpdate: (event: Event & {detail: {newPosition: THREE.Vector3, newLookAt: THREE.Vector3} }) => void;

</script>

<div class="w-full h-dvh">
	<Canvas>
		<Scene
			bind:cameraUpdate={cameraUpdate}
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
	on:cameraUpdate={(e) => cameraUpdate(e)}
	bind:enableDamping
	bind:autoRotate
	bind:rotateSpeed
	bind:zoomToCursor
	bind:zoomSpeed
	bind:minPolarAngle
	bind:maxPolarAngle
	bind:enableZoom
/>