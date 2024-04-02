<script lang="ts">
	import { GLTF } from '@threlte/extras';
	import * as THREE from 'three';
	let position: [number, number, number] = [0, 0, 0];
	let scale: [number, number, number] = [1, 1, 1];
	export let url: string = '';
	export let visible = true;
	export let color = '#ffffff';

	let selected: boolean = false;
	let model: THREE.Object3D | undefined = undefined;
	let mesh: THREE.Mesh | undefined = undefined;
	let material: THREE.MeshStandardMaterial | undefined = undefined;

	$: if (mesh?.material instanceof THREE.MeshStandardMaterial) {
		material = mesh.material;
	}

	$: if (material) {
		material.color.set(selected ? '#ff0000' : color);
	}

	function onLoad(
		payload: GLTF & {
			materials: Record<string, THREE.Material>;
			nodes: Record<string, THREE.Object3D>;
		}
	) {
		if (payload.nodes['mesh_0'] == null) {
			console.error('No mesh found in gltf');
			return;
		}
		model = payload.nodes['mesh_0'];
		if (payload.nodes['mesh_0'].type == 'Mesh') {
			console.log('Model', model);
			mesh = model as THREE.Mesh;
		}
		let bbox = new THREE.Box3().setFromObject(model);
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
			selected = !selected;
		}}
	/>
{/if}
