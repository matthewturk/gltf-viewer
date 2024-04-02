<script lang="ts">
	import { GLTF } from '@threlte/extras';
	import * as THREE from 'three';
	let position: [number, number, number] = [0, 0, 0];
	let scale: [number, number, number] = [1, 1, 1];
	export let url: string = '';
	export let visible = true;
	export let color = "#ffffff";

	$: console.log('url', url);

	function onLoad(
		payload: GLTF & {
			materials: Record<string, THREE.Material>;
			nodes: Record<string, THREE.Object3D>;
		}
	) {
		let bbox = new THREE.Box3().setFromObject(payload.nodes['mesh_0']);
		console.log(bbox);
		const unitaryScale = Math.max(
			bbox.max.x - bbox.min.x,
			bbox.max.y - bbox.min.y,
			bbox.max.z - bbox.min.z
		);
		position = [
			-(bbox.max.x + bbox.min.x) / (2 * unitaryScale),
			-(bbox.max.y + bbox.min.y) / (2 * unitaryScale),
			-(bbox.max.z + bbox.min.z) / (2 * unitaryScale)
		];
		scale = [1.0 / unitaryScale, 1.0 / unitaryScale, 1.0 / unitaryScale];
	}

	$: console.log(position);
	$: console.log(scale);
	let selected = false;

</script>

{#if url}
	<GLTF
		castShadow
		receiveShadow
		{url}
		on:load={onLoad}
		{scale}
		{position}
		{visible}
		interactivity
		on:click={(e) => {
			console.log(e.object.material.color);
			selected = !selected;
			e.object.material.color.set(selected ? color : '#ff0000');
		}}
	/>
{/if}
