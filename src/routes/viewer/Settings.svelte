<script lang="ts">
	import {
		Folder,
		Checkbox,
		Pane,
		ThemeUtils,
		Slider,
		Separator,
		AutoValue,
		Element
	} from 'svelte-tweakpane-ui';
	import { modelList } from '$lib/store';
	import { FileButton } from '@skeletonlabs/skeleton';

	export let autoRotate: boolean;
	export let enableDamping: boolean;
	export let rotateSpeed: number;
	export let zoomToCursor: boolean;
	export let zoomSpeed: number;
	export let minPolarAngle: number;
	export let maxPolarAngle: number;
	export let enableZoom: boolean;
	let color = '#ffffff';

	async function fileChange(e) {
		modelList.update((current) => {
			current.push({
				url: URL.createObjectURL(e.target.files[0]),
				name: `Model ${$modelList.length + 1}`,
				visible: true,
				//name: e.target.files[0].name,
				color: '#000000',
				position: [0, 0, 0],
				scale: [0, 0, 0]
			});
			return current;
		});
	}
</script>

<Pane theme={ThemeUtils.presets.standard} position="draggable" title="OrbitControls">
	{#each $modelList as model}
		<Folder bind:title={model.name}>
			<AutoValue bind:value={model.visible} label="Visible" />
			<AutoValue bind:value={model.name} label="Name" />
			<AutoValue bind:value={model.url} label="URL" />
			<AutoValue bind:value={model.color} label="Color" />
		</Folder>
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
</Pane>
