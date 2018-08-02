/**!
 Visual Navigation
 Dropdown menu & Mega menu navigation

 @contributors: Guillaume Focheux (Alsacréations), Geoffrey Crofte (Alsacréations), Rodolphe (Alsacréations)
 @date-created: 2015-04-10
 @last-update: 2015-06-01
 */

;
(function($) {

  // Variables
  var $burger = $('.sb-menu-trigger'),
    $mainNav = $('.main-navigation'),
    $closeNav = $('.mn-menu-toclose'),
    $linkInMenu = $(' .mn-item-lvl-1 > .mn-link', $mainNav),
    $headerline = $('.site-banner'),
    menuInitPos = $headerline.outerHeight(), //gc
    scrolltimer; // gc

  // Open navigation
  $burger.on('click', function(e) {
    $mainNav.addClass('mn-visible');
    $('#overlay').addClass('is-open');
  });

  // Close navigation
  $closeNav.on('click', function(e) {
    $mainNav.removeClass('mn-visible');
    // Reset other is-open
    $mainNav.find('.is-open').removeClass('is-open');
    $('#overlay').removeClass('is-open');
  });

  // Hide/show submenus with pointer
  $linkInMenu.on('click', function(e) {
    var $liSelected = $(this).parent('.mn-item-lvl-1');
    $('li', $mainNav).removeClass('is-open');

    if ($liSelected.hasClass('mn-item-has-submenu')) {
      $liSelected.addClass('is-open');
    }
    $(this).parent('.mn-menu-lvl1').addClass('submenu-is-open');
  });

  // Open navigation when clicking outside (on the overlay)
  $('#overlay').on('click', function() {
    $closeNav.trigger('click');
  });

  // Sticky things on scroll (gc)
  window.addEventListener('scroll', function() {
    clearTimeout(scrolltimer);
    scrolltimer = setTimeout(function() {

      if ($(window).scrollTop() >= menuInitPos) {
        $headerline.addClass('is-stuck');
      } else {
        $headerline.removeClass('is-stuck');
      }

    }, 15);
  }, true);

})(jQuery);
