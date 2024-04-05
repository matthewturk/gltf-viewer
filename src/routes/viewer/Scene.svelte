<script lang="ts">
	import { T, useThrelte } from '@threlte/core';
	import { interactivity, Gizmo, OrbitControls } from '@threlte/extras';
	import ModelView from './ModelView.svelte';
	import * as THREE from 'three';
	import { modelList, sceneBbox } from '$lib/store';
	import { onMount } from 'svelte';
	import { ModelHandler } from '$lib/ModelHandler';

	export let cameraUpdate: (event: Event & {detail: {newPosition: THREE.Vector3, newLookAt: THREE.Vector3} }) => void;	

	onMount(() => {
		cameraUpdate = (event) => {
			const { newPosition, newLookAt } = event.detail;
			lookAt = { x: newLookAt.x, y: newLookAt.y, z: newLookAt.z}
			position = newPosition.toArray();
			orbitTarget = newLookAt.toArray();
		};
		modelList.update((current) => {
			current.push(
				ModelHandler.fromUrl('https://girder.hub.yt/api/v1/file/660c2f336f90214666a84b8e/download')
			);
			return current;
		});
	});

	interactivity();
	export let autoRotate: boolean;
	export let enableDamping: boolean;
	export let rotateSpeed: number;
	export let zoomToCursor: boolean;
	export let zoomSpeed: number;
	export let minPolarAngle: number;
	export let maxPolarAngle: number;
	export let enableZoom: boolean;
	modelList.subscribe((list) => {
		const newBbox = new THREE.Box3().makeEmpty();
		for (const modelHandler of $modelList) {
			modelHandler.unsub = modelHandler.model.subscribe((model) => {
				if (model) {
					modelHandler.updateBbox(newBbox);
					if (modelHandler.unsub) {
						modelHandler.unsub();
						modelHandler.unsub = undefined;
					}
					$sceneBbox = newBbox;
				}
			});
		}
	});
	let position: [number, number, number] = [1, 0.5, 1];
	let orbitTarget: [number, number, number] = [0, 0.0, 0];
	let lookAt = { x: 0, y: 0.0, z: 0 };
</script>

<T.PerspectiveCamera makeDefault {position} bind:target={lookAt}>
	<OrbitControls
		{enableDamping}
		{autoRotate}
		{rotateSpeed}
		{zoomToCursor}
		{zoomSpeed}
		{minPolarAngle}
		{maxPolarAngle}
		{enableZoom}
		bind:target={orbitTarget}
		bind:cursor={orbitTarget}
	/>
</T.PerspectiveCamera>

<Gizmo horizontalPlacement="left" paddingX={20} paddingY={20} />
<T.DirectionalLight position.x={1} position.y={1} position.z={1} />
<T.AmbientLight intensity={0.7} />
<T.GridHelper args={[1.0, 10]} />

<!-- {#if $sceneBbox && !$sceneBbox.isEmpty()}
	<T.Box3Helper args={[$sceneBbox]} />
{/if} -->

{#each $modelList as model}
	<ModelView {model} />
{/each}
