export default defineNuxtPlugin((nuxtApp) => {
    const path = '../lib/backgroundCheck.min.js';
    const script = document.createElement('script');
    script.src = path;
    document.head.appendChild(script);
});
