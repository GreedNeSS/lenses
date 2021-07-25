'use strict';

const view = (lens, obj) => lens.get(obj);
const set = (lens, val, obj) => lens.set(val, obj);
const over = (lens, map, obj) => lens.set(map(lens.get(obj)), obj);
const remove = (lens, obj) => lens.delete(obj);

const lens = (source, destination = source) => ({
	get: obj => obj[source],
	set: (val, obj) => ({ ...obj, [destination]: val }),
	delete: obj => {
		const { [destination]: forgot, ...other } = obj;
		return other;
	}
});

// Usage

const person = {
	name: 'Marcus Aurelius',
	city: 'Rome',
	born: 121,
};

const upper = s => s.toUpperCase();

console.log('\nExample 1\n');

const nameLens = lens('name');

console.log('View name:', view(nameLens, person));
console.log('Set name:', set(nameLens, 'Marcus', person));
console.log('Over name:', over(nameLens, upper, person));

console.log('\nExample 2\n');

const renameLens = lens('name', 'personName');

console.log('View name:', view(renameLens, person));
console.log('Set name:', set(renameLens, 'Marcus', person));
console.log('Over name:', over(renameLens, upper, person));

console.log('\nExample 3\n');

const exampleLens = lens('name');

console.log('Remove name:', remove(exampleLens, person));
