export default async function () {
    return new Promise((resolve, reject) => {
        if (typeof window.L !== 'undefined'){
            resolve()
        }
        let scriptTag = document.getElementById("leaflet-script") || null
        let styleTag = document.getElementById("leaflet-style") || null
        const handler = () => {
            scriptTag.removeEventListener('load', handler);
            resolve()
        };
        if (!scriptTag) {
            try {
                scriptTag = document.createElement('script');
                scriptTag.src = "https://unpkg.com/leaflet@1.7.1/dist/leaflet.js",
                scriptTag.crossorigin = "anonymous",
                scriptTag.async = true,
                scriptTag.referrerPolicy = 'origin';
                scriptTag.type = 'application/javascript';
                scriptTag.id = 'leaflet-script';
                scriptTag.addEventListener('load', handler);
                document.head.appendChild(scriptTag);
                styleTag = document.createElement('link');

                styleTag.rel = "stylesheet",
                styleTag.href = "https://unpkg.com/leaflet@1.7.1/dist/leaflet.css",
                styleTag.crossorigin = "anonymous",
                styleTag.id = 'leaflet-style';
                document.head.appendChild(styleTag);


            } catch (error) {
                reject(error)
            }
        } else {
            scriptTag.addEventListener('load', handler);
        }
    })
}
