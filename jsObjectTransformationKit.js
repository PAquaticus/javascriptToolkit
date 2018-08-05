/**
 * Iterates over elements in object and if they are element of the
 * 'rerootables' packs them as children of Newroot object
 * Example:
 * {
 * a : "rerootme1",
 * b : "rerootme2",
 * c : "not Element of rerootables"
 * }
 * rerootables = ['a', 'b'], nameOfNewroot = "ab"
 * {
 * ab : {
 *        a : "rerootme1",
 *        b : "rerootme2"
 *      }
 * c : "not Element of rerootables"
 * }
 * @param  {object} objectRoot
 * @param  {array} rerootables
 * @param  {string} nameOfNewroot
 * @return {object} objectRoot
 */
function rerootElements(objectRoot, rerootables, nameOfNewroot) {
  parentNames = Object.keys(objectRoot);

  for (parentIndex = 0; parentIndex < parentNames.length; parentIndex++) {
    parentObject = objectRoot[parentNames[parentIndex]];
    if (typeof parentObject == 'object') {
      keys = Object.keys(parentObject);
      newObject = {};
      newroot = {};
      for (i=0; i<keys.length; i++) {
        if (rerootables.includes(keys[i])) {
          newroot[keys[i]] = parentObject[keys[i]];
        } else {
          newObject[keys[i]] = parentObject[keys[i]];
        }
      }
      if (Object.keys(newroot).length > 0) {
        newObject[nameOfNewroot] = newroot;
        objectRoot[parentNames[parentIndex]] = newObject;
      }
    }
  }
  return objectRoot;
}

// Testing area TODO: refactor this to actual testfiles
rerootables= ['a', 'b', 'c'];
dummyobject = {parent: {
      a: 'Reroot me A',
      b: 'Reroot me B',
      c: 'Reroot me C',
      d: 'Dont reroot me D'},
    parent2: {
      d: 'Dont reroot me D'},
    parent3: {
      a: 'Reroot me A',
      b: 'Reroot me B',
      c: 'Reroot me C',
      somechild: {
        a: 'Dont rerootme',
        b: 'Dont rerootme'},
    },
     parent4: 'Dont reroot me Parent4',
};

dummyobject = rerootElements(dummyobject, rerootables, 'abc');
console.log(dummyobject);
