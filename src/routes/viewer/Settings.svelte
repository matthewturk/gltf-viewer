<script lang="ts">
	import { Color, Folder, Checkbox, Pane, ThemeUtils, Slider, Separator, AutoValue } from 'svelte-tweakpane-ui';
	import { modelList } from '$lib/store';

	export let autoRotate: boolean;
	export let enableDamping: boolean;
	export let rotateSpeed: number;
	export let zoomToCursor: boolean;
	export let zoomSpeed: number;
	export let minPolarAngle: number;
	export let maxPolarAngle: number;
	export let enableZoom: boolean;
let color = '#ffffff';

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
