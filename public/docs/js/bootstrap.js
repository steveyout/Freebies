(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // ns-hugo:C:\Users\steveyout\AppData\Local\hugo_cache\modules\filecache\modules\pkg\mod\github.com\gohugoio\hugo-mod-jslibs-dist\popperjs\v2@v2.21100.20000\package\dist\cjs\popper.js
  var require_popper = __commonJS({
    "ns-hugo:C:\\Users\\steveyout\\AppData\\Local\\hugo_cache\\modules\\filecache\\modules\\pkg\\mod\\github.com\\gohugoio\\hugo-mod-jslibs-dist\\popperjs\\v2@v2.21100.20000\\package\\dist\\cjs\\popper.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      function getWindow(node) {
        if (node == null) {
          return window;
        }
        if (node.toString() !== "[object Window]") {
          var ownerDocument = node.ownerDocument;
          return ownerDocument ? ownerDocument.defaultView || window : window;
        }
        return node;
      }
      function isElement2(node) {
        var OwnElement = getWindow(node).Element;
        return node instanceof OwnElement || node instanceof Element;
      }
      function isHTMLElement(node) {
        var OwnElement = getWindow(node).HTMLElement;
        return node instanceof OwnElement || node instanceof HTMLElement;
      }
      function isShadowRoot(node) {
        if (typeof ShadowRoot === "undefined") {
          return false;
        }
        var OwnElement = getWindow(node).ShadowRoot;
        return node instanceof OwnElement || node instanceof ShadowRoot;
      }
      var max = Math.max;
      var min = Math.min;
      var round = Math.round;
      function getBoundingClientRect(element, includeScale) {
        if (includeScale === void 0) {
          includeScale = false;
        }
        var rect = element.getBoundingClientRect();
        var scaleX = 1;
        var scaleY = 1;
        if (isHTMLElement(element) && includeScale) {
          var offsetHeight = element.offsetHeight;
          var offsetWidth = element.offsetWidth;
          if (offsetWidth > 0) {
            scaleX = round(rect.width) / offsetWidth || 1;
          }
          if (offsetHeight > 0) {
            scaleY = round(rect.height) / offsetHeight || 1;
          }
        }
        return {
          width: rect.width / scaleX,
          height: rect.height / scaleY,
          top: rect.top / scaleY,
          right: rect.right / scaleX,
          bottom: rect.bottom / scaleY,
          left: rect.left / scaleX,
          x: rect.left / scaleX,
          y: rect.top / scaleY
        };
      }
      function getWindowScroll(node) {
        var win = getWindow(node);
        var scrollLeft = win.pageXOffset;
        var scrollTop = win.pageYOffset;
        return {
          scrollLeft,
          scrollTop
        };
      }
      function getHTMLElementScroll(element) {
        return {
          scrollLeft: element.scrollLeft,
          scrollTop: element.scrollTop
        };
      }
      function getNodeScroll(node) {
        if (node === getWindow(node) || !isHTMLElement(node)) {
          return getWindowScroll(node);
        } else {
          return getHTMLElementScroll(node);
        }
      }
      function getNodeName(element) {
        return element ? (element.nodeName || "").toLowerCase() : null;
      }
      function getDocumentElement(element) {
        return ((isElement2(element) ? element.ownerDocument : (
          // $FlowFixMe[prop-missing]
          element.document
        )) || window.document).documentElement;
      }
      function getWindowScrollBarX(element) {
        return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
      }
      function getComputedStyle2(element) {
        return getWindow(element).getComputedStyle(element);
      }
      function isScrollParent(element) {
        var _getComputedStyle = getComputedStyle2(element), overflow = _getComputedStyle.overflow, overflowX = _getComputedStyle.overflowX, overflowY = _getComputedStyle.overflowY;
        return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
      }
      function isElementScaled(element) {
        var rect = element.getBoundingClientRect();
        var scaleX = round(rect.width) / element.offsetWidth || 1;
        var scaleY = round(rect.height) / element.offsetHeight || 1;
        return scaleX !== 1 || scaleY !== 1;
      }
      function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
        if (isFixed === void 0) {
          isFixed = false;
        }
        var isOffsetParentAnElement = isHTMLElement(offsetParent);
        var offsetParentIsScaled = isHTMLElement(offsetParent) && isElementScaled(offsetParent);
        var documentElement = getDocumentElement(offsetParent);
        var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled);
        var scroll = {
          scrollLeft: 0,
          scrollTop: 0
        };
        var offsets = {
          x: 0,
          y: 0
        };
        if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
          if (getNodeName(offsetParent) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
          isScrollParent(documentElement)) {
            scroll = getNodeScroll(offsetParent);
          }
          if (isHTMLElement(offsetParent)) {
            offsets = getBoundingClientRect(offsetParent, true);
            offsets.x += offsetParent.clientLeft;
            offsets.y += offsetParent.clientTop;
          } else if (documentElement) {
            offsets.x = getWindowScrollBarX(documentElement);
          }
        }
        return {
          x: rect.left + scroll.scrollLeft - offsets.x,
          y: rect.top + scroll.scrollTop - offsets.y,
          width: rect.width,
          height: rect.height
        };
      }
      function getLayoutRect(element) {
        var clientRect = getBoundingClientRect(element);
        var width = element.offsetWidth;
        var height = element.offsetHeight;
        if (Math.abs(clientRect.width - width) <= 1) {
          width = clientRect.width;
        }
        if (Math.abs(clientRect.height - height) <= 1) {
          height = clientRect.height;
        }
        return {
          x: element.offsetLeft,
          y: element.offsetTop,
          width,
          height
        };
      }
      function getParentNode(element) {
        if (getNodeName(element) === "html") {
          return element;
        }
        return (
          // this is a quicker (but less type safe) way to save quite some bytes from the bundle
          // $FlowFixMe[incompatible-return]
          // $FlowFixMe[prop-missing]
          element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
          element.parentNode || // DOM Element detected
          (isShadowRoot(element) ? element.host : null) || // ShadowRoot detected
          // $FlowFixMe[incompatible-call]: HTMLElement is a Node
          getDocumentElement(element)
        );
      }
      function getScrollParent(node) {
        if (["html", "body", "#document"].indexOf(getNodeName(node)) >= 0) {
          return node.ownerDocument.body;
        }
        if (isHTMLElement(node) && isScrollParent(node)) {
          return node;
        }
        return getScrollParent(getParentNode(node));
      }
      function listScrollParents(element, list) {
        var _element$ownerDocumen;
        if (list === void 0) {
          list = [];
        }
        var scrollParent = getScrollParent(element);
        var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
        var win = getWindow(scrollParent);
        var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
        var updatedList = list.concat(target);
        return isBody ? updatedList : (
          // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
          updatedList.concat(listScrollParents(getParentNode(target)))
        );
      }
      function isTableElement(element) {
        return ["table", "td", "th"].indexOf(getNodeName(element)) >= 0;
      }
      function getTrueOffsetParent(element) {
        if (!isHTMLElement(element) || // https://github.com/popperjs/popper-core/issues/837
        getComputedStyle2(element).position === "fixed") {
          return null;
        }
        return element.offsetParent;
      }
      function getContainingBlock(element) {
        var isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") !== -1;
        var isIE = navigator.userAgent.indexOf("Trident") !== -1;
        if (isIE && isHTMLElement(element)) {
          var elementCss = getComputedStyle2(element);
          if (elementCss.position === "fixed") {
            return null;
          }
        }
        var currentNode = getParentNode(element);
        while (isHTMLElement(currentNode) && ["html", "body"].indexOf(getNodeName(currentNode)) < 0) {
          var css = getComputedStyle2(currentNode);
          if (css.transform !== "none" || css.perspective !== "none" || css.contain === "paint" || ["transform", "perspective"].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === "filter" || isFirefox && css.filter && css.filter !== "none") {
            return currentNode;
          } else {
            currentNode = currentNode.parentNode;
          }
        }
        return null;
      }
      function getOffsetParent(element) {
        var window2 = getWindow(element);
        var offsetParent = getTrueOffsetParent(element);
        while (offsetParent && isTableElement(offsetParent) && getComputedStyle2(offsetParent).position === "static") {
          offsetParent = getTrueOffsetParent(offsetParent);
        }
        if (offsetParent && (getNodeName(offsetParent) === "html" || getNodeName(offsetParent) === "body" && getComputedStyle2(offsetParent).position === "static")) {
          return window2;
        }
        return offsetParent || getContainingBlock(element) || window2;
      }
      var top = "top";
      var bottom = "bottom";
      var right = "right";
      var left = "left";
      var auto = "auto";
      var basePlacements = [top, bottom, right, left];
      var start = "start";
      var end = "end";
      var clippingParents = "clippingParents";
      var viewport = "viewport";
      var popper = "popper";
      var reference = "reference";
      var variationPlacements = /* @__PURE__ */ basePlacements.reduce(function(acc, placement) {
        return acc.concat([placement + "-" + start, placement + "-" + end]);
      }, []);
      var placements = /* @__PURE__ */ [].concat(basePlacements, [auto]).reduce(function(acc, placement) {
        return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
      }, []);
      var beforeRead = "beforeRead";
      var read = "read";
      var afterRead = "afterRead";
      var beforeMain = "beforeMain";
      var main = "main";
      var afterMain = "afterMain";
      var beforeWrite = "beforeWrite";
      var write = "write";
      var afterWrite = "afterWrite";
      var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];
      function order(modifiers) {
        var map = /* @__PURE__ */ new Map();
        var visited = /* @__PURE__ */ new Set();
        var result = [];
        modifiers.forEach(function(modifier) {
          map.set(modifier.name, modifier);
        });
        function sort(modifier) {
          visited.add(modifier.name);
          var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
          requires.forEach(function(dep) {
            if (!visited.has(dep)) {
              var depModifier = map.get(dep);
              if (depModifier) {
                sort(depModifier);
              }
            }
          });
          result.push(modifier);
        }
        modifiers.forEach(function(modifier) {
          if (!visited.has(modifier.name)) {
            sort(modifier);
          }
        });
        return result;
      }
      function orderModifiers(modifiers) {
        var orderedModifiers = order(modifiers);
        return modifierPhases.reduce(function(acc, phase) {
          return acc.concat(orderedModifiers.filter(function(modifier) {
            return modifier.phase === phase;
          }));
        }, []);
      }
      function debounce(fn) {
        var pending;
        return function() {
          if (!pending) {
            pending = new Promise(function(resolve) {
              Promise.resolve().then(function() {
                pending = void 0;
                resolve(fn());
              });
            });
          }
          return pending;
        };
      }
      function format(str) {
        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }
        return [].concat(args).reduce(function(p, c) {
          return p.replace(/%s/, c);
        }, str);
      }
      var INVALID_MODIFIER_ERROR = 'Popper: modifier "%s" provided an invalid %s property, expected %s but got %s';
      var MISSING_DEPENDENCY_ERROR = 'Popper: modifier "%s" requires "%s", but "%s" modifier is not available';
      var VALID_PROPERTIES = ["name", "enabled", "phase", "fn", "effect", "requires", "options"];
      function validateModifiers(modifiers) {
        modifiers.forEach(function(modifier) {
          [].concat(Object.keys(modifier), VALID_PROPERTIES).filter(function(value, index, self) {
            return self.indexOf(value) === index;
          }).forEach(function(key) {
            switch (key) {
              case "name":
                if (typeof modifier.name !== "string") {
                  console.error(format(INVALID_MODIFIER_ERROR, String(modifier.name), '"name"', '"string"', '"' + String(modifier.name) + '"'));
                }
                break;
              case "enabled":
                if (typeof modifier.enabled !== "boolean") {
                  console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"enabled"', '"boolean"', '"' + String(modifier.enabled) + '"'));
                }
                break;
              case "phase":
                if (modifierPhases.indexOf(modifier.phase) < 0) {
                  console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"phase"', "either " + modifierPhases.join(", "), '"' + String(modifier.phase) + '"'));
                }
                break;
              case "fn":
                if (typeof modifier.fn !== "function") {
                  console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"fn"', '"function"', '"' + String(modifier.fn) + '"'));
                }
                break;
              case "effect":
                if (modifier.effect != null && typeof modifier.effect !== "function") {
                  console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"effect"', '"function"', '"' + String(modifier.fn) + '"'));
                }
                break;
              case "requires":
                if (modifier.requires != null && !Array.isArray(modifier.requires)) {
                  console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"requires"', '"array"', '"' + String(modifier.requires) + '"'));
                }
                break;
              case "requiresIfExists":
                if (!Array.isArray(modifier.requiresIfExists)) {
                  console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"requiresIfExists"', '"array"', '"' + String(modifier.requiresIfExists) + '"'));
                }
                break;
              case "options":
              case "data":
                break;
              default:
                console.error('PopperJS: an invalid property has been provided to the "' + modifier.name + '" modifier, valid properties are ' + VALID_PROPERTIES.map(function(s) {
                  return '"' + s + '"';
                }).join(", ") + '; but "' + key + '" was provided.');
            }
            modifier.requires && modifier.requires.forEach(function(requirement) {
              if (modifiers.find(function(mod) {
                return mod.name === requirement;
              }) == null) {
                console.error(format(MISSING_DEPENDENCY_ERROR, String(modifier.name), requirement, requirement));
              }
            });
          });
        });
      }
      function uniqueBy(arr, fn) {
        var identifiers = /* @__PURE__ */ new Set();
        return arr.filter(function(item) {
          var identifier = fn(item);
          if (!identifiers.has(identifier)) {
            identifiers.add(identifier);
            return true;
          }
        });
      }
      function getBasePlacement(placement) {
        return placement.split("-")[0];
      }
      function mergeByName(modifiers) {
        var merged = modifiers.reduce(function(merged2, current) {
          var existing = merged2[current.name];
          merged2[current.name] = existing ? Object.assign({}, existing, current, {
            options: Object.assign({}, existing.options, current.options),
            data: Object.assign({}, existing.data, current.data)
          }) : current;
          return merged2;
        }, {});
        return Object.keys(merged).map(function(key) {
          return merged[key];
        });
      }
      function getViewportRect(element) {
        var win = getWindow(element);
        var html = getDocumentElement(element);
        var visualViewport = win.visualViewport;
        var width = html.clientWidth;
        var height = html.clientHeight;
        var x = 0;
        var y = 0;
        if (visualViewport) {
          width = visualViewport.width;
          height = visualViewport.height;
          if (!/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
            x = visualViewport.offsetLeft;
            y = visualViewport.offsetTop;
          }
        }
        return {
          width,
          height,
          x: x + getWindowScrollBarX(element),
          y
        };
      }
      function getDocumentRect(element) {
        var _element$ownerDocumen;
        var html = getDocumentElement(element);
        var winScroll = getWindowScroll(element);
        var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
        var width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
        var height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
        var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
        var y = -winScroll.scrollTop;
        if (getComputedStyle2(body || html).direction === "rtl") {
          x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
        }
        return {
          width,
          height,
          x,
          y
        };
      }
      function contains(parent, child) {
        var rootNode = child.getRootNode && child.getRootNode();
        if (parent.contains(child)) {
          return true;
        } else if (rootNode && isShadowRoot(rootNode)) {
          var next = child;
          do {
            if (next && parent.isSameNode(next)) {
              return true;
            }
            next = next.parentNode || next.host;
          } while (next);
        }
        return false;
      }
      function rectToClientRect(rect) {
        return Object.assign({}, rect, {
          left: rect.x,
          top: rect.y,
          right: rect.x + rect.width,
          bottom: rect.y + rect.height
        });
      }
      function getInnerBoundingClientRect(element) {
        var rect = getBoundingClientRect(element);
        rect.top = rect.top + element.clientTop;
        rect.left = rect.left + element.clientLeft;
        rect.bottom = rect.top + element.clientHeight;
        rect.right = rect.left + element.clientWidth;
        rect.width = element.clientWidth;
        rect.height = element.clientHeight;
        rect.x = rect.left;
        rect.y = rect.top;
        return rect;
      }
      function getClientRectFromMixedType(element, clippingParent) {
        return clippingParent === viewport ? rectToClientRect(getViewportRect(element)) : isElement2(clippingParent) ? getInnerBoundingClientRect(clippingParent) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
      }
      function getClippingParents(element) {
        var clippingParents2 = listScrollParents(getParentNode(element));
        var canEscapeClipping = ["absolute", "fixed"].indexOf(getComputedStyle2(element).position) >= 0;
        var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;
        if (!isElement2(clipperElement)) {
          return [];
        }
        return clippingParents2.filter(function(clippingParent) {
          return isElement2(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== "body" && (canEscapeClipping ? getComputedStyle2(clippingParent).position !== "static" : true);
        });
      }
      function getClippingRect(element, boundary, rootBoundary) {
        var mainClippingParents = boundary === "clippingParents" ? getClippingParents(element) : [].concat(boundary);
        var clippingParents2 = [].concat(mainClippingParents, [rootBoundary]);
        var firstClippingParent = clippingParents2[0];
        var clippingRect = clippingParents2.reduce(function(accRect, clippingParent) {
          var rect = getClientRectFromMixedType(element, clippingParent);
          accRect.top = max(rect.top, accRect.top);
          accRect.right = min(rect.right, accRect.right);
          accRect.bottom = min(rect.bottom, accRect.bottom);
          accRect.left = max(rect.left, accRect.left);
          return accRect;
        }, getClientRectFromMixedType(element, firstClippingParent));
        clippingRect.width = clippingRect.right - clippingRect.left;
        clippingRect.height = clippingRect.bottom - clippingRect.top;
        clippingRect.x = clippingRect.left;
        clippingRect.y = clippingRect.top;
        return clippingRect;
      }
      function getVariation(placement) {
        return placement.split("-")[1];
      }
      function getMainAxisFromPlacement(placement) {
        return ["top", "bottom"].indexOf(placement) >= 0 ? "x" : "y";
      }
      function computeOffsets(_ref) {
        var reference2 = _ref.reference, element = _ref.element, placement = _ref.placement;
        var basePlacement = placement ? getBasePlacement(placement) : null;
        var variation = placement ? getVariation(placement) : null;
        var commonX = reference2.x + reference2.width / 2 - element.width / 2;
        var commonY = reference2.y + reference2.height / 2 - element.height / 2;
        var offsets;
        switch (basePlacement) {
          case top:
            offsets = {
              x: commonX,
              y: reference2.y - element.height
            };
            break;
          case bottom:
            offsets = {
              x: commonX,
              y: reference2.y + reference2.height
            };
            break;
          case right:
            offsets = {
              x: reference2.x + reference2.width,
              y: commonY
            };
            break;
          case left:
            offsets = {
              x: reference2.x - element.width,
              y: commonY
            };
            break;
          default:
            offsets = {
              x: reference2.x,
              y: reference2.y
            };
        }
        var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;
        if (mainAxis != null) {
          var len = mainAxis === "y" ? "height" : "width";
          switch (variation) {
            case start:
              offsets[mainAxis] = offsets[mainAxis] - (reference2[len] / 2 - element[len] / 2);
              break;
            case end:
              offsets[mainAxis] = offsets[mainAxis] + (reference2[len] / 2 - element[len] / 2);
              break;
          }
        }
        return offsets;
      }
      function getFreshSideObject() {
        return {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        };
      }
      function mergePaddingObject(paddingObject) {
        return Object.assign({}, getFreshSideObject(), paddingObject);
      }
      function expandToHashMap(value, keys) {
        return keys.reduce(function(hashMap, key) {
          hashMap[key] = value;
          return hashMap;
        }, {});
      }
      function detectOverflow(state, options) {
        if (options === void 0) {
          options = {};
        }
        var _options = options, _options$placement = _options.placement, placement = _options$placement === void 0 ? state.placement : _options$placement, _options$boundary = _options.boundary, boundary = _options$boundary === void 0 ? clippingParents : _options$boundary, _options$rootBoundary = _options.rootBoundary, rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary, _options$elementConte = _options.elementContext, elementContext = _options$elementConte === void 0 ? popper : _options$elementConte, _options$altBoundary = _options.altBoundary, altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary, _options$padding = _options.padding, padding = _options$padding === void 0 ? 0 : _options$padding;
        var paddingObject = mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
        var altContext = elementContext === popper ? reference : popper;
        var popperRect = state.rects.popper;
        var element = state.elements[altBoundary ? altContext : elementContext];
        var clippingClientRect = getClippingRect(isElement2(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary);
        var referenceClientRect = getBoundingClientRect(state.elements.reference);
        var popperOffsets2 = computeOffsets({
          reference: referenceClientRect,
          element: popperRect,
          strategy: "absolute",
          placement
        });
        var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets2));
        var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect;
        var overflowOffsets = {
          top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
          bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
          left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
          right: elementClientRect.right - clippingClientRect.right + paddingObject.right
        };
        var offsetData = state.modifiersData.offset;
        if (elementContext === popper && offsetData) {
          var offset2 = offsetData[placement];
          Object.keys(overflowOffsets).forEach(function(key) {
            var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
            var axis = [top, bottom].indexOf(key) >= 0 ? "y" : "x";
            overflowOffsets[key] += offset2[axis] * multiply;
          });
        }
        return overflowOffsets;
      }
      var INVALID_ELEMENT_ERROR = "Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.";
      var INFINITE_LOOP_ERROR = "Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.";
      var DEFAULT_OPTIONS = {
        placement: "bottom",
        modifiers: [],
        strategy: "absolute"
      };
      function areValidElements() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        return !args.some(function(element) {
          return !(element && typeof element.getBoundingClientRect === "function");
        });
      }
      function popperGenerator(generatorOptions) {
        if (generatorOptions === void 0) {
          generatorOptions = {};
        }
        var _generatorOptions = generatorOptions, _generatorOptions$def = _generatorOptions.defaultModifiers, defaultModifiers2 = _generatorOptions$def === void 0 ? [] : _generatorOptions$def, _generatorOptions$def2 = _generatorOptions.defaultOptions, defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
        return function createPopper4(reference2, popper2, options) {
          if (options === void 0) {
            options = defaultOptions;
          }
          var state = {
            placement: "bottom",
            orderedModifiers: [],
            options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
            modifiersData: {},
            elements: {
              reference: reference2,
              popper: popper2
            },
            attributes: {},
            styles: {}
          };
          var effectCleanupFns = [];
          var isDestroyed = false;
          var instance = {
            state,
            setOptions: function setOptions(setOptionsAction) {
              var options2 = typeof setOptionsAction === "function" ? setOptionsAction(state.options) : setOptionsAction;
              cleanupModifierEffects();
              state.options = Object.assign({}, defaultOptions, state.options, options2);
              state.scrollParents = {
                reference: isElement2(reference2) ? listScrollParents(reference2) : reference2.contextElement ? listScrollParents(reference2.contextElement) : [],
                popper: listScrollParents(popper2)
              };
              var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers2, state.options.modifiers)));
              state.orderedModifiers = orderedModifiers.filter(function(m) {
                return m.enabled;
              });
              if (true) {
                var modifiers = uniqueBy([].concat(orderedModifiers, state.options.modifiers), function(_ref) {
                  var name = _ref.name;
                  return name;
                });
                validateModifiers(modifiers);
                if (getBasePlacement(state.options.placement) === auto) {
                  var flipModifier = state.orderedModifiers.find(function(_ref2) {
                    var name = _ref2.name;
                    return name === "flip";
                  });
                  if (!flipModifier) {
                    console.error(['Popper: "auto" placements require the "flip" modifier be', "present and enabled to work."].join(" "));
                  }
                }
                var _getComputedStyle = getComputedStyle2(popper2), marginTop = _getComputedStyle.marginTop, marginRight = _getComputedStyle.marginRight, marginBottom = _getComputedStyle.marginBottom, marginLeft = _getComputedStyle.marginLeft;
                if ([marginTop, marginRight, marginBottom, marginLeft].some(function(margin) {
                  return parseFloat(margin);
                })) {
                  console.warn(['Popper: CSS "margin" styles cannot be used to apply padding', "between the popper and its reference element or boundary.", "To replicate margin, use the `offset` modifier, as well as", "the `padding` option in the `preventOverflow` and `flip`", "modifiers."].join(" "));
                }
              }
              runModifierEffects();
              return instance.update();
            },
            // Sync update – it will always be executed, even if not necessary. This
            // is useful for low frequency updates where sync behavior simplifies the
            // logic.
            // For high frequency updates (e.g. `resize` and `scroll` events), always
            // prefer the async Popper#update method
            forceUpdate: function forceUpdate() {
              if (isDestroyed) {
                return;
              }
              var _state$elements = state.elements, reference3 = _state$elements.reference, popper3 = _state$elements.popper;
              if (!areValidElements(reference3, popper3)) {
                if (true) {
                  console.error(INVALID_ELEMENT_ERROR);
                }
                return;
              }
              state.rects = {
                reference: getCompositeRect(reference3, getOffsetParent(popper3), state.options.strategy === "fixed"),
                popper: getLayoutRect(popper3)
              };
              state.reset = false;
              state.placement = state.options.placement;
              state.orderedModifiers.forEach(function(modifier) {
                return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
              });
              var __debug_loops__ = 0;
              for (var index = 0; index < state.orderedModifiers.length; index++) {
                if (true) {
                  __debug_loops__ += 1;
                  if (__debug_loops__ > 100) {
                    console.error(INFINITE_LOOP_ERROR);
                    break;
                  }
                }
                if (state.reset === true) {
                  state.reset = false;
                  index = -1;
                  continue;
                }
                var _state$orderedModifie = state.orderedModifiers[index], fn = _state$orderedModifie.fn, _state$orderedModifie2 = _state$orderedModifie.options, _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2, name = _state$orderedModifie.name;
                if (typeof fn === "function") {
                  state = fn({
                    state,
                    options: _options,
                    name,
                    instance
                  }) || state;
                }
              }
            },
            // Async and optimistically optimized update – it will not be executed if
            // not necessary (debounced to run at most once-per-tick)
            update: debounce(function() {
              return new Promise(function(resolve) {
                instance.forceUpdate();
                resolve(state);
              });
            }),
            destroy: function destroy() {
              cleanupModifierEffects();
              isDestroyed = true;
            }
          };
          if (!areValidElements(reference2, popper2)) {
            if (true) {
              console.error(INVALID_ELEMENT_ERROR);
            }
            return instance;
          }
          instance.setOptions(options).then(function(state2) {
            if (!isDestroyed && options.onFirstUpdate) {
              options.onFirstUpdate(state2);
            }
          });
          function runModifierEffects() {
            state.orderedModifiers.forEach(function(_ref3) {
              var name = _ref3.name, _ref3$options = _ref3.options, options2 = _ref3$options === void 0 ? {} : _ref3$options, effect2 = _ref3.effect;
              if (typeof effect2 === "function") {
                var cleanupFn = effect2({
                  state,
                  name,
                  instance,
                  options: options2
                });
                var noopFn = function noopFn2() {
                };
                effectCleanupFns.push(cleanupFn || noopFn);
              }
            });
          }
          function cleanupModifierEffects() {
            effectCleanupFns.forEach(function(fn) {
              return fn();
            });
            effectCleanupFns = [];
          }
          return instance;
        };
      }
      var passive = {
        passive: true
      };
      function effect$2(_ref) {
        var state = _ref.state, instance = _ref.instance, options = _ref.options;
        var _options$scroll = options.scroll, scroll = _options$scroll === void 0 ? true : _options$scroll, _options$resize = options.resize, resize = _options$resize === void 0 ? true : _options$resize;
        var window2 = getWindow(state.elements.popper);
        var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);
        if (scroll) {
          scrollParents.forEach(function(scrollParent) {
            scrollParent.addEventListener("scroll", instance.update, passive);
          });
        }
        if (resize) {
          window2.addEventListener("resize", instance.update, passive);
        }
        return function() {
          if (scroll) {
            scrollParents.forEach(function(scrollParent) {
              scrollParent.removeEventListener("scroll", instance.update, passive);
            });
          }
          if (resize) {
            window2.removeEventListener("resize", instance.update, passive);
          }
        };
      }
      var eventListeners = {
        name: "eventListeners",
        enabled: true,
        phase: "write",
        fn: function fn() {
        },
        effect: effect$2,
        data: {}
      };
      function popperOffsets(_ref) {
        var state = _ref.state, name = _ref.name;
        state.modifiersData[name] = computeOffsets({
          reference: state.rects.reference,
          element: state.rects.popper,
          strategy: "absolute",
          placement: state.placement
        });
      }
      var popperOffsets$1 = {
        name: "popperOffsets",
        enabled: true,
        phase: "read",
        fn: popperOffsets,
        data: {}
      };
      var unsetSides = {
        top: "auto",
        right: "auto",
        bottom: "auto",
        left: "auto"
      };
      function roundOffsetsByDPR(_ref) {
        var x = _ref.x, y = _ref.y;
        var win = window;
        var dpr = win.devicePixelRatio || 1;
        return {
          x: round(x * dpr) / dpr || 0,
          y: round(y * dpr) / dpr || 0
        };
      }
      function mapToStyles(_ref2) {
        var _Object$assign2;
        var popper2 = _ref2.popper, popperRect = _ref2.popperRect, placement = _ref2.placement, variation = _ref2.variation, offsets = _ref2.offsets, position = _ref2.position, gpuAcceleration = _ref2.gpuAcceleration, adaptive = _ref2.adaptive, roundOffsets = _ref2.roundOffsets, isFixed = _ref2.isFixed;
        var _ref3 = roundOffsets === true ? roundOffsetsByDPR(offsets) : typeof roundOffsets === "function" ? roundOffsets(offsets) : offsets, _ref3$x = _ref3.x, x = _ref3$x === void 0 ? 0 : _ref3$x, _ref3$y = _ref3.y, y = _ref3$y === void 0 ? 0 : _ref3$y;
        var hasX = offsets.hasOwnProperty("x");
        var hasY = offsets.hasOwnProperty("y");
        var sideX = left;
        var sideY = top;
        var win = window;
        if (adaptive) {
          var offsetParent = getOffsetParent(popper2);
          var heightProp = "clientHeight";
          var widthProp = "clientWidth";
          if (offsetParent === getWindow(popper2)) {
            offsetParent = getDocumentElement(popper2);
            if (getComputedStyle2(offsetParent).position !== "static" && position === "absolute") {
              heightProp = "scrollHeight";
              widthProp = "scrollWidth";
            }
          }
          offsetParent = offsetParent;
          if (placement === top || (placement === left || placement === right) && variation === end) {
            sideY = bottom;
            var offsetY = isFixed && win.visualViewport ? win.visualViewport.height : (
              // $FlowFixMe[prop-missing]
              offsetParent[heightProp]
            );
            y -= offsetY - popperRect.height;
            y *= gpuAcceleration ? 1 : -1;
          }
          if (placement === left || (placement === top || placement === bottom) && variation === end) {
            sideX = right;
            var offsetX = isFixed && win.visualViewport ? win.visualViewport.width : (
              // $FlowFixMe[prop-missing]
              offsetParent[widthProp]
            );
            x -= offsetX - popperRect.width;
            x *= gpuAcceleration ? 1 : -1;
          }
        }
        var commonStyles = Object.assign({
          position
        }, adaptive && unsetSides);
        if (gpuAcceleration) {
          var _Object$assign;
          return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? "0" : "", _Object$assign[sideX] = hasX ? "0" : "", _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
        }
        return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : "", _Object$assign2[sideX] = hasX ? x + "px" : "", _Object$assign2.transform = "", _Object$assign2));
      }
      function computeStyles(_ref4) {
        var state = _ref4.state, options = _ref4.options;
        var _options$gpuAccelerat = options.gpuAcceleration, gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat, _options$adaptive = options.adaptive, adaptive = _options$adaptive === void 0 ? true : _options$adaptive, _options$roundOffsets = options.roundOffsets, roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
        if (true) {
          var transitionProperty = getComputedStyle2(state.elements.popper).transitionProperty || "";
          if (adaptive && ["transform", "top", "right", "bottom", "left"].some(function(property) {
            return transitionProperty.indexOf(property) >= 0;
          })) {
            console.warn(["Popper: Detected CSS transitions on at least one of the following", 'CSS properties: "transform", "top", "right", "bottom", "left".', "\n\n", 'Disable the "computeStyles" modifier\'s `adaptive` option to allow', "for smooth transitions, or remove these properties from the CSS", "transition declaration on the popper element if only transitioning", "opacity or background-color for example.", "\n\n", "We recommend using the popper element as a wrapper around an inner", "element that can have any CSS property transitioned for animations."].join(" "));
          }
        }
        var commonStyles = {
          placement: getBasePlacement(state.placement),
          variation: getVariation(state.placement),
          popper: state.elements.popper,
          popperRect: state.rects.popper,
          gpuAcceleration,
          isFixed: state.options.strategy === "fixed"
        };
        if (state.modifiersData.popperOffsets != null) {
          state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
            offsets: state.modifiersData.popperOffsets,
            position: state.options.strategy,
            adaptive,
            roundOffsets
          })));
        }
        if (state.modifiersData.arrow != null) {
          state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
            offsets: state.modifiersData.arrow,
            position: "absolute",
            adaptive: false,
            roundOffsets
          })));
        }
        state.attributes.popper = Object.assign({}, state.attributes.popper, {
          "data-popper-placement": state.placement
        });
      }
      var computeStyles$1 = {
        name: "computeStyles",
        enabled: true,
        phase: "beforeWrite",
        fn: computeStyles,
        data: {}
      };
      function applyStyles(_ref) {
        var state = _ref.state;
        Object.keys(state.elements).forEach(function(name) {
          var style = state.styles[name] || {};
          var attributes = state.attributes[name] || {};
          var element = state.elements[name];
          if (!isHTMLElement(element) || !getNodeName(element)) {
            return;
          }
          Object.assign(element.style, style);
          Object.keys(attributes).forEach(function(name2) {
            var value = attributes[name2];
            if (value === false) {
              element.removeAttribute(name2);
            } else {
              element.setAttribute(name2, value === true ? "" : value);
            }
          });
        });
      }
      function effect$1(_ref2) {
        var state = _ref2.state;
        var initialStyles = {
          popper: {
            position: state.options.strategy,
            left: "0",
            top: "0",
            margin: "0"
          },
          arrow: {
            position: "absolute"
          },
          reference: {}
        };
        Object.assign(state.elements.popper.style, initialStyles.popper);
        state.styles = initialStyles;
        if (state.elements.arrow) {
          Object.assign(state.elements.arrow.style, initialStyles.arrow);
        }
        return function() {
          Object.keys(state.elements).forEach(function(name) {
            var element = state.elements[name];
            var attributes = state.attributes[name] || {};
            var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]);
            var style = styleProperties.reduce(function(style2, property) {
              style2[property] = "";
              return style2;
            }, {});
            if (!isHTMLElement(element) || !getNodeName(element)) {
              return;
            }
            Object.assign(element.style, style);
            Object.keys(attributes).forEach(function(attribute) {
              element.removeAttribute(attribute);
            });
          });
        };
      }
      var applyStyles$1 = {
        name: "applyStyles",
        enabled: true,
        phase: "write",
        fn: applyStyles,
        effect: effect$1,
        requires: ["computeStyles"]
      };
      function distanceAndSkiddingToXY(placement, rects, offset2) {
        var basePlacement = getBasePlacement(placement);
        var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;
        var _ref = typeof offset2 === "function" ? offset2(Object.assign({}, rects, {
          placement
        })) : offset2, skidding = _ref[0], distance = _ref[1];
        skidding = skidding || 0;
        distance = (distance || 0) * invertDistance;
        return [left, right].indexOf(basePlacement) >= 0 ? {
          x: distance,
          y: skidding
        } : {
          x: skidding,
          y: distance
        };
      }
      function offset(_ref2) {
        var state = _ref2.state, options = _ref2.options, name = _ref2.name;
        var _options$offset = options.offset, offset2 = _options$offset === void 0 ? [0, 0] : _options$offset;
        var data = placements.reduce(function(acc, placement) {
          acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset2);
          return acc;
        }, {});
        var _data$state$placement = data[state.placement], x = _data$state$placement.x, y = _data$state$placement.y;
        if (state.modifiersData.popperOffsets != null) {
          state.modifiersData.popperOffsets.x += x;
          state.modifiersData.popperOffsets.y += y;
        }
        state.modifiersData[name] = data;
      }
      var offset$1 = {
        name: "offset",
        enabled: true,
        phase: "main",
        requires: ["popperOffsets"],
        fn: offset
      };
      var hash$1 = {
        left: "right",
        right: "left",
        bottom: "top",
        top: "bottom"
      };
      function getOppositePlacement(placement) {
        return placement.replace(/left|right|bottom|top/g, function(matched) {
          return hash$1[matched];
        });
      }
      var hash = {
        start: "end",
        end: "start"
      };
      function getOppositeVariationPlacement(placement) {
        return placement.replace(/start|end/g, function(matched) {
          return hash[matched];
        });
      }
      function computeAutoPlacement(state, options) {
        if (options === void 0) {
          options = {};
        }
        var _options = options, placement = _options.placement, boundary = _options.boundary, rootBoundary = _options.rootBoundary, padding = _options.padding, flipVariations = _options.flipVariations, _options$allowedAutoP = _options.allowedAutoPlacements, allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
        var variation = getVariation(placement);
        var placements$1 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function(placement2) {
          return getVariation(placement2) === variation;
        }) : basePlacements;
        var allowedPlacements = placements$1.filter(function(placement2) {
          return allowedAutoPlacements.indexOf(placement2) >= 0;
        });
        if (allowedPlacements.length === 0) {
          allowedPlacements = placements$1;
          if (true) {
            console.error(["Popper: The `allowedAutoPlacements` option did not allow any", "placements. Ensure the `placement` option matches the variation", "of the allowed placements.", 'For example, "auto" cannot be used to allow "bottom-start".', 'Use "auto-start" instead.'].join(" "));
          }
        }
        var overflows = allowedPlacements.reduce(function(acc, placement2) {
          acc[placement2] = detectOverflow(state, {
            placement: placement2,
            boundary,
            rootBoundary,
            padding
          })[getBasePlacement(placement2)];
          return acc;
        }, {});
        return Object.keys(overflows).sort(function(a, b) {
          return overflows[a] - overflows[b];
        });
      }
      function getExpandedFallbackPlacements(placement) {
        if (getBasePlacement(placement) === auto) {
          return [];
        }
        var oppositePlacement = getOppositePlacement(placement);
        return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
      }
      function flip(_ref) {
        var state = _ref.state, options = _ref.options, name = _ref.name;
        if (state.modifiersData[name]._skip) {
          return;
        }
        var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis, specifiedFallbackPlacements = options.fallbackPlacements, padding = options.padding, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, _options$flipVariatio = options.flipVariations, flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio, allowedAutoPlacements = options.allowedAutoPlacements;
        var preferredPlacement = state.options.placement;
        var basePlacement = getBasePlacement(preferredPlacement);
        var isBasePlacement = basePlacement === preferredPlacement;
        var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
        var placements2 = [preferredPlacement].concat(fallbackPlacements).reduce(function(acc, placement2) {
          return acc.concat(getBasePlacement(placement2) === auto ? computeAutoPlacement(state, {
            placement: placement2,
            boundary,
            rootBoundary,
            padding,
            flipVariations,
            allowedAutoPlacements
          }) : placement2);
        }, []);
        var referenceRect = state.rects.reference;
        var popperRect = state.rects.popper;
        var checksMap = /* @__PURE__ */ new Map();
        var makeFallbackChecks = true;
        var firstFittingPlacement = placements2[0];
        for (var i = 0; i < placements2.length; i++) {
          var placement = placements2[i];
          var _basePlacement = getBasePlacement(placement);
          var isStartVariation = getVariation(placement) === start;
          var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
          var len = isVertical ? "width" : "height";
          var overflow = detectOverflow(state, {
            placement,
            boundary,
            rootBoundary,
            altBoundary,
            padding
          });
          var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;
          if (referenceRect[len] > popperRect[len]) {
            mainVariationSide = getOppositePlacement(mainVariationSide);
          }
          var altVariationSide = getOppositePlacement(mainVariationSide);
          var checks = [];
          if (checkMainAxis) {
            checks.push(overflow[_basePlacement] <= 0);
          }
          if (checkAltAxis) {
            checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
          }
          if (checks.every(function(check) {
            return check;
          })) {
            firstFittingPlacement = placement;
            makeFallbackChecks = false;
            break;
          }
          checksMap.set(placement, checks);
        }
        if (makeFallbackChecks) {
          var numberOfChecks = flipVariations ? 3 : 1;
          var _loop = function _loop2(_i2) {
            var fittingPlacement = placements2.find(function(placement2) {
              var checks2 = checksMap.get(placement2);
              if (checks2) {
                return checks2.slice(0, _i2).every(function(check) {
                  return check;
                });
              }
            });
            if (fittingPlacement) {
              firstFittingPlacement = fittingPlacement;
              return "break";
            }
          };
          for (var _i = numberOfChecks; _i > 0; _i--) {
            var _ret = _loop(_i);
            if (_ret === "break") break;
          }
        }
        if (state.placement !== firstFittingPlacement) {
          state.modifiersData[name]._skip = true;
          state.placement = firstFittingPlacement;
          state.reset = true;
        }
      }
      var flip$1 = {
        name: "flip",
        enabled: true,
        phase: "main",
        fn: flip,
        requiresIfExists: ["offset"],
        data: {
          _skip: false
        }
      };
      function getAltAxis(axis) {
        return axis === "x" ? "y" : "x";
      }
      function within(min$1, value, max$1) {
        return max(min$1, min(value, max$1));
      }
      function withinMaxClamp(min2, value, max2) {
        var v = within(min2, value, max2);
        return v > max2 ? max2 : v;
      }
      function preventOverflow(_ref) {
        var state = _ref.state, options = _ref.options, name = _ref.name;
        var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, padding = options.padding, _options$tether = options.tether, tether = _options$tether === void 0 ? true : _options$tether, _options$tetherOffset = options.tetherOffset, tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
        var overflow = detectOverflow(state, {
          boundary,
          rootBoundary,
          padding,
          altBoundary
        });
        var basePlacement = getBasePlacement(state.placement);
        var variation = getVariation(state.placement);
        var isBasePlacement = !variation;
        var mainAxis = getMainAxisFromPlacement(basePlacement);
        var altAxis = getAltAxis(mainAxis);
        var popperOffsets2 = state.modifiersData.popperOffsets;
        var referenceRect = state.rects.reference;
        var popperRect = state.rects.popper;
        var tetherOffsetValue = typeof tetherOffset === "function" ? tetherOffset(Object.assign({}, state.rects, {
          placement: state.placement
        })) : tetherOffset;
        var normalizedTetherOffsetValue = typeof tetherOffsetValue === "number" ? {
          mainAxis: tetherOffsetValue,
          altAxis: tetherOffsetValue
        } : Object.assign({
          mainAxis: 0,
          altAxis: 0
        }, tetherOffsetValue);
        var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
        var data = {
          x: 0,
          y: 0
        };
        if (!popperOffsets2) {
          return;
        }
        if (checkMainAxis) {
          var _offsetModifierState$;
          var mainSide = mainAxis === "y" ? top : left;
          var altSide = mainAxis === "y" ? bottom : right;
          var len = mainAxis === "y" ? "height" : "width";
          var offset2 = popperOffsets2[mainAxis];
          var min$1 = offset2 + overflow[mainSide];
          var max$1 = offset2 - overflow[altSide];
          var additive = tether ? -popperRect[len] / 2 : 0;
          var minLen = variation === start ? referenceRect[len] : popperRect[len];
          var maxLen = variation === start ? -popperRect[len] : -referenceRect[len];
          var arrowElement = state.elements.arrow;
          var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
            width: 0,
            height: 0
          };
          var arrowPaddingObject = state.modifiersData["arrow#persistent"] ? state.modifiersData["arrow#persistent"].padding : getFreshSideObject();
          var arrowPaddingMin = arrowPaddingObject[mainSide];
          var arrowPaddingMax = arrowPaddingObject[altSide];
          var arrowLen = within(0, referenceRect[len], arrowRect[len]);
          var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
          var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
          var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
          var clientOffset = arrowOffsetParent ? mainAxis === "y" ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
          var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
          var tetherMin = offset2 + minOffset - offsetModifierValue - clientOffset;
          var tetherMax = offset2 + maxOffset - offsetModifierValue;
          var preventedOffset = within(tether ? min(min$1, tetherMin) : min$1, offset2, tether ? max(max$1, tetherMax) : max$1);
          popperOffsets2[mainAxis] = preventedOffset;
          data[mainAxis] = preventedOffset - offset2;
        }
        if (checkAltAxis) {
          var _offsetModifierState$2;
          var _mainSide = mainAxis === "x" ? top : left;
          var _altSide = mainAxis === "x" ? bottom : right;
          var _offset = popperOffsets2[altAxis];
          var _len = altAxis === "y" ? "height" : "width";
          var _min = _offset + overflow[_mainSide];
          var _max = _offset - overflow[_altSide];
          var isOriginSide = [top, left].indexOf(basePlacement) !== -1;
          var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;
          var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;
          var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;
          var _preventedOffset = tether && isOriginSide ? withinMaxClamp(_tetherMin, _offset, _tetherMax) : within(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);
          popperOffsets2[altAxis] = _preventedOffset;
          data[altAxis] = _preventedOffset - _offset;
        }
        state.modifiersData[name] = data;
      }
      var preventOverflow$1 = {
        name: "preventOverflow",
        enabled: true,
        phase: "main",
        fn: preventOverflow,
        requiresIfExists: ["offset"]
      };
      var toPaddingObject = function toPaddingObject2(padding, state) {
        padding = typeof padding === "function" ? padding(Object.assign({}, state.rects, {
          placement: state.placement
        })) : padding;
        return mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
      };
      function arrow(_ref) {
        var _state$modifiersData$;
        var state = _ref.state, name = _ref.name, options = _ref.options;
        var arrowElement = state.elements.arrow;
        var popperOffsets2 = state.modifiersData.popperOffsets;
        var basePlacement = getBasePlacement(state.placement);
        var axis = getMainAxisFromPlacement(basePlacement);
        var isVertical = [left, right].indexOf(basePlacement) >= 0;
        var len = isVertical ? "height" : "width";
        if (!arrowElement || !popperOffsets2) {
          return;
        }
        var paddingObject = toPaddingObject(options.padding, state);
        var arrowRect = getLayoutRect(arrowElement);
        var minProp = axis === "y" ? top : left;
        var maxProp = axis === "y" ? bottom : right;
        var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets2[axis] - state.rects.popper[len];
        var startDiff = popperOffsets2[axis] - state.rects.reference[axis];
        var arrowOffsetParent = getOffsetParent(arrowElement);
        var clientSize = arrowOffsetParent ? axis === "y" ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
        var centerToReference = endDiff / 2 - startDiff / 2;
        var min2 = paddingObject[minProp];
        var max2 = clientSize - arrowRect[len] - paddingObject[maxProp];
        var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
        var offset2 = within(min2, center, max2);
        var axisProp = axis;
        state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset2, _state$modifiersData$.centerOffset = offset2 - center, _state$modifiersData$);
      }
      function effect(_ref2) {
        var state = _ref2.state, options = _ref2.options;
        var _options$element = options.element, arrowElement = _options$element === void 0 ? "[data-popper-arrow]" : _options$element;
        if (arrowElement == null) {
          return;
        }
        if (typeof arrowElement === "string") {
          arrowElement = state.elements.popper.querySelector(arrowElement);
          if (!arrowElement) {
            return;
          }
        }
        if (true) {
          if (!isHTMLElement(arrowElement)) {
            console.error(['Popper: "arrow" element must be an HTMLElement (not an SVGElement).', "To use an SVG arrow, wrap it in an HTMLElement that will be used as", "the arrow."].join(" "));
          }
        }
        if (!contains(state.elements.popper, arrowElement)) {
          if (true) {
            console.error(['Popper: "arrow" modifier\'s `element` must be a child of the popper', "element."].join(" "));
          }
          return;
        }
        state.elements.arrow = arrowElement;
      }
      var arrow$1 = {
        name: "arrow",
        enabled: true,
        phase: "main",
        fn: arrow,
        effect,
        requires: ["popperOffsets"],
        requiresIfExists: ["preventOverflow"]
      };
      function getSideOffsets(overflow, rect, preventedOffsets) {
        if (preventedOffsets === void 0) {
          preventedOffsets = {
            x: 0,
            y: 0
          };
        }
        return {
          top: overflow.top - rect.height - preventedOffsets.y,
          right: overflow.right - rect.width + preventedOffsets.x,
          bottom: overflow.bottom - rect.height + preventedOffsets.y,
          left: overflow.left - rect.width - preventedOffsets.x
        };
      }
      function isAnySideFullyClipped(overflow) {
        return [top, right, bottom, left].some(function(side) {
          return overflow[side] >= 0;
        });
      }
      function hide(_ref) {
        var state = _ref.state, name = _ref.name;
        var referenceRect = state.rects.reference;
        var popperRect = state.rects.popper;
        var preventedOffsets = state.modifiersData.preventOverflow;
        var referenceOverflow = detectOverflow(state, {
          elementContext: "reference"
        });
        var popperAltOverflow = detectOverflow(state, {
          altBoundary: true
        });
        var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
        var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
        var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
        var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
        state.modifiersData[name] = {
          referenceClippingOffsets,
          popperEscapeOffsets,
          isReferenceHidden,
          hasPopperEscaped
        };
        state.attributes.popper = Object.assign({}, state.attributes.popper, {
          "data-popper-reference-hidden": isReferenceHidden,
          "data-popper-escaped": hasPopperEscaped
        });
      }
      var hide$1 = {
        name: "hide",
        enabled: true,
        phase: "main",
        requiresIfExists: ["preventOverflow"],
        fn: hide
      };
      var defaultModifiers$1 = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1];
      var createPopper$1 = /* @__PURE__ */ popperGenerator({
        defaultModifiers: defaultModifiers$1
      });
      var defaultModifiers = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1, offset$1, flip$1, preventOverflow$1, arrow$1, hide$1];
      var createPopper3 = /* @__PURE__ */ popperGenerator({
        defaultModifiers
      });
      exports.applyStyles = applyStyles$1;
      exports.arrow = arrow$1;
      exports.computeStyles = computeStyles$1;
      exports.createPopper = createPopper3;
      exports.createPopperLite = createPopper$1;
      exports.defaultModifiers = defaultModifiers;
      exports.detectOverflow = detectOverflow;
      exports.eventListeners = eventListeners;
      exports.flip = flip$1;
      exports.hide = hide$1;
      exports.offset = offset$1;
      exports.popperGenerator = popperGenerator;
      exports.popperOffsets = popperOffsets$1;
      exports.preventOverflow = preventOverflow$1;
    }
  });

  // ns-hugo:C:\Users\steveyout\AppData\Local\hugo_cache\modules\filecache\modules\pkg\mod\github.com\twbs\bootstrap@v5.3.2+incompatible\js\src\dom\data.js
  var elementMap = /* @__PURE__ */ new Map();
  var data_default = {
    set(element, key, instance) {
      if (!elementMap.has(element)) {
        elementMap.set(element, /* @__PURE__ */ new Map());
      }
      const instanceMap = elementMap.get(element);
      if (!instanceMap.has(key) && instanceMap.size !== 0) {
        console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(instanceMap.keys())[0]}.`);
        return;
      }
      instanceMap.set(key, instance);
    },
    get(element, key) {
      if (elementMap.has(element)) {
        return elementMap.get(element).get(key) || null;
      }
      return null;
    },
    remove(element, key) {
      if (!elementMap.has(element)) {
        return;
      }
      const instanceMap = elementMap.get(element);
      instanceMap.delete(key);
      if (instanceMap.size === 0) {
        elementMap.delete(element);
      }
    }
  };

  // ns-hugo:C:\Users\steveyout\AppData\Local\hugo_cache\modules\filecache\modules\pkg\mod\github.com\twbs\bootstrap@v5.3.2+incompatible\js\src\util\index.js
  var MAX_UID = 1e6;
  var MILLISECONDS_MULTIPLIER = 1e3;
  var TRANSITION_END = "transitionend";
  var parseSelector = (selector) => {
    if (selector && window.CSS && window.CSS.escape) {
      selector = selector.replace(/#([^\s"#']+)/g, (match, id) => `#${CSS.escape(id)}`);
    }
    return selector;
  };
  var toType = (object) => {
    if (object === null || object === void 0) {
      return `${object}`;
    }
    return Object.prototype.toString.call(object).match(/\s([a-z]+)/i)[1].toLowerCase();
  };
  var getUID = (prefix) => {
    do {
      prefix += Math.floor(Math.random() * MAX_UID);
    } while (document.getElementById(prefix));
    return prefix;
  };
  var getTransitionDurationFromElement = (element) => {
    if (!element) {
      return 0;
    }
    let { transitionDuration, transitionDelay } = window.getComputedStyle(element);
    const floatTransitionDuration = Number.parseFloat(transitionDuration);
    const floatTransitionDelay = Number.parseFloat(transitionDelay);
    if (!floatTransitionDuration && !floatTransitionDelay) {
      return 0;
    }
    transitionDuration = transitionDuration.split(",")[0];
    transitionDelay = transitionDelay.split(",")[0];
    return (Number.parseFloat(transitionDuration) + Number.parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
  };
  var triggerTransitionEnd = (element) => {
    element.dispatchEvent(new Event(TRANSITION_END));
  };
  var isElement = (object) => {
    if (!object || typeof object !== "object") {
      return false;
    }
    if (typeof object.jquery !== "undefined") {
      object = object[0];
    }
    return typeof object.nodeType !== "undefined";
  };
  var getElement = (object) => {
    if (isElement(object)) {
      return object.jquery ? object[0] : object;
    }
    if (typeof object === "string" && object.length > 0) {
      return document.querySelector(parseSelector(object));
    }
    return null;
  };
  var isVisible = (element) => {
    if (!isElement(element) || element.getClientRects().length === 0) {
      return false;
    }
    const elementIsVisible = getComputedStyle(element).getPropertyValue("visibility") === "visible";
    const closedDetails = element.closest("details:not([open])");
    if (!closedDetails) {
      return elementIsVisible;
    }
    if (closedDetails !== element) {
      const summary = element.closest("summary");
      if (summary && summary.parentNode !== closedDetails) {
        return false;
      }
      if (summary === null) {
        return false;
      }
    }
    return elementIsVisible;
  };
  var isDisabled = (element) => {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
      return true;
    }
    if (element.classList.contains("disabled")) {
      return true;
    }
    if (typeof element.disabled !== "undefined") {
      return element.disabled;
    }
    return element.hasAttribute("disabled") && element.getAttribute("disabled") !== "false";
  };
  var findShadowRoot = (element) => {
    if (!document.documentElement.attachShadow) {
      return null;
    }
    if (typeof element.getRootNode === "function") {
      const root = element.getRootNode();
      return root instanceof ShadowRoot ? root : null;
    }
    if (element instanceof ShadowRoot) {
      return element;
    }
    if (!element.parentNode) {
      return null;
    }
    return findShadowRoot(element.parentNode);
  };
  var noop = () => {
  };
  var reflow = (element) => {
    element.offsetHeight;
  };
  var getjQuery = () => {
    if (window.jQuery && !document.body.hasAttribute("data-bs-no-jquery")) {
      return window.jQuery;
    }
    return null;
  };
  var DOMContentLoadedCallbacks = [];
  var onDOMContentLoaded = (callback) => {
    if (document.readyState === "loading") {
      if (!DOMContentLoadedCallbacks.length) {
        document.addEventListener("DOMContentLoaded", () => {
          for (const callback2 of DOMContentLoadedCallbacks) {
            callback2();
          }
        });
      }
      DOMContentLoadedCallbacks.push(callback);
    } else {
      callback();
    }
  };
  var isRTL = () => document.documentElement.dir === "rtl";
  var defineJQueryPlugin = (plugin) => {
    onDOMContentLoaded(() => {
      const $ = getjQuery();
      if ($) {
        const name = plugin.NAME;
        const JQUERY_NO_CONFLICT = $.fn[name];
        $.fn[name] = plugin.jQueryInterface;
        $.fn[name].Constructor = plugin;
        $.fn[name].noConflict = () => {
          $.fn[name] = JQUERY_NO_CONFLICT;
          return plugin.jQueryInterface;
        };
      }
    });
  };
  var execute = (possibleCallback, args = [], defaultValue = possibleCallback) => {
    return typeof possibleCallback === "function" ? possibleCallback(...args) : defaultValue;
  };
  var executeAfterTransition = (callback, transitionElement, waitForTransition = true) => {
    if (!waitForTransition) {
      execute(callback);
      return;
    }
    const durationPadding = 5;
    const emulatedDuration = getTransitionDurationFromElement(transitionElement) + durationPadding;
    let called = false;
    const handler = ({ target }) => {
      if (target !== transitionElement) {
        return;
      }
      called = true;
      transitionElement.removeEventListener(TRANSITION_END, handler);
      execute(callback);
    };
    transitionElement.addEventListener(TRANSITION_END, handler);
    setTimeout(() => {
      if (!called) {
        triggerTransitionEnd(transitionElement);
      }
    }, emulatedDuration);
  };
  var getNextActiveElement = (list, activeElement, shouldGetNext, isCycleAllowed) => {
    const listLength = list.length;
    let index = list.indexOf(activeElement);
    if (index === -1) {
      return !shouldGetNext && isCycleAllowed ? list[listLength - 1] : list[0];
    }
    index += shouldGetNext ? 1 : -1;
    if (isCycleAllowed) {
      index = (index + listLength) % listLength;
    }
    return list[Math.max(0, Math.min(index, listLength - 1))];
  };

  // ns-hugo:C:\Users\steveyout\AppData\Local\hugo_cache\modules\filecache\modules\pkg\mod\github.com\twbs\bootstrap@v5.3.2+incompatible\js\src\dom\event-handler.js
  var namespaceRegex = /[^.]*(?=\..*)\.|.*/;
  var stripNameRegex = /\..*/;
  var stripUidRegex = /::\d+$/;
  var eventRegistry = {};
  var uidEvent = 1;
  var customEvents = {
    mouseenter: "mouseover",
    mouseleave: "mouseout"
  };
  var nativeEvents = /* @__PURE__ */ new Set([
    "click",
    "dblclick",
    "mouseup",
    "mousedown",
    "contextmenu",
    "mousewheel",
    "DOMMouseScroll",
    "mouseover",
    "mouseout",
    "mousemove",
    "selectstart",
    "selectend",
    "keydown",
    "keypress",
    "keyup",
    "orientationchange",
    "touchstart",
    "touchmove",
    "touchend",
    "touchcancel",
    "pointerdown",
    "pointermove",
    "pointerup",
    "pointerleave",
    "pointercancel",
    "gesturestart",
    "gesturechange",
    "gestureend",
    "focus",
    "blur",
    "change",
    "reset",
    "select",
    "submit",
    "focusin",
    "focusout",
    "load",
    "unload",
    "beforeunload",
    "resize",
    "move",
    "DOMContentLoaded",
    "readystatechange",
    "error",
    "abort",
    "scroll"
  ]);
  function makeEventUid(element, uid) {
    return uid && `${uid}::${uidEvent++}` || element.uidEvent || uidEvent++;
  }
  function getElementEvents(element) {
    const uid = makeEventUid(element);
    element.uidEvent = uid;
    eventRegistry[uid] = eventRegistry[uid] || {};
    return eventRegistry[uid];
  }
  function bootstrapHandler(element, fn) {
    return function handler(event) {
      hydrateObj(event, { delegateTarget: element });
      if (handler.oneOff) {
        EventHandler.off(element, event.type, fn);
      }
      return fn.apply(element, [event]);
    };
  }
  function bootstrapDelegationHandler(element, selector, fn) {
    return function handler(event) {
      const domElements = element.querySelectorAll(selector);
      for (let { target } = event; target && target !== this; target = target.parentNode) {
        for (const domElement of domElements) {
          if (domElement !== target) {
            continue;
          }
          hydrateObj(event, { delegateTarget: target });
          if (handler.oneOff) {
            EventHandler.off(element, event.type, selector, fn);
          }
          return fn.apply(target, [event]);
        }
      }
    };
  }
  function findHandler(events, callable, delegationSelector = null) {
    return Object.values(events).find((event) => event.callable === callable && event.delegationSelector === delegationSelector);
  }
  function normalizeParameters(originalTypeEvent, handler, delegationFunction) {
    const isDelegated = typeof handler === "string";
    const callable = isDelegated ? delegationFunction : handler || delegationFunction;
    let typeEvent = getTypeEvent(originalTypeEvent);
    if (!nativeEvents.has(typeEvent)) {
      typeEvent = originalTypeEvent;
    }
    return [isDelegated, callable, typeEvent];
  }
  function addHandler(element, originalTypeEvent, handler, delegationFunction, oneOff) {
    if (typeof originalTypeEvent !== "string" || !element) {
      return;
    }
    let [isDelegated, callable, typeEvent] = normalizeParameters(originalTypeEvent, handler, delegationFunction);
    if (originalTypeEvent in customEvents) {
      const wrapFunction = (fn2) => {
        return function(event) {
          if (!event.relatedTarget || event.relatedTarget !== event.delegateTarget && !event.delegateTarget.contains(event.relatedTarget)) {
            return fn2.call(this, event);
          }
        };
      };
      callable = wrapFunction(callable);
    }
    const events = getElementEvents(element);
    const handlers = events[typeEvent] || (events[typeEvent] = {});
    const previousFunction = findHandler(handlers, callable, isDelegated ? handler : null);
    if (previousFunction) {
      previousFunction.oneOff = previousFunction.oneOff && oneOff;
      return;
    }
    const uid = makeEventUid(callable, originalTypeEvent.replace(namespaceRegex, ""));
    const fn = isDelegated ? bootstrapDelegationHandler(element, handler, callable) : bootstrapHandler(element, callable);
    fn.delegationSelector = isDelegated ? handler : null;
    fn.callable = callable;
    fn.oneOff = oneOff;
    fn.uidEvent = uid;
    handlers[uid] = fn;
    element.addEventListener(typeEvent, fn, isDelegated);
  }
  function removeHandler(element, events, typeEvent, handler, delegationSelector) {
    const fn = findHandler(events[typeEvent], handler, delegationSelector);
    if (!fn) {
      return;
    }
    element.removeEventListener(typeEvent, fn, Boolean(delegationSelector));
    delete events[typeEvent][fn.uidEvent];
  }
  function removeNamespacedHandlers(element, events, typeEvent, namespace) {
    const storeElementEvent = events[typeEvent] || {};
    for (const [handlerKey, event] of Object.entries(storeElementEvent)) {
      if (handlerKey.includes(namespace)) {
        removeHandler(element, events, typeEvent, event.callable, event.delegationSelector);
      }
    }
  }
  function getTypeEvent(event) {
    event = event.replace(stripNameRegex, "");
    return customEvents[event] || event;
  }
  var EventHandler = {
    on(element, event, handler, delegationFunction) {
      addHandler(element, event, handler, delegationFunction, false);
    },
    one(element, event, handler, delegationFunction) {
      addHandler(element, event, handler, delegationFunction, true);
    },
    off(element, originalTypeEvent, handler, delegationFunction) {
      if (typeof originalTypeEvent !== "string" || !element) {
        return;
      }
      const [isDelegated, callable, typeEvent] = normalizeParameters(originalTypeEvent, handler, delegationFunction);
      const inNamespace = typeEvent !== originalTypeEvent;
      const events = getElementEvents(element);
      const storeElementEvent = events[typeEvent] || {};
      const isNamespace = originalTypeEvent.startsWith(".");
      if (typeof callable !== "undefined") {
        if (!Object.keys(storeElementEvent).length) {
          return;
        }
        removeHandler(element, events, typeEvent, callable, isDelegated ? handler : null);
        return;
      }
      if (isNamespace) {
        for (const elementEvent of Object.keys(events)) {
          removeNamespacedHandlers(element, events, elementEvent, originalTypeEvent.slice(1));
        }
      }
      for (const [keyHandlers, event] of Object.entries(storeElementEvent)) {
        const handlerKey = keyHandlers.replace(stripUidRegex, "");
        if (!inNamespace || originalTypeEvent.includes(handlerKey)) {
          removeHandler(element, events, typeEvent, event.callable, event.delegationSelector);
        }
      }
    },
    trigger(element, event, args) {
      if (typeof event !== "string" || !element) {
        return null;
      }
      const $ = getjQuery();
      const typeEvent = getTypeEvent(event);
      const inNamespace = event !== typeEvent;
      let jQueryEvent = null;
      let bubbles = true;
      let nativeDispatch = true;
      let defaultPrevented = false;
      if (inNamespace && $) {
        jQueryEvent = $.Event(event, args);
        $(element).trigger(jQueryEvent);
        bubbles = !jQueryEvent.isPropagationStopped();
        nativeDispatch = !jQueryEvent.isImmediatePropagationStopped();
        defaultPrevented = jQueryEvent.isDefaultPrevented();
      }
      const evt = hydrateObj(new Event(event, { bubbles, cancelable: true }), args);
      if (defaultPrevented) {
        evt.preventDefault();
      }
      if (nativeDispatch) {
        element.dispatchEvent(evt);
      }
      if (evt.defaultPrevented && jQueryEvent) {
        jQueryEvent.preventDefault();
      }
      return evt;
    }
  };
  function hydrateObj(obj, meta = {}) {
    for (const [key, value] of Object.entries(meta)) {
      try {
        obj[key] = value;
      } catch (e) {
        Object.defineProperty(obj, key, {
          configurable: true,
          get() {
            return value;
          }
        });
      }
    }
    return obj;
  }
  var event_handler_default = EventHandler;

  // ns-hugo:C:\Users\steveyout\AppData\Local\hugo_cache\modules\filecache\modules\pkg\mod\github.com\twbs\bootstrap@v5.3.2+incompatible\js\src\dom\manipulator.js
  function normalizeData(value) {
    if (value === "true") {
      return true;
    }
    if (value === "false") {
      return false;
    }
    if (value === Number(value).toString()) {
      return Number(value);
    }
    if (value === "" || value === "null") {
      return null;
    }
    if (typeof value !== "string") {
      return value;
    }
    try {
      return JSON.parse(decodeURIComponent(value));
    } catch (e) {
      return value;
    }
  }
  function normalizeDataKey(key) {
    return key.replace(/[A-Z]/g, (chr) => `-${chr.toLowerCase()}`);
  }
  var Manipulator = {
    setDataAttribute(element, key, value) {
      element.setAttribute(`data-bs-${normalizeDataKey(key)}`, value);
    },
    removeDataAttribute(element, key) {
      element.removeAttribute(`data-bs-${normalizeDataKey(key)}`);
    },
    getDataAttributes(element) {
      if (!element) {
        return {};
      }
      const attributes = {};
      const bsKeys = Object.keys(element.dataset).filter((key) => key.startsWith("bs") && !key.startsWith("bsConfig"));
      for (const key of bsKeys) {
        let pureKey = key.replace(/^bs/, "");
        pureKey = pureKey.charAt(0).toLowerCase() + pureKey.slice(1, pureKey.length);
        attributes[pureKey] = normalizeData(element.dataset[key]);
      }
      return attributes;
    },
    getDataAttribute(element, key) {
      return normalizeData(element.getAttribute(`data-bs-${normalizeDataKey(key)}`));
    }
  };
  var manipulator_default = Manipulator;

  // ns-hugo:C:\Users\steveyout\AppData\Local\hugo_cache\modules\filecache\modules\pkg\mod\github.com\twbs\bootstrap@v5.3.2+incompatible\js\src\util\config.js
  var Config = class {
    // Getters
    static get Default() {
      return {};
    }
    static get DefaultType() {
      return {};
    }
    static get NAME() {
      throw new Error('You have to implement the static method "NAME", for each component!');
    }
    _getConfig(config) {
      config = this._mergeConfigObj(config);
      config = this._configAfterMerge(config);
      this._typeCheckConfig(config);
      return config;
    }
    _configAfterMerge(config) {
      return config;
    }
    _mergeConfigObj(config, element) {
      const jsonConfig = isElement(element) ? manipulator_default.getDataAttribute(element, "config") : {};
      return {
        ...this.constructor.Default,
        ...typeof jsonConfig === "object" ? jsonConfig : {},
        ...isElement(element) ? manipulator_default.getDataAttributes(element) : {},
        ...typeof config === "object" ? config : {}
      };
    }
    _typeCheckConfig(config, configTypes = this.constructor.DefaultType) {
      for (const [property, expectedTypes] of Object.entries(configTypes)) {
        const value = config[property];
        const valueType = isElement(value) ? "element" : toType(value);
        if (!new RegExp(expectedTypes).test(valueType)) {
          throw new TypeError(
            `${this.constructor.NAME.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`
          );
        }
      }
    }
  };
  var config_default = Config;

  // ns-hugo:C:\Users\steveyout\AppData\Local\hugo_cache\modules\filecache\modules\pkg\mod\github.com\twbs\bootstrap@v5.3.2+incompatible\js\src\base-component.js
  var VERSION = "5.3.2";
  var BaseComponent = class extends config_default {
    constructor(element, config) {
      super();
      element = getElement(element);
      if (!element) {
        return;
      }
      this._element = element;
      this._config = this._getConfig(config);
      data_default.set(this._element, this.constructor.DATA_KEY, this);
    }
    // Public
    dispose() {
      data_default.remove(this._element, this.constructor.DATA_KEY);
      event_handler_default.off(this._element, this.constructor.EVENT_KEY);
      for (const propertyName of Object.getOwnPropertyNames(this)) {
        this[propertyName] = null;
      }
    }
    _queueCallback(callback, element, isAnimated = true) {
      executeAfterTransition(callback, element, isAnimated);
    }
    _getConfig(config) {
      config = this._mergeConfigObj(config, this._element);
      config = this._configAfterMerge(config);
      this._typeCheckConfig(config);
      return config;
    }
    // Static
    static getInstance(element) {
      return data_default.get(getElement(element), this.DATA_KEY);
    }
    static getOrCreateInstance(element, config = {}) {
      return this.getInstance(element) || new this(element, typeof config === "object" ? config : null);
    }
    static get VERSION() {
      return VERSION;
    }
    static get DATA_KEY() {
      return `bs.${this.NAME}`;
    }
    static get EVENT_KEY() {
      return `.${this.DATA_KEY}`;
    }
    static eventName(name) {
      return `${name}${this.EVENT_KEY}`;
    }
  };
  var base_component_default = BaseComponent;

  // ns-hugo:C:\Users\steveyout\AppData\Local\hugo_cache\modules\filecache\modules\pkg\mod\github.com\twbs\bootstrap@v5.3.2+incompatible\js\src\dom\selector-engine.js
  var getSelector = (element) => {
    let selector = element.getAttribute("data-bs-target");
    if (!selector || selector === "#") {
      let hrefAttribute = element.getAttribute("href");
      if (!hrefAttribute || !hrefAttribute.includes("#") && !hrefAttribute.startsWith(".")) {
        return null;
      }
      if (hrefAttribute.includes("#") && !hrefAttribute.startsWith("#")) {
        hrefAttribute = `#${hrefAttribute.split("#")[1]}`;
      }
      selector = hrefAttribute && hrefAttribute !== "#" ? parseSelector(hrefAttribute.trim()) : null;
    }
    return selector;
  };
  var SelectorEngine = {
    find(selector, element = document.documentElement) {
      return [].concat(...Element.prototype.querySelectorAll.call(element, selector));
    },
    findOne(selector, element = document.documentElement) {
      return Element.prototype.querySelector.call(element, selector);
    },
    children(element, selector) {
      return [].concat(...element.children).filter((child) => child.matches(selector));
    },
    parents(element, selector) {
      const parents = [];
      let ancestor = element.parentNode.closest(selector);
      while (ancestor) {
        parents.push(ancestor);
        ancestor = ancestor.parentNode.closest(selector);
      }
      return parents;
    },
    prev(element, selector) {
      let previous = element.previousElementSibling;
      while (previous) {
        if (previous.matches(selector)) {
          return [previous];
        }
        previous = previous.previousElementSibling;
      }
      return [];
    },
    // TODO: this is now unused; remove later along with prev()
    next(element, selector) {
      let next = element.nextElementSibling;
      while (next) {
        if (next.matches(selector)) {
          return [next];
        }
        next = next.nextElementSibling;
      }
      return [];
    },
    focusableChildren(element) {
      const focusables = [
        "a",
        "button",
        "input",
        "textarea",
        "select",
        "details",
        "[tabindex]",
        '[contenteditable="true"]'
      ].map((selector) => `${selector}:not([tabindex^="-"])`).join(",");
      return this.find(focusables, element).filter((el) => !isDisabled(el) && isVisible(el));
    },
    getSelectorFromElement(element) {
      const selector = getSelector(element);
      if (selector) {
        return SelectorEngine.findOne(selector) ? selector : null;
      }
      return null;
    },
    getElementFromSelector(element) {
      const selector = getSelector(element);
      return selector ? SelectorEngine.findOne(selector) : null;
    },
    getMultipleElementsFromSelector(element) {
      const selector = getSelector(element);
      return selector ? SelectorEngine.find(selector) : [];
    }
  };
  var selector_engine_default = SelectorEngine;

  // ns-hugo:C:\Users\steveyout\AppData\Local\hugo_cache\modules\filecache\modules\pkg\mod\github.com\twbs\bootstrap@v5.3.2+incompatible\js\src\tab.js
  var NAME = "tab";
  var DATA_KEY = "bs.tab";
  var EVENT_KEY = `.${DATA_KEY}`;
  var EVENT_HIDE = `hide${EVENT_KEY}`;
  var EVENT_HIDDEN = `hidden${EVENT_KEY}`;
  var EVENT_SHOW = `show${EVENT_KEY}`;
  var EVENT_SHOWN = `shown${EVENT_KEY}`;
  var EVENT_CLICK_DATA_API = `click${EVENT_KEY}`;
  var EVENT_KEYDOWN = `keydown${EVENT_KEY}`;
  var EVENT_LOAD_DATA_API = `load${EVENT_KEY}`;
  var ARROW_LEFT_KEY = "ArrowLeft";
  var ARROW_RIGHT_KEY = "ArrowRight";
  var ARROW_UP_KEY = "ArrowUp";
  var ARROW_DOWN_KEY = "ArrowDown";
  var HOME_KEY = "Home";
  var END_KEY = "End";
  var CLASS_NAME_ACTIVE = "active";
  var CLASS_NAME_FADE = "fade";
  var CLASS_NAME_SHOW = "show";
  var CLASS_DROPDOWN = "dropdown";
  var SELECTOR_DROPDOWN_TOGGLE = ".dropdown-toggle";
  var SELECTOR_DROPDOWN_MENU = ".dropdown-menu";
  var NOT_SELECTOR_DROPDOWN_TOGGLE = `:not(${SELECTOR_DROPDOWN_TOGGLE})`;
  var SELECTOR_TAB_PANEL = '.list-group, .nav, [role="tablist"]';
  var SELECTOR_OUTER = ".nav-item, .list-group-item";
  var SELECTOR_INNER = `.nav-link${NOT_SELECTOR_DROPDOWN_TOGGLE}, .list-group-item${NOT_SELECTOR_DROPDOWN_TOGGLE}, [role="tab"]${NOT_SELECTOR_DROPDOWN_TOGGLE}`;
  var SELECTOR_DATA_TOGGLE = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]';
  var SELECTOR_INNER_ELEM = `${SELECTOR_INNER}, ${SELECTOR_DATA_TOGGLE}`;
  var SELECTOR_DATA_TOGGLE_ACTIVE = `.${CLASS_NAME_ACTIVE}[data-bs-toggle="tab"], .${CLASS_NAME_ACTIVE}[data-bs-toggle="pill"], .${CLASS_NAME_ACTIVE}[data-bs-toggle="list"]`;
  var Tab = class _Tab extends base_component_default {
    constructor(element) {
      super(element);
      this._parent = this._element.closest(SELECTOR_TAB_PANEL);
      if (!this._parent) {
        return;
      }
      this._setInitialAttributes(this._parent, this._getChildren());
      event_handler_default.on(this._element, EVENT_KEYDOWN, (event) => this._keydown(event));
    }
    // Getters
    static get NAME() {
      return NAME;
    }
    // Public
    show() {
      const innerElem = this._element;
      if (this._elemIsActive(innerElem)) {
        return;
      }
      const active = this._getActiveElem();
      const hideEvent = active ? event_handler_default.trigger(active, EVENT_HIDE, { relatedTarget: innerElem }) : null;
      const showEvent = event_handler_default.trigger(innerElem, EVENT_SHOW, { relatedTarget: active });
      if (showEvent.defaultPrevented || hideEvent && hideEvent.defaultPrevented) {
        return;
      }
      this._deactivate(active, innerElem);
      this._activate(innerElem, active);
    }
    // Private
    _activate(element, relatedElem) {
      if (!element) {
        return;
      }
      element.classList.add(CLASS_NAME_ACTIVE);
      this._activate(selector_engine_default.getElementFromSelector(element));
      const complete = () => {
        if (element.getAttribute("role") !== "tab") {
          element.classList.add(CLASS_NAME_SHOW);
          return;
        }
        element.removeAttribute("tabindex");
        element.setAttribute("aria-selected", true);
        this._toggleDropDown(element, true);
        event_handler_default.trigger(element, EVENT_SHOWN, {
          relatedTarget: relatedElem
        });
      };
      this._queueCallback(complete, element, element.classList.contains(CLASS_NAME_FADE));
    }
    _deactivate(element, relatedElem) {
      if (!element) {
        return;
      }
      element.classList.remove(CLASS_NAME_ACTIVE);
      element.blur();
      this._deactivate(selector_engine_default.getElementFromSelector(element));
      const complete = () => {
        if (element.getAttribute("role") !== "tab") {
          element.classList.remove(CLASS_NAME_SHOW);
          return;
        }
        element.setAttribute("aria-selected", false);
        element.setAttribute("tabindex", "-1");
        this._toggleDropDown(element, false);
        event_handler_default.trigger(element, EVENT_HIDDEN, { relatedTarget: relatedElem });
      };
      this._queueCallback(complete, element, element.classList.contains(CLASS_NAME_FADE));
    }
    _keydown(event) {
      if (![ARROW_LEFT_KEY, ARROW_RIGHT_KEY, ARROW_UP_KEY, ARROW_DOWN_KEY, HOME_KEY, END_KEY].includes(event.key)) {
        return;
      }
      event.stopPropagation();
      event.preventDefault();
      const children = this._getChildren().filter((element) => !isDisabled(element));
      let nextActiveElement;
      if ([HOME_KEY, END_KEY].includes(event.key)) {
        nextActiveElement = children[event.key === HOME_KEY ? 0 : children.length - 1];
      } else {
        const isNext = [ARROW_RIGHT_KEY, ARROW_DOWN_KEY].includes(event.key);
        nextActiveElement = getNextActiveElement(children, event.target, isNext, true);
      }
      if (nextActiveElement) {
        nextActiveElement.focus({ preventScroll: true });
        _Tab.getOrCreateInstance(nextActiveElement).show();
      }
    }
    _getChildren() {
      return selector_engine_default.find(SELECTOR_INNER_ELEM, this._parent);
    }
    _getActiveElem() {
      return this._getChildren().find((child) => this._elemIsActive(child)) || null;
    }
    _setInitialAttributes(parent, children) {
      this._setAttributeIfNotExists(parent, "role", "tablist");
      for (const child of children) {
        this._setInitialAttributesOnChild(child);
      }
    }
    _setInitialAttributesOnChild(child) {
      child = this._getInnerElement(child);
      const isActive = this._elemIsActive(child);
      const outerElem = this._getOuterElement(child);
      child.setAttribute("aria-selected", isActive);
      if (outerElem !== child) {
        this._setAttributeIfNotExists(outerElem, "role", "presentation");
      }
      if (!isActive) {
        child.setAttribute("tabindex", "-1");
      }
      this._setAttributeIfNotExists(child, "role", "tab");
      this._setInitialAttributesOnTargetPanel(child);
    }
    _setInitialAttributesOnTargetPanel(child) {
      const target = selector_engine_default.getElementFromSelector(child);
      if (!target) {
        return;
      }
      this._setAttributeIfNotExists(target, "role", "tabpanel");
      if (child.id) {
        this._setAttributeIfNotExists(target, "aria-labelledby", `${child.id}`);
      }
    }
    _toggleDropDown(element, open) {
      const outerElem = this._getOuterElement(element);
      if (!outerElem.classList.contains(CLASS_DROPDOWN)) {
        return;
      }
      const toggle = (selector, className) => {
        const element2 = selector_engine_default.findOne(selector, outerElem);
        if (element2) {
          element2.classList.toggle(className, open);
        }
      };
      toggle(SELECTOR_DROPDOWN_TOGGLE, CLASS_NAME_ACTIVE);
      toggle(SELECTOR_DROPDOWN_MENU, CLASS_NAME_SHOW);
      outerElem.setAttribute("aria-expanded", open);
    }
    _setAttributeIfNotExists(element, attribute, value) {
      if (!element.hasAttribute(attribute)) {
        element.setAttribute(attribute, value);
      }
    }
    _elemIsActive(elem) {
      return elem.classList.contains(CLASS_NAME_ACTIVE);
    }
    // Try to get the inner element (usually the .nav-link)
    _getInnerElement(elem) {
      return elem.matches(SELECTOR_INNER_ELEM) ? elem : selector_engine_default.findOne(SELECTOR_INNER_ELEM, elem);
    }
    // Try to get the outer element (usually the .nav-item)
    _getOuterElement(elem) {
      return elem.closest(SELECTOR_OUTER) || elem;
    }
    // Static
    static jQueryInterface(config) {
      return this.each(function() {
        const data = _Tab.getOrCreateInstance(this);
        if (typeof config !== "string") {
          return;
        }
        if (data[config] === void 0 || config.startsWith("_") || config === "constructor") {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config]();
      });
    }
  };
  event_handler_default.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function(event) {
    if (["A", "AREA"].includes(this.tagName)) {
      event.preventDefault();
    }
    if (isDisabled(this)) {
      return;
    }
    Tab.getOrCreateInstance(this).show();
  });
  event_handler_default.on(window, EVENT_LOAD_DATA_API, () => {
    for (const element of selector_engine_default.find(SELECTOR_DATA_TOGGLE_ACTIVE)) {
      Tab.getOrCreateInstance(element);
    }
  });
  defineJQueryPlugin(Tab);
  var tab_default = Tab;

  // ns-hugo:C:\Users\steveyout\AppData\Local\hugo_cache\modules\filecache\modules\pkg\mod\github.com\twbs\bootstrap@v5.3.2+incompatible\js\src\collapse.js
  var NAME2 = "collapse";
  var DATA_KEY2 = "bs.collapse";
  var EVENT_KEY2 = `.${DATA_KEY2}`;
  var DATA_API_KEY = ".data-api";
  var EVENT_SHOW2 = `show${EVENT_KEY2}`;
  var EVENT_SHOWN2 = `shown${EVENT_KEY2}`;
  var EVENT_HIDE2 = `hide${EVENT_KEY2}`;
  var EVENT_HIDDEN2 = `hidden${EVENT_KEY2}`;
  var EVENT_CLICK_DATA_API2 = `click${EVENT_KEY2}${DATA_API_KEY}`;
  var CLASS_NAME_SHOW2 = "show";
  var CLASS_NAME_COLLAPSE = "collapse";
  var CLASS_NAME_COLLAPSING = "collapsing";
  var CLASS_NAME_COLLAPSED = "collapsed";
  var CLASS_NAME_DEEPER_CHILDREN = `:scope .${CLASS_NAME_COLLAPSE} .${CLASS_NAME_COLLAPSE}`;
  var CLASS_NAME_HORIZONTAL = "collapse-horizontal";
  var WIDTH = "width";
  var HEIGHT = "height";
  var SELECTOR_ACTIVES = ".collapse.show, .collapse.collapsing";
  var SELECTOR_DATA_TOGGLE2 = '[data-bs-toggle="collapse"]';
  var Default = {
    parent: null,
    toggle: true
  };
  var DefaultType = {
    parent: "(null|element)",
    toggle: "boolean"
  };
  var Collapse = class _Collapse extends base_component_default {
    constructor(element, config) {
      super(element, config);
      this._isTransitioning = false;
      this._triggerArray = [];
      const toggleList = selector_engine_default.find(SELECTOR_DATA_TOGGLE2);
      for (const elem of toggleList) {
        const selector = selector_engine_default.getSelectorFromElement(elem);
        const filterElement = selector_engine_default.find(selector).filter((foundElement) => foundElement === this._element);
        if (selector !== null && filterElement.length) {
          this._triggerArray.push(elem);
        }
      }
      this._initializeChildren();
      if (!this._config.parent) {
        this._addAriaAndCollapsedClass(this._triggerArray, this._isShown());
      }
      if (this._config.toggle) {
        this.toggle();
      }
    }
    // Getters
    static get Default() {
      return Default;
    }
    static get DefaultType() {
      return DefaultType;
    }
    static get NAME() {
      return NAME2;
    }
    // Public
    toggle() {
      if (this._isShown()) {
        this.hide();
      } else {
        this.show();
      }
    }
    show() {
      if (this._isTransitioning || this._isShown()) {
        return;
      }
      let activeChildren = [];
      if (this._config.parent) {
        activeChildren = this._getFirstLevelChildren(SELECTOR_ACTIVES).filter((element) => element !== this._element).map((element) => _Collapse.getOrCreateInstance(element, { toggle: false }));
      }
      if (activeChildren.length && activeChildren[0]._isTransitioning) {
        return;
      }
      const startEvent = event_handler_default.trigger(this._element, EVENT_SHOW2);
      if (startEvent.defaultPrevented) {
        return;
      }
      for (const activeInstance of activeChildren) {
        activeInstance.hide();
      }
      const dimension = this._getDimension();
      this._element.classList.remove(CLASS_NAME_COLLAPSE);
      this._element.classList.add(CLASS_NAME_COLLAPSING);
      this._element.style[dimension] = 0;
      this._addAriaAndCollapsedClass(this._triggerArray, true);
      this._isTransitioning = true;
      const complete = () => {
        this._isTransitioning = false;
        this._element.classList.remove(CLASS_NAME_COLLAPSING);
        this._element.classList.add(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW2);
        this._element.style[dimension] = "";
        event_handler_default.trigger(this._element, EVENT_SHOWN2);
      };
      const capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
      const scrollSize = `scroll${capitalizedDimension}`;
      this._queueCallback(complete, this._element, true);
      this._element.style[dimension] = `${this._element[scrollSize]}px`;
    }
    hide() {
      if (this._isTransitioning || !this._isShown()) {
        return;
      }
      const startEvent = event_handler_default.trigger(this._element, EVENT_HIDE2);
      if (startEvent.defaultPrevented) {
        return;
      }
      const dimension = this._getDimension();
      this._element.style[dimension] = `${this._element.getBoundingClientRect()[dimension]}px`;
      reflow(this._element);
      this._element.classList.add(CLASS_NAME_COLLAPSING);
      this._element.classList.remove(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW2);
      for (const trigger of this._triggerArray) {
        const element = selector_engine_default.getElementFromSelector(trigger);
        if (element && !this._isShown(element)) {
          this._addAriaAndCollapsedClass([trigger], false);
        }
      }
      this._isTransitioning = true;
      const complete = () => {
        this._isTransitioning = false;
        this._element.classList.remove(CLASS_NAME_COLLAPSING);
        this._element.classList.add(CLASS_NAME_COLLAPSE);
        event_handler_default.trigger(this._element, EVENT_HIDDEN2);
      };
      this._element.style[dimension] = "";
      this._queueCallback(complete, this._element, true);
    }
    _isShown(element = this._element) {
      return element.classList.contains(CLASS_NAME_SHOW2);
    }
    // Private
    _configAfterMerge(config) {
      config.toggle = Boolean(config.toggle);
      config.parent = getElement(config.parent);
      return config;
    }
    _getDimension() {
      return this._element.classList.contains(CLASS_NAME_HORIZONTAL) ? WIDTH : HEIGHT;
    }
    _initializeChildren() {
      if (!this._config.parent) {
        return;
      }
      const children = this._getFirstLevelChildren(SELECTOR_DATA_TOGGLE2);
      for (const element of children) {
        const selected = selector_engine_default.getElementFromSelector(element);
        if (selected) {
          this._addAriaAndCollapsedClass([element], this._isShown(selected));
        }
      }
    }
    _getFirstLevelChildren(selector) {
      const children = selector_engine_default.find(CLASS_NAME_DEEPER_CHILDREN, this._config.parent);
      return selector_engine_default.find(selector, this._config.parent).filter((element) => !children.includes(element));
    }
    _addAriaAndCollapsedClass(triggerArray, isOpen) {
      if (!triggerArray.length) {
        return;
      }
      for (const element of triggerArray) {
        element.classList.toggle(CLASS_NAME_COLLAPSED, !isOpen);
        element.setAttribute("aria-expanded", isOpen);
      }
    }
    // Static
    static jQueryInterface(config) {
      const _config = {};
      if (typeof config === "string" && /show|hide/.test(config)) {
        _config.toggle = false;
      }
      return this.each(function() {
        const data = _Collapse.getOrCreateInstance(this, _config);
        if (typeof config === "string") {
          if (typeof data[config] === "undefined") {
            throw new TypeError(`No method named "${config}"`);
          }
          data[config]();
        }
      });
    }
  };
  event_handler_default.on(document, EVENT_CLICK_DATA_API2, SELECTOR_DATA_TOGGLE2, function(event) {
    if (event.target.tagName === "A" || event.delegateTarget && event.delegateTarget.tagName === "A") {
      event.preventDefault();
    }
    for (const element of selector_engine_default.getMultipleElementsFromSelector(this)) {
      Collapse.getOrCreateInstance(element, { toggle: false }).toggle();
    }
  });
  defineJQueryPlugin(Collapse);
  var collapse_default = Collapse;

  // ns-hugo:C:\Users\steveyout\AppData\Local\hugo_cache\modules\filecache\modules\pkg\mod\github.com\twbs\bootstrap@v5.3.2+incompatible\js\src\dropdown.js
  var Popper = __toESM(require_popper());
  var NAME3 = "dropdown";
  var DATA_KEY3 = "bs.dropdown";
  var EVENT_KEY3 = `.${DATA_KEY3}`;
  var DATA_API_KEY2 = ".data-api";
  var ESCAPE_KEY = "Escape";
  var TAB_KEY = "Tab";
  var ARROW_UP_KEY2 = "ArrowUp";
  var ARROW_DOWN_KEY2 = "ArrowDown";
  var RIGHT_MOUSE_BUTTON = 2;
  var EVENT_HIDE3 = `hide${EVENT_KEY3}`;
  var EVENT_HIDDEN3 = `hidden${EVENT_KEY3}`;
  var EVENT_SHOW3 = `show${EVENT_KEY3}`;
  var EVENT_SHOWN3 = `shown${EVENT_KEY3}`;
  var EVENT_CLICK_DATA_API3 = `click${EVENT_KEY3}${DATA_API_KEY2}`;
  var EVENT_KEYDOWN_DATA_API = `keydown${EVENT_KEY3}${DATA_API_KEY2}`;
  var EVENT_KEYUP_DATA_API = `keyup${EVENT_KEY3}${DATA_API_KEY2}`;
  var CLASS_NAME_SHOW3 = "show";
  var CLASS_NAME_DROPUP = "dropup";
  var CLASS_NAME_DROPEND = "dropend";
  var CLASS_NAME_DROPSTART = "dropstart";
  var CLASS_NAME_DROPUP_CENTER = "dropup-center";
  var CLASS_NAME_DROPDOWN_CENTER = "dropdown-center";
  var SELECTOR_DATA_TOGGLE3 = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)';
  var SELECTOR_DATA_TOGGLE_SHOWN = `${SELECTOR_DATA_TOGGLE3}.${CLASS_NAME_SHOW3}`;
  var SELECTOR_MENU = ".dropdown-menu";
  var SELECTOR_NAVBAR = ".navbar";
  var SELECTOR_NAVBAR_NAV = ".navbar-nav";
  var SELECTOR_VISIBLE_ITEMS = ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)";
  var PLACEMENT_TOP = isRTL() ? "top-end" : "top-start";
  var PLACEMENT_TOPEND = isRTL() ? "top-start" : "top-end";
  var PLACEMENT_BOTTOM = isRTL() ? "bottom-end" : "bottom-start";
  var PLACEMENT_BOTTOMEND = isRTL() ? "bottom-start" : "bottom-end";
  var PLACEMENT_RIGHT = isRTL() ? "left-start" : "right-start";
  var PLACEMENT_LEFT = isRTL() ? "right-start" : "left-start";
  var PLACEMENT_TOPCENTER = "top";
  var PLACEMENT_BOTTOMCENTER = "bottom";
  var Default2 = {
    autoClose: true,
    boundary: "clippingParents",
    display: "dynamic",
    offset: [0, 2],
    popperConfig: null,
    reference: "toggle"
  };
  var DefaultType2 = {
    autoClose: "(boolean|string)",
    boundary: "(string|element)",
    display: "string",
    offset: "(array|string|function)",
    popperConfig: "(null|object|function)",
    reference: "(string|element|object)"
  };
  var Dropdown = class _Dropdown extends base_component_default {
    constructor(element, config) {
      super(element, config);
      this._popper = null;
      this._parent = this._element.parentNode;
      this._menu = selector_engine_default.next(this._element, SELECTOR_MENU)[0] || selector_engine_default.prev(this._element, SELECTOR_MENU)[0] || selector_engine_default.findOne(SELECTOR_MENU, this._parent);
      this._inNavbar = this._detectNavbar();
    }
    // Getters
    static get Default() {
      return Default2;
    }
    static get DefaultType() {
      return DefaultType2;
    }
    static get NAME() {
      return NAME3;
    }
    // Public
    toggle() {
      return this._isShown() ? this.hide() : this.show();
    }
    show() {
      if (isDisabled(this._element) || this._isShown()) {
        return;
      }
      const relatedTarget = {
        relatedTarget: this._element
      };
      const showEvent = event_handler_default.trigger(this._element, EVENT_SHOW3, relatedTarget);
      if (showEvent.defaultPrevented) {
        return;
      }
      this._createPopper();
      if ("ontouchstart" in document.documentElement && !this._parent.closest(SELECTOR_NAVBAR_NAV)) {
        for (const element of [].concat(...document.body.children)) {
          event_handler_default.on(element, "mouseover", noop);
        }
      }
      this._element.focus();
      this._element.setAttribute("aria-expanded", true);
      this._menu.classList.add(CLASS_NAME_SHOW3);
      this._element.classList.add(CLASS_NAME_SHOW3);
      event_handler_default.trigger(this._element, EVENT_SHOWN3, relatedTarget);
    }
    hide() {
      if (isDisabled(this._element) || !this._isShown()) {
        return;
      }
      const relatedTarget = {
        relatedTarget: this._element
      };
      this._completeHide(relatedTarget);
    }
    dispose() {
      if (this._popper) {
        this._popper.destroy();
      }
      super.dispose();
    }
    update() {
      this._inNavbar = this._detectNavbar();
      if (this._popper) {
        this._popper.update();
      }
    }
    // Private
    _completeHide(relatedTarget) {
      const hideEvent = event_handler_default.trigger(this._element, EVENT_HIDE3, relatedTarget);
      if (hideEvent.defaultPrevented) {
        return;
      }
      if ("ontouchstart" in document.documentElement) {
        for (const element of [].concat(...document.body.children)) {
          event_handler_default.off(element, "mouseover", noop);
        }
      }
      if (this._popper) {
        this._popper.destroy();
      }
      this._menu.classList.remove(CLASS_NAME_SHOW3);
      this._element.classList.remove(CLASS_NAME_SHOW3);
      this._element.setAttribute("aria-expanded", "false");
      manipulator_default.removeDataAttribute(this._menu, "popper");
      event_handler_default.trigger(this._element, EVENT_HIDDEN3, relatedTarget);
    }
    _getConfig(config) {
      config = super._getConfig(config);
      if (typeof config.reference === "object" && !isElement(config.reference) && typeof config.reference.getBoundingClientRect !== "function") {
        throw new TypeError(`${NAME3.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);
      }
      return config;
    }
    _createPopper() {
      if (typeof Popper === "undefined") {
        throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org)");
      }
      let referenceElement = this._element;
      if (this._config.reference === "parent") {
        referenceElement = this._parent;
      } else if (isElement(this._config.reference)) {
        referenceElement = getElement(this._config.reference);
      } else if (typeof this._config.reference === "object") {
        referenceElement = this._config.reference;
      }
      const popperConfig = this._getPopperConfig();
      this._popper = Popper.createPopper(referenceElement, this._menu, popperConfig);
    }
    _isShown() {
      return this._menu.classList.contains(CLASS_NAME_SHOW3);
    }
    _getPlacement() {
      const parentDropdown = this._parent;
      if (parentDropdown.classList.contains(CLASS_NAME_DROPEND)) {
        return PLACEMENT_RIGHT;
      }
      if (parentDropdown.classList.contains(CLASS_NAME_DROPSTART)) {
        return PLACEMENT_LEFT;
      }
      if (parentDropdown.classList.contains(CLASS_NAME_DROPUP_CENTER)) {
        return PLACEMENT_TOPCENTER;
      }
      if (parentDropdown.classList.contains(CLASS_NAME_DROPDOWN_CENTER)) {
        return PLACEMENT_BOTTOMCENTER;
      }
      const isEnd = getComputedStyle(this._menu).getPropertyValue("--bs-position").trim() === "end";
      if (parentDropdown.classList.contains(CLASS_NAME_DROPUP)) {
        return isEnd ? PLACEMENT_TOPEND : PLACEMENT_TOP;
      }
      return isEnd ? PLACEMENT_BOTTOMEND : PLACEMENT_BOTTOM;
    }
    _detectNavbar() {
      return this._element.closest(SELECTOR_NAVBAR) !== null;
    }
    _getOffset() {
      const { offset } = this._config;
      if (typeof offset === "string") {
        return offset.split(",").map((value) => Number.parseInt(value, 10));
      }
      if (typeof offset === "function") {
        return (popperData) => offset(popperData, this._element);
      }
      return offset;
    }
    _getPopperConfig() {
      const defaultBsPopperConfig = {
        placement: this._getPlacement(),
        modifiers: [
          {
            name: "preventOverflow",
            options: {
              boundary: this._config.boundary
            }
          },
          {
            name: "offset",
            options: {
              offset: this._getOffset()
            }
          }
        ]
      };
      if (this._inNavbar || this._config.display === "static") {
        manipulator_default.setDataAttribute(this._menu, "popper", "static");
        defaultBsPopperConfig.modifiers = [{
          name: "applyStyles",
          enabled: false
        }];
      }
      return {
        ...defaultBsPopperConfig,
        ...execute(this._config.popperConfig, [defaultBsPopperConfig])
      };
    }
    _selectMenuItem({ key, target }) {
      const items = selector_engine_default.find(SELECTOR_VISIBLE_ITEMS, this._menu).filter((element) => isVisible(element));
      if (!items.length) {
        return;
      }
      getNextActiveElement(items, target, key === ARROW_DOWN_KEY2, !items.includes(target)).focus();
    }
    // Static
    static jQueryInterface(config) {
      return this.each(function() {
        const data = _Dropdown.getOrCreateInstance(this, config);
        if (typeof config !== "string") {
          return;
        }
        if (typeof data[config] === "undefined") {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config]();
      });
    }
    static clearMenus(event) {
      if (event.button === RIGHT_MOUSE_BUTTON || event.type === "keyup" && event.key !== TAB_KEY) {
        return;
      }
      const openToggles = selector_engine_default.find(SELECTOR_DATA_TOGGLE_SHOWN);
      for (const toggle of openToggles) {
        const context = _Dropdown.getInstance(toggle);
        if (!context || context._config.autoClose === false) {
          continue;
        }
        const composedPath = event.composedPath();
        const isMenuTarget = composedPath.includes(context._menu);
        if (composedPath.includes(context._element) || context._config.autoClose === "inside" && !isMenuTarget || context._config.autoClose === "outside" && isMenuTarget) {
          continue;
        }
        if (context._menu.contains(event.target) && (event.type === "keyup" && event.key === TAB_KEY || /input|select|option|textarea|form/i.test(event.target.tagName))) {
          continue;
        }
        const relatedTarget = { relatedTarget: context._element };
        if (event.type === "click") {
          relatedTarget.clickEvent = event;
        }
        context._completeHide(relatedTarget);
      }
    }
    static dataApiKeydownHandler(event) {
      const isInput = /input|textarea/i.test(event.target.tagName);
      const isEscapeEvent = event.key === ESCAPE_KEY;
      const isUpOrDownEvent = [ARROW_UP_KEY2, ARROW_DOWN_KEY2].includes(event.key);
      if (!isUpOrDownEvent && !isEscapeEvent) {
        return;
      }
      if (isInput && !isEscapeEvent) {
        return;
      }
      event.preventDefault();
      const getToggleButton = this.matches(SELECTOR_DATA_TOGGLE3) ? this : selector_engine_default.prev(this, SELECTOR_DATA_TOGGLE3)[0] || selector_engine_default.next(this, SELECTOR_DATA_TOGGLE3)[0] || selector_engine_default.findOne(SELECTOR_DATA_TOGGLE3, event.delegateTarget.parentNode);
      const instance = _Dropdown.getOrCreateInstance(getToggleButton);
      if (isUpOrDownEvent) {
        event.stopPropagation();
        instance.show();
        instance._selectMenuItem(event);
        return;
      }
      if (instance._isShown()) {
        event.stopPropagation();
        instance.hide();
        getToggleButton.focus();
      }
    }
  };
  event_handler_default.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_DATA_TOGGLE3, Dropdown.dataApiKeydownHandler);
  event_handler_default.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_MENU, Dropdown.dataApiKeydownHandler);
  event_handler_default.on(document, EVENT_CLICK_DATA_API3, Dropdown.clearMenus);
  event_handler_default.on(document, EVENT_KEYUP_DATA_API, Dropdown.clearMenus);
  event_handler_default.on(document, EVENT_CLICK_DATA_API3, SELECTOR_DATA_TOGGLE3, function(event) {
    event.preventDefault();
    Dropdown.getOrCreateInstance(this).toggle();
  });
  defineJQueryPlugin(Dropdown);
  var dropdown_default = Dropdown;

  // ns-hugo:C:\Users\steveyout\AppData\Local\hugo_cache\modules\filecache\modules\pkg\mod\github.com\twbs\bootstrap@v5.3.2+incompatible\js\src\scrollspy.js
  var NAME4 = "scrollspy";
  var DATA_KEY4 = "bs.scrollspy";
  var EVENT_KEY4 = `.${DATA_KEY4}`;
  var DATA_API_KEY3 = ".data-api";
  var EVENT_ACTIVATE = `activate${EVENT_KEY4}`;
  var EVENT_CLICK = `click${EVENT_KEY4}`;
  var EVENT_LOAD_DATA_API2 = `load${EVENT_KEY4}${DATA_API_KEY3}`;
  var CLASS_NAME_DROPDOWN_ITEM = "dropdown-item";
  var CLASS_NAME_ACTIVE2 = "active";
  var SELECTOR_DATA_SPY = '[data-bs-spy="scroll"]';
  var SELECTOR_TARGET_LINKS = "[href]";
  var SELECTOR_NAV_LIST_GROUP = ".nav, .list-group";
  var SELECTOR_NAV_LINKS = ".nav-link";
  var SELECTOR_NAV_ITEMS = ".nav-item";
  var SELECTOR_LIST_ITEMS = ".list-group-item";
  var SELECTOR_LINK_ITEMS = `${SELECTOR_NAV_LINKS}, ${SELECTOR_NAV_ITEMS} > ${SELECTOR_NAV_LINKS}, ${SELECTOR_LIST_ITEMS}`;
  var SELECTOR_DROPDOWN = ".dropdown";
  var SELECTOR_DROPDOWN_TOGGLE2 = ".dropdown-toggle";
  var Default3 = {
    offset: null,
    // TODO: v6 @deprecated, keep it for backwards compatibility reasons
    rootMargin: "0px 0px -25%",
    smoothScroll: false,
    target: null,
    threshold: [0.1, 0.5, 1]
  };
  var DefaultType3 = {
    offset: "(number|null)",
    // TODO v6 @deprecated, keep it for backwards compatibility reasons
    rootMargin: "string",
    smoothScroll: "boolean",
    target: "element",
    threshold: "array"
  };
  var ScrollSpy = class _ScrollSpy extends base_component_default {
    constructor(element, config) {
      super(element, config);
      this._targetLinks = /* @__PURE__ */ new Map();
      this._observableSections = /* @__PURE__ */ new Map();
      this._rootElement = getComputedStyle(this._element).overflowY === "visible" ? null : this._element;
      this._activeTarget = null;
      this._observer = null;
      this._previousScrollData = {
        visibleEntryTop: 0,
        parentScrollTop: 0
      };
      this.refresh();
    }
    // Getters
    static get Default() {
      return Default3;
    }
    static get DefaultType() {
      return DefaultType3;
    }
    static get NAME() {
      return NAME4;
    }
    // Public
    refresh() {
      this._initializeTargetsAndObservables();
      this._maybeEnableSmoothScroll();
      if (this._observer) {
        this._observer.disconnect();
      } else {
        this._observer = this._getNewObserver();
      }
      for (const section of this._observableSections.values()) {
        this._observer.observe(section);
      }
    }
    dispose() {
      this._observer.disconnect();
      super.dispose();
    }
    // Private
    _configAfterMerge(config) {
      config.target = getElement(config.target) || document.body;
      config.rootMargin = config.offset ? `${config.offset}px 0px -30%` : config.rootMargin;
      if (typeof config.threshold === "string") {
        config.threshold = config.threshold.split(",").map((value) => Number.parseFloat(value));
      }
      return config;
    }
    _maybeEnableSmoothScroll() {
      if (!this._config.smoothScroll) {
        return;
      }
      event_handler_default.off(this._config.target, EVENT_CLICK);
      event_handler_default.on(this._config.target, EVENT_CLICK, SELECTOR_TARGET_LINKS, (event) => {
        const observableSection = this._observableSections.get(event.target.hash);
        if (observableSection) {
          event.preventDefault();
          const root = this._rootElement || window;
          const height = observableSection.offsetTop - this._element.offsetTop;
          if (root.scrollTo) {
            root.scrollTo({ top: height, behavior: "smooth" });
            return;
          }
          root.scrollTop = height;
        }
      });
    }
    _getNewObserver() {
      const options = {
        root: this._rootElement,
        threshold: this._config.threshold,
        rootMargin: this._config.rootMargin
      };
      return new IntersectionObserver((entries) => this._observerCallback(entries), options);
    }
    // The logic of selection
    _observerCallback(entries) {
      const targetElement = (entry) => this._targetLinks.get(`#${entry.target.id}`);
      const activate = (entry) => {
        this._previousScrollData.visibleEntryTop = entry.target.offsetTop;
        this._process(targetElement(entry));
      };
      const parentScrollTop = (this._rootElement || document.documentElement).scrollTop;
      const userScrollsDown = parentScrollTop >= this._previousScrollData.parentScrollTop;
      this._previousScrollData.parentScrollTop = parentScrollTop;
      for (const entry of entries) {
        if (!entry.isIntersecting) {
          this._activeTarget = null;
          this._clearActiveClass(targetElement(entry));
          continue;
        }
        const entryIsLowerThanPrevious = entry.target.offsetTop >= this._previousScrollData.visibleEntryTop;
        if (userScrollsDown && entryIsLowerThanPrevious) {
          activate(entry);
          if (!parentScrollTop) {
            return;
          }
          continue;
        }
        if (!userScrollsDown && !entryIsLowerThanPrevious) {
          activate(entry);
        }
      }
    }
    _initializeTargetsAndObservables() {
      this._targetLinks = /* @__PURE__ */ new Map();
      this._observableSections = /* @__PURE__ */ new Map();
      const targetLinks = selector_engine_default.find(SELECTOR_TARGET_LINKS, this._config.target);
      for (const anchor of targetLinks) {
        if (!anchor.hash || isDisabled(anchor)) {
          continue;
        }
        const observableSection = selector_engine_default.findOne(decodeURI(anchor.hash), this._element);
        if (isVisible(observableSection)) {
          this._targetLinks.set(decodeURI(anchor.hash), anchor);
          this._observableSections.set(anchor.hash, observableSection);
        }
      }
    }
    _process(target) {
      if (this._activeTarget === target) {
        return;
      }
      this._clearActiveClass(this._config.target);
      this._activeTarget = target;
      target.classList.add(CLASS_NAME_ACTIVE2);
      this._activateParents(target);
      event_handler_default.trigger(this._element, EVENT_ACTIVATE, { relatedTarget: target });
    }
    _activateParents(target) {
      if (target.classList.contains(CLASS_NAME_DROPDOWN_ITEM)) {
        selector_engine_default.findOne(SELECTOR_DROPDOWN_TOGGLE2, target.closest(SELECTOR_DROPDOWN)).classList.add(CLASS_NAME_ACTIVE2);
        return;
      }
      for (const listGroup of selector_engine_default.parents(target, SELECTOR_NAV_LIST_GROUP)) {
        for (const item of selector_engine_default.prev(listGroup, SELECTOR_LINK_ITEMS)) {
          item.classList.add(CLASS_NAME_ACTIVE2);
        }
      }
    }
    _clearActiveClass(parent) {
      parent.classList.remove(CLASS_NAME_ACTIVE2);
      const activeNodes = selector_engine_default.find(`${SELECTOR_TARGET_LINKS}.${CLASS_NAME_ACTIVE2}`, parent);
      for (const node of activeNodes) {
        node.classList.remove(CLASS_NAME_ACTIVE2);
      }
    }
    // Static
    static jQueryInterface(config) {
      return this.each(function() {
        const data = _ScrollSpy.getOrCreateInstance(this, config);
        if (typeof config !== "string") {
          return;
        }
        if (data[config] === void 0 || config.startsWith("_") || config === "constructor") {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config]();
      });
    }
  };
  event_handler_default.on(window, EVENT_LOAD_DATA_API2, () => {
    for (const spy of selector_engine_default.find(SELECTOR_DATA_SPY)) {
      ScrollSpy.getOrCreateInstance(spy);
    }
  });
  defineJQueryPlugin(ScrollSpy);
  var scrollspy_default = ScrollSpy;

  // ns-hugo:C:\Users\steveyout\AppData\Local\hugo_cache\modules\filecache\modules\pkg\mod\github.com\twbs\bootstrap@v5.3.2+incompatible\js\src\tooltip.js
  var Popper2 = __toESM(require_popper());

  // ns-hugo:C:\Users\steveyout\AppData\Local\hugo_cache\modules\filecache\modules\pkg\mod\github.com\twbs\bootstrap@v5.3.2+incompatible\js\src\util\sanitizer.js
  var ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;
  var DefaultAllowlist = {
    // Global attributes allowed on any supplied element below.
    "*": ["class", "dir", "id", "lang", "role", ARIA_ATTRIBUTE_PATTERN],
    a: ["target", "href", "title", "rel"],
    area: [],
    b: [],
    br: [],
    col: [],
    code: [],
    div: [],
    em: [],
    hr: [],
    h1: [],
    h2: [],
    h3: [],
    h4: [],
    h5: [],
    h6: [],
    i: [],
    img: ["src", "srcset", "alt", "title", "width", "height"],
    li: [],
    ol: [],
    p: [],
    pre: [],
    s: [],
    small: [],
    span: [],
    sub: [],
    sup: [],
    strong: [],
    u: [],
    ul: []
  };
  var uriAttributes = /* @__PURE__ */ new Set([
    "background",
    "cite",
    "href",
    "itemtype",
    "longdesc",
    "poster",
    "src",
    "xlink:href"
  ]);
  var SAFE_URL_PATTERN = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:/?#]*(?:[/?#]|$))/i;
  var allowedAttribute = (attribute, allowedAttributeList) => {
    const attributeName = attribute.nodeName.toLowerCase();
    if (allowedAttributeList.includes(attributeName)) {
      if (uriAttributes.has(attributeName)) {
        return Boolean(SAFE_URL_PATTERN.test(attribute.nodeValue));
      }
      return true;
    }
    return allowedAttributeList.filter((attributeRegex) => attributeRegex instanceof RegExp).some((regex) => regex.test(attributeName));
  };
  function sanitizeHtml(unsafeHtml, allowList, sanitizeFunction) {
    if (!unsafeHtml.length) {
      return unsafeHtml;
    }
    if (sanitizeFunction && typeof sanitizeFunction === "function") {
      return sanitizeFunction(unsafeHtml);
    }
    const domParser = new window.DOMParser();
    const createdDocument = domParser.parseFromString(unsafeHtml, "text/html");
    const elements = [].concat(...createdDocument.body.querySelectorAll("*"));
    for (const element of elements) {
      const elementName = element.nodeName.toLowerCase();
      if (!Object.keys(allowList).includes(elementName)) {
        element.remove();
        continue;
      }
      const attributeList = [].concat(...element.attributes);
      const allowedAttributes = [].concat(allowList["*"] || [], allowList[elementName] || []);
      for (const attribute of attributeList) {
        if (!allowedAttribute(attribute, allowedAttributes)) {
          element.removeAttribute(attribute.nodeName);
        }
      }
    }
    return createdDocument.body.innerHTML;
  }

  // ns-hugo:C:\Users\steveyout\AppData\Local\hugo_cache\modules\filecache\modules\pkg\mod\github.com\twbs\bootstrap@v5.3.2+incompatible\js\src\util\template-factory.js
  var NAME5 = "TemplateFactory";
  var Default4 = {
    allowList: DefaultAllowlist,
    content: {},
    // { selector : text ,  selector2 : text2 , }
    extraClass: "",
    html: false,
    sanitize: true,
    sanitizeFn: null,
    template: "<div></div>"
  };
  var DefaultType4 = {
    allowList: "object",
    content: "object",
    extraClass: "(string|function)",
    html: "boolean",
    sanitize: "boolean",
    sanitizeFn: "(null|function)",
    template: "string"
  };
  var DefaultContentType = {
    entry: "(string|element|function|null)",
    selector: "(string|element)"
  };
  var TemplateFactory = class extends config_default {
    constructor(config) {
      super();
      this._config = this._getConfig(config);
    }
    // Getters
    static get Default() {
      return Default4;
    }
    static get DefaultType() {
      return DefaultType4;
    }
    static get NAME() {
      return NAME5;
    }
    // Public
    getContent() {
      return Object.values(this._config.content).map((config) => this._resolvePossibleFunction(config)).filter(Boolean);
    }
    hasContent() {
      return this.getContent().length > 0;
    }
    changeContent(content) {
      this._checkContent(content);
      this._config.content = { ...this._config.content, ...content };
      return this;
    }
    toHtml() {
      const templateWrapper = document.createElement("div");
      templateWrapper.innerHTML = this._maybeSanitize(this._config.template);
      for (const [selector, text] of Object.entries(this._config.content)) {
        this._setContent(templateWrapper, text, selector);
      }
      const template = templateWrapper.children[0];
      const extraClass = this._resolvePossibleFunction(this._config.extraClass);
      if (extraClass) {
        template.classList.add(...extraClass.split(" "));
      }
      return template;
    }
    // Private
    _typeCheckConfig(config) {
      super._typeCheckConfig(config);
      this._checkContent(config.content);
    }
    _checkContent(arg) {
      for (const [selector, content] of Object.entries(arg)) {
        super._typeCheckConfig({ selector, entry: content }, DefaultContentType);
      }
    }
    _setContent(template, content, selector) {
      const templateElement = selector_engine_default.findOne(selector, template);
      if (!templateElement) {
        return;
      }
      content = this._resolvePossibleFunction(content);
      if (!content) {
        templateElement.remove();
        return;
      }
      if (isElement(content)) {
        this._putElementInTemplate(getElement(content), templateElement);
        return;
      }
      if (this._config.html) {
        templateElement.innerHTML = this._maybeSanitize(content);
        return;
      }
      templateElement.textContent = content;
    }
    _maybeSanitize(arg) {
      return this._config.sanitize ? sanitizeHtml(arg, this._config.allowList, this._config.sanitizeFn) : arg;
    }
    _resolvePossibleFunction(arg) {
      return execute(arg, [this]);
    }
    _putElementInTemplate(element, templateElement) {
      if (this._config.html) {
        templateElement.innerHTML = "";
        templateElement.append(element);
        return;
      }
      templateElement.textContent = element.textContent;
    }
  };
  var template_factory_default = TemplateFactory;

  // ns-hugo:C:\Users\steveyout\AppData\Local\hugo_cache\modules\filecache\modules\pkg\mod\github.com\twbs\bootstrap@v5.3.2+incompatible\js\src\tooltip.js
  var NAME6 = "tooltip";
  var DISALLOWED_ATTRIBUTES = /* @__PURE__ */ new Set(["sanitize", "allowList", "sanitizeFn"]);
  var CLASS_NAME_FADE2 = "fade";
  var CLASS_NAME_MODAL = "modal";
  var CLASS_NAME_SHOW4 = "show";
  var SELECTOR_TOOLTIP_INNER = ".tooltip-inner";
  var SELECTOR_MODAL = `.${CLASS_NAME_MODAL}`;
  var EVENT_MODAL_HIDE = "hide.bs.modal";
  var TRIGGER_HOVER = "hover";
  var TRIGGER_FOCUS = "focus";
  var TRIGGER_CLICK = "click";
  var TRIGGER_MANUAL = "manual";
  var EVENT_HIDE4 = "hide";
  var EVENT_HIDDEN4 = "hidden";
  var EVENT_SHOW4 = "show";
  var EVENT_SHOWN4 = "shown";
  var EVENT_INSERTED = "inserted";
  var EVENT_CLICK2 = "click";
  var EVENT_FOCUSIN = "focusin";
  var EVENT_FOCUSOUT = "focusout";
  var EVENT_MOUSEENTER = "mouseenter";
  var EVENT_MOUSELEAVE = "mouseleave";
  var AttachmentMap = {
    AUTO: "auto",
    TOP: "top",
    RIGHT: isRTL() ? "left" : "right",
    BOTTOM: "bottom",
    LEFT: isRTL() ? "right" : "left"
  };
  var Default5 = {
    allowList: DefaultAllowlist,
    animation: true,
    boundary: "clippingParents",
    container: false,
    customClass: "",
    delay: 0,
    fallbackPlacements: ["top", "right", "bottom", "left"],
    html: false,
    offset: [0, 6],
    placement: "top",
    popperConfig: null,
    sanitize: true,
    sanitizeFn: null,
    selector: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    title: "",
    trigger: "hover focus"
  };
  var DefaultType5 = {
    allowList: "object",
    animation: "boolean",
    boundary: "(string|element)",
    container: "(string|element|boolean)",
    customClass: "(string|function)",
    delay: "(number|object)",
    fallbackPlacements: "array",
    html: "boolean",
    offset: "(array|string|function)",
    placement: "(string|function)",
    popperConfig: "(null|object|function)",
    sanitize: "boolean",
    sanitizeFn: "(null|function)",
    selector: "(string|boolean)",
    template: "string",
    title: "(string|element|function)",
    trigger: "string"
  };
  var Tooltip = class _Tooltip extends base_component_default {
    constructor(element, config) {
      if (typeof Popper2 === "undefined") {
        throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org)");
      }
      super(element, config);
      this._isEnabled = true;
      this._timeout = 0;
      this._isHovered = null;
      this._activeTrigger = {};
      this._popper = null;
      this._templateFactory = null;
      this._newContent = null;
      this.tip = null;
      this._setListeners();
      if (!this._config.selector) {
        this._fixTitle();
      }
    }
    // Getters
    static get Default() {
      return Default5;
    }
    static get DefaultType() {
      return DefaultType5;
    }
    static get NAME() {
      return NAME6;
    }
    // Public
    enable() {
      this._isEnabled = true;
    }
    disable() {
      this._isEnabled = false;
    }
    toggleEnabled() {
      this._isEnabled = !this._isEnabled;
    }
    toggle() {
      if (!this._isEnabled) {
        return;
      }
      this._activeTrigger.click = !this._activeTrigger.click;
      if (this._isShown()) {
        this._leave();
        return;
      }
      this._enter();
    }
    dispose() {
      clearTimeout(this._timeout);
      event_handler_default.off(this._element.closest(SELECTOR_MODAL), EVENT_MODAL_HIDE, this._hideModalHandler);
      if (this._element.getAttribute("data-bs-original-title")) {
        this._element.setAttribute("title", this._element.getAttribute("data-bs-original-title"));
      }
      this._disposePopper();
      super.dispose();
    }
    show() {
      if (this._element.style.display === "none") {
        throw new Error("Please use show on visible elements");
      }
      if (!(this._isWithContent() && this._isEnabled)) {
        return;
      }
      const showEvent = event_handler_default.trigger(this._element, this.constructor.eventName(EVENT_SHOW4));
      const shadowRoot = findShadowRoot(this._element);
      const isInTheDom = (shadowRoot || this._element.ownerDocument.documentElement).contains(this._element);
      if (showEvent.defaultPrevented || !isInTheDom) {
        return;
      }
      this._disposePopper();
      const tip = this._getTipElement();
      this._element.setAttribute("aria-describedby", tip.getAttribute("id"));
      const { container } = this._config;
      if (!this._element.ownerDocument.documentElement.contains(this.tip)) {
        container.append(tip);
        event_handler_default.trigger(this._element, this.constructor.eventName(EVENT_INSERTED));
      }
      this._popper = this._createPopper(tip);
      tip.classList.add(CLASS_NAME_SHOW4);
      if ("ontouchstart" in document.documentElement) {
        for (const element of [].concat(...document.body.children)) {
          event_handler_default.on(element, "mouseover", noop);
        }
      }
      const complete = () => {
        event_handler_default.trigger(this._element, this.constructor.eventName(EVENT_SHOWN4));
        if (this._isHovered === false) {
          this._leave();
        }
        this._isHovered = false;
      };
      this._queueCallback(complete, this.tip, this._isAnimated());
    }
    hide() {
      if (!this._isShown()) {
        return;
      }
      const hideEvent = event_handler_default.trigger(this._element, this.constructor.eventName(EVENT_HIDE4));
      if (hideEvent.defaultPrevented) {
        return;
      }
      const tip = this._getTipElement();
      tip.classList.remove(CLASS_NAME_SHOW4);
      if ("ontouchstart" in document.documentElement) {
        for (const element of [].concat(...document.body.children)) {
          event_handler_default.off(element, "mouseover", noop);
        }
      }
      this._activeTrigger[TRIGGER_CLICK] = false;
      this._activeTrigger[TRIGGER_FOCUS] = false;
      this._activeTrigger[TRIGGER_HOVER] = false;
      this._isHovered = null;
      const complete = () => {
        if (this._isWithActiveTrigger()) {
          return;
        }
        if (!this._isHovered) {
          this._disposePopper();
        }
        this._element.removeAttribute("aria-describedby");
        event_handler_default.trigger(this._element, this.constructor.eventName(EVENT_HIDDEN4));
      };
      this._queueCallback(complete, this.tip, this._isAnimated());
    }
    update() {
      if (this._popper) {
        this._popper.update();
      }
    }
    // Protected
    _isWithContent() {
      return Boolean(this._getTitle());
    }
    _getTipElement() {
      if (!this.tip) {
        this.tip = this._createTipElement(this._newContent || this._getContentForTemplate());
      }
      return this.tip;
    }
    _createTipElement(content) {
      const tip = this._getTemplateFactory(content).toHtml();
      if (!tip) {
        return null;
      }
      tip.classList.remove(CLASS_NAME_FADE2, CLASS_NAME_SHOW4);
      tip.classList.add(`bs-${this.constructor.NAME}-auto`);
      const tipId = getUID(this.constructor.NAME).toString();
      tip.setAttribute("id", tipId);
      if (this._isAnimated()) {
        tip.classList.add(CLASS_NAME_FADE2);
      }
      return tip;
    }
    setContent(content) {
      this._newContent = content;
      if (this._isShown()) {
        this._disposePopper();
        this.show();
      }
    }
    _getTemplateFactory(content) {
      if (this._templateFactory) {
        this._templateFactory.changeContent(content);
      } else {
        this._templateFactory = new template_factory_default({
          ...this._config,
          // the `content` var has to be after `this._config`
          // to override config.content in case of popover
          content,
          extraClass: this._resolvePossibleFunction(this._config.customClass)
        });
      }
      return this._templateFactory;
    }
    _getContentForTemplate() {
      return {
        [SELECTOR_TOOLTIP_INNER]: this._getTitle()
      };
    }
    _getTitle() {
      return this._resolvePossibleFunction(this._config.title) || this._element.getAttribute("data-bs-original-title");
    }
    // Private
    _initializeOnDelegatedTarget(event) {
      return this.constructor.getOrCreateInstance(event.delegateTarget, this._getDelegateConfig());
    }
    _isAnimated() {
      return this._config.animation || this.tip && this.tip.classList.contains(CLASS_NAME_FADE2);
    }
    _isShown() {
      return this.tip && this.tip.classList.contains(CLASS_NAME_SHOW4);
    }
    _createPopper(tip) {
      const placement = execute(this._config.placement, [this, tip, this._element]);
      const attachment = AttachmentMap[placement.toUpperCase()];
      return Popper2.createPopper(this._element, tip, this._getPopperConfig(attachment));
    }
    _getOffset() {
      const { offset } = this._config;
      if (typeof offset === "string") {
        return offset.split(",").map((value) => Number.parseInt(value, 10));
      }
      if (typeof offset === "function") {
        return (popperData) => offset(popperData, this._element);
      }
      return offset;
    }
    _resolvePossibleFunction(arg) {
      return execute(arg, [this._element]);
    }
    _getPopperConfig(attachment) {
      const defaultBsPopperConfig = {
        placement: attachment,
        modifiers: [
          {
            name: "flip",
            options: {
              fallbackPlacements: this._config.fallbackPlacements
            }
          },
          {
            name: "offset",
            options: {
              offset: this._getOffset()
            }
          },
          {
            name: "preventOverflow",
            options: {
              boundary: this._config.boundary
            }
          },
          {
            name: "arrow",
            options: {
              element: `.${this.constructor.NAME}-arrow`
            }
          },
          {
            name: "preSetPlacement",
            enabled: true,
            phase: "beforeMain",
            fn: (data) => {
              this._getTipElement().setAttribute("data-popper-placement", data.state.placement);
            }
          }
        ]
      };
      return {
        ...defaultBsPopperConfig,
        ...execute(this._config.popperConfig, [defaultBsPopperConfig])
      };
    }
    _setListeners() {
      const triggers = this._config.trigger.split(" ");
      for (const trigger of triggers) {
        if (trigger === "click") {
          event_handler_default.on(this._element, this.constructor.eventName(EVENT_CLICK2), this._config.selector, (event) => {
            const context = this._initializeOnDelegatedTarget(event);
            context.toggle();
          });
        } else if (trigger !== TRIGGER_MANUAL) {
          const eventIn = trigger === TRIGGER_HOVER ? this.constructor.eventName(EVENT_MOUSEENTER) : this.constructor.eventName(EVENT_FOCUSIN);
          const eventOut = trigger === TRIGGER_HOVER ? this.constructor.eventName(EVENT_MOUSELEAVE) : this.constructor.eventName(EVENT_FOCUSOUT);
          event_handler_default.on(this._element, eventIn, this._config.selector, (event) => {
            const context = this._initializeOnDelegatedTarget(event);
            context._activeTrigger[event.type === "focusin" ? TRIGGER_FOCUS : TRIGGER_HOVER] = true;
            context._enter();
          });
          event_handler_default.on(this._element, eventOut, this._config.selector, (event) => {
            const context = this._initializeOnDelegatedTarget(event);
            context._activeTrigger[event.type === "focusout" ? TRIGGER_FOCUS : TRIGGER_HOVER] = context._element.contains(event.relatedTarget);
            context._leave();
          });
        }
      }
      this._hideModalHandler = () => {
        if (this._element) {
          this.hide();
        }
      };
      event_handler_default.on(this._element.closest(SELECTOR_MODAL), EVENT_MODAL_HIDE, this._hideModalHandler);
    }
    _fixTitle() {
      const title = this._element.getAttribute("title");
      if (!title) {
        return;
      }
      if (!this._element.getAttribute("aria-label") && !this._element.textContent.trim()) {
        this._element.setAttribute("aria-label", title);
      }
      this._element.setAttribute("data-bs-original-title", title);
      this._element.removeAttribute("title");
    }
    _enter() {
      if (this._isShown() || this._isHovered) {
        this._isHovered = true;
        return;
      }
      this._isHovered = true;
      this._setTimeout(() => {
        if (this._isHovered) {
          this.show();
        }
      }, this._config.delay.show);
    }
    _leave() {
      if (this._isWithActiveTrigger()) {
        return;
      }
      this._isHovered = false;
      this._setTimeout(() => {
        if (!this._isHovered) {
          this.hide();
        }
      }, this._config.delay.hide);
    }
    _setTimeout(handler, timeout) {
      clearTimeout(this._timeout);
      this._timeout = setTimeout(handler, timeout);
    }
    _isWithActiveTrigger() {
      return Object.values(this._activeTrigger).includes(true);
    }
    _getConfig(config) {
      const dataAttributes = manipulator_default.getDataAttributes(this._element);
      for (const dataAttribute of Object.keys(dataAttributes)) {
        if (DISALLOWED_ATTRIBUTES.has(dataAttribute)) {
          delete dataAttributes[dataAttribute];
        }
      }
      config = {
        ...dataAttributes,
        ...typeof config === "object" && config ? config : {}
      };
      config = this._mergeConfigObj(config);
      config = this._configAfterMerge(config);
      this._typeCheckConfig(config);
      return config;
    }
    _configAfterMerge(config) {
      config.container = config.container === false ? document.body : getElement(config.container);
      if (typeof config.delay === "number") {
        config.delay = {
          show: config.delay,
          hide: config.delay
        };
      }
      if (typeof config.title === "number") {
        config.title = config.title.toString();
      }
      if (typeof config.content === "number") {
        config.content = config.content.toString();
      }
      return config;
    }
    _getDelegateConfig() {
      const config = {};
      for (const [key, value] of Object.entries(this._config)) {
        if (this.constructor.Default[key] !== value) {
          config[key] = value;
        }
      }
      config.selector = false;
      config.trigger = "manual";
      return config;
    }
    _disposePopper() {
      if (this._popper) {
        this._popper.destroy();
        this._popper = null;
      }
      if (this.tip) {
        this.tip.remove();
        this.tip = null;
      }
    }
    // Static
    static jQueryInterface(config) {
      return this.each(function() {
        const data = _Tooltip.getOrCreateInstance(this, config);
        if (typeof config !== "string") {
          return;
        }
        if (typeof data[config] === "undefined") {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config]();
      });
    }
  };
  defineJQueryPlugin(Tooltip);
  var tooltip_default = Tooltip;

  // <stdin>
  var stdin_default = {
    Tab: tab_default,
    Collapse: collapse_default,
    Dropdown: dropdown_default,
    ScrollSpy: scrollspy_default,
    Tooltip: tooltip_default
  };
  window.Collapse = collapse_default;
  window.Tooltip = tooltip_default;
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibnMtaHVnbzpDOlxcVXNlcnNcXHN0ZXZleW91dFxcQXBwRGF0YVxcTG9jYWxcXGh1Z29fY2FjaGVcXG1vZHVsZXNcXGZpbGVjYWNoZVxcbW9kdWxlc1xccGtnXFxtb2RcXGdpdGh1Yi5jb21cXGdvaHVnb2lvXFxodWdvLW1vZC1qc2xpYnMtZGlzdFxccG9wcGVyanNcXHYyQHYyLjIxMTAwLjIwMDAwXFxwYWNrYWdlXFxkaXN0XFxjanNcXHBvcHBlci5qcyIsICJucy1odWdvOkM6XFxVc2Vyc1xcc3RldmV5b3V0XFxBcHBEYXRhXFxMb2NhbFxcaHVnb19jYWNoZVxcbW9kdWxlc1xcZmlsZWNhY2hlXFxtb2R1bGVzXFxwa2dcXG1vZFxcZ2l0aHViLmNvbVxcdHdic1xcYm9vdHN0cmFwQHY1LjMuMitpbmNvbXBhdGlibGVcXGpzXFxzcmNcXGRvbVxcZGF0YS5qcyIsICJucy1odWdvOkM6XFxVc2Vyc1xcc3RldmV5b3V0XFxBcHBEYXRhXFxMb2NhbFxcaHVnb19jYWNoZVxcbW9kdWxlc1xcZmlsZWNhY2hlXFxtb2R1bGVzXFxwa2dcXG1vZFxcZ2l0aHViLmNvbVxcdHdic1xcYm9vdHN0cmFwQHY1LjMuMitpbmNvbXBhdGlibGVcXGpzXFxzcmNcXHV0aWxcXGluZGV4LmpzIiwgIm5zLWh1Z286QzpcXFVzZXJzXFxzdGV2ZXlvdXRcXEFwcERhdGFcXExvY2FsXFxodWdvX2NhY2hlXFxtb2R1bGVzXFxmaWxlY2FjaGVcXG1vZHVsZXNcXHBrZ1xcbW9kXFxnaXRodWIuY29tXFx0d2JzXFxib290c3RyYXBAdjUuMy4yK2luY29tcGF0aWJsZVxcanNcXHNyY1xcZG9tXFxldmVudC1oYW5kbGVyLmpzIiwgIm5zLWh1Z286QzpcXFVzZXJzXFxzdGV2ZXlvdXRcXEFwcERhdGFcXExvY2FsXFxodWdvX2NhY2hlXFxtb2R1bGVzXFxmaWxlY2FjaGVcXG1vZHVsZXNcXHBrZ1xcbW9kXFxnaXRodWIuY29tXFx0d2JzXFxib290c3RyYXBAdjUuMy4yK2luY29tcGF0aWJsZVxcanNcXHNyY1xcZG9tXFxtYW5pcHVsYXRvci5qcyIsICJucy1odWdvOkM6XFxVc2Vyc1xcc3RldmV5b3V0XFxBcHBEYXRhXFxMb2NhbFxcaHVnb19jYWNoZVxcbW9kdWxlc1xcZmlsZWNhY2hlXFxtb2R1bGVzXFxwa2dcXG1vZFxcZ2l0aHViLmNvbVxcdHdic1xcYm9vdHN0cmFwQHY1LjMuMitpbmNvbXBhdGlibGVcXGpzXFxzcmNcXHV0aWxcXGNvbmZpZy5qcyIsICJucy1odWdvOkM6XFxVc2Vyc1xcc3RldmV5b3V0XFxBcHBEYXRhXFxMb2NhbFxcaHVnb19jYWNoZVxcbW9kdWxlc1xcZmlsZWNhY2hlXFxtb2R1bGVzXFxwa2dcXG1vZFxcZ2l0aHViLmNvbVxcdHdic1xcYm9vdHN0cmFwQHY1LjMuMitpbmNvbXBhdGlibGVcXGpzXFxzcmNcXGJhc2UtY29tcG9uZW50LmpzIiwgIm5zLWh1Z286QzpcXFVzZXJzXFxzdGV2ZXlvdXRcXEFwcERhdGFcXExvY2FsXFxodWdvX2NhY2hlXFxtb2R1bGVzXFxmaWxlY2FjaGVcXG1vZHVsZXNcXHBrZ1xcbW9kXFxnaXRodWIuY29tXFx0d2JzXFxib290c3RyYXBAdjUuMy4yK2luY29tcGF0aWJsZVxcanNcXHNyY1xcZG9tXFxzZWxlY3Rvci1lbmdpbmUuanMiLCAibnMtaHVnbzpDOlxcVXNlcnNcXHN0ZXZleW91dFxcQXBwRGF0YVxcTG9jYWxcXGh1Z29fY2FjaGVcXG1vZHVsZXNcXGZpbGVjYWNoZVxcbW9kdWxlc1xccGtnXFxtb2RcXGdpdGh1Yi5jb21cXHR3YnNcXGJvb3RzdHJhcEB2NS4zLjIraW5jb21wYXRpYmxlXFxqc1xcc3JjXFx0YWIuanMiLCAibnMtaHVnbzpDOlxcVXNlcnNcXHN0ZXZleW91dFxcQXBwRGF0YVxcTG9jYWxcXGh1Z29fY2FjaGVcXG1vZHVsZXNcXGZpbGVjYWNoZVxcbW9kdWxlc1xccGtnXFxtb2RcXGdpdGh1Yi5jb21cXHR3YnNcXGJvb3RzdHJhcEB2NS4zLjIraW5jb21wYXRpYmxlXFxqc1xcc3JjXFxjb2xsYXBzZS5qcyIsICJucy1odWdvOkM6XFxVc2Vyc1xcc3RldmV5b3V0XFxBcHBEYXRhXFxMb2NhbFxcaHVnb19jYWNoZVxcbW9kdWxlc1xcZmlsZWNhY2hlXFxtb2R1bGVzXFxwa2dcXG1vZFxcZ2l0aHViLmNvbVxcdHdic1xcYm9vdHN0cmFwQHY1LjMuMitpbmNvbXBhdGlibGVcXGpzXFxzcmNcXGRyb3Bkb3duLmpzIiwgIm5zLWh1Z286QzpcXFVzZXJzXFxzdGV2ZXlvdXRcXEFwcERhdGFcXExvY2FsXFxodWdvX2NhY2hlXFxtb2R1bGVzXFxmaWxlY2FjaGVcXG1vZHVsZXNcXHBrZ1xcbW9kXFxnaXRodWIuY29tXFx0d2JzXFxib290c3RyYXBAdjUuMy4yK2luY29tcGF0aWJsZVxcanNcXHNyY1xcc2Nyb2xsc3B5LmpzIiwgIm5zLWh1Z286QzpcXFVzZXJzXFxzdGV2ZXlvdXRcXEFwcERhdGFcXExvY2FsXFxodWdvX2NhY2hlXFxtb2R1bGVzXFxmaWxlY2FjaGVcXG1vZHVsZXNcXHBrZ1xcbW9kXFxnaXRodWIuY29tXFx0d2JzXFxib290c3RyYXBAdjUuMy4yK2luY29tcGF0aWJsZVxcanNcXHNyY1xcdG9vbHRpcC5qcyIsICJucy1odWdvOkM6XFxVc2Vyc1xcc3RldmV5b3V0XFxBcHBEYXRhXFxMb2NhbFxcaHVnb19jYWNoZVxcbW9kdWxlc1xcZmlsZWNhY2hlXFxtb2R1bGVzXFxwa2dcXG1vZFxcZ2l0aHViLmNvbVxcdHdic1xcYm9vdHN0cmFwQHY1LjMuMitpbmNvbXBhdGlibGVcXGpzXFxzcmNcXHV0aWxcXHNhbml0aXplci5qcyIsICJucy1odWdvOkM6XFxVc2Vyc1xcc3RldmV5b3V0XFxBcHBEYXRhXFxMb2NhbFxcaHVnb19jYWNoZVxcbW9kdWxlc1xcZmlsZWNhY2hlXFxtb2R1bGVzXFxwa2dcXG1vZFxcZ2l0aHViLmNvbVxcdHdic1xcYm9vdHN0cmFwQHY1LjMuMitpbmNvbXBhdGlibGVcXGpzXFxzcmNcXHV0aWxcXHRlbXBsYXRlLWZhY3RvcnkuanMiLCAiPHN0ZGluPiJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLyoqXG4gKiBAcG9wcGVyanMvY29yZSB2Mi4xMS4wIC0gTUlUIExpY2Vuc2VcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG5cbmZ1bmN0aW9uIGdldFdpbmRvdyhub2RlKSB7XG4gIGlmIChub2RlID09IG51bGwpIHtcbiAgICByZXR1cm4gd2luZG93O1xuICB9XG5cbiAgaWYgKG5vZGUudG9TdHJpbmcoKSAhPT0gJ1tvYmplY3QgV2luZG93XScpIHtcbiAgICB2YXIgb3duZXJEb2N1bWVudCA9IG5vZGUub3duZXJEb2N1bWVudDtcbiAgICByZXR1cm4gb3duZXJEb2N1bWVudCA/IG93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXcgfHwgd2luZG93IDogd2luZG93O1xuICB9XG5cbiAgcmV0dXJuIG5vZGU7XG59XG5cbmZ1bmN0aW9uIGlzRWxlbWVudChub2RlKSB7XG4gIHZhciBPd25FbGVtZW50ID0gZ2V0V2luZG93KG5vZGUpLkVsZW1lbnQ7XG4gIHJldHVybiBub2RlIGluc3RhbmNlb2YgT3duRWxlbWVudCB8fCBub2RlIGluc3RhbmNlb2YgRWxlbWVudDtcbn1cblxuZnVuY3Rpb24gaXNIVE1MRWxlbWVudChub2RlKSB7XG4gIHZhciBPd25FbGVtZW50ID0gZ2V0V2luZG93KG5vZGUpLkhUTUxFbGVtZW50O1xuICByZXR1cm4gbm9kZSBpbnN0YW5jZW9mIE93bkVsZW1lbnQgfHwgbm9kZSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50O1xufVxuXG5mdW5jdGlvbiBpc1NoYWRvd1Jvb3Qobm9kZSkge1xuICAvLyBJRSAxMSBoYXMgbm8gU2hhZG93Um9vdFxuICBpZiAodHlwZW9mIFNoYWRvd1Jvb3QgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgdmFyIE93bkVsZW1lbnQgPSBnZXRXaW5kb3cobm9kZSkuU2hhZG93Um9vdDtcbiAgcmV0dXJuIG5vZGUgaW5zdGFuY2VvZiBPd25FbGVtZW50IHx8IG5vZGUgaW5zdGFuY2VvZiBTaGFkb3dSb290O1xufVxuXG52YXIgbWF4ID0gTWF0aC5tYXg7XG52YXIgbWluID0gTWF0aC5taW47XG52YXIgcm91bmQgPSBNYXRoLnJvdW5kO1xuXG5mdW5jdGlvbiBnZXRCb3VuZGluZ0NsaWVudFJlY3QoZWxlbWVudCwgaW5jbHVkZVNjYWxlKSB7XG4gIGlmIChpbmNsdWRlU2NhbGUgPT09IHZvaWQgMCkge1xuICAgIGluY2x1ZGVTY2FsZSA9IGZhbHNlO1xuICB9XG5cbiAgdmFyIHJlY3QgPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICB2YXIgc2NhbGVYID0gMTtcbiAgdmFyIHNjYWxlWSA9IDE7XG5cbiAgaWYgKGlzSFRNTEVsZW1lbnQoZWxlbWVudCkgJiYgaW5jbHVkZVNjYWxlKSB7XG4gICAgdmFyIG9mZnNldEhlaWdodCA9IGVsZW1lbnQub2Zmc2V0SGVpZ2h0O1xuICAgIHZhciBvZmZzZXRXaWR0aCA9IGVsZW1lbnQub2Zmc2V0V2lkdGg7IC8vIERvIG5vdCBhdHRlbXB0IHRvIGRpdmlkZSBieSAwLCBvdGhlcndpc2Ugd2UgZ2V0IGBJbmZpbml0eWAgYXMgc2NhbGVcbiAgICAvLyBGYWxsYmFjayB0byAxIGluIGNhc2UgYm90aCB2YWx1ZXMgYXJlIGAwYFxuXG4gICAgaWYgKG9mZnNldFdpZHRoID4gMCkge1xuICAgICAgc2NhbGVYID0gcm91bmQocmVjdC53aWR0aCkgLyBvZmZzZXRXaWR0aCB8fCAxO1xuICAgIH1cblxuICAgIGlmIChvZmZzZXRIZWlnaHQgPiAwKSB7XG4gICAgICBzY2FsZVkgPSByb3VuZChyZWN0LmhlaWdodCkgLyBvZmZzZXRIZWlnaHQgfHwgMTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHdpZHRoOiByZWN0LndpZHRoIC8gc2NhbGVYLFxuICAgIGhlaWdodDogcmVjdC5oZWlnaHQgLyBzY2FsZVksXG4gICAgdG9wOiByZWN0LnRvcCAvIHNjYWxlWSxcbiAgICByaWdodDogcmVjdC5yaWdodCAvIHNjYWxlWCxcbiAgICBib3R0b206IHJlY3QuYm90dG9tIC8gc2NhbGVZLFxuICAgIGxlZnQ6IHJlY3QubGVmdCAvIHNjYWxlWCxcbiAgICB4OiByZWN0LmxlZnQgLyBzY2FsZVgsXG4gICAgeTogcmVjdC50b3AgLyBzY2FsZVlcbiAgfTtcbn1cblxuZnVuY3Rpb24gZ2V0V2luZG93U2Nyb2xsKG5vZGUpIHtcbiAgdmFyIHdpbiA9IGdldFdpbmRvdyhub2RlKTtcbiAgdmFyIHNjcm9sbExlZnQgPSB3aW4ucGFnZVhPZmZzZXQ7XG4gIHZhciBzY3JvbGxUb3AgPSB3aW4ucGFnZVlPZmZzZXQ7XG4gIHJldHVybiB7XG4gICAgc2Nyb2xsTGVmdDogc2Nyb2xsTGVmdCxcbiAgICBzY3JvbGxUb3A6IHNjcm9sbFRvcFxuICB9O1xufVxuXG5mdW5jdGlvbiBnZXRIVE1MRWxlbWVudFNjcm9sbChlbGVtZW50KSB7XG4gIHJldHVybiB7XG4gICAgc2Nyb2xsTGVmdDogZWxlbWVudC5zY3JvbGxMZWZ0LFxuICAgIHNjcm9sbFRvcDogZWxlbWVudC5zY3JvbGxUb3BcbiAgfTtcbn1cblxuZnVuY3Rpb24gZ2V0Tm9kZVNjcm9sbChub2RlKSB7XG4gIGlmIChub2RlID09PSBnZXRXaW5kb3cobm9kZSkgfHwgIWlzSFRNTEVsZW1lbnQobm9kZSkpIHtcbiAgICByZXR1cm4gZ2V0V2luZG93U2Nyb2xsKG5vZGUpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBnZXRIVE1MRWxlbWVudFNjcm9sbChub2RlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXROb2RlTmFtZShlbGVtZW50KSB7XG4gIHJldHVybiBlbGVtZW50ID8gKGVsZW1lbnQubm9kZU5hbWUgfHwgJycpLnRvTG93ZXJDYXNlKCkgOiBudWxsO1xufVxuXG5mdW5jdGlvbiBnZXREb2N1bWVudEVsZW1lbnQoZWxlbWVudCkge1xuICAvLyAkRmxvd0ZpeE1lW2luY29tcGF0aWJsZS1yZXR1cm5dOiBhc3N1bWUgYm9keSBpcyBhbHdheXMgYXZhaWxhYmxlXG4gIHJldHVybiAoKGlzRWxlbWVudChlbGVtZW50KSA/IGVsZW1lbnQub3duZXJEb2N1bWVudCA6IC8vICRGbG93Rml4TWVbcHJvcC1taXNzaW5nXVxuICBlbGVtZW50LmRvY3VtZW50KSB8fCB3aW5kb3cuZG9jdW1lbnQpLmRvY3VtZW50RWxlbWVudDtcbn1cblxuZnVuY3Rpb24gZ2V0V2luZG93U2Nyb2xsQmFyWChlbGVtZW50KSB7XG4gIC8vIElmIDxodG1sPiBoYXMgYSBDU1Mgd2lkdGggZ3JlYXRlciB0aGFuIHRoZSB2aWV3cG9ydCwgdGhlbiB0aGlzIHdpbGwgYmVcbiAgLy8gaW5jb3JyZWN0IGZvciBSVEwuXG4gIC8vIFBvcHBlciAxIGlzIGJyb2tlbiBpbiB0aGlzIGNhc2UgYW5kIG5ldmVyIGhhZCBhIGJ1ZyByZXBvcnQgc28gbGV0J3MgYXNzdW1lXG4gIC8vIGl0J3Mgbm90IGFuIGlzc3VlLiBJIGRvbid0IHRoaW5rIGFueW9uZSBldmVyIHNwZWNpZmllcyB3aWR0aCBvbiA8aHRtbD5cbiAgLy8gYW55d2F5LlxuICAvLyBCcm93c2VycyB3aGVyZSB0aGUgbGVmdCBzY3JvbGxiYXIgZG9lc24ndCBjYXVzZSBhbiBpc3N1ZSByZXBvcnQgYDBgIGZvclxuICAvLyB0aGlzIChlLmcuIEVkZ2UgMjAxOSwgSUUxMSwgU2FmYXJpKVxuICByZXR1cm4gZ2V0Qm91bmRpbmdDbGllbnRSZWN0KGdldERvY3VtZW50RWxlbWVudChlbGVtZW50KSkubGVmdCArIGdldFdpbmRvd1Njcm9sbChlbGVtZW50KS5zY3JvbGxMZWZ0O1xufVxuXG5mdW5jdGlvbiBnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpIHtcbiAgcmV0dXJuIGdldFdpbmRvdyhlbGVtZW50KS5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpO1xufVxuXG5mdW5jdGlvbiBpc1Njcm9sbFBhcmVudChlbGVtZW50KSB7XG4gIC8vIEZpcmVmb3ggd2FudHMgdXMgdG8gY2hlY2sgYC14YCBhbmQgYC15YCB2YXJpYXRpb25zIGFzIHdlbGxcbiAgdmFyIF9nZXRDb21wdXRlZFN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KSxcbiAgICAgIG92ZXJmbG93ID0gX2dldENvbXB1dGVkU3R5bGUub3ZlcmZsb3csXG4gICAgICBvdmVyZmxvd1ggPSBfZ2V0Q29tcHV0ZWRTdHlsZS5vdmVyZmxvd1gsXG4gICAgICBvdmVyZmxvd1kgPSBfZ2V0Q29tcHV0ZWRTdHlsZS5vdmVyZmxvd1k7XG5cbiAgcmV0dXJuIC9hdXRvfHNjcm9sbHxvdmVybGF5fGhpZGRlbi8udGVzdChvdmVyZmxvdyArIG92ZXJmbG93WSArIG92ZXJmbG93WCk7XG59XG5cbmZ1bmN0aW9uIGlzRWxlbWVudFNjYWxlZChlbGVtZW50KSB7XG4gIHZhciByZWN0ID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgdmFyIHNjYWxlWCA9IHJvdW5kKHJlY3Qud2lkdGgpIC8gZWxlbWVudC5vZmZzZXRXaWR0aCB8fCAxO1xuICB2YXIgc2NhbGVZID0gcm91bmQocmVjdC5oZWlnaHQpIC8gZWxlbWVudC5vZmZzZXRIZWlnaHQgfHwgMTtcbiAgcmV0dXJuIHNjYWxlWCAhPT0gMSB8fCBzY2FsZVkgIT09IDE7XG59IC8vIFJldHVybnMgdGhlIGNvbXBvc2l0ZSByZWN0IG9mIGFuIGVsZW1lbnQgcmVsYXRpdmUgdG8gaXRzIG9mZnNldFBhcmVudC5cbi8vIENvbXBvc2l0ZSBtZWFucyBpdCB0YWtlcyBpbnRvIGFjY291bnQgdHJhbnNmb3JtcyBhcyB3ZWxsIGFzIGxheW91dC5cblxuXG5mdW5jdGlvbiBnZXRDb21wb3NpdGVSZWN0KGVsZW1lbnRPclZpcnR1YWxFbGVtZW50LCBvZmZzZXRQYXJlbnQsIGlzRml4ZWQpIHtcbiAgaWYgKGlzRml4ZWQgPT09IHZvaWQgMCkge1xuICAgIGlzRml4ZWQgPSBmYWxzZTtcbiAgfVxuXG4gIHZhciBpc09mZnNldFBhcmVudEFuRWxlbWVudCA9IGlzSFRNTEVsZW1lbnQob2Zmc2V0UGFyZW50KTtcbiAgdmFyIG9mZnNldFBhcmVudElzU2NhbGVkID0gaXNIVE1MRWxlbWVudChvZmZzZXRQYXJlbnQpICYmIGlzRWxlbWVudFNjYWxlZChvZmZzZXRQYXJlbnQpO1xuICB2YXIgZG9jdW1lbnRFbGVtZW50ID0gZ2V0RG9jdW1lbnRFbGVtZW50KG9mZnNldFBhcmVudCk7XG4gIHZhciByZWN0ID0gZ2V0Qm91bmRpbmdDbGllbnRSZWN0KGVsZW1lbnRPclZpcnR1YWxFbGVtZW50LCBvZmZzZXRQYXJlbnRJc1NjYWxlZCk7XG4gIHZhciBzY3JvbGwgPSB7XG4gICAgc2Nyb2xsTGVmdDogMCxcbiAgICBzY3JvbGxUb3A6IDBcbiAgfTtcbiAgdmFyIG9mZnNldHMgPSB7XG4gICAgeDogMCxcbiAgICB5OiAwXG4gIH07XG5cbiAgaWYgKGlzT2Zmc2V0UGFyZW50QW5FbGVtZW50IHx8ICFpc09mZnNldFBhcmVudEFuRWxlbWVudCAmJiAhaXNGaXhlZCkge1xuICAgIGlmIChnZXROb2RlTmFtZShvZmZzZXRQYXJlbnQpICE9PSAnYm9keScgfHwgLy8gaHR0cHM6Ly9naXRodWIuY29tL3BvcHBlcmpzL3BvcHBlci1jb3JlL2lzc3Vlcy8xMDc4XG4gICAgaXNTY3JvbGxQYXJlbnQoZG9jdW1lbnRFbGVtZW50KSkge1xuICAgICAgc2Nyb2xsID0gZ2V0Tm9kZVNjcm9sbChvZmZzZXRQYXJlbnQpO1xuICAgIH1cblxuICAgIGlmIChpc0hUTUxFbGVtZW50KG9mZnNldFBhcmVudCkpIHtcbiAgICAgIG9mZnNldHMgPSBnZXRCb3VuZGluZ0NsaWVudFJlY3Qob2Zmc2V0UGFyZW50LCB0cnVlKTtcbiAgICAgIG9mZnNldHMueCArPSBvZmZzZXRQYXJlbnQuY2xpZW50TGVmdDtcbiAgICAgIG9mZnNldHMueSArPSBvZmZzZXRQYXJlbnQuY2xpZW50VG9wO1xuICAgIH0gZWxzZSBpZiAoZG9jdW1lbnRFbGVtZW50KSB7XG4gICAgICBvZmZzZXRzLnggPSBnZXRXaW5kb3dTY3JvbGxCYXJYKGRvY3VtZW50RWxlbWVudCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICB4OiByZWN0LmxlZnQgKyBzY3JvbGwuc2Nyb2xsTGVmdCAtIG9mZnNldHMueCxcbiAgICB5OiByZWN0LnRvcCArIHNjcm9sbC5zY3JvbGxUb3AgLSBvZmZzZXRzLnksXG4gICAgd2lkdGg6IHJlY3Qud2lkdGgsXG4gICAgaGVpZ2h0OiByZWN0LmhlaWdodFxuICB9O1xufVxuXG4vLyBtZWFucyBpdCBkb2Vzbid0IHRha2UgaW50byBhY2NvdW50IHRyYW5zZm9ybXMuXG5cbmZ1bmN0aW9uIGdldExheW91dFJlY3QoZWxlbWVudCkge1xuICB2YXIgY2xpZW50UmVjdCA9IGdldEJvdW5kaW5nQ2xpZW50UmVjdChlbGVtZW50KTsgLy8gVXNlIHRoZSBjbGllbnRSZWN0IHNpemVzIGlmIGl0J3Mgbm90IGJlZW4gdHJhbnNmb3JtZWQuXG4gIC8vIEZpeGVzIGh0dHBzOi8vZ2l0aHViLmNvbS9wb3BwZXJqcy9wb3BwZXItY29yZS9pc3N1ZXMvMTIyM1xuXG4gIHZhciB3aWR0aCA9IGVsZW1lbnQub2Zmc2V0V2lkdGg7XG4gIHZhciBoZWlnaHQgPSBlbGVtZW50Lm9mZnNldEhlaWdodDtcblxuICBpZiAoTWF0aC5hYnMoY2xpZW50UmVjdC53aWR0aCAtIHdpZHRoKSA8PSAxKSB7XG4gICAgd2lkdGggPSBjbGllbnRSZWN0LndpZHRoO1xuICB9XG5cbiAgaWYgKE1hdGguYWJzKGNsaWVudFJlY3QuaGVpZ2h0IC0gaGVpZ2h0KSA8PSAxKSB7XG4gICAgaGVpZ2h0ID0gY2xpZW50UmVjdC5oZWlnaHQ7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHg6IGVsZW1lbnQub2Zmc2V0TGVmdCxcbiAgICB5OiBlbGVtZW50Lm9mZnNldFRvcCxcbiAgICB3aWR0aDogd2lkdGgsXG4gICAgaGVpZ2h0OiBoZWlnaHRcbiAgfTtcbn1cblxuZnVuY3Rpb24gZ2V0UGFyZW50Tm9kZShlbGVtZW50KSB7XG4gIGlmIChnZXROb2RlTmFtZShlbGVtZW50KSA9PT0gJ2h0bWwnKSB7XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH1cblxuICByZXR1cm4gKC8vIHRoaXMgaXMgYSBxdWlja2VyIChidXQgbGVzcyB0eXBlIHNhZmUpIHdheSB0byBzYXZlIHF1aXRlIHNvbWUgYnl0ZXMgZnJvbSB0aGUgYnVuZGxlXG4gICAgLy8gJEZsb3dGaXhNZVtpbmNvbXBhdGlibGUtcmV0dXJuXVxuICAgIC8vICRGbG93Rml4TWVbcHJvcC1taXNzaW5nXVxuICAgIGVsZW1lbnQuYXNzaWduZWRTbG90IHx8IC8vIHN0ZXAgaW50byB0aGUgc2hhZG93IERPTSBvZiB0aGUgcGFyZW50IG9mIGEgc2xvdHRlZCBub2RlXG4gICAgZWxlbWVudC5wYXJlbnROb2RlIHx8ICggLy8gRE9NIEVsZW1lbnQgZGV0ZWN0ZWRcbiAgICBpc1NoYWRvd1Jvb3QoZWxlbWVudCkgPyBlbGVtZW50Lmhvc3QgOiBudWxsKSB8fCAvLyBTaGFkb3dSb290IGRldGVjdGVkXG4gICAgLy8gJEZsb3dGaXhNZVtpbmNvbXBhdGlibGUtY2FsbF06IEhUTUxFbGVtZW50IGlzIGEgTm9kZVxuICAgIGdldERvY3VtZW50RWxlbWVudChlbGVtZW50KSAvLyBmYWxsYmFja1xuXG4gICk7XG59XG5cbmZ1bmN0aW9uIGdldFNjcm9sbFBhcmVudChub2RlKSB7XG4gIGlmIChbJ2h0bWwnLCAnYm9keScsICcjZG9jdW1lbnQnXS5pbmRleE9mKGdldE5vZGVOYW1lKG5vZGUpKSA+PSAwKSB7XG4gICAgLy8gJEZsb3dGaXhNZVtpbmNvbXBhdGlibGUtcmV0dXJuXTogYXNzdW1lIGJvZHkgaXMgYWx3YXlzIGF2YWlsYWJsZVxuICAgIHJldHVybiBub2RlLm93bmVyRG9jdW1lbnQuYm9keTtcbiAgfVxuXG4gIGlmIChpc0hUTUxFbGVtZW50KG5vZGUpICYmIGlzU2Nyb2xsUGFyZW50KG5vZGUpKSB7XG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cblxuICByZXR1cm4gZ2V0U2Nyb2xsUGFyZW50KGdldFBhcmVudE5vZGUobm9kZSkpO1xufVxuXG4vKlxuZ2l2ZW4gYSBET00gZWxlbWVudCwgcmV0dXJuIHRoZSBsaXN0IG9mIGFsbCBzY3JvbGwgcGFyZW50cywgdXAgdGhlIGxpc3Qgb2YgYW5jZXNvcnNcbnVudGlsIHdlIGdldCB0byB0aGUgdG9wIHdpbmRvdyBvYmplY3QuIFRoaXMgbGlzdCBpcyB3aGF0IHdlIGF0dGFjaCBzY3JvbGwgbGlzdGVuZXJzXG50bywgYmVjYXVzZSBpZiBhbnkgb2YgdGhlc2UgcGFyZW50IGVsZW1lbnRzIHNjcm9sbCwgd2UnbGwgbmVlZCB0byByZS1jYWxjdWxhdGUgdGhlXG5yZWZlcmVuY2UgZWxlbWVudCdzIHBvc2l0aW9uLlxuKi9cblxuZnVuY3Rpb24gbGlzdFNjcm9sbFBhcmVudHMoZWxlbWVudCwgbGlzdCkge1xuICB2YXIgX2VsZW1lbnQkb3duZXJEb2N1bWVuO1xuXG4gIGlmIChsaXN0ID09PSB2b2lkIDApIHtcbiAgICBsaXN0ID0gW107XG4gIH1cblxuICB2YXIgc2Nyb2xsUGFyZW50ID0gZ2V0U2Nyb2xsUGFyZW50KGVsZW1lbnQpO1xuICB2YXIgaXNCb2R5ID0gc2Nyb2xsUGFyZW50ID09PSAoKF9lbGVtZW50JG93bmVyRG9jdW1lbiA9IGVsZW1lbnQub3duZXJEb2N1bWVudCkgPT0gbnVsbCA/IHZvaWQgMCA6IF9lbGVtZW50JG93bmVyRG9jdW1lbi5ib2R5KTtcbiAgdmFyIHdpbiA9IGdldFdpbmRvdyhzY3JvbGxQYXJlbnQpO1xuICB2YXIgdGFyZ2V0ID0gaXNCb2R5ID8gW3dpbl0uY29uY2F0KHdpbi52aXN1YWxWaWV3cG9ydCB8fCBbXSwgaXNTY3JvbGxQYXJlbnQoc2Nyb2xsUGFyZW50KSA/IHNjcm9sbFBhcmVudCA6IFtdKSA6IHNjcm9sbFBhcmVudDtcbiAgdmFyIHVwZGF0ZWRMaXN0ID0gbGlzdC5jb25jYXQodGFyZ2V0KTtcbiAgcmV0dXJuIGlzQm9keSA/IHVwZGF0ZWRMaXN0IDogLy8gJEZsb3dGaXhNZVtpbmNvbXBhdGlibGUtY2FsbF06IGlzQm9keSB0ZWxscyB1cyB0YXJnZXQgd2lsbCBiZSBhbiBIVE1MRWxlbWVudCBoZXJlXG4gIHVwZGF0ZWRMaXN0LmNvbmNhdChsaXN0U2Nyb2xsUGFyZW50cyhnZXRQYXJlbnROb2RlKHRhcmdldCkpKTtcbn1cblxuZnVuY3Rpb24gaXNUYWJsZUVsZW1lbnQoZWxlbWVudCkge1xuICByZXR1cm4gWyd0YWJsZScsICd0ZCcsICd0aCddLmluZGV4T2YoZ2V0Tm9kZU5hbWUoZWxlbWVudCkpID49IDA7XG59XG5cbmZ1bmN0aW9uIGdldFRydWVPZmZzZXRQYXJlbnQoZWxlbWVudCkge1xuICBpZiAoIWlzSFRNTEVsZW1lbnQoZWxlbWVudCkgfHwgLy8gaHR0cHM6Ly9naXRodWIuY29tL3BvcHBlcmpzL3BvcHBlci1jb3JlL2lzc3Vlcy84MzdcbiAgZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KS5wb3NpdGlvbiA9PT0gJ2ZpeGVkJykge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcmV0dXJuIGVsZW1lbnQub2Zmc2V0UGFyZW50O1xufSAvLyBgLm9mZnNldFBhcmVudGAgcmVwb3J0cyBgbnVsbGAgZm9yIGZpeGVkIGVsZW1lbnRzLCB3aGlsZSBhYnNvbHV0ZSBlbGVtZW50c1xuLy8gcmV0dXJuIHRoZSBjb250YWluaW5nIGJsb2NrXG5cblxuZnVuY3Rpb24gZ2V0Q29udGFpbmluZ0Jsb2NrKGVsZW1lbnQpIHtcbiAgdmFyIGlzRmlyZWZveCA9IG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKS5pbmRleE9mKCdmaXJlZm94JykgIT09IC0xO1xuICB2YXIgaXNJRSA9IG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignVHJpZGVudCcpICE9PSAtMTtcblxuICBpZiAoaXNJRSAmJiBpc0hUTUxFbGVtZW50KGVsZW1lbnQpKSB7XG4gICAgLy8gSW4gSUUgOSwgMTAgYW5kIDExIGZpeGVkIGVsZW1lbnRzIGNvbnRhaW5pbmcgYmxvY2sgaXMgYWx3YXlzIGVzdGFibGlzaGVkIGJ5IHRoZSB2aWV3cG9ydFxuICAgIHZhciBlbGVtZW50Q3NzID0gZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KTtcblxuICAgIGlmIChlbGVtZW50Q3NzLnBvc2l0aW9uID09PSAnZml4ZWQnKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cblxuICB2YXIgY3VycmVudE5vZGUgPSBnZXRQYXJlbnROb2RlKGVsZW1lbnQpO1xuXG4gIHdoaWxlIChpc0hUTUxFbGVtZW50KGN1cnJlbnROb2RlKSAmJiBbJ2h0bWwnLCAnYm9keSddLmluZGV4T2YoZ2V0Tm9kZU5hbWUoY3VycmVudE5vZGUpKSA8IDApIHtcbiAgICB2YXIgY3NzID0gZ2V0Q29tcHV0ZWRTdHlsZShjdXJyZW50Tm9kZSk7IC8vIFRoaXMgaXMgbm9uLWV4aGF1c3RpdmUgYnV0IGNvdmVycyB0aGUgbW9zdCBjb21tb24gQ1NTIHByb3BlcnRpZXMgdGhhdFxuICAgIC8vIGNyZWF0ZSBhIGNvbnRhaW5pbmcgYmxvY2suXG4gICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQ1NTL0NvbnRhaW5pbmdfYmxvY2sjaWRlbnRpZnlpbmdfdGhlX2NvbnRhaW5pbmdfYmxvY2tcblxuICAgIGlmIChjc3MudHJhbnNmb3JtICE9PSAnbm9uZScgfHwgY3NzLnBlcnNwZWN0aXZlICE9PSAnbm9uZScgfHwgY3NzLmNvbnRhaW4gPT09ICdwYWludCcgfHwgWyd0cmFuc2Zvcm0nLCAncGVyc3BlY3RpdmUnXS5pbmRleE9mKGNzcy53aWxsQ2hhbmdlKSAhPT0gLTEgfHwgaXNGaXJlZm94ICYmIGNzcy53aWxsQ2hhbmdlID09PSAnZmlsdGVyJyB8fCBpc0ZpcmVmb3ggJiYgY3NzLmZpbHRlciAmJiBjc3MuZmlsdGVyICE9PSAnbm9uZScpIHtcbiAgICAgIHJldHVybiBjdXJyZW50Tm9kZTtcbiAgICB9IGVsc2Uge1xuICAgICAgY3VycmVudE5vZGUgPSBjdXJyZW50Tm9kZS5wYXJlbnROb2RlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBudWxsO1xufSAvLyBHZXRzIHRoZSBjbG9zZXN0IGFuY2VzdG9yIHBvc2l0aW9uZWQgZWxlbWVudC4gSGFuZGxlcyBzb21lIGVkZ2UgY2FzZXMsXG4vLyBzdWNoIGFzIHRhYmxlIGFuY2VzdG9ycyBhbmQgY3Jvc3MgYnJvd3NlciBidWdzLlxuXG5cbmZ1bmN0aW9uIGdldE9mZnNldFBhcmVudChlbGVtZW50KSB7XG4gIHZhciB3aW5kb3cgPSBnZXRXaW5kb3coZWxlbWVudCk7XG4gIHZhciBvZmZzZXRQYXJlbnQgPSBnZXRUcnVlT2Zmc2V0UGFyZW50KGVsZW1lbnQpO1xuXG4gIHdoaWxlIChvZmZzZXRQYXJlbnQgJiYgaXNUYWJsZUVsZW1lbnQob2Zmc2V0UGFyZW50KSAmJiBnZXRDb21wdXRlZFN0eWxlKG9mZnNldFBhcmVudCkucG9zaXRpb24gPT09ICdzdGF0aWMnKSB7XG4gICAgb2Zmc2V0UGFyZW50ID0gZ2V0VHJ1ZU9mZnNldFBhcmVudChvZmZzZXRQYXJlbnQpO1xuICB9XG5cbiAgaWYgKG9mZnNldFBhcmVudCAmJiAoZ2V0Tm9kZU5hbWUob2Zmc2V0UGFyZW50KSA9PT0gJ2h0bWwnIHx8IGdldE5vZGVOYW1lKG9mZnNldFBhcmVudCkgPT09ICdib2R5JyAmJiBnZXRDb21wdXRlZFN0eWxlKG9mZnNldFBhcmVudCkucG9zaXRpb24gPT09ICdzdGF0aWMnKSkge1xuICAgIHJldHVybiB3aW5kb3c7XG4gIH1cblxuICByZXR1cm4gb2Zmc2V0UGFyZW50IHx8IGdldENvbnRhaW5pbmdCbG9jayhlbGVtZW50KSB8fCB3aW5kb3c7XG59XG5cbnZhciB0b3AgPSAndG9wJztcbnZhciBib3R0b20gPSAnYm90dG9tJztcbnZhciByaWdodCA9ICdyaWdodCc7XG52YXIgbGVmdCA9ICdsZWZ0JztcbnZhciBhdXRvID0gJ2F1dG8nO1xudmFyIGJhc2VQbGFjZW1lbnRzID0gW3RvcCwgYm90dG9tLCByaWdodCwgbGVmdF07XG52YXIgc3RhcnQgPSAnc3RhcnQnO1xudmFyIGVuZCA9ICdlbmQnO1xudmFyIGNsaXBwaW5nUGFyZW50cyA9ICdjbGlwcGluZ1BhcmVudHMnO1xudmFyIHZpZXdwb3J0ID0gJ3ZpZXdwb3J0JztcbnZhciBwb3BwZXIgPSAncG9wcGVyJztcbnZhciByZWZlcmVuY2UgPSAncmVmZXJlbmNlJztcbnZhciB2YXJpYXRpb25QbGFjZW1lbnRzID0gLyojX19QVVJFX18qL2Jhc2VQbGFjZW1lbnRzLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBwbGFjZW1lbnQpIHtcbiAgcmV0dXJuIGFjYy5jb25jYXQoW3BsYWNlbWVudCArIFwiLVwiICsgc3RhcnQsIHBsYWNlbWVudCArIFwiLVwiICsgZW5kXSk7XG59LCBbXSk7XG52YXIgcGxhY2VtZW50cyA9IC8qI19fUFVSRV9fKi9bXS5jb25jYXQoYmFzZVBsYWNlbWVudHMsIFthdXRvXSkucmVkdWNlKGZ1bmN0aW9uIChhY2MsIHBsYWNlbWVudCkge1xuICByZXR1cm4gYWNjLmNvbmNhdChbcGxhY2VtZW50LCBwbGFjZW1lbnQgKyBcIi1cIiArIHN0YXJ0LCBwbGFjZW1lbnQgKyBcIi1cIiArIGVuZF0pO1xufSwgW10pOyAvLyBtb2RpZmllcnMgdGhhdCBuZWVkIHRvIHJlYWQgdGhlIERPTVxuXG52YXIgYmVmb3JlUmVhZCA9ICdiZWZvcmVSZWFkJztcbnZhciByZWFkID0gJ3JlYWQnO1xudmFyIGFmdGVyUmVhZCA9ICdhZnRlclJlYWQnOyAvLyBwdXJlLWxvZ2ljIG1vZGlmaWVyc1xuXG52YXIgYmVmb3JlTWFpbiA9ICdiZWZvcmVNYWluJztcbnZhciBtYWluID0gJ21haW4nO1xudmFyIGFmdGVyTWFpbiA9ICdhZnRlck1haW4nOyAvLyBtb2RpZmllciB3aXRoIHRoZSBwdXJwb3NlIHRvIHdyaXRlIHRvIHRoZSBET00gKG9yIHdyaXRlIGludG8gYSBmcmFtZXdvcmsgc3RhdGUpXG5cbnZhciBiZWZvcmVXcml0ZSA9ICdiZWZvcmVXcml0ZSc7XG52YXIgd3JpdGUgPSAnd3JpdGUnO1xudmFyIGFmdGVyV3JpdGUgPSAnYWZ0ZXJXcml0ZSc7XG52YXIgbW9kaWZpZXJQaGFzZXMgPSBbYmVmb3JlUmVhZCwgcmVhZCwgYWZ0ZXJSZWFkLCBiZWZvcmVNYWluLCBtYWluLCBhZnRlck1haW4sIGJlZm9yZVdyaXRlLCB3cml0ZSwgYWZ0ZXJXcml0ZV07XG5cbmZ1bmN0aW9uIG9yZGVyKG1vZGlmaWVycykge1xuICB2YXIgbWFwID0gbmV3IE1hcCgpO1xuICB2YXIgdmlzaXRlZCA9IG5ldyBTZXQoKTtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICBtb2RpZmllcnMuZm9yRWFjaChmdW5jdGlvbiAobW9kaWZpZXIpIHtcbiAgICBtYXAuc2V0KG1vZGlmaWVyLm5hbWUsIG1vZGlmaWVyKTtcbiAgfSk7IC8vIE9uIHZpc2l0aW5nIG9iamVjdCwgY2hlY2sgZm9yIGl0cyBkZXBlbmRlbmNpZXMgYW5kIHZpc2l0IHRoZW0gcmVjdXJzaXZlbHlcblxuICBmdW5jdGlvbiBzb3J0KG1vZGlmaWVyKSB7XG4gICAgdmlzaXRlZC5hZGQobW9kaWZpZXIubmFtZSk7XG4gICAgdmFyIHJlcXVpcmVzID0gW10uY29uY2F0KG1vZGlmaWVyLnJlcXVpcmVzIHx8IFtdLCBtb2RpZmllci5yZXF1aXJlc0lmRXhpc3RzIHx8IFtdKTtcbiAgICByZXF1aXJlcy5mb3JFYWNoKGZ1bmN0aW9uIChkZXApIHtcbiAgICAgIGlmICghdmlzaXRlZC5oYXMoZGVwKSkge1xuICAgICAgICB2YXIgZGVwTW9kaWZpZXIgPSBtYXAuZ2V0KGRlcCk7XG5cbiAgICAgICAgaWYgKGRlcE1vZGlmaWVyKSB7XG4gICAgICAgICAgc29ydChkZXBNb2RpZmllcik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXN1bHQucHVzaChtb2RpZmllcik7XG4gIH1cblxuICBtb2RpZmllcnMuZm9yRWFjaChmdW5jdGlvbiAobW9kaWZpZXIpIHtcbiAgICBpZiAoIXZpc2l0ZWQuaGFzKG1vZGlmaWVyLm5hbWUpKSB7XG4gICAgICAvLyBjaGVjayBmb3IgdmlzaXRlZCBvYmplY3RcbiAgICAgIHNvcnQobW9kaWZpZXIpO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIG9yZGVyTW9kaWZpZXJzKG1vZGlmaWVycykge1xuICAvLyBvcmRlciBiYXNlZCBvbiBkZXBlbmRlbmNpZXNcbiAgdmFyIG9yZGVyZWRNb2RpZmllcnMgPSBvcmRlcihtb2RpZmllcnMpOyAvLyBvcmRlciBiYXNlZCBvbiBwaGFzZVxuXG4gIHJldHVybiBtb2RpZmllclBoYXNlcy5yZWR1Y2UoZnVuY3Rpb24gKGFjYywgcGhhc2UpIHtcbiAgICByZXR1cm4gYWNjLmNvbmNhdChvcmRlcmVkTW9kaWZpZXJzLmZpbHRlcihmdW5jdGlvbiAobW9kaWZpZXIpIHtcbiAgICAgIHJldHVybiBtb2RpZmllci5waGFzZSA9PT0gcGhhc2U7XG4gICAgfSkpO1xuICB9LCBbXSk7XG59XG5cbmZ1bmN0aW9uIGRlYm91bmNlKGZuKSB7XG4gIHZhciBwZW5kaW5nO1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIGlmICghcGVuZGluZykge1xuICAgICAgcGVuZGluZyA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG4gICAgICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHBlbmRpbmcgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgcmVzb2x2ZShmbigpKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gcGVuZGluZztcbiAgfTtcbn1cblxuZnVuY3Rpb24gZm9ybWF0KHN0cikge1xuICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuID4gMSA/IF9sZW4gLSAxIDogMCksIF9rZXkgPSAxOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgYXJnc1tfa2V5IC0gMV0gPSBhcmd1bWVudHNbX2tleV07XG4gIH1cblxuICByZXR1cm4gW10uY29uY2F0KGFyZ3MpLnJlZHVjZShmdW5jdGlvbiAocCwgYykge1xuICAgIHJldHVybiBwLnJlcGxhY2UoLyVzLywgYyk7XG4gIH0sIHN0cik7XG59XG5cbnZhciBJTlZBTElEX01PRElGSUVSX0VSUk9SID0gJ1BvcHBlcjogbW9kaWZpZXIgXCIlc1wiIHByb3ZpZGVkIGFuIGludmFsaWQgJXMgcHJvcGVydHksIGV4cGVjdGVkICVzIGJ1dCBnb3QgJXMnO1xudmFyIE1JU1NJTkdfREVQRU5ERU5DWV9FUlJPUiA9ICdQb3BwZXI6IG1vZGlmaWVyIFwiJXNcIiByZXF1aXJlcyBcIiVzXCIsIGJ1dCBcIiVzXCIgbW9kaWZpZXIgaXMgbm90IGF2YWlsYWJsZSc7XG52YXIgVkFMSURfUFJPUEVSVElFUyA9IFsnbmFtZScsICdlbmFibGVkJywgJ3BoYXNlJywgJ2ZuJywgJ2VmZmVjdCcsICdyZXF1aXJlcycsICdvcHRpb25zJ107XG5mdW5jdGlvbiB2YWxpZGF0ZU1vZGlmaWVycyhtb2RpZmllcnMpIHtcbiAgbW9kaWZpZXJzLmZvckVhY2goZnVuY3Rpb24gKG1vZGlmaWVyKSB7XG4gICAgW10uY29uY2F0KE9iamVjdC5rZXlzKG1vZGlmaWVyKSwgVkFMSURfUFJPUEVSVElFUykgLy8gSUUxMS1jb21wYXRpYmxlIHJlcGxhY2VtZW50IGZvciBgbmV3IFNldChpdGVyYWJsZSlgXG4gICAgLmZpbHRlcihmdW5jdGlvbiAodmFsdWUsIGluZGV4LCBzZWxmKSB7XG4gICAgICByZXR1cm4gc2VsZi5pbmRleE9mKHZhbHVlKSA9PT0gaW5kZXg7XG4gICAgfSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICBzd2l0Y2ggKGtleSkge1xuICAgICAgICBjYXNlICduYW1lJzpcbiAgICAgICAgICBpZiAodHlwZW9mIG1vZGlmaWVyLm5hbWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGZvcm1hdChJTlZBTElEX01PRElGSUVSX0VSUk9SLCBTdHJpbmcobW9kaWZpZXIubmFtZSksICdcIm5hbWVcIicsICdcInN0cmluZ1wiJywgXCJcXFwiXCIgKyBTdHJpbmcobW9kaWZpZXIubmFtZSkgKyBcIlxcXCJcIikpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ2VuYWJsZWQnOlxuICAgICAgICAgIGlmICh0eXBlb2YgbW9kaWZpZXIuZW5hYmxlZCAhPT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGZvcm1hdChJTlZBTElEX01PRElGSUVSX0VSUk9SLCBtb2RpZmllci5uYW1lLCAnXCJlbmFibGVkXCInLCAnXCJib29sZWFuXCInLCBcIlxcXCJcIiArIFN0cmluZyhtb2RpZmllci5lbmFibGVkKSArIFwiXFxcIlwiKSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAncGhhc2UnOlxuICAgICAgICAgIGlmIChtb2RpZmllclBoYXNlcy5pbmRleE9mKG1vZGlmaWVyLnBoYXNlKSA8IDApIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZm9ybWF0KElOVkFMSURfTU9ESUZJRVJfRVJST1IsIG1vZGlmaWVyLm5hbWUsICdcInBoYXNlXCInLCBcImVpdGhlciBcIiArIG1vZGlmaWVyUGhhc2VzLmpvaW4oJywgJyksIFwiXFxcIlwiICsgU3RyaW5nKG1vZGlmaWVyLnBoYXNlKSArIFwiXFxcIlwiKSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnZm4nOlxuICAgICAgICAgIGlmICh0eXBlb2YgbW9kaWZpZXIuZm4gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZm9ybWF0KElOVkFMSURfTU9ESUZJRVJfRVJST1IsIG1vZGlmaWVyLm5hbWUsICdcImZuXCInLCAnXCJmdW5jdGlvblwiJywgXCJcXFwiXCIgKyBTdHJpbmcobW9kaWZpZXIuZm4pICsgXCJcXFwiXCIpKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdlZmZlY3QnOlxuICAgICAgICAgIGlmIChtb2RpZmllci5lZmZlY3QgIT0gbnVsbCAmJiB0eXBlb2YgbW9kaWZpZXIuZWZmZWN0ICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGZvcm1hdChJTlZBTElEX01PRElGSUVSX0VSUk9SLCBtb2RpZmllci5uYW1lLCAnXCJlZmZlY3RcIicsICdcImZ1bmN0aW9uXCInLCBcIlxcXCJcIiArIFN0cmluZyhtb2RpZmllci5mbikgKyBcIlxcXCJcIikpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ3JlcXVpcmVzJzpcbiAgICAgICAgICBpZiAobW9kaWZpZXIucmVxdWlyZXMgIT0gbnVsbCAmJiAhQXJyYXkuaXNBcnJheShtb2RpZmllci5yZXF1aXJlcykpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZm9ybWF0KElOVkFMSURfTU9ESUZJRVJfRVJST1IsIG1vZGlmaWVyLm5hbWUsICdcInJlcXVpcmVzXCInLCAnXCJhcnJheVwiJywgXCJcXFwiXCIgKyBTdHJpbmcobW9kaWZpZXIucmVxdWlyZXMpICsgXCJcXFwiXCIpKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdyZXF1aXJlc0lmRXhpc3RzJzpcbiAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkobW9kaWZpZXIucmVxdWlyZXNJZkV4aXN0cykpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZm9ybWF0KElOVkFMSURfTU9ESUZJRVJfRVJST1IsIG1vZGlmaWVyLm5hbWUsICdcInJlcXVpcmVzSWZFeGlzdHNcIicsICdcImFycmF5XCInLCBcIlxcXCJcIiArIFN0cmluZyhtb2RpZmllci5yZXF1aXJlc0lmRXhpc3RzKSArIFwiXFxcIlwiKSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnb3B0aW9ucyc6XG4gICAgICAgIGNhc2UgJ2RhdGEnOlxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgY29uc29sZS5lcnJvcihcIlBvcHBlckpTOiBhbiBpbnZhbGlkIHByb3BlcnR5IGhhcyBiZWVuIHByb3ZpZGVkIHRvIHRoZSBcXFwiXCIgKyBtb2RpZmllci5uYW1lICsgXCJcXFwiIG1vZGlmaWVyLCB2YWxpZCBwcm9wZXJ0aWVzIGFyZSBcIiArIFZBTElEX1BST1BFUlRJRVMubWFwKGZ1bmN0aW9uIChzKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJcXFwiXCIgKyBzICsgXCJcXFwiXCI7XG4gICAgICAgICAgfSkuam9pbignLCAnKSArIFwiOyBidXQgXFxcIlwiICsga2V5ICsgXCJcXFwiIHdhcyBwcm92aWRlZC5cIik7XG4gICAgICB9XG5cbiAgICAgIG1vZGlmaWVyLnJlcXVpcmVzICYmIG1vZGlmaWVyLnJlcXVpcmVzLmZvckVhY2goZnVuY3Rpb24gKHJlcXVpcmVtZW50KSB7XG4gICAgICAgIGlmIChtb2RpZmllcnMuZmluZChmdW5jdGlvbiAobW9kKSB7XG4gICAgICAgICAgcmV0dXJuIG1vZC5uYW1lID09PSByZXF1aXJlbWVudDtcbiAgICAgICAgfSkgPT0gbnVsbCkge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZm9ybWF0KE1JU1NJTkdfREVQRU5ERU5DWV9FUlJPUiwgU3RyaW5nKG1vZGlmaWVyLm5hbWUpLCByZXF1aXJlbWVudCwgcmVxdWlyZW1lbnQpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiB1bmlxdWVCeShhcnIsIGZuKSB7XG4gIHZhciBpZGVudGlmaWVycyA9IG5ldyBTZXQoKTtcbiAgcmV0dXJuIGFyci5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICB2YXIgaWRlbnRpZmllciA9IGZuKGl0ZW0pO1xuXG4gICAgaWYgKCFpZGVudGlmaWVycy5oYXMoaWRlbnRpZmllcikpIHtcbiAgICAgIGlkZW50aWZpZXJzLmFkZChpZGVudGlmaWVyKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGdldEJhc2VQbGFjZW1lbnQocGxhY2VtZW50KSB7XG4gIHJldHVybiBwbGFjZW1lbnQuc3BsaXQoJy0nKVswXTtcbn1cblxuZnVuY3Rpb24gbWVyZ2VCeU5hbWUobW9kaWZpZXJzKSB7XG4gIHZhciBtZXJnZWQgPSBtb2RpZmllcnMucmVkdWNlKGZ1bmN0aW9uIChtZXJnZWQsIGN1cnJlbnQpIHtcbiAgICB2YXIgZXhpc3RpbmcgPSBtZXJnZWRbY3VycmVudC5uYW1lXTtcbiAgICBtZXJnZWRbY3VycmVudC5uYW1lXSA9IGV4aXN0aW5nID8gT2JqZWN0LmFzc2lnbih7fSwgZXhpc3RpbmcsIGN1cnJlbnQsIHtcbiAgICAgIG9wdGlvbnM6IE9iamVjdC5hc3NpZ24oe30sIGV4aXN0aW5nLm9wdGlvbnMsIGN1cnJlbnQub3B0aW9ucyksXG4gICAgICBkYXRhOiBPYmplY3QuYXNzaWduKHt9LCBleGlzdGluZy5kYXRhLCBjdXJyZW50LmRhdGEpXG4gICAgfSkgOiBjdXJyZW50O1xuICAgIHJldHVybiBtZXJnZWQ7XG4gIH0sIHt9KTsgLy8gSUUxMSBkb2VzIG5vdCBzdXBwb3J0IE9iamVjdC52YWx1ZXNcblxuICByZXR1cm4gT2JqZWN0LmtleXMobWVyZ2VkKS5tYXAoZnVuY3Rpb24gKGtleSkge1xuICAgIHJldHVybiBtZXJnZWRba2V5XTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGdldFZpZXdwb3J0UmVjdChlbGVtZW50KSB7XG4gIHZhciB3aW4gPSBnZXRXaW5kb3coZWxlbWVudCk7XG4gIHZhciBodG1sID0gZ2V0RG9jdW1lbnRFbGVtZW50KGVsZW1lbnQpO1xuICB2YXIgdmlzdWFsVmlld3BvcnQgPSB3aW4udmlzdWFsVmlld3BvcnQ7XG4gIHZhciB3aWR0aCA9IGh0bWwuY2xpZW50V2lkdGg7XG4gIHZhciBoZWlnaHQgPSBodG1sLmNsaWVudEhlaWdodDtcbiAgdmFyIHggPSAwO1xuICB2YXIgeSA9IDA7IC8vIE5COiBUaGlzIGlzbid0IHN1cHBvcnRlZCBvbiBpT1MgPD0gMTIuIElmIHRoZSBrZXlib2FyZCBpcyBvcGVuLCB0aGUgcG9wcGVyXG4gIC8vIGNhbiBiZSBvYnNjdXJlZCB1bmRlcm5lYXRoIGl0LlxuICAvLyBBbHNvLCBgaHRtbC5jbGllbnRIZWlnaHRgIGFkZHMgdGhlIGJvdHRvbSBiYXIgaGVpZ2h0IGluIFNhZmFyaSBpT1MsIGV2ZW5cbiAgLy8gaWYgaXQgaXNuJ3Qgb3Blbiwgc28gaWYgdGhpcyBpc24ndCBhdmFpbGFibGUsIHRoZSBwb3BwZXIgd2lsbCBiZSBkZXRlY3RlZFxuICAvLyB0byBvdmVyZmxvdyB0aGUgYm90dG9tIG9mIHRoZSBzY3JlZW4gdG9vIGVhcmx5LlxuXG4gIGlmICh2aXN1YWxWaWV3cG9ydCkge1xuICAgIHdpZHRoID0gdmlzdWFsVmlld3BvcnQud2lkdGg7XG4gICAgaGVpZ2h0ID0gdmlzdWFsVmlld3BvcnQuaGVpZ2h0OyAvLyBVc2VzIExheW91dCBWaWV3cG9ydCAobGlrZSBDaHJvbWU7IFNhZmFyaSBkb2VzIG5vdCBjdXJyZW50bHkpXG4gICAgLy8gSW4gQ2hyb21lLCBpdCByZXR1cm5zIGEgdmFsdWUgdmVyeSBjbG9zZSB0byAwICgrLy0pIGJ1dCBjb250YWlucyByb3VuZGluZ1xuICAgIC8vIGVycm9ycyBkdWUgdG8gZmxvYXRpbmcgcG9pbnQgbnVtYmVycywgc28gd2UgbmVlZCB0byBjaGVjayBwcmVjaXNpb24uXG4gICAgLy8gU2FmYXJpIHJldHVybnMgYSBudW1iZXIgPD0gMCwgdXN1YWxseSA8IC0xIHdoZW4gcGluY2gtem9vbWVkXG4gICAgLy8gRmVhdHVyZSBkZXRlY3Rpb24gZmFpbHMgaW4gbW9iaWxlIGVtdWxhdGlvbiBtb2RlIGluIENocm9tZS5cbiAgICAvLyBNYXRoLmFicyh3aW4uaW5uZXJXaWR0aCAvIHZpc3VhbFZpZXdwb3J0LnNjYWxlIC0gdmlzdWFsVmlld3BvcnQud2lkdGgpIDxcbiAgICAvLyAwLjAwMVxuICAgIC8vIEZhbGxiYWNrIGhlcmU6IFwiTm90IFNhZmFyaVwiIHVzZXJBZ2VudFxuXG4gICAgaWYgKCEvXigoPyFjaHJvbWV8YW5kcm9pZCkuKSpzYWZhcmkvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpKSB7XG4gICAgICB4ID0gdmlzdWFsVmlld3BvcnQub2Zmc2V0TGVmdDtcbiAgICAgIHkgPSB2aXN1YWxWaWV3cG9ydC5vZmZzZXRUb3A7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICB3aWR0aDogd2lkdGgsXG4gICAgaGVpZ2h0OiBoZWlnaHQsXG4gICAgeDogeCArIGdldFdpbmRvd1Njcm9sbEJhclgoZWxlbWVudCksXG4gICAgeTogeVxuICB9O1xufVxuXG4vLyBvZiB0aGUgYDxodG1sPmAgYW5kIGA8Ym9keT5gIHJlY3QgYm91bmRzIGlmIGhvcml6b250YWxseSBzY3JvbGxhYmxlXG5cbmZ1bmN0aW9uIGdldERvY3VtZW50UmVjdChlbGVtZW50KSB7XG4gIHZhciBfZWxlbWVudCRvd25lckRvY3VtZW47XG5cbiAgdmFyIGh0bWwgPSBnZXREb2N1bWVudEVsZW1lbnQoZWxlbWVudCk7XG4gIHZhciB3aW5TY3JvbGwgPSBnZXRXaW5kb3dTY3JvbGwoZWxlbWVudCk7XG4gIHZhciBib2R5ID0gKF9lbGVtZW50JG93bmVyRG9jdW1lbiA9IGVsZW1lbnQub3duZXJEb2N1bWVudCkgPT0gbnVsbCA/IHZvaWQgMCA6IF9lbGVtZW50JG93bmVyRG9jdW1lbi5ib2R5O1xuICB2YXIgd2lkdGggPSBtYXgoaHRtbC5zY3JvbGxXaWR0aCwgaHRtbC5jbGllbnRXaWR0aCwgYm9keSA/IGJvZHkuc2Nyb2xsV2lkdGggOiAwLCBib2R5ID8gYm9keS5jbGllbnRXaWR0aCA6IDApO1xuICB2YXIgaGVpZ2h0ID0gbWF4KGh0bWwuc2Nyb2xsSGVpZ2h0LCBodG1sLmNsaWVudEhlaWdodCwgYm9keSA/IGJvZHkuc2Nyb2xsSGVpZ2h0IDogMCwgYm9keSA/IGJvZHkuY2xpZW50SGVpZ2h0IDogMCk7XG4gIHZhciB4ID0gLXdpblNjcm9sbC5zY3JvbGxMZWZ0ICsgZ2V0V2luZG93U2Nyb2xsQmFyWChlbGVtZW50KTtcbiAgdmFyIHkgPSAtd2luU2Nyb2xsLnNjcm9sbFRvcDtcblxuICBpZiAoZ2V0Q29tcHV0ZWRTdHlsZShib2R5IHx8IGh0bWwpLmRpcmVjdGlvbiA9PT0gJ3J0bCcpIHtcbiAgICB4ICs9IG1heChodG1sLmNsaWVudFdpZHRoLCBib2R5ID8gYm9keS5jbGllbnRXaWR0aCA6IDApIC0gd2lkdGg7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHdpZHRoOiB3aWR0aCxcbiAgICBoZWlnaHQ6IGhlaWdodCxcbiAgICB4OiB4LFxuICAgIHk6IHlcbiAgfTtcbn1cblxuZnVuY3Rpb24gY29udGFpbnMocGFyZW50LCBjaGlsZCkge1xuICB2YXIgcm9vdE5vZGUgPSBjaGlsZC5nZXRSb290Tm9kZSAmJiBjaGlsZC5nZXRSb290Tm9kZSgpOyAvLyBGaXJzdCwgYXR0ZW1wdCB3aXRoIGZhc3RlciBuYXRpdmUgbWV0aG9kXG5cbiAgaWYgKHBhcmVudC5jb250YWlucyhjaGlsZCkpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSAvLyB0aGVuIGZhbGxiYWNrIHRvIGN1c3RvbSBpbXBsZW1lbnRhdGlvbiB3aXRoIFNoYWRvdyBET00gc3VwcG9ydFxuICBlbHNlIGlmIChyb290Tm9kZSAmJiBpc1NoYWRvd1Jvb3Qocm9vdE5vZGUpKSB7XG4gICAgICB2YXIgbmV4dCA9IGNoaWxkO1xuXG4gICAgICBkbyB7XG4gICAgICAgIGlmIChuZXh0ICYmIHBhcmVudC5pc1NhbWVOb2RlKG5leHQpKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gLy8gJEZsb3dGaXhNZVtwcm9wLW1pc3NpbmddOiBuZWVkIGEgYmV0dGVyIHdheSB0byBoYW5kbGUgdGhpcy4uLlxuXG5cbiAgICAgICAgbmV4dCA9IG5leHQucGFyZW50Tm9kZSB8fCBuZXh0Lmhvc3Q7XG4gICAgICB9IHdoaWxlIChuZXh0KTtcbiAgICB9IC8vIEdpdmUgdXAsIHRoZSByZXN1bHQgaXMgZmFsc2VcblxuXG4gIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gcmVjdFRvQ2xpZW50UmVjdChyZWN0KSB7XG4gIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCByZWN0LCB7XG4gICAgbGVmdDogcmVjdC54LFxuICAgIHRvcDogcmVjdC55LFxuICAgIHJpZ2h0OiByZWN0LnggKyByZWN0LndpZHRoLFxuICAgIGJvdHRvbTogcmVjdC55ICsgcmVjdC5oZWlnaHRcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGdldElubmVyQm91bmRpbmdDbGllbnRSZWN0KGVsZW1lbnQpIHtcbiAgdmFyIHJlY3QgPSBnZXRCb3VuZGluZ0NsaWVudFJlY3QoZWxlbWVudCk7XG4gIHJlY3QudG9wID0gcmVjdC50b3AgKyBlbGVtZW50LmNsaWVudFRvcDtcbiAgcmVjdC5sZWZ0ID0gcmVjdC5sZWZ0ICsgZWxlbWVudC5jbGllbnRMZWZ0O1xuICByZWN0LmJvdHRvbSA9IHJlY3QudG9wICsgZWxlbWVudC5jbGllbnRIZWlnaHQ7XG4gIHJlY3QucmlnaHQgPSByZWN0LmxlZnQgKyBlbGVtZW50LmNsaWVudFdpZHRoO1xuICByZWN0LndpZHRoID0gZWxlbWVudC5jbGllbnRXaWR0aDtcbiAgcmVjdC5oZWlnaHQgPSBlbGVtZW50LmNsaWVudEhlaWdodDtcbiAgcmVjdC54ID0gcmVjdC5sZWZ0O1xuICByZWN0LnkgPSByZWN0LnRvcDtcbiAgcmV0dXJuIHJlY3Q7XG59XG5cbmZ1bmN0aW9uIGdldENsaWVudFJlY3RGcm9tTWl4ZWRUeXBlKGVsZW1lbnQsIGNsaXBwaW5nUGFyZW50KSB7XG4gIHJldHVybiBjbGlwcGluZ1BhcmVudCA9PT0gdmlld3BvcnQgPyByZWN0VG9DbGllbnRSZWN0KGdldFZpZXdwb3J0UmVjdChlbGVtZW50KSkgOiBpc0VsZW1lbnQoY2xpcHBpbmdQYXJlbnQpID8gZ2V0SW5uZXJCb3VuZGluZ0NsaWVudFJlY3QoY2xpcHBpbmdQYXJlbnQpIDogcmVjdFRvQ2xpZW50UmVjdChnZXREb2N1bWVudFJlY3QoZ2V0RG9jdW1lbnRFbGVtZW50KGVsZW1lbnQpKSk7XG59IC8vIEEgXCJjbGlwcGluZyBwYXJlbnRcIiBpcyBhbiBvdmVyZmxvd2FibGUgY29udGFpbmVyIHdpdGggdGhlIGNoYXJhY3RlcmlzdGljIG9mXG4vLyBjbGlwcGluZyAob3IgaGlkaW5nKSBvdmVyZmxvd2luZyBlbGVtZW50cyB3aXRoIGEgcG9zaXRpb24gZGlmZmVyZW50IGZyb21cbi8vIGBpbml0aWFsYFxuXG5cbmZ1bmN0aW9uIGdldENsaXBwaW5nUGFyZW50cyhlbGVtZW50KSB7XG4gIHZhciBjbGlwcGluZ1BhcmVudHMgPSBsaXN0U2Nyb2xsUGFyZW50cyhnZXRQYXJlbnROb2RlKGVsZW1lbnQpKTtcbiAgdmFyIGNhbkVzY2FwZUNsaXBwaW5nID0gWydhYnNvbHV0ZScsICdmaXhlZCddLmluZGV4T2YoZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KS5wb3NpdGlvbikgPj0gMDtcbiAgdmFyIGNsaXBwZXJFbGVtZW50ID0gY2FuRXNjYXBlQ2xpcHBpbmcgJiYgaXNIVE1MRWxlbWVudChlbGVtZW50KSA/IGdldE9mZnNldFBhcmVudChlbGVtZW50KSA6IGVsZW1lbnQ7XG5cbiAgaWYgKCFpc0VsZW1lbnQoY2xpcHBlckVsZW1lbnQpKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9IC8vICRGbG93Rml4TWVbaW5jb21wYXRpYmxlLXJldHVybl06IGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9mbG93L2lzc3Vlcy8xNDE0XG5cblxuICByZXR1cm4gY2xpcHBpbmdQYXJlbnRzLmZpbHRlcihmdW5jdGlvbiAoY2xpcHBpbmdQYXJlbnQpIHtcbiAgICByZXR1cm4gaXNFbGVtZW50KGNsaXBwaW5nUGFyZW50KSAmJiBjb250YWlucyhjbGlwcGluZ1BhcmVudCwgY2xpcHBlckVsZW1lbnQpICYmIGdldE5vZGVOYW1lKGNsaXBwaW5nUGFyZW50KSAhPT0gJ2JvZHknICYmIChjYW5Fc2NhcGVDbGlwcGluZyA/IGdldENvbXB1dGVkU3R5bGUoY2xpcHBpbmdQYXJlbnQpLnBvc2l0aW9uICE9PSAnc3RhdGljJyA6IHRydWUpO1xuICB9KTtcbn0gLy8gR2V0cyB0aGUgbWF4aW11bSBhcmVhIHRoYXQgdGhlIGVsZW1lbnQgaXMgdmlzaWJsZSBpbiBkdWUgdG8gYW55IG51bWJlciBvZlxuLy8gY2xpcHBpbmcgcGFyZW50c1xuXG5cbmZ1bmN0aW9uIGdldENsaXBwaW5nUmVjdChlbGVtZW50LCBib3VuZGFyeSwgcm9vdEJvdW5kYXJ5KSB7XG4gIHZhciBtYWluQ2xpcHBpbmdQYXJlbnRzID0gYm91bmRhcnkgPT09ICdjbGlwcGluZ1BhcmVudHMnID8gZ2V0Q2xpcHBpbmdQYXJlbnRzKGVsZW1lbnQpIDogW10uY29uY2F0KGJvdW5kYXJ5KTtcbiAgdmFyIGNsaXBwaW5nUGFyZW50cyA9IFtdLmNvbmNhdChtYWluQ2xpcHBpbmdQYXJlbnRzLCBbcm9vdEJvdW5kYXJ5XSk7XG4gIHZhciBmaXJzdENsaXBwaW5nUGFyZW50ID0gY2xpcHBpbmdQYXJlbnRzWzBdO1xuICB2YXIgY2xpcHBpbmdSZWN0ID0gY2xpcHBpbmdQYXJlbnRzLnJlZHVjZShmdW5jdGlvbiAoYWNjUmVjdCwgY2xpcHBpbmdQYXJlbnQpIHtcbiAgICB2YXIgcmVjdCA9IGdldENsaWVudFJlY3RGcm9tTWl4ZWRUeXBlKGVsZW1lbnQsIGNsaXBwaW5nUGFyZW50KTtcbiAgICBhY2NSZWN0LnRvcCA9IG1heChyZWN0LnRvcCwgYWNjUmVjdC50b3ApO1xuICAgIGFjY1JlY3QucmlnaHQgPSBtaW4ocmVjdC5yaWdodCwgYWNjUmVjdC5yaWdodCk7XG4gICAgYWNjUmVjdC5ib3R0b20gPSBtaW4ocmVjdC5ib3R0b20sIGFjY1JlY3QuYm90dG9tKTtcbiAgICBhY2NSZWN0LmxlZnQgPSBtYXgocmVjdC5sZWZ0LCBhY2NSZWN0LmxlZnQpO1xuICAgIHJldHVybiBhY2NSZWN0O1xuICB9LCBnZXRDbGllbnRSZWN0RnJvbU1peGVkVHlwZShlbGVtZW50LCBmaXJzdENsaXBwaW5nUGFyZW50KSk7XG4gIGNsaXBwaW5nUmVjdC53aWR0aCA9IGNsaXBwaW5nUmVjdC5yaWdodCAtIGNsaXBwaW5nUmVjdC5sZWZ0O1xuICBjbGlwcGluZ1JlY3QuaGVpZ2h0ID0gY2xpcHBpbmdSZWN0LmJvdHRvbSAtIGNsaXBwaW5nUmVjdC50b3A7XG4gIGNsaXBwaW5nUmVjdC54ID0gY2xpcHBpbmdSZWN0LmxlZnQ7XG4gIGNsaXBwaW5nUmVjdC55ID0gY2xpcHBpbmdSZWN0LnRvcDtcbiAgcmV0dXJuIGNsaXBwaW5nUmVjdDtcbn1cblxuZnVuY3Rpb24gZ2V0VmFyaWF0aW9uKHBsYWNlbWVudCkge1xuICByZXR1cm4gcGxhY2VtZW50LnNwbGl0KCctJylbMV07XG59XG5cbmZ1bmN0aW9uIGdldE1haW5BeGlzRnJvbVBsYWNlbWVudChwbGFjZW1lbnQpIHtcbiAgcmV0dXJuIFsndG9wJywgJ2JvdHRvbSddLmluZGV4T2YocGxhY2VtZW50KSA+PSAwID8gJ3gnIDogJ3knO1xufVxuXG5mdW5jdGlvbiBjb21wdXRlT2Zmc2V0cyhfcmVmKSB7XG4gIHZhciByZWZlcmVuY2UgPSBfcmVmLnJlZmVyZW5jZSxcbiAgICAgIGVsZW1lbnQgPSBfcmVmLmVsZW1lbnQsXG4gICAgICBwbGFjZW1lbnQgPSBfcmVmLnBsYWNlbWVudDtcbiAgdmFyIGJhc2VQbGFjZW1lbnQgPSBwbGFjZW1lbnQgPyBnZXRCYXNlUGxhY2VtZW50KHBsYWNlbWVudCkgOiBudWxsO1xuICB2YXIgdmFyaWF0aW9uID0gcGxhY2VtZW50ID8gZ2V0VmFyaWF0aW9uKHBsYWNlbWVudCkgOiBudWxsO1xuICB2YXIgY29tbW9uWCA9IHJlZmVyZW5jZS54ICsgcmVmZXJlbmNlLndpZHRoIC8gMiAtIGVsZW1lbnQud2lkdGggLyAyO1xuICB2YXIgY29tbW9uWSA9IHJlZmVyZW5jZS55ICsgcmVmZXJlbmNlLmhlaWdodCAvIDIgLSBlbGVtZW50LmhlaWdodCAvIDI7XG4gIHZhciBvZmZzZXRzO1xuXG4gIHN3aXRjaCAoYmFzZVBsYWNlbWVudCkge1xuICAgIGNhc2UgdG9wOlxuICAgICAgb2Zmc2V0cyA9IHtcbiAgICAgICAgeDogY29tbW9uWCxcbiAgICAgICAgeTogcmVmZXJlbmNlLnkgLSBlbGVtZW50LmhlaWdodFxuICAgICAgfTtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSBib3R0b206XG4gICAgICBvZmZzZXRzID0ge1xuICAgICAgICB4OiBjb21tb25YLFxuICAgICAgICB5OiByZWZlcmVuY2UueSArIHJlZmVyZW5jZS5oZWlnaHRcbiAgICAgIH07XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgcmlnaHQ6XG4gICAgICBvZmZzZXRzID0ge1xuICAgICAgICB4OiByZWZlcmVuY2UueCArIHJlZmVyZW5jZS53aWR0aCxcbiAgICAgICAgeTogY29tbW9uWVxuICAgICAgfTtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSBsZWZ0OlxuICAgICAgb2Zmc2V0cyA9IHtcbiAgICAgICAgeDogcmVmZXJlbmNlLnggLSBlbGVtZW50LndpZHRoLFxuICAgICAgICB5OiBjb21tb25ZXG4gICAgICB9O1xuICAgICAgYnJlYWs7XG5cbiAgICBkZWZhdWx0OlxuICAgICAgb2Zmc2V0cyA9IHtcbiAgICAgICAgeDogcmVmZXJlbmNlLngsXG4gICAgICAgIHk6IHJlZmVyZW5jZS55XG4gICAgICB9O1xuICB9XG5cbiAgdmFyIG1haW5BeGlzID0gYmFzZVBsYWNlbWVudCA/IGdldE1haW5BeGlzRnJvbVBsYWNlbWVudChiYXNlUGxhY2VtZW50KSA6IG51bGw7XG5cbiAgaWYgKG1haW5BeGlzICE9IG51bGwpIHtcbiAgICB2YXIgbGVuID0gbWFpbkF4aXMgPT09ICd5JyA/ICdoZWlnaHQnIDogJ3dpZHRoJztcblxuICAgIHN3aXRjaCAodmFyaWF0aW9uKSB7XG4gICAgICBjYXNlIHN0YXJ0OlxuICAgICAgICBvZmZzZXRzW21haW5BeGlzXSA9IG9mZnNldHNbbWFpbkF4aXNdIC0gKHJlZmVyZW5jZVtsZW5dIC8gMiAtIGVsZW1lbnRbbGVuXSAvIDIpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBlbmQ6XG4gICAgICAgIG9mZnNldHNbbWFpbkF4aXNdID0gb2Zmc2V0c1ttYWluQXhpc10gKyAocmVmZXJlbmNlW2xlbl0gLyAyIC0gZWxlbWVudFtsZW5dIC8gMik7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBvZmZzZXRzO1xufVxuXG5mdW5jdGlvbiBnZXRGcmVzaFNpZGVPYmplY3QoKSB7XG4gIHJldHVybiB7XG4gICAgdG9wOiAwLFxuICAgIHJpZ2h0OiAwLFxuICAgIGJvdHRvbTogMCxcbiAgICBsZWZ0OiAwXG4gIH07XG59XG5cbmZ1bmN0aW9uIG1lcmdlUGFkZGluZ09iamVjdChwYWRkaW5nT2JqZWN0KSB7XG4gIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBnZXRGcmVzaFNpZGVPYmplY3QoKSwgcGFkZGluZ09iamVjdCk7XG59XG5cbmZ1bmN0aW9uIGV4cGFuZFRvSGFzaE1hcCh2YWx1ZSwga2V5cykge1xuICByZXR1cm4ga2V5cy5yZWR1Y2UoZnVuY3Rpb24gKGhhc2hNYXAsIGtleSkge1xuICAgIGhhc2hNYXBba2V5XSA9IHZhbHVlO1xuICAgIHJldHVybiBoYXNoTWFwO1xuICB9LCB7fSk7XG59XG5cbmZ1bmN0aW9uIGRldGVjdE92ZXJmbG93KHN0YXRlLCBvcHRpb25zKSB7XG4gIGlmIChvcHRpb25zID09PSB2b2lkIDApIHtcbiAgICBvcHRpb25zID0ge307XG4gIH1cblxuICB2YXIgX29wdGlvbnMgPSBvcHRpb25zLFxuICAgICAgX29wdGlvbnMkcGxhY2VtZW50ID0gX29wdGlvbnMucGxhY2VtZW50LFxuICAgICAgcGxhY2VtZW50ID0gX29wdGlvbnMkcGxhY2VtZW50ID09PSB2b2lkIDAgPyBzdGF0ZS5wbGFjZW1lbnQgOiBfb3B0aW9ucyRwbGFjZW1lbnQsXG4gICAgICBfb3B0aW9ucyRib3VuZGFyeSA9IF9vcHRpb25zLmJvdW5kYXJ5LFxuICAgICAgYm91bmRhcnkgPSBfb3B0aW9ucyRib3VuZGFyeSA9PT0gdm9pZCAwID8gY2xpcHBpbmdQYXJlbnRzIDogX29wdGlvbnMkYm91bmRhcnksXG4gICAgICBfb3B0aW9ucyRyb290Qm91bmRhcnkgPSBfb3B0aW9ucy5yb290Qm91bmRhcnksXG4gICAgICByb290Qm91bmRhcnkgPSBfb3B0aW9ucyRyb290Qm91bmRhcnkgPT09IHZvaWQgMCA/IHZpZXdwb3J0IDogX29wdGlvbnMkcm9vdEJvdW5kYXJ5LFxuICAgICAgX29wdGlvbnMkZWxlbWVudENvbnRlID0gX29wdGlvbnMuZWxlbWVudENvbnRleHQsXG4gICAgICBlbGVtZW50Q29udGV4dCA9IF9vcHRpb25zJGVsZW1lbnRDb250ZSA9PT0gdm9pZCAwID8gcG9wcGVyIDogX29wdGlvbnMkZWxlbWVudENvbnRlLFxuICAgICAgX29wdGlvbnMkYWx0Qm91bmRhcnkgPSBfb3B0aW9ucy5hbHRCb3VuZGFyeSxcbiAgICAgIGFsdEJvdW5kYXJ5ID0gX29wdGlvbnMkYWx0Qm91bmRhcnkgPT09IHZvaWQgMCA/IGZhbHNlIDogX29wdGlvbnMkYWx0Qm91bmRhcnksXG4gICAgICBfb3B0aW9ucyRwYWRkaW5nID0gX29wdGlvbnMucGFkZGluZyxcbiAgICAgIHBhZGRpbmcgPSBfb3B0aW9ucyRwYWRkaW5nID09PSB2b2lkIDAgPyAwIDogX29wdGlvbnMkcGFkZGluZztcbiAgdmFyIHBhZGRpbmdPYmplY3QgPSBtZXJnZVBhZGRpbmdPYmplY3QodHlwZW9mIHBhZGRpbmcgIT09ICdudW1iZXInID8gcGFkZGluZyA6IGV4cGFuZFRvSGFzaE1hcChwYWRkaW5nLCBiYXNlUGxhY2VtZW50cykpO1xuICB2YXIgYWx0Q29udGV4dCA9IGVsZW1lbnRDb250ZXh0ID09PSBwb3BwZXIgPyByZWZlcmVuY2UgOiBwb3BwZXI7XG4gIHZhciBwb3BwZXJSZWN0ID0gc3RhdGUucmVjdHMucG9wcGVyO1xuICB2YXIgZWxlbWVudCA9IHN0YXRlLmVsZW1lbnRzW2FsdEJvdW5kYXJ5ID8gYWx0Q29udGV4dCA6IGVsZW1lbnRDb250ZXh0XTtcbiAgdmFyIGNsaXBwaW5nQ2xpZW50UmVjdCA9IGdldENsaXBwaW5nUmVjdChpc0VsZW1lbnQoZWxlbWVudCkgPyBlbGVtZW50IDogZWxlbWVudC5jb250ZXh0RWxlbWVudCB8fCBnZXREb2N1bWVudEVsZW1lbnQoc3RhdGUuZWxlbWVudHMucG9wcGVyKSwgYm91bmRhcnksIHJvb3RCb3VuZGFyeSk7XG4gIHZhciByZWZlcmVuY2VDbGllbnRSZWN0ID0gZ2V0Qm91bmRpbmdDbGllbnRSZWN0KHN0YXRlLmVsZW1lbnRzLnJlZmVyZW5jZSk7XG4gIHZhciBwb3BwZXJPZmZzZXRzID0gY29tcHV0ZU9mZnNldHMoe1xuICAgIHJlZmVyZW5jZTogcmVmZXJlbmNlQ2xpZW50UmVjdCxcbiAgICBlbGVtZW50OiBwb3BwZXJSZWN0LFxuICAgIHN0cmF0ZWd5OiAnYWJzb2x1dGUnLFxuICAgIHBsYWNlbWVudDogcGxhY2VtZW50XG4gIH0pO1xuICB2YXIgcG9wcGVyQ2xpZW50UmVjdCA9IHJlY3RUb0NsaWVudFJlY3QoT2JqZWN0LmFzc2lnbih7fSwgcG9wcGVyUmVjdCwgcG9wcGVyT2Zmc2V0cykpO1xuICB2YXIgZWxlbWVudENsaWVudFJlY3QgPSBlbGVtZW50Q29udGV4dCA9PT0gcG9wcGVyID8gcG9wcGVyQ2xpZW50UmVjdCA6IHJlZmVyZW5jZUNsaWVudFJlY3Q7IC8vIHBvc2l0aXZlID0gb3ZlcmZsb3dpbmcgdGhlIGNsaXBwaW5nIHJlY3RcbiAgLy8gMCBvciBuZWdhdGl2ZSA9IHdpdGhpbiB0aGUgY2xpcHBpbmcgcmVjdFxuXG4gIHZhciBvdmVyZmxvd09mZnNldHMgPSB7XG4gICAgdG9wOiBjbGlwcGluZ0NsaWVudFJlY3QudG9wIC0gZWxlbWVudENsaWVudFJlY3QudG9wICsgcGFkZGluZ09iamVjdC50b3AsXG4gICAgYm90dG9tOiBlbGVtZW50Q2xpZW50UmVjdC5ib3R0b20gLSBjbGlwcGluZ0NsaWVudFJlY3QuYm90dG9tICsgcGFkZGluZ09iamVjdC5ib3R0b20sXG4gICAgbGVmdDogY2xpcHBpbmdDbGllbnRSZWN0LmxlZnQgLSBlbGVtZW50Q2xpZW50UmVjdC5sZWZ0ICsgcGFkZGluZ09iamVjdC5sZWZ0LFxuICAgIHJpZ2h0OiBlbGVtZW50Q2xpZW50UmVjdC5yaWdodCAtIGNsaXBwaW5nQ2xpZW50UmVjdC5yaWdodCArIHBhZGRpbmdPYmplY3QucmlnaHRcbiAgfTtcbiAgdmFyIG9mZnNldERhdGEgPSBzdGF0ZS5tb2RpZmllcnNEYXRhLm9mZnNldDsgLy8gT2Zmc2V0cyBjYW4gYmUgYXBwbGllZCBvbmx5IHRvIHRoZSBwb3BwZXIgZWxlbWVudFxuXG4gIGlmIChlbGVtZW50Q29udGV4dCA9PT0gcG9wcGVyICYmIG9mZnNldERhdGEpIHtcbiAgICB2YXIgb2Zmc2V0ID0gb2Zmc2V0RGF0YVtwbGFjZW1lbnRdO1xuICAgIE9iamVjdC5rZXlzKG92ZXJmbG93T2Zmc2V0cykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICB2YXIgbXVsdGlwbHkgPSBbcmlnaHQsIGJvdHRvbV0uaW5kZXhPZihrZXkpID49IDAgPyAxIDogLTE7XG4gICAgICB2YXIgYXhpcyA9IFt0b3AsIGJvdHRvbV0uaW5kZXhPZihrZXkpID49IDAgPyAneScgOiAneCc7XG4gICAgICBvdmVyZmxvd09mZnNldHNba2V5XSArPSBvZmZzZXRbYXhpc10gKiBtdWx0aXBseTtcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiBvdmVyZmxvd09mZnNldHM7XG59XG5cbnZhciBJTlZBTElEX0VMRU1FTlRfRVJST1IgPSAnUG9wcGVyOiBJbnZhbGlkIHJlZmVyZW5jZSBvciBwb3BwZXIgYXJndW1lbnQgcHJvdmlkZWQuIFRoZXkgbXVzdCBiZSBlaXRoZXIgYSBET00gZWxlbWVudCBvciB2aXJ0dWFsIGVsZW1lbnQuJztcbnZhciBJTkZJTklURV9MT09QX0VSUk9SID0gJ1BvcHBlcjogQW4gaW5maW5pdGUgbG9vcCBpbiB0aGUgbW9kaWZpZXJzIGN5Y2xlIGhhcyBiZWVuIGRldGVjdGVkISBUaGUgY3ljbGUgaGFzIGJlZW4gaW50ZXJydXB0ZWQgdG8gcHJldmVudCBhIGJyb3dzZXIgY3Jhc2guJztcbnZhciBERUZBVUxUX09QVElPTlMgPSB7XG4gIHBsYWNlbWVudDogJ2JvdHRvbScsXG4gIG1vZGlmaWVyczogW10sXG4gIHN0cmF0ZWd5OiAnYWJzb2x1dGUnXG59O1xuXG5mdW5jdGlvbiBhcmVWYWxpZEVsZW1lbnRzKCkge1xuICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICBhcmdzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICB9XG5cbiAgcmV0dXJuICFhcmdzLnNvbWUoZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICByZXR1cm4gIShlbGVtZW50ICYmIHR5cGVvZiBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCA9PT0gJ2Z1bmN0aW9uJyk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBwb3BwZXJHZW5lcmF0b3IoZ2VuZXJhdG9yT3B0aW9ucykge1xuICBpZiAoZ2VuZXJhdG9yT3B0aW9ucyA9PT0gdm9pZCAwKSB7XG4gICAgZ2VuZXJhdG9yT3B0aW9ucyA9IHt9O1xuICB9XG5cbiAgdmFyIF9nZW5lcmF0b3JPcHRpb25zID0gZ2VuZXJhdG9yT3B0aW9ucyxcbiAgICAgIF9nZW5lcmF0b3JPcHRpb25zJGRlZiA9IF9nZW5lcmF0b3JPcHRpb25zLmRlZmF1bHRNb2RpZmllcnMsXG4gICAgICBkZWZhdWx0TW9kaWZpZXJzID0gX2dlbmVyYXRvck9wdGlvbnMkZGVmID09PSB2b2lkIDAgPyBbXSA6IF9nZW5lcmF0b3JPcHRpb25zJGRlZixcbiAgICAgIF9nZW5lcmF0b3JPcHRpb25zJGRlZjIgPSBfZ2VuZXJhdG9yT3B0aW9ucy5kZWZhdWx0T3B0aW9ucyxcbiAgICAgIGRlZmF1bHRPcHRpb25zID0gX2dlbmVyYXRvck9wdGlvbnMkZGVmMiA9PT0gdm9pZCAwID8gREVGQVVMVF9PUFRJT05TIDogX2dlbmVyYXRvck9wdGlvbnMkZGVmMjtcbiAgcmV0dXJuIGZ1bmN0aW9uIGNyZWF0ZVBvcHBlcihyZWZlcmVuY2UsIHBvcHBlciwgb3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHtcbiAgICAgIG9wdGlvbnMgPSBkZWZhdWx0T3B0aW9ucztcbiAgICB9XG5cbiAgICB2YXIgc3RhdGUgPSB7XG4gICAgICBwbGFjZW1lbnQ6ICdib3R0b20nLFxuICAgICAgb3JkZXJlZE1vZGlmaWVyczogW10sXG4gICAgICBvcHRpb25zOiBPYmplY3QuYXNzaWduKHt9LCBERUZBVUxUX09QVElPTlMsIGRlZmF1bHRPcHRpb25zKSxcbiAgICAgIG1vZGlmaWVyc0RhdGE6IHt9LFxuICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgcmVmZXJlbmNlOiByZWZlcmVuY2UsXG4gICAgICAgIHBvcHBlcjogcG9wcGVyXG4gICAgICB9LFxuICAgICAgYXR0cmlidXRlczoge30sXG4gICAgICBzdHlsZXM6IHt9XG4gICAgfTtcbiAgICB2YXIgZWZmZWN0Q2xlYW51cEZucyA9IFtdO1xuICAgIHZhciBpc0Rlc3Ryb3llZCA9IGZhbHNlO1xuICAgIHZhciBpbnN0YW5jZSA9IHtcbiAgICAgIHN0YXRlOiBzdGF0ZSxcbiAgICAgIHNldE9wdGlvbnM6IGZ1bmN0aW9uIHNldE9wdGlvbnMoc2V0T3B0aW9uc0FjdGlvbikge1xuICAgICAgICB2YXIgb3B0aW9ucyA9IHR5cGVvZiBzZXRPcHRpb25zQWN0aW9uID09PSAnZnVuY3Rpb24nID8gc2V0T3B0aW9uc0FjdGlvbihzdGF0ZS5vcHRpb25zKSA6IHNldE9wdGlvbnNBY3Rpb247XG4gICAgICAgIGNsZWFudXBNb2RpZmllckVmZmVjdHMoKTtcbiAgICAgICAgc3RhdGUub3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRPcHRpb25zLCBzdGF0ZS5vcHRpb25zLCBvcHRpb25zKTtcbiAgICAgICAgc3RhdGUuc2Nyb2xsUGFyZW50cyA9IHtcbiAgICAgICAgICByZWZlcmVuY2U6IGlzRWxlbWVudChyZWZlcmVuY2UpID8gbGlzdFNjcm9sbFBhcmVudHMocmVmZXJlbmNlKSA6IHJlZmVyZW5jZS5jb250ZXh0RWxlbWVudCA/IGxpc3RTY3JvbGxQYXJlbnRzKHJlZmVyZW5jZS5jb250ZXh0RWxlbWVudCkgOiBbXSxcbiAgICAgICAgICBwb3BwZXI6IGxpc3RTY3JvbGxQYXJlbnRzKHBvcHBlcilcbiAgICAgICAgfTsgLy8gT3JkZXJzIHRoZSBtb2RpZmllcnMgYmFzZWQgb24gdGhlaXIgZGVwZW5kZW5jaWVzIGFuZCBgcGhhc2VgXG4gICAgICAgIC8vIHByb3BlcnRpZXNcblxuICAgICAgICB2YXIgb3JkZXJlZE1vZGlmaWVycyA9IG9yZGVyTW9kaWZpZXJzKG1lcmdlQnlOYW1lKFtdLmNvbmNhdChkZWZhdWx0TW9kaWZpZXJzLCBzdGF0ZS5vcHRpb25zLm1vZGlmaWVycykpKTsgLy8gU3RyaXAgb3V0IGRpc2FibGVkIG1vZGlmaWVyc1xuXG4gICAgICAgIHN0YXRlLm9yZGVyZWRNb2RpZmllcnMgPSBvcmRlcmVkTW9kaWZpZXJzLmZpbHRlcihmdW5jdGlvbiAobSkge1xuICAgICAgICAgIHJldHVybiBtLmVuYWJsZWQ7XG4gICAgICAgIH0pOyAvLyBWYWxpZGF0ZSB0aGUgcHJvdmlkZWQgbW9kaWZpZXJzIHNvIHRoYXQgdGhlIGNvbnN1bWVyIHdpbGwgZ2V0IHdhcm5lZFxuICAgICAgICAvLyBpZiBvbmUgb2YgdGhlIG1vZGlmaWVycyBpcyBpbnZhbGlkIGZvciBhbnkgcmVhc29uXG5cbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAgICAgICAgIHZhciBtb2RpZmllcnMgPSB1bmlxdWVCeShbXS5jb25jYXQob3JkZXJlZE1vZGlmaWVycywgc3RhdGUub3B0aW9ucy5tb2RpZmllcnMpLCBmdW5jdGlvbiAoX3JlZikge1xuICAgICAgICAgICAgdmFyIG5hbWUgPSBfcmVmLm5hbWU7XG4gICAgICAgICAgICByZXR1cm4gbmFtZTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB2YWxpZGF0ZU1vZGlmaWVycyhtb2RpZmllcnMpO1xuXG4gICAgICAgICAgaWYgKGdldEJhc2VQbGFjZW1lbnQoc3RhdGUub3B0aW9ucy5wbGFjZW1lbnQpID09PSBhdXRvKSB7XG4gICAgICAgICAgICB2YXIgZmxpcE1vZGlmaWVyID0gc3RhdGUub3JkZXJlZE1vZGlmaWVycy5maW5kKGZ1bmN0aW9uIChfcmVmMikge1xuICAgICAgICAgICAgICB2YXIgbmFtZSA9IF9yZWYyLm5hbWU7XG4gICAgICAgICAgICAgIHJldHVybiBuYW1lID09PSAnZmxpcCc7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKCFmbGlwTW9kaWZpZXIpIHtcbiAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihbJ1BvcHBlcjogXCJhdXRvXCIgcGxhY2VtZW50cyByZXF1aXJlIHRoZSBcImZsaXBcIiBtb2RpZmllciBiZScsICdwcmVzZW50IGFuZCBlbmFibGVkIHRvIHdvcmsuJ10uam9pbignICcpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgX2dldENvbXB1dGVkU3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKHBvcHBlciksXG4gICAgICAgICAgICAgIG1hcmdpblRvcCA9IF9nZXRDb21wdXRlZFN0eWxlLm1hcmdpblRvcCxcbiAgICAgICAgICAgICAgbWFyZ2luUmlnaHQgPSBfZ2V0Q29tcHV0ZWRTdHlsZS5tYXJnaW5SaWdodCxcbiAgICAgICAgICAgICAgbWFyZ2luQm90dG9tID0gX2dldENvbXB1dGVkU3R5bGUubWFyZ2luQm90dG9tLFxuICAgICAgICAgICAgICBtYXJnaW5MZWZ0ID0gX2dldENvbXB1dGVkU3R5bGUubWFyZ2luTGVmdDsgLy8gV2Ugbm8gbG9uZ2VyIHRha2UgaW50byBhY2NvdW50IGBtYXJnaW5zYCBvbiB0aGUgcG9wcGVyLCBhbmQgaXQgY2FuXG4gICAgICAgICAgLy8gY2F1c2UgYnVncyB3aXRoIHBvc2l0aW9uaW5nLCBzbyB3ZSdsbCB3YXJuIHRoZSBjb25zdW1lclxuXG5cbiAgICAgICAgICBpZiAoW21hcmdpblRvcCwgbWFyZ2luUmlnaHQsIG1hcmdpbkJvdHRvbSwgbWFyZ2luTGVmdF0uc29tZShmdW5jdGlvbiAobWFyZ2luKSB7XG4gICAgICAgICAgICByZXR1cm4gcGFyc2VGbG9hdChtYXJnaW4pO1xuICAgICAgICAgIH0pKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oWydQb3BwZXI6IENTUyBcIm1hcmdpblwiIHN0eWxlcyBjYW5ub3QgYmUgdXNlZCB0byBhcHBseSBwYWRkaW5nJywgJ2JldHdlZW4gdGhlIHBvcHBlciBhbmQgaXRzIHJlZmVyZW5jZSBlbGVtZW50IG9yIGJvdW5kYXJ5LicsICdUbyByZXBsaWNhdGUgbWFyZ2luLCB1c2UgdGhlIGBvZmZzZXRgIG1vZGlmaWVyLCBhcyB3ZWxsIGFzJywgJ3RoZSBgcGFkZGluZ2Agb3B0aW9uIGluIHRoZSBgcHJldmVudE92ZXJmbG93YCBhbmQgYGZsaXBgJywgJ21vZGlmaWVycy4nXS5qb2luKCcgJykpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJ1bk1vZGlmaWVyRWZmZWN0cygpO1xuICAgICAgICByZXR1cm4gaW5zdGFuY2UudXBkYXRlKCk7XG4gICAgICB9LFxuICAgICAgLy8gU3luYyB1cGRhdGUgXHUyMDEzIGl0IHdpbGwgYWx3YXlzIGJlIGV4ZWN1dGVkLCBldmVuIGlmIG5vdCBuZWNlc3NhcnkuIFRoaXNcbiAgICAgIC8vIGlzIHVzZWZ1bCBmb3IgbG93IGZyZXF1ZW5jeSB1cGRhdGVzIHdoZXJlIHN5bmMgYmVoYXZpb3Igc2ltcGxpZmllcyB0aGVcbiAgICAgIC8vIGxvZ2ljLlxuICAgICAgLy8gRm9yIGhpZ2ggZnJlcXVlbmN5IHVwZGF0ZXMgKGUuZy4gYHJlc2l6ZWAgYW5kIGBzY3JvbGxgIGV2ZW50cyksIGFsd2F5c1xuICAgICAgLy8gcHJlZmVyIHRoZSBhc3luYyBQb3BwZXIjdXBkYXRlIG1ldGhvZFxuICAgICAgZm9yY2VVcGRhdGU6IGZ1bmN0aW9uIGZvcmNlVXBkYXRlKCkge1xuICAgICAgICBpZiAoaXNEZXN0cm95ZWQpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgX3N0YXRlJGVsZW1lbnRzID0gc3RhdGUuZWxlbWVudHMsXG4gICAgICAgICAgICByZWZlcmVuY2UgPSBfc3RhdGUkZWxlbWVudHMucmVmZXJlbmNlLFxuICAgICAgICAgICAgcG9wcGVyID0gX3N0YXRlJGVsZW1lbnRzLnBvcHBlcjsgLy8gRG9uJ3QgcHJvY2VlZCBpZiBgcmVmZXJlbmNlYCBvciBgcG9wcGVyYCBhcmUgbm90IHZhbGlkIGVsZW1lbnRzXG4gICAgICAgIC8vIGFueW1vcmVcblxuICAgICAgICBpZiAoIWFyZVZhbGlkRWxlbWVudHMocmVmZXJlbmNlLCBwb3BwZXIpKSB7XG4gICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihJTlZBTElEX0VMRU1FTlRfRVJST1IpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSAvLyBTdG9yZSB0aGUgcmVmZXJlbmNlIGFuZCBwb3BwZXIgcmVjdHMgdG8gYmUgcmVhZCBieSBtb2RpZmllcnNcblxuXG4gICAgICAgIHN0YXRlLnJlY3RzID0ge1xuICAgICAgICAgIHJlZmVyZW5jZTogZ2V0Q29tcG9zaXRlUmVjdChyZWZlcmVuY2UsIGdldE9mZnNldFBhcmVudChwb3BwZXIpLCBzdGF0ZS5vcHRpb25zLnN0cmF0ZWd5ID09PSAnZml4ZWQnKSxcbiAgICAgICAgICBwb3BwZXI6IGdldExheW91dFJlY3QocG9wcGVyKVxuICAgICAgICB9OyAvLyBNb2RpZmllcnMgaGF2ZSB0aGUgYWJpbGl0eSB0byByZXNldCB0aGUgY3VycmVudCB1cGRhdGUgY3ljbGUuIFRoZVxuICAgICAgICAvLyBtb3N0IGNvbW1vbiB1c2UgY2FzZSBmb3IgdGhpcyBpcyB0aGUgYGZsaXBgIG1vZGlmaWVyIGNoYW5naW5nIHRoZVxuICAgICAgICAvLyBwbGFjZW1lbnQsIHdoaWNoIHRoZW4gbmVlZHMgdG8gcmUtcnVuIGFsbCB0aGUgbW9kaWZpZXJzLCBiZWNhdXNlIHRoZVxuICAgICAgICAvLyBsb2dpYyB3YXMgcHJldmlvdXNseSByYW4gZm9yIHRoZSBwcmV2aW91cyBwbGFjZW1lbnQgYW5kIGlzIHRoZXJlZm9yZVxuICAgICAgICAvLyBzdGFsZS9pbmNvcnJlY3RcblxuICAgICAgICBzdGF0ZS5yZXNldCA9IGZhbHNlO1xuICAgICAgICBzdGF0ZS5wbGFjZW1lbnQgPSBzdGF0ZS5vcHRpb25zLnBsYWNlbWVudDsgLy8gT24gZWFjaCB1cGRhdGUgY3ljbGUsIHRoZSBgbW9kaWZpZXJzRGF0YWAgcHJvcGVydHkgZm9yIGVhY2ggbW9kaWZpZXJcbiAgICAgICAgLy8gaXMgZmlsbGVkIHdpdGggdGhlIGluaXRpYWwgZGF0YSBzcGVjaWZpZWQgYnkgdGhlIG1vZGlmaWVyLiBUaGlzIG1lYW5zXG4gICAgICAgIC8vIGl0IGRvZXNuJ3QgcGVyc2lzdCBhbmQgaXMgZnJlc2ggb24gZWFjaCB1cGRhdGUuXG4gICAgICAgIC8vIFRvIGVuc3VyZSBwZXJzaXN0ZW50IGRhdGEsIHVzZSBgJHtuYW1lfSNwZXJzaXN0ZW50YFxuXG4gICAgICAgIHN0YXRlLm9yZGVyZWRNb2RpZmllcnMuZm9yRWFjaChmdW5jdGlvbiAobW9kaWZpZXIpIHtcbiAgICAgICAgICByZXR1cm4gc3RhdGUubW9kaWZpZXJzRGF0YVttb2RpZmllci5uYW1lXSA9IE9iamVjdC5hc3NpZ24oe30sIG1vZGlmaWVyLmRhdGEpO1xuICAgICAgICB9KTtcbiAgICAgICAgdmFyIF9fZGVidWdfbG9vcHNfXyA9IDA7XG5cbiAgICAgICAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IHN0YXRlLm9yZGVyZWRNb2RpZmllcnMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAgICAgICAgICAgX19kZWJ1Z19sb29wc19fICs9IDE7XG5cbiAgICAgICAgICAgIGlmIChfX2RlYnVnX2xvb3BzX18gPiAxMDApIHtcbiAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihJTkZJTklURV9MT09QX0VSUk9SKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHN0YXRlLnJlc2V0ID09PSB0cnVlKSB7XG4gICAgICAgICAgICBzdGF0ZS5yZXNldCA9IGZhbHNlO1xuICAgICAgICAgICAgaW5kZXggPSAtMTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBfc3RhdGUkb3JkZXJlZE1vZGlmaWUgPSBzdGF0ZS5vcmRlcmVkTW9kaWZpZXJzW2luZGV4XSxcbiAgICAgICAgICAgICAgZm4gPSBfc3RhdGUkb3JkZXJlZE1vZGlmaWUuZm4sXG4gICAgICAgICAgICAgIF9zdGF0ZSRvcmRlcmVkTW9kaWZpZTIgPSBfc3RhdGUkb3JkZXJlZE1vZGlmaWUub3B0aW9ucyxcbiAgICAgICAgICAgICAgX29wdGlvbnMgPSBfc3RhdGUkb3JkZXJlZE1vZGlmaWUyID09PSB2b2lkIDAgPyB7fSA6IF9zdGF0ZSRvcmRlcmVkTW9kaWZpZTIsXG4gICAgICAgICAgICAgIG5hbWUgPSBfc3RhdGUkb3JkZXJlZE1vZGlmaWUubmFtZTtcblxuICAgICAgICAgIGlmICh0eXBlb2YgZm4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHN0YXRlID0gZm4oe1xuICAgICAgICAgICAgICBzdGF0ZTogc3RhdGUsXG4gICAgICAgICAgICAgIG9wdGlvbnM6IF9vcHRpb25zLFxuICAgICAgICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICAgICAgICBpbnN0YW5jZTogaW5zdGFuY2VcbiAgICAgICAgICAgIH0pIHx8IHN0YXRlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIC8vIEFzeW5jIGFuZCBvcHRpbWlzdGljYWxseSBvcHRpbWl6ZWQgdXBkYXRlIFx1MjAxMyBpdCB3aWxsIG5vdCBiZSBleGVjdXRlZCBpZlxuICAgICAgLy8gbm90IG5lY2Vzc2FyeSAoZGVib3VuY2VkIHRvIHJ1biBhdCBtb3N0IG9uY2UtcGVyLXRpY2spXG4gICAgICB1cGRhdGU6IGRlYm91bmNlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG4gICAgICAgICAgaW5zdGFuY2UuZm9yY2VVcGRhdGUoKTtcbiAgICAgICAgICByZXNvbHZlKHN0YXRlKTtcbiAgICAgICAgfSk7XG4gICAgICB9KSxcbiAgICAgIGRlc3Ryb3k6IGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgICAgIGNsZWFudXBNb2RpZmllckVmZmVjdHMoKTtcbiAgICAgICAgaXNEZXN0cm95ZWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBpZiAoIWFyZVZhbGlkRWxlbWVudHMocmVmZXJlbmNlLCBwb3BwZXIpKSB7XG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoSU5WQUxJRF9FTEVNRU5UX0VSUk9SKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGluc3RhbmNlO1xuICAgIH1cblxuICAgIGluc3RhbmNlLnNldE9wdGlvbnMob3B0aW9ucykudGhlbihmdW5jdGlvbiAoc3RhdGUpIHtcbiAgICAgIGlmICghaXNEZXN0cm95ZWQgJiYgb3B0aW9ucy5vbkZpcnN0VXBkYXRlKSB7XG4gICAgICAgIG9wdGlvbnMub25GaXJzdFVwZGF0ZShzdGF0ZSk7XG4gICAgICB9XG4gICAgfSk7IC8vIE1vZGlmaWVycyBoYXZlIHRoZSBhYmlsaXR5IHRvIGV4ZWN1dGUgYXJiaXRyYXJ5IGNvZGUgYmVmb3JlIHRoZSBmaXJzdFxuICAgIC8vIHVwZGF0ZSBjeWNsZSBydW5zLiBUaGV5IHdpbGwgYmUgZXhlY3V0ZWQgaW4gdGhlIHNhbWUgb3JkZXIgYXMgdGhlIHVwZGF0ZVxuICAgIC8vIGN5Y2xlLiBUaGlzIGlzIHVzZWZ1bCB3aGVuIGEgbW9kaWZpZXIgYWRkcyBzb21lIHBlcnNpc3RlbnQgZGF0YSB0aGF0XG4gICAgLy8gb3RoZXIgbW9kaWZpZXJzIG5lZWQgdG8gdXNlLCBidXQgdGhlIG1vZGlmaWVyIGlzIHJ1biBhZnRlciB0aGUgZGVwZW5kZW50XG4gICAgLy8gb25lLlxuXG4gICAgZnVuY3Rpb24gcnVuTW9kaWZpZXJFZmZlY3RzKCkge1xuICAgICAgc3RhdGUub3JkZXJlZE1vZGlmaWVycy5mb3JFYWNoKGZ1bmN0aW9uIChfcmVmMykge1xuICAgICAgICB2YXIgbmFtZSA9IF9yZWYzLm5hbWUsXG4gICAgICAgICAgICBfcmVmMyRvcHRpb25zID0gX3JlZjMub3B0aW9ucyxcbiAgICAgICAgICAgIG9wdGlvbnMgPSBfcmVmMyRvcHRpb25zID09PSB2b2lkIDAgPyB7fSA6IF9yZWYzJG9wdGlvbnMsXG4gICAgICAgICAgICBlZmZlY3QgPSBfcmVmMy5lZmZlY3Q7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBlZmZlY3QgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICB2YXIgY2xlYW51cEZuID0gZWZmZWN0KHtcbiAgICAgICAgICAgIHN0YXRlOiBzdGF0ZSxcbiAgICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgICBpbnN0YW5jZTogaW5zdGFuY2UsXG4gICAgICAgICAgICBvcHRpb25zOiBvcHRpb25zXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICB2YXIgbm9vcEZuID0gZnVuY3Rpb24gbm9vcEZuKCkge307XG5cbiAgICAgICAgICBlZmZlY3RDbGVhbnVwRm5zLnB1c2goY2xlYW51cEZuIHx8IG5vb3BGbik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNsZWFudXBNb2RpZmllckVmZmVjdHMoKSB7XG4gICAgICBlZmZlY3RDbGVhbnVwRm5zLmZvckVhY2goZnVuY3Rpb24gKGZuKSB7XG4gICAgICAgIHJldHVybiBmbigpO1xuICAgICAgfSk7XG4gICAgICBlZmZlY3RDbGVhbnVwRm5zID0gW107XG4gICAgfVxuXG4gICAgcmV0dXJuIGluc3RhbmNlO1xuICB9O1xufVxuXG52YXIgcGFzc2l2ZSA9IHtcbiAgcGFzc2l2ZTogdHJ1ZVxufTtcblxuZnVuY3Rpb24gZWZmZWN0JDIoX3JlZikge1xuICB2YXIgc3RhdGUgPSBfcmVmLnN0YXRlLFxuICAgICAgaW5zdGFuY2UgPSBfcmVmLmluc3RhbmNlLFxuICAgICAgb3B0aW9ucyA9IF9yZWYub3B0aW9ucztcbiAgdmFyIF9vcHRpb25zJHNjcm9sbCA9IG9wdGlvbnMuc2Nyb2xsLFxuICAgICAgc2Nyb2xsID0gX29wdGlvbnMkc2Nyb2xsID09PSB2b2lkIDAgPyB0cnVlIDogX29wdGlvbnMkc2Nyb2xsLFxuICAgICAgX29wdGlvbnMkcmVzaXplID0gb3B0aW9ucy5yZXNpemUsXG4gICAgICByZXNpemUgPSBfb3B0aW9ucyRyZXNpemUgPT09IHZvaWQgMCA/IHRydWUgOiBfb3B0aW9ucyRyZXNpemU7XG4gIHZhciB3aW5kb3cgPSBnZXRXaW5kb3coc3RhdGUuZWxlbWVudHMucG9wcGVyKTtcbiAgdmFyIHNjcm9sbFBhcmVudHMgPSBbXS5jb25jYXQoc3RhdGUuc2Nyb2xsUGFyZW50cy5yZWZlcmVuY2UsIHN0YXRlLnNjcm9sbFBhcmVudHMucG9wcGVyKTtcblxuICBpZiAoc2Nyb2xsKSB7XG4gICAgc2Nyb2xsUGFyZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChzY3JvbGxQYXJlbnQpIHtcbiAgICAgIHNjcm9sbFBhcmVudC5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBpbnN0YW5jZS51cGRhdGUsIHBhc3NpdmUpO1xuICAgIH0pO1xuICB9XG5cbiAgaWYgKHJlc2l6ZSkge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBpbnN0YW5jZS51cGRhdGUsIHBhc3NpdmUpO1xuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoc2Nyb2xsKSB7XG4gICAgICBzY3JvbGxQYXJlbnRzLmZvckVhY2goZnVuY3Rpb24gKHNjcm9sbFBhcmVudCkge1xuICAgICAgICBzY3JvbGxQYXJlbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgaW5zdGFuY2UudXBkYXRlLCBwYXNzaXZlKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChyZXNpemUpIHtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCBpbnN0YW5jZS51cGRhdGUsIHBhc3NpdmUpO1xuICAgIH1cbiAgfTtcbn0gLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby11bnVzZWQtbW9kdWxlc1xuXG5cbnZhciBldmVudExpc3RlbmVycyA9IHtcbiAgbmFtZTogJ2V2ZW50TGlzdGVuZXJzJyxcbiAgZW5hYmxlZDogdHJ1ZSxcbiAgcGhhc2U6ICd3cml0ZScsXG4gIGZuOiBmdW5jdGlvbiBmbigpIHt9LFxuICBlZmZlY3Q6IGVmZmVjdCQyLFxuICBkYXRhOiB7fVxufTtcblxuZnVuY3Rpb24gcG9wcGVyT2Zmc2V0cyhfcmVmKSB7XG4gIHZhciBzdGF0ZSA9IF9yZWYuc3RhdGUsXG4gICAgICBuYW1lID0gX3JlZi5uYW1lO1xuICAvLyBPZmZzZXRzIGFyZSB0aGUgYWN0dWFsIHBvc2l0aW9uIHRoZSBwb3BwZXIgbmVlZHMgdG8gaGF2ZSB0byBiZVxuICAvLyBwcm9wZXJseSBwb3NpdGlvbmVkIG5lYXIgaXRzIHJlZmVyZW5jZSBlbGVtZW50XG4gIC8vIFRoaXMgaXMgdGhlIG1vc3QgYmFzaWMgcGxhY2VtZW50LCBhbmQgd2lsbCBiZSBhZGp1c3RlZCBieVxuICAvLyB0aGUgbW9kaWZpZXJzIGluIHRoZSBuZXh0IHN0ZXBcbiAgc3RhdGUubW9kaWZpZXJzRGF0YVtuYW1lXSA9IGNvbXB1dGVPZmZzZXRzKHtcbiAgICByZWZlcmVuY2U6IHN0YXRlLnJlY3RzLnJlZmVyZW5jZSxcbiAgICBlbGVtZW50OiBzdGF0ZS5yZWN0cy5wb3BwZXIsXG4gICAgc3RyYXRlZ3k6ICdhYnNvbHV0ZScsXG4gICAgcGxhY2VtZW50OiBzdGF0ZS5wbGFjZW1lbnRcbiAgfSk7XG59IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tdW51c2VkLW1vZHVsZXNcblxuXG52YXIgcG9wcGVyT2Zmc2V0cyQxID0ge1xuICBuYW1lOiAncG9wcGVyT2Zmc2V0cycsXG4gIGVuYWJsZWQ6IHRydWUsXG4gIHBoYXNlOiAncmVhZCcsXG4gIGZuOiBwb3BwZXJPZmZzZXRzLFxuICBkYXRhOiB7fVxufTtcblxudmFyIHVuc2V0U2lkZXMgPSB7XG4gIHRvcDogJ2F1dG8nLFxuICByaWdodDogJ2F1dG8nLFxuICBib3R0b206ICdhdXRvJyxcbiAgbGVmdDogJ2F1dG8nXG59OyAvLyBSb3VuZCB0aGUgb2Zmc2V0cyB0byB0aGUgbmVhcmVzdCBzdWl0YWJsZSBzdWJwaXhlbCBiYXNlZCBvbiB0aGUgRFBSLlxuLy8gWm9vbWluZyBjYW4gY2hhbmdlIHRoZSBEUFIsIGJ1dCBpdCBzZWVtcyB0byByZXBvcnQgYSB2YWx1ZSB0aGF0IHdpbGxcbi8vIGNsZWFubHkgZGl2aWRlIHRoZSB2YWx1ZXMgaW50byB0aGUgYXBwcm9wcmlhdGUgc3VicGl4ZWxzLlxuXG5mdW5jdGlvbiByb3VuZE9mZnNldHNCeURQUihfcmVmKSB7XG4gIHZhciB4ID0gX3JlZi54LFxuICAgICAgeSA9IF9yZWYueTtcbiAgdmFyIHdpbiA9IHdpbmRvdztcbiAgdmFyIGRwciA9IHdpbi5kZXZpY2VQaXhlbFJhdGlvIHx8IDE7XG4gIHJldHVybiB7XG4gICAgeDogcm91bmQoeCAqIGRwcikgLyBkcHIgfHwgMCxcbiAgICB5OiByb3VuZCh5ICogZHByKSAvIGRwciB8fCAwXG4gIH07XG59XG5cbmZ1bmN0aW9uIG1hcFRvU3R5bGVzKF9yZWYyKSB7XG4gIHZhciBfT2JqZWN0JGFzc2lnbjI7XG5cbiAgdmFyIHBvcHBlciA9IF9yZWYyLnBvcHBlcixcbiAgICAgIHBvcHBlclJlY3QgPSBfcmVmMi5wb3BwZXJSZWN0LFxuICAgICAgcGxhY2VtZW50ID0gX3JlZjIucGxhY2VtZW50LFxuICAgICAgdmFyaWF0aW9uID0gX3JlZjIudmFyaWF0aW9uLFxuICAgICAgb2Zmc2V0cyA9IF9yZWYyLm9mZnNldHMsXG4gICAgICBwb3NpdGlvbiA9IF9yZWYyLnBvc2l0aW9uLFxuICAgICAgZ3B1QWNjZWxlcmF0aW9uID0gX3JlZjIuZ3B1QWNjZWxlcmF0aW9uLFxuICAgICAgYWRhcHRpdmUgPSBfcmVmMi5hZGFwdGl2ZSxcbiAgICAgIHJvdW5kT2Zmc2V0cyA9IF9yZWYyLnJvdW5kT2Zmc2V0cyxcbiAgICAgIGlzRml4ZWQgPSBfcmVmMi5pc0ZpeGVkO1xuXG4gIHZhciBfcmVmMyA9IHJvdW5kT2Zmc2V0cyA9PT0gdHJ1ZSA/IHJvdW5kT2Zmc2V0c0J5RFBSKG9mZnNldHMpIDogdHlwZW9mIHJvdW5kT2Zmc2V0cyA9PT0gJ2Z1bmN0aW9uJyA/IHJvdW5kT2Zmc2V0cyhvZmZzZXRzKSA6IG9mZnNldHMsXG4gICAgICBfcmVmMyR4ID0gX3JlZjMueCxcbiAgICAgIHggPSBfcmVmMyR4ID09PSB2b2lkIDAgPyAwIDogX3JlZjMkeCxcbiAgICAgIF9yZWYzJHkgPSBfcmVmMy55LFxuICAgICAgeSA9IF9yZWYzJHkgPT09IHZvaWQgMCA/IDAgOiBfcmVmMyR5O1xuXG4gIHZhciBoYXNYID0gb2Zmc2V0cy5oYXNPd25Qcm9wZXJ0eSgneCcpO1xuICB2YXIgaGFzWSA9IG9mZnNldHMuaGFzT3duUHJvcGVydHkoJ3knKTtcbiAgdmFyIHNpZGVYID0gbGVmdDtcbiAgdmFyIHNpZGVZID0gdG9wO1xuICB2YXIgd2luID0gd2luZG93O1xuXG4gIGlmIChhZGFwdGl2ZSkge1xuICAgIHZhciBvZmZzZXRQYXJlbnQgPSBnZXRPZmZzZXRQYXJlbnQocG9wcGVyKTtcbiAgICB2YXIgaGVpZ2h0UHJvcCA9ICdjbGllbnRIZWlnaHQnO1xuICAgIHZhciB3aWR0aFByb3AgPSAnY2xpZW50V2lkdGgnO1xuXG4gICAgaWYgKG9mZnNldFBhcmVudCA9PT0gZ2V0V2luZG93KHBvcHBlcikpIHtcbiAgICAgIG9mZnNldFBhcmVudCA9IGdldERvY3VtZW50RWxlbWVudChwb3BwZXIpO1xuXG4gICAgICBpZiAoZ2V0Q29tcHV0ZWRTdHlsZShvZmZzZXRQYXJlbnQpLnBvc2l0aW9uICE9PSAnc3RhdGljJyAmJiBwb3NpdGlvbiA9PT0gJ2Fic29sdXRlJykge1xuICAgICAgICBoZWlnaHRQcm9wID0gJ3Njcm9sbEhlaWdodCc7XG4gICAgICAgIHdpZHRoUHJvcCA9ICdzY3JvbGxXaWR0aCc7XG4gICAgICB9XG4gICAgfSAvLyAkRmxvd0ZpeE1lW2luY29tcGF0aWJsZS1jYXN0XTogZm9yY2UgdHlwZSByZWZpbmVtZW50LCB3ZSBjb21wYXJlIG9mZnNldFBhcmVudCB3aXRoIHdpbmRvdyBhYm92ZSwgYnV0IEZsb3cgZG9lc24ndCBkZXRlY3QgaXRcblxuXG4gICAgb2Zmc2V0UGFyZW50ID0gb2Zmc2V0UGFyZW50O1xuXG4gICAgaWYgKHBsYWNlbWVudCA9PT0gdG9wIHx8IChwbGFjZW1lbnQgPT09IGxlZnQgfHwgcGxhY2VtZW50ID09PSByaWdodCkgJiYgdmFyaWF0aW9uID09PSBlbmQpIHtcbiAgICAgIHNpZGVZID0gYm90dG9tO1xuICAgICAgdmFyIG9mZnNldFkgPSBpc0ZpeGVkICYmIHdpbi52aXN1YWxWaWV3cG9ydCA/IHdpbi52aXN1YWxWaWV3cG9ydC5oZWlnaHQgOiAvLyAkRmxvd0ZpeE1lW3Byb3AtbWlzc2luZ11cbiAgICAgIG9mZnNldFBhcmVudFtoZWlnaHRQcm9wXTtcbiAgICAgIHkgLT0gb2Zmc2V0WSAtIHBvcHBlclJlY3QuaGVpZ2h0O1xuICAgICAgeSAqPSBncHVBY2NlbGVyYXRpb24gPyAxIDogLTE7XG4gICAgfVxuXG4gICAgaWYgKHBsYWNlbWVudCA9PT0gbGVmdCB8fCAocGxhY2VtZW50ID09PSB0b3AgfHwgcGxhY2VtZW50ID09PSBib3R0b20pICYmIHZhcmlhdGlvbiA9PT0gZW5kKSB7XG4gICAgICBzaWRlWCA9IHJpZ2h0O1xuICAgICAgdmFyIG9mZnNldFggPSBpc0ZpeGVkICYmIHdpbi52aXN1YWxWaWV3cG9ydCA/IHdpbi52aXN1YWxWaWV3cG9ydC53aWR0aCA6IC8vICRGbG93Rml4TWVbcHJvcC1taXNzaW5nXVxuICAgICAgb2Zmc2V0UGFyZW50W3dpZHRoUHJvcF07XG4gICAgICB4IC09IG9mZnNldFggLSBwb3BwZXJSZWN0LndpZHRoO1xuICAgICAgeCAqPSBncHVBY2NlbGVyYXRpb24gPyAxIDogLTE7XG4gICAgfVxuICB9XG5cbiAgdmFyIGNvbW1vblN0eWxlcyA9IE9iamVjdC5hc3NpZ24oe1xuICAgIHBvc2l0aW9uOiBwb3NpdGlvblxuICB9LCBhZGFwdGl2ZSAmJiB1bnNldFNpZGVzKTtcblxuICBpZiAoZ3B1QWNjZWxlcmF0aW9uKSB7XG4gICAgdmFyIF9PYmplY3QkYXNzaWduO1xuXG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIGNvbW1vblN0eWxlcywgKF9PYmplY3QkYXNzaWduID0ge30sIF9PYmplY3QkYXNzaWduW3NpZGVZXSA9IGhhc1kgPyAnMCcgOiAnJywgX09iamVjdCRhc3NpZ25bc2lkZVhdID0gaGFzWCA/ICcwJyA6ICcnLCBfT2JqZWN0JGFzc2lnbi50cmFuc2Zvcm0gPSAod2luLmRldmljZVBpeGVsUmF0aW8gfHwgMSkgPD0gMSA/IFwidHJhbnNsYXRlKFwiICsgeCArIFwicHgsIFwiICsgeSArIFwicHgpXCIgOiBcInRyYW5zbGF0ZTNkKFwiICsgeCArIFwicHgsIFwiICsgeSArIFwicHgsIDApXCIsIF9PYmplY3QkYXNzaWduKSk7XG4gIH1cblxuICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgY29tbW9uU3R5bGVzLCAoX09iamVjdCRhc3NpZ24yID0ge30sIF9PYmplY3QkYXNzaWduMltzaWRlWV0gPSBoYXNZID8geSArIFwicHhcIiA6ICcnLCBfT2JqZWN0JGFzc2lnbjJbc2lkZVhdID0gaGFzWCA/IHggKyBcInB4XCIgOiAnJywgX09iamVjdCRhc3NpZ24yLnRyYW5zZm9ybSA9ICcnLCBfT2JqZWN0JGFzc2lnbjIpKTtcbn1cblxuZnVuY3Rpb24gY29tcHV0ZVN0eWxlcyhfcmVmNCkge1xuICB2YXIgc3RhdGUgPSBfcmVmNC5zdGF0ZSxcbiAgICAgIG9wdGlvbnMgPSBfcmVmNC5vcHRpb25zO1xuICB2YXIgX29wdGlvbnMkZ3B1QWNjZWxlcmF0ID0gb3B0aW9ucy5ncHVBY2NlbGVyYXRpb24sXG4gICAgICBncHVBY2NlbGVyYXRpb24gPSBfb3B0aW9ucyRncHVBY2NlbGVyYXQgPT09IHZvaWQgMCA/IHRydWUgOiBfb3B0aW9ucyRncHVBY2NlbGVyYXQsXG4gICAgICBfb3B0aW9ucyRhZGFwdGl2ZSA9IG9wdGlvbnMuYWRhcHRpdmUsXG4gICAgICBhZGFwdGl2ZSA9IF9vcHRpb25zJGFkYXB0aXZlID09PSB2b2lkIDAgPyB0cnVlIDogX29wdGlvbnMkYWRhcHRpdmUsXG4gICAgICBfb3B0aW9ucyRyb3VuZE9mZnNldHMgPSBvcHRpb25zLnJvdW5kT2Zmc2V0cyxcbiAgICAgIHJvdW5kT2Zmc2V0cyA9IF9vcHRpb25zJHJvdW5kT2Zmc2V0cyA9PT0gdm9pZCAwID8gdHJ1ZSA6IF9vcHRpb25zJHJvdW5kT2Zmc2V0cztcblxuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgdmFyIHRyYW5zaXRpb25Qcm9wZXJ0eSA9IGdldENvbXB1dGVkU3R5bGUoc3RhdGUuZWxlbWVudHMucG9wcGVyKS50cmFuc2l0aW9uUHJvcGVydHkgfHwgJyc7XG5cbiAgICBpZiAoYWRhcHRpdmUgJiYgWyd0cmFuc2Zvcm0nLCAndG9wJywgJ3JpZ2h0JywgJ2JvdHRvbScsICdsZWZ0J10uc29tZShmdW5jdGlvbiAocHJvcGVydHkpIHtcbiAgICAgIHJldHVybiB0cmFuc2l0aW9uUHJvcGVydHkuaW5kZXhPZihwcm9wZXJ0eSkgPj0gMDtcbiAgICB9KSkge1xuICAgICAgY29uc29sZS53YXJuKFsnUG9wcGVyOiBEZXRlY3RlZCBDU1MgdHJhbnNpdGlvbnMgb24gYXQgbGVhc3Qgb25lIG9mIHRoZSBmb2xsb3dpbmcnLCAnQ1NTIHByb3BlcnRpZXM6IFwidHJhbnNmb3JtXCIsIFwidG9wXCIsIFwicmlnaHRcIiwgXCJib3R0b21cIiwgXCJsZWZ0XCIuJywgJ1xcblxcbicsICdEaXNhYmxlIHRoZSBcImNvbXB1dGVTdHlsZXNcIiBtb2RpZmllclxcJ3MgYGFkYXB0aXZlYCBvcHRpb24gdG8gYWxsb3cnLCAnZm9yIHNtb290aCB0cmFuc2l0aW9ucywgb3IgcmVtb3ZlIHRoZXNlIHByb3BlcnRpZXMgZnJvbSB0aGUgQ1NTJywgJ3RyYW5zaXRpb24gZGVjbGFyYXRpb24gb24gdGhlIHBvcHBlciBlbGVtZW50IGlmIG9ubHkgdHJhbnNpdGlvbmluZycsICdvcGFjaXR5IG9yIGJhY2tncm91bmQtY29sb3IgZm9yIGV4YW1wbGUuJywgJ1xcblxcbicsICdXZSByZWNvbW1lbmQgdXNpbmcgdGhlIHBvcHBlciBlbGVtZW50IGFzIGEgd3JhcHBlciBhcm91bmQgYW4gaW5uZXInLCAnZWxlbWVudCB0aGF0IGNhbiBoYXZlIGFueSBDU1MgcHJvcGVydHkgdHJhbnNpdGlvbmVkIGZvciBhbmltYXRpb25zLiddLmpvaW4oJyAnKSk7XG4gICAgfVxuICB9XG5cbiAgdmFyIGNvbW1vblN0eWxlcyA9IHtcbiAgICBwbGFjZW1lbnQ6IGdldEJhc2VQbGFjZW1lbnQoc3RhdGUucGxhY2VtZW50KSxcbiAgICB2YXJpYXRpb246IGdldFZhcmlhdGlvbihzdGF0ZS5wbGFjZW1lbnQpLFxuICAgIHBvcHBlcjogc3RhdGUuZWxlbWVudHMucG9wcGVyLFxuICAgIHBvcHBlclJlY3Q6IHN0YXRlLnJlY3RzLnBvcHBlcixcbiAgICBncHVBY2NlbGVyYXRpb246IGdwdUFjY2VsZXJhdGlvbixcbiAgICBpc0ZpeGVkOiBzdGF0ZS5vcHRpb25zLnN0cmF0ZWd5ID09PSAnZml4ZWQnXG4gIH07XG5cbiAgaWYgKHN0YXRlLm1vZGlmaWVyc0RhdGEucG9wcGVyT2Zmc2V0cyAhPSBudWxsKSB7XG4gICAgc3RhdGUuc3R5bGVzLnBvcHBlciA9IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLnN0eWxlcy5wb3BwZXIsIG1hcFRvU3R5bGVzKE9iamVjdC5hc3NpZ24oe30sIGNvbW1vblN0eWxlcywge1xuICAgICAgb2Zmc2V0czogc3RhdGUubW9kaWZpZXJzRGF0YS5wb3BwZXJPZmZzZXRzLFxuICAgICAgcG9zaXRpb246IHN0YXRlLm9wdGlvbnMuc3RyYXRlZ3ksXG4gICAgICBhZGFwdGl2ZTogYWRhcHRpdmUsXG4gICAgICByb3VuZE9mZnNldHM6IHJvdW5kT2Zmc2V0c1xuICAgIH0pKSk7XG4gIH1cblxuICBpZiAoc3RhdGUubW9kaWZpZXJzRGF0YS5hcnJvdyAhPSBudWxsKSB7XG4gICAgc3RhdGUuc3R5bGVzLmFycm93ID0gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUuc3R5bGVzLmFycm93LCBtYXBUb1N0eWxlcyhPYmplY3QuYXNzaWduKHt9LCBjb21tb25TdHlsZXMsIHtcbiAgICAgIG9mZnNldHM6IHN0YXRlLm1vZGlmaWVyc0RhdGEuYXJyb3csXG4gICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgIGFkYXB0aXZlOiBmYWxzZSxcbiAgICAgIHJvdW5kT2Zmc2V0czogcm91bmRPZmZzZXRzXG4gICAgfSkpKTtcbiAgfVxuXG4gIHN0YXRlLmF0dHJpYnV0ZXMucG9wcGVyID0gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUuYXR0cmlidXRlcy5wb3BwZXIsIHtcbiAgICAnZGF0YS1wb3BwZXItcGxhY2VtZW50Jzogc3RhdGUucGxhY2VtZW50XG4gIH0pO1xufSAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLXVudXNlZC1tb2R1bGVzXG5cblxudmFyIGNvbXB1dGVTdHlsZXMkMSA9IHtcbiAgbmFtZTogJ2NvbXB1dGVTdHlsZXMnLFxuICBlbmFibGVkOiB0cnVlLFxuICBwaGFzZTogJ2JlZm9yZVdyaXRlJyxcbiAgZm46IGNvbXB1dGVTdHlsZXMsXG4gIGRhdGE6IHt9XG59O1xuXG4vLyBhbmQgYXBwbGllcyB0aGVtIHRvIHRoZSBIVE1MRWxlbWVudHMgc3VjaCBhcyBwb3BwZXIgYW5kIGFycm93XG5cbmZ1bmN0aW9uIGFwcGx5U3R5bGVzKF9yZWYpIHtcbiAgdmFyIHN0YXRlID0gX3JlZi5zdGF0ZTtcbiAgT2JqZWN0LmtleXMoc3RhdGUuZWxlbWVudHMpLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB2YXIgc3R5bGUgPSBzdGF0ZS5zdHlsZXNbbmFtZV0gfHwge307XG4gICAgdmFyIGF0dHJpYnV0ZXMgPSBzdGF0ZS5hdHRyaWJ1dGVzW25hbWVdIHx8IHt9O1xuICAgIHZhciBlbGVtZW50ID0gc3RhdGUuZWxlbWVudHNbbmFtZV07IC8vIGFycm93IGlzIG9wdGlvbmFsICsgdmlydHVhbCBlbGVtZW50c1xuXG4gICAgaWYgKCFpc0hUTUxFbGVtZW50KGVsZW1lbnQpIHx8ICFnZXROb2RlTmFtZShlbGVtZW50KSkge1xuICAgICAgcmV0dXJuO1xuICAgIH0gLy8gRmxvdyBkb2Vzbid0IHN1cHBvcnQgdG8gZXh0ZW5kIHRoaXMgcHJvcGVydHksIGJ1dCBpdCdzIHRoZSBtb3N0XG4gICAgLy8gZWZmZWN0aXZlIHdheSB0byBhcHBseSBzdHlsZXMgdG8gYW4gSFRNTEVsZW1lbnRcbiAgICAvLyAkRmxvd0ZpeE1lW2Nhbm5vdC13cml0ZV1cblxuXG4gICAgT2JqZWN0LmFzc2lnbihlbGVtZW50LnN0eWxlLCBzdHlsZSk7XG4gICAgT2JqZWN0LmtleXMoYXR0cmlidXRlcykuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuICAgICAgdmFyIHZhbHVlID0gYXR0cmlidXRlc1tuYW1lXTtcblxuICAgICAgaWYgKHZhbHVlID09PSBmYWxzZSkge1xuICAgICAgICBlbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShuYW1lKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlID09PSB0cnVlID8gJycgOiB2YWx1ZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBlZmZlY3QkMShfcmVmMikge1xuICB2YXIgc3RhdGUgPSBfcmVmMi5zdGF0ZTtcbiAgdmFyIGluaXRpYWxTdHlsZXMgPSB7XG4gICAgcG9wcGVyOiB7XG4gICAgICBwb3NpdGlvbjogc3RhdGUub3B0aW9ucy5zdHJhdGVneSxcbiAgICAgIGxlZnQ6ICcwJyxcbiAgICAgIHRvcDogJzAnLFxuICAgICAgbWFyZ2luOiAnMCdcbiAgICB9LFxuICAgIGFycm93OiB7XG4gICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJ1xuICAgIH0sXG4gICAgcmVmZXJlbmNlOiB7fVxuICB9O1xuICBPYmplY3QuYXNzaWduKHN0YXRlLmVsZW1lbnRzLnBvcHBlci5zdHlsZSwgaW5pdGlhbFN0eWxlcy5wb3BwZXIpO1xuICBzdGF0ZS5zdHlsZXMgPSBpbml0aWFsU3R5bGVzO1xuXG4gIGlmIChzdGF0ZS5lbGVtZW50cy5hcnJvdykge1xuICAgIE9iamVjdC5hc3NpZ24oc3RhdGUuZWxlbWVudHMuYXJyb3cuc3R5bGUsIGluaXRpYWxTdHlsZXMuYXJyb3cpO1xuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICBPYmplY3Qua2V5cyhzdGF0ZS5lbGVtZW50cykuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuICAgICAgdmFyIGVsZW1lbnQgPSBzdGF0ZS5lbGVtZW50c1tuYW1lXTtcbiAgICAgIHZhciBhdHRyaWJ1dGVzID0gc3RhdGUuYXR0cmlidXRlc1tuYW1lXSB8fCB7fTtcbiAgICAgIHZhciBzdHlsZVByb3BlcnRpZXMgPSBPYmplY3Qua2V5cyhzdGF0ZS5zdHlsZXMuaGFzT3duUHJvcGVydHkobmFtZSkgPyBzdGF0ZS5zdHlsZXNbbmFtZV0gOiBpbml0aWFsU3R5bGVzW25hbWVdKTsgLy8gU2V0IGFsbCB2YWx1ZXMgdG8gYW4gZW1wdHkgc3RyaW5nIHRvIHVuc2V0IHRoZW1cblxuICAgICAgdmFyIHN0eWxlID0gc3R5bGVQcm9wZXJ0aWVzLnJlZHVjZShmdW5jdGlvbiAoc3R5bGUsIHByb3BlcnR5KSB7XG4gICAgICAgIHN0eWxlW3Byb3BlcnR5XSA9ICcnO1xuICAgICAgICByZXR1cm4gc3R5bGU7XG4gICAgICB9LCB7fSk7IC8vIGFycm93IGlzIG9wdGlvbmFsICsgdmlydHVhbCBlbGVtZW50c1xuXG4gICAgICBpZiAoIWlzSFRNTEVsZW1lbnQoZWxlbWVudCkgfHwgIWdldE5vZGVOYW1lKGVsZW1lbnQpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgT2JqZWN0LmFzc2lnbihlbGVtZW50LnN0eWxlLCBzdHlsZSk7XG4gICAgICBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzKS5mb3JFYWNoKGZ1bmN0aW9uIChhdHRyaWJ1dGUpIHtcbiAgICAgICAgZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoYXR0cmlidXRlKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xufSAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLXVudXNlZC1tb2R1bGVzXG5cblxudmFyIGFwcGx5U3R5bGVzJDEgPSB7XG4gIG5hbWU6ICdhcHBseVN0eWxlcycsXG4gIGVuYWJsZWQ6IHRydWUsXG4gIHBoYXNlOiAnd3JpdGUnLFxuICBmbjogYXBwbHlTdHlsZXMsXG4gIGVmZmVjdDogZWZmZWN0JDEsXG4gIHJlcXVpcmVzOiBbJ2NvbXB1dGVTdHlsZXMnXVxufTtcblxuZnVuY3Rpb24gZGlzdGFuY2VBbmRTa2lkZGluZ1RvWFkocGxhY2VtZW50LCByZWN0cywgb2Zmc2V0KSB7XG4gIHZhciBiYXNlUGxhY2VtZW50ID0gZ2V0QmFzZVBsYWNlbWVudChwbGFjZW1lbnQpO1xuICB2YXIgaW52ZXJ0RGlzdGFuY2UgPSBbbGVmdCwgdG9wXS5pbmRleE9mKGJhc2VQbGFjZW1lbnQpID49IDAgPyAtMSA6IDE7XG5cbiAgdmFyIF9yZWYgPSB0eXBlb2Ygb2Zmc2V0ID09PSAnZnVuY3Rpb24nID8gb2Zmc2V0KE9iamVjdC5hc3NpZ24oe30sIHJlY3RzLCB7XG4gICAgcGxhY2VtZW50OiBwbGFjZW1lbnRcbiAgfSkpIDogb2Zmc2V0LFxuICAgICAgc2tpZGRpbmcgPSBfcmVmWzBdLFxuICAgICAgZGlzdGFuY2UgPSBfcmVmWzFdO1xuXG4gIHNraWRkaW5nID0gc2tpZGRpbmcgfHwgMDtcbiAgZGlzdGFuY2UgPSAoZGlzdGFuY2UgfHwgMCkgKiBpbnZlcnREaXN0YW5jZTtcbiAgcmV0dXJuIFtsZWZ0LCByaWdodF0uaW5kZXhPZihiYXNlUGxhY2VtZW50KSA+PSAwID8ge1xuICAgIHg6IGRpc3RhbmNlLFxuICAgIHk6IHNraWRkaW5nXG4gIH0gOiB7XG4gICAgeDogc2tpZGRpbmcsXG4gICAgeTogZGlzdGFuY2VcbiAgfTtcbn1cblxuZnVuY3Rpb24gb2Zmc2V0KF9yZWYyKSB7XG4gIHZhciBzdGF0ZSA9IF9yZWYyLnN0YXRlLFxuICAgICAgb3B0aW9ucyA9IF9yZWYyLm9wdGlvbnMsXG4gICAgICBuYW1lID0gX3JlZjIubmFtZTtcbiAgdmFyIF9vcHRpb25zJG9mZnNldCA9IG9wdGlvbnMub2Zmc2V0LFxuICAgICAgb2Zmc2V0ID0gX29wdGlvbnMkb2Zmc2V0ID09PSB2b2lkIDAgPyBbMCwgMF0gOiBfb3B0aW9ucyRvZmZzZXQ7XG4gIHZhciBkYXRhID0gcGxhY2VtZW50cy5yZWR1Y2UoZnVuY3Rpb24gKGFjYywgcGxhY2VtZW50KSB7XG4gICAgYWNjW3BsYWNlbWVudF0gPSBkaXN0YW5jZUFuZFNraWRkaW5nVG9YWShwbGFjZW1lbnQsIHN0YXRlLnJlY3RzLCBvZmZzZXQpO1xuICAgIHJldHVybiBhY2M7XG4gIH0sIHt9KTtcbiAgdmFyIF9kYXRhJHN0YXRlJHBsYWNlbWVudCA9IGRhdGFbc3RhdGUucGxhY2VtZW50XSxcbiAgICAgIHggPSBfZGF0YSRzdGF0ZSRwbGFjZW1lbnQueCxcbiAgICAgIHkgPSBfZGF0YSRzdGF0ZSRwbGFjZW1lbnQueTtcblxuICBpZiAoc3RhdGUubW9kaWZpZXJzRGF0YS5wb3BwZXJPZmZzZXRzICE9IG51bGwpIHtcbiAgICBzdGF0ZS5tb2RpZmllcnNEYXRhLnBvcHBlck9mZnNldHMueCArPSB4O1xuICAgIHN0YXRlLm1vZGlmaWVyc0RhdGEucG9wcGVyT2Zmc2V0cy55ICs9IHk7XG4gIH1cblxuICBzdGF0ZS5tb2RpZmllcnNEYXRhW25hbWVdID0gZGF0YTtcbn0gLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby11bnVzZWQtbW9kdWxlc1xuXG5cbnZhciBvZmZzZXQkMSA9IHtcbiAgbmFtZTogJ29mZnNldCcsXG4gIGVuYWJsZWQ6IHRydWUsXG4gIHBoYXNlOiAnbWFpbicsXG4gIHJlcXVpcmVzOiBbJ3BvcHBlck9mZnNldHMnXSxcbiAgZm46IG9mZnNldFxufTtcblxudmFyIGhhc2gkMSA9IHtcbiAgbGVmdDogJ3JpZ2h0JyxcbiAgcmlnaHQ6ICdsZWZ0JyxcbiAgYm90dG9tOiAndG9wJyxcbiAgdG9wOiAnYm90dG9tJ1xufTtcbmZ1bmN0aW9uIGdldE9wcG9zaXRlUGxhY2VtZW50KHBsYWNlbWVudCkge1xuICByZXR1cm4gcGxhY2VtZW50LnJlcGxhY2UoL2xlZnR8cmlnaHR8Ym90dG9tfHRvcC9nLCBmdW5jdGlvbiAobWF0Y2hlZCkge1xuICAgIHJldHVybiBoYXNoJDFbbWF0Y2hlZF07XG4gIH0pO1xufVxuXG52YXIgaGFzaCA9IHtcbiAgc3RhcnQ6ICdlbmQnLFxuICBlbmQ6ICdzdGFydCdcbn07XG5mdW5jdGlvbiBnZXRPcHBvc2l0ZVZhcmlhdGlvblBsYWNlbWVudChwbGFjZW1lbnQpIHtcbiAgcmV0dXJuIHBsYWNlbWVudC5yZXBsYWNlKC9zdGFydHxlbmQvZywgZnVuY3Rpb24gKG1hdGNoZWQpIHtcbiAgICByZXR1cm4gaGFzaFttYXRjaGVkXTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGNvbXB1dGVBdXRvUGxhY2VtZW50KHN0YXRlLCBvcHRpb25zKSB7XG4gIGlmIChvcHRpb25zID09PSB2b2lkIDApIHtcbiAgICBvcHRpb25zID0ge307XG4gIH1cblxuICB2YXIgX29wdGlvbnMgPSBvcHRpb25zLFxuICAgICAgcGxhY2VtZW50ID0gX29wdGlvbnMucGxhY2VtZW50LFxuICAgICAgYm91bmRhcnkgPSBfb3B0aW9ucy5ib3VuZGFyeSxcbiAgICAgIHJvb3RCb3VuZGFyeSA9IF9vcHRpb25zLnJvb3RCb3VuZGFyeSxcbiAgICAgIHBhZGRpbmcgPSBfb3B0aW9ucy5wYWRkaW5nLFxuICAgICAgZmxpcFZhcmlhdGlvbnMgPSBfb3B0aW9ucy5mbGlwVmFyaWF0aW9ucyxcbiAgICAgIF9vcHRpb25zJGFsbG93ZWRBdXRvUCA9IF9vcHRpb25zLmFsbG93ZWRBdXRvUGxhY2VtZW50cyxcbiAgICAgIGFsbG93ZWRBdXRvUGxhY2VtZW50cyA9IF9vcHRpb25zJGFsbG93ZWRBdXRvUCA9PT0gdm9pZCAwID8gcGxhY2VtZW50cyA6IF9vcHRpb25zJGFsbG93ZWRBdXRvUDtcbiAgdmFyIHZhcmlhdGlvbiA9IGdldFZhcmlhdGlvbihwbGFjZW1lbnQpO1xuICB2YXIgcGxhY2VtZW50cyQxID0gdmFyaWF0aW9uID8gZmxpcFZhcmlhdGlvbnMgPyB2YXJpYXRpb25QbGFjZW1lbnRzIDogdmFyaWF0aW9uUGxhY2VtZW50cy5maWx0ZXIoZnVuY3Rpb24gKHBsYWNlbWVudCkge1xuICAgIHJldHVybiBnZXRWYXJpYXRpb24ocGxhY2VtZW50KSA9PT0gdmFyaWF0aW9uO1xuICB9KSA6IGJhc2VQbGFjZW1lbnRzO1xuICB2YXIgYWxsb3dlZFBsYWNlbWVudHMgPSBwbGFjZW1lbnRzJDEuZmlsdGVyKGZ1bmN0aW9uIChwbGFjZW1lbnQpIHtcbiAgICByZXR1cm4gYWxsb3dlZEF1dG9QbGFjZW1lbnRzLmluZGV4T2YocGxhY2VtZW50KSA+PSAwO1xuICB9KTtcblxuICBpZiAoYWxsb3dlZFBsYWNlbWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgYWxsb3dlZFBsYWNlbWVudHMgPSBwbGFjZW1lbnRzJDE7XG5cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFsnUG9wcGVyOiBUaGUgYGFsbG93ZWRBdXRvUGxhY2VtZW50c2Agb3B0aW9uIGRpZCBub3QgYWxsb3cgYW55JywgJ3BsYWNlbWVudHMuIEVuc3VyZSB0aGUgYHBsYWNlbWVudGAgb3B0aW9uIG1hdGNoZXMgdGhlIHZhcmlhdGlvbicsICdvZiB0aGUgYWxsb3dlZCBwbGFjZW1lbnRzLicsICdGb3IgZXhhbXBsZSwgXCJhdXRvXCIgY2Fubm90IGJlIHVzZWQgdG8gYWxsb3cgXCJib3R0b20tc3RhcnRcIi4nLCAnVXNlIFwiYXV0by1zdGFydFwiIGluc3RlYWQuJ10uam9pbignICcpKTtcbiAgICB9XG4gIH0gLy8gJEZsb3dGaXhNZVtpbmNvbXBhdGlibGUtdHlwZV06IEZsb3cgc2VlbXMgdG8gaGF2ZSBwcm9ibGVtcyB3aXRoIHR3byBhcnJheSB1bmlvbnMuLi5cblxuXG4gIHZhciBvdmVyZmxvd3MgPSBhbGxvd2VkUGxhY2VtZW50cy5yZWR1Y2UoZnVuY3Rpb24gKGFjYywgcGxhY2VtZW50KSB7XG4gICAgYWNjW3BsYWNlbWVudF0gPSBkZXRlY3RPdmVyZmxvdyhzdGF0ZSwge1xuICAgICAgcGxhY2VtZW50OiBwbGFjZW1lbnQsXG4gICAgICBib3VuZGFyeTogYm91bmRhcnksXG4gICAgICByb290Qm91bmRhcnk6IHJvb3RCb3VuZGFyeSxcbiAgICAgIHBhZGRpbmc6IHBhZGRpbmdcbiAgICB9KVtnZXRCYXNlUGxhY2VtZW50KHBsYWNlbWVudCldO1xuICAgIHJldHVybiBhY2M7XG4gIH0sIHt9KTtcbiAgcmV0dXJuIE9iamVjdC5rZXlzKG92ZXJmbG93cykuc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgIHJldHVybiBvdmVyZmxvd3NbYV0gLSBvdmVyZmxvd3NbYl07XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBnZXRFeHBhbmRlZEZhbGxiYWNrUGxhY2VtZW50cyhwbGFjZW1lbnQpIHtcbiAgaWYgKGdldEJhc2VQbGFjZW1lbnQocGxhY2VtZW50KSA9PT0gYXV0bykge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIHZhciBvcHBvc2l0ZVBsYWNlbWVudCA9IGdldE9wcG9zaXRlUGxhY2VtZW50KHBsYWNlbWVudCk7XG4gIHJldHVybiBbZ2V0T3Bwb3NpdGVWYXJpYXRpb25QbGFjZW1lbnQocGxhY2VtZW50KSwgb3Bwb3NpdGVQbGFjZW1lbnQsIGdldE9wcG9zaXRlVmFyaWF0aW9uUGxhY2VtZW50KG9wcG9zaXRlUGxhY2VtZW50KV07XG59XG5cbmZ1bmN0aW9uIGZsaXAoX3JlZikge1xuICB2YXIgc3RhdGUgPSBfcmVmLnN0YXRlLFxuICAgICAgb3B0aW9ucyA9IF9yZWYub3B0aW9ucyxcbiAgICAgIG5hbWUgPSBfcmVmLm5hbWU7XG5cbiAgaWYgKHN0YXRlLm1vZGlmaWVyc0RhdGFbbmFtZV0uX3NraXApIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgX29wdGlvbnMkbWFpbkF4aXMgPSBvcHRpb25zLm1haW5BeGlzLFxuICAgICAgY2hlY2tNYWluQXhpcyA9IF9vcHRpb25zJG1haW5BeGlzID09PSB2b2lkIDAgPyB0cnVlIDogX29wdGlvbnMkbWFpbkF4aXMsXG4gICAgICBfb3B0aW9ucyRhbHRBeGlzID0gb3B0aW9ucy5hbHRBeGlzLFxuICAgICAgY2hlY2tBbHRBeGlzID0gX29wdGlvbnMkYWx0QXhpcyA9PT0gdm9pZCAwID8gdHJ1ZSA6IF9vcHRpb25zJGFsdEF4aXMsXG4gICAgICBzcGVjaWZpZWRGYWxsYmFja1BsYWNlbWVudHMgPSBvcHRpb25zLmZhbGxiYWNrUGxhY2VtZW50cyxcbiAgICAgIHBhZGRpbmcgPSBvcHRpb25zLnBhZGRpbmcsXG4gICAgICBib3VuZGFyeSA9IG9wdGlvbnMuYm91bmRhcnksXG4gICAgICByb290Qm91bmRhcnkgPSBvcHRpb25zLnJvb3RCb3VuZGFyeSxcbiAgICAgIGFsdEJvdW5kYXJ5ID0gb3B0aW9ucy5hbHRCb3VuZGFyeSxcbiAgICAgIF9vcHRpb25zJGZsaXBWYXJpYXRpbyA9IG9wdGlvbnMuZmxpcFZhcmlhdGlvbnMsXG4gICAgICBmbGlwVmFyaWF0aW9ucyA9IF9vcHRpb25zJGZsaXBWYXJpYXRpbyA9PT0gdm9pZCAwID8gdHJ1ZSA6IF9vcHRpb25zJGZsaXBWYXJpYXRpbyxcbiAgICAgIGFsbG93ZWRBdXRvUGxhY2VtZW50cyA9IG9wdGlvbnMuYWxsb3dlZEF1dG9QbGFjZW1lbnRzO1xuICB2YXIgcHJlZmVycmVkUGxhY2VtZW50ID0gc3RhdGUub3B0aW9ucy5wbGFjZW1lbnQ7XG4gIHZhciBiYXNlUGxhY2VtZW50ID0gZ2V0QmFzZVBsYWNlbWVudChwcmVmZXJyZWRQbGFjZW1lbnQpO1xuICB2YXIgaXNCYXNlUGxhY2VtZW50ID0gYmFzZVBsYWNlbWVudCA9PT0gcHJlZmVycmVkUGxhY2VtZW50O1xuICB2YXIgZmFsbGJhY2tQbGFjZW1lbnRzID0gc3BlY2lmaWVkRmFsbGJhY2tQbGFjZW1lbnRzIHx8IChpc0Jhc2VQbGFjZW1lbnQgfHwgIWZsaXBWYXJpYXRpb25zID8gW2dldE9wcG9zaXRlUGxhY2VtZW50KHByZWZlcnJlZFBsYWNlbWVudCldIDogZ2V0RXhwYW5kZWRGYWxsYmFja1BsYWNlbWVudHMocHJlZmVycmVkUGxhY2VtZW50KSk7XG4gIHZhciBwbGFjZW1lbnRzID0gW3ByZWZlcnJlZFBsYWNlbWVudF0uY29uY2F0KGZhbGxiYWNrUGxhY2VtZW50cykucmVkdWNlKGZ1bmN0aW9uIChhY2MsIHBsYWNlbWVudCkge1xuICAgIHJldHVybiBhY2MuY29uY2F0KGdldEJhc2VQbGFjZW1lbnQocGxhY2VtZW50KSA9PT0gYXV0byA/IGNvbXB1dGVBdXRvUGxhY2VtZW50KHN0YXRlLCB7XG4gICAgICBwbGFjZW1lbnQ6IHBsYWNlbWVudCxcbiAgICAgIGJvdW5kYXJ5OiBib3VuZGFyeSxcbiAgICAgIHJvb3RCb3VuZGFyeTogcm9vdEJvdW5kYXJ5LFxuICAgICAgcGFkZGluZzogcGFkZGluZyxcbiAgICAgIGZsaXBWYXJpYXRpb25zOiBmbGlwVmFyaWF0aW9ucyxcbiAgICAgIGFsbG93ZWRBdXRvUGxhY2VtZW50czogYWxsb3dlZEF1dG9QbGFjZW1lbnRzXG4gICAgfSkgOiBwbGFjZW1lbnQpO1xuICB9LCBbXSk7XG4gIHZhciByZWZlcmVuY2VSZWN0ID0gc3RhdGUucmVjdHMucmVmZXJlbmNlO1xuICB2YXIgcG9wcGVyUmVjdCA9IHN0YXRlLnJlY3RzLnBvcHBlcjtcbiAgdmFyIGNoZWNrc01hcCA9IG5ldyBNYXAoKTtcbiAgdmFyIG1ha2VGYWxsYmFja0NoZWNrcyA9IHRydWU7XG4gIHZhciBmaXJzdEZpdHRpbmdQbGFjZW1lbnQgPSBwbGFjZW1lbnRzWzBdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcGxhY2VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBwbGFjZW1lbnQgPSBwbGFjZW1lbnRzW2ldO1xuXG4gICAgdmFyIF9iYXNlUGxhY2VtZW50ID0gZ2V0QmFzZVBsYWNlbWVudChwbGFjZW1lbnQpO1xuXG4gICAgdmFyIGlzU3RhcnRWYXJpYXRpb24gPSBnZXRWYXJpYXRpb24ocGxhY2VtZW50KSA9PT0gc3RhcnQ7XG4gICAgdmFyIGlzVmVydGljYWwgPSBbdG9wLCBib3R0b21dLmluZGV4T2YoX2Jhc2VQbGFjZW1lbnQpID49IDA7XG4gICAgdmFyIGxlbiA9IGlzVmVydGljYWwgPyAnd2lkdGgnIDogJ2hlaWdodCc7XG4gICAgdmFyIG92ZXJmbG93ID0gZGV0ZWN0T3ZlcmZsb3coc3RhdGUsIHtcbiAgICAgIHBsYWNlbWVudDogcGxhY2VtZW50LFxuICAgICAgYm91bmRhcnk6IGJvdW5kYXJ5LFxuICAgICAgcm9vdEJvdW5kYXJ5OiByb290Qm91bmRhcnksXG4gICAgICBhbHRCb3VuZGFyeTogYWx0Qm91bmRhcnksXG4gICAgICBwYWRkaW5nOiBwYWRkaW5nXG4gICAgfSk7XG4gICAgdmFyIG1haW5WYXJpYXRpb25TaWRlID0gaXNWZXJ0aWNhbCA/IGlzU3RhcnRWYXJpYXRpb24gPyByaWdodCA6IGxlZnQgOiBpc1N0YXJ0VmFyaWF0aW9uID8gYm90dG9tIDogdG9wO1xuXG4gICAgaWYgKHJlZmVyZW5jZVJlY3RbbGVuXSA+IHBvcHBlclJlY3RbbGVuXSkge1xuICAgICAgbWFpblZhcmlhdGlvblNpZGUgPSBnZXRPcHBvc2l0ZVBsYWNlbWVudChtYWluVmFyaWF0aW9uU2lkZSk7XG4gICAgfVxuXG4gICAgdmFyIGFsdFZhcmlhdGlvblNpZGUgPSBnZXRPcHBvc2l0ZVBsYWNlbWVudChtYWluVmFyaWF0aW9uU2lkZSk7XG4gICAgdmFyIGNoZWNrcyA9IFtdO1xuXG4gICAgaWYgKGNoZWNrTWFpbkF4aXMpIHtcbiAgICAgIGNoZWNrcy5wdXNoKG92ZXJmbG93W19iYXNlUGxhY2VtZW50XSA8PSAwKTtcbiAgICB9XG5cbiAgICBpZiAoY2hlY2tBbHRBeGlzKSB7XG4gICAgICBjaGVja3MucHVzaChvdmVyZmxvd1ttYWluVmFyaWF0aW9uU2lkZV0gPD0gMCwgb3ZlcmZsb3dbYWx0VmFyaWF0aW9uU2lkZV0gPD0gMCk7XG4gICAgfVxuXG4gICAgaWYgKGNoZWNrcy5ldmVyeShmdW5jdGlvbiAoY2hlY2spIHtcbiAgICAgIHJldHVybiBjaGVjaztcbiAgICB9KSkge1xuICAgICAgZmlyc3RGaXR0aW5nUGxhY2VtZW50ID0gcGxhY2VtZW50O1xuICAgICAgbWFrZUZhbGxiYWNrQ2hlY2tzID0gZmFsc2U7XG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICBjaGVja3NNYXAuc2V0KHBsYWNlbWVudCwgY2hlY2tzKTtcbiAgfVxuXG4gIGlmIChtYWtlRmFsbGJhY2tDaGVja3MpIHtcbiAgICAvLyBgMmAgbWF5IGJlIGRlc2lyZWQgaW4gc29tZSBjYXNlcyBcdTIwMTMgcmVzZWFyY2ggbGF0ZXJcbiAgICB2YXIgbnVtYmVyT2ZDaGVja3MgPSBmbGlwVmFyaWF0aW9ucyA/IDMgOiAxO1xuXG4gICAgdmFyIF9sb29wID0gZnVuY3Rpb24gX2xvb3AoX2kpIHtcbiAgICAgIHZhciBmaXR0aW5nUGxhY2VtZW50ID0gcGxhY2VtZW50cy5maW5kKGZ1bmN0aW9uIChwbGFjZW1lbnQpIHtcbiAgICAgICAgdmFyIGNoZWNrcyA9IGNoZWNrc01hcC5nZXQocGxhY2VtZW50KTtcblxuICAgICAgICBpZiAoY2hlY2tzKSB7XG4gICAgICAgICAgcmV0dXJuIGNoZWNrcy5zbGljZSgwLCBfaSkuZXZlcnkoZnVuY3Rpb24gKGNoZWNrKSB7XG4gICAgICAgICAgICByZXR1cm4gY2hlY2s7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBpZiAoZml0dGluZ1BsYWNlbWVudCkge1xuICAgICAgICBmaXJzdEZpdHRpbmdQbGFjZW1lbnQgPSBmaXR0aW5nUGxhY2VtZW50O1xuICAgICAgICByZXR1cm4gXCJicmVha1wiO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBmb3IgKHZhciBfaSA9IG51bWJlck9mQ2hlY2tzOyBfaSA+IDA7IF9pLS0pIHtcbiAgICAgIHZhciBfcmV0ID0gX2xvb3AoX2kpO1xuXG4gICAgICBpZiAoX3JldCA9PT0gXCJicmVha1wiKSBicmVhaztcbiAgICB9XG4gIH1cblxuICBpZiAoc3RhdGUucGxhY2VtZW50ICE9PSBmaXJzdEZpdHRpbmdQbGFjZW1lbnQpIHtcbiAgICBzdGF0ZS5tb2RpZmllcnNEYXRhW25hbWVdLl9za2lwID0gdHJ1ZTtcbiAgICBzdGF0ZS5wbGFjZW1lbnQgPSBmaXJzdEZpdHRpbmdQbGFjZW1lbnQ7XG4gICAgc3RhdGUucmVzZXQgPSB0cnVlO1xuICB9XG59IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tdW51c2VkLW1vZHVsZXNcblxuXG52YXIgZmxpcCQxID0ge1xuICBuYW1lOiAnZmxpcCcsXG4gIGVuYWJsZWQ6IHRydWUsXG4gIHBoYXNlOiAnbWFpbicsXG4gIGZuOiBmbGlwLFxuICByZXF1aXJlc0lmRXhpc3RzOiBbJ29mZnNldCddLFxuICBkYXRhOiB7XG4gICAgX3NraXA6IGZhbHNlXG4gIH1cbn07XG5cbmZ1bmN0aW9uIGdldEFsdEF4aXMoYXhpcykge1xuICByZXR1cm4gYXhpcyA9PT0gJ3gnID8gJ3knIDogJ3gnO1xufVxuXG5mdW5jdGlvbiB3aXRoaW4obWluJDEsIHZhbHVlLCBtYXgkMSkge1xuICByZXR1cm4gbWF4KG1pbiQxLCBtaW4odmFsdWUsIG1heCQxKSk7XG59XG5mdW5jdGlvbiB3aXRoaW5NYXhDbGFtcChtaW4sIHZhbHVlLCBtYXgpIHtcbiAgdmFyIHYgPSB3aXRoaW4obWluLCB2YWx1ZSwgbWF4KTtcbiAgcmV0dXJuIHYgPiBtYXggPyBtYXggOiB2O1xufVxuXG5mdW5jdGlvbiBwcmV2ZW50T3ZlcmZsb3coX3JlZikge1xuICB2YXIgc3RhdGUgPSBfcmVmLnN0YXRlLFxuICAgICAgb3B0aW9ucyA9IF9yZWYub3B0aW9ucyxcbiAgICAgIG5hbWUgPSBfcmVmLm5hbWU7XG4gIHZhciBfb3B0aW9ucyRtYWluQXhpcyA9IG9wdGlvbnMubWFpbkF4aXMsXG4gICAgICBjaGVja01haW5BeGlzID0gX29wdGlvbnMkbWFpbkF4aXMgPT09IHZvaWQgMCA/IHRydWUgOiBfb3B0aW9ucyRtYWluQXhpcyxcbiAgICAgIF9vcHRpb25zJGFsdEF4aXMgPSBvcHRpb25zLmFsdEF4aXMsXG4gICAgICBjaGVja0FsdEF4aXMgPSBfb3B0aW9ucyRhbHRBeGlzID09PSB2b2lkIDAgPyBmYWxzZSA6IF9vcHRpb25zJGFsdEF4aXMsXG4gICAgICBib3VuZGFyeSA9IG9wdGlvbnMuYm91bmRhcnksXG4gICAgICByb290Qm91bmRhcnkgPSBvcHRpb25zLnJvb3RCb3VuZGFyeSxcbiAgICAgIGFsdEJvdW5kYXJ5ID0gb3B0aW9ucy5hbHRCb3VuZGFyeSxcbiAgICAgIHBhZGRpbmcgPSBvcHRpb25zLnBhZGRpbmcsXG4gICAgICBfb3B0aW9ucyR0ZXRoZXIgPSBvcHRpb25zLnRldGhlcixcbiAgICAgIHRldGhlciA9IF9vcHRpb25zJHRldGhlciA9PT0gdm9pZCAwID8gdHJ1ZSA6IF9vcHRpb25zJHRldGhlcixcbiAgICAgIF9vcHRpb25zJHRldGhlck9mZnNldCA9IG9wdGlvbnMudGV0aGVyT2Zmc2V0LFxuICAgICAgdGV0aGVyT2Zmc2V0ID0gX29wdGlvbnMkdGV0aGVyT2Zmc2V0ID09PSB2b2lkIDAgPyAwIDogX29wdGlvbnMkdGV0aGVyT2Zmc2V0O1xuICB2YXIgb3ZlcmZsb3cgPSBkZXRlY3RPdmVyZmxvdyhzdGF0ZSwge1xuICAgIGJvdW5kYXJ5OiBib3VuZGFyeSxcbiAgICByb290Qm91bmRhcnk6IHJvb3RCb3VuZGFyeSxcbiAgICBwYWRkaW5nOiBwYWRkaW5nLFxuICAgIGFsdEJvdW5kYXJ5OiBhbHRCb3VuZGFyeVxuICB9KTtcbiAgdmFyIGJhc2VQbGFjZW1lbnQgPSBnZXRCYXNlUGxhY2VtZW50KHN0YXRlLnBsYWNlbWVudCk7XG4gIHZhciB2YXJpYXRpb24gPSBnZXRWYXJpYXRpb24oc3RhdGUucGxhY2VtZW50KTtcbiAgdmFyIGlzQmFzZVBsYWNlbWVudCA9ICF2YXJpYXRpb247XG4gIHZhciBtYWluQXhpcyA9IGdldE1haW5BeGlzRnJvbVBsYWNlbWVudChiYXNlUGxhY2VtZW50KTtcbiAgdmFyIGFsdEF4aXMgPSBnZXRBbHRBeGlzKG1haW5BeGlzKTtcbiAgdmFyIHBvcHBlck9mZnNldHMgPSBzdGF0ZS5tb2RpZmllcnNEYXRhLnBvcHBlck9mZnNldHM7XG4gIHZhciByZWZlcmVuY2VSZWN0ID0gc3RhdGUucmVjdHMucmVmZXJlbmNlO1xuICB2YXIgcG9wcGVyUmVjdCA9IHN0YXRlLnJlY3RzLnBvcHBlcjtcbiAgdmFyIHRldGhlck9mZnNldFZhbHVlID0gdHlwZW9mIHRldGhlck9mZnNldCA9PT0gJ2Z1bmN0aW9uJyA/IHRldGhlck9mZnNldChPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5yZWN0cywge1xuICAgIHBsYWNlbWVudDogc3RhdGUucGxhY2VtZW50XG4gIH0pKSA6IHRldGhlck9mZnNldDtcbiAgdmFyIG5vcm1hbGl6ZWRUZXRoZXJPZmZzZXRWYWx1ZSA9IHR5cGVvZiB0ZXRoZXJPZmZzZXRWYWx1ZSA9PT0gJ251bWJlcicgPyB7XG4gICAgbWFpbkF4aXM6IHRldGhlck9mZnNldFZhbHVlLFxuICAgIGFsdEF4aXM6IHRldGhlck9mZnNldFZhbHVlXG4gIH0gOiBPYmplY3QuYXNzaWduKHtcbiAgICBtYWluQXhpczogMCxcbiAgICBhbHRBeGlzOiAwXG4gIH0sIHRldGhlck9mZnNldFZhbHVlKTtcbiAgdmFyIG9mZnNldE1vZGlmaWVyU3RhdGUgPSBzdGF0ZS5tb2RpZmllcnNEYXRhLm9mZnNldCA/IHN0YXRlLm1vZGlmaWVyc0RhdGEub2Zmc2V0W3N0YXRlLnBsYWNlbWVudF0gOiBudWxsO1xuICB2YXIgZGF0YSA9IHtcbiAgICB4OiAwLFxuICAgIHk6IDBcbiAgfTtcblxuICBpZiAoIXBvcHBlck9mZnNldHMpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoY2hlY2tNYWluQXhpcykge1xuICAgIHZhciBfb2Zmc2V0TW9kaWZpZXJTdGF0ZSQ7XG5cbiAgICB2YXIgbWFpblNpZGUgPSBtYWluQXhpcyA9PT0gJ3knID8gdG9wIDogbGVmdDtcbiAgICB2YXIgYWx0U2lkZSA9IG1haW5BeGlzID09PSAneScgPyBib3R0b20gOiByaWdodDtcbiAgICB2YXIgbGVuID0gbWFpbkF4aXMgPT09ICd5JyA/ICdoZWlnaHQnIDogJ3dpZHRoJztcbiAgICB2YXIgb2Zmc2V0ID0gcG9wcGVyT2Zmc2V0c1ttYWluQXhpc107XG4gICAgdmFyIG1pbiQxID0gb2Zmc2V0ICsgb3ZlcmZsb3dbbWFpblNpZGVdO1xuICAgIHZhciBtYXgkMSA9IG9mZnNldCAtIG92ZXJmbG93W2FsdFNpZGVdO1xuICAgIHZhciBhZGRpdGl2ZSA9IHRldGhlciA/IC1wb3BwZXJSZWN0W2xlbl0gLyAyIDogMDtcbiAgICB2YXIgbWluTGVuID0gdmFyaWF0aW9uID09PSBzdGFydCA/IHJlZmVyZW5jZVJlY3RbbGVuXSA6IHBvcHBlclJlY3RbbGVuXTtcbiAgICB2YXIgbWF4TGVuID0gdmFyaWF0aW9uID09PSBzdGFydCA/IC1wb3BwZXJSZWN0W2xlbl0gOiAtcmVmZXJlbmNlUmVjdFtsZW5dOyAvLyBXZSBuZWVkIHRvIGluY2x1ZGUgdGhlIGFycm93IGluIHRoZSBjYWxjdWxhdGlvbiBzbyB0aGUgYXJyb3cgZG9lc24ndCBnb1xuICAgIC8vIG91dHNpZGUgdGhlIHJlZmVyZW5jZSBib3VuZHNcblxuICAgIHZhciBhcnJvd0VsZW1lbnQgPSBzdGF0ZS5lbGVtZW50cy5hcnJvdztcbiAgICB2YXIgYXJyb3dSZWN0ID0gdGV0aGVyICYmIGFycm93RWxlbWVudCA/IGdldExheW91dFJlY3QoYXJyb3dFbGVtZW50KSA6IHtcbiAgICAgIHdpZHRoOiAwLFxuICAgICAgaGVpZ2h0OiAwXG4gICAgfTtcbiAgICB2YXIgYXJyb3dQYWRkaW5nT2JqZWN0ID0gc3RhdGUubW9kaWZpZXJzRGF0YVsnYXJyb3cjcGVyc2lzdGVudCddID8gc3RhdGUubW9kaWZpZXJzRGF0YVsnYXJyb3cjcGVyc2lzdGVudCddLnBhZGRpbmcgOiBnZXRGcmVzaFNpZGVPYmplY3QoKTtcbiAgICB2YXIgYXJyb3dQYWRkaW5nTWluID0gYXJyb3dQYWRkaW5nT2JqZWN0W21haW5TaWRlXTtcbiAgICB2YXIgYXJyb3dQYWRkaW5nTWF4ID0gYXJyb3dQYWRkaW5nT2JqZWN0W2FsdFNpZGVdOyAvLyBJZiB0aGUgcmVmZXJlbmNlIGxlbmd0aCBpcyBzbWFsbGVyIHRoYW4gdGhlIGFycm93IGxlbmd0aCwgd2UgZG9uJ3Qgd2FudFxuICAgIC8vIHRvIGluY2x1ZGUgaXRzIGZ1bGwgc2l6ZSBpbiB0aGUgY2FsY3VsYXRpb24uIElmIHRoZSByZWZlcmVuY2UgaXMgc21hbGxcbiAgICAvLyBhbmQgbmVhciB0aGUgZWRnZSBvZiBhIGJvdW5kYXJ5LCB0aGUgcG9wcGVyIGNhbiBvdmVyZmxvdyBldmVuIGlmIHRoZVxuICAgIC8vIHJlZmVyZW5jZSBpcyBub3Qgb3ZlcmZsb3dpbmcgYXMgd2VsbCAoZS5nLiB2aXJ0dWFsIGVsZW1lbnRzIHdpdGggbm9cbiAgICAvLyB3aWR0aCBvciBoZWlnaHQpXG5cbiAgICB2YXIgYXJyb3dMZW4gPSB3aXRoaW4oMCwgcmVmZXJlbmNlUmVjdFtsZW5dLCBhcnJvd1JlY3RbbGVuXSk7XG4gICAgdmFyIG1pbk9mZnNldCA9IGlzQmFzZVBsYWNlbWVudCA/IHJlZmVyZW5jZVJlY3RbbGVuXSAvIDIgLSBhZGRpdGl2ZSAtIGFycm93TGVuIC0gYXJyb3dQYWRkaW5nTWluIC0gbm9ybWFsaXplZFRldGhlck9mZnNldFZhbHVlLm1haW5BeGlzIDogbWluTGVuIC0gYXJyb3dMZW4gLSBhcnJvd1BhZGRpbmdNaW4gLSBub3JtYWxpemVkVGV0aGVyT2Zmc2V0VmFsdWUubWFpbkF4aXM7XG4gICAgdmFyIG1heE9mZnNldCA9IGlzQmFzZVBsYWNlbWVudCA/IC1yZWZlcmVuY2VSZWN0W2xlbl0gLyAyICsgYWRkaXRpdmUgKyBhcnJvd0xlbiArIGFycm93UGFkZGluZ01heCArIG5vcm1hbGl6ZWRUZXRoZXJPZmZzZXRWYWx1ZS5tYWluQXhpcyA6IG1heExlbiArIGFycm93TGVuICsgYXJyb3dQYWRkaW5nTWF4ICsgbm9ybWFsaXplZFRldGhlck9mZnNldFZhbHVlLm1haW5BeGlzO1xuICAgIHZhciBhcnJvd09mZnNldFBhcmVudCA9IHN0YXRlLmVsZW1lbnRzLmFycm93ICYmIGdldE9mZnNldFBhcmVudChzdGF0ZS5lbGVtZW50cy5hcnJvdyk7XG4gICAgdmFyIGNsaWVudE9mZnNldCA9IGFycm93T2Zmc2V0UGFyZW50ID8gbWFpbkF4aXMgPT09ICd5JyA/IGFycm93T2Zmc2V0UGFyZW50LmNsaWVudFRvcCB8fCAwIDogYXJyb3dPZmZzZXRQYXJlbnQuY2xpZW50TGVmdCB8fCAwIDogMDtcbiAgICB2YXIgb2Zmc2V0TW9kaWZpZXJWYWx1ZSA9IChfb2Zmc2V0TW9kaWZpZXJTdGF0ZSQgPSBvZmZzZXRNb2RpZmllclN0YXRlID09IG51bGwgPyB2b2lkIDAgOiBvZmZzZXRNb2RpZmllclN0YXRlW21haW5BeGlzXSkgIT0gbnVsbCA/IF9vZmZzZXRNb2RpZmllclN0YXRlJCA6IDA7XG4gICAgdmFyIHRldGhlck1pbiA9IG9mZnNldCArIG1pbk9mZnNldCAtIG9mZnNldE1vZGlmaWVyVmFsdWUgLSBjbGllbnRPZmZzZXQ7XG4gICAgdmFyIHRldGhlck1heCA9IG9mZnNldCArIG1heE9mZnNldCAtIG9mZnNldE1vZGlmaWVyVmFsdWU7XG4gICAgdmFyIHByZXZlbnRlZE9mZnNldCA9IHdpdGhpbih0ZXRoZXIgPyBtaW4obWluJDEsIHRldGhlck1pbikgOiBtaW4kMSwgb2Zmc2V0LCB0ZXRoZXIgPyBtYXgobWF4JDEsIHRldGhlck1heCkgOiBtYXgkMSk7XG4gICAgcG9wcGVyT2Zmc2V0c1ttYWluQXhpc10gPSBwcmV2ZW50ZWRPZmZzZXQ7XG4gICAgZGF0YVttYWluQXhpc10gPSBwcmV2ZW50ZWRPZmZzZXQgLSBvZmZzZXQ7XG4gIH1cblxuICBpZiAoY2hlY2tBbHRBeGlzKSB7XG4gICAgdmFyIF9vZmZzZXRNb2RpZmllclN0YXRlJDI7XG5cbiAgICB2YXIgX21haW5TaWRlID0gbWFpbkF4aXMgPT09ICd4JyA/IHRvcCA6IGxlZnQ7XG5cbiAgICB2YXIgX2FsdFNpZGUgPSBtYWluQXhpcyA9PT0gJ3gnID8gYm90dG9tIDogcmlnaHQ7XG5cbiAgICB2YXIgX29mZnNldCA9IHBvcHBlck9mZnNldHNbYWx0QXhpc107XG5cbiAgICB2YXIgX2xlbiA9IGFsdEF4aXMgPT09ICd5JyA/ICdoZWlnaHQnIDogJ3dpZHRoJztcblxuICAgIHZhciBfbWluID0gX29mZnNldCArIG92ZXJmbG93W19tYWluU2lkZV07XG5cbiAgICB2YXIgX21heCA9IF9vZmZzZXQgLSBvdmVyZmxvd1tfYWx0U2lkZV07XG5cbiAgICB2YXIgaXNPcmlnaW5TaWRlID0gW3RvcCwgbGVmdF0uaW5kZXhPZihiYXNlUGxhY2VtZW50KSAhPT0gLTE7XG5cbiAgICB2YXIgX29mZnNldE1vZGlmaWVyVmFsdWUgPSAoX29mZnNldE1vZGlmaWVyU3RhdGUkMiA9IG9mZnNldE1vZGlmaWVyU3RhdGUgPT0gbnVsbCA/IHZvaWQgMCA6IG9mZnNldE1vZGlmaWVyU3RhdGVbYWx0QXhpc10pICE9IG51bGwgPyBfb2Zmc2V0TW9kaWZpZXJTdGF0ZSQyIDogMDtcblxuICAgIHZhciBfdGV0aGVyTWluID0gaXNPcmlnaW5TaWRlID8gX21pbiA6IF9vZmZzZXQgLSByZWZlcmVuY2VSZWN0W19sZW5dIC0gcG9wcGVyUmVjdFtfbGVuXSAtIF9vZmZzZXRNb2RpZmllclZhbHVlICsgbm9ybWFsaXplZFRldGhlck9mZnNldFZhbHVlLmFsdEF4aXM7XG5cbiAgICB2YXIgX3RldGhlck1heCA9IGlzT3JpZ2luU2lkZSA/IF9vZmZzZXQgKyByZWZlcmVuY2VSZWN0W19sZW5dICsgcG9wcGVyUmVjdFtfbGVuXSAtIF9vZmZzZXRNb2RpZmllclZhbHVlIC0gbm9ybWFsaXplZFRldGhlck9mZnNldFZhbHVlLmFsdEF4aXMgOiBfbWF4O1xuXG4gICAgdmFyIF9wcmV2ZW50ZWRPZmZzZXQgPSB0ZXRoZXIgJiYgaXNPcmlnaW5TaWRlID8gd2l0aGluTWF4Q2xhbXAoX3RldGhlck1pbiwgX29mZnNldCwgX3RldGhlck1heCkgOiB3aXRoaW4odGV0aGVyID8gX3RldGhlck1pbiA6IF9taW4sIF9vZmZzZXQsIHRldGhlciA/IF90ZXRoZXJNYXggOiBfbWF4KTtcblxuICAgIHBvcHBlck9mZnNldHNbYWx0QXhpc10gPSBfcHJldmVudGVkT2Zmc2V0O1xuICAgIGRhdGFbYWx0QXhpc10gPSBfcHJldmVudGVkT2Zmc2V0IC0gX29mZnNldDtcbiAgfVxuXG4gIHN0YXRlLm1vZGlmaWVyc0RhdGFbbmFtZV0gPSBkYXRhO1xufSAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLXVudXNlZC1tb2R1bGVzXG5cblxudmFyIHByZXZlbnRPdmVyZmxvdyQxID0ge1xuICBuYW1lOiAncHJldmVudE92ZXJmbG93JyxcbiAgZW5hYmxlZDogdHJ1ZSxcbiAgcGhhc2U6ICdtYWluJyxcbiAgZm46IHByZXZlbnRPdmVyZmxvdyxcbiAgcmVxdWlyZXNJZkV4aXN0czogWydvZmZzZXQnXVxufTtcblxudmFyIHRvUGFkZGluZ09iamVjdCA9IGZ1bmN0aW9uIHRvUGFkZGluZ09iamVjdChwYWRkaW5nLCBzdGF0ZSkge1xuICBwYWRkaW5nID0gdHlwZW9mIHBhZGRpbmcgPT09ICdmdW5jdGlvbicgPyBwYWRkaW5nKE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLnJlY3RzLCB7XG4gICAgcGxhY2VtZW50OiBzdGF0ZS5wbGFjZW1lbnRcbiAgfSkpIDogcGFkZGluZztcbiAgcmV0dXJuIG1lcmdlUGFkZGluZ09iamVjdCh0eXBlb2YgcGFkZGluZyAhPT0gJ251bWJlcicgPyBwYWRkaW5nIDogZXhwYW5kVG9IYXNoTWFwKHBhZGRpbmcsIGJhc2VQbGFjZW1lbnRzKSk7XG59O1xuXG5mdW5jdGlvbiBhcnJvdyhfcmVmKSB7XG4gIHZhciBfc3RhdGUkbW9kaWZpZXJzRGF0YSQ7XG5cbiAgdmFyIHN0YXRlID0gX3JlZi5zdGF0ZSxcbiAgICAgIG5hbWUgPSBfcmVmLm5hbWUsXG4gICAgICBvcHRpb25zID0gX3JlZi5vcHRpb25zO1xuICB2YXIgYXJyb3dFbGVtZW50ID0gc3RhdGUuZWxlbWVudHMuYXJyb3c7XG4gIHZhciBwb3BwZXJPZmZzZXRzID0gc3RhdGUubW9kaWZpZXJzRGF0YS5wb3BwZXJPZmZzZXRzO1xuICB2YXIgYmFzZVBsYWNlbWVudCA9IGdldEJhc2VQbGFjZW1lbnQoc3RhdGUucGxhY2VtZW50KTtcbiAgdmFyIGF4aXMgPSBnZXRNYWluQXhpc0Zyb21QbGFjZW1lbnQoYmFzZVBsYWNlbWVudCk7XG4gIHZhciBpc1ZlcnRpY2FsID0gW2xlZnQsIHJpZ2h0XS5pbmRleE9mKGJhc2VQbGFjZW1lbnQpID49IDA7XG4gIHZhciBsZW4gPSBpc1ZlcnRpY2FsID8gJ2hlaWdodCcgOiAnd2lkdGgnO1xuXG4gIGlmICghYXJyb3dFbGVtZW50IHx8ICFwb3BwZXJPZmZzZXRzKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIHBhZGRpbmdPYmplY3QgPSB0b1BhZGRpbmdPYmplY3Qob3B0aW9ucy5wYWRkaW5nLCBzdGF0ZSk7XG4gIHZhciBhcnJvd1JlY3QgPSBnZXRMYXlvdXRSZWN0KGFycm93RWxlbWVudCk7XG4gIHZhciBtaW5Qcm9wID0gYXhpcyA9PT0gJ3knID8gdG9wIDogbGVmdDtcbiAgdmFyIG1heFByb3AgPSBheGlzID09PSAneScgPyBib3R0b20gOiByaWdodDtcbiAgdmFyIGVuZERpZmYgPSBzdGF0ZS5yZWN0cy5yZWZlcmVuY2VbbGVuXSArIHN0YXRlLnJlY3RzLnJlZmVyZW5jZVtheGlzXSAtIHBvcHBlck9mZnNldHNbYXhpc10gLSBzdGF0ZS5yZWN0cy5wb3BwZXJbbGVuXTtcbiAgdmFyIHN0YXJ0RGlmZiA9IHBvcHBlck9mZnNldHNbYXhpc10gLSBzdGF0ZS5yZWN0cy5yZWZlcmVuY2VbYXhpc107XG4gIHZhciBhcnJvd09mZnNldFBhcmVudCA9IGdldE9mZnNldFBhcmVudChhcnJvd0VsZW1lbnQpO1xuICB2YXIgY2xpZW50U2l6ZSA9IGFycm93T2Zmc2V0UGFyZW50ID8gYXhpcyA9PT0gJ3knID8gYXJyb3dPZmZzZXRQYXJlbnQuY2xpZW50SGVpZ2h0IHx8IDAgOiBhcnJvd09mZnNldFBhcmVudC5jbGllbnRXaWR0aCB8fCAwIDogMDtcbiAgdmFyIGNlbnRlclRvUmVmZXJlbmNlID0gZW5kRGlmZiAvIDIgLSBzdGFydERpZmYgLyAyOyAvLyBNYWtlIHN1cmUgdGhlIGFycm93IGRvZXNuJ3Qgb3ZlcmZsb3cgdGhlIHBvcHBlciBpZiB0aGUgY2VudGVyIHBvaW50IGlzXG4gIC8vIG91dHNpZGUgb2YgdGhlIHBvcHBlciBib3VuZHNcblxuICB2YXIgbWluID0gcGFkZGluZ09iamVjdFttaW5Qcm9wXTtcbiAgdmFyIG1heCA9IGNsaWVudFNpemUgLSBhcnJvd1JlY3RbbGVuXSAtIHBhZGRpbmdPYmplY3RbbWF4UHJvcF07XG4gIHZhciBjZW50ZXIgPSBjbGllbnRTaXplIC8gMiAtIGFycm93UmVjdFtsZW5dIC8gMiArIGNlbnRlclRvUmVmZXJlbmNlO1xuICB2YXIgb2Zmc2V0ID0gd2l0aGluKG1pbiwgY2VudGVyLCBtYXgpOyAvLyBQcmV2ZW50cyBicmVha2luZyBzeW50YXggaGlnaGxpZ2h0aW5nLi4uXG5cbiAgdmFyIGF4aXNQcm9wID0gYXhpcztcbiAgc3RhdGUubW9kaWZpZXJzRGF0YVtuYW1lXSA9IChfc3RhdGUkbW9kaWZpZXJzRGF0YSQgPSB7fSwgX3N0YXRlJG1vZGlmaWVyc0RhdGEkW2F4aXNQcm9wXSA9IG9mZnNldCwgX3N0YXRlJG1vZGlmaWVyc0RhdGEkLmNlbnRlck9mZnNldCA9IG9mZnNldCAtIGNlbnRlciwgX3N0YXRlJG1vZGlmaWVyc0RhdGEkKTtcbn1cblxuZnVuY3Rpb24gZWZmZWN0KF9yZWYyKSB7XG4gIHZhciBzdGF0ZSA9IF9yZWYyLnN0YXRlLFxuICAgICAgb3B0aW9ucyA9IF9yZWYyLm9wdGlvbnM7XG4gIHZhciBfb3B0aW9ucyRlbGVtZW50ID0gb3B0aW9ucy5lbGVtZW50LFxuICAgICAgYXJyb3dFbGVtZW50ID0gX29wdGlvbnMkZWxlbWVudCA9PT0gdm9pZCAwID8gJ1tkYXRhLXBvcHBlci1hcnJvd10nIDogX29wdGlvbnMkZWxlbWVudDtcblxuICBpZiAoYXJyb3dFbGVtZW50ID09IG51bGwpIHtcbiAgICByZXR1cm47XG4gIH0gLy8gQ1NTIHNlbGVjdG9yXG5cblxuICBpZiAodHlwZW9mIGFycm93RWxlbWVudCA9PT0gJ3N0cmluZycpIHtcbiAgICBhcnJvd0VsZW1lbnQgPSBzdGF0ZS5lbGVtZW50cy5wb3BwZXIucXVlcnlTZWxlY3RvcihhcnJvd0VsZW1lbnQpO1xuXG4gICAgaWYgKCFhcnJvd0VsZW1lbnQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH1cblxuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgaWYgKCFpc0hUTUxFbGVtZW50KGFycm93RWxlbWVudCkpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoWydQb3BwZXI6IFwiYXJyb3dcIiBlbGVtZW50IG11c3QgYmUgYW4gSFRNTEVsZW1lbnQgKG5vdCBhbiBTVkdFbGVtZW50KS4nLCAnVG8gdXNlIGFuIFNWRyBhcnJvdywgd3JhcCBpdCBpbiBhbiBIVE1MRWxlbWVudCB0aGF0IHdpbGwgYmUgdXNlZCBhcycsICd0aGUgYXJyb3cuJ10uam9pbignICcpKTtcbiAgICB9XG4gIH1cblxuICBpZiAoIWNvbnRhaW5zKHN0YXRlLmVsZW1lbnRzLnBvcHBlciwgYXJyb3dFbGVtZW50KSkge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoWydQb3BwZXI6IFwiYXJyb3dcIiBtb2RpZmllclxcJ3MgYGVsZW1lbnRgIG11c3QgYmUgYSBjaGlsZCBvZiB0aGUgcG9wcGVyJywgJ2VsZW1lbnQuJ10uam9pbignICcpKTtcbiAgICB9XG5cbiAgICByZXR1cm47XG4gIH1cblxuICBzdGF0ZS5lbGVtZW50cy5hcnJvdyA9IGFycm93RWxlbWVudDtcbn0gLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby11bnVzZWQtbW9kdWxlc1xuXG5cbnZhciBhcnJvdyQxID0ge1xuICBuYW1lOiAnYXJyb3cnLFxuICBlbmFibGVkOiB0cnVlLFxuICBwaGFzZTogJ21haW4nLFxuICBmbjogYXJyb3csXG4gIGVmZmVjdDogZWZmZWN0LFxuICByZXF1aXJlczogWydwb3BwZXJPZmZzZXRzJ10sXG4gIHJlcXVpcmVzSWZFeGlzdHM6IFsncHJldmVudE92ZXJmbG93J11cbn07XG5cbmZ1bmN0aW9uIGdldFNpZGVPZmZzZXRzKG92ZXJmbG93LCByZWN0LCBwcmV2ZW50ZWRPZmZzZXRzKSB7XG4gIGlmIChwcmV2ZW50ZWRPZmZzZXRzID09PSB2b2lkIDApIHtcbiAgICBwcmV2ZW50ZWRPZmZzZXRzID0ge1xuICAgICAgeDogMCxcbiAgICAgIHk6IDBcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICB0b3A6IG92ZXJmbG93LnRvcCAtIHJlY3QuaGVpZ2h0IC0gcHJldmVudGVkT2Zmc2V0cy55LFxuICAgIHJpZ2h0OiBvdmVyZmxvdy5yaWdodCAtIHJlY3Qud2lkdGggKyBwcmV2ZW50ZWRPZmZzZXRzLngsXG4gICAgYm90dG9tOiBvdmVyZmxvdy5ib3R0b20gLSByZWN0LmhlaWdodCArIHByZXZlbnRlZE9mZnNldHMueSxcbiAgICBsZWZ0OiBvdmVyZmxvdy5sZWZ0IC0gcmVjdC53aWR0aCAtIHByZXZlbnRlZE9mZnNldHMueFxuICB9O1xufVxuXG5mdW5jdGlvbiBpc0FueVNpZGVGdWxseUNsaXBwZWQob3ZlcmZsb3cpIHtcbiAgcmV0dXJuIFt0b3AsIHJpZ2h0LCBib3R0b20sIGxlZnRdLnNvbWUoZnVuY3Rpb24gKHNpZGUpIHtcbiAgICByZXR1cm4gb3ZlcmZsb3dbc2lkZV0gPj0gMDtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGhpZGUoX3JlZikge1xuICB2YXIgc3RhdGUgPSBfcmVmLnN0YXRlLFxuICAgICAgbmFtZSA9IF9yZWYubmFtZTtcbiAgdmFyIHJlZmVyZW5jZVJlY3QgPSBzdGF0ZS5yZWN0cy5yZWZlcmVuY2U7XG4gIHZhciBwb3BwZXJSZWN0ID0gc3RhdGUucmVjdHMucG9wcGVyO1xuICB2YXIgcHJldmVudGVkT2Zmc2V0cyA9IHN0YXRlLm1vZGlmaWVyc0RhdGEucHJldmVudE92ZXJmbG93O1xuICB2YXIgcmVmZXJlbmNlT3ZlcmZsb3cgPSBkZXRlY3RPdmVyZmxvdyhzdGF0ZSwge1xuICAgIGVsZW1lbnRDb250ZXh0OiAncmVmZXJlbmNlJ1xuICB9KTtcbiAgdmFyIHBvcHBlckFsdE92ZXJmbG93ID0gZGV0ZWN0T3ZlcmZsb3coc3RhdGUsIHtcbiAgICBhbHRCb3VuZGFyeTogdHJ1ZVxuICB9KTtcbiAgdmFyIHJlZmVyZW5jZUNsaXBwaW5nT2Zmc2V0cyA9IGdldFNpZGVPZmZzZXRzKHJlZmVyZW5jZU92ZXJmbG93LCByZWZlcmVuY2VSZWN0KTtcbiAgdmFyIHBvcHBlckVzY2FwZU9mZnNldHMgPSBnZXRTaWRlT2Zmc2V0cyhwb3BwZXJBbHRPdmVyZmxvdywgcG9wcGVyUmVjdCwgcHJldmVudGVkT2Zmc2V0cyk7XG4gIHZhciBpc1JlZmVyZW5jZUhpZGRlbiA9IGlzQW55U2lkZUZ1bGx5Q2xpcHBlZChyZWZlcmVuY2VDbGlwcGluZ09mZnNldHMpO1xuICB2YXIgaGFzUG9wcGVyRXNjYXBlZCA9IGlzQW55U2lkZUZ1bGx5Q2xpcHBlZChwb3BwZXJFc2NhcGVPZmZzZXRzKTtcbiAgc3RhdGUubW9kaWZpZXJzRGF0YVtuYW1lXSA9IHtcbiAgICByZWZlcmVuY2VDbGlwcGluZ09mZnNldHM6IHJlZmVyZW5jZUNsaXBwaW5nT2Zmc2V0cyxcbiAgICBwb3BwZXJFc2NhcGVPZmZzZXRzOiBwb3BwZXJFc2NhcGVPZmZzZXRzLFxuICAgIGlzUmVmZXJlbmNlSGlkZGVuOiBpc1JlZmVyZW5jZUhpZGRlbixcbiAgICBoYXNQb3BwZXJFc2NhcGVkOiBoYXNQb3BwZXJFc2NhcGVkXG4gIH07XG4gIHN0YXRlLmF0dHJpYnV0ZXMucG9wcGVyID0gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUuYXR0cmlidXRlcy5wb3BwZXIsIHtcbiAgICAnZGF0YS1wb3BwZXItcmVmZXJlbmNlLWhpZGRlbic6IGlzUmVmZXJlbmNlSGlkZGVuLFxuICAgICdkYXRhLXBvcHBlci1lc2NhcGVkJzogaGFzUG9wcGVyRXNjYXBlZFxuICB9KTtcbn0gLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby11bnVzZWQtbW9kdWxlc1xuXG5cbnZhciBoaWRlJDEgPSB7XG4gIG5hbWU6ICdoaWRlJyxcbiAgZW5hYmxlZDogdHJ1ZSxcbiAgcGhhc2U6ICdtYWluJyxcbiAgcmVxdWlyZXNJZkV4aXN0czogWydwcmV2ZW50T3ZlcmZsb3cnXSxcbiAgZm46IGhpZGVcbn07XG5cbnZhciBkZWZhdWx0TW9kaWZpZXJzJDEgPSBbZXZlbnRMaXN0ZW5lcnMsIHBvcHBlck9mZnNldHMkMSwgY29tcHV0ZVN0eWxlcyQxLCBhcHBseVN0eWxlcyQxXTtcbnZhciBjcmVhdGVQb3BwZXIkMSA9IC8qI19fUFVSRV9fKi9wb3BwZXJHZW5lcmF0b3Ioe1xuICBkZWZhdWx0TW9kaWZpZXJzOiBkZWZhdWx0TW9kaWZpZXJzJDFcbn0pOyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLXVudXNlZC1tb2R1bGVzXG5cbnZhciBkZWZhdWx0TW9kaWZpZXJzID0gW2V2ZW50TGlzdGVuZXJzLCBwb3BwZXJPZmZzZXRzJDEsIGNvbXB1dGVTdHlsZXMkMSwgYXBwbHlTdHlsZXMkMSwgb2Zmc2V0JDEsIGZsaXAkMSwgcHJldmVudE92ZXJmbG93JDEsIGFycm93JDEsIGhpZGUkMV07XG52YXIgY3JlYXRlUG9wcGVyID0gLyojX19QVVJFX18qL3BvcHBlckdlbmVyYXRvcih7XG4gIGRlZmF1bHRNb2RpZmllcnM6IGRlZmF1bHRNb2RpZmllcnNcbn0pOyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLXVudXNlZC1tb2R1bGVzXG5cbmV4cG9ydHMuYXBwbHlTdHlsZXMgPSBhcHBseVN0eWxlcyQxO1xuZXhwb3J0cy5hcnJvdyA9IGFycm93JDE7XG5leHBvcnRzLmNvbXB1dGVTdHlsZXMgPSBjb21wdXRlU3R5bGVzJDE7XG5leHBvcnRzLmNyZWF0ZVBvcHBlciA9IGNyZWF0ZVBvcHBlcjtcbmV4cG9ydHMuY3JlYXRlUG9wcGVyTGl0ZSA9IGNyZWF0ZVBvcHBlciQxO1xuZXhwb3J0cy5kZWZhdWx0TW9kaWZpZXJzID0gZGVmYXVsdE1vZGlmaWVycztcbmV4cG9ydHMuZGV0ZWN0T3ZlcmZsb3cgPSBkZXRlY3RPdmVyZmxvdztcbmV4cG9ydHMuZXZlbnRMaXN0ZW5lcnMgPSBldmVudExpc3RlbmVycztcbmV4cG9ydHMuZmxpcCA9IGZsaXAkMTtcbmV4cG9ydHMuaGlkZSA9IGhpZGUkMTtcbmV4cG9ydHMub2Zmc2V0ID0gb2Zmc2V0JDE7XG5leHBvcnRzLnBvcHBlckdlbmVyYXRvciA9IHBvcHBlckdlbmVyYXRvcjtcbmV4cG9ydHMucG9wcGVyT2Zmc2V0cyA9IHBvcHBlck9mZnNldHMkMTtcbmV4cG9ydHMucHJldmVudE92ZXJmbG93ID0gcHJldmVudE92ZXJmbG93JDE7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1wb3BwZXIuanMubWFwXG4iLCAiLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQm9vdHN0cmFwIGRvbS9kYXRhLmpzXG4gKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21haW4vTElDRU5TRSlcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuLyoqXG4gKiBDb25zdGFudHNcbiAqL1xuXG5jb25zdCBlbGVtZW50TWFwID0gbmV3IE1hcCgpXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgc2V0KGVsZW1lbnQsIGtleSwgaW5zdGFuY2UpIHtcbiAgICBpZiAoIWVsZW1lbnRNYXAuaGFzKGVsZW1lbnQpKSB7XG4gICAgICBlbGVtZW50TWFwLnNldChlbGVtZW50LCBuZXcgTWFwKCkpXG4gICAgfVxuXG4gICAgY29uc3QgaW5zdGFuY2VNYXAgPSBlbGVtZW50TWFwLmdldChlbGVtZW50KVxuXG4gICAgLy8gbWFrZSBpdCBjbGVhciB3ZSBvbmx5IHdhbnQgb25lIGluc3RhbmNlIHBlciBlbGVtZW50XG4gICAgLy8gY2FuIGJlIHJlbW92ZWQgbGF0ZXIgd2hlbiBtdWx0aXBsZSBrZXkvaW5zdGFuY2VzIGFyZSBmaW5lIHRvIGJlIHVzZWRcbiAgICBpZiAoIWluc3RhbmNlTWFwLmhhcyhrZXkpICYmIGluc3RhbmNlTWFwLnNpemUgIT09IDApIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICBjb25zb2xlLmVycm9yKGBCb290c3RyYXAgZG9lc24ndCBhbGxvdyBtb3JlIHRoYW4gb25lIGluc3RhbmNlIHBlciBlbGVtZW50LiBCb3VuZCBpbnN0YW5jZTogJHtBcnJheS5mcm9tKGluc3RhbmNlTWFwLmtleXMoKSlbMF19LmApXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBpbnN0YW5jZU1hcC5zZXQoa2V5LCBpbnN0YW5jZSlcbiAgfSxcblxuICBnZXQoZWxlbWVudCwga2V5KSB7XG4gICAgaWYgKGVsZW1lbnRNYXAuaGFzKGVsZW1lbnQpKSB7XG4gICAgICByZXR1cm4gZWxlbWVudE1hcC5nZXQoZWxlbWVudCkuZ2V0KGtleSkgfHwgbnVsbFxuICAgIH1cblxuICAgIHJldHVybiBudWxsXG4gIH0sXG5cbiAgcmVtb3ZlKGVsZW1lbnQsIGtleSkge1xuICAgIGlmICghZWxlbWVudE1hcC5oYXMoZWxlbWVudCkpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGNvbnN0IGluc3RhbmNlTWFwID0gZWxlbWVudE1hcC5nZXQoZWxlbWVudClcblxuICAgIGluc3RhbmNlTWFwLmRlbGV0ZShrZXkpXG5cbiAgICAvLyBmcmVlIHVwIGVsZW1lbnQgcmVmZXJlbmNlcyBpZiB0aGVyZSBhcmUgbm8gaW5zdGFuY2VzIGxlZnQgZm9yIGFuIGVsZW1lbnRcbiAgICBpZiAoaW5zdGFuY2VNYXAuc2l6ZSA9PT0gMCkge1xuICAgICAgZWxlbWVudE1hcC5kZWxldGUoZWxlbWVudClcbiAgICB9XG4gIH1cbn1cbiIsICIvKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBCb290c3RyYXAgdXRpbC9pbmRleC5qc1xuICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYWluL0xJQ0VOU0UpXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbmNvbnN0IE1BWF9VSUQgPSAxXzAwMF8wMDBcbmNvbnN0IE1JTExJU0VDT05EU19NVUxUSVBMSUVSID0gMTAwMFxuY29uc3QgVFJBTlNJVElPTl9FTkQgPSAndHJhbnNpdGlvbmVuZCdcblxuLyoqXG4gKiBQcm9wZXJseSBlc2NhcGUgSURzIHNlbGVjdG9ycyB0byBoYW5kbGUgd2VpcmQgSURzXG4gKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0b3JcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmNvbnN0IHBhcnNlU2VsZWN0b3IgPSBzZWxlY3RvciA9PiB7XG4gIGlmIChzZWxlY3RvciAmJiB3aW5kb3cuQ1NTICYmIHdpbmRvdy5DU1MuZXNjYXBlKSB7XG4gICAgLy8gZG9jdW1lbnQucXVlcnlTZWxlY3RvciBuZWVkcyBlc2NhcGluZyB0byBoYW5kbGUgSURzIChodG1sNSspIGNvbnRhaW5pbmcgZm9yIGluc3RhbmNlIC9cbiAgICBzZWxlY3RvciA9IHNlbGVjdG9yLnJlcGxhY2UoLyMoW15cXHNcIiMnXSspL2csIChtYXRjaCwgaWQpID0+IGAjJHtDU1MuZXNjYXBlKGlkKX1gKVxuICB9XG5cbiAgcmV0dXJuIHNlbGVjdG9yXG59XG5cbi8vIFNob3V0LW91dCBBbmd1cyBDcm9sbCAoaHR0cHM6Ly9nb28uZ2wvcHh3UUdwKVxuY29uc3QgdG9UeXBlID0gb2JqZWN0ID0+IHtcbiAgaWYgKG9iamVjdCA9PT0gbnVsbCB8fCBvYmplY3QgPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBgJHtvYmplY3R9YFxuICB9XG5cbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmplY3QpLm1hdGNoKC9cXHMoW2Etel0rKS9pKVsxXS50b0xvd2VyQ2FzZSgpXG59XG5cbi8qKlxuICogUHVibGljIFV0aWwgQVBJXG4gKi9cblxuY29uc3QgZ2V0VUlEID0gcHJlZml4ID0+IHtcbiAgZG8ge1xuICAgIHByZWZpeCArPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBNQVhfVUlEKVxuICB9IHdoaWxlIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwcmVmaXgpKVxuXG4gIHJldHVybiBwcmVmaXhcbn1cblxuY29uc3QgZ2V0VHJhbnNpdGlvbkR1cmF0aW9uRnJvbUVsZW1lbnQgPSBlbGVtZW50ID0+IHtcbiAgaWYgKCFlbGVtZW50KSB7XG4gICAgcmV0dXJuIDBcbiAgfVxuXG4gIC8vIEdldCB0cmFuc2l0aW9uLWR1cmF0aW9uIG9mIHRoZSBlbGVtZW50XG4gIGxldCB7IHRyYW5zaXRpb25EdXJhdGlvbiwgdHJhbnNpdGlvbkRlbGF5IH0gPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KVxuXG4gIGNvbnN0IGZsb2F0VHJhbnNpdGlvbkR1cmF0aW9uID0gTnVtYmVyLnBhcnNlRmxvYXQodHJhbnNpdGlvbkR1cmF0aW9uKVxuICBjb25zdCBmbG9hdFRyYW5zaXRpb25EZWxheSA9IE51bWJlci5wYXJzZUZsb2F0KHRyYW5zaXRpb25EZWxheSlcblxuICAvLyBSZXR1cm4gMCBpZiBlbGVtZW50IG9yIHRyYW5zaXRpb24gZHVyYXRpb24gaXMgbm90IGZvdW5kXG4gIGlmICghZmxvYXRUcmFuc2l0aW9uRHVyYXRpb24gJiYgIWZsb2F0VHJhbnNpdGlvbkRlbGF5KSB7XG4gICAgcmV0dXJuIDBcbiAgfVxuXG4gIC8vIElmIG11bHRpcGxlIGR1cmF0aW9ucyBhcmUgZGVmaW5lZCwgdGFrZSB0aGUgZmlyc3RcbiAgdHJhbnNpdGlvbkR1cmF0aW9uID0gdHJhbnNpdGlvbkR1cmF0aW9uLnNwbGl0KCcsJylbMF1cbiAgdHJhbnNpdGlvbkRlbGF5ID0gdHJhbnNpdGlvbkRlbGF5LnNwbGl0KCcsJylbMF1cblxuICByZXR1cm4gKE51bWJlci5wYXJzZUZsb2F0KHRyYW5zaXRpb25EdXJhdGlvbikgKyBOdW1iZXIucGFyc2VGbG9hdCh0cmFuc2l0aW9uRGVsYXkpKSAqIE1JTExJU0VDT05EU19NVUxUSVBMSUVSXG59XG5cbmNvbnN0IHRyaWdnZXJUcmFuc2l0aW9uRW5kID0gZWxlbWVudCA9PiB7XG4gIGVsZW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoVFJBTlNJVElPTl9FTkQpKVxufVxuXG5jb25zdCBpc0VsZW1lbnQgPSBvYmplY3QgPT4ge1xuICBpZiAoIW9iamVjdCB8fCB0eXBlb2Ygb2JqZWN0ICE9PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgaWYgKHR5cGVvZiBvYmplY3QuanF1ZXJ5ICE9PSAndW5kZWZpbmVkJykge1xuICAgIG9iamVjdCA9IG9iamVjdFswXVxuICB9XG5cbiAgcmV0dXJuIHR5cGVvZiBvYmplY3Qubm9kZVR5cGUgIT09ICd1bmRlZmluZWQnXG59XG5cbmNvbnN0IGdldEVsZW1lbnQgPSBvYmplY3QgPT4ge1xuICAvLyBpdCdzIGEgalF1ZXJ5IG9iamVjdCBvciBhIG5vZGUgZWxlbWVudFxuICBpZiAoaXNFbGVtZW50KG9iamVjdCkpIHtcbiAgICByZXR1cm4gb2JqZWN0LmpxdWVyeSA/IG9iamVjdFswXSA6IG9iamVjdFxuICB9XG5cbiAgaWYgKHR5cGVvZiBvYmplY3QgPT09ICdzdHJpbmcnICYmIG9iamVjdC5sZW5ndGggPiAwKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IocGFyc2VTZWxlY3RvcihvYmplY3QpKVxuICB9XG5cbiAgcmV0dXJuIG51bGxcbn1cblxuY29uc3QgaXNWaXNpYmxlID0gZWxlbWVudCA9PiB7XG4gIGlmICghaXNFbGVtZW50KGVsZW1lbnQpIHx8IGVsZW1lbnQuZ2V0Q2xpZW50UmVjdHMoKS5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIGNvbnN0IGVsZW1lbnRJc1Zpc2libGUgPSBnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpLmdldFByb3BlcnR5VmFsdWUoJ3Zpc2liaWxpdHknKSA9PT0gJ3Zpc2libGUnXG4gIC8vIEhhbmRsZSBgZGV0YWlsc2AgZWxlbWVudCBhcyBpdHMgY29udGVudCBtYXkgZmFsc2llIGFwcGVhciB2aXNpYmxlIHdoZW4gaXQgaXMgY2xvc2VkXG4gIGNvbnN0IGNsb3NlZERldGFpbHMgPSBlbGVtZW50LmNsb3Nlc3QoJ2RldGFpbHM6bm90KFtvcGVuXSknKVxuXG4gIGlmICghY2xvc2VkRGV0YWlscykge1xuICAgIHJldHVybiBlbGVtZW50SXNWaXNpYmxlXG4gIH1cblxuICBpZiAoY2xvc2VkRGV0YWlscyAhPT0gZWxlbWVudCkge1xuICAgIGNvbnN0IHN1bW1hcnkgPSBlbGVtZW50LmNsb3Nlc3QoJ3N1bW1hcnknKVxuICAgIGlmIChzdW1tYXJ5ICYmIHN1bW1hcnkucGFyZW50Tm9kZSAhPT0gY2xvc2VkRGV0YWlscykge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgaWYgKHN1bW1hcnkgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBlbGVtZW50SXNWaXNpYmxlXG59XG5cbmNvbnN0IGlzRGlzYWJsZWQgPSBlbGVtZW50ID0+IHtcbiAgaWYgKCFlbGVtZW50IHx8IGVsZW1lbnQubm9kZVR5cGUgIT09IE5vZGUuRUxFTUVOVF9OT0RFKSB7XG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIGlmIChlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnZGlzYWJsZWQnKSkge1xuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICBpZiAodHlwZW9mIGVsZW1lbnQuZGlzYWJsZWQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuIGVsZW1lbnQuZGlzYWJsZWRcbiAgfVxuXG4gIHJldHVybiBlbGVtZW50Lmhhc0F0dHJpYnV0ZSgnZGlzYWJsZWQnKSAmJiBlbGVtZW50LmdldEF0dHJpYnV0ZSgnZGlzYWJsZWQnKSAhPT0gJ2ZhbHNlJ1xufVxuXG5jb25zdCBmaW5kU2hhZG93Um9vdCA9IGVsZW1lbnQgPT4ge1xuICBpZiAoIWRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5hdHRhY2hTaGFkb3cpIHtcbiAgICByZXR1cm4gbnVsbFxuICB9XG5cbiAgLy8gQ2FuIGZpbmQgdGhlIHNoYWRvdyByb290IG90aGVyd2lzZSBpdCdsbCByZXR1cm4gdGhlIGRvY3VtZW50XG4gIGlmICh0eXBlb2YgZWxlbWVudC5nZXRSb290Tm9kZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNvbnN0IHJvb3QgPSBlbGVtZW50LmdldFJvb3ROb2RlKClcbiAgICByZXR1cm4gcm9vdCBpbnN0YW5jZW9mIFNoYWRvd1Jvb3QgPyByb290IDogbnVsbFxuICB9XG5cbiAgaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBTaGFkb3dSb290KSB7XG4gICAgcmV0dXJuIGVsZW1lbnRcbiAgfVxuXG4gIC8vIHdoZW4gd2UgZG9uJ3QgZmluZCBhIHNoYWRvdyByb290XG4gIGlmICghZWxlbWVudC5wYXJlbnROb2RlKSB7XG4gICAgcmV0dXJuIG51bGxcbiAgfVxuXG4gIHJldHVybiBmaW5kU2hhZG93Um9vdChlbGVtZW50LnBhcmVudE5vZGUpXG59XG5cbmNvbnN0IG5vb3AgPSAoKSA9PiB7fVxuXG4vKipcbiAqIFRyaWNrIHRvIHJlc3RhcnQgYW4gZWxlbWVudCdzIGFuaW1hdGlvblxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqIEByZXR1cm4gdm9pZFxuICpcbiAqIEBzZWUgaHR0cHM6Ly93d3cuY2hhcmlzdGhlby5pby9ibG9nLzIwMjEvMDIvcmVzdGFydC1hLWNzcy1hbmltYXRpb24td2l0aC1qYXZhc2NyaXB0LyNyZXN0YXJ0aW5nLWEtY3NzLWFuaW1hdGlvblxuICovXG5jb25zdCByZWZsb3cgPSBlbGVtZW50ID0+IHtcbiAgZWxlbWVudC5vZmZzZXRIZWlnaHQgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtZXhwcmVzc2lvbnNcbn1cblxuY29uc3QgZ2V0alF1ZXJ5ID0gKCkgPT4ge1xuICBpZiAod2luZG93LmpRdWVyeSAmJiAhZG9jdW1lbnQuYm9keS5oYXNBdHRyaWJ1dGUoJ2RhdGEtYnMtbm8tanF1ZXJ5JykpIHtcbiAgICByZXR1cm4gd2luZG93LmpRdWVyeVxuICB9XG5cbiAgcmV0dXJuIG51bGxcbn1cblxuY29uc3QgRE9NQ29udGVudExvYWRlZENhbGxiYWNrcyA9IFtdXG5cbmNvbnN0IG9uRE9NQ29udGVudExvYWRlZCA9IGNhbGxiYWNrID0+IHtcbiAgaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICdsb2FkaW5nJykge1xuICAgIC8vIGFkZCBsaXN0ZW5lciBvbiB0aGUgZmlyc3QgY2FsbCB3aGVuIHRoZSBkb2N1bWVudCBpcyBpbiBsb2FkaW5nIHN0YXRlXG4gICAgaWYgKCFET01Db250ZW50TG9hZGVkQ2FsbGJhY2tzLmxlbmd0aCkge1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbiAgICAgICAgZm9yIChjb25zdCBjYWxsYmFjayBvZiBET01Db250ZW50TG9hZGVkQ2FsbGJhY2tzKSB7XG4gICAgICAgICAgY2FsbGJhY2soKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cblxuICAgIERPTUNvbnRlbnRMb2FkZWRDYWxsYmFja3MucHVzaChjYWxsYmFjaylcbiAgfSBlbHNlIHtcbiAgICBjYWxsYmFjaygpXG4gIH1cbn1cblxuY29uc3QgaXNSVEwgPSAoKSA9PiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuZGlyID09PSAncnRsJ1xuXG5jb25zdCBkZWZpbmVKUXVlcnlQbHVnaW4gPSBwbHVnaW4gPT4ge1xuICBvbkRPTUNvbnRlbnRMb2FkZWQoKCkgPT4ge1xuICAgIGNvbnN0ICQgPSBnZXRqUXVlcnkoKVxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgIGlmICgkKSB7XG4gICAgICBjb25zdCBuYW1lID0gcGx1Z2luLk5BTUVcbiAgICAgIGNvbnN0IEpRVUVSWV9OT19DT05GTElDVCA9ICQuZm5bbmFtZV1cbiAgICAgICQuZm5bbmFtZV0gPSBwbHVnaW4ualF1ZXJ5SW50ZXJmYWNlXG4gICAgICAkLmZuW25hbWVdLkNvbnN0cnVjdG9yID0gcGx1Z2luXG4gICAgICAkLmZuW25hbWVdLm5vQ29uZmxpY3QgPSAoKSA9PiB7XG4gICAgICAgICQuZm5bbmFtZV0gPSBKUVVFUllfTk9fQ09ORkxJQ1RcbiAgICAgICAgcmV0dXJuIHBsdWdpbi5qUXVlcnlJbnRlcmZhY2VcbiAgICAgIH1cbiAgICB9XG4gIH0pXG59XG5cbmNvbnN0IGV4ZWN1dGUgPSAocG9zc2libGVDYWxsYmFjaywgYXJncyA9IFtdLCBkZWZhdWx0VmFsdWUgPSBwb3NzaWJsZUNhbGxiYWNrKSA9PiB7XG4gIHJldHVybiB0eXBlb2YgcG9zc2libGVDYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJyA/IHBvc3NpYmxlQ2FsbGJhY2soLi4uYXJncykgOiBkZWZhdWx0VmFsdWVcbn1cblxuY29uc3QgZXhlY3V0ZUFmdGVyVHJhbnNpdGlvbiA9IChjYWxsYmFjaywgdHJhbnNpdGlvbkVsZW1lbnQsIHdhaXRGb3JUcmFuc2l0aW9uID0gdHJ1ZSkgPT4ge1xuICBpZiAoIXdhaXRGb3JUcmFuc2l0aW9uKSB7XG4gICAgZXhlY3V0ZShjYWxsYmFjaylcbiAgICByZXR1cm5cbiAgfVxuXG4gIGNvbnN0IGR1cmF0aW9uUGFkZGluZyA9IDVcbiAgY29uc3QgZW11bGF0ZWREdXJhdGlvbiA9IGdldFRyYW5zaXRpb25EdXJhdGlvbkZyb21FbGVtZW50KHRyYW5zaXRpb25FbGVtZW50KSArIGR1cmF0aW9uUGFkZGluZ1xuXG4gIGxldCBjYWxsZWQgPSBmYWxzZVxuXG4gIGNvbnN0IGhhbmRsZXIgPSAoeyB0YXJnZXQgfSkgPT4ge1xuICAgIGlmICh0YXJnZXQgIT09IHRyYW5zaXRpb25FbGVtZW50KSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBjYWxsZWQgPSB0cnVlXG4gICAgdHJhbnNpdGlvbkVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihUUkFOU0lUSU9OX0VORCwgaGFuZGxlcilcbiAgICBleGVjdXRlKGNhbGxiYWNrKVxuICB9XG5cbiAgdHJhbnNpdGlvbkVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihUUkFOU0lUSU9OX0VORCwgaGFuZGxlcilcbiAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgaWYgKCFjYWxsZWQpIHtcbiAgICAgIHRyaWdnZXJUcmFuc2l0aW9uRW5kKHRyYW5zaXRpb25FbGVtZW50KVxuICAgIH1cbiAgfSwgZW11bGF0ZWREdXJhdGlvbilcbn1cblxuLyoqXG4gKiBSZXR1cm4gdGhlIHByZXZpb3VzL25leHQgZWxlbWVudCBvZiBhIGxpc3QuXG4gKlxuICogQHBhcmFtIHthcnJheX0gbGlzdCAgICBUaGUgbGlzdCBvZiBlbGVtZW50c1xuICogQHBhcmFtIGFjdGl2ZUVsZW1lbnQgICBUaGUgYWN0aXZlIGVsZW1lbnRcbiAqIEBwYXJhbSBzaG91bGRHZXROZXh0ICAgQ2hvb3NlIHRvIGdldCBuZXh0IG9yIHByZXZpb3VzIGVsZW1lbnRcbiAqIEBwYXJhbSBpc0N5Y2xlQWxsb3dlZFxuICogQHJldHVybiB7RWxlbWVudHxlbGVtfSBUaGUgcHJvcGVyIGVsZW1lbnRcbiAqL1xuY29uc3QgZ2V0TmV4dEFjdGl2ZUVsZW1lbnQgPSAobGlzdCwgYWN0aXZlRWxlbWVudCwgc2hvdWxkR2V0TmV4dCwgaXNDeWNsZUFsbG93ZWQpID0+IHtcbiAgY29uc3QgbGlzdExlbmd0aCA9IGxpc3QubGVuZ3RoXG4gIGxldCBpbmRleCA9IGxpc3QuaW5kZXhPZihhY3RpdmVFbGVtZW50KVxuXG4gIC8vIGlmIHRoZSBlbGVtZW50IGRvZXMgbm90IGV4aXN0IGluIHRoZSBsaXN0IHJldHVybiBhbiBlbGVtZW50XG4gIC8vIGRlcGVuZGluZyBvbiB0aGUgZGlyZWN0aW9uIGFuZCBpZiBjeWNsZSBpcyBhbGxvd2VkXG4gIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICByZXR1cm4gIXNob3VsZEdldE5leHQgJiYgaXNDeWNsZUFsbG93ZWQgPyBsaXN0W2xpc3RMZW5ndGggLSAxXSA6IGxpc3RbMF1cbiAgfVxuXG4gIGluZGV4ICs9IHNob3VsZEdldE5leHQgPyAxIDogLTFcblxuICBpZiAoaXNDeWNsZUFsbG93ZWQpIHtcbiAgICBpbmRleCA9IChpbmRleCArIGxpc3RMZW5ndGgpICUgbGlzdExlbmd0aFxuICB9XG5cbiAgcmV0dXJuIGxpc3RbTWF0aC5tYXgoMCwgTWF0aC5taW4oaW5kZXgsIGxpc3RMZW5ndGggLSAxKSldXG59XG5cbmV4cG9ydCB7XG4gIGRlZmluZUpRdWVyeVBsdWdpbixcbiAgZXhlY3V0ZSxcbiAgZXhlY3V0ZUFmdGVyVHJhbnNpdGlvbixcbiAgZmluZFNoYWRvd1Jvb3QsXG4gIGdldEVsZW1lbnQsXG4gIGdldGpRdWVyeSxcbiAgZ2V0TmV4dEFjdGl2ZUVsZW1lbnQsXG4gIGdldFRyYW5zaXRpb25EdXJhdGlvbkZyb21FbGVtZW50LFxuICBnZXRVSUQsXG4gIGlzRGlzYWJsZWQsXG4gIGlzRWxlbWVudCxcbiAgaXNSVEwsXG4gIGlzVmlzaWJsZSxcbiAgbm9vcCxcbiAgb25ET01Db250ZW50TG9hZGVkLFxuICBwYXJzZVNlbGVjdG9yLFxuICByZWZsb3csXG4gIHRyaWdnZXJUcmFuc2l0aW9uRW5kLFxuICB0b1R5cGVcbn1cbiIsICIvKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBCb290c3RyYXAgZG9tL2V2ZW50LWhhbmRsZXIuanNcbiAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFpbi9MSUNFTlNFKVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG5pbXBvcnQgeyBnZXRqUXVlcnkgfSBmcm9tICcuLi91dGlsL2luZGV4LmpzJ1xuXG4vKipcbiAqIENvbnN0YW50c1xuICovXG5cbmNvbnN0IG5hbWVzcGFjZVJlZ2V4ID0gL1teLl0qKD89XFwuLiopXFwufC4qL1xuY29uc3Qgc3RyaXBOYW1lUmVnZXggPSAvXFwuLiovXG5jb25zdCBzdHJpcFVpZFJlZ2V4ID0gLzo6XFxkKyQvXG5jb25zdCBldmVudFJlZ2lzdHJ5ID0ge30gLy8gRXZlbnRzIHN0b3JhZ2VcbmxldCB1aWRFdmVudCA9IDFcbmNvbnN0IGN1c3RvbUV2ZW50cyA9IHtcbiAgbW91c2VlbnRlcjogJ21vdXNlb3ZlcicsXG4gIG1vdXNlbGVhdmU6ICdtb3VzZW91dCdcbn1cblxuY29uc3QgbmF0aXZlRXZlbnRzID0gbmV3IFNldChbXG4gICdjbGljaycsXG4gICdkYmxjbGljaycsXG4gICdtb3VzZXVwJyxcbiAgJ21vdXNlZG93bicsXG4gICdjb250ZXh0bWVudScsXG4gICdtb3VzZXdoZWVsJyxcbiAgJ0RPTU1vdXNlU2Nyb2xsJyxcbiAgJ21vdXNlb3ZlcicsXG4gICdtb3VzZW91dCcsXG4gICdtb3VzZW1vdmUnLFxuICAnc2VsZWN0c3RhcnQnLFxuICAnc2VsZWN0ZW5kJyxcbiAgJ2tleWRvd24nLFxuICAna2V5cHJlc3MnLFxuICAna2V5dXAnLFxuICAnb3JpZW50YXRpb25jaGFuZ2UnLFxuICAndG91Y2hzdGFydCcsXG4gICd0b3VjaG1vdmUnLFxuICAndG91Y2hlbmQnLFxuICAndG91Y2hjYW5jZWwnLFxuICAncG9pbnRlcmRvd24nLFxuICAncG9pbnRlcm1vdmUnLFxuICAncG9pbnRlcnVwJyxcbiAgJ3BvaW50ZXJsZWF2ZScsXG4gICdwb2ludGVyY2FuY2VsJyxcbiAgJ2dlc3R1cmVzdGFydCcsXG4gICdnZXN0dXJlY2hhbmdlJyxcbiAgJ2dlc3R1cmVlbmQnLFxuICAnZm9jdXMnLFxuICAnYmx1cicsXG4gICdjaGFuZ2UnLFxuICAncmVzZXQnLFxuICAnc2VsZWN0JyxcbiAgJ3N1Ym1pdCcsXG4gICdmb2N1c2luJyxcbiAgJ2ZvY3Vzb3V0JyxcbiAgJ2xvYWQnLFxuICAndW5sb2FkJyxcbiAgJ2JlZm9yZXVubG9hZCcsXG4gICdyZXNpemUnLFxuICAnbW92ZScsXG4gICdET01Db250ZW50TG9hZGVkJyxcbiAgJ3JlYWR5c3RhdGVjaGFuZ2UnLFxuICAnZXJyb3InLFxuICAnYWJvcnQnLFxuICAnc2Nyb2xsJ1xuXSlcblxuLyoqXG4gKiBQcml2YXRlIG1ldGhvZHNcbiAqL1xuXG5mdW5jdGlvbiBtYWtlRXZlbnRVaWQoZWxlbWVudCwgdWlkKSB7XG4gIHJldHVybiAodWlkICYmIGAke3VpZH06OiR7dWlkRXZlbnQrK31gKSB8fCBlbGVtZW50LnVpZEV2ZW50IHx8IHVpZEV2ZW50Kytcbn1cblxuZnVuY3Rpb24gZ2V0RWxlbWVudEV2ZW50cyhlbGVtZW50KSB7XG4gIGNvbnN0IHVpZCA9IG1ha2VFdmVudFVpZChlbGVtZW50KVxuXG4gIGVsZW1lbnQudWlkRXZlbnQgPSB1aWRcbiAgZXZlbnRSZWdpc3RyeVt1aWRdID0gZXZlbnRSZWdpc3RyeVt1aWRdIHx8IHt9XG5cbiAgcmV0dXJuIGV2ZW50UmVnaXN0cnlbdWlkXVxufVxuXG5mdW5jdGlvbiBib290c3RyYXBIYW5kbGVyKGVsZW1lbnQsIGZuKSB7XG4gIHJldHVybiBmdW5jdGlvbiBoYW5kbGVyKGV2ZW50KSB7XG4gICAgaHlkcmF0ZU9iaihldmVudCwgeyBkZWxlZ2F0ZVRhcmdldDogZWxlbWVudCB9KVxuXG4gICAgaWYgKGhhbmRsZXIub25lT2ZmKSB7XG4gICAgICBFdmVudEhhbmRsZXIub2ZmKGVsZW1lbnQsIGV2ZW50LnR5cGUsIGZuKVxuICAgIH1cblxuICAgIHJldHVybiBmbi5hcHBseShlbGVtZW50LCBbZXZlbnRdKVxuICB9XG59XG5cbmZ1bmN0aW9uIGJvb3RzdHJhcERlbGVnYXRpb25IYW5kbGVyKGVsZW1lbnQsIHNlbGVjdG9yLCBmbikge1xuICByZXR1cm4gZnVuY3Rpb24gaGFuZGxlcihldmVudCkge1xuICAgIGNvbnN0IGRvbUVsZW1lbnRzID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKVxuXG4gICAgZm9yIChsZXQgeyB0YXJnZXQgfSA9IGV2ZW50OyB0YXJnZXQgJiYgdGFyZ2V0ICE9PSB0aGlzOyB0YXJnZXQgPSB0YXJnZXQucGFyZW50Tm9kZSkge1xuICAgICAgZm9yIChjb25zdCBkb21FbGVtZW50IG9mIGRvbUVsZW1lbnRzKSB7XG4gICAgICAgIGlmIChkb21FbGVtZW50ICE9PSB0YXJnZXQpIHtcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9XG5cbiAgICAgICAgaHlkcmF0ZU9iaihldmVudCwgeyBkZWxlZ2F0ZVRhcmdldDogdGFyZ2V0IH0pXG5cbiAgICAgICAgaWYgKGhhbmRsZXIub25lT2ZmKSB7XG4gICAgICAgICAgRXZlbnRIYW5kbGVyLm9mZihlbGVtZW50LCBldmVudC50eXBlLCBzZWxlY3RvciwgZm4pXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZm4uYXBwbHkodGFyZ2V0LCBbZXZlbnRdKVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBmaW5kSGFuZGxlcihldmVudHMsIGNhbGxhYmxlLCBkZWxlZ2F0aW9uU2VsZWN0b3IgPSBudWxsKSB7XG4gIHJldHVybiBPYmplY3QudmFsdWVzKGV2ZW50cylcbiAgICAuZmluZChldmVudCA9PiBldmVudC5jYWxsYWJsZSA9PT0gY2FsbGFibGUgJiYgZXZlbnQuZGVsZWdhdGlvblNlbGVjdG9yID09PSBkZWxlZ2F0aW9uU2VsZWN0b3IpXG59XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZVBhcmFtZXRlcnMob3JpZ2luYWxUeXBlRXZlbnQsIGhhbmRsZXIsIGRlbGVnYXRpb25GdW5jdGlvbikge1xuICBjb25zdCBpc0RlbGVnYXRlZCA9IHR5cGVvZiBoYW5kbGVyID09PSAnc3RyaW5nJ1xuICAvLyBUT0RPOiB0b29sdGlwIHBhc3NlcyBgZmFsc2VgIGluc3RlYWQgb2Ygc2VsZWN0b3IsIHNvIHdlIG5lZWQgdG8gY2hlY2tcbiAgY29uc3QgY2FsbGFibGUgPSBpc0RlbGVnYXRlZCA/IGRlbGVnYXRpb25GdW5jdGlvbiA6IChoYW5kbGVyIHx8IGRlbGVnYXRpb25GdW5jdGlvbilcbiAgbGV0IHR5cGVFdmVudCA9IGdldFR5cGVFdmVudChvcmlnaW5hbFR5cGVFdmVudClcblxuICBpZiAoIW5hdGl2ZUV2ZW50cy5oYXModHlwZUV2ZW50KSkge1xuICAgIHR5cGVFdmVudCA9IG9yaWdpbmFsVHlwZUV2ZW50XG4gIH1cblxuICByZXR1cm4gW2lzRGVsZWdhdGVkLCBjYWxsYWJsZSwgdHlwZUV2ZW50XVxufVxuXG5mdW5jdGlvbiBhZGRIYW5kbGVyKGVsZW1lbnQsIG9yaWdpbmFsVHlwZUV2ZW50LCBoYW5kbGVyLCBkZWxlZ2F0aW9uRnVuY3Rpb24sIG9uZU9mZikge1xuICBpZiAodHlwZW9mIG9yaWdpbmFsVHlwZUV2ZW50ICE9PSAnc3RyaW5nJyB8fCAhZWxlbWVudCkge1xuICAgIHJldHVyblxuICB9XG5cbiAgbGV0IFtpc0RlbGVnYXRlZCwgY2FsbGFibGUsIHR5cGVFdmVudF0gPSBub3JtYWxpemVQYXJhbWV0ZXJzKG9yaWdpbmFsVHlwZUV2ZW50LCBoYW5kbGVyLCBkZWxlZ2F0aW9uRnVuY3Rpb24pXG5cbiAgLy8gaW4gY2FzZSBvZiBtb3VzZWVudGVyIG9yIG1vdXNlbGVhdmUgd3JhcCB0aGUgaGFuZGxlciB3aXRoaW4gYSBmdW5jdGlvbiB0aGF0IGNoZWNrcyBmb3IgaXRzIERPTSBwb3NpdGlvblxuICAvLyB0aGlzIHByZXZlbnRzIHRoZSBoYW5kbGVyIGZyb20gYmVpbmcgZGlzcGF0Y2hlZCB0aGUgc2FtZSB3YXkgYXMgbW91c2VvdmVyIG9yIG1vdXNlb3V0IGRvZXNcbiAgaWYgKG9yaWdpbmFsVHlwZUV2ZW50IGluIGN1c3RvbUV2ZW50cykge1xuICAgIGNvbnN0IHdyYXBGdW5jdGlvbiA9IGZuID0+IHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgaWYgKCFldmVudC5yZWxhdGVkVGFyZ2V0IHx8IChldmVudC5yZWxhdGVkVGFyZ2V0ICE9PSBldmVudC5kZWxlZ2F0ZVRhcmdldCAmJiAhZXZlbnQuZGVsZWdhdGVUYXJnZXQuY29udGFpbnMoZXZlbnQucmVsYXRlZFRhcmdldCkpKSB7XG4gICAgICAgICAgcmV0dXJuIGZuLmNhbGwodGhpcywgZXZlbnQpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBjYWxsYWJsZSA9IHdyYXBGdW5jdGlvbihjYWxsYWJsZSlcbiAgfVxuXG4gIGNvbnN0IGV2ZW50cyA9IGdldEVsZW1lbnRFdmVudHMoZWxlbWVudClcbiAgY29uc3QgaGFuZGxlcnMgPSBldmVudHNbdHlwZUV2ZW50XSB8fCAoZXZlbnRzW3R5cGVFdmVudF0gPSB7fSlcbiAgY29uc3QgcHJldmlvdXNGdW5jdGlvbiA9IGZpbmRIYW5kbGVyKGhhbmRsZXJzLCBjYWxsYWJsZSwgaXNEZWxlZ2F0ZWQgPyBoYW5kbGVyIDogbnVsbClcblxuICBpZiAocHJldmlvdXNGdW5jdGlvbikge1xuICAgIHByZXZpb3VzRnVuY3Rpb24ub25lT2ZmID0gcHJldmlvdXNGdW5jdGlvbi5vbmVPZmYgJiYgb25lT2ZmXG5cbiAgICByZXR1cm5cbiAgfVxuXG4gIGNvbnN0IHVpZCA9IG1ha2VFdmVudFVpZChjYWxsYWJsZSwgb3JpZ2luYWxUeXBlRXZlbnQucmVwbGFjZShuYW1lc3BhY2VSZWdleCwgJycpKVxuICBjb25zdCBmbiA9IGlzRGVsZWdhdGVkID9cbiAgICBib290c3RyYXBEZWxlZ2F0aW9uSGFuZGxlcihlbGVtZW50LCBoYW5kbGVyLCBjYWxsYWJsZSkgOlxuICAgIGJvb3RzdHJhcEhhbmRsZXIoZWxlbWVudCwgY2FsbGFibGUpXG5cbiAgZm4uZGVsZWdhdGlvblNlbGVjdG9yID0gaXNEZWxlZ2F0ZWQgPyBoYW5kbGVyIDogbnVsbFxuICBmbi5jYWxsYWJsZSA9IGNhbGxhYmxlXG4gIGZuLm9uZU9mZiA9IG9uZU9mZlxuICBmbi51aWRFdmVudCA9IHVpZFxuICBoYW5kbGVyc1t1aWRdID0gZm5cblxuICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIodHlwZUV2ZW50LCBmbiwgaXNEZWxlZ2F0ZWQpXG59XG5cbmZ1bmN0aW9uIHJlbW92ZUhhbmRsZXIoZWxlbWVudCwgZXZlbnRzLCB0eXBlRXZlbnQsIGhhbmRsZXIsIGRlbGVnYXRpb25TZWxlY3Rvcikge1xuICBjb25zdCBmbiA9IGZpbmRIYW5kbGVyKGV2ZW50c1t0eXBlRXZlbnRdLCBoYW5kbGVyLCBkZWxlZ2F0aW9uU2VsZWN0b3IpXG5cbiAgaWYgKCFmbikge1xuICAgIHJldHVyblxuICB9XG5cbiAgZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKHR5cGVFdmVudCwgZm4sIEJvb2xlYW4oZGVsZWdhdGlvblNlbGVjdG9yKSlcbiAgZGVsZXRlIGV2ZW50c1t0eXBlRXZlbnRdW2ZuLnVpZEV2ZW50XVxufVxuXG5mdW5jdGlvbiByZW1vdmVOYW1lc3BhY2VkSGFuZGxlcnMoZWxlbWVudCwgZXZlbnRzLCB0eXBlRXZlbnQsIG5hbWVzcGFjZSkge1xuICBjb25zdCBzdG9yZUVsZW1lbnRFdmVudCA9IGV2ZW50c1t0eXBlRXZlbnRdIHx8IHt9XG5cbiAgZm9yIChjb25zdCBbaGFuZGxlcktleSwgZXZlbnRdIG9mIE9iamVjdC5lbnRyaWVzKHN0b3JlRWxlbWVudEV2ZW50KSkge1xuICAgIGlmIChoYW5kbGVyS2V5LmluY2x1ZGVzKG5hbWVzcGFjZSkpIHtcbiAgICAgIHJlbW92ZUhhbmRsZXIoZWxlbWVudCwgZXZlbnRzLCB0eXBlRXZlbnQsIGV2ZW50LmNhbGxhYmxlLCBldmVudC5kZWxlZ2F0aW9uU2VsZWN0b3IpXG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGdldFR5cGVFdmVudChldmVudCkge1xuICAvLyBhbGxvdyB0byBnZXQgdGhlIG5hdGl2ZSBldmVudHMgZnJvbSBuYW1lc3BhY2VkIGV2ZW50cyAoJ2NsaWNrLmJzLmJ1dHRvbicgLS0+ICdjbGljaycpXG4gIGV2ZW50ID0gZXZlbnQucmVwbGFjZShzdHJpcE5hbWVSZWdleCwgJycpXG4gIHJldHVybiBjdXN0b21FdmVudHNbZXZlbnRdIHx8IGV2ZW50XG59XG5cbmNvbnN0IEV2ZW50SGFuZGxlciA9IHtcbiAgb24oZWxlbWVudCwgZXZlbnQsIGhhbmRsZXIsIGRlbGVnYXRpb25GdW5jdGlvbikge1xuICAgIGFkZEhhbmRsZXIoZWxlbWVudCwgZXZlbnQsIGhhbmRsZXIsIGRlbGVnYXRpb25GdW5jdGlvbiwgZmFsc2UpXG4gIH0sXG5cbiAgb25lKGVsZW1lbnQsIGV2ZW50LCBoYW5kbGVyLCBkZWxlZ2F0aW9uRnVuY3Rpb24pIHtcbiAgICBhZGRIYW5kbGVyKGVsZW1lbnQsIGV2ZW50LCBoYW5kbGVyLCBkZWxlZ2F0aW9uRnVuY3Rpb24sIHRydWUpXG4gIH0sXG5cbiAgb2ZmKGVsZW1lbnQsIG9yaWdpbmFsVHlwZUV2ZW50LCBoYW5kbGVyLCBkZWxlZ2F0aW9uRnVuY3Rpb24pIHtcbiAgICBpZiAodHlwZW9mIG9yaWdpbmFsVHlwZUV2ZW50ICE9PSAnc3RyaW5nJyB8fCAhZWxlbWVudCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY29uc3QgW2lzRGVsZWdhdGVkLCBjYWxsYWJsZSwgdHlwZUV2ZW50XSA9IG5vcm1hbGl6ZVBhcmFtZXRlcnMob3JpZ2luYWxUeXBlRXZlbnQsIGhhbmRsZXIsIGRlbGVnYXRpb25GdW5jdGlvbilcbiAgICBjb25zdCBpbk5hbWVzcGFjZSA9IHR5cGVFdmVudCAhPT0gb3JpZ2luYWxUeXBlRXZlbnRcbiAgICBjb25zdCBldmVudHMgPSBnZXRFbGVtZW50RXZlbnRzKGVsZW1lbnQpXG4gICAgY29uc3Qgc3RvcmVFbGVtZW50RXZlbnQgPSBldmVudHNbdHlwZUV2ZW50XSB8fCB7fVxuICAgIGNvbnN0IGlzTmFtZXNwYWNlID0gb3JpZ2luYWxUeXBlRXZlbnQuc3RhcnRzV2l0aCgnLicpXG5cbiAgICBpZiAodHlwZW9mIGNhbGxhYmxlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgLy8gU2ltcGxlc3QgY2FzZTogaGFuZGxlciBpcyBwYXNzZWQsIHJlbW92ZSB0aGF0IGxpc3RlbmVyIE9OTFkuXG4gICAgICBpZiAoIU9iamVjdC5rZXlzKHN0b3JlRWxlbWVudEV2ZW50KS5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIHJlbW92ZUhhbmRsZXIoZWxlbWVudCwgZXZlbnRzLCB0eXBlRXZlbnQsIGNhbGxhYmxlLCBpc0RlbGVnYXRlZCA/IGhhbmRsZXIgOiBudWxsKVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgaWYgKGlzTmFtZXNwYWNlKSB7XG4gICAgICBmb3IgKGNvbnN0IGVsZW1lbnRFdmVudCBvZiBPYmplY3Qua2V5cyhldmVudHMpKSB7XG4gICAgICAgIHJlbW92ZU5hbWVzcGFjZWRIYW5kbGVycyhlbGVtZW50LCBldmVudHMsIGVsZW1lbnRFdmVudCwgb3JpZ2luYWxUeXBlRXZlbnQuc2xpY2UoMSkpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBba2V5SGFuZGxlcnMsIGV2ZW50XSBvZiBPYmplY3QuZW50cmllcyhzdG9yZUVsZW1lbnRFdmVudCkpIHtcbiAgICAgIGNvbnN0IGhhbmRsZXJLZXkgPSBrZXlIYW5kbGVycy5yZXBsYWNlKHN0cmlwVWlkUmVnZXgsICcnKVxuXG4gICAgICBpZiAoIWluTmFtZXNwYWNlIHx8IG9yaWdpbmFsVHlwZUV2ZW50LmluY2x1ZGVzKGhhbmRsZXJLZXkpKSB7XG4gICAgICAgIHJlbW92ZUhhbmRsZXIoZWxlbWVudCwgZXZlbnRzLCB0eXBlRXZlbnQsIGV2ZW50LmNhbGxhYmxlLCBldmVudC5kZWxlZ2F0aW9uU2VsZWN0b3IpXG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIHRyaWdnZXIoZWxlbWVudCwgZXZlbnQsIGFyZ3MpIHtcbiAgICBpZiAodHlwZW9mIGV2ZW50ICE9PSAnc3RyaW5nJyB8fCAhZWxlbWVudCkge1xuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG5cbiAgICBjb25zdCAkID0gZ2V0alF1ZXJ5KClcbiAgICBjb25zdCB0eXBlRXZlbnQgPSBnZXRUeXBlRXZlbnQoZXZlbnQpXG4gICAgY29uc3QgaW5OYW1lc3BhY2UgPSBldmVudCAhPT0gdHlwZUV2ZW50XG5cbiAgICBsZXQgalF1ZXJ5RXZlbnQgPSBudWxsXG4gICAgbGV0IGJ1YmJsZXMgPSB0cnVlXG4gICAgbGV0IG5hdGl2ZURpc3BhdGNoID0gdHJ1ZVxuICAgIGxldCBkZWZhdWx0UHJldmVudGVkID0gZmFsc2VcblxuICAgIGlmIChpbk5hbWVzcGFjZSAmJiAkKSB7XG4gICAgICBqUXVlcnlFdmVudCA9ICQuRXZlbnQoZXZlbnQsIGFyZ3MpXG5cbiAgICAgICQoZWxlbWVudCkudHJpZ2dlcihqUXVlcnlFdmVudClcbiAgICAgIGJ1YmJsZXMgPSAhalF1ZXJ5RXZlbnQuaXNQcm9wYWdhdGlvblN0b3BwZWQoKVxuICAgICAgbmF0aXZlRGlzcGF0Y2ggPSAhalF1ZXJ5RXZlbnQuaXNJbW1lZGlhdGVQcm9wYWdhdGlvblN0b3BwZWQoKVxuICAgICAgZGVmYXVsdFByZXZlbnRlZCA9IGpRdWVyeUV2ZW50LmlzRGVmYXVsdFByZXZlbnRlZCgpXG4gICAgfVxuXG4gICAgY29uc3QgZXZ0ID0gaHlkcmF0ZU9iaihuZXcgRXZlbnQoZXZlbnQsIHsgYnViYmxlcywgY2FuY2VsYWJsZTogdHJ1ZSB9KSwgYXJncylcblxuICAgIGlmIChkZWZhdWx0UHJldmVudGVkKSB7XG4gICAgICBldnQucHJldmVudERlZmF1bHQoKVxuICAgIH1cblxuICAgIGlmIChuYXRpdmVEaXNwYXRjaCkge1xuICAgICAgZWxlbWVudC5kaXNwYXRjaEV2ZW50KGV2dClcbiAgICB9XG5cbiAgICBpZiAoZXZ0LmRlZmF1bHRQcmV2ZW50ZWQgJiYgalF1ZXJ5RXZlbnQpIHtcbiAgICAgIGpRdWVyeUV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICB9XG5cbiAgICByZXR1cm4gZXZ0XG4gIH1cbn1cblxuZnVuY3Rpb24gaHlkcmF0ZU9iaihvYmosIG1ldGEgPSB7fSkge1xuICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhtZXRhKSkge1xuICAgIHRyeSB7XG4gICAgICBvYmpba2V5XSA9IHZhbHVlXG4gICAgfSBjYXRjaCB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICBnZXQoKSB7XG4gICAgICAgICAgcmV0dXJuIHZhbHVlXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG9ialxufVxuXG5leHBvcnQgZGVmYXVsdCBFdmVudEhhbmRsZXJcbiIsICIvKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBCb290c3RyYXAgZG9tL21hbmlwdWxhdG9yLmpzXG4gKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21haW4vTElDRU5TRSlcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuZnVuY3Rpb24gbm9ybWFsaXplRGF0YSh2YWx1ZSkge1xuICBpZiAodmFsdWUgPT09ICd0cnVlJykge1xuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICBpZiAodmFsdWUgPT09ICdmYWxzZScpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIGlmICh2YWx1ZSA9PT0gTnVtYmVyKHZhbHVlKS50b1N0cmluZygpKSB7XG4gICAgcmV0dXJuIE51bWJlcih2YWx1ZSlcbiAgfVxuXG4gIGlmICh2YWx1ZSA9PT0gJycgfHwgdmFsdWUgPT09ICdudWxsJykge1xuICAgIHJldHVybiBudWxsXG4gIH1cblxuICBpZiAodHlwZW9mIHZhbHVlICE9PSAnc3RyaW5nJykge1xuICAgIHJldHVybiB2YWx1ZVxuICB9XG5cbiAgdHJ5IHtcbiAgICByZXR1cm4gSlNPTi5wYXJzZShkZWNvZGVVUklDb21wb25lbnQodmFsdWUpKVxuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gdmFsdWVcbiAgfVxufVxuXG5mdW5jdGlvbiBub3JtYWxpemVEYXRhS2V5KGtleSkge1xuICByZXR1cm4ga2V5LnJlcGxhY2UoL1tBLVpdL2csIGNociA9PiBgLSR7Y2hyLnRvTG93ZXJDYXNlKCl9YClcbn1cblxuY29uc3QgTWFuaXB1bGF0b3IgPSB7XG4gIHNldERhdGFBdHRyaWJ1dGUoZWxlbWVudCwga2V5LCB2YWx1ZSkge1xuICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKGBkYXRhLWJzLSR7bm9ybWFsaXplRGF0YUtleShrZXkpfWAsIHZhbHVlKVxuICB9LFxuXG4gIHJlbW92ZURhdGFBdHRyaWJ1dGUoZWxlbWVudCwga2V5KSB7XG4gICAgZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoYGRhdGEtYnMtJHtub3JtYWxpemVEYXRhS2V5KGtleSl9YClcbiAgfSxcblxuICBnZXREYXRhQXR0cmlidXRlcyhlbGVtZW50KSB7XG4gICAgaWYgKCFlbGVtZW50KSB7XG4gICAgICByZXR1cm4ge31cbiAgICB9XG5cbiAgICBjb25zdCBhdHRyaWJ1dGVzID0ge31cbiAgICBjb25zdCBic0tleXMgPSBPYmplY3Qua2V5cyhlbGVtZW50LmRhdGFzZXQpLmZpbHRlcihrZXkgPT4ga2V5LnN0YXJ0c1dpdGgoJ2JzJykgJiYgIWtleS5zdGFydHNXaXRoKCdic0NvbmZpZycpKVxuXG4gICAgZm9yIChjb25zdCBrZXkgb2YgYnNLZXlzKSB7XG4gICAgICBsZXQgcHVyZUtleSA9IGtleS5yZXBsYWNlKC9eYnMvLCAnJylcbiAgICAgIHB1cmVLZXkgPSBwdXJlS2V5LmNoYXJBdCgwKS50b0xvd2VyQ2FzZSgpICsgcHVyZUtleS5zbGljZSgxLCBwdXJlS2V5Lmxlbmd0aClcbiAgICAgIGF0dHJpYnV0ZXNbcHVyZUtleV0gPSBub3JtYWxpemVEYXRhKGVsZW1lbnQuZGF0YXNldFtrZXldKVxuICAgIH1cblxuICAgIHJldHVybiBhdHRyaWJ1dGVzXG4gIH0sXG5cbiAgZ2V0RGF0YUF0dHJpYnV0ZShlbGVtZW50LCBrZXkpIHtcbiAgICByZXR1cm4gbm9ybWFsaXplRGF0YShlbGVtZW50LmdldEF0dHJpYnV0ZShgZGF0YS1icy0ke25vcm1hbGl6ZURhdGFLZXkoa2V5KX1gKSlcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNYW5pcHVsYXRvclxuIiwgIi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIEJvb3RzdHJhcCB1dGlsL2NvbmZpZy5qc1xuICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYWluL0xJQ0VOU0UpXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbmltcG9ydCBNYW5pcHVsYXRvciBmcm9tICcuLi9kb20vbWFuaXB1bGF0b3IuanMnXG5pbXBvcnQgeyBpc0VsZW1lbnQsIHRvVHlwZSB9IGZyb20gJy4vaW5kZXguanMnXG5cbi8qKlxuICogQ2xhc3MgZGVmaW5pdGlvblxuICovXG5cbmNsYXNzIENvbmZpZyB7XG4gIC8vIEdldHRlcnNcbiAgc3RhdGljIGdldCBEZWZhdWx0KCkge1xuICAgIHJldHVybiB7fVxuICB9XG5cbiAgc3RhdGljIGdldCBEZWZhdWx0VHlwZSgpIHtcbiAgICByZXR1cm4ge31cbiAgfVxuXG4gIHN0YXRpYyBnZXQgTkFNRSgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1lvdSBoYXZlIHRvIGltcGxlbWVudCB0aGUgc3RhdGljIG1ldGhvZCBcIk5BTUVcIiwgZm9yIGVhY2ggY29tcG9uZW50IScpXG4gIH1cblxuICBfZ2V0Q29uZmlnKGNvbmZpZykge1xuICAgIGNvbmZpZyA9IHRoaXMuX21lcmdlQ29uZmlnT2JqKGNvbmZpZylcbiAgICBjb25maWcgPSB0aGlzLl9jb25maWdBZnRlck1lcmdlKGNvbmZpZylcbiAgICB0aGlzLl90eXBlQ2hlY2tDb25maWcoY29uZmlnKVxuICAgIHJldHVybiBjb25maWdcbiAgfVxuXG4gIF9jb25maWdBZnRlck1lcmdlKGNvbmZpZykge1xuICAgIHJldHVybiBjb25maWdcbiAgfVxuXG4gIF9tZXJnZUNvbmZpZ09iaihjb25maWcsIGVsZW1lbnQpIHtcbiAgICBjb25zdCBqc29uQ29uZmlnID0gaXNFbGVtZW50KGVsZW1lbnQpID8gTWFuaXB1bGF0b3IuZ2V0RGF0YUF0dHJpYnV0ZShlbGVtZW50LCAnY29uZmlnJykgOiB7fSAvLyB0cnkgdG8gcGFyc2VcblxuICAgIHJldHVybiB7XG4gICAgICAuLi50aGlzLmNvbnN0cnVjdG9yLkRlZmF1bHQsXG4gICAgICAuLi4odHlwZW9mIGpzb25Db25maWcgPT09ICdvYmplY3QnID8ganNvbkNvbmZpZyA6IHt9KSxcbiAgICAgIC4uLihpc0VsZW1lbnQoZWxlbWVudCkgPyBNYW5pcHVsYXRvci5nZXREYXRhQXR0cmlidXRlcyhlbGVtZW50KSA6IHt9KSxcbiAgICAgIC4uLih0eXBlb2YgY29uZmlnID09PSAnb2JqZWN0JyA/IGNvbmZpZyA6IHt9KVxuICAgIH1cbiAgfVxuXG4gIF90eXBlQ2hlY2tDb25maWcoY29uZmlnLCBjb25maWdUeXBlcyA9IHRoaXMuY29uc3RydWN0b3IuRGVmYXVsdFR5cGUpIHtcbiAgICBmb3IgKGNvbnN0IFtwcm9wZXJ0eSwgZXhwZWN0ZWRUeXBlc10gb2YgT2JqZWN0LmVudHJpZXMoY29uZmlnVHlwZXMpKSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IGNvbmZpZ1twcm9wZXJ0eV1cbiAgICAgIGNvbnN0IHZhbHVlVHlwZSA9IGlzRWxlbWVudCh2YWx1ZSkgPyAnZWxlbWVudCcgOiB0b1R5cGUodmFsdWUpXG5cbiAgICAgIGlmICghbmV3IFJlZ0V4cChleHBlY3RlZFR5cGVzKS50ZXN0KHZhbHVlVHlwZSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgICAgICBgJHt0aGlzLmNvbnN0cnVjdG9yLk5BTUUudG9VcHBlckNhc2UoKX06IE9wdGlvbiBcIiR7cHJvcGVydHl9XCIgcHJvdmlkZWQgdHlwZSBcIiR7dmFsdWVUeXBlfVwiIGJ1dCBleHBlY3RlZCB0eXBlIFwiJHtleHBlY3RlZFR5cGVzfVwiLmBcbiAgICAgICAgKVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDb25maWdcbiIsICIvKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBCb290c3RyYXAgYmFzZS1jb21wb25lbnQuanNcbiAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFpbi9MSUNFTlNFKVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG5pbXBvcnQgRGF0YSBmcm9tICcuL2RvbS9kYXRhLmpzJ1xuaW1wb3J0IEV2ZW50SGFuZGxlciBmcm9tICcuL2RvbS9ldmVudC1oYW5kbGVyLmpzJ1xuaW1wb3J0IENvbmZpZyBmcm9tICcuL3V0aWwvY29uZmlnLmpzJ1xuaW1wb3J0IHsgZXhlY3V0ZUFmdGVyVHJhbnNpdGlvbiwgZ2V0RWxlbWVudCB9IGZyb20gJy4vdXRpbC9pbmRleC5qcydcblxuLyoqXG4gKiBDb25zdGFudHNcbiAqL1xuXG5jb25zdCBWRVJTSU9OID0gJzUuMy4yJ1xuXG4vKipcbiAqIENsYXNzIGRlZmluaXRpb25cbiAqL1xuXG5jbGFzcyBCYXNlQ29tcG9uZW50IGV4dGVuZHMgQ29uZmlnIHtcbiAgY29uc3RydWN0b3IoZWxlbWVudCwgY29uZmlnKSB7XG4gICAgc3VwZXIoKVxuXG4gICAgZWxlbWVudCA9IGdldEVsZW1lbnQoZWxlbWVudClcbiAgICBpZiAoIWVsZW1lbnQpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHRoaXMuX2VsZW1lbnQgPSBlbGVtZW50XG4gICAgdGhpcy5fY29uZmlnID0gdGhpcy5fZ2V0Q29uZmlnKGNvbmZpZylcblxuICAgIERhdGEuc2V0KHRoaXMuX2VsZW1lbnQsIHRoaXMuY29uc3RydWN0b3IuREFUQV9LRVksIHRoaXMpXG4gIH1cblxuICAvLyBQdWJsaWNcbiAgZGlzcG9zZSgpIHtcbiAgICBEYXRhLnJlbW92ZSh0aGlzLl9lbGVtZW50LCB0aGlzLmNvbnN0cnVjdG9yLkRBVEFfS0VZKVxuICAgIEV2ZW50SGFuZGxlci5vZmYodGhpcy5fZWxlbWVudCwgdGhpcy5jb25zdHJ1Y3Rvci5FVkVOVF9LRVkpXG5cbiAgICBmb3IgKGNvbnN0IHByb3BlcnR5TmFtZSBvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0aGlzKSkge1xuICAgICAgdGhpc1twcm9wZXJ0eU5hbWVdID0gbnVsbFxuICAgIH1cbiAgfVxuXG4gIF9xdWV1ZUNhbGxiYWNrKGNhbGxiYWNrLCBlbGVtZW50LCBpc0FuaW1hdGVkID0gdHJ1ZSkge1xuICAgIGV4ZWN1dGVBZnRlclRyYW5zaXRpb24oY2FsbGJhY2ssIGVsZW1lbnQsIGlzQW5pbWF0ZWQpXG4gIH1cblxuICBfZ2V0Q29uZmlnKGNvbmZpZykge1xuICAgIGNvbmZpZyA9IHRoaXMuX21lcmdlQ29uZmlnT2JqKGNvbmZpZywgdGhpcy5fZWxlbWVudClcbiAgICBjb25maWcgPSB0aGlzLl9jb25maWdBZnRlck1lcmdlKGNvbmZpZylcbiAgICB0aGlzLl90eXBlQ2hlY2tDb25maWcoY29uZmlnKVxuICAgIHJldHVybiBjb25maWdcbiAgfVxuXG4gIC8vIFN0YXRpY1xuICBzdGF0aWMgZ2V0SW5zdGFuY2UoZWxlbWVudCkge1xuICAgIHJldHVybiBEYXRhLmdldChnZXRFbGVtZW50KGVsZW1lbnQpLCB0aGlzLkRBVEFfS0VZKVxuICB9XG5cbiAgc3RhdGljIGdldE9yQ3JlYXRlSW5zdGFuY2UoZWxlbWVudCwgY29uZmlnID0ge30pIHtcbiAgICByZXR1cm4gdGhpcy5nZXRJbnN0YW5jZShlbGVtZW50KSB8fCBuZXcgdGhpcyhlbGVtZW50LCB0eXBlb2YgY29uZmlnID09PSAnb2JqZWN0JyA/IGNvbmZpZyA6IG51bGwpXG4gIH1cblxuICBzdGF0aWMgZ2V0IFZFUlNJT04oKSB7XG4gICAgcmV0dXJuIFZFUlNJT05cbiAgfVxuXG4gIHN0YXRpYyBnZXQgREFUQV9LRVkoKSB7XG4gICAgcmV0dXJuIGBicy4ke3RoaXMuTkFNRX1gXG4gIH1cblxuICBzdGF0aWMgZ2V0IEVWRU5UX0tFWSgpIHtcbiAgICByZXR1cm4gYC4ke3RoaXMuREFUQV9LRVl9YFxuICB9XG5cbiAgc3RhdGljIGV2ZW50TmFtZShuYW1lKSB7XG4gICAgcmV0dXJuIGAke25hbWV9JHt0aGlzLkVWRU5UX0tFWX1gXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQmFzZUNvbXBvbmVudFxuIiwgIi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIEJvb3RzdHJhcCBkb20vc2VsZWN0b3ItZW5naW5lLmpzXG4gKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21haW4vTElDRU5TRSlcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuaW1wb3J0IHsgaXNEaXNhYmxlZCwgaXNWaXNpYmxlLCBwYXJzZVNlbGVjdG9yIH0gZnJvbSAnLi4vdXRpbC9pbmRleC5qcydcblxuY29uc3QgZ2V0U2VsZWN0b3IgPSBlbGVtZW50ID0+IHtcbiAgbGV0IHNlbGVjdG9yID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtYnMtdGFyZ2V0JylcblxuICBpZiAoIXNlbGVjdG9yIHx8IHNlbGVjdG9yID09PSAnIycpIHtcbiAgICBsZXQgaHJlZkF0dHJpYnV0ZSA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdocmVmJylcblxuICAgIC8vIFRoZSBvbmx5IHZhbGlkIGNvbnRlbnQgdGhhdCBjb3VsZCBkb3VibGUgYXMgYSBzZWxlY3RvciBhcmUgSURzIG9yIGNsYXNzZXMsXG4gICAgLy8gc28gZXZlcnl0aGluZyBzdGFydGluZyB3aXRoIGAjYCBvciBgLmAuIElmIGEgXCJyZWFsXCIgVVJMIGlzIHVzZWQgYXMgdGhlIHNlbGVjdG9yLFxuICAgIC8vIGBkb2N1bWVudC5xdWVyeVNlbGVjdG9yYCB3aWxsIHJpZ2h0ZnVsbHkgY29tcGxhaW4gaXQgaXMgaW52YWxpZC5cbiAgICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2lzc3Vlcy8zMjI3M1xuICAgIGlmICghaHJlZkF0dHJpYnV0ZSB8fCAoIWhyZWZBdHRyaWJ1dGUuaW5jbHVkZXMoJyMnKSAmJiAhaHJlZkF0dHJpYnV0ZS5zdGFydHNXaXRoKCcuJykpKSB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cblxuICAgIC8vIEp1c3QgaW4gY2FzZSBzb21lIENNUyBwdXRzIG91dCBhIGZ1bGwgVVJMIHdpdGggdGhlIGFuY2hvciBhcHBlbmRlZFxuICAgIGlmIChocmVmQXR0cmlidXRlLmluY2x1ZGVzKCcjJykgJiYgIWhyZWZBdHRyaWJ1dGUuc3RhcnRzV2l0aCgnIycpKSB7XG4gICAgICBocmVmQXR0cmlidXRlID0gYCMke2hyZWZBdHRyaWJ1dGUuc3BsaXQoJyMnKVsxXX1gXG4gICAgfVxuXG4gICAgc2VsZWN0b3IgPSBocmVmQXR0cmlidXRlICYmIGhyZWZBdHRyaWJ1dGUgIT09ICcjJyA/IHBhcnNlU2VsZWN0b3IoaHJlZkF0dHJpYnV0ZS50cmltKCkpIDogbnVsbFxuICB9XG5cbiAgcmV0dXJuIHNlbGVjdG9yXG59XG5cbmNvbnN0IFNlbGVjdG9yRW5naW5lID0ge1xuICBmaW5kKHNlbGVjdG9yLCBlbGVtZW50ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KSB7XG4gICAgcmV0dXJuIFtdLmNvbmNhdCguLi5FbGVtZW50LnByb3RvdHlwZS5xdWVyeVNlbGVjdG9yQWxsLmNhbGwoZWxlbWVudCwgc2VsZWN0b3IpKVxuICB9LFxuXG4gIGZpbmRPbmUoc2VsZWN0b3IsIGVsZW1lbnQgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpIHtcbiAgICByZXR1cm4gRWxlbWVudC5wcm90b3R5cGUucXVlcnlTZWxlY3Rvci5jYWxsKGVsZW1lbnQsIHNlbGVjdG9yKVxuICB9LFxuXG4gIGNoaWxkcmVuKGVsZW1lbnQsIHNlbGVjdG9yKSB7XG4gICAgcmV0dXJuIFtdLmNvbmNhdCguLi5lbGVtZW50LmNoaWxkcmVuKS5maWx0ZXIoY2hpbGQgPT4gY2hpbGQubWF0Y2hlcyhzZWxlY3RvcikpXG4gIH0sXG5cbiAgcGFyZW50cyhlbGVtZW50LCBzZWxlY3Rvcikge1xuICAgIGNvbnN0IHBhcmVudHMgPSBbXVxuICAgIGxldCBhbmNlc3RvciA9IGVsZW1lbnQucGFyZW50Tm9kZS5jbG9zZXN0KHNlbGVjdG9yKVxuXG4gICAgd2hpbGUgKGFuY2VzdG9yKSB7XG4gICAgICBwYXJlbnRzLnB1c2goYW5jZXN0b3IpXG4gICAgICBhbmNlc3RvciA9IGFuY2VzdG9yLnBhcmVudE5vZGUuY2xvc2VzdChzZWxlY3RvcilcbiAgICB9XG5cbiAgICByZXR1cm4gcGFyZW50c1xuICB9LFxuXG4gIHByZXYoZWxlbWVudCwgc2VsZWN0b3IpIHtcbiAgICBsZXQgcHJldmlvdXMgPSBlbGVtZW50LnByZXZpb3VzRWxlbWVudFNpYmxpbmdcblxuICAgIHdoaWxlIChwcmV2aW91cykge1xuICAgICAgaWYgKHByZXZpb3VzLm1hdGNoZXMoc2VsZWN0b3IpKSB7XG4gICAgICAgIHJldHVybiBbcHJldmlvdXNdXG4gICAgICB9XG5cbiAgICAgIHByZXZpb3VzID0gcHJldmlvdXMucHJldmlvdXNFbGVtZW50U2libGluZ1xuICAgIH1cblxuICAgIHJldHVybiBbXVxuICB9LFxuICAvLyBUT0RPOiB0aGlzIGlzIG5vdyB1bnVzZWQ7IHJlbW92ZSBsYXRlciBhbG9uZyB3aXRoIHByZXYoKVxuICBuZXh0KGVsZW1lbnQsIHNlbGVjdG9yKSB7XG4gICAgbGV0IG5leHQgPSBlbGVtZW50Lm5leHRFbGVtZW50U2libGluZ1xuXG4gICAgd2hpbGUgKG5leHQpIHtcbiAgICAgIGlmIChuZXh0Lm1hdGNoZXMoc2VsZWN0b3IpKSB7XG4gICAgICAgIHJldHVybiBbbmV4dF1cbiAgICAgIH1cblxuICAgICAgbmV4dCA9IG5leHQubmV4dEVsZW1lbnRTaWJsaW5nXG4gICAgfVxuXG4gICAgcmV0dXJuIFtdXG4gIH0sXG5cbiAgZm9jdXNhYmxlQ2hpbGRyZW4oZWxlbWVudCkge1xuICAgIGNvbnN0IGZvY3VzYWJsZXMgPSBbXG4gICAgICAnYScsXG4gICAgICAnYnV0dG9uJyxcbiAgICAgICdpbnB1dCcsXG4gICAgICAndGV4dGFyZWEnLFxuICAgICAgJ3NlbGVjdCcsXG4gICAgICAnZGV0YWlscycsXG4gICAgICAnW3RhYmluZGV4XScsXG4gICAgICAnW2NvbnRlbnRlZGl0YWJsZT1cInRydWVcIl0nXG4gICAgXS5tYXAoc2VsZWN0b3IgPT4gYCR7c2VsZWN0b3J9Om5vdChbdGFiaW5kZXhePVwiLVwiXSlgKS5qb2luKCcsJylcblxuICAgIHJldHVybiB0aGlzLmZpbmQoZm9jdXNhYmxlcywgZWxlbWVudCkuZmlsdGVyKGVsID0+ICFpc0Rpc2FibGVkKGVsKSAmJiBpc1Zpc2libGUoZWwpKVxuICB9LFxuXG4gIGdldFNlbGVjdG9yRnJvbUVsZW1lbnQoZWxlbWVudCkge1xuICAgIGNvbnN0IHNlbGVjdG9yID0gZ2V0U2VsZWN0b3IoZWxlbWVudClcblxuICAgIGlmIChzZWxlY3Rvcikge1xuICAgICAgcmV0dXJuIFNlbGVjdG9yRW5naW5lLmZpbmRPbmUoc2VsZWN0b3IpID8gc2VsZWN0b3IgOiBudWxsXG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGxcbiAgfSxcblxuICBnZXRFbGVtZW50RnJvbVNlbGVjdG9yKGVsZW1lbnQpIHtcbiAgICBjb25zdCBzZWxlY3RvciA9IGdldFNlbGVjdG9yKGVsZW1lbnQpXG5cbiAgICByZXR1cm4gc2VsZWN0b3IgPyBTZWxlY3RvckVuZ2luZS5maW5kT25lKHNlbGVjdG9yKSA6IG51bGxcbiAgfSxcblxuICBnZXRNdWx0aXBsZUVsZW1lbnRzRnJvbVNlbGVjdG9yKGVsZW1lbnQpIHtcbiAgICBjb25zdCBzZWxlY3RvciA9IGdldFNlbGVjdG9yKGVsZW1lbnQpXG5cbiAgICByZXR1cm4gc2VsZWN0b3IgPyBTZWxlY3RvckVuZ2luZS5maW5kKHNlbGVjdG9yKSA6IFtdXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2VsZWN0b3JFbmdpbmVcbiIsICIvKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBCb290c3RyYXAgdGFiLmpzXG4gKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21haW4vTElDRU5TRSlcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuaW1wb3J0IEJhc2VDb21wb25lbnQgZnJvbSAnLi9iYXNlLWNvbXBvbmVudC5qcydcbmltcG9ydCBFdmVudEhhbmRsZXIgZnJvbSAnLi9kb20vZXZlbnQtaGFuZGxlci5qcydcbmltcG9ydCBTZWxlY3RvckVuZ2luZSBmcm9tICcuL2RvbS9zZWxlY3Rvci1lbmdpbmUuanMnXG5pbXBvcnQgeyBkZWZpbmVKUXVlcnlQbHVnaW4sIGdldE5leHRBY3RpdmVFbGVtZW50LCBpc0Rpc2FibGVkIH0gZnJvbSAnLi91dGlsL2luZGV4LmpzJ1xuXG4vKipcbiAqIENvbnN0YW50c1xuICovXG5cbmNvbnN0IE5BTUUgPSAndGFiJ1xuY29uc3QgREFUQV9LRVkgPSAnYnMudGFiJ1xuY29uc3QgRVZFTlRfS0VZID0gYC4ke0RBVEFfS0VZfWBcblxuY29uc3QgRVZFTlRfSElERSA9IGBoaWRlJHtFVkVOVF9LRVl9YFxuY29uc3QgRVZFTlRfSElEREVOID0gYGhpZGRlbiR7RVZFTlRfS0VZfWBcbmNvbnN0IEVWRU5UX1NIT1cgPSBgc2hvdyR7RVZFTlRfS0VZfWBcbmNvbnN0IEVWRU5UX1NIT1dOID0gYHNob3duJHtFVkVOVF9LRVl9YFxuY29uc3QgRVZFTlRfQ0xJQ0tfREFUQV9BUEkgPSBgY2xpY2ske0VWRU5UX0tFWX1gXG5jb25zdCBFVkVOVF9LRVlET1dOID0gYGtleWRvd24ke0VWRU5UX0tFWX1gXG5jb25zdCBFVkVOVF9MT0FEX0RBVEFfQVBJID0gYGxvYWQke0VWRU5UX0tFWX1gXG5cbmNvbnN0IEFSUk9XX0xFRlRfS0VZID0gJ0Fycm93TGVmdCdcbmNvbnN0IEFSUk9XX1JJR0hUX0tFWSA9ICdBcnJvd1JpZ2h0J1xuY29uc3QgQVJST1dfVVBfS0VZID0gJ0Fycm93VXAnXG5jb25zdCBBUlJPV19ET1dOX0tFWSA9ICdBcnJvd0Rvd24nXG5jb25zdCBIT01FX0tFWSA9ICdIb21lJ1xuY29uc3QgRU5EX0tFWSA9ICdFbmQnXG5cbmNvbnN0IENMQVNTX05BTUVfQUNUSVZFID0gJ2FjdGl2ZSdcbmNvbnN0IENMQVNTX05BTUVfRkFERSA9ICdmYWRlJ1xuY29uc3QgQ0xBU1NfTkFNRV9TSE9XID0gJ3Nob3cnXG5jb25zdCBDTEFTU19EUk9QRE9XTiA9ICdkcm9wZG93bidcblxuY29uc3QgU0VMRUNUT1JfRFJPUERPV05fVE9HR0xFID0gJy5kcm9wZG93bi10b2dnbGUnXG5jb25zdCBTRUxFQ1RPUl9EUk9QRE9XTl9NRU5VID0gJy5kcm9wZG93bi1tZW51J1xuY29uc3QgTk9UX1NFTEVDVE9SX0RST1BET1dOX1RPR0dMRSA9IGA6bm90KCR7U0VMRUNUT1JfRFJPUERPV05fVE9HR0xFfSlgXG5cbmNvbnN0IFNFTEVDVE9SX1RBQl9QQU5FTCA9ICcubGlzdC1ncm91cCwgLm5hdiwgW3JvbGU9XCJ0YWJsaXN0XCJdJ1xuY29uc3QgU0VMRUNUT1JfT1VURVIgPSAnLm5hdi1pdGVtLCAubGlzdC1ncm91cC1pdGVtJ1xuY29uc3QgU0VMRUNUT1JfSU5ORVIgPSBgLm5hdi1saW5rJHtOT1RfU0VMRUNUT1JfRFJPUERPV05fVE9HR0xFfSwgLmxpc3QtZ3JvdXAtaXRlbSR7Tk9UX1NFTEVDVE9SX0RST1BET1dOX1RPR0dMRX0sIFtyb2xlPVwidGFiXCJdJHtOT1RfU0VMRUNUT1JfRFJPUERPV05fVE9HR0xFfWBcbmNvbnN0IFNFTEVDVE9SX0RBVEFfVE9HR0xFID0gJ1tkYXRhLWJzLXRvZ2dsZT1cInRhYlwiXSwgW2RhdGEtYnMtdG9nZ2xlPVwicGlsbFwiXSwgW2RhdGEtYnMtdG9nZ2xlPVwibGlzdFwiXScgLy8gVE9ETzogY291bGQgb25seSBiZSBgdGFiYCBpbiB2NlxuY29uc3QgU0VMRUNUT1JfSU5ORVJfRUxFTSA9IGAke1NFTEVDVE9SX0lOTkVSfSwgJHtTRUxFQ1RPUl9EQVRBX1RPR0dMRX1gXG5cbmNvbnN0IFNFTEVDVE9SX0RBVEFfVE9HR0xFX0FDVElWRSA9IGAuJHtDTEFTU19OQU1FX0FDVElWRX1bZGF0YS1icy10b2dnbGU9XCJ0YWJcIl0sIC4ke0NMQVNTX05BTUVfQUNUSVZFfVtkYXRhLWJzLXRvZ2dsZT1cInBpbGxcIl0sIC4ke0NMQVNTX05BTUVfQUNUSVZFfVtkYXRhLWJzLXRvZ2dsZT1cImxpc3RcIl1gXG5cbi8qKlxuICogQ2xhc3MgZGVmaW5pdGlvblxuICovXG5cbmNsYXNzIFRhYiBleHRlbmRzIEJhc2VDb21wb25lbnQge1xuICBjb25zdHJ1Y3RvcihlbGVtZW50KSB7XG4gICAgc3VwZXIoZWxlbWVudClcbiAgICB0aGlzLl9wYXJlbnQgPSB0aGlzLl9lbGVtZW50LmNsb3Nlc3QoU0VMRUNUT1JfVEFCX1BBTkVMKVxuXG4gICAgaWYgKCF0aGlzLl9wYXJlbnQpIHtcbiAgICAgIHJldHVyblxuICAgICAgLy8gVE9ETzogc2hvdWxkIHRocm93IGV4Y2VwdGlvbiBpbiB2NlxuICAgICAgLy8gdGhyb3cgbmV3IFR5cGVFcnJvcihgJHtlbGVtZW50Lm91dGVySFRNTH0gaGFzIG5vdCBhIHZhbGlkIHBhcmVudCAke1NFTEVDVE9SX0lOTkVSX0VMRU19YClcbiAgICB9XG5cbiAgICAvLyBTZXQgdXAgaW5pdGlhbCBhcmlhIGF0dHJpYnV0ZXNcbiAgICB0aGlzLl9zZXRJbml0aWFsQXR0cmlidXRlcyh0aGlzLl9wYXJlbnQsIHRoaXMuX2dldENoaWxkcmVuKCkpXG5cbiAgICBFdmVudEhhbmRsZXIub24odGhpcy5fZWxlbWVudCwgRVZFTlRfS0VZRE9XTiwgZXZlbnQgPT4gdGhpcy5fa2V5ZG93bihldmVudCkpXG4gIH1cblxuICAvLyBHZXR0ZXJzXG4gIHN0YXRpYyBnZXQgTkFNRSgpIHtcbiAgICByZXR1cm4gTkFNRVxuICB9XG5cbiAgLy8gUHVibGljXG4gIHNob3coKSB7IC8vIFNob3dzIHRoaXMgZWxlbSBhbmQgZGVhY3RpdmF0ZSB0aGUgYWN0aXZlIHNpYmxpbmcgaWYgZXhpc3RzXG4gICAgY29uc3QgaW5uZXJFbGVtID0gdGhpcy5fZWxlbWVudFxuICAgIGlmICh0aGlzLl9lbGVtSXNBY3RpdmUoaW5uZXJFbGVtKSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgLy8gU2VhcmNoIGZvciBhY3RpdmUgdGFiIG9uIHNhbWUgcGFyZW50IHRvIGRlYWN0aXZhdGUgaXRcbiAgICBjb25zdCBhY3RpdmUgPSB0aGlzLl9nZXRBY3RpdmVFbGVtKClcblxuICAgIGNvbnN0IGhpZGVFdmVudCA9IGFjdGl2ZSA/XG4gICAgICBFdmVudEhhbmRsZXIudHJpZ2dlcihhY3RpdmUsIEVWRU5UX0hJREUsIHsgcmVsYXRlZFRhcmdldDogaW5uZXJFbGVtIH0pIDpcbiAgICAgIG51bGxcblxuICAgIGNvbnN0IHNob3dFdmVudCA9IEV2ZW50SGFuZGxlci50cmlnZ2VyKGlubmVyRWxlbSwgRVZFTlRfU0hPVywgeyByZWxhdGVkVGFyZ2V0OiBhY3RpdmUgfSlcblxuICAgIGlmIChzaG93RXZlbnQuZGVmYXVsdFByZXZlbnRlZCB8fCAoaGlkZUV2ZW50ICYmIGhpZGVFdmVudC5kZWZhdWx0UHJldmVudGVkKSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgdGhpcy5fZGVhY3RpdmF0ZShhY3RpdmUsIGlubmVyRWxlbSlcbiAgICB0aGlzLl9hY3RpdmF0ZShpbm5lckVsZW0sIGFjdGl2ZSlcbiAgfVxuXG4gIC8vIFByaXZhdGVcbiAgX2FjdGl2YXRlKGVsZW1lbnQsIHJlbGF0ZWRFbGVtKSB7XG4gICAgaWYgKCFlbGVtZW50KSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoQ0xBU1NfTkFNRV9BQ1RJVkUpXG5cbiAgICB0aGlzLl9hY3RpdmF0ZShTZWxlY3RvckVuZ2luZS5nZXRFbGVtZW50RnJvbVNlbGVjdG9yKGVsZW1lbnQpKSAvLyBTZWFyY2ggYW5kIGFjdGl2YXRlL3Nob3cgdGhlIHByb3BlciBzZWN0aW9uXG5cbiAgICBjb25zdCBjb21wbGV0ZSA9ICgpID0+IHtcbiAgICAgIGlmIChlbGVtZW50LmdldEF0dHJpYnV0ZSgncm9sZScpICE9PSAndGFiJykge1xuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoQ0xBU1NfTkFNRV9TSE9XKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ3RhYmluZGV4JylcbiAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJywgdHJ1ZSlcbiAgICAgIHRoaXMuX3RvZ2dsZURyb3BEb3duKGVsZW1lbnQsIHRydWUpXG4gICAgICBFdmVudEhhbmRsZXIudHJpZ2dlcihlbGVtZW50LCBFVkVOVF9TSE9XTiwge1xuICAgICAgICByZWxhdGVkVGFyZ2V0OiByZWxhdGVkRWxlbVxuICAgICAgfSlcbiAgICB9XG5cbiAgICB0aGlzLl9xdWV1ZUNhbGxiYWNrKGNvbXBsZXRlLCBlbGVtZW50LCBlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhDTEFTU19OQU1FX0ZBREUpKVxuICB9XG5cbiAgX2RlYWN0aXZhdGUoZWxlbWVudCwgcmVsYXRlZEVsZW0pIHtcbiAgICBpZiAoIWVsZW1lbnQpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShDTEFTU19OQU1FX0FDVElWRSlcbiAgICBlbGVtZW50LmJsdXIoKVxuXG4gICAgdGhpcy5fZGVhY3RpdmF0ZShTZWxlY3RvckVuZ2luZS5nZXRFbGVtZW50RnJvbVNlbGVjdG9yKGVsZW1lbnQpKSAvLyBTZWFyY2ggYW5kIGRlYWN0aXZhdGUgdGhlIHNob3duIHNlY3Rpb24gdG9vXG5cbiAgICBjb25zdCBjb21wbGV0ZSA9ICgpID0+IHtcbiAgICAgIGlmIChlbGVtZW50LmdldEF0dHJpYnV0ZSgncm9sZScpICE9PSAndGFiJykge1xuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoQ0xBU1NfTkFNRV9TSE9XKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnLCBmYWxzZSlcbiAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsICctMScpXG4gICAgICB0aGlzLl90b2dnbGVEcm9wRG93bihlbGVtZW50LCBmYWxzZSlcbiAgICAgIEV2ZW50SGFuZGxlci50cmlnZ2VyKGVsZW1lbnQsIEVWRU5UX0hJRERFTiwgeyByZWxhdGVkVGFyZ2V0OiByZWxhdGVkRWxlbSB9KVxuICAgIH1cblxuICAgIHRoaXMuX3F1ZXVlQ2FsbGJhY2soY29tcGxldGUsIGVsZW1lbnQsIGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKENMQVNTX05BTUVfRkFERSkpXG4gIH1cblxuICBfa2V5ZG93bihldmVudCkge1xuICAgIGlmICghKFtBUlJPV19MRUZUX0tFWSwgQVJST1dfUklHSFRfS0VZLCBBUlJPV19VUF9LRVksIEFSUk9XX0RPV05fS0VZLCBIT01FX0tFWSwgRU5EX0tFWV0uaW5jbHVkZXMoZXZlbnQua2V5KSkpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpLy8gc3RvcFByb3BhZ2F0aW9uL3ByZXZlbnREZWZhdWx0IGJvdGggYWRkZWQgdG8gc3VwcG9ydCB1cC9kb3duIGtleXMgd2l0aG91dCBzY3JvbGxpbmcgdGhlIHBhZ2VcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICBjb25zdCBjaGlsZHJlbiA9IHRoaXMuX2dldENoaWxkcmVuKCkuZmlsdGVyKGVsZW1lbnQgPT4gIWlzRGlzYWJsZWQoZWxlbWVudCkpXG4gICAgbGV0IG5leHRBY3RpdmVFbGVtZW50XG5cbiAgICBpZiAoW0hPTUVfS0VZLCBFTkRfS0VZXS5pbmNsdWRlcyhldmVudC5rZXkpKSB7XG4gICAgICBuZXh0QWN0aXZlRWxlbWVudCA9IGNoaWxkcmVuW2V2ZW50LmtleSA9PT0gSE9NRV9LRVkgPyAwIDogY2hpbGRyZW4ubGVuZ3RoIC0gMV1cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgaXNOZXh0ID0gW0FSUk9XX1JJR0hUX0tFWSwgQVJST1dfRE9XTl9LRVldLmluY2x1ZGVzKGV2ZW50LmtleSlcbiAgICAgIG5leHRBY3RpdmVFbGVtZW50ID0gZ2V0TmV4dEFjdGl2ZUVsZW1lbnQoY2hpbGRyZW4sIGV2ZW50LnRhcmdldCwgaXNOZXh0LCB0cnVlKVxuICAgIH1cblxuICAgIGlmIChuZXh0QWN0aXZlRWxlbWVudCkge1xuICAgICAgbmV4dEFjdGl2ZUVsZW1lbnQuZm9jdXMoeyBwcmV2ZW50U2Nyb2xsOiB0cnVlIH0pXG4gICAgICBUYWIuZ2V0T3JDcmVhdGVJbnN0YW5jZShuZXh0QWN0aXZlRWxlbWVudCkuc2hvdygpXG4gICAgfVxuICB9XG5cbiAgX2dldENoaWxkcmVuKCkgeyAvLyBjb2xsZWN0aW9uIG9mIGlubmVyIGVsZW1lbnRzXG4gICAgcmV0dXJuIFNlbGVjdG9yRW5naW5lLmZpbmQoU0VMRUNUT1JfSU5ORVJfRUxFTSwgdGhpcy5fcGFyZW50KVxuICB9XG5cbiAgX2dldEFjdGl2ZUVsZW0oKSB7XG4gICAgcmV0dXJuIHRoaXMuX2dldENoaWxkcmVuKCkuZmluZChjaGlsZCA9PiB0aGlzLl9lbGVtSXNBY3RpdmUoY2hpbGQpKSB8fCBudWxsXG4gIH1cblxuICBfc2V0SW5pdGlhbEF0dHJpYnV0ZXMocGFyZW50LCBjaGlsZHJlbikge1xuICAgIHRoaXMuX3NldEF0dHJpYnV0ZUlmTm90RXhpc3RzKHBhcmVudCwgJ3JvbGUnLCAndGFibGlzdCcpXG5cbiAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIGNoaWxkcmVuKSB7XG4gICAgICB0aGlzLl9zZXRJbml0aWFsQXR0cmlidXRlc09uQ2hpbGQoY2hpbGQpXG4gICAgfVxuICB9XG5cbiAgX3NldEluaXRpYWxBdHRyaWJ1dGVzT25DaGlsZChjaGlsZCkge1xuICAgIGNoaWxkID0gdGhpcy5fZ2V0SW5uZXJFbGVtZW50KGNoaWxkKVxuICAgIGNvbnN0IGlzQWN0aXZlID0gdGhpcy5fZWxlbUlzQWN0aXZlKGNoaWxkKVxuICAgIGNvbnN0IG91dGVyRWxlbSA9IHRoaXMuX2dldE91dGVyRWxlbWVudChjaGlsZClcbiAgICBjaGlsZC5zZXRBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnLCBpc0FjdGl2ZSlcblxuICAgIGlmIChvdXRlckVsZW0gIT09IGNoaWxkKSB7XG4gICAgICB0aGlzLl9zZXRBdHRyaWJ1dGVJZk5vdEV4aXN0cyhvdXRlckVsZW0sICdyb2xlJywgJ3ByZXNlbnRhdGlvbicpXG4gICAgfVxuXG4gICAgaWYgKCFpc0FjdGl2ZSkge1xuICAgICAgY2hpbGQuc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsICctMScpXG4gICAgfVxuXG4gICAgdGhpcy5fc2V0QXR0cmlidXRlSWZOb3RFeGlzdHMoY2hpbGQsICdyb2xlJywgJ3RhYicpXG5cbiAgICAvLyBzZXQgYXR0cmlidXRlcyB0byB0aGUgcmVsYXRlZCBwYW5lbCB0b29cbiAgICB0aGlzLl9zZXRJbml0aWFsQXR0cmlidXRlc09uVGFyZ2V0UGFuZWwoY2hpbGQpXG4gIH1cblxuICBfc2V0SW5pdGlhbEF0dHJpYnV0ZXNPblRhcmdldFBhbmVsKGNoaWxkKSB7XG4gICAgY29uc3QgdGFyZ2V0ID0gU2VsZWN0b3JFbmdpbmUuZ2V0RWxlbWVudEZyb21TZWxlY3RvcihjaGlsZClcblxuICAgIGlmICghdGFyZ2V0KSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICB0aGlzLl9zZXRBdHRyaWJ1dGVJZk5vdEV4aXN0cyh0YXJnZXQsICdyb2xlJywgJ3RhYnBhbmVsJylcblxuICAgIGlmIChjaGlsZC5pZCkge1xuICAgICAgdGhpcy5fc2V0QXR0cmlidXRlSWZOb3RFeGlzdHModGFyZ2V0LCAnYXJpYS1sYWJlbGxlZGJ5JywgYCR7Y2hpbGQuaWR9YClcbiAgICB9XG4gIH1cblxuICBfdG9nZ2xlRHJvcERvd24oZWxlbWVudCwgb3Blbikge1xuICAgIGNvbnN0IG91dGVyRWxlbSA9IHRoaXMuX2dldE91dGVyRWxlbWVudChlbGVtZW50KVxuICAgIGlmICghb3V0ZXJFbGVtLmNsYXNzTGlzdC5jb250YWlucyhDTEFTU19EUk9QRE9XTikpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGNvbnN0IHRvZ2dsZSA9IChzZWxlY3RvciwgY2xhc3NOYW1lKSA9PiB7XG4gICAgICBjb25zdCBlbGVtZW50ID0gU2VsZWN0b3JFbmdpbmUuZmluZE9uZShzZWxlY3Rvciwgb3V0ZXJFbGVtKVxuICAgICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKGNsYXNzTmFtZSwgb3BlbilcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0b2dnbGUoU0VMRUNUT1JfRFJPUERPV05fVE9HR0xFLCBDTEFTU19OQU1FX0FDVElWRSlcbiAgICB0b2dnbGUoU0VMRUNUT1JfRFJPUERPV05fTUVOVSwgQ0xBU1NfTkFNRV9TSE9XKVxuICAgIG91dGVyRWxlbS5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCBvcGVuKVxuICB9XG5cbiAgX3NldEF0dHJpYnV0ZUlmTm90RXhpc3RzKGVsZW1lbnQsIGF0dHJpYnV0ZSwgdmFsdWUpIHtcbiAgICBpZiAoIWVsZW1lbnQuaGFzQXR0cmlidXRlKGF0dHJpYnV0ZSkpIHtcbiAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKGF0dHJpYnV0ZSwgdmFsdWUpXG4gICAgfVxuICB9XG5cbiAgX2VsZW1Jc0FjdGl2ZShlbGVtKSB7XG4gICAgcmV0dXJuIGVsZW0uY2xhc3NMaXN0LmNvbnRhaW5zKENMQVNTX05BTUVfQUNUSVZFKVxuICB9XG5cbiAgLy8gVHJ5IHRvIGdldCB0aGUgaW5uZXIgZWxlbWVudCAodXN1YWxseSB0aGUgLm5hdi1saW5rKVxuICBfZ2V0SW5uZXJFbGVtZW50KGVsZW0pIHtcbiAgICByZXR1cm4gZWxlbS5tYXRjaGVzKFNFTEVDVE9SX0lOTkVSX0VMRU0pID8gZWxlbSA6IFNlbGVjdG9yRW5naW5lLmZpbmRPbmUoU0VMRUNUT1JfSU5ORVJfRUxFTSwgZWxlbSlcbiAgfVxuXG4gIC8vIFRyeSB0byBnZXQgdGhlIG91dGVyIGVsZW1lbnQgKHVzdWFsbHkgdGhlIC5uYXYtaXRlbSlcbiAgX2dldE91dGVyRWxlbWVudChlbGVtKSB7XG4gICAgcmV0dXJuIGVsZW0uY2xvc2VzdChTRUxFQ1RPUl9PVVRFUikgfHwgZWxlbVxuICB9XG5cbiAgLy8gU3RhdGljXG4gIHN0YXRpYyBqUXVlcnlJbnRlcmZhY2UoY29uZmlnKSB7XG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCBkYXRhID0gVGFiLmdldE9yQ3JlYXRlSW5zdGFuY2UodGhpcylcblxuICAgICAgaWYgKHR5cGVvZiBjb25maWcgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBpZiAoZGF0YVtjb25maWddID09PSB1bmRlZmluZWQgfHwgY29uZmlnLnN0YXJ0c1dpdGgoJ18nKSB8fCBjb25maWcgPT09ICdjb25zdHJ1Y3RvcicpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgTm8gbWV0aG9kIG5hbWVkIFwiJHtjb25maWd9XCJgKVxuICAgICAgfVxuXG4gICAgICBkYXRhW2NvbmZpZ10oKVxuICAgIH0pXG4gIH1cbn1cblxuLyoqXG4gKiBEYXRhIEFQSSBpbXBsZW1lbnRhdGlvblxuICovXG5cbkV2ZW50SGFuZGxlci5vbihkb2N1bWVudCwgRVZFTlRfQ0xJQ0tfREFUQV9BUEksIFNFTEVDVE9SX0RBVEFfVE9HR0xFLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgaWYgKFsnQScsICdBUkVBJ10uaW5jbHVkZXModGhpcy50YWdOYW1lKSkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgfVxuXG4gIGlmIChpc0Rpc2FibGVkKHRoaXMpKSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICBUYWIuZ2V0T3JDcmVhdGVJbnN0YW5jZSh0aGlzKS5zaG93KClcbn0pXG5cbi8qKlxuICogSW5pdGlhbGl6ZSBvbiBmb2N1c1xuICovXG5FdmVudEhhbmRsZXIub24od2luZG93LCBFVkVOVF9MT0FEX0RBVEFfQVBJLCAoKSA9PiB7XG4gIGZvciAoY29uc3QgZWxlbWVudCBvZiBTZWxlY3RvckVuZ2luZS5maW5kKFNFTEVDVE9SX0RBVEFfVE9HR0xFX0FDVElWRSkpIHtcbiAgICBUYWIuZ2V0T3JDcmVhdGVJbnN0YW5jZShlbGVtZW50KVxuICB9XG59KVxuLyoqXG4gKiBqUXVlcnlcbiAqL1xuXG5kZWZpbmVKUXVlcnlQbHVnaW4oVGFiKVxuXG5leHBvcnQgZGVmYXVsdCBUYWJcbiIsICIvKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBCb290c3RyYXAgY29sbGFwc2UuanNcbiAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFpbi9MSUNFTlNFKVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG5pbXBvcnQgQmFzZUNvbXBvbmVudCBmcm9tICcuL2Jhc2UtY29tcG9uZW50LmpzJ1xuaW1wb3J0IEV2ZW50SGFuZGxlciBmcm9tICcuL2RvbS9ldmVudC1oYW5kbGVyLmpzJ1xuaW1wb3J0IFNlbGVjdG9yRW5naW5lIGZyb20gJy4vZG9tL3NlbGVjdG9yLWVuZ2luZS5qcydcbmltcG9ydCB7XG4gIGRlZmluZUpRdWVyeVBsdWdpbixcbiAgZ2V0RWxlbWVudCxcbiAgcmVmbG93XG59IGZyb20gJy4vdXRpbC9pbmRleC5qcydcblxuLyoqXG4gKiBDb25zdGFudHNcbiAqL1xuXG5jb25zdCBOQU1FID0gJ2NvbGxhcHNlJ1xuY29uc3QgREFUQV9LRVkgPSAnYnMuY29sbGFwc2UnXG5jb25zdCBFVkVOVF9LRVkgPSBgLiR7REFUQV9LRVl9YFxuY29uc3QgREFUQV9BUElfS0VZID0gJy5kYXRhLWFwaSdcblxuY29uc3QgRVZFTlRfU0hPVyA9IGBzaG93JHtFVkVOVF9LRVl9YFxuY29uc3QgRVZFTlRfU0hPV04gPSBgc2hvd24ke0VWRU5UX0tFWX1gXG5jb25zdCBFVkVOVF9ISURFID0gYGhpZGUke0VWRU5UX0tFWX1gXG5jb25zdCBFVkVOVF9ISURERU4gPSBgaGlkZGVuJHtFVkVOVF9LRVl9YFxuY29uc3QgRVZFTlRfQ0xJQ0tfREFUQV9BUEkgPSBgY2xpY2ske0VWRU5UX0tFWX0ke0RBVEFfQVBJX0tFWX1gXG5cbmNvbnN0IENMQVNTX05BTUVfU0hPVyA9ICdzaG93J1xuY29uc3QgQ0xBU1NfTkFNRV9DT0xMQVBTRSA9ICdjb2xsYXBzZSdcbmNvbnN0IENMQVNTX05BTUVfQ09MTEFQU0lORyA9ICdjb2xsYXBzaW5nJ1xuY29uc3QgQ0xBU1NfTkFNRV9DT0xMQVBTRUQgPSAnY29sbGFwc2VkJ1xuY29uc3QgQ0xBU1NfTkFNRV9ERUVQRVJfQ0hJTERSRU4gPSBgOnNjb3BlIC4ke0NMQVNTX05BTUVfQ09MTEFQU0V9IC4ke0NMQVNTX05BTUVfQ09MTEFQU0V9YFxuY29uc3QgQ0xBU1NfTkFNRV9IT1JJWk9OVEFMID0gJ2NvbGxhcHNlLWhvcml6b250YWwnXG5cbmNvbnN0IFdJRFRIID0gJ3dpZHRoJ1xuY29uc3QgSEVJR0hUID0gJ2hlaWdodCdcblxuY29uc3QgU0VMRUNUT1JfQUNUSVZFUyA9ICcuY29sbGFwc2Uuc2hvdywgLmNvbGxhcHNlLmNvbGxhcHNpbmcnXG5jb25zdCBTRUxFQ1RPUl9EQVRBX1RPR0dMRSA9ICdbZGF0YS1icy10b2dnbGU9XCJjb2xsYXBzZVwiXSdcblxuY29uc3QgRGVmYXVsdCA9IHtcbiAgcGFyZW50OiBudWxsLFxuICB0b2dnbGU6IHRydWVcbn1cblxuY29uc3QgRGVmYXVsdFR5cGUgPSB7XG4gIHBhcmVudDogJyhudWxsfGVsZW1lbnQpJyxcbiAgdG9nZ2xlOiAnYm9vbGVhbidcbn1cblxuLyoqXG4gKiBDbGFzcyBkZWZpbml0aW9uXG4gKi9cblxuY2xhc3MgQ29sbGFwc2UgZXh0ZW5kcyBCYXNlQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IoZWxlbWVudCwgY29uZmlnKSB7XG4gICAgc3VwZXIoZWxlbWVudCwgY29uZmlnKVxuXG4gICAgdGhpcy5faXNUcmFuc2l0aW9uaW5nID0gZmFsc2VcbiAgICB0aGlzLl90cmlnZ2VyQXJyYXkgPSBbXVxuXG4gICAgY29uc3QgdG9nZ2xlTGlzdCA9IFNlbGVjdG9yRW5naW5lLmZpbmQoU0VMRUNUT1JfREFUQV9UT0dHTEUpXG5cbiAgICBmb3IgKGNvbnN0IGVsZW0gb2YgdG9nZ2xlTGlzdCkge1xuICAgICAgY29uc3Qgc2VsZWN0b3IgPSBTZWxlY3RvckVuZ2luZS5nZXRTZWxlY3RvckZyb21FbGVtZW50KGVsZW0pXG4gICAgICBjb25zdCBmaWx0ZXJFbGVtZW50ID0gU2VsZWN0b3JFbmdpbmUuZmluZChzZWxlY3RvcilcbiAgICAgICAgLmZpbHRlcihmb3VuZEVsZW1lbnQgPT4gZm91bmRFbGVtZW50ID09PSB0aGlzLl9lbGVtZW50KVxuXG4gICAgICBpZiAoc2VsZWN0b3IgIT09IG51bGwgJiYgZmlsdGVyRWxlbWVudC5sZW5ndGgpIHtcbiAgICAgICAgdGhpcy5fdHJpZ2dlckFycmF5LnB1c2goZWxlbSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLl9pbml0aWFsaXplQ2hpbGRyZW4oKVxuXG4gICAgaWYgKCF0aGlzLl9jb25maWcucGFyZW50KSB7XG4gICAgICB0aGlzLl9hZGRBcmlhQW5kQ29sbGFwc2VkQ2xhc3ModGhpcy5fdHJpZ2dlckFycmF5LCB0aGlzLl9pc1Nob3duKCkpXG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2NvbmZpZy50b2dnbGUpIHtcbiAgICAgIHRoaXMudG9nZ2xlKClcbiAgICB9XG4gIH1cblxuICAvLyBHZXR0ZXJzXG4gIHN0YXRpYyBnZXQgRGVmYXVsdCgpIHtcbiAgICByZXR1cm4gRGVmYXVsdFxuICB9XG5cbiAgc3RhdGljIGdldCBEZWZhdWx0VHlwZSgpIHtcbiAgICByZXR1cm4gRGVmYXVsdFR5cGVcbiAgfVxuXG4gIHN0YXRpYyBnZXQgTkFNRSgpIHtcbiAgICByZXR1cm4gTkFNRVxuICB9XG5cbiAgLy8gUHVibGljXG4gIHRvZ2dsZSgpIHtcbiAgICBpZiAodGhpcy5faXNTaG93bigpKSB7XG4gICAgICB0aGlzLmhpZGUoKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNob3coKVxuICAgIH1cbiAgfVxuXG4gIHNob3coKSB7XG4gICAgaWYgKHRoaXMuX2lzVHJhbnNpdGlvbmluZyB8fCB0aGlzLl9pc1Nob3duKCkpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGxldCBhY3RpdmVDaGlsZHJlbiA9IFtdXG5cbiAgICAvLyBmaW5kIGFjdGl2ZSBjaGlsZHJlblxuICAgIGlmICh0aGlzLl9jb25maWcucGFyZW50KSB7XG4gICAgICBhY3RpdmVDaGlsZHJlbiA9IHRoaXMuX2dldEZpcnN0TGV2ZWxDaGlsZHJlbihTRUxFQ1RPUl9BQ1RJVkVTKVxuICAgICAgICAuZmlsdGVyKGVsZW1lbnQgPT4gZWxlbWVudCAhPT0gdGhpcy5fZWxlbWVudClcbiAgICAgICAgLm1hcChlbGVtZW50ID0+IENvbGxhcHNlLmdldE9yQ3JlYXRlSW5zdGFuY2UoZWxlbWVudCwgeyB0b2dnbGU6IGZhbHNlIH0pKVxuICAgIH1cblxuICAgIGlmIChhY3RpdmVDaGlsZHJlbi5sZW5ndGggJiYgYWN0aXZlQ2hpbGRyZW5bMF0uX2lzVHJhbnNpdGlvbmluZykge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY29uc3Qgc3RhcnRFdmVudCA9IEV2ZW50SGFuZGxlci50cmlnZ2VyKHRoaXMuX2VsZW1lbnQsIEVWRU5UX1NIT1cpXG4gICAgaWYgKHN0YXJ0RXZlbnQuZGVmYXVsdFByZXZlbnRlZCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBhY3RpdmVJbnN0YW5jZSBvZiBhY3RpdmVDaGlsZHJlbikge1xuICAgICAgYWN0aXZlSW5zdGFuY2UuaGlkZSgpXG4gICAgfVxuXG4gICAgY29uc3QgZGltZW5zaW9uID0gdGhpcy5fZ2V0RGltZW5zaW9uKClcblxuICAgIHRoaXMuX2VsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShDTEFTU19OQU1FX0NPTExBUFNFKVxuICAgIHRoaXMuX2VsZW1lbnQuY2xhc3NMaXN0LmFkZChDTEFTU19OQU1FX0NPTExBUFNJTkcpXG5cbiAgICB0aGlzLl9lbGVtZW50LnN0eWxlW2RpbWVuc2lvbl0gPSAwXG5cbiAgICB0aGlzLl9hZGRBcmlhQW5kQ29sbGFwc2VkQ2xhc3ModGhpcy5fdHJpZ2dlckFycmF5LCB0cnVlKVxuICAgIHRoaXMuX2lzVHJhbnNpdGlvbmluZyA9IHRydWVcblxuICAgIGNvbnN0IGNvbXBsZXRlID0gKCkgPT4ge1xuICAgICAgdGhpcy5faXNUcmFuc2l0aW9uaW5nID0gZmFsc2VcblxuICAgICAgdGhpcy5fZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKENMQVNTX05BTUVfQ09MTEFQU0lORylcbiAgICAgIHRoaXMuX2VsZW1lbnQuY2xhc3NMaXN0LmFkZChDTEFTU19OQU1FX0NPTExBUFNFLCBDTEFTU19OQU1FX1NIT1cpXG5cbiAgICAgIHRoaXMuX2VsZW1lbnQuc3R5bGVbZGltZW5zaW9uXSA9ICcnXG5cbiAgICAgIEV2ZW50SGFuZGxlci50cmlnZ2VyKHRoaXMuX2VsZW1lbnQsIEVWRU5UX1NIT1dOKVxuICAgIH1cblxuICAgIGNvbnN0IGNhcGl0YWxpemVkRGltZW5zaW9uID0gZGltZW5zaW9uWzBdLnRvVXBwZXJDYXNlKCkgKyBkaW1lbnNpb24uc2xpY2UoMSlcbiAgICBjb25zdCBzY3JvbGxTaXplID0gYHNjcm9sbCR7Y2FwaXRhbGl6ZWREaW1lbnNpb259YFxuXG4gICAgdGhpcy5fcXVldWVDYWxsYmFjayhjb21wbGV0ZSwgdGhpcy5fZWxlbWVudCwgdHJ1ZSlcbiAgICB0aGlzLl9lbGVtZW50LnN0eWxlW2RpbWVuc2lvbl0gPSBgJHt0aGlzLl9lbGVtZW50W3Njcm9sbFNpemVdfXB4YFxuICB9XG5cbiAgaGlkZSgpIHtcbiAgICBpZiAodGhpcy5faXNUcmFuc2l0aW9uaW5nIHx8ICF0aGlzLl9pc1Nob3duKCkpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGNvbnN0IHN0YXJ0RXZlbnQgPSBFdmVudEhhbmRsZXIudHJpZ2dlcih0aGlzLl9lbGVtZW50LCBFVkVOVF9ISURFKVxuICAgIGlmIChzdGFydEV2ZW50LmRlZmF1bHRQcmV2ZW50ZWQpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGNvbnN0IGRpbWVuc2lvbiA9IHRoaXMuX2dldERpbWVuc2lvbigpXG5cbiAgICB0aGlzLl9lbGVtZW50LnN0eWxlW2RpbWVuc2lvbl0gPSBgJHt0aGlzLl9lbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpW2RpbWVuc2lvbl19cHhgXG5cbiAgICByZWZsb3codGhpcy5fZWxlbWVudClcblxuICAgIHRoaXMuX2VsZW1lbnQuY2xhc3NMaXN0LmFkZChDTEFTU19OQU1FX0NPTExBUFNJTkcpXG4gICAgdGhpcy5fZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKENMQVNTX05BTUVfQ09MTEFQU0UsIENMQVNTX05BTUVfU0hPVylcblxuICAgIGZvciAoY29uc3QgdHJpZ2dlciBvZiB0aGlzLl90cmlnZ2VyQXJyYXkpIHtcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSBTZWxlY3RvckVuZ2luZS5nZXRFbGVtZW50RnJvbVNlbGVjdG9yKHRyaWdnZXIpXG5cbiAgICAgIGlmIChlbGVtZW50ICYmICF0aGlzLl9pc1Nob3duKGVsZW1lbnQpKSB7XG4gICAgICAgIHRoaXMuX2FkZEFyaWFBbmRDb2xsYXBzZWRDbGFzcyhbdHJpZ2dlcl0sIGZhbHNlKVxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuX2lzVHJhbnNpdGlvbmluZyA9IHRydWVcblxuICAgIGNvbnN0IGNvbXBsZXRlID0gKCkgPT4ge1xuICAgICAgdGhpcy5faXNUcmFuc2l0aW9uaW5nID0gZmFsc2VcbiAgICAgIHRoaXMuX2VsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShDTEFTU19OQU1FX0NPTExBUFNJTkcpXG4gICAgICB0aGlzLl9lbGVtZW50LmNsYXNzTGlzdC5hZGQoQ0xBU1NfTkFNRV9DT0xMQVBTRSlcbiAgICAgIEV2ZW50SGFuZGxlci50cmlnZ2VyKHRoaXMuX2VsZW1lbnQsIEVWRU5UX0hJRERFTilcbiAgICB9XG5cbiAgICB0aGlzLl9lbGVtZW50LnN0eWxlW2RpbWVuc2lvbl0gPSAnJ1xuXG4gICAgdGhpcy5fcXVldWVDYWxsYmFjayhjb21wbGV0ZSwgdGhpcy5fZWxlbWVudCwgdHJ1ZSlcbiAgfVxuXG4gIF9pc1Nob3duKGVsZW1lbnQgPSB0aGlzLl9lbGVtZW50KSB7XG4gICAgcmV0dXJuIGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKENMQVNTX05BTUVfU0hPVylcbiAgfVxuXG4gIC8vIFByaXZhdGVcbiAgX2NvbmZpZ0FmdGVyTWVyZ2UoY29uZmlnKSB7XG4gICAgY29uZmlnLnRvZ2dsZSA9IEJvb2xlYW4oY29uZmlnLnRvZ2dsZSkgLy8gQ29lcmNlIHN0cmluZyB2YWx1ZXNcbiAgICBjb25maWcucGFyZW50ID0gZ2V0RWxlbWVudChjb25maWcucGFyZW50KVxuICAgIHJldHVybiBjb25maWdcbiAgfVxuXG4gIF9nZXREaW1lbnNpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuX2VsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKENMQVNTX05BTUVfSE9SSVpPTlRBTCkgPyBXSURUSCA6IEhFSUdIVFxuICB9XG5cbiAgX2luaXRpYWxpemVDaGlsZHJlbigpIHtcbiAgICBpZiAoIXRoaXMuX2NvbmZpZy5wYXJlbnQpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGNvbnN0IGNoaWxkcmVuID0gdGhpcy5fZ2V0Rmlyc3RMZXZlbENoaWxkcmVuKFNFTEVDVE9SX0RBVEFfVE9HR0xFKVxuXG4gICAgZm9yIChjb25zdCBlbGVtZW50IG9mIGNoaWxkcmVuKSB7XG4gICAgICBjb25zdCBzZWxlY3RlZCA9IFNlbGVjdG9yRW5naW5lLmdldEVsZW1lbnRGcm9tU2VsZWN0b3IoZWxlbWVudClcblxuICAgICAgaWYgKHNlbGVjdGVkKSB7XG4gICAgICAgIHRoaXMuX2FkZEFyaWFBbmRDb2xsYXBzZWRDbGFzcyhbZWxlbWVudF0sIHRoaXMuX2lzU2hvd24oc2VsZWN0ZWQpKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIF9nZXRGaXJzdExldmVsQ2hpbGRyZW4oc2VsZWN0b3IpIHtcbiAgICBjb25zdCBjaGlsZHJlbiA9IFNlbGVjdG9yRW5naW5lLmZpbmQoQ0xBU1NfTkFNRV9ERUVQRVJfQ0hJTERSRU4sIHRoaXMuX2NvbmZpZy5wYXJlbnQpXG4gICAgLy8gcmVtb3ZlIGNoaWxkcmVuIGlmIGdyZWF0ZXIgZGVwdGhcbiAgICByZXR1cm4gU2VsZWN0b3JFbmdpbmUuZmluZChzZWxlY3RvciwgdGhpcy5fY29uZmlnLnBhcmVudCkuZmlsdGVyKGVsZW1lbnQgPT4gIWNoaWxkcmVuLmluY2x1ZGVzKGVsZW1lbnQpKVxuICB9XG5cbiAgX2FkZEFyaWFBbmRDb2xsYXBzZWRDbGFzcyh0cmlnZ2VyQXJyYXksIGlzT3Blbikge1xuICAgIGlmICghdHJpZ2dlckFycmF5Lmxlbmd0aCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBlbGVtZW50IG9mIHRyaWdnZXJBcnJheSkge1xuICAgICAgZWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKENMQVNTX05BTUVfQ09MTEFQU0VELCAhaXNPcGVuKVxuICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCBpc09wZW4pXG4gICAgfVxuICB9XG5cbiAgLy8gU3RhdGljXG4gIHN0YXRpYyBqUXVlcnlJbnRlcmZhY2UoY29uZmlnKSB7XG4gICAgY29uc3QgX2NvbmZpZyA9IHt9XG4gICAgaWYgKHR5cGVvZiBjb25maWcgPT09ICdzdHJpbmcnICYmIC9zaG93fGhpZGUvLnRlc3QoY29uZmlnKSkge1xuICAgICAgX2NvbmZpZy50b2dnbGUgPSBmYWxzZVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3QgZGF0YSA9IENvbGxhcHNlLmdldE9yQ3JlYXRlSW5zdGFuY2UodGhpcywgX2NvbmZpZylcblxuICAgICAgaWYgKHR5cGVvZiBjb25maWcgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGlmICh0eXBlb2YgZGF0YVtjb25maWddID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYE5vIG1ldGhvZCBuYW1lZCBcIiR7Y29uZmlnfVwiYClcbiAgICAgICAgfVxuXG4gICAgICAgIGRhdGFbY29uZmlnXSgpXG4gICAgICB9XG4gICAgfSlcbiAgfVxufVxuXG4vKipcbiAqIERhdGEgQVBJIGltcGxlbWVudGF0aW9uXG4gKi9cblxuRXZlbnRIYW5kbGVyLm9uKGRvY3VtZW50LCBFVkVOVF9DTElDS19EQVRBX0FQSSwgU0VMRUNUT1JfREFUQV9UT0dHTEUsIGZ1bmN0aW9uIChldmVudCkge1xuICAvLyBwcmV2ZW50RGVmYXVsdCBvbmx5IGZvciA8YT4gZWxlbWVudHMgKHdoaWNoIGNoYW5nZSB0aGUgVVJMKSBub3QgaW5zaWRlIHRoZSBjb2xsYXBzaWJsZSBlbGVtZW50XG4gIGlmIChldmVudC50YXJnZXQudGFnTmFtZSA9PT0gJ0EnIHx8IChldmVudC5kZWxlZ2F0ZVRhcmdldCAmJiBldmVudC5kZWxlZ2F0ZVRhcmdldC50YWdOYW1lID09PSAnQScpKSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICB9XG5cbiAgZm9yIChjb25zdCBlbGVtZW50IG9mIFNlbGVjdG9yRW5naW5lLmdldE11bHRpcGxlRWxlbWVudHNGcm9tU2VsZWN0b3IodGhpcykpIHtcbiAgICBDb2xsYXBzZS5nZXRPckNyZWF0ZUluc3RhbmNlKGVsZW1lbnQsIHsgdG9nZ2xlOiBmYWxzZSB9KS50b2dnbGUoKVxuICB9XG59KVxuXG4vKipcbiAqIGpRdWVyeVxuICovXG5cbmRlZmluZUpRdWVyeVBsdWdpbihDb2xsYXBzZSlcblxuZXhwb3J0IGRlZmF1bHQgQ29sbGFwc2VcbiIsICIvKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBCb290c3RyYXAgZHJvcGRvd24uanNcbiAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFpbi9MSUNFTlNFKVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG5pbXBvcnQgKiBhcyBQb3BwZXIgZnJvbSAnQHBvcHBlcmpzL2NvcmUnXG5pbXBvcnQgQmFzZUNvbXBvbmVudCBmcm9tICcuL2Jhc2UtY29tcG9uZW50LmpzJ1xuaW1wb3J0IEV2ZW50SGFuZGxlciBmcm9tICcuL2RvbS9ldmVudC1oYW5kbGVyLmpzJ1xuaW1wb3J0IE1hbmlwdWxhdG9yIGZyb20gJy4vZG9tL21hbmlwdWxhdG9yLmpzJ1xuaW1wb3J0IFNlbGVjdG9yRW5naW5lIGZyb20gJy4vZG9tL3NlbGVjdG9yLWVuZ2luZS5qcydcbmltcG9ydCB7XG4gIGRlZmluZUpRdWVyeVBsdWdpbixcbiAgZXhlY3V0ZSxcbiAgZ2V0RWxlbWVudCxcbiAgZ2V0TmV4dEFjdGl2ZUVsZW1lbnQsXG4gIGlzRGlzYWJsZWQsXG4gIGlzRWxlbWVudCxcbiAgaXNSVEwsXG4gIGlzVmlzaWJsZSxcbiAgbm9vcFxufSBmcm9tICcuL3V0aWwvaW5kZXguanMnXG5cbi8qKlxuICogQ29uc3RhbnRzXG4gKi9cblxuY29uc3QgTkFNRSA9ICdkcm9wZG93bidcbmNvbnN0IERBVEFfS0VZID0gJ2JzLmRyb3Bkb3duJ1xuY29uc3QgRVZFTlRfS0VZID0gYC4ke0RBVEFfS0VZfWBcbmNvbnN0IERBVEFfQVBJX0tFWSA9ICcuZGF0YS1hcGknXG5cbmNvbnN0IEVTQ0FQRV9LRVkgPSAnRXNjYXBlJ1xuY29uc3QgVEFCX0tFWSA9ICdUYWInXG5jb25zdCBBUlJPV19VUF9LRVkgPSAnQXJyb3dVcCdcbmNvbnN0IEFSUk9XX0RPV05fS0VZID0gJ0Fycm93RG93bidcbmNvbnN0IFJJR0hUX01PVVNFX0JVVFRPTiA9IDIgLy8gTW91c2VFdmVudC5idXR0b24gdmFsdWUgZm9yIHRoZSBzZWNvbmRhcnkgYnV0dG9uLCB1c3VhbGx5IHRoZSByaWdodCBidXR0b25cblxuY29uc3QgRVZFTlRfSElERSA9IGBoaWRlJHtFVkVOVF9LRVl9YFxuY29uc3QgRVZFTlRfSElEREVOID0gYGhpZGRlbiR7RVZFTlRfS0VZfWBcbmNvbnN0IEVWRU5UX1NIT1cgPSBgc2hvdyR7RVZFTlRfS0VZfWBcbmNvbnN0IEVWRU5UX1NIT1dOID0gYHNob3duJHtFVkVOVF9LRVl9YFxuY29uc3QgRVZFTlRfQ0xJQ0tfREFUQV9BUEkgPSBgY2xpY2ske0VWRU5UX0tFWX0ke0RBVEFfQVBJX0tFWX1gXG5jb25zdCBFVkVOVF9LRVlET1dOX0RBVEFfQVBJID0gYGtleWRvd24ke0VWRU5UX0tFWX0ke0RBVEFfQVBJX0tFWX1gXG5jb25zdCBFVkVOVF9LRVlVUF9EQVRBX0FQSSA9IGBrZXl1cCR7RVZFTlRfS0VZfSR7REFUQV9BUElfS0VZfWBcblxuY29uc3QgQ0xBU1NfTkFNRV9TSE9XID0gJ3Nob3cnXG5jb25zdCBDTEFTU19OQU1FX0RST1BVUCA9ICdkcm9wdXAnXG5jb25zdCBDTEFTU19OQU1FX0RST1BFTkQgPSAnZHJvcGVuZCdcbmNvbnN0IENMQVNTX05BTUVfRFJPUFNUQVJUID0gJ2Ryb3BzdGFydCdcbmNvbnN0IENMQVNTX05BTUVfRFJPUFVQX0NFTlRFUiA9ICdkcm9wdXAtY2VudGVyJ1xuY29uc3QgQ0xBU1NfTkFNRV9EUk9QRE9XTl9DRU5URVIgPSAnZHJvcGRvd24tY2VudGVyJ1xuXG5jb25zdCBTRUxFQ1RPUl9EQVRBX1RPR0dMRSA9ICdbZGF0YS1icy10b2dnbGU9XCJkcm9wZG93blwiXTpub3QoLmRpc2FibGVkKTpub3QoOmRpc2FibGVkKSdcbmNvbnN0IFNFTEVDVE9SX0RBVEFfVE9HR0xFX1NIT1dOID0gYCR7U0VMRUNUT1JfREFUQV9UT0dHTEV9LiR7Q0xBU1NfTkFNRV9TSE9XfWBcbmNvbnN0IFNFTEVDVE9SX01FTlUgPSAnLmRyb3Bkb3duLW1lbnUnXG5jb25zdCBTRUxFQ1RPUl9OQVZCQVIgPSAnLm5hdmJhcidcbmNvbnN0IFNFTEVDVE9SX05BVkJBUl9OQVYgPSAnLm5hdmJhci1uYXYnXG5jb25zdCBTRUxFQ1RPUl9WSVNJQkxFX0lURU1TID0gJy5kcm9wZG93bi1tZW51IC5kcm9wZG93bi1pdGVtOm5vdCguZGlzYWJsZWQpOm5vdCg6ZGlzYWJsZWQpJ1xuXG5jb25zdCBQTEFDRU1FTlRfVE9QID0gaXNSVEwoKSA/ICd0b3AtZW5kJyA6ICd0b3Atc3RhcnQnXG5jb25zdCBQTEFDRU1FTlRfVE9QRU5EID0gaXNSVEwoKSA/ICd0b3Atc3RhcnQnIDogJ3RvcC1lbmQnXG5jb25zdCBQTEFDRU1FTlRfQk9UVE9NID0gaXNSVEwoKSA/ICdib3R0b20tZW5kJyA6ICdib3R0b20tc3RhcnQnXG5jb25zdCBQTEFDRU1FTlRfQk9UVE9NRU5EID0gaXNSVEwoKSA/ICdib3R0b20tc3RhcnQnIDogJ2JvdHRvbS1lbmQnXG5jb25zdCBQTEFDRU1FTlRfUklHSFQgPSBpc1JUTCgpID8gJ2xlZnQtc3RhcnQnIDogJ3JpZ2h0LXN0YXJ0J1xuY29uc3QgUExBQ0VNRU5UX0xFRlQgPSBpc1JUTCgpID8gJ3JpZ2h0LXN0YXJ0JyA6ICdsZWZ0LXN0YXJ0J1xuY29uc3QgUExBQ0VNRU5UX1RPUENFTlRFUiA9ICd0b3AnXG5jb25zdCBQTEFDRU1FTlRfQk9UVE9NQ0VOVEVSID0gJ2JvdHRvbSdcblxuY29uc3QgRGVmYXVsdCA9IHtcbiAgYXV0b0Nsb3NlOiB0cnVlLFxuICBib3VuZGFyeTogJ2NsaXBwaW5nUGFyZW50cycsXG4gIGRpc3BsYXk6ICdkeW5hbWljJyxcbiAgb2Zmc2V0OiBbMCwgMl0sXG4gIHBvcHBlckNvbmZpZzogbnVsbCxcbiAgcmVmZXJlbmNlOiAndG9nZ2xlJ1xufVxuXG5jb25zdCBEZWZhdWx0VHlwZSA9IHtcbiAgYXV0b0Nsb3NlOiAnKGJvb2xlYW58c3RyaW5nKScsXG4gIGJvdW5kYXJ5OiAnKHN0cmluZ3xlbGVtZW50KScsXG4gIGRpc3BsYXk6ICdzdHJpbmcnLFxuICBvZmZzZXQ6ICcoYXJyYXl8c3RyaW5nfGZ1bmN0aW9uKScsXG4gIHBvcHBlckNvbmZpZzogJyhudWxsfG9iamVjdHxmdW5jdGlvbiknLFxuICByZWZlcmVuY2U6ICcoc3RyaW5nfGVsZW1lbnR8b2JqZWN0KSdcbn1cblxuLyoqXG4gKiBDbGFzcyBkZWZpbml0aW9uXG4gKi9cblxuY2xhc3MgRHJvcGRvd24gZXh0ZW5kcyBCYXNlQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IoZWxlbWVudCwgY29uZmlnKSB7XG4gICAgc3VwZXIoZWxlbWVudCwgY29uZmlnKVxuXG4gICAgdGhpcy5fcG9wcGVyID0gbnVsbFxuICAgIHRoaXMuX3BhcmVudCA9IHRoaXMuX2VsZW1lbnQucGFyZW50Tm9kZSAvLyBkcm9wZG93biB3cmFwcGVyXG4gICAgLy8gVE9ETzogdjYgcmV2ZXJ0ICMzNzAxMSAmIGNoYW5nZSBtYXJrdXAgaHR0cHM6Ly9nZXRib290c3RyYXAuY29tL2RvY3MvNS4zL2Zvcm1zL2lucHV0LWdyb3VwL1xuICAgIHRoaXMuX21lbnUgPSBTZWxlY3RvckVuZ2luZS5uZXh0KHRoaXMuX2VsZW1lbnQsIFNFTEVDVE9SX01FTlUpWzBdIHx8XG4gICAgICBTZWxlY3RvckVuZ2luZS5wcmV2KHRoaXMuX2VsZW1lbnQsIFNFTEVDVE9SX01FTlUpWzBdIHx8XG4gICAgICBTZWxlY3RvckVuZ2luZS5maW5kT25lKFNFTEVDVE9SX01FTlUsIHRoaXMuX3BhcmVudClcbiAgICB0aGlzLl9pbk5hdmJhciA9IHRoaXMuX2RldGVjdE5hdmJhcigpXG4gIH1cblxuICAvLyBHZXR0ZXJzXG4gIHN0YXRpYyBnZXQgRGVmYXVsdCgpIHtcbiAgICByZXR1cm4gRGVmYXVsdFxuICB9XG5cbiAgc3RhdGljIGdldCBEZWZhdWx0VHlwZSgpIHtcbiAgICByZXR1cm4gRGVmYXVsdFR5cGVcbiAgfVxuXG4gIHN0YXRpYyBnZXQgTkFNRSgpIHtcbiAgICByZXR1cm4gTkFNRVxuICB9XG5cbiAgLy8gUHVibGljXG4gIHRvZ2dsZSgpIHtcbiAgICByZXR1cm4gdGhpcy5faXNTaG93bigpID8gdGhpcy5oaWRlKCkgOiB0aGlzLnNob3coKVxuICB9XG5cbiAgc2hvdygpIHtcbiAgICBpZiAoaXNEaXNhYmxlZCh0aGlzLl9lbGVtZW50KSB8fCB0aGlzLl9pc1Nob3duKCkpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGNvbnN0IHJlbGF0ZWRUYXJnZXQgPSB7XG4gICAgICByZWxhdGVkVGFyZ2V0OiB0aGlzLl9lbGVtZW50XG4gICAgfVxuXG4gICAgY29uc3Qgc2hvd0V2ZW50ID0gRXZlbnRIYW5kbGVyLnRyaWdnZXIodGhpcy5fZWxlbWVudCwgRVZFTlRfU0hPVywgcmVsYXRlZFRhcmdldClcblxuICAgIGlmIChzaG93RXZlbnQuZGVmYXVsdFByZXZlbnRlZCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgdGhpcy5fY3JlYXRlUG9wcGVyKClcblxuICAgIC8vIElmIHRoaXMgaXMgYSB0b3VjaC1lbmFibGVkIGRldmljZSB3ZSBhZGQgZXh0cmFcbiAgICAvLyBlbXB0eSBtb3VzZW92ZXIgbGlzdGVuZXJzIHRvIHRoZSBib2R5J3MgaW1tZWRpYXRlIGNoaWxkcmVuO1xuICAgIC8vIG9ubHkgbmVlZGVkIGJlY2F1c2Ugb2YgYnJva2VuIGV2ZW50IGRlbGVnYXRpb24gb24gaU9TXG4gICAgLy8gaHR0cHM6Ly93d3cucXVpcmtzbW9kZS5vcmcvYmxvZy9hcmNoaXZlcy8yMDE0LzAyL21vdXNlX2V2ZW50X2J1Yi5odG1sXG4gICAgaWYgKCdvbnRvdWNoc3RhcnQnIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCAmJiAhdGhpcy5fcGFyZW50LmNsb3Nlc3QoU0VMRUNUT1JfTkFWQkFSX05BVikpIHtcbiAgICAgIGZvciAoY29uc3QgZWxlbWVudCBvZiBbXS5jb25jYXQoLi4uZG9jdW1lbnQuYm9keS5jaGlsZHJlbikpIHtcbiAgICAgICAgRXZlbnRIYW5kbGVyLm9uKGVsZW1lbnQsICdtb3VzZW92ZXInLCBub29wKVxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuX2VsZW1lbnQuZm9jdXMoKVxuICAgIHRoaXMuX2VsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgdHJ1ZSlcblxuICAgIHRoaXMuX21lbnUuY2xhc3NMaXN0LmFkZChDTEFTU19OQU1FX1NIT1cpXG4gICAgdGhpcy5fZWxlbWVudC5jbGFzc0xpc3QuYWRkKENMQVNTX05BTUVfU0hPVylcbiAgICBFdmVudEhhbmRsZXIudHJpZ2dlcih0aGlzLl9lbGVtZW50LCBFVkVOVF9TSE9XTiwgcmVsYXRlZFRhcmdldClcbiAgfVxuXG4gIGhpZGUoKSB7XG4gICAgaWYgKGlzRGlzYWJsZWQodGhpcy5fZWxlbWVudCkgfHwgIXRoaXMuX2lzU2hvd24oKSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY29uc3QgcmVsYXRlZFRhcmdldCA9IHtcbiAgICAgIHJlbGF0ZWRUYXJnZXQ6IHRoaXMuX2VsZW1lbnRcbiAgICB9XG5cbiAgICB0aGlzLl9jb21wbGV0ZUhpZGUocmVsYXRlZFRhcmdldClcbiAgfVxuXG4gIGRpc3Bvc2UoKSB7XG4gICAgaWYgKHRoaXMuX3BvcHBlcikge1xuICAgICAgdGhpcy5fcG9wcGVyLmRlc3Ryb3koKVxuICAgIH1cblxuICAgIHN1cGVyLmRpc3Bvc2UoKVxuICB9XG5cbiAgdXBkYXRlKCkge1xuICAgIHRoaXMuX2luTmF2YmFyID0gdGhpcy5fZGV0ZWN0TmF2YmFyKClcbiAgICBpZiAodGhpcy5fcG9wcGVyKSB7XG4gICAgICB0aGlzLl9wb3BwZXIudXBkYXRlKClcbiAgICB9XG4gIH1cblxuICAvLyBQcml2YXRlXG4gIF9jb21wbGV0ZUhpZGUocmVsYXRlZFRhcmdldCkge1xuICAgIGNvbnN0IGhpZGVFdmVudCA9IEV2ZW50SGFuZGxlci50cmlnZ2VyKHRoaXMuX2VsZW1lbnQsIEVWRU5UX0hJREUsIHJlbGF0ZWRUYXJnZXQpXG4gICAgaWYgKGhpZGVFdmVudC5kZWZhdWx0UHJldmVudGVkKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICAvLyBJZiB0aGlzIGlzIGEgdG91Y2gtZW5hYmxlZCBkZXZpY2Ugd2UgcmVtb3ZlIHRoZSBleHRyYVxuICAgIC8vIGVtcHR5IG1vdXNlb3ZlciBsaXN0ZW5lcnMgd2UgYWRkZWQgZm9yIGlPUyBzdXBwb3J0XG4gICAgaWYgKCdvbnRvdWNoc3RhcnQnIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkge1xuICAgICAgZm9yIChjb25zdCBlbGVtZW50IG9mIFtdLmNvbmNhdCguLi5kb2N1bWVudC5ib2R5LmNoaWxkcmVuKSkge1xuICAgICAgICBFdmVudEhhbmRsZXIub2ZmKGVsZW1lbnQsICdtb3VzZW92ZXInLCBub29wKVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLl9wb3BwZXIpIHtcbiAgICAgIHRoaXMuX3BvcHBlci5kZXN0cm95KClcbiAgICB9XG5cbiAgICB0aGlzLl9tZW51LmNsYXNzTGlzdC5yZW1vdmUoQ0xBU1NfTkFNRV9TSE9XKVxuICAgIHRoaXMuX2VsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShDTEFTU19OQU1FX1NIT1cpXG4gICAgdGhpcy5fZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCAnZmFsc2UnKVxuICAgIE1hbmlwdWxhdG9yLnJlbW92ZURhdGFBdHRyaWJ1dGUodGhpcy5fbWVudSwgJ3BvcHBlcicpXG4gICAgRXZlbnRIYW5kbGVyLnRyaWdnZXIodGhpcy5fZWxlbWVudCwgRVZFTlRfSElEREVOLCByZWxhdGVkVGFyZ2V0KVxuICB9XG5cbiAgX2dldENvbmZpZyhjb25maWcpIHtcbiAgICBjb25maWcgPSBzdXBlci5fZ2V0Q29uZmlnKGNvbmZpZylcblxuICAgIGlmICh0eXBlb2YgY29uZmlnLnJlZmVyZW5jZSA9PT0gJ29iamVjdCcgJiYgIWlzRWxlbWVudChjb25maWcucmVmZXJlbmNlKSAmJlxuICAgICAgdHlwZW9mIGNvbmZpZy5yZWZlcmVuY2UuZ2V0Qm91bmRpbmdDbGllbnRSZWN0ICE9PSAnZnVuY3Rpb24nXG4gICAgKSB7XG4gICAgICAvLyBQb3BwZXIgdmlydHVhbCBlbGVtZW50cyByZXF1aXJlIGEgZ2V0Qm91bmRpbmdDbGllbnRSZWN0IG1ldGhvZFxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgJHtOQU1FLnRvVXBwZXJDYXNlKCl9OiBPcHRpb24gXCJyZWZlcmVuY2VcIiBwcm92aWRlZCB0eXBlIFwib2JqZWN0XCIgd2l0aG91dCBhIHJlcXVpcmVkIFwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0XCIgbWV0aG9kLmApXG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbmZpZ1xuICB9XG5cbiAgX2NyZWF0ZVBvcHBlcigpIHtcbiAgICBpZiAodHlwZW9mIFBvcHBlciA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0Jvb3RzdHJhcFxcJ3MgZHJvcGRvd25zIHJlcXVpcmUgUG9wcGVyIChodHRwczovL3BvcHBlci5qcy5vcmcpJylcbiAgICB9XG5cbiAgICBsZXQgcmVmZXJlbmNlRWxlbWVudCA9IHRoaXMuX2VsZW1lbnRcblxuICAgIGlmICh0aGlzLl9jb25maWcucmVmZXJlbmNlID09PSAncGFyZW50Jykge1xuICAgICAgcmVmZXJlbmNlRWxlbWVudCA9IHRoaXMuX3BhcmVudFxuICAgIH0gZWxzZSBpZiAoaXNFbGVtZW50KHRoaXMuX2NvbmZpZy5yZWZlcmVuY2UpKSB7XG4gICAgICByZWZlcmVuY2VFbGVtZW50ID0gZ2V0RWxlbWVudCh0aGlzLl9jb25maWcucmVmZXJlbmNlKVxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoaXMuX2NvbmZpZy5yZWZlcmVuY2UgPT09ICdvYmplY3QnKSB7XG4gICAgICByZWZlcmVuY2VFbGVtZW50ID0gdGhpcy5fY29uZmlnLnJlZmVyZW5jZVxuICAgIH1cblxuICAgIGNvbnN0IHBvcHBlckNvbmZpZyA9IHRoaXMuX2dldFBvcHBlckNvbmZpZygpXG4gICAgdGhpcy5fcG9wcGVyID0gUG9wcGVyLmNyZWF0ZVBvcHBlcihyZWZlcmVuY2VFbGVtZW50LCB0aGlzLl9tZW51LCBwb3BwZXJDb25maWcpXG4gIH1cblxuICBfaXNTaG93bigpIHtcbiAgICByZXR1cm4gdGhpcy5fbWVudS5jbGFzc0xpc3QuY29udGFpbnMoQ0xBU1NfTkFNRV9TSE9XKVxuICB9XG5cbiAgX2dldFBsYWNlbWVudCgpIHtcbiAgICBjb25zdCBwYXJlbnREcm9wZG93biA9IHRoaXMuX3BhcmVudFxuXG4gICAgaWYgKHBhcmVudERyb3Bkb3duLmNsYXNzTGlzdC5jb250YWlucyhDTEFTU19OQU1FX0RST1BFTkQpKSB7XG4gICAgICByZXR1cm4gUExBQ0VNRU5UX1JJR0hUXG4gICAgfVxuXG4gICAgaWYgKHBhcmVudERyb3Bkb3duLmNsYXNzTGlzdC5jb250YWlucyhDTEFTU19OQU1FX0RST1BTVEFSVCkpIHtcbiAgICAgIHJldHVybiBQTEFDRU1FTlRfTEVGVFxuICAgIH1cblxuICAgIGlmIChwYXJlbnREcm9wZG93bi5jbGFzc0xpc3QuY29udGFpbnMoQ0xBU1NfTkFNRV9EUk9QVVBfQ0VOVEVSKSkge1xuICAgICAgcmV0dXJuIFBMQUNFTUVOVF9UT1BDRU5URVJcbiAgICB9XG5cbiAgICBpZiAocGFyZW50RHJvcGRvd24uY2xhc3NMaXN0LmNvbnRhaW5zKENMQVNTX05BTUVfRFJPUERPV05fQ0VOVEVSKSkge1xuICAgICAgcmV0dXJuIFBMQUNFTUVOVF9CT1RUT01DRU5URVJcbiAgICB9XG5cbiAgICAvLyBXZSBuZWVkIHRvIHRyaW0gdGhlIHZhbHVlIGJlY2F1c2UgY3VzdG9tIHByb3BlcnRpZXMgY2FuIGFsc28gaW5jbHVkZSBzcGFjZXNcbiAgICBjb25zdCBpc0VuZCA9IGdldENvbXB1dGVkU3R5bGUodGhpcy5fbWVudSkuZ2V0UHJvcGVydHlWYWx1ZSgnLS1icy1wb3NpdGlvbicpLnRyaW0oKSA9PT0gJ2VuZCdcblxuICAgIGlmIChwYXJlbnREcm9wZG93bi5jbGFzc0xpc3QuY29udGFpbnMoQ0xBU1NfTkFNRV9EUk9QVVApKSB7XG4gICAgICByZXR1cm4gaXNFbmQgPyBQTEFDRU1FTlRfVE9QRU5EIDogUExBQ0VNRU5UX1RPUFxuICAgIH1cblxuICAgIHJldHVybiBpc0VuZCA/IFBMQUNFTUVOVF9CT1RUT01FTkQgOiBQTEFDRU1FTlRfQk9UVE9NXG4gIH1cblxuICBfZGV0ZWN0TmF2YmFyKCkge1xuICAgIHJldHVybiB0aGlzLl9lbGVtZW50LmNsb3Nlc3QoU0VMRUNUT1JfTkFWQkFSKSAhPT0gbnVsbFxuICB9XG5cbiAgX2dldE9mZnNldCgpIHtcbiAgICBjb25zdCB7IG9mZnNldCB9ID0gdGhpcy5fY29uZmlnXG5cbiAgICBpZiAodHlwZW9mIG9mZnNldCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiBvZmZzZXQuc3BsaXQoJywnKS5tYXAodmFsdWUgPT4gTnVtYmVyLnBhcnNlSW50KHZhbHVlLCAxMCkpXG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBvZmZzZXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiBwb3BwZXJEYXRhID0+IG9mZnNldChwb3BwZXJEYXRhLCB0aGlzLl9lbGVtZW50KVxuICAgIH1cblxuICAgIHJldHVybiBvZmZzZXRcbiAgfVxuXG4gIF9nZXRQb3BwZXJDb25maWcoKSB7XG4gICAgY29uc3QgZGVmYXVsdEJzUG9wcGVyQ29uZmlnID0ge1xuICAgICAgcGxhY2VtZW50OiB0aGlzLl9nZXRQbGFjZW1lbnQoKSxcbiAgICAgIG1vZGlmaWVyczogW3tcbiAgICAgICAgbmFtZTogJ3ByZXZlbnRPdmVyZmxvdycsXG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICBib3VuZGFyeTogdGhpcy5fY29uZmlnLmJvdW5kYXJ5XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIG5hbWU6ICdvZmZzZXQnLFxuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgb2Zmc2V0OiB0aGlzLl9nZXRPZmZzZXQoKVxuICAgICAgICB9XG4gICAgICB9XVxuICAgIH1cblxuICAgIC8vIERpc2FibGUgUG9wcGVyIGlmIHdlIGhhdmUgYSBzdGF0aWMgZGlzcGxheSBvciBEcm9wZG93biBpcyBpbiBOYXZiYXJcbiAgICBpZiAodGhpcy5faW5OYXZiYXIgfHwgdGhpcy5fY29uZmlnLmRpc3BsYXkgPT09ICdzdGF0aWMnKSB7XG4gICAgICBNYW5pcHVsYXRvci5zZXREYXRhQXR0cmlidXRlKHRoaXMuX21lbnUsICdwb3BwZXInLCAnc3RhdGljJykgLy8gVE9ETzogdjYgcmVtb3ZlXG4gICAgICBkZWZhdWx0QnNQb3BwZXJDb25maWcubW9kaWZpZXJzID0gW3tcbiAgICAgICAgbmFtZTogJ2FwcGx5U3R5bGVzJyxcbiAgICAgICAgZW5hYmxlZDogZmFsc2VcbiAgICAgIH1dXG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLmRlZmF1bHRCc1BvcHBlckNvbmZpZyxcbiAgICAgIC4uLmV4ZWN1dGUodGhpcy5fY29uZmlnLnBvcHBlckNvbmZpZywgW2RlZmF1bHRCc1BvcHBlckNvbmZpZ10pXG4gICAgfVxuICB9XG5cbiAgX3NlbGVjdE1lbnVJdGVtKHsga2V5LCB0YXJnZXQgfSkge1xuICAgIGNvbnN0IGl0ZW1zID0gU2VsZWN0b3JFbmdpbmUuZmluZChTRUxFQ1RPUl9WSVNJQkxFX0lURU1TLCB0aGlzLl9tZW51KS5maWx0ZXIoZWxlbWVudCA9PiBpc1Zpc2libGUoZWxlbWVudCkpXG5cbiAgICBpZiAoIWl0ZW1zLmxlbmd0aCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgLy8gaWYgdGFyZ2V0IGlzbid0IGluY2x1ZGVkIGluIGl0ZW1zIChlLmcuIHdoZW4gZXhwYW5kaW5nIHRoZSBkcm9wZG93bilcbiAgICAvLyBhbGxvdyBjeWNsaW5nIHRvIGdldCB0aGUgbGFzdCBpdGVtIGluIGNhc2Uga2V5IGVxdWFscyBBUlJPV19VUF9LRVlcbiAgICBnZXROZXh0QWN0aXZlRWxlbWVudChpdGVtcywgdGFyZ2V0LCBrZXkgPT09IEFSUk9XX0RPV05fS0VZLCAhaXRlbXMuaW5jbHVkZXModGFyZ2V0KSkuZm9jdXMoKVxuICB9XG5cbiAgLy8gU3RhdGljXG4gIHN0YXRpYyBqUXVlcnlJbnRlcmZhY2UoY29uZmlnKSB7XG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCBkYXRhID0gRHJvcGRvd24uZ2V0T3JDcmVhdGVJbnN0YW5jZSh0aGlzLCBjb25maWcpXG5cbiAgICAgIGlmICh0eXBlb2YgY29uZmlnICE9PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBkYXRhW2NvbmZpZ10gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYE5vIG1ldGhvZCBuYW1lZCBcIiR7Y29uZmlnfVwiYClcbiAgICAgIH1cblxuICAgICAgZGF0YVtjb25maWddKClcbiAgICB9KVxuICB9XG5cbiAgc3RhdGljIGNsZWFyTWVudXMoZXZlbnQpIHtcbiAgICBpZiAoZXZlbnQuYnV0dG9uID09PSBSSUdIVF9NT1VTRV9CVVRUT04gfHwgKGV2ZW50LnR5cGUgPT09ICdrZXl1cCcgJiYgZXZlbnQua2V5ICE9PSBUQUJfS0VZKSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY29uc3Qgb3BlblRvZ2dsZXMgPSBTZWxlY3RvckVuZ2luZS5maW5kKFNFTEVDVE9SX0RBVEFfVE9HR0xFX1NIT1dOKVxuXG4gICAgZm9yIChjb25zdCB0b2dnbGUgb2Ygb3BlblRvZ2dsZXMpIHtcbiAgICAgIGNvbnN0IGNvbnRleHQgPSBEcm9wZG93bi5nZXRJbnN0YW5jZSh0b2dnbGUpXG4gICAgICBpZiAoIWNvbnRleHQgfHwgY29udGV4dC5fY29uZmlnLmF1dG9DbG9zZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgY29udGludWVcbiAgICAgIH1cblxuICAgICAgY29uc3QgY29tcG9zZWRQYXRoID0gZXZlbnQuY29tcG9zZWRQYXRoKClcbiAgICAgIGNvbnN0IGlzTWVudVRhcmdldCA9IGNvbXBvc2VkUGF0aC5pbmNsdWRlcyhjb250ZXh0Ll9tZW51KVxuICAgICAgaWYgKFxuICAgICAgICBjb21wb3NlZFBhdGguaW5jbHVkZXMoY29udGV4dC5fZWxlbWVudCkgfHxcbiAgICAgICAgKGNvbnRleHQuX2NvbmZpZy5hdXRvQ2xvc2UgPT09ICdpbnNpZGUnICYmICFpc01lbnVUYXJnZXQpIHx8XG4gICAgICAgIChjb250ZXh0Ll9jb25maWcuYXV0b0Nsb3NlID09PSAnb3V0c2lkZScgJiYgaXNNZW51VGFyZ2V0KVxuICAgICAgKSB7XG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG5cbiAgICAgIC8vIFRhYiBuYXZpZ2F0aW9uIHRocm91Z2ggdGhlIGRyb3Bkb3duIG1lbnUgb3IgZXZlbnRzIGZyb20gY29udGFpbmVkIGlucHV0cyBzaG91bGRuJ3QgY2xvc2UgdGhlIG1lbnVcbiAgICAgIGlmIChjb250ZXh0Ll9tZW51LmNvbnRhaW5zKGV2ZW50LnRhcmdldCkgJiYgKChldmVudC50eXBlID09PSAna2V5dXAnICYmIGV2ZW50LmtleSA9PT0gVEFCX0tFWSkgfHwgL2lucHV0fHNlbGVjdHxvcHRpb258dGV4dGFyZWF8Zm9ybS9pLnRlc3QoZXZlbnQudGFyZ2V0LnRhZ05hbWUpKSkge1xuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuXG4gICAgICBjb25zdCByZWxhdGVkVGFyZ2V0ID0geyByZWxhdGVkVGFyZ2V0OiBjb250ZXh0Ll9lbGVtZW50IH1cblxuICAgICAgaWYgKGV2ZW50LnR5cGUgPT09ICdjbGljaycpIHtcbiAgICAgICAgcmVsYXRlZFRhcmdldC5jbGlja0V2ZW50ID0gZXZlbnRcbiAgICAgIH1cblxuICAgICAgY29udGV4dC5fY29tcGxldGVIaWRlKHJlbGF0ZWRUYXJnZXQpXG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGRhdGFBcGlLZXlkb3duSGFuZGxlcihldmVudCkge1xuICAgIC8vIElmIG5vdCBhbiBVUCB8IERPV04gfCBFU0NBUEUga2V5ID0+IG5vdCBhIGRyb3Bkb3duIGNvbW1hbmRcbiAgICAvLyBJZiBpbnB1dC90ZXh0YXJlYSAmJiBpZiBrZXkgaXMgb3RoZXIgdGhhbiBFU0NBUEUgPT4gbm90IGEgZHJvcGRvd24gY29tbWFuZFxuXG4gICAgY29uc3QgaXNJbnB1dCA9IC9pbnB1dHx0ZXh0YXJlYS9pLnRlc3QoZXZlbnQudGFyZ2V0LnRhZ05hbWUpXG4gICAgY29uc3QgaXNFc2NhcGVFdmVudCA9IGV2ZW50LmtleSA9PT0gRVNDQVBFX0tFWVxuICAgIGNvbnN0IGlzVXBPckRvd25FdmVudCA9IFtBUlJPV19VUF9LRVksIEFSUk9XX0RPV05fS0VZXS5pbmNsdWRlcyhldmVudC5rZXkpXG5cbiAgICBpZiAoIWlzVXBPckRvd25FdmVudCAmJiAhaXNFc2NhcGVFdmVudCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgaWYgKGlzSW5wdXQgJiYgIWlzRXNjYXBlRXZlbnQpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcblxuICAgIC8vIFRPRE86IHY2IHJldmVydCAjMzcwMTEgJiBjaGFuZ2UgbWFya3VwIGh0dHBzOi8vZ2V0Ym9vdHN0cmFwLmNvbS9kb2NzLzUuMy9mb3Jtcy9pbnB1dC1ncm91cC9cbiAgICBjb25zdCBnZXRUb2dnbGVCdXR0b24gPSB0aGlzLm1hdGNoZXMoU0VMRUNUT1JfREFUQV9UT0dHTEUpID9cbiAgICAgIHRoaXMgOlxuICAgICAgKFNlbGVjdG9yRW5naW5lLnByZXYodGhpcywgU0VMRUNUT1JfREFUQV9UT0dHTEUpWzBdIHx8XG4gICAgICAgIFNlbGVjdG9yRW5naW5lLm5leHQodGhpcywgU0VMRUNUT1JfREFUQV9UT0dHTEUpWzBdIHx8XG4gICAgICAgIFNlbGVjdG9yRW5naW5lLmZpbmRPbmUoU0VMRUNUT1JfREFUQV9UT0dHTEUsIGV2ZW50LmRlbGVnYXRlVGFyZ2V0LnBhcmVudE5vZGUpKVxuXG4gICAgY29uc3QgaW5zdGFuY2UgPSBEcm9wZG93bi5nZXRPckNyZWF0ZUluc3RhbmNlKGdldFRvZ2dsZUJ1dHRvbilcblxuICAgIGlmIChpc1VwT3JEb3duRXZlbnQpIHtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXG4gICAgICBpbnN0YW5jZS5zaG93KClcbiAgICAgIGluc3RhbmNlLl9zZWxlY3RNZW51SXRlbShldmVudClcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGlmIChpbnN0YW5jZS5faXNTaG93bigpKSB7IC8vIGVsc2UgaXMgZXNjYXBlIGFuZCB3ZSBjaGVjayBpZiBpdCBpcyBzaG93blxuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgIGluc3RhbmNlLmhpZGUoKVxuICAgICAgZ2V0VG9nZ2xlQnV0dG9uLmZvY3VzKClcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBEYXRhIEFQSSBpbXBsZW1lbnRhdGlvblxuICovXG5cbkV2ZW50SGFuZGxlci5vbihkb2N1bWVudCwgRVZFTlRfS0VZRE9XTl9EQVRBX0FQSSwgU0VMRUNUT1JfREFUQV9UT0dHTEUsIERyb3Bkb3duLmRhdGFBcGlLZXlkb3duSGFuZGxlcilcbkV2ZW50SGFuZGxlci5vbihkb2N1bWVudCwgRVZFTlRfS0VZRE9XTl9EQVRBX0FQSSwgU0VMRUNUT1JfTUVOVSwgRHJvcGRvd24uZGF0YUFwaUtleWRvd25IYW5kbGVyKVxuRXZlbnRIYW5kbGVyLm9uKGRvY3VtZW50LCBFVkVOVF9DTElDS19EQVRBX0FQSSwgRHJvcGRvd24uY2xlYXJNZW51cylcbkV2ZW50SGFuZGxlci5vbihkb2N1bWVudCwgRVZFTlRfS0VZVVBfREFUQV9BUEksIERyb3Bkb3duLmNsZWFyTWVudXMpXG5FdmVudEhhbmRsZXIub24oZG9jdW1lbnQsIEVWRU5UX0NMSUNLX0RBVEFfQVBJLCBTRUxFQ1RPUl9EQVRBX1RPR0dMRSwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgRHJvcGRvd24uZ2V0T3JDcmVhdGVJbnN0YW5jZSh0aGlzKS50b2dnbGUoKVxufSlcblxuLyoqXG4gKiBqUXVlcnlcbiAqL1xuXG5kZWZpbmVKUXVlcnlQbHVnaW4oRHJvcGRvd24pXG5cbmV4cG9ydCBkZWZhdWx0IERyb3Bkb3duXG4iLCAiLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQm9vdHN0cmFwIHNjcm9sbHNweS5qc1xuICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYWluL0xJQ0VOU0UpXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbmltcG9ydCBCYXNlQ29tcG9uZW50IGZyb20gJy4vYmFzZS1jb21wb25lbnQuanMnXG5pbXBvcnQgRXZlbnRIYW5kbGVyIGZyb20gJy4vZG9tL2V2ZW50LWhhbmRsZXIuanMnXG5pbXBvcnQgU2VsZWN0b3JFbmdpbmUgZnJvbSAnLi9kb20vc2VsZWN0b3ItZW5naW5lLmpzJ1xuaW1wb3J0IHsgZGVmaW5lSlF1ZXJ5UGx1Z2luLCBnZXRFbGVtZW50LCBpc0Rpc2FibGVkLCBpc1Zpc2libGUgfSBmcm9tICcuL3V0aWwvaW5kZXguanMnXG5cbi8qKlxuICogQ29uc3RhbnRzXG4gKi9cblxuY29uc3QgTkFNRSA9ICdzY3JvbGxzcHknXG5jb25zdCBEQVRBX0tFWSA9ICdicy5zY3JvbGxzcHknXG5jb25zdCBFVkVOVF9LRVkgPSBgLiR7REFUQV9LRVl9YFxuY29uc3QgREFUQV9BUElfS0VZID0gJy5kYXRhLWFwaSdcblxuY29uc3QgRVZFTlRfQUNUSVZBVEUgPSBgYWN0aXZhdGUke0VWRU5UX0tFWX1gXG5jb25zdCBFVkVOVF9DTElDSyA9IGBjbGljayR7RVZFTlRfS0VZfWBcbmNvbnN0IEVWRU5UX0xPQURfREFUQV9BUEkgPSBgbG9hZCR7RVZFTlRfS0VZfSR7REFUQV9BUElfS0VZfWBcblxuY29uc3QgQ0xBU1NfTkFNRV9EUk9QRE9XTl9JVEVNID0gJ2Ryb3Bkb3duLWl0ZW0nXG5jb25zdCBDTEFTU19OQU1FX0FDVElWRSA9ICdhY3RpdmUnXG5cbmNvbnN0IFNFTEVDVE9SX0RBVEFfU1BZID0gJ1tkYXRhLWJzLXNweT1cInNjcm9sbFwiXSdcbmNvbnN0IFNFTEVDVE9SX1RBUkdFVF9MSU5LUyA9ICdbaHJlZl0nXG5jb25zdCBTRUxFQ1RPUl9OQVZfTElTVF9HUk9VUCA9ICcubmF2LCAubGlzdC1ncm91cCdcbmNvbnN0IFNFTEVDVE9SX05BVl9MSU5LUyA9ICcubmF2LWxpbmsnXG5jb25zdCBTRUxFQ1RPUl9OQVZfSVRFTVMgPSAnLm5hdi1pdGVtJ1xuY29uc3QgU0VMRUNUT1JfTElTVF9JVEVNUyA9ICcubGlzdC1ncm91cC1pdGVtJ1xuY29uc3QgU0VMRUNUT1JfTElOS19JVEVNUyA9IGAke1NFTEVDVE9SX05BVl9MSU5LU30sICR7U0VMRUNUT1JfTkFWX0lURU1TfSA+ICR7U0VMRUNUT1JfTkFWX0xJTktTfSwgJHtTRUxFQ1RPUl9MSVNUX0lURU1TfWBcbmNvbnN0IFNFTEVDVE9SX0RST1BET1dOID0gJy5kcm9wZG93bidcbmNvbnN0IFNFTEVDVE9SX0RST1BET1dOX1RPR0dMRSA9ICcuZHJvcGRvd24tdG9nZ2xlJ1xuXG5jb25zdCBEZWZhdWx0ID0ge1xuICBvZmZzZXQ6IG51bGwsIC8vIFRPRE86IHY2IEBkZXByZWNhdGVkLCBrZWVwIGl0IGZvciBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eSByZWFzb25zXG4gIHJvb3RNYXJnaW46ICcwcHggMHB4IC0yNSUnLFxuICBzbW9vdGhTY3JvbGw6IGZhbHNlLFxuICB0YXJnZXQ6IG51bGwsXG4gIHRocmVzaG9sZDogWzAuMSwgMC41LCAxXVxufVxuXG5jb25zdCBEZWZhdWx0VHlwZSA9IHtcbiAgb2Zmc2V0OiAnKG51bWJlcnxudWxsKScsIC8vIFRPRE8gdjYgQGRlcHJlY2F0ZWQsIGtlZXAgaXQgZm9yIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5IHJlYXNvbnNcbiAgcm9vdE1hcmdpbjogJ3N0cmluZycsXG4gIHNtb290aFNjcm9sbDogJ2Jvb2xlYW4nLFxuICB0YXJnZXQ6ICdlbGVtZW50JyxcbiAgdGhyZXNob2xkOiAnYXJyYXknXG59XG5cbi8qKlxuICogQ2xhc3MgZGVmaW5pdGlvblxuICovXG5cbmNsYXNzIFNjcm9sbFNweSBleHRlbmRzIEJhc2VDb21wb25lbnQge1xuICBjb25zdHJ1Y3RvcihlbGVtZW50LCBjb25maWcpIHtcbiAgICBzdXBlcihlbGVtZW50LCBjb25maWcpXG5cbiAgICAvLyB0aGlzLl9lbGVtZW50IGlzIHRoZSBvYnNlcnZhYmxlc0NvbnRhaW5lciBhbmQgY29uZmlnLnRhcmdldCB0aGUgbWVudSBsaW5rcyB3cmFwcGVyXG4gICAgdGhpcy5fdGFyZ2V0TGlua3MgPSBuZXcgTWFwKClcbiAgICB0aGlzLl9vYnNlcnZhYmxlU2VjdGlvbnMgPSBuZXcgTWFwKClcbiAgICB0aGlzLl9yb290RWxlbWVudCA9IGdldENvbXB1dGVkU3R5bGUodGhpcy5fZWxlbWVudCkub3ZlcmZsb3dZID09PSAndmlzaWJsZScgPyBudWxsIDogdGhpcy5fZWxlbWVudFxuICAgIHRoaXMuX2FjdGl2ZVRhcmdldCA9IG51bGxcbiAgICB0aGlzLl9vYnNlcnZlciA9IG51bGxcbiAgICB0aGlzLl9wcmV2aW91c1Njcm9sbERhdGEgPSB7XG4gICAgICB2aXNpYmxlRW50cnlUb3A6IDAsXG4gICAgICBwYXJlbnRTY3JvbGxUb3A6IDBcbiAgICB9XG4gICAgdGhpcy5yZWZyZXNoKCkgLy8gaW5pdGlhbGl6ZVxuICB9XG5cbiAgLy8gR2V0dGVyc1xuICBzdGF0aWMgZ2V0IERlZmF1bHQoKSB7XG4gICAgcmV0dXJuIERlZmF1bHRcbiAgfVxuXG4gIHN0YXRpYyBnZXQgRGVmYXVsdFR5cGUoKSB7XG4gICAgcmV0dXJuIERlZmF1bHRUeXBlXG4gIH1cblxuICBzdGF0aWMgZ2V0IE5BTUUoKSB7XG4gICAgcmV0dXJuIE5BTUVcbiAgfVxuXG4gIC8vIFB1YmxpY1xuICByZWZyZXNoKCkge1xuICAgIHRoaXMuX2luaXRpYWxpemVUYXJnZXRzQW5kT2JzZXJ2YWJsZXMoKVxuICAgIHRoaXMuX21heWJlRW5hYmxlU21vb3RoU2Nyb2xsKClcblxuICAgIGlmICh0aGlzLl9vYnNlcnZlcikge1xuICAgICAgdGhpcy5fb2JzZXJ2ZXIuZGlzY29ubmVjdCgpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX29ic2VydmVyID0gdGhpcy5fZ2V0TmV3T2JzZXJ2ZXIoKVxuICAgIH1cblxuICAgIGZvciAoY29uc3Qgc2VjdGlvbiBvZiB0aGlzLl9vYnNlcnZhYmxlU2VjdGlvbnMudmFsdWVzKCkpIHtcbiAgICAgIHRoaXMuX29ic2VydmVyLm9ic2VydmUoc2VjdGlvbilcbiAgICB9XG4gIH1cblxuICBkaXNwb3NlKCkge1xuICAgIHRoaXMuX29ic2VydmVyLmRpc2Nvbm5lY3QoKVxuICAgIHN1cGVyLmRpc3Bvc2UoKVxuICB9XG5cbiAgLy8gUHJpdmF0ZVxuICBfY29uZmlnQWZ0ZXJNZXJnZShjb25maWcpIHtcbiAgICAvLyBUT0RPOiBvbiB2NiB0YXJnZXQgc2hvdWxkIGJlIGdpdmVuIGV4cGxpY2l0bHkgJiByZW1vdmUgdGhlIHt0YXJnZXQ6ICdzcy10YXJnZXQnfSBjYXNlXG4gICAgY29uZmlnLnRhcmdldCA9IGdldEVsZW1lbnQoY29uZmlnLnRhcmdldCkgfHwgZG9jdW1lbnQuYm9keVxuXG4gICAgLy8gVE9ETzogdjYgT25seSBmb3IgYmFja3dhcmRzIGNvbXBhdGliaWxpdHkgcmVhc29ucy4gVXNlIHJvb3RNYXJnaW4gb25seVxuICAgIGNvbmZpZy5yb290TWFyZ2luID0gY29uZmlnLm9mZnNldCA/IGAke2NvbmZpZy5vZmZzZXR9cHggMHB4IC0zMCVgIDogY29uZmlnLnJvb3RNYXJnaW5cblxuICAgIGlmICh0eXBlb2YgY29uZmlnLnRocmVzaG9sZCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbmZpZy50aHJlc2hvbGQgPSBjb25maWcudGhyZXNob2xkLnNwbGl0KCcsJykubWFwKHZhbHVlID0+IE51bWJlci5wYXJzZUZsb2F0KHZhbHVlKSlcbiAgICB9XG5cbiAgICByZXR1cm4gY29uZmlnXG4gIH1cblxuICBfbWF5YmVFbmFibGVTbW9vdGhTY3JvbGwoKSB7XG4gICAgaWYgKCF0aGlzLl9jb25maWcuc21vb3RoU2Nyb2xsKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICAvLyB1bnJlZ2lzdGVyIGFueSBwcmV2aW91cyBsaXN0ZW5lcnNcbiAgICBFdmVudEhhbmRsZXIub2ZmKHRoaXMuX2NvbmZpZy50YXJnZXQsIEVWRU5UX0NMSUNLKVxuXG4gICAgRXZlbnRIYW5kbGVyLm9uKHRoaXMuX2NvbmZpZy50YXJnZXQsIEVWRU5UX0NMSUNLLCBTRUxFQ1RPUl9UQVJHRVRfTElOS1MsIGV2ZW50ID0+IHtcbiAgICAgIGNvbnN0IG9ic2VydmFibGVTZWN0aW9uID0gdGhpcy5fb2JzZXJ2YWJsZVNlY3Rpb25zLmdldChldmVudC50YXJnZXQuaGFzaClcbiAgICAgIGlmIChvYnNlcnZhYmxlU2VjdGlvbikge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgIGNvbnN0IHJvb3QgPSB0aGlzLl9yb290RWxlbWVudCB8fCB3aW5kb3dcbiAgICAgICAgY29uc3QgaGVpZ2h0ID0gb2JzZXJ2YWJsZVNlY3Rpb24ub2Zmc2V0VG9wIC0gdGhpcy5fZWxlbWVudC5vZmZzZXRUb3BcbiAgICAgICAgaWYgKHJvb3Quc2Nyb2xsVG8pIHtcbiAgICAgICAgICByb290LnNjcm9sbFRvKHsgdG9wOiBoZWlnaHQsIGJlaGF2aW9yOiAnc21vb3RoJyB9KVxuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ2hyb21lIDYwIGRvZXNuJ3Qgc3VwcG9ydCBgc2Nyb2xsVG9gXG4gICAgICAgIHJvb3Quc2Nyb2xsVG9wID0gaGVpZ2h0XG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIF9nZXROZXdPYnNlcnZlcigpIHtcbiAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgcm9vdDogdGhpcy5fcm9vdEVsZW1lbnQsXG4gICAgICB0aHJlc2hvbGQ6IHRoaXMuX2NvbmZpZy50aHJlc2hvbGQsXG4gICAgICByb290TWFyZ2luOiB0aGlzLl9jb25maWcucm9vdE1hcmdpblxuICAgIH1cblxuICAgIHJldHVybiBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoZW50cmllcyA9PiB0aGlzLl9vYnNlcnZlckNhbGxiYWNrKGVudHJpZXMpLCBvcHRpb25zKVxuICB9XG5cbiAgLy8gVGhlIGxvZ2ljIG9mIHNlbGVjdGlvblxuICBfb2JzZXJ2ZXJDYWxsYmFjayhlbnRyaWVzKSB7XG4gICAgY29uc3QgdGFyZ2V0RWxlbWVudCA9IGVudHJ5ID0+IHRoaXMuX3RhcmdldExpbmtzLmdldChgIyR7ZW50cnkudGFyZ2V0LmlkfWApXG4gICAgY29uc3QgYWN0aXZhdGUgPSBlbnRyeSA9PiB7XG4gICAgICB0aGlzLl9wcmV2aW91c1Njcm9sbERhdGEudmlzaWJsZUVudHJ5VG9wID0gZW50cnkudGFyZ2V0Lm9mZnNldFRvcFxuICAgICAgdGhpcy5fcHJvY2Vzcyh0YXJnZXRFbGVtZW50KGVudHJ5KSlcbiAgICB9XG5cbiAgICBjb25zdCBwYXJlbnRTY3JvbGxUb3AgPSAodGhpcy5fcm9vdEVsZW1lbnQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KS5zY3JvbGxUb3BcbiAgICBjb25zdCB1c2VyU2Nyb2xsc0Rvd24gPSBwYXJlbnRTY3JvbGxUb3AgPj0gdGhpcy5fcHJldmlvdXNTY3JvbGxEYXRhLnBhcmVudFNjcm9sbFRvcFxuICAgIHRoaXMuX3ByZXZpb3VzU2Nyb2xsRGF0YS5wYXJlbnRTY3JvbGxUb3AgPSBwYXJlbnRTY3JvbGxUb3BcblxuICAgIGZvciAoY29uc3QgZW50cnkgb2YgZW50cmllcykge1xuICAgICAgaWYgKCFlbnRyeS5pc0ludGVyc2VjdGluZykge1xuICAgICAgICB0aGlzLl9hY3RpdmVUYXJnZXQgPSBudWxsXG4gICAgICAgIHRoaXMuX2NsZWFyQWN0aXZlQ2xhc3ModGFyZ2V0RWxlbWVudChlbnRyeSkpXG5cbiAgICAgICAgY29udGludWVcbiAgICAgIH1cblxuICAgICAgY29uc3QgZW50cnlJc0xvd2VyVGhhblByZXZpb3VzID0gZW50cnkudGFyZ2V0Lm9mZnNldFRvcCA+PSB0aGlzLl9wcmV2aW91c1Njcm9sbERhdGEudmlzaWJsZUVudHJ5VG9wXG4gICAgICAvLyBpZiB3ZSBhcmUgc2Nyb2xsaW5nIGRvd24sIHBpY2sgdGhlIGJpZ2dlciBvZmZzZXRUb3BcbiAgICAgIGlmICh1c2VyU2Nyb2xsc0Rvd24gJiYgZW50cnlJc0xvd2VyVGhhblByZXZpb3VzKSB7XG4gICAgICAgIGFjdGl2YXRlKGVudHJ5KVxuICAgICAgICAvLyBpZiBwYXJlbnQgaXNuJ3Qgc2Nyb2xsZWQsIGxldCdzIGtlZXAgdGhlIGZpcnN0IHZpc2libGUgaXRlbSwgYnJlYWtpbmcgdGhlIGl0ZXJhdGlvblxuICAgICAgICBpZiAoIXBhcmVudFNjcm9sbFRvcCkge1xuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG5cbiAgICAgICAgY29udGludWVcbiAgICAgIH1cblxuICAgICAgLy8gaWYgd2UgYXJlIHNjcm9sbGluZyB1cCwgcGljayB0aGUgc21hbGxlc3Qgb2Zmc2V0VG9wXG4gICAgICBpZiAoIXVzZXJTY3JvbGxzRG93biAmJiAhZW50cnlJc0xvd2VyVGhhblByZXZpb3VzKSB7XG4gICAgICAgIGFjdGl2YXRlKGVudHJ5KVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIF9pbml0aWFsaXplVGFyZ2V0c0FuZE9ic2VydmFibGVzKCkge1xuICAgIHRoaXMuX3RhcmdldExpbmtzID0gbmV3IE1hcCgpXG4gICAgdGhpcy5fb2JzZXJ2YWJsZVNlY3Rpb25zID0gbmV3IE1hcCgpXG5cbiAgICBjb25zdCB0YXJnZXRMaW5rcyA9IFNlbGVjdG9yRW5naW5lLmZpbmQoU0VMRUNUT1JfVEFSR0VUX0xJTktTLCB0aGlzLl9jb25maWcudGFyZ2V0KVxuXG4gICAgZm9yIChjb25zdCBhbmNob3Igb2YgdGFyZ2V0TGlua3MpIHtcbiAgICAgIC8vIGVuc3VyZSB0aGF0IHRoZSBhbmNob3IgaGFzIGFuIGlkIGFuZCBpcyBub3QgZGlzYWJsZWRcbiAgICAgIGlmICghYW5jaG9yLmhhc2ggfHwgaXNEaXNhYmxlZChhbmNob3IpKSB7XG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG9ic2VydmFibGVTZWN0aW9uID0gU2VsZWN0b3JFbmdpbmUuZmluZE9uZShkZWNvZGVVUkkoYW5jaG9yLmhhc2gpLCB0aGlzLl9lbGVtZW50KVxuXG4gICAgICAvLyBlbnN1cmUgdGhhdCB0aGUgb2JzZXJ2YWJsZVNlY3Rpb24gZXhpc3RzICYgaXMgdmlzaWJsZVxuICAgICAgaWYgKGlzVmlzaWJsZShvYnNlcnZhYmxlU2VjdGlvbikpIHtcbiAgICAgICAgdGhpcy5fdGFyZ2V0TGlua3Muc2V0KGRlY29kZVVSSShhbmNob3IuaGFzaCksIGFuY2hvcilcbiAgICAgICAgdGhpcy5fb2JzZXJ2YWJsZVNlY3Rpb25zLnNldChhbmNob3IuaGFzaCwgb2JzZXJ2YWJsZVNlY3Rpb24pXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgX3Byb2Nlc3ModGFyZ2V0KSB7XG4gICAgaWYgKHRoaXMuX2FjdGl2ZVRhcmdldCA9PT0gdGFyZ2V0KSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICB0aGlzLl9jbGVhckFjdGl2ZUNsYXNzKHRoaXMuX2NvbmZpZy50YXJnZXQpXG4gICAgdGhpcy5fYWN0aXZlVGFyZ2V0ID0gdGFyZ2V0XG4gICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoQ0xBU1NfTkFNRV9BQ1RJVkUpXG4gICAgdGhpcy5fYWN0aXZhdGVQYXJlbnRzKHRhcmdldClcblxuICAgIEV2ZW50SGFuZGxlci50cmlnZ2VyKHRoaXMuX2VsZW1lbnQsIEVWRU5UX0FDVElWQVRFLCB7IHJlbGF0ZWRUYXJnZXQ6IHRhcmdldCB9KVxuICB9XG5cbiAgX2FjdGl2YXRlUGFyZW50cyh0YXJnZXQpIHtcbiAgICAvLyBBY3RpdmF0ZSBkcm9wZG93biBwYXJlbnRzXG4gICAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoQ0xBU1NfTkFNRV9EUk9QRE9XTl9JVEVNKSkge1xuICAgICAgU2VsZWN0b3JFbmdpbmUuZmluZE9uZShTRUxFQ1RPUl9EUk9QRE9XTl9UT0dHTEUsIHRhcmdldC5jbG9zZXN0KFNFTEVDVE9SX0RST1BET1dOKSlcbiAgICAgICAgLmNsYXNzTGlzdC5hZGQoQ0xBU1NfTkFNRV9BQ1RJVkUpXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IGxpc3RHcm91cCBvZiBTZWxlY3RvckVuZ2luZS5wYXJlbnRzKHRhcmdldCwgU0VMRUNUT1JfTkFWX0xJU1RfR1JPVVApKSB7XG4gICAgICAvLyBTZXQgdHJpZ2dlcmVkIGxpbmtzIHBhcmVudHMgYXMgYWN0aXZlXG4gICAgICAvLyBXaXRoIGJvdGggPHVsPiBhbmQgPG5hdj4gbWFya3VwIGEgcGFyZW50IGlzIHRoZSBwcmV2aW91cyBzaWJsaW5nIG9mIGFueSBuYXYgYW5jZXN0b3JcbiAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBTZWxlY3RvckVuZ2luZS5wcmV2KGxpc3RHcm91cCwgU0VMRUNUT1JfTElOS19JVEVNUykpIHtcbiAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKENMQVNTX05BTUVfQUNUSVZFKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIF9jbGVhckFjdGl2ZUNsYXNzKHBhcmVudCkge1xuICAgIHBhcmVudC5jbGFzc0xpc3QucmVtb3ZlKENMQVNTX05BTUVfQUNUSVZFKVxuXG4gICAgY29uc3QgYWN0aXZlTm9kZXMgPSBTZWxlY3RvckVuZ2luZS5maW5kKGAke1NFTEVDVE9SX1RBUkdFVF9MSU5LU30uJHtDTEFTU19OQU1FX0FDVElWRX1gLCBwYXJlbnQpXG4gICAgZm9yIChjb25zdCBub2RlIG9mIGFjdGl2ZU5vZGVzKSB7XG4gICAgICBub2RlLmNsYXNzTGlzdC5yZW1vdmUoQ0xBU1NfTkFNRV9BQ1RJVkUpXG4gICAgfVxuICB9XG5cbiAgLy8gU3RhdGljXG4gIHN0YXRpYyBqUXVlcnlJbnRlcmZhY2UoY29uZmlnKSB7XG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCBkYXRhID0gU2Nyb2xsU3B5LmdldE9yQ3JlYXRlSW5zdGFuY2UodGhpcywgY29uZmlnKVxuXG4gICAgICBpZiAodHlwZW9mIGNvbmZpZyAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGlmIChkYXRhW2NvbmZpZ10gPT09IHVuZGVmaW5lZCB8fCBjb25maWcuc3RhcnRzV2l0aCgnXycpIHx8IGNvbmZpZyA9PT0gJ2NvbnN0cnVjdG9yJykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBObyBtZXRob2QgbmFtZWQgXCIke2NvbmZpZ31cImApXG4gICAgICB9XG5cbiAgICAgIGRhdGFbY29uZmlnXSgpXG4gICAgfSlcbiAgfVxufVxuXG4vKipcbiAqIERhdGEgQVBJIGltcGxlbWVudGF0aW9uXG4gKi9cblxuRXZlbnRIYW5kbGVyLm9uKHdpbmRvdywgRVZFTlRfTE9BRF9EQVRBX0FQSSwgKCkgPT4ge1xuICBmb3IgKGNvbnN0IHNweSBvZiBTZWxlY3RvckVuZ2luZS5maW5kKFNFTEVDVE9SX0RBVEFfU1BZKSkge1xuICAgIFNjcm9sbFNweS5nZXRPckNyZWF0ZUluc3RhbmNlKHNweSlcbiAgfVxufSlcblxuLyoqXG4gKiBqUXVlcnlcbiAqL1xuXG5kZWZpbmVKUXVlcnlQbHVnaW4oU2Nyb2xsU3B5KVxuXG5leHBvcnQgZGVmYXVsdCBTY3JvbGxTcHlcbiIsICIvKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBCb290c3RyYXAgdG9vbHRpcC5qc1xuICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYWluL0xJQ0VOU0UpXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbmltcG9ydCAqIGFzIFBvcHBlciBmcm9tICdAcG9wcGVyanMvY29yZSdcbmltcG9ydCBCYXNlQ29tcG9uZW50IGZyb20gJy4vYmFzZS1jb21wb25lbnQuanMnXG5pbXBvcnQgRXZlbnRIYW5kbGVyIGZyb20gJy4vZG9tL2V2ZW50LWhhbmRsZXIuanMnXG5pbXBvcnQgTWFuaXB1bGF0b3IgZnJvbSAnLi9kb20vbWFuaXB1bGF0b3IuanMnXG5pbXBvcnQgeyBkZWZpbmVKUXVlcnlQbHVnaW4sIGV4ZWN1dGUsIGZpbmRTaGFkb3dSb290LCBnZXRFbGVtZW50LCBnZXRVSUQsIGlzUlRMLCBub29wIH0gZnJvbSAnLi91dGlsL2luZGV4LmpzJ1xuaW1wb3J0IHsgRGVmYXVsdEFsbG93bGlzdCB9IGZyb20gJy4vdXRpbC9zYW5pdGl6ZXIuanMnXG5pbXBvcnQgVGVtcGxhdGVGYWN0b3J5IGZyb20gJy4vdXRpbC90ZW1wbGF0ZS1mYWN0b3J5LmpzJ1xuXG4vKipcbiAqIENvbnN0YW50c1xuICovXG5cbmNvbnN0IE5BTUUgPSAndG9vbHRpcCdcbmNvbnN0IERJU0FMTE9XRURfQVRUUklCVVRFUyA9IG5ldyBTZXQoWydzYW5pdGl6ZScsICdhbGxvd0xpc3QnLCAnc2FuaXRpemVGbiddKVxuXG5jb25zdCBDTEFTU19OQU1FX0ZBREUgPSAnZmFkZSdcbmNvbnN0IENMQVNTX05BTUVfTU9EQUwgPSAnbW9kYWwnXG5jb25zdCBDTEFTU19OQU1FX1NIT1cgPSAnc2hvdydcblxuY29uc3QgU0VMRUNUT1JfVE9PTFRJUF9JTk5FUiA9ICcudG9vbHRpcC1pbm5lcidcbmNvbnN0IFNFTEVDVE9SX01PREFMID0gYC4ke0NMQVNTX05BTUVfTU9EQUx9YFxuXG5jb25zdCBFVkVOVF9NT0RBTF9ISURFID0gJ2hpZGUuYnMubW9kYWwnXG5cbmNvbnN0IFRSSUdHRVJfSE9WRVIgPSAnaG92ZXInXG5jb25zdCBUUklHR0VSX0ZPQ1VTID0gJ2ZvY3VzJ1xuY29uc3QgVFJJR0dFUl9DTElDSyA9ICdjbGljaydcbmNvbnN0IFRSSUdHRVJfTUFOVUFMID0gJ21hbnVhbCdcblxuY29uc3QgRVZFTlRfSElERSA9ICdoaWRlJ1xuY29uc3QgRVZFTlRfSElEREVOID0gJ2hpZGRlbidcbmNvbnN0IEVWRU5UX1NIT1cgPSAnc2hvdydcbmNvbnN0IEVWRU5UX1NIT1dOID0gJ3Nob3duJ1xuY29uc3QgRVZFTlRfSU5TRVJURUQgPSAnaW5zZXJ0ZWQnXG5jb25zdCBFVkVOVF9DTElDSyA9ICdjbGljaydcbmNvbnN0IEVWRU5UX0ZPQ1VTSU4gPSAnZm9jdXNpbidcbmNvbnN0IEVWRU5UX0ZPQ1VTT1VUID0gJ2ZvY3Vzb3V0J1xuY29uc3QgRVZFTlRfTU9VU0VFTlRFUiA9ICdtb3VzZWVudGVyJ1xuY29uc3QgRVZFTlRfTU9VU0VMRUFWRSA9ICdtb3VzZWxlYXZlJ1xuXG5jb25zdCBBdHRhY2htZW50TWFwID0ge1xuICBBVVRPOiAnYXV0bycsXG4gIFRPUDogJ3RvcCcsXG4gIFJJR0hUOiBpc1JUTCgpID8gJ2xlZnQnIDogJ3JpZ2h0JyxcbiAgQk9UVE9NOiAnYm90dG9tJyxcbiAgTEVGVDogaXNSVEwoKSA/ICdyaWdodCcgOiAnbGVmdCdcbn1cblxuY29uc3QgRGVmYXVsdCA9IHtcbiAgYWxsb3dMaXN0OiBEZWZhdWx0QWxsb3dsaXN0LFxuICBhbmltYXRpb246IHRydWUsXG4gIGJvdW5kYXJ5OiAnY2xpcHBpbmdQYXJlbnRzJyxcbiAgY29udGFpbmVyOiBmYWxzZSxcbiAgY3VzdG9tQ2xhc3M6ICcnLFxuICBkZWxheTogMCxcbiAgZmFsbGJhY2tQbGFjZW1lbnRzOiBbJ3RvcCcsICdyaWdodCcsICdib3R0b20nLCAnbGVmdCddLFxuICBodG1sOiBmYWxzZSxcbiAgb2Zmc2V0OiBbMCwgNl0sXG4gIHBsYWNlbWVudDogJ3RvcCcsXG4gIHBvcHBlckNvbmZpZzogbnVsbCxcbiAgc2FuaXRpemU6IHRydWUsXG4gIHNhbml0aXplRm46IG51bGwsXG4gIHNlbGVjdG9yOiBmYWxzZSxcbiAgdGVtcGxhdGU6ICc8ZGl2IGNsYXNzPVwidG9vbHRpcFwiIHJvbGU9XCJ0b29sdGlwXCI+JyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cInRvb2x0aXAtYXJyb3dcIj48L2Rpdj4nICtcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwidG9vbHRpcC1pbm5lclwiPjwvZGl2PicgK1xuICAgICAgICAgICAgJzwvZGl2PicsXG4gIHRpdGxlOiAnJyxcbiAgdHJpZ2dlcjogJ2hvdmVyIGZvY3VzJ1xufVxuXG5jb25zdCBEZWZhdWx0VHlwZSA9IHtcbiAgYWxsb3dMaXN0OiAnb2JqZWN0JyxcbiAgYW5pbWF0aW9uOiAnYm9vbGVhbicsXG4gIGJvdW5kYXJ5OiAnKHN0cmluZ3xlbGVtZW50KScsXG4gIGNvbnRhaW5lcjogJyhzdHJpbmd8ZWxlbWVudHxib29sZWFuKScsXG4gIGN1c3RvbUNsYXNzOiAnKHN0cmluZ3xmdW5jdGlvbiknLFxuICBkZWxheTogJyhudW1iZXJ8b2JqZWN0KScsXG4gIGZhbGxiYWNrUGxhY2VtZW50czogJ2FycmF5JyxcbiAgaHRtbDogJ2Jvb2xlYW4nLFxuICBvZmZzZXQ6ICcoYXJyYXl8c3RyaW5nfGZ1bmN0aW9uKScsXG4gIHBsYWNlbWVudDogJyhzdHJpbmd8ZnVuY3Rpb24pJyxcbiAgcG9wcGVyQ29uZmlnOiAnKG51bGx8b2JqZWN0fGZ1bmN0aW9uKScsXG4gIHNhbml0aXplOiAnYm9vbGVhbicsXG4gIHNhbml0aXplRm46ICcobnVsbHxmdW5jdGlvbiknLFxuICBzZWxlY3RvcjogJyhzdHJpbmd8Ym9vbGVhbiknLFxuICB0ZW1wbGF0ZTogJ3N0cmluZycsXG4gIHRpdGxlOiAnKHN0cmluZ3xlbGVtZW50fGZ1bmN0aW9uKScsXG4gIHRyaWdnZXI6ICdzdHJpbmcnXG59XG5cbi8qKlxuICogQ2xhc3MgZGVmaW5pdGlvblxuICovXG5cbmNsYXNzIFRvb2x0aXAgZXh0ZW5kcyBCYXNlQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IoZWxlbWVudCwgY29uZmlnKSB7XG4gICAgaWYgKHR5cGVvZiBQb3BwZXIgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdCb290c3RyYXBcXCdzIHRvb2x0aXBzIHJlcXVpcmUgUG9wcGVyIChodHRwczovL3BvcHBlci5qcy5vcmcpJylcbiAgICB9XG5cbiAgICBzdXBlcihlbGVtZW50LCBjb25maWcpXG5cbiAgICAvLyBQcml2YXRlXG4gICAgdGhpcy5faXNFbmFibGVkID0gdHJ1ZVxuICAgIHRoaXMuX3RpbWVvdXQgPSAwXG4gICAgdGhpcy5faXNIb3ZlcmVkID0gbnVsbFxuICAgIHRoaXMuX2FjdGl2ZVRyaWdnZXIgPSB7fVxuICAgIHRoaXMuX3BvcHBlciA9IG51bGxcbiAgICB0aGlzLl90ZW1wbGF0ZUZhY3RvcnkgPSBudWxsXG4gICAgdGhpcy5fbmV3Q29udGVudCA9IG51bGxcblxuICAgIC8vIFByb3RlY3RlZFxuICAgIHRoaXMudGlwID0gbnVsbFxuXG4gICAgdGhpcy5fc2V0TGlzdGVuZXJzKClcblxuICAgIGlmICghdGhpcy5fY29uZmlnLnNlbGVjdG9yKSB7XG4gICAgICB0aGlzLl9maXhUaXRsZSgpXG4gICAgfVxuICB9XG5cbiAgLy8gR2V0dGVyc1xuICBzdGF0aWMgZ2V0IERlZmF1bHQoKSB7XG4gICAgcmV0dXJuIERlZmF1bHRcbiAgfVxuXG4gIHN0YXRpYyBnZXQgRGVmYXVsdFR5cGUoKSB7XG4gICAgcmV0dXJuIERlZmF1bHRUeXBlXG4gIH1cblxuICBzdGF0aWMgZ2V0IE5BTUUoKSB7XG4gICAgcmV0dXJuIE5BTUVcbiAgfVxuXG4gIC8vIFB1YmxpY1xuICBlbmFibGUoKSB7XG4gICAgdGhpcy5faXNFbmFibGVkID0gdHJ1ZVxuICB9XG5cbiAgZGlzYWJsZSgpIHtcbiAgICB0aGlzLl9pc0VuYWJsZWQgPSBmYWxzZVxuICB9XG5cbiAgdG9nZ2xlRW5hYmxlZCgpIHtcbiAgICB0aGlzLl9pc0VuYWJsZWQgPSAhdGhpcy5faXNFbmFibGVkXG4gIH1cblxuICB0b2dnbGUoKSB7XG4gICAgaWYgKCF0aGlzLl9pc0VuYWJsZWQpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHRoaXMuX2FjdGl2ZVRyaWdnZXIuY2xpY2sgPSAhdGhpcy5fYWN0aXZlVHJpZ2dlci5jbGlja1xuICAgIGlmICh0aGlzLl9pc1Nob3duKCkpIHtcbiAgICAgIHRoaXMuX2xlYXZlKClcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHRoaXMuX2VudGVyKClcbiAgfVxuXG4gIGRpc3Bvc2UoKSB7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMuX3RpbWVvdXQpXG5cbiAgICBFdmVudEhhbmRsZXIub2ZmKHRoaXMuX2VsZW1lbnQuY2xvc2VzdChTRUxFQ1RPUl9NT0RBTCksIEVWRU5UX01PREFMX0hJREUsIHRoaXMuX2hpZGVNb2RhbEhhbmRsZXIpXG5cbiAgICBpZiAodGhpcy5fZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtYnMtb3JpZ2luYWwtdGl0bGUnKSkge1xuICAgICAgdGhpcy5fZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgdGhpcy5fZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtYnMtb3JpZ2luYWwtdGl0bGUnKSlcbiAgICB9XG5cbiAgICB0aGlzLl9kaXNwb3NlUG9wcGVyKClcbiAgICBzdXBlci5kaXNwb3NlKClcbiAgfVxuXG4gIHNob3coKSB7XG4gICAgaWYgKHRoaXMuX2VsZW1lbnQuc3R5bGUuZGlzcGxheSA9PT0gJ25vbmUnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BsZWFzZSB1c2Ugc2hvdyBvbiB2aXNpYmxlIGVsZW1lbnRzJylcbiAgICB9XG5cbiAgICBpZiAoISh0aGlzLl9pc1dpdGhDb250ZW50KCkgJiYgdGhpcy5faXNFbmFibGVkKSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY29uc3Qgc2hvd0V2ZW50ID0gRXZlbnRIYW5kbGVyLnRyaWdnZXIodGhpcy5fZWxlbWVudCwgdGhpcy5jb25zdHJ1Y3Rvci5ldmVudE5hbWUoRVZFTlRfU0hPVykpXG4gICAgY29uc3Qgc2hhZG93Um9vdCA9IGZpbmRTaGFkb3dSb290KHRoaXMuX2VsZW1lbnQpXG4gICAgY29uc3QgaXNJblRoZURvbSA9IChzaGFkb3dSb290IHx8IHRoaXMuX2VsZW1lbnQub3duZXJEb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpLmNvbnRhaW5zKHRoaXMuX2VsZW1lbnQpXG5cbiAgICBpZiAoc2hvd0V2ZW50LmRlZmF1bHRQcmV2ZW50ZWQgfHwgIWlzSW5UaGVEb20pIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIC8vIFRPRE86IHY2IHJlbW92ZSB0aGlzIG9yIG1ha2UgaXQgb3B0aW9uYWxcbiAgICB0aGlzLl9kaXNwb3NlUG9wcGVyKClcblxuICAgIGNvbnN0IHRpcCA9IHRoaXMuX2dldFRpcEVsZW1lbnQoKVxuXG4gICAgdGhpcy5fZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtZGVzY3JpYmVkYnknLCB0aXAuZ2V0QXR0cmlidXRlKCdpZCcpKVxuXG4gICAgY29uc3QgeyBjb250YWluZXIgfSA9IHRoaXMuX2NvbmZpZ1xuXG4gICAgaWYgKCF0aGlzLl9lbGVtZW50Lm93bmVyRG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNvbnRhaW5zKHRoaXMudGlwKSkge1xuICAgICAgY29udGFpbmVyLmFwcGVuZCh0aXApXG4gICAgICBFdmVudEhhbmRsZXIudHJpZ2dlcih0aGlzLl9lbGVtZW50LCB0aGlzLmNvbnN0cnVjdG9yLmV2ZW50TmFtZShFVkVOVF9JTlNFUlRFRCkpXG4gICAgfVxuXG4gICAgdGhpcy5fcG9wcGVyID0gdGhpcy5fY3JlYXRlUG9wcGVyKHRpcClcblxuICAgIHRpcC5jbGFzc0xpc3QuYWRkKENMQVNTX05BTUVfU0hPVylcblxuICAgIC8vIElmIHRoaXMgaXMgYSB0b3VjaC1lbmFibGVkIGRldmljZSB3ZSBhZGQgZXh0cmFcbiAgICAvLyBlbXB0eSBtb3VzZW92ZXIgbGlzdGVuZXJzIHRvIHRoZSBib2R5J3MgaW1tZWRpYXRlIGNoaWxkcmVuO1xuICAgIC8vIG9ubHkgbmVlZGVkIGJlY2F1c2Ugb2YgYnJva2VuIGV2ZW50IGRlbGVnYXRpb24gb24gaU9TXG4gICAgLy8gaHR0cHM6Ly93d3cucXVpcmtzbW9kZS5vcmcvYmxvZy9hcmNoaXZlcy8yMDE0LzAyL21vdXNlX2V2ZW50X2J1Yi5odG1sXG4gICAgaWYgKCdvbnRvdWNoc3RhcnQnIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkge1xuICAgICAgZm9yIChjb25zdCBlbGVtZW50IG9mIFtdLmNvbmNhdCguLi5kb2N1bWVudC5ib2R5LmNoaWxkcmVuKSkge1xuICAgICAgICBFdmVudEhhbmRsZXIub24oZWxlbWVudCwgJ21vdXNlb3ZlcicsIG5vb3ApXG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgY29tcGxldGUgPSAoKSA9PiB7XG4gICAgICBFdmVudEhhbmRsZXIudHJpZ2dlcih0aGlzLl9lbGVtZW50LCB0aGlzLmNvbnN0cnVjdG9yLmV2ZW50TmFtZShFVkVOVF9TSE9XTikpXG5cbiAgICAgIGlmICh0aGlzLl9pc0hvdmVyZWQgPT09IGZhbHNlKSB7XG4gICAgICAgIHRoaXMuX2xlYXZlKClcbiAgICAgIH1cblxuICAgICAgdGhpcy5faXNIb3ZlcmVkID0gZmFsc2VcbiAgICB9XG5cbiAgICB0aGlzLl9xdWV1ZUNhbGxiYWNrKGNvbXBsZXRlLCB0aGlzLnRpcCwgdGhpcy5faXNBbmltYXRlZCgpKVxuICB9XG5cbiAgaGlkZSgpIHtcbiAgICBpZiAoIXRoaXMuX2lzU2hvd24oKSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY29uc3QgaGlkZUV2ZW50ID0gRXZlbnRIYW5kbGVyLnRyaWdnZXIodGhpcy5fZWxlbWVudCwgdGhpcy5jb25zdHJ1Y3Rvci5ldmVudE5hbWUoRVZFTlRfSElERSkpXG4gICAgaWYgKGhpZGVFdmVudC5kZWZhdWx0UHJldmVudGVkKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBjb25zdCB0aXAgPSB0aGlzLl9nZXRUaXBFbGVtZW50KClcbiAgICB0aXAuY2xhc3NMaXN0LnJlbW92ZShDTEFTU19OQU1FX1NIT1cpXG5cbiAgICAvLyBJZiB0aGlzIGlzIGEgdG91Y2gtZW5hYmxlZCBkZXZpY2Ugd2UgcmVtb3ZlIHRoZSBleHRyYVxuICAgIC8vIGVtcHR5IG1vdXNlb3ZlciBsaXN0ZW5lcnMgd2UgYWRkZWQgZm9yIGlPUyBzdXBwb3J0XG4gICAgaWYgKCdvbnRvdWNoc3RhcnQnIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkge1xuICAgICAgZm9yIChjb25zdCBlbGVtZW50IG9mIFtdLmNvbmNhdCguLi5kb2N1bWVudC5ib2R5LmNoaWxkcmVuKSkge1xuICAgICAgICBFdmVudEhhbmRsZXIub2ZmKGVsZW1lbnQsICdtb3VzZW92ZXInLCBub29wKVxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuX2FjdGl2ZVRyaWdnZXJbVFJJR0dFUl9DTElDS10gPSBmYWxzZVxuICAgIHRoaXMuX2FjdGl2ZVRyaWdnZXJbVFJJR0dFUl9GT0NVU10gPSBmYWxzZVxuICAgIHRoaXMuX2FjdGl2ZVRyaWdnZXJbVFJJR0dFUl9IT1ZFUl0gPSBmYWxzZVxuICAgIHRoaXMuX2lzSG92ZXJlZCA9IG51bGwgLy8gaXQgaXMgYSB0cmljayB0byBzdXBwb3J0IG1hbnVhbCB0cmlnZ2VyaW5nXG5cbiAgICBjb25zdCBjb21wbGV0ZSA9ICgpID0+IHtcbiAgICAgIGlmICh0aGlzLl9pc1dpdGhBY3RpdmVUcmlnZ2VyKCkpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGlmICghdGhpcy5faXNIb3ZlcmVkKSB7XG4gICAgICAgIHRoaXMuX2Rpc3Bvc2VQb3BwZXIoKVxuICAgICAgfVxuXG4gICAgICB0aGlzLl9lbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgnYXJpYS1kZXNjcmliZWRieScpXG4gICAgICBFdmVudEhhbmRsZXIudHJpZ2dlcih0aGlzLl9lbGVtZW50LCB0aGlzLmNvbnN0cnVjdG9yLmV2ZW50TmFtZShFVkVOVF9ISURERU4pKVxuICAgIH1cblxuICAgIHRoaXMuX3F1ZXVlQ2FsbGJhY2soY29tcGxldGUsIHRoaXMudGlwLCB0aGlzLl9pc0FuaW1hdGVkKCkpXG4gIH1cblxuICB1cGRhdGUoKSB7XG4gICAgaWYgKHRoaXMuX3BvcHBlcikge1xuICAgICAgdGhpcy5fcG9wcGVyLnVwZGF0ZSgpXG4gICAgfVxuICB9XG5cbiAgLy8gUHJvdGVjdGVkXG4gIF9pc1dpdGhDb250ZW50KCkge1xuICAgIHJldHVybiBCb29sZWFuKHRoaXMuX2dldFRpdGxlKCkpXG4gIH1cblxuICBfZ2V0VGlwRWxlbWVudCgpIHtcbiAgICBpZiAoIXRoaXMudGlwKSB7XG4gICAgICB0aGlzLnRpcCA9IHRoaXMuX2NyZWF0ZVRpcEVsZW1lbnQodGhpcy5fbmV3Q29udGVudCB8fCB0aGlzLl9nZXRDb250ZW50Rm9yVGVtcGxhdGUoKSlcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy50aXBcbiAgfVxuXG4gIF9jcmVhdGVUaXBFbGVtZW50KGNvbnRlbnQpIHtcbiAgICBjb25zdCB0aXAgPSB0aGlzLl9nZXRUZW1wbGF0ZUZhY3RvcnkoY29udGVudCkudG9IdG1sKClcblxuICAgIC8vIFRPRE86IHJlbW92ZSB0aGlzIGNoZWNrIGluIHY2XG4gICAgaWYgKCF0aXApIHtcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuXG4gICAgdGlwLmNsYXNzTGlzdC5yZW1vdmUoQ0xBU1NfTkFNRV9GQURFLCBDTEFTU19OQU1FX1NIT1cpXG4gICAgLy8gVE9ETzogdjYgdGhlIGZvbGxvd2luZyBjYW4gYmUgYWNoaWV2ZWQgd2l0aCBDU1Mgb25seVxuICAgIHRpcC5jbGFzc0xpc3QuYWRkKGBicy0ke3RoaXMuY29uc3RydWN0b3IuTkFNRX0tYXV0b2ApXG5cbiAgICBjb25zdCB0aXBJZCA9IGdldFVJRCh0aGlzLmNvbnN0cnVjdG9yLk5BTUUpLnRvU3RyaW5nKClcblxuICAgIHRpcC5zZXRBdHRyaWJ1dGUoJ2lkJywgdGlwSWQpXG5cbiAgICBpZiAodGhpcy5faXNBbmltYXRlZCgpKSB7XG4gICAgICB0aXAuY2xhc3NMaXN0LmFkZChDTEFTU19OQU1FX0ZBREUpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRpcFxuICB9XG5cbiAgc2V0Q29udGVudChjb250ZW50KSB7XG4gICAgdGhpcy5fbmV3Q29udGVudCA9IGNvbnRlbnRcbiAgICBpZiAodGhpcy5faXNTaG93bigpKSB7XG4gICAgICB0aGlzLl9kaXNwb3NlUG9wcGVyKClcbiAgICAgIHRoaXMuc2hvdygpXG4gICAgfVxuICB9XG5cbiAgX2dldFRlbXBsYXRlRmFjdG9yeShjb250ZW50KSB7XG4gICAgaWYgKHRoaXMuX3RlbXBsYXRlRmFjdG9yeSkge1xuICAgICAgdGhpcy5fdGVtcGxhdGVGYWN0b3J5LmNoYW5nZUNvbnRlbnQoY29udGVudClcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fdGVtcGxhdGVGYWN0b3J5ID0gbmV3IFRlbXBsYXRlRmFjdG9yeSh7XG4gICAgICAgIC4uLnRoaXMuX2NvbmZpZyxcbiAgICAgICAgLy8gdGhlIGBjb250ZW50YCB2YXIgaGFzIHRvIGJlIGFmdGVyIGB0aGlzLl9jb25maWdgXG4gICAgICAgIC8vIHRvIG92ZXJyaWRlIGNvbmZpZy5jb250ZW50IGluIGNhc2Ugb2YgcG9wb3ZlclxuICAgICAgICBjb250ZW50LFxuICAgICAgICBleHRyYUNsYXNzOiB0aGlzLl9yZXNvbHZlUG9zc2libGVGdW5jdGlvbih0aGlzLl9jb25maWcuY3VzdG9tQ2xhc3MpXG4gICAgICB9KVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl90ZW1wbGF0ZUZhY3RvcnlcbiAgfVxuXG4gIF9nZXRDb250ZW50Rm9yVGVtcGxhdGUoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIFtTRUxFQ1RPUl9UT09MVElQX0lOTkVSXTogdGhpcy5fZ2V0VGl0bGUoKVxuICAgIH1cbiAgfVxuXG4gIF9nZXRUaXRsZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fcmVzb2x2ZVBvc3NpYmxlRnVuY3Rpb24odGhpcy5fY29uZmlnLnRpdGxlKSB8fCB0aGlzLl9lbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1icy1vcmlnaW5hbC10aXRsZScpXG4gIH1cblxuICAvLyBQcml2YXRlXG4gIF9pbml0aWFsaXplT25EZWxlZ2F0ZWRUYXJnZXQoZXZlbnQpIHtcbiAgICByZXR1cm4gdGhpcy5jb25zdHJ1Y3Rvci5nZXRPckNyZWF0ZUluc3RhbmNlKGV2ZW50LmRlbGVnYXRlVGFyZ2V0LCB0aGlzLl9nZXREZWxlZ2F0ZUNvbmZpZygpKVxuICB9XG5cbiAgX2lzQW5pbWF0ZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5hbmltYXRpb24gfHwgKHRoaXMudGlwICYmIHRoaXMudGlwLmNsYXNzTGlzdC5jb250YWlucyhDTEFTU19OQU1FX0ZBREUpKVxuICB9XG5cbiAgX2lzU2hvd24oKSB7XG4gICAgcmV0dXJuIHRoaXMudGlwICYmIHRoaXMudGlwLmNsYXNzTGlzdC5jb250YWlucyhDTEFTU19OQU1FX1NIT1cpXG4gIH1cblxuICBfY3JlYXRlUG9wcGVyKHRpcCkge1xuICAgIGNvbnN0IHBsYWNlbWVudCA9IGV4ZWN1dGUodGhpcy5fY29uZmlnLnBsYWNlbWVudCwgW3RoaXMsIHRpcCwgdGhpcy5fZWxlbWVudF0pXG4gICAgY29uc3QgYXR0YWNobWVudCA9IEF0dGFjaG1lbnRNYXBbcGxhY2VtZW50LnRvVXBwZXJDYXNlKCldXG4gICAgcmV0dXJuIFBvcHBlci5jcmVhdGVQb3BwZXIodGhpcy5fZWxlbWVudCwgdGlwLCB0aGlzLl9nZXRQb3BwZXJDb25maWcoYXR0YWNobWVudCkpXG4gIH1cblxuICBfZ2V0T2Zmc2V0KCkge1xuICAgIGNvbnN0IHsgb2Zmc2V0IH0gPSB0aGlzLl9jb25maWdcblxuICAgIGlmICh0eXBlb2Ygb2Zmc2V0ID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIG9mZnNldC5zcGxpdCgnLCcpLm1hcCh2YWx1ZSA9PiBOdW1iZXIucGFyc2VJbnQodmFsdWUsIDEwKSlcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIG9mZnNldCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIHBvcHBlckRhdGEgPT4gb2Zmc2V0KHBvcHBlckRhdGEsIHRoaXMuX2VsZW1lbnQpXG4gICAgfVxuXG4gICAgcmV0dXJuIG9mZnNldFxuICB9XG5cbiAgX3Jlc29sdmVQb3NzaWJsZUZ1bmN0aW9uKGFyZykge1xuICAgIHJldHVybiBleGVjdXRlKGFyZywgW3RoaXMuX2VsZW1lbnRdKVxuICB9XG5cbiAgX2dldFBvcHBlckNvbmZpZyhhdHRhY2htZW50KSB7XG4gICAgY29uc3QgZGVmYXVsdEJzUG9wcGVyQ29uZmlnID0ge1xuICAgICAgcGxhY2VtZW50OiBhdHRhY2htZW50LFxuICAgICAgbW9kaWZpZXJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiAnZmxpcCcsXG4gICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgZmFsbGJhY2tQbGFjZW1lbnRzOiB0aGlzLl9jb25maWcuZmFsbGJhY2tQbGFjZW1lbnRzXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogJ29mZnNldCcsXG4gICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgb2Zmc2V0OiB0aGlzLl9nZXRPZmZzZXQoKVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6ICdwcmV2ZW50T3ZlcmZsb3cnLFxuICAgICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgIGJvdW5kYXJ5OiB0aGlzLl9jb25maWcuYm91bmRhcnlcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiAnYXJyb3cnLFxuICAgICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgIGVsZW1lbnQ6IGAuJHt0aGlzLmNvbnN0cnVjdG9yLk5BTUV9LWFycm93YFxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6ICdwcmVTZXRQbGFjZW1lbnQnLFxuICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgICAgICAgcGhhc2U6ICdiZWZvcmVNYWluJyxcbiAgICAgICAgICBmbjogZGF0YSA9PiB7XG4gICAgICAgICAgICAvLyBQcmUtc2V0IFBvcHBlcidzIHBsYWNlbWVudCBhdHRyaWJ1dGUgaW4gb3JkZXIgdG8gcmVhZCB0aGUgYXJyb3cgc2l6ZXMgcHJvcGVybHkuXG4gICAgICAgICAgICAvLyBPdGhlcndpc2UsIFBvcHBlciBtaXhlcyB1cCB0aGUgd2lkdGggYW5kIGhlaWdodCBkaW1lbnNpb25zIHNpbmNlIHRoZSBpbml0aWFsIGFycm93IHN0eWxlIGlzIGZvciB0b3AgcGxhY2VtZW50XG4gICAgICAgICAgICB0aGlzLl9nZXRUaXBFbGVtZW50KCkuc2V0QXR0cmlidXRlKCdkYXRhLXBvcHBlci1wbGFjZW1lbnQnLCBkYXRhLnN0YXRlLnBsYWNlbWVudClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgLi4uZGVmYXVsdEJzUG9wcGVyQ29uZmlnLFxuICAgICAgLi4uZXhlY3V0ZSh0aGlzLl9jb25maWcucG9wcGVyQ29uZmlnLCBbZGVmYXVsdEJzUG9wcGVyQ29uZmlnXSlcbiAgICB9XG4gIH1cblxuICBfc2V0TGlzdGVuZXJzKCkge1xuICAgIGNvbnN0IHRyaWdnZXJzID0gdGhpcy5fY29uZmlnLnRyaWdnZXIuc3BsaXQoJyAnKVxuXG4gICAgZm9yIChjb25zdCB0cmlnZ2VyIG9mIHRyaWdnZXJzKSB7XG4gICAgICBpZiAodHJpZ2dlciA9PT0gJ2NsaWNrJykge1xuICAgICAgICBFdmVudEhhbmRsZXIub24odGhpcy5fZWxlbWVudCwgdGhpcy5jb25zdHJ1Y3Rvci5ldmVudE5hbWUoRVZFTlRfQ0xJQ0spLCB0aGlzLl9jb25maWcuc2VsZWN0b3IsIGV2ZW50ID0+IHtcbiAgICAgICAgICBjb25zdCBjb250ZXh0ID0gdGhpcy5faW5pdGlhbGl6ZU9uRGVsZWdhdGVkVGFyZ2V0KGV2ZW50KVxuICAgICAgICAgIGNvbnRleHQudG9nZ2xlKClcbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSBpZiAodHJpZ2dlciAhPT0gVFJJR0dFUl9NQU5VQUwpIHtcbiAgICAgICAgY29uc3QgZXZlbnRJbiA9IHRyaWdnZXIgPT09IFRSSUdHRVJfSE9WRVIgP1xuICAgICAgICAgIHRoaXMuY29uc3RydWN0b3IuZXZlbnROYW1lKEVWRU5UX01PVVNFRU5URVIpIDpcbiAgICAgICAgICB0aGlzLmNvbnN0cnVjdG9yLmV2ZW50TmFtZShFVkVOVF9GT0NVU0lOKVxuICAgICAgICBjb25zdCBldmVudE91dCA9IHRyaWdnZXIgPT09IFRSSUdHRVJfSE9WRVIgP1xuICAgICAgICAgIHRoaXMuY29uc3RydWN0b3IuZXZlbnROYW1lKEVWRU5UX01PVVNFTEVBVkUpIDpcbiAgICAgICAgICB0aGlzLmNvbnN0cnVjdG9yLmV2ZW50TmFtZShFVkVOVF9GT0NVU09VVClcblxuICAgICAgICBFdmVudEhhbmRsZXIub24odGhpcy5fZWxlbWVudCwgZXZlbnRJbiwgdGhpcy5fY29uZmlnLnNlbGVjdG9yLCBldmVudCA9PiB7XG4gICAgICAgICAgY29uc3QgY29udGV4dCA9IHRoaXMuX2luaXRpYWxpemVPbkRlbGVnYXRlZFRhcmdldChldmVudClcbiAgICAgICAgICBjb250ZXh0Ll9hY3RpdmVUcmlnZ2VyW2V2ZW50LnR5cGUgPT09ICdmb2N1c2luJyA/IFRSSUdHRVJfRk9DVVMgOiBUUklHR0VSX0hPVkVSXSA9IHRydWVcbiAgICAgICAgICBjb250ZXh0Ll9lbnRlcigpXG4gICAgICAgIH0pXG4gICAgICAgIEV2ZW50SGFuZGxlci5vbih0aGlzLl9lbGVtZW50LCBldmVudE91dCwgdGhpcy5fY29uZmlnLnNlbGVjdG9yLCBldmVudCA9PiB7XG4gICAgICAgICAgY29uc3QgY29udGV4dCA9IHRoaXMuX2luaXRpYWxpemVPbkRlbGVnYXRlZFRhcmdldChldmVudClcbiAgICAgICAgICBjb250ZXh0Ll9hY3RpdmVUcmlnZ2VyW2V2ZW50LnR5cGUgPT09ICdmb2N1c291dCcgPyBUUklHR0VSX0ZPQ1VTIDogVFJJR0dFUl9IT1ZFUl0gPVxuICAgICAgICAgICAgY29udGV4dC5fZWxlbWVudC5jb250YWlucyhldmVudC5yZWxhdGVkVGFyZ2V0KVxuXG4gICAgICAgICAgY29udGV4dC5fbGVhdmUoKVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuX2hpZGVNb2RhbEhhbmRsZXIgPSAoKSA9PiB7XG4gICAgICBpZiAodGhpcy5fZWxlbWVudCkge1xuICAgICAgICB0aGlzLmhpZGUoKVxuICAgICAgfVxuICAgIH1cblxuICAgIEV2ZW50SGFuZGxlci5vbih0aGlzLl9lbGVtZW50LmNsb3Nlc3QoU0VMRUNUT1JfTU9EQUwpLCBFVkVOVF9NT0RBTF9ISURFLCB0aGlzLl9oaWRlTW9kYWxIYW5kbGVyKVxuICB9XG5cbiAgX2ZpeFRpdGxlKCkge1xuICAgIGNvbnN0IHRpdGxlID0gdGhpcy5fZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ3RpdGxlJylcblxuICAgIGlmICghdGl0bGUpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGlmICghdGhpcy5fZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnKSAmJiAhdGhpcy5fZWxlbWVudC50ZXh0Q29udGVudC50cmltKCkpIHtcbiAgICAgIHRoaXMuX2VsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgdGl0bGUpXG4gICAgfVxuXG4gICAgdGhpcy5fZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2RhdGEtYnMtb3JpZ2luYWwtdGl0bGUnLCB0aXRsZSkgLy8gRE8gTk9UIFVTRSBJVC4gSXMgb25seSBmb3IgYmFja3dhcmRzIGNvbXBhdGliaWxpdHlcbiAgICB0aGlzLl9lbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgndGl0bGUnKVxuICB9XG5cbiAgX2VudGVyKCkge1xuICAgIGlmICh0aGlzLl9pc1Nob3duKCkgfHwgdGhpcy5faXNIb3ZlcmVkKSB7XG4gICAgICB0aGlzLl9pc0hvdmVyZWQgPSB0cnVlXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICB0aGlzLl9pc0hvdmVyZWQgPSB0cnVlXG5cbiAgICB0aGlzLl9zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGlmICh0aGlzLl9pc0hvdmVyZWQpIHtcbiAgICAgICAgdGhpcy5zaG93KClcbiAgICAgIH1cbiAgICB9LCB0aGlzLl9jb25maWcuZGVsYXkuc2hvdylcbiAgfVxuXG4gIF9sZWF2ZSgpIHtcbiAgICBpZiAodGhpcy5faXNXaXRoQWN0aXZlVHJpZ2dlcigpKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICB0aGlzLl9pc0hvdmVyZWQgPSBmYWxzZVxuXG4gICAgdGhpcy5fc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBpZiAoIXRoaXMuX2lzSG92ZXJlZCkge1xuICAgICAgICB0aGlzLmhpZGUoKVxuICAgICAgfVxuICAgIH0sIHRoaXMuX2NvbmZpZy5kZWxheS5oaWRlKVxuICB9XG5cbiAgX3NldFRpbWVvdXQoaGFuZGxlciwgdGltZW91dCkge1xuICAgIGNsZWFyVGltZW91dCh0aGlzLl90aW1lb3V0KVxuICAgIHRoaXMuX3RpbWVvdXQgPSBzZXRUaW1lb3V0KGhhbmRsZXIsIHRpbWVvdXQpXG4gIH1cblxuICBfaXNXaXRoQWN0aXZlVHJpZ2dlcigpIHtcbiAgICByZXR1cm4gT2JqZWN0LnZhbHVlcyh0aGlzLl9hY3RpdmVUcmlnZ2VyKS5pbmNsdWRlcyh0cnVlKVxuICB9XG5cbiAgX2dldENvbmZpZyhjb25maWcpIHtcbiAgICBjb25zdCBkYXRhQXR0cmlidXRlcyA9IE1hbmlwdWxhdG9yLmdldERhdGFBdHRyaWJ1dGVzKHRoaXMuX2VsZW1lbnQpXG5cbiAgICBmb3IgKGNvbnN0IGRhdGFBdHRyaWJ1dGUgb2YgT2JqZWN0LmtleXMoZGF0YUF0dHJpYnV0ZXMpKSB7XG4gICAgICBpZiAoRElTQUxMT1dFRF9BVFRSSUJVVEVTLmhhcyhkYXRhQXR0cmlidXRlKSkge1xuICAgICAgICBkZWxldGUgZGF0YUF0dHJpYnV0ZXNbZGF0YUF0dHJpYnV0ZV1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25maWcgPSB7XG4gICAgICAuLi5kYXRhQXR0cmlidXRlcyxcbiAgICAgIC4uLih0eXBlb2YgY29uZmlnID09PSAnb2JqZWN0JyAmJiBjb25maWcgPyBjb25maWcgOiB7fSlcbiAgICB9XG4gICAgY29uZmlnID0gdGhpcy5fbWVyZ2VDb25maWdPYmooY29uZmlnKVxuICAgIGNvbmZpZyA9IHRoaXMuX2NvbmZpZ0FmdGVyTWVyZ2UoY29uZmlnKVxuICAgIHRoaXMuX3R5cGVDaGVja0NvbmZpZyhjb25maWcpXG4gICAgcmV0dXJuIGNvbmZpZ1xuICB9XG5cbiAgX2NvbmZpZ0FmdGVyTWVyZ2UoY29uZmlnKSB7XG4gICAgY29uZmlnLmNvbnRhaW5lciA9IGNvbmZpZy5jb250YWluZXIgPT09IGZhbHNlID8gZG9jdW1lbnQuYm9keSA6IGdldEVsZW1lbnQoY29uZmlnLmNvbnRhaW5lcilcblxuICAgIGlmICh0eXBlb2YgY29uZmlnLmRlbGF5ID09PSAnbnVtYmVyJykge1xuICAgICAgY29uZmlnLmRlbGF5ID0ge1xuICAgICAgICBzaG93OiBjb25maWcuZGVsYXksXG4gICAgICAgIGhpZGU6IGNvbmZpZy5kZWxheVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0eXBlb2YgY29uZmlnLnRpdGxlID09PSAnbnVtYmVyJykge1xuICAgICAgY29uZmlnLnRpdGxlID0gY29uZmlnLnRpdGxlLnRvU3RyaW5nKClcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGNvbmZpZy5jb250ZW50ID09PSAnbnVtYmVyJykge1xuICAgICAgY29uZmlnLmNvbnRlbnQgPSBjb25maWcuY29udGVudC50b1N0cmluZygpXG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbmZpZ1xuICB9XG5cbiAgX2dldERlbGVnYXRlQ29uZmlnKCkge1xuICAgIGNvbnN0IGNvbmZpZyA9IHt9XG5cbiAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyh0aGlzLl9jb25maWcpKSB7XG4gICAgICBpZiAodGhpcy5jb25zdHJ1Y3Rvci5EZWZhdWx0W2tleV0gIT09IHZhbHVlKSB7XG4gICAgICAgIGNvbmZpZ1trZXldID0gdmFsdWVcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25maWcuc2VsZWN0b3IgPSBmYWxzZVxuICAgIGNvbmZpZy50cmlnZ2VyID0gJ21hbnVhbCdcblxuICAgIC8vIEluIHRoZSBmdXR1cmUgY2FuIGJlIHJlcGxhY2VkIHdpdGg6XG4gICAgLy8gY29uc3Qga2V5c1dpdGhEaWZmZXJlbnRWYWx1ZXMgPSBPYmplY3QuZW50cmllcyh0aGlzLl9jb25maWcpLmZpbHRlcihlbnRyeSA9PiB0aGlzLmNvbnN0cnVjdG9yLkRlZmF1bHRbZW50cnlbMF1dICE9PSB0aGlzLl9jb25maWdbZW50cnlbMF1dKVxuICAgIC8vIGBPYmplY3QuZnJvbUVudHJpZXMoa2V5c1dpdGhEaWZmZXJlbnRWYWx1ZXMpYFxuICAgIHJldHVybiBjb25maWdcbiAgfVxuXG4gIF9kaXNwb3NlUG9wcGVyKCkge1xuICAgIGlmICh0aGlzLl9wb3BwZXIpIHtcbiAgICAgIHRoaXMuX3BvcHBlci5kZXN0cm95KClcbiAgICAgIHRoaXMuX3BvcHBlciA9IG51bGxcbiAgICB9XG5cbiAgICBpZiAodGhpcy50aXApIHtcbiAgICAgIHRoaXMudGlwLnJlbW92ZSgpXG4gICAgICB0aGlzLnRpcCA9IG51bGxcbiAgICB9XG4gIH1cblxuICAvLyBTdGF0aWNcbiAgc3RhdGljIGpRdWVyeUludGVyZmFjZShjb25maWcpIHtcbiAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnN0IGRhdGEgPSBUb29sdGlwLmdldE9yQ3JlYXRlSW5zdGFuY2UodGhpcywgY29uZmlnKVxuXG4gICAgICBpZiAodHlwZW9mIGNvbmZpZyAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgZGF0YVtjb25maWddID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBObyBtZXRob2QgbmFtZWQgXCIke2NvbmZpZ31cImApXG4gICAgICB9XG5cbiAgICAgIGRhdGFbY29uZmlnXSgpXG4gICAgfSlcbiAgfVxufVxuXG4vKipcbiAqIGpRdWVyeVxuICovXG5cbmRlZmluZUpRdWVyeVBsdWdpbihUb29sdGlwKVxuXG5leHBvcnQgZGVmYXVsdCBUb29sdGlwXG4iLCAiLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQm9vdHN0cmFwIHV0aWwvc2FuaXRpemVyLmpzXG4gKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21haW4vTElDRU5TRSlcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuLy8ganMtZG9jcy1zdGFydCBhbGxvdy1saXN0XG5jb25zdCBBUklBX0FUVFJJQlVURV9QQVRURVJOID0gL15hcmlhLVtcXHctXSokL2lcblxuZXhwb3J0IGNvbnN0IERlZmF1bHRBbGxvd2xpc3QgPSB7XG4gIC8vIEdsb2JhbCBhdHRyaWJ1dGVzIGFsbG93ZWQgb24gYW55IHN1cHBsaWVkIGVsZW1lbnQgYmVsb3cuXG4gICcqJzogWydjbGFzcycsICdkaXInLCAnaWQnLCAnbGFuZycsICdyb2xlJywgQVJJQV9BVFRSSUJVVEVfUEFUVEVSTl0sXG4gIGE6IFsndGFyZ2V0JywgJ2hyZWYnLCAndGl0bGUnLCAncmVsJ10sXG4gIGFyZWE6IFtdLFxuICBiOiBbXSxcbiAgYnI6IFtdLFxuICBjb2w6IFtdLFxuICBjb2RlOiBbXSxcbiAgZGl2OiBbXSxcbiAgZW06IFtdLFxuICBocjogW10sXG4gIGgxOiBbXSxcbiAgaDI6IFtdLFxuICBoMzogW10sXG4gIGg0OiBbXSxcbiAgaDU6IFtdLFxuICBoNjogW10sXG4gIGk6IFtdLFxuICBpbWc6IFsnc3JjJywgJ3NyY3NldCcsICdhbHQnLCAndGl0bGUnLCAnd2lkdGgnLCAnaGVpZ2h0J10sXG4gIGxpOiBbXSxcbiAgb2w6IFtdLFxuICBwOiBbXSxcbiAgcHJlOiBbXSxcbiAgczogW10sXG4gIHNtYWxsOiBbXSxcbiAgc3BhbjogW10sXG4gIHN1YjogW10sXG4gIHN1cDogW10sXG4gIHN0cm9uZzogW10sXG4gIHU6IFtdLFxuICB1bDogW11cbn1cbi8vIGpzLWRvY3MtZW5kIGFsbG93LWxpc3RcblxuY29uc3QgdXJpQXR0cmlidXRlcyA9IG5ldyBTZXQoW1xuICAnYmFja2dyb3VuZCcsXG4gICdjaXRlJyxcbiAgJ2hyZWYnLFxuICAnaXRlbXR5cGUnLFxuICAnbG9uZ2Rlc2MnLFxuICAncG9zdGVyJyxcbiAgJ3NyYycsXG4gICd4bGluazpocmVmJ1xuXSlcblxuLyoqXG4gKiBBIHBhdHRlcm4gdGhhdCByZWNvZ25pemVzIFVSTHMgdGhhdCBhcmUgc2FmZSB3cnQuIFhTUyBpbiBVUkwgbmF2aWdhdGlvblxuICogY29udGV4dHMuXG4gKlxuICogU2hvdXQtb3V0IHRvIEFuZ3VsYXIgaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9ibG9iLzE1LjIuOC9wYWNrYWdlcy9jb3JlL3NyYy9zYW5pdGl6YXRpb24vdXJsX3Nhbml0aXplci50cyNMMzhcbiAqL1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHVuaWNvcm4vYmV0dGVyLXJlZ2V4XG5jb25zdCBTQUZFX1VSTF9QQVRURVJOID0gL14oPyFqYXZhc2NyaXB0OikoPzpbYS16MC05Ky4tXSs6fFteJjovPyNdKig/OlsvPyNdfCQpKS9pXG5cbmNvbnN0IGFsbG93ZWRBdHRyaWJ1dGUgPSAoYXR0cmlidXRlLCBhbGxvd2VkQXR0cmlidXRlTGlzdCkgPT4ge1xuICBjb25zdCBhdHRyaWJ1dGVOYW1lID0gYXR0cmlidXRlLm5vZGVOYW1lLnRvTG93ZXJDYXNlKClcblxuICBpZiAoYWxsb3dlZEF0dHJpYnV0ZUxpc3QuaW5jbHVkZXMoYXR0cmlidXRlTmFtZSkpIHtcbiAgICBpZiAodXJpQXR0cmlidXRlcy5oYXMoYXR0cmlidXRlTmFtZSkpIHtcbiAgICAgIHJldHVybiBCb29sZWFuKFNBRkVfVVJMX1BBVFRFUk4udGVzdChhdHRyaWJ1dGUubm9kZVZhbHVlKSlcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZVxuICB9XG5cbiAgLy8gQ2hlY2sgaWYgYSByZWd1bGFyIGV4cHJlc3Npb24gdmFsaWRhdGVzIHRoZSBhdHRyaWJ1dGUuXG4gIHJldHVybiBhbGxvd2VkQXR0cmlidXRlTGlzdC5maWx0ZXIoYXR0cmlidXRlUmVnZXggPT4gYXR0cmlidXRlUmVnZXggaW5zdGFuY2VvZiBSZWdFeHApXG4gICAgLnNvbWUocmVnZXggPT4gcmVnZXgudGVzdChhdHRyaWJ1dGVOYW1lKSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNhbml0aXplSHRtbCh1bnNhZmVIdG1sLCBhbGxvd0xpc3QsIHNhbml0aXplRnVuY3Rpb24pIHtcbiAgaWYgKCF1bnNhZmVIdG1sLmxlbmd0aCkge1xuICAgIHJldHVybiB1bnNhZmVIdG1sXG4gIH1cblxuICBpZiAoc2FuaXRpemVGdW5jdGlvbiAmJiB0eXBlb2Ygc2FuaXRpemVGdW5jdGlvbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBzYW5pdGl6ZUZ1bmN0aW9uKHVuc2FmZUh0bWwpXG4gIH1cblxuICBjb25zdCBkb21QYXJzZXIgPSBuZXcgd2luZG93LkRPTVBhcnNlcigpXG4gIGNvbnN0IGNyZWF0ZWREb2N1bWVudCA9IGRvbVBhcnNlci5wYXJzZUZyb21TdHJpbmcodW5zYWZlSHRtbCwgJ3RleHQvaHRtbCcpXG4gIGNvbnN0IGVsZW1lbnRzID0gW10uY29uY2F0KC4uLmNyZWF0ZWREb2N1bWVudC5ib2R5LnF1ZXJ5U2VsZWN0b3JBbGwoJyonKSlcblxuICBmb3IgKGNvbnN0IGVsZW1lbnQgb2YgZWxlbWVudHMpIHtcbiAgICBjb25zdCBlbGVtZW50TmFtZSA9IGVsZW1lbnQubm9kZU5hbWUudG9Mb3dlckNhc2UoKVxuXG4gICAgaWYgKCFPYmplY3Qua2V5cyhhbGxvd0xpc3QpLmluY2x1ZGVzKGVsZW1lbnROYW1lKSkge1xuICAgICAgZWxlbWVudC5yZW1vdmUoKVxuICAgICAgY29udGludWVcbiAgICB9XG5cbiAgICBjb25zdCBhdHRyaWJ1dGVMaXN0ID0gW10uY29uY2F0KC4uLmVsZW1lbnQuYXR0cmlidXRlcylcbiAgICBjb25zdCBhbGxvd2VkQXR0cmlidXRlcyA9IFtdLmNvbmNhdChhbGxvd0xpc3RbJyonXSB8fCBbXSwgYWxsb3dMaXN0W2VsZW1lbnROYW1lXSB8fCBbXSlcblxuICAgIGZvciAoY29uc3QgYXR0cmlidXRlIG9mIGF0dHJpYnV0ZUxpc3QpIHtcbiAgICAgIGlmICghYWxsb3dlZEF0dHJpYnV0ZShhdHRyaWJ1dGUsIGFsbG93ZWRBdHRyaWJ1dGVzKSkge1xuICAgICAgICBlbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShhdHRyaWJ1dGUubm9kZU5hbWUpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGNyZWF0ZWREb2N1bWVudC5ib2R5LmlubmVySFRNTFxufVxuIiwgIi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIEJvb3RzdHJhcCB1dGlsL3RlbXBsYXRlLWZhY3RvcnkuanNcbiAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFpbi9MSUNFTlNFKVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG5pbXBvcnQgU2VsZWN0b3JFbmdpbmUgZnJvbSAnLi4vZG9tL3NlbGVjdG9yLWVuZ2luZS5qcydcbmltcG9ydCBDb25maWcgZnJvbSAnLi9jb25maWcuanMnXG5pbXBvcnQgeyBEZWZhdWx0QWxsb3dsaXN0LCBzYW5pdGl6ZUh0bWwgfSBmcm9tICcuL3Nhbml0aXplci5qcydcbmltcG9ydCB7IGV4ZWN1dGUsIGdldEVsZW1lbnQsIGlzRWxlbWVudCB9IGZyb20gJy4vaW5kZXguanMnXG5cbi8qKlxuICogQ29uc3RhbnRzXG4gKi9cblxuY29uc3QgTkFNRSA9ICdUZW1wbGF0ZUZhY3RvcnknXG5cbmNvbnN0IERlZmF1bHQgPSB7XG4gIGFsbG93TGlzdDogRGVmYXVsdEFsbG93bGlzdCxcbiAgY29udGVudDoge30sIC8vIHsgc2VsZWN0b3IgOiB0ZXh0ICwgIHNlbGVjdG9yMiA6IHRleHQyICwgfVxuICBleHRyYUNsYXNzOiAnJyxcbiAgaHRtbDogZmFsc2UsXG4gIHNhbml0aXplOiB0cnVlLFxuICBzYW5pdGl6ZUZuOiBudWxsLFxuICB0ZW1wbGF0ZTogJzxkaXY+PC9kaXY+J1xufVxuXG5jb25zdCBEZWZhdWx0VHlwZSA9IHtcbiAgYWxsb3dMaXN0OiAnb2JqZWN0JyxcbiAgY29udGVudDogJ29iamVjdCcsXG4gIGV4dHJhQ2xhc3M6ICcoc3RyaW5nfGZ1bmN0aW9uKScsXG4gIGh0bWw6ICdib29sZWFuJyxcbiAgc2FuaXRpemU6ICdib29sZWFuJyxcbiAgc2FuaXRpemVGbjogJyhudWxsfGZ1bmN0aW9uKScsXG4gIHRlbXBsYXRlOiAnc3RyaW5nJ1xufVxuXG5jb25zdCBEZWZhdWx0Q29udGVudFR5cGUgPSB7XG4gIGVudHJ5OiAnKHN0cmluZ3xlbGVtZW50fGZ1bmN0aW9ufG51bGwpJyxcbiAgc2VsZWN0b3I6ICcoc3RyaW5nfGVsZW1lbnQpJ1xufVxuXG4vKipcbiAqIENsYXNzIGRlZmluaXRpb25cbiAqL1xuXG5jbGFzcyBUZW1wbGF0ZUZhY3RvcnkgZXh0ZW5kcyBDb25maWcge1xuICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICBzdXBlcigpXG4gICAgdGhpcy5fY29uZmlnID0gdGhpcy5fZ2V0Q29uZmlnKGNvbmZpZylcbiAgfVxuXG4gIC8vIEdldHRlcnNcbiAgc3RhdGljIGdldCBEZWZhdWx0KCkge1xuICAgIHJldHVybiBEZWZhdWx0XG4gIH1cblxuICBzdGF0aWMgZ2V0IERlZmF1bHRUeXBlKCkge1xuICAgIHJldHVybiBEZWZhdWx0VHlwZVxuICB9XG5cbiAgc3RhdGljIGdldCBOQU1FKCkge1xuICAgIHJldHVybiBOQU1FXG4gIH1cblxuICAvLyBQdWJsaWNcbiAgZ2V0Q29udGVudCgpIHtcbiAgICByZXR1cm4gT2JqZWN0LnZhbHVlcyh0aGlzLl9jb25maWcuY29udGVudClcbiAgICAgIC5tYXAoY29uZmlnID0+IHRoaXMuX3Jlc29sdmVQb3NzaWJsZUZ1bmN0aW9uKGNvbmZpZykpXG4gICAgICAuZmlsdGVyKEJvb2xlYW4pXG4gIH1cblxuICBoYXNDb250ZW50KCkge1xuICAgIHJldHVybiB0aGlzLmdldENvbnRlbnQoKS5sZW5ndGggPiAwXG4gIH1cblxuICBjaGFuZ2VDb250ZW50KGNvbnRlbnQpIHtcbiAgICB0aGlzLl9jaGVja0NvbnRlbnQoY29udGVudClcbiAgICB0aGlzLl9jb25maWcuY29udGVudCA9IHsgLi4udGhpcy5fY29uZmlnLmNvbnRlbnQsIC4uLmNvbnRlbnQgfVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICB0b0h0bWwoKSB7XG4gICAgY29uc3QgdGVtcGxhdGVXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICB0ZW1wbGF0ZVdyYXBwZXIuaW5uZXJIVE1MID0gdGhpcy5fbWF5YmVTYW5pdGl6ZSh0aGlzLl9jb25maWcudGVtcGxhdGUpXG5cbiAgICBmb3IgKGNvbnN0IFtzZWxlY3RvciwgdGV4dF0gb2YgT2JqZWN0LmVudHJpZXModGhpcy5fY29uZmlnLmNvbnRlbnQpKSB7XG4gICAgICB0aGlzLl9zZXRDb250ZW50KHRlbXBsYXRlV3JhcHBlciwgdGV4dCwgc2VsZWN0b3IpXG4gICAgfVxuXG4gICAgY29uc3QgdGVtcGxhdGUgPSB0ZW1wbGF0ZVdyYXBwZXIuY2hpbGRyZW5bMF1cbiAgICBjb25zdCBleHRyYUNsYXNzID0gdGhpcy5fcmVzb2x2ZVBvc3NpYmxlRnVuY3Rpb24odGhpcy5fY29uZmlnLmV4dHJhQ2xhc3MpXG5cbiAgICBpZiAoZXh0cmFDbGFzcykge1xuICAgICAgdGVtcGxhdGUuY2xhc3NMaXN0LmFkZCguLi5leHRyYUNsYXNzLnNwbGl0KCcgJykpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRlbXBsYXRlXG4gIH1cblxuICAvLyBQcml2YXRlXG4gIF90eXBlQ2hlY2tDb25maWcoY29uZmlnKSB7XG4gICAgc3VwZXIuX3R5cGVDaGVja0NvbmZpZyhjb25maWcpXG4gICAgdGhpcy5fY2hlY2tDb250ZW50KGNvbmZpZy5jb250ZW50KVxuICB9XG5cbiAgX2NoZWNrQ29udGVudChhcmcpIHtcbiAgICBmb3IgKGNvbnN0IFtzZWxlY3RvciwgY29udGVudF0gb2YgT2JqZWN0LmVudHJpZXMoYXJnKSkge1xuICAgICAgc3VwZXIuX3R5cGVDaGVja0NvbmZpZyh7IHNlbGVjdG9yLCBlbnRyeTogY29udGVudCB9LCBEZWZhdWx0Q29udGVudFR5cGUpXG4gICAgfVxuICB9XG5cbiAgX3NldENvbnRlbnQodGVtcGxhdGUsIGNvbnRlbnQsIHNlbGVjdG9yKSB7XG4gICAgY29uc3QgdGVtcGxhdGVFbGVtZW50ID0gU2VsZWN0b3JFbmdpbmUuZmluZE9uZShzZWxlY3RvciwgdGVtcGxhdGUpXG5cbiAgICBpZiAoIXRlbXBsYXRlRWxlbWVudCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY29udGVudCA9IHRoaXMuX3Jlc29sdmVQb3NzaWJsZUZ1bmN0aW9uKGNvbnRlbnQpXG5cbiAgICBpZiAoIWNvbnRlbnQpIHtcbiAgICAgIHRlbXBsYXRlRWxlbWVudC5yZW1vdmUoKVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgaWYgKGlzRWxlbWVudChjb250ZW50KSkge1xuICAgICAgdGhpcy5fcHV0RWxlbWVudEluVGVtcGxhdGUoZ2V0RWxlbWVudChjb250ZW50KSwgdGVtcGxhdGVFbGVtZW50KVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2NvbmZpZy5odG1sKSB7XG4gICAgICB0ZW1wbGF0ZUVsZW1lbnQuaW5uZXJIVE1MID0gdGhpcy5fbWF5YmVTYW5pdGl6ZShjb250ZW50KVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgdGVtcGxhdGVFbGVtZW50LnRleHRDb250ZW50ID0gY29udGVudFxuICB9XG5cbiAgX21heWJlU2FuaXRpemUoYXJnKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5zYW5pdGl6ZSA/IHNhbml0aXplSHRtbChhcmcsIHRoaXMuX2NvbmZpZy5hbGxvd0xpc3QsIHRoaXMuX2NvbmZpZy5zYW5pdGl6ZUZuKSA6IGFyZ1xuICB9XG5cbiAgX3Jlc29sdmVQb3NzaWJsZUZ1bmN0aW9uKGFyZykge1xuICAgIHJldHVybiBleGVjdXRlKGFyZywgW3RoaXNdKVxuICB9XG5cbiAgX3B1dEVsZW1lbnRJblRlbXBsYXRlKGVsZW1lbnQsIHRlbXBsYXRlRWxlbWVudCkge1xuICAgIGlmICh0aGlzLl9jb25maWcuaHRtbCkge1xuICAgICAgdGVtcGxhdGVFbGVtZW50LmlubmVySFRNTCA9ICcnXG4gICAgICB0ZW1wbGF0ZUVsZW1lbnQuYXBwZW5kKGVsZW1lbnQpXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICB0ZW1wbGF0ZUVsZW1lbnQudGV4dENvbnRlbnQgPSBlbGVtZW50LnRleHRDb250ZW50XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVGVtcGxhdGVGYWN0b3J5XG4iLCAiLy8gSW1wb3J0IHRoZSBCb290c3RyYXAgY29tcG9uZW50cyB3ZSB3YW50IHRvIHVzZS5cclxuLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21haW4vanMvaW5kZXgudW1kLmpzXHJcbmltcG9ydCBUYWIgZnJvbSBcIi9qcy9ib290c3RyYXAvc3JjL3RhYlwiO1xyXG5pbXBvcnQgQ29sbGFwc2UgZnJvbSBcIi9qcy9ib290c3RyYXAvc3JjL2NvbGxhcHNlXCI7XHJcbmltcG9ydCBEcm9wZG93biBmcm9tIFwiL2pzL2Jvb3RzdHJhcC9zcmMvZHJvcGRvd25cIjtcclxuaW1wb3J0IFNjcm9sbFNweSBmcm9tIFwianMvYm9vdHN0cmFwL3NyYy9zY3JvbGxzcHlcIjtcclxuaW1wb3J0IFRvb2x0aXAgZnJvbSBcImpzL2Jvb3RzdHJhcC9zcmMvdG9vbHRpcFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgVGFiLFxyXG4gICAgQ29sbGFwc2UsXHJcbiAgICBEcm9wZG93bixcclxuICAgIFNjcm9sbFNweSxcclxuICAgIFRvb2x0aXBcclxufVxyXG5cclxud2luZG93LkNvbGxhcHNlID0gQ29sbGFwc2U7XHJcbndpbmRvdy5Ub29sdGlwID0gVG9vbHRpcDsiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBTUEsYUFBTyxlQUFlLFNBQVMsY0FBYyxFQUFFLE9BQU8sS0FBSyxDQUFDO0FBRTVELGVBQVMsVUFBVSxNQUFNO0FBQ3ZCLFlBQUksUUFBUSxNQUFNO0FBQ2hCLGlCQUFPO0FBQUEsUUFDVDtBQUVBLFlBQUksS0FBSyxTQUFTLE1BQU0sbUJBQW1CO0FBQ3pDLGNBQUksZ0JBQWdCLEtBQUs7QUFDekIsaUJBQU8sZ0JBQWdCLGNBQWMsZUFBZSxTQUFTO0FBQUEsUUFDL0Q7QUFFQSxlQUFPO0FBQUEsTUFDVDtBQUVBLGVBQVNBLFdBQVUsTUFBTTtBQUN2QixZQUFJLGFBQWEsVUFBVSxJQUFJLEVBQUU7QUFDakMsZUFBTyxnQkFBZ0IsY0FBYyxnQkFBZ0I7QUFBQSxNQUN2RDtBQUVBLGVBQVMsY0FBYyxNQUFNO0FBQzNCLFlBQUksYUFBYSxVQUFVLElBQUksRUFBRTtBQUNqQyxlQUFPLGdCQUFnQixjQUFjLGdCQUFnQjtBQUFBLE1BQ3ZEO0FBRUEsZUFBUyxhQUFhLE1BQU07QUFFMUIsWUFBSSxPQUFPLGVBQWUsYUFBYTtBQUNyQyxpQkFBTztBQUFBLFFBQ1Q7QUFFQSxZQUFJLGFBQWEsVUFBVSxJQUFJLEVBQUU7QUFDakMsZUFBTyxnQkFB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QTtBQUFBLElBQ0E7QUFBQSxFQUNKO0FBRUEsU0FBTyxXQUFXO0FBQ2xCLFNBQU8sVUFBVTsiLAogICJuYW1lcyI6IFsiaXNFbGVtZW50IiwgImdldENvbXB1dGVkU3R5bGUiLCAid2luZG93IiwgIm1lcmdlZCIsICJjbGlwcGluZ1BhcmVudHMiLCAicmVmZXJlbmNlIiwgInBvcHBlck9mZnNldHMiLCAib2Zmc2V0IiwgImRlZmF1bHRNb2RpZmllcnMiLCAiY3JlYXRlUG9wcGVyIiwgInBvcHBlciIsICJvcHRpb25zIiwgInN0YXRlIiwgImVmZmVjdCIsICJub29wRm4iLCAibmFtZSIsICJzdHlsZSIsICJwbGFjZW1lbnQiLCAicGxhY2VtZW50cyIsICJfbG9vcCIsICJfaSIsICJjaGVja3MiLCAibWluIiwgIm1heCIsICJ0b1BhZGRpbmdPYmplY3QiLCAiY2FsbGJhY2siLCAiZm4iLCAiZWxlbWVudCIsICJOQU1FIiwgIkRBVEFfS0VZIiwgIkVWRU5UX0tFWSIsICJFVkVOVF9TSE9XIiwgIkVWRU5UX1NIT1dOIiwgIkVWRU5UX0hJREUiLCAiRVZFTlRfSElEREVOIiwgIkVWRU5UX0NMSUNLX0RBVEFfQVBJIiwgIkNMQVNTX05BTUVfU0hPVyIsICJTRUxFQ1RPUl9EQVRBX1RPR0dMRSIsICJOQU1FIiwgIkRBVEFfS0VZIiwgIkVWRU5UX0tFWSIsICJEQVRBX0FQSV9LRVkiLCAiQVJST1dfVVBfS0VZIiwgIkFSUk9XX0RPV05fS0VZIiwgIkVWRU5UX0hJREUiLCAiRVZFTlRfSElEREVOIiwgIkVWRU5UX1NIT1ciLCAiRVZFTlRfU0hPV04iLCAiRVZFTlRfQ0xJQ0tfREFUQV9BUEkiLCAiQ0xBU1NfTkFNRV9TSE9XIiwgIlNFTEVDVE9SX0RBVEFfVE9HR0xFIiwgIkRlZmF1bHQiLCAiRGVmYXVsdFR5cGUiLCAiTkFNRSIsICJEQVRBX0tFWSIsICJFVkVOVF9LRVkiLCAiREFUQV9BUElfS0VZIiwgIkVWRU5UX0xPQURfREFUQV9BUEkiLCAiQ0xBU1NfTkFNRV9BQ1RJVkUiLCAiU0VMRUNUT1JfRFJPUERPV05fVE9HR0xFIiwgIkRlZmF1bHQiLCAiRGVmYXVsdFR5cGUiLCAiUG9wcGVyIiwgIk5BTUUiLCAiRGVmYXVsdCIsICJEZWZhdWx0VHlwZSIsICJOQU1FIiwgIkNMQVNTX05BTUVfRkFERSIsICJDTEFTU19OQU1FX1NIT1ciLCAiRVZFTlRfSElERSIsICJFVkVOVF9ISURERU4iLCAiRVZFTlRfU0hPVyIsICJFVkVOVF9TSE9XTiIsICJFVkVOVF9DTElDSyIsICJEZWZhdWx0IiwgIkRlZmF1bHRUeXBlIiwgIlBvcHBlciJdCn0K
