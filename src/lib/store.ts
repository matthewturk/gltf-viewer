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
		url: 'https://girder.hub.yt/api/v1/file/660c2f336f90214666a84b8e/download',
		name: 'Worm',
		position: [0, 0, 0],
		scale: [1, 1, 1],
		visible: true,
		color: '#000000'
	}
]);
