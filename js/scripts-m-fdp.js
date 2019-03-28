;(function($, window, document, undefined) {
	var $win = $(window);
	var $doc = $(document);
	var controls = '<div class="slider-actions"><a href="#" class="pagin-grids-prev"><i class="ico-arrow-left"></i></a><a href="#" class="pagin-grids-next"><i class="ico-arrow-right"></i></a></div>'
	var pentagonFirst = '<svg width="90" height="90" viewBox="-1 0 101 100"><defs><clipPath id="shape';
	var pentagonSecond = '"><path d="M20,0 L80,0 L100,60 L50,100 L0,60z" /></clipPath></defs>';
	var num = 1;

	// Init slider
	function initSlider($selector, time) {
		$selector.unwrap();

		$.fn.swipe.defaults.excludedElements = 'button, input, select, textarea, .noSwipe';

		if ($selector.closest('.tpsfort').length || $selector.closest('.master').length || $selector.closest('.section-tabs').length || $selector.closest('.list-articles.univers').length) {
			$selector
				.closest('.cxp-pagination, .inside, .section-head, .list-articles.univers')
				.append(controls);

			$win.on('resize', function(){
				fixHeight();
			});
		}

		$selector.carouFredSel({
			auto: time,
			width: '100%',
			responsive: true,
			items: {
				visible: 1
			},
			swipe: {
				onTouch: true
			},
			scroll: {
				duration: 500,
			},
			pagination: {
				container: $selector.parent().find('.slider-pagin')
			},
			prev: {
				button: $selector.closest('.block, .section-head').find('.pagin-grids-prev')
			},
			next: {
				button: $selector.closest('.block, .section-head').find('.pagin-grids-next')
			}
		});
	}

	// Inits slider lemag
	function initSliderSec($selector) {
		$selector
			.closest('.lemag')
			.find('.list-grids-with-pagin')
			.append('<div class="slider-holder"><div class="slider-paging"/></div>');

		$selector.find('.gla-item:first-child').each(function(){
			var imageSrc = $('img', this).attr('src');
			var image = '<image clip-path="url(#shape' + (num) + ')" xlink:href="' + imageSrc + '" width="100%" height="100%"></image></svg>';

			$('> a', this).addClass('pentagon').prepend(pentagonFirst + (num++) + pentagonSecond + image);

			$(this).next('.gla-item').addClass('square');
		});

		$selector
			.find('.square img')
			.wrap('<div class="shape"/>');

		$selector.carouFredSel({
			items: 1,
			auto: 5000,
			width: '100%',
			responsive: true,
			scroll: {
				fx: 'crossfade'
			},
			swipe: {
				onTouch: true,
				onMouse: false
			},
			pagination: {
				container: $selector.closest('.lemag').find('.slider-paging')
			}
		});

		$selector
			.closest('.lemag')
			.find('.slider-holder')
			.append('<a href="/Le-Mag" class="link-secondary">Accéder au Mag...</a>');
	}

	// datecounter
	function eventDays($element) {
		var date = new Date();
		var eventDate = new Date($element.data('date'));
		var timeDiff = Math.abs(date.getTime() - eventDate.getTime());
		var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
		var prefix = $element.data('prefix') || 'j-';
		$element.text(prefix + diffDays);
	};

	function fixBG() {
		var imgSrc;

		$('.list-articles.full .la-item').each(function(){
			imgSrc = $('.la-item-img', this).attr('src');

			$(this).css({
				'backgroundImage': 'url(' + imgSrc + ')'
			});
		});
	}

	function fixHeight() {
		var hght = 0;

		$('.tpsfort .gla-item').each(function(){
			$(this).height('auto');

			if ($('a', this).outerHeight() > hght) {
				hght = $('a', this).outerHeight();
			}
		});

		$('.tpsfort .grid-la-list, .tpsfort .caroufredsel_wrapper').outerHeight(hght);
	}

	function shapes($selector, pentagonIndx, squareIndx) {
		$selector
			.children()
			.addClass('shapes');

		$selector.find('.shapes:nth-child(' + pentagonIndx + ')').each(function(){
			var imageSrc = $('img', this).attr('src');
			var image = '<image clip-path="url(#shape' + (num) + ')" xlink:href="' + imageSrc + '" width="100%" height="100%"></image></svg>';

			if ($('> a', this).length) {
				$('> a', this).prepend(pentagonFirst + (num++) + pentagonSecond + image);
			} else {
				$(this).prepend(pentagonFirst + (num++) + pentagonSecond + image);
			}
		});

		$selector
			.find('.shapes:nth-child(' + squareIndx + ')')
			.addClass('square');

		$selector
			.find('.square img')
			.wrap('<div class="shape"/>');
	}

	$doc.ready(function() {
		if ( $('.catal-prd-title').length ) {
			$('.catal-prd-title').append('<p class="title-actions" />')

			$('.catal-prd-title')
				.find('> a')
				.detach()
				.appendTo('.catal-prd-title .title-actions')
		}

		$win.on('load', function(){
			if ( $('.catal-ed-main-desc').length ) {
				$('.catal-ed-main-desc').append('<a href="#" class="btn-expand">Lire la suite</a>')
			}

			if ( $('.catal-prd-main-desc').length ) {
				$('.catal-prd-main-desc').append('<a href="#" class="btn-expand">Lire la suite</a>')
			}

			if ( $('.catal-ex-item-buttons-small').length ) {
				$('.catal-ex-item-buttons-small').each(function() {
					var $this = $(this)

					$this
						.find('.btn-primary')
						.clone()
						.insertAfter( $this.parent().find('.catal-ex-item-stand') )


				})
			}

			if ( $('body.marque .catal-ex-item-buttons-small').length ) {
				$('.catal-ex-item-buttons-small').each(function() {
					var $this = $(this)

					$this
						.find('.btn-primary')
						.clone()
						.insertAfter( $this.parent().find('.msl-brand-ex') )


				})
			}

			

			$('.btn-expand').on('click', function(e) {
				e.preventDefault();
				
				$(this).parent().toggleClass('expanded')
			})


			$('.event-days').each(function() {
				eventDays($(this));
			});

			if ($('.list-articles.full').length && !$('body.lemag').length) {
				initSlider($('.list-articles.full .slider-content'), 5000);
				fixBG();
			}

			if ($('.parcours').length && !$('body.lemag').length) {
				initSlider($('.parcours .grid-la-list'), 5000);
			}

			if ($('.lemag').length && !$('body.lemag').length) {
				initSliderSec($('.lemag .grid-la-list'));
			}

			if ($('.tpsfort').length && !$('body.lemag').length) {
				initSlider($('.tpsfort .grid-la-list'), 5000);
			}

			if ($('.master').length && !$('body.lemag').length) {
				initSlider($('.master .slider-content'), 5000);
			}

			if ($('.section-tabs').length && !$('body.lemag').length) {
				initSlider($('.counters-secondary'), false);
			}
			if ($('.list-articles.univers').length && !$('body.lemag').length) {
				initSlider($('.list-articles.univers .slider-content'), 5000);
			}

			if ($('body.lemag').length) {
				shapes($('#zone2 .list-articles:first-child .la-list'), '3n + 1', 3);
			}
		});

		// Socials 
		$('.link-toggle').on('click', function(e){
			e.preventDefault();

			$(this)
				.closest('.social-sharing')
				.toggleClass('active');
		});

		// Navigation toggles
		$('.mn-menu a').on('click', function(e){
			if ($(this).next('ul').length) {
				e.preventDefault();

				$(this)
					.closest('.mn-menu-item')
					.siblings()
					.find('.active')
					.removeClass('active');

				$(this).next().toggleClass('active');
			}
		});
	});
})(jQuery, window, document);
