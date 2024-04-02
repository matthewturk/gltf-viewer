<script lang="ts">
    import { T, useTask } from '@threlte/core';
    import {interactivity, Gizmo, OrbitControls } from '@threlte/extras';
    import ModelView from './ModelView.svelte';
    let rotation = 0;
    export let showBox = false;

    useTask((delta) => {
        rotation += delta;
    });
    interactivity();
    export let autoRotate: boolean
  export let enableDamping: boolean
  export let rotateSpeed: number
  export let zoomToCursor: boolean
  export let zoomSpeed: number
  export let minPolarAngle: number
  export let maxPolarAngle: number
  export let enableZoom: boolean

</script>
<T.PerspectiveCamera
  makeDefault
  position={[10, 5, 10]}
  lookAt.y={0.5}
>
  <OrbitControls
    {enableDamping}
    {autoRotate}
    {rotateSpeed}
    {zoomToCursor}
    {zoomSpeed}
    {minPolarAngle}
    {maxPolarAngle}
    {enableZoom}
  />
</T.PerspectiveCamera>

<Gizmo
  horizontalPlacement="left"
  paddingX={20}
  paddingY={20}
/>
<T.DirectionalLight
  position.y={10}
  position.z={10}
/>
<T.AmbientLight intensity={0.3} />
<T.GridHelper args={[10, 10]} />

{#if showBox}
<T.Mesh rotation.y={rotation}>
    <T.BoxGeometry />
    <T.MeshBasicMaterial/>
</T.Mesh>
{/if}

<ModelView/>