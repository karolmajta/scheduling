const I = require('immutable');
const data = require('./data');
const validations = require('./validations');

assignments = data.generateAssignments();
validations.validateAssignmentsSet(assignments, data.subjects);

const displayData = I.List(assignments.toKeyedSeq().sortBy(p => I.List(p).get(0)).values());
console.log(JSON.stringify(displayData.map(slots => { return slots.map(s => s.block).sortBy(b => b.subject); }).toJS(), null, 2));
