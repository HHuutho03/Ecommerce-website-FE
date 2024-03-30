// some scripts
import $ from "jquery";
// jquery ready start
$(document).ready(function () {
  $(document).on("click", ".dropdown-menu", function (e) {
    e.stopPropagation();
  });
  if ($(window).width() < 768) {
    $(".nav-home-aside .title-category").click(function (e) {
      e.preventDefault();
      $(".menu-category").slideToggle("fast", function () {
        $(".menu-category .submenu").hide();
      });
    });
    $(".has-submenu a").click(function (e) {
      e.preventDefault();
      $(this).next().slideToggle("fast");
    });
  }
  $(".js-check :radio").change(function () {
    var check_attr_name = $(this).attr("name");
    if ($(this).is(":checked")) {
      $("input[name=" + check_attr_name + "]")
        .closest(".js-check")
        .removeClass("active");
      $(this).closest(".js-check").addClass("active");
      // item.find('.radio').find('span').text('Add');
    } else {
      this.removeClass("active");
      // item.find('.radio').find('span').text('Unselect');
    }
  });

  //////////////////////// Bootstrap tooltip
  if ($('[data-toggle="tooltip"]').length > 0) {
    // check if element exists
    $('[data-toggle="tooltip"]').tooltip();
  } // end if

  // offcanvas menu
  $("[data-trigger]").on("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    var offcanvas_id = $(this).attr("data-trigger");
    $(offcanvas_id).toggleClass("show");
    $("body").toggleClass("offcanvas-active");
    $(".screen-overlay").toggleClass("show");
  });

  // Close menu when pressing ESC
  $(document).on("keydown", function (event) {
    if (event.keyCode === 27) {
      $(".mobile-offcanvas").removeClass("show");
      $("body").removeClass("overlay-active");
    }
  });
  // Close menu by clicking
  $(".btn-close, .screen-overlay").click(function (e) {
    $(".screen-overlay").removeClass("show");
    $(".mobile-offcanvas").removeClass("show");
    $("body").removeClass("offcanvas-active");
  });
});
// jquery end
