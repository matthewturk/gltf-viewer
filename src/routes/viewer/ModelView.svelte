<script lang="ts">
	import type { ModelHandler } from '$lib/ModelHandler';
	import { GLTF } from '@threlte/extras';

	export let model: ModelHandler;
	
	const { url, selected, visible, onLoad, scale, positionOffset } = model;

	let position: [number, number, number] = [0, 0, 0];
	let localScale = 1.0;

	$: {
		const curPos = $positionOffset.toArray();
		position = [localScale * curPos[0], localScale * curPos[1], localScale * curPos[2]];
	}
	$: localScale = $scale;

</script>

{#if model && $url}
	<GLTF
		castShadow
		receiveShadow
		bind:position={position}
		bind:scale={localScale}
		url={$url}
		on:load={e => model.onLoad(e)}
		bind:visible={$visible}
		interactivity
		on:click={e => model.toggleSelected()}
	/>
{/if}
