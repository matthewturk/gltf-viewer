import { writable } from 'svelte/store';

interface modelInformation {
	url: string;
	name: string;
	position: [number, number, number];
	scale: [number, number, number];
	visible: boolean;
	color: string;
}
export const modelList = writable<modelInformation[]>([
	{
		url: 'wormglbs/poisson.0616.glb',
		name: 'Worm616',
		position: [0, 0, 0],
		scale: [1, 1, 1],
		visible: true,
		color: '#008000'
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
