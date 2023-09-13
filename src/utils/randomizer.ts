export function makeRandomSmallString(prefix?: string) {
  return Math.random().toString(36).replace('0.', prefix || '')
}

export function makeUUIDv4() {
  //@ts-ignore
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}