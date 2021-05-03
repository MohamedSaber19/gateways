export default function generateUniqueID() {
  return Math.floor(new Date().valueOf() * Math.random());
}
