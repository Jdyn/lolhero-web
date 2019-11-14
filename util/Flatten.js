export default array => array.reduce((flat, next) => flat.concat(next), []);
