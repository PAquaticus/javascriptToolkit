function rerootElements(objectRoot, rerootables, nameOfNewroot){
  parentsNames = Object.keys(objectRoot); 
  for(parentIndex = 0; parentIndex < parentsNames.length; parentIndex++){
    var parentObject = objectRoot[parentsNames[parentIndex]];
    if (typeof parentObject == "object"){
      keys = Object.keys(parentObject);
      var newObject = {};
      var newroot = {}; 
      for (i=0; i<keys.length; i++){
        if (rerootables.includes(keys[i])){
          newroot[keys[i]] = parentObject[keys[i]];
        }
        else {
          newObject[keys[i]] = parentObject[keys[i]];
        }
      }    
      if (Object.keys(newroot).length > 0){
        newObject[nameOfNewroot] = newroot;
        objectRoot[parentsNames[parentIndex]] = newObject; 
      }
    }
  }
  return objectRoot;
}

// testing area - TODO: refactor this into a proper testing file
var rerootables= ["a","b","c"];
var dummyobject = {parent: {
      a : "stu", 
      b : "stub", 
      c : "stuc",
      d : "stuffX"},
    parent2:{
      d :"nope"},
    parent3:{
      a : "hans",
      b : "PEter",
      c : "hannes"
    },
     parent4: "parent4"
}

dummyobject = rerootElements(dummyobject, rerootables, "alph")
console.log(dummyobject)
