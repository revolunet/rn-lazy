/*global waits, runs, browserTrigger, beforeEach, afterEach, describe, it, inject, expect, module, angular, $ */

describe('rn-lazy', function () {

  'use strict';

  var scope, $compile, $sandbox;

  // sample test images
  var testImage1 = 'http://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Earth_flag_PD.jpg/250px-Earth_flag_PD.jpg';
  var testImage2 = 'http://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Earth_with_two_moons.jpg/300px-Earth_with_two_moons.jpg';
  var TIMEOUT = 1000;

  beforeEach(module('rn-lazy'));

  beforeEach(inject(function ($rootScope, _$compile_) {
      scope = $rootScope;
      $compile = _$compile_;
      $('body').css({
        padding: 0,
        margin:0
      });
      $sandbox = $('<div id="sandbox"></div>').appendTo($('body'));
  }));

  afterEach(function() {
    $sandbox.remove();
    scope.$destroy();
  });

  function compileTpl(options) {
    scope.image = testImage1;
    var tpl = '<div rn-lazy-background="image" ';
    if (options && options.loadingClass) {
      tpl += ' class="' + options.loadingClass + '" rn-lazy-loading-class="' + options.loadingClass + '" ';
    }
    if (options && options.loadedClass) {
      tpl += ' rn-lazy-loaded-class="' + options.loadedClass + '" ';
    }
    if (options && options.loader) {
      tpl += ' rn-lazy-loader="' + options.loader + '" ';
    }
    tpl += '></div>';
    var $element = $(tpl).appendTo($sandbox);
    $element = $compile($element)(scope);
    scope.$digest();
    return $element;
  }

  describe('lazy-background', function () {

    it('the background image should be updated after load', function () {
      var elm = compileTpl();
      expect(elm.css('background-image')).toBe('');
      waits(TIMEOUT);
      runs(function() {
        expect(elm.css('background-image')).toBe('url(' + testImage1 + ')');
      });
    });

    it('the background image should be updated when scope changes', function () {
      var elm = compileTpl();
      expect(elm.css('background-image')).toBe('');
      waits(TIMEOUT);
      runs(function() {
        expect(elm.css('background-image')).toBe('url(' + testImage1 + ')');
        scope.image = testImage2;
      scope.$digest();
      });
      waits(TIMEOUT);
      runs(function() {
        expect(elm.css('background-image')).toBe('url(' + testImage2 + ')');
      });
    });

  });

  describe('rn-lazy CSS class', function () {

    it('loaded state should remove rn-lazy-loading-class CSS class', function () {
      var elm = compileTpl({loadingClass:'loading', loadedClass:'loaded'});
      expect(elm.hasClass('loading')).toBe(true);
      waits(TIMEOUT);
      runs(function() {
        expect(elm.hasClass('loading')).toBe(false);
      });
    });

    it('loaded state should add rn-lazy-loaded-class CSS class', function () {
      var elm = compileTpl({loadingClass:'loading', loadedClass:'loaded'});
      expect(elm.hasClass('loaded')).toBe(false);
      waits(TIMEOUT);
      runs(function() {
        expect(elm.hasClass('loaded')).toBe(true);
      });
    });

  });

  describe('rn-lazy DOM spinners', function () {
    var $loader;

    beforeEach(function() {
      $loader = $('<div id="loaderDiv"></div>');
      $sandbox.append($loader);
    });

    afterEach(function() {
      $loader.remove();
      $sandbox.empty();
    });

    it('should clone rn-lazy-loader element inside directive', function () {
      var elm = compileTpl({loader:'#loaderDiv'});
      expect(elm.html()).toBe($loader.wrap('<div></div>').parent().html());
    });

    it('should remove rn-lazy-loader element when image loaded and update the background image', function () {
      var elm = compileTpl({loader:'#loaderDiv'});
      expect(elm.css('background-image')).toBe('');
      waits(TIMEOUT);
      runs(function() {
        expect(elm.html()).toBe('');
        expect(elm.css('background-image')).toBe('url(' + testImage1 + ')');
      });
    });

  });

});
