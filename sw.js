const staticCacheName = "cache-v1";
const assets = ["/", "/index.html"];

self.addEventListener("install", (e) => {
    console.log("service install");
});

self.addEventListener("fetch", (event) => {
   console.log("récupérée "+event.request.url)
});

self.addEventListener("activate", (e) => {
    console.log("service activate");
});
