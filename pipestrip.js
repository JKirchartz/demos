SVGElement.prototype.getTransformToElement = SVGElement.prototype.getTransformToElement || function(elem) {return elem.getScreenCTM().inverse().multiply(this.getScreenCTM());};
var v = document.getElementById('viewport');
var oH = 349, oW = 1200;
var nH = viewport.getAttribute('height'), nW = viewport.getAttribute('width');
var s = Math.round(Math.random()) ?
    (Math.round(Math.random() * 10)) :
    (Math.round(Math.random()*10) + ', ' + Math.round(Math.random()*10));
if(Math.round(Math.random() * 100) > 25) {
  var st = document.getElementById('strip');
  st.setAttribute('transform', 'scale(' + s + ')');
  var m = st.getTransformToElement(v);
  oW *= m.a;
  oH *= m.d;
}
var cx = Math.floor(Math.random() * (oW - nW)), cy = Math.floor(Math.random() * (oH - nH));
v.setAttribute('width', nW);
v.setAttribute('height', nH);
v.setAttribute('viewBox', cx + ' ' + cy + ' ' + nW + ' ' + nH);
