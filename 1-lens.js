'use strict';

const getter = prop => obj => obj[prop];
const setter = prop => (value, obj) => ({ ...obj, [prop]: value });

const lens = (getter, setter) => ({
	get: obj => getter(obj),
	set: (val, obj) => setter(val, obj),
});

// Usage

const nameLens = lens(getter('name'), setter('name'));

console.dir({ nameLens });