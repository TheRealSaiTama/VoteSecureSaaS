document.addEventListener('DOMContentLoaded', function() {
    const cookieBanner = document.getElementById('cookie-consent-banner');
    const acceptCookiesBtn = document.getElementById('accept-cookies');
    const rejectCookiesBtn = document.getElementById('reject-cookies');

    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
    }

    function getCookie(name) {
        const nameEQ = `${name}=`;
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    const consent = getCookie('cookieConsent');
    if (consent === 'accepted' || consent === 'rejected') {
        cookieBanner.classList.add('hidden');
    } else {
        cookieBanner.classList.remove('hidden');
    }

    acceptCookiesBtn.addEventListener('click', function() {
        setCookie('cookieConsent', 'accepted', 365);
        cookieBanner.classList.add('hidden');
    });

    rejectCookiesBtn.addEventListener('click', function() {
        setCookie('cookieConsent', 'rejected', 365);
        cookieBanner.classList.add('hidden');
    });
});
