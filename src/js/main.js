(function ($) {
  'use strict';

  // Initialize when document is ready
  $(document).ready(function () {
    initLoadMore();
    initAjaxFilter();
  });

  // Load More Functionality
  function initLoadMore() {
    $('.tiny-load-more-btn').on('click', function (e) {
      e.preventDefault();

      var $button = $(this);
      var $container = $button.closest('.tiny-load-more-container');
      var $postsContainer = $container.find('.tiny-posts-container');
      var $loader = $container.find('.tiny-loader');

      var currentPage = parseInt($container.data('page'));
      var maxPages = parseInt($container.data('max-pages'));
      var atts = $container.data('tiny-load-more');

      if (currentPage >= maxPages) {
        $button.hide();
        return;
      }

      // Show loading state
      $button.prop('disabled', true);
      var originalText = $button.text();
      $button.text($button.data('loading-text') || 'Loading...');
      $loader.show();

      // AJAX request
      $.ajax({
        url: tiny_ajax.ajax_url,
        type: 'POST',
        data: {
          action: 'tiny_load_more',
          nonce: tiny_ajax.nonce,
          atts: JSON.stringify(atts),
          page: currentPage + 1,
        },
        success: function (response) {
          if (response.trim() !== '') {
            $postsContainer.append(response);
            $container.data('page', currentPage + 1);

            // Hide button if reached max pages
            if (currentPage + 1 >= maxPages) {
              $button.hide();
            }

            // Trigger custom event
            $container.trigger('tiny.posts.loaded', [response]);
          } else {
            $button.hide();
          }
        },
        error: function (xhr, status, error) {
          console.error('Tiny Load More Error:', error);
          showNotification('Error loading more posts. Please try again.', 'error');
        },
        complete: function () {
          $button.prop('disabled', false);
          $button.text(originalText);
          $loader.hide();
        },
      });
    });
  }

  // AJAX Filter Functionality
  function initAjaxFilter() {
    $('.tiny-ajax-filter-container').each(function () {
      var $container = $(this);
      var $postsContainer = $container.find('.tiny-posts-container');
      var $loader = $container.find('.tiny-loader');
      var atts = $container.data('tiny-ajax-filter');
      var filterTimeout;

      // Handle filter changes
      $container.on('change', '.tiny-taxonomy-filter', function () {
        clearTimeout(filterTimeout);
        filterTimeout = setTimeout(function () {
          performFilter($container, $postsContainer, $loader, atts);
        }, 300);
      });

      // Handle reset button
      $container.on('click', '.tiny-reset-filters', function (e) {
        e.preventDefault();
        resetFilters($container, $postsContainer, $loader, atts);
      });
    });
  }

  function performFilter($container, $postsContainer, $loader, atts) {
    var filters = {};

    // Collect filter values
    $container.find('.tiny-taxonomy-filter').each(function () {
      var $filter = $(this);
      var taxonomy = $filter.data('taxonomy');
      var value = $filter.val();

      if (value) {
        if ($filter.is('select')) {
          // Single select
          if (!filters[taxonomy]) filters[taxonomy] = [];
          filters[taxonomy].push(value);
        } else if ($filter.is(':checkbox') && $filter.is(':checked')) {
          // Checkbox - multiple values
          if (!filters[taxonomy]) filters[taxonomy] = [];
          filters[taxonomy].push(value);
        }
      }
    });

    // Show loading
    $loader.show();
    $postsContainer.addClass('tiny-loading');

    // AJAX request
    $.ajax({
      url: tiny_ajax.ajax_url,
      type: 'POST',
      data: {
        action: 'tiny_filter_posts',
        nonce: tiny_ajax.nonce,
        atts: JSON.stringify(atts),
        filters: filters,
      },
      success: function (response) {
        $postsContainer.html(response);

        // Trigger custom event
        $container.trigger('tiny.posts.filtered', [response, filters]);
      },
      error: function (xhr, status, error) {
        console.error('Tiny Filter Error:', error);
        showNotification('Error filtering posts. Please try again.', 'error');
      },
      complete: function () {
        $loader.hide();
        $postsContainer.removeClass('tiny-loading');
      },
    });
  }

  function resetFilters($container, $postsContainer, $loader, atts) {
    // Reset all filters
    $container.find('.tiny-taxonomy-filter').each(function () {
      var $filter = $(this);
      if ($filter.is('select')) {
        $filter.val('');
      } else if ($filter.is(':checkbox')) {
        $filter.prop('checked', false);
      }
    });

    // Reload original posts
    $loader.show();
    $postsContainer.addClass('tiny-loading');

    $.ajax({
      url: tiny_ajax.ajax_url,
      type: 'POST',
      data: {
        action: 'tiny_filter_posts',
        nonce: tiny_ajax.nonce,
        atts: JSON.stringify(atts),
        filters: {},
      },
      success: function (response) {
        $postsContainer.html(response);

        // Trigger custom event
        $container.trigger('tiny.posts.reset', [response]);
      },
      error: function (xhr, status, error) {
        console.error('Tiny Reset Error:', error);
        showNotification('Error resetting filters. Please try again.', 'error');
      },
      complete: function () {
        $loader.hide();
        $postsContainer.removeClass('tiny-loading');
      },
    });
  }

  // Utility Functions
  function showNotification(message, type) {
    type = type || 'info';

    var $notification = $(
      '<div class="tiny-notification tiny-notification-' +
        type +
        '">' +
        '<span class="tiny-notification-message">' +
        message +
        '</span>' +
        '<button class="tiny-notification-close">&times;</button>' +
        '</div>'
    );

    // Add to body
    $('body').append($notification);

    // Position notification
    $notification.css({
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 9999,
      padding: '12px 20px',
      borderRadius: '4px',
      color: 'white',
      fontSize: '14px',
      maxWidth: '300px',
      backgroundColor: getNotificationColor(type),
      boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
      transform: 'translateX(320px)',
      transition: 'transform 0.3s ease',
    });

    // Animate in
    setTimeout(function () {
      $notification.css('transform', 'translateX(0)');
    }, 100);

    // Handle close button
    $notification.on('click', '.tiny-notification-close', function () {
      hideNotification($notification);
    });

    // Auto hide after 5 seconds
    setTimeout(function () {
      if ($notification.is(':visible')) {
        hideNotification($notification);
      }
    }, 5000);
  }

  function hideNotification($notification) {
    $notification.css('transform', 'translateX(320px)');
    setTimeout(function () {
      $notification.remove();
    }, 300);
  }

  function getNotificationColor(type) {
    switch (type) {
      case 'success':
        return '#28a745';
      case 'error':
        return '#dc3545';
      case 'warning':
        return '#ffc107';
      default:
        return '#0073aa';
    }
  }

  // Lazy loading for images (optional enhancement)
  function initLazyLoading() {
    if ('IntersectionObserver' in window) {
      var imageObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        });
      });

      document.querySelectorAll('img[data-src]').forEach(function (img) {
        imageObserver.observe(img);
      });
    }
  }

  // Initialize lazy loading on posts load
  $(document).on('tiny.posts.loaded tiny.posts.filtered', function () {
    initLazyLoading();
  });

  // Initialize lazy loading on page load
  initLazyLoading();
})(jQuery);
