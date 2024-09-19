!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t="undefined"!=typeof globalThis?globalThis:t||self).dayjs=e()}(this,(function(){"use strict";var t=1e3,e=6e4,n=36e5,r="millisecond",i="second",s="minute",u="hour",a="day",o="week",f="month",h="quarter",c="year",d="date",l="Invalid Date",$=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,y=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,M={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(t){var e=["th","st","nd","rd"],n=t%100;return"["+t+(e[(n-20)%10]||e[n]||e[0])+"]"}},m=function(t,e,n){var r=String(t);return!r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},v={s:m,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return(e<=0?"+":"-")+m(r,2,"0")+":"+m(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,f),s=n-i<0,u=e.clone().add(r+(s?-1:1),f);return+(-(r+(n-i)/(s?i-u:u-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:f,y:c,w:o,d:a,D:d,h:u,m:s,s:i,ms:r,Q:h}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},g="en",D={};D[g]=M;var p=function(t){return t instanceof _},S=function t(e,n,r){var i;if(!e)return g;if("string"==typeof e){var s=e.toLowerCase();D[s]&&(i=s),n&&(D[s]=n,i=s);var u=e.split("-");if(!i&&u.length>1)return t(u[0])}else{var a=e.name;D[a]=e,i=a}return!r&&i&&(g=i),i||!r&&g},w=function(t,e){if(p(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new _(n)},O=v;O.l=S,O.i=p,O.w=function(t,e){return w(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var _=function(){function M(t){this.$L=S(t.locale,null,!0),this.parse(t)}var m=M.prototype;return m.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(O.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match($);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},m.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},m.$utils=function(){return O},m.isValid=function(){return!(this.$d.toString()===l)},m.isSame=function(t,e){var n=w(t);return this.startOf(e)<=n&&n<=this.endOf(e)},m.isAfter=function(t,e){return w(t)<this.startOf(e)},m.isBefore=function(t,e){return this.endOf(e)<w(t)},m.$g=function(t,e,n){return O.u(t)?this[e]:this.set(n,t)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(t,e){var n=this,r=!!O.u(e)||e,h=O.p(t),l=function(t,e){var i=O.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return r?i:i.endOf(a)},$=function(t,e){return O.w(n.toDate()[t].apply(n.toDate("s"),(r?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},y=this.$W,M=this.$M,m=this.$D,v="set"+(this.$u?"UTC":"");switch(h){case c:return r?l(1,0):l(31,11);case f:return r?l(1,M):l(0,M+1);case o:var g=this.$locale().weekStart||0,D=(y<g?y+7:y)-g;return l(r?m-D:m+(6-D),M);case a:case d:return $(v+"Hours",0);case u:return $(v+"Minutes",1);case s:return $(v+"Seconds",2);case i:return $(v+"Milliseconds",3);default:return this.clone()}},m.endOf=function(t){return this.startOf(t,!1)},m.$set=function(t,e){var n,o=O.p(t),h="set"+(this.$u?"UTC":""),l=(n={},n[a]=h+"Date",n[d]=h+"Date",n[f]=h+"Month",n[c]=h+"FullYear",n[u]=h+"Hours",n[s]=h+"Minutes",n[i]=h+"Seconds",n[r]=h+"Milliseconds",n)[o],$=o===a?this.$D+(e-this.$W):e;if(o===f||o===c){var y=this.clone().set(d,1);y.$d[l]($),y.init(),this.$d=y.set(d,Math.min(this.$D,y.daysInMonth())).$d}else l&&this.$d[l]($);return this.init(),this},m.set=function(t,e){return this.clone().$set(t,e)},m.get=function(t){return this[O.p(t)]()},m.add=function(r,h){var d,l=this;r=Number(r);var $=O.p(h),y=function(t){var e=w(l);return O.w(e.date(e.date()+Math.round(t*r)),l)};if($===f)return this.set(f,this.$M+r);if($===c)return this.set(c,this.$y+r);if($===a)return y(1);if($===o)return y(7);var M=(d={},d[s]=e,d[u]=n,d[i]=t,d)[$]||1,m=this.$d.getTime()+r*M;return O.w(m,this)},m.subtract=function(t,e){return this.add(-1*t,e)},m.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||l;var r=t||"YYYY-MM-DDTHH:mm:ssZ",i=O.z(this),s=this.$H,u=this.$m,a=this.$M,o=n.weekdays,f=n.months,h=function(t,n,i,s){return t&&(t[n]||t(e,r))||i[n].slice(0,s)},c=function(t){return O.s(s%12||12,t,"0")},d=n.meridiem||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r},$={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:O.s(a+1,2,"0"),MMM:h(n.monthsShort,a,f,3),MMMM:h(f,a),D:this.$D,DD:O.s(this.$D,2,"0"),d:String(this.$W),dd:h(n.weekdaysMin,this.$W,o,2),ddd:h(n.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(s),HH:O.s(s,2,"0"),h:c(1),hh:c(2),a:d(s,u,!0),A:d(s,u,!1),m:String(u),mm:O.s(u,2,"0"),s:String(this.$s),ss:O.s(this.$s,2,"0"),SSS:O.s(this.$ms,3,"0"),Z:i};return r.replace(y,(function(t,e){return e||$[t]||i.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(r,d,l){var $,y=O.p(d),M=w(r),m=(M.utcOffset()-this.utcOffset())*e,v=this-M,g=O.m(this,M);return g=($={},$[c]=g/12,$[f]=g,$[h]=g/3,$[o]=(v-m)/6048e5,$[a]=(v-m)/864e5,$[u]=v/n,$[s]=v/e,$[i]=v/t,$)[y]||v,l?g:O.a(g)},m.daysInMonth=function(){return this.endOf(f).$D},m.$locale=function(){return D[this.$L]},m.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=S(t,e,!0);return r&&(n.$L=r),n},m.clone=function(){return O.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},M}(),T=_.prototype;return w.prototype=T,[["$ms",r],["$s",i],["$m",s],["$H",u],["$W",a],["$M",f],["$y",c],["$D",d]].forEach((function(t){T[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),w.extend=function(t,e){return t.$i||(t(e,_,w),t.$i=!0),w},w.locale=S,w.isDayjs=p,w.unix=function(t){return w(1e3*t)},w.en=D[g],w.Ls=D,w.p={},w}));
;
!function(e,r){"object"==typeof exports&&"undefined"!=typeof module?module.exports=r():"function"==typeof define&&define.amd?define(r):(e="undefined"!=typeof globalThis?globalThis:e||self).dayjs_plugin_relativeTime=r()}(this,function(){"use strict";return function(p,e,v){p=p||{};var o=e.prototype,M={future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"};function t(e,r,t,n){return o.fromToBase(e,r,t,n)}v.en.relativeTime=M,o.fromToBase=function(e,r,t,n,o){for(var i,d,u=t.$locale().relativeTime||M,f=p.thresholds||[{l:"s",r:44,d:"second"},{l:"m",r:89},{l:"mm",r:44,d:"minute"},{l:"h",r:89},{l:"hh",r:21,d:"hour"},{l:"d",r:35},{l:"dd",r:25,d:"day"},{l:"M",r:45},{l:"MM",r:10,d:"month"},{l:"y",r:17},{l:"yy",d:"year"}],a=f.length,s=0;s<a;s+=1){var l=f[s],h=(l.d&&(i=n?v(e).diff(t,l.d,!0):t.diff(e,l.d,!0)),(p.rounding||Math.round)(Math.abs(i))),m=0<i;if(h<=l.r||!l.r){var c=u[(l=h<=1&&0<s?f[s-1]:l).l];o&&(h=o(""+h)),d="string"==typeof c?c.replace("%d",h):c(h,r,l.l,m);break}}if(r)return d;var y=m?u.future:u.past;return"function"==typeof y?y(d):y.replace("%s",d)},o.to=function(e,r){return t(e,r,this,!0)},o.from=function(e,r){return t(e,r,this)};function r(e){return e.$u?v.utc():v()}o.toNow=function(e){return this.to(r(this),e)},o.fromNow=function(e){return this.from(r(this),e)}}});
;
/* Template Name: LotusLabs Docs
   Author: Colin Wilson
   E-mail: colin@aigis.uk
   Created: October 2022
   Version: 1.0.0
   File Description: Main JS file of the docs template
*/


/*********************************/
/*         INDEX                 */
/*================================
 *     01.  Toggle Menus         *
 *     02.  Active Menu          *
 *     03.  Clickable Menu       *
 *     04.  Back to top          *
 *     05.  DD Menu              *
 *     06.  Active Sidebar Menu  *
 *     07.  ScrollSpy            *
 ================================*/


// Menu
// Toggle menu
function toggleMenu() {
    document.getElementById('isToggle').classList.toggle('open');
    var isOpen = document.getElementById('navigation')
    if (isOpen.style.display === "block") {
        isOpen.style.display = "none";
    } else {
        isOpen.style.display = "block";
    }
};

// Menu Active
function getClosest(elem, selector) {

    // Element.matches() polyfill
    if (!Element.prototype.matches) {
        Element.prototype.matches =
            Element.prototype.matchesSelector ||
            Element.prototype.mozMatchesSelector ||
            Element.prototype.msMatchesSelector ||
            Element.prototype.oMatchesSelector ||
            Element.prototype.webkitMatchesSelector ||
            function (s) {
                var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                    i = matches.length;
                while (--i >= 0 && matches.item(i) !== this) { }
                return i > -1;
            };
    }

    // Get the closest matching element
    for (; elem && elem !== document; elem = elem.parentNode) {
        if (elem.matches(selector)) return elem;
    }
    return null;

};

function activateMenu() {
    var menuItems = document.getElementsByClassName("sub-menu-item");
    if (menuItems) {

        var matchingMenuItem = null;
        for (var idx = 0; idx < menuItems.length; idx++) {
            if (menuItems[idx].href === window.location.href) {
                matchingMenuItem = menuItems[idx];
            }
        }

        if (matchingMenuItem) {
            matchingMenuItem.classList.add('active');
            var immediateParent = getClosest(matchingMenuItem, 'li');
            if (immediateParent) {
                immediateParent.classList.add('active');
            }

            var parent = getClosest(matchingMenuItem, '.parent-menu-item');
            if (parent) {
                parent.classList.add('active');
                var parentMenuitem = parent.querySelector('.menu-item');
                if (parentMenuitem) {
                    parentMenuitem.classList.add('active');
                }
                var parentOfParent = getClosest(parent, '.parent-parent-menu-item');
                if (parentOfParent) {
                    parentOfParent.classList.add('active');
                }
            } else {
                var parentOfParent = getClosest(matchingMenuItem, '.parent-parent-menu-item');
                if (parentOfParent) {
                    parentOfParent.classList.add('active');
                }
            }
        }
    }
}


// Sidebar Menu
function activateSidebarMenu() {
    var current = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);
    if (current !== "" && document.getElementById("sidebar")) {
        var menuItems = document.querySelectorAll('#sidebar button');
        for (var i = 0, len = menuItems.length; i < len; i++) {
            if (menuItems[i].getAttribute("href").indexOf(current) !== -1) {
                menuItems[i].parentElement.className += " active";
                if (menuItems[i].closest(".sidebar-submenu")) {
                    menuItems[i].closest(".sidebar-submenu").classList.add("d-block");
                }
                if (menuItems[i].closest(".sidebar-dropdown")) {
                    menuItems[i].closest(".sidebar-dropdown").classList.add("active");
                }
            }
        }
    }
}

if (document.getElementById("close-sidebar")) {
    document.getElementById("close-sidebar").addEventListener("click", function () {
        document.getElementsByClassName("page-wrapper")[0].classList.toggle("toggled");
    });
}

// Close Sidebar (mobile)
if (!window.matchMedia('(min-width: 1024px)').matches) {
    if (document.getElementById("close-sidebar")) {
        const closeSidebar = document.getElementById("close-sidebar");
        const sidebar = document.getElementById("sidebar");
        const sidebarMenuLinks = Array.from(document.querySelectorAll(".sidebar-root-link,.sidebar-nested-link"));
        // Close sidebar by clicking outside
        document.addEventListener('click', function(elem) {
            if (!closeSidebar.contains(elem.target) && !sidebar.contains(elem.target))
                document.getElementsByClassName("page-wrapper")[0].classList.add("toggled");
        });
        // Close sidebar immediately when clicking sidebar menu item
        sidebarMenuLinks.forEach(menuLink => {
            menuLink.addEventListener("click", function () {
              document.getElementsByClassName("page-wrapper")[0].classList.add("toggled");
            });
        });
    }
}

// Clickable Menu
if (document.getElementById("navigation")) {
    var elements = document.getElementById("navigation").getElementsByTagName("a");
    for (var i = 0, len = elements.length; i < len; i++) {
        elements[i].onclick = function (elem) {
            if (elem.target.getAttribute("href") === "javascript:void(0)") {
                var submenu = elem.target.nextElementSibling.nextElementSibling;
                submenu.classList.toggle('open');
            }
        }
    }
}

if (document.getElementById("sidebar")) {
    var elements = document.getElementById("sidebar").getElementsByTagName("button");
    for (var i = 0, len = elements.length; i < len; i++) {
        elements[i].onclick = function (elem) {
            // if(elem.target !== document.querySelectorAll("li.sidebar-dropdown.active > a")[0]){
            //     document.querySelectorAll("li.sidebar-dropdown.active")[0]?.classList?.toggle("active");
            //     document.querySelectorAll("div.sidebar-submenu.d-block")[0]?.classList?.toggle("d-block");
            // }
            // if(elem.target.getAttribute("href") === "javascript:void(0)") {
            elem.target.parentElement.classList.toggle("active");
            elem.target.nextElementSibling.classList.toggle("d-block");
            // }
        }
    }
}

// Menu sticky
function windowScroll() {
    var navbar = document.getElementById("topnav");
    if (navbar === null) {

    } else if (document.body.scrollTop >= 50 ||
        document.documentElement.scrollTop >= 50) {
        navbar.classList.add("nav-sticky");
    } else {
        navbar.classList.remove("nav-sticky");
    }
}

window.addEventListener('scroll', (ev) => {
    ev.preventDefault();
    windowScroll();
})

// back-to-top
var mybutton = document.getElementById("back-to-top");
window.onscroll = function () {
    scrollFunction();
};

function scrollFunction() {
    if (mybutton != null) {
        if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
            mybutton.style.display = "block";
        } else {
            mybutton.style.display = "none";
        }
    }
}

function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

// dd-menu
if (document.getElementsByClassName("dd-menu")) {
    var ddmenu = document.getElementsByClassName("dd-menu");
    for (var i = 0, len = ddmenu.length; i < len; i++) {
        ddmenu[i].onclick = function (elem) {
            elem.stopPropagation();
        }
    }
}

// Active Sidebar
(function () {
    var current = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);
    if (current === "") return;
    var menuItems = document.querySelectorAll('.sidebar-nav a');
    for (var i = 0, len = menuItems.length; i < len; i++) {
        if (menuItems[i].getAttribute("href").indexOf(current) !== -1) {
            menuItems[i].parentElement.className += " active";
        }
    }
})();

// Last Modified Date of current page (relative time format)
if (document.getElementById("relativetime")) {
    dayjs.extend(window.dayjs_plugin_relativeTime);
    const modId = document.getElementById('relativetime');
    let modAgo = dayjs(modId.getAttribute('data-authdate')).fromNow();
    document.getElementById("relativetime").innerHTML = modAgo;
};

// Initialize Bootstrap Tooltips
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new Tooltip(tooltipTriggerEl))

/**
 * Sanitize and encode all HTML in a user-submitted string
 * https://portswigger.net/web-security/cross-site-scripting/preventing
 * @param  {String} str  The user-submitted string
 * @return {String} str  The sanitized string
 */
var sanitizeHTML = function (str) {
	return str.replace(/[^\w. ]/gi, function (c) {
		return '&#' + c.charCodeAt(0) + ';';
	});
};
;
/*! @docsearch/js 3.5.1 | MIT License | © Algolia, Inc. and contributors | https://docsearch.algolia.com */
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e=e||self).docsearch=t()}(this,(function(){"use strict";function e(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function t(t){for(var n=1;n<arguments.length;n++){var o=null!=arguments[n]?arguments[n]:{};n%2?e(Object(o),!0).forEach((function(e){r(t,e,o[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(o)):e(Object(o)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(o,e))}))}return t}function n(e){return n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},n(e)}function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(){return o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},o.apply(this,arguments)}function i(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}function c(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==n)return;var r,o,i=[],c=!0,a=!1;try{for(n=n.call(e);!(c=(r=n.next()).done)&&(i.push(r.value),!t||i.length!==t);c=!0);}catch(e){a=!0,o=e}finally{try{c||null==n.return||n.return()}finally{if(a)throw o}}return i}(e,t)||u(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function a(e){return function(e){if(Array.isArray(e))return l(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||u(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function u(e,t){if(e){if("string"==typeof e)return l(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?l(e,t):void 0}}function l(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var s,f,p,m,v,d={},h=[],y=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;function b(e,t){for(var n in t)e[n]=t[n];return e}function _(e){var t=e.parentNode;t&&t.removeChild(e)}function g(e,t,n){var r,o,i,c=arguments,a={};for(i in t)"key"==i?r=t[i]:"ref"==i?o=t[i]:a[i]=t[i];if(arguments.length>3)for(n=[n],i=3;i<arguments.length;i++)n.push(c[i]);if(null!=n&&(a.children=n),"function"==typeof e&&null!=e.defaultProps)for(i in e.defaultProps)void 0===a[i]&&(a[i]=e.defaultProps[i]);return O(e,a,r,o,null)}function O(e,t,n,r,o){var i={type:e,props:t,key:n,ref:r,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:null==o?++s.__v:o};return null!=s.vnode&&s.vnode(i),i}function S(e){return e.children}function j(e,t){this.props=e,this.context=t}function w(e,t){if(null==t)return e.__?w(e.__,e.__.__k.indexOf(e)+1):null;for(var n;t<e.__k.length;t++)if(null!=(n=e.__k[t])&&null!=n.__e)return n.__e;return"function"==typeof e.type?w(e):null}function E(e){var t,n;if(null!=(e=e.__)&&null!=e.__c){for(e.__e=e.__c.base=null,t=0;t<e.__k.length;t++)if(null!=(n=e.__k[t])&&null!=n.__e){e.__e=e.__c.base=n.__e;break}return E(e)}}function P(e){(!e.__d&&(e.__d=!0)&&f.push(e)&&!I.__r++||m!==s.debounceRendering)&&((m=s.debounceRendering)||p)(I)}function I(){for(var e;I.__r=f.length;)e=f.sort((function(e,t){return e.__v.__b-t.__v.__b})),f=[],e.some((function(e){var t,n,r,o,i,c;e.__d&&(i=(o=(t=e).__v).__e,(c=t.__P)&&(n=[],(r=b({},o)).__v=o.__v+1,q(c,o,r,t.__n,void 0!==c.ownerSVGElement,null!=o.__h?[i]:null,n,null==i?w(o):i,o.__h),L(n,o),o.__e!=i&&E(o)))}))}function D(e,t,n,r,o,i,c,a,u,l){var s,f,p,m,v,y,b,_=r&&r.__k||h,g=_.length;for(n.__k=[],s=0;s<t.length;s++)if(null!=(m=n.__k[s]=null==(m=t[s])||"boolean"==typeof m?null:"string"==typeof m||"number"==typeof m?O(null,m,null,null,m):Array.isArray(m)?O(S,{children:m},null,null,null):m.__b>0?O(m.type,m.props,m.key,null,m.__v):m)){if(m.__=n,m.__b=n.__b+1,null===(p=_[s])||p&&m.key==p.key&&m.type===p.type)_[s]=void 0;else for(f=0;f<g;f++){if((p=_[f])&&m.key==p.key&&m.type===p.type){_[f]=void 0;break}p=null}q(e,m,p=p||d,o,i,c,a,u,l),v=m.__e,(f=m.ref)&&p.ref!=f&&(b||(b=[]),p.ref&&b.push(p.ref,null,m),b.push(f,m.__c||v,m)),null!=v?(null==y&&(y=v),"function"==typeof m.type&&null!=m.__k&&m.__k===p.__k?m.__d=u=k(m,u,e):u=C(e,m,p,_,v,u),l||"option"!==n.type?"function"==typeof n.type&&(n.__d=u):e.value=""):u&&p.__e==u&&u.parentNode!=e&&(u=w(p))}for(n.__e=y,s=g;s--;)null!=_[s]&&("function"==typeof n.type&&null!=_[s].__e&&_[s].__e==n.__d&&(n.__d=w(r,s+1)),U(_[s],_[s]));if(b)for(s=0;s<b.length;s++)H(b[s],b[++s],b[++s])}function k(e,t,n){var r,o;for(r=0;r<e.__k.length;r++)(o=e.__k[r])&&(o.__=e,t="function"==typeof o.type?k(o,t,n):C(n,o,o,e.__k,o.__e,t));return t}function A(e,t){return t=t||[],null==e||"boolean"==typeof e||(Array.isArray(e)?e.some((function(e){A(e,t)})):t.push(e)),t}function C(e,t,n,r,o,i){var c,a,u;if(void 0!==t.__d)c=t.__d,t.__d=void 0;else if(null==n||o!=i||null==o.parentNode)e:if(null==i||i.parentNode!==e)e.appendChild(o),c=null;else{for(a=i,u=0;(a=a.nextSibling)&&u<r.length;u+=2)if(a==o)break e;e.insertBefore(o,i),c=i}return void 0!==c?c:o.nextSibling}function x(e,t,n){"-"===t[0]?e.setProperty(t,n):e[t]=null==n?"":"number"!=typeof n||y.test(t)?n:n+"px"}function N(e,t,n,r,o){var i;e:if("style"===t)if("string"==typeof n)e.style.cssText=n;else{if("string"==typeof r&&(e.style.cssText=r=""),r)for(t in r)n&&t in n||x(e.style,t,"");if(n)for(t in n)r&&n[t]===r[t]||x(e.style,t,n[t])}else if("o"===t[0]&&"n"===t[1])i=t!==(t=t.replace(/Capture$/,"")),t=t.toLowerCase()in e?t.toLowerCase().slice(2):t.slice(2),e.l||(e.l={}),e.l[t+i]=n,n?r||e.addEventListener(t,i?R:T,i):e.removeEventListener(t,i?R:T,i);else if("dangerouslySetInnerHTML"!==t){if(o)t=t.replace(/xlink[H:h]/,"h").replace(/sName$/,"s");else if("href"!==t&&"list"!==t&&"form"!==t&&"download"!==t&&t in e)try{e[t]=null==n?"":n;break e}catch(e){}"function"==typeof n||(null!=n&&(!1!==n||"a"===t[0]&&"r"===t[1])?e.setAttribute(t,n):e.removeAttribute(t))}}function T(e){this.l[e.type+!1](s.event?s.event(e):e)}function R(e){this.l[e.type+!0](s.event?s.event(e):e)}function q(e,t,n,r,o,i,c,a,u){var l,f,p,m,v,d,h,y,_,g,O,w=t.type;if(void 0!==t.constructor)return null;null!=n.__h&&(u=n.__h,a=t.__e=n.__e,t.__h=null,i=[a]),(l=s.__b)&&l(t);try{e:if("function"==typeof w){if(y=t.props,_=(l=w.contextType)&&r[l.__c],g=l?_?_.props.value:l.__:r,n.__c?h=(f=t.__c=n.__c).__=f.__E:("prototype"in w&&w.prototype.render?t.__c=f=new w(y,g):(t.__c=f=new j(y,g),f.constructor=w,f.render=F),_&&_.sub(f),f.props=y,f.state||(f.state={}),f.context=g,f.__n=r,p=f.__d=!0,f.__h=[]),null==f.__s&&(f.__s=f.state),null!=w.getDerivedStateFromProps&&(f.__s==f.state&&(f.__s=b({},f.__s)),b(f.__s,w.getDerivedStateFromProps(y,f.__s))),m=f.props,v=f.state,p)null==w.getDerivedStateFromProps&&null!=f.componentWillMount&&f.componentWillMount(),null!=f.componentDidMount&&f.__h.push(f.componentDidMount);else{if(null==w.getDerivedStateFromProps&&y!==m&&null!=f.componentWillReceiveProps&&f.componentWillReceiveProps(y,g),!f.__e&&null!=f.shouldComponentUpdate&&!1===f.shouldComponentUpdate(y,f.__s,g)||t.__v===n.__v){f.props=y,f.state=f.__s,t.__v!==n.__v&&(f.__d=!1),f.__v=t,t.__e=n.__e,t.__k=n.__k,f.__h.length&&c.push(f);break e}null!=f.componentWillUpdate&&f.componentWillUpdate(y,f.__s,g),null!=f.componentDidUpdate&&f.__h.push((function(){f.componentDidUpdate(m,v,d)}))}f.context=g,f.props=y,f.state=f.__s,(l=s.__r)&&l(t),f.__d=!1,f.__v=t,f.__P=e,l=f.render(f.props,f.state,f.context),f.state=f.__s,null!=f.getChildContext&&(r=b(b({},r),f.getChildContext())),p||null==f.getSnapshotBeforeUpdate||(d=f.getSnapshotBeforeUpdate(m,v)),O=null!=l&&l.type===S&&null==l.key?l.props.children:l,D(e,Array.isArray(O)?O:[O],t,n,r,o,i,c,a,u),f.base=t.__e,t.__h=null,f.__h.length&&c.push(f),h&&(f.__E=f.__=null),f.__e=!1}else null==i&&t.__v===n.__v?(t.__k=n.__k,t.__e=n.__e):t.__e=M(n.__e,t,n,r,o,i,c,u);(l=s.diffed)&&l(t)}catch(e){t.__v=null,(u||null!=i)&&(t.__e=a,t.__h=!!u,i[i.indexOf(a)]=null),s.__e(e,t,n)}}function L(e,t){s.__c&&s.__c(t,e),e.some((function(t){try{e=t.__h,t.__h=[],e.some((function(e){e.call(t)}))}catch(e){s.__e(e,t.__v)}}))}function M(e,t,n,r,o,i,c,a){var u,l,s,f,p=n.props,m=t.props,v=t.type,y=0;if("svg"===v&&(o=!0),null!=i)for(;y<i.length;y++)if((u=i[y])&&(u===e||(v?u.localName==v:3==u.nodeType))){e=u,i[y]=null;break}if(null==e){if(null===v)return document.createTextNode(m);e=o?document.createElementNS("http://www.w3.org/2000/svg",v):document.createElement(v,m.is&&m),i=null,a=!1}if(null===v)p===m||a&&e.data===m||(e.data=m);else{if(i=i&&h.slice.call(e.childNodes),l=(p=n.props||d).dangerouslySetInnerHTML,s=m.dangerouslySetInnerHTML,!a){if(null!=i)for(p={},f=0;f<e.attributes.length;f++)p[e.attributes[f].name]=e.attributes[f].value;(s||l)&&(s&&(l&&s.__html==l.__html||s.__html===e.innerHTML)||(e.innerHTML=s&&s.__html||""))}if(function(e,t,n,r,o){var i;for(i in n)"children"===i||"key"===i||i in t||N(e,i,null,n[i],r);for(i in t)o&&"function"!=typeof t[i]||"children"===i||"key"===i||"value"===i||"checked"===i||n[i]===t[i]||N(e,i,t[i],n[i],r)}(e,m,p,o,a),s)t.__k=[];else if(y=t.props.children,D(e,Array.isArray(y)?y:[y],t,n,r,o&&"foreignObject"!==v,i,c,e.firstChild,a),null!=i)for(y=i.length;y--;)null!=i[y]&&_(i[y]);a||("value"in m&&void 0!==(y=m.value)&&(y!==e.value||"progress"===v&&!y)&&N(e,"value",y,p.value,!1),"checked"in m&&void 0!==(y=m.checked)&&y!==e.checked&&N(e,"checked",y,p.checked,!1))}return e}function H(e,t,n){try{"function"==typeof e?e(t):e.current=t}catch(e){s.__e(e,n)}}function U(e,t,n){var r,o,i;if(s.unmount&&s.unmount(e),(r=e.ref)&&(r.current&&r.current!==e.__e||H(r,null,t)),n||"function"==typeof e.type||(n=null!=(o=e.__e)),e.__e=e.__d=void 0,null!=(r=e.__c)){if(r.componentWillUnmount)try{r.componentWillUnmount()}catch(e){s.__e(e,t)}r.base=r.__P=null}if(r=e.__k)for(i=0;i<r.length;i++)r[i]&&U(r[i],t,n);null!=o&&_(o)}function F(e,t,n){return this.constructor(e,n)}function B(e,t,n){var r,o,i;s.__&&s.__(e,t),o=(r="function"==typeof n)?null:n&&n.__k||t.__k,i=[],q(t,e=(!r&&n||t).__k=g(S,null,[e]),o||d,d,void 0!==t.ownerSVGElement,!r&&n?[n]:o?null:t.firstChild?h.slice.call(t.childNodes):null,i,!r&&n?n:o?o.__e:t.firstChild,r),L(i,e)}function V(e,t){B(e,t,V)}function W(e,t,n){var r,o,i,c=arguments,a=b({},e.props);for(i in t)"key"==i?r=t[i]:"ref"==i?o=t[i]:a[i]=t[i];if(arguments.length>3)for(n=[n],i=3;i<arguments.length;i++)n.push(c[i]);return null!=n&&(a.children=n),O(e.type,a,r||e.key,o||e.ref,null)}s={__e:function(e,t){for(var n,r,o;t=t.__;)if((n=t.__c)&&!n.__)try{if((r=n.constructor)&&null!=r.getDerivedStateFromError&&(n.setState(r.getDerivedStateFromError(e)),o=n.__d),null!=n.componentDidCatch&&(n.componentDidCatch(e),o=n.__d),o)return n.__E=n}catch(t){e=t}throw e},__v:0},j.prototype.setState=function(e,t){var n;n=null!=this.__s&&this.__s!==this.state?this.__s:this.__s=b({},this.state),"function"==typeof e&&(e=e(b({},n),this.props)),e&&b(n,e),null!=e&&this.__v&&(t&&this.__h.push(t),P(this))},j.prototype.forceUpdate=function(e){this.__v&&(this.__e=!0,e&&this.__h.push(e),P(this))},j.prototype.render=S,f=[],p="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,I.__r=0,v=0;var K,z,J,$=0,Q=[],Z=s.__b,Y=s.__r,G=s.diffed,X=s.__c,ee=s.unmount;function te(e,t){s.__h&&s.__h(z,e,$||t),$=0;var n=z.__H||(z.__H={__:[],__h:[]});return e>=n.__.length&&n.__.push({}),n.__[e]}function ne(e){return $=1,re(pe,e)}function re(e,t,n){var r=te(K++,2);return r.t=e,r.__c||(r.__=[n?n(t):pe(void 0,t),function(e){var t=r.t(r.__[0],e);r.__[0]!==t&&(r.__=[t,r.__[1]],r.__c.setState({}))}],r.__c=z),r.__}function oe(e,t){var n=te(K++,3);!s.__s&&fe(n.__H,t)&&(n.__=e,n.__H=t,z.__H.__h.push(n))}function ie(e,t){var n=te(K++,4);!s.__s&&fe(n.__H,t)&&(n.__=e,n.__H=t,z.__h.push(n))}function ce(e,t){var n=te(K++,7);return fe(n.__H,t)&&(n.__=e(),n.__H=t,n.__h=e),n.__}function ae(){Q.forEach((function(e){if(e.__P)try{e.__H.__h.forEach(le),e.__H.__h.forEach(se),e.__H.__h=[]}catch(t){e.__H.__h=[],s.__e(t,e.__v)}})),Q=[]}s.__b=function(e){z=null,Z&&Z(e)},s.__r=function(e){Y&&Y(e),K=0;var t=(z=e.__c).__H;t&&(t.__h.forEach(le),t.__h.forEach(se),t.__h=[])},s.diffed=function(e){G&&G(e);var t=e.__c;t&&t.__H&&t.__H.__h.length&&(1!==Q.push(t)&&J===s.requestAnimationFrame||((J=s.requestAnimationFrame)||function(e){var t,n=function(){clearTimeout(r),ue&&cancelAnimationFrame(t),setTimeout(e)},r=setTimeout(n,100);ue&&(t=requestAnimationFrame(n))})(ae)),z=void 0},s.__c=function(e,t){t.some((function(e){try{e.__h.forEach(le),e.__h=e.__h.filter((function(e){return!e.__||se(e)}))}catch(n){t.some((function(e){e.__h&&(e.__h=[])})),t=[],s.__e(n,e.__v)}})),X&&X(e,t)},s.unmount=function(e){ee&&ee(e);var t=e.__c;if(t&&t.__H)try{t.__H.__.forEach(le)}catch(e){s.__e(e,t.__v)}};var ue="function"==typeof requestAnimationFrame;function le(e){var t=z;"function"==typeof e.__c&&e.__c(),z=t}function se(e){var t=z;e.__c=e.__(),z=t}function fe(e,t){return!e||e.length!==t.length||t.some((function(t,n){return t!==e[n]}))}function pe(e,t){return"function"==typeof t?t(e):t}function me(e,t){for(var n in t)e[n]=t[n];return e}function ve(e,t){for(var n in e)if("__source"!==n&&!(n in t))return!0;for(var r in t)if("__source"!==r&&e[r]!==t[r])return!0;return!1}function de(e){this.props=e}(de.prototype=new j).isPureReactComponent=!0,de.prototype.shouldComponentUpdate=function(e,t){return ve(this.props,e)||ve(this.state,t)};var he=s.__b;s.__b=function(e){e.type&&e.type.__f&&e.ref&&(e.props.ref=e.ref,e.ref=null),he&&he(e)};var ye="undefined"!=typeof Symbol&&Symbol.for&&Symbol.for("react.forward_ref")||3911;var be=function(e,t){return null==e?null:A(A(e).map(t))},_e={map:be,forEach:be,count:function(e){return e?A(e).length:0},only:function(e){var t=A(e);if(1!==t.length)throw"Children.only";return t[0]},toArray:A},ge=s.__e;function Oe(){this.__u=0,this.t=null,this.__b=null}function Se(e){var t=e.__.__c;return t&&t.__e&&t.__e(e)}function je(){this.u=null,this.o=null}s.__e=function(e,t,n){if(e.then)for(var r,o=t;o=o.__;)if((r=o.__c)&&r.__c)return null==t.__e&&(t.__e=n.__e,t.__k=n.__k),r.__c(e,t);ge(e,t,n)},(Oe.prototype=new j).__c=function(e,t){var n=t.__c,r=this;null==r.t&&(r.t=[]),r.t.push(n);var o=Se(r.__v),i=!1,c=function(){i||(i=!0,n.componentWillUnmount=n.__c,o?o(a):a())};n.__c=n.componentWillUnmount,n.componentWillUnmount=function(){c(),n.__c&&n.__c()};var a=function(){if(!--r.__u){if(r.state.__e){var e=r.state.__e;r.__v.__k[0]=function e(t,n,r){return t&&(t.__v=null,t.__k=t.__k&&t.__k.map((function(t){return e(t,n,r)})),t.__c&&t.__c.__P===n&&(t.__e&&r.insertBefore(t.__e,t.__d),t.__c.__e=!0,t.__c.__P=r)),t}(e,e.__c.__P,e.__c.__O)}var t;for(r.setState({__e:r.__b=null});t=r.t.pop();)t.forceUpdate()}},u=!0===t.__h;r.__u++||u||r.setState({__e:r.__b=r.__v.__k[0]}),e.then(c,c)},Oe.prototype.componentWillUnmount=function(){this.t=[]},Oe.prototype.render=function(e,t){if(this.__b){if(this.__v.__k){var n=document.createElement("div"),r=this.__v.__k[0].__c;this.__v.__k[0]=function e(t,n,r){return t&&(t.__c&&t.__c.__H&&(t.__c.__H.__.forEach((function(e){"function"==typeof e.__c&&e.__c()})),t.__c.__H=null),null!=(t=me({},t)).__c&&(t.__c.__P===r&&(t.__c.__P=n),t.__c=null),t.__k=t.__k&&t.__k.map((function(t){return e(t,n,r)}))),t}(this.__b,n,r.__O=r.__P)}this.__b=null}var o=t.__e&&g(S,null,e.fallback);return o&&(o.__h=null),[g(S,null,t.__e?null:e.children),o]};var we=function(e,t,n){if(++n[1]===n[0]&&e.o.delete(t),e.props.revealOrder&&("t"!==e.props.revealOrder[0]||!e.o.size))for(n=e.u;n;){for(;n.length>3;)n.pop()();if(n[1]<n[0])break;e.u=n=n[2]}};function Ee(e){return this.getChildContext=function(){return e.context},e.children}function Pe(e){var t=this,n=e.i;t.componentWillUnmount=function(){B(null,t.l),t.l=null,t.i=null},t.i&&t.i!==n&&t.componentWillUnmount(),e.__v?(t.l||(t.i=n,t.l={nodeType:1,parentNode:n,childNodes:[],appendChild:function(e){this.childNodes.push(e),t.i.appendChild(e)},insertBefore:function(e,n){this.childNodes.push(e),t.i.appendChild(e)},removeChild:function(e){this.childNodes.splice(this.childNodes.indexOf(e)>>>1,1),t.i.removeChild(e)}}),B(g(Ee,{context:t.context},e.__v),t.l)):t.l&&t.componentWillUnmount()}function Ie(e,t){return g(Pe,{__v:e,i:t})}(je.prototype=new j).__e=function(e){var t=this,n=Se(t.__v),r=t.o.get(e);return r[0]++,function(o){var i=function(){t.props.revealOrder?(r.push(o),we(t,e,r)):o()};n?n(i):i()}},je.prototype.render=function(e){this.u=null,this.o=new Map;var t=A(e.children);e.revealOrder&&"b"===e.revealOrder[0]&&t.reverse();for(var n=t.length;n--;)this.o.set(t[n],this.u=[1,0,this.u]);return e.children},je.prototype.componentDidUpdate=je.prototype.componentDidMount=function(){var e=this;this.o.forEach((function(t,n){we(e,n,t)}))};var De="undefined"!=typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103,ke=/^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|fill|flood|font|glyph(?!R)|horiz|marker(?!H|W|U)|overline|paint|stop|strikethrough|stroke|text(?!L)|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/,Ae=function(e){return("undefined"!=typeof Symbol&&"symbol"==n(Symbol())?/fil|che|rad/i:/fil|che|ra/i).test(e)};function Ce(e,t,n){return null==t.__k&&(t.textContent=""),B(e,t),"function"==typeof n&&n(),e?e.__c:null}j.prototype.isReactComponent={},["componentWillMount","componentWillReceiveProps","componentWillUpdate"].forEach((function(e){Object.defineProperty(j.prototype,e,{configurable:!0,get:function(){return this["UNSAFE_"+e]},set:function(t){Object.defineProperty(this,e,{configurable:!0,writable:!0,value:t})}})}));var xe=s.event;function Ne(){}function Te(){return this.cancelBubble}function Re(){return this.defaultPrevented}s.event=function(e){return xe&&(e=xe(e)),e.persist=Ne,e.isPropagationStopped=Te,e.isDefaultPrevented=Re,e.nativeEvent=e};var qe,Le={configurable:!0,get:function(){return this.class}},Me=s.vnode;s.vnode=function(e){var t=e.type,n=e.props,r=n;if("string"==typeof t){for(var o in r={},n){var i=n[o];"value"===o&&"defaultValue"in n&&null==i||("defaultValue"===o&&"value"in n&&null==n.value?o="value":"download"===o&&!0===i?i="":/ondoubleclick/i.test(o)?o="ondblclick":/^onchange(textarea|input)/i.test(o+t)&&!Ae(n.type)?o="oninput":/^on(Ani|Tra|Tou|BeforeInp)/.test(o)?o=o.toLowerCase():ke.test(o)?o=o.replace(/[A-Z0-9]/,"-$&").toLowerCase():null===i&&(i=void 0),r[o]=i)}"select"==t&&r.multiple&&Array.isArray(r.value)&&(r.value=A(n.children).forEach((function(e){e.props.selected=-1!=r.value.indexOf(e.props.value)}))),"select"==t&&null!=r.defaultValue&&(r.value=A(n.children).forEach((function(e){e.props.selected=r.multiple?-1!=r.defaultValue.indexOf(e.props.value):r.defaultValue==e.props.value}))),e.props=r}t&&n.class!=n.className&&(Le.enumerable="className"in n,null!=n.className&&(r.class=n.className),Object.defineProperty(r,"className",Le)),e.$$typeof=De,Me&&Me(e)};var He=s.__r;s.__r=function(e){He&&He(e),qe=e.__c};var Ue={ReactCurrentDispatcher:{current:{readContext:function(e){return qe.__n[e.__c].props.value}}}};"object"==("undefined"==typeof performance?"undefined":n(performance))&&"function"==typeof performance.now&&performance.now.bind(performance);function Fe(e){return!!e&&e.$$typeof===De}var Be={useState:ne,useReducer:re,useEffect:oe,useLayoutEffect:ie,useRef:function(e){return $=5,ce((function(){return{current:e}}),[])},useImperativeHandle:function(e,t,n){$=6,ie((function(){"function"==typeof e?e(t()):e&&(e.current=t())}),null==n?n:n.concat(e))},useMemo:ce,useCallback:function(e,t){return $=8,ce((function(){return e}),t)},useContext:function(e){var t=z.context[e.__c],n=te(K++,9);return n.__c=e,t?(null==n.__&&(n.__=!0,t.sub(z)),t.props.value):e.__},useDebugValue:function(e,t){s.useDebugValue&&s.useDebugValue(t?t(e):e)},version:"16.8.0",Children:_e,render:Ce,hydrate:function(e,t,n){return V(e,t),"function"==typeof n&&n(),e?e.__c:null},unmountComponentAtNode:function(e){return!!e.__k&&(B(null,e),!0)},createPortal:Ie,createElement:g,createContext:function(e,t){var n={__c:t="__cC"+v++,__:e,Consumer:function(e,t){return e.children(t)},Provider:function(e){var n,r;return this.getChildContext||(n=[],(r={})[t]=this,this.getChildContext=function(){return r},this.shouldComponentUpdate=function(e){this.props.value!==e.value&&n.some(P)},this.sub=function(e){n.push(e);var t=e.componentWillUnmount;e.componentWillUnmount=function(){n.splice(n.indexOf(e),1),t&&t.call(e)}}),e.children}};return n.Provider.__=n.Consumer.contextType=n},createFactory:function(e){return g.bind(null,e)},cloneElement:function(e){return Fe(e)?W.apply(null,arguments):e},createRef:function(){return{current:null}},Fragment:S,isValidElement:Fe,findDOMNode:function(e){return e&&(e.base||1===e.nodeType&&e)||null},Component:j,PureComponent:de,memo:function(e,t){function n(e){var n=this.props.ref,r=n==e.ref;return!r&&n&&(n.call?n(null):n.current=null),t?!t(this.props,e)||!r:ve(this.props,e)}function r(t){return this.shouldComponentUpdate=n,g(e,t)}return r.displayName="Memo("+(e.displayName||e.name)+")",r.prototype.isReactComponent=!0,r.__f=!0,r},forwardRef:function(e){function t(t,r){var o=me({},t);return delete o.ref,e(o,(r=t.ref||r)&&("object"!=n(r)||"current"in r)?r:null)}return t.$$typeof=ye,t.render=t,t.prototype.isReactComponent=t.__f=!0,t.displayName="ForwardRef("+(e.displayName||e.name)+")",t},unstable_batchedUpdates:function(e,t){return e(t)},StrictMode:S,Suspense:Oe,SuspenseList:je,lazy:function(e){var t,n,r;function o(o){if(t||(t=e()).then((function(e){n=e.default||e}),(function(e){r=e})),r)throw r;if(!n)throw t;return g(n,o)}return o.displayName="Lazy",o.__f=!0,o},__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:Ue};function Ve(){return Be.createElement("svg",{width:"44",height:"15",className:"DocSearch-Control-Key-Icon"},Be.createElement("path",{d:"M2.118,11.5A1.519,1.519,0,0,1,1,11.042,1.583,1.583,0,0,1,1,8.815a1.519,1.519,0,0,1,1.113-.458h.715V6.643H2.118A1.519,1.519,0,0,1,1,6.185,1.519,1.519,0,0,1,.547,5.071,1.519,1.519,0,0,1,1,3.958,1.519,1.519,0,0,1,2.118,3.5a1.519,1.519,0,0,1,1.114.458A1.519,1.519,0,0,1,3.69,5.071v.715H5.4V5.071A1.564,1.564,0,0,1,6.976,3.5,1.564,1.564,0,0,1,8.547,5.071,1.564,1.564,0,0,1,6.976,6.643H6.261V8.357h.715a1.575,1.575,0,0,1,1.113,2.685,1.583,1.583,0,0,1-2.227,0A1.519,1.519,0,0,1,5.4,9.929V9.214H3.69v.715a1.519,1.519,0,0,1-.458,1.113A1.519,1.519,0,0,1,2.118,11.5Zm0-.857a.714.714,0,0,0,.715-.714V9.214H2.118a.715.715,0,1,0,0,1.429Zm4.858,0a.715.715,0,1,0,0-1.429H6.261v.715a.714.714,0,0,0,.715.714ZM3.69,8.357H5.4V6.643H3.69ZM2.118,5.786h.715V5.071a.714.714,0,0,0-.715-.714.715.715,0,0,0-.5,1.22A.686.686,0,0,0,2.118,5.786Zm4.143,0h.715a.715.715,0,0,0,.5-1.22.715.715,0,0,0-1.22.5Z",fill:"currentColor"}),Be.createElement("path",{d:"M12.4,11.475H11.344l3.879-7.95h1.056Z",fill:"currentColor"}),Be.createElement("path",{d:"M25.073,5.384l-.864.576a2.121,2.121,0,0,0-1.786-.923,2.207,2.207,0,0,0-2.266,2.326,2.206,2.206,0,0,0,2.266,2.325,2.1,2.1,0,0,0,1.782-.918l.84.617a3.108,3.108,0,0,1-2.622,1.293,3.217,3.217,0,0,1-3.349-3.317,3.217,3.217,0,0,1,3.349-3.317A3.046,3.046,0,0,1,25.073,5.384Z",fill:"currentColor"}),Be.createElement("path",{d:"M30.993,5.142h-2.07v5.419H27.891V5.142h-2.07V4.164h5.172Z",fill:"currentColor"}),Be.createElement("path",{d:"M34.67,4.164c1.471,0,2.266.658,2.266,1.851,0,1.087-.832,1.809-2.134,1.855l2.107,2.691h-1.28L33.591,7.87H33.07v2.691H32.038v-6.4Zm-1.6.969v1.8h1.572c.832,0,1.22-.3,1.22-.918s-.411-.882-1.22-.882Z",fill:"currentColor"}),Be.createElement("path",{d:"M42.883,10.561H38.31v-6.4h1.033V9.583h3.54Z",fill:"currentColor"}))}function VDe(){return Be.createElement("svg",{width:"15",height:"15",className:"DocSearch-Button-Key-Icon"},Be.createElement("path",{d:"M3.193,7.971H2.576V10.7H1.542V4.3H2.576V6.993h.631L5.611,4.3H6.946L4.066,7.422,7.142,10.7h-1.4Z",fill:"currentColor"}))}function We(){return Be.createElement("svg",{width:"20",height:"20",className:"DocSearch-Search-Icon",viewBox:"0 0 20 20"},Be.createElement("path",{d:"m15.938 17-4.98-4.979q-.625.458-1.375.719Q8.833 13 8 13q-2.083 0-3.542-1.458Q3 10.083 3 8q0-2.083 1.458-3.542Q5.917 3 8 3q2.083 0 3.542 1.458Q13 5.917 13 8q0 .833-.26 1.583-.261.75-.719 1.375L17 15.938ZM8 11.5q1.458 0 2.479-1.021Q11.5 9.458 11.5 8q0-1.458-1.021-2.479Q9.458 4.5 8 4.5q-1.458 0-2.479 1.021Q4.5 6.542 4.5 8q0 1.458 1.021 2.479Q6.542 11.5 8 11.5Z",fill:"currentColor",fillRule:"evenodd",strokeLinecap:"round",strokeLinejoin:"round"}))}var Ke=["translations"];function ze(){return ze=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},ze.apply(this,arguments)}function Je(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==n)return;var r,o,i=[],c=!0,a=!1;try{for(n=n.call(e);!(c=(r=n.next()).done)&&(i.push(r.value),!t||i.length!==t);c=!0);}catch(e){a=!0,o=e}finally{try{c||null==n.return||n.return()}finally{if(a)throw o}}return i}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return $e(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return $e(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function $e(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function Qe(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var Ze="Ctrl";var Ye=Be.forwardRef((function(e,t){var n=e.translations,r=void 0===n?{}:n,o=Qe(e,Ke),i=r.buttonText,c=void 0===i?"Search":i,a=r.buttonAriaLabel,u=void 0===a?"Search":a,l=Je(ne(null),2),s=l[0],f=l[1];return oe((function(){"undefined"!=typeof navigator&&(/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform)?f("⌘"):f(Ze))}),[]),Be.createElement("button",ze({type:"button",className:"DocSearch DocSearch-Button","aria-label":u},o,{ref:t}),Be.createElement("span",{className:"DocSearch-Button-Container"},Be.createElement(We,null),Be.createElement("span",{className:"DocSearch-Button-Placeholder"},c)),Be.createElement("span",{className:"DocSearch-Button-Keys"},null!==s&&Be.createElement(Be.Fragment,null,Be.createElement("kbd",{className:"DocSearch-Command-Key"},s===Ze?Be.createElement(Ve,null):s),Be.createElement("kbd",{className:"DocSearch-Button-Key"},s===Ze?Be.createElement(VDe,null):s))))}));function Ge(e,t){var n=void 0;return function(){for(var r=arguments.length,o=new Array(r),i=0;i<r;i++)o[i]=arguments[i];n&&clearTimeout(n),n=setTimeout((function(){return e.apply(void 0,o)}),t)}}function Xe(e){return e.reduce((function(e,t){return e.concat(t)}),[])}var et=0;function tt(e){return 0===e.collections.length?0:e.collections.reduce((function(e,t){return e+t.items.length}),0)}function nt(e){return e!==Object(e)}function rt(e,t){if(e===t)return!0;if(nt(e)||nt(t)||"function"==typeof e||"function"==typeof t)return e===t;if(Object.keys(e).length!==Object.keys(t).length)return!1;for(var n=0,r=Object.keys(e);n<r.length;n++){var o=r[n];if(!(o in t))return!1;if(!rt(e[o],t[o]))return!1}return!0}var ot=function(){};var it=[{segment:"autocomplete-core",version:"1.9.3"}];function ct(e){var t=e.item,n=e.items;return{index:t.__autocomplete_indexName,items:[t],positions:[1+n.findIndex((function(e){return e.objectID===t.objectID}))],queryID:t.__autocomplete_queryID,algoliaSource:["autocomplete"]}}function at(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,i,c,a=[],u=!0,l=!1;try{if(i=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(r=i.call(n)).done)&&(a.push(r.value),a.length!==t);u=!0);}catch(e){l=!0,o=e}finally{try{if(!u&&null!=n.return&&(c=n.return(),Object(c)!==c))return}finally{if(l)throw o}}return a}}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return ut(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return ut(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function ut(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var lt=["items"],st=["items"];function ft(e){return ft="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},ft(e)}function pt(e){return function(e){if(Array.isArray(e))return mt(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return mt(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return mt(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function mt(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function vt(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}function dt(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function ht(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?dt(Object(n),!0).forEach((function(t){yt(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):dt(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function yt(e,t,n){return(t=function(e){var t=function(e,t){if("object"!==ft(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,t||"default");if("object"!==ft(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"===ft(t)?t:String(t)}(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function bt(e){for(var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:20,n=[],r=0;r<e.objectIDs.length;r+=t)n.push(ht(ht({},e),{},{objectIDs:e.objectIDs.slice(r,r+t)}));return n}function _t(e){return e.map((function(e){var t=e.items,n=vt(e,lt);return ht(ht({},n),{},{objectIDs:(null==t?void 0:t.map((function(e){return e.objectID})))||n.objectIDs})}))}function gt(e){var t,n,r,o=(t=at((e.version||"").split(".").map(Number),2),n=t[0],r=t[1],n>=3||2===n&&r>=4||1===n&&r>=10);function i(t,n,r){if(o&&void 0!==r){var i=r[0].__autocomplete_algoliaCredentials,c={"X-Algolia-Application-Id":i.appId,"X-Algolia-API-Key":i.apiKey};e.apply(void 0,[t].concat(pt(n),[{headers:c}]))}else e.apply(void 0,[t].concat(pt(n)))}return{init:function(t,n){e("init",{appId:t,apiKey:n})},setUserToken:function(t){e("setUserToken",t)},clickedObjectIDsAfterSearch:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];t.length>0&&i("clickedObjectIDsAfterSearch",_t(t),t[0].items)},clickedObjectIDs:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];t.length>0&&i("clickedObjectIDs",_t(t),t[0].items)},clickedFilters:function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];n.length>0&&e.apply(void 0,["clickedFilters"].concat(n))},convertedObjectIDsAfterSearch:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];t.length>0&&i("convertedObjectIDsAfterSearch",_t(t),t[0].items)},convertedObjectIDs:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];t.length>0&&i("convertedObjectIDs",_t(t),t[0].items)},convertedFilters:function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];n.length>0&&e.apply(void 0,["convertedFilters"].concat(n))},viewedObjectIDs:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];t.length>0&&t.reduce((function(e,t){var n=t.items,r=vt(t,st);return[].concat(pt(e),pt(bt(ht(ht({},r),{},{objectIDs:(null==n?void 0:n.map((function(e){return e.objectID})))||r.objectIDs})).map((function(e){return{items:n,payload:e}}))))}),[]).forEach((function(e){var t=e.items;return i("viewedObjectIDs",[e.payload],t)}))},viewedFilters:function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];n.length>0&&e.apply(void 0,["viewedFilters"].concat(n))}}}function Ot(e){var t=e.items.reduce((function(e,t){var n;return e[t.__autocomplete_indexName]=(null!==(n=e[t.__autocomplete_indexName])&&void 0!==n?n:[]).concat(t),e}),{});return Object.keys(t).map((function(e){return{index:e,items:t[e],algoliaSource:["autocomplete"]}}))}function St(e){return e.objectID&&e.__autocomplete_indexName&&e.__autocomplete_queryID}function jt(e){return jt="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},jt(e)}function wt(e){return function(e){if(Array.isArray(e))return Et(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return Et(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return Et(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function Et(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function Pt(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function It(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?Pt(Object(n),!0).forEach((function(t){Dt(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Pt(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function Dt(e,t,n){return(t=function(e){var t=function(e,t){if("object"!==jt(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,t||"default");if("object"!==jt(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"===jt(t)?t:String(t)}(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var kt="2.6.0",At="https://cdn.jsdelivr.net/npm/search-insights@".concat(kt,"/dist/search-insights.min.js"),Ct=Ge((function(e){var t=e.onItemsChange,n=e.items,r=e.insights,o=e.state;t({insights:r,insightsEvents:Ot({items:n}).map((function(e){return It({eventName:"Items Viewed"},e)})),state:o})}),400);function xt(e){var t=function(e){return It({onItemsChange:function(e){var t=e.insights,n=e.insightsEvents;t.viewedObjectIDs.apply(t,wt(n.map((function(e){return It(It({},e),{},{algoliaSource:[].concat(wt(e.algoliaSource||[]),["autocomplete-internal"])})}))))},onSelect:function(e){var t=e.insights,n=e.insightsEvents;t.clickedObjectIDsAfterSearch.apply(t,wt(n.map((function(e){return It(It({},e),{},{algoliaSource:[].concat(wt(e.algoliaSource||[]),["autocomplete-internal"])})}))))},onActive:ot},e)}(e),n=t.insightsClient,r=t.onItemsChange,o=t.onSelect,i=t.onActive,c=n;n||function(e){if("undefined"!=typeof window)e({window:window})}((function(e){var t=e.window,n=t.AlgoliaAnalyticsObject||"aa";"string"==typeof n&&(c=t[n]),c||(t.AlgoliaAnalyticsObject=n,t[n]||(t[n]=function(){t[n].queue||(t[n].queue=[]);for(var e=arguments.length,r=new Array(e),o=0;o<e;o++)r[o]=arguments[o];t[n].queue.push(r)}),t[n].version=kt,c=t[n],function(e){var t="[Autocomplete]: Could not load search-insights.js. Please load it manually following https://alg.li/insights-autocomplete";try{var n=e.document.createElement("script");n.async=!0,n.src=At,n.onerror=function(){console.error(t)},document.body.appendChild(n)}catch(e){console.error(t)}}(t))}));var a=gt(c),u={current:[]},l=Ge((function(e){var t=e.state;if(t.isOpen){var n=t.collections.reduce((function(e,t){return[].concat(wt(e),wt(t.items))}),[]).filter(St);rt(u.current.map((function(e){return e.objectID})),n.map((function(e){return e.objectID})))||(u.current=n,n.length>0&&Ct({onItemsChange:r,items:n,insights:a,state:t}))}}),0);return{name:"aa.algoliaInsightsPlugin",subscribe:function(e){var t=e.setContext,n=e.onSelect,r=e.onActive;c("addAlgoliaAgent","insights-plugin"),t({algoliaInsightsPlugin:{__algoliaSearchParameters:{clickAnalytics:!0},insights:a}}),n((function(e){var t=e.item,n=e.state,r=e.event;St(t)&&o({state:n,event:r,insights:a,item:t,insightsEvents:[It({eventName:"Item Selected"},ct({item:t,items:u.current}))]})})),r((function(e){var t=e.item,n=e.state,r=e.event;St(t)&&i({state:n,event:r,insights:a,item:t,insightsEvents:[It({eventName:"Item Active"},ct({item:t,items:u.current}))]})}))},onStateChange:function(e){var t=e.state;l({state:t})},__autocomplete_pluginOptions:e}}function Nt(e,t){var n=t;return{then:function(t,r){return Nt(e.then(Rt(t,n,e),Rt(r,n,e)),n)},catch:function(t){return Nt(e.catch(Rt(t,n,e)),n)},finally:function(t){return t&&n.onCancelList.push(t),Nt(e.finally(Rt(t&&function(){return n.onCancelList=[],t()},n,e)),n)},cancel:function(){n.isCanceled=!0;var e=n.onCancelList;n.onCancelList=[],e.forEach((function(e){e()}))},isCanceled:function(){return!0===n.isCanceled}}}function Tt(e){return Nt(e,{isCanceled:!1,onCancelList:[]})}function Rt(e,t,n){return e?function(n){return t.isCanceled?n:e(n)}:n}function qt(e,t,n,r){if(!n)return null;if(e<0&&(null===t||null!==r&&0===t))return n+e;var o=(null===t?-1:t)+e;return o<=-1||o>=n?null===r?null:0:o}function Lt(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function Mt(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?Lt(Object(n),!0).forEach((function(t){Ht(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Lt(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function Ht(e,t,n){return(t=function(e){var t=function(e,t){if("object"!==Ut(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,t||"default");if("object"!==Ut(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"===Ut(t)?t:String(t)}(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function Ut(e){return Ut="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},Ut(e)}function Ft(e){var t=function(e){var t=e.collections.map((function(e){return e.items.length})).reduce((function(e,t,n){var r=(e[n-1]||0)+t;return e.push(r),e}),[]).reduce((function(t,n){return n<=e.activeItemId?t+1:t}),0);return e.collections[t]}(e);if(!t)return null;var n=t.items[function(e){for(var t=e.state,n=e.collection,r=!1,o=0,i=0;!1===r;){var c=t.collections[o];if(c===n){r=!0;break}i+=c.items.length,o++}return t.activeItemId-i}({state:e,collection:t})],r=t.source;return{item:n,itemInputValue:r.getItemInputValue({item:n,state:e}),itemUrl:r.getItemUrl({item:n,state:e}),source:r}}var Bt=/((gt|sm)-|galaxy nexus)|samsung[- ]|samsungbrowser/i;function Vt(e){return Vt="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},Vt(e)}function Wt(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function Kt(e,t,n){return(t=function(e){var t=function(e,t){if("object"!==Vt(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,t||"default");if("object"!==Vt(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"===Vt(t)?t:String(t)}(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function zt(e,t,n){var r,o=t.initialState;return{getState:function(){return o},dispatch:function(r,i){var c=function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?Wt(Object(n),!0).forEach((function(t){Kt(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Wt(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},o);o=e(o,{type:r,props:t,payload:i}),n({state:o,prevState:c})},pendingRequests:(r=[],{add:function(e){return r.push(e),e.finally((function(){r=r.filter((function(t){return t!==e}))}))},cancelAll:function(){r.forEach((function(e){return e.cancel()}))},isEmpty:function(){return 0===r.length}})}}function Jt(e){return Jt="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},Jt(e)}function $t(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function Qt(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?$t(Object(n),!0).forEach((function(t){Zt(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):$t(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function Zt(e,t,n){return(t=function(e){var t=function(e,t){if("object"!==Jt(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,t||"default");if("object"!==Jt(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"===Jt(t)?t:String(t)}(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function Yt(e){return Yt="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},Yt(e)}function Gt(e){return function(e){if(Array.isArray(e))return Xt(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return Xt(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return Xt(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function Xt(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function en(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function tn(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?en(Object(n),!0).forEach((function(t){nn(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):en(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function nn(e,t,n){return(t=function(e){var t=function(e,t){if("object"!==Yt(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,t||"default");if("object"!==Yt(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"===Yt(t)?t:String(t)}(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function rn(e,t){var n,r="undefined"!=typeof window?window:{},o=e.plugins||[];return tn(tn({debug:!1,openOnFocus:!1,placeholder:"",autoFocus:!1,defaultActiveItemId:null,stallThreshold:300,insights:!1,environment:r,shouldPanelOpen:function(e){return tt(e.state)>0},reshape:function(e){return e.sources}},e),{},{id:null!==(n=e.id)&&void 0!==n?n:"autocomplete-".concat(et++),plugins:o,initialState:tn({activeItemId:null,query:"",completion:null,collections:[],isOpen:!1,status:"idle",context:{}},e.initialState),onStateChange:function(t){var n;null===(n=e.onStateChange)||void 0===n||n.call(e,t),o.forEach((function(e){var n;return null===(n=e.onStateChange)||void 0===n?void 0:n.call(e,t)}))},onSubmit:function(t){var n;null===(n=e.onSubmit)||void 0===n||n.call(e,t),o.forEach((function(e){var n;return null===(n=e.onSubmit)||void 0===n?void 0:n.call(e,t)}))},onReset:function(t){var n;null===(n=e.onReset)||void 0===n||n.call(e,t),o.forEach((function(e){var n;return null===(n=e.onReset)||void 0===n?void 0:n.call(e,t)}))},getSources:function(n){return Promise.all([].concat(Gt(o.map((function(e){return e.getSources}))),[e.getSources]).filter(Boolean).map((function(e){return function(e,t){var n=[];return Promise.resolve(e(t)).then((function(e){return Promise.all(e.filter((function(e){return Boolean(e)})).map((function(e){if(e.sourceId,n.includes(e.sourceId))throw new Error("[Autocomplete] The `sourceId` ".concat(JSON.stringify(e.sourceId)," is not unique."));n.push(e.sourceId);var t={getItemInputValue:function(e){return e.state.query},getItemUrl:function(){},onSelect:function(e){(0,e.setIsOpen)(!1)},onActive:ot,onResolve:ot};Object.keys(t).forEach((function(e){t[e].__default=!0}));var r=Mt(Mt({},t),e);return Promise.resolve(r)})))}))}(e,n)}))).then((function(e){return Xe(e)})).then((function(e){return e.map((function(e){return tn(tn({},e),{},{onSelect:function(n){e.onSelect(n),t.forEach((function(e){var t;return null===(t=e.onSelect)||void 0===t?void 0:t.call(e,n)}))},onActive:function(n){e.onActive(n),t.forEach((function(e){var t;return null===(t=e.onActive)||void 0===t?void 0:t.call(e,n)}))},onResolve:function(n){e.onResolve(n),t.forEach((function(e){var t;return null===(t=e.onResolve)||void 0===t?void 0:t.call(e,n)}))}})}))}))},navigator:tn({navigate:function(e){var t=e.itemUrl;r.location.assign(t)},navigateNewTab:function(e){var t=e.itemUrl,n=r.open(t,"_blank","noopener");null==n||n.focus()},navigateNewWindow:function(e){var t=e.itemUrl;r.open(t,"_blank","noopener")}},e.navigator)})}function on(e){return on="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},on(e)}function cn(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function an(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?cn(Object(n),!0).forEach((function(t){un(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):cn(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function un(e,t,n){return(t=function(e){var t=function(e,t){if("object"!==on(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,t||"default");if("object"!==on(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"===on(t)?t:String(t)}(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function ln(e){return ln="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},ln(e)}function sn(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function fn(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?sn(Object(n),!0).forEach((function(t){pn(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):sn(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function pn(e,t,n){return(t=function(e){var t=function(e,t){if("object"!==ln(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,t||"default");if("object"!==ln(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"===ln(t)?t:String(t)}(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function mn(e){return function(e){if(Array.isArray(e))return vn(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return vn(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return vn(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function vn(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function dn(e){return Boolean(e.execute)}function hn(e,t,n){if(o=e,Boolean(null==o?void 0:o.execute)){var r="algolia"===e.requesterId?Object.assign.apply(Object,[{}].concat(mn(Object.keys(n.context).map((function(e){var t;return null===(t=n.context[e])||void 0===t?void 0:t.__algoliaSearchParameters}))))):{};return fn(fn({},e),{},{requests:e.queries.map((function(n){return{query:"algolia"===e.requesterId?fn(fn({},n),{},{params:fn(fn({},r),n.params)}):n,sourceId:t,transformResponse:e.transformResponse}}))})}var o;return{items:e,sourceId:t}}function yn(e){var t=e.reduce((function(e,t){if(!dn(t))return e.push(t),e;var n=t.searchClient,r=t.execute,o=t.requesterId,i=t.requests,c=e.find((function(e){return dn(t)&&dn(e)&&e.searchClient===n&&Boolean(o)&&e.requesterId===o}));if(c){var a;(a=c.items).push.apply(a,mn(i))}else{var u={execute:r,requesterId:o,items:i,searchClient:n};e.push(u)}return e}),[]).map((function(e){if(!dn(e))return Promise.resolve(e);var t=e,n=t.execute,r=t.items;return n({searchClient:t.searchClient,requests:r})}));return Promise.all(t).then((function(e){return Xe(e)}))}function bn(e,t,n){return t.map((function(t){var r,o=e.filter((function(e){return e.sourceId===t.sourceId})),i=o.map((function(e){return e.items})),c=o[0].transformResponse,a=c?c({results:r=i,hits:r.map((function(e){return e.hits})).filter(Boolean),facetHits:r.map((function(e){var t;return null===(t=e.facetHits)||void 0===t?void 0:t.map((function(e){return{label:e.value,count:e.count,_highlightResult:{label:{value:e.highlighted}}}}))})).filter(Boolean)}):i;return t.onResolve({source:t,results:i,items:a,state:n.getState()}),a.every(Boolean),'The `getItems` function from source "'.concat(t.sourceId,'" must return an array of items but returned ').concat(JSON.stringify(void 0),".\n\nDid you forget to return items?\n\nSee: https://www.algolia.com/doc/ui-libraries/autocomplete/core-concepts/sources/#param-getitems"),{source:t,items:a}}))}function _n(e){return _n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},_n(e)}var gn=["event","nextState","props","query","refresh","store"];function On(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function Sn(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?On(Object(n),!0).forEach((function(t){jn(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):On(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function jn(e,t,n){return(t=function(e){var t=function(e,t){if("object"!==_n(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,t||"default");if("object"!==_n(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"===_n(t)?t:String(t)}(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function wn(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var En,Pn,In,Dn=null,kn=(En=-1,Pn=-1,In=void 0,function(e){var t=++En;return Promise.resolve(e).then((function(e){return In&&t<Pn?In:(Pn=t,In=e,e)}))});function An(e){var t=e.event,n=e.nextState,r=void 0===n?{}:n,o=e.props,i=e.query,c=e.refresh,a=e.store,u=wn(e,gn);Dn&&o.environment.clearTimeout(Dn);var l=u.setCollections,s=u.setIsOpen,f=u.setQuery,p=u.setActiveItemId,m=u.setStatus;if(f(i),p(o.defaultActiveItemId),!i&&!1===o.openOnFocus){var v,d=a.getState().collections.map((function(e){return Sn(Sn({},e),{},{items:[]})}));m("idle"),l(d),s(null!==(v=r.isOpen)&&void 0!==v?v:o.shouldPanelOpen({state:a.getState()}));var h=Tt(kn(d).then((function(){return Promise.resolve()})));return a.pendingRequests.add(h)}m("loading"),Dn=o.environment.setTimeout((function(){m("stalled")}),o.stallThreshold);var y=Tt(kn(o.getSources(Sn({query:i,refresh:c,state:a.getState()},u)).then((function(e){return Promise.all(e.map((function(e){return Promise.resolve(e.getItems(Sn({query:i,refresh:c,state:a.getState()},u))).then((function(t){return hn(t,e.sourceId,a.getState())}))}))).then(yn).then((function(t){return bn(t,e,a)})).then((function(e){return function(e){var t=e.collections,n=e.props,r=e.state,o=t.reduce((function(e,t){return an(an({},e),{},un({},t.source.sourceId,an(an({},t.source),{},{getItems:function(){return Xe(t.items)}})))}),{}),i=n.plugins.reduce((function(e,t){return t.reshape?t.reshape(e):e}),{sourcesBySourceId:o,state:r}).sourcesBySourceId;return Xe(n.reshape({sourcesBySourceId:i,sources:Object.values(i),state:r})).filter(Boolean).map((function(e){return{source:e,items:e.getItems()}}))}({collections:e,props:o,state:a.getState()})}))})))).then((function(e){var n;m("idle"),l(e);var f=o.shouldPanelOpen({state:a.getState()});s(null!==(n=r.isOpen)&&void 0!==n?n:o.openOnFocus&&!i&&f||f);var p=Ft(a.getState());if(null!==a.getState().activeItemId&&p){var v=p.item,d=p.itemInputValue,h=p.itemUrl,y=p.source;y.onActive(Sn({event:t,item:v,itemInputValue:d,itemUrl:h,refresh:c,source:y,state:a.getState()},u))}})).finally((function(){m("idle"),Dn&&o.environment.clearTimeout(Dn)}));return a.pendingRequests.add(y)}function Cn(e){return Cn="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},Cn(e)}var xn=["event","props","refresh","store"];function Nn(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function Tn(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?Nn(Object(n),!0).forEach((function(t){Rn(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Nn(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function Rn(e,t,n){return(t=function(e){var t=function(e,t){if("object"!==Cn(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,t||"default");if("object"!==Cn(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"===Cn(t)?t:String(t)}(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function qn(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}function Ln(e){return Ln="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},Ln(e)}var Mn=["props","refresh","store"],Hn=["inputElement","formElement","panelElement"],Un=["inputElement"],Fn=["inputElement","maxLength"],Bn=["sourceIndex"],Vn=["sourceIndex"],Wn=["item","source","sourceIndex"];function Kn(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function zn(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?Kn(Object(n),!0).forEach((function(t){Jn(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Kn(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function Jn(e,t,n){return(t=function(e){var t=function(e,t){if("object"!==Ln(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,t||"default");if("object"!==Ln(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"===Ln(t)?t:String(t)}(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function $n(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}function Qn(e){var t=e.props,n=e.refresh,r=e.store,o=$n(e,Mn),i=function(e,t){return void 0!==t?"".concat(e,"-").concat(t):e};return{getEnvironmentProps:function(e){var n=e.inputElement,o=e.formElement,i=e.panelElement;function c(e){!r.getState().isOpen&&r.pendingRequests.isEmpty()||e.target===n||!1===[o,i].some((function(t){return n=t,r=e.target,n===r||n.contains(r);var n,r}))&&(r.dispatch("blur",null),t.debug||r.pendingRequests.cancelAll())}return zn({onTouchStart:c,onMouseDown:c,onTouchMove:function(e){!1!==r.getState().isOpen&&n===t.environment.document.activeElement&&e.target!==n&&n.blur()}},$n(e,Hn))},getRootProps:function(e){return zn({role:"combobox","aria-expanded":r.getState().isOpen,"aria-haspopup":"listbox","aria-owns":r.getState().isOpen?"".concat(t.id,"-list"):void 0,"aria-labelledby":"".concat(t.id,"-label")},e)},getFormProps:function(e){e.inputElement;return zn({action:"",noValidate:!0,role:"search",onSubmit:function(i){var c;i.preventDefault(),t.onSubmit(zn({event:i,refresh:n,state:r.getState()},o)),r.dispatch("submit",null),null===(c=e.inputElement)||void 0===c||c.blur()},onReset:function(i){var c;i.preventDefault(),t.onReset(zn({event:i,refresh:n,state:r.getState()},o)),r.dispatch("reset",null),null===(c=e.inputElement)||void 0===c||c.focus()}},$n(e,Un))},getLabelProps:function(e){var n=e||{},r=n.sourceIndex,o=$n(n,Bn);return zn({htmlFor:"".concat(i(t.id,r),"-input"),id:"".concat(i(t.id,r),"-label")},o)},getInputProps:function(e){var i;function c(e){(t.openOnFocus||Boolean(r.getState().query))&&An(zn({event:e,props:t,query:r.getState().completion||r.getState().query,refresh:n,store:r},o)),r.dispatch("focus",null)}var a=e||{},u=(a.inputElement,a.maxLength),l=void 0===u?512:u,s=$n(a,Fn),f=Ft(r.getState()),p=function(e){return Boolean(e&&e.match(Bt))}((null===(i=t.environment.navigator)||void 0===i?void 0:i.userAgent)||""),m=null!=f&&f.itemUrl&&!p?"go":"search";return zn({"aria-autocomplete":"both","aria-activedescendant":r.getState().isOpen&&null!==r.getState().activeItemId?"".concat(t.id,"-item-").concat(r.getState().activeItemId):void 0,"aria-controls":r.getState().isOpen?"".concat(t.id,"-list"):void 0,"aria-labelledby":"".concat(t.id,"-label"),value:r.getState().completion||r.getState().query,id:"".concat(t.id,"-input"),autoComplete:"off",autoCorrect:"off",autoCapitalize:"off",enterKeyHint:m,spellCheck:"false",autoFocus:t.autoFocus,placeholder:t.placeholder,maxLength:l,type:"search",onChange:function(e){An(zn({event:e,props:t,query:e.currentTarget.value.slice(0,l),refresh:n,store:r},o))},onKeyDown:function(e){!function(e){var t=e.event,n=e.props,r=e.refresh,o=e.store,i=qn(e,xn);if("ArrowUp"===t.key||"ArrowDown"===t.key){var c=function(){var e=n.environment.document.getElementById("".concat(n.id,"-item-").concat(o.getState().activeItemId));e&&(e.scrollIntoViewIfNeeded?e.scrollIntoViewIfNeeded(!1):e.scrollIntoView(!1))},a=function(){var e=Ft(o.getState());if(null!==o.getState().activeItemId&&e){var n=e.item,c=e.itemInputValue,a=e.itemUrl,u=e.source;u.onActive(Tn({event:t,item:n,itemInputValue:c,itemUrl:a,refresh:r,source:u,state:o.getState()},i))}};t.preventDefault(),!1===o.getState().isOpen&&(n.openOnFocus||Boolean(o.getState().query))?An(Tn({event:t,props:n,query:o.getState().query,refresh:r,store:o},i)).then((function(){o.dispatch(t.key,{nextActiveItemId:n.defaultActiveItemId}),a(),setTimeout(c,0)})):(o.dispatch(t.key,{}),a(),c())}else if("Escape"===t.key)t.preventDefault(),o.dispatch(t.key,null),o.pendingRequests.cancelAll();else if("Tab"===t.key)o.dispatch("blur",null),o.pendingRequests.cancelAll();else if("Enter"===t.key){if(null===o.getState().activeItemId||o.getState().collections.every((function(e){return 0===e.items.length})))return void(n.debug||o.pendingRequests.cancelAll());t.preventDefault();var u=Ft(o.getState()),l=u.item,s=u.itemInputValue,f=u.itemUrl,p=u.source;if(t.metaKey||t.ctrlKey)void 0!==f&&(p.onSelect(Tn({event:t,item:l,itemInputValue:s,itemUrl:f,refresh:r,source:p,state:o.getState()},i)),n.navigator.navigateNewTab({itemUrl:f,item:l,state:o.getState()}));else if(t.shiftKey)void 0!==f&&(p.onSelect(Tn({event:t,item:l,itemInputValue:s,itemUrl:f,refresh:r,source:p,state:o.getState()},i)),n.navigator.navigateNewWindow({itemUrl:f,item:l,state:o.getState()}));else if(t.altKey);else{if(void 0!==f)return p.onSelect(Tn({event:t,item:l,itemInputValue:s,itemUrl:f,refresh:r,source:p,state:o.getState()},i)),void n.navigator.navigate({itemUrl:f,item:l,state:o.getState()});An(Tn({event:t,nextState:{isOpen:!1},props:n,query:s,refresh:r,store:o},i)).then((function(){p.onSelect(Tn({event:t,item:l,itemInputValue:s,itemUrl:f,refresh:r,source:p,state:o.getState()},i))}))}}}(zn({event:e,props:t,refresh:n,store:r},o))},onFocus:c,onBlur:ot,onClick:function(n){e.inputElement!==t.environment.document.activeElement||r.getState().isOpen||c(n)}},s)},getPanelProps:function(e){return zn({onMouseDown:function(e){e.preventDefault()},onMouseLeave:function(){r.dispatch("mouseleave",null)}},e)},getListProps:function(e){var n=e||{},r=n.sourceIndex,o=$n(n,Vn);return zn({role:"listbox","aria-labelledby":"".concat(i(t.id,r),"-label"),id:"".concat(i(t.id,r),"-list")},o)},getItemProps:function(e){var c=e.item,a=e.source,u=e.sourceIndex,l=$n(e,Wn);return zn({id:"".concat(i(t.id,u),"-item-").concat(c.__autocomplete_id),role:"option","aria-selected":r.getState().activeItemId===c.__autocomplete_id,onMouseMove:function(e){if(c.__autocomplete_id!==r.getState().activeItemId){r.dispatch("mousemove",c.__autocomplete_id);var t=Ft(r.getState());if(null!==r.getState().activeItemId&&t){var i=t.item,a=t.itemInputValue,u=t.itemUrl,l=t.source;l.onActive(zn({event:e,item:i,itemInputValue:a,itemUrl:u,refresh:n,source:l,state:r.getState()},o))}}},onMouseDown:function(e){e.preventDefault()},onClick:function(e){var i=a.getItemInputValue({item:c,state:r.getState()}),u=a.getItemUrl({item:c,state:r.getState()});(u?Promise.resolve():An(zn({event:e,nextState:{isOpen:!1},props:t,query:i,refresh:n,store:r},o))).then((function(){a.onSelect(zn({event:e,item:c,itemInputValue:i,itemUrl:u,refresh:n,source:a,state:r.getState()},o))}))}},l)}}}function Zn(e){return Zn="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},Zn(e)}function Yn(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function Gn(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?Yn(Object(n),!0).forEach((function(t){Xn(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Yn(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function Xn(e,t,n){return(t=function(e){var t=function(e,t){if("object"!==Zn(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,t||"default");if("object"!==Zn(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"===Zn(t)?t:String(t)}(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function er(e){var t,n,r,o,i=e.plugins,c=e.options,a=null===(t=((null===(n=c.__autocomplete_metadata)||void 0===n?void 0:n.userAgents)||[])[0])||void 0===t?void 0:t.segment,u=a?Xn({},a,Object.keys((null===(r=c.__autocomplete_metadata)||void 0===r?void 0:r.options)||{})):{};return{plugins:i.map((function(e){return{name:e.name,options:Object.keys(e.__autocomplete_pluginOptions||[])}})),options:Gn({"autocomplete-core":Object.keys(c)},u),ua:it.concat((null===(o=c.__autocomplete_metadata)||void 0===o?void 0:o.userAgents)||[])}}function tr(e){var t,n=e.state;return!1===n.isOpen||null===n.activeItemId?null:(null===(t=Ft(n))||void 0===t?void 0:t.itemInputValue)||null}function nr(e){return nr="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},nr(e)}function rr(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function or(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?rr(Object(n),!0).forEach((function(t){ir(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):rr(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function ir(e,t,n){return(t=function(e){var t=function(e,t){if("object"!==nr(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,t||"default");if("object"!==nr(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"===nr(t)?t:String(t)}(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var cr=function(e,t){switch(t.type){case"setActiveItemId":case"mousemove":return or(or({},e),{},{activeItemId:t.payload});case"setQuery":return or(or({},e),{},{query:t.payload,completion:null});case"setCollections":return or(or({},e),{},{collections:t.payload});case"setIsOpen":return or(or({},e),{},{isOpen:t.payload});case"setStatus":return or(or({},e),{},{status:t.payload});case"setContext":return or(or({},e),{},{context:or(or({},e.context),t.payload)});case"ArrowDown":var n=or(or({},e),{},{activeItemId:t.payload.hasOwnProperty("nextActiveItemId")?t.payload.nextActiveItemId:qt(1,e.activeItemId,tt(e),t.props.defaultActiveItemId)});return or(or({},n),{},{completion:tr({state:n})});case"ArrowUp":var r=or(or({},e),{},{activeItemId:qt(-1,e.activeItemId,tt(e),t.props.defaultActiveItemId)});return or(or({},r),{},{completion:tr({state:r})});case"Escape":return e.isOpen?or(or({},e),{},{activeItemId:null,isOpen:!1,completion:null}):or(or({},e),{},{activeItemId:null,query:"",status:"idle",collections:[]});case"submit":return or(or({},e),{},{activeItemId:null,isOpen:!1,status:"idle"});case"reset":return or(or({},e),{},{activeItemId:!0===t.props.openOnFocus?t.props.defaultActiveItemId:null,status:"idle",query:""});case"focus":return or(or({},e),{},{activeItemId:t.props.defaultActiveItemId,isOpen:(t.props.openOnFocus||Boolean(e.query))&&t.props.shouldPanelOpen({state:e})});case"blur":return t.props.debug?e:or(or({},e),{},{isOpen:!1,activeItemId:null});case"mouseleave":return or(or({},e),{},{activeItemId:t.props.defaultActiveItemId});default:return"The reducer action ".concat(JSON.stringify(t.type)," is not supported."),e}};function ar(e){return ar="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},ar(e)}function ur(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function lr(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?ur(Object(n),!0).forEach((function(t){sr(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):ur(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function sr(e,t,n){return(t=function(e){var t=function(e,t){if("object"!==ar(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,t||"default");if("object"!==ar(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"===ar(t)?t:String(t)}(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function fr(e){var t=[],n=rn(e,t),r=zt(cr,n,(function(e){var t=e.prevState,r=e.state;n.onStateChange(lr({prevState:t,state:r,refresh:c,navigator:n.navigator},o))})),o=function(e){var t=e.store;return{setActiveItemId:function(e){t.dispatch("setActiveItemId",e)},setQuery:function(e){t.dispatch("setQuery",e)},setCollections:function(e){var n=0,r=e.map((function(e){return Qt(Qt({},e),{},{items:Xe(e.items).map((function(e){return Qt(Qt({},e),{},{__autocomplete_id:n++})}))})}));t.dispatch("setCollections",r)},setIsOpen:function(e){t.dispatch("setIsOpen",e)},setStatus:function(e){t.dispatch("setStatus",e)},setContext:function(e){t.dispatch("setContext",e)}}}({store:r}),i=Qn(lr({props:n,refresh:c,store:r,navigator:n.navigator},o));function c(){return An(lr({event:new Event("input"),nextState:{isOpen:r.getState().isOpen},props:n,navigator:n.navigator,query:r.getState().query,refresh:c,store:r},o))}if(e.insights&&!n.plugins.some((function(e){return"aa.algoliaInsightsPlugin"===e.name}))){var a="boolean"==typeof e.insights?{}:e.insights;n.plugins.push(xt(a))}return n.plugins.forEach((function(e){var r;return null===(r=e.subscribe)||void 0===r?void 0:r.call(e,lr(lr({},o),{},{navigator:n.navigator,refresh:c,onSelect:function(e){t.push({onSelect:e})},onActive:function(e){t.push({onActive:e})},onResolve:function(e){t.push({onResolve:e})}}))})),function(e){var t,n,r=e.metadata,o=e.environment;if(null===(t=o.navigator)||void 0===t||null===(n=t.userAgent)||void 0===n?void 0:n.includes("Algolia Crawler")){var i=o.document.createElement("meta"),c=o.document.querySelector("head");i.name="algolia:metadata",setTimeout((function(){i.content=JSON.stringify(r),c.appendChild(i)}),0)}}({metadata:er({plugins:n.plugins,options:e}),environment:n.environment}),lr(lr({refresh:c,navigator:n.navigator},i),o)}function pr(e){var t=e.translations,n=(void 0===t?{}:t).searchByText,r=void 0===n?"Search by":n;return Be.createElement("a",{href:"https://www.algolia.com/ref/docsearch/?utm_source=".concat(window.location.hostname,"&utm_medium=referral&utm_content=powered_by&utm_campaign=docsearch"),target:"_blank",rel:"noopener noreferrer"},Be.createElement("span",{className:"DocSearch-Label"},r),Be.createElement("svg",{width:"77",height:"19","aria-label":"Algolia",role:"img",id:"Layer_1",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 2196.2 500"},Be.createElement("defs",null,Be.createElement("style",null,".cls-1,.cls-2{fill:#003dff;}.cls-2{fill-rule:evenodd;}")),Be.createElement("path",{className:"cls-2",d:"M1070.38,275.3V5.91c0-3.63-3.24-6.39-6.82-5.83l-50.46,7.94c-2.87,.45-4.99,2.93-4.99,5.84l.17,273.22c0,12.92,0,92.7,95.97,95.49,3.33,.1,6.09-2.58,6.09-5.91v-40.78c0-2.96-2.19-5.51-5.12-5.84-34.85-4.01-34.85-47.57-34.85-54.72Z"}),Be.createElement("rect",{className:"cls-1",x:"1845.88",y:"104.73",width:"62.58",height:"277.9",rx:"5.9",ry:"5.9"}),Be.createElement("path",{className:"cls-2",d:"M1851.78,71.38h50.77c3.26,0,5.9-2.64,5.9-5.9V5.9c0-3.62-3.24-6.39-6.82-5.83l-50.77,7.95c-2.87,.45-4.99,2.92-4.99,5.83v51.62c0,3.26,2.64,5.9,5.9,5.9Z"}),Be.createElement("path",{className:"cls-2",d:"M1764.03,275.3V5.91c0-3.63-3.24-6.39-6.82-5.83l-50.46,7.94c-2.87,.45-4.99,2.93-4.99,5.84l.17,273.22c0,12.92,0,92.7,95.97,95.49,3.33,.1,6.09-2.58,6.09-5.91v-40.78c0-2.96-2.19-5.51-5.12-5.84-34.85-4.01-34.85-47.57-34.85-54.72Z"}),Be.createElement("path",{className:"cls-2",d:"M1631.95,142.72c-11.14-12.25-24.83-21.65-40.78-28.31-15.92-6.53-33.26-9.85-52.07-9.85-18.78,0-36.15,3.17-51.92,9.85-15.59,6.66-29.29,16.05-40.76,28.31-11.47,12.23-20.38,26.87-26.76,44.03-6.38,17.17-9.24,37.37-9.24,58.36,0,20.99,3.19,36.87,9.55,54.21,6.38,17.32,15.14,32.11,26.45,44.36,11.29,12.23,24.83,21.62,40.6,28.46,15.77,6.83,40.12,10.33,52.4,10.48,12.25,0,36.78-3.82,52.7-10.48,15.92-6.68,29.46-16.23,40.78-28.46,11.29-12.25,20.05-27.04,26.25-44.36,6.22-17.34,9.24-33.22,9.24-54.21,0-20.99-3.34-41.19-10.03-58.36-6.38-17.17-15.14-31.8-26.43-44.03Zm-44.43,163.75c-11.47,15.75-27.56,23.7-48.09,23.7-20.55,0-36.63-7.8-48.1-23.7-11.47-15.75-17.21-34.01-17.21-61.2,0-26.89,5.59-49.14,17.06-64.87,11.45-15.75,27.54-23.52,48.07-23.52,20.55,0,36.63,7.78,48.09,23.52,11.47,15.57,17.36,37.98,17.36,64.87,0,27.19-5.72,45.3-17.19,61.2Z"}),Be.createElement("path",{className:"cls-2",d:"M894.42,104.73h-49.33c-48.36,0-90.91,25.48-115.75,64.1-14.52,22.58-22.99,49.63-22.99,78.73,0,44.89,20.13,84.92,51.59,111.1,2.93,2.6,6.05,4.98,9.31,7.14,12.86,8.49,28.11,13.47,44.52,13.47,1.23,0,2.46-.03,3.68-.09,.36-.02,.71-.05,1.07-.07,.87-.05,1.75-.11,2.62-.2,.34-.03,.68-.08,1.02-.12,.91-.1,1.82-.21,2.73-.34,.21-.03,.42-.07,.63-.1,32.89-5.07,61.56-30.82,70.9-62.81v57.83c0,3.26,2.64,5.9,5.9,5.9h50.42c3.26,0,5.9-2.64,5.9-5.9V110.63c0-3.26-2.64-5.9-5.9-5.9h-56.32Zm0,206.92c-12.2,10.16-27.97,13.98-44.84,15.12-.16,.01-.33,.03-.49,.04-1.12,.07-2.24,.1-3.36,.1-42.24,0-77.12-35.89-77.12-79.37,0-10.25,1.96-20.01,5.42-28.98,11.22-29.12,38.77-49.74,71.06-49.74h49.33v142.83Z"}),Be.createElement("path",{className:"cls-2",d:"M2133.97,104.73h-49.33c-48.36,0-90.91,25.48-115.75,64.1-14.52,22.58-22.99,49.63-22.99,78.73,0,44.89,20.13,84.92,51.59,111.1,2.93,2.6,6.05,4.98,9.31,7.14,12.86,8.49,28.11,13.47,44.52,13.47,1.23,0,2.46-.03,3.68-.09,.36-.02,.71-.05,1.07-.07,.87-.05,1.75-.11,2.62-.2,.34-.03,.68-.08,1.02-.12,.91-.1,1.82-.21,2.73-.34,.21-.03,.42-.07,.63-.1,32.89-5.07,61.56-30.82,70.9-62.81v57.83c0,3.26,2.64,5.9,5.9,5.9h50.42c3.26,0,5.9-2.64,5.9-5.9V110.63c0-3.26-2.64-5.9-5.9-5.9h-56.32Zm0,206.92c-12.2,10.16-27.97,13.98-44.84,15.12-.16,.01-.33,.03-.49,.04-1.12,.07-2.24,.1-3.36,.1-42.24,0-77.12-35.89-77.12-79.37,0-10.25,1.96-20.01,5.42-28.98,11.22-29.12,38.77-49.74,71.06-49.74h49.33v142.83Z"}),Be.createElement("path",{className:"cls-2",d:"M1314.05,104.73h-49.33c-48.36,0-90.91,25.48-115.75,64.1-11.79,18.34-19.6,39.64-22.11,62.59-.58,5.3-.88,10.68-.88,16.14s.31,11.15,.93,16.59c4.28,38.09,23.14,71.61,50.66,94.52,2.93,2.6,6.05,4.98,9.31,7.14,12.86,8.49,28.11,13.47,44.52,13.47h0c17.99,0,34.61-5.93,48.16-15.97,16.29-11.58,28.88-28.54,34.48-47.75v50.26h-.11v11.08c0,21.84-5.71,38.27-17.34,49.36-11.61,11.08-31.04,16.63-58.25,16.63-11.12,0-28.79-.59-46.6-2.41-2.83-.29-5.46,1.5-6.27,4.22l-12.78,43.11c-1.02,3.46,1.27,7.02,4.83,7.53,21.52,3.08,42.52,4.68,54.65,4.68,48.91,0,85.16-10.75,108.89-32.21,21.48-19.41,33.15-48.89,35.2-88.52V110.63c0-3.26-2.64-5.9-5.9-5.9h-56.32Zm0,64.1s.65,139.13,0,143.36c-12.08,9.77-27.11,13.59-43.49,14.7-.16,.01-.33,.03-.49,.04-1.12,.07-2.24,.1-3.36,.1-1.32,0-2.63-.03-3.94-.1-40.41-2.11-74.52-37.26-74.52-79.38,0-10.25,1.96-20.01,5.42-28.98,11.22-29.12,38.77-49.74,71.06-49.74h49.33Z"}),Be.createElement("path",{className:"cls-1",d:"M249.83,0C113.3,0,2,110.09,.03,246.16c-2,138.19,110.12,252.7,248.33,253.5,42.68,.25,83.79-10.19,120.3-30.03,3.56-1.93,4.11-6.83,1.08-9.51l-23.38-20.72c-4.75-4.21-11.51-5.4-17.36-2.92-25.48,10.84-53.17,16.38-81.71,16.03-111.68-1.37-201.91-94.29-200.13-205.96,1.76-110.26,92-199.41,202.67-199.41h202.69V407.41l-115-102.18c-3.72-3.31-9.42-2.66-12.42,1.31-18.46,24.44-48.53,39.64-81.93,37.34-46.33-3.2-83.87-40.5-87.34-86.81-4.15-55.24,39.63-101.52,94-101.52,49.18,0,89.68,37.85,93.91,85.95,.38,4.28,2.31,8.27,5.52,11.12l29.95,26.55c3.4,3.01,8.79,1.17,9.63-3.3,2.16-11.55,2.92-23.58,2.07-35.92-4.82-70.34-61.8-126.93-132.17-131.26-80.68-4.97-148.13,58.14-150.27,137.25-2.09,77.1,61.08,143.56,138.19,145.26,32.19,.71,62.03-9.41,86.14-26.95l150.26,133.2c6.44,5.71,16.61,1.14,16.61-7.47V9.48C499.66,4.25,495.42,0,490.18,0H249.83Z"})))}function mr(e){return Be.createElement("svg",{width:"15",height:"15","aria-label":e.ariaLabel,role:"img"},Be.createElement("g",{fill:"none",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.2"},e.children))}function vr(e){var t=e.translations,n=void 0===t?{}:t,r=n.selectText,o=void 0===r?"to select":r,i=n.selectKeyAriaLabel,c=void 0===i?"Enter key":i,a=n.navigateText,u=void 0===a?"to navigate":a,l=n.navigateUpKeyAriaLabel,s=void 0===l?"Arrow up":l,f=n.navigateDownKeyAriaLabel,p=void 0===f?"Arrow down":f,m=n.closeText,v=void 0===m?"to close":m,d=n.closeKeyAriaLabel,h=void 0===d?"Escape key":d,y=n.searchByText,b=void 0===y?"Search by":y;return Be.createElement(Be.Fragment,null,Be.createElement("div",{className:"DocSearch-Logo"},Be.createElement(pr,{translations:{searchByText:b}})),Be.createElement("ul",{className:"DocSearch-Commands"},Be.createElement("li",null,Be.createElement("kbd",{className:"DocSearch-Commands-Key"},Be.createElement(mr,{ariaLabel:c},Be.createElement("path",{d:"M12 3.53088v3c0 1-1 2-2 2H4M7 11.53088l-3-3 3-3"}))),Be.createElement("span",{className:"DocSearch-Label"},o)),Be.createElement("li",null,Be.createElement("kbd",{className:"DocSearch-Commands-Key"},Be.createElement(mr,{ariaLabel:p},Be.createElement("path",{d:"M7.5 3.5v8M10.5 8.5l-3 3-3-3"}))),Be.createElement("kbd",{className:"DocSearch-Commands-Key"},Be.createElement(mr,{ariaLabel:s},Be.createElement("path",{d:"M7.5 11.5v-8M10.5 6.5l-3-3-3 3"}))),Be.createElement("span",{className:"DocSearch-Label"},u)),Be.createElement("li",null,Be.createElement("kbd",{className:"DocSearch-Commands-Key"},Be.createElement(mr,{ariaLabel:h},Be.createElement("path",{d:"M13.6167 8.936c-.1065.3583-.6883.962-1.4875.962-.7993 0-1.653-.9165-1.653-2.1258v-.5678c0-1.2548.7896-2.1016 1.653-2.1016.8634 0 1.3601.4778 1.4875 1.0724M9 6c-.1352-.4735-.7506-.9219-1.46-.8972-.7092.0246-1.344.57-1.344 1.2166s.4198.8812 1.3445.9805C8.465 7.3992 8.968 7.9337 9 8.5c.032.5663-.454 1.398-1.4595 1.398C6.6593 9.898 6 9 5.963 8.4851m-1.4748.5368c-.2635.5941-.8099.876-1.5443.876s-1.7073-.6248-1.7073-2.204v-.4603c0-1.0416.721-2.131 1.7073-2.131.9864 0 1.6425 1.031 1.5443 2.2492h-2.956"}))),Be.createElement("span",{className:"DocSearch-Label"},v))))}function dr(e){var t=e.hit,n=e.children;return Be.createElement("a",{href:t.url},n)}function hr(){return Be.createElement("svg",{viewBox:"0 0 38 38",stroke:"currentColor",strokeOpacity:".5"},Be.createElement("g",{fill:"none",fillRule:"evenodd"},Be.createElement("g",{transform:"translate(1 1)",strokeWidth:"2"},Be.createElement("circle",{strokeOpacity:".3",cx:"18",cy:"18",r:"18"}),Be.createElement("path",{d:"M36 18c0-9.94-8.06-18-18-18"},Be.createElement("animateTransform",{attributeName:"transform",type:"rotate",from:"0 18 18",to:"360 18 18",dur:"1s",repeatCount:"indefinite"})))))}function yr(){return Be.createElement("svg",{width:"20",height:"20",viewBox:"0 0 20 20"},Be.createElement("g",{stroke:"currentColor",fill:"none",fillRule:"evenodd",strokeLinecap:"round",strokeLinejoin:"round"},Be.createElement("path",{d:"M3.18 6.6a8.23 8.23 0 1112.93 9.94h0a8.23 8.23 0 01-11.63 0"}),Be.createElement("path",{d:"M6.44 7.25H2.55V3.36M10.45 6v5.6M10.45 11.6L13 13"})))}function br(){return Be.createElement("svg",{width:"20",height:"20",viewBox:"0 0 20 20"},Be.createElement("path",{d:"M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",stroke:"currentColor",fill:"none",fillRule:"evenodd",strokeLinecap:"round",strokeLinejoin:"round"}))}function _r(){return Be.createElement("svg",{className:"DocSearch-Hit-Select-Icon",width:"20",height:"20",viewBox:"0 0 20 20"},Be.createElement("g",{stroke:"currentColor",fill:"none",fillRule:"evenodd",strokeLinecap:"round",strokeLinejoin:"round"},Be.createElement("path",{d:"M18 3v4c0 2-2 4-4 4H2"}),Be.createElement("path",{d:"M8 17l-6-6 6-6"})))}var gr=function(){return Be.createElement("svg",{width:"20",height:"20",viewBox:"0 0 20 20"},Be.createElement("path",{d:"M17 6v12c0 .52-.2 1-1 1H4c-.7 0-1-.33-1-1V2c0-.55.42-1 1-1h8l5 5zM14 8h-3.13c-.51 0-.87-.34-.87-.87V4",stroke:"currentColor",fill:"none",fillRule:"evenodd",strokeLinejoin:"round"}))};function Or(e){switch(e.type){case"lvl1":return Be.createElement(gr,null);case"content":return Be.createElement(jr,null);default:return Be.createElement(Sr,null)}}function Sr(){return Be.createElement("svg",{width:"20",height:"20",viewBox:"0 0 20 20"},Be.createElement("path",{d:"M13 13h4-4V8H7v5h6v4-4H7V8H3h4V3v5h6V3v5h4-4v5zm-6 0v4-4H3h4z",stroke:"currentColor",fill:"none",fillRule:"evenodd",strokeLinecap:"round",strokeLinejoin:"round"}))}function jr(){return Be.createElement("svg",{width:"20",height:"20",viewBox:"0 0 20 20"},Be.createElement("path",{d:"M17 5H3h14zm0 5H3h14zm0 5H3h14z",stroke:"currentColor",fill:"none",fillRule:"evenodd",strokeLinejoin:"round"}))}function wr(){return Be.createElement("svg",{width:"20",height:"20",viewBox:"0 0 20 20"},Be.createElement("path",{d:"M10 14.2L5 17l1-5.6-4-4 5.5-.7 2.5-5 2.5 5 5.6.8-4 4 .9 5.5z",stroke:"currentColor",fill:"none",fillRule:"evenodd",strokeLinejoin:"round"}))}function Er(){return Be.createElement("svg",{width:"40",height:"40",viewBox:"0 0 20 20",fill:"none",fillRule:"evenodd",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round"},Be.createElement("path",{d:"M19 4.8a16 16 0 00-2-1.2m-3.3-1.2A16 16 0 001.1 4.7M16.7 8a12 12 0 00-2.8-1.4M10 6a12 12 0 00-6.7 2M12.3 14.7a4 4 0 00-4.5 0M14.5 11.4A8 8 0 0010 10M3 16L18 2M10 18h0"}))}function Pr(){return Be.createElement("svg",{width:"40",height:"40",viewBox:"0 0 20 20",fill:"none",fillRule:"evenodd",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round"},Be.createElement("path",{d:"M15.5 4.8c2 3 1.7 7-1 9.7h0l4.3 4.3-4.3-4.3a7.8 7.8 0 01-9.8 1m-2.2-2.2A7.8 7.8 0 0113.2 2.4M2 18L18 2"}))}function Ir(e){var t=e.translations,n=void 0===t?{}:t,r=n.titleText,o=void 0===r?"Unable to fetch results":r,i=n.helpText,c=void 0===i?"You might want to check your network connection.":i;return Be.createElement("div",{className:"DocSearch-ErrorScreen"},Be.createElement("div",{className:"DocSearch-Screen-Icon"},Be.createElement(Er,null)),Be.createElement("p",{className:"DocSearch-Title"},o),Be.createElement("p",{className:"DocSearch-Help"},c))}var Dr=["translations"];function kr(e){return function(e){if(Array.isArray(e))return Ar(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return Ar(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return Ar(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function Ar(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function Cr(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}function xr(e){var t=e.translations,n=void 0===t?{}:t,r=Cr(e,Dr),o=n.noResultsText,i=void 0===o?"No results for":o,c=n.suggestedQueryText,a=void 0===c?"Try searching for":c,u=n.reportMissingResultsText,l=void 0===u?"Believe this query should return results?":u,s=n.reportMissingResultsLinkText,f=void 0===s?"Let us know.":s,p=r.state.context.searchSuggestions;return Be.createElement("div",{className:"DocSearch-NoResults"},Be.createElement("div",{className:"DocSearch-Screen-Icon"},Be.createElement(Pr,null)),Be.createElement("p",{className:"DocSearch-Title"},i,' "',Be.createElement("strong",null,r.state.query),'"'),p&&p.length>0&&Be.createElement("div",{className:"DocSearch-NoResults-Prefill-List"},Be.createElement("p",{className:"DocSearch-Help"},a,":"),Be.createElement("ul",null,p.slice(0,3).reduce((function(e,t){return[].concat(kr(e),[Be.createElement("li",{key:t},Be.createElement("button",{className:"DocSearch-Prefill",key:t,type:"button",onClick:function(){r.setQuery(t.toLowerCase()+" "),r.refresh(),r.inputRef.current.focus()}},t))])}),[]))),r.getMissingResultsUrl&&Be.createElement("p",{className:"DocSearch-Help"},"".concat(l," "),Be.createElement("a",{href:r.getMissingResultsUrl({query:r.state.query}),target:"_blank",rel:"noopener noreferrer"},f)))}var Nr=["hit","attribute","tagName"];function Tr(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function Rr(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?Tr(Object(n),!0).forEach((function(t){qr(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Tr(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function qr(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function Lr(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}function Mr(e,t){return t.split(".").reduce((function(e,t){return null!=e&&e[t]?e[t]:null}),e)}function Hr(e){var t=e.hit,n=e.attribute,r=e.tagName;return g(void 0===r?"span":r,Rr(Rr({},Lr(e,Nr)),{},{dangerouslySetInnerHTML:{__html:Mr(t,"_snippetResult.".concat(n,".value"))||Mr(t,n)}}))}function Ur(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==n)return;var r,o,i=[],c=!0,a=!1;try{for(n=n.call(e);!(c=(r=n.next()).done)&&(i.push(r.value),!t||i.length!==t);c=!0);}catch(e){a=!0,o=e}finally{try{c||null==n.return||n.return()}finally{if(a)throw o}}return i}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return Fr(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return Fr(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function Fr(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function Br(){return Br=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Br.apply(this,arguments)}function Vr(e){return e.collection&&0!==e.collection.items.length?Be.createElement("section",{className:"DocSearch-Hits"},Be.createElement("div",{className:"DocSearch-Hit-source"},e.title),Be.createElement("ul",e.getListProps(),e.collection.items.map((function(t,n){return Be.createElement(Wr,Br({key:[e.title,t.objectID].join(":"),item:t,index:n},e))})))):null}function Wr(e){var t=e.item,n=e.index,r=e.renderIcon,o=e.renderAction,i=e.getItemProps,c=e.onItemClick,a=e.collection,u=e.hitComponent,l=Ur(Be.useState(!1),2),s=l[0],f=l[1],p=Ur(Be.useState(!1),2),m=p[0],v=p[1],d=Be.useRef(null),h=u;return Be.createElement("li",Br({className:["DocSearch-Hit",t.__docsearch_parent&&"DocSearch-Hit--Child",s&&"DocSearch-Hit--deleting",m&&"DocSearch-Hit--favoriting"].filter(Boolean).join(" "),onTransitionEnd:function(){d.current&&d.current()}},i({item:t,source:a.source,onClick:function(e){c(t,e)}})),Be.createElement(h,{hit:t},Be.createElement("div",{className:"DocSearch-Hit-Container"},r({item:t,index:n}),t.hierarchy[t.type]&&"lvl1"===t.type&&Be.createElement("div",{className:"DocSearch-Hit-content-wrapper"},Be.createElement(Hr,{className:"DocSearch-Hit-title",hit:t,attribute:"hierarchy.lvl1"}),t.content&&Be.createElement(Hr,{className:"DocSearch-Hit-path",hit:t,attribute:"content"})),t.hierarchy[t.type]&&("lvl2"===t.type||"lvl3"===t.type||"lvl4"===t.type||"lvl5"===t.type||"lvl6"===t.type)&&Be.createElement("div",{className:"DocSearch-Hit-content-wrapper"},Be.createElement(Hr,{className:"DocSearch-Hit-title",hit:t,attribute:"hierarchy.".concat(t.type)}),Be.createElement(Hr,{className:"DocSearch-Hit-path",hit:t,attribute:"hierarchy.lvl1"})),"content"===t.type&&Be.createElement("div",{className:"DocSearch-Hit-content-wrapper"},Be.createElement(Hr,{className:"DocSearch-Hit-title",hit:t,attribute:"content"}),Be.createElement(Hr,{className:"DocSearch-Hit-path",hit:t,attribute:"hierarchy.lvl1"})),o({item:t,runDeleteTransition:function(e){f(!0),d.current=e},runFavoriteTransition:function(e){v(!0),d.current=e}}))))}function Kr(e,t,n){return e.reduce((function(e,r){var o=t(r);return e.hasOwnProperty(o)||(e[o]=[]),e[o].length<(n||5)&&e[o].push(r),e}),{})}function zr(e){return e}function Jr(e){return 1===e.button||e.altKey||e.ctrlKey||e.metaKey||e.shiftKey}function $r(){}var Qr=/(<mark>|<\/mark>)/g,Zr=RegExp(Qr.source);function Yr(e){var t,n,r,o,i,c=e;if(!c.__docsearch_parent&&!e._highlightResult)return e.hierarchy.lvl0;var a=((c.__docsearch_parent?null===(t=c.__docsearch_parent)||void 0===t||null===(n=t._highlightResult)||void 0===n||null===(r=n.hierarchy)||void 0===r?void 0:r.lvl0:null===(o=e._highlightResult)||void 0===o||null===(i=o.hierarchy)||void 0===i?void 0:i.lvl0)||{}).value;return a&&Zr.test(a)?a.replace(Qr,""):a}function Gr(){return Gr=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Gr.apply(this,arguments)}function Xr(e){return Be.createElement("div",{className:"DocSearch-Dropdown-Container"},e.state.collections.map((function(t){if(0===t.items.length)return null;var n=Yr(t.items[0]);return Be.createElement(Vr,Gr({},e,{key:t.source.sourceId,title:n,collection:t,renderIcon:function(e){var n,r=e.item,o=e.index;return Be.createElement(Be.Fragment,null,r.__docsearch_parent&&Be.createElement("svg",{className:"DocSearch-Hit-Tree",viewBox:"0 0 24 54"},Be.createElement("g",{stroke:"currentColor",fill:"none",fillRule:"evenodd",strokeLinecap:"round",strokeLinejoin:"round"},r.__docsearch_parent!==(null===(n=t.items[o+1])||void 0===n?void 0:n.__docsearch_parent)?Be.createElement("path",{d:"M8 6v21M20 27H8.3"}):Be.createElement("path",{d:"M8 6v42M20 27H8.3"}))),Be.createElement("div",{className:"DocSearch-Hit-icon"},Be.createElement(Or,{type:r.type})))},renderAction:function(){return Be.createElement("div",{className:"DocSearch-Hit-action"},Be.createElement(_r,null))}}))})),e.resultsFooterComponent&&Be.createElement("section",{className:"DocSearch-HitsFooter"},Be.createElement(e.resultsFooterComponent,{state:e.state})))}var eo=["translations"];function to(){return to=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},to.apply(this,arguments)}function no(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}function ro(e){var t=e.translations,n=void 0===t?{}:t,r=no(e,eo),o=n.recentSearchesTitle,i=void 0===o?"Recent":o,c=n.noRecentSearchesText,a=void 0===c?"No recent searches":c,u=n.saveRecentSearchButtonTitle,l=void 0===u?"Save this search":u,s=n.removeRecentSearchButtonTitle,f=void 0===s?"Remove this search from history":s,p=n.favoriteSearchesTitle,m=void 0===p?"Favorite":p,v=n.removeFavoriteSearchButtonTitle,d=void 0===v?"Remove this search from favorites":v;return"idle"===r.state.status&&!1===r.hasCollections?r.disableUserPersonalization?null:Be.createElement("div",{className:"DocSearch-StartScreen"},Be.createElement("p",{className:"DocSearch-Help"},a)):!1===r.hasCollections?null:Be.createElement("div",{className:"DocSearch-Dropdown-Container"},Be.createElement(Vr,to({},r,{title:i,collection:r.state.collections[0],renderIcon:function(){return Be.createElement("div",{className:"DocSearch-Hit-icon"},Be.createElement(yr,null))},renderAction:function(e){var t=e.item,n=e.runFavoriteTransition,o=e.runDeleteTransition;return Be.createElement(Be.Fragment,null,Be.createElement("div",{className:"DocSearch-Hit-action"},Be.createElement("button",{className:"DocSearch-Hit-action-button",title:l,type:"submit",onClick:function(e){e.preventDefault(),e.stopPropagation(),n((function(){r.favoriteSearches.add(t),r.recentSearches.remove(t),r.refresh()}))}},Be.createElement(wr,null))),Be.createElement("div",{className:"DocSearch-Hit-action"},Be.createElement("button",{className:"DocSearch-Hit-action-button",title:f,type:"submit",onClick:function(e){e.preventDefault(),e.stopPropagation(),o((function(){r.recentSearches.remove(t),r.refresh()}))}},Be.createElement(br,null))))}})),Be.createElement(Vr,to({},r,{title:m,collection:r.state.collections[1],renderIcon:function(){return Be.createElement("div",{className:"DocSearch-Hit-icon"},Be.createElement(wr,null))},renderAction:function(e){var t=e.item,n=e.runDeleteTransition;return Be.createElement("div",{className:"DocSearch-Hit-action"},Be.createElement("button",{className:"DocSearch-Hit-action-button",title:d,type:"submit",onClick:function(e){e.preventDefault(),e.stopPropagation(),n((function(){r.favoriteSearches.remove(t),r.refresh()}))}},Be.createElement(br,null)))}})))}var oo=["translations"];function io(){return io=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},io.apply(this,arguments)}function co(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var ao=Be.memo((function(e){var t=e.translations,n=void 0===t?{}:t,r=co(e,oo);if("error"===r.state.status)return Be.createElement(Ir,{translations:null==n?void 0:n.errorScreen});var o=r.state.collections.some((function(e){return e.items.length>0}));return r.state.query?!1===o?Be.createElement(xr,io({},r,{translations:null==n?void 0:n.noResultsScreen})):Be.createElement(Xr,r):Be.createElement(ro,io({},r,{hasCollections:o,translations:null==n?void 0:n.startScreen}))}),(function(e,t){return"loading"===t.state.status||"stalled"===t.state.status})),uo=["translations"];function lo(){return lo=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},lo.apply(this,arguments)}function so(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}function fo(e){var t=e.translations,n=void 0===t?{}:t,r=so(e,uo),o=n.resetButtonTitle,i=void 0===o?"Clear the query":o,c=n.resetButtonAriaLabel,a=void 0===c?"Clear the query":c,u=n.cancelButtonText,l=void 0===u?"Cancel":u,s=n.cancelButtonAriaLabel,f=void 0===s?"Cancel":s,p=r.getFormProps({inputElement:r.inputRef.current}).onReset;return Be.useEffect((function(){r.autoFocus&&r.inputRef.current&&r.inputRef.current.focus()}),[r.autoFocus,r.inputRef]),Be.useEffect((function(){r.isFromSelection&&r.inputRef.current&&r.inputRef.current.select()}),[r.isFromSelection,r.inputRef]),Be.createElement(Be.Fragment,null,Be.createElement("form",{className:"DocSearch-Form",onSubmit:function(e){e.preventDefault()},onReset:p},Be.createElement("label",lo({className:"DocSearch-MagnifierLabel"},r.getLabelProps()),Be.createElement(We,null)),Be.createElement("div",{className:"DocSearch-LoadingIndicator"},Be.createElement(hr,null)),Be.createElement("input",lo({className:"DocSearch-Input",ref:r.inputRef},r.getInputProps({inputElement:r.inputRef.current,autoFocus:r.autoFocus,maxLength:64}))),Be.createElement("button",{type:"reset",title:i,className:"DocSearch-Reset","aria-label":a,hidden:!r.state.query},Be.createElement(br,null))),Be.createElement("button",{className:"DocSearch-Cancel",type:"reset","aria-label":f,onClick:r.onClose},l))}var po=["_highlightResult","_snippetResult"];function mo(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}function vo(e){return!1===function(){var e="__TEST_KEY__";try{return localStorage.setItem(e,""),localStorage.removeItem(e),!0}catch(e){return!1}}()?{setItem:function(){},getItem:function(){return[]}}:{setItem:function(t){return window.localStorage.setItem(e,JSON.stringify(t))},getItem:function(){var t=window.localStorage.getItem(e);return t?JSON.parse(t):[]}}}function ho(e){var t=e.key,n=e.limit,r=void 0===n?5:n,o=vo(t),i=o.getItem().slice(0,r);return{add:function(e){var t=e,n=(t._highlightResult,t._snippetResult,mo(t,po)),c=i.findIndex((function(e){return e.objectID===n.objectID}));c>-1&&i.splice(c,1),i.unshift(n),i=i.slice(0,r),o.setItem(i)},remove:function(e){i=i.filter((function(t){return t.objectID!==e.objectID})),o.setItem(i)},getAll:function(){return i}}}var yo=["facetName","facetQuery"];function bo(e){var t,n="algoliasearch-client-js-".concat(e.key),r=function(){return void 0===t&&(t=e.localStorage||window.localStorage),t},o=function(){return JSON.parse(r().getItem(n)||"{}")};return{get:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{miss:function(){return Promise.resolve()}};return Promise.resolve().then((function(){var n=JSON.stringify(e),r=o()[n];return Promise.all([r||t(),void 0!==r])})).then((function(e){var t=c(e,2),r=t[0],o=t[1];return Promise.all([r,o||n.miss(r)])})).then((function(e){return c(e,1)[0]}))},set:function(e,t){return Promise.resolve().then((function(){var i=o();return i[JSON.stringify(e)]=t,r().setItem(n,JSON.stringify(i)),t}))},delete:function(e){return Promise.resolve().then((function(){var t=o();delete t[JSON.stringify(e)],r().setItem(n,JSON.stringify(t))}))},clear:function(){return Promise.resolve().then((function(){r().removeItem(n)}))}}}function _o(e){var t=a(e.caches),n=t.shift();return void 0===n?{get:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{miss:function(){return Promise.resolve()}};return t().then((function(e){return Promise.all([e,n.miss(e)])})).then((function(e){return c(e,1)[0]}))},set:function(e,t){return Promise.resolve(t)},delete:function(e){return Promise.resolve()},clear:function(){return Promise.resolve()}}:{get:function(e,r){var o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{miss:function(){return Promise.resolve()}};return n.get(e,r,o).catch((function(){return _o({caches:t}).get(e,r,o)}))},set:function(e,r){return n.set(e,r).catch((function(){return _o({caches:t}).set(e,r)}))},delete:function(e){return n.delete(e).catch((function(){return _o({caches:t}).delete(e)}))},clear:function(){return n.clear().catch((function(){return _o({caches:t}).clear()}))}}}function go(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{serializable:!0},t={};return{get:function(n,r){var o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{miss:function(){return Promise.resolve()}},i=JSON.stringify(n);if(i in t)return Promise.resolve(e.serializable?JSON.parse(t[i]):t[i]);var c=r(),a=o&&o.miss||function(){return Promise.resolve()};return c.then((function(e){return a(e)})).then((function(){return c}))},set:function(n,r){return t[JSON.stringify(n)]=e.serializable?JSON.stringify(r):r,Promise.resolve(r)},delete:function(e){return delete t[JSON.stringify(e)],Promise.resolve()},clear:function(){return t={},Promise.resolve()}}}function Oo(e){for(var t=e.length-1;t>0;t--){var n=Math.floor(Math.random()*(t+1)),r=e[t];e[t]=e[n],e[n]=r}return e}function So(e,t){return t?(Object.keys(t).forEach((function(n){e[n]=t[n](e)})),e):e}function jo(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];var o=0;return e.replace(/%s/g,(function(){return encodeURIComponent(n[o++])}))}var wo="4.8.5",Eo={WithinQueryParameters:0,WithinHeaders:1};function Po(e,t){var n=e||{},r=n.data||{};return Object.keys(n).forEach((function(e){-1===["timeout","headers","queryParameters","data","cacheable"].indexOf(e)&&(r[e]=n[e])})),{data:Object.entries(r).length>0?r:void 0,timeout:n.timeout||t,headers:n.headers||{},queryParameters:n.queryParameters||{},cacheable:n.cacheable}}var Io={Read:1,Write:2,Any:3},Do=1,ko=2,Ao=3,Co=12e4;function xo(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:Do;return t(t({},e),{},{status:n,lastUpdate:Date.now()})}function No(e){return"string"==typeof e?{protocol:"https",url:e,accept:Io.Any}:{protocol:e.protocol||"https",url:e.url,accept:e.accept||Io.Any}}var To="GET",Ro="POST";function qo(e,t){return Promise.all(t.map((function(t){return e.get(t,(function(){return Promise.resolve(xo(t))}))}))).then((function(e){var n=e.filter((function(e){return function(e){return e.status===Do||Date.now()-e.lastUpdate>Co}(e)})),r=e.filter((function(e){return function(e){return e.status===Ao&&Date.now()-e.lastUpdate<=Co}(e)})),o=[].concat(a(n),a(r));return{getTimeout:function(e,t){return(0===r.length&&0===e?1:r.length+3+e)*t},statelessHosts:o.length>0?o.map((function(e){return No(e)})):t}}))}function Lo(e,n,r,o){var i=[],c=function(e,n){if(e.method===To||void 0===e.data&&void 0===n.data)return;var r=Array.isArray(e.data)?e.data:t(t({},e.data),n.data);return JSON.stringify(r)}(r,o),u=function(e,n){var r=t(t({},e.headers),n.headers),o={};return Object.keys(r).forEach((function(e){var t=r[e];o[e.toLowerCase()]=t})),o}(e,o),l=r.method,s=r.method!==To?{}:t(t({},r.data),o.data),f=t(t(t({"x-algolia-agent":e.userAgent.value},e.queryParameters),s),o.queryParameters),p=0,m=function t(n,a){var s=n.pop();if(void 0===s)throw{name:"RetryError",message:"Unreachable hosts - your application id may be incorrect. If the error persists, contact support@algolia.com.",transporterStackTrace:Fo(i)};var m={data:c,headers:u,method:l,url:Ho(s,r.path,f),connectTimeout:a(p,e.timeouts.connect),responseTimeout:a(p,o.timeout)},v=function(e){var t={request:m,response:e,host:s,triesLeft:n.length};return i.push(t),t},d={onSucess:function(e){return function(e){try{return JSON.parse(e.content)}catch(t){throw function(e,t){return{name:"DeserializationError",message:e,response:t}}(t.message,e)}}(e)},onRetry:function(r){var o=v(r);return r.isTimedOut&&p++,Promise.all([e.logger.info("Retryable failure",Bo(o)),e.hostsCache.set(s,xo(s,r.isTimedOut?Ao:ko))]).then((function(){return t(n,a)}))},onFail:function(e){throw v(e),function(e,t){var n=e.content,r=e.status,o=n;try{o=JSON.parse(n).message}catch(e){}return function(e,t,n){return{name:"ApiError",message:e,status:t,transporterStackTrace:n}}(o,r,t)}(e,Fo(i))}};return e.requester.send(m).then((function(e){return function(e,t){return function(e){var t=e.status;return e.isTimedOut||function(e){var t=e.isTimedOut,n=e.status;return!t&&0==~~n}(e)||2!=~~(t/100)&&4!=~~(t/100)}(e)?t.onRetry(e):2==~~(e.status/100)?t.onSucess(e):t.onFail(e)}(e,d)}))};return qo(e.hostsCache,n).then((function(e){return m(a(e.statelessHosts).reverse(),e.getTimeout)}))}function Mo(e){var t={value:"Algolia for JavaScript (".concat(e,")"),add:function(e){var n="; ".concat(e.segment).concat(void 0!==e.version?" (".concat(e.version,")"):"");return-1===t.value.indexOf(n)&&(t.value="".concat(t.value).concat(n)),t}};return t}function Ho(e,t,n){var r=Uo(n),o="".concat(e.protocol,"://").concat(e.url,"/").concat("/"===t.charAt(0)?t.substr(1):t);return r.length&&(o+="?".concat(r)),o}function Uo(e){return Object.keys(e).map((function(t){return jo("%s=%s",t,(n=e[t],"[object Object]"===Object.prototype.toString.call(n)||"[object Array]"===Object.prototype.toString.call(n)?JSON.stringify(e[t]):e[t]));var n})).join("&")}function Fo(e){return e.map((function(e){return Bo(e)}))}function Bo(e){var n=e.request.headers["x-algolia-api-key"]?{"x-algolia-api-key":"*****"}:{};return t(t({},e),{},{request:t(t({},e.request),{},{headers:t(t({},e.request.headers),n)})})}var Vo=function(e){var n=e.appId,r=function(e,t,n){var r={"x-algolia-api-key":n,"x-algolia-application-id":t};return{headers:function(){return e===Eo.WithinHeaders?r:{}},queryParameters:function(){return e===Eo.WithinQueryParameters?r:{}}}}(void 0!==e.authMode?e.authMode:Eo.WithinHeaders,n,e.apiKey),o=function(e){var t=e.hostsCache,n=e.logger,r=e.requester,o=e.requestsCache,i=e.responsesCache,a=e.timeouts,u=e.userAgent,l=e.hosts,s=e.queryParameters,f={hostsCache:t,logger:n,requester:r,requestsCache:o,responsesCache:i,timeouts:a,userAgent:u,headers:e.headers,queryParameters:s,hosts:l.map((function(e){return No(e)})),read:function(e,t){var n=Po(t,f.timeouts.read),r=function(){return Lo(f,f.hosts.filter((function(e){return 0!=(e.accept&Io.Read)})),e,n)};if(!0!==(void 0!==n.cacheable?n.cacheable:e.cacheable))return r();var o={request:e,mappedRequestOptions:n,transporter:{queryParameters:f.queryParameters,headers:f.headers}};return f.responsesCache.get(o,(function(){return f.requestsCache.get(o,(function(){return f.requestsCache.set(o,r()).then((function(e){return Promise.all([f.requestsCache.delete(o),e])}),(function(e){return Promise.all([f.requestsCache.delete(o),Promise.reject(e)])})).then((function(e){var t=c(e,2);return t[0],t[1]}))}))}),{miss:function(e){return f.responsesCache.set(o,e)}})},write:function(e,t){return Lo(f,f.hosts.filter((function(e){return 0!=(e.accept&Io.Write)})),e,Po(t,f.timeouts.write))}};return f}(t(t({hosts:[{url:"".concat(n,"-dsn.algolia.net"),accept:Io.Read},{url:"".concat(n,".algolia.net"),accept:Io.Write}].concat(Oo([{url:"".concat(n,"-1.algolianet.com")},{url:"".concat(n,"-2.algolianet.com")},{url:"".concat(n,"-3.algolianet.com")}]))},e),{},{headers:t(t(t({},r.headers()),{"content-type":"application/x-www-form-urlencoded"}),e.headers),queryParameters:t(t({},r.queryParameters()),e.queryParameters)})),i={transporter:o,appId:n,addAlgoliaAgent:function(e,t){o.userAgent.add({segment:e,version:t})},clearCache:function(){return Promise.all([o.requestsCache.clear(),o.responsesCache.clear()]).then((function(){}))}};return So(i,e.methods)},Wo=function(e){return function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r={transporter:e.transporter,appId:e.appId,indexName:t};return So(r,n.methods)}},Ko=function(e){return function(n,r){var o=n.map((function(e){return t(t({},e),{},{params:Uo(e.params||{})})}));return e.transporter.read({method:Ro,path:"1/indexes/*/queries",data:{requests:o},cacheable:!0},r)}},zo=function(e){return function(n,r){return Promise.all(n.map((function(n){var o=n.params,c=o.facetName,a=o.facetQuery,u=i(o,yo);return Wo(e)(n.indexName,{methods:{searchForFacetValues:Qo}}).searchForFacetValues(c,a,t(t({},r),u))})))}},Jo=function(e){return function(t,n,r){return e.transporter.read({method:Ro,path:jo("1/answers/%s/prediction",e.indexName),data:{query:t,queryLanguages:n},cacheable:!0},r)}},$o=function(e){return function(t,n){return e.transporter.read({method:Ro,path:jo("1/indexes/%s/query",e.indexName),data:{query:t},cacheable:!0},n)}},Qo=function(e){return function(t,n,r){return e.transporter.read({method:Ro,path:jo("1/indexes/%s/facets/%s/query",e.indexName,t),data:{facetQuery:n},cacheable:!0},r)}},Zo=1,Yo=2,Go=3;function Xo(e,n,r){var o,i={appId:e,apiKey:n,timeouts:{connect:1,read:2,write:30},requester:{send:function(e){return new Promise((function(t){var n=new XMLHttpRequest;n.open(e.method,e.url,!0),Object.keys(e.headers).forEach((function(t){return n.setRequestHeader(t,e.headers[t])}));var r,o=function(e,r){return setTimeout((function(){n.abort(),t({status:0,content:r,isTimedOut:!0})}),1e3*e)},i=o(e.connectTimeout,"Connection timeout");n.onreadystatechange=function(){n.readyState>n.OPENED&&void 0===r&&(clearTimeout(i),r=o(e.responseTimeout,"Socket timeout"))},n.onerror=function(){0===n.status&&(clearTimeout(i),clearTimeout(r),t({content:n.responseText||"Network request failed",status:n.status,isTimedOut:!1}))},n.onload=function(){clearTimeout(i),clearTimeout(r),t({content:n.responseText,status:n.status,isTimedOut:!1})},n.send(e.data)}))}},logger:(o=Go,{debug:function(e,t){return Zo>=o&&console.debug(e,t),Promise.resolve()},info:function(e,t){return Yo>=o&&console.info(e,t),Promise.resolve()},error:function(e,t){return console.error(e,t),Promise.resolve()}}),responsesCache:go(),requestsCache:go({serializable:!1}),hostsCache:_o({caches:[bo({key:"".concat(wo,"-").concat(e)}),go()]}),userAgent:Mo(wo).add({segment:"Browser",version:"lite"}),authMode:Eo.WithinQueryParameters};return Vo(t(t(t({},i),r),{},{methods:{search:Ko,searchForFacetValues:zo,multipleQueries:Ko,multipleSearchForFacetValues:zo,initIndex:function(e){return function(t){return Wo(e)(t,{methods:{search:$o,searchForFacetValues:Qo,findAnswers:Jo}})}}}}))}Xo.version=wo;var ei="3.5.1";var ti=["footer","searchBox"];function ni(){return ni=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},ni.apply(this,arguments)}function ri(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function oi(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?ri(Object(n),!0).forEach((function(t){ii(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):ri(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function ii(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function ci(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==n)return;var r,o,i=[],c=!0,a=!1;try{for(n=n.call(e);!(c=(r=n.next()).done)&&(i.push(r.value),!t||i.length!==t);c=!0);}catch(e){a=!0,o=e}finally{try{c||null==n.return||n.return()}finally{if(a)throw o}}return i}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return ai(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return ai(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function ai(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function ui(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}function li(e){var t=e.appId,n=e.apiKey,r=e.indexName,o=e.placeholder,i=void 0===o?"Search docs":o,c=e.searchParameters,a=e.maxResultsPerGroup,u=e.onClose,l=void 0===u?$r:u,s=e.transformItems,f=void 0===s?zr:s,p=e.hitComponent,m=void 0===p?dr:p,v=e.resultsFooterComponent,d=void 0===v?function(){return null}:v,h=e.navigator,y=e.initialScrollY,b=void 0===y?0:y,_=e.transformSearchClient,g=void 0===_?zr:_,O=e.disableUserPersonalization,S=void 0!==O&&O,j=e.initialQuery,w=void 0===j?"":j,E=e.translations,P=void 0===E?{}:E,I=e.getMissingResultsUrl,D=e.insights,k=void 0!==D&&D,A=P.footer,C=P.searchBox,x=ui(P,ti),N=ci(Be.useState({query:"",collections:[],completion:null,context:{},isOpen:!1,activeItemId:null,status:"idle"}),2),T=N[0],R=N[1],q=Be.useRef(null),L=Be.useRef(null),M=Be.useRef(null),H=Be.useRef(null),U=Be.useRef(null),F=Be.useRef(10),B=Be.useRef("undefined"!=typeof window?window.getSelection().toString().slice(0,64):"").current,V=Be.useRef(w||B).current,W=function(e,t,n){return Be.useMemo((function(){var r=Xo(e,t);return r.addAlgoliaAgent("docsearch",ei),!1===/docsearch.js \(.*\)/.test(r.transporter.userAgent.value)&&r.addAlgoliaAgent("docsearch-react",ei),n(r)}),[e,t,n])}(t,n,g),K=Be.useRef(ho({key:"__DOCSEARCH_FAVORITE_SEARCHES__".concat(r),limit:10})).current,z=Be.useRef(ho({key:"__DOCSEARCH_RECENT_SEARCHES__".concat(r),limit:0===K.getAll().length?7:4})).current,J=Be.useCallback((function(e){if(!S){var t="content"===e.type?e.__docsearch_parent:e;t&&-1===K.getAll().findIndex((function(e){return e.objectID===t.objectID}))&&z.add(t)}}),[K,z,S]),$=Be.useCallback((function(e){if(T.context.algoliaInsightsPlugin&&e.__autocomplete_id){var t=e,n={eventName:"Item Selected",index:t.__autocomplete_indexName,items:[t],positions:[e.__autocomplete_id],queryID:t.__autocomplete_queryID};T.context.algoliaInsightsPlugin.insights.clickedObjectIDsAfterSearch(n)}}),[T.context.algoliaInsightsPlugin]),Q=Be.useMemo((function(){return fr({id:"docsearch",defaultActiveItemId:0,placeholder:i,openOnFocus:!0,initialState:{query:V,context:{searchSuggestions:[]}},insights:k,navigator:h,onStateChange:function(e){R(e.state)},getSources:function(e){var o=e.query,i=e.state,u=e.setContext,s=e.setStatus;if(!o)return S?[]:[{sourceId:"recentSearches",onSelect:function(e){var t=e.item,n=e.event;J(t),Jr(n)||l()},getItemUrl:function(e){return e.item.url},getItems:function(){return z.getAll()}},{sourceId:"favoriteSearches",onSelect:function(e){var t=e.item,n=e.event;J(t),Jr(n)||l()},getItemUrl:function(e){return e.item.url},getItems:function(){return K.getAll()}}];var p=Boolean(k);return W.search([{query:o,indexName:r,params:oi({attributesToRetrieve:["hierarchy.lvl0","hierarchy.lvl1","hierarchy.lvl2","hierarchy.lvl3","hierarchy.lvl4","hierarchy.lvl5","hierarchy.lvl6","content","type","url"],attributesToSnippet:["hierarchy.lvl1:".concat(F.current),"hierarchy.lvl2:".concat(F.current),"hierarchy.lvl3:".concat(F.current),"hierarchy.lvl4:".concat(F.current),"hierarchy.lvl5:".concat(F.current),"hierarchy.lvl6:".concat(F.current),"content:".concat(F.current)],snippetEllipsisText:"…",highlightPreTag:"<mark>",highlightPostTag:"</mark>",hitsPerPage:20,clickAnalytics:p},c)}]).catch((function(e){throw"RetryError"===e.name&&s("error"),e})).then((function(e){var o=e.results,c=o[0],s=c.hits,m=c.nbHits,v=Kr(s,(function(e){return Yr(e)}),a);i.context.searchSuggestions.length<Object.keys(v).length&&u({searchSuggestions:Object.keys(v)}),u({nbHits:m});var d={};return p&&(d={__autocomplete_indexName:r,__autocomplete_queryID:o[0].queryID,__autocomplete_algoliaCredentials:{appId:t,apiKey:n}}),Object.values(v).map((function(e,t){return{sourceId:"hits".concat(t),onSelect:function(e){var t=e.item,n=e.event;J(t),Jr(n)||l()},getItemUrl:function(e){return e.item.url},getItems:function(){return Object.values(Kr(e,(function(e){return e.hierarchy.lvl1}),a)).map(f).map((function(e){return e.map((function(t){var n=null,r=e.find((function(e){return"lvl1"===e.type&&e.hierarchy.lvl1===t.hierarchy.lvl1}));return"lvl1"!==t.type&&r&&(n=r),oi(oi({},t),{},{__docsearch_parent:n},d)}))})).flat()}}}))}))}})}),[r,c,a,W,l,z,K,J,V,i,h,f,S,k,t,n]),Z=Q.getEnvironmentProps,Y=Q.getRootProps,G=Q.refresh;return function(e){var t=e.getEnvironmentProps,n=e.panelElement,r=e.formElement,o=e.inputElement;Be.useEffect((function(){if(n&&r&&o){var e=t({panelElement:n,formElement:r,inputElement:o}),i=e.onTouchStart,c=e.onTouchMove;return window.addEventListener("touchstart",i),window.addEventListener("touchmove",c),function(){window.removeEventListener("touchstart",i),window.removeEventListener("touchmove",c)}}}),[t,n,r,o])}({getEnvironmentProps:Z,panelElement:H.current,formElement:M.current,inputElement:U.current}),function(e){var t=e.container;Be.useEffect((function(){if(t){var e=t.querySelectorAll("a[href]:not([disabled]), button:not([disabled]), input:not([disabled])"),n=e[0],r=e[e.length-1];return t.addEventListener("keydown",o),function(){t.removeEventListener("keydown",o)}}function o(e){"Tab"===e.key&&(e.shiftKey?document.activeElement===n&&(e.preventDefault(),r.focus()):document.activeElement===r&&(e.preventDefault(),n.focus()))}}),[t])}({container:q.current}),Be.useEffect((function(){return document.body.classList.add("DocSearch--active"),function(){var e,t;document.body.classList.remove("DocSearch--active"),null===(e=(t=window).scrollTo)||void 0===e||e.call(t,0,b)}}),[]),Be.useEffect((function(){window.matchMedia("(max-width: 768px)").matches&&(F.current=5)}),[]),Be.useEffect((function(){H.current&&(H.current.scrollTop=0)}),[T.query]),Be.useEffect((function(){V.length>0&&(G(),U.current&&U.current.focus())}),[V,G]),Be.useEffect((function(){function e(){if(L.current){var e=.01*window.innerHeight;L.current.style.setProperty("--docsearch-vh","".concat(e,"px"))}}return e(),window.addEventListener("resize",e),function(){window.removeEventListener("resize",e)}}),[]),Be.createElement("div",ni({ref:q},Y({"aria-expanded":!0}),{className:["DocSearch","DocSearch-Container","stalled"===T.status&&"DocSearch-Container--Stalled","error"===T.status&&"DocSearch-Container--Errored"].filter(Boolean).join(" "),role:"button",tabIndex:0,onMouseDown:function(e){e.target===e.currentTarget&&l()}}),Be.createElement("div",{className:"DocSearch-Modal",ref:L},Be.createElement("header",{className:"DocSearch-SearchBar",ref:M},Be.createElement(fo,ni({},Q,{state:T,autoFocus:0===V.length,inputRef:U,isFromSelection:Boolean(V)&&V===B,translations:C,onClose:l}))),Be.createElement("div",{className:"DocSearch-Dropdown",ref:H},Be.createElement(ao,ni({},Q,{indexName:r,state:T,hitComponent:m,resultsFooterComponent:d,disableUserPersonalization:S,recentSearches:z,favoriteSearches:K,inputRef:U,translations:x,getMissingResultsUrl:I,onItemClick:function(e,t){$(e),J(e),Jr(t)||l()}}))),Be.createElement("footer",{className:"DocSearch-Footer"},Be.createElement(vr,{translations:A}))))}function si(){return si=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},si.apply(this,arguments)}function fi(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==n)return;var r,o,i=[],c=!0,a=!1;try{for(n=n.call(e);!(c=(r=n.next()).done)&&(i.push(r.value),!t||i.length!==t);c=!0);}catch(e){a=!0,o=e}finally{try{c||null==n.return||n.return()}finally{if(a)throw o}}return i}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return pi(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return pi(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function pi(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function mi(e){var t,n,r=Be.useRef(null),o=fi(Be.useState(!1),2),i=o[0],c=o[1],a=fi(Be.useState((null==e?void 0:e.initialQuery)||void 0),2),u=a[0],l=a[1],s=Be.useCallback((function(){c(!0)}),[c]),f=Be.useCallback((function(){c(!1)}),[c]);return function(e){var t=e.isOpen,n=e.onOpen,r=e.onClose,o=e.onInput,i=e.searchButtonRef;Be.useEffect((function(){function e(e){var c;(27===e.keyCode&&t||"k"===(null===(c=e.key)||void 0===c?void 0:c.toLowerCase())&&(e.metaKey||e.ctrlKey)||!function(e){var t=e.target,n=t.tagName;return t.isContentEditable||"INPUT"===n||"SELECT"===n||"TEXTAREA"===n}(e)&&"/"===e.key&&!t)&&(e.preventDefault(),t?r():document.body.classList.contains("DocSearch--active")||document.body.classList.contains("DocSearch--active")||n()),i&&i.current===document.activeElement&&o&&/[a-zA-Z0-9]/.test(String.fromCharCode(e.keyCode))&&o(e)}return window.addEventListener("keydown",e),function(){window.removeEventListener("keydown",e)}}),[t,n,r,o,i])}({isOpen:i,onOpen:s,onClose:f,onInput:Be.useCallback((function(e){c(!0),l(e.key)}),[c,l]),searchButtonRef:r}),Be.createElement(Be.Fragment,null,Be.createElement(Ye,{ref:r,translations:null==e||null===(t=e.translations)||void 0===t?void 0:t.button,onClick:s}),i&&Ie(Be.createElement(li,si({},e,{initialScrollY:window.scrollY,initialQuery:u,translations:null==e||null===(n=e.translations)||void 0===n?void 0:n.modal,onClose:f})),document.body))}return function(e){Ce(Be.createElement(mi,o({},e,{transformSearchClient:function(t){return t.addAlgoliaAgent("docsearch.js",ei),e.transformSearchClient?e.transformSearchClient(t):t}})),function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:window;return"string"==typeof e?t.document.querySelector(e):e}(e.container,e.environment))}}));
;
!function(t,o){"object"==typeof exports&&"object"==typeof module?module.exports=o():"function"==typeof define&&define.amd?define([],o):"object"==typeof exports?exports.scrollSpy=o():t.scrollSpy=o()}(self,(()=>(()=>{var t={138:(t,o,e)=>{t.exports=(t,o={})=>{const{ScrollSpy:s}=e(218),i=new s(t,o);return window.onload=i.onScroll(),window.addEventListener("scroll",(()=>i.onScroll())),i}},218:(t,o,e)=>{"use strict";e.r(o),e.d(o,{ScrollSpy:()=>s});class s{constructor(t,o={}){if(!t)throw new Error("First argument is query selector to your navigation.");if("object"!=typeof o)throw new Error("Second argument must be instance of Object.");o.smoothScroll=!0===o.smoothScroll&&{}||o.smoothScroll,this.menuList=t instanceof HTMLElement?t:document.querySelector(t),this.options=Object.assign({},{sectionClass:".scrollspy",menuActiveTarget:"li > a",offset:0,hrefAttribute:"href",activeClass:"active",scrollContainer:"",smoothScroll:{}},o),this.options.scrollContainer?this.scroller=this.options.scrollContainer instanceof HTMLElement?this.options.scrollContainer:document.querySelector(this.options.scrollContainer):this.scroller=window,this.sections=document.querySelectorAll(this.options.sectionClass),this.attachEventListeners()}attachEventListeners(){if(this.scroller&&(this.scroller.addEventListener("scroll",(()=>this.onScroll())),this.options.smoothScroll)){this.menuList.querySelectorAll(this.options.menuActiveTarget).forEach((t=>t.addEventListener("click",this.onClick.bind(this))))}}onClick(t){const o=t.target.getAttribute(this.options.hrefAttribute),e=document.querySelector(o);e&&this.options.smoothScroll&&(t.preventDefault(),this.scrollTo(e))}onScroll(){const t=this.getSectionInView(),o=this.getMenuItemBySection(t);o&&(this.removeCurrentActive({ignore:o}),this.setActive(o))}scrollTo(t){const o="function"==typeof this.options.smoothScrollBehavior&&this.options.smoothScrollBehavior;o?o(t,this.options.smoothScroll):t.scrollIntoView({...this.options.smoothScroll,behavior:"smooth"})}getMenuItemBySection(t){if(!t)return;const o=t.getAttribute("id");return this.menuList.querySelector(`[${this.options.hrefAttribute}="#${o}"]`)}getSectionInView(){for(let t=0;t<this.sections.length;t++){const o=this.sections[t].offsetTop,e=o+this.sections[t].offsetHeight;let s=(document.documentElement.scrollTop||document.body.scrollTop)+this.options.offset;this.options.scrollContainer&&this.scroller&&(s=this.scroller.scrollTop+this.options.offset);if(s>o&&s<=e)return this.sections[t]}}setActive(t){t.classList.contains(this.options.activeClass)||t.classList.add(this.options.activeClass)}removeCurrentActive({ignore:t}){const{hrefAttribute:o,menuActiveTarget:e,activeClass:s}=this.options,i=`${e}.${s}:not([${o}="${t.getAttribute(o)}"])`;this.menuList.querySelectorAll(i).forEach((t=>t.classList.remove(this.options.activeClass)))}}}},o={};function e(s){var i=o[s];if(void 0!==i)return i.exports;var r=o[s]={exports:{}};return t[s](r,r.exports,e),r.exports}return e.d=(t,o)=>{for(var s in o)e.o(o,s)&&!e.o(t,s)&&Object.defineProperty(t,s,{enumerable:!0,get:o[s]})},e.o=(t,o)=>Object.prototype.hasOwnProperty.call(t,o),e.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e(138)})()));
;
(() => {
  // <stdin>
  window.onload = function() {
    scrollSpy("toc", {
      sectionClass: "h1,h2,h3,h4",
      //   menuActiveTarget: 'href',
      offset: 100
      // scrollContainer: null,
      // smooth scroll
      // smoothScroll: true,
      //   smoothScrollBehavior: function(element) {
      //     console.log('run "smoothScrollBehavior"...', element)
      //     element.scrollIntoView({ behavior: 'smooth' })
      //   }
    });
  };
})();

;
// ToC Mobile Menu (Bootstrap 5 Dropdown with ScrollSpy)
const scrollArea = document.getElementById('content');
const tocBtn = document.getElementById('toc-dropdown-btn');
scrollArea.addEventListener("activate.bs.scrollspy", function(){
    var currentItem = document.querySelector('.dropdown-menu li > a.active').innerHTML;
    tocBtn.innerHTML = currentItem;
})

tocBtn.addEventListener('shown.bs.dropdown', event => {
    tocBtn.style.borderBottom = 'none'
    tocBtn.style.borderRadius = '4px 4px 0 0'
    // console.log("dropdown opened");
})
tocBtn.addEventListener('hidden.bs.dropdown', event => {
    tocBtn.style.borderBottom = '1px solid var(--alert-border-color)'
    tocBtn.style.borderRadius = '4px'
    // console.log("dropdown closed");
});
;
(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // ns-params:@params
  var params_default;
  var init_params = __esm({
    "ns-params:@params"() {
      params_default = { langPath: "http://localhost:1313/docs/js/components/" };
    }
  });

  // <stdin>
  var require_stdin = __commonJS({
    "<stdin>"(exports, module) {
      init_params();
      var _self = typeof window !== "undefined" ? window : typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope ? self : {};
      var Prism = function(_self2) {
        var lang = /(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i;
        var uniqueId = 0;
        var plainTextGrammar = {};
        var _ = {
          /**
           * By default, Prism will attempt to highlight all code elements (by calling {@link Prism.highlightAll}) on the
           * current page after the page finished loading. This might be a problem if e.g. you wanted to asynchronously load
           * additional languages or plugins yourself.
           *
           * By setting this value to `true`, Prism will not automatically highlight all code elements on the page.
           *
           * You obviously have to change this value before the automatic highlighting started. To do this, you can add an
           * empty Prism object into the global scope before loading the Prism script like this:
           *
           * ```js
           * window.Prism = window.Prism || {};
           * Prism.manual = true;
           * // add a new <script> to load Prism's script
           * ```
           *
           * @default false
           * @type {boolean}
           * @memberof Prism
           * @public
           */
          manual: _self2.Prism && _self2.Prism.manual,
          /**
           * By default, if Prism is in a web worker, it assumes that it is in a worker it created itself, so it uses
           * `addEventListener` to communicate with its parent instance. However, if you're using Prism manually in your
           * own worker, you don't want it to do this.
           *
           * By setting this value to `true`, Prism will not add its own listeners to the worker.
           *
           * You obviously have to change this value before Prism executes. To do this, you can add an
           * empty Prism object into the global scope before loading the Prism script like this:
           *
           * ```js
           * window.Prism = window.Prism || {};
           * Prism.disableWorkerMessageHandler = true;
           * // Load Prism's script
           * ```
           *
           * @default false
           * @type {boolean}
           * @memberof Prism
           * @public
           */
          disableWorkerMessageHandler: _self2.Prism && _self2.Prism.disableWorkerMessageHandler,
          /**
           * A namespace for utility methods.
           *
           * All function in this namespace that are not explicitly marked as _public_ are for __internal use only__ and may
           * change or disappear at any time.
           *
           * @namespace
           * @memberof Prism
           */
          util: {
            encode: function encode(tokens) {
              if (tokens instanceof Token) {
                return new Token(tokens.type, encode(tokens.content), tokens.alias);
              } else if (Array.isArray(tokens)) {
                return tokens.map(encode);
              } else {
                return tokens.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ");
              }
            },
            /**
             * Returns the name of the type of the given value.
             *
             * @param {any} o
             * @returns {string}
             * @example
             * type(null)      === 'Null'
             * type(undefined) === 'Undefined'
             * type(123)       === 'Number'
             * type('foo')     === 'String'
             * type(true)      === 'Boolean'
             * type([1, 2])    === 'Array'
             * type({})        === 'Object'
             * type(String)    === 'Function'
             * type(/abc+/)    === 'RegExp'
             */
            type: function(o) {
              return Object.prototype.toString.call(o).slice(8, -1);
            },
            /**
             * Returns a unique number for the given object. Later calls will still return the same number.
             *
             * @param {Object} obj
             * @returns {number}
             */
            objId: function(obj) {
              if (!obj["__id"]) {
                Object.defineProperty(obj, "__id", { value: ++uniqueId });
              }
              return obj["__id"];
            },
            /**
             * Creates a deep clone of the given object.
             *
             * The main intended use of this function is to clone language definitions.
             *
             * @param {T} o
             * @param {Record<number, any>} [visited]
             * @returns {T}
             * @template T
             */
            clone: function deepClone(o, visited) {
              visited = visited || {};
              var clone;
              var id;
              switch (_.util.type(o)) {
                case "Object":
                  id = _.util.objId(o);
                  if (visited[id]) {
                    return visited[id];
                  }
                  clone = /** @type {Record<string, any>} */
                  {};
                  visited[id] = clone;
                  for (var key in o) {
                    if (o.hasOwnProperty(key)) {
                      clone[key] = deepClone(o[key], visited);
                    }
                  }
                  return (
                    /** @type {any} */
                    clone
                  );
                case "Array":
                  id = _.util.objId(o);
                  if (visited[id]) {
                    return visited[id];
                  }
                  clone = [];
                  visited[id] = clone;
                  /** @type {Array} */
                  /** @type {any} */
                  o.forEach(function(v, i) {
                    clone[i] = deepClone(v, visited);
                  });
                  return (
                    /** @type {any} */
                    clone
                  );
                default:
                  return o;
              }
            },
            /**
             * Returns the Prism language of the given element set by a `language-xxxx` or `lang-xxxx` class.
             *
             * If no language is set for the element or the element is `null` or `undefined`, `none` will be returned.
             *
             * @param {Element} element
             * @returns {string}
             */
            getLanguage: function(element) {
              while (element) {
                var m = lang.exec(element.className);
                if (m) {
                  return m[1].toLowerCase();
                }
                element = element.parentElement;
              }
              return "none";
            },
            /**
             * Sets the Prism `language-xxxx` class of the given element.
             *
             * @param {Element} element
             * @param {string} language
             * @returns {void}
             */
            setLanguage: function(element, language) {
              element.className = element.className.replace(RegExp(lang, "gi"), "");
              element.classList.add("language-" + language);
            },
            /**
             * Returns the script element that is currently executing.
             *
             * This does __not__ work for line script element.
             *
             * @returns {HTMLScriptElement | null}
             */
            currentScript: function() {
              if (typeof document === "undefined") {
                return null;
              }
              if ("currentScript" in document && 1 < 2) {
                return (
                  /** @type {any} */
                  document.currentScript
                );
              }
              try {
                throw new Error();
              } catch (err) {
                var src = (/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(err.stack) || [])[1];
                if (src) {
                  var scripts = document.getElementsByTagName("script");
                  for (var i in scripts) {
                    if (scripts[i].src == src) {
                      return scripts[i];
                    }
                  }
                }
                return null;
              }
            },
            /**
             * Returns whether a given class is active for `element`.
             *
             * The class can be activated if `element` or one of its ancestors has the given class and it can be deactivated
             * if `element` or one of its ancestors has the negated version of the given class. The _negated version_ of the
             * given class is just the given class with a `no-` prefix.
             *
             * Whether the class is active is determined by the closest ancestor of `element` (where `element` itself is
             * closest ancestor) that has the given class or the negated version of it. If neither `element` nor any of its
             * ancestors have the given class or the negated version of it, then the default activation will be returned.
             *
             * In the paradoxical situation where the closest ancestor contains __both__ the given class and the negated
             * version of it, the class is considered active.
             *
             * @param {Element} element
             * @param {string} className
             * @param {boolean} [defaultActivation=false]
             * @returns {boolean}
             */
            isActive: function(element, className, defaultActivation) {
              var no = "no-" + className;
              while (element) {
                var classList = element.classList;
                if (classList.contains(className)) {
                  return true;
                }
                if (classList.contains(no)) {
                  return false;
                }
                element = element.parentElement;
              }
              return !!defaultActivation;
            }
          },
          /**
           * This namespace contains all currently loaded languages and the some helper functions to create and modify languages.
           *
           * @namespace
           * @memberof Prism
           * @public
           */
          languages: {
            /**
             * The grammar for plain, unformatted text.
             */
            plain: plainTextGrammar,
            plaintext: plainTextGrammar,
            text: plainTextGrammar,
            txt: plainTextGrammar,
            /**
             * Creates a deep copy of the language with the given id and appends the given tokens.
             *
             * If a token in `redef` also appears in the copied language, then the existing token in the copied language
             * will be overwritten at its original position.
             *
             * ## Best practices
             *
             * Since the position of overwriting tokens (token in `redef` that overwrite tokens in the copied language)
             * doesn't matter, they can technically be in any order. However, this can be confusing to others that trying to
             * understand the language definition because, normally, the order of tokens matters in Prism grammars.
             *
             * Therefore, it is encouraged to order overwriting tokens according to the positions of the overwritten tokens.
             * Furthermore, all non-overwriting tokens should be placed after the overwriting ones.
             *
             * @param {string} id The id of the language to extend. This has to be a key in `Prism.languages`.
             * @param {Grammar} redef The new tokens to append.
             * @returns {Grammar} The new language created.
             * @public
             * @example
             * Prism.languages['css-with-colors'] = Prism.languages.extend('css', {
             *     // Prism.languages.css already has a 'comment' token, so this token will overwrite CSS' 'comment' token
             *     // at its original position
             *     'comment': { ... },
             *     // CSS doesn't have a 'color' token, so this token will be appended
             *     'color': /\b(?:red|green|blue)\b/
             * });
             */
            extend: function(id, redef) {
              var lang2 = _.util.clone(_.languages[id]);
              for (var key in redef) {
                lang2[key] = redef[key];
              }
              return lang2;
            },
            /**
             * Inserts tokens _before_ another token in a language definition or any other grammar.
             *
             * ## Usage
             *
             * This helper method makes it easy to modify existing languages. For example, the CSS language definition
             * not only defines CSS highlighting for CSS documents, but also needs to define highlighting for CSS embedded
             * in HTML through `<style>` elements. To do this, it needs to modify `Prism.languages.markup` and add the
             * appropriate tokens. However, `Prism.languages.markup` is a regular JavaScript object literal, so if you do
             * this:
             *
             * ```js
             * Prism.languages.markup.style = {
             *     // token
             * };
             * ```
             *
             * then the `style` token will be added (and processed) at the end. `insertBefore` allows you to insert tokens
             * before existing tokens. For the CSS example above, you would use it like this:
             *
             * ```js
             * Prism.languages.insertBefore('markup', 'cdata', {
             *     'style': {
             *         // token
             *     }
             * });
             * ```
             *
             * ## Special cases
             *
             * If the grammars of `inside` and `insert` have tokens with the same name, the tokens in `inside`'s grammar
             * will be ignored.
             *
             * This behavior can be used to insert tokens after `before`:
             *
             * ```js
             * Prism.languages.insertBefore('markup', 'comment', {
             *     'comment': Prism.languages.markup.comment,
             *     // tokens after 'comment'
             * });
             * ```
             *
             * ## Limitations
             *
             * The main problem `insertBefore` has to solve is iteration order. Since ES2015, the iteration order for object
             * properties is guaranteed to be the insertion order (except for integer keys) but some browsers behave
             * differently when keys are deleted and re-inserted. So `insertBefore` can't be implemented by temporarily
             * deleting properties which is necessary to insert at arbitrary positions.
             *
             * To solve this problem, `insertBefore` doesn't actually insert the given tokens into the target object.
             * Instead, it will create a new object and replace all references to the target object with the new one. This
             * can be done without temporarily deleting properties, so the iteration order is well-defined.
             *
             * However, only references that can be reached from `Prism.languages` or `insert` will be replaced. I.e. if
             * you hold the target object in a variable, then the value of the variable will not change.
             *
             * ```js
             * var oldMarkup = Prism.languages.markup;
             * var newMarkup = Prism.languages.insertBefore('markup', 'comment', { ... });
             *
             * assert(oldMarkup !== Prism.languages.markup);
             * assert(newMarkup === Prism.languages.markup);
             * ```
             *
             * @param {string} inside The property of `root` (e.g. a language id in `Prism.languages`) that contains the
             * object to be modified.
             * @param {string} before The key to insert before.
             * @param {Grammar} insert An object containing the key-value pairs to be inserted.
             * @param {Object<string, any>} [root] The object containing `inside`, i.e. the object that contains the
             * object to be modified.
             *
             * Defaults to `Prism.languages`.
             * @returns {Grammar} The new grammar object.
             * @public
             */
            insertBefore: function(inside, before, insert, root) {
              root = root || /** @type {any} */
              _.languages;
              var grammar = root[inside];
              var ret = {};
              for (var token in grammar) {
                if (grammar.hasOwnProperty(token)) {
                  if (token == before) {
                    for (var newToken in insert) {
                      if (insert.hasOwnProperty(newToken)) {
                        ret[newToken] = insert[newToken];
                      }
                    }
                  }
                  if (!insert.hasOwnProperty(token)) {
                    ret[token] = grammar[token];
                  }
                }
              }
              var old = root[inside];
              root[inside] = ret;
              _.languages.DFS(_.languages, function(key, value) {
                if (value === old && key != inside) {
                  this[key] = ret;
                }
              });
              return ret;
            },
            // Traverse a language definition with Depth First Search
            DFS: function DFS(o, callback, type, visited) {
              visited = visited || {};
              var objId = _.util.objId;
              for (var i in o) {
                if (o.hasOwnProperty(i)) {
                  callback.call(o, i, o[i], type || i);
                  var property = o[i];
                  var propertyType = _.util.type(property);
                  if (propertyType === "Object" && !visited[objId(property)]) {
                    visited[objId(property)] = true;
                    DFS(property, callback, null, visited);
                  } else if (propertyType === "Array" && !visited[objId(property)]) {
                    visited[objId(property)] = true;
                    DFS(property, callback, i, visited);
                  }
                }
              }
            }
          },
          plugins: {},
          /**
           * This is the most high-level function in Prism’s API.
           * It fetches all the elements that have a `.language-xxxx` class and then calls {@link Prism.highlightElement} on
           * each one of them.
           *
           * This is equivalent to `Prism.highlightAllUnder(document, async, callback)`.
           *
           * @param {boolean} [async=false] Same as in {@link Prism.highlightAllUnder}.
           * @param {HighlightCallback} [callback] Same as in {@link Prism.highlightAllUnder}.
           * @memberof Prism
           * @public
           */
          highlightAll: function(async, callback) {
            _.highlightAllUnder(document, async, callback);
          },
          /**
           * Fetches all the descendants of `container` that have a `.language-xxxx` class and then calls
           * {@link Prism.highlightElement} on each one of them.
           *
           * The following hooks will be run:
           * 1. `before-highlightall`
           * 2. `before-all-elements-highlight`
           * 3. All hooks of {@link Prism.highlightElement} for each element.
           *
           * @param {ParentNode} container The root element, whose descendants that have a `.language-xxxx` class will be highlighted.
           * @param {boolean} [async=false] Whether each element is to be highlighted asynchronously using Web Workers.
           * @param {HighlightCallback} [callback] An optional callback to be invoked on each element after its highlighting is done.
           * @memberof Prism
           * @public
           */
          highlightAllUnder: function(container, async, callback) {
            var env = {
              callback,
              container,
              selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
            };
            _.hooks.run("before-highlightall", env);
            env.elements = Array.prototype.slice.apply(env.container.querySelectorAll(env.selector));
            _.hooks.run("before-all-elements-highlight", env);
            for (var i = 0, element; element = env.elements[i++]; ) {
              _.highlightElement(element, async === true, env.callback);
            }
          },
          /**
           * Highlights the code inside a single element.
           *
           * The following hooks will be run:
           * 1. `before-sanity-check`
           * 2. `before-highlight`
           * 3. All hooks of {@link Prism.highlight}. These hooks will be run by an asynchronous worker if `async` is `true`.
           * 4. `before-insert`
           * 5. `after-highlight`
           * 6. `complete`
           *
           * Some the above hooks will be skipped if the element doesn't contain any text or there is no grammar loaded for
           * the element's language.
           *
           * @param {Element} element The element containing the code.
           * It must have a class of `language-xxxx` to be processed, where `xxxx` is a valid language identifier.
           * @param {boolean} [async=false] Whether the element is to be highlighted asynchronously using Web Workers
           * to improve performance and avoid blocking the UI when highlighting very large chunks of code. This option is
           * [disabled by default](https://prismjs.com/faq.html#why-is-asynchronous-highlighting-disabled-by-default).
           *
           * Note: All language definitions required to highlight the code must be included in the main `prism.js` file for
           * asynchronous highlighting to work. You can build your own bundle on the
           * [Download page](https://prismjs.com/download.html).
           * @param {HighlightCallback} [callback] An optional callback to be invoked after the highlighting is done.
           * Mostly useful when `async` is `true`, since in that case, the highlighting is done asynchronously.
           * @memberof Prism
           * @public
           */
          highlightElement: function(element, async, callback) {
            var language = _.util.getLanguage(element);
            var grammar = _.languages[language];
            _.util.setLanguage(element, language);
            var parent = element.parentElement;
            if (parent && parent.nodeName.toLowerCase() === "pre") {
              _.util.setLanguage(parent, language);
            }
            var code = element.textContent;
            var env = {
              element,
              language,
              grammar,
              code
            };
            function insertHighlightedCode(highlightedCode) {
              env.highlightedCode = highlightedCode;
              _.hooks.run("before-insert", env);
              env.element.innerHTML = env.highlightedCode;
              _.hooks.run("after-highlight", env);
              _.hooks.run("complete", env);
              callback && callback.call(env.element);
            }
            _.hooks.run("before-sanity-check", env);
            parent = env.element.parentElement;
            if (parent && parent.nodeName.toLowerCase() === "pre" && !parent.hasAttribute("tabindex")) {
              parent.setAttribute("tabindex", "0");
            }
            if (!env.code) {
              _.hooks.run("complete", env);
              callback && callback.call(env.element);
              return;
            }
            _.hooks.run("before-highlight", env);
            if (!env.grammar) {
              insertHighlightedCode(_.util.encode(env.code));
              return;
            }
            if (async && _self2.Worker) {
              var worker = new Worker(_.filename);
              worker.onmessage = function(evt) {
                insertHighlightedCode(evt.data);
              };
              worker.postMessage(JSON.stringify({
                language: env.language,
                code: env.code,
                immediateClose: true
              }));
            } else {
              insertHighlightedCode(_.highlight(env.code, env.grammar, env.language));
            }
          },
          /**
           * Low-level function, only use if you know what you’re doing. It accepts a string of text as input
           * and the language definitions to use, and returns a string with the HTML produced.
           *
           * The following hooks will be run:
           * 1. `before-tokenize`
           * 2. `after-tokenize`
           * 3. `wrap`: On each {@link Token}.
           *
           * @param {string} text A string with the code to be highlighted.
           * @param {Grammar} grammar An object containing the tokens to use.
           *
           * Usually a language definition like `Prism.languages.markup`.
           * @param {string} language The name of the language definition passed to `grammar`.
           * @returns {string} The highlighted HTML.
           * @memberof Prism
           * @public
           * @example
           * Prism.highlight('var foo = true;', Prism.languages.javascript, 'javascript');
           */
          highlight: function(text, grammar, language) {
            var env = {
              code: text,
              grammar,
              language
            };
            _.hooks.run("before-tokenize", env);
            if (!env.grammar) {
              throw new Error('The language "' + env.language + '" has no grammar.');
            }
            env.tokens = _.tokenize(env.code, env.grammar);
            _.hooks.run("after-tokenize", env);
            return Token.stringify(_.util.encode(env.tokens), env.language);
          },
          /**
           * This is the heart of Prism, and the most low-level function you can use. It accepts a string of text as input
           * and the language definitions to use, and returns an array with the tokenized code.
           *
           * When the language definition includes nested tokens, the function is called recursively on each of these tokens.
           *
           * This method could be useful in other contexts as well, as a very crude parser.
           *
           * @param {string} text A string with the code to be highlighted.
           * @param {Grammar} grammar An object containing the tokens to use.
           *
           * Usually a language definition like `Prism.languages.markup`.
           * @returns {TokenStream} An array of strings and tokens, a token stream.
           * @memberof Prism
           * @public
           * @example
           * let code = `var foo = 0;`;
           * let tokens = Prism.tokenize(code, Prism.languages.javascript);
           * tokens.forEach(token => {
           *     if (token instanceof Prism.Token && token.type === 'number') {
           *         console.log(`Found numeric literal: ${token.content}`);
           *     }
           * });
           */
          tokenize: function(text, grammar) {
            var rest = grammar.rest;
            if (rest) {
              for (var token in rest) {
                grammar[token] = rest[token];
              }
              delete grammar.rest;
            }
            var tokenList = new LinkedList();
            addAfter(tokenList, tokenList.head, text);
            matchGrammar(text, tokenList, grammar, tokenList.head, 0);
            return toArray(tokenList);
          },
          /**
           * @namespace
           * @memberof Prism
           * @public
           */
          hooks: {
            all: {},
            /**
             * Adds the given callback to the list of callbacks for the given hook.
             *
             * The callback will be invoked when the hook it is registered for is run.
             * Hooks are usually directly run by a highlight function but you can also run hooks yourself.
             *
             * One callback function can be registered to multiple hooks and the same hook multiple times.
             *
             * @param {string} name The name of the hook.
             * @param {HookCallback} callback The callback function which is given environment variables.
             * @public
             */
            add: function(name, callback) {
              var hooks = _.hooks.all;
              hooks[name] = hooks[name] || [];
              hooks[name].push(callback);
            },
            /**
             * Runs a hook invoking all registered callbacks with the given environment variables.
             *
             * Callbacks will be invoked synchronously and in the order in which they were registered.
             *
             * @param {string} name The name of the hook.
             * @param {Object<string, any>} env The environment variables of the hook passed to all callbacks registered.
             * @public
             */
            run: function(name, env) {
              var callbacks = _.hooks.all[name];
              if (!callbacks || !callbacks.length) {
                return;
              }
              for (var i = 0, callback; callback = callbacks[i++]; ) {
                callback(env);
              }
            }
          },
          Token
        };
        _self2.Prism = _;
        function Token(type, content, alias, matchedStr) {
          this.type = type;
          this.content = content;
          this.alias = alias;
          this.length = (matchedStr || "").length | 0;
        }
        Token.stringify = function stringify(o, language) {
          if (typeof o == "string") {
            return o;
          }
          if (Array.isArray(o)) {
            var s = "";
            o.forEach(function(e) {
              s += stringify(e, language);
            });
            return s;
          }
          var env = {
            type: o.type,
            content: stringify(o.content, language),
            tag: "span",
            classes: ["token", o.type],
            attributes: {},
            language
          };
          var aliases = o.alias;
          if (aliases) {
            if (Array.isArray(aliases)) {
              Array.prototype.push.apply(env.classes, aliases);
            } else {
              env.classes.push(aliases);
            }
          }
          _.hooks.run("wrap", env);
          var attributes = "";
          for (var name in env.attributes) {
            attributes += " " + name + '="' + (env.attributes[name] || "").replace(/"/g, "&quot;") + '"';
          }
          return "<" + env.tag + ' class="' + env.classes.join(" ") + '"' + attributes + ">" + env.content + "</" + env.tag + ">";
        };
        function matchPattern(pattern, pos, text, lookbehind) {
          pattern.lastIndex = pos;
          var match = pattern.exec(text);
          if (match && lookbehind && match[1]) {
            var lookbehindLength = match[1].length;
            match.index += lookbehindLength;
            match[0] = match[0].slice(lookbehindLength);
          }
          return match;
        }
        function matchGrammar(text, tokenList, grammar, startNode, startPos, rematch) {
          for (var token in grammar) {
            if (!grammar.hasOwnProperty(token) || !grammar[token]) {
              continue;
            }
            var patterns = grammar[token];
            patterns = Array.isArray(patterns) ? patterns : [patterns];
            for (var j = 0; j < patterns.length; ++j) {
              if (rematch && rematch.cause == token + "," + j) {
                return;
              }
              var patternObj = patterns[j];
              var inside = patternObj.inside;
              var lookbehind = !!patternObj.lookbehind;
              var greedy = !!patternObj.greedy;
              var alias = patternObj.alias;
              if (greedy && !patternObj.pattern.global) {
                var flags = patternObj.pattern.toString().match(/[imsuy]*$/)[0];
                patternObj.pattern = RegExp(patternObj.pattern.source, flags + "g");
              }
              var pattern = patternObj.pattern || patternObj;
              for (var currentNode = startNode.next, pos = startPos; currentNode !== tokenList.tail; pos += currentNode.value.length, currentNode = currentNode.next) {
                if (rematch && pos >= rematch.reach) {
                  break;
                }
                var str = currentNode.value;
                if (tokenList.length > text.length) {
                  return;
                }
                if (str instanceof Token) {
                  continue;
                }
                var removeCount = 1;
                var match;
                if (greedy) {
                  match = matchPattern(pattern, pos, text, lookbehind);
                  if (!match || match.index >= text.length) {
                    break;
                  }
                  var from = match.index;
                  var to = match.index + match[0].length;
                  var p = pos;
                  p += currentNode.value.length;
                  while (from >= p) {
                    currentNode = currentNode.next;
                    p += currentNode.value.length;
                  }
                  p -= currentNode.value.length;
                  pos = p;
                  if (currentNode.value instanceof Token) {
                    continue;
                  }
                  for (var k = currentNode; k !== tokenList.tail && (p < to || typeof k.value === "string"); k = k.next) {
                    removeCount++;
                    p += k.value.length;
                  }
                  removeCount--;
                  str = text.slice(pos, p);
                  match.index -= pos;
                } else {
                  match = matchPattern(pattern, 0, str, lookbehind);
                  if (!match) {
                    continue;
                  }
                }
                var from = match.index;
                var matchStr = match[0];
                var before = str.slice(0, from);
                var after = str.slice(from + matchStr.length);
                var reach = pos + str.length;
                if (rematch && reach > rematch.reach) {
                  rematch.reach = reach;
                }
                var removeFrom = currentNode.prev;
                if (before) {
                  removeFrom = addAfter(tokenList, removeFrom, before);
                  pos += before.length;
                }
                removeRange(tokenList, removeFrom, removeCount);
                var wrapped = new Token(token, inside ? _.tokenize(matchStr, inside) : matchStr, alias, matchStr);
                currentNode = addAfter(tokenList, removeFrom, wrapped);
                if (after) {
                  addAfter(tokenList, currentNode, after);
                }
                if (removeCount > 1) {
                  var nestedRematch = {
                    cause: token + "," + j,
                    reach
                  };
                  matchGrammar(text, tokenList, grammar, currentNode.prev, pos, nestedRematch);
                  if (rematch && nestedRematch.reach > rematch.reach) {
                    rematch.reach = nestedRematch.reach;
                  }
                }
              }
            }
          }
        }
        function LinkedList() {
          var head = { value: null, prev: null, next: null };
          var tail = { value: null, prev: head, next: null };
          head.next = tail;
          this.head = head;
          this.tail = tail;
          this.length = 0;
        }
        function addAfter(list, node, value) {
          var next = node.next;
          var newNode = { value, prev: node, next };
          node.next = newNode;
          next.prev = newNode;
          list.length++;
          return newNode;
        }
        function removeRange(list, node, count) {
          var next = node.next;
          for (var i = 0; i < count && next !== list.tail; i++) {
            next = next.next;
          }
          node.next = next;
          next.prev = node;
          list.length -= i;
        }
        function toArray(list) {
          var array = [];
          var node = list.head.next;
          while (node !== list.tail) {
            array.push(node.value);
            node = node.next;
          }
          return array;
        }
        if (!_self2.document) {
          if (!_self2.addEventListener) {
            return _;
          }
          if (!_.disableWorkerMessageHandler) {
            _self2.addEventListener("message", function(evt) {
              var message = JSON.parse(evt.data);
              var lang2 = message.language;
              var code = message.code;
              var immediateClose = message.immediateClose;
              _self2.postMessage(_.highlight(code, _.languages[lang2], lang2));
              if (immediateClose) {
                _self2.close();
              }
            }, false);
          }
          return _;
        }
        var script = _.util.currentScript();
        if (script) {
          _.filename = script.src;
          if (script.hasAttribute("data-manual")) {
            _.manual = true;
          }
        }
        function highlightAutomaticallyCallback() {
          if (!_.manual) {
            _.highlightAll();
          }
        }
        if (!_.manual) {
          var readyState = document.readyState;
          if (readyState === "loading" || readyState === "interactive" && script && script.defer) {
            document.addEventListener("DOMContentLoaded", highlightAutomaticallyCallback);
          } else {
            if (window.requestAnimationFrame) {
              window.requestAnimationFrame(highlightAutomaticallyCallback);
            } else {
              window.setTimeout(highlightAutomaticallyCallback, 16);
            }
          }
        }
        return _;
      }(_self);
      if (typeof module !== "undefined" && module.exports) {
        module.exports = Prism;
      }
      if (typeof global !== "undefined") {
        global.Prism = Prism;
      }
      Prism.languages.markup = {
        "comment": {
          pattern: /<!--(?:(?!<!--)[\s\S])*?-->/,
          greedy: true
        },
        "prolog": {
          pattern: /<\?[\s\S]+?\?>/,
          greedy: true
        },
        "doctype": {
          // https://www.w3.org/TR/xml/#NT-doctypedecl
          pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
          greedy: true,
          inside: {
            "internal-subset": {
              pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/,
              lookbehind: true,
              greedy: true,
              inside: null
              // see below
            },
            "string": {
              pattern: /"[^"]*"|'[^']*'/,
              greedy: true
            },
            "punctuation": /^<!|>$|[[\]]/,
            "doctype-tag": /^DOCTYPE/i,
            "name": /[^\s<>'"]+/
          }
        },
        "cdata": {
          pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
          greedy: true
        },
        "tag": {
          pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
          greedy: true,
          inside: {
            "tag": {
              pattern: /^<\/?[^\s>\/]+/,
              inside: {
                "punctuation": /^<\/?/,
                "namespace": /^[^\s>\/:]+:/
              }
            },
            "special-attr": [],
            "attr-value": {
              pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
              inside: {
                "punctuation": [
                  {
                    pattern: /^=/,
                    alias: "attr-equals"
                  },
                  {
                    pattern: /^(\s*)["']|["']$/,
                    lookbehind: true
                  }
                ]
              }
            },
            "punctuation": /\/?>/,
            "attr-name": {
              pattern: /[^\s>\/]+/,
              inside: {
                "namespace": /^[^\s>\/:]+:/
              }
            }
          }
        },
        "entity": [
          {
            pattern: /&[\da-z]{1,8};/i,
            alias: "named-entity"
          },
          /&#x?[\da-f]{1,8};/i
        ]
      };
      Prism.languages.markup["tag"].inside["attr-value"].inside["entity"] = Prism.languages.markup["entity"];
      Prism.languages.markup["doctype"].inside["internal-subset"].inside = Prism.languages.markup;
      Prism.hooks.add("wrap", function(env) {
        if (env.type === "entity") {
          env.attributes["title"] = env.content.replace(/&amp;/, "&");
        }
      });
      Object.defineProperty(Prism.languages.markup.tag, "addInlined", {
        /**
         * Adds an inlined language to markup.
         *
         * An example of an inlined language is CSS with `<style>` tags.
         *
         * @param {string} tagName The name of the tag that contains the inlined language. This name will be treated as
         * case insensitive.
         * @param {string} lang The language key.
         * @example
         * addInlined('style', 'css');
         */
        value: function addInlined(tagName, lang) {
          var includedCdataInside = {};
          includedCdataInside["language-" + lang] = {
            pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
            lookbehind: true,
            inside: Prism.languages[lang]
          };
          includedCdataInside["cdata"] = /^<!\[CDATA\[|\]\]>$/i;
          var inside = {
            "included-cdata": {
              pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
              inside: includedCdataInside
            }
          };
          inside["language-" + lang] = {
            pattern: /[\s\S]+/,
            inside: Prism.languages[lang]
          };
          var def = {};
          def[tagName] = {
            pattern: RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g, function() {
              return tagName;
            }), "i"),
            lookbehind: true,
            greedy: true,
            inside
          };
          Prism.languages.insertBefore("markup", "cdata", def);
        }
      });
      Object.defineProperty(Prism.languages.markup.tag, "addAttribute", {
        /**
         * Adds an pattern to highlight languages embedded in HTML attributes.
         *
         * An example of an inlined language is CSS with `style` attributes.
         *
         * @param {string} attrName The name of the tag that contains the inlined language. This name will be treated as
         * case insensitive.
         * @param {string} lang The language key.
         * @example
         * addAttribute('style', 'css');
         */
        value: function(attrName, lang) {
          Prism.languages.markup.tag.inside["special-attr"].push({
            pattern: RegExp(
              /(^|["'\s])/.source + "(?:" + attrName + ")" + /\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,
              "i"
            ),
            lookbehind: true,
            inside: {
              "attr-name": /^[^\s=]+/,
              "attr-value": {
                pattern: /=[\s\S]+/,
                inside: {
                  "value": {
                    pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
                    lookbehind: true,
                    alias: [lang, "language-" + lang],
                    inside: Prism.languages[lang]
                  },
                  "punctuation": [
                    {
                      pattern: /^=/,
                      alias: "attr-equals"
                    },
                    /"|'/
                  ]
                }
              }
            }
          });
        }
      });
      Prism.languages.html = Prism.languages.markup;
      Prism.languages.mathml = Prism.languages.markup;
      Prism.languages.svg = Prism.languages.markup;
      Prism.languages.xml = Prism.languages.extend("markup", {});
      Prism.languages.ssml = Prism.languages.xml;
      Prism.languages.atom = Prism.languages.xml;
      Prism.languages.rss = Prism.languages.xml;
      (function(Prism2) {
        var string = /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;
        Prism2.languages.css = {
          "comment": /\/\*[\s\S]*?\*\//,
          "atrule": {
            pattern: RegExp("@[\\w-](?:" + /[^;{\s"']|\s+(?!\s)/.source + "|" + string.source + ")*?" + /(?:;|(?=\s*\{))/.source),
            inside: {
              "rule": /^@[\w-]+/,
              "selector-function-argument": {
                pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
                lookbehind: true,
                alias: "selector"
              },
              "keyword": {
                pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
                lookbehind: true
              }
              // See rest below
            }
          },
          "url": {
            // https://drafts.csswg.org/css-values-3/#urls
            pattern: RegExp("\\burl\\((?:" + string.source + "|" + /(?:[^\\\r\n()"']|\\[\s\S])*/.source + ")\\)", "i"),
            greedy: true,
            inside: {
              "function": /^url/i,
              "punctuation": /^\(|\)$/,
              "string": {
                pattern: RegExp("^" + string.source + "$"),
                alias: "url"
              }
            }
          },
          "selector": {
            pattern: RegExp(`(^|[{}\\s])[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|` + string.source + ")*(?=\\s*\\{)"),
            lookbehind: true
          },
          "string": {
            pattern: string,
            greedy: true
          },
          "property": {
            pattern: /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
            lookbehind: true
          },
          "important": /!important\b/i,
          "function": {
            pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,
            lookbehind: true
          },
          "punctuation": /[(){};:,]/
        };
        Prism2.languages.css["atrule"].inside.rest = Prism2.languages.css;
        var markup = Prism2.languages.markup;
        if (markup) {
          markup.tag.addInlined("style", "css");
          markup.tag.addAttribute("style", "css");
        }
      })(Prism);
      Prism.languages.clike = {
        "comment": [
          {
            pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
            lookbehind: true,
            greedy: true
          },
          {
            pattern: /(^|[^\\:])\/\/.*/,
            lookbehind: true,
            greedy: true
          }
        ],
        "string": {
          pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
          greedy: true
        },
        "class-name": {
          pattern: /(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,
          lookbehind: true,
          inside: {
            "punctuation": /[.\\]/
          }
        },
        "keyword": /\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,
        "boolean": /\b(?:false|true)\b/,
        "function": /\b\w+(?=\()/,
        "number": /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
        "operator": /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
        "punctuation": /[{}[\];(),.:]/
      };
      Prism.languages.javascript = Prism.languages.extend("clike", {
        "class-name": [
          Prism.languages.clike["class-name"],
          {
            pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,
            lookbehind: true
          }
        ],
        "keyword": [
          {
            pattern: /((?:^|\})\s*)catch\b/,
            lookbehind: true
          },
          {
            pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
            lookbehind: true
          }
        ],
        // Allow for all non-ASCII characters (See http://stackoverflow.com/a/2008444)
        "function": /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
        "number": {
          pattern: RegExp(
            /(^|[^\w$])/.source + "(?:" + // constant
            (/NaN|Infinity/.source + "|" + // binary integer
            /0[bB][01]+(?:_[01]+)*n?/.source + "|" + // octal integer
            /0[oO][0-7]+(?:_[0-7]+)*n?/.source + "|" + // hexadecimal integer
            /0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source + "|" + // decimal bigint
            /\d+(?:_\d+)*n/.source + "|" + // decimal number (integer or float) but no bigint
            /(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source) + ")" + /(?![\w$])/.source
          ),
          lookbehind: true
        },
        "operator": /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/
      });
      Prism.languages.javascript["class-name"][0].pattern = /(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/;
      Prism.languages.insertBefore("javascript", "keyword", {
        "regex": {
          pattern: RegExp(
            // lookbehind
            // eslint-disable-next-line regexp/no-dupe-characters-character-class
            /((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source + // Regex pattern:
            // There are 2 regex patterns here. The RegExp set notation proposal added support for nested character
            // classes if the `v` flag is present. Unfortunately, nested CCs are both context-free and incompatible
            // with the only syntax, so we have to define 2 different regex patterns.
            /\//.source + "(?:" + /(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source + "|" + // `v` flag syntax. This supports 3 levels of nested character classes.
            /(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source + ")" + // lookahead
            /(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source
          ),
          lookbehind: true,
          greedy: true,
          inside: {
            "regex-source": {
              pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
              lookbehind: true,
              alias: "language-regex",
              inside: Prism.languages.regex
            },
            "regex-delimiter": /^\/|\/$/,
            "regex-flags": /^[a-z]+$/
          }
        },
        // This must be declared before keyword because we use "function" inside the look-forward
        "function-variable": {
          pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
          alias: "function"
        },
        "parameter": [
          {
            pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
            lookbehind: true,
            inside: Prism.languages.javascript
          },
          {
            pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
            lookbehind: true,
            inside: Prism.languages.javascript
          },
          {
            pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
            lookbehind: true,
            inside: Prism.languages.javascript
          },
          {
            pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
            lookbehind: true,
            inside: Prism.languages.javascript
          }
        ],
        "constant": /\b[A-Z](?:[A-Z_]|\dx?)*\b/
      });
      Prism.languages.insertBefore("javascript", "string", {
        "hashbang": {
          pattern: /^#!.*/,
          greedy: true,
          alias: "comment"
        },
        "template-string": {
          pattern: /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,
          greedy: true,
          inside: {
            "template-punctuation": {
              pattern: /^`|`$/,
              alias: "string"
            },
            "interpolation": {
              pattern: /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
              lookbehind: true,
              inside: {
                "interpolation-punctuation": {
                  pattern: /^\$\{|\}$/,
                  alias: "punctuation"
                },
                rest: Prism.languages.javascript
              }
            },
            "string": /[\s\S]+/
          }
        },
        "string-property": {
          pattern: /((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,
          lookbehind: true,
          greedy: true,
          alias: "property"
        }
      });
      Prism.languages.insertBefore("javascript", "operator", {
        "literal-property": {
          pattern: /((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,
          lookbehind: true,
          alias: "property"
        }
      });
      if (Prism.languages.markup) {
        Prism.languages.markup.tag.addInlined("script", "javascript");
        Prism.languages.markup.tag.addAttribute(
          /on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,
          "javascript"
        );
      }
      Prism.languages.js = Prism.languages.javascript;
      (function(Prism2) {
        Prism2.languages.diff = {
          "coord": [
            // Match all kinds of coord lines (prefixed by "+++", "---" or "***").
            /^(?:\*{3}|-{3}|\+{3}).*$/m,
            // Match "@@ ... @@" coord lines in unified diff.
            /^@@.*@@$/m,
            // Match coord lines in normal diff (starts with a number).
            /^\d.*$/m
          ]
          // deleted, inserted, unchanged, diff
        };
        var PREFIXES = {
          "deleted-sign": "-",
          "deleted-arrow": "<",
          "inserted-sign": "+",
          "inserted-arrow": ">",
          "unchanged": " ",
          "diff": "!"
        };
        Object.keys(PREFIXES).forEach(function(name) {
          var prefix = PREFIXES[name];
          var alias = [];
          if (!/^\w+$/.test(name)) {
            alias.push(/\w+/.exec(name)[0]);
          }
          if (name === "diff") {
            alias.push("bold");
          }
          Prism2.languages.diff[name] = {
            pattern: RegExp("^(?:[" + prefix + "].*(?:\r\n?|\n|(?![\\s\\S])))+", "m"),
            alias,
            inside: {
              "line": {
                pattern: /(.)(?=[\s\S]).*(?:\r\n?|\n)?/,
                lookbehind: true
              },
              "prefix": {
                pattern: /[\s\S]/,
                alias: /\w+/.exec(name)[0]
              }
            }
          };
        });
        Object.defineProperty(Prism2.languages.diff, "PREFIXES", {
          value: PREFIXES
        });
      })(Prism);
      (function() {
        if (typeof Prism === "undefined" || typeof document === "undefined" || !document.querySelector) {
          return;
        }
        var LINE_NUMBERS_CLASS = "line-numbers";
        var LINKABLE_LINE_NUMBERS_CLASS = "linkable-line-numbers";
        var NEW_LINE_EXP = /\n(?!$)/g;
        function $$(selector, container) {
          return Array.prototype.slice.call((container || document).querySelectorAll(selector));
        }
        function hasClass(element, className) {
          return element.classList.contains(className);
        }
        function callFunction(func) {
          func();
        }
        var isLineHeightRounded = /* @__PURE__ */ function() {
          var res;
          return function() {
            if (typeof res === "undefined") {
              var d = document.createElement("div");
              d.style.fontSize = "13px";
              d.style.lineHeight = "1.5";
              d.style.padding = "0";
              d.style.border = "0";
              d.innerHTML = "&nbsp;<br />&nbsp;";
              document.body.appendChild(d);
              res = d.offsetHeight === 38;
              document.body.removeChild(d);
            }
            return res;
          };
        }();
        function getContentBoxTopOffset(parent, child) {
          var parentStyle = getComputedStyle(parent);
          var childStyle = getComputedStyle(child);
          function pxToNumber(px) {
            return +px.substr(0, px.length - 2);
          }
          return child.offsetTop + pxToNumber(childStyle.borderTopWidth) + pxToNumber(childStyle.paddingTop) - pxToNumber(parentStyle.paddingTop);
        }
        function isActiveFor(pre) {
          if (!pre || !/pre/i.test(pre.nodeName)) {
            return false;
          }
          if (pre.hasAttribute("data-line")) {
            return true;
          }
          if (pre.id && Prism.util.isActive(pre, LINKABLE_LINE_NUMBERS_CLASS)) {
            return true;
          }
          return false;
        }
        var scrollIntoView = true;
        Prism.plugins.lineHighlight = {
          /**
           * Highlights the lines of the given pre.
           *
           * This function is split into a DOM measuring and mutate phase to improve performance.
           * The returned function mutates the DOM when called.
           *
           * @param {HTMLElement} pre
           * @param {string | null} [lines]
           * @param {string} [classes='']
           * @returns {() => void}
           */
          highlightLines: function highlightLines(pre, lines, classes) {
            lines = typeof lines === "string" ? lines : pre.getAttribute("data-line") || "";
            var ranges = lines.replace(/\s+/g, "").split(",").filter(Boolean);
            var offset = +pre.getAttribute("data-line-offset") || 0;
            var parseMethod = isLineHeightRounded() ? parseInt : parseFloat;
            var lineHeight = parseMethod(getComputedStyle(pre).lineHeight);
            var hasLineNumbers = Prism.util.isActive(pre, LINE_NUMBERS_CLASS);
            var codeElement = pre.querySelector("code");
            var parentElement = hasLineNumbers ? pre : codeElement || pre;
            var mutateActions = (
              /** @type {(() => void)[]} */
              []
            );
            var lineBreakMatch = codeElement.textContent.match(NEW_LINE_EXP);
            var numberOfLines = lineBreakMatch ? lineBreakMatch.length + 1 : 1;
            var codePreOffset = !codeElement || parentElement == codeElement ? 0 : getContentBoxTopOffset(pre, codeElement);
            ranges.forEach(function(currentRange) {
              var range = currentRange.split("-");
              var start2 = +range[0];
              var end = +range[1] || start2;
              end = Math.min(numberOfLines + offset, end);
              if (end < start2) {
                return;
              }
              var line = pre.querySelector('.line-highlight[data-range="' + currentRange + '"]') || document.createElement("div");
              mutateActions.push(function() {
                line.setAttribute("aria-hidden", "true");
                line.setAttribute("data-range", currentRange);
                line.className = (classes || "") + " line-highlight";
              });
              if (hasLineNumbers && Prism.plugins.lineNumbers) {
                var startNode = Prism.plugins.lineNumbers.getLine(pre, start2);
                var endNode = Prism.plugins.lineNumbers.getLine(pre, end);
                if (startNode) {
                  var top = startNode.offsetTop + codePreOffset + "px";
                  mutateActions.push(function() {
                    line.style.top = top;
                  });
                }
                if (endNode) {
                  var height = endNode.offsetTop - startNode.offsetTop + endNode.offsetHeight + "px";
                  mutateActions.push(function() {
                    line.style.height = height;
                  });
                }
              } else {
                mutateActions.push(function() {
                  line.setAttribute("data-start", String(start2));
                  if (end > start2) {
                    line.setAttribute("data-end", String(end));
                  }
                  line.style.top = (start2 - offset - 1) * lineHeight + codePreOffset + "px";
                  line.textContent = new Array(end - start2 + 2).join(" \n");
                });
              }
              mutateActions.push(function() {
                line.style.width = pre.scrollWidth + "px";
              });
              mutateActions.push(function() {
                parentElement.appendChild(line);
              });
            });
            var id = pre.id;
            if (hasLineNumbers && Prism.util.isActive(pre, LINKABLE_LINE_NUMBERS_CLASS) && id) {
              if (!hasClass(pre, LINKABLE_LINE_NUMBERS_CLASS)) {
                mutateActions.push(function() {
                  pre.classList.add(LINKABLE_LINE_NUMBERS_CLASS);
                });
              }
              var start = parseInt(pre.getAttribute("data-start") || "1");
              $$(".line-numbers-rows > span", pre).forEach(function(lineSpan, i) {
                var lineNumber = i + start;
                lineSpan.onclick = function() {
                  var hash = id + "." + lineNumber;
                  scrollIntoView = false;
                  location.hash = hash;
                  setTimeout(function() {
                    scrollIntoView = true;
                  }, 1);
                };
              });
            }
            return function() {
              mutateActions.forEach(callFunction);
            };
          }
        };
        function applyHash() {
          var hash = location.hash.slice(1);
          $$(".temporary.line-highlight").forEach(function(line) {
            line.parentNode.removeChild(line);
          });
          var range = (hash.match(/\.([\d,-]+)$/) || [, ""])[1];
          if (!range || document.getElementById(hash)) {
            return;
          }
          var id = hash.slice(0, hash.lastIndexOf("."));
          var pre = document.getElementById(id);
          if (!pre) {
            return;
          }
          if (!pre.hasAttribute("data-line")) {
            pre.setAttribute("data-line", "");
          }
          var mutateDom = Prism.plugins.lineHighlight.highlightLines(pre, range, "temporary ");
          mutateDom();
          if (scrollIntoView) {
            document.querySelector(".temporary.line-highlight").scrollIntoView();
          }
        }
        var fakeTimer = 0;
        Prism.hooks.add("before-sanity-check", function(env) {
          var pre = env.element.parentElement;
          if (!isActiveFor(pre)) {
            return;
          }
          var num = 0;
          $$(".line-highlight", pre).forEach(function(line) {
            num += line.textContent.length;
            line.parentNode.removeChild(line);
          });
          if (num && /^(?: \n)+$/.test(env.code.slice(-num))) {
            env.code = env.code.slice(0, -num);
          }
        });
        Prism.hooks.add("complete", function completeHook(env) {
          var pre = env.element.parentElement;
          if (!isActiveFor(pre)) {
            return;
          }
          clearTimeout(fakeTimer);
          var hasLineNumbers = Prism.plugins.lineNumbers;
          var isLineNumbersLoaded = env.plugins && env.plugins.lineNumbers;
          if (hasClass(pre, LINE_NUMBERS_CLASS) && hasLineNumbers && !isLineNumbersLoaded) {
            Prism.hooks.add("line-numbers", completeHook);
          } else {
            var mutateDom = Prism.plugins.lineHighlight.highlightLines(pre);
            mutateDom();
            fakeTimer = setTimeout(applyHash, 1);
          }
        });
        window.addEventListener("hashchange", applyHash);
        window.addEventListener("resize", function() {
          var actions = $$("pre").filter(isActiveFor).map(function(pre) {
            return Prism.plugins.lineHighlight.highlightLines(pre);
          });
          actions.forEach(callFunction);
        });
      })();
      (function() {
        if (typeof Prism === "undefined" || typeof document === "undefined") {
          return;
        }
        var PLUGIN_NAME = "line-numbers";
        var NEW_LINE_EXP = /\n(?!$)/g;
        var config = Prism.plugins.lineNumbers = {
          /**
           * Get node for provided line number
           *
           * @param {Element} element pre element
           * @param {number} number line number
           * @returns {Element|undefined}
           */
          getLine: function(element, number) {
            if (element.tagName !== "PRE" || !element.classList.contains(PLUGIN_NAME)) {
              return;
            }
            var lineNumberRows = element.querySelector(".line-numbers-rows");
            if (!lineNumberRows) {
              return;
            }
            var lineNumberStart = parseInt(element.getAttribute("data-start"), 10) || 1;
            var lineNumberEnd = lineNumberStart + (lineNumberRows.children.length - 1);
            if (number < lineNumberStart) {
              number = lineNumberStart;
            }
            if (number > lineNumberEnd) {
              number = lineNumberEnd;
            }
            var lineIndex = number - lineNumberStart;
            return lineNumberRows.children[lineIndex];
          },
          /**
           * Resizes the line numbers of the given element.
           *
           * This function will not add line numbers. It will only resize existing ones.
           *
           * @param {HTMLElement} element A `<pre>` element with line numbers.
           * @returns {void}
           */
          resize: function(element) {
            resizeElements([element]);
          },
          /**
           * Whether the plugin can assume that the units font sizes and margins are not depended on the size of
           * the current viewport.
           *
           * Setting this to `true` will allow the plugin to do certain optimizations for better performance.
           *
           * Set this to `false` if you use any of the following CSS units: `vh`, `vw`, `vmin`, `vmax`.
           *
           * @type {boolean}
           */
          assumeViewportIndependence: true
        };
        function resizeElements(elements) {
          elements = elements.filter(function(e) {
            var codeStyles = getStyles(e);
            var whiteSpace = codeStyles["white-space"];
            return whiteSpace === "pre-wrap" || whiteSpace === "pre-line";
          });
          if (elements.length == 0) {
            return;
          }
          var infos = elements.map(function(element) {
            var codeElement = element.querySelector("code");
            var lineNumbersWrapper = element.querySelector(".line-numbers-rows");
            if (!codeElement || !lineNumbersWrapper) {
              return void 0;
            }
            var lineNumberSizer = element.querySelector(".line-numbers-sizer");
            var codeLines = codeElement.textContent.split(NEW_LINE_EXP);
            if (!lineNumberSizer) {
              lineNumberSizer = document.createElement("span");
              lineNumberSizer.className = "line-numbers-sizer";
              codeElement.appendChild(lineNumberSizer);
            }
            lineNumberSizer.innerHTML = "0";
            lineNumberSizer.style.display = "block";
            var oneLinerHeight = lineNumberSizer.getBoundingClientRect().height;
            lineNumberSizer.innerHTML = "";
            return {
              element,
              lines: codeLines,
              lineHeights: [],
              oneLinerHeight,
              sizer: lineNumberSizer
            };
          }).filter(Boolean);
          infos.forEach(function(info) {
            var lineNumberSizer = info.sizer;
            var lines = info.lines;
            var lineHeights = info.lineHeights;
            var oneLinerHeight = info.oneLinerHeight;
            lineHeights[lines.length - 1] = void 0;
            lines.forEach(function(line, index) {
              if (line && line.length > 1) {
                var e = lineNumberSizer.appendChild(document.createElement("span"));
                e.style.display = "block";
                e.textContent = line;
              } else {
                lineHeights[index] = oneLinerHeight;
              }
            });
          });
          infos.forEach(function(info) {
            var lineNumberSizer = info.sizer;
            var lineHeights = info.lineHeights;
            var childIndex = 0;
            for (var i = 0; i < lineHeights.length; i++) {
              if (lineHeights[i] === void 0) {
                lineHeights[i] = lineNumberSizer.children[childIndex++].getBoundingClientRect().height;
              }
            }
          });
          infos.forEach(function(info) {
            var lineNumberSizer = info.sizer;
            var wrapper = info.element.querySelector(".line-numbers-rows");
            lineNumberSizer.style.display = "none";
            lineNumberSizer.innerHTML = "";
            info.lineHeights.forEach(function(height, lineNumber) {
              wrapper.children[lineNumber].style.height = height + "px";
            });
          });
        }
        function getStyles(element) {
          if (!element) {
            return null;
          }
          return window.getComputedStyle ? getComputedStyle(element) : element.currentStyle || null;
        }
        var lastWidth = void 0;
        window.addEventListener("resize", function() {
          if (config.assumeViewportIndependence && lastWidth === window.innerWidth) {
            return;
          }
          lastWidth = window.innerWidth;
          resizeElements(Array.prototype.slice.call(document.querySelectorAll("pre." + PLUGIN_NAME)));
        });
        Prism.hooks.add("complete", function(env) {
          if (!env.code) {
            return;
          }
          var code = (
            /** @type {Element} */
            env.element
          );
          var pre = (
            /** @type {HTMLElement} */
            code.parentNode
          );
          if (!pre || !/pre/i.test(pre.nodeName)) {
            return;
          }
          if (code.querySelector(".line-numbers-rows")) {
            return;
          }
          if (!Prism.util.isActive(code, PLUGIN_NAME)) {
            return;
          }
          code.classList.remove(PLUGIN_NAME);
          pre.classList.add(PLUGIN_NAME);
          var match = env.code.match(NEW_LINE_EXP);
          var linesNum = match ? match.length + 1 : 1;
          var lineNumbersWrapper;
          var lines = new Array(linesNum + 1).join("<span></span>");
          lineNumbersWrapper = document.createElement("span");
          lineNumbersWrapper.setAttribute("aria-hidden", "true");
          lineNumbersWrapper.className = "line-numbers-rows";
          lineNumbersWrapper.innerHTML = lines;
          if (pre.hasAttribute("data-start")) {
            pre.style.counterReset = "linenumber " + (parseInt(pre.getAttribute("data-start"), 10) - 1);
          }
          env.element.appendChild(lineNumbersWrapper);
          resizeElements([pre]);
          Prism.hooks.run("line-numbers", env);
        });
        Prism.hooks.add("line-numbers", function(env) {
          env.plugins = env.plugins || {};
          env.plugins.lineNumbers = true;
        });
      })();
      (function() {
        if (typeof Prism === "undefined" || typeof document === "undefined") {
          return;
        }
        if (!Element.prototype.matches) {
          Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
        }
        var LOADING_MESSAGE = "Loading\u2026";
        var FAILURE_MESSAGE = function(status, message) {
          return "\u2716 Error " + status + " while fetching file: " + message;
        };
        var FAILURE_EMPTY_MESSAGE = "\u2716 Error: File does not exist or is empty";
        var EXTENSIONS = {
          "js": "javascript",
          "py": "python",
          "rb": "ruby",
          "ps1": "powershell",
          "psm1": "powershell",
          "sh": "bash",
          "bat": "batch",
          "h": "c",
          "tex": "latex"
        };
        var STATUS_ATTR = "data-src-status";
        var STATUS_LOADING = "loading";
        var STATUS_LOADED = "loaded";
        var STATUS_FAILED = "failed";
        var SELECTOR = "pre[data-src]:not([" + STATUS_ATTR + '="' + STATUS_LOADED + '"]):not([' + STATUS_ATTR + '="' + STATUS_LOADING + '"])';
        function loadFile(src, success, error) {
          var xhr = new XMLHttpRequest();
          xhr.open("GET", src, true);
          xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
              if (xhr.status < 400 && xhr.responseText) {
                success(xhr.responseText);
              } else {
                if (xhr.status >= 400) {
                  error(FAILURE_MESSAGE(xhr.status, xhr.statusText));
                } else {
                  error(FAILURE_EMPTY_MESSAGE);
                }
              }
            }
          };
          xhr.send(null);
        }
        function parseRange(range) {
          var m = /^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(range || "");
          if (m) {
            var start = Number(m[1]);
            var comma = m[2];
            var end = m[3];
            if (!comma) {
              return [start, start];
            }
            if (!end) {
              return [start, void 0];
            }
            return [start, Number(end)];
          }
          return void 0;
        }
        Prism.hooks.add("before-highlightall", function(env) {
          env.selector += ", " + SELECTOR;
        });
        Prism.hooks.add("before-sanity-check", function(env) {
          var pre = (
            /** @type {HTMLPreElement} */
            env.element
          );
          if (pre.matches(SELECTOR)) {
            env.code = "";
            pre.setAttribute(STATUS_ATTR, STATUS_LOADING);
            var code = pre.appendChild(document.createElement("CODE"));
            code.textContent = LOADING_MESSAGE;
            var src = pre.getAttribute("data-src");
            var language = env.language;
            if (language === "none") {
              var extension = (/\.(\w+)$/.exec(src) || [, "none"])[1];
              language = EXTENSIONS[extension] || extension;
            }
            Prism.util.setLanguage(code, language);
            Prism.util.setLanguage(pre, language);
            var autoloader = Prism.plugins.autoloader;
            if (autoloader) {
              autoloader.loadLanguages(language);
            }
            loadFile(
              src,
              function(text) {
                pre.setAttribute(STATUS_ATTR, STATUS_LOADED);
                var range = parseRange(pre.getAttribute("data-range"));
                if (range) {
                  var lines = text.split(/\r\n?|\n/g);
                  var start = range[0];
                  var end = range[1] == null ? lines.length : range[1];
                  if (start < 0) {
                    start += lines.length;
                  }
                  start = Math.max(0, Math.min(start - 1, lines.length));
                  if (end < 0) {
                    end += lines.length;
                  }
                  end = Math.max(0, Math.min(end, lines.length));
                  text = lines.slice(start, end).join("\n");
                  if (!pre.hasAttribute("data-start")) {
                    pre.setAttribute("data-start", String(start + 1));
                  }
                }
                code.textContent = text;
                Prism.highlightElement(code);
              },
              function(error) {
                pre.setAttribute(STATUS_ATTR, STATUS_FAILED);
                code.textContent = error;
              }
            );
          }
        });
        Prism.plugins.fileHighlight = {
          /**
           * Executes the File Highlight plugin for all matching `pre` elements under the given container.
           *
           * Note: Elements which are already loaded or currently loading will not be touched by this method.
           *
           * @param {ParentNode} [container=document]
           */
          highlight: function highlight(container) {
            var elements = (container || document).querySelectorAll(SELECTOR);
            for (var i = 0, element; element = elements[i++]; ) {
              Prism.highlightElement(element);
            }
          }
        };
        var logged = false;
        Prism.fileHighlight = function() {
          if (!logged) {
            console.warn("Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead.");
            logged = true;
          }
          Prism.plugins.fileHighlight.highlight.apply(this, arguments);
        };
      })();
      (function() {
        if (typeof Prism === "undefined" || typeof document === "undefined") {
          return;
        }
        var lang_dependencies = (
          /*dependencies_placeholder[*/
          {
            "javascript": "clike",
            "actionscript": "javascript",
            "apex": [
              "clike",
              "sql"
            ],
            "arduino": "cpp",
            "aspnet": [
              "markup",
              "csharp"
            ],
            "birb": "clike",
            "bison": "c",
            "c": "clike",
            "csharp": "clike",
            "cpp": "c",
            "cfscript": "clike",
            "chaiscript": [
              "clike",
              "cpp"
            ],
            "cilkc": "c",
            "cilkcpp": "cpp",
            "coffeescript": "javascript",
            "crystal": "ruby",
            "css-extras": "css",
            "d": "clike",
            "dart": "clike",
            "django": "markup-templating",
            "ejs": [
              "javascript",
              "markup-templating"
            ],
            "etlua": [
              "lua",
              "markup-templating"
            ],
            "erb": [
              "ruby",
              "markup-templating"
            ],
            "fsharp": "clike",
            "firestore-security-rules": "clike",
            "flow": "javascript",
            "ftl": "markup-templating",
            "gml": "clike",
            "glsl": "c",
            "go": "clike",
            "gradle": "clike",
            "groovy": "clike",
            "haml": "ruby",
            "handlebars": "markup-templating",
            "haxe": "clike",
            "hlsl": "c",
            "idris": "haskell",
            "java": "clike",
            "javadoc": [
              "markup",
              "java",
              "javadoclike"
            ],
            "jolie": "clike",
            "jsdoc": [
              "javascript",
              "javadoclike",
              "typescript"
            ],
            "js-extras": "javascript",
            "json5": "json",
            "jsonp": "json",
            "js-templates": "javascript",
            "kotlin": "clike",
            "latte": [
              "clike",
              "markup-templating",
              "php"
            ],
            "less": "css",
            "lilypond": "scheme",
            "liquid": "markup-templating",
            "markdown": "markup",
            "markup-templating": "markup",
            "mongodb": "javascript",
            "n4js": "javascript",
            "objectivec": "c",
            "opencl": "c",
            "parser": "markup",
            "php": "markup-templating",
            "phpdoc": [
              "php",
              "javadoclike"
            ],
            "php-extras": "php",
            "plsql": "sql",
            "processing": "clike",
            "protobuf": "clike",
            "pug": [
              "markup",
              "javascript"
            ],
            "purebasic": "clike",
            "purescript": "haskell",
            "qsharp": "clike",
            "qml": "javascript",
            "qore": "clike",
            "racket": "scheme",
            "cshtml": [
              "markup",
              "csharp"
            ],
            "jsx": [
              "markup",
              "javascript"
            ],
            "tsx": [
              "jsx",
              "typescript"
            ],
            "reason": "clike",
            "ruby": "clike",
            "sass": "css",
            "scss": "css",
            "scala": "java",
            "shell-session": "bash",
            "smarty": "markup-templating",
            "solidity": "clike",
            "soy": "markup-templating",
            "sparql": "turtle",
            "sqf": "clike",
            "squirrel": "clike",
            "stata": [
              "mata",
              "java",
              "python"
            ],
            "t4-cs": [
              "t4-templating",
              "csharp"
            ],
            "t4-vb": [
              "t4-templating",
              "vbnet"
            ],
            "tap": "yaml",
            "tt2": [
              "clike",
              "markup-templating"
            ],
            "textile": "markup",
            "twig": "markup-templating",
            "typescript": "javascript",
            "v": "clike",
            "vala": "clike",
            "vbnet": "basic",
            "velocity": "markup",
            "wiki": "markup",
            "xeora": "markup",
            "xml-doc": "markup",
            "xquery": "markup"
          }
        );
        var lang_aliases = (
          /*aliases_placeholder[*/
          {
            "html": "markup",
            "xml": "markup",
            "svg": "markup",
            "mathml": "markup",
            "ssml": "markup",
            "atom": "markup",
            "rss": "markup",
            "js": "javascript",
            "g4": "antlr4",
            "ino": "arduino",
            "arm-asm": "armasm",
            "art": "arturo",
            "adoc": "asciidoc",
            "avs": "avisynth",
            "avdl": "avro-idl",
            "gawk": "awk",
            "sh": "bash",
            "shell": "bash",
            "shortcode": "bbcode",
            "rbnf": "bnf",
            "oscript": "bsl",
            "cs": "csharp",
            "dotnet": "csharp",
            "cfc": "cfscript",
            "cilk-c": "cilkc",
            "cilk-cpp": "cilkcpp",
            "cilk": "cilkcpp",
            "coffee": "coffeescript",
            "conc": "concurnas",
            "jinja2": "django",
            "dns-zone": "dns-zone-file",
            "dockerfile": "docker",
            "gv": "dot",
            "eta": "ejs",
            "xlsx": "excel-formula",
            "xls": "excel-formula",
            "gamemakerlanguage": "gml",
            "po": "gettext",
            "gni": "gn",
            "ld": "linker-script",
            "go-mod": "go-module",
            "hbs": "handlebars",
            "mustache": "handlebars",
            "hs": "haskell",
            "idr": "idris",
            "gitignore": "ignore",
            "hgignore": "ignore",
            "npmignore": "ignore",
            "webmanifest": "json",
            "kt": "kotlin",
            "kts": "kotlin",
            "kum": "kumir",
            "tex": "latex",
            "context": "latex",
            "ly": "lilypond",
            "emacs": "lisp",
            "elisp": "lisp",
            "emacs-lisp": "lisp",
            "md": "markdown",
            "moon": "moonscript",
            "n4jsd": "n4js",
            "nani": "naniscript",
            "objc": "objectivec",
            "qasm": "openqasm",
            "objectpascal": "pascal",
            "px": "pcaxis",
            "pcode": "peoplecode",
            "plantuml": "plant-uml",
            "pq": "powerquery",
            "mscript": "powerquery",
            "pbfasm": "purebasic",
            "purs": "purescript",
            "py": "python",
            "qs": "qsharp",
            "rkt": "racket",
            "razor": "cshtml",
            "rpy": "renpy",
            "res": "rescript",
            "robot": "robotframework",
            "rb": "ruby",
            "sh-session": "shell-session",
            "shellsession": "shell-session",
            "smlnj": "sml",
            "sol": "solidity",
            "sln": "solution-file",
            "rq": "sparql",
            "sclang": "supercollider",
            "t4": "t4-cs",
            "trickle": "tremor",
            "troy": "tremor",
            "trig": "turtle",
            "ts": "typescript",
            "tsconfig": "typoscript",
            "uscript": "unrealscript",
            "uc": "unrealscript",
            "url": "uri",
            "vb": "visual-basic",
            "vba": "visual-basic",
            "webidl": "web-idl",
            "mathematica": "wolfram",
            "nb": "wolfram",
            "wl": "wolfram",
            "xeoracube": "xeora",
            "yml": "yaml"
          }
        );
        var lang_data = {};
        var ignored_language = "none";
        var languages_path = params_default.langPath;
        var script = Prism.util.currentScript();
        if (script) {
          var autoloaderFile = /\bplugins\/autoloader\/prism-autoloader\.(?:min\.)?js(?:\?[^\r\n/]*)?$/i;
          var prismFile = /(^|\/)[\w-]+\.(?:min\.)?js(?:\?[^\r\n/]*)?$/i;
          var autoloaderPath = script.getAttribute("data-autoloader-path");
          if (autoloaderPath != null) {
            languages_path = autoloaderPath.trim().replace(/\/?$/, "/");
          } else {
            var src = script.src;
            if (autoloaderFile.test(src)) {
              languages_path = src.replace(autoloaderFile, "components/");
            } else if (prismFile.test(src)) {
              languages_path = src.replace(prismFile, "$1components/");
            }
          }
        }
        var config = Prism.plugins.autoloader = {
          languages_path,
          use_minified: true,
          loadLanguages
        };
        function addScript(src2, success, error) {
          var s = document.createElement("script");
          s.src = src2;
          s.async = true;
          s.onload = function() {
            document.body.removeChild(s);
            success && success();
          };
          s.onerror = function() {
            document.body.removeChild(s);
            error && error();
          };
          document.body.appendChild(s);
        }
        function getDependencies(element) {
          var deps = (element.getAttribute("data-dependencies") || "").trim();
          if (!deps) {
            var parent = element.parentElement;
            if (parent && parent.tagName.toLowerCase() === "pre") {
              deps = (parent.getAttribute("data-dependencies") || "").trim();
            }
          }
          return deps ? deps.split(/\s*,\s*/g) : [];
        }
        function isLoaded(lang) {
          if (lang.indexOf("!") >= 0) {
            return false;
          }
          lang = lang_aliases[lang] || lang;
          if (lang in Prism.languages) {
            return true;
          }
          var data = lang_data[lang];
          return data && !data.error && data.loading === false;
        }
        function getLanguagePath(lang) {
          return config.languages_path + "prism-" + lang + (config.use_minified ? ".min" : "") + ".js";
        }
        function loadLanguages(languages, success, error) {
          if (typeof languages === "string") {
            languages = [languages];
          }
          var total = languages.length;
          var completed = 0;
          var failed = false;
          if (total === 0) {
            if (success) {
              setTimeout(success, 0);
            }
            return;
          }
          function successCallback() {
            if (failed) {
              return;
            }
            completed++;
            if (completed === total) {
              success && success(languages);
            }
          }
          languages.forEach(function(lang) {
            loadLanguage(lang, successCallback, function() {
              if (failed) {
                return;
              }
              failed = true;
              error && error(lang);
            });
          });
        }
        function loadLanguage(lang, success, error) {
          var force = lang.indexOf("!") >= 0;
          lang = lang.replace("!", "");
          lang = lang_aliases[lang] || lang;
          function load() {
            var data = lang_data[lang];
            if (!data) {
              data = lang_data[lang] = {
                callbacks: []
              };
            }
            data.callbacks.push({
              success,
              error
            });
            if (!force && isLoaded(lang)) {
              languageCallback(lang, "success");
            } else if (!force && data.error) {
              languageCallback(lang, "error");
            } else if (force || !data.loading) {
              data.loading = true;
              data.error = false;
              addScript(getLanguagePath(lang), function() {
                data.loading = false;
                languageCallback(lang, "success");
              }, function() {
                data.loading = false;
                data.error = true;
                languageCallback(lang, "error");
              });
            }
          }
          var dependencies = lang_dependencies[lang];
          if (dependencies && dependencies.length) {
            loadLanguages(dependencies, load, error);
          } else {
            load();
          }
        }
        function languageCallback(lang, type) {
          if (lang_data[lang]) {
            var callbacks = lang_data[lang].callbacks;
            for (var i = 0, l = callbacks.length; i < l; i++) {
              var callback = callbacks[i][type];
              if (callback) {
                setTimeout(callback, 0);
              }
            }
            callbacks.length = 0;
          }
        }
        Prism.hooks.add("complete", function(env) {
          var element = env.element;
          var language = env.language;
          if (!element || !language || language === ignored_language) {
            return;
          }
          var deps = getDependencies(element);
          if (/^diff-./i.test(language)) {
            deps.push("diff");
            deps.push(language.substr("diff-".length));
          } else {
            deps.push(language);
          }
          if (!deps.every(isLoaded)) {
            loadLanguages(deps, function() {
              Prism.highlightElement(element);
            });
          }
        });
      })();
      (function() {
        if (typeof Prism === "undefined") {
          return;
        }
        var assign = Object.assign || function(obj1, obj2) {
          for (var name in obj2) {
            if (obj2.hasOwnProperty(name)) {
              obj1[name] = obj2[name];
            }
          }
          return obj1;
        };
        function NormalizeWhitespace(defaults) {
          this.defaults = assign({}, defaults);
        }
        function toCamelCase(value) {
          return value.replace(/-(\w)/g, function(match, firstChar) {
            return firstChar.toUpperCase();
          });
        }
        function tabLen(str) {
          var res = 0;
          for (var i = 0; i < str.length; ++i) {
            if (str.charCodeAt(i) == "	".charCodeAt(0)) {
              res += 3;
            }
          }
          return str.length + res;
        }
        var settingsConfig = {
          "remove-trailing": "boolean",
          "remove-indent": "boolean",
          "left-trim": "boolean",
          "right-trim": "boolean",
          "break-lines": "number",
          "indent": "number",
          "remove-initial-line-feed": "boolean",
          "tabs-to-spaces": "number",
          "spaces-to-tabs": "number"
        };
        NormalizeWhitespace.prototype = {
          setDefaults: function(defaults) {
            this.defaults = assign(this.defaults, defaults);
          },
          normalize: function(input, settings) {
            settings = assign(this.defaults, settings);
            for (var name in settings) {
              var methodName = toCamelCase(name);
              if (name !== "normalize" && methodName !== "setDefaults" && settings[name] && this[methodName]) {
                input = this[methodName].call(this, input, settings[name]);
              }
            }
            return input;
          },
          /*
           * Normalization methods
           */
          leftTrim: function(input) {
            return input.replace(/^\s+/, "");
          },
          rightTrim: function(input) {
            return input.replace(/\s+$/, "");
          },
          tabsToSpaces: function(input, spaces) {
            spaces = spaces | 0 || 4;
            return input.replace(/\t/g, new Array(++spaces).join(" "));
          },
          spacesToTabs: function(input, spaces) {
            spaces = spaces | 0 || 4;
            return input.replace(RegExp(" {" + spaces + "}", "g"), "	");
          },
          removeTrailing: function(input) {
            return input.replace(/\s*?$/gm, "");
          },
          // Support for deprecated plugin remove-initial-line-feed
          removeInitialLineFeed: function(input) {
            return input.replace(/^(?:\r?\n|\r)/, "");
          },
          removeIndent: function(input) {
            var indents = input.match(/^[^\S\n\r]*(?=\S)/gm);
            if (!indents || !indents[0].length) {
              return input;
            }
            indents.sort(function(a, b) {
              return a.length - b.length;
            });
            if (!indents[0].length) {
              return input;
            }
            return input.replace(RegExp("^" + indents[0], "gm"), "");
          },
          indent: function(input, tabs) {
            return input.replace(/^[^\S\n\r]*(?=\S)/gm, new Array(++tabs).join("	") + "$&");
          },
          breakLines: function(input, characters) {
            characters = characters === true ? 80 : characters | 0 || 80;
            var lines = input.split("\n");
            for (var i = 0; i < lines.length; ++i) {
              if (tabLen(lines[i]) <= characters) {
                continue;
              }
              var line = lines[i].split(/(\s+)/g);
              var len = 0;
              for (var j = 0; j < line.length; ++j) {
                var tl = tabLen(line[j]);
                len += tl;
                if (len > characters) {
                  line[j] = "\n" + line[j];
                  len = tl;
                }
              }
              lines[i] = line.join("");
            }
            return lines.join("\n");
          }
        };
        if (typeof module !== "undefined" && module.exports) {
          module.exports = NormalizeWhitespace;
        }
        Prism.plugins.NormalizeWhitespace = new NormalizeWhitespace({
          "remove-trailing": true,
          "remove-indent": true,
          "left-trim": true,
          "right-trim": true
          /*'break-lines': 80,
          'indent': 2,
          'remove-initial-line-feed': false,
          'tabs-to-spaces': 4,
          'spaces-to-tabs': 4*/
        });
        Prism.hooks.add("before-sanity-check", function(env) {
          var Normalizer = Prism.plugins.NormalizeWhitespace;
          if (env.settings && env.settings["whitespace-normalization"] === false) {
            return;
          }
          if (!Prism.util.isActive(env.element, "whitespace-normalization", true)) {
            return;
          }
          if ((!env.element || !env.element.parentNode) && env.code) {
            env.code = Normalizer.normalize(env.code, env.settings);
            return;
          }
          var pre = env.element.parentNode;
          if (!env.code || !pre || pre.nodeName.toLowerCase() !== "pre") {
            return;
          }
          if (env.settings == null) {
            env.settings = {};
          }
          for (var key in settingsConfig) {
            if (Object.hasOwnProperty.call(settingsConfig, key)) {
              var settingType = settingsConfig[key];
              if (pre.hasAttribute("data-" + key)) {
                try {
                  var value = JSON.parse(pre.getAttribute("data-" + key) || "true");
                  if (typeof value === settingType) {
                    env.settings[key] = value;
                  }
                } catch (_error) {
                }
              }
            }
          }
          var children = pre.childNodes;
          var before = "";
          var after = "";
          var codeFound = false;
          for (var i = 0; i < children.length; ++i) {
            var node = children[i];
            if (node == env.element) {
              codeFound = true;
            } else if (node.nodeName === "#text") {
              if (codeFound) {
                after += node.nodeValue;
              } else {
                before += node.nodeValue;
              }
              pre.removeChild(node);
              --i;
            }
          }
          if (!env.element.children.length || !Prism.plugins.KeepMarkup) {
            env.code = before + env.code + after;
            env.code = Normalizer.normalize(env.code, env.settings);
          } else {
            var html = before + env.element.innerHTML + after;
            env.element.innerHTML = Normalizer.normalize(html, env.settings);
            env.code = env.element.textContent;
          }
        });
      })();
      (function() {
        if (typeof Prism === "undefined" || typeof document === "undefined") {
          return;
        }
        var callbacks = [];
        var map = {};
        var noop = function() {
        };
        Prism.plugins.toolbar = {};
        var registerButton = Prism.plugins.toolbar.registerButton = function(key, opts) {
          var callback;
          if (typeof opts === "function") {
            callback = opts;
          } else {
            callback = function(env) {
              var element;
              if (typeof opts.onClick === "function") {
                element = document.createElement("button");
                element.type = "button";
                element.addEventListener("click", function() {
                  opts.onClick.call(this, env);
                });
              } else if (typeof opts.url === "string") {
                element = document.createElement("a");
                element.href = opts.url;
              } else {
                element = document.createElement("span");
              }
              if (opts.className) {
                element.classList.add(opts.className);
              }
              element.textContent = opts.text;
              return element;
            };
          }
          if (key in map) {
            console.warn('There is a button with the key "' + key + '" registered already.');
            return;
          }
          callbacks.push(map[key] = callback);
        };
        function getOrder(element) {
          while (element) {
            var order = element.getAttribute("data-toolbar-order");
            if (order != null) {
              order = order.trim();
              if (order.length) {
                return order.split(/\s*,\s*/g);
              } else {
                return [];
              }
            }
            element = element.parentElement;
          }
        }
        var hook = Prism.plugins.toolbar.hook = function(env) {
          var pre = env.element.parentNode;
          if (!pre || !/pre/i.test(pre.nodeName)) {
            return;
          }
          if (pre.parentNode.classList.contains("code-toolbar")) {
            return;
          }
          var wrapper = document.createElement("div");
          wrapper.classList.add("code-toolbar");
          pre.parentNode.insertBefore(wrapper, pre);
          wrapper.appendChild(pre);
          var toolbar = document.createElement("div");
          toolbar.classList.add("toolbar");
          var elementCallbacks = callbacks;
          var order = getOrder(env.element);
          if (order) {
            elementCallbacks = order.map(function(key) {
              return map[key] || noop;
            });
          }
          elementCallbacks.forEach(function(callback) {
            var element = callback(env);
            if (!element) {
              return;
            }
            var item = document.createElement("div");
            item.classList.add("toolbar-item");
            item.appendChild(element);
            toolbar.appendChild(item);
          });
          wrapper.appendChild(toolbar);
        };
        registerButton("label", function(env) {
          var pre = env.element.parentNode;
          if (!pre || !/pre/i.test(pre.nodeName)) {
            return;
          }
          if (!pre.hasAttribute("data-label")) {
            return;
          }
          var element;
          var template;
          var text = pre.getAttribute("data-label");
          try {
            template = document.querySelector("template#" + text);
          } catch (e) {
          }
          if (template) {
            element = template.content;
          } else {
            if (pre.hasAttribute("data-url")) {
              element = document.createElement("a");
              element.href = pre.getAttribute("data-url");
            } else {
              element = document.createElement("span");
            }
            element.textContent = text;
          }
          return element;
        });
        Prism.hooks.add("complete", hook);
      })();
      (function() {
        if (typeof Prism === "undefined" || typeof document === "undefined") {
          return;
        }
        if (!Prism.plugins.toolbar) {
          console.warn("Copy to Clipboard plugin loaded before Toolbar plugin.");
          return;
        }
        function registerClipboard(element, copyInfo) {
          element.addEventListener("click", function() {
            copyTextToClipboard(copyInfo);
          });
        }
        function fallbackCopyTextToClipboard(copyInfo) {
          var textArea = document.createElement("textarea");
          textArea.value = copyInfo.getText();
          textArea.style.top = "0";
          textArea.style.left = "0";
          textArea.style.position = "fixed";
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          try {
            var successful = document.execCommand("copy");
            setTimeout(function() {
              if (successful) {
                copyInfo.success();
              } else {
                copyInfo.error();
              }
            }, 1);
          } catch (err) {
            setTimeout(function() {
              copyInfo.error(err);
            }, 1);
          }
          document.body.removeChild(textArea);
        }
        function copyTextToClipboard(copyInfo) {
          if (navigator.clipboard) {
            navigator.clipboard.writeText(copyInfo.getText()).then(copyInfo.success, function() {
              fallbackCopyTextToClipboard(copyInfo);
            });
          } else {
            fallbackCopyTextToClipboard(copyInfo);
          }
        }
        function selectElementText(element) {
          window.getSelection().selectAllChildren(element);
        }
        function getSettings(startElement) {
          var settings = {
            "copy": "Copy",
            "copy-error": "Press Ctrl+C to copy",
            "copy-success": "Copied!",
            "copy-timeout": 5e3
          };
          var prefix = "data-prismjs-";
          for (var key in settings) {
            var attr = prefix + key;
            var element = startElement;
            while (element && !element.hasAttribute(attr)) {
              element = element.parentElement;
            }
            if (element) {
              settings[key] = element.getAttribute(attr);
            }
          }
          return settings;
        }
        Prism.plugins.toolbar.registerButton("copy-to-clipboard", function(env) {
          var element = env.element;
          var settings = getSettings(element);
          var linkCopy = document.createElement("button");
          linkCopy.className = "copy-to-clipboard-button";
          linkCopy.setAttribute("type", "button");
          linkCopy.setAttribute("aria-label", "copy");
          var linkSpan = document.createElement("span");
          linkCopy.appendChild(linkSpan);
          setState("copy");
          registerClipboard(linkCopy, {
            getText: function() {
              return element.textContent;
            },
            success: function() {
              setState("copy-success");
              resetText();
            },
            error: function() {
              setState("copy-error");
              setTimeout(function() {
                selectElementText(element);
              }, 1);
              resetText();
            }
          });
          return linkCopy;
          function resetText() {
            setTimeout(function() {
              setState("copy");
            }, settings["copy-timeout"]);
          }
          function setState(state) {
            linkSpan.textContent = settings[state];
            linkCopy.setAttribute("data-copy-state", state);
          }
        });
      })();
      (function() {
        if (typeof Prism === "undefined") {
          return;
        }
        Prism.languages.treeview = {
          "treeview-part": {
            pattern: /^.+/m,
            inside: {
              "entry-line": [
                {
                  pattern: /\|-- |├── /,
                  alias: "line-h"
                },
                {
                  pattern: /\| {3}|│ {3}/,
                  alias: "line-v"
                },
                {
                  pattern: /`-- |└── /,
                  alias: "line-v-last"
                },
                {
                  pattern: / {4}/,
                  alias: "line-v-gap"
                }
              ],
              "entry-name": {
                pattern: /.*\S.*/,
                inside: {
                  // symlink
                  "operator": / -> /
                }
              }
            }
          }
        };
        Prism.hooks.add("wrap", function(env) {
          if (env.language === "treeview" && env.type === "entry-name") {
            var classes = env.classes;
            var folderPattern = /(^|[^\\])\/\s*$/;
            if (folderPattern.test(env.content)) {
              env.content = env.content.replace(folderPattern, "$1");
              classes.push("dir");
            } else {
              env.content = env.content.replace(/(^|[^\\])[=*|]\s*$/, "$1");
              var parts = env.content.toLowerCase().replace(/\s+/g, "").split(".");
              while (parts.length > 1) {
                parts.shift();
                classes.push("ext-" + parts.join("-"));
              }
            }
            if (env.content[0] === ".") {
              classes.push("dotfile");
            }
          }
        });
      })();
    }
  });
  require_stdin();
})();
/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 *
 * @license MIT <https://opensource.org/licenses/MIT>
 * @author Lea Verou <https://lea.verou.me>
 * @namespace
 * @public
 */
