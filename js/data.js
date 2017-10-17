const I = require('immutable');

const I1 = "choroby wewnetrzne";
const I2 = "choroby wewnetrzne - kardiologia";
const C = "chirurgia";
const R = "medycyna ratunkowa";
const P = "pediatria";
const M = "medycyna rodzinna";
const G = "ginekologia";
const S = "psychiatria";

const M1 = "2.10-13.10";
const M2 = "16.10-27.10";
const M3 = "30.10-14.11";
const M4 = "15.11-28.11";
const M5 = "29.11-12.12";
const M6 = "13.12-4.01";
const M7 = "5.01-18.01";
const M8 = "22.01-23.02";
const M9 = "26.02-9.03";
const M10 = "12.03-23.03";
const M11 = "26.03-11.04";
const M12 = "12.04-25.04";
const M13 = "26.04-14.05";
const M14 = "15.05-28.05";
const M15 = "29.05-13.06";

const Block = new I.Record({subject: null, modules: null, availableSlots: null});
const Slot = new I.Record({slotId: null, block: null});

const b = (s, m, a) => new Block({subject: s, modules: I.Set(m), availableSlots: a});
const s = (i, b) => new Slot({slotId: i, block: b});

const blocks = I.List.of(
  b(I1, [M2, M3, M4], 24), b(I1, [M1, M3, M4], 24), b(I1, [M13, M14, M15], 24),
  b(I1, [M11, M14, M15], 12), b(I1, [M12, M14, M15], 12), b(I1, [M6, M7, M8], 24),
  b(I1, [M5, M7, M8], 24), b(I1, [M10, M12, M13], 24), b(I1, [M11, M12, M13], 12),
  b(I1, [M9, M12, M3], 12), b(I1, [M6, M9, M10], 24), b(I1, [M5, M6, M7], 12),
  b(I1, [M8, M10, M11], 12), b(I1, [M1, M2, M5], 12), b(I1, [M1, M4, M5], 12),
  b(I1, [M1, M2, M3], 12),

  b(I2, [M1], 24), b(I2, [M2], 24), b(I2, [M12], 24), b(I2, [M13], 24), b(I2, [M5], 24),
  b(I2, [M6], 24), b(I2, [M11], 24), b(I2, [M10], 24), b(I2, [M7], 24), b(I2, [M8], 12),
  b(I2, [M9], 12), b(I2, [M3], 24), b(I2, [M4], 12),

  b(C, [M9, M10], 48), b(C, [M5, M6], 48), b(C, [M1, M2], 48), b(C, [M3, M4], 48),
  b(C, [M14, M15], 48), b(C, [M12, M13], 36),

  b(R, [M11], 24), b(R, [M15], 12), b(R, [M5], 24), b(R, [M10], 24), b(R, [M4], 24),
  b(R, [M12], 24), b(R, [M9], 24), b(R, [M8], 24), b(R, [M6], 24), b(R, [M1], 24),
  b(R, [M3], 24), b(R, [M7], 24),

  b(P, [M6, M7], 48), b(P, [M2, M3], 48), b(P, [M10, M11], 48), b(P, [M12, M13], 48),
  b(P, [M8, M9], 36),

  b(M, [M5], 24), b(M, [M11], 24), b(M, [M4], 24), b(M, [M10], 24), b(M, [M9], 24),
  b(M, [M12], 24), b(M, [M7], 24), b(M, [M8], 24), b(M, [M3], 24), b(M, [M1], 24),
  b(M, [M14], 12), b(M, [M6], 24),

  b(G, [M14], 24), b(G, [M13], 24), b(G, [M11], 24), b(G, [M8], 24), b(G, [M3], 24),
  b(G, [M15], 24), b(G, [M2], 24), b(G, [M7], 24), b(G, [M4], 12), b(G, [M5], 24),
  b(G, [M10], 24), b(G, [M6], 24),

  b(S, [M1], 24), b(S, [M2], 12), b(S, [M3], 24), b(S, [M4], 24), b(S, [M6], 24),
  b(S, [M8], 24), b(S, [M9], 24), b(S, [M10], 24), b(S, [M11], 12), b(S, [M12], 12),
  b(S, [M13], 24), b(S, [M14], 24), b(S, [M15], 24)
);

const slots = I.Set(blocks.flatMap(b => I.Range().take(b.availableSlots).map(i => s(i+1, b))));

const users = I.List(I.Range().take(276));
const subjects = I.Set.of(I1, I2, C, R, P, M, G, S);

const generateAssignments = function () {
  let assignments = I.Map();
  let availableSlots = I.List(slots).sort((s1, s2) => {
    if (s1.block.modules.size > s2.block.modules.size) {
      return -1;
    } else if (s1.block.modules.size < s2.block.modules.size) {
      return 1;
    } else {
      return Math.random();
    }
  });
    
  users.forEach(user => {
    let assignment = I.List();
    
    
        let userAvailableSlots = I.List(availableSlots);
        let possibleAssignment = I.List();
        while (userAvailableSlots.size > 0) {
          let pickedSlot = userAvailableSlots.first();
          possibleAssignment = possibleAssignment.push(pickedSlot);
          userAvailableSlots = userAvailableSlots.filter((s) => {
            let allTakenModules = I.Set();
       	    possibleAssignment.forEach((a) => allTakenModules = allTakenModules.union(a.block.modules));
	    let allTakenSubjects = I.Set(possibleAssignment.map(a => a.block.subject));
	    return allTakenModules.intersect(s.block.modules).size == 0 && !allTakenSubjects.has(s.block.subject);
          });
        }
        availableSlots = availableSlots.shift();
        assignment = possibleAssignment;

    assignments = assignments.set(user, assignment);
  });

  return assignments;
}

module.exports = {
  slots: slots,
  users: users,
  subjects: subjects,
  generateAssignments: generateAssignments,
};
