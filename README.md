jQuery simpleModal
================
v0.0.6

A small (~ 100 LoC) jQuery plugin for creating a basic modal.  It is shown and hidden using custom jQuery events `show` and `hide` and it is automatically centered (note the starter CSS for this work correctly).

Usage
-----

Example usage:

    $( "#content" ).simpleModal({
      trigger : $( "#clickme" ),
      "class" : "my-modal"
    });

Currently there are only 2 configuration options:
 -  `trigger` which takes a jQuery selector of an element that should be used a trigger (when it's clicked the modal will show).  The trigger's default action is prevented.
 -  `"class"` which provies a class name for the wrapper div around the modal content.  Defaults to "simple-modal-box". (Note that `class` is a reserved word in JS and needs to be in quotations when used as an object key)

Starter CSS
-----------

Very basic starter CSS that will make the modal function as expected:

    .simple-modal-box, .simple-modal-backdrop {
      /* The plugin appends these items to the DOM without
        making any effort to hide them, so this must be set. */
      display: none;
    }

    .simple-modal-box {
      z-index: 100;
    }

    .simple-modal-backdrop {
      background: rgba(0,0,0,.75);
      z-index: 99;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }



Conventions and other usage
---------------------------

Show the modal at the time it's created

    $( "#content" ).simpleModal().trigger( "show" );

Hide the modal programatically

    $( "#content" ).trigger( "hide" );

To hide the modal on click you can either set up a click handler using the code above, or just give an element in the modal's content a class of `close` and it will automatically be set up to close the modal on click.  Additionally clicking the backdrop or hitting the `Esc` key will close the modal.

Use with Ajax:

Although it doesn't have Ajax support baked in, it's pretty easy to use Ajax content in a modal with jQuery:

    $( "#trigger" ).on( "click", function() {
      $.get( "example.html" ).done(function( html ) { $( html ).simpleModal().trigger( "show" ); });
    });

Using this, you can hook loading animations into the callbacks as well.


Images
------

The modal only attempts to center itself when it is shown.  Therefore, if its content changes size (e.g. an image loads) it will be off-center.  The are a few strategies to avoid this:
  - Specify the image width and height via CSS or attributes
  - Wait until the image is loaded to display the modal (as is used in [the image example](https://github.com/jdeerhake/jquery-simple-modal/blob/master/example.html))
  - Preload the image on page load