'use strict';

const getter = prop => obj => obj[prop];
const setter = prop => (value, obj) => ({ ...obj, [prop]: value });

const set = (lens, val, obj) => lens.set(val, obj);

const lens = (getter, setter) => ({
	get: obj => getter(obj),
	set: (val, obj) => setter(val, obj),
});

// Usage

const person = {
	name: 'Marcus Aurelius',
	city: 'Rome',
	born: 121,
};

const nameLens = lens(getter('name'), setter('name'));

console.log('Set name:', set(nameLens, 'Marcus', person));
console.dir({ person });