export function getAllIndexes(arr, val) {
  let indexes = [];
  arr.forEach((item, i) => {
    if (item === val) {
      indexes.push(i)
    }
  })
  return indexes;
}
