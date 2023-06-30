var external_link = window.location.hash.substring(1);
var external_hostname = window.location.hostname;
var external_p = document.getElementById('external-link');

external_p.innerHTML=external_p.innerHTML.replace('<link>',external_link).replace('<link>',external_link.split('?')[0]);