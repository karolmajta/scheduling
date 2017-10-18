const I = require('immutable');
const data = require('./data');
const validations = require('./validations');

const users = I.List(I.Range().take(276));
let assignments = data.generateAssignments(users);
validations.validateAssignmentsSet(assignments, data.subjects);

const displayData = I.List(assignments.toKeyedSeq().sortBy(p => I.List(p).get(0)).values());
console.log(JSON.stringify(displayData.map(slots => { return slots.map(s => s.block).sortBy(b => b.subject); }).toJS(), null, 2));
