// load different languages for menu items
const nav_links = document.querySelectorAll('.nav-item .nav-link');
nav_links.forEach(function(nav_link) {
	const href= nav_link.getAttribute('href');
	if (href=='index.html') {
		nav_link.innerHTML=set_languages('about','Über das Projekt','sobre o projeto');
	}
	if (href=='projects.html') {
		nav_link.innerHTML=set_languages('projects','Projekte','projetos');
	}
	if (href=='publications.html') {
		nav_link.innerHTML=set_languages('publicat&shy;ions','Publika&shy;tionen','publica&shy;ções');
	}
	if (href=='talks.html') {
		nav_link.innerHTML=set_languages('talks','Vorträge','apresent&shy;ações');
	}
	if (href=='partners.html') {
		nav_link.innerHTML=set_languages('partners','Partner','parceiro');
	}
	if (href=='blog.html') {
		nav_link.innerHTML=set_languages('blog','Blog','blog');
	}
	if (href=='contact.html') {
		nav_link.innerHTML=set_languages('contact','Kontakt','contato');
	}
	if (href=='privacy.html') {
		nav_link.innerHTML=set_languages('privacy','Daten&shy;schutz','proteção dos dados');
	}

	//make this internal links loadable with js
	nav_link.addEventListener('click', function(event) {

		event.preventDefault();

		// set active class for nav_links
		const nav_links = document.querySelectorAll('.nav-item .nav-link');
		nav_links.forEach(function(nav_link) {nav_link.parentNode.classList.remove('active')});
		console.log(event.target.parentNode.getAttribute('href'));
		event.target.parentNode.parentNode.classList.add('active');

		// set page title
		const page_title = document.querySelector('.page-title');
		page_title.innerHTML=event.target.parentNode.innerHTML; 

		// load page
		fetch(event.target.parentNode.getAttribute('href'))
		.then(response => response.text())
  		.then(html => {

			const page = document.createElement('div');
			// Set the HTML content of the div
			page.innerHTML = html;

			// Retrieve the element by its ID
			const content_center = page.querySelector('.content-center');
			const content_right = page.querySelector('.content-right');

    		// Insert the HTML content into an element
    		document.querySelector('.content-center').innerHTML=content_center.innerHTML;
    		document.querySelector('.content-right').innerHTML=content_right.innerHTML;
			const newURL = event.target.parentNode.getAttribute('href');
			const pageTitle = 'DINOBBIO - '+ event.target.innerHTML;
			console.log(pageTitle)
			document.querySelector('title').innerHTML=pageTitle;
			// Add the new URL to the browser's history
			history.pushState(null, pageTitle, newURL);


 		})
  		.catch(error => {
    		console.error('Error loading HTML:', error);
		});
	});



});

function set_languages(en,de,pt) {
	return '<span class="en">'+en+'</span><span class="de">'+de+'</span><span class="pt">'+pt+'</span>';
}

// add different languages to page title
const active_nav_link = document.querySelector('.nav-item.active .nav-link');
const page_title = document.querySelector('.page-title');
if (active_nav_link) {
	page_title.innerHTML=active_nav_link.innerHTML; 
}

// this part will select language acording on click of language selector in top menu
const lang_selectors = document.querySelectorAll('#language .nav-item');
lang_selectors.forEach(function(lang) {

  lang.addEventListener('click', function(event) {
  
		// set active class for language selectors
		const lang_selectors = document.querySelectorAll('#language .nav-item');
		lang_selectors.forEach(function(lang) {lang.classList.remove('active')});
		event.target.classList.add('active');
		
		// switch language
		const lang_script = document.querySelector('style');
		lang_script.innerHTML='.'+event.target.innerHTML+' {display:block}';
		
		// add language link to nav-links
		const nav_links = document.querySelectorAll('.nav-item .nav-link');
		nav_links.forEach(function(nav_link) {
			const href= nav_link.getAttribute('href').split('?');
			nav_link.setAttribute('href',href[0]+'?lang='+event.target.innerHTML)

		});
		const newURL = window.location.href.split('?')[0]+'?lang='+event.target.innerHTML;
		const pageTitle = 'DINOBBIO - '+ document.querySelectorAll('.page-title .active');
		console.log(pageTitle)
		document.querySelector('title').innerHTML=pageTitle;
		// Add the new URL to the browser's history
		history.pushState(null, pageTitle, newURL);


  });
});

// if lang parameter is set in url than trigger click on this

console.log(window.location.href.split('?')[1]);

if (window.location.href.split('?')[1]=='lang=de') {
	const clickEvent = new Event('click');
	const lang_selectors = document.querySelectorAll('#language .nav-item');
	lang_selectors.forEach(function(lang) {if (lang.innerHTML=='de') {lang.dispatchEvent(clickEvent)}});
}
if (window.location.href.split('?')[1]=='lang=pt') {
	const clickEvent = new Event('click');
	const lang_selectors = document.querySelectorAll('#language .nav-item');
	lang_selectors.forEach(function(lang) {if (lang.innerHTML=='pt') {lang.dispatchEvent(clickEvent);}});
}

// slider background images

setTimeout(function() {
	

	setInterval(function() {
	
		var nr = document.querySelector('.title').getAttribute('slide-nr');
		if (nr==null) nr=1;
		nr++; if (nr==4) nr=1;
		document.querySelector('.title').setAttribute('slide-nr',nr);
		document.querySelector('.title').setAttribute('class','col-8 title nr'+nr);
		document.querySelector('.title').removeAttribute('style');
	}, 5000);
  

  }, 10000);
  

