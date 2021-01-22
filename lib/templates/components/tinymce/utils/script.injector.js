export default async function () {
    return new Promise((resolve, reject) => {
        let scriptTag = document.getElementById("tinymce-script") || null
        const handler = () => {
            scriptTag.removeEventListener('load', handler);
            resolve()
        };
        if (!scriptTag) {
            try {
                scriptTag = document.createElement('script');
                scriptTag.referrerPolicy = 'origin';
                scriptTag.type = 'application/javascript';
                scriptTag.id = 'tinymce-script';
                scriptTag.src = "https://cdn.tiny.cloud/1/no-api-key/tinymce/5/tinymce.min.js";
                scriptTag.async = true
                scriptTag.addEventListener('load', handler);
                document.head.appendChild(scriptTag);
            } catch (error) {
                reject(error)
            }
        } else {
            scriptTag.addEventListener('load', handler);
        }
    })
}
