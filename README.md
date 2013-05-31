# rn-lazy : AngularJS lazy image loader directive

The user speed perception is critical for your web application.

This directive lets you show a spinner (image or DOM based) while your images are loading.

Proudly brought to you by the [@revolunet](http://twitter.com/revolunet) team.

Full working demo at : http://tab.demo.revolunet.com


## Usage  :
 - `rn-lazy-background="'http://path/to/image.jpg'"`: the image is loaded then set as background-image when ready. there is a data-binding here so the image source can be changed dynamically and loader displayed on-demand.
 - `rn-lazy-loading-class` (optional) : this class should be set initially, it will be removed when image loaded
 - `rn-lazy-loaded-class` (optional:  this class will be set when the image has been loaded
 - `rn-lazy-loader` (optional) : use the given selector to clone the target DOM and add it to the current element while loading (for DOM+CSS based spinners)


## DOM/CSS spinner example :


```html
<div id="loader">loading awesomeness...</div>
<div rn-lazy-background="'http://path/to/big/image1.jpg'" rn-lazy-loader="#loader"></div>
<div rn-lazy-background="'http://path/to/big/image2.jpg'" rn-lazy-loader="#loader"></div>
<div rn-lazy-background="'http://path/to/big/image3.jpg'" rn-lazy-loader="#loader"></div>
```

## Image-based spinner example : 

```html
<style>
.loading {
    background: url(data:image/png;base64,iVBORw0KGgoAAA...;) no-repeat center center; 
}
.loaded {
    background-size:cover;
    background-position:center center;
}
</style>
<div class="loading" rn-lazy-background="'http://path/to/big/image.jpg'" rn-lazy-loading-class="loading" rn-lazy-loaded-class="loaded"></div>
```

## Licence
As AngularJS itself, this module is released under the permissive [MIT license](http://revolunet.mit-license.org). Your contributions are always welcome.

