export default async function () {
    return new Promise((resolve, reject) => {
        if (typeof window.CKEDITOR !== 'undefined'){
            resolve()
        }
        let scriptTag = document.getElementById("ckeditor-script") || null
        const handler = () => {
            scriptTag.removeEventListener('load', handler);
            resolve()
        };
        if (!scriptTag) {
            try {
                scriptTag = document.createElement('script');
                scriptTag.referrerPolicy = 'origin';
                scriptTag.type = 'application/javascript';
                scriptTag.id = 'ckeditor-script';
                scriptTag.src = "https://cdn.ckeditor.com/4.22.1/full/ckeditor.js";
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