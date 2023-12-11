// // Import vendor jQuery plugin example
// import '~/app/libs/mmenu/dist/mmenu.js'

document.addEventListener('DOMContentLoaded', () => {

	// Custom JS
	mobMenuToggle()
	stickyHeader()
	switcher()
	brandsSlider()
	assetsSlider()
	teamSlider()
	toggleFaq()
	smoothScroll()
})
function mobMenuToggle () {

	let btn = document.querySelector('.header__navigation-btn-menu')
	let menu = document.querySelector('.header__navigation')
	let header = document.querySelector('.header')
	btn.addEventListener('click', function (e) {
		btn.classList.toggle('active')
		menu.classList.toggle('active')
		header.classList.toggle('active')
	})
}

function stickyHeader () {
	let header = document.querySelector('.header')

	if (document.body.getBoundingClientRect().top < 0) {
		header.classList.add('sticky')
	} else {
		header.classList.remove('sticky')
	}
	
	document.addEventListener('scroll', function () {
		if (document.body.getBoundingClientRect().top < 0) {
			header.classList.add('sticky')
		} else {
			header.classList.remove('sticky')
		}
		
	})
}


function switcher () {
	let switcherContainer = document.querySelectorAll('.switcher')
	let switcherInputLight = document.querySelectorAll('.switcher__input[value="light"]')
	let switcherInputDark = document.querySelectorAll('.switcher__input[value="dark"]')

	let darkTheme = false

	for(let j = 0; j < switcherContainer.length; j++) {
		switcherContainer[j].addEventListener('click', function (e) {
			darkTheme = !darkTheme
			for(let i = 0; i < switcherInputLight.length; i++) {
				switcherInputLight[i].checked = !darkTheme
				switcherInputDark[i].checked = darkTheme
			}
			document.documentElement.setAttribute('data-theme', darkTheme ? 'dark' : 'light')
			switcherImages(darkTheme ? 'dark' : 'light')
		})
	}




	function switcherImages (themeMode) {
		let images = document.querySelectorAll('.multi-mode-img')
		for(let i = 0; i < images.length; i++) {
			if (themeMode === "dark") {
				images[i].setAttribute('src', images[i].dataset.themeDark)
			} else {
				images[i].setAttribute('src', images[i].dataset.themeLight)
			}
		}
	}
}



function brandsSlider() {
	let swiper = new Swiper(".brands-swiper", {
		slidesPerView: 3,
		spaceBetween: 24,
		autoplay: true,
		loop: false,
		speed: 400,
		// navigation: {
		// 	nextEl: ".brands-button-next",
		// 	prevEl: ".brands-button-prev",
		// },

		breakpoints: {
			1200: {
				slidesPerView: 6,
			},
			992: {
				slidesPerView: 4,
			},
			0: {
				slidesPerView: 3
			},
		}
	});
}
function teamSlider() {
	let swiper = new Swiper(".team-swiper", {
		slidesPerView: 4,
		spaceBetween: 24,
		autoplay: true,
		loop: false,
		navigation: {
			nextEl: ".team-button-next",
			prevEl: ".team-button-prev",
		},

		breakpoints: {
			1200: {
				slidesPerView: 4,
			},
			992: {
				slidesPerView: 3,
			},
			376: {
				slidesPerView: 2
			},
			0: {
				slidesPerView: 1
			},
		}
	});
}



function assetsSlider() {
	let swiper2 = new Swiper(".assets-swiper", {
		slidesPerView: 1,
		noSwiper: false,
		speed: 400,
		autoHeight: true,
	});



	let items = document.querySelectorAll('.assets__hash-item')
	let activeHash
	for (let i = 0; i < items.length; i++) {
		items[i].addEventListener('click', function () {
			swiper2.slideTo(i, 400)
		})
	}
	swiper2.on('slideChange', function () {
		document.querySelector('.assets__hash-item.active').classList.remove('active')
		for (let i = 0; i < items.length; i++) {
			if (i === swiper2.activeIndex) {
				items[i].classList.add('active')
			}
		}
		// swiper.slideTo(swiper2.activeIndex, 400)
	});
}

function toggleFaq() {
	let items = document.querySelectorAll('.faq__item-btn')
	let activeItem
	for (let i = 0; i < items.length; i++) {
		items[i].addEventListener('click', function (e) {
			if (e.currentTarget.parentElement.parentElement !== activeItem && !!activeItem) {
				activeItem.classList.remove('active')
			}
			if (e.currentTarget.parentElement.parentElement.classList.contains('active')) {
				e.currentTarget.parentElement.parentElement.classList.remove('active')
			} else {
				e.currentTarget.parentElement.parentElement.classList.add('active')
				activeItem = e.currentTarget.parentElement.parentElement
			}
		})
	}
}
function smoothScroll() {
	let linkNav = document.querySelectorAll('[href^="#"]')
	let headerHeight = document.querySelector('.header').getBoundingClientRect().height
	let V = 0.2;
	for (let i = 0; i < linkNav.length; i++) {
		linkNav[i].addEventListener('click', function (e) { //по клику на ссылку
			e.preventDefault(); //отменяем стандартное поведение
			let w = window.pageYOffset // производим прокрутка прокрутка
			let hash = this.href.replace(/[^#]*(.*)/, '$1');
			let tar = document.querySelector(hash) // к id элемента, к которому нужно перейти
			let t = tar.getBoundingClientRect().top - headerHeight
			let start = null;

			requestAnimationFrame(step); // подробнее про функцию анимации [developer.mozilla.org]
			function step(time) {
				if (start === null) {
					start = time;
				}
				var progress = time - start,
					r = (t < 0 ? Math.max(w - progress / V, w + t) : Math.min(w + progress / V, w + t));
				window.scrollTo(0, r);
				if (r != w + t) {
					requestAnimationFrame(step)
				} else {
					location.hash = hash // URL с хэшем
				}
			}
			if (t > 1 || t < -1) {
				requestAnimationFrame(step)
			}
		});
	}
}