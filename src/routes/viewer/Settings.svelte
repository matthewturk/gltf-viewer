<script lang="ts">
	import ModelSettings from './ModelSettings.svelte';
	import { get } from 'svelte/store';

	import {
		Checkbox,
		Pane,
		ThemeUtils,
		Slider,
		Separator,
		Element,
		Button
	} from 'svelte-tweakpane-ui';
	import { modelList } from '$lib/store';
	import { ModelHandler } from '$lib/ModelHandler';
	import { FileButton } from '@skeletonlabs/skeleton';
	import * as THREE from 'three';

	export let autoRotate: boolean;
	export let enableDamping: boolean;
	export let rotateSpeed: number;
	export let zoomToCursor: boolean;
	export let zoomSpeed: number;
	export let minPolarAngle: number;
	export let maxPolarAngle: number;
	export let enableZoom: boolean;

	async function fileChange(e: any) {
		const newModel = modelList.update((current) => {
			current.push(ModelHandler.fromFileObject(e.target.files[0]));
			return current;
		});
	}
</script>

<Pane theme={ThemeUtils.presets.standard} position="draggable" title="OrbitControls">
	{#each $modelList as model}
		<ModelSettings on:cameraUpdate {model}></ModelSettings>
	{/each}
	<Element>
		<FileButton name="model" label="Add Model" on:change={fileChange} /></Element
	>
	<Separator />
	<Checkbox bind:value={autoRotate} label="autoRotate" />
	<Checkbox bind:value={enableDamping} label="enableDamping" />
	<Checkbox bind:value={enableZoom} label="enableZoom" />
	<Checkbox bind:value={zoomToCursor} label="zoomToCursor" />
	<Slider label="rotateSpeed" bind:value={rotateSpeed} min={0.1} max={2} step={0.1} />
	<Slider label="zoomSpeed" bind:value={zoomSpeed} min={0.1} max={2} step={0.1} />
	<Slider label="minPolarAngle" bind:value={minPolarAngle} min={0} max={Math.PI} step={0.1} />
	<Slider label="maxPolarAngle" bind:value={maxPolarAngle} min={0} max={Math.PI} step={0.1} />
	<Button
		label="debug"
		on:click={() => {
			for (const model of $modelList) {
				const b = new THREE.Box3();
				console.log('debug', model, get(model.bbox).min, get(model.bbox).max);
				if (model.mesh) b.setFromObject(get(model.mesh));
				console.log(model, b.min.toArray(), b.max.toArray());
			}
		}}
	/>
</Pane>
