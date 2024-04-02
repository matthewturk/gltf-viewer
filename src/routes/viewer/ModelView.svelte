<script lang="ts">
	import { GLTF } from '@threlte/extras';
    import * as THREE from 'three';
    let position: [number, number, number] = [0, 0, 0];
    let scale: [number, number, number] = [1, 1, 1];

function onLoad(payload: GLTF & { materials: Record<string, THREE.Material>, nodes: Record<string, THREE.Object3D> }) {
    let bbox = new THREE.Box3().setFromObject(payload.nodes['mesh_0']);
    console.log(bbox);
    const unitaryScale = Math.max(bbox.max.x - bbox.min.x, bbox.max.y - bbox.min.y, bbox.max.z - bbox.min.z);
    position = [-(bbox.max.x + bbox.min.x)/(2 * unitaryScale),
                -(bbox.max.y + bbox.min.y)/(2 * unitaryScale),
                -(bbox.max.z + bbox.min.z)/(2 * unitaryScale)];
    scale = [1.0 / unitaryScale, 1.0 / unitaryScale, 1.0 / unitaryScale];
}

$: console.log(position);
$: console.log(scale);

</script>

<GLTF
  castShadow
  receiveShadow
  url={'poisson.0616.glb'}
  on:load={onLoad}
  {scale}
  {position}
/>