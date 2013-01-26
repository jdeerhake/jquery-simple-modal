/*!
 * $ Simple Modal plugin
 * Author: John Deerhake, @jdeerhake
 * Version 0.0.3
 * Licensed under the MIT license
 */

;(function ( $ ) {
  var backdrop,
    FADE_TIME = 300,
    defaults = {
      "class" : "simple-modal-box"
    };

  function createBackdrop() {
    backdrop = $("<div />", { "class" : "simple-modal-backdrop" }).appendTo("body");
  }

  function Modal ( el, settings ) {
    $.extend( this, settings );
    this.el = $( el );
    this.isShown = false;
    this.init();
  }

  Modal.prototype = {
    init : function () {
      if(!backdrop) {
        createBackdrop();
      }
      this.modal = {};
      this.modal.el = $("<div />", { "class" :  this["class"] }).appendTo("body");
      this.modal.el.append(this.el.remove().show());
      this.bindings();
    },
    bindings : function () {
      this.el.on( "show", $.proxy( this, "show" ) );
      this.el.on( "hide", $.proxy( this, "hide" ) );

      var triggerShow = $.proxy( function() {
        this.el.trigger("show");
        return false;
      }, this ),
      triggerHide = $.proxy( function() {
        this.el.trigger("hide");
        return false;
      }, this );

      backdrop.on( "click", triggerHide );
      this.el.on( "click", ".close", triggerHide );

      $( document ).on( "keyup", function(ev) {
        if( ev.keyCode === 27 ) { triggerHide(); } /*ESC*/
      });

      if( this.trigger ) {
        this.trigger.on( "click", triggerShow );
      }

      this.el.find(".close").on( "click" );
    },
    show : function () {
      if( this.isShown ) { return false; }
      this.isShown = true;
      backdrop.show();
      this.modal.el.css({ opacity : 0 }).show();
      this.centerer = setInterval( $.proxy( this, "center" ), 500 );

      setTimeout( $.proxy( function() {
        this.center();
        this.modal.el.animate({ opacity : 1 }, FADE_TIME);
      }, this ), 50);
      return false;
    },
    hide : function () {
      if( !this.isShown ) { return false; }
      this.isShown = false;
      clearInterval( this.centerer );
      backdrop.fadeOut(FADE_TIME);
      this.modal.el.fadeOut(FADE_TIME, $.proxy( function () {
        this.el.trigger("hidden");
      }, this ));
      return false;
    },
    center : function () {
      var width = this.modal.el.outerWidth(),
        height = this.modal.el.outerHeight();

      if(width != this.modal.width || height != this.modal.height) {
        this.modal.el.css({
          marginTop : height / -2,
          marginLeft : width / -2
        });
        this.modal.width = width;
        this.modal.height = height;
      }
    }
  };

  $.fn.simpleModal = function ( options ) {
    var settings = $.extend({}, defaults, options);
    return this.each(function() {
      new Modal ( this, settings );
    });
  };
})( jQuery );