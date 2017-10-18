const assert = require('assert');
const I = require('immutable');

function validateAssignmentsSet(assignments, allSubjects) {
  // no 2 users share the same slot;
  let slotHist = I.Map();
  assignments.forEach((a, u) => slotHist = slotHist.update(a, I.Set(), (s) => s.add(u)));
  assert(I.List(slotHist.values()).map((v) => v.size).every((count) => count == 1));

  I.List(assignments.toKeyedSeq()).sortBy(p => I.List(p).get(0)).forEach((p) => {
    const timetable = I.List(p).get(1);

    // user is assigned to all subjects and is assigned to only one block of given subject
    const subjectList = timetable.reduce((r, v) => r.push(v.block.subject), I.List());
    assert(I.Set(subjectList).equals(allSubjects));
    assert(subjectList.size == I.Set(subjectList).size);

    // user does never have more than one subject at the same time
    const weekList = timetable.reduce((r, v) => r.concat(I.List(v.block.modules)), I.List());
    assert(weekList.size == I.Set(weekList).size);
  });
}

module.exports = {
  validateAssignmentsSet: validateAssignmentsSet
};
