// Google Analytics Event Tracking
function ga_track_outbound_link(event) {
    // Find parent link from possible child element
    var href = event.target.closest('a');
    if (!href) {
        console.warn('Href cannot be null.');
        return;
    }
    gtag('event', 'cta_clicked', {
       'event_category': 'Outbound Link',
       'event_label': href,
       'value': 1
    });
}

// Listen for events
document.addEventListener('click', function (event) {
    if (event.target.matches('a[href^="mailto:"]') // mailto function
		|| event.target.matches('a[href^="tel:"]') // tel: function
		|| event.target.matches('a[href$=".pdf"]') // pdf function
    ) {
	    ga_track_outbound_link(event);
	    return true;
    }
}, false);

// Polyfills
if (!Element.prototype.matches) {
  Element.prototype.matches = Element.prototype.msMatchesSelector || 
                              Element.prototype.webkitMatchesSelector;
}

if (!Element.prototype.closest) {
  Element.prototype.closest = function(s) {
    var el = this;

    do {
      if (el.matches(s)) return el;
      el = el.parentElement || el.parentNode;
    } while (el !== null && el.nodeType === 1);
    return null;
  };
}
