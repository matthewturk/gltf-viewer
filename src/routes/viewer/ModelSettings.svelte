<script lang="ts">
	import { Folder, Text, Checkbox, Color, Point, Slider, Button } from 'svelte-tweakpane-ui';
	import { ModelHandler } from '$lib/ModelHandler';
	import { get } from 'svelte/store';
	import * as THREE from 'three';

	export let model: ModelHandler;

	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function lookAt(e) {
		const modelPositionInScene = new THREE.Box3().setFromObject(get(model.model));
		const modelCenterInScene = modelPositionInScene.getCenter(new THREE.Vector3());
		const cameraPosition = modelCenterInScene
			.clone()
			.add(modelPositionInScene.max.clone().multiplyScalar(0.5));

		dispatch('cameraUpdate', {
			newPosition: cameraPosition,
			newLookAt: modelCenterInScene
		});
	}

	let { visible, name, url, color, positionOffset, scale } = model;
</script>

<Folder bind:title={$name}>
	<Checkbox bind:value={$visible} label="Visible" />
	<Text bind:value={$name} label="Name" />
	<Text bind:value={$url} label="URL" />
	<Color bind:value={$color} label="Color" />
	<Point bind:value={$positionOffset} disabled={true} label="Position" />
	<Slider
		bind:value={$scale}
		disabled={true}
		format={(value) => value.toExponential()}
		label="Scale"
	/>
	<Button label="Look At" on:click={lookAt} />
</Folder>
