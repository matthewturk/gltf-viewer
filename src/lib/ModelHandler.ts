import { GLTF } from '@threlte/extras';
import * as THREE from 'three';
import { sceneBbox } from './store';
import { writable, type Writable, get, type Unsubscriber } from 'svelte/store';

export class ModelHandler {
	public url: Writable<string> = writable('');
	public name: Writable<string> = writable('Model');
	public color: Writable<string> = writable('#008000');
	public selected: Writable<boolean> = writable(false);
	public visible: Writable<boolean> = writable(true);
	public model: Writable<THREE.Object3D> = writable();
	public mesh: Writable<THREE.Mesh> = writable();
	public material: Writable<THREE.MeshStandardMaterial> = writable();
	public scale: Writable<number> = writable(1);
	public positionOffset: Writable<THREE.Vector3> = writable(new THREE.Vector3());
	public bbox: Writable<THREE.Box3> = writable(new THREE.Box3().makeEmpty());
    public unsub?: Unsubscriber;

	constructor(url: string, name: string, color: string) {
		this.url.set(url);
		this.name.set(name);
		this.color.set(color);
	}

	public toggleSelected() {
		this.selected.set(!get(this.selected));
	}

	public static fromFileObject(file: File): ModelHandler {
		return new ModelHandler(URL.createObjectURL(file), file.name, '#008000');
	}

	public static fromUrl(url: string): ModelHandler {
		return new ModelHandler(url, 'Model', '#008000');
	}

	public scaleFromBbox(bbox: THREE.Box3): void {
		const size = new THREE.Vector3();
		bbox.getSize(size);
		const max = Math.max(size.x, size.y, size.z);
		this.scale.set(1 / max);
	}

	public centerInBbox(bbox: THREE.Box3): void {
		const center = new THREE.Vector3();
		bbox.getCenter(center);
		center.multiplyScalar(-1);
		this.positionOffset.set(center);
	}

	public updateBbox(bbox: THREE.Box3): void {
		if (get(this.model) == null) return;
		bbox.union(get(this.bbox));
	}

	public updateColor(color: string): void {
		if (get(this.material) == null) return;
		get(this.material).color.set(color);
	}

	public onLoad(
		payload: GLTF & {
			materials: Record<string, THREE.Material>;
			nodes: Record<string, THREE.Object3D>;
		}
	): void {
		if (payload.nodes['mesh_0'] == null) {
			console.error('No mesh found in gltf');
			return;
		}
        const model = payload.nodes['mesh_0']
		if (payload.nodes['mesh_0'].type == 'Mesh') {
			const mesh = model as THREE.Mesh;
			this.mesh.set(model as THREE.Mesh);
			if (mesh.material instanceof THREE.MeshStandardMaterial) {
				this.material.set(mesh.material as THREE.MeshStandardMaterial);
				this.color.subscribe((color) => this.updateColor(color));
			}
		}
		get(this.bbox).setFromObject(model);
		sceneBbox.subscribe((sceneBbox) => this.centerInBbox(sceneBbox));
		sceneBbox.subscribe((sceneBbox) => this.scaleFromBbox(sceneBbox));
		this.model.set(model);
	}
}
