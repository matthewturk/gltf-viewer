import { writable } from 'svelte/store';
import { type ModelHandler } from './ModelHandler';
import * as THREE from 'three';

export const sceneBbox = writable<THREE.Box3>(new THREE.Box3().makeEmpty());
export const modelList = writable<ModelHandler[]>([
]);
/*
	{
		url: 'wormglbs/poisson.0616.glb',
		name: 'Worm616',
		position: [0, 0, 0],
		scale: [1, 1, 1],
		visible: true,
		color: '#008000',
	},
	{
		url: 'wormglbs/poisson.0885.glb',
		name: 'Worm885',
		position: [0, 0, 0],
		scale: [1, 1, 1],
		visible: true,
		color: '#000090'
	},
	{
		url: 'wormglbs/poisson.1068.glb',
		name: 'Worm1068',
		position: [0, 0, 0],
		scale: [1, 1, 1],
		visible: true,
		color: '#900000'
	},
]);

*/