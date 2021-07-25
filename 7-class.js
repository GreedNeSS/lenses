'use strict';

class Lens {
	constructor(source, destination = source) {
		this.source = source;
		this.destination = destination;
	}

	get(obj) {
		return obj[this.source];
	}

	set(val, obj) {
		if (this.source === this.destination) {
			return { ...obj, [this.destination]: val }
		} else {
			const res = { ...obj, [this.destination]: val };
			const { [this.source]: forgot, ...other } = res;
			return other;
		}
	}

	delete(obj) {
		const { [this.source]: forgot, ...other } = obj;
		return other;
	}

	static from(source, destination) {
		return new Lens(source, destination);
	}

	static view(lens, obj) {
		return lens.get(obj);
	}

	static set(lens, val, obj) {
		return lens.set(val, obj);
	}

	static over(lens, map, obj) {
		return lens.set(map(lens.get(obj)), obj);
	}

	static remove(lens, obj) {
		return lens.delete(obj);
	}
}

// Usage

const person = {
	name: 'Marcus Aurelius',
	city: 'Rome',
	born: 121,
};

const upper = s => s.toUpperCase();

console.log('\nExample 1\n');

const nameLens = Lens.from('name');

console.log('View name:', Lens.view(nameLens, person));
console.log('Set name:', Lens.set(nameLens, 'Marcus', person));
console.log('Over name:', Lens.over(nameLens, upper, person));
console.log('Remove name:', Lens.remove(nameLens, person));

console.log('\nExample 2\n');

const renameLens = Lens.from('name', 'personName');

console.log('View name:', Lens.view(renameLens, person));
console.log('Set name:', Lens.set(renameLens, 'Marcus', person));
console.log('Over name:', Lens.over(renameLens, upper, person));
console.log('Remove name:', Lens.remove(renameLens, person));