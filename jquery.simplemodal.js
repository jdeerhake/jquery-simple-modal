/*!
 * $ Simple Modal plugin
 * Author: John Deerhake, @jdeerhake
 * Version 0.0.7
 * Licensed under the MIT license
 */

;(function( $ ) {
  var FADE_TIME = 300,
    defaults = {
      "class" : "simple-modal-box"
    },
    backdrop = (function() {
      var bd = false;
      return function() {
        return bd || ( bd = $( "<div />", { "class" : "simple-modal-backdrop" }).appendTo( "body" ) );
      };
    }());


  function Modal ( el, settings ) {
    $.extend( this, settings );
    this.el = $( el );
    this.isShown = false;
    this.init();
  }

  Modal.prototype = {
    init : function () {
      this.modal = {};
      this.modal.el = $( "<div />", { "class" :  this[ "class" ] }).appendTo( "body" );
      this.modal.el
        .append( this.el.remove().show() )
        .css({ left: 0, top: 0, position: "fixed" }); /* Legacy fix */

      this.el.on( "show",   $.proxy( this, "show" ) );
      this.el.on( "hide",   $.proxy( this, "hide" ) );
      this.el.on( "change", $.proxy( this, "center" ) );

      var triggerShow = $.proxy( this.el, "trigger", "show" ),
          triggerHide = $.proxy( this.el, "trigger", "hide" );

      this.el.find( ".close" ).on( "click", triggerHide );
      backdrop().on( "click", triggerHide );
      this.el.on( "click", ".close", triggerHide );
      if( this.trigger ) { this.trigger.on( "click", triggerShow ); }

      $( document ).on( "keyup", function(ev) {
        if( ev.keyCode === 27 ) { triggerHide(); } /* ESC */
      } );
    },
    show : function () {
      if( this.isShown ) { return false; }
      this.isShown = true;
      backdrop().show();
      this.modal.el.css({ opacity : 0 }).show();
      this.center();
      this.modal.el.animate({ opacity : 1 }, FADE_TIME, $.proxy(function() {
        this.el.trigger( "shown" );
      }, this ) );
      return false;
    },
    hide : function () {
      if( !this.isShown ) { return false; }
      this.isShown = false;
      backdrop().fadeOut( FADE_TIME );
      this.modal.el.fadeOut(FADE_TIME, $.proxy( function () {
        this.el.trigger( "hidden" );
      }, this ));
      return false;
    },
    center : function () {
      this.modal.el.css({
        marginLeft  : -1 * Math.floor( this.modal.el.outerWidth() / 2 ),
        marginTop   : -1 * Math.floor( this.modal.el.outerHeight() / 2 ),
        position    : "fixed",
        top         : "50%",
        left        : "50%"
      });
    }
  };

  $.fn.simpleModal = function ( options ) {
    var settings = $.extend( {}, defaults, options );
    return this.each(function() {
      new Modal ( this, settings );
    });
  };
})( jQuery );