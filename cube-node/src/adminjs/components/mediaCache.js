let cache = null;
let pending = null;
let cacheTime = 0;
const TTL = 30000; // 30 seconds

export function getMedia() {
  if (cache && Date.now() - cacheTime < TTL) {
    return Promise.resolve(cache);
  }
  if (pending) {
    return pending; // deduplicate concurrent calls
  }
  pending = fetch('/api/media?limit=200')
    .then((res) => res.json())
    .then((data) => {
      cache = data.docs || [];
      cacheTime = Date.now();
      pending = null;
      return cache;
    })
    .catch(() => {
      pending = null;
      return cache || [];
    });
  return pending;
}

export function invalidateMedia() {
  cache = null;
  cacheTime = 0;
}
