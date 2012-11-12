
// minifier: path aliases

enyo.path.addPaths({onyx: "C://Users/Cyril/Documents/Projets/zoo/ooZoo/enyo/tools/../../lib/onyx/", onyx: "C://Users/Cyril/Documents/Projets/zoo/ooZoo/enyo/tools/../../lib/onyx/source/", layout: "C://Users/Cyril/Documents/Projets/zoo/ooZoo/enyo/tools/../../lib/layout/", DividerDrawer: "C://Users/Cyril/Documents/Projets/zoo/ooZoo/enyo/tools/../../lib/DividerDrawer/", map: "../source/map/"});

// Icon.js

enyo.kind({
name: "onyx.Icon",
published: {
src: "",
disabled: !1
},
classes: "onyx-icon",
create: function() {
this.inherited(arguments), this.src && this.srcChanged(), this.disabledChanged();
},
disabledChanged: function() {
this.addRemoveClass("disabled", this.disabled);
},
srcChanged: function() {
this.applyStyle("background-image", "url(" + enyo.path.rewrite(this.src) + ")");
}
});

// Button.js

enyo.kind({
name: "onyx.Button",
kind: "enyo.Button",
classes: "onyx-button enyo-unselectable"
});

// IconButton.js

enyo.kind({
name: "onyx.IconButton",
kind: "onyx.Icon",
published: {
active: !1
},
classes: "onyx-icon-button",
rendered: function() {
this.inherited(arguments), this.activeChanged();
},
tap: function() {
if (this.disabled) return !0;
this.setActive(!0);
},
activeChanged: function() {
this.bubble("onActivate");
}
});

// Checkbox.js

enyo.kind({
name: "onyx.Checkbox",
classes: "onyx-checkbox",
kind: enyo.Checkbox,
tag: "div",
handlers: {
ondown: "downHandler",
onclick: ""
},
downHandler: function(e, t) {
return this.disabled || (this.setChecked(!this.getChecked()), this.bubble("onchange")), !0;
},
tap: function(e, t) {
return !this.disabled;
}
});

// Drawer.js

enyo.kind({
name: "onyx.Drawer",
published: {
open: !0,
orient: "v",
animated: !0
},
style: "overflow: hidden; position: relative;",
tools: [ {
kind: "Animator",
onStep: "animatorStep",
onEnd: "animatorEnd"
}, {
name: "client",
style: "position: relative;",
classes: "enyo-border-box"
} ],
create: function() {
this.inherited(arguments), this.animatedChanged(), this.openChanged();
},
initComponents: function() {
this.createChrome(this.tools), this.inherited(arguments);
},
animatedChanged: function() {
!this.animated && this.hasNode() && this.$.animator.isAnimating() && (this.$.animator.stop(), this.animatorEnd());
},
openChanged: function() {
this.$.client.show();
if (this.hasNode()) if (this.$.animator.isAnimating()) this.$.animator.reverse(); else {
var e = this.orient == "v", t = e ? "height" : "width", n = e ? "top" : "left";
this.applyStyle(t, null);
var r = this.hasNode()[e ? "scrollHeight" : "scrollWidth"];
this.animated ? this.$.animator.play({
startValue: this.open ? 0 : r,
endValue: this.open ? r : 0,
dimension: t,
position: n
}) : this.animatorEnd();
} else this.$.client.setShowing(this.open);
},
animatorStep: function(e) {
if (this.hasNode()) {
var t = e.dimension;
this.node.style[t] = this.domStyles[t] = e.value + "px";
}
var n = this.$.client.hasNode();
if (n) {
var r = e.position, i = this.open ? e.endValue : e.startValue;
n.style[r] = this.$.client.domStyles[r] = e.value - i + "px";
}
this.container && this.container.resized();
},
animatorEnd: function() {
if (!this.open) this.$.client.hide(); else {
var e = this.orient == "v", t = e ? "height" : "width", n = e ? "top" : "left", r = this.$.client.hasNode();
r && (r.style[n] = this.$.client.domStyles[n] = null), this.node && (this.node.style[t] = this.domStyles[t] = null);
}
this.container && this.container.resized();
}
});

// Grabber.js

enyo.kind({
name: "onyx.Grabber",
classes: "onyx-grabber"
});

// Groupbox.js

enyo.kind({
name: "onyx.Groupbox",
classes: "onyx-groupbox"
}), enyo.kind({
name: "onyx.GroupboxHeader",
classes: "onyx-groupbox-header"
});

// Input.js

enyo.kind({
name: "onyx.Input",
kind: "enyo.Input",
classes: "onyx-input"
});

// Popup.js

enyo.kind({
name: "onyx.Popup",
kind: "Popup",
classes: "onyx-popup",
published: {
scrimWhenModal: !0,
scrim: !1,
scrimClassName: ""
},
statics: {
count: 0
},
defaultZ: 120,
showingChanged: function() {
this.showing ? (onyx.Popup.count++, this.applyZIndex()) : onyx.Popup.count > 0 && onyx.Popup.count--, this.showHideScrim(this.showing), this.inherited(arguments);
},
showHideScrim: function(e) {
if (this.floating && (this.scrim || this.modal && this.scrimWhenModal)) {
var t = this.getScrim();
if (e) {
var n = this.getScrimZIndex();
this._scrimZ = n, t.showAtZIndex(n);
} else t.hideAtZIndex(this._scrimZ);
enyo.call(t, "addRemoveClass", [ this.scrimClassName, t.showing ]);
}
},
getScrimZIndex: function() {
return this.findZIndex() - 1;
},
getScrim: function() {
return this.modal && this.scrimWhenModal && !this.scrim ? onyx.scrimTransparent.make() : onyx.scrim.make();
},
applyZIndex: function() {
this._zIndex = onyx.Popup.count * 2 + this.findZIndex() + 1, this.applyStyle("z-index", this._zIndex);
},
findZIndex: function() {
var e = this.defaultZ;
return this._zIndex ? e = this._zIndex : this.hasNode() && (e = Number(enyo.dom.getComputedStyleValue(this.node, "z-index")) || e), this._zIndex = e;
}
});

// TextArea.js

enyo.kind({
name: "onyx.TextArea",
kind: "enyo.TextArea",
classes: "onyx-textarea"
});

// RichText.js

enyo.kind({
name: "onyx.RichText",
kind: "enyo.RichText",
classes: "onyx-richtext"
});

// InputDecorator.js

enyo.kind({
name: "onyx.InputDecorator",
kind: "enyo.ToolDecorator",
tag: "label",
classes: "onyx-input-decorator",
published: {
alwaysLooksFocused: !1
},
handlers: {
onDisabledChange: "disabledChange",
onfocus: "receiveFocus",
onblur: "receiveBlur"
},
create: function() {
this.inherited(arguments), this.updateFocus(!1);
},
alwaysLooksFocusedChanged: function(e) {
this.updateFocus(this.focus);
},
updateFocus: function(e) {
this.focused = e, this.addRemoveClass("onyx-focused", this.alwaysLooksFocused || this.focused);
},
receiveFocus: function() {
this.updateFocus(!0);
},
receiveBlur: function() {
this.updateFocus(!1);
},
disabledChange: function(e, t) {
this.addRemoveClass("onyx-disabled", t.originator.disabled);
}
});

// Tooltip.js

enyo.kind({
name: "onyx.Tooltip",
kind: "onyx.Popup",
classes: "onyx-tooltip below left-arrow",
autoDismiss: !1,
showDelay: 500,
defaultLeft: -6,
handlers: {
onRequestShowTooltip: "requestShow",
onRequestHideTooltip: "requestHide"
},
requestShow: function() {
return this.showJob = setTimeout(enyo.bind(this, "show"), this.showDelay), !0;
},
cancelShow: function() {
clearTimeout(this.showJob);
},
requestHide: function() {
return this.cancelShow(), this.inherited(arguments);
},
showingChanged: function() {
this.cancelShow(), this.adjustPosition(!0), this.inherited(arguments);
},
applyPosition: function(e) {
var t = "";
for (var n in e) t += n + ":" + e[n] + (isNaN(e[n]) ? "; " : "px; ");
this.addStyles(t);
},
adjustPosition: function(e) {
if (this.showing && this.hasNode()) {
var t = this.node.getBoundingClientRect();
t.top + t.height > window.innerHeight ? (this.addRemoveClass("below", !1), this.addRemoveClass("above", !0)) : (this.addRemoveClass("above", !1), this.addRemoveClass("below", !0)), t.left + t.width > window.innerWidth && (this.applyPosition({
"margin-left": -t.width,
bottom: "auto"
}), this.addRemoveClass("left-arrow", !1), this.addRemoveClass("right-arrow", !0));
}
},
resizeHandler: function() {
this.applyPosition({
"margin-left": this.defaultLeft,
bottom: "auto"
}), this.addRemoveClass("left-arrow", !0), this.addRemoveClass("right-arrow", !1), this.adjustPosition(!0), this.inherited(arguments);
}
});

// TooltipDecorator.js

enyo.kind({
name: "onyx.TooltipDecorator",
defaultKind: "onyx.Button",
classes: "onyx-popup-decorator",
handlers: {
onenter: "enter",
onleave: "leave"
},
enter: function() {
this.requestShowTooltip();
},
leave: function() {
this.requestHideTooltip();
},
tap: function() {
this.requestHideTooltip();
},
requestShowTooltip: function() {
this.waterfallDown("onRequestShowTooltip");
},
requestHideTooltip: function() {
this.waterfallDown("onRequestHideTooltip");
}
});

// MenuDecorator.js

enyo.kind({
name: "onyx.MenuDecorator",
kind: "onyx.TooltipDecorator",
defaultKind: "onyx.Button",
classes: "onyx-popup-decorator enyo-unselectable",
handlers: {
onActivate: "activated",
onHide: "menuHidden"
},
activated: function(e, t) {
this.requestHideTooltip(), t.originator.active && (this.menuActive = !0, this.activator = t.originator, this.activator.addClass("active"), this.requestShowMenu());
},
requestShowMenu: function() {
this.waterfallDown("onRequestShowMenu", {
activator: this.activator
});
},
requestHideMenu: function() {
this.waterfallDown("onRequestHideMenu");
},
menuHidden: function() {
this.menuActive = !1, this.activator && (this.activator.setActive(!1), this.activator.removeClass("active"));
},
enter: function(e) {
this.menuActive || this.inherited(arguments);
},
leave: function(e, t) {
this.menuActive || this.inherited(arguments);
}
});

// Menu.js

enyo.kind({
name: "onyx.Menu",
kind: "onyx.Popup",
modal: !0,
defaultKind: "onyx.MenuItem",
classes: "onyx-menu",
published: {
maxHeight: 200,
scrolling: !0
},
handlers: {
onActivate: "itemActivated",
onRequestShowMenu: "requestMenuShow",
onRequestHideMenu: "requestHide"
},
childComponents: [ {
name: "client",
kind: "enyo.Scroller",
strategyKind: "TouchScrollStrategy"
} ],
showOnTop: !1,
scrollerName: "client",
create: function() {
this.inherited(arguments), this.maxHeightChanged();
},
initComponents: function() {
this.scrolling ? this.createComponents(this.childComponents, {
isChrome: !0
}) : enyo.nop, this.inherited(arguments);
},
getScroller: function() {
return this.$[this.scrollerName];
},
maxHeightChanged: function() {
this.scrolling ? this.getScroller().setMaxHeight(this.maxHeight + "px") : enyo.nop;
},
itemActivated: function(e, t) {
return t.originator.setActive(!1), !0;
},
showingChanged: function() {
this.inherited(arguments), this.scrolling ? this.getScroller().setShowing(this.showing) : enyo.nop, this.adjustPosition(!0);
},
requestMenuShow: function(e, t) {
if (this.floating) {
var n = t.activator.hasNode();
if (n) {
var r = this.activatorOffset = this.getPageOffset(n);
this.applyPosition({
top: r.top + (this.showOnTop ? 0 : r.height),
left: r.left,
width: r.width
});
}
}
return this.show(), !0;
},
applyPosition: function(e) {
var t = "";
for (n in e) t += n + ":" + e[n] + (isNaN(e[n]) ? "; " : "px; ");
this.addStyles(t);
},
getPageOffset: function(e) {
var t = e.getBoundingClientRect(), n = window.pageYOffset === undefined ? document.documentElement.scrollTop : window.pageYOffset, r = window.pageXOffset === undefined ? document.documentElement.scrollLeft : window.pageXOffset, i = t.height === undefined ? t.bottom - t.top : t.height, s = t.width === undefined ? t.right - t.left : t.width;
return {
top: t.top + n,
left: t.left + r,
height: i,
width: s
};
},
adjustPosition: function() {
if (this.showing && this.hasNode()) {
this.scrolling && !this.showOnTop ? this.getScroller().setMaxHeight(this.maxHeight + "px") : enyo.nop, this.removeClass("onyx-menu-up"), this.floating ? enyo.noop : this.applyPosition({
left: "auto"
});
var e = this.node.getBoundingClientRect(), t = e.height === undefined ? e.bottom - e.top : e.height, n = window.innerHeight === undefined ? document.documentElement.clientHeight : window.innerHeight, r = window.innerWidth === undefined ? document.documentElement.clientWidth : window.innerWidth;
this.menuUp = e.top + t > n && n - e.bottom < e.top - t, this.addRemoveClass("onyx-menu-up", this.menuUp);
if (this.floating) {
var i = this.activatorOffset;
this.menuUp ? this.applyPosition({
top: i.top - t + (this.showOnTop ? i.height : 0),
bottom: "auto"
}) : e.top < i.top && i.top + (this.showOnTop ? 0 : i.height) + t < n && this.applyPosition({
top: i.top + (this.showOnTop ? 0 : i.height),
bottom: "auto"
});
}
e.right > r && (this.floating ? this.applyPosition({
left: r - e.width
}) : this.applyPosition({
left: -(e.right - r)
})), e.left < 0 && (this.floating ? this.applyPosition({
left: 0,
right: "auto"
}) : this.getComputedStyleValue("right") == "auto" ? this.applyPosition({
left: -e.left
}) : this.applyPosition({
right: e.left
}));
if (this.scrolling && !this.showOnTop) {
e = this.node.getBoundingClientRect();
var s;
this.menuUp ? s = this.maxHeight < e.bottom ? this.maxHeight : e.bottom : s = e.top + this.maxHeight < n ? this.maxHeight : n - e.top, this.getScroller().setMaxHeight(s + "px");
}
}
},
resizeHandler: function() {
this.inherited(arguments), this.adjustPosition();
},
requestHide: function() {
this.setShowing(!1);
}
});

// MenuItem.js

enyo.kind({
name: "onyx.MenuItem",
kind: "enyo.Button",
events: {
onSelect: ""
},
classes: "onyx-menu-item",
tag: "div",
tap: function(e) {
this.inherited(arguments), this.bubble("onRequestHideMenu"), this.doSelect({
selected: this,
content: this.content
});
}
});

// PickerDecorator.js

enyo.kind({
name: "onyx.PickerDecorator",
kind: "onyx.MenuDecorator",
classes: "onyx-picker-decorator",
defaultKind: "onyx.PickerButton",
handlers: {
onChange: "change"
},
change: function(e, t) {
this.waterfallDown("onChange", t);
}
});

// PickerButton.js

enyo.kind({
name: "onyx.PickerButton",
kind: "onyx.Button",
handlers: {
onChange: "change"
},
change: function(e, t) {
this.setContent(t.content);
}
});

// Picker.js

enyo.kind({
name: "onyx.Picker",
kind: "onyx.Menu",
classes: "onyx-picker enyo-unselectable",
published: {
selected: null
},
events: {
onChange: ""
},
floating: !0,
showOnTop: !0,
initComponents: function() {
this.setScrolling(!0), this.inherited(arguments);
},
showingChanged: function() {
this.getScroller().setShowing(this.showing), this.inherited(arguments), this.showing && this.selected && this.scrollToSelected();
},
scrollToSelected: function() {
this.getScroller().scrollToControl(this.selected, !this.menuUp);
},
itemActivated: function(e, t) {
return this.processActivatedItem(t.originator), this.inherited(arguments);
},
processActivatedItem: function(e) {
e.active && this.setSelected(e);
},
selectedChanged: function(e) {
e && e.removeClass("selected"), this.selected && (this.selected.addClass("selected"), this.doChange({
selected: this.selected,
content: this.selected.content
}));
},
resizeHandler: function() {
this.inherited(arguments), this.adjustPosition();
}
});

// FlyweightPicker.js

enyo.kind({
name: "onyx.FlyweightPicker",
kind: "onyx.Picker",
classes: "onyx-flyweight-picker",
published: {
count: 0
},
events: {
onSetupItem: "",
onSelect: ""
},
handlers: {
onSelect: "itemSelect"
},
components: [ {
name: "scroller",
kind: "enyo.Scroller",
strategyKind: "TouchScrollStrategy",
components: [ {
name: "flyweight",
kind: "FlyweightRepeater",
ontap: "itemTap"
} ]
} ],
scrollerName: "scroller",
initComponents: function() {
this.controlParentName = "flyweight", this.inherited(arguments);
},
create: function() {
this.inherited(arguments), this.countChanged();
},
rendered: function() {
this.inherited(arguments), this.selectedChanged();
},
scrollToSelected: function() {
var e = this.$.flyweight.fetchRowNode(this.selected);
this.getScroller().scrollToNode(e, !this.menuUp);
},
countChanged: function() {
this.$.flyweight.count = this.count;
},
processActivatedItem: function(e) {
this.item = e;
},
selectedChanged: function(e) {
if (!this.item) return;
e !== undefined && (this.item.removeClass("selected"), this.$.flyweight.renderRow(e)), this.item.addClass("selected"), this.$.flyweight.renderRow(this.selected), this.item.removeClass("selected");
var t = this.$.flyweight.fetchRowNode(this.selected);
this.doChange({
selected: this.selected,
content: t && t.textContent || this.item.content
});
},
itemTap: function(e, t) {
this.setSelected(t.rowIndex), this.doSelect({
selected: this.item,
content: this.item.content
});
},
itemSelect: function(e, t) {
if (t.originator != this) return !0;
}
});

// DatePicker.js

enyo.kind({
name: "onyx.DatePicker",
classes: "onyx-toolbar-inline",
published: {
disabled: !1,
locale: null,
dayHidden: !1,
monthHidden: !1,
yearHidden: !1,
minYear: 1900,
maxYear: 2099,
value: null
},
events: {
onSelect: ""
},
create: function() {
this.inherited(arguments);
if (!this.locale) try {
this.locale = enyo.g11n.currentLocale().getLocale();
} catch (e) {
this.locale = "en_us";
}
this.initDefaults();
},
initDefaults: function() {
var e;
try {
this._tf = new enyo.g11n.Fmts({
locale: this.locale
}), e = this._tf.getMonthFields();
} catch (t) {
e = [ "Jan", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC" ];
}
this.setupPickers(this._tf ? this._tf.getDateFieldOrder() : "mdy"), this.dayHiddenChanged(), this.monthHiddenChanged(), this.yearHiddenChanged();
var n = this.value = this.value || new Date;
for (var r = 0, i; i = e[r]; r++) this.$.monthPicker.createComponent({
content: i,
value: r,
active: r == n.getMonth()
});
var s = n.getFullYear();
this.$.yearPicker.setSelected(s - this.minYear), this.$.year.setContent(s);
for (r = 1; r <= this.monthLength(n.getYear(), n.getMonth()); r++) this.$.dayPicker.createComponent({
content: r,
value: r,
active: r == n.getDate()
});
},
monthLength: function(e, t) {
return 32 - (new Date(e, t, 32)).getDate();
},
setupYear: function(e, t) {
this.$.year.setContent(this.minYear + t.index);
},
setupPickers: function(e) {
var t = e.split(""), n, r, i;
for (r = 0, i = t.length; r < i; r++) {
n = t[r];
switch (n) {
case "d":
this.createDay();
break;
case "m":
this.createMonth();
break;
case "y":
this.createYear();
break;
default:
}
}
},
createYear: function() {
var e = this.maxYear - this.minYear;
this.createComponent({
kind: "onyx.PickerDecorator",
onSelect: "updateYear",
components: [ {
classes: "onyx-datepicker-year",
name: "yearPickerButton",
disabled: this.disabled
}, {
name: "yearPicker",
kind: "onyx.FlyweightPicker",
count: ++e,
onSetupItem: "setupYear",
components: [ {
name: "year"
} ]
} ]
});
},
createMonth: function() {
this.createComponent({
kind: "onyx.PickerDecorator",
onSelect: "updateMonth",
components: [ {
classes: "onyx-datepicker-month",
name: "monthPickerButton",
disabled: this.disabled
}, {
name: "monthPicker",
kind: "onyx.Picker"
} ]
});
},
createDay: function() {
this.createComponent({
kind: "onyx.PickerDecorator",
onSelect: "updateDay",
components: [ {
classes: "onyx-datepicker-day",
name: "dayPickerButton",
disabled: this.disabled
}, {
name: "dayPicker",
kind: "onyx.Picker"
} ]
});
},
localeChanged: function() {
this.refresh();
},
dayHiddenChanged: function() {
this.$.dayPicker.getParent().setShowing(this.dayHidden ? !1 : !0);
},
monthHiddenChanged: function() {
this.$.monthPicker.getParent().setShowing(this.monthHidden ? !1 : !0);
},
yearHiddenChanged: function() {
this.$.yearPicker.getParent().setShowing(this.yearHidden ? !1 : !0);
},
minYearChanged: function() {
this.refresh();
},
maxYearChanged: function() {
this.refresh();
},
valueChanged: function() {
this.refresh();
},
disabledChanged: function() {
this.yearPickerButton.setDisabled(this.disabled), this.monthPickerButton.setDisabled(this.disabled), this.dayPickerButton.setDisabled(this.disabled);
},
updateDay: function(e, t) {
var n = this.calcDate(this.value.getFullYear(), this.value.getMonth(), t.selected.value);
return this.doSelect({
name: this.name,
value: n
}), this.setValue(n), !0;
},
updateMonth: function(e, t) {
var n = this.calcDate(this.value.getFullYear(), t.selected.value, this.value.getDate());
return this.doSelect({
name: this.name,
value: n
}), this.setValue(n), !0;
},
updateYear: function(e, t) {
if (t.originator.selected != -1) {
var n = this.calcDate(this.minYear + t.originator.selected, this.value.getMonth(), this.value.getDate());
this.doSelect({
name: this.name,
value: n
}), this.setValue(n);
}
return !0;
},
calcDate: function(e, t, n) {
return new Date(e, t, n, this.value.getHours(), this.value.getMinutes(), this.value.getSeconds(), this.value.getMilliseconds());
},
refresh: function() {
this.destroyClientControls(), this.initDefaults(), this.render();
}
});

// TimePicker.js

enyo.kind({
name: "onyx.TimePicker",
classes: "onyx-toolbar-inline",
published: {
disabled: !1,
locale: null,
is24HrMode: null,
value: null
},
events: {
onSelect: ""
},
create: function() {
this.inherited(arguments);
if (!this.locale) try {
this.locale = enyo.g11n.currentLocale().getLocale();
} catch (e) {
this.locale = "en_us";
}
this.initDefaults();
},
initDefaults: function() {
var e, t;
try {
this._tf = new enyo.g11n.Fmts({
locale: this.locale
}), e = this._tf.getAmCaption(), t = this._tf.getPmCaption(), this.is24HrMode == null && (this.is24HrMode = !this._tf.isAmPm());
} catch (n) {
e = "AM", t = "PM", this.is24HrMode = !1;
}
this.setupPickers(this._tf ? this._tf.getTimeFieldOrder() : "hma");
var r = this.value = this.value || new Date, i;
if (!this.is24HrMode) {
var s = r.getHours();
s = s === 0 ? 12 : s;
for (i = 1; i <= 12; i++) this.$.hourPicker.createComponent({
content: i,
value: i,
active: i == (s > 12 ? s % 12 : s)
});
} else for (i = 0; i < 24; i++) this.$.hourPicker.createComponent({
content: i,
value: i,
active: i == r.getHours()
});
for (i = 0; i <= 59; i++) this.$.minutePicker.createComponent({
content: i < 10 ? "0" + i : i,
value: i,
active: i == r.getMinutes()
});
r.getHours() >= 12 ? this.$.ampmPicker.createComponents([ {
content: e
}, {
content: t,
active: !0
} ]) : this.$.ampmPicker.createComponents([ {
content: e,
active: !0
}, {
content: t
} ]), this.$.ampmPicker.getParent().setShowing(!this.is24HrMode);
},
setupPickers: function(e) {
var t = e.split(""), n, r, i;
for (r = 0, i = t.length; r < i; r++) {
n = t[r];
switch (n) {
case "h":
this.createHour();
break;
case "m":
this.createMinute();
break;
case "a":
this.createAmPm();
break;
default:
}
}
},
createHour: function() {
this.createComponent({
kind: "onyx.PickerDecorator",
onSelect: "updateHour",
components: [ {
classes: "onyx-timepicker-hour",
name: "hourPickerButton",
disabled: this.disabled
}, {
name: "hourPicker",
kind: "onyx.Picker"
} ]
});
},
createMinute: function() {
this.createComponent({
kind: "onyx.PickerDecorator",
onSelect: "updateMinute",
components: [ {
classes: "onyx-timepicker-minute",
name: "minutePickerButton",
disabled: this.disabled
}, {
name: "minutePicker",
kind: "onyx.Picker"
} ]
});
},
createAmPm: function() {
this.createComponent({
kind: "onyx.PickerDecorator",
onSelect: "updateAmPm",
components: [ {
classes: "onyx-timepicker-ampm",
name: "ampmPickerButton",
disabled: this.disabled
}, {
name: "ampmPicker",
kind: "onyx.Picker"
} ]
});
},
disabledChanged: function() {
this.$.hourPickerButton.setDisabled(this.disabled), this.$.minutePickerButton.setDisabled(this.disabled), this.$.ampmPickerButton.setDisabled(this.disabled);
},
localeChanged: function() {
this.is24HrMode = null, this.refresh();
},
is24HrModeChanged: function() {
this.refresh();
},
valueChanged: function() {
this.refresh();
},
updateHour: function(e, t) {
var n = t.selected.value;
if (!this.is24HrMode) {
var r = this.$.ampmPicker.getParent().controlAtIndex(0).content;
n = n + (n == 12 ? -12 : 0) + (this.isAm(r) ? 0 : 12);
}
return this.value = this.calcTime(n, this.value.getMinutes()), this.doSelect({
name: this.name,
value: this.value
}), !0;
},
updateMinute: function(e, t) {
return this.value = this.calcTime(this.value.getHours(), t.selected.value), this.doSelect({
name: this.name,
value: this.value
}), !0;
},
updateAmPm: function(e, t) {
var n = this.value.getHours();
return this.is24HrMode || (n += n > 11 ? this.isAm(t.content) ? -12 : 0 : this.isAm(t.content) ? 0 : 12), this.value = this.calcTime(n, this.value.getMinutes()), this.doSelect({
name: this.name,
value: this.value
}), !0;
},
calcTime: function(e, t) {
return new Date(this.value.getFullYear(), this.value.getMonth(), this.value.getDate(), e, t, this.value.getSeconds(), this.value.getMilliseconds());
},
isAm: function(e) {
var t, n, r;
try {
t = this._tf.getAmCaption(), n = this._tf.getPmCaption();
} catch (i) {
t = "AM", n = "PM";
}
return e == t ? !0 : !1;
},
refresh: function() {
this.destroyClientControls(), this.initDefaults(), this.render();
}
});

// RadioButton.js

enyo.kind({
name: "onyx.RadioButton",
kind: "Button",
classes: "onyx-radiobutton"
});

// RadioGroup.js

enyo.kind({
name: "onyx.RadioGroup",
kind: "Group",
defaultKind: "onyx.RadioButton",
highlander: !0
});

// ToggleButton.js

enyo.kind({
name: "onyx.ToggleButton",
classes: "onyx-toggle-button",
published: {
active: !1,
value: !1,
onContent: "On",
offContent: "Off",
disabled: !1
},
events: {
onChange: ""
},
handlers: {
ondragstart: "dragstart",
ondrag: "drag",
ondragfinish: "dragfinish"
},
components: [ {
name: "contentOn",
classes: "onyx-toggle-content on"
}, {
name: "contentOff",
classes: "onyx-toggle-content off"
}, {
classes: "onyx-toggle-button-knob"
} ],
create: function() {
this.inherited(arguments), this.value = Boolean(this.value || this.active), this.onContentChanged(), this.offContentChanged(), this.disabledChanged();
},
rendered: function() {
this.inherited(arguments), this.updateVisualState();
},
updateVisualState: function() {
this.addRemoveClass("off", !this.value), this.$.contentOn.setShowing(this.value), this.$.contentOff.setShowing(!this.value), this.setActive(this.value);
},
valueChanged: function() {
this.updateVisualState(), this.doChange({
value: this.value
});
},
activeChanged: function() {
this.setValue(this.active), this.bubble("onActivate");
},
onContentChanged: function() {
this.$.contentOn.setContent(this.onContent || ""), this.$.contentOn.addRemoveClass("empty", !this.onContent);
},
offContentChanged: function() {
this.$.contentOff.setContent(this.offContent || ""), this.$.contentOff.addRemoveClass("empty", !this.onContent);
},
disabledChanged: function() {
this.addRemoveClass("disabled", this.disabled);
},
updateValue: function(e) {
this.disabled || this.setValue(e);
},
tap: function() {
this.updateValue(!this.value);
},
dragstart: function(e, t) {
if (t.horizontal) return t.preventDefault(), this.dragging = !0, this.dragged = !1, !0;
},
drag: function(e, t) {
if (this.dragging) {
var n = t.dx;
return Math.abs(n) > 10 && (this.updateValue(n > 0), this.dragged = !0), !0;
}
},
dragfinish: function(e, t) {
this.dragging = !1, this.dragged && t.preventTap();
}
});

// ToggleIconButton.js

enyo.kind({
name: "onyx.ToggleIconButton",
kind: "onyx.Icon",
published: {
active: !1,
value: !1
},
events: {
onChange: ""
},
classes: "onyx-icon-button onyx-icon-toggle",
activeChanged: function() {
this.addRemoveClass("active", this.value), this.bubble("onActivate");
},
updateValue: function(e) {
this.disabled || (this.setValue(e), this.doChange({
value: this.value
}));
},
tap: function() {
this.updateValue(!this.value);
},
valueChanged: function() {
this.setActive(this.value);
},
create: function() {
this.inherited(arguments), this.value = Boolean(this.value || this.active);
},
rendered: function() {
this.inherited(arguments), this.valueChanged(), this.removeClass("onyx-icon");
}
});

// Toolbar.js

enyo.kind({
name: "onyx.Toolbar",
classes: "onyx onyx-toolbar onyx-toolbar-inline",
create: function() {
this.inherited(arguments), this.hasClass("onyx-menu-toolbar") && enyo.platform.android >= 4 && this.applyStyle("position", "static");
}
});

// Tooltip.js

enyo.kind({
name: "onyx.Tooltip",
kind: "onyx.Popup",
classes: "onyx-tooltip below left-arrow",
autoDismiss: !1,
showDelay: 500,
defaultLeft: -6,
handlers: {
onRequestShowTooltip: "requestShow",
onRequestHideTooltip: "requestHide"
},
requestShow: function() {
return this.showJob = setTimeout(enyo.bind(this, "show"), this.showDelay), !0;
},
cancelShow: function() {
clearTimeout(this.showJob);
},
requestHide: function() {
return this.cancelShow(), this.inherited(arguments);
},
showingChanged: function() {
this.cancelShow(), this.adjustPosition(!0), this.inherited(arguments);
},
applyPosition: function(e) {
var t = "";
for (var n in e) t += n + ":" + e[n] + (isNaN(e[n]) ? "; " : "px; ");
this.addStyles(t);
},
adjustPosition: function(e) {
if (this.showing && this.hasNode()) {
var t = this.node.getBoundingClientRect();
t.top + t.height > window.innerHeight ? (this.addRemoveClass("below", !1), this.addRemoveClass("above", !0)) : (this.addRemoveClass("above", !1), this.addRemoveClass("below", !0)), t.left + t.width > window.innerWidth && (this.applyPosition({
"margin-left": -t.width,
bottom: "auto"
}), this.addRemoveClass("left-arrow", !1), this.addRemoveClass("right-arrow", !0));
}
},
resizeHandler: function() {
this.applyPosition({
"margin-left": this.defaultLeft,
bottom: "auto"
}), this.addRemoveClass("left-arrow", !0), this.addRemoveClass("right-arrow", !1), this.adjustPosition(!0), this.inherited(arguments);
}
});

// TooltipDecorator.js

enyo.kind({
name: "onyx.TooltipDecorator",
defaultKind: "onyx.Button",
classes: "onyx-popup-decorator",
handlers: {
onenter: "enter",
onleave: "leave"
},
enter: function() {
this.requestShowTooltip();
},
leave: function() {
this.requestHideTooltip();
},
tap: function() {
this.requestHideTooltip();
},
requestShowTooltip: function() {
this.waterfallDown("onRequestShowTooltip");
},
requestHideTooltip: function() {
this.waterfallDown("onRequestHideTooltip");
}
});

// ProgressBar.js

enyo.kind({
name: "onyx.ProgressBar",
classes: "onyx-progress-bar",
published: {
progress: 0,
min: 0,
max: 100,
barClasses: "",
showStripes: !0,
animateStripes: !0
},
events: {
onAnimateProgressFinish: ""
},
components: [ {
name: "progressAnimator",
kind: "Animator",
onStep: "progressAnimatorStep",
onEnd: "progressAnimatorComplete"
}, {
name: "bar",
classes: "onyx-progress-bar-bar"
} ],
create: function() {
this.inherited(arguments), this.progressChanged(), this.barClassesChanged(), this.showStripesChanged(), this.animateStripesChanged();
},
barClassesChanged: function(e) {
this.$.bar.removeClass(e), this.$.bar.addClass(this.barClasses);
},
showStripesChanged: function() {
this.$.bar.addRemoveClass("striped", this.showStripes);
},
animateStripesChanged: function() {
this.$.bar.addRemoveClass("animated", this.animateStripes);
},
progressChanged: function() {
this.progress = this.clampValue(this.min, this.max, this.progress);
var e = this.calcPercent(this.progress);
this.updateBarPosition(e);
},
clampValue: function(e, t, n) {
return Math.max(e, Math.min(n, t));
},
calcRatio: function(e) {
return (e - this.min) / (this.max - this.min);
},
calcPercent: function(e) {
return this.calcRatio(e) * 100;
},
updateBarPosition: function(e) {
this.$.bar.applyStyle("width", e + "%");
},
animateProgressTo: function(e) {
this.$.progressAnimator.play({
startValue: this.progress,
endValue: e,
node: this.hasNode()
});
},
progressAnimatorStep: function(e) {
return this.setProgress(e.value), !0;
},
progressAnimatorComplete: function(e) {
return this.doAnimateProgressFinish(e), !0;
}
});

// ProgressButton.js

enyo.kind({
name: "onyx.ProgressButton",
kind: "onyx.ProgressBar",
classes: "onyx-progress-button",
events: {
onCancel: ""
},
components: [ {
name: "progressAnimator",
kind: "Animator",
onStep: "progressAnimatorStep",
onEnd: "progressAnimatorComplete"
}, {
name: "bar",
classes: "onyx-progress-bar-bar onyx-progress-button-bar"
}, {
name: "client",
classes: "onyx-progress-button-client"
}, {
kind: "onyx.Icon",
src: "$lib/onyx/images/progress-button-cancel.png",
classes: "onyx-progress-button-icon",
ontap: "cancelTap"
} ],
cancelTap: function() {
this.doCancel();
}
});

// Scrim.js

enyo.kind({
name: "onyx.Scrim",
showing: !1,
classes: "onyx-scrim enyo-fit",
floating: !1,
create: function() {
this.inherited(arguments), this.zStack = [], this.floating && this.setParent(enyo.floatingLayer);
},
showingChanged: function() {
this.floating && this.showing && !this.hasNode() && this.render(), this.inherited(arguments);
},
addZIndex: function(e) {
enyo.indexOf(e, this.zStack) < 0 && this.zStack.push(e);
},
removeZIndex: function(e) {
enyo.remove(e, this.zStack);
},
showAtZIndex: function(e) {
this.addZIndex(e), e !== undefined && this.setZIndex(e), this.show();
},
hideAtZIndex: function(e) {
this.removeZIndex(e);
if (!this.zStack.length) this.hide(); else {
var t = this.zStack[this.zStack.length - 1];
this.setZIndex(t);
}
},
setZIndex: function(e) {
this.zIndex = e, this.applyStyle("z-index", e);
},
make: function() {
return this;
}
}), enyo.kind({
name: "onyx.scrimSingleton",
kind: null,
constructor: function(e, t) {
this.instanceName = e, enyo.setObject(this.instanceName, this), this.props = t || {};
},
make: function() {
var e = new onyx.Scrim(this.props);
return enyo.setObject(this.instanceName, e), e;
},
showAtZIndex: function(e) {
var t = this.make();
t.showAtZIndex(e);
},
hideAtZIndex: enyo.nop,
show: function() {
var e = this.make();
e.show();
}
}), new onyx.scrimSingleton("onyx.scrim", {
floating: !0,
classes: "onyx-scrim-translucent"
}), new onyx.scrimSingleton("onyx.scrimTransparent", {
floating: !0,
classes: "onyx-scrim-transparent"
});

// Slider.js

enyo.kind({
name: "onyx.Slider",
kind: "onyx.ProgressBar",
classes: "onyx-slider",
published: {
value: 0,
lockBar: !0,
tappable: !0
},
events: {
onChange: "",
onChanging: "",
onAnimateFinish: ""
},
showStripes: !1,
handlers: {
ondragstart: "dragstart",
ondrag: "drag",
ondragfinish: "dragfinish"
},
moreComponents: [ {
kind: "Animator",
onStep: "animatorStep",
onEnd: "animatorComplete"
}, {
classes: "onyx-slider-taparea"
}, {
name: "knob",
classes: "onyx-slider-knob"
} ],
create: function() {
this.inherited(arguments), this.createComponents(this.moreComponents), this.valueChanged();
},
valueChanged: function() {
this.value = this.clampValue(this.min, this.max, this.value);
var e = this.calcPercent(this.value);
this.updateKnobPosition(e), this.lockBar && this.setProgress(this.value);
},
updateKnobPosition: function(e) {
this.$.knob.applyStyle("left", e + "%");
},
calcKnobPosition: function(e) {
var t = e.clientX - this.hasNode().getBoundingClientRect().left;
return t / this.getBounds().width * (this.max - this.min) + this.min;
},
dragstart: function(e, t) {
if (t.horizontal) return t.preventDefault(), this.dragging = !0, !0;
},
drag: function(e, t) {
if (this.dragging) {
var n = this.calcKnobPosition(t);
return this.setValue(n), this.doChanging({
value: this.value
}), !0;
}
},
dragfinish: function(e, t) {
return this.dragging = !1, t.preventTap(), this.doChange({
value: this.value
}), !0;
},
tap: function(e, t) {
if (this.tappable) {
var n = this.calcKnobPosition(t);
return this.tapped = !0, this.animateTo(n), !0;
}
},
animateTo: function(e) {
this.$.animator.play({
startValue: this.value,
endValue: e,
node: this.hasNode()
});
},
animatorStep: function(e) {
return this.setValue(e.value), !0;
},
animatorComplete: function(e) {
return this.tapped && (this.tapped = !1, this.doChange({
value: this.value
})), this.doAnimateFinish(e), !0;
}
});

// RangeSlider.js

enyo.kind({
name: "onyx.RangeSlider",
kind: "onyx.ProgressBar",
classes: "onyx-slider",
published: {
rangeMin: 0,
rangeMax: 100,
rangeStart: 0,
rangeEnd: 100,
increment: 0,
beginValue: 0,
endValue: 0
},
events: {
onChange: "",
onChanging: ""
},
showStripes: !1,
showLabels: !1,
handlers: {
ondragstart: "dragstart",
ondrag: "drag",
ondragfinish: "dragfinish",
ondown: "down"
},
moreComponents: [ {
name: "startKnob",
classes: "onyx-slider-knob"
}, {
name: "endKnob",
classes: "onyx-slider-knob onyx-range-slider-knob"
} ],
create: function() {
this.inherited(arguments), this.createComponents(this.moreComponents), this.initControls();
},
rendered: function() {
this.inherited(arguments);
var e = this.calcPercent(this.beginValue);
this.updateBarPosition(e);
},
initControls: function() {
this.$.bar.applyStyle("position", "relative"), this.refreshRangeSlider(), this.showLabels && (this.$.startKnob.createComponent({
name: "startLabel",
kind: "onyx.RangeSliderKnobLabel"
}), this.$.endKnob.createComponent({
name: "endLabel",
kind: "onyx.RangeSliderKnobLabel"
}));
},
refreshRangeSlider: function() {
this.beginValue = this.calcKnobPercent(this.rangeStart), this.endValue = this.calcKnobPercent(this.rangeEnd), this.beginValueChanged(), this.endValueChanged();
},
calcKnobRatio: function(e) {
return (e - this.rangeMin) / (this.rangeMax - this.rangeMin);
},
calcKnobPercent: function(e) {
return this.calcKnobRatio(e) * 100;
},
beginValueChanged: function(e) {
if (e === undefined) {
var t = this.calcPercent(this.beginValue);
this.updateKnobPosition(t, this.$.startKnob);
}
},
endValueChanged: function(e) {
if (e === undefined) {
var t = this.calcPercent(this.endValue);
this.updateKnobPosition(t, this.$.endKnob);
}
},
calcKnobPosition: function(e) {
var t = e.clientX - this.hasNode().getBoundingClientRect().left;
return t / this.getBounds().width * (this.max - this.min) + this.min;
},
updateKnobPosition: function(e, t) {
t.applyStyle("left", e + "%"), this.updateBarPosition();
},
updateBarPosition: function() {
if (this.$.startKnob !== undefined && this.$.endKnob !== undefined) {
var e = this.calcKnobPercent(this.rangeStart), t = this.calcKnobPercent(this.rangeEnd) - e;
this.$.bar.applyStyle("left", e + "%"), this.$.bar.applyStyle("width", t + "%");
}
},
calcIncrement: function(e) {
return Math.ceil(e / this.increment) * this.increment;
},
calcRangeRatio: function(e) {
return e / 100 * (this.rangeMax - this.rangeMin) + this.rangeMin - this.increment / 2;
},
swapZIndex: function(e) {
e === "startKnob" ? (this.$.startKnob.applyStyle("z-index", 1), this.$.endKnob.applyStyle("z-index", 0)) : e === "endKnob" && (this.$.startKnob.applyStyle("z-index", 0), this.$.endKnob.applyStyle("z-index", 1));
},
down: function(e, t) {
this.swapZIndex(e.name);
},
dragstart: function(e, t) {
if (t.horizontal) return t.preventDefault(), this.dragging = !0, !0;
},
drag: function(e, t) {
if (this.dragging) {
var n = this.calcKnobPosition(t);
if (e.name === "startKnob" && n >= 0) {
if (n <= this.endValue && t.xDirection === -1 || n <= this.endValue) {
this.setBeginValue(n);
var r = this.calcRangeRatio(this.beginValue), i = this.increment ? this.calcIncrement(r) : r, s = this.calcKnobPercent(i);
this.updateKnobPosition(s, this.$.startKnob), this.setRangeStart(i), this.doChanging({
value: i
});
}
} else if (e.name === "endKnob" && n <= 100) if (n >= this.beginValue && t.xDirection === 1 || n >= this.beginValue) {
this.setEndValue(n);
var r = this.calcRangeRatio(this.endValue), i = this.increment ? this.calcIncrement(r) : r, s = this.calcKnobPercent(i);
this.updateKnobPosition(s, this.$.endKnob), this.setRangeEnd(i), this.doChanging({
value: i
});
}
return !0;
}
},
dragfinish: function(e, t) {
this.dragging = !1, t.preventTap();
if (e.name === "startKnob") {
var n = this.calcRangeRatio(this.beginValue);
this.doChange({
value: n,
startChanged: !0
});
} else if (e.name === "endKnob") {
var n = this.calcRangeRatio(this.endValue);
this.doChange({
value: n,
startChanged: !1
});
}
return !0;
},
rangeMinChanged: function() {
this.refreshRangeSlider();
},
rangeMaxChanged: function() {
this.refreshRangeSlider();
},
rangeStartChanged: function() {
this.refreshRangeSlider();
},
rangeEndChanged: function() {
this.refreshRangeSlider();
},
setStartLabel: function(e) {
this.$.startKnob.waterfallDown("onSetLabel", e);
},
setEndLabel: function(e) {
this.$.endKnob.waterfallDown("onSetLabel", e);
}
}), enyo.kind({
name: "onyx.RangeSliderKnobLabel",
classes: "onyx-range-slider-label",
handlers: {
onSetLabel: "setLabel"
},
setLabel: function(e, t) {
this.setContent(t);
}
});

// Item.js

enyo.kind({
name: "onyx.Item",
classes: "onyx-item",
tapHighlight: !0,
handlers: {
onhold: "hold",
onrelease: "release"
},
hold: function(e, t) {
this.tapHighlight && onyx.Item.addFlyweightClass(this.controlParent || this, "onyx-highlight", t);
},
release: function(e, t) {
this.tapHighlight && onyx.Item.removeFlyweightClass(this.controlParent || this, "onyx-highlight", t);
},
statics: {
addFlyweightClass: function(e, t, n, r) {
var i = n.flyweight;
if (i) {
var s = r !== undefined ? r : n.index;
i.performOnRow(s, function() {
e.hasClass(t) ? e.setClassAttribute(e.getClassAttribute()) : e.addClass(t);
}), e.removeClass(t);
}
},
removeFlyweightClass: function(e, t, n, r) {
var i = n.flyweight;
if (i) {
var s = r !== undefined ? r : n.index;
i.performOnRow(s, function() {
e.hasClass(t) ? e.removeClass(t) : e.setClassAttribute(e.getClassAttribute());
});
}
}
}
});

// Spinner.js

enyo.kind({
name: "onyx.Spinner",
classes: "onyx-spinner",
stop: function() {
this.setShowing(!1);
},
start: function() {
this.setShowing(!0);
},
toggle: function() {
this.setShowing(!this.getShowing());
}
});

// MoreToolbar.js

enyo.kind({
name: "onyx.MoreToolbar",
classes: "onyx-toolbar onyx-more-toolbar",
menuClass: "",
movedClass: "",
layoutKind: "FittableColumnsLayout",
noStretch: !0,
handlers: {
onHide: "reflow"
},
published: {
clientLayoutKind: "FittableColumnsLayout"
},
tools: [ {
name: "client",
noStretch: !0,
fit: !0,
classes: "onyx-toolbar-inline"
}, {
name: "nard",
kind: "onyx.MenuDecorator",
showing: !1,
onActivate: "activated",
components: [ {
kind: "onyx.IconButton",
classes: "onyx-more-button"
}, {
name: "menu",
kind: "onyx.Menu",
scrolling: !1,
classes: "onyx-more-menu"
} ]
} ],
initComponents: function() {
this.menuClass && this.menuClass.length > 0 && !this.$.menu.hasClass(this.menuClass) && this.$.menu.addClass(this.menuClass), this.createChrome(this.tools), this.inherited(arguments), this.$.client.setLayoutKind(this.clientLayoutKind);
},
clientLayoutKindChanged: function() {
this.$.client.setLayoutKind(this.clientLayoutKind);
},
reflow: function() {
this.inherited(arguments), this.isContentOverflowing() ? (this.$.nard.show(), this.popItem() && this.reflow()) : this.tryPushItem() ? this.reflow() : this.$.menu.children.length || (this.$.nard.hide(), this.$.menu.hide());
},
activated: function(e, t) {
this.addRemoveClass("active", t.originator.active);
},
popItem: function() {
var e = this.findCollapsibleItem();
if (e) {
this.movedClass && this.movedClass.length > 0 && !e.hasClass(this.movedClass) && e.addClass(this.movedClass), this.$.menu.addChild(e, null);
var t = this.$.menu.hasNode();
return t && e.hasNode() && e.insertNodeInParent(t), !0;
}
},
pushItem: function() {
var e = this.$.menu.children, t = e[0];
if (t) {
this.movedClass && this.movedClass.length > 0 && t.hasClass(this.movedClass) && t.removeClass(this.movedClass), this.$.client.addChild(t);
var n = this.$.client.hasNode();
if (n && t.hasNode()) {
var r, i;
for (var s = 0; s < this.$.client.children.length; s++) {
var o = this.$.client.children[s];
if (o.toolbarIndex !== undefined && o.toolbarIndex != s) {
r = o, i = s;
break;
}
}
if (r && r.hasNode()) {
t.insertNodeInParent(n, r.node);
var u = this.$.client.children.pop();
this.$.client.children.splice(i, 0, u);
} else t.appendNodeToParent(n);
}
return !0;
}
},
tryPushItem: function() {
if (this.pushItem()) {
if (!this.isContentOverflowing()) return !0;
this.popItem();
}
},
isContentOverflowing: function() {
if (this.$.client.hasNode()) {
var e = this.$.client.children, t = e[e.length - 1].hasNode();
if (t) return this.$.client.reflow(), t.offsetLeft + t.offsetWidth > this.$.client.node.clientWidth;
}
},
findCollapsibleItem: function() {
var e = this.$.client.children;
for (var t = e.length - 1; c = e[t]; t--) {
if (!c.unmoveable) return c;
c.toolbarIndex === undefined && (c.toolbarIndex = t);
}
}
});

// FittableLayout.js

enyo.kind({
name: "enyo.FittableLayout",
kind: "Layout",
calcFitIndex: function() {
for (var e = 0, t = this.container.children, n; n = t[e]; e++) if (n.fit && n.showing) return e;
},
getFitControl: function() {
var e = this.container.children, t = e[this.fitIndex];
return t && t.fit && t.showing || (this.fitIndex = this.calcFitIndex(), t = e[this.fitIndex]), t;
},
getLastControl: function() {
var e = this.container.children, t = e.length - 1, n = e[t];
while ((n = e[t]) && !n.showing) t--;
return n;
},
_reflow: function(e, t, n, r) {
this.container.addRemoveClass("enyo-stretch", !this.container.noStretch);
var i = this.getFitControl();
if (!i) return;
var s = 0, o = 0, u = 0, a, f = this.container.hasNode();
f && (a = enyo.dom.calcPaddingExtents(f), s = f[t] - (a[n] + a[r]));
var l = i.getBounds();
o = l[n] - (a && a[n] || 0);
var c = this.getLastControl();
if (c) {
var h = enyo.dom.getComputedBoxValue(c.hasNode(), "margin", r) || 0;
if (c != i) {
var p = c.getBounds(), d = l[n] + l[e], v = p[n] + p[e] + h;
u = v - d;
} else u = h;
}
var m = s - (o + u);
i.applyStyle(e, m + "px");
},
reflow: function() {
this.orient == "h" ? this._reflow("width", "clientWidth", "left", "right") : this._reflow("height", "clientHeight", "top", "bottom");
}
}), enyo.kind({
name: "enyo.FittableColumnsLayout",
kind: "FittableLayout",
orient: "h",
layoutClass: "enyo-fittable-columns-layout"
}), enyo.kind({
name: "enyo.FittableRowsLayout",
kind: "FittableLayout",
layoutClass: "enyo-fittable-rows-layout",
orient: "v"
});

// FittableRows.js

enyo.kind({
name: "enyo.FittableRows",
layoutKind: "FittableRowsLayout",
noStretch: !1
});

// FittableColumns.js

enyo.kind({
name: "enyo.FittableColumns",
layoutKind: "FittableColumnsLayout",
noStretch: !1
});

// FlyweightRepeater.js

enyo.kind({
name: "enyo.FlyweightRepeater",
published: {
count: 0,
noSelect: !1,
multiSelect: !1,
toggleSelected: !1,
clientClasses: "",
clientStyle: ""
},
events: {
onSetupItem: ""
},
bottomUp: !1,
components: [ {
kind: "Selection",
onSelect: "selectDeselect",
onDeselect: "selectDeselect"
}, {
name: "client"
} ],
rowOffset: 0,
create: function() {
this.inherited(arguments), this.noSelectChanged(), this.multiSelectChanged(), this.clientClassesChanged(), this.clientStyleChanged();
},
noSelectChanged: function() {
this.noSelect && this.$.selection.clear();
},
multiSelectChanged: function() {
this.$.selection.setMulti(this.multiSelect);
},
clientClassesChanged: function() {
this.$.client.setClasses(this.clientClasses);
},
clientStyleChanged: function() {
this.$.client.setStyle(this.clientStyle);
},
setupItem: function(e) {
this.doSetupItem({
index: e,
selected: this.isSelected(e)
});
},
generateChildHtml: function() {
var e = "";
this.index = null;
for (var t = 0, n = 0; t < this.count; t++) n = this.rowOffset + (this.bottomUp ? this.count - t - 1 : t), this.setupItem(n), this.$.client.setAttribute("data-enyo-index", n), e += this.inherited(arguments), this.$.client.teardownRender();
return e;
},
previewDomEvent: function(e) {
var t = this.index = this.rowForEvent(e);
e.rowIndex = e.index = t, e.flyweight = this;
},
decorateEvent: function(e, t, n) {
var r = t && t.index != null ? t.index : this.index;
t && r != null && (t.index = r, t.flyweight = this), this.inherited(arguments);
},
tap: function(e, t) {
if (this.noSelect) return;
this.toggleSelected ? this.$.selection.toggle(t.index) : this.$.selection.select(t.index);
},
selectDeselect: function(e, t) {
this.renderRow(t.key);
},
getSelection: function() {
return this.$.selection;
},
isSelected: function(e) {
return this.getSelection().isSelected(e);
},
renderRow: function(e) {
var t = this.fetchRowNode(e);
t && (this.setupItem(e), t.innerHTML = this.$.client.generateChildHtml(), this.$.client.teardownChildren());
},
fetchRowNode: function(e) {
if (this.hasNode()) {
var t = this.node.querySelectorAll('[data-enyo-index="' + e + '"]');
return t && t[0];
}
},
rowForEvent: function(e) {
var t = e.target, n = this.hasNode().id;
while (t && t.parentNode && t.id != n) {
var r = t.getAttribute && t.getAttribute("data-enyo-index");
if (r !== null) return Number(r);
t = t.parentNode;
}
return -1;
},
prepareRow: function(e) {
var t = this.fetchRowNode(e);
enyo.FlyweightRepeater.claimNode(this.$.client, t);
},
lockRow: function() {
this.$.client.teardownChildren();
},
performOnRow: function(e, t, n) {
t && (this.prepareRow(e), enyo.call(n || null, t), this.lockRow());
},
statics: {
claimNode: function(e, t) {
var n = t && t.querySelectorAll("#" + e.id);
n = n && n[0], e.generated = Boolean(n || !e.tag), e.node = n, e.node && e.rendered();
for (var r = 0, i = e.children, s; s = i[r]; r++) this.claimNode(s, t);
}
}
});

// List.js

enyo.kind({
name: "enyo.List",
kind: "Scroller",
classes: "enyo-list",
published: {
count: 0,
rowsPerPage: 50,
bottomUp: !1,
noSelect: !1,
multiSelect: !1,
toggleSelected: !1,
fixedHeight: !1
},
events: {
onSetupItem: ""
},
handlers: {
onAnimateFinish: "animateFinish"
},
rowHeight: 0,
listTools: [ {
name: "port",
classes: "enyo-list-port enyo-border-box",
components: [ {
name: "generator",
kind: "FlyweightRepeater",
canGenerate: !1,
components: [ {
tag: null,
name: "client"
} ]
}, {
name: "page0",
allowHtml: !0,
classes: "enyo-list-page"
}, {
name: "page1",
allowHtml: !0,
classes: "enyo-list-page"
} ]
} ],
create: function() {
this.pageHeights = [], this.inherited(arguments), this.getStrategy().translateOptimized = !0, this.bottomUpChanged(), this.noSelectChanged(), this.multiSelectChanged(), this.toggleSelectedChanged();
},
createStrategy: function() {
this.controlParentName = "strategy", this.inherited(arguments), this.createChrome(this.listTools), this.controlParentName = "client", this.discoverControlParent();
},
rendered: function() {
this.inherited(arguments), this.$.generator.node = this.$.port.hasNode(), this.$.generator.generated = !0, this.reset();
},
resizeHandler: function() {
this.inherited(arguments), this.refresh();
},
bottomUpChanged: function() {
this.$.generator.bottomUp = this.bottomUp, this.$.page0.applyStyle(this.pageBound, null), this.$.page1.applyStyle(this.pageBound, null), this.pageBound = this.bottomUp ? "bottom" : "top", this.hasNode() && this.reset();
},
noSelectChanged: function() {
this.$.generator.setNoSelect(this.noSelect);
},
multiSelectChanged: function() {
this.$.generator.setMultiSelect(this.multiSelect);
},
toggleSelectedChanged: function() {
this.$.generator.setToggleSelected(this.toggleSelected);
},
countChanged: function() {
this.hasNode() && this.updateMetrics();
},
updateMetrics: function() {
this.defaultPageHeight = this.rowsPerPage * (this.rowHeight || 100), this.pageCount = Math.ceil(this.count / this.rowsPerPage), this.portSize = 0;
for (var e = 0; e < this.pageCount; e++) this.portSize += this.getPageHeight(e);
this.adjustPortSize();
},
generatePage: function(e, t) {
this.page = e;
var n = this.$.generator.rowOffset = this.rowsPerPage * this.page, r = this.$.generator.count = Math.min(this.count - n, this.rowsPerPage), i = this.$.generator.generateChildHtml();
t.setContent(i);
var s = t.getBounds().height;
!this.rowHeight && s > 0 && (this.rowHeight = Math.floor(s / r), this.updateMetrics());
if (!this.fixedHeight) {
var o = this.getPageHeight(e);
o != s && s > 0 && (this.pageHeights[e] = s, this.portSize += s - o);
}
},
update: function(e) {
var t = !1, n = this.positionToPageInfo(e), r = n.pos + this.scrollerHeight / 2, i = Math.floor(r / Math.max(n.height, this.scrollerHeight) + .5) + n.no, s = i % 2 === 0 ? i : i - 1;
this.p0 != s && this.isPageInRange(s) && (this.generatePage(s, this.$.page0), this.positionPage(s, this.$.page0), this.p0 = s, t = !0), s = i % 2 === 0 ? Math.max(1, i - 1) : i, this.p1 != s && this.isPageInRange(s) && (this.generatePage(s, this.$.page1), this.positionPage(s, this.$.page1), this.p1 = s, t = !0), t && !this.fixedHeight && (this.adjustBottomPage(), this.adjustPortSize());
},
updateForPosition: function(e) {
this.update(this.calcPos(e));
},
calcPos: function(e) {
return this.bottomUp ? this.portSize - this.scrollerHeight - e : e;
},
adjustBottomPage: function() {
var e = this.p0 >= this.p1 ? this.$.page0 : this.$.page1;
this.positionPage(e.pageNo, e);
},
adjustPortSize: function() {
this.scrollerHeight = this.getBounds().height;
var e = Math.max(this.scrollerHeight, this.portSize);
this.$.port.applyStyle("height", e + "px");
},
positionPage: function(e, t) {
t.pageNo = e;
var n = this.pageToPosition(e);
t.applyStyle(this.pageBound, n + "px");
},
pageToPosition: function(e) {
var t = 0, n = e;
while (n > 0) n--, t += this.getPageHeight(n);
return t;
},
positionToPageInfo: function(e) {
var t = -1, n = this.calcPos(e), r = this.defaultPageHeight;
while (n >= 0) t++, r = this.getPageHeight(t), n -= r;
return {
no: t,
height: r,
pos: n + r
};
},
isPageInRange: function(e) {
return e == Math.max(0, Math.min(this.pageCount - 1, e));
},
getPageHeight: function(e) {
return this.pageHeights[e] || this.defaultPageHeight;
},
invalidatePages: function() {
this.p0 = this.p1 = null, this.$.page0.setContent(""), this.$.page1.setContent("");
},
invalidateMetrics: function() {
this.pageHeights = [], this.rowHeight = 0, this.updateMetrics();
},
scroll: function(e, t) {
var n = this.inherited(arguments);
return this.update(this.getScrollTop()), n;
},
scrollToBottom: function() {
this.update(this.getScrollBounds().maxTop), this.inherited(arguments);
},
setScrollTop: function(e) {
this.update(e), this.inherited(arguments), this.twiddle();
},
getScrollPosition: function() {
return this.calcPos(this.getScrollTop());
},
setScrollPosition: function(e) {
this.setScrollTop(this.calcPos(e));
},
scrollToRow: function(e) {
var t = Math.floor(e / this.rowsPerPage), n = e % this.rowsPerPage, r = this.pageToPosition(t);
this.updateForPosition(r), r = this.pageToPosition(t), this.setScrollPosition(r);
if (t == this.p0 || t == this.p1) {
var i = this.$.generator.fetchRowNode(e);
if (i) {
var s = i.offsetTop;
this.bottomUp && (s = this.getPageHeight(t) - i.offsetHeight - s);
var o = this.getScrollPosition() + s;
this.setScrollPosition(o);
}
}
},
scrollToStart: function() {
this[this.bottomUp ? "scrollToBottom" : "scrollToTop"]();
},
scrollToEnd: function() {
this[this.bottomUp ? "scrollToTop" : "scrollToBottom"]();
},
refresh: function() {
this.invalidatePages(), this.update(this.getScrollTop()), this.stabilize(), enyo.platform.android === 4 && this.twiddle();
},
reset: function() {
this.getSelection().clear(), this.invalidateMetrics(), this.invalidatePages(), this.stabilize(), this.scrollToStart();
},
getSelection: function() {
return this.$.generator.getSelection();
},
select: function(e, t) {
return this.getSelection().select(e, t);
},
deselect: function(e) {
return this.getSelection().deselect(e);
},
isSelected: function(e) {
return this.$.generator.isSelected(e);
},
renderRow: function(e) {
this.$.generator.renderRow(e);
},
prepareRow: function(e) {
this.$.generator.prepareRow(e);
},
lockRow: function() {
this.$.generator.lockRow();
},
performOnRow: function(e, t, n) {
this.$.generator.performOnRow(e, t, n);
},
animateFinish: function(e) {
return this.twiddle(), !0;
},
twiddle: function() {
var e = this.getStrategy();
enyo.call(e, "twiddle");
}
});

// PulldownList.js

enyo.kind({
name: "enyo.PulldownList",
kind: "List",
touch: !0,
pully: null,
pulldownTools: [ {
name: "pulldown",
classes: "enyo-list-pulldown",
components: [ {
name: "puller",
kind: "Puller"
} ]
} ],
events: {
onPullStart: "",
onPullCancel: "",
onPull: "",
onPullRelease: "",
onPullComplete: ""
},
handlers: {
onScrollStart: "scrollStartHandler",
onScrollStop: "scrollStopHandler",
ondragfinish: "dragfinish"
},
pullingMessage: "Pull down to refresh...",
pulledMessage: "Release to refresh...",
loadingMessage: "Loading...",
pullingIconClass: "enyo-puller-arrow enyo-puller-arrow-down",
pulledIconClass: "enyo-puller-arrow enyo-puller-arrow-up",
loadingIconClass: "",
create: function() {
var e = {
kind: "Puller",
showing: !1,
text: this.loadingMessage,
iconClass: this.loadingIconClass,
onCreate: "setPully"
};
this.listTools.splice(0, 0, e), this.inherited(arguments), this.setPulling();
},
initComponents: function() {
this.createChrome(this.pulldownTools), this.accel = enyo.dom.canAccelerate(), this.translation = this.accel ? "translate3d" : "translate", this.inherited(arguments);
},
setPully: function(e, t) {
this.pully = t.originator;
},
scrollStartHandler: function() {
this.firedPullStart = !1, this.firedPull = !1, this.firedPullCancel = !1;
},
scroll: function(e, t) {
var n = this.inherited(arguments);
this.completingPull && this.pully.setShowing(!1);
var r = this.getStrategy().$.scrollMath, i = r.y;
return r.isInOverScroll() && i > 0 && (enyo.dom.transformValue(this.$.pulldown, this.translation, "0," + i + "px" + (this.accel ? ",0" : "")), this.firedPullStart || (this.firedPullStart = !0, this.pullStart(), this.pullHeight = this.$.pulldown.getBounds().height), i > this.pullHeight && !this.firedPull && (this.firedPull = !0, this.firedPullCancel = !1, this.pull()), this.firedPull && !this.firedPullCancel && i < this.pullHeight && (this.firedPullCancel = !0, this.firedPull = !1, this.pullCancel())), n;
},
scrollStopHandler: function() {
this.completingPull && (this.completingPull = !1, this.doPullComplete());
},
dragfinish: function() {
if (this.firedPull) {
var e = this.getStrategy().$.scrollMath;
e.setScrollY(e.y - this.pullHeight), this.pullRelease();
}
},
completePull: function() {
this.completingPull = !0, this.$.strategy.$.scrollMath.setScrollY(this.pullHeight), this.$.strategy.$.scrollMath.start();
},
pullStart: function() {
this.setPulling(), this.pully.setShowing(!1), this.$.puller.setShowing(!0), this.doPullStart();
},
pull: function() {
this.setPulled(), this.doPull();
},
pullCancel: function() {
this.setPulling(), this.doPullCancel();
},
pullRelease: function() {
this.$.puller.setShowing(!1), this.pully.setShowing(!0), this.doPullRelease();
},
setPulling: function() {
this.$.puller.setText(this.pullingMessage), this.$.puller.setIconClass(this.pullingIconClass);
},
setPulled: function() {
this.$.puller.setText(this.pulledMessage), this.$.puller.setIconClass(this.pulledIconClass);
}
}), enyo.kind({
name: "enyo.Puller",
classes: "enyo-puller",
published: {
text: "",
iconClass: ""
},
events: {
onCreate: ""
},
components: [ {
name: "icon"
}, {
name: "text",
tag: "span",
classes: "enyo-puller-text"
} ],
create: function() {
this.inherited(arguments), this.doCreate(), this.textChanged(), this.iconClassChanged();
},
textChanged: function() {
this.$.text.setContent(this.text);
},
iconClassChanged: function() {
this.$.icon.setClasses(this.iconClass);
}
});

// AroundList.js

enyo.kind({
name: "enyo.AroundList",
kind: "enyo.List",
listTools: [ {
name: "port",
classes: "enyo-list-port enyo-border-box",
components: [ {
name: "aboveClient"
}, {
name: "generator",
kind: "enyo.FlyweightRepeater",
canGenerate: !1,
components: [ {
tag: null,
name: "client"
} ]
}, {
name: "page0",
allowHtml: !0,
classes: "enyo-list-page"
}, {
name: "page1",
allowHtml: !0,
classes: "enyo-list-page"
}, {
name: "belowClient"
} ]
} ],
aboveComponents: null,
initComponents: function() {
this.inherited(arguments), this.aboveComponents && this.$.aboveClient.createComponents(this.aboveComponents, {
owner: this.owner
}), this.belowComponents && this.$.belowClient.createComponents(this.belowComponents, {
owner: this.owner
});
},
updateMetrics: function() {
this.defaultPageHeight = this.rowsPerPage * (this.rowHeight || 100), this.pageCount = Math.ceil(this.count / this.rowsPerPage), this.aboveHeight = this.$.aboveClient.getBounds().height, this.belowHeight = this.$.belowClient.getBounds().height, this.portSize = this.aboveHeight + this.belowHeight;
for (var e = 0; e < this.pageCount; e++) this.portSize += this.getPageHeight(e);
this.adjustPortSize();
},
positionPage: function(e, t) {
t.pageNo = e;
var n = this.pageToPosition(e), r = this.bottomUp ? this.belowHeight : this.aboveHeight;
n += r, t.applyStyle(this.pageBound, n + "px");
},
scrollToContentStart: function() {
var e = this.bottomUp ? this.belowHeight : this.aboveHeight;
this.setScrollPosition(e);
}
});

// Slideable.js

enyo.kind({
name: "enyo.Slideable",
kind: "Control",
published: {
axis: "h",
value: 0,
unit: "px",
min: 0,
max: 0,
accelerated: "auto",
overMoving: !0,
draggable: !0
},
events: {
onAnimateFinish: "",
onChange: ""
},
preventDragPropagation: !1,
tools: [ {
kind: "Animator",
onStep: "animatorStep",
onEnd: "animatorComplete"
} ],
handlers: {
ondragstart: "dragstart",
ondrag: "drag",
ondragfinish: "dragfinish"
},
kDragScalar: 1,
dragEventProp: "dx",
unitModifier: !1,
canTransform: !1,
create: function() {
this.inherited(arguments), this.acceleratedChanged(), this.transformChanged(), this.axisChanged(), this.valueChanged(), this.addClass("enyo-slideable");
},
initComponents: function() {
this.createComponents(this.tools), this.inherited(arguments);
},
rendered: function() {
this.inherited(arguments), this.canModifyUnit(), this.updateDragScalar();
},
resizeHandler: function() {
this.inherited(arguments), this.updateDragScalar();
},
canModifyUnit: function() {
if (!this.canTransform) {
var e = this.getInitialStyleValue(this.hasNode(), this.boundary);
e.match(/px/i) && this.unit === "%" && (this.unitModifier = this.getBounds()[this.dimension]);
}
},
getInitialStyleValue: function(e, t) {
var n = enyo.dom.getComputedStyle(e);
return n ? n.getPropertyValue(t) : e && e.currentStyle ? e.currentStyle[t] : "0";
},
updateBounds: function(e, t) {
var n = {};
n[this.boundary] = e, this.setBounds(n, this.unit), this.setInlineStyles(e, t);
},
updateDragScalar: function() {
if (this.unit == "%") {
var e = this.getBounds()[this.dimension];
this.kDragScalar = e ? 100 / e : 1, this.canTransform || this.updateBounds(this.value, 100);
}
},
transformChanged: function() {
this.canTransform = enyo.dom.canTransform();
},
acceleratedChanged: function() {
enyo.platform.android > 2 || enyo.dom.accelerate(this, this.accelerated);
},
axisChanged: function() {
var e = this.axis == "h";
this.dragMoveProp = e ? "dx" : "dy", this.shouldDragProp = e ? "horizontal" : "vertical", this.transform = e ? "translateX" : "translateY", this.dimension = e ? "width" : "height", this.boundary = e ? "left" : "top";
},
setInlineStyles: function(e, t) {
var n = {};
this.unitModifier ? (n[this.boundary] = this.percentToPixels(e, this.unitModifier), n[this.dimension] = this.unitModifier, this.setBounds(n)) : (t ? n[this.dimension] = t : n[this.boundary] = e, this.setBounds(n, this.unit));
},
valueChanged: function(e) {
var t = this.value;
this.isOob(t) && !this.isAnimating() && (this.value = this.overMoving ? this.dampValue(t) : this.clampValue(t)), enyo.platform.android > 2 && (this.value ? (e === 0 || e === undefined) && enyo.dom.accelerate(this, this.accelerated) : enyo.dom.accelerate(this, !1)), this.canTransform ? enyo.dom.transformValue(this, this.transform, this.value + this.unit) : this.setInlineStyles(this.value, !1), this.doChange();
},
getAnimator: function() {
return this.$.animator;
},
isAtMin: function() {
return this.value <= this.calcMin();
},
isAtMax: function() {
return this.value >= this.calcMax();
},
calcMin: function() {
return this.min;
},
calcMax: function() {
return this.max;
},
clampValue: function(e) {
var t = this.calcMin(), n = this.calcMax();
return Math.max(t, Math.min(e, n));
},
dampValue: function(e) {
return this.dampBound(this.dampBound(e, this.min, 1), this.max, -1);
},
dampBound: function(e, t, n) {
var r = e;
return r * n < t * n && (r = t + (r - t) / 4), r;
},
percentToPixels: function(e, t) {
return Math.floor(t / 100 * e);
},
pixelsToPercent: function(e) {
var t = this.unitModifier ? this.getBounds()[this.dimension] : this.container.getBounds()[this.dimension];
return e / t * 100;
},
shouldDrag: function(e) {
return this.draggable && e[this.shouldDragProp];
},
isOob: function(e) {
return e > this.calcMax() || e < this.calcMin();
},
dragstart: function(e, t) {
if (this.shouldDrag(t)) return t.preventDefault(), this.$.animator.stop(), t.dragInfo = {}, this.dragging = !0, this.drag0 = this.value, this.dragd0 = 0, this.preventDragPropagation;
},
drag: function(e, t) {
if (this.dragging) {
t.preventDefault();
var n = this.canTransform ? t[this.dragMoveProp] * this.kDragScalar : this.pixelsToPercent(t[this.dragMoveProp]), r = this.drag0 + n, i = n - this.dragd0;
return this.dragd0 = n, i && (t.dragInfo.minimizing = i < 0), this.setValue(r), this.preventDragPropagation;
}
},
dragfinish: function(e, t) {
if (this.dragging) return this.dragging = !1, this.completeDrag(t), t.preventTap(), this.preventDragPropagation;
},
completeDrag: function(e) {
this.value !== this.calcMax() && this.value != this.calcMin() && this.animateToMinMax(e.dragInfo.minimizing);
},
isAnimating: function() {
return this.$.animator.isAnimating();
},
play: function(e, t) {
this.$.animator.play({
startValue: e,
endValue: t,
node: this.hasNode()
});
},
animateTo: function(e) {
this.play(this.value, e);
},
animateToMin: function() {
this.animateTo(this.calcMin());
},
animateToMax: function() {
this.animateTo(this.calcMax());
},
animateToMinMax: function(e) {
e ? this.animateToMin() : this.animateToMax();
},
animatorStep: function(e) {
return this.setValue(e.value), !0;
},
animatorComplete: function(e) {
return this.doAnimateFinish(e), !0;
},
toggleMinMax: function() {
this.animateToMinMax(!this.isAtMin());
}
});

// Arranger.js

enyo.kind({
name: "enyo.Arranger",
kind: "Layout",
layoutClass: "enyo-arranger",
accelerated: "auto",
dragProp: "ddx",
dragDirectionProp: "xDirection",
canDragProp: "horizontal",
incrementalPoints: !1,
destroy: function() {
var e = this.container.getPanels();
for (var t = 0, n; n = e[t]; t++) n._arranger = null;
this.inherited(arguments);
},
arrange: function(e, t) {},
size: function() {},
start: function() {
var e = this.container.fromIndex, t = this.container.toIndex, n = this.container.transitionPoints = [ e ];
if (this.incrementalPoints) {
var r = Math.abs(t - e) - 2, i = e;
while (r >= 0) i += t < e ? -1 : 1, n.push(i), r--;
}
n.push(this.container.toIndex);
},
finish: function() {},
calcArrangementDifference: function(e, t, n, r) {},
canDragEvent: function(e) {
return e[this.canDragProp];
},
calcDragDirection: function(e) {
return e[this.dragDirectionProp];
},
calcDrag: function(e) {
return e[this.dragProp];
},
drag: function(e, t, n, r, i) {
var s = this.measureArrangementDelta(-e, t, n, r, i);
return s;
},
measureArrangementDelta: function(e, t, n, r, i) {
var s = this.calcArrangementDifference(t, n, r, i), o = s ? e / Math.abs(s) : 0;
return o *= this.container.fromIndex > this.container.toIndex ? -1 : 1, o;
},
_arrange: function(e) {
this.containerBounds || this.reflow();
var t = this.getOrderedControls(e);
this.arrange(t, e);
},
arrangeControl: function(e, t) {
e._arranger = enyo.mixin(e._arranger || {}, t);
},
flow: function() {
this.c$ = [].concat(this.container.getPanels()), this.controlsIndex = 0;
for (var e = 0, t = this.container.getPanels(), n; n = t[e]; e++) {
enyo.dom.accelerate(n, this.accelerated);
if (enyo.platform.safari) {
var r = n.children;
for (var i = 0, s; s = r[i]; i++) enyo.dom.accelerate(s, this.accelerated);
}
}
},
reflow: function() {
var e = this.container.hasNode();
this.containerBounds = e ? {
width: e.clientWidth,
height: e.clientHeight
} : {}, this.size();
},
flowArrangement: function() {
var e = this.container.arrangement;
if (e) for (var t = 0, n = this.container.getPanels(), r; r = n[t]; t++) this.flowControl(r, e[t]);
},
flowControl: function(e, t) {
enyo.Arranger.positionControl(e, t);
var n = t.opacity;
n != null && enyo.Arranger.opacifyControl(e, n);
},
getOrderedControls: function(e) {
var t = Math.floor(e), n = t - this.controlsIndex, r = n > 0, i = this.c$ || [];
for (var s = 0; s < Math.abs(n); s++) r ? i.push(i.shift()) : i.unshift(i.pop());
return this.controlsIndex = t, i;
},
statics: {
positionControl: function(e, t, n) {
var r = n || "px";
if (!this.updating) if (enyo.dom.canTransform() && !enyo.platform.android) {
var i = t.left, s = t.top;
i = enyo.isString(i) ? i : i && i + r, s = enyo.isString(s) ? s : s && s + r, enyo.dom.transform(e, {
translateX: i || null,
translateY: s || null
});
} else e.setBounds(t, n);
},
opacifyControl: function(e, t) {
var n = t;
n = n > .99 ? 1 : n < .01 ? 0 : n, enyo.platform.ie < 9 ? e.applyStyle("filter", "progid:DXImageTransform.Microsoft.Alpha(Opacity=" + n * 100 + ")") : e.applyStyle("opacity", n);
}
}
});

// CardArranger.js

enyo.kind({
name: "enyo.CardArranger",
kind: "Arranger",
layoutClass: "enyo-arranger enyo-arranger-fit",
calcArrangementDifference: function(e, t, n, r) {
return this.containerBounds.width;
},
arrange: function(e, t) {
for (var n = 0, r, i, s; r = e[n]; n++) s = n === 0 ? 1 : 0, this.arrangeControl(r, {
opacity: s
});
},
start: function() {
this.inherited(arguments);
var e = this.container.getPanels();
for (var t = 0, n; n = e[t]; t++) {
var r = n.showing;
n.setShowing(t == this.container.fromIndex || t == this.container.toIndex), n.showing && !r && n.resized();
}
},
finish: function() {
this.inherited(arguments);
var e = this.container.getPanels();
for (var t = 0, n; n = e[t]; t++) n.setShowing(t == this.container.toIndex);
},
destroy: function() {
var e = this.container.getPanels();
for (var t = 0, n; n = e[t]; t++) enyo.Arranger.opacifyControl(n, 1), n.showing || n.setShowing(!0);
this.inherited(arguments);
}
});

// CardSlideInArranger.js

enyo.kind({
name: "enyo.CardSlideInArranger",
kind: "CardArranger",
start: function() {
var e = this.container.getPanels();
for (var t = 0, n; n = e[t]; t++) {
var r = n.showing;
n.setShowing(t == this.container.fromIndex || t == this.container.toIndex), n.showing && !r && n.resized();
}
var i = this.container.fromIndex;
t = this.container.toIndex, this.container.transitionPoints = [ t + "." + i + ".s", t + "." + i + ".f" ];
},
finish: function() {
this.inherited(arguments);
var e = this.container.getPanels();
for (var t = 0, n; n = e[t]; t++) n.setShowing(t == this.container.toIndex);
},
arrange: function(e, t) {
var n = t.split("."), r = n[0], i = n[1], s = n[2] == "s", o = this.containerBounds.width;
for (var u = 0, a = this.container.getPanels(), f, l; f = a[u]; u++) l = o, i == u && (l = s ? 0 : -o), r == u && (l = s ? o : 0), i == u && i == r && (l = 0), this.arrangeControl(f, {
left: l
});
},
destroy: function() {
var e = this.container.getPanels();
for (var t = 0, n; n = e[t]; t++) enyo.Arranger.positionControl(n, {
left: null
});
this.inherited(arguments);
}
});

// CarouselArranger.js

enyo.kind({
name: "enyo.CarouselArranger",
kind: "Arranger",
size: function() {
var e = this.container.getPanels(), t = this.containerPadding = this.container.hasNode() ? enyo.dom.calcPaddingExtents(this.container.node) : {}, n = this.containerBounds, r, i, s, o, u;
n.height -= t.top + t.bottom, n.width -= t.left + t.right;
var a;
for (r = 0, s = 0; u = e[r]; r++) o = enyo.dom.calcMarginExtents(u.hasNode()), u.width = u.getBounds().width, u.marginWidth = o.right + o.left, s += (u.fit ? 0 : u.width) + u.marginWidth, u.fit && (a = u);
if (a) {
var f = n.width - s;
a.width = f >= 0 ? f : a.width;
}
for (r = 0, i = t.left; u = e[r]; r++) u.setBounds({
top: t.top,
bottom: t.bottom,
width: u.fit ? u.width : null
});
},
arrange: function(e, t) {
this.container.wrap ? this.arrangeWrap(e, t) : this.arrangeNoWrap(e, t);
},
arrangeNoWrap: function(e, t) {
var n, r, i, s, o = this.container.getPanels(), u = this.container.clamp(t), a = this.containerBounds.width;
for (n = u, i = 0; s = o[n]; n++) {
i += s.width + s.marginWidth;
if (i > a) break;
}
var f = a - i, l = 0;
if (f > 0) {
var c = u;
for (n = u - 1, r = 0; s = o[n]; n--) {
r += s.width + s.marginWidth;
if (f - r <= 0) {
l = f - r, u = n;
break;
}
}
}
var h, p;
for (n = 0, p = this.containerPadding.left + l; s = o[n]; n++) h = s.width + s.marginWidth, n < u ? this.arrangeControl(s, {
left: -h
}) : (this.arrangeControl(s, {
left: Math.floor(p)
}), p += h);
},
arrangeWrap: function(e, t) {
for (var n = 0, r = this.containerPadding.left, i, s; s = e[n]; n++) this.arrangeControl(s, {
left: r
}), r += s.width + s.marginWidth;
},
calcArrangementDifference: function(e, t, n, r) {
var i = Math.abs(e % this.c$.length);
return t[i].left - r[i].left;
},
destroy: function() {
var e = this.container.getPanels();
for (var t = 0, n; n = e[t]; t++) enyo.Arranger.positionControl(n, {
left: null,
top: null
}), n.applyStyle("top", null), n.applyStyle("bottom", null), n.applyStyle("left", null), n.applyStyle("width", null);
this.inherited(arguments);
}
});

// CollapsingArranger.js

enyo.kind({
name: "enyo.CollapsingArranger",
kind: "CarouselArranger",
size: function() {
this.clearLastSize(), this.inherited(arguments);
},
clearLastSize: function() {
for (var e = 0, t = this.container.getPanels(), n; n = t[e]; e++) n._fit && e != t.length - 1 && (n.applyStyle("width", null), n._fit = null);
},
arrange: function(e, t) {
var n = this.container.getPanels();
for (var r = 0, i = this.containerPadding.left, s, o; o = n[r]; r++) this.arrangeControl(o, {
left: i
}), r >= t && (i += o.width + o.marginWidth), r == n.length - 1 && t < 0 && this.arrangeControl(o, {
left: i - t
});
},
calcArrangementDifference: function(e, t, n, r) {
var i = this.container.getPanels().length - 1;
return Math.abs(r[i].left - t[i].left);
},
flowControl: function(e, t) {
this.inherited(arguments);
if (this.container.realtimeFit) {
var n = this.container.getPanels(), r = n.length - 1, i = n[r];
e == i && this.fitControl(e, t.left);
}
},
finish: function() {
this.inherited(arguments);
if (!this.container.realtimeFit && this.containerBounds) {
var e = this.container.getPanels(), t = this.container.arrangement, n = e.length - 1, r = e[n];
this.fitControl(r, t[n].left);
}
},
fitControl: function(e, t) {
e._fit = !0, e.applyStyle("width", this.containerBounds.width - t + "px"), e.resized();
}
});

// OtherArrangers.js

enyo.kind({
name: "enyo.LeftRightArranger",
kind: "Arranger",
margin: 40,
axisSize: "width",
offAxisSize: "height",
axisPosition: "left",
constructor: function() {
this.inherited(arguments), this.margin = this.container.margin != null ? this.container.margin : this.margin;
},
size: function() {
var e = this.container.getPanels(), t = this.containerBounds[this.axisSize], n = t - this.margin - this.margin;
for (var r = 0, i, s; s = e[r]; r++) i = {}, i[this.axisSize] = n, i[this.offAxisSize] = "100%", s.setBounds(i);
},
start: function() {
this.inherited(arguments);
var e = this.container.fromIndex, t = this.container.toIndex, n = this.getOrderedControls(t), r = Math.floor(n.length / 2);
for (var i = 0, s; s = n[i]; i++) e > t ? i == n.length - r ? s.applyStyle("z-index", 0) : s.applyStyle("z-index", 1) : i == n.length - 1 - r ? s.applyStyle("z-index", 0) : s.applyStyle("z-index", 1);
},
arrange: function(e, t) {
var n, r, i, s;
if (this.container.getPanels().length == 1) {
s = {}, s[this.axisPosition] = this.margin, this.arrangeControl(this.container.getPanels()[0], s);
return;
}
var o = Math.floor(this.container.getPanels().length / 2), u = this.getOrderedControls(Math.floor(t) - o), a = this.containerBounds[this.axisSize] - this.margin - this.margin, f = this.margin - a * o;
for (n = 0; r = u[n]; n++) s = {}, s[this.axisPosition] = f, this.arrangeControl(r, s), f += a;
},
calcArrangementDifference: function(e, t, n, r) {
if (this.container.getPanels().length == 1) return 0;
var i = Math.abs(e % this.c$.length);
return t[i][this.axisPosition] - r[i][this.axisPosition];
},
destroy: function() {
var e = this.container.getPanels();
for (var t = 0, n; n = e[t]; t++) enyo.Arranger.positionControl(n, {
left: null,
top: null
}), enyo.Arranger.opacifyControl(n, 1), n.applyStyle("left", null), n.applyStyle("top", null), n.applyStyle("height", null), n.applyStyle("width", null);
this.inherited(arguments);
}
}), enyo.kind({
name: "enyo.TopBottomArranger",
kind: "LeftRightArranger",
dragProp: "ddy",
dragDirectionProp: "yDirection",
canDragProp: "vertical",
axisSize: "height",
offAxisSize: "width",
axisPosition: "top"
}), enyo.kind({
name: "enyo.SpiralArranger",
kind: "Arranger",
incrementalPoints: !0,
inc: 20,
size: function() {
var e = this.container.getPanels(), t = this.containerBounds, n = this.controlWidth = t.width / 3, r = this.controlHeight = t.height / 3;
for (var i = 0, s; s = e[i]; i++) s.setBounds({
width: n,
height: r
});
},
arrange: function(e, t) {
var n = this.inc;
for (var r = 0, i = e.length, s; s = e[r]; r++) {
var o = Math.cos(r / i * 2 * Math.PI) * r * n + this.controlWidth, u = Math.sin(r / i * 2 * Math.PI) * r * n + this.controlHeight;
this.arrangeControl(s, {
left: o,
top: u
});
}
},
start: function() {
this.inherited(arguments);
var e = this.getOrderedControls(this.container.toIndex);
for (var t = 0, n; n = e[t]; t++) n.applyStyle("z-index", e.length - t);
},
calcArrangementDifference: function(e, t, n, r) {
return this.controlWidth;
},
destroy: function() {
var e = this.container.getPanels();
for (var t = 0, n; n = e[t]; t++) n.applyStyle("z-index", null), enyo.Arranger.positionControl(n, {
left: null,
top: null
}), n.applyStyle("left", null), n.applyStyle("top", null), n.applyStyle("height", null), n.applyStyle("width", null);
this.inherited(arguments);
}
}), enyo.kind({
name: "enyo.GridArranger",
kind: "Arranger",
incrementalPoints: !0,
colWidth: 100,
colHeight: 100,
size: function() {
var e = this.container.getPanels(), t = this.colWidth, n = this.colHeight;
for (var r = 0, i; i = e[r]; r++) i.setBounds({
width: t,
height: n
});
},
arrange: function(e, t) {
var n = this.colWidth, r = this.colHeight, i = Math.max(1, Math.floor(this.containerBounds.width / n)), s;
for (var o = 0, u = 0; u < e.length; o++) for (var a = 0; a < i && (s = e[u]); a++, u++) this.arrangeControl(s, {
left: n * a,
top: r * o
});
},
flowControl: function(e, t) {
this.inherited(arguments), enyo.Arranger.opacifyControl(e, t.top % this.colHeight !== 0 ? .25 : 1);
},
calcArrangementDifference: function(e, t, n, r) {
return this.colWidth;
},
destroy: function() {
var e = this.container.getPanels();
for (var t = 0, n; n = e[t]; t++) enyo.Arranger.positionControl(n, {
left: null,
top: null
}), n.applyStyle("left", null), n.applyStyle("top", null), n.applyStyle("height", null), n.applyStyle("width", null);
this.inherited(arguments);
}
});

// Panels.js

enyo.kind({
name: "enyo.Panels",
classes: "enyo-panels",
published: {
index: 0,
draggable: !0,
animate: !0,
wrap: !1,
arrangerKind: "CardArranger",
narrowFit: !0
},
events: {
onTransitionStart: "",
onTransitionFinish: ""
},
handlers: {
ondragstart: "dragstart",
ondrag: "drag",
ondragfinish: "dragfinish",
onscroll: "domScroll"
},
tools: [ {
kind: "Animator",
onStep: "step",
onEnd: "completed"
} ],
fraction: 0,
create: function() {
this.transitionPoints = [], this.inherited(arguments), this.arrangerKindChanged(), this.narrowFitChanged(), this.indexChanged(), this.setAttribute("onscroll", enyo.bubbler);
},
domScroll: function(e, t) {
this.hasNode() && this.node.scrollLeft > 0 && (this.node.scrollLeft = 0);
},
initComponents: function() {
this.createChrome(this.tools), this.inherited(arguments);
},
arrangerKindChanged: function() {
this.setLayoutKind(this.arrangerKind);
},
narrowFitChanged: function() {
this.addRemoveClass("enyo-panels-fit-narrow", this.narrowFit);
},
removeControl: function(e) {
this.inherited(arguments), this.controls.length > 0 && this.isPanel(e) && (this.setIndex(Math.max(this.index - 1, 0)), this.flow(), this.reflow());
},
isPanel: function() {
return !0;
},
flow: function() {
this.arrangements = [], this.inherited(arguments);
},
reflow: function() {
this.arrangements = [], this.inherited(arguments), this.refresh();
},
getPanels: function() {
var e = this.controlParent || this;
return e.children;
},
getActive: function() {
var e = this.getPanels(), t = this.index % e.length;
return t < 0 ? t += e.length : enyo.nop, e[t];
},
getAnimator: function() {
return this.$.animator;
},
setIndex: function(e) {
this.setPropertyValue("index", e, "indexChanged");
},
setIndexDirect: function(e) {
this.setIndex(e), this.completed();
},
previous: function() {
this.setIndex(this.index - 1);
},
next: function() {
this.setIndex(this.index + 1);
},
clamp: function(e) {
var t = this.getPanels().length - 1;
return this.wrap ? e : Math.max(0, Math.min(e, t));
},
indexChanged: function(e) {
this.lastIndex = e, this.index = this.clamp(this.index), !this.dragging && this.$.animator && (this.$.animator.isAnimating() && this.completed(), this.$.animator.stop(), this.hasNode() && (this.animate ? (this.startTransition(), this.$.animator.play({
startValue: this.fraction
})) : this.refresh()));
},
step: function(e) {
this.fraction = e.value, this.stepTransition();
},
completed: function() {
this.$.animator.isAnimating() && this.$.animator.stop(), this.fraction = 1, this.stepTransition(), this.finishTransition();
},
dragstart: function(e, t) {
if (this.draggable && this.layout && this.layout.canDragEvent(t)) return t.preventDefault(), this.dragstartTransition(t), this.dragging = !0, this.$.animator.stop(), !0;
},
drag: function(e, t) {
this.dragging && (t.preventDefault(), this.dragTransition(t));
},
dragfinish: function(e, t) {
this.dragging && (this.dragging = !1, t.preventTap(), this.dragfinishTransition(t));
},
dragstartTransition: function(e) {
if (!this.$.animator.isAnimating()) {
var t = this.fromIndex = this.index;
this.toIndex = t - (this.layout ? this.layout.calcDragDirection(e) : 0);
} else this.verifyDragTransition(e);
this.fromIndex = this.clamp(this.fromIndex), this.toIndex = this.clamp(this.toIndex), this.fireTransitionStart(), this.layout && this.layout.start();
},
dragTransition: function(e) {
var t = this.layout ? this.layout.calcDrag(e) : 0, n = this.transitionPoints, r = n[0], i = n[n.length - 1], s = this.fetchArrangement(r), o = this.fetchArrangement(i), u = this.layout ? this.layout.drag(t, r, s, i, o) : 0, a = t && !u;
a, this.fraction += u;
var f = this.fraction;
if (f > 1 || f < 0 || a) (f > 0 || a) && this.dragfinishTransition(e), this.dragstartTransition(e), this.fraction = 0;
this.stepTransition();
},
dragfinishTransition: function(e) {
this.verifyDragTransition(e), this.setIndex(this.toIndex), this.dragging && this.fireTransitionFinish();
},
verifyDragTransition: function(e) {
var t = this.layout ? this.layout.calcDragDirection(e) : 0, n = Math.min(this.fromIndex, this.toIndex), r = Math.max(this.fromIndex, this.toIndex);
if (t > 0) {
var i = n;
n = r, r = i;
}
n != this.fromIndex && (this.fraction = 1 - this.fraction), this.fromIndex = n, this.toIndex = r;
},
refresh: function() {
this.$.animator && this.$.animator.isAnimating() && this.$.animator.stop(), this.startTransition(), this.fraction = 1, this.stepTransition(), this.finishTransition();
},
startTransition: function() {
this.fromIndex = this.fromIndex != null ? this.fromIndex : this.lastIndex || 0, this.toIndex = this.toIndex != null ? this.toIndex : this.index, this.layout && this.layout.start(), this.fireTransitionStart();
},
finishTransition: function() {
this.layout && this.layout.finish(), this.transitionPoints = [], this.fraction = 0, this.fromIndex = this.toIndex = null, this.fireTransitionFinish();
},
fireTransitionStart: function() {
var e = this.startTransitionInfo;
this.hasNode() && (!e || e.fromIndex != this.fromIndex || e.toIndex != this.toIndex) && (this.startTransitionInfo = {
fromIndex: this.fromIndex,
toIndex: this.toIndex
}, this.doTransitionStart(enyo.clone(this.startTransitionInfo)));
},
fireTransitionFinish: function() {
var e = this.finishTransitionInfo;
this.hasNode() && (!e || e.fromIndex != this.lastIndex || e.toIndex != this.index) && (this.finishTransitionInfo = {
fromIndex: this.lastIndex,
toIndex: this.index
}, this.doTransitionFinish(enyo.clone(this.finishTransitionInfo))), this.lastIndex = this.index;
},
stepTransition: function() {
if (this.hasNode()) {
var e = this.transitionPoints, t = (this.fraction || 0) * (e.length - 1), n = Math.floor(t);
t -= n;
var r = e[n], i = e[n + 1], s = this.fetchArrangement(r), o = this.fetchArrangement(i);
this.arrangement = s && o ? enyo.Panels.lerp(s, o, t) : s || o, this.arrangement && this.layout && this.layout.flowArrangement();
}
},
fetchArrangement: function(e) {
return e != null && !this.arrangements[e] && this.layout && (this.layout._arrange(e), this.arrangements[e] = this.readArrangement(this.getPanels())), this.arrangements[e];
},
readArrangement: function(e) {
var t = [];
for (var n = 0, r = e, i; i = r[n]; n++) t.push(enyo.clone(i._arranger));
return t;
},
statics: {
isScreenNarrow: function() {
return enyo.dom.getWindowWidth() <= 800;
},
lerp: function(e, t, n) {
var r = [];
for (var i = 0, s = enyo.keys(e), o; o = s[i]; i++) r.push(this.lerpObject(e[o], t[o], n));
return r;
},
lerpObject: function(e, t, n) {
var r = enyo.clone(e), i, s;
if (t) for (var o in e) i = e[o], s = t[o], i != s && (r[o] = i - (i - s) * n);
return r;
}
}
});

// Node.js

enyo.kind({
name: "enyo.Node",
published: {
expandable: !1,
expanded: !1,
icon: "",
onlyIconExpands: !1,
selected: !1
},
style: "padding: 0 0 0 16px;",
content: "Node",
defaultKind: "Node",
classes: "enyo-node",
components: [ {
name: "icon",
kind: "Image",
showing: !1
}, {
kind: "Control",
name: "caption",
Xtag: "span",
style: "display: inline-block; padding: 4px;",
allowHtml: !0
}, {
kind: "Control",
name: "extra",
tag: "span",
allowHtml: !0
} ],
childClient: [ {
kind: "Control",
name: "box",
classes: "enyo-node-box",
Xstyle: "border: 1px solid orange;",
components: [ {
kind: "Control",
name: "client",
classes: "enyo-node-client",
Xstyle: "border: 1px solid lightblue;"
} ]
} ],
handlers: {
ondblclick: "dblclick"
},
events: {
onNodeTap: "nodeTap",
onNodeDblClick: "nodeDblClick",
onExpand: "nodeExpand",
onDestroyed: "nodeDestroyed"
},
create: function() {
this.inherited(arguments), this.selectedChanged(), this.iconChanged();
},
destroy: function() {
this.doDestroyed(), this.inherited(arguments);
},
initComponents: function() {
this.expandable && (this.kindComponents = this.kindComponents.concat(this.childClient)), this.inherited(arguments);
},
contentChanged: function() {
this.$.caption.setContent(this.content);
},
iconChanged: function() {
this.$.icon.setSrc(this.icon), this.$.icon.setShowing(Boolean(this.icon));
},
selectedChanged: function() {
this.addRemoveClass("enyo-selected", this.selected);
},
rendered: function() {
this.inherited(arguments), this.expandable && !this.expanded && this.quickCollapse();
},
addNodes: function(e) {
this.destroyClientControls();
for (var t = 0, n; n = e[t]; t++) this.createComponent(n);
this.$.client.render();
},
addTextNodes: function(e) {
this.destroyClientControls();
for (var t = 0, n; n = e[t]; t++) this.createComponent({
content: n
});
this.$.client.render();
},
tap: function(e, t) {
return this.onlyIconExpands ? t.target == this.$.icon.hasNode() ? this.toggleExpanded() : this.doNodeTap() : (this.toggleExpanded(), this.doNodeTap()), !0;
},
dblclick: function(e, t) {
return this.doNodeDblClick(), !0;
},
toggleExpanded: function() {
this.setExpanded(!this.expanded);
},
quickCollapse: function() {
this.removeClass("enyo-animate"), this.$.box.applyStyle("height", "0");
var e = this.$.client.getBounds().height;
this.$.client.setBounds({
top: -e
});
},
_expand: function() {
this.addClass("enyo-animate");
var e = this.$.client.getBounds().height;
this.$.box.setBounds({
height: e
}), this.$.client.setBounds({
top: 0
}), setTimeout(enyo.bind(this, function() {
this.expanded && (this.removeClass("enyo-animate"), this.$.box.applyStyle("height", "auto"));
}), 225);
},
_collapse: function() {
this.removeClass("enyo-animate");
var e = this.$.client.getBounds().height;
this.$.box.setBounds({
height: e
}), setTimeout(enyo.bind(this, function() {
this.addClass("enyo-animate"), this.$.box.applyStyle("height", "0"), this.$.client.setBounds({
top: -e
});
}), 25);
},
expandedChanged: function(e) {
if (!this.expandable) this.expanded = !1; else {
var t = {
expanded: this.expanded
};
this.doExpand(t), t.wait || this.effectExpanded();
}
},
effectExpanded: function() {
this.$.client && (this.expanded ? this._expand() : this._collapse());
}
});

// ImageView.js

enyo.kind({
name: "enyo.ImageView",
kind: enyo.Scroller,
touchOverscroll: !1,
thumb: !1,
animate: !0,
verticalDragPropagation: !0,
horizontalDragPropagation: !0,
published: {
scale: "auto",
disableZoom: !1,
src: undefined
},
events: {
onZoom: ""
},
touch: !0,
preventDragPropagation: !1,
handlers: {
ondragstart: "dragPropagation"
},
components: [ {
name: "animator",
kind: "Animator",
onStep: "zoomAnimationStep",
onEnd: "zoomAnimationEnd"
}, {
name: "viewport",
style: "overflow:hidden;min-height:100%;min-width:100%;",
classes: "enyo-fit",
ongesturechange: "gestureTransform",
ongestureend: "saveState",
ontap: "singleTap",
ondblclick: "doubleClick",
onmousewheel: "mousewheel",
components: [ {
kind: "Image",
ondown: "down"
} ]
} ],
create: function() {
this.inherited(arguments), this.canTransform = enyo.dom.canTransform(), this.canTransform || this.$.image.applyStyle("position", "relative"), this.canAccelerate = enyo.dom.canAccelerate(), this.bufferImage = new Image, this.bufferImage.onload = enyo.bind(this, "imageLoaded"), this.bufferImage.onerror = enyo.bind(this, "imageError"), this.srcChanged(), this.getStrategy().setDragDuringGesture(!1);
},
down: function(e, t) {
t.preventDefault();
},
dragPropagation: function(e, t) {
var n = this.getStrategy().getScrollBounds(), r = n.top === 0 && t.dy > 0 || n.top >= n.maxTop - 2 && t.dy < 0, i = n.left === 0 && t.dx > 0 || n.left >= n.maxLeft - 2 && t.dx < 0;
return !(r && this.verticalDragPropagation || i && this.horizontalDragPropagation);
},
mousewheel: function(e, t) {
t.pageX |= t.clientX + t.target.scrollLeft, t.pageY |= t.clientY + t.target.scrollTop;
var n = (this.maxScale - this.minScale) / 10, r = this.scale;
if (t.wheelDelta > 0 || t.detail < 0) this.scale = this.limitScale(this.scale + n); else if (t.wheelDelta < 0 || t.detail > 0) this.scale = this.limitScale(this.scale - n);
return this.eventPt = this.calcEventLocation(t), this.transformImage(this.scale), r != this.scale && this.doZoom({
scale: this.scale
}), this.ratioX = this.ratioY = null, t.preventDefault(), !0;
},
srcChanged: function() {
this.src && this.src.length > 0 && this.bufferImage && this.src != this.bufferImage.src && (this.bufferImage.src = this.src);
},
imageLoaded: function(e) {
this.originalWidth = this.bufferImage.width, this.originalHeight = this.bufferImage.height, this.scaleChanged(), this.$.image.setSrc(this.bufferImage.src), enyo.dom.transformValue(this.getStrategy().$.client, "translate3d", "0px, 0px, 0");
},
resizeHandler: function() {
this.inherited(arguments), this.$.image.src && this.scaleChanged();
},
scaleChanged: function() {
var e = this.hasNode();
if (e) {
this.containerWidth = e.clientWidth, this.containerHeight = e.clientHeight;
var t = this.containerWidth / this.originalWidth, n = this.containerHeight / this.originalHeight;
this.minScale = Math.min(t, n), this.maxScale = this.minScale * 3 < 1 ? 1 : this.minScale * 3, this.scale == "auto" ? this.scale = this.minScale : this.scale == "width" ? this.scale = t : this.scale == "height" ? this.scale = n : (this.maxScale = Math.max(this.maxScale, this.scale), this.scale = this.limitScale(this.scale));
}
this.eventPt = this.calcEventLocation(), this.transformImage(this.scale);
},
imageError: function(e) {
enyo.error("Error loading image: " + this.src), this.bubble("onerror", e);
},
gestureTransform: function(e, t) {
this.eventPt = this.calcEventLocation(t), this.transformImage(this.limitScale(this.scale * t.scale));
},
calcEventLocation: function(e) {
var t = {
x: 0,
y: 0
};
if (e && this.hasNode()) {
var n = this.node.getBoundingClientRect();
t.x = Math.round(e.pageX - n.left - this.imageBounds.x), t.x = Math.max(0, Math.min(this.imageBounds.width, t.x)), t.y = Math.round(e.pageY - n.top - this.imageBounds.y), t.y = Math.max(0, Math.min(this.imageBounds.height, t.y));
}
return t;
},
transformImage: function(e) {
this.tapped = !1;
var t = this.imageBounds || this.innerImageBounds(e);
this.imageBounds = this.innerImageBounds(e), this.scale > this.minScale ? this.$.viewport.applyStyle("cursor", "move") : this.$.viewport.applyStyle("cursor", null), this.$.viewport.setBounds({
width: this.imageBounds.width + "px",
height: this.imageBounds.height + "px"
}), this.ratioX = this.ratioX || (this.eventPt.x + this.getScrollLeft()) / t.width, this.ratioY = this.ratioY || (this.eventPt.y + this.getScrollTop()) / t.height;
var n, r;
this.$.animator.ratioLock ? (n = this.$.animator.ratioLock.x * this.imageBounds.width - this.containerWidth / 2, r = this.$.animator.ratioLock.y * this.imageBounds.height - this.containerHeight / 2) : (n = this.ratioX * this.imageBounds.width - this.eventPt.x, r = this.ratioY * this.imageBounds.height - this.eventPt.y), n = Math.max(0, Math.min(this.imageBounds.width - this.containerWidth, n)), r = Math.max(0, Math.min(this.imageBounds.height - this.containerHeight, r));
if (this.canTransform) {
var i = {
scale: e
};
this.canAccelerate ? i = enyo.mixin({
translate3d: Math.round(this.imageBounds.left) + "px, " + Math.round(this.imageBounds.top) + "px, 0px"
}, i) : i = enyo.mixin({
translate: this.imageBounds.left + "px, " + this.imageBounds.top + "px"
}, i), enyo.dom.transform(this.$.image, i);
} else this.$.image.setBounds({
width: this.imageBounds.width + "px",
height: this.imageBounds.height + "px",
left: this.imageBounds.left + "px",
top: this.imageBounds.top + "px"
});
this.setScrollLeft(n), this.setScrollTop(r);
},
limitScale: function(e) {
return this.disableZoom ? e = this.scale : e > this.maxScale ? e = this.maxScale : e < this.minScale && (e = this.minScale), e;
},
innerImageBounds: function(e) {
var t = this.originalWidth * e, n = this.originalHeight * e, r = {
x: 0,
y: 0,
transX: 0,
transY: 0
};
return t < this.containerWidth && (r.x += (this.containerWidth - t) / 2), n < this.containerHeight && (r.y += (this.containerHeight - n) / 2), this.canTransform && (r.transX -= (this.originalWidth - t) / 2, r.transY -= (this.originalHeight - n) / 2), {
left: r.x + r.transX,
top: r.y + r.transY,
width: t,
height: n,
x: r.x,
y: r.y
};
},
saveState: function(e, t) {
var n = this.scale;
this.scale *= t.scale, this.scale = this.limitScale(this.scale), n != this.scale && this.doZoom({
scale: this.scale
}), this.ratioX = this.ratioY = null;
},
doubleClick: function(e, t) {
enyo.platform.ie == 8 && (this.tapped = !0, t.pageX = t.clientX + t.target.scrollLeft, t.pageY = t.clientY + t.target.scrollTop, this.singleTap(e, t), t.preventDefault());
},
singleTap: function(e, t) {
setTimeout(enyo.bind(this, function() {
this.tapped = !1;
}), 300), this.tapped ? (this.tapped = !1, this.smartZoom(e, t)) : this.tapped = !0;
},
smartZoom: function(e, t) {
var n = this.hasNode(), r = this.$.image.hasNode();
if (n && r && this.hasNode() && !this.disableZoom) {
var i = this.scale;
this.scale != this.minScale ? this.scale = this.minScale : this.scale = this.maxScale, this.eventPt = this.calcEventLocation(t);
if (this.animate) {
var s = {
x: (this.eventPt.x + this.getScrollLeft()) / this.imageBounds.width,
y: (this.eventPt.y + this.getScrollTop()) / this.imageBounds.height
};
this.$.animator.play({
duration: 350,
ratioLock: s,
baseScale: i,
deltaScale: this.scale - i
});
} else this.transformImage(this.scale), this.doZoom({
scale: this.scale
});
}
},
zoomAnimationStep: function(e, t) {
var n = this.$.animator.baseScale + this.$.animator.deltaScale * this.$.animator.value;
this.transformImage(n);
},
zoomAnimationEnd: function(e, t) {
this.doZoom({
scale: this.scale
}), this.$.animator.ratioLock = undefined;
}
});

// ImageCarousel.js

enyo.kind({
name: "enyo.ImageCarousel",
kind: enyo.Panels,
arrangerKind: "enyo.CarouselArranger",
defaultScale: "auto",
disableZoom: !1,
lowMemory: !1,
published: {
images: []
},
handlers: {
onTransitionStart: "transitionStart",
onTransitionFinish: "transitionFinish"
},
create: function() {
this.inherited(arguments), this.imageCount = this.images.length, this.images.length > 0 && (this.initContainers(), this.loadNearby());
},
initContainers: function() {
for (var e = 0; e < this.images.length; e++) this.$["container" + e] || (this.createComponent({
name: "container" + e,
style: "height:100%; width:100%;"
}), this.$["container" + e].render());
for (e = this.images.length; e < this.imageCount; e++) this.$["image" + e] && this.$["image" + e].destroy(), this.$["container" + e].destroy();
this.imageCount = this.images.length;
},
loadNearby: function() {
this.images.length > 0 && (this.loadImageView(this.index - 1), this.loadImageView(this.index), this.loadImageView(this.index + 1));
},
loadImageView: function(e) {
return this.wrap && (e = (e % this.images.length + this.images.length) % this.images.length), e >= 0 && e <= this.images.length - 1 && (this.$["image" + e] ? (this.$["image" + e].src != this.images[e] && this.$["image" + e].setSrc(this.images[e]), this.$["image" + e].setScale(this.defaultScale), this.$["image" + e].setDisableZoom(this.disableZoom)) : (this.$["container" + e].createComponent({
name: "image" + e,
kind: "ImageView",
scale: this.defaultScale,
disableZoom: this.disableZoom,
src: this.images[e],
verticalDragPropagation: !1,
style: "height:100%; width:100%;"
}, {
owner: this
}), this.$["image" + e].render())), this.$["image" + e];
},
setImages: function(e) {
this.setPropertyValue("images", e, "imagesChanged");
},
imagesChanged: function() {
this.initContainers(), this.loadNearby();
},
indexChanged: function() {
this.loadNearby(), this.lowMemory && this.cleanupMemory(), this.inherited(arguments);
},
transitionStart: function(e, t) {
if (t.fromIndex == t.toIndex) return !0;
},
transitionFinish: function(e, t) {
this.loadImageView(this.index - 1), this.loadImageView(this.index + 1), this.lowMemory && this.cleanupMemory();
},
getActiveImage: function() {
return this.getImageByIndex(this.index);
},
getImageByIndex: function(e) {
return this.$["image" + e] || this.loadImageView(e);
},
cleanupMemory: function() {
for (var e = 0; e < this.images.length; e++) (e < this.index - 1 || e > this.index + 1) && this.$["image" + e] && this.$["image" + e].destroy();
}
});

// DividerDrawer.js

enyo.kind({
name: "GTS.DividerDrawer",
classes: "gts-DividerDrawer",
published: {
caption: "",
open: !0
},
events: {
onChange: ""
},
components: [ {
name: "base",
kind: "enyo.FittableColumns",
noStretch: !0,
classes: "base-bar",
ontap: "toggleOpen",
components: [ {
classes: "end-cap"
}, {
name: "caption",
classes: "caption"
}, {
classes: "bar",
fit: !0
}, {
name: "switch",
classes: "toggle",
value: !1
}, {
classes: "end-cap bar"
} ]
}, {
name: "client",
kind: "onyx.Drawer"
} ],
rendered: function() {
this.inherited(arguments), this.captionChanged(), this.openChanged();
},
reflow: function() {
this.$.base.reflow();
},
openChanged: function() {
this.$["switch"].value = this.open, this.$.client.setOpen(this.$["switch"].value), this.$["switch"].addRemoveClass("checked", this.$["switch"].value), this.reflow();
},
captionChanged: function() {
this.$.caption.setContent(this.caption), this.$.caption.applyStyle("display", this.caption ? "" : "none"), this.reflow();
},
toggleOpen: function(e, t) {
return this.open = !this.$["switch"].value, this.$["switch"].value = this.open, this.openChanged(), this.doChange(this, {
caption: this.getCaption(),
open: this.getOpen()
}), !0;
}
});

// leaflet.js

(function(e, t) {
var n, r;
typeof exports != t + "" ? n = exports : (r = e.L, n = {}, n.noConflict = function() {
return e.L = r, this;
}, e.L = n), n.version = "0.4.5", n.Util = {
extend: function(e) {
var t = Array.prototype.slice.call(arguments, 1);
for (var n = 0, r = t.length, i; n < r; n++) {
i = t[n] || {};
for (var s in i) i.hasOwnProperty(s) && (e[s] = i[s]);
}
return e;
},
bind: function(e, t) {
var n = arguments.length > 2 ? Array.prototype.slice.call(arguments, 2) : null;
return function() {
return e.apply(t, n || arguments);
};
},
stamp: function() {
var e = 0, t = "_leaflet_id";
return function(n) {
return n[t] = n[t] || ++e, n[t];
};
}(),
limitExecByInterval: function(e, t, n) {
var r, i;
return function s() {
var o = arguments;
if (r) {
i = !0;
return;
}
r = !0, setTimeout(function() {
r = !1, i && (s.apply(n, o), i = !1);
}, t), e.apply(n, o);
};
},
falseFn: function() {
return !1;
},
formatNum: function(e, t) {
var n = Math.pow(10, t || 5);
return Math.round(e * n) / n;
},
splitWords: function(e) {
return e.replace(/^\s+|\s+$/g, "").split(/\s+/);
},
setOptions: function(e, t) {
return e.options = n.Util.extend({}, e.options, t), e.options;
},
getParamString: function(e) {
var t = [];
for (var n in e) e.hasOwnProperty(n) && t.push(n + "=" + e[n]);
return "?" + t.join("&");
},
template: function(e, t) {
return e.replace(/\{ *([\w_]+) *\}/g, function(e, n) {
var r = t[n];
if (!t.hasOwnProperty(n)) throw Error("No value provided for variable " + e);
return r;
});
},
emptyImageUrl: "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
}, function() {
function t(t) {
var n, r, i = [ "webkit", "moz", "o", "ms" ];
for (n = 0; n < i.length && !r; n++) r = e[i[n] + t];
return r;
}
function r(t) {
return e.setTimeout(t, 1e3 / 60);
}
var i = e.requestAnimationFrame || t("RequestAnimationFrame") || r, s = e.cancelAnimationFrame || t("CancelAnimationFrame") || t("CancelRequestAnimationFrame") || function(t) {
e.clearTimeout(t);
};
n.Util.requestAnimFrame = function(t, s, o, u) {
t = n.Util.bind(t, s);
if (!o || i !== r) return i.call(e, t, u);
t();
}, n.Util.cancelAnimFrame = function(t) {
t && s.call(e, t);
};
}(), n.Class = function() {}, n.Class.extend = function(e) {
var t = function() {
this.initialize && this.initialize.apply(this, arguments);
}, r = function() {};
r.prototype = this.prototype;
var i = new r;
i.constructor = t, t.prototype = i;
for (var s in this) this.hasOwnProperty(s) && s !== "prototype" && (t[s] = this[s]);
return e.statics && (n.Util.extend(t, e.statics), delete e.statics), e.includes && (n.Util.extend.apply(null, [ i ].concat(e.includes)), delete e.includes), e.options && i.options && (e.options = n.Util.extend({}, i.options, e.options)), n.Util.extend(i, e), t;
}, n.Class.include = function(e) {
n.Util.extend(this.prototype, e);
}, n.Class.mergeOptions = function(e) {
n.Util.extend(this.prototype.options, e);
};
var i = "_leaflet_events";
n.Mixin = {}, n.Mixin.Events = {
addEventListener: function(e, t, r) {
var s = this[i] = this[i] || {}, o, u, a;
if (typeof e == "object") {
for (o in e) e.hasOwnProperty(o) && this.addEventListener(o, e[o], t);
return this;
}
e = n.Util.splitWords(e);
for (u = 0, a = e.length; u < a; u++) s[e[u]] = s[e[u]] || [], s[e[u]].push({
action: t,
context: r || this
});
return this;
},
hasEventListeners: function(e) {
return i in this && e in this[i] && this[i][e].length > 0;
},
removeEventListener: function(e, t, r) {
var s = this[i], o, u, a, f, l;
if (typeof e == "object") {
for (o in e) e.hasOwnProperty(o) && this.removeEventListener(o, e[o], t);
return this;
}
e = n.Util.splitWords(e);
for (u = 0, a = e.length; u < a; u++) if (this.hasEventListeners(e[u])) {
f = s[e[u]];
for (l = f.length - 1; l >= 0; l--) (!t || f[l].action === t) && (!r || f[l].context === r) && f.splice(l, 1);
}
return this;
},
fireEvent: function(e, t) {
if (!this.hasEventListeners(e)) return this;
var r = n.Util.extend({
type: e,
target: this
}, t), s = this[i][e].slice();
for (var o = 0, u = s.length; o < u; o++) s[o].action.call(s[o].context || this, r);
return this;
}
}, n.Mixin.Events.on = n.Mixin.Events.addEventListener, n.Mixin.Events.off = n.Mixin.Events.removeEventListener, n.Mixin.Events.fire = n.Mixin.Events.fireEvent, function() {
var r = navigator.userAgent.toLowerCase(), i = !!e.ActiveXObject, s = i && !e.XMLHttpRequest, o = r.indexOf("webkit") !== -1, u = r.indexOf("gecko") !== -1, a = r.indexOf("chrome") !== -1, f = e.opera, l = r.indexOf("android") !== -1, c = r.search("android [23]") !== -1, h = typeof orientation != t + "" ? !0 : !1, p = document.documentElement, d = i && "transition" in p.style, v = o && "WebKitCSSMatrix" in e && "m11" in new e.WebKitCSSMatrix, m = u && "MozPerspective" in p.style, g = f && "OTransition" in p.style, y = !e.L_NO_TOUCH && function() {
var e = "ontouchstart";
if (e in p) return !0;
var t = document.createElement("div"), n = !1;
return t.setAttribute ? (t.setAttribute(e, "return;"), typeof t[e] == "function" && (n = !0), t.removeAttribute(e), t = null, n) : !1;
}(), b = "devicePixelRatio" in e && e.devicePixelRatio > 1 || "matchMedia" in e && e.matchMedia("(min-resolution:144dpi)").matches;
n.Browser = {
ua: r,
ie: i,
ie6: s,
webkit: o,
gecko: u,
opera: f,
android: l,
android23: c,
chrome: a,
ie3d: d,
webkit3d: v,
gecko3d: m,
opera3d: g,
any3d: !e.L_DISABLE_3D && (d || v || m || g),
mobile: h,
mobileWebkit: h && o,
mobileWebkit3d: h && v,
mobileOpera: h && f,
touch: y,
retina: b
};
}(), n.Point = function(e, t, n) {
this.x = n ? Math.round(e) : e, this.y = n ? Math.round(t) : t;
}, n.Point.prototype = {
add: function(e) {
return this.clone()._add(n.point(e));
},
_add: function(e) {
return this.x += e.x, this.y += e.y, this;
},
subtract: function(e) {
return this.clone()._subtract(n.point(e));
},
_subtract: function(e) {
return this.x -= e.x, this.y -= e.y, this;
},
divideBy: function(e, t) {
return new n.Point(this.x / e, this.y / e, t);
},
multiplyBy: function(e, t) {
return new n.Point(this.x * e, this.y * e, t);
},
distanceTo: function(e) {
e = n.point(e);
var t = e.x - this.x, r = e.y - this.y;
return Math.sqrt(t * t + r * r);
},
round: function() {
return this.clone()._round();
},
_round: function() {
return this.x = Math.round(this.x), this.y = Math.round(this.y), this;
},
floor: function() {
return this.clone()._floor();
},
_floor: function() {
return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this;
},
clone: function() {
return new n.Point(this.x, this.y);
},
toString: function() {
return "Point(" + n.Util.formatNum(this.x) + ", " + n.Util.formatNum(this.y) + ")";
}
}, n.point = function(e, t, r) {
return e instanceof n.Point ? e : e instanceof Array ? new n.Point(e[0], e[1]) : isNaN(e) ? e : new n.Point(e, t, r);
}, n.Bounds = n.Class.extend({
initialize: function(e, t) {
if (!e) return;
var n = t ? [ e, t ] : e;
for (var r = 0, i = n.length; r < i; r++) this.extend(n[r]);
},
extend: function(e) {
return e = n.point(e), !this.min && !this.max ? (this.min = e.clone(), this.max = e.clone()) : (this.min.x = Math.min(e.x, this.min.x), this.max.x = Math.max(e.x, this.max.x), this.min.y = Math.min(e.y, this.min.y), this.max.y = Math.max(e.y, this.max.y)), this;
},
getCenter: function(e) {
return new n.Point((this.min.x + this.max.x) / 2, (this.min.y + this.max.y) / 2, e);
},
getBottomLeft: function() {
return new n.Point(this.min.x, this.max.y);
},
getTopRight: function() {
return new n.Point(this.max.x, this.min.y);
},
contains: function(e) {
var t, r;
return typeof e[0] == "number" || e instanceof n.Point ? e = n.point(e) : e = n.bounds(e), e instanceof n.Bounds ? (t = e.min, r = e.max) : t = r = e, t.x >= this.min.x && r.x <= this.max.x && t.y >= this.min.y && r.y <= this.max.y;
},
intersects: function(e) {
e = n.bounds(e);
var t = this.min, r = this.max, i = e.min, s = e.max, o = s.x >= t.x && i.x <= r.x, u = s.y >= t.y && i.y <= r.y;
return o && u;
}
}), n.bounds = function(e, t) {
return !e || e instanceof n.Bounds ? e : new n.Bounds(e, t);
}, n.Transformation = n.Class.extend({
initialize: function(e, t, n, r) {
this._a = e, this._b = t, this._c = n, this._d = r;
},
transform: function(e, t) {
return this._transform(e.clone(), t);
},
_transform: function(e, t) {
return t = t || 1, e.x = t * (this._a * e.x + this._b), e.y = t * (this._c * e.y + this._d), e;
},
untransform: function(e, t) {
return t = t || 1, new n.Point((e.x / t - this._b) / this._a, (e.y / t - this._d) / this._c);
}
}), n.DomUtil = {
get: function(e) {
return typeof e == "string" ? document.getElementById(e) : e;
},
getStyle: function(e, t) {
var n = e.style[t];
!n && e.currentStyle && (n = e.currentStyle[t]);
if (!n || n === "auto") {
var r = document.defaultView.getComputedStyle(e, null);
n = r ? r[t] : null;
}
return n === "auto" ? null : n;
},
getViewportOffset: function(e) {
var t = 0, r = 0, i = e, s = document.body;
do {
t += i.offsetTop || 0, r += i.offsetLeft || 0;
if (i.offsetParent === s && n.DomUtil.getStyle(i, "position") === "absolute") break;
if (n.DomUtil.getStyle(i, "position") === "fixed") {
t += s.scrollTop || 0, r += s.scrollLeft || 0;
break;
}
i = i.offsetParent;
} while (i);
i = e;
do {
if (i === s) break;
t -= i.scrollTop || 0, r -= i.scrollLeft || 0, i = i.parentNode;
} while (i);
return new n.Point(r, t);
},
create: function(e, t, n) {
var r = document.createElement(e);
return r.className = t, n && n.appendChild(r), r;
},
disableTextSelection: function() {
document.selection && document.selection.empty && document.selection.empty(), this._onselectstart || (this._onselectstart = document.onselectstart, document.onselectstart = n.Util.falseFn);
},
enableTextSelection: function() {
document.onselectstart = this._onselectstart, this._onselectstart = null;
},
hasClass: function(e, t) {
return e.className.length > 0 && RegExp("(^|\\s)" + t + "(\\s|$)").test(e.className);
},
addClass: function(e, t) {
n.DomUtil.hasClass(e, t) || (e.className += (e.className ? " " : "") + t);
},
removeClass: function(e, t) {
function n(e, n) {
return n === t ? "" : e;
}
e.className = e.className.replace(/(\S+)\s*/g, n).replace(/(^\s+|\s+$)/, "");
},
setOpacity: function(e, t) {
if ("opacity" in e.style) e.style.opacity = t; else if (n.Browser.ie) {
var r = !1, i = "DXImageTransform.Microsoft.Alpha";
try {
r = e.filters.item(i);
} catch (s) {}
t = Math.round(t * 100), r ? (r.Enabled = t !== 100, r.Opacity = t) : e.style.filter += " progid:" + i + "(opacity=" + t + ")";
}
},
testProp: function(e) {
var t = document.documentElement.style;
for (var n = 0; n < e.length; n++) if (e[n] in t) return e[n];
return !1;
},
getTranslateString: function(e) {
var t = n.Browser.webkit3d, r = "translate" + (t ? "3d" : "") + "(", i = (t ? ",0" : "") + ")";
return r + e.x + "px," + e.y + "px" + i;
},
getScaleString: function(e, t) {
var r = n.DomUtil.getTranslateString(t.add(t.multiplyBy(-1 * e))), i = " scale(" + e + ") ";
return r + i;
},
setPosition: function(e, t, r) {
e._leaflet_pos = t, !r && n.Browser.any3d ? (e.style[n.DomUtil.TRANSFORM] = n.DomUtil.getTranslateString(t), n.Browser.mobileWebkit3d && (e.style.WebkitBackfaceVisibility = "hidden")) : (e.style.left = t.x + "px", e.style.top = t.y + "px");
},
getPosition: function(e) {
return e._leaflet_pos;
}
}, n.Util.extend(n.DomUtil, {
TRANSITION: n.DomUtil.testProp([ "transition", "webkitTransition", "OTransition", "MozTransition", "msTransition" ]),
TRANSFORM: n.DomUtil.testProp([ "transform", "WebkitTransform", "OTransform", "MozTransform", "msTransform" ])
}), n.LatLng = function(e, t, n) {
var r = parseFloat(e), i = parseFloat(t);
if (isNaN(r) || isNaN(i)) throw Error("Invalid LatLng object: (" + e + ", " + t + ")");
n !== !0 && (r = Math.max(Math.min(r, 90), -90), i = (i + 180) % 360 + (i < -180 || i === 180 ? 180 : -180)), this.lat = r, this.lng = i;
}, n.Util.extend(n.LatLng, {
DEG_TO_RAD: Math.PI / 180,
RAD_TO_DEG: 180 / Math.PI,
MAX_MARGIN: 1e-9
}), n.LatLng.prototype = {
equals: function(e) {
if (!e) return !1;
e = n.latLng(e);
var t = Math.max(Math.abs(this.lat - e.lat), Math.abs(this.lng - e.lng));
return t <= n.LatLng.MAX_MARGIN;
},
toString: function() {
return "LatLng(" + n.Util.formatNum(this.lat) + ", " + n.Util.formatNum(this.lng) + ")";
},
distanceTo: function(e) {
e = n.latLng(e);
var t = 6378137, r = n.LatLng.DEG_TO_RAD, i = (e.lat - this.lat) * r, s = (e.lng - this.lng) * r, o = this.lat * r, u = e.lat * r, a = Math.sin(i / 2), f = Math.sin(s / 2), l = a * a + f * f * Math.cos(o) * Math.cos(u);
return t * 2 * Math.atan2(Math.sqrt(l), Math.sqrt(1 - l));
}
}, n.latLng = function(e, t, r) {
return e instanceof n.LatLng ? e : e instanceof Array ? new n.LatLng(e[0], e[1]) : isNaN(e) ? e : new n.LatLng(e, t, r);
}, n.LatLngBounds = n.Class.extend({
initialize: function(e, t) {
if (!e) return;
var n = t ? [ e, t ] : e;
for (var r = 0, i = n.length; r < i; r++) this.extend(n[r]);
},
extend: function(e) {
return typeof e[0] == "number" || e instanceof n.LatLng ? e = n.latLng(e) : e = n.latLngBounds(e), e instanceof n.LatLng ? !this._southWest && !this._northEast ? (this._southWest = new n.LatLng(e.lat, e.lng, !0), this._northEast = new n.LatLng(e.lat, e.lng, !0)) : (this._southWest.lat = Math.min(e.lat, this._southWest.lat), this._southWest.lng = Math.min(e.lng, this._southWest.lng), this._northEast.lat = Math.max(e.lat, this._northEast.lat), this._northEast.lng = Math.max(e.lng, this._northEast.lng)) : e instanceof n.LatLngBounds && (this.extend(e._southWest), this.extend(e._northEast)), this;
},
pad: function(e) {
var t = this._southWest, r = this._northEast, i = Math.abs(t.lat - r.lat) * e, s = Math.abs(t.lng - r.lng) * e;
return new n.LatLngBounds(new n.LatLng(t.lat - i, t.lng - s), new n.LatLng(r.lat + i, r.lng + s));
},
getCenter: function() {
return new n.LatLng((this._southWest.lat + this._northEast.lat) / 2, (this._southWest.lng + this._northEast.lng) / 2);
},
getSouthWest: function() {
return this._southWest;
},
getNorthEast: function() {
return this._northEast;
},
getNorthWest: function() {
return new n.LatLng(this._northEast.lat, this._southWest.lng, !0);
},
getSouthEast: function() {
return new n.LatLng(this._southWest.lat, this._northEast.lng, !0);
},
contains: function(e) {
typeof e[0] == "number" || e instanceof n.LatLng ? e = n.latLng(e) : e = n.latLngBounds(e);
var t = this._southWest, r = this._northEast, i, s;
return e instanceof n.LatLngBounds ? (i = e.getSouthWest(), s = e.getNorthEast()) : i = s = e, i.lat >= t.lat && s.lat <= r.lat && i.lng >= t.lng && s.lng <= r.lng;
},
intersects: function(e) {
e = n.latLngBounds(e);
var t = this._southWest, r = this._northEast, i = e.getSouthWest(), s = e.getNorthEast(), o = s.lat >= t.lat && i.lat <= r.lat, u = s.lng >= t.lng && i.lng <= r.lng;
return o && u;
},
toBBoxString: function() {
var e = this._southWest, t = this._northEast;
return [ e.lng, e.lat, t.lng, t.lat ].join(",");
},
equals: function(e) {
return e ? (e = n.latLngBounds(e), this._southWest.equals(e.getSouthWest()) && this._northEast.equals(e.getNorthEast())) : !1;
}
}), n.latLngBounds = function(e, t) {
return !e || e instanceof n.LatLngBounds ? e : new n.LatLngBounds(e, t);
}, n.Projection = {}, n.Projection.SphericalMercator = {
MAX_LATITUDE: 85.0511287798,
project: function(e) {
var t = n.LatLng.DEG_TO_RAD, r = this.MAX_LATITUDE, i = Math.max(Math.min(r, e.lat), -r), s = e.lng * t, o = i * t;
return o = Math.log(Math.tan(Math.PI / 4 + o / 2)), new n.Point(s, o);
},
unproject: function(e) {
var t = n.LatLng.RAD_TO_DEG, r = e.x * t, i = (2 * Math.atan(Math.exp(e.y)) - Math.PI / 2) * t;
return new n.LatLng(i, r, !0);
}
}, n.Projection.LonLat = {
project: function(e) {
return new n.Point(e.lng, e.lat);
},
unproject: function(e) {
return new n.LatLng(e.y, e.x, !0);
}
}, n.CRS = {
latLngToPoint: function(e, t) {
var n = this.projection.project(e), r = this.scale(t);
return this.transformation._transform(n, r);
},
pointToLatLng: function(e, t) {
var n = this.scale(t), r = this.transformation.untransform(e, n);
return this.projection.unproject(r);
},
project: function(e) {
return this.projection.project(e);
},
scale: function(e) {
return 256 * Math.pow(2, e);
}
}, n.CRS.EPSG3857 = n.Util.extend({}, n.CRS, {
code: "EPSG:3857",
projection: n.Projection.SphericalMercator,
transformation: new n.Transformation(.5 / Math.PI, .5, -0.5 / Math.PI, .5),
project: function(e) {
var t = this.projection.project(e), n = 6378137;
return t.multiplyBy(n);
}
}), n.CRS.EPSG900913 = n.Util.extend({}, n.CRS.EPSG3857, {
code: "EPSG:900913"
}), n.CRS.EPSG4326 = n.Util.extend({}, n.CRS, {
code: "EPSG:4326",
projection: n.Projection.LonLat,
transformation: new n.Transformation(1 / 360, .5, -1 / 360, .5)
}), n.Map = n.Class.extend({
includes: n.Mixin.Events,
options: {
crs: n.CRS.EPSG3857,
fadeAnimation: n.DomUtil.TRANSITION && !n.Browser.android23,
trackResize: !0,
markerZoomAnimation: n.DomUtil.TRANSITION && n.Browser.any3d
},
initialize: function(e, r) {
r = n.Util.setOptions(this, r), this._initContainer(e), this._initLayout(), this._initHooks(), this._initEvents(), r.maxBounds && this.setMaxBounds(r.maxBounds), r.center && r.zoom !== t && this.setView(n.latLng(r.center), r.zoom, !0), this._initLayers(r.layers);
},
setView: function(e, t) {
return this._resetView(n.latLng(e), this._limitZoom(t)), this;
},
setZoom: function(e) {
return this.setView(this.getCenter(), e);
},
zoomIn: function() {
return this.setZoom(this._zoom + 1);
},
zoomOut: function() {
return this.setZoom(this._zoom - 1);
},
fitBounds: function(e) {
var t = this.getBoundsZoom(e);
return this.setView(n.latLngBounds(e).getCenter(), t);
},
fitWorld: function() {
var e = new n.LatLng(-60, -170), t = new n.LatLng(85, 179);
return this.fitBounds(new n.LatLngBounds(e, t));
},
panTo: function(e) {
return this.setView(e, this._zoom);
},
panBy: function(e) {
return this.fire("movestart"), this._rawPanBy(n.point(e)), this.fire("move"), this.fire("moveend");
},
setMaxBounds: function(e) {
e = n.latLngBounds(e), this.options.maxBounds = e;
if (!e) return this._boundsMinZoom = null, this;
var t = this.getBoundsZoom(e, !0);
return this._boundsMinZoom = t, this._loaded && (this._zoom < t ? this.setView(e.getCenter(), t) : this.panInsideBounds(e)), this;
},
panInsideBounds: function(e) {
e = n.latLngBounds(e);
var t = this.getBounds(), r = this.project(t.getSouthWest()), i = this.project(t.getNorthEast()), s = this.project(e.getSouthWest()), o = this.project(e.getNorthEast()), u = 0, a = 0;
return i.y < o.y && (a = o.y - i.y), i.x > o.x && (u = o.x - i.x), r.y > s.y && (a = s.y - r.y), r.x < s.x && (u = s.x - r.x), this.panBy(new n.Point(u, a, !0));
},
addLayer: function(e) {
var t = n.Util.stamp(e);
if (this._layers[t]) return this;
this._layers[t] = e, e.options && !isNaN(e.options.maxZoom) && (this._layersMaxZoom = Math.max(this._layersMaxZoom || 0, e.options.maxZoom)), e.options && !isNaN(e.options.minZoom) && (this._layersMinZoom = Math.min(this._layersMinZoom || Infinity, e.options.minZoom)), this.options.zoomAnimation && n.TileLayer && e instanceof n.TileLayer && (this._tileLayersNum++, this._tileLayersToLoad++, e.on("load", this._onTileLayerLoad, this));
var r = function() {
e.onAdd(this), this.fire("layeradd", {
layer: e
});
};
return this._loaded ? r.call(this) : this.on("load", r, this), this;
},
removeLayer: function(e) {
var t = n.Util.stamp(e);
if (!this._layers[t]) return;
return e.onRemove(this), delete this._layers[t], this.options.zoomAnimation && n.TileLayer && e instanceof n.TileLayer && (this._tileLayersNum--, this._tileLayersToLoad--, e.off("load", this._onTileLayerLoad, this)), this.fire("layerremove", {
layer: e
});
},
hasLayer: function(e) {
var t = n.Util.stamp(e);
return this._layers.hasOwnProperty(t);
},
invalidateSize: function(e) {
var t = this.getSize();
this._sizeChanged = !0, this.options.maxBounds && this.setMaxBounds(this.options.maxBounds);
if (!this._loaded) return this;
var r = t.subtract(this.getSize()).divideBy(2, !0);
return e === !0 ? this.panBy(r) : (this._rawPanBy(r), this.fire("move"), clearTimeout(this._sizeTimer), this._sizeTimer = setTimeout(n.Util.bind(this.fire, this, "moveend"), 200)), this;
},
addHandler: function(e, t) {
if (!t) return;
return this[e] = new t(this), this.options[e] && this[e].enable(), this;
},
getCenter: function() {
return this.layerPointToLatLng(this._getCenterLayerPoint());
},
getZoom: function() {
return this._zoom;
},
getBounds: function() {
var e = this.getPixelBounds(), t = this.unproject(e.getBottomLeft()), r = this.unproject(e.getTopRight());
return new n.LatLngBounds(t, r);
},
getMinZoom: function() {
var e = this.options.minZoom || 0, t = this._layersMinZoom || 0, n = this._boundsMinZoom || 0;
return Math.max(e, t, n);
},
getMaxZoom: function() {
var e = this.options.maxZoom === t ? Infinity : this.options.maxZoom, n = this._layersMaxZoom === t ? Infinity : this._layersMaxZoom;
return Math.min(e, n);
},
getBoundsZoom: function(e, t) {
e = n.latLngBounds(e);
var r = this.getSize(), i = this.options.minZoom || 0, s = this.getMaxZoom(), o = e.getNorthEast(), u = e.getSouthWest(), a, f, l, c = !0;
t && i--;
do i++, f = this.project(o, i), l = this.project(u, i), a = new n.Point(Math.abs(f.x - l.x), Math.abs(l.y - f.y)), t ? c = a.x < r.x || a.y < r.y : c = a.x <= r.x && a.y <= r.y; while (c && i <= s);
return c && t ? null : t ? i : i - 1;
},
getSize: function() {
if (!this._size || this._sizeChanged) this._size = new n.Point(this._container.clientWidth, this._container.clientHeight), this._sizeChanged = !1;
return this._size;
},
getPixelBounds: function() {
var e = this._getTopLeftPoint();
return new n.Bounds(e, e.add(this.getSize()));
},
getPixelOrigin: function() {
return this._initialTopLeftPoint;
},
getPanes: function() {
return this._panes;
},
getContainer: function() {
return this._container;
},
getZoomScale: function(e) {
var t = this.options.crs;
return t.scale(e) / t.scale(this._zoom);
},
getScaleZoom: function(e) {
return this._zoom + Math.log(e) / Math.LN2;
},
project: function(e, r) {
return r = r === t ? this._zoom : r, this.options.crs.latLngToPoint(n.latLng(e), r);
},
unproject: function(e, r) {
return r = r === t ? this._zoom : r, this.options.crs.pointToLatLng(n.point(e), r);
},
layerPointToLatLng: function(e) {
var t = n.point(e).add(this._initialTopLeftPoint);
return this.unproject(t);
},
latLngToLayerPoint: function(e) {
var t = this.project(n.latLng(e))._round();
return t._subtract(this._initialTopLeftPoint);
},
containerPointToLayerPoint: function(e) {
return n.point(e).subtract(this._getMapPanePos());
},
layerPointToContainerPoint: function(e) {
return n.point(e).add(this._getMapPanePos());
},
containerPointToLatLng: function(e) {
var t = this.containerPointToLayerPoint(n.point(e));
return this.layerPointToLatLng(t);
},
latLngToContainerPoint: function(e) {
return this.layerPointToContainerPoint(this.latLngToLayerPoint(n.latLng(e)));
},
mouseEventToContainerPoint: function(e) {
return n.DomEvent.getMousePosition(e, this._container);
},
mouseEventToLayerPoint: function(e) {
return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(e));
},
mouseEventToLatLng: function(e) {
return this.layerPointToLatLng(this.mouseEventToLayerPoint(e));
},
_initContainer: function(e) {
var t = this._container = n.DomUtil.get(e);
if (t._leaflet) throw Error("Map container is already initialized.");
t._leaflet = !0;
},
_initLayout: function() {
var e = this._container;
e.innerHTML = "", n.DomUtil.addClass(e, "leaflet-container"), n.Browser.touch && n.DomUtil.addClass(e, "leaflet-touch"), this.options.fadeAnimation && n.DomUtil.addClass(e, "leaflet-fade-anim");
var t = n.DomUtil.getStyle(e, "position");
t !== "absolute" && t !== "relative" && t !== "fixed" && (e.style.position = "relative"), this._initPanes(), this._initControlPos && this._initControlPos();
},
_initPanes: function() {
var e = this._panes = {};
this._mapPane = e.mapPane = this._createPane("leaflet-map-pane", this._container), this._tilePane = e.tilePane = this._createPane("leaflet-tile-pane", this._mapPane), this._objectsPane = e.objectsPane = this._createPane("leaflet-objects-pane", this._mapPane), e.shadowPane = this._createPane("leaflet-shadow-pane"), e.overlayPane = this._createPane("leaflet-overlay-pane"), e.markerPane = this._createPane("leaflet-marker-pane"), e.popupPane = this._createPane("leaflet-popup-pane");
var t = " leaflet-zoom-hide";
this.options.markerZoomAnimation || (n.DomUtil.addClass(e.markerPane, t), n.DomUtil.addClass(e.shadowPane, t), n.DomUtil.addClass(e.popupPane, t));
},
_createPane: function(e, t) {
return n.DomUtil.create("div", e, t || this._objectsPane);
},
_initializers: [],
_initHooks: function() {
var e, t;
for (e = 0, t = this._initializers.length; e < t; e++) this._initializers[e].call(this);
},
_initLayers: function(e) {
e = e ? e instanceof Array ? e : [ e ] : [], this._layers = {}, this._tileLayersNum = 0;
var t, n;
for (t = 0, n = e.length; t < n; t++) this.addLayer(e[t]);
},
_resetView: function(e, t, r, i) {
var s = this._zoom !== t;
i || (this.fire("movestart"), s && this.fire("zoomstart")), this._zoom = t, this._initialTopLeftPoint = this._getNewTopLeftPoint(e), r ? this._initialTopLeftPoint._add(this._getMapPanePos()) : n.DomUtil.setPosition(this._mapPane, new n.Point(0, 0)), this._tileLayersToLoad = this._tileLayersNum, this.fire("viewreset", {
hard: !r
}), this.fire("move"), (s || i) && this.fire("zoomend"), this.fire("moveend", {
hard: !r
}), this._loaded || (this._loaded = !0, this.fire("load"));
},
_rawPanBy: function(e) {
n.DomUtil.setPosition(this._mapPane, this._getMapPanePos().subtract(e));
},
_initEvents: function() {
if (!n.DomEvent) return;
n.DomEvent.on(this._container, "click", this._onMouseClick, this);
var t = [ "dblclick", "mousedown", "mouseup", "mouseenter", "mouseleave", "mousemove", "contextmenu" ], r, i;
for (r = 0, i = t.length; r < i; r++) n.DomEvent.on(this._container, t[r], this._fireMouseEvent, this);
this.options.trackResize && n.DomEvent.on(e, "resize", this._onResize, this);
},
_onResize: function() {
n.Util.cancelAnimFrame(this._resizeRequest), this._resizeRequest = n.Util.requestAnimFrame(this.invalidateSize, this, !1, this._container);
},
_onMouseClick: function(e) {
if (!this._loaded || this.dragging && this.dragging.moved()) return;
this.fire("preclick"), this._fireMouseEvent(e);
},
_fireMouseEvent: function(e) {
if (!this._loaded) return;
var t = e.type;
t = t === "mouseenter" ? "mouseover" : t === "mouseleave" ? "mouseout" : t;
if (!this.hasEventListeners(t)) return;
t === "contextmenu" && n.DomEvent.preventDefault(e);
var r = this.mouseEventToContainerPoint(e), i = this.containerPointToLayerPoint(r), s = this.layerPointToLatLng(i);
this.fire(t, {
latlng: s,
layerPoint: i,
containerPoint: r,
originalEvent: e
});
},
_onTileLayerLoad: function() {
this._tileLayersToLoad--, this._tileLayersNum && !this._tileLayersToLoad && this._tileBg && (clearTimeout(this._clearTileBgTimer), this._clearTileBgTimer = setTimeout(n.Util.bind(this._clearTileBg, this), 500));
},
_getMapPanePos: function() {
return n.DomUtil.getPosition(this._mapPane);
},
_getTopLeftPoint: function() {
if (!this._loaded) throw Error("Set map center and zoom first.");
return this._initialTopLeftPoint.subtract(this._getMapPanePos());
},
_getNewTopLeftPoint: function(e, t) {
var n = this.getSize().divideBy(2);
return this.project(e, t)._subtract(n)._round();
},
_latLngToNewLayerPoint: function(e, t, n) {
var r = this._getNewTopLeftPoint(n, t).add(this._getMapPanePos());
return this.project(e, t)._subtract(r);
},
_getCenterLayerPoint: function() {
return this.containerPointToLayerPoint(this.getSize().divideBy(2));
},
_getCenterOffset: function(e) {
return this.latLngToLayerPoint(e).subtract(this._getCenterLayerPoint());
},
_limitZoom: function(e) {
var t = this.getMinZoom(), n = this.getMaxZoom();
return Math.max(t, Math.min(n, e));
}
}), n.Map.addInitHook = function(e) {
var t = Array.prototype.slice.call(arguments, 1), n = typeof e == "function" ? e : function() {
this[e].apply(this, t);
};
this.prototype._initializers.push(n);
}, n.map = function(e, t) {
return new n.Map(e, t);
}, n.Projection.Mercator = {
MAX_LATITUDE: 85.0840591556,
R_MINOR: 6356752.3142,
R_MAJOR: 6378137,
project: function(e) {
var t = n.LatLng.DEG_TO_RAD, r = this.MAX_LATITUDE, i = Math.max(Math.min(r, e.lat), -r), s = this.R_MAJOR, o = this.R_MINOR, u = e.lng * t * s, a = i * t, f = o / s, l = Math.sqrt(1 - f * f), c = l * Math.sin(a);
c = Math.pow((1 - c) / (1 + c), l * .5);
var h = Math.tan(.5 * (Math.PI * .5 - a)) / c;
return a = -o * Math.log(h), new n.Point(u, a);
},
unproject: function(e) {
var t = n.LatLng.RAD_TO_DEG, r = this.R_MAJOR, i = this.R_MINOR, s = e.x * t / r, o = i / r, u = Math.sqrt(1 - o * o), a = Math.exp(-e.y / i), f = Math.PI / 2 - 2 * Math.atan(a), l = 15, c = 1e-7, h = l, p = .1, d;
while (Math.abs(p) > c && --h > 0) d = u * Math.sin(f), p = Math.PI / 2 - 2 * Math.atan(a * Math.pow((1 - d) / (1 + d), .5 * u)) - f, f += p;
return new n.LatLng(f * t, s, !0);
}
}, n.CRS.EPSG3395 = n.Util.extend({}, n.CRS, {
code: "EPSG:3395",
projection: n.Projection.Mercator,
transformation: function() {
var e = n.Projection.Mercator, t = e.R_MAJOR, r = e.R_MINOR;
return new n.Transformation(.5 / (Math.PI * t), .5, -0.5 / (Math.PI * r), .5);
}()
}), n.TileLayer = n.Class.extend({
includes: n.Mixin.Events,
options: {
minZoom: 0,
maxZoom: 18,
tileSize: 256,
subdomains: "abc",
errorTileUrl: "",
attribution: "",
zoomOffset: 0,
opacity: 1,
unloadInvisibleTiles: n.Browser.mobile,
updateWhenIdle: n.Browser.mobile
},
initialize: function(e, t) {
t = n.Util.setOptions(this, t), t.detectRetina && n.Browser.retina && t.maxZoom > 0 && (t.tileSize = Math.floor(t.tileSize / 2), t.zoomOffset++, t.minZoom > 0 && t.minZoom--, this.options.maxZoom--), this._url = e;
var r = this.options.subdomains;
typeof r == "string" && (this.options.subdomains = r.split(""));
},
onAdd: function(e) {
this._map = e, this._initContainer(), this._createTileProto(), e.on({
viewreset: this._resetCallback,
moveend: this._update
}, this), this.options.updateWhenIdle || (this._limitedUpdate = n.Util.limitExecByInterval(this._update, 150, this), e.on("move", this._limitedUpdate, this)), this._reset(), this._update();
},
addTo: function(e) {
return e.addLayer(this), this;
},
onRemove: function(e) {
e._panes.tilePane.removeChild(this._container), e.off({
viewreset: this._resetCallback,
moveend: this._update
}, this), this.options.updateWhenIdle || e.off("move", this._limitedUpdate, this), this._container = null, this._map = null;
},
bringToFront: function() {
var e = this._map._panes.tilePane;
return this._container && (e.appendChild(this._container), this._setAutoZIndex(e, Math.max)), this;
},
bringToBack: function() {
var e = this._map._panes.tilePane;
return this._container && (e.insertBefore(this._container, e.firstChild), this._setAutoZIndex(e, Math.min)), this;
},
getAttribution: function() {
return this.options.attribution;
},
setOpacity: function(e) {
return this.options.opacity = e, this._map && this._updateOpacity(), this;
},
setZIndex: function(e) {
return this.options.zIndex = e, this._updateZIndex(), this;
},
setUrl: function(e, t) {
return this._url = e, t || this.redraw(), this;
},
redraw: function() {
return this._map && (this._map._panes.tilePane.empty = !1, this._reset(!0), this._update()), this;
},
_updateZIndex: function() {
this._container && this.options.zIndex !== t && (this._container.style.zIndex = this.options.zIndex);
},
_setAutoZIndex: function(e, t) {
var n = e.getElementsByClassName("leaflet-layer"), r = -t(Infinity, -Infinity), i;
for (var s = 0, o = n.length; s < o; s++) n[s] !== this._container && (i = parseInt(n[s].style.zIndex, 10), isNaN(i) || (r = t(r, i)));
this._container.style.zIndex = isFinite(r) ? r + t(1, -1) : "";
},
_updateOpacity: function() {
n.DomUtil.setOpacity(this._container, this.options.opacity);
var e, t = this._tiles;
if (n.Browser.webkit) for (e in t) t.hasOwnProperty(e) && (t[e].style.webkitTransform += " translate(0,0)");
},
_initContainer: function() {
var e = this._map._panes.tilePane;
if (!this._container || e.empty) this._container = n.DomUtil.create("div", "leaflet-layer"), this._updateZIndex(), e.appendChild(this._container), this.options.opacity < 1 && this._updateOpacity();
},
_resetCallback: function(e) {
this._reset(e.hard);
},
_reset: function(e) {
var t, n = this._tiles;
for (t in n) n.hasOwnProperty(t) && this.fire("tileunload", {
tile: n[t]
});
this._tiles = {}, this._tilesToLoad = 0, this.options.reuseTiles && (this._unusedTiles = []), e && this._container && (this._container.innerHTML = ""), this._initContainer();
},
_update: function(e) {
if (this._map._panTransition && this._map._panTransition._inProgress) return;
var t = this._map.getPixelBounds(), r = this._map.getZoom(), i = this.options.tileSize;
if (r > this.options.maxZoom || r < this.options.minZoom) return;
var s = new n.Point(Math.floor(t.min.x / i), Math.floor(t.min.y / i)), o = new n.Point(Math.floor(t.max.x / i), Math.floor(t.max.y / i)), u = new n.Bounds(s, o);
this._addTilesFromCenterOut(u), (this.options.unloadInvisibleTiles || this.options.reuseTiles) && this._removeOtherTiles(u);
},
_addTilesFromCenterOut: function(e) {
var t = [], r = e.getCenter(), i, s, o;
for (i = e.min.y; i <= e.max.y; i++) for (s = e.min.x; s <= e.max.x; s++) o = new n.Point(s, i), this._tileShouldBeLoaded(o) && t.push(o);
var u = t.length;
if (u === 0) return;
t.sort(function(e, t) {
return e.distanceTo(r) - t.distanceTo(r);
});
var a = document.createDocumentFragment();
this._tilesToLoad || this.fire("loading"), this._tilesToLoad += u;
for (s = 0; s < u; s++) this._addTile(t[s], a);
this._container.appendChild(a);
},
_tileShouldBeLoaded: function(e) {
if (e.x + ":" + e.y in this._tiles) return !1;
if (!this.options.continuousWorld) {
var t = this._getWrapTileNum();
if (this.options.noWrap && (e.x < 0 || e.x >= t) || e.y < 0 || e.y >= t) return !1;
}
return !0;
},
_removeOtherTiles: function(e) {
var t, n, r, i;
for (i in this._tiles) this._tiles.hasOwnProperty(i) && (t = i.split(":"), n = parseInt(t[0], 10), r = parseInt(t[1], 10), (n < e.min.x || n > e.max.x || r < e.min.y || r > e.max.y) && this._removeTile(i));
},
_removeTile: function(e) {
var t = this._tiles[e];
this.fire("tileunload", {
tile: t,
url: t.src
}), this.options.reuseTiles ? (n.DomUtil.removeClass(t, "leaflet-tile-loaded"), this._unusedTiles.push(t)) : t.parentNode === this._container && this._container.removeChild(t), n.Browser.android || (t.src = n.Util.emptyImageUrl), delete this._tiles[e];
},
_addTile: function(e, t) {
var r = this._getTilePos(e), i = this._getTile();
n.DomUtil.setPosition(i, r, n.Browser.chrome || n.Browser.android23), this._tiles[e.x + ":" + e.y] = i, this._loadTile(i, e), i.parentNode !== this._container && t.appendChild(i);
},
_getZoomForUrl: function() {
var e = this.options, t = this._map.getZoom();
return e.zoomReverse && (t = e.maxZoom - t), t + e.zoomOffset;
},
_getTilePos: function(e) {
var t = this._map.getPixelOrigin(), n = this.options.tileSize;
return e.multiplyBy(n).subtract(t);
},
getTileUrl: function(e) {
return this._adjustTilePoint(e), n.Util.template(this._url, n.Util.extend({
s: this._getSubdomain(e),
z: this._getZoomForUrl(),
x: e.x,
y: e.y
}, this.options));
},
_getWrapTileNum: function() {
return Math.pow(2, this._getZoomForUrl());
},
_adjustTilePoint: function(e) {
var t = this._getWrapTileNum();
!this.options.continuousWorld && !this.options.noWrap && (e.x = (e.x % t + t) % t), this.options.tms && (e.y = t - e.y - 1);
},
_getSubdomain: function(e) {
var t = (e.x + e.y) % this.options.subdomains.length;
return this.options.subdomains[t];
},
_createTileProto: function() {
var e = this._tileImg = n.DomUtil.create("img", "leaflet-tile");
e.galleryimg = "no";
var t = this.options.tileSize;
e.style.width = t + "px", e.style.height = t + "px";
},
_getTile: function() {
if (this.options.reuseTiles && this._unusedTiles.length > 0) {
var e = this._unusedTiles.pop();
return this._resetTile(e), e;
}
return this._createTile();
},
_resetTile: function(e) {},
_createTile: function() {
var e = this._tileImg.cloneNode(!1);
return e.onselectstart = e.onmousemove = n.Util.falseFn, e;
},
_loadTile: function(e, t) {
e._layer = this, e.onload = this._tileOnLoad, e.onerror = this._tileOnError, e.src = this.getTileUrl(t);
},
_tileLoaded: function() {
this._tilesToLoad--, this._tilesToLoad || this.fire("load");
},
_tileOnLoad: function(e) {
var t = this._layer;
this.src !== n.Util.emptyImageUrl && (n.DomUtil.addClass(this, "leaflet-tile-loaded"), t.fire("tileload", {
tile: this,
url: this.src
})), t._tileLoaded();
},
_tileOnError: function(e) {
var t = this._layer;
t.fire("tileerror", {
tile: this,
url: this.src
});
var n = t.options.errorTileUrl;
n && (this.src = n), t._tileLoaded();
}
}), n.tileLayer = function(e, t) {
return new n.TileLayer(e, t);
}, n.TileLayer.WMS = n.TileLayer.extend({
defaultWmsParams: {
service: "WMS",
request: "GetMap",
version: "1.1.1",
layers: "",
styles: "",
format: "image/jpeg",
transparent: !1
},
initialize: function(e, t) {
this._url = e;
var r = n.Util.extend({}, this.defaultWmsParams);
t.detectRetina && n.Browser.retina ? r.width = r.height = this.options.tileSize * 2 : r.width = r.height = this.options.tileSize;
for (var i in t) this.options.hasOwnProperty(i) || (r[i] = t[i]);
this.wmsParams = r, n.Util.setOptions(this, t);
},
onAdd: function(e) {
var t = parseFloat(this.wmsParams.version) >= 1.3 ? "crs" : "srs";
this.wmsParams[t] = e.options.crs.code, n.TileLayer.prototype.onAdd.call(this, e);
},
getTileUrl: function(e, t) {
var r = this._map, i = r.options.crs, s = this.options.tileSize, o = e.multiplyBy(s), u = o.add(new n.Point(s, s)), a = i.project(r.unproject(o, t)), f = i.project(r.unproject(u, t)), l = [ a.x, f.y, f.x, a.y ].join(","), c = n.Util.template(this._url, {
s: this._getSubdomain(e)
});
return c + n.Util.getParamString(this.wmsParams) + "&bbox=" + l;
},
setParams: function(e, t) {
return n.Util.extend(this.wmsParams, e), t || this.redraw(), this;
}
}), n.tileLayer.wms = function(e, t) {
return new n.TileLayer.WMS(e, t);
}, n.TileLayer.Canvas = n.TileLayer.extend({
options: {
async: !1
},
initialize: function(e) {
n.Util.setOptions(this, e);
},
redraw: function() {
var e, t = this._tiles;
for (e in t) t.hasOwnProperty(e) && this._redrawTile(t[e]);
},
_redrawTile: function(e) {
this.drawTile(e, e._tilePoint, e._zoom);
},
_createTileProto: function() {
var e = this._canvasProto = n.DomUtil.create("canvas", "leaflet-tile"), t = this.options.tileSize;
e.width = t, e.height = t;
},
_createTile: function() {
var e = this._canvasProto.cloneNode(!1);
return e.onselectstart = e.onmousemove = n.Util.falseFn, e;
},
_loadTile: function(e, t, n) {
e._layer = this, e._tilePoint = t, e._zoom = n, this.drawTile(e, t, n), this.options.async || this.tileDrawn(e);
},
drawTile: function(e, t, n) {},
tileDrawn: function(e) {
this._tileOnLoad.call(e);
}
}), n.tileLayer.canvas = function(e) {
return new n.TileLayer.Canvas(e);
}, n.ImageOverlay = n.Class.extend({
includes: n.Mixin.Events,
options: {
opacity: 1
},
initialize: function(e, t, r) {
this._url = e, this._bounds = n.latLngBounds(t), n.Util.setOptions(this, r);
},
onAdd: function(e) {
this._map = e, this._image || this._initImage(), e._panes.overlayPane.appendChild(this._image), e.on("viewreset", this._reset, this), e.options.zoomAnimation && n.Browser.any3d && e.on("zoomanim", this._animateZoom, this), this._reset();
},
onRemove: function(e) {
e.getPanes().overlayPane.removeChild(this._image), e.off("viewreset", this._reset, this), e.options.zoomAnimation && e.off("zoomanim", this._animateZoom, this);
},
addTo: function(e) {
return e.addLayer(this), this;
},
setOpacity: function(e) {
return this.options.opacity = e, this._updateOpacity(), this;
},
bringToFront: function() {
return this._image && this._map._panes.overlayPane.appendChild(this._image), this;
},
bringToBack: function() {
var e = this._map._panes.overlayPane;
return this._image && e.insertBefore(this._image, e.firstChild), this;
},
_initImage: function() {
this._image = n.DomUtil.create("img", "leaflet-image-layer"), this._map.options.zoomAnimation && n.Browser.any3d ? n.DomUtil.addClass(this._image, "leaflet-zoom-animated") : n.DomUtil.addClass(this._image, "leaflet-zoom-hide"), this._updateOpacity(), n.Util.extend(this._image, {
galleryimg: "no",
onselectstart: n.Util.falseFn,
onmousemove: n.Util.falseFn,
onload: n.Util.bind(this._onImageLoad, this),
src: this._url
});
},
_animateZoom: function(e) {
var t = this._map, r = this._image, i = t.getZoomScale(e.zoom), s = this._bounds.getNorthWest(), o = this._bounds.getSouthEast(), u = t._latLngToNewLayerPoint(s, e.zoom, e.center), a = t._latLngToNewLayerPoint(o, e.zoom, e.center).subtract(u), f = t.latLngToLayerPoint(o).subtract(t.latLngToLayerPoint(s)), l = u.add(a.subtract(f).divideBy(2));
r.style[n.DomUtil.TRANSFORM] = n.DomUtil.getTranslateString(l) + " scale(" + i + ") ";
},
_reset: function() {
var e = this._image, t = this._map.latLngToLayerPoint(this._bounds.getNorthWest()), r = this._map.latLngToLayerPoint(this._bounds.getSouthEast()).subtract(t);
n.DomUtil.setPosition(e, t), e.style.width = r.x + "px", e.style.height = r.y + "px";
},
_onImageLoad: function() {
this.fire("load");
},
_updateOpacity: function() {
n.DomUtil.setOpacity(this._image, this.options.opacity);
}
}), n.imageOverlay = function(e, t, r) {
return new n.ImageOverlay(e, t, r);
}, n.Icon = n.Class.extend({
options: {
className: ""
},
initialize: function(e) {
n.Util.setOptions(this, e);
},
createIcon: function() {
return this._createIcon("icon");
},
createShadow: function() {
return this._createIcon("shadow");
},
_createIcon: function(e) {
var t = this._getIconUrl(e);
if (!t) {
if (e === "icon") throw Error("iconUrl not set in Icon options (see the docs).");
return null;
}
var n = this._createImg(t);
return this._setIconStyles(n, e), n;
},
_setIconStyles: function(e, t) {
var r = this.options, i = n.point(r[t + "Size"]), s;
t === "shadow" ? s = n.point(r.shadowAnchor || r.iconAnchor) : s = n.point(r.iconAnchor), !s && i && (s = i.divideBy(2, !0)), e.className = "leaflet-marker-" + t + " " + r.className, s && (e.style.marginLeft = -s.x + "px", e.style.marginTop = -s.y + "px"), i && (e.style.width = i.x + "px", e.style.height = i.y + "px");
},
_createImg: function(e) {
var t;
return n.Browser.ie6 ? (t = document.createElement("div"), t.style.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + e + '")') : (t = document.createElement("img"), t.src = e), t;
},
_getIconUrl: function(e) {
return this.options[e + "Url"];
}
}), n.icon = function(e) {
return new n.Icon(e);
}, n.Icon.Default = n.Icon.extend({
options: {
iconSize: new n.Point(25, 41),
iconAnchor: new n.Point(13, 41),
popupAnchor: new n.Point(1, -34),
shadowSize: new n.Point(41, 41)
},
_getIconUrl: function(e) {
var t = e + "Url";
if (this.options[t]) return this.options[t];
var r = n.Icon.Default.imagePath;
if (!r) throw Error("Couldn't autodetect L.Icon.Default.imagePath, set it manually.");
return r + "/marker-" + e + ".png";
}
}), n.Icon.Default.imagePath = function() {
var e = document.getElementsByTagName("script"), t = /\/?leaflet[\-\._]?([\w\-\._]*)\.js\??/, n, r, i, s;
for (n = 0, r = e.length; n < r; n++) {
i = e[n].src, s = i.match(t);
if (s) return i.split(t)[0] + "/images";
}
}(), n.Marker = n.Class.extend({
includes: n.Mixin.Events,
options: {
icon: new n.Icon.Default,
title: "",
clickable: !0,
draggable: !1,
zIndexOffset: 0,
opacity: 1
},
initialize: function(e, t) {
n.Util.setOptions(this, t), this._latlng = n.latLng(e);
},
onAdd: function(e) {
this._map = e, e.on("viewreset", this.update, this), this._initIcon(), this.update(), e.options.zoomAnimation && e.options.markerZoomAnimation && e.on("zoomanim", this._animateZoom, this);
},
addTo: function(e) {
return e.addLayer(this), this;
},
onRemove: function(e) {
this._removeIcon(), this.closePopup && this.closePopup(), e.off({
viewreset: this.update,
zoomanim: this._animateZoom
}, this), this._map = null;
},
getLatLng: function() {
return this._latlng;
},
setLatLng: function(e) {
this._latlng = n.latLng(e), this.update(), this._popup && this._popup.setLatLng(e);
},
setZIndexOffset: function(e) {
this.options.zIndexOffset = e, this.update();
},
setIcon: function(e) {
this._map && this._removeIcon(), this.options.icon = e, this._map && (this._initIcon(), this.update());
},
update: function() {
if (!this._icon) return;
var e = this._map.latLngToLayerPoint(this._latlng).round();
this._setPos(e);
},
_initIcon: function() {
var e = this.options, t = this._map, r = t.options.zoomAnimation && t.options.markerZoomAnimation, i = r ? "leaflet-zoom-animated" : "leaflet-zoom-hide", s = !1;
this._icon || (this._icon = e.icon.createIcon(), e.title && (this._icon.title = e.title), this._initInteraction(), s = this.options.opacity < 1, n.DomUtil.addClass(this._icon, i)), this._shadow || (this._shadow = e.icon.createShadow(), this._shadow && (n.DomUtil.addClass(this._shadow, i), s = this.options.opacity < 1)), s && this._updateOpacity();
var o = this._map._panes;
o.markerPane.appendChild(this._icon), this._shadow && o.shadowPane.appendChild(this._shadow);
},
_removeIcon: function() {
var e = this._map._panes;
e.markerPane.removeChild(this._icon), this._shadow && e.shadowPane.removeChild(this._shadow), this._icon = this._shadow = null;
},
_setPos: function(e) {
n.DomUtil.setPosition(this._icon, e), this._shadow && n.DomUtil.setPosition(this._shadow, e), this._icon.style.zIndex = e.y + this.options.zIndexOffset;
},
_animateZoom: function(e) {
var t = this._map._latLngToNewLayerPoint(this._latlng, e.zoom, e.center);
this._setPos(t);
},
_initInteraction: function() {
if (!this.options.clickable) return;
var e = this._icon, t = [ "dblclick", "mousedown", "mouseover", "mouseout" ];
n.DomUtil.addClass(e, "leaflet-clickable"), n.DomEvent.on(e, "click", this._onMouseClick, this);
for (var r = 0; r < t.length; r++) n.DomEvent.on(e, t[r], this._fireMouseEvent, this);
n.Handler.MarkerDrag && (this.dragging = new n.Handler.MarkerDrag(this), this.options.draggable && this.dragging.enable());
},
_onMouseClick: function(e) {
n.DomEvent.stopPropagation(e);
if (this.dragging && this.dragging.moved()) return;
if (this._map.dragging && this._map.dragging.moved()) return;
this.fire(e.type, {
originalEvent: e
});
},
_fireMouseEvent: function(e) {
this.fire(e.type, {
originalEvent: e
}), e.type !== "mousedown" && n.DomEvent.stopPropagation(e);
},
setOpacity: function(e) {
this.options.opacity = e, this._map && this._updateOpacity();
},
_updateOpacity: function() {
n.DomUtil.setOpacity(this._icon, this.options.opacity), this._shadow && n.DomUtil.setOpacity(this._shadow, this.options.opacity);
}
}), n.marker = function(e, t) {
return new n.Marker(e, t);
}, n.DivIcon = n.Icon.extend({
options: {
iconSize: new n.Point(12, 12),
className: "leaflet-div-icon"
},
createIcon: function() {
var e = document.createElement("div"), t = this.options;
return t.html && (e.innerHTML = t.html), t.bgPos && (e.style.backgroundPosition = -t.bgPos.x + "px " + -t.bgPos.y + "px"), this._setIconStyles(e, "icon"), e;
},
createShadow: function() {
return null;
}
}), n.divIcon = function(e) {
return new n.DivIcon(e);
}, n.Map.mergeOptions({
closePopupOnClick: !0
}), n.Popup = n.Class.extend({
includes: n.Mixin.Events,
options: {
minWidth: 50,
maxWidth: 300,
maxHeight: null,
autoPan: !0,
closeButton: !0,
offset: new n.Point(0, 6),
autoPanPadding: new n.Point(5, 5),
className: ""
},
initialize: function(e, t) {
n.Util.setOptions(this, e), this._source = t;
},
onAdd: function(e) {
this._map = e, this._container || this._initLayout(), this._updateContent();
var t = e.options.fadeAnimation;
t && n.DomUtil.setOpacity(this._container, 0), e._panes.popupPane.appendChild(this._container), e.on("viewreset", this._updatePosition, this), n.Browser.any3d && e.on("zoomanim", this._zoomAnimation, this), e.options.closePopupOnClick && e.on("preclick", this._close, this), this._update(), t && n.DomUtil.setOpacity(this._container, 1);
},
addTo: function(e) {
return e.addLayer(this), this;
},
openOn: function(e) {
return e.openPopup(this), this;
},
onRemove: function(e) {
e._panes.popupPane.removeChild(this._container), n.Util.falseFn(this._container.offsetWidth), e.off({
viewreset: this._updatePosition,
preclick: this._close,
zoomanim: this._zoomAnimation
}, this), e.options.fadeAnimation && n.DomUtil.setOpacity(this._container, 0), this._map = null;
},
setLatLng: function(e) {
return this._latlng = n.latLng(e), this._update(), this;
},
setContent: function(e) {
return this._content = e, this._update(), this;
},
_close: function() {
var e = this._map;
e && (e._popup = null, e.removeLayer(this).fire("popupclose", {
popup: this
}));
},
_initLayout: function() {
var e = "leaflet-popup", t = this._container = n.DomUtil.create("div", e + " " + this.options.className + " leaflet-zoom-animated"), r;
this.options.closeButton && (r = this._closeButton = n.DomUtil.create("a", e + "-close-button", t), r.href = "#close", r.innerHTML = "&#215;", n.DomEvent.on(r, "click", this._onCloseButtonClick, this));
var i = this._wrapper = n.DomUtil.create("div", e + "-content-wrapper", t);
n.DomEvent.disableClickPropagation(i), this._contentNode = n.DomUtil.create("div", e + "-content", i), n.DomEvent.on(this._contentNode, "mousewheel", n.DomEvent.stopPropagation), this._tipContainer = n.DomUtil.create("div", e + "-tip-container", t), this._tip = n.DomUtil.create("div", e + "-tip", this._tipContainer);
},
_update: function() {
if (!this._map) return;
this._container.style.visibility = "hidden", this._updateContent(), this._updateLayout(), this._updatePosition(), this._container.style.visibility = "", this._adjustPan();
},
_updateContent: function() {
if (!this._content) return;
if (typeof this._content == "string") this._contentNode.innerHTML = this._content; else {
while (this._contentNode.hasChildNodes()) this._contentNode.removeChild(this._contentNode.firstChild);
this._contentNode.appendChild(this._content);
}
this.fire("contentupdate");
},
_updateLayout: function() {
var e = this._contentNode, t = e.style;
t.width = "", t.whiteSpace = "nowrap";
var r = e.offsetWidth;
r = Math.min(r, this.options.maxWidth), r = Math.max(r, this.options.minWidth), t.width = r + 1 + "px", t.whiteSpace = "", t.height = "";
var i = e.offsetHeight, s = this.options.maxHeight, o = "leaflet-popup-scrolled";
s && i > s ? (t.height = s + "px", n.DomUtil.addClass(e, o)) : n.DomUtil.removeClass(e, o), this._containerWidth = this._container.offsetWidth;
},
_updatePosition: function() {
var e = this._map.latLngToLayerPoint(this._latlng), t = n.Browser.any3d, r = this.options.offset;
t && n.DomUtil.setPosition(this._container, e), this._containerBottom = -r.y - (t ? 0 : e.y), this._containerLeft = -Math.round(this._containerWidth / 2) + r.x + (t ? 0 : e.x), this._container.style.bottom = this._containerBottom + "px", this._container.style.left = this._containerLeft + "px";
},
_zoomAnimation: function(e) {
var t = this._map._latLngToNewLayerPoint(this._latlng, e.zoom, e.center);
n.DomUtil.setPosition(this._container, t);
},
_adjustPan: function() {
if (!this.options.autoPan) return;
var e = this._map, t = this._container.offsetHeight, r = this._containerWidth, i = new n.Point(this._containerLeft, -t - this._containerBottom);
n.Browser.any3d && i._add(n.DomUtil.getPosition(this._container));
var s = e.layerPointToContainerPoint(i), o = this.options.autoPanPadding, u = e.getSize(), a = 0, f = 0;
s.x < 0 && (a = s.x - o.x), s.x + r > u.x && (a = s.x + r - u.x + o.x), s.y < 0 && (f = s.y - o.y), s.y + t > u.y && (f = s.y + t - u.y + o.y), (a || f) && e.panBy(new n.Point(a, f));
},
_onCloseButtonClick: function(e) {
this._close(), n.DomEvent.stop(e);
}
}), n.popup = function(e, t) {
return new n.Popup(e, t);
}, n.Marker.include({
openPopup: function() {
return this._popup && this._map && (this._popup.setLatLng(this._latlng), this._map.openPopup(this._popup)), this;
},
closePopup: function() {
return this._popup && this._popup._close(), this;
},
bindPopup: function(e, t) {
var r = n.point(this.options.icon.options.popupAnchor) || new n.Point(0, 0);
return r = r.add(n.Popup.prototype.options.offset), t && t.offset && (r = r.add(t.offset)), t = n.Util.extend({
offset: r
}, t), this._popup || this.on("click", this.openPopup, this), this._popup = (new n.Popup(t, this)).setContent(e), this;
},
unbindPopup: function() {
return this._popup && (this._popup = null, this.off("click", this.openPopup)), this;
}
}), n.Map.include({
openPopup: function(e) {
return this.closePopup(), this._popup = e, this.addLayer(e).fire("popupopen", {
popup: this._popup
});
},
closePopup: function() {
return this._popup && this._popup._close(), this;
}
}), n.LayerGroup = n.Class.extend({
initialize: function(e) {
this._layers = {};
var t, n;
if (e) for (t = 0, n = e.length; t < n; t++) this.addLayer(e[t]);
},
addLayer: function(e) {
var t = n.Util.stamp(e);
return this._layers[t] = e, this._map && this._map.addLayer(e), this;
},
removeLayer: function(e) {
var t = n.Util.stamp(e);
return delete this._layers[t], this._map && this._map.removeLayer(e), this;
},
clearLayers: function() {
return this.eachLayer(this.removeLayer, this), this;
},
invoke: function(e) {
var t = Array.prototype.slice.call(arguments, 1), n, r;
for (n in this._layers) this._layers.hasOwnProperty(n) && (r = this._layers[n], r[e] && r[e].apply(r, t));
return this;
},
onAdd: function(e) {
this._map = e, this.eachLayer(e.addLayer, e);
},
onRemove: function(e) {
this.eachLayer(e.removeLayer, e), this._map = null;
},
addTo: function(e) {
return e.addLayer(this), this;
},
eachLayer: function(e, t) {
for (var n in this._layers) this._layers.hasOwnProperty(n) && e.call(t, this._layers[n]);
}
}), n.layerGroup = function(e) {
return new n.LayerGroup(e);
}, n.FeatureGroup = n.LayerGroup.extend({
includes: n.Mixin.Events,
addLayer: function(e) {
return this._layers[n.Util.stamp(e)] ? this : (e.on("click dblclick mouseover mouseout mousemove contextmenu", this._propagateEvent, this), n.LayerGroup.prototype.addLayer.call(this, e), this._popupContent && e.bindPopup && e.bindPopup(this._popupContent), this);
},
removeLayer: function(e) {
return e.off("click dblclick mouseover mouseout mousemove contextmenu", this._propagateEvent, this), n.LayerGroup.prototype.removeLayer.call(this, e), this._popupContent ? this.invoke("unbindPopup") : this;
},
bindPopup: function(e) {
return this._popupContent = e, this.invoke("bindPopup", e);
},
setStyle: function(e) {
return this.invoke("setStyle", e);
},
bringToFront: function() {
return this.invoke("bringToFront");
},
bringToBack: function() {
return this.invoke("bringToBack");
},
getBounds: function() {
var e = new n.LatLngBounds;
return this.eachLayer(function(t) {
e.extend(t instanceof n.Marker ? t.getLatLng() : t.getBounds());
}, this), e;
},
_propagateEvent: function(e) {
e.layer = e.target, e.target = this, this.fire(e.type, e);
}
}), n.featureGroup = function(e) {
return new n.FeatureGroup(e);
}, n.Path = n.Class.extend({
includes: [ n.Mixin.Events ],
statics: {
CLIP_PADDING: n.Browser.mobile ? Math.max(0, Math.min(.5, (1280 / Math.max(e.innerWidth, e.innerHeight) - 1) / 2)) : .5
},
options: {
stroke: !0,
color: "#0033ff",
dashArray: null,
weight: 5,
opacity: .5,
fill: !1,
fillColor: null,
fillOpacity: .2,
clickable: !0
},
initialize: function(e) {
n.Util.setOptions(this, e);
},
onAdd: function(e) {
this._map = e, this._container || (this._initElements(), this._initEvents()), this.projectLatlngs(), this._updatePath(), this._container && this._map._pathRoot.appendChild(this._container), e.on({
viewreset: this.projectLatlngs,
moveend: this._updatePath
}, this);
},
addTo: function(e) {
return e.addLayer(this), this;
},
onRemove: function(e) {
e._pathRoot.removeChild(this._container), this._map = null, n.Browser.vml && (this._container = null, this._stroke = null, this._fill = null), e.off({
viewreset: this.projectLatlngs,
moveend: this._updatePath
}, this);
},
projectLatlngs: function() {},
setStyle: function(e) {
return n.Util.setOptions(this, e), this._container && this._updateStyle(), this;
},
redraw: function() {
return this._map && (this.projectLatlngs(), this._updatePath()), this;
}
}), n.Map.include({
_updatePathViewport: function() {
var e = n.Path.CLIP_PADDING, t = this.getSize(), r = n.DomUtil.getPosition(this._mapPane), i = r.multiplyBy(-1)._subtract(t.multiplyBy(e)), s = i.add(t.multiplyBy(1 + e * 2));
this._pathViewport = new n.Bounds(i, s);
}
}), n.Path.SVG_NS = "http://www.w3.org/2000/svg", n.Browser.svg = !!document.createElementNS && !!document.createElementNS(n.Path.SVG_NS, "svg").createSVGRect, n.Path = n.Path.extend({
statics: {
SVG: n.Browser.svg
},
bringToFront: function() {
return this._container && this._map._pathRoot.appendChild(this._container), this;
},
bringToBack: function() {
if (this._container) {
var e = this._map._pathRoot;
e.insertBefore(this._container, e.firstChild);
}
return this;
},
getPathString: function() {},
_createElement: function(e) {
return document.createElementNS(n.Path.SVG_NS, e);
},
_initElements: function() {
this._map._initPathRoot(), this._initPath(), this._initStyle();
},
_initPath: function() {
this._container = this._createElement("g"), this._path = this._createElement("path"), this._container.appendChild(this._path);
},
_initStyle: function() {
this.options.stroke && (this._path.setAttribute("stroke-linejoin", "round"), this._path.setAttribute("stroke-linecap", "round")), this.options.fill && this._path.setAttribute("fill-rule", "evenodd"), this._updateStyle();
},
_updateStyle: function() {
this.options.stroke ? (this._path.setAttribute("stroke", this.options.color), this._path.setAttribute("stroke-opacity", this.options.opacity), this._path.setAttribute("stroke-width", this.options.weight), this.options.dashArray ? this._path.setAttribute("stroke-dasharray", this.options.dashArray) : this._path.removeAttribute("stroke-dasharray")) : this._path.setAttribute("stroke", "none"), this.options.fill ? (this._path.setAttribute("fill", this.options.fillColor || this.options.color), this._path.setAttribute("fill-opacity", this.options.fillOpacity)) : this._path.setAttribute("fill", "none");
},
_updatePath: function() {
var e = this.getPathString();
e || (e = "M0 0"), this._path.setAttribute("d", e);
},
_initEvents: function() {
if (this.options.clickable) {
(n.Browser.svg || !n.Browser.vml) && this._path.setAttribute("class", "leaflet-clickable"), n.DomEvent.on(this._container, "click", this._onMouseClick, this);
var e = [ "dblclick", "mousedown", "mouseover", "mouseout", "mousemove", "contextmenu" ];
for (var t = 0; t < e.length; t++) n.DomEvent.on(this._container, e[t], this._fireMouseEvent, this);
}
},
_onMouseClick: function(e) {
if (this._map.dragging && this._map.dragging.moved()) return;
this._fireMouseEvent(e), n.DomEvent.stopPropagation(e);
},
_fireMouseEvent: function(e) {
if (!this.hasEventListeners(e.type)) return;
e.type === "contextmenu" && n.DomEvent.preventDefault(e);
var t = this._map, r = t.mouseEventToContainerPoint(e), i = t.containerPointToLayerPoint(r), s = t.layerPointToLatLng(i);
this.fire(e.type, {
latlng: s,
layerPoint: i,
containerPoint: r,
originalEvent: e
});
}
}), n.Map.include({
_initPathRoot: function() {
this._pathRoot || (this._pathRoot = n.Path.prototype._createElement("svg"), this._panes.overlayPane.appendChild(this._pathRoot), this.options.zoomAnimation && n.Browser.any3d ? (this._pathRoot.setAttribute("class", " leaflet-zoom-animated"), this.on({
zoomanim: this._animatePathZoom,
zoomend: this._endPathZoom
})) : this._pathRoot.setAttribute("class", " leaflet-zoom-hide"), this.on("moveend", this._updateSvgViewport), this._updateSvgViewport());
},
_animatePathZoom: function(e) {
var t = this.getZoomScale(e.zoom), r = this._getCenterOffset(e.center).divideBy(1 - 1 / t), i = this.containerPointToLayerPoint(this.getSize().multiplyBy(-n.Path.CLIP_PADDING)), s = i.add(r).round();
this._pathRoot.style[n.DomUtil.TRANSFORM] = n.DomUtil.getTranslateString(s.multiplyBy(-1).add(n.DomUtil.getPosition(this._pathRoot)).multiplyBy(t).add(s)) + " scale(" + t + ") ", this._pathZooming = !0;
},
_endPathZoom: function() {
this._pathZooming = !1;
},
_updateSvgViewport: function() {
if (this._pathZooming) return;
this._updatePathViewport();
var e = this._pathViewport, t = e.min, r = e.max, i = r.x - t.x, s = r.y - t.y, o = this._pathRoot, u = this._panes.overlayPane;
n.Browser.mobileWebkit && u.removeChild(o), n.DomUtil.setPosition(o, t), o.setAttribute("width", i), o.setAttribute("height", s), o.setAttribute("viewBox", [ t.x, t.y, i, s ].join(" ")), n.Browser.mobileWebkit && u.appendChild(o);
}
}), n.Path.include({
bindPopup: function(e, t) {
if (!this._popup || this._popup.options !== t) this._popup = new n.Popup(t, this);
return this._popup.setContent(e), this._openPopupAdded || (this.on("click", this._openPopup, this), this._openPopupAdded = !0), this;
},
openPopup: function(e) {
return this._popup && (e = e || this._latlng || this._latlngs[Math.floor(this._latlngs.length / 2)], this._openPopup({
latlng: e
})), this;
},
_openPopup: function(e) {
this._popup.setLatLng(e.latlng), this._map.openPopup(this._popup);
}
}), n.Browser.vml = function() {
try {
var e = document.createElement("div");
e.innerHTML = '<v:shape adj="1"/>';
var t = e.firstChild;
return t.style.behavior = "url(#default#VML)", t && typeof t.adj == "object";
} catch (n) {
return !1;
}
}(), n.Path = n.Browser.svg || !n.Browser.vml ? n.Path : n.Path.extend({
statics: {
VML: !0,
CLIP_PADDING: .02
},
_createElement: function() {
try {
return document.namespaces.add("lvml", "urn:schemas-microsoft-com:vml"), function(e) {
return document.createElement("<lvml:" + e + ' class="lvml">');
};
} catch (e) {
return function(e) {
return document.createElement("<" + e + ' xmlns="urn:schemas-microsoft.com:vml" class="lvml">');
};
}
}(),
_initPath: function() {
var e = this._container = this._createElement("shape");
n.DomUtil.addClass(e, "leaflet-vml-shape"), this.options.clickable && n.DomUtil.addClass(e, "leaflet-clickable"), e.coordsize = "1 1", this._path = this._createElement("path"), e.appendChild(this._path), this._map._pathRoot.appendChild(e);
},
_initStyle: function() {
this._updateStyle();
},
_updateStyle: function() {
var e = this._stroke, t = this._fill, n = this.options, r = this._container;
r.stroked = n.stroke, r.filled = n.fill, n.stroke ? (e || (e = this._stroke = this._createElement("stroke"), e.endcap = "round", r.appendChild(e)), e.weight = n.weight + "px", e.color = n.color, e.opacity = n.opacity, n.dashArray ? e.dashStyle = n.dashArray.replace(/ *, */g, " ") : e.dashStyle = "") : e && (r.removeChild(e), this._stroke = null), n.fill ? (t || (t = this._fill = this._createElement("fill"), r.appendChild(t)), t.color = n.fillColor || n.color, t.opacity = n.fillOpacity) : t && (r.removeChild(t), this._fill = null);
},
_updatePath: function() {
var e = this._container.style;
e.display = "none", this._path.v = this.getPathString() + " ", e.display = "";
}
}), n.Map.include(n.Browser.svg || !n.Browser.vml ? {} : {
_initPathRoot: function() {
if (this._pathRoot) return;
var e = this._pathRoot = document.createElement("div");
e.className = "leaflet-vml-container", this._panes.overlayPane.appendChild(e), this.on("moveend", this._updatePathViewport), this._updatePathViewport();
}
}), n.Browser.canvas = function() {
return !!document.createElement("canvas").getContext;
}(), n.Path = n.Path.SVG && !e.L_PREFER_CANVAS || !n.Browser.canvas ? n.Path : n.Path.extend({
statics: {
CANVAS: !0,
SVG: !1
},
redraw: function() {
return this._map && (this.projectLatlngs(), this._requestUpdate()), this;
},
setStyle: function(e) {
return n.Util.setOptions(this, e), this._map && (this._updateStyle(), this._requestUpdate()), this;
},
onRemove: function(e) {
e.off("viewreset", this.projectLatlngs, this).off("moveend", this._updatePath, this), this._requestUpdate(), this._map = null;
},
_requestUpdate: function() {
this._map && (n.Util.cancelAnimFrame(this._fireMapMoveEnd), this._updateRequest = n.Util.requestAnimFrame(this._fireMapMoveEnd, this._map));
},
_fireMapMoveEnd: function() {
this.fire("moveend");
},
_initElements: function() {
this._map._initPathRoot(), this._ctx = this._map._canvasCtx;
},
_updateStyle: function() {
var e = this.options;
e.stroke && (this._ctx.lineWidth = e.weight, this._ctx.strokeStyle = e.color), e.fill && (this._ctx.fillStyle = e.fillColor || e.color);
},
_drawPath: function() {
var e, t, r, i, s, o;
this._ctx.beginPath();
for (e = 0, r = this._parts.length; e < r; e++) {
for (t = 0, i = this._parts[e].length; t < i; t++) s = this._parts[e][t], o = (t === 0 ? "move" : "line") + "To", this._ctx[o](s.x, s.y);
this instanceof n.Polygon && this._ctx.closePath();
}
},
_checkIfEmpty: function() {
return !this._parts.length;
},
_updatePath: function() {
if (this._checkIfEmpty()) return;
var e = this._ctx, t = this.options;
this._drawPath(), e.save(), this._updateStyle(), t.fill && (t.fillOpacity < 1 && (e.globalAlpha = t.fillOpacity), e.fill()), t.stroke && (t.opacity < 1 && (e.globalAlpha = t.opacity), e.stroke()), e.restore();
},
_initEvents: function() {
this.options.clickable && this._map.on("click", this._onClick, this);
},
_onClick: function(e) {
this._containsPoint(e.layerPoint) && this.fire("click", e);
}
}), n.Map.include(n.Path.SVG && !e.L_PREFER_CANVAS || !n.Browser.canvas ? {} : {
_initPathRoot: function() {
var e = this._pathRoot, t;
e || (e = this._pathRoot = document.createElement("canvas"), e.style.position = "absolute", t = this._canvasCtx = e.getContext("2d"), t.lineCap = "round", t.lineJoin = "round", this._panes.overlayPane.appendChild(e), this.options.zoomAnimation && (this._pathRoot.className = "leaflet-zoom-animated", this.on("zoomanim", this._animatePathZoom), this.on("zoomend", this._endPathZoom)), this.on("moveend", this._updateCanvasViewport), this._updateCanvasViewport());
},
_updateCanvasViewport: function() {
if (this._pathZooming) return;
this._updatePathViewport();
var e = this._pathViewport, t = e.min, r = e.max.subtract(t), i = this._pathRoot;
n.DomUtil.setPosition(i, t), i.width = r.x, i.height = r.y, i.getContext("2d").translate(-t.x, -t.y);
}
}), n.LineUtil = {
simplify: function(e, t) {
if (!t || !e.length) return e.slice();
var n = t * t;
return e = this._reducePoints(e, n), e = this._simplifyDP(e, n), e;
},
pointToSegmentDistance: function(e, t, n) {
return Math.sqrt(this._sqClosestPointOnSegment(e, t, n, !0));
},
closestPointOnSegment: function(e, t, n) {
return this._sqClosestPointOnSegment(e, t, n);
},
_simplifyDP: function(e, n) {
var r = e.length, i = typeof Uint8Array != t + "" ? Uint8Array : Array, s = new i(r);
s[0] = s[r - 1] = 1, this._simplifyDPStep(e, s, n, 0, r - 1);
var o, u = [];
for (o = 0; o < r; o++) s[o] && u.push(e[o]);
return u;
},
_simplifyDPStep: function(e, t, n, r, i) {
var s = 0, o, u, a;
for (u = r + 1; u <= i - 1; u++) a = this._sqClosestPointOnSegment(e[u], e[r], e[i], !0), a > s && (o = u, s = a);
s > n && (t[o] = 1, this._simplifyDPStep(e, t, n, r, o), this._simplifyDPStep(e, t, n, o, i));
},
_reducePoints: function(e, t) {
var n = [ e[0] ];
for (var r = 1, i = 0, s = e.length; r < s; r++) this._sqDist(e[r], e[i]) > t && (n.push(e[r]), i = r);
return i < s - 1 && n.push(e[s - 1]), n;
},
clipSegment: function(e, t, n, r) {
var i = n.min, s = n.max, o = r ? this._lastCode : this._getBitCode(e, n), u = this._getBitCode(t, n);
this._lastCode = u;
for (;;) {
if (!(o | u)) return [ e, t ];
if (o & u) return !1;
var a = o || u, f = this._getEdgeIntersection(e, t, a, n), l = this._getBitCode(f, n);
a === o ? (e = f, o = l) : (t = f, u = l);
}
},
_getEdgeIntersection: function(e, t, r, i) {
var s = t.x - e.x, o = t.y - e.y, u = i.min, a = i.max;
if (r & 8) return new n.Point(e.x + s * (a.y - e.y) / o, a.y);
if (r & 4) return new n.Point(e.x + s * (u.y - e.y) / o, u.y);
if (r & 2) return new n.Point(a.x, e.y + o * (a.x - e.x) / s);
if (r & 1) return new n.Point(u.x, e.y + o * (u.x - e.x) / s);
},
_getBitCode: function(e, t) {
var n = 0;
return e.x < t.min.x ? n |= 1 : e.x > t.max.x && (n |= 2), e.y < t.min.y ? n |= 4 : e.y > t.max.y && (n |= 8), n;
},
_sqDist: function(e, t) {
var n = t.x - e.x, r = t.y - e.y;
return n * n + r * r;
},
_sqClosestPointOnSegment: function(e, t, r, i) {
var s = t.x, o = t.y, u = r.x - s, a = r.y - o, f = u * u + a * a, l;
return f > 0 && (l = ((e.x - s) * u + (e.y - o) * a) / f, l > 1 ? (s = r.x, o = r.y) : l > 0 && (s += u * l, o += a * l)), u = e.x - s, a = e.y - o, i ? u * u + a * a : new n.Point(s, o);
}
}, n.Polyline = n.Path.extend({
initialize: function(e, t) {
n.Path.prototype.initialize.call(this, t), this._latlngs = this._convertLatLngs(e), n.Handler.PolyEdit && (this.editing = new n.Handler.PolyEdit(this), this.options.editable && this.editing.enable());
},
options: {
smoothFactor: 1,
noClip: !1
},
projectLatlngs: function() {
this._originalPoints = [];
for (var e = 0, t = this._latlngs.length; e < t; e++) this._originalPoints[e] = this._map.latLngToLayerPoint(this._latlngs[e]);
},
getPathString: function() {
for (var e = 0, t = this._parts.length, n = ""; e < t; e++) n += this._getPathPartStr(this._parts[e]);
return n;
},
getLatLngs: function() {
return this._latlngs;
},
setLatLngs: function(e) {
return this._latlngs = this._convertLatLngs(e), this.redraw();
},
addLatLng: function(e) {
return this._latlngs.push(n.latLng(e)), this.redraw();
},
spliceLatLngs: function(e, t) {
var n = [].splice.apply(this._latlngs, arguments);
return this._convertLatLngs(this._latlngs), this.redraw(), n;
},
closestLayerPoint: function(e) {
var t = Infinity, r = this._parts, i, s, o = null;
for (var u = 0, a = r.length; u < a; u++) {
var f = r[u];
for (var l = 1, c = f.length; l < c; l++) {
i = f[l - 1], s = f[l];
var h = n.LineUtil._sqClosestPointOnSegment(e, i, s, !0);
h < t && (t = h, o = n.LineUtil._sqClosestPointOnSegment(e, i, s));
}
}
return o && (o.distance = Math.sqrt(t)), o;
},
getBounds: function() {
var e = new n.LatLngBounds, t = this.getLatLngs();
for (var r = 0, i = t.length; r < i; r++) e.extend(t[r]);
return e;
},
onAdd: function(e) {
n.Path.prototype.onAdd.call(this, e), this.editing && this.editing.enabled() && this.editing.addHooks();
},
onRemove: function(e) {
this.editing && this.editing.enabled() && this.editing.removeHooks(), n.Path.prototype.onRemove.call(this, e);
},
_convertLatLngs: function(e) {
var t, r;
for (t = 0, r = e.length; t < r; t++) {
if (e[t] instanceof Array && typeof e[t][0] != "number") return;
e[t] = n.latLng(e[t]);
}
return e;
},
_initEvents: function() {
n.Path.prototype._initEvents.call(this);
},
_getPathPartStr: function(e) {
var t = n.Path.VML;
for (var r = 0, i = e.length, s = "", o; r < i; r++) o = e[r], t && o._round(), s += (r ? "L" : "M") + o.x + " " + o.y;
return s;
},
_clipPoints: function() {
var e = this._originalPoints, t = e.length, r, i, s;
if (this.options.noClip) {
this._parts = [ e ];
return;
}
this._parts = [];
var o = this._parts, u = this._map._pathViewport, a = n.LineUtil;
for (r = 0, i = 0; r < t - 1; r++) {
s = a.clipSegment(e[r], e[r + 1], u, r);
if (!s) continue;
o[i] = o[i] || [], o[i].push(s[0]);
if (s[1] !== e[r + 1] || r === t - 2) o[i].push(s[1]), i++;
}
},
_simplifyPoints: function() {
var e = this._parts, t = n.LineUtil;
for (var r = 0, i = e.length; r < i; r++) e[r] = t.simplify(e[r], this.options.smoothFactor);
},
_updatePath: function() {
if (!this._map) return;
this._clipPoints(), this._simplifyPoints(), n.Path.prototype._updatePath.call(this);
}
}), n.polyline = function(e, t) {
return new n.Polyline(e, t);
}, n.PolyUtil = {}, n.PolyUtil.clipPolygon = function(e, t) {
var r = t.min, i = t.max, s, o = [ 1, 4, 2, 8 ], u, a, f, l, c, h, p, d, v = n.LineUtil;
for (u = 0, h = e.length; u < h; u++) e[u]._code = v._getBitCode(e[u], t);
for (f = 0; f < 4; f++) {
p = o[f], s = [];
for (u = 0, h = e.length, a = h - 1; u < h; a = u++) l = e[u], c = e[a], l._code & p ? c._code & p || (d = v._getEdgeIntersection(c, l, p, t), d._code = v._getBitCode(d, t), s.push(d)) : (c._code & p && (d = v._getEdgeIntersection(c, l, p, t), d._code = v._getBitCode(d, t), s.push(d)), s.push(l));
e = s;
}
return e;
}, n.Polygon = n.Polyline.extend({
options: {
fill: !0
},
initialize: function(e, t) {
n.Polyline.prototype.initialize.call(this, e, t), e && e[0] instanceof Array && typeof e[0][0] != "number" && (this._latlngs = this._convertLatLngs(e[0]), this._holes = e.slice(1));
},
projectLatlngs: function() {
n.Polyline.prototype.projectLatlngs.call(this), this._holePoints = [];
if (!this._holes) return;
for (var e = 0, t = this._holes.length, r; e < t; e++) {
this._holePoints[e] = [];
for (var i = 0, s = this._holes[e].length; i < s; i++) this._holePoints[e][i] = this._map.latLngToLayerPoint(this._holes[e][i]);
}
},
_clipPoints: function() {
var e = this._originalPoints, t = [];
this._parts = [ e ].concat(this._holePoints);
if (this.options.noClip) return;
for (var r = 0, i = this._parts.length; r < i; r++) {
var s = n.PolyUtil.clipPolygon(this._parts[r], this._map._pathViewport);
if (!s.length) continue;
t.push(s);
}
this._parts = t;
},
_getPathPartStr: function(e) {
var t = n.Polyline.prototype._getPathPartStr.call(this, e);
return t + (n.Browser.svg ? "z" : "x");
}
}), n.polygon = function(e, t) {
return new n.Polygon(e, t);
}, function() {
function e(e) {
return n.FeatureGroup.extend({
initialize: function(e, t) {
this._layers = {}, this._options = t, this.setLatLngs(e);
},
setLatLngs: function(t) {
var n = 0, r = t.length;
this.eachLayer(function(e) {
n < r ? e.setLatLngs(t[n++]) : this.removeLayer(e);
}, this);
while (n < r) this.addLayer(new e(t[n++], this._options));
return this;
}
});
}
n.MultiPolyline = e(n.Polyline), n.MultiPolygon = e(n.Polygon), n.multiPolyline = function(e, t) {
return new n.MultiPolyline(e, t);
}, n.multiPolygon = function(e, t) {
return new n.MultiPolygon(e, t);
};
}(), n.Rectangle = n.Polygon.extend({
initialize: function(e, t) {
n.Polygon.prototype.initialize.call(this, this._boundsToLatLngs(e), t);
},
setBounds: function(e) {
this.setLatLngs(this._boundsToLatLngs(e));
},
_boundsToLatLngs: function(e) {
return e = n.latLngBounds(e), [ e.getSouthWest(), e.getNorthWest(), e.getNorthEast(), e.getSouthEast(), e.getSouthWest() ];
}
}), n.rectangle = function(e, t) {
return new n.Rectangle(e, t);
}, n.Circle = n.Path.extend({
initialize: function(e, t, r) {
n.Path.prototype.initialize.call(this, r), this._latlng = n.latLng(e), this._mRadius = t;
},
options: {
fill: !0
},
setLatLng: function(e) {
return this._latlng = n.latLng(e), this.redraw();
},
setRadius: function(e) {
return this._mRadius = e, this.redraw();
},
projectLatlngs: function() {
var e = this._getLngRadius(), t = new n.LatLng(this._latlng.lat, this._latlng.lng - e, !0), r = this._map.latLngToLayerPoint(t);
this._point = this._map.latLngToLayerPoint(this._latlng), this._radius = Math.max(Math.round(this._point.x - r.x), 1);
},
getBounds: function() {
var e = this._map, t = this._radius * Math.cos(Math.PI / 4), r = e.project(this._latlng), i = new n.Point(r.x - t, r.y + t), s = new n.Point(r.x + t, r.y - t), o = e.unproject(i), u = e.unproject(s);
return new n.LatLngBounds(o, u);
},
getLatLng: function() {
return this._latlng;
},
getPathString: function() {
var e = this._point, t = this._radius;
return this._checkIfEmpty() ? "" : n.Browser.svg ? "M" + e.x + "," + (e.y - t) + "A" + t + "," + t + ",0,1,1," + (e.x - .1) + "," + (e.y - t) + " z" : (e._round(), t = Math.round(t), "AL " + e.x + "," + e.y + " " + t + "," + t + " 0," + 23592600);
},
getRadius: function() {
return this._mRadius;
},
_getLngRadius: function() {
var e = 40075017, t = e * Math.cos(n.LatLng.DEG_TO_RAD * this._latlng.lat);
return this._mRadius / t * 360;
},
_checkIfEmpty: function() {
if (!this._map) return !1;
var e = this._map._pathViewport, t = this._radius, n = this._point;
return n.x - t > e.max.x || n.y - t > e.max.y || n.x + t < e.min.x || n.y + t < e.min.y;
}
}), n.circle = function(e, t, r) {
return new n.Circle(e, t, r);
}, n.CircleMarker = n.Circle.extend({
options: {
radius: 10,
weight: 2
},
initialize: function(e, t) {
n.Circle.prototype.initialize.call(this, e, null, t), this._radius = this.options.radius;
},
projectLatlngs: function() {
this._point = this._map.latLngToLayerPoint(this._latlng);
},
setRadius: function(e) {
return this._radius = e, this.redraw();
}
}), n.circleMarker = function(e, t) {
return new n.CircleMarker(e, t);
}, n.Polyline.include(n.Path.CANVAS ? {
_containsPoint: function(e, t) {
var r, i, s, o, u, a, f, l = this.options.weight / 2;
n.Browser.touch && (l += 10);
for (r = 0, o = this._parts.length; r < o; r++) {
f = this._parts[r];
for (i = 0, u = f.length, s = u - 1; i < u; s = i++) {
if (!t && i === 0) continue;
a = n.LineUtil.pointToSegmentDistance(e, f[s], f[i]);
if (a <= l) return !0;
}
}
return !1;
}
} : {}), n.Polygon.include(n.Path.CANVAS ? {
_containsPoint: function(e) {
var t = !1, r, i, s, o, u, a, f, l;
if (n.Polyline.prototype._containsPoint.call(this, e, !0)) return !0;
for (o = 0, f = this._parts.length; o < f; o++) {
r = this._parts[o];
for (u = 0, l = r.length, a = l - 1; u < l; a = u++) i = r[u], s = r[a], i.y > e.y != s.y > e.y && e.x < (s.x - i.x) * (e.y - i.y) / (s.y - i.y) + i.x && (t = !t);
}
return t;
}
} : {}), n.Circle.include(n.Path.CANVAS ? {
_drawPath: function() {
var e = this._point;
this._ctx.beginPath(), this._ctx.arc(e.x, e.y, this._radius, 0, Math.PI * 2, !1);
},
_containsPoint: function(e) {
var t = this._point, n = this.options.stroke ? this.options.weight / 2 : 0;
return e.distanceTo(t) <= this._radius + n;
}
} : {}), n.GeoJSON = n.FeatureGroup.extend({
initialize: function(e, t) {
n.Util.setOptions(this, t), this._layers = {}, e && this.addData(e);
},
addData: function(e) {
var t = e instanceof Array ? e : e.features, r, i;
if (t) {
for (r = 0, i = t.length; r < i; r++) this.addData(t[r]);
return this;
}
var s = this.options;
if (s.filter && !s.filter(e)) return;
var o = n.GeoJSON.geometryToLayer(e, s.pointToLayer);
return o.feature = e, this.resetStyle(o), s.onEachFeature && s.onEachFeature(e, o), this.addLayer(o);
},
resetStyle: function(e) {
var t = this.options.style;
t && this._setLayerStyle(e, t);
},
setStyle: function(e) {
this.eachLayer(function(t) {
this._setLayerStyle(t, e);
}, this);
},
_setLayerStyle: function(e, t) {
typeof t == "function" && (t = t(e.feature)), e.setStyle && e.setStyle(t);
}
}), n.Util.extend(n.GeoJSON, {
geometryToLayer: function(e, t) {
var r = e.type === "Feature" ? e.geometry : e, i = r.coordinates, s = [], o, u, a, f, l;
switch (r.type) {
case "Point":
return o = this.coordsToLatLng(i), t ? t(e, o) : new n.Marker(o);
case "MultiPoint":
for (a = 0, f = i.length; a < f; a++) o = this.coordsToLatLng(i[a]), l = t ? t(e, o) : new n.Marker(o), s.push(l);
return new n.FeatureGroup(s);
case "LineString":
return u = this.coordsToLatLngs(i), new n.Polyline(u);
case "Polygon":
return u = this.coordsToLatLngs(i, 1), new n.Polygon(u);
case "MultiLineString":
return u = this.coordsToLatLngs(i, 1), new n.MultiPolyline(u);
case "MultiPolygon":
return u = this.coordsToLatLngs(i, 2), new n.MultiPolygon(u);
case "GeometryCollection":
for (a = 0, f = r.geometries.length; a < f; a++) l = this.geometryToLayer(r.geometries[a], t), s.push(l);
return new n.FeatureGroup(s);
default:
throw Error("Invalid GeoJSON object.");
}
},
coordsToLatLng: function(e, t) {
var r = parseFloat(e[t ? 0 : 1]), i = parseFloat(e[t ? 1 : 0]);
return new n.LatLng(r, i, !0);
},
coordsToLatLngs: function(e, t, n) {
var r, i = [], s, o;
for (s = 0, o = e.length; s < o; s++) r = t ? this.coordsToLatLngs(e[s], t - 1, n) : this.coordsToLatLng(e[s], n), i.push(r);
return i;
}
}), n.geoJson = function(e, t) {
return new n.GeoJSON(e, t);
}, n.DomEvent = {
addListener: function(e, t, r, i) {
var s = n.Util.stamp(r), o = "_leaflet_" + t + s, u, a, f;
return e[o] ? this : (u = function(t) {
return r.call(i || e, t || n.DomEvent._getEvent());
}, n.Browser.touch && t === "dblclick" && this.addDoubleTapListener ? this.addDoubleTapListener(e, u, s) : ("addEventListener" in e ? t === "mousewheel" ? (e.addEventListener("DOMMouseScroll", u, !1), e.addEventListener(t, u, !1)) : t === "mouseenter" || t === "mouseleave" ? (a = u, f = t === "mouseenter" ? "mouseover" : "mouseout", u = function(t) {
if (!n.DomEvent._checkMouse(e, t)) return;
return a(t);
}, e.addEventListener(f, u, !1)) : e.addEventListener(t, u, !1) : "attachEvent" in e && e.attachEvent("on" + t, u), e[o] = u, this));
},
removeListener: function(e, t, r) {
var i = n.Util.stamp(r), s = "_leaflet_" + t + i, o = e[s];
if (!o) return;
return n.Browser.touch && t === "dblclick" && this.removeDoubleTapListener ? this.removeDoubleTapListener(e, i) : "removeEventListener" in e ? t === "mousewheel" ? (e.removeEventListener("DOMMouseScroll", o, !1), e.removeEventListener(t, o, !1)) : t === "mouseenter" || t === "mouseleave" ? e.removeEventListener(t === "mouseenter" ? "mouseover" : "mouseout", o, !1) : e.removeEventListener(t, o, !1) : "detachEvent" in e && e.detachEvent("on" + t, o), e[s] = null, this;
},
stopPropagation: function(e) {
return e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0, this;
},
disableClickPropagation: function(e) {
var t = n.DomEvent.stopPropagation;
return n.DomEvent.addListener(e, n.Draggable.START, t).addListener(e, "click", t).addListener(e, "dblclick", t);
},
preventDefault: function(e) {
return e.preventDefault ? e.preventDefault() : e.returnValue = !1, this;
},
stop: function(e) {
return n.DomEvent.preventDefault(e).stopPropagation(e);
},
getMousePosition: function(e, t) {
var r = document.body, i = document.documentElement, s = e.pageX ? e.pageX : e.clientX + r.scrollLeft + i.scrollLeft, o = e.pageY ? e.pageY : e.clientY + r.scrollTop + i.scrollTop, u = new n.Point(s, o);
return t ? u._subtract(n.DomUtil.getViewportOffset(t)) : u;
},
getWheelDelta: function(e) {
var t = 0;
return e.wheelDelta && (t = e.wheelDelta / 120), e.detail && (t = -e.detail / 3), t;
},
_checkMouse: function(e, t) {
var n = t.relatedTarget;
if (!n) return !0;
try {
while (n && n !== e) n = n.parentNode;
} catch (r) {
return !1;
}
return n !== e;
},
_getEvent: function() {
var t = e.event;
if (!t) {
var n = arguments.callee.caller;
while (n) {
t = n.arguments[0];
if (t && e.Event === t.constructor) break;
n = n.caller;
}
}
return t;
}
}, n.DomEvent.on = n.DomEvent.addListener, n.DomEvent.off = n.DomEvent.removeListener, n.Draggable = n.Class.extend({
includes: n.Mixin.Events,
statics: {
START: n.Browser.touch ? "touchstart" : "mousedown",
END: n.Browser.touch ? "touchend" : "mouseup",
MOVE: n.Browser.touch ? "touchmove" : "mousemove",
TAP_TOLERANCE: 15
},
initialize: function(e, t) {
this._element = e, this._dragStartTarget = t || e;
},
enable: function() {
if (this._enabled) return;
n.DomEvent.on(this._dragStartTarget, n.Draggable.START, this._onDown, this), this._enabled = !0;
},
disable: function() {
if (!this._enabled) return;
n.DomEvent.off(this._dragStartTarget, n.Draggable.START, this._onDown), this._enabled = !1, this._moved = !1;
},
_onDown: function(e) {
if (!n.Browser.touch && e.shiftKey || e.which !== 1 && e.button !== 1 && !e.touches) return;
this._simulateClick = !0;
if (e.touches && e.touches.length > 1) {
this._simulateClick = !1;
return;
}
var t = e.touches && e.touches.length === 1 ? e.touches[0] : e, r = t.target;
n.DomEvent.preventDefault(e), n.Browser.touch && r.tagName.toLowerCase() === "a" && n.DomUtil.addClass(r, "leaflet-active"), this._moved = !1;
if (this._moving) return;
this._startPos = this._newPos = n.DomUtil.getPosition(this._element), this._startPoint = new n.Point(t.clientX, t.clientY), n.DomEvent.on(document, n.Draggable.MOVE, this._onMove, this), n.DomEvent.on(document, n.Draggable.END, this._onUp, this);
},
_onMove: function(e) {
if (e.touches && e.touches.length > 1) return;
var t = e.touches && e.touches.length === 1 ? e.touches[0] : e, r = new n.Point(t.clientX, t.clientY), i = r.subtract(this._startPoint);
if (!i.x && !i.y) return;
n.DomEvent.preventDefault(e), this._moved || (this.fire("dragstart"), this._moved = !0, n.Browser.touch || (n.DomUtil.disableTextSelection(), this._setMovingCursor())), this._newPos = this._startPos.add(i), this._moving = !0, n.Util.cancelAnimFrame(this._animRequest), this._animRequest = n.Util.requestAnimFrame(this._updatePosition, this, !0, this._dragStartTarget);
},
_updatePosition: function() {
this.fire("predrag"), n.DomUtil.setPosition(this._element, this._newPos), this.fire("drag");
},
_onUp: function(e) {
if (this._simulateClick && e.changedTouches) {
var t = e.changedTouches[0], r = t.target, i = this._newPos && this._newPos.distanceTo(this._startPos) || 0;
r.tagName.toLowerCase() === "a" && n.DomUtil.removeClass(r, "leaflet-active"), i < n.Draggable.TAP_TOLERANCE && this._simulateEvent("click", t);
}
n.Browser.touch || (n.DomUtil.enableTextSelection(), this._restoreCursor()), n.DomEvent.off(document, n.Draggable.MOVE, this._onMove), n.DomEvent.off(document, n.Draggable.END, this._onUp), this._moved && (n.Util.cancelAnimFrame(this._animRequest), this.fire("dragend")), this._moving = !1;
},
_setMovingCursor: function() {
n.DomUtil.addClass(document.body, "leaflet-dragging");
},
_restoreCursor: function() {
n.DomUtil.removeClass(document.body, "leaflet-dragging");
},
_simulateEvent: function(t, n) {
var r = document.createEvent("MouseEvents");
r.initMouseEvent(t, !0, !0, e, 1, n.screenX, n.screenY, n.clientX, n.clientY, !1, !1, !1, !1, 0, null), n.target.dispatchEvent(r);
}
}), n.Handler = n.Class.extend({
initialize: function(e) {
this._map = e;
},
enable: function() {
if (this._enabled) return;
this._enabled = !0, this.addHooks();
},
disable: function() {
if (!this._enabled) return;
this._enabled = !1, this.removeHooks();
},
enabled: function() {
return !!this._enabled;
}
}), n.Map.mergeOptions({
dragging: !0,
inertia: !n.Browser.android23,
inertiaDeceleration: 3e3,
inertiaMaxSpeed: 1500,
inertiaThreshold: n.Browser.touch ? 32 : 14,
worldCopyJump: !0
}), n.Map.Drag = n.Handler.extend({
addHooks: function() {
if (!this._draggable) {
this._draggable = new n.Draggable(this._map._mapPane, this._map._container), this._draggable.on({
dragstart: this._onDragStart,
drag: this._onDrag,
dragend: this._onDragEnd
}, this);
var e = this._map.options;
e.worldCopyJump && (this._draggable.on("predrag", this._onPreDrag, this), this._map.on("viewreset", this._onViewReset, this));
}
this._draggable.enable();
},
removeHooks: function() {
this._draggable.disable();
},
moved: function() {
return this._draggable && this._draggable._moved;
},
_onDragStart: function() {
var e = this._map;
e.fire("movestart").fire("dragstart"), e._panTransition && e._panTransition._onTransitionEnd(!0), e.options.inertia && (this._positions = [], this._times = []);
},
_onDrag: function() {
if (this._map.options.inertia) {
var e = this._lastTime = +(new Date), t = this._lastPos = this._draggable._newPos;
this._positions.push(t), this._times.push(e), e - this._times[0] > 200 && (this._positions.shift(), this._times.shift());
}
this._map.fire("move").fire("drag");
},
_onViewReset: function() {
var e = this._map.getSize().divideBy(2), t = this._map.latLngToLayerPoint(new n.LatLng(0, 0));
this._initialWorldOffset = t.subtract(e).x, this._worldWidth = this._map.project(new n.LatLng(0, 180)).x;
},
_onPreDrag: function() {
var e = this._map, t = this._worldWidth, n = Math.round(t / 2), r = this._initialWorldOffset, i = this._draggable._newPos.x, s = (i - n + r) % t + n - r, o = (i + n + r) % t - n - r, u = Math.abs(s + r) < Math.abs(o + r) ? s : o;
this._draggable._newPos.x = u;
},
_onDragEnd: function() {
var e = this._map, r = e.options, i = +(new Date) - this._lastTime, s = !r.inertia || i > r.inertiaThreshold || this._positions[0] === t;
if (s) e.fire("moveend"); else {
var o = this._lastPos.subtract(this._positions[0]), u = (this._lastTime + i - this._times[0]) / 1e3, a = o.multiplyBy(.58 / u), f = a.distanceTo(new n.Point(0, 0)), l = Math.min(r.inertiaMaxSpeed, f), c = a.multiplyBy(l / f), h = l / r.inertiaDeceleration, p = c.multiplyBy(-h / 2).round(), d = {
duration: h,
easing: "ease-out"
};
n.Util.requestAnimFrame(n.Util.bind(function() {
this._map.panBy(p, d);
}, this));
}
e.fire("dragend"), r.maxBounds && n.Util.requestAnimFrame(this._panInsideMaxBounds, e, !0, e._container);
},
_panInsideMaxBounds: function() {
this.panInsideBounds(this.options.maxBounds);
}
}), n.Map.addInitHook("addHandler", "dragging", n.Map.Drag), n.Map.mergeOptions({
doubleClickZoom: !0
}), n.Map.DoubleClickZoom = n.Handler.extend({
addHooks: function() {
this._map.on("dblclick", this._onDoubleClick);
},
removeHooks: function() {
this._map.off("dblclick", this._onDoubleClick);
},
_onDoubleClick: function(e) {
this.setView(e.latlng, this._zoom + 1);
}
}), n.Map.addInitHook("addHandler", "doubleClickZoom", n.Map.DoubleClickZoom), n.Map.mergeOptions({
scrollWheelZoom: !n.Browser.touch
}), n.Map.ScrollWheelZoom = n.Handler.extend({
addHooks: function() {
n.DomEvent.on(this._map._container, "mousewheel", this._onWheelScroll, this), this._delta = 0;
},
removeHooks: function() {
n.DomEvent.off(this._map._container, "mousewheel", this._onWheelScroll);
},
_onWheelScroll: function(e) {
var t = n.DomEvent.getWheelDelta(e);
this._delta += t, this._lastMousePos = this._map.mouseEventToContainerPoint(e), clearTimeout(this._timer), this._timer = setTimeout(n.Util.bind(this._performZoom, this), 40), n.DomEvent.preventDefault(e);
},
_performZoom: function() {
var e = this._map, t = Math.round(this._delta), n = e.getZoom();
t = Math.max(Math.min(t, 4), -4), t = e._limitZoom(n + t) - n, this._delta = 0;
if (!t) return;
var r = n + t, i = this._getCenterForScrollWheelZoom(this._lastMousePos, r);
e.setView(i, r);
},
_getCenterForScrollWheelZoom: function(e, t) {
var n = this._map, r = n.getZoomScale(t), i = n.getSize().divideBy(2), s = e.subtract(i).multiplyBy(1 - 1 / r), o = n._getTopLeftPoint().add(i).add(s);
return n.unproject(o);
}
}), n.Map.addInitHook("addHandler", "scrollWheelZoom", n.Map.ScrollWheelZoom), n.Util.extend(n.DomEvent, {
addDoubleTapListener: function(e, t, n) {
function r(e) {
if (e.touches.length !== 1) return;
var t = Date.now(), n = t - (s || t);
a = e.touches[0], o = n > 0 && n <= u, s = t;
}
function i(e) {
o && (a.type = "dblclick", t(a), s = null);
}
var s, o = !1, u = 250, a, f = "_leaflet_", l = "touchstart", c = "touchend";
return e[f + l + n] = r, e[f + c + n] = i, e.addEventListener(l, r, !1), e.addEventListener(c, i, !1), this;
},
removeDoubleTapListener: function(e, t) {
var n = "_leaflet_";
return e.removeEventListener(e, e[n + "touchstart" + t], !1), e.removeEventListener(e, e[n + "touchend" + t], !1), this;
}
}), n.Map.mergeOptions({
touchZoom: n.Browser.touch && !n.Browser.android23
}), n.Map.TouchZoom = n.Handler.extend({
addHooks: function() {
n.DomEvent.on(this._map._container, "touchstart", this._onTouchStart, this);
},
removeHooks: function() {
n.DomEvent.off(this._map._container, "touchstart", this._onTouchStart, this);
},
_onTouchStart: function(e) {
var t = this._map;
if (!e.touches || e.touches.length !== 2 || t._animatingZoom || this._zooming) return;
var r = t.mouseEventToLayerPoint(e.touches[0]), i = t.mouseEventToLayerPoint(e.touches[1]), s = t._getCenterLayerPoint();
this._startCenter = r.add(i).divideBy(2, !0), this._startDist = r.distanceTo(i), this._moved = !1, this._zooming = !0, this._centerOffset = s.subtract(this._startCenter), n.DomEvent.on(document, "touchmove", this._onTouchMove, this).on(document, "touchend", this._onTouchEnd, this), n.DomEvent.preventDefault(e);
},
_onTouchMove: function(e) {
if (!e.touches || e.touches.length !== 2) return;
var t = this._map, r = t.mouseEventToLayerPoint(e.touches[0]), i = t.mouseEventToLayerPoint(e.touches[1]);
this._scale = r.distanceTo(i) / this._startDist, this._delta = r.add(i).divideBy(2, !0).subtract(this._startCenter);
if (this._scale === 1) return;
this._moved || (n.DomUtil.addClass(t._mapPane, "leaflet-zoom-anim leaflet-touching"), t.fire("movestart").fire("zoomstart")._prepareTileBg(), this._moved = !0), n.Util.cancelAnimFrame(this._animRequest), this._animRequest = n.Util.requestAnimFrame(this._updateOnMove, this, !0, this._map._container), n.DomEvent.preventDefault(e);
},
_updateOnMove: function() {
var e = this._map, t = this._getScaleOrigin(), r = e.layerPointToLatLng(t);
e.fire("zoomanim", {
center: r,
zoom: e.getScaleZoom(this._scale)
}), e._tileBg.style[n.DomUtil.TRANSFORM] = n.DomUtil.getTranslateString(this._delta) + " " + n.DomUtil.getScaleString(this._scale, this._startCenter);
},
_onTouchEnd: function(e) {
if (!this._moved || !this._zooming) return;
var t = this._map;
this._zooming = !1, n.DomUtil.removeClass(t._mapPane, "leaflet-touching"), n.DomEvent.off(document, "touchmove", this._onTouchMove).off(document, "touchend", this._onTouchEnd);
var r = this._getScaleOrigin(), i = t.layerPointToLatLng(r), s = t.getZoom(), o = t.getScaleZoom(this._scale) - s, u = o > 0 ? Math.ceil(o) : Math.floor(o), a = t._limitZoom(s + u);
t.fire("zoomanim", {
center: i,
zoom: a
}), t._runAnimation(i, a, t.getZoomScale(a) / this._scale, r, !0);
},
_getScaleOrigin: function() {
var e = this._centerOffset.subtract(this._delta).divideBy(this._scale);
return this._startCenter.add(e);
}
}), n.Map.addInitHook("addHandler", "touchZoom", n.Map.TouchZoom), n.Map.mergeOptions({
boxZoom: !0
}), n.Map.BoxZoom = n.Handler.extend({
initialize: function(e) {
this._map = e, this._container = e._container, this._pane = e._panes.overlayPane;
},
addHooks: function() {
n.DomEvent.on(this._container, "mousedown", this._onMouseDown, this);
},
removeHooks: function() {
n.DomEvent.off(this._container, "mousedown", this._onMouseDown);
},
_onMouseDown: function(e) {
if (!e.shiftKey || e.which !== 1 && e.button !== 1) return !1;
n.DomUtil.disableTextSelection(), this._startLayerPoint = this._map.mouseEventToLayerPoint(e), this._box = n.DomUtil.create("div", "leaflet-zoom-box", this._pane), n.DomUtil.setPosition(this._box, this._startLayerPoint), this._container.style.cursor = "crosshair", n.DomEvent.on(document, "mousemove", this._onMouseMove, this).on(document, "mouseup", this._onMouseUp, this).preventDefault(e), this._map.fire("boxzoomstart");
},
_onMouseMove: function(e) {
var t = this._startLayerPoint, r = this._box, i = this._map.mouseEventToLayerPoint(e), s = i.subtract(t), o = new n.Point(Math.min(i.x, t.x), Math.min(i.y, t.y));
n.DomUtil.setPosition(r, o), r.style.width = Math.abs(s.x) - 4 + "px", r.style.height = Math.abs(s.y) - 4 + "px";
},
_onMouseUp: function(e) {
this._pane.removeChild(this._box), this._container.style.cursor = "", n.DomUtil.enableTextSelection(), n.DomEvent.off(document, "mousemove", this._onMouseMove).off(document, "mouseup", this._onMouseUp);
var t = this._map, r = t.mouseEventToLayerPoint(e), i = new n.LatLngBounds(t.layerPointToLatLng(this._startLayerPoint), t.layerPointToLatLng(r));
t.fitBounds(i), t.fire("boxzoomend", {
boxZoomBounds: i
});
}
}), n.Map.addInitHook("addHandler", "boxZoom", n.Map.BoxZoom), n.Map.mergeOptions({
keyboard: !0,
keyboardPanOffset: 80,
keyboardZoomOffset: 1
}), n.Map.Keyboard = n.Handler.extend({
keyCodes: {
left: [ 37 ],
right: [ 39 ],
down: [ 40 ],
up: [ 38 ],
zoomIn: [ 187, 107, 61 ],
zoomOut: [ 189, 109 ]
},
initialize: function(e) {
this._map = e, this._setPanOffset(e.options.keyboardPanOffset), this._setZoomOffset(e.options.keyboardZoomOffset);
},
addHooks: function() {
var e = this._map._container;
e.tabIndex === -1 && (e.tabIndex = "0"), n.DomEvent.addListener(e, "focus", this._onFocus, this).addListener(e, "blur", this._onBlur, this).addListener(e, "mousedown", this._onMouseDown, this), this._map.on("focus", this._addHooks, this).on("blur", this._removeHooks, this);
},
removeHooks: function() {
this._removeHooks();
var e = this._map._container;
n.DomEvent.removeListener(e, "focus", this._onFocus, this).removeListener(e, "blur", this._onBlur, this).removeListener(e, "mousedown", this._onMouseDown, this), this._map.off("focus", this._addHooks, this).off("blur", this._removeHooks, this);
},
_onMouseDown: function() {
this._focused || this._map._container.focus();
},
_onFocus: function() {
this._focused = !0, this._map.fire("focus");
},
_onBlur: function() {
this._focused = !1, this._map.fire("blur");
},
_setPanOffset: function(e) {
var t = this._panKeys = {}, n = this.keyCodes, r, i;
for (r = 0, i = n.left.length; r < i; r++) t[n.left[r]] = [ -1 * e, 0 ];
for (r = 0, i = n.right.length; r < i; r++) t[n.right[r]] = [ e, 0 ];
for (r = 0, i = n.down.length; r < i; r++) t[n.down[r]] = [ 0, e ];
for (r = 0, i = n.up.length; r < i; r++) t[n.up[r]] = [ 0, -1 * e ];
},
_setZoomOffset: function(e) {
var t = this._zoomKeys = {}, n = this.keyCodes, r, i;
for (r = 0, i = n.zoomIn.length; r < i; r++) t[n.zoomIn[r]] = e;
for (r = 0, i = n.zoomOut.length; r < i; r++) t[n.zoomOut[r]] = -e;
},
_addHooks: function() {
n.DomEvent.addListener(document, "keydown", this._onKeyDown, this);
},
_removeHooks: function() {
n.DomEvent.removeListener(document, "keydown", this._onKeyDown, this);
},
_onKeyDown: function(e) {
var t = e.keyCode;
if (this._panKeys.hasOwnProperty(t)) this._map.panBy(this._panKeys[t]); else {
if (!this._zoomKeys.hasOwnProperty(t)) return;
this._map.setZoom(this._map.getZoom() + this._zoomKeys[t]);
}
n.DomEvent.stop(e);
}
}), n.Map.addInitHook("addHandler", "keyboard", n.Map.Keyboard), n.Handler.MarkerDrag = n.Handler.extend({
initialize: function(e) {
this._marker = e;
},
addHooks: function() {
var e = this._marker._icon;
this._draggable || (this._draggable = (new n.Draggable(e, e)).on("dragstart", this._onDragStart, this).on("drag", this._onDrag, this).on("dragend", this._onDragEnd, this)), this._draggable.enable();
},
removeHooks: function() {
this._draggable.disable();
},
moved: function() {
return this._draggable && this._draggable._moved;
},
_onDragStart: function(e) {
this._marker.closePopup().fire("movestart").fire("dragstart");
},
_onDrag: function(e) {
var t = n.DomUtil.getPosition(this._marker._icon);
this._marker._shadow && n.DomUtil.setPosition(this._marker._shadow, t), this._marker._latlng = this._marker._map.layerPointToLatLng(t), this._marker.fire("move").fire("drag");
},
_onDragEnd: function() {
this._marker.fire("moveend").fire("dragend");
}
}), n.Handler.PolyEdit = n.Handler.extend({
options: {
icon: new n.DivIcon({
iconSize: new n.Point(8, 8),
className: "leaflet-div-icon leaflet-editing-icon"
})
},
initialize: function(e, t) {
this._poly = e, n.Util.setOptions(this, t);
},
addHooks: function() {
this._poly._map && (this._markerGroup || this._initMarkers(), this._poly._map.addLayer(this._markerGroup));
},
removeHooks: function() {
this._poly._map && (this._poly._map.removeLayer(this._markerGroup), delete this._markerGroup, delete this._markers);
},
updateMarkers: function() {
this._markerGroup.clearLayers(), this._initMarkers();
},
_initMarkers: function() {
this._markerGroup || (this._markerGroup = new n.LayerGroup), this._markers = [];
var e = this._poly._latlngs, t, r, i, s;
for (t = 0, i = e.length; t < i; t++) s = this._createMarker(e[t], t), s.on("click", this._onMarkerClick, this), this._markers.push(s);
var o, u;
for (t = 0, r = i - 1; t < i; r = t++) {
if (t === 0 && !(n.Polygon && this._poly instanceof n.Polygon)) continue;
o = this._markers[r], u = this._markers[t], this._createMiddleMarker(o, u), this._updatePrevNext(o, u);
}
},
_createMarker: function(e, t) {
var r = new n.Marker(e, {
draggable: !0,
icon: this.options.icon
});
return r._origLatLng = e, r._index = t, r.on("drag", this._onMarkerDrag, this), r.on("dragend", this._fireEdit, this), this._markerGroup.addLayer(r), r;
},
_fireEdit: function() {
this._poly.fire("edit");
},
_onMarkerDrag: function(e) {
var t = e.target;
n.Util.extend(t._origLatLng, t._latlng), t._middleLeft && t._middleLeft.setLatLng(this._getMiddleLatLng(t._prev, t)), t._middleRight && t._middleRight.setLatLng(this._getMiddleLatLng(t, t._next)), this._poly.redraw();
},
_onMarkerClick: function(e) {
if (this._poly._latlngs.length < 3) return;
var t = e.target, n = t._index;
t._prev && t._next && (this._createMiddleMarker(t._prev, t._next), this._updatePrevNext(t._prev, t._next)), this._markerGroup.removeLayer(t), t._middleLeft && this._markerGroup.removeLayer(t._middleLeft), t._middleRight && this._markerGroup.removeLayer(t._middleRight), this._markers.splice(n, 1), this._poly.spliceLatLngs(n, 1), this._updateIndexes(n, -1), this._poly.fire("edit");
},
_updateIndexes: function(e, t) {
this._markerGroup.eachLayer(function(n) {
n._index > e && (n._index += t);
});
},
_createMiddleMarker: function(e, t) {
var n = this._getMiddleLatLng(e, t), r = this._createMarker(n), i, s, o;
r.setOpacity(.6), e._middleRight = t._middleLeft = r, s = function() {
var s = t._index;
r._index = s, r.off("click", i).on("click", this._onMarkerClick, this), n.lat = r.getLatLng().lat, n.lng = r.getLatLng().lng, this._poly.spliceLatLngs(s, 0, n), this._markers.splice(s, 0, r), r.setOpacity(1), this._updateIndexes(s, 1), t._index++, this._updatePrevNext(e, r), this._updatePrevNext(r, t);
}, o = function() {
r.off("dragstart", s, this), r.off("dragend", o, this), this._createMiddleMarker(e, r), this._createMiddleMarker(r, t);
}, i = function() {
s.call(this), o.call(this), this._poly.fire("edit");
}, r.on("click", i, this).on("dragstart", s, this).on("dragend", o, this), this._markerGroup.addLayer(r);
},
_updatePrevNext: function(e, t) {
e._next = t, t._prev = e;
},
_getMiddleLatLng: function(e, t) {
var n = this._poly._map, r = n.latLngToLayerPoint(e.getLatLng()), i = n.latLngToLayerPoint(t.getLatLng());
return n.layerPointToLatLng(r._add(i).divideBy(2));
}
}), n.Control = n.Class.extend({
options: {
position: "topright"
},
initialize: function(e) {
n.Util.setOptions(this, e);
},
getPosition: function() {
return this.options.position;
},
setPosition: function(e) {
var t = this._map;
return t && t.removeControl(this), this.options.position = e, t && t.addControl(this), this;
},
addTo: function(e) {
this._map = e;
var t = this._container = this.onAdd(e), r = this.getPosition(), i = e._controlCorners[r];
return n.DomUtil.addClass(t, "leaflet-control"), r.indexOf("bottom") !== -1 ? i.insertBefore(t, i.firstChild) : i.appendChild(t), this;
},
removeFrom: function(e) {
var t = this.getPosition(), n = e._controlCorners[t];
return n.removeChild(this._container), this._map = null, this.onRemove && this.onRemove(e), this;
}
}), n.control = function(e) {
return new n.Control(e);
}, n.Map.include({
addControl: function(e) {
return e.addTo(this), this;
},
removeControl: function(e) {
return e.removeFrom(this), this;
},
_initControlPos: function() {
function e(e, s) {
var o = r + e + " " + r + s;
t[e + s] = n.DomUtil.create("div", o, i);
}
var t = this._controlCorners = {}, r = "leaflet-", i = this._controlContainer = n.DomUtil.create("div", r + "control-container", this._container);
e("top", "left"), e("top", "right"), e("bottom", "left"), e("bottom", "right");
}
}), n.Control.Zoom = n.Control.extend({
options: {
position: "topleft"
},
onAdd: function(e) {
var t = "leaflet-control-zoom", r = n.DomUtil.create("div", t);
return this._createButton("Zoom in", t + "-in", r, e.zoomIn, e), this._createButton("Zoom out", t + "-out", r, e.zoomOut, e), r;
},
_createButton: function(e, t, r, i, s) {
var o = n.DomUtil.create("a", t, r);
return o.href = "#", o.title = e, n.DomEvent.on(o, "click", n.DomEvent.stopPropagation).on(o, "click", n.DomEvent.preventDefault).on(o, "click", i, s).on(o, "dblclick", n.DomEvent.stopPropagation), o;
}
}), n.Map.mergeOptions({
zoomControl: !0
}), n.Map.addInitHook(function() {
this.options.zoomControl && (this.zoomControl = new n.Control.Zoom, this.addControl(this.zoomControl));
}), n.control.zoom = function(e) {
return new n.Control.Zoom(e);
}, n.Control.Attribution = n.Control.extend({
options: {
position: "bottomright",
prefix: 'Powered by <a href="http://leaflet.cloudmade.com">Leaflet</a>'
},
initialize: function(e) {
n.Util.setOptions(this, e), this._attributions = {};
},
onAdd: function(e) {
return this._container = n.DomUtil.create("div", "leaflet-control-attribution"), n.DomEvent.disableClickPropagation(this._container), e.on("layeradd", this._onLayerAdd, this).on("layerremove", this._onLayerRemove, this), this._update(), this._container;
},
onRemove: function(e) {
e.off("layeradd", this._onLayerAdd).off("layerremove", this._onLayerRemove);
},
setPrefix: function(e) {
return this.options.prefix = e, this._update(), this;
},
addAttribution: function(e) {
if (!e) return;
return this._attributions[e] || (this._attributions[e] = 0), this._attributions[e]++, this._update(), this;
},
removeAttribution: function(e) {
if (!e) return;
return this._attributions[e]--, this._update(), this;
},
_update: function() {
if (!this._map) return;
var e = [];
for (var t in this._attributions) this._attributions.hasOwnProperty(t) && this._attributions[t] && e.push(t);
var n = [];
this.options.prefix && n.push(this.options.prefix), e.length && n.push(e.join(", ")), this._container.innerHTML = n.join(" &#8212; ");
},
_onLayerAdd: function(e) {
e.layer.getAttribution && this.addAttribution(e.layer.getAttribution());
},
_onLayerRemove: function(e) {
e.layer.getAttribution && this.removeAttribution(e.layer.getAttribution());
}
}), n.Map.mergeOptions({
attributionControl: !0
}), n.Map.addInitHook(function() {
this.options.attributionControl && (this.attributionControl = (new n.Control.Attribution).addTo(this));
}), n.control.attribution = function(e) {
return new n.Control.Attribution(e);
}, n.Control.Scale = n.Control.extend({
options: {
position: "bottomleft",
maxWidth: 100,
metric: !0,
imperial: !0,
updateWhenIdle: !1
},
onAdd: function(e) {
this._map = e;
var t = "leaflet-control-scale", r = n.DomUtil.create("div", t), i = this.options;
return this._addScales(i, t, r), e.on(i.updateWhenIdle ? "moveend" : "move", this._update, this), this._update(), r;
},
onRemove: function(e) {
e.off(this.options.updateWhenIdle ? "moveend" : "move", this._update, this);
},
_addScales: function(e, t, r) {
e.metric && (this._mScale = n.DomUtil.create("div", t + "-line", r)), e.imperial && (this._iScale = n.DomUtil.create("div", t + "-line", r));
},
_update: function() {
var e = this._map.getBounds(), t = e.getCenter().lat, n = 6378137 * Math.PI * Math.cos(t * Math.PI / 180), r = n * (e.getNorthEast().lng - e.getSouthWest().lng) / 180, i = this._map.getSize(), s = this.options, o = 0;
i.x > 0 && (o = r * (s.maxWidth / i.x)), this._updateScales(s, o);
},
_updateScales: function(e, t) {
e.metric && t && this._updateMetric(t), e.imperial && t && this._updateImperial(t);
},
_updateMetric: function(e) {
var t = this._getRoundNum(e);
this._mScale.style.width = this._getScaleWidth(t / e) + "px", this._mScale.innerHTML = t < 1e3 ? t + " m" : t / 1e3 + " km";
},
_updateImperial: function(e) {
var t = e * 3.2808399, n = this._iScale, r, i, s;
t > 5280 ? (r = t / 5280, i = this._getRoundNum(r), n.style.width = this._getScaleWidth(i / r) + "px", n.innerHTML = i + " mi") : (s = this._getRoundNum(t), n.style.width = this._getScaleWidth(s / t) + "px", n.innerHTML = s + " ft");
},
_getScaleWidth: function(e) {
return Math.round(this.options.maxWidth * e) - 10;
},
_getRoundNum: function(e) {
var t = Math.pow(10, (Math.floor(e) + "").length - 1), n = e / t;
return n = n >= 10 ? 10 : n >= 5 ? 5 : n >= 3 ? 3 : n >= 2 ? 2 : 1, t * n;
}
}), n.control.scale = function(e) {
return new n.Control.Scale(e);
}, n.Control.Layers = n.Control.extend({
options: {
collapsed: !0,
position: "topright",
autoZIndex: !0
},
initialize: function(e, t, r) {
n.Util.setOptions(this, r), this._layers = {}, this._lastZIndex = 0;
for (var i in e) e.hasOwnProperty(i) && this._addLayer(e[i], i);
for (i in t) t.hasOwnProperty(i) && this._addLayer(t[i], i, !0);
},
onAdd: function(e) {
return this._initLayout(), this._update(), this._container;
},
addBaseLayer: function(e, t) {
return this._addLayer(e, t), this._update(), this;
},
addOverlay: function(e, t) {
return this._addLayer(e, t, !0), this._update(), this;
},
removeLayer: function(e) {
var t = n.Util.stamp(e);
return delete this._layers[t], this._update(), this;
},
_initLayout: function() {
var e = "leaflet-control-layers", t = this._container = n.DomUtil.create("div", e);
n.Browser.touch ? n.DomEvent.on(t, "click", n.DomEvent.stopPropagation) : n.DomEvent.disableClickPropagation(t);
var r = this._form = n.DomUtil.create("form", e + "-list");
if (this.options.collapsed) {
n.DomEvent.on(t, "mouseover", this._expand, this).on(t, "mouseout", this._collapse, this);
var i = this._layersLink = n.DomUtil.create("a", e + "-toggle", t);
i.href = "#", i.title = "Layers", n.Browser.touch ? n.DomEvent.on(i, "click", n.DomEvent.stopPropagation).on(i, "click", n.DomEvent.preventDefault).on(i, "click", this._expand, this) : n.DomEvent.on(i, "focus", this._expand, this), this._map.on("movestart", this._collapse, this);
} else this._expand();
this._baseLayersList = n.DomUtil.create("div", e + "-base", r), this._separator = n.DomUtil.create("div", e + "-separator", r), this._overlaysList = n.DomUtil.create("div", e + "-overlays", r), t.appendChild(r);
},
_addLayer: function(e, t, r) {
var i = n.Util.stamp(e);
this._layers[i] = {
layer: e,
name: t,
overlay: r
}, this.options.autoZIndex && e.setZIndex && (this._lastZIndex++, e.setZIndex(this._lastZIndex));
},
_update: function() {
if (!this._container) return;
this._baseLayersList.innerHTML = "", this._overlaysList.innerHTML = "";
var e = !1, t = !1;
for (var n in this._layers) if (this._layers.hasOwnProperty(n)) {
var r = this._layers[n];
this._addItem(r), t = t || r.overlay, e = e || !r.overlay;
}
this._separator.style.display = t && e ? "" : "none";
},
_createRadioElement: function(e, t) {
var n = '<input type="radio" name="' + e + '"';
t && (n += ' checked="checked"'), n += "/>";
var r = document.createElement("div");
return r.innerHTML = n, r.firstChild;
},
_addItem: function(e) {
var t = document.createElement("label"), r, i = this._map.hasLayer(e.layer);
e.overlay ? (r = document.createElement("input"), r.type = "checkbox", r.defaultChecked = i) : r = this._createRadioElement("leaflet-base-layers", i), r.layerId = n.Util.stamp(e.layer), n.DomEvent.on(r, "click", this._onInputClick, this);
var s = document.createTextNode(" " + e.name);
t.appendChild(r), t.appendChild(s);
var o = e.overlay ? this._overlaysList : this._baseLayersList;
o.appendChild(t);
},
_onInputClick: function() {
var e, t, n, r = this._form.getElementsByTagName("input"), i = r.length;
for (e = 0; e < i; e++) t = r[e], n = this._layers[t.layerId], t.checked ? this._map.addLayer(n.layer, !n.overlay) : this._map.removeLayer(n.layer);
},
_expand: function() {
n.DomUtil.addClass(this._container, "leaflet-control-layers-expanded");
},
_collapse: function() {
this._container.className = this._container.className.replace(" leaflet-control-layers-expanded", "");
}
}), n.control.layers = function(e, t, r) {
return new n.Control.Layers(e, t, r);
}, n.Transition = n.Class.extend({
includes: n.Mixin.Events,
statics: {
CUSTOM_PROPS_SETTERS: {
position: n.DomUtil.setPosition
},
implemented: function() {
return n.Transition.NATIVE || n.Transition.TIMER;
}
},
options: {
easing: "ease",
duration: .5
},
_setProperty: function(e, t) {
var r = n.Transition.CUSTOM_PROPS_SETTERS;
e in r ? r[e](this._el, t) : this._el.style[e] = t;
}
}), n.Transition = n.Transition.extend({
statics: function() {
var e = n.DomUtil.TRANSITION, t = e === "webkitTransition" || e === "OTransition" ? e + "End" : "transitionend";
return {
NATIVE: !!e,
TRANSITION: e,
PROPERTY: e + "Property",
DURATION: e + "Duration",
EASING: e + "TimingFunction",
END: t,
CUSTOM_PROPS_PROPERTIES: {
position: n.Browser.any3d ? n.DomUtil.TRANSFORM : "top, left"
}
};
}(),
options: {
fakeStepInterval: 100
},
initialize: function(e, t) {
this._el = e, n.Util.setOptions(this, t), n.DomEvent.on(e, n.Transition.END, this._onTransitionEnd, this), this._onFakeStep = n.Util.bind(this._onFakeStep, this);
},
run: function(e) {
var t, r = [], i = n.Transition.CUSTOM_PROPS_PROPERTIES;
for (t in e) e.hasOwnProperty(t) && (t = i[t] ? i[t] : t, t = this._dasherize(t), r.push(t));
this._el.style[n.Transition.DURATION] = this.options.duration + "s", this._el.style[n.Transition.EASING] = this.options.easing, this._el.style[n.Transition.PROPERTY] = "all";
for (t in e) e.hasOwnProperty(t) && this._setProperty(t, e[t]);
n.Util.falseFn(this._el.offsetWidth), this._inProgress = !0, n.Browser.mobileWebkit && (this.backupEventFire = setTimeout(n.Util.bind(this._onBackupFireEnd, this), this.options.duration * 1.2 * 1e3)), n.Transition.NATIVE ? (clearInterval(this._timer), this._timer = setInterval(this._onFakeStep, this.options.fakeStepInterval)) : this._onTransitionEnd();
},
_dasherize: function() {
function e(e) {
return "-" + e.toLowerCase();
}
var t = /([A-Z])/g;
return function(n) {
return n.replace(t, e);
};
}(),
_onFakeStep: function() {
this.fire("step");
},
_onTransitionEnd: function(e) {
this._inProgress && (this._inProgress = !1, clearInterval(this._timer), this._el.style[n.Transition.TRANSITION] = "", clearTimeout(this.backupEventFire), delete this.backupEventFire, this.fire("step"), e && e.type && this.fire("end"));
},
_onBackupFireEnd: function() {
var e = document.createEvent("Event");
e.initEvent(n.Transition.END, !0, !1), this._el.dispatchEvent(e);
}
}), n.Transition = n.Transition.NATIVE ? n.Transition : n.Transition.extend({
statics: {
getTime: Date.now || function() {
return +(new Date);
},
TIMER: !0,
EASINGS: {
linear: function(e) {
return e;
},
"ease-out": function(e) {
return e * (2 - e);
}
},
CUSTOM_PROPS_GETTERS: {
position: n.DomUtil.getPosition
},
UNIT_RE: /^[\d\.]+(\D*)$/
},
options: {
fps: 50
},
initialize: function(e, t) {
this._el = e, n.Util.extend(this.options, t), this._easing = n.Transition.EASINGS[this.options.easing] || n.Transition.EASINGS["ease-out"], this._step = n.Util.bind(this._step, this), this._interval = Math.round(1e3 / this.options.fps);
},
run: function(e) {
this._props = {};
var t = n.Transition.CUSTOM_PROPS_GETTERS, r = n.Transition.UNIT_RE;
this.fire("start");
for (var i in e) if (e.hasOwnProperty(i)) {
var s = {};
if (i in t) s.from = t[i](this._el); else {
var o = this._el.style[i].match(r);
s.from = parseFloat(o[0]), s.unit = o[1];
}
s.to = e[i], this._props[i] = s;
}
clearInterval(this._timer), this._timer = setInterval(this._step, this._interval), this._startTime = n.Transition.getTime();
},
_step: function() {
var e = n.Transition.getTime(), t = e - this._startTime, r = this.options.duration * 1e3;
t < r ? this._runFrame(this._easing(t / r)) : (this._runFrame(1), this._complete());
},
_runFrame: function(e) {
var t = n.Transition.CUSTOM_PROPS_SETTERS, r, i, s;
for (r in this._props) this._props.hasOwnProperty(r) && (i = this._props[r], r in t ? (s = i.to.subtract(i.from).multiplyBy(e).add(i.from), t[r](this._el, s)) : this._el.style[r] = (i.to - i.from) * e + i.from + i.unit);
this.fire("step");
},
_complete: function() {
clearInterval(this._timer), this.fire("end");
}
}), n.Map.include(!n.Transition || !n.Transition.implemented() ? {} : {
setView: function(e, t, n) {
t = this._limitZoom(t);
var r = this._zoom !== t;
if (this._loaded && !n && this._layers) {
var i = r ? this._zoomToIfClose && this._zoomToIfClose(e, t) : this._panByIfClose(e);
if (i) return clearTimeout(this._sizeTimer), this;
}
return this._resetView(e, t), this;
},
panBy: function(e, t) {
return e = n.point(e), !e.x && !e.y ? this : (this._panTransition || (this._panTransition = new n.Transition(this._mapPane), this._panTransition.on({
step: this._onPanTransitionStep,
end: this._onPanTransitionEnd
}, this)), n.Util.setOptions(this._panTransition, n.Util.extend({
duration: .25
}, t)), this.fire("movestart"), n.DomUtil.addClass(this._mapPane, "leaflet-pan-anim"), this._panTransition.run({
position: n.DomUtil.getPosition(this._mapPane).subtract(e)
}), this);
},
_onPanTransitionStep: function() {
this.fire("move");
},
_onPanTransitionEnd: function() {
n.DomUtil.removeClass(this._mapPane, "leaflet-pan-anim"), this.fire("moveend");
},
_panByIfClose: function(e) {
var t = this._getCenterOffset(e)._floor();
return this._offsetIsWithinView(t) ? (this.panBy(t), !0) : !1;
},
_offsetIsWithinView: function(e, t) {
var n = t || 1, r = this.getSize();
return Math.abs(e.x) <= r.x * n && Math.abs(e.y) <= r.y * n;
}
}), n.Map.mergeOptions({
zoomAnimation: n.DomUtil.TRANSITION && !n.Browser.android23 && !n.Browser.mobileOpera
}), n.DomUtil.TRANSITION && n.Map.addInitHook(function() {
n.DomEvent.on(this._mapPane, n.Transition.END, this._catchTransitionEnd, this);
}), n.Map.include(n.DomUtil.TRANSITION ? {
_zoomToIfClose: function(e, t) {
if (this._animatingZoom) return !0;
if (!this.options.zoomAnimation) return !1;
var r = this.getZoomScale(t), i = this._getCenterOffset(e).divideBy(1 - 1 / r);
if (!this._offsetIsWithinView(i, 1)) return !1;
n.DomUtil.addClass(this._mapPane, "leaflet-zoom-anim"), this.fire("movestart").fire("zoomstart"), this.fire("zoomanim", {
center: e,
zoom: t
});
var s = this._getCenterLayerPoint().add(i);
return this._prepareTileBg(), this._runAnimation(e, t, r, s), !0;
},
_catchTransitionEnd: function(e) {
this._animatingZoom && this._onZoomTransitionEnd();
},
_runAnimation: function(e, t, r, i, s) {
this._animateToCenter = e, this._animateToZoom = t, this._animatingZoom = !0;
var o = n.DomUtil.TRANSFORM, u = this._tileBg;
clearTimeout(this._clearTileBgTimer), n.Util.falseFn(u.offsetWidth);
var a = n.DomUtil.getScaleString(r, i), f = u.style[o];
u.style[o] = s ? f + " " + a : a + " " + f;
},
_prepareTileBg: function() {
var e = this._tilePane, t = this._tileBg;
if (t && this._getLoadedTilesPercentage(t) > .5 && this._getLoadedTilesPercentage(e) < .5) {
e.style.visibility = "hidden", e.empty = !0, this._stopLoadingImages(e);
return;
}
t || (t = this._tileBg = this._createPane("leaflet-tile-pane", this._mapPane), t.style.zIndex = 1), t.style[n.DomUtil.TRANSFORM] = "", t.style.visibility = "hidden", t.empty = !0, e.empty = !1, this._tilePane = this._panes.tilePane = t;
var r = this._tileBg = e;
n.DomUtil.addClass(r, "leaflet-zoom-animated"), this._stopLoadingImages(r);
},
_getLoadedTilesPercentage: function(e) {
var t = e.getElementsByTagName("img"), n, r, i = 0;
for (n = 0, r = t.length; n < r; n++) t[n].complete && i++;
return i / r;
},
_stopLoadingImages: function(e) {
var t = Array.prototype.slice.call(e.getElementsByTagName("img")), r, i, s;
for (r = 0, i = t.length; r < i; r++) s = t[r], s.complete || (s.onload = n.Util.falseFn, s.onerror = n.Util.falseFn, s.src = n.Util.emptyImageUrl, s.parentNode.removeChild(s));
},
_onZoomTransitionEnd: function() {
this._restoreTileFront(), n.Util.falseFn(this._tileBg.offsetWidth), this._resetView(this._animateToCenter, this._animateToZoom, !0, !0), n.DomUtil.removeClass(this._mapPane, "leaflet-zoom-anim"), this._animatingZoom = !1;
},
_restoreTileFront: function() {
this._tilePane.innerHTML = "", this._tilePane.style.visibility = "", this._tilePane.style.zIndex = 2, this._tileBg.style.zIndex = 1;
},
_clearTileBg: function() {
!this._animatingZoom && !this.touchZoom._zooming && (this._tileBg.innerHTML = "");
}
} : {}), n.Map.include({
_defaultLocateOptions: {
watch: !1,
setView: !1,
maxZoom: Infinity,
timeout: 1e4,
maximumAge: 0,
enableHighAccuracy: !1
},
locate: function(e) {
e = this._locationOptions = n.Util.extend(this._defaultLocateOptions, e);
if (!navigator.geolocation) return this._handleGeolocationError({
code: 0,
message: "Geolocation not supported."
}), this;
var t = n.Util.bind(this._handleGeolocationResponse, this), r = n.Util.bind(this._handleGeolocationError, this);
return e.watch ? this._locationWatchId = navigator.geolocation.watchPosition(t, r, e) : navigator.geolocation.getCurrentPosition(t, r, e), this;
},
stopLocate: function() {
return navigator.geolocation && navigator.geolocation.clearWatch(this._locationWatchId), this;
},
_handleGeolocationError: function(e) {
var t = e.code, n = e.message || (t === 1 ? "permission denied" : t === 2 ? "position unavailable" : "timeout");
this._locationOptions.setView && !this._loaded && this.fitWorld(), this.fire("locationerror", {
code: t,
message: "Geolocation error: " + n + "."
});
},
_handleGeolocationResponse: function(e) {
var t = 180 * e.coords.accuracy / 4e7, r = t * 2, i = e.coords.latitude, s = e.coords.longitude, o = new n.LatLng(i, s), u = new n.LatLng(i - t, s - r), a = new n.LatLng(i + t, s + r), f = new n.LatLngBounds(u, a), l = this._locationOptions;
if (l.setView) {
var c = Math.min(this.getBoundsZoom(f), l.maxZoom);
this.setView(o, c);
}
this.fire("locationfound", {
latlng: o,
bounds: f,
accuracy: e.coords.accuracy
});
}
});
})(this);

// bingLayer.js

L.BingLayer = L.TileLayer.extend({
options: {
subdomains: [ 0, 1, 2, 3 ],
type: "Aerial",
attribution: "Bing",
culture: ""
},
initialize: function(e, t) {
L.Util.setOptions(this, t), this._key = e, this._url = null, this.meta = {}, this.loadMetadata();
},
tile2quad: function(e, t, n) {
var r = "";
for (var i = n; i > 0; i--) {
var s = 0, o = 1 << i - 1;
(e & o) != 0 && (s += 1), (t & o) != 0 && (s += 2), r += s;
}
return r;
},
getTileUrl: function(e, t) {
var t = this._getZoomForUrl(), n = this.options.subdomains, r = this.options.subdomains[Math.abs((e.x + e.y) % n.length)];
return this._url.replace("{subdomain}", r).replace("{quadkey}", this.tile2quad(e.x, e.y, t)).replace("{culture}", this.options.culture);
},
loadMetadata: function() {
var e = this, t = "_bing_metadata_" + L.Util.stamp(this);
window[t] = function(n) {
e.meta = n, window[t] = undefined;
var r = document.getElementById(t);
r.parentNode.removeChild(r);
if (n.errorDetails) {
alert("Got metadata" + n.errorDetails);
return;
}
e.initMetadata();
};
var n = "http://dev.virtualearth.net/REST/v1/Imagery/Metadata/" + this.options.type + "?include=ImageryProviders&jsonp=" + t + "&key=" + this._key, r = document.createElement("script");
r.type = "text/javascript", r.src = n, r.id = t, document.getElementsByTagName("head")[0].appendChild(r);
},
initMetadata: function() {
var e = this.meta.resourceSets[0].resources[0];
this.options.subdomains = e.imageUrlSubdomains, this._url = e.imageUrl, this._providers = [];
for (var t = 0; t < e.imageryProviders.length; t++) {
var n = e.imageryProviders[t];
for (var r = 0; r < n.coverageAreas.length; r++) {
var i = n.coverageAreas[r], s = {
zoomMin: i.zoomMin,
zoomMax: i.zoomMax,
active: !1
}, o = new L.LatLngBounds(new L.LatLng(i.bbox[0] + .01, i.bbox[1] + .01), new L.LatLng(i.bbox[2] - .01, i.bbox[3] - .01));
s.bounds = o, s.attrib = n.attribution, this._providers.push(s);
}
}
this._update();
},
_update: function() {
if (this._url == null || !this._map) return;
L.TileLayer.prototype._update.apply(this, []);
},
_update_attribution: function() {
var e = this._map.getBounds(), t = this._map.getZoom();
for (var n = 0; n < this._providers.length; n++) {
var r = this._providers[n];
t <= r.zoomMax && t >= r.zoomMin && e.intersects(r.bounds) ? (r.active || this._map.attributionControl.addAttribution(r.attrib), r.active = !0) : (r.active && this._map.attributionControl.removeAttribution(r.attrib), r.active = !1);
}
},
onRemove: function(e) {
for (var t = 0; t < this._providers.length; t++) {
var n = this._providers[t];
n.active && (this._map.attributionControl.removeAttribution(n.attrib), n.active = !1);
}
L.TileLayer.prototype.onRemove.apply(this, [ e ]);
}
});

// stamen.js

(function(e) {
function s(e, t, i) {
var s = o(e);
for (var u = 0; u < t.length; u++) {
var a = [ e, t[u] ].join("-");
r[a] = n(a, i || s.type, s.minZoom, s.maxZoom);
}
}
function o(e) {
if (e in r) return r[e];
throw "No such provider (" + e + ")";
}
var t = " a. b. c. d.".split(" "), n = function(e, n, r, i) {
return {
url: [ "http://{S}tile.stamen.com/", e, "/{Z}/{X}/{Y}.", n ].join(""),
type: n,
subdomains: t.slice(),
minZoom: r,
maxZoom: i
};
}, r = {
toner: n("toner", "png", 0, 20),
terrain: n("terrain", "jpg", 4, 18),
watercolor: n("watercolor", "jpg", 3, 16)
}, i = [ 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, ', 'under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. ', 'Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, ', 'under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.' ].join("");
s("toner", [ "hybrid", "labels", "lines", "background", "lite" ]), s("toner", [ "2010" ]), s("toner", [ "2011", "2011-lines", "2011-labels", "2011-lite" ]), s("terrain", [ "background" ]), s("terrain", [ "labels", "lines" ], "png"), e.stamen = e.stamen || {}, e.stamen.tile = e.stamen.tile || {}, e.stamen.tile.providers = r, e.stamen.tile.getProvider = o;
if (typeof MM == "object") {
var u = typeof MM.Template == "function" ? MM.Template : MM.TemplatedMapProvider;
MM.StamenTileLayer = function(e) {
var n = o(e);
MM.Layer.call(this, new u(n.url, t)), this.provider.setZoomRange(n.minZoom, n.maxZoom), this.attribution = i;
}, MM.extend(MM.StamenTileLayer, MM.Layer);
}
typeof L == "object" && (L.StamenTileLayer = L.TileLayer.extend({
initialize: function(e) {
var n = o(e), r = n.url.replace(/({[A-Z]})/g, function(e) {
return e.toLowerCase();
});
L.TileLayer.prototype.initialize.call(this, r, {
minZoom: n.minZoom,
maxZoom: n.maxZoom,
subdomains: t,
scheme: "xyz",
attribution: i
});
}
}));
if (typeof OpenLayers == "object") {
function a(e) {
return e.replace(/({.})/g, function(e) {
return "$" + e.toLowerCase();
});
}
OpenLayers.Layer.Stamen = OpenLayers.Class(OpenLayers.Layer.OSM, {
initialize: function(e, n) {
var r = o(e), i = r.url, s = [];
if (i.indexOf("{S}") > -1) for (var u = 0; u < t.length; u++) s.push(a(i.replace("{S}", t[u]))); else s.push(a(i));
return n = OpenLayers.Util.extend({
numZoomLevels: r.maxZoom,
buffer: 0,
transitionEffect: "resize",
tileOptions: {
crossOriginKeyword: null
}
}, n), OpenLayers.Layer.OSM.prototype.initialize.call(this, e, s, n);
}
});
}
typeof google == "object" && typeof google.maps == "object" && (google.maps.StamenMapType = function(e) {
var n = o(e);
return google.maps.ImageMapType.call(this, {
getTileUrl: function(e, r) {
var i = (r + e.x + e.y) % t.length;
return [ n.url.replace("{S}", t[i]).replace("{Z}", r).replace("{X}", e.x).replace("{Y}", e.y) ];
},
tileSize: new google.maps.Size(256, 256),
name: e,
minZoom: n.minZoom,
maxZoom: n.maxZoom
});
}, google.maps.StamenMapType.prototype = new google.maps.ImageMapType("_"));
})(typeof exports == "undefined" ? this : exports);

// uniTouch.js

function tuio_callback(e, t, n, r, i, s) {
uniTouch.tuioCallback(e, t, n, r, i, s);
}

var uniTouch = {
tuioCursors: [],
tuioData: {},
tuioCreateEvent: function(e) {
var t = new Date, n = {};
return n.touches = this.tuioCursors, n.targetTouches = this.tuioGetTargetTouches(e.target), n.changedTouches = [ e ], n.timeStamp = t.getTime(), n;
},
tuioGetTargetTouches: function(e) {
var t = [];
for (var n = 0; n < this.tuioCursors.length; n++) {
var r = this.tuioCursors[n];
r.target == e && t.push(r);
}
return t;
},
tuioCallback: function(e, t, n, r, i, s) {
var o;
e !== 3 ? o = this.tuioData[t] : (o = {
sid: t,
fid: n
}, this.tuioData[t] = o), o.identifier = t, o.pageX = window.innerWidth * r, o.pageY = window.innerHeight * i, o.clientX = r, o.clientY = i, o.target = document.elementFromPoint(o.pageX, o.pageY);
switch (e) {
case 3:
this.tuioCursors.push(o), this.touchStart(this.tuioCreateEvent(o));
break;
case 4:
this.touchMove(this.tuioCreateEvent(o));
break;
case 5:
this.tuioCursors.splice(this.tuioCursors.indexOf(o), 1), this.touchEnd(this.tuioCreateEvent(o));
break;
default:
}
e === 5 && delete this.tuioData[t];
},
tolerance: 50,
gracePeriod: 200,
pressTime: 900,
raiseTouchEvents: !1,
distance: 0,
delta: 0,
direction: 0,
points: [],
previousPoints: [],
initialPoints: [],
initialAngle: 0,
previousAngle: 0,
area: 0,
centroid: {
x: null,
y: null
},
lastRaisedEvent: 0,
tapRaised: !1,
pressRaised: !1,
holdRaised: !1,
holdTimer: null,
holdTouches: null,
isInto: function(e, t) {
return t.sort(), e >= t[0] && e <= t[t.length - 1];
},
limit: function(e, t) {
return t.sort(), e > t[t.length - 1] ? t[t.length - 1] : e < t[0] ? t[0] : e;
},
sameArrays: function(e, t) {
if (e.length != t.length) return !1;
if (e.length == 0 || t.length == 0) return !1;
for (var n in e) if (e[n] !== t[n]) return !1;
return !0;
},
getTouches: function(e, t) {
var n = [];
for (var r in e) {
var i = {};
i.timeStamp = t, i.id = e[r].identifier, i.x = e[r].pageX, i.y = e[r].pageY, n.push(i);
}
return n;
},
computeArea: function() {
if (this.points.length > 2) {
var e = 0, t = this.points, n = t.length, r = n - 1, i, s;
for (var o = 0; o < n; r = o++) i = t[o], s = t[r], e += i.x * s.y, e -= i.y * s.x;
e /= 2, this.area = e;
} else this.area = 0;
},
computeCentroid: function() {
if (this.points.length > 2) {
var e = this.points, t = e.length, n = 0, r = 0, i, s = t - 1, o, u;
for (var a = 0; a < t; s = a++) o = e[a], u = e[s], i = o.x * u.y - u.x * o.y, n += (o.x + u.x) * i, r += (o.y + u.y) * i;
i = this.area * 6, this.centroid = {
x: n / i,
y: r / i
};
} else {
if (this.points.length == 2) {
var f = this.points[0], o = this.points[1];
if (o.x > f.x) var n = (o.x - f.x) / 2 + f.x; else if (f.x > o.x) var n = (f.x - o.x) / 2 + o.x; else var n = f.x;
if (o.y > f.y) var r = (o.y - f.y) / 2 + f.y; else if (f.y > o.y) var r = (f.y - o.y) / 2 + o.y; else var r = f.y;
return this.centroid = {
x: n,
y: r
}, this.centroid;
}
this.centroid = {
x: this.points[0].x,
y: this.points[0].y
};
}
},
getDistance: function(e, t) {
if (e === undefined) var e = this.points[0];
if (t === undefined) var t = this.points[1];
var n = Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2));
return n;
},
getAngle: function(e, t) {
if (e === undefined) var e = this.points[0];
if (t === undefined) var t = this.points[1];
var n = {
x: Math.abs(e.x - t.x),
y: Math.abs(e.y - t.y)
}, r = Math.atan2(n.y, n.x) * 180 / Math.PI;
r = 90 - r;
if (e.x > t.x && e.y > t.y || t.x > e.x && t.y > e.y) r *= -1;
return r;
},
reset: function() {
this.initialPoints = [], this.previousPoints = [], this.points = [], this.distance = 0, this.delta = 0, this.direction = 0, this.area = 0, this.centroid = {
x: null,
y: null
}, this.initialAngle = 0, this.previousAngle = 0, this.pressRaised = !1, this.holdRaised = !1, this.holdTouches = null, window.clearTimeout(this.holdTimer);
},
init: function(e) {
this.sameArrays(this.previousPoints, e) || (this.previousPoints = this.points), this.points = e, this.computeArea(), this.computeCentroid();
},
raiseEvent: function(e, t) {
var n = document.createEvent("CustomEvent");
n.initEvent(e, !0, !0);
for (var r in t) t.hasOwnProperty(r) && (n[r] = t[r]);
document.dispatchEvent(n);
},
isTap: function(e) {
return e[0].id == this.initialPoints[0].id && this.getDistance(e[0], this.initialPoints[0]) < this.tolerance && e[0].timeStamp < this.initialPoints[0].timeStamp + this.gracePeriod * 3 ? !0 : !1;
},
isPress: function(e) {
return e[0].id == this.initialPoints[0].id && this.getDistance(e[0], this.initialPoints[0]) < this.tolerance && e[0].timeStamp > this.initialPoints[0].timeStamp + this.pressTime ? !0 : !1;
},
isSwipe: function(e) {
var t = this.getDistance(e[0], this.initialPoints[0]);
if (e[0].id == this.initialPoints[0].id && t > this.tolerance * 1.5) {
if (this.isInto(e[0].x, [ this.initialPoints[0].x - this.tolerance * 2, this.initialPoints[0].x + this.tolerance * 2 ])) {
if (e[0].y > this.initialPoints[0].y) var n = "down"; else var n = "up";
Math.abs(e[0].y - this.initialPoints[0].y);
} else if (this.isInto(e[0].y, [ this.initialPoints[0].y - this.tolerance * 2, this.initialPoints[0].y + this.tolerance * 2 ])) {
if (e[0].x > this.initialPoints[0].x) var n = "right"; else var n = "left";
Math.abs(e[0].x - this.initialPoints[0].x);
}
var r = t / (e[0].timeStamp - this.initialPoints[0].timeStamp);
return {
direction: n,
speed: r,
distance: t
};
}
return !1;
},
isPinchZoom: function(e) {
var t = this.getDistance(e[0], e[1]);
if (t != this.distance) {
var n = t - this.distance;
if (Math.abs(n - this.delta) > this.tolerance) {
var r = 0;
n - this.delta > 0 && (r = 1), n - this.delta < 0 && (r = -1);
if (r != 0) return this.direction = r, this.delta = n, r;
}
}
return !1;
},
isRotate: function(e) {
var t = this.getAngle(e[0], e[1]);
if (this.getDistance(this.initialPoints[0], e[0]) < this.tolerance && this.getDistance(this.initialPoints[1], e[1]) < this.tolerance) return !1;
if (this.initialAngle > t) var n = "right"; else {
if (!(this.initialAngle < t)) return !1;
var n = "left";
}
return {
direction: n,
angle: t
};
},
doHold: function() {
this.holdTouches[0].timeStamp += this.gracePeriod + 1;
var e = this.isPress(this.holdTouches);
if (e) if (!this.pressRaised) {
this.lastRaisedEvent = this.holdTouches[0].timeStamp, this.pressRaised = !0;
var t = {
centroid: {
x: this.initialPoints[0].x,
y: this.initialPoints[0].y
},
target: document.elementFromPoint(this.centroid.x, this.centroid.y)
};
this.raiseEvent("press", t);
} else {
this.lastRaisedEvent = this.holdTouches[0].timeStamp, this.holdRaised = !0;
var t = {
centroid: {
x: this.initialPoints[0].x,
y: this.initialPoints[0].y
},
target: document.elementFromPoint(this.centroid.x, this.centroid.y)
};
this.raiseEvent("hold", t);
}
this.holdTimer = window.setTimeout(function() {
uniTouch.doHold();
}, this.gracePeriod + 1);
},
touchStart: function(e) {
this.raiseTouchEvents && this.raiseEvent("touchstart", e), this.reset();
var t = this.getTouches(e.touches, e.timeStamp);
this.init(t), this.initialPoints = t, t.length > 1 ? (this.distance = this.getDistance(), t.length == 2 && (this.initialAngle = this.getAngle(t[0], t[1]), this.previousAngle = this.initialAngle)) : (this.holdTouches = this.getTouches(e.touches, e.timeStamp), this.holdTimer = window.setTimeout(function() {
uniTouch.doHold();
}, this.gracePeriod + 1));
},
touchEnd: function(e) {
this.raiseTouchEvents && this.raiseEvent("touchend", e);
if (this.initialPoints.length == 1) {
var t = this.getTouches(e.changedTouches, e.timeStamp);
window.clearTimeout(this.holdTimer);
if (this.holdRaised) {
var n = {
centroid: {
x: this.initialPoints[0].x,
y: this.initialPoints[0].y
},
target: document.elementFromPoint(this.initialPoints[0].x, this.initialPoints[0].y)
};
this.raiseEvent("release", n);
}
var r = this.isTap(t);
if (r) {
this.lastRaisedEvent = e.timeStamp;
var n = {
centroid: {
x: this.initialPoints[0].x,
y: this.initialPoints[0].y
},
target: document.elementFromPoint(this.initialPoints[0].x, this.initialPoints[0].y)
};
this.tapRaised ? (this.tapRaised = !1, this.raiseEvent("doubletap", n)) : (this.tapRaised = !0, this.raiseEvent("tap", n));
return;
}
var i = this.isSwipe(t);
if (i) {
i.target = document.elementFromPoint(this.initialPoints[0].x, this.initialPoints[0].y), this.raiseEvent("swipe" + i.direction, i), this.raiseEvent("swipe", i);
return;
}
}
},
touchMove: function(e) {
this.raiseTouchEvents && this.raiseEvent("touchmove", e);
if (this.lastRaisedEvent + this.gracePeriod < e.timeStamp) {
var t = this.getTouches(e.touches, e.timeStamp);
this.init(t);
if (t.length == 2) {
var n = this.isPinchZoom(t);
if (n !== !1) {
var r = {
direction: n,
centroid: this.centroid,
target: document.elementFromPoint(this.centroid.x, this.centroid.y)
};
n > 0 ? (this.raiseEvent("pinchzoomin", r), this.raiseEvent("pinch", r)) : n < 0 && (this.raiseEvent("pinchzoomout", r), this.raiseEvent("spread", r)), this.lastRaisedEvent = e.timeStamp, this.raiseEvent("pinchzoom", r);
}
var i = this.isRotate(t);
i !== !1 && (i.centroid = this.centroid, i.target = document.elementFromPoint(t[0].x, t[0].y), i.direction == "right" ? this.raiseEvent("rotateright", i) : this.raiseEvent("rotateleft", i), this.lastRaisedEvent = e.timeStamp, this.raiseEvent("rotate", i));
}
}
}
};

// Map.js

enyo.kind({
name: "enyo.Map",
classes: "enyo-map",
published: {
latitude: 46.498392,
longitude: 2.460938,
zoom: 4,
layer: "osm",
bingMapType: "aerial",
bingCredentials: "",
options: ""
},
events: {
onLoaded: ""
},
handlers: {
ondragstart: "drag"
},
drag: function(e, t) {
return !0;
},
rendered: function() {
this.inherited(arguments);
var e = new L.TileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"), t = new L.TileLayer("http://{s}.tile.cloudmade.com/78eab727fd024b2a9b889e3236c70394/68943/256/{z}/{x}/{y}.png", {
maxZoom: 18
}), n = new L.StamenTileLayer("watercolor"), e = new L.TileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
maxZoom: 18
}), r = new L.BingLayer(this.bingCredentials, {
maxZoom: 20
});
this.mapsLayer = {
cloudmade: t,
watercolor: n,
osm: e,
bing: r
}, this.map = new L.Map(this.id, {
center: new L.LatLng(this.latitude, this.longitude),
zoom: this.zoom,
layers: [ this.mapsLayer[this.layer] ],
zoomControl: !1,
attributionControl: !1,
scrollWheelZoom: !0
}), this.doLoaded();
},
zoomOut: function() {
this.map.zoomOut();
},
zoomIn: function() {
this.map.zoomIn();
},
getMap: function() {
return this.map;
},
getMapsLayer: function() {
return this.mapsLayer;
},
addLayer: function(e) {
this.map.addLayer(e);
},
removeLayer: function(e) {
this.map.removeLayer(e);
},
setMaxBounds: function(e) {
this.map.setMaxBounds(e);
},
invalidateSize: function(e) {
this.map.invalidateSize(e);
},
getScrollWheelZoom: function(e) {
return this.map.scrollWheelZoom;
},
setScrollWheelZoom: function(e) {
this.map.scrollWheelZoom(e);
}
});

// parcours.js

var parcours = [ [ {
lat: 43.6423203,
lon: 3.8830659
}, {
lat: 43.642261,
lon: 3.8831462
}, {
lat: 43.6422382,
lon: 3.8832367
} ], [ {
lat: 43.6396989,
lon: 3.8750315
}, {
lat: 43.6396486,
lon: 3.8750521
}, {
lat: 43.639599,
lon: 3.8751214
}, {
lat: 43.6395595,
lon: 3.8752081
}, {
lat: 43.6395258,
lon: 3.8752772
}, {
lat: 43.6394909,
lon: 3.8753752
}, {
lat: 43.6394653,
lon: 3.8754603
}, {
lat: 43.6394617,
lon: 3.8754988
}, {
lat: 43.6394439,
lon: 3.8756697
}, {
lat: 43.6394631,
lon: 3.8758103
}, {
lat: 43.6394899,
lon: 3.8759561
}, {
lat: 43.6395302,
lon: 3.8761073
}, {
lat: 43.6395341,
lon: 3.8761683
}, {
lat: 43.6395072,
lon: 3.8763699
}, {
lat: 43.6394957,
lon: 3.8764574
}, {
lat: 43.6394669,
lon: 3.8766218
}, {
lat: 43.6394822,
lon: 3.8767094
}, {
lat: 43.6395091,
lon: 3.8767995
}, {
lat: 43.639607,
lon: 3.8769852
}, {
lat: 43.6396781,
lon: 3.8771446
}, {
lat: 43.6396934,
lon: 3.8771788
}, {
lat: 43.6397663,
lon: 3.8772982
}, {
lat: 43.6398105,
lon: 3.8773804
}, {
lat: 43.6398085,
lon: 3.8774546
}, {
lat: 43.6398393,
lon: 3.8775899
}, {
lat: 43.6398853,
lon: 3.8777199
}, {
lat: 43.6399947,
lon: 3.8779135
}, {
lat: 43.6400485,
lon: 3.8780275
}, {
lat: 43.6401329,
lon: 3.8781495
}, {
lat: 43.6402212,
lon: 3.8782821
}, {
lat: 43.6403057,
lon: 3.8784201
}, {
lat: 43.6403498,
lon: 3.8785606
}, {
lat: 43.6403671,
lon: 3.878611
}, {
lat: 43.6404727,
lon: 3.8787887
}, {
lat: 43.6405322,
lon: 3.8788815
}, {
lat: 43.6405533,
lon: 3.8789744
}, {
lat: 43.6405878,
lon: 3.8792316
}, {
lat: 43.640607,
lon: 3.8794438
}, {
lat: 43.640655,
lon: 3.8797117
}, {
lat: 43.6406838,
lon: 3.8799053
}, {
lat: 43.640726,
lon: 3.880213
}, {
lat: 43.6407318,
lon: 3.880396
}, {
lat: 43.6407241,
lon: 3.8805206
}, {
lat: 43.6407375,
lon: 3.8807779
}, {
lat: 43.6407657,
lon: 3.8813628
}, {
lat: 43.6407249,
lon: 3.8814225
}, {
lat: 43.6407212,
lon: 3.8815669
}, {
lat: 43.6407448,
lon: 3.8816429
}, {
lat: 43.6407941,
lon: 3.8816952
} ], [ {
lat: 43.6425543,
lon: 3.8789422
}, {
lat: 43.6425458,
lon: 3.8789981
}, {
lat: 43.642517,
lon: 3.8791506
}, {
lat: 43.6424762,
lon: 3.8793097
}, {
lat: 43.642445,
lon: 3.8794788
}, {
lat: 43.6423947,
lon: 3.8796479
}, {
lat: 43.6423179,
lon: 3.8799396
}, {
lat: 43.6423121,
lon: 3.8800926
}, {
lat: 43.6422579,
lon: 3.8803143
}, {
lat: 43.6422305,
lon: 3.8803947
}, {
lat: 43.6421979,
lon: 3.88049
}, {
lat: 43.6421427,
lon: 3.8806458
}, {
lat: 43.6420972,
lon: 3.8807784
}, {
lat: 43.6420564,
lon: 3.8809409
}, {
lat: 43.6420396,
lon: 3.8810364
}, {
lat: 43.6420484,
lon: 3.8812014
}, {
lat: 43.6421259,
lon: 3.8813387
}, {
lat: 43.6421955,
lon: 3.8814315
}, {
lat: 43.6422723,
lon: 3.8815144
}, {
lat: 43.6423155,
lon: 3.8815973
}, {
lat: 43.6423371,
lon: 3.8817034
}, {
lat: 43.6423351,
lon: 3.881756
}, {
lat: 43.6423179,
lon: 3.881836
}, {
lat: 43.6423136,
lon: 3.8819743
}, {
lat: 43.6423035,
lon: 3.882141
}, {
lat: 43.6422795,
lon: 3.8822835
}, {
lat: 43.6422963,
lon: 3.8824858
}, {
lat: 43.6422939,
lon: 3.8826913
}, {
lat: 43.6423083,
lon: 3.8829068
}, {
lat: 43.6423203,
lon: 3.8830659
}, {
lat: 43.6423325,
lon: 3.8831361
}, {
lat: 43.642311,
lon: 3.8832783
} ], [ {
lat: 43.6428685,
lon: 3.8733421
}, {
lat: 43.6429096,
lon: 3.8733512
}, {
lat: 43.6429545,
lon: 3.8733447
}, {
lat: 43.6430005,
lon: 3.8732877
}, {
lat: 43.6430163,
lon: 3.8732172
}, {
lat: 43.6429762,
lon: 3.8731104
}, {
lat: 43.642953,
lon: 3.8730892
}, {
lat: 43.6429318,
lon: 3.8731054
} ], [ {
lat: 43.6444845,
lon: 3.8754015
}, {
lat: 43.6444995,
lon: 3.87534
}, {
lat: 43.6444972,
lon: 3.8751998
}, {
lat: 43.6444458,
lon: 3.8750341
}, {
lat: 43.644435,
lon: 3.8748367
}, {
lat: 43.6444623,
lon: 3.8747492
}, {
lat: 43.6444786,
lon: 3.8746971
}, {
lat: 43.6445817,
lon: 3.8745275
}, {
lat: 43.6446013,
lon: 3.8744507
}, {
lat: 43.644601,
lon: 3.8741964
}, {
lat: 43.6446041,
lon: 3.8739299
}, {
lat: 43.6445623,
lon: 3.8738337
}, {
lat: 43.6444945,
lon: 3.8737788
}, {
lat: 43.6444063,
lon: 3.8737498
}, {
lat: 43.6443078,
lon: 3.8737484
}, {
lat: 43.6441612,
lon: 3.8737555
}, {
lat: 43.6440917,
lon: 3.8737669
}, {
lat: 43.6440366,
lon: 3.8738031
}, {
lat: 43.6439934,
lon: 3.8738888
}, {
lat: 43.6438926,
lon: 3.8740445
}, {
lat: 43.643827,
lon: 3.874133
}, {
lat: 43.643791,
lon: 3.8741602
}, {
lat: 43.6437659,
lon: 3.874163
} ], [ {
lat: 43.6422753,
lon: 3.8834443
}, {
lat: 43.6422519,
lon: 3.8834505
}, {
lat: 43.6422145,
lon: 3.8834395
}, {
lat: 43.6421835,
lon: 3.883401
}, {
lat: 43.6421712,
lon: 3.8833426
}, {
lat: 43.6421953,
lon: 3.8832654
}, {
lat: 43.6422382,
lon: 3.8832367
}, {
lat: 43.6422762,
lon: 3.8832425
}, {
lat: 43.642311,
lon: 3.8832783
}, {
lat: 43.6423227,
lon: 3.883309
}, {
lat: 43.6423206,
lon: 3.8833849
}, {
lat: 43.6422947,
lon: 3.8834301
}, {
lat: 43.6422753,
lon: 3.8834443
} ], [ {
lat: 43.6396989,
lon: 3.8750315
}, {
lat: 43.6397787,
lon: 3.8750569
}, {
lat: 43.6398763,
lon: 3.8751508
}, {
lat: 43.6399196,
lon: 3.8752277
}, {
lat: 43.6399536,
lon: 3.8753131
}, {
lat: 43.6400247,
lon: 3.875437
}, {
lat: 43.6401174,
lon: 3.8756505
}, {
lat: 43.6401885,
lon: 3.8758385
}, {
lat: 43.6402349,
lon: 3.876052
}, {
lat: 43.6402442,
lon: 3.876146
}, {
lat: 43.6403153,
lon: 3.8763724
}, {
lat: 43.6403802,
lon: 3.8765646
}, {
lat: 43.6404606,
lon: 3.8767312
}, {
lat: 43.6405657,
lon: 3.8768337
}, {
lat: 43.640677,
lon: 3.8769191
}, {
lat: 43.6407604,
lon: 3.8769875
}, {
lat: 43.6408624,
lon: 3.8770131
}, {
lat: 43.6409922,
lon: 3.87709
}, {
lat: 43.641085,
lon: 3.8771541
}, {
lat: 43.6411468,
lon: 3.877184
}, {
lat: 43.6411839,
lon: 3.8771968
}, {
lat: 43.6412797,
lon: 3.877184
}, {
lat: 43.6413786,
lon: 3.8771541
}, {
lat: 43.6414745,
lon: 3.8771413
}, {
lat: 43.6415363,
lon: 3.8771028
}, {
lat: 43.6415981,
lon: 3.8770644
}, {
lat: 43.6416507,
lon: 3.876996
}, {
lat: 43.6416967,
lon: 3.8768919
}, {
lat: 43.6417286,
lon: 3.8768464
}, {
lat: 43.6417796,
lon: 3.8768257
}, {
lat: 43.6418665,
lon: 3.8768133
}, {
lat: 43.6419295,
lon: 3.8767884
}, {
lat: 43.6420375,
lon: 3.8767843
}, {
lat: 43.6421125,
lon: 3.8767967
}, {
lat: 43.6421537,
lon: 3.8768084
}, {
lat: 43.6421844,
lon: 3.8768879
}, {
lat: 43.6422834,
lon: 3.8771116
}, {
lat: 43.6423524,
lon: 3.8772567
}, {
lat: 43.6423764,
lon: 3.8773313
}, {
lat: 43.6424333,
lon: 3.8775343
}, {
lat: 43.6424693,
lon: 3.8776669
}, {
lat: 43.6424933,
lon: 3.8777996
}, {
lat: 43.6425323,
lon: 3.8779736
}, {
lat: 43.6425623,
lon: 3.8780855
}, {
lat: 43.6425713,
lon: 3.8781684
}, {
lat: 43.6425908,
lon: 3.8782409
}, {
lat: 43.6425541,
lon: 3.8782651
}, {
lat: 43.6425203,
lon: 3.8782948
}, {
lat: 43.642485,
lon: 3.8783415
}, {
lat: 43.6424543,
lon: 3.8783669
}, {
lat: 43.6424129,
lon: 3.8783818
}, {
lat: 43.6423775,
lon: 3.878403
}, {
lat: 43.6423653,
lon: 3.8784348
}, {
lat: 43.6423723,
lon: 3.878503
}, {
lat: 43.6423921,
lon: 3.8785754
}, {
lat: 43.6424039,
lon: 3.8786742
}, {
lat: 43.6424277,
lon: 3.8787408
}, {
lat: 43.6424086,
lon: 3.8788248
}, {
lat: 43.642444,
lon: 3.8788723
}, {
lat: 43.6425065,
lon: 3.8788719
}, {
lat: 43.6425543,
lon: 3.8789422
}, {
lat: 43.6426072,
lon: 3.8787649
}, {
lat: 43.6426483,
lon: 3.8787661
}, {
lat: 43.6426877,
lon: 3.8787934
}, {
lat: 43.6427338,
lon: 3.8787786
}, {
lat: 43.6427675,
lon: 3.8787489
}, {
lat: 43.6427737,
lon: 3.8787149
}, {
lat: 43.6427645,
lon: 3.8786576
}, {
lat: 43.6427921,
lon: 3.8786152
}, {
lat: 43.6428136,
lon: 3.8785664
}, {
lat: 43.6428259,
lon: 3.8784942
}, {
lat: 43.6428259,
lon: 3.8784539
}, {
lat: 43.6428121,
lon: 3.8783966
}, {
lat: 43.6427983,
lon: 3.8783266
}, {
lat: 43.6427967,
lon: 3.8782736
}, {
lat: 43.6427746,
lon: 3.8782408
}, {
lat: 43.6427384,
lon: 3.8782269
}, {
lat: 43.6427077,
lon: 3.8782269
}, {
lat: 43.6426723,
lon: 3.8782057
}, {
lat: 43.6426462,
lon: 3.878193
}, {
lat: 43.6426201,
lon: 3.8782057
}, {
lat: 43.6425908,
lon: 3.8782409
} ], [ {
lat: 43.6420396,
lon: 3.8810364
}, {
lat: 43.6419596,
lon: 3.8809756
}, {
lat: 43.6418716,
lon: 3.8809642
}, {
lat: 43.6417932,
lon: 3.881049
} ], [ {
lat: 43.6429082,
lon: 3.8729883
}, {
lat: 43.6429318,
lon: 3.8731054
}, {
lat: 43.6428871,
lon: 3.87327
}, {
lat: 43.6428685,
lon: 3.8733421
}, {
lat: 43.6428201,
lon: 3.8733884
}, {
lat: 43.6427419,
lon: 3.8734244
}, {
lat: 43.6427121,
lon: 3.8734655
}, {
lat: 43.6426711,
lon: 3.8735736
}, {
lat: 43.6426972,
lon: 3.8737074
}, {
lat: 43.6427307,
lon: 3.8738411
}, {
lat: 43.6427828,
lon: 3.8739749
}, {
lat: 43.6427977,
lon: 3.8740521
}, {
lat: 43.6427967,
lon: 3.8741128
} ], [ {
lat: 43.6439222,
lon: 3.8786301
}, {
lat: 43.6439756,
lon: 3.8787781
}, {
lat: 43.6440463,
lon: 3.8789574
}, {
lat: 43.6440584,
lon: 3.8789904
}, {
lat: 43.6441194,
lon: 3.8791562
}, {
lat: 43.6441503,
lon: 3.8792385
}, {
lat: 43.6442193,
lon: 3.8792985
}, {
lat: 43.6442722,
lon: 3.879386
}, {
lat: 43.6442963,
lon: 3.8794875
}, {
lat: 43.6443073,
lon: 3.879531
}, {
lat: 43.644312,
lon: 3.8795961
}, {
lat: 43.6443089,
lon: 3.8796939
}, {
lat: 43.6443026,
lon: 3.8798504
}, {
lat: 43.6442963,
lon: 3.8800068
}, {
lat: 43.6442932,
lon: 3.8801534
}, {
lat: 43.6442947,
lon: 3.8802892
}, {
lat: 43.644305,
lon: 3.8804131
}, {
lat: 43.6443278,
lon: 3.8805022
}, {
lat: 43.6443451,
lon: 3.8806314
}, {
lat: 43.6443561,
lon: 3.8807814
}, {
lat: 43.6443451,
lon: 3.8809443
}, {
lat: 43.644305,
lon: 3.8812376
}, {
lat: 43.6442657,
lon: 3.8814907
}, {
lat: 43.644236,
lon: 3.8816879
}, {
lat: 43.6441587,
lon: 3.8817702
}, {
lat: 43.6440544,
lon: 3.8819492
}, {
lat: 43.6439603,
lon: 3.8821612
}, {
lat: 43.6438543,
lon: 3.8823755
}, {
lat: 43.6437545,
lon: 3.8825792
}, {
lat: 43.643733,
lon: 3.8826238
}, {
lat: 43.6437192,
lon: 3.8826938
}, {
lat: 43.64371,
lon: 3.8827617
}, {
lat: 43.6437168,
lon: 3.882941
}, {
lat: 43.6437242,
lon: 3.8830326
}, {
lat: 43.6437279,
lon: 3.8831379
}, {
lat: 43.6437254,
lon: 3.8832058
}, {
lat: 43.6437058,
lon: 3.883328
}, {
lat: 43.6436824,
lon: 3.8834621
}, {
lat: 43.6436087,
lon: 3.8836539
}, {
lat: 43.6435485,
lon: 3.8838219
}, {
lat: 43.6435068,
lon: 3.8839747
}, {
lat: 43.643481,
lon: 3.884158
}, {
lat: 43.6434724,
lon: 3.8843974
}, {
lat: 43.6434675,
lon: 3.8846588
}, {
lat: 43.6434699,
lon: 3.8848896
}, {
lat: 43.6434577,
lon: 3.8850288
}, {
lat: 43.6434414,
lon: 3.8851123
}, {
lat: 43.6434086,
lon: 3.8852804
}, {
lat: 43.6433349,
lon: 3.8855054
}, {
lat: 43.6432596,
lon: 3.8857112
}, {
lat: 43.6431905,
lon: 3.8858682
}, {
lat: 43.643123,
lon: 3.88597
}, {
lat: 43.643037,
lon: 3.8860655
}, {
lat: 43.6429787,
lon: 3.8861164
}, {
lat: 43.6428435,
lon: 3.886301
}, {
lat: 43.6427637,
lon: 3.8864177
}, {
lat: 43.6426301,
lon: 3.8866087
}, {
lat: 43.6425306,
lon: 3.8867171
}, {
lat: 43.6424996,
lon: 3.8867508
}, {
lat: 43.6423783,
lon: 3.886859
}, {
lat: 43.6422493,
lon: 3.8869567
}, {
lat: 43.642151,
lon: 3.8870288
}, {
lat: 43.6419898,
lon: 3.887171
}, {
lat: 43.64191,
lon: 3.8872049
}, {
lat: 43.6418301,
lon: 3.8872367
}, {
lat: 43.6416873,
lon: 3.8872792
}, {
lat: 43.6415799,
lon: 3.887328
}, {
lat: 43.6415323,
lon: 3.8873662
}, {
lat: 43.6414232,
lon: 3.8874404
}, {
lat: 43.6413388,
lon: 3.8874765
}, {
lat: 43.6413142,
lon: 3.887468
}, {
lat: 43.6412513,
lon: 3.8874086
}, {
lat: 43.6411883,
lon: 3.8873625
}, {
lat: 43.6411422,
lon: 3.8872537
}, {
lat: 43.6410824,
lon: 3.8871561
}, {
lat: 43.6410056,
lon: 3.8870436
}, {
lat: 43.6409196,
lon: 3.8868866
}, {
lat: 43.6408382,
lon: 3.8867678
}, {
lat: 43.6407538,
lon: 3.8866638
}, {
lat: 43.640654,
lon: 3.8865662
}, {
lat: 43.6406294,
lon: 3.8865196
}, {
lat: 43.6406171,
lon: 3.8864411
}, {
lat: 43.6405971,
lon: 3.8862904
}, {
lat: 43.6405787,
lon: 3.8861122
}, {
lat: 43.640548,
lon: 3.88597
}, {
lat: 43.6405188,
lon: 3.8859043
}, {
lat: 43.6404559,
lon: 3.8858215
}, {
lat: 43.6404313,
lon: 3.8857388
}, {
lat: 43.6404037,
lon: 3.8855945
}, {
lat: 43.6403622,
lon: 3.885412
}, {
lat: 43.6403039,
lon: 3.8851701
}, {
lat: 43.640267,
lon: 3.8850386
}, {
lat: 43.6402225,
lon: 3.8849113
}, {
lat: 43.6401902,
lon: 3.884767
}, {
lat: 43.6401795,
lon: 3.8846779
}, {
lat: 43.6401918,
lon: 3.8845909
}, {
lat: 43.6402363,
lon: 3.8844911
}, {
lat: 43.6402808,
lon: 3.8844233
}, {
lat: 43.6403484,
lon: 3.8843723
}, {
lat: 43.6404307,
lon: 3.8843044
}, {
lat: 43.64047,
lon: 3.8842875
}, {
lat: 43.6405707,
lon: 3.8842467
}, {
lat: 43.6406973,
lon: 3.884189
}, {
lat: 43.6407894,
lon: 3.884133
}, {
lat: 43.6409085,
lon: 3.884043
}, {
lat: 43.6409736,
lon: 3.8839565
}, {
lat: 43.6409958,
lon: 3.8838869
}, {
lat: 43.6410117,
lon: 3.8838173
}, {
lat: 43.6410277,
lon: 3.8837188
}, {
lat: 43.6410631,
lon: 3.8836528
} ], [ {
lat: 43.6428711,
lon: 3.8741642
}, {
lat: 43.6428488,
lon: 3.8743502
}, {
lat: 43.6428279,
lon: 3.8744877
}, {
lat: 43.6428291,
lon: 3.8745896
}, {
lat: 43.6428439,
lon: 3.8747474
}, {
lat: 43.6428574,
lon: 3.8749341
}, {
lat: 43.6428746,
lon: 3.8751854
}, {
lat: 43.6428868,
lon: 3.8753602
}, {
lat: 43.6429053,
lon: 3.8755503
}, {
lat: 43.6429335,
lon: 3.8757557
}, {
lat: 43.6429446,
lon: 3.8758779
}, {
lat: 43.6429495,
lon: 3.8760629
}, {
lat: 43.6429581,
lon: 3.8762123
}, {
lat: 43.6429495,
lon: 3.8763736
}, {
lat: 43.6429397,
lon: 3.8765637
}, {
lat: 43.6429372,
lon: 3.8767479
}, {
lat: 43.6429373,
lon: 3.8767722
} ], [ {
lat: 43.6421835,
lon: 3.883401
}, {
lat: 43.6421015,
lon: 3.8834147
}, {
lat: 43.6420454,
lon: 3.8834108
}, {
lat: 43.6419463,
lon: 3.8834001
}, {
lat: 43.6417807,
lon: 3.8834023
}, {
lat: 43.6416382,
lon: 3.8833982
}, {
lat: 43.6415472,
lon: 3.883408
}, {
lat: 43.6414806,
lon: 3.8834445
}, {
lat: 43.6413788,
lon: 3.8835456
}, {
lat: 43.64129,
lon: 3.8836318
}, {
lat: 43.6412095,
lon: 3.8836494
}, {
lat: 43.6411159,
lon: 3.8836594
}, {
lat: 43.6410631,
lon: 3.8836528
}, {
lat: 43.6410439,
lon: 3.8836196
}, {
lat: 43.6410463,
lon: 3.8835467
}, {
lat: 43.6410515,
lon: 3.8834897
}, {
lat: 43.6410415,
lon: 3.8834074
}, {
lat: 43.6410343,
lon: 3.8833279
}, {
lat: 43.6410487,
lon: 3.8832615
}, {
lat: 43.6410683,
lon: 3.8831822
}, {
lat: 43.6410679,
lon: 3.8831057
}, {
lat: 43.6410607,
lon: 3.8830626
}, {
lat: 43.6410502,
lon: 3.8829818
}, {
lat: 43.6410009,
lon: 3.8828138
}, {
lat: 43.6409624,
lon: 3.8827444
}, {
lat: 43.6409408,
lon: 3.8826913
}, {
lat: 43.6409411,
lon: 3.8826075
}, {
lat: 43.6409236,
lon: 3.882534
}, {
lat: 43.6408865,
lon: 3.8824751
}, {
lat: 43.6408599,
lon: 3.8823725
}, {
lat: 43.6408544,
lon: 3.8821476
}, {
lat: 43.6408341,
lon: 3.8818859
}, {
lat: 43.6407941,
lon: 3.8816952
}, {
lat: 43.6408496,
lon: 3.8815277
}, {
lat: 43.640888,
lon: 3.8813752
}, {
lat: 43.6409408,
lon: 3.8811994
}, {
lat: 43.6409719,
lon: 3.8810934
}, {
lat: 43.6410151,
lon: 3.8810403
}, {
lat: 43.6411279,
lon: 3.8809541
}, {
lat: 43.6412479,
lon: 3.880858
}, {
lat: 43.6412814,
lon: 3.8808381
}, {
lat: 43.6413798,
lon: 3.8808248
}, {
lat: 43.6414734,
lon: 3.8808116
}, {
lat: 43.6415816,
lon: 3.8808579
}, {
lat: 43.6416725,
lon: 3.8809375
}, {
lat: 43.6417733,
lon: 3.8810304
}, {
lat: 43.6417932,
lon: 3.881049
}, {
lat: 43.641862,
lon: 3.8811133
}, {
lat: 43.6419484,
lon: 3.8811862
}, {
lat: 43.6420484,
lon: 3.8812014
} ], [ {
lat: 43.6429794,
lon: 3.8742587
}, {
lat: 43.6431385,
lon: 3.8742821
}, {
lat: 43.6432014,
lon: 3.8742782
}, {
lat: 43.6434653,
lon: 3.8743066
}, {
lat: 43.6435031,
lon: 3.8743018
} ], [ {
lat: 43.6410679,
lon: 3.8831057
}, {
lat: 43.6411155,
lon: 3.8831448
}, {
lat: 43.6411543,
lon: 3.8832612
}, {
lat: 43.6411513,
lon: 3.8833513
}, {
lat: 43.6411233,
lon: 3.8834256
}, {
lat: 43.6410982,
lon: 3.8834595
}, {
lat: 43.6410515,
lon: 3.8834897
} ], [ {
lat: 43.6412639,
lon: 3.8739463
}, {
lat: 43.6412909,
lon: 3.8741279
}, {
lat: 43.6413007,
lon: 3.8742756
}, {
lat: 43.6413044,
lon: 3.8743978
}, {
lat: 43.641313,
lon: 3.8745319
}, {
lat: 43.6413265,
lon: 3.8746677
}, {
lat: 43.6413781,
lon: 3.8748442
}, {
lat: 43.6414297,
lon: 3.8749868
}, {
lat: 43.6415133,
lon: 3.8752007
}, {
lat: 43.6416066,
lon: 3.8754078
}, {
lat: 43.6417036,
lon: 3.8756114
}, {
lat: 43.641797,
lon: 3.8758219
}, {
lat: 43.6418351,
lon: 3.8759204
}, {
lat: 43.641937,
lon: 3.8762072
}, {
lat: 43.6420353,
lon: 3.8764737
}, {
lat: 43.6421537,
lon: 3.8768084
} ], [ {
lat: 43.6411468,
lon: 3.877184
}, {
lat: 43.6411708,
lon: 3.8772857
}, {
lat: 43.6411708,
lon: 3.8773644
}, {
lat: 43.6411798,
lon: 3.8774639
}, {
lat: 43.6411768,
lon: 3.8775965
}, {
lat: 43.6411768,
lon: 3.8777125
}, {
lat: 43.6411798,
lon: 3.8777954
}, {
lat: 43.6412128,
lon: 3.8779114
}, {
lat: 43.6412398,
lon: 3.8780441
}, {
lat: 43.6412608,
lon: 3.8781435
}, {
lat: 43.6413147,
lon: 3.8782803
}, {
lat: 43.6413657,
lon: 3.8783922
}, {
lat: 43.6414077,
lon: 3.8784668
}, {
lat: 43.6414407,
lon: 3.8785786
}, {
lat: 43.6414518,
lon: 3.8786553
}, {
lat: 43.6414587,
lon: 3.8787154
}, {
lat: 43.6414826,
lon: 3.8788479
}, {
lat: 43.6415217,
lon: 3.8790262
}, {
lat: 43.6415374,
lon: 3.8791861
}, {
lat: 43.641548,
lon: 3.8792429
}, {
lat: 43.6415786,
lon: 3.8792997
}, {
lat: 43.6416026,
lon: 3.8794365
}, {
lat: 43.6416146,
lon: 3.8795732
}, {
lat: 43.6416266,
lon: 3.8797846
}, {
lat: 43.6416296,
lon: 3.8799213
}, {
lat: 43.6416266,
lon: 3.8801161
}, {
lat: 43.6416356,
lon: 3.8804228
}, {
lat: 43.6416116,
lon: 3.8805678
}, {
lat: 43.6416026,
lon: 3.8806631
}, {
lat: 43.6415816,
lon: 3.8808579
} ], [ {
lat: 43.6433709,
lon: 3.879142
}, {
lat: 43.6434237,
lon: 3.8792831
}, {
lat: 43.6435767,
lon: 3.8798145
}, {
lat: 43.6436304,
lon: 3.8800437
}, {
lat: 43.643648,
lon: 3.8802397
} ], [ {
lat: 43.6436997,
lon: 3.8769791
}, {
lat: 43.6436086,
lon: 3.8769721
}, {
lat: 43.6434992,
lon: 3.8769432
}, {
lat: 43.6434133,
lon: 3.8769212
}, {
lat: 43.6433187,
lon: 3.8768618
}, {
lat: 43.6431995,
lon: 3.8767803
}, {
lat: 43.6431099,
lon: 3.8767752
}, {
lat: 43.6429373,
lon: 3.8767722
}, {
lat: 43.642804,
lon: 3.8767888
}, {
lat: 43.6427094,
lon: 3.8767854
}, {
lat: 43.6425945,
lon: 3.8768128
}, {
lat: 43.6425018,
lon: 3.8767837
}, {
lat: 43.6424257,
lon: 3.8767582
}, {
lat: 43.6423581,
lon: 3.8767463
}, {
lat: 43.6422893,
lon: 3.8767565
}, {
lat: 43.6422144,
lon: 3.8767718
}, {
lat: 43.6421537,
lon: 3.8768084
} ], [ {
lat: 43.6396766,
lon: 3.8748536
}, {
lat: 43.6397391,
lon: 3.8748616
}, {
lat: 43.6398251,
lon: 3.8748658
}, {
lat: 43.6399249,
lon: 3.8748913
}, {
lat: 43.6400217,
lon: 3.8749252
}, {
lat: 43.6400539,
lon: 3.8749677
}, {
lat: 43.6400831,
lon: 3.8750101
}, {
lat: 43.64012,
lon: 3.8750334
}, {
lat: 43.6401645,
lon: 3.8750716
}, {
lat: 43.6402198,
lon: 3.8751332
}, {
lat: 43.6402459,
lon: 3.8751798
}, {
lat: 43.6403748,
lon: 3.8753008
}, {
lat: 43.6404685,
lon: 3.875392
}, {
lat: 43.6405484,
lon: 3.8754833
}, {
lat: 43.640642,
lon: 3.8755936
}, {
lat: 43.6407446,
lon: 3.8756754
} ], [ {
lat: 43.6390077,
lon: 3.8761072
}, {
lat: 43.6390251,
lon: 3.8761357
}, {
lat: 43.6390496,
lon: 3.8761889
} ], [ {
lat: 43.6439222,
lon: 3.8786301
}, {
lat: 43.6438725,
lon: 3.8784817
}, {
lat: 43.6438622,
lon: 3.8784511
}, {
lat: 43.6438094,
lon: 3.8783052
}, {
lat: 43.6437638,
lon: 3.878219
}, {
lat: 43.6436727,
lon: 3.8781228
}, {
lat: 43.6435863,
lon: 3.8780466
}, {
lat: 43.6435351,
lon: 3.8780177
}, {
lat: 43.6434688,
lon: 3.8779803
}, {
lat: 43.6433944,
lon: 3.8779339
}, {
lat: 43.6433497,
lon: 3.8779109
}, {
lat: 43.643306,
lon: 3.8779344
}, {
lat: 43.6432576,
lon: 3.8779339
}, {
lat: 43.6431521,
lon: 3.8779836
}, {
lat: 43.6430345,
lon: 3.8780366
}, {
lat: 43.6429404,
lon: 3.8780778
}, {
lat: 43.6428657,
lon: 3.8781418
}, {
lat: 43.6428073,
lon: 3.8782099
}, {
lat: 43.6427746,
lon: 3.8782408
} ], [ {
lat: 43.6424693,
lon: 3.8776669
}, {
lat: 43.642537,
lon: 3.8776279
}, {
lat: 43.6426163,
lon: 3.8775463
} ], [ {
lat: 43.6396989,
lon: 3.8750315
}, {
lat: 43.6396766,
lon: 3.8748536
}, {
lat: 43.6396563,
lon: 3.8746964
}, {
lat: 43.6396724,
lon: 3.8744261
}, {
lat: 43.6397023,
lon: 3.874397
}, {
lat: 43.6397342,
lon: 3.8743289
}, {
lat: 43.6397691,
lon: 3.8742444
}, {
lat: 43.63982,
lon: 3.8740979
}, {
lat: 43.6398727,
lon: 3.873952
}, {
lat: 43.6399322,
lon: 3.8737849
}, {
lat: 43.639961,
lon: 3.873716
}, {
lat: 43.6400261,
lon: 3.8736793
}, {
lat: 43.6400634,
lon: 3.8736844
}, {
lat: 43.640126,
lon: 3.8737611
}, {
lat: 43.6401932,
lon: 3.8738433
}, {
lat: 43.6402137,
lon: 3.8738922
}, {
lat: 43.6402373,
lon: 3.8739759
}, {
lat: 43.6402992,
lon: 3.8740146
}, {
lat: 43.6403424,
lon: 3.8741001
}, {
lat: 43.6403736,
lon: 3.8741536
}, {
lat: 43.6405061,
lon: 3.8743074
}, {
lat: 43.6405579,
lon: 3.8743711
}, {
lat: 43.640675,
lon: 3.8744162
}, {
lat: 43.6408343,
lon: 3.8744453
}, {
lat: 43.6409226,
lon: 3.8744559
}, {
lat: 43.640959,
lon: 3.874448
}, {
lat: 43.6409917,
lon: 3.8744162
}, {
lat: 43.6410166,
lon: 3.8743339
}, {
lat: 43.641055,
lon: 3.8741828
}, {
lat: 43.6410723,
lon: 3.8741165
}, {
lat: 43.6411049,
lon: 3.8740687
}, {
lat: 43.6411644,
lon: 3.874013
}, {
lat: 43.641222,
lon: 3.87396
}, {
lat: 43.6412639,
lon: 3.8739463
} ], [ {
lat: 43.6435031,
lon: 3.8743018
}, {
lat: 43.6437142,
lon: 3.874549
}, {
lat: 43.6439618,
lon: 3.8748145
}, {
lat: 43.644251,
lon: 3.8751947
}, {
lat: 43.6443179,
lon: 3.8752326
}, {
lat: 43.6444323,
lon: 3.8753375
}, {
lat: 43.6444845,
lon: 3.8754015
} ], [ {
lat: 43.6430716,
lon: 3.8790688
}, {
lat: 43.6431477,
lon: 3.8791372
}, {
lat: 43.6432504,
lon: 3.8791451
}, {
lat: 43.6433709,
lon: 3.879142
}, {
lat: 43.6434402,
lon: 3.8790948
}, {
lat: 43.6434737,
lon: 3.878989
}, {
lat: 43.643477,
lon: 3.8788668
}, {
lat: 43.643513,
lon: 3.8787337
}, {
lat: 43.6436028,
lon: 3.8786159
}, {
lat: 43.6436969,
lon: 3.8785667
}, {
lat: 43.6438725,
lon: 3.8784817
} ], [ {
lat: 43.6436997,
lon: 3.8769791
}, {
lat: 43.6438514,
lon: 3.8770265
}, {
lat: 43.6439634,
lon: 3.8770713
}, {
lat: 43.6440705,
lon: 3.8771555
}, {
lat: 43.6441816,
lon: 3.8772709
}, {
lat: 43.6442464,
lon: 3.8773361
}, {
lat: 43.6443164,
lon: 3.8774581
}, {
lat: 43.6443824,
lon: 3.8775776
}, {
lat: 43.6444534,
lon: 3.8777018
}, {
lat: 43.6444993,
lon: 3.8777678
}, {
lat: 43.6445308,
lon: 3.8778269
}, {
lat: 43.644561,
lon: 3.8779251
}, {
lat: 43.6445721,
lon: 3.8779709
}, {
lat: 43.6446076,
lon: 3.8780943
}, {
lat: 43.6446479,
lon: 3.8783449
}, {
lat: 43.6446781,
lon: 3.8784821
}, {
lat: 43.6447256,
lon: 3.8786516
}, {
lat: 43.6447434,
lon: 3.8787254
}, {
lat: 43.6447802,
lon: 3.8787801
}, {
lat: 43.6448527,
lon: 3.8788398
}, {
lat: 43.6449253,
lon: 3.8788624
}, {
lat: 43.6450125,
lon: 3.87888
}, {
lat: 43.6450924,
lon: 3.8788373
}, {
lat: 43.645176,
lon: 3.8787545
}, {
lat: 43.6452486,
lon: 3.8786516
}, {
lat: 43.6453103,
lon: 3.8785663
}, {
lat: 43.6453812,
lon: 3.878476
}, {
lat: 43.6454066,
lon: 3.8784709
}, {
lat: 43.6454425,
lon: 3.8784791
}, {
lat: 43.6454987,
lon: 3.8785204
} ], [ {
lat: 43.6395091,
lon: 3.8738288
}, {
lat: 43.6395541,
lon: 3.8739774
}, {
lat: 43.6396166,
lon: 3.8740919
}, {
lat: 43.6396355,
lon: 3.8741862
}, {
lat: 43.6396724,
lon: 3.8744261
} ], [ {
lat: 43.6405322,
lon: 3.8788815
}, {
lat: 43.6405695,
lon: 3.8787776
}, {
lat: 43.6406145,
lon: 3.8787309
}, {
lat: 43.640682,
lon: 3.8786636
}, {
lat: 43.6407682,
lon: 3.8786014
}, {
lat: 43.6408506,
lon: 3.8785445
}, {
lat: 43.6409181,
lon: 3.8785134
}, {
lat: 43.6410381,
lon: 3.8784457
}, {
lat: 43.6411131,
lon: 3.8784616
}, {
lat: 43.6411805,
lon: 3.8784978
}, {
lat: 43.6412255,
lon: 3.8785341
}, {
lat: 43.6413267,
lon: 3.8785704
}, {
lat: 43.6413942,
lon: 3.8786222
}, {
lat: 43.6414518,
lon: 3.8786553
}, {
lat: 43.6414992,
lon: 3.8786843
}, {
lat: 43.6416041,
lon: 3.8787309
}, {
lat: 43.6417054,
lon: 3.8787827
}, {
lat: 43.6417991,
lon: 3.8788138
}, {
lat: 43.6418853,
lon: 3.8788345
}, {
lat: 43.6419237,
lon: 3.8788246
}, {
lat: 43.6419693,
lon: 3.8787881
}, {
lat: 43.6420484,
lon: 3.8787086
}, {
lat: 43.6420724,
lon: 3.8786456
}, {
lat: 43.6421276,
lon: 3.8785759
}, {
lat: 43.642178,
lon: 3.8785262
}, {
lat: 43.6422548,
lon: 3.8784997
}, {
lat: 43.6423723,
lon: 3.878503
} ], [ {
lat: 43.6438278,
lon: 3.8753033
}, {
lat: 43.6438174,
lon: 3.875383
}, {
lat: 43.6439212,
lon: 3.875497
} ], [ {
lat: 43.6427675,
lon: 3.8787489
}, {
lat: 43.6428356,
lon: 3.8788197
}, {
lat: 43.6429375,
lon: 3.8789597
}, {
lat: 43.6430716,
lon: 3.8790688
}, {
lat: 43.64308,
lon: 3.8791697
}, {
lat: 43.6431475,
lon: 3.8796179
}, {
lat: 43.6431753,
lon: 3.8798766
}, {
lat: 43.6431315,
lon: 3.8805185
}, {
lat: 43.6429431,
lon: 3.8807407
}, {
lat: 43.6428672,
lon: 3.8808844
}, {
lat: 43.6428019,
lon: 3.8810203
}, {
lat: 43.6428037,
lon: 3.8810879
}, {
lat: 43.642873,
lon: 3.8811983
}, {
lat: 43.6429775,
lon: 3.8812835
}, {
lat: 43.6430298,
lon: 3.8813342
}, {
lat: 43.6430335,
lon: 3.8814517
}, {
lat: 43.6430011,
lon: 3.8815719
}, {
lat: 43.6429804,
lon: 3.8816698
}, {
lat: 43.6429838,
lon: 3.8818388
}, {
lat: 43.642968,
lon: 3.8819239
}, {
lat: 43.6429675,
lon: 3.882146
}, {
lat: 43.6429535,
lon: 3.882245
}, {
lat: 43.6428169,
lon: 3.8823766
}, {
lat: 43.6427111,
lon: 3.8824588
} ], [ {
lat: 43.6445302,
lon: 3.8821807
}, {
lat: 43.6445473,
lon: 3.8822109
}, {
lat: 43.6445972,
lon: 3.8822292
}, {
lat: 43.6446299,
lon: 3.882292
}, {
lat: 43.6445852,
lon: 3.8823721
}, {
lat: 43.6445236,
lon: 3.8823786
}, {
lat: 43.6445143,
lon: 3.8822843
}, {
lat: 43.6445227,
lon: 3.8822158
}, {
lat: 43.6445302,
lon: 3.8821807
}, {
lat: 43.6444993,
lon: 3.8820596
}, {
lat: 43.6444748,
lon: 3.8819714
}, {
lat: 43.6444535,
lon: 3.8818921
} ], [ {
lat: 43.6398105,
lon: 3.8773804
}, {
lat: 43.6398501,
lon: 3.8774053
}, {
lat: 43.6399688,
lon: 3.8774362
}, {
lat: 43.6400535,
lon: 3.8774978
}, {
lat: 43.6401204,
lon: 3.8775659
}, {
lat: 43.640222,
lon: 3.8776429
}, {
lat: 43.6403383,
lon: 3.8777458
}, {
lat: 43.6404233,
lon: 3.8778141
}, {
lat: 43.6405672,
lon: 3.8779298
}, {
lat: 43.6406368,
lon: 3.878016
}, {
lat: 43.6406992,
lon: 3.8780956
}, {
lat: 43.6408263,
lon: 3.8782348
}, {
lat: 43.6409535,
lon: 3.8783641
}, {
lat: 43.6410381,
lon: 3.8784457
} ], [ {
lat: 43.6412639,
lon: 3.8739463
}, {
lat: 43.6412712,
lon: 3.8736559
}, {
lat: 43.6412637,
lon: 3.8735684
}, {
lat: 43.6412302,
lon: 3.873481
}, {
lat: 43.64126,
lon: 3.8734089
}, {
lat: 43.6413345,
lon: 3.8732906
}, {
lat: 43.6414127,
lon: 3.873234
}, {
lat: 43.6414871,
lon: 3.8731311
}, {
lat: 43.6415318,
lon: 3.8730488
}, {
lat: 43.6415951,
lon: 3.8729665
}, {
lat: 43.6416621,
lon: 3.8729305
}, {
lat: 43.6417738,
lon: 3.8728996
}, {
lat: 43.6419041,
lon: 3.8729562
}, {
lat: 43.6420382,
lon: 3.8730539
}, {
lat: 43.6421759,
lon: 3.8731517
}, {
lat: 43.6422839,
lon: 3.8732855
}, {
lat: 43.6423547,
lon: 3.8734861
}, {
lat: 43.642377,
lon: 3.873553
}, {
lat: 43.6423807,
lon: 3.8736662
}, {
lat: 43.642418,
lon: 3.8737897
}, {
lat: 43.6424775,
lon: 3.8739183
}, {
lat: 43.6425483,
lon: 3.8739749
}, {
lat: 43.6426414,
lon: 3.8740367
}, {
lat: 43.6427121,
lon: 3.8740727
}, {
lat: 43.6427967,
lon: 3.8741128
}, {
lat: 43.6428424,
lon: 3.8741344
}, {
lat: 43.6428711,
lon: 3.8741642
}, {
lat: 43.6429794,
lon: 3.8742587
}, {
lat: 43.6430124,
lon: 3.8743177
}, {
lat: 43.643078,
lon: 3.8744383
}, {
lat: 43.6431232,
lon: 3.8744827
}, {
lat: 43.6431695,
lon: 3.8746323
}, {
lat: 43.6432386,
lon: 3.8748127
}, {
lat: 43.6433307,
lon: 3.8749559
}, {
lat: 43.6433787,
lon: 3.875001
}, {
lat: 43.6436628,
lon: 3.8752158
}, {
lat: 43.6438278,
lon: 3.8753033
}, {
lat: 43.6439372,
lon: 3.8753484
}, {
lat: 43.6440466,
lon: 3.87542
}, {
lat: 43.6440984,
lon: 3.8754519
}, {
lat: 43.6442136,
lon: 3.875489
}, {
lat: 43.6442942,
lon: 3.8755341
}, {
lat: 43.6443844,
lon: 3.8756402
}, {
lat: 43.6444036,
lon: 3.8757277
}, {
lat: 43.6444036,
lon: 3.8758064
}, {
lat: 43.6444036,
lon: 3.8758152
}, {
lat: 43.6443921,
lon: 3.8759478
}, {
lat: 43.6443863,
lon: 3.8760672
}, {
lat: 43.6443921,
lon: 3.8763244
}, {
lat: 43.6444017,
lon: 3.8763987
}, {
lat: 43.6444324,
lon: 3.8765393
}, {
lat: 43.6444324,
lon: 3.8766135
}, {
lat: 43.6444055,
lon: 3.87677
}, {
lat: 43.6444055,
lon: 3.8768337
}, {
lat: 43.6444324,
lon: 3.8769689
}, {
lat: 43.6444765,
lon: 3.8771281
}, {
lat: 43.6445207,
lon: 3.8773164
}, {
lat: 43.6445475,
lon: 3.8775153
}, {
lat: 43.644561,
lon: 3.8776824
}, {
lat: 43.644561,
lon: 3.8779251
}, {
lat: 43.644561,
lon: 3.8779529
}, {
lat: 43.6445552,
lon: 3.8781545
}, {
lat: 43.6445518,
lon: 3.8784198
}, {
lat: 43.6444292,
lon: 3.8787917
}, {
lat: 43.6443972,
lon: 3.8788535
}, {
lat: 43.6443459,
lon: 3.879071
}, {
lat: 43.6443085,
lon: 3.8791565
}, {
lat: 43.644284,
lon: 3.8792326
}, {
lat: 43.6442722,
lon: 3.879386
} ], [ {
lat: 43.6411883,
lon: 3.8873625
}, {
lat: 43.6412451,
lon: 3.8870843
}, {
lat: 43.6412726,
lon: 3.8869507
}, {
lat: 43.6413253,
lon: 3.8867725
}, {
lat: 43.6414047,
lon: 3.8865704
}, {
lat: 43.6414738,
lon: 3.8864053
}, {
lat: 43.6415297,
lon: 3.8862598
}, {
lat: 43.6415918,
lon: 3.8861229
}, {
lat: 43.6416845,
lon: 3.8859491
}, {
lat: 43.6417325,
lon: 3.8858448
}, {
lat: 43.6417718,
lon: 3.8857046
}, {
lat: 43.641815,
lon: 3.8855189
}, {
lat: 43.6418693,
lon: 3.885344
}, {
lat: 43.6419133,
lon: 3.8851832
}, {
lat: 43.6419463,
lon: 3.885043
}, {
lat: 43.641988,
lon: 3.8848649
}, {
lat: 43.6420352,
lon: 3.8846737
}, {
lat: 43.6420855,
lon: 3.8845129
}, {
lat: 43.6421271,
lon: 3.8843315
}, {
lat: 43.6421751,
lon: 3.8840925
}, {
lat: 43.6422042,
lon: 3.8839187
}, {
lat: 43.6422317,
lon: 3.8837503
}, {
lat: 43.6422576,
lon: 3.8835797
}, {
lat: 43.6422663,
lon: 3.883495
}, {
lat: 43.6422753,
lon: 3.8834443
} ], [ {
lat: 43.6445856,
lon: 3.8817477
}, {
lat: 43.6444839,
lon: 3.8818724
}, {
lat: 43.6444535,
lon: 3.8818921
}, {
lat: 43.6444086,
lon: 3.8819
}, {
lat: 43.6443534,
lon: 3.8818491
}, {
lat: 43.6442797,
lon: 3.8817706
}, {
lat: 43.644236,
lon: 3.8816879
}, {
lat: 43.6442219,
lon: 3.8818373
}, {
lat: 43.6442641,
lon: 3.8820032
}, {
lat: 43.6443035,
lon: 3.8820564
}, {
lat: 43.6443502,
lon: 3.8820754
}, {
lat: 43.644407,
lon: 3.8819626
}, {
lat: 43.6444535,
lon: 3.8818921
} ], [ {
lat: 43.6389674,
lon: 3.8756984
}, {
lat: 43.638959,
lon: 3.8757968
}, {
lat: 43.6390531,
lon: 3.8759841
}, {
lat: 43.6390916,
lon: 3.8760855
}, {
lat: 43.6390894,
lon: 3.8761356
}, {
lat: 43.639102,
lon: 3.8762011
}, {
lat: 43.6390895,
lon: 3.8762649
} ], [ {
lat: 43.6391768,
lon: 3.8764575
}, {
lat: 43.6391481,
lon: 3.8765575
}, {
lat: 43.6391209,
lon: 3.8765878
}, {
lat: 43.6390795,
lon: 3.8766108
}, {
lat: 43.6390557,
lon: 3.8766279
}, {
lat: 43.6390333,
lon: 3.8766628
}, {
lat: 43.6390115,
lon: 3.876723
}, {
lat: 43.6389817,
lon: 3.8767713
}, {
lat: 43.6391143,
lon: 3.8772224
}, {
lat: 43.6391537,
lon: 3.8773034
}, {
lat: 43.6392278,
lon: 3.8773737
}, {
lat: 43.6393048,
lon: 3.8773957
}, {
lat: 43.6393789,
lon: 3.8773857
}, {
lat: 43.6394428,
lon: 3.8773696
}, {
lat: 43.6395329,
lon: 3.8773154
}, {
lat: 43.6395924,
lon: 3.8773034
}, {
lat: 43.6396346,
lon: 3.8772813
}, {
lat: 43.6396651,
lon: 3.8772472
}, {
lat: 43.6396753,
lon: 3.877193
}, {
lat: 43.6396781,
lon: 3.8771446
} ], [ {
lat: 43.6440584,
lon: 3.8789904
}, {
lat: 43.6442079,
lon: 3.8789212
}, {
lat: 43.6443035,
lon: 3.8788631
}, {
lat: 43.6444292,
lon: 3.8787917
} ], [ {
lat: 43.642551,
lon: 3.8804485
}, {
lat: 43.6424912,
lon: 3.8804485
}, {
lat: 43.6424313,
lon: 3.8804337
}, {
lat: 43.6423929,
lon: 3.8804231
}, {
lat: 43.6423315,
lon: 3.8804209
}, {
lat: 43.6422881,
lon: 3.8804563
}, {
lat: 43.6422593,
lon: 3.880404
}, {
lat: 43.6422305,
lon: 3.8803947
} ], [ {
lat: 43.6403424,
lon: 3.8741001
}, {
lat: 43.640359,
lon: 3.8742914
}, {
lat: 43.6404479,
lon: 3.8745424
}, {
lat: 43.640556,
lon: 3.8748734
}, {
lat: 43.640614,
lon: 3.8751083
}, {
lat: 43.6406836,
lon: 3.8753646
}, {
lat: 43.6407338,
lon: 3.8755728
}, {
lat: 43.6407446,
lon: 3.8756754
}, {
lat: 43.6407686,
lon: 3.8757971
}, {
lat: 43.6407989,
lon: 3.8758573
}, {
lat: 43.6409027,
lon: 3.8759735
}, {
lat: 43.6410387,
lon: 3.8761614
}, {
lat: 43.6411451,
lon: 3.8763494
}, {
lat: 43.6413033,
lon: 3.8765373
}, {
lat: 43.6413726,
lon: 3.8766373
}, {
lat: 43.6414406,
lon: 3.8766928
}, {
lat: 43.6415086,
lon: 3.8767782
}, {
lat: 43.6415673,
lon: 3.8768423
}, {
lat: 43.6416967,
lon: 3.8768919
} ], [ {
lat: 43.6394439,
lon: 3.8756697
}, {
lat: 43.6394367,
lon: 3.8756683
}, {
lat: 43.6393863,
lon: 3.8756779
}, {
lat: 43.6393421,
lon: 3.8757014
}, {
lat: 43.6392746,
lon: 3.8757549
}, {
lat: 43.6392085,
lon: 3.8757754
}, {
lat: 43.6391686,
lon: 3.8757956
}, {
lat: 43.6391293,
lon: 3.8758297
}, {
lat: 43.6390834,
lon: 3.8758024
}, {
lat: 43.6389674,
lon: 3.8756984
}, {
lat: 43.6389355,
lon: 3.8756479
}, {
lat: 43.6389024,
lon: 3.875614
}, {
lat: 43.6388581,
lon: 3.8756072
}, {
lat: 43.6388164,
lon: 3.8756394
}, {
lat: 43.6388031,
lon: 3.8757022
}, {
lat: 43.6387967,
lon: 3.8757532
}, {
lat: 43.638789,
lon: 3.8759033
}, {
lat: 43.6387943,
lon: 3.8759932
}, {
lat: 43.6388151,
lon: 3.8760672
}, {
lat: 43.6388446,
lon: 3.8761436
}, {
lat: 43.6388766,
lon: 3.8761826
}, {
lat: 43.638934,
lon: 3.8762057
}, {
lat: 43.639,
lon: 3.8762
}, {
lat: 43.6390496,
lon: 3.8761889
}, {
lat: 43.6390895,
lon: 3.8762649
}, {
lat: 43.6391031,
lon: 3.8763262
}, {
lat: 43.6391358,
lon: 3.8763931
}, {
lat: 43.6391768,
lon: 3.8764575
}, {
lat: 43.6392623,
lon: 3.8764237
}, {
lat: 43.6393077,
lon: 3.8764118
}, {
lat: 43.6393397,
lon: 3.8764118
}, {
lat: 43.6393692,
lon: 3.8764321
}, {
lat: 43.6394109,
lon: 3.876444
}, {
lat: 43.6394641,
lon: 3.8764536
}, {
lat: 43.6394957,
lon: 3.8764574
} ], [ {
lat: 43.6388031,
lon: 3.8757022
}, {
lat: 43.6388351,
lon: 3.8757871
} ], [ {
lat: 43.6435031,
lon: 3.8743018
}, {
lat: 43.6435953,
lon: 3.87429
}, {
lat: 43.6437426,
lon: 3.8741996
}, {
lat: 43.6437659,
lon: 3.874163
}, {
lat: 43.6437578,
lon: 3.8741105
}, {
lat: 43.6436448,
lon: 3.8739578
}, {
lat: 43.643483,
lon: 3.8737428
}, {
lat: 43.6434589,
lon: 3.8736778
}, {
lat: 43.6434326,
lon: 3.8733137
}, {
lat: 43.643433,
lon: 3.8732298
}, {
lat: 43.6434806,
lon: 3.873155
}, {
lat: 43.6434889,
lon: 3.8730873
}, {
lat: 43.6434603,
lon: 3.8730284
}, {
lat: 43.6433098,
lon: 3.8729461
}, {
lat: 43.6432652,
lon: 3.8729269
}, {
lat: 43.64318,
lon: 3.8729093
}, {
lat: 43.6431326,
lon: 3.8730045
}, {
lat: 43.6430681,
lon: 3.8730614
} ], [ {
lat: 43.6444845,
lon: 3.8754015
}, {
lat: 43.6444909,
lon: 3.8754467
}, {
lat: 43.6444665,
lon: 3.8755248
}, {
lat: 43.6443844,
lon: 3.8756402
} ] ], limiteZoo = [ {
lat: 43.6401347,
lon: 3.878581
}, {
lat: 43.6390122,
lon: 3.8778191
}, {
lat: 43.6388921,
lon: 3.8769256
}, {
lat: 43.6388579,
lon: 3.876683
}, {
lat: 43.6388505,
lon: 3.8763913
}, {
lat: 43.6388312,
lon: 3.8762991
}, {
lat: 43.6387786,
lon: 3.8760699
}, {
lat: 43.6386942,
lon: 3.8758805
}, {
lat: 43.6386422,
lon: 3.8756929
}, {
lat: 43.6385984,
lon: 3.8754118
}, {
lat: 43.638597,
lon: 3.8753632
}, {
lat: 43.6385937,
lon: 3.8749886
}, {
lat: 43.6385951,
lon: 3.874905
}, {
lat: 43.6386245,
lon: 3.8746709
}, {
lat: 43.6386499,
lon: 3.8745378
}, {
lat: 43.6386591,
lon: 3.8742072
}, {
lat: 43.6386168,
lon: 3.8740008
}, {
lat: 43.6386101,
lon: 3.8739341
}, {
lat: 43.6386262,
lon: 3.8738766
}, {
lat: 43.6389611,
lon: 3.87373
}, {
lat: 43.6393668,
lon: 3.8735648
}, {
lat: 43.6396834,
lon: 3.8734386
}, {
lat: 43.639765,
lon: 3.8734159
}, {
lat: 43.6398446,
lon: 3.8733463
}, {
lat: 43.639865,
lon: 3.8733381
}, {
lat: 43.6398743,
lon: 3.873336
}, {
lat: 43.6399091,
lon: 3.8733202
}, {
lat: 43.6399598,
lon: 3.8733033
}, {
lat: 43.6399828,
lon: 3.8732969
}, {
lat: 43.6400003,
lon: 3.8732852
}, {
lat: 43.6400123,
lon: 3.8732823
}, {
lat: 43.6400123,
lon: 3.8732653
}, {
lat: 43.6400204,
lon: 3.8732291
}, {
lat: 43.6400328,
lon: 3.8731951
}, {
lat: 43.640049,
lon: 3.8731704
}, {
lat: 43.6400574,
lon: 3.8731462
}, {
lat: 43.6400592,
lon: 3.8731263
}, {
lat: 43.6400621,
lon: 3.8731049
}, {
lat: 43.6400723,
lon: 3.8730897
}, {
lat: 43.6403313,
lon: 3.8728589
}, {
lat: 43.6403379,
lon: 3.8728538
}, {
lat: 43.6403439,
lon: 3.8728523
}, {
lat: 43.6403486,
lon: 3.8728542
}, {
lat: 43.640353,
lon: 3.8728625
}, {
lat: 43.6403715,
lon: 3.8728494
}, {
lat: 43.6403885,
lon: 3.8728341
}, {
lat: 43.6403851,
lon: 3.8728288
}, {
lat: 43.6403842,
lon: 3.8728208
}, {
lat: 43.6403854,
lon: 3.8728115
}, {
lat: 43.6403908,
lon: 3.8728037
}, {
lat: 43.6404171,
lon: 3.8727811
}, {
lat: 43.6404509,
lon: 3.8727521
}, {
lat: 43.6405254,
lon: 3.8726882
}, {
lat: 43.6406105,
lon: 3.8726152
}, {
lat: 43.6406788,
lon: 3.8725566
}, {
lat: 43.6410422,
lon: 3.872249
}, {
lat: 43.64135,
lon: 3.8719883
}, {
lat: 43.642044,
lon: 3.8714709
}, {
lat: 43.6437086,
lon: 3.871428
}, {
lat: 43.644055,
lon: 3.8707816
}, {
lat: 43.6442103,
lon: 3.8707709
}, {
lat: 43.6442491,
lon: 3.871251
}, {
lat: 43.6444218,
lon: 3.8719296
}, {
lat: 43.6445905,
lon: 3.8722238
}, {
lat: 43.6449928,
lon: 3.8724144
}, {
lat: 43.6448383,
lon: 3.8730477
}, {
lat: 43.6450055,
lon: 3.8736873
}, {
lat: 43.6451649,
lon: 3.8742833
}, {
lat: 43.6452736,
lon: 3.8747208
}, {
lat: 43.645079,
lon: 3.8759388
}, {
lat: 43.6445036,
lon: 3.8762088
}, {
lat: 43.6444702,
lon: 3.8764339
}, {
lat: 43.6449384,
lon: 3.8768783
}, {
lat: 43.645311,
lon: 3.8776078
}, {
lat: 43.6454601,
lon: 3.8784919
}, {
lat: 43.6456464,
lon: 3.8800797
}, {
lat: 43.6463995,
lon: 3.880408
}, {
lat: 43.6459757,
lon: 3.8819089
}, {
lat: 43.6452344,
lon: 3.8846396
}, {
lat: 43.6438702,
lon: 3.8854748
}, {
lat: 43.6436054,
lon: 3.8860238
}, {
lat: 43.6435149,
lon: 3.8864069
}, {
lat: 43.6430952,
lon: 3.88712
}, {
lat: 43.6418965,
lon: 3.8881757
}, {
lat: 43.6416252,
lon: 3.8891189
}, {
lat: 43.6412956,
lon: 3.8894825
}, {
lat: 43.6411179,
lon: 3.889738
}, {
lat: 43.6410672,
lon: 3.8898555
}, {
lat: 43.6409159,
lon: 3.8899916
}, {
lat: 43.6408148,
lon: 3.8899982
}, {
lat: 43.6406991,
lon: 3.8899835
}, {
lat: 43.6406467,
lon: 3.8899794
}, {
lat: 43.6406573,
lon: 3.8896385
}, {
lat: 43.640664,
lon: 3.8892935
}, {
lat: 43.6406631,
lon: 3.8887262
}, {
lat: 43.6406682,
lon: 3.8877233
}, {
lat: 43.6406175,
lon: 3.88716
}, {
lat: 43.6405578,
lon: 3.8864227
}, {
lat: 43.6404493,
lon: 3.8859464
}, {
lat: 43.6403006,
lon: 3.885396
}, {
lat: 43.6401051,
lon: 3.884543
}, {
lat: 43.6400247,
lon: 3.883883
}, {
lat: 43.6399516,
lon: 3.8834138
}, {
lat: 43.6400882,
lon: 3.883005
}, {
lat: 43.6408523,
lon: 3.8832521
}, {
lat: 43.6401347,
lon: 3.878581
} ];

// Site.js

function parseBrevesZoo(e) {
var t = new Array, n = e.indexOf('<div class="breveListe">'), r = n;
for (var i = 0; i < 5; i++) r = e.indexOf("</div>", r + 6);
var s = document.createElement("div");
s.innerHTML = e.substring(n, r + 6);
var o = s.firstChild;
while (o) {
var u = "";
if (o.nodeType == 1) {
var a = o.firstChild;
while (a) {
if (a.nodeType == 1) {
if (a.nodeName == "H5" && a.hasChildNodes()) var f = a.firstChild.nodeValue.replace(/^\s+/g, "").replace(/\s+$/g, "");
if (a.nodeName == "P" && a.getAttribute("class") == "date") {
if (a.hasChildNodes()) var l = a.firstChild.nodeValue.replace(/^\s+/g, "").replace(/\s+$/g, "").substring(3);
} else if (a.nodeName == "P" && a.hasChildNodes()) {
var c = a.firstChild;
while (c) c.nodeType == 1 ? c.nodeName == "STRONG" ? c.hasChildNodes() && (u += "<strong>" + c.firstChild.nodeValue + "</strong>") : c.nodeName == "A" && c.hasChildNodes() && (u += '<a href="' + c.getAttribute("href") + '">' + c.firstChild.nodeValue + "</a>") : u += c.nodeValue.replace(/"/g, ""), c = c.nextSibling;
}
}
a = a.nextSibling;
}
t.push({
titre: f,
date: l,
texte: u
});
}
o = o.nextSibling;
}
return t;
}

function parseUneZoo(e) {
var t = new Object, n = e.indexOf('<div class="breveAccueilImage">');
n = e.indexOf('src="', n);
var r = n + 5;
r = e.indexOf('"', r);
var i = "http://zoo.montpellier.fr" + e.substring(n + 5, r);
n = e.indexOf("<h5>", r), r = n;
for (var s = 0; s < 2; s++) r = e.indexOf("</div>", r + 6);
var o = document.createElement("div");
o.innerHTML = "<div>" + e.substring(n, r + 6);
var u = o.firstChild;
while (u) {
var a = "";
if (u.nodeType == 1) {
var f = u.firstChild;
while (f) {
if (f.nodeType == 1) {
if (f.nodeName == "H5" && f.hasChildNodes()) {
var l = f.firstChild;
while (l) {
if (l.nodeType == 1) {
if (l.nodeName == "A" && l.hasChildNodes()) var c = l.getAttribute("href"), h = l.firstChild.nodeValue.replace(/^\s+/g, "").replace(/\s+$/g, "");
} else var h = l.nodeValue.replace(/^\s+/g, "").replace(/\s+$/g, "");
l = l.nextSibling;
}
}
if (f.nodeName == "P" && f.hasChildNodes()) {
var l = f.firstChild;
while (l) l.nodeType == 1 ? l.nodeName == "STRONG" ? l.hasChildNodes() && (a += "<strong>" + l.firstChild.nodeValue + "</strong>") : l.nodeName == "A" && l.hasChildNodes() && (a += '<a href="' + l.getAttribute("href") + '">' + l.firstChild.nodeValue + "</a>") : a += l.nodeValue.replace(/"/g, ""), l = l.nextSibling;
}
}
f = f.nextSibling;
}
t = {
titre: h,
lien: c,
image: i,
texte: a
};
}
u = u.nextSibling;
}
return t;
}

// App.js

enyo.kind({
name: "App",
classes: "onyx",
published: {
map: !1
},
components: [ {
kind: "WebService",
name: "data",
url: "http://zoo.cyrilmoral.es/data.asp",
onResponse: "dataResponse",
onError: "dataError"
}, {
kind: "FittableRows",
classes: "enyo-fit",
components: [ {
kind: "Panels",
name: "mainPanels",
classes: "panels enyo-fit",
fit: !0,
realtimeFit: !1,
arrangerKind: "CollapsingArranger",
onTransitionFinish: "updateMap",
components: [ {
kind: "MenuPanel",
name: "menu",
classes: "menu-panel"
}, {
kind: "Panels",
name: "contentPanels",
classes: "panels enyo-fit",
arrangerKind: "CardArranger",
draggable: !1,
components: [ {
kind: "MapPanel",
name: "map",
onLoaded: "mapLoaded"
}, {
kind: "Panels",
name: "cardPanels",
classes: "panels enyo-fit",
arrangerKind: "CardArranger",
draggable: !1,
components: [ {
kind: "CardPanel",
name: "card"
}, {
kind: "ImagePanel",
name: "image"
} ]
} ]
} ]
} ]
}, {
kind: "onyx.Popup",
name: "errorPopup",
centered: !0,
modal: !1,
floating: !0,
scrim: !0,
classes: "popup-light",
components: [ {
content: "Impossible d'\u00e9tablir la connexion avec la base de donn\u00e9es.",
classes: "item-secondary",
style: "color: red;"
} ]
} ],
create: function() {
this.inherited(arguments), enyo.zoo = new Object, enyo.zoo.param = {
image: "http://www.palmsnipe.cat/wp7/img/large/"
};
},
rendered: function() {
this.inherited(arguments);
},
updateMap: function(e, t) {
t.originator.name == "mainPanels" && e.getControls()[t.toIndex].name == "contentPanels" && this.map == 1 ? this.$.map.$.map.invalidateSize(!0) : t.originator.name == "menuPanels" && t.originator.parent.container.$.menuGroupButton.getControls()[t.toIndex].setActive(!0);
},
mapLoaded: function() {
this.map = !0;
if (enyo.ville) {
uniTouch !== undefined && (document.addEventListener("pinchzoomin", function(e) {
enyo.$.app.$.map.map.zoomIn();
}), document.addEventListener("pinchzoomout", function(e) {
enyo.$.app.$.map.map.zoomOut();
})), this.$.map.map.touchZoom.enable();
function e(e) {
return !1;
}
document.onclick = e, this.$.menu.linkDisabled = !0;
}
this.$.data.send();
},
dataResponse: function(e, t) {
this.createData(t.data), this.$.map.drawMap(), this.$.menu.setAnimalList();
},
createData: function(e) {
function t(e) {
var t = [], n = [];
for (var r = 0; r < e.length; r++) {
var n = e[r].polygone.replace(/\], \[/gi, ",").replace(/, /gi, " ").replace(/[\]\[]/gi, "").split(","), i = [];
for (pt in n) {
var s = n[pt].split(" ");
i.push({
lat: parseFloat(s[0]),
"long": parseFloat(s[1])
});
}
t.push({
id: e[r].id,
numero: e[r].num,
polygone: i
});
}
return t;
}
function n(e) {
var t = [];
for (var n = 0; n < e.animal.length; n++) {
var r = [];
for (var i = 0; i < e.categorie.length; i++) e.categorie[i].id_animal == e.animal[n].id && r.push(e.categorie[i].id_categorie);
var s = [];
for (var i = 0; i < e.enclos.length; i++) e.enclos[i].id_animal == e.animal[n].id && s.push(e.enclos[i].id_enclos);
var o = [];
for (var i = 0; i < e.image.length; i++) e.image[i].id_animal == e.animal[n].id && o.push(e.image[i].fichier);
var u = [];
for (var i = 0; i < e.zone.length; i++) e.zone[i].id_animal == e.animal[n].id && u.push(e.zone[i].id_zone);
t.push({
id: e.animal[n].id,
classe: e.animal[n].classe,
description: e.animal[n].description,
details: e.animal[n].details_zone,
duree_gestation: e.animal[n].details_duree_gestation,
famille: e.animal[n].famille,
longevite: e.animal[n].longevite,
nb_gestation: e.animal[n].nb_gestation,
nom: e.animal[n].nom,
nom_scientifique: e.animal[n].nom_scientifique,
ordre: e.animal[n].ordre,
poids: e.animal[n].poids,
categorie: r,
enclos: s,
image: o,
zone: u
});
}
return t;
}
function r(e) {
var t = new Object;
for (var n = 0; n < e.length; n++) t[e[n].id] = {
Lat: e[n].Lat,
Long: e[n].Long,
nom: e[n].nom,
texte: e[n].texte,
type: e[n].type
};
return t;
}
function i(e) {
var t = new Object, n = new Object, r = new Object, i = new Object, s = new Object, o = new Object;
for (var u = 0; u < e.categorie.length; u++) t[e.categorie[u].id] = {
texte: e.categorie[u].texte
};
for (var u = 0; u < e.classe.length; u++) n[e.classe[u].id] = {
texte: e.classe[u].texte
};
for (var u = 0; u < e.famille.length; u++) r[e.famille[u].id] = {
texte: e.famille[u].texte
};
for (var u = 0; u < e.ordre.length; u++) i[e.ordre[u].id] = {
texte: e.ordre[u].texte
};
for (var u = 0; u < e.poi.length; u++) s[e.poi[u].id] = {
texte: e.poi[u].texte
};
for (var u = 0; u < e.zone.length; u++) o[e.zone[u].id] = {
texte: e.zone[u].texte
};
var a = {
categorie: t,
classe: n,
famille: r,
ordre: i,
poi: s,
zone: o
};
return a;
}
this.zoo = new Object;
var s = t(e.zoo.enclos), o = e.zoo.enclos_vue, u = n(e.zoo.animaux), a = e.zoo.poi, f = i(e.zoo.texte);
enyo.zoo.animaux = u, enyo.zoo.enclos = s, enyo.zoo.enclos_vue = o, enyo.zoo.poi = a, enyo.zoo.texte = f;
},
dataError: function(e, t) {
this.$.errorPopup.show();
}
});

// Menu.js

enyo.kind({
name: "MenuPanel",
classes: "onyx enyo-unselectable",
events: {
onLoaded: ""
},
components: [ {
kind: "WebService",
name: "site",
url: "http://zoo.cyrilmoral.es/sitezoomtp.asp",
handleAs: "text",
onResponse: "siteResponse",
onError: "siteError"
}, {
kind: "FittableRows",
classes: "enyo-fit",
components: [ {
kind: "onyx.Toolbar",
classes: "menu-header",
components: [ {
kind: "Image",
src: "assets/logo.png",
classes: "menu-header-logo"
} ]
}, {
kind: "onyx.Toolbar",
classes: "menu-group",
layoutKind: "FittableColumnsLayout",
noStretch: !0,
components: [ {
kind: "Group",
name: "menuGroupButton",
classes: "menu-group-menu",
defaultKind: "onyx.Button",
highlander: !0,
components: [ {
kind: "onyx.Button",
active: !0,
classes: "button menu-group-button",
value: 0,
ontap: "gotoMenuPanel",
components: [ {
kind: "onyx.Icon",
classes: "icon",
src: "assets/menu-icon-news.png"
} ]
}, {
kind: "onyx.Button",
classes: "button menu-group-button",
value: 1,
ontap: "gotoMenuPanel",
components: [ {
kind: "onyx.Icon",
classes: "icon",
src: "assets/menu-icon-animals.png"
} ]
}, {
kind: "onyx.Button",
classes: "button menu-group-button",
value: 2,
ontap: "gotoMenuPanel",
components: [ {
kind: "onyx.Icon",
classes: "icon",
src: "assets/menu-icon-info.png"
} ]
} ]
}, {
kind: "onyx.Button",
classes: "button menu-group-button",
value: "map",
ontap: "gotoMapPanel",
components: [ {
kind: "onyx.Icon",
classes: "icon",
src: "assets/menu-icon-map.png"
} ]
} ]
}, {
kind: "Panels",
name: "menuPanels",
fit: !0,
arrangerKind: "CarouselArranger",
wrap: !1,
classes: "menu-panel menu-panels",
components: [ {
kind: "Scroller",
classes: "enyo-fit",
components: [ {
classes: "menu-border",
components: [ {
kind: "onyx.Groupbox",
classes: "menu-news-groupbox",
components: [ {
kind: "onyx.GroupboxHeader",
content: "\u00c0 la une"
}, {
kind: "FittableRows",
components: [ {
kind: "Image",
name: "imageFirstNews",
classes: "menu-news-image-first",
src: ""
}, {
name: "titleFirstNews",
classes: "menu-news-title",
content: ""
}, {
name: "contentFirstNews",
classes: "item-secondary",
content: ""
} ]
} ]
}, {
kind: "Repeater",
name: "newsList",
onSetupItem: "setupNewsItem",
components: [ {
name: "newsDate",
classes: "label menu-news-date",
content: ""
}, {
name: "newsTitle",
classes: "menu-news-title",
content: ""
}, {
name: "newsContent",
classes: "item-secondary",
content: "",
allowHtml: !0
} ]
} ]
} ]
}, {
kind: "FittableRows",
classes: "enyo-fit",
components: [ {
kind: "FittableRows",
classes: "menu-animal-search",
components: [ {
kind: "onyx.InputDecorator",
name: "searchInputContainer",
classes: "menu-animal-search-input",
showing: !0,
components: [ {
kind: "onyx.Input",
style: "width: 100%;",
name: "searchInput",
value: "",
placeholder: "Rechercher",
oninput: "animalSearchInput"
} ]
}, {
kind: "FittableColumns",
name: "searchPickerContainer",
classes: "menu-animal-search-selection",
showing: !0,
components: [ {
content: "Afficher",
classes: "label menu-animal-search-selection-label"
}, {
kind: "onyx.PickerDecorator",
fit: !0,
classes: "menu-animal-search-selection-picker",
components: [ {}, {
kind: "onyx.Picker",
name: "zonePicker",
onSelect: "zoneSelected",
components: [ {
content: "Tous",
active: !0
} ]
} ]
} ]
} ]
}, {
kind: "List",
name: "animalList",
classes: "menu-animal-list",
fit: !0,
multiSelect: !1,
onSetupItem: "setupAnimal",
components: [ {
name: "divider",
classes: "menu-animal-divider"
}, {
name: "animal",
classes: "animal-item",
ontap: "animalTap",
components: [ {
kind: "Image",
src: "assets/logo2.png",
name: "avatar",
classes: "animal-icon"
}, {
classes: "animal-text",
components: [ {
name: "name",
classes: "animal-name",
content: ""
}, {
name: "region",
classes: "item-secondary",
content: ""
} ]
} ]
} ]
} ]
}, {
kind: "Scroller",
classes: "enyo-fit",
thumb: !0,
components: [ {
kind: "FittableRows",
classes: "item-secondary",
components: [ {
kind: "GTS.DividerDrawer",
caption: "Venir au zoo",
classes: "gts-DividerDrawer",
open: !1,
components: [ {
kind: "FittableRows",
classes: "info-content",
components: [ {
content: "Vous \u00eates en voiture",
classes: "info-name"
}, {
content: "Parc zoologique de Montpellier"
}, {
content: "50, avenue Agropolis"
}, {
content: "34090 Montpellier"
}, {
content: "Un parking gratuit est \u00e0 votre disposition devant l'entr\u00e9e du parc zoologique.",
style: "font-weight: bold;"
}, {
tag: "br"
}, {
content: "Vous \u00eates en transports en commun",
classes: "info-name"
}, {
content: 'Depuis l\'arr\u00eat de Tram "Saint-Eloi" (ligne 1), prendre le bus "La Navette" (ligne 13), direction Universit\u00e9s, et descendre devant l\'entr\u00e9e du parc zoologique (arr\u00eat "zoo").'
} ]
} ]
}, {
kind: "GTS.DividerDrawer",
caption: "Les tarifs",
classes: "gts-DividerDrawer",
open: !1,
components: [ {
kind: "FittableRows",
classes: "info-content",
components: [ {
content: "Le parc zoologique est gratuit !",
classes: "info-name"
}, {
content: "Le plan du parc est \u00e0 0,50 \u20ac."
} ]
} ]
}, {
kind: "GTS.DividerDrawer",
caption: "Les horaires",
classes: "gts-DividerDrawer",
open: !1,
components: [ {
kind: "FittableRows",
classes: "info-content",
components: [ {
allowHtml: !0,
content: "<table><tr><th>P\u00e9riodes</th><th>Horaires</th></tr><tr><td>Du d\u00e9but des vacances de P\u00e2ques (toutes zones) jusqu'\u00e0 la fin des vacances de Toussaint</td><td>10h - 18h30</td></tr><tr><td>Apr\u00e8s les vacances de Toussaint jusqu'au d\u00e9but des vacances de P\u00e2ques (toutes zones)</td><td>9h - 17h</td></tr></table>"
} ]
} ]
}, {
kind: "GTS.DividerDrawer",
caption: "Se restaurer",
classes: "gts-DividerDrawer",
open: !1,
components: [ {
kind: "FittableRows",
classes: "info-content",
components: [ {
content: "Le restaurant de la serre amazonienne",
classes: "info-name"
}, {
content: "Le restaurant l'Amazoone s'\u00e9tend sur deux niveaux. Il permet d'avoir une vue panoramique sur l'ensemble de la serre et plus particuli\u00e8rement sur l'enclos des sakis \u00e0 face blanche et des tamarins. Le restaurant a une capacit\u00e9 de 96 places \u00e0 l'int\u00e9rieur et une terrasse ext\u00e9rieure de 80 places. Contact : 04 67 29 88 35"
}, {
content: "Les tables de pique-nique",
classes: "info-name"
}, {
content: "Tout au long de votre parcours dans le parc, vous pourrez profiter de nombreuses tables de pique-nique. Pensez \u00e0 jeter vos d\u00e9chets dans les poubelles et \u00e0 faire le bon tri !"
} ]
} ]
}, {
kind: "GTS.DividerDrawer",
caption: "R\u00e8glement int\u00e9rieur",
classes: "gts-DividerDrawer",
open: !1,
components: [ {
kind: "FittableRows",
classes: "info-content",
components: [ {
content: "Merci de respecter cet espace de nature et le bien-\u00eatre des animaux"
}, {
allowHtml: !0,
content: "<ul><li>Ne pas fumer</li><li>Ne pas nourrir les animaux</li><li>Ne pas pratiquer de sport (tricyles pour les enfants autoris\u00e9s)</li><li>Circuler uniquement \u00e0 pied</li><li>Aucun animal n'est autoris\u00e9 \u00e0 entrer, m\u00eame tenu en laisse</li><li>Ne pas jeter vos d\u00e9chets \u00e0 terre</li><li>Ne pas jeter de projectiles sur les animaux</li><li>Rester calme devant les enclos</li><li>Ne pas cueillir la v\u00e9g\u00e9tation</li></ul>"
}, {
content: "Les enfants des groupes scolaires et centres de vacances ou de loisirs doivent imp\u00e9rativement \u00eatre sous surveillance de leurs accompagnateurs et respecter le pr\u00e9c\u00e9dent r\u00e8glement."
} ]
} ]
}, {
kind: "GTS.DividerDrawer",
caption: "Acc\u00e8s handicap\u00e9s",
classes: "gts-DividerDrawer",
open: !1,
components: [ {
kind: "FittableRows",
classes: "info-content",
components: [ {
content: "Le parc zoologique",
classes: "info-name"
}, {
allowHtml: !0,
content: "Il est accessible \u00e0 moins de 70%. Certaines zones, notamment celles des ours et des lions, sont difficiles d'acc\u00e8s (pente forte).<br />Nous vous proposons ce parcours afin que votre visite soit le plus agr\u00e9able possible.<br />Notez que les zones plates ne sont pas lisses dans tout le parc. Des am\u00e9liorations sont pr\u00e9vues."
}, {
content: "La serre amazonienne",
classes: "info-name"
}, {
allowHtml: !0,
content: "Elle est totalement \u00e9quip\u00e9e et accessible \u00e0 100%."
} ]
} ]
} ]
} ]
} ]
}, {
kind: "onyx.Toolbar",
layoutKind: "FittableColumnsLayout",
components: [ {
classes: "menu-toolbar-about",
fit: !0,
components: [ {
kind: "onyx.Button",
classes: "button",
content: "Cr\u00e9dits",
ontap: "showPopup",
popup: "aboutPopup"
} ]
} ]
} ]
}, {
kind: "onyx.Popup",
name: "selectPopup",
centered: !1,
modal: !1,
floating: !0,
scrim: !1,
classes: "popup-light select-popup",
components: [ {
content: "coucou"
} ]
}, {
kind: "onyx.Popup",
name: "aboutPopup",
centered: !0,
modal: !0,
floating: !0,
scrim: !0,
classes: "popup-light about-popup",
components: [ {
content: "D\u00e9velopp\u00e9 par Cyril Morales",
classes: "item-secondary"
}, {
kind: "onyx.Groupbox",
classes: "about-popup-groupbox",
components: [ {
kind: "FittableColumns",
fit: !0,
value: "http://twitter.com/cyrilmorales",
ontap: "openLink",
components: [ {
content: "Twitter",
classes: "label",
fit: !0
}, {
content: "@cyrilmorales"
} ]
}, {
kind: "FittableColumns",
fit: !0,
value: "http://cyrilmoral.es",
ontap: "openLink",
components: [ {
content: "Site web",
classes: "label",
fit: !0
}, {
content: "cyrilmoral.es"
} ]
} ]
}, {
content: "En collaboration avec la ville de Montpellier",
classes: "item-secondary"
}, {
kind: "Image",
src: "assets/montpellier.png",
style: "width: 200px; height: 67px;"
} ]
} ],
create: function() {
this.inherited(arguments), enyo.ville ? (this.$.searchInputContainer.hide(), this.$.searchPickerContainer.show()) : (this.$.searchInputContainer.show(), this.$.searchPickerContainer.hide()), this.$.site.send();
},
gotoMenuPanel: function(e, t) {
e.value != "map" ? this.$.menuPanels.setIndex(e.value) : (this.owner.$.contentPanels.setIndex(0), enyo.Panels.isScreenNarrow() && this.parent.setIndex(this.parent.index ? 0 : 1));
},
gotoMapPanel: function(e, t) {
this.owner.$.contentPanels.setIndex(0), enyo.Panels.isScreenNarrow() && this.parent.setIndex(this.parent.index ? 0 : 1);
},
siteResponse: function(e, t) {
this.feeds = parseBrevesZoo(t.data);
var n = parseUneZoo(t.data);
this.$.imageFirstNews.setSrc(n.image), this.$.titleFirstNews.setContent(n.titre), this.$.contentFirstNews.setContent(n.texte), this.$.newsList.setCount(this.feeds.length > 4 ? 4 : this.feeds.length);
},
siteError: function(e, t) {
console.log("ajax site error");
},
setupAnimal: function(e, t) {
var n = t.index, r = this.filter ? this.filtered : this.animals, i = r[n], s = "";
for (var o = 0; o < i.zone.length; o++) s += o ? " / " : "", s += enyo.zoo.texte.zone[i.zone[o]].texte;
this.$.name.setContent(i.nom), this.$.region.setContent(s), i.image.length > 0 ? this.$.avatar.setSrc(enyo.zoo.param.image + i.image[0]) : this.$.avatar.setSrc("assets/logo2.png");
var u = i.nom[0], a = r[n - 1], f = u != (a && a.nom[0]);
this.$.divider.setContent(u), this.$.divider.canGenerate = f, this.$.animal.applyStyle("border-top", f ? "none" : null);
},
animalSearchInput: function(e) {
enyo.job(this.id + ":search", enyo.bind(this, "filterAnimalList", e.getValue()), 200);
},
filterAnimalList: function(e) {
e != this.filter && (this.filter = e, this.filtered = this.generateFilteredData(e), this.$.animalList.setCount(this.filtered.length), this.$.animalList.reset());
},
generateFilteredData: function(e) {
function t(e) {
var t = e.replace(/[\u00e0\u00e2\u00e4]/gi, "a");
return t = t.replace(/[\u00e9\u00e8\u00ea\u00eb]/gi, "e"), t = t.replace(/[\u00ee\u00ef]/gi, "i"), t = t.replace(/[\u00f4\u00f6]/gi, "o"), t = t.replace(/[\u00f9\u00fb\u00fc]/gi, "u"), t;
}
function n(e, n, r) {
for (var i = 0; i < n.zone.length; i++) if (t(e[n.zone[i]].texte).match(r)) return !0;
return !1;
}
var r = new RegExp("^" + t(e), "i"), i = [];
for (var s = 0, o; o = this.animals[s]; s++) (o.nom.match(r) || enyo.zoo.texte.classe[o.classe].texte.match(r) || n(enyo.zoo.texte.zone, o, r)) && i.push(o);
return i;
},
sortAnimals: function() {
this.animals.sort(function(e, t) {
return e.nom < t.nom ? -1 : e.nom > t.nom ? 1 : 0;
});
},
setAnimalList: function() {
var e = [];
for (var t in enyo.zoo.texte.zone) e.push({
content: enyo.zoo.texte.zone[t].texte
});
this.$.zonePicker.createComponents(e, {
owner: this
}), this.animals = enyo.zoo.animaux, this.sortAnimals(), this.$.animalList.setCount(this.animals.length), this.$.animalList.reset();
},
animalTap: function(e, t) {
var n = this.filter ? this.filtered : this.animals;
this.owner.$.image.updateImage(n[t.index]), this.owner.$.card.updateCard(n[t.index]), this.owner.$.card.setBack(this), enyo.Panels.isScreenNarrow() && this.owner.$.mainPanels.setIndex(this.parent.index ? 0 : 1), this.owner.$.card.show();
},
showPopup: function(e, t) {
var n = this.$[e.popup];
n && n.show();
},
openLink: function(e, t) {
this.linkDisabled || window.open(e.value, "_blank");
},
setupNewsItem: function(e, t) {
var n = t.index, r = this.feeds, i = r[n], s = t.item, o = [ "Janvier", "F\u00e9vrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "D\u00e9cembre" ], u = i.date.split("/");
if (s) return s.$.newsDate.setContent(u[0] + " " + o[parseInt(u[1], 10) - 1] + " " + u[2]), s.$.newsTitle.setContent(i.titre), s.$.newsContent.setContent(i.texte), !0;
},
zoneSelected: function(e, t) {
var n = "Tous" == t.selected.content ? "" : t.selected.content;
this.$.searchInput.setValue(n), this.animalSearchInput(this.$.searchInput);
}
});

// Map.js

enyo.kind({
name: "MapPanel",
classes: "wide enyo-unselectable",
events: {
onLoaded: ""
},
handlers: {
onresize: "resized"
},
components: [ {
kind: "FittableRows",
classes: "enyo-fit",
components: [ {
kind: "Map",
name: "map",
layer: "bing",
bingCredentials: "AqwmKr40FdqD4Ntpo_ik3UOKXqG4uT5niPKJDhXkdNJhDqvwyscuJtWhZ72QVWAI",
fit: !0,
onLoaded: "setMap"
}, {
kind: "onyx.Toolbar",
layoutKind: "FittableColumnsLayout",
noStretch: !0,
components: [ {
kind: "onyx.Grabber",
name: "grab",
ontap: "grabMap"
}, {
kind: "onyx.Button",
name: "menu",
content: "Menu",
classes: "button",
ontap: "grabMap",
showing: !1
}, {
classes: "map-toolbar-group-button",
fit: !0,
components: [ {
kind: "onyx.Button",
classes: "button map-toolbar-zoom-button",
ontap: "btnZoomOut",
components: [ {
kind: "onyx.Icon",
classes: "icon",
src: "assets/menu-icon-less.png"
} ]
}, {
kind: "onyx.Button",
classes: "button map-toolbar-zoom-button",
ontap: "btnZoomIn",
components: [ {
kind: "onyx.Icon",
classes: "icon",
src: "assets/menu-icon-more.png"
} ]
} ]
}, {
kind: "onyx.Button",
classes: "button",
content: "Options",
ontap: "showPopup",
popup: "optionsPopup"
} ]
} ]
}, {
kind: "onyx.Popup",
name: "optionsPopup",
modal: !1,
floating: !0,
classes: "enyo-unselectable popup-light map-options-popup",
components: [ {
kind: "FittableColumns",
fit: !0,
components: [ {
content: "Popup centr\u00e9e",
classes: "label map-options-label",
fit: !0
}, {
kind: "onyx.Checkbox",
name: "centeredCheckbox",
classes: "checkbox",
checked: !1,
onchange: "popupCenteredChanged",
disabled: !0
} ]
}, {
kind: "FittableColumns",
fit: !0,
components: [ {
content: "Points d'int\u00e9r\u00eat",
classes: "label map-options-label",
fit: !0
}, {
kind: "onyx.ToggleButton",
name: "poiButton",
classes: "map-options-toggle-button",
onChange: "poiChanged",
onContent: "Oui",
offContent: "Non",
value: !0,
disabled: !0
} ]
}, {
kind: "FittableColumns",
fit: !0,
components: [ {
content: "Parcours",
classes: "label map-options-label",
fit: !0
}, {
kind: "onyx.ToggleButton",
name: "parcoursButton",
classes: "map-options-toggle-button",
onChange: "wayChanged",
onContent: "Oui",
offContent: "Non",
value: !0,
disabled: !0
} ]
}, {
kind: "FittableColumns",
fit: !0,
components: [ {
content: "Carte",
classes: "label map-options-map-label",
fit: !0
}, {
kind: "onyx.PickerDecorator",
components: [ {
classes: "map-options-map-picker"
}, {
kind: "onyx.Picker",
name: "mapPicker",
onSelect: "mapSelected",
components: [ {
content: "OpenStreetMap",
value: "osm"
}, {
content: "CloudMade",
value: "cloudmade"
}, {
content: "WaterColor",
value: "watercolor"
}, {
content: "Bing Maps",
value: "bing",
active: !0
} ]
} ]
} ]
} ]
}, {
kind: "onyx.Popup",
name: "legendPopup",
modal: !1,
floating: !0,
classes: "enyo-unselectable popup-light map-legend-popup",
components: [ {
content: "L\u00e9gende des parcours",
classes: "map-legend-popup-title"
}, {
kind: "Scroller",
name: "scroller",
classes: "map-legend-popup-list",
strategyKind: "TouchScrollStrategy",
components: [ {
kind: "Repeater",
name: "legendList",
onSetupItem: "setupLegendItem",
components: [ {
name: "item",
classes: "map-legend-popup-item",
onclick: "animalTap",
components: [ {
name: "color",
classes: "map-legend-popup-color"
}, {
name: "parcours",
content: "",
classes: "map-legend-popup-text"
} ]
} ]
} ]
} ]
}, {
kind: "AnimalPopup",
name: "animalPopup"
}, {
kind: "PoiPopup",
name: "poiPopup"
} ],
create: function() {
this.inherited(arguments), this.resized();
var e = this.$.mapPicker.components, t = 0;
while (t < e.length && e[t].active != 1) t++;
this.currentLayer = e[t].value;
},
resized: function() {
this.$.grab.setShowing(!enyo.Panels.isScreenNarrow()), this.$.menu.setShowing(enyo.Panels.isScreenNarrow());
},
grabMap: function() {
enyo.$.app.$.mainPanels.setIndex(enyo.$.app.$.mainPanels.index ? 0 : 1);
},
btnZoomOut: function() {
this.$.map.zoomOut();
},
btnZoomIn: function() {
this.$.map.zoomIn();
},
setMap: function() {
this.map = this.$.map.getMap();
var e = new L.LatLngBounds(new L.LatLng(43.634212, 3.860836), new L.LatLng(43.650733, 3.896198));
this.$.map.setMaxBounds(e), this.drawZoo(), this.drawParcours();
},
showPopup: function(e, t) {
var n = this.$[e.popup];
n && n.show();
},
showLegend: function(e) {
var t = this.$.legendPopup;
t && t.show();
},
mapSelected: function(e, t) {
var n = this.$.map.getMapsLayer();
this.$.map.addLayer(n[t.selected.value]), this.$.map.removeLayer(n[this.currentLayer]), this.currentLayer = t.selected.value;
},
wayChanged: function(e, t) {
e.getValue() == 1 ? this.$.map.addLayer(this.parcoursGroup) : this.$.map.removeLayer(this.parcoursGroup);
},
poiChanged: function(e, t) {
e.getValue() == 1 ? this.$.map.addLayer(this.poiGroup) : this.$.map.removeLayer(this.poiGroup);
},
popupCenteredChanged: function(e, t) {
this.$.animalPopup.setCentered(e.getValue()), this.$.poiPopup.setCentered(e.getValue());
},
drawMap: function() {
this.drawEnclos(), this.drawPointsDeVue(), this.drawPoi();
},
drawZoo: function() {
var e = new Array;
for (var t = 0; t < limiteZoo.length; t++) e.push(new L.LatLng(limiteZoo[t].lat, limiteZoo[t].lon));
var n = new L.Polygon(e, {
fillColor: "brown",
stroke: !0,
color: "black",
opacity: .8,
weight: 5,
fillOpacity: 0,
clickable: !1
});
this.$.map.addLayer(n);
},
drawEnclos: function() {
for (var e = 0; e < enyo.zoo.enclos.length; e++) {
var t = new Array;
for (var n = 0; n < enyo.zoo.enclos[e].polygone.length; n++) t.push(new L.LatLng(enyo.zoo.enclos[e].polygone[n].lat, enyo.zoo.enclos[e].polygone[n].long));
var r = new L.Polygon(t, {
fillColor: "brown",
stroke: !0,
color: "brown",
opacity: .6,
weight: 5,
fillOpacity: .2
});
r._leaflet_id = "enclos" + enyo.zoo.enclos[e].id, this.$.map.addLayer(r), function(e, t, n) {
r.on("click", function(r) {
e.$.animalPopup.setPopup(t, n), e.$.animalPopup.show(r);
});
}(this, enyo.zoo, e);
}
},
drawParcours: function() {
this.parcoursGroup = new L.LayerGroup, this.$.map.addLayer(this.parcoursGroup);
var e = [];
for (var t = 0; t < parcours.length; t++) {
var n = [];
for (var r = 0; r < parcours[t].length; r++) n.push(new L.LatLng(parcours[t][r].lat, parcours[t][r].lon));
e.push(n);
var i = new L.MultiPolyline(e, {
color: "green",
weight: 3,
clickable: !1,
opacity: .8
});
this.parcoursGroup.addLayer(i);
}
this.$.parcoursButton.setDisabled(!1);
},
drawPointsDeVue: function() {
var e = enyo.zoo.enclos_vue;
this.pointsDeVueGroup = new L.LayerGroup, this.$.map.addLayer(this.pointsDeVueGroup);
for (var t = 0; t < e.length; t++) {
var n = new L.Circle(new L.LatLng(e[t].lat, e[t].long), 2, {
fillColor: "red",
stroke: !1,
fillOpacity: 1,
clickable: !1
});
this.pointsDeVueGroup.addLayer(n);
}
},
drawPoi: function() {
this.poiGroup = new L.LayerGroup;
var e = enyo.zoo.poi, t = enyo.zoo.texte.poi, n = L.Icon.extend({
options: {
shadowUrl: null,
iconSize: new L.Point(32, 37),
className: "map-icon"
}
}), r = {
"default": new n({
iconUrl: "assets/default.png"
}),
secours: new n({
iconUrl: "assets/firstaid.png"
}),
eau: new n({
iconUrl: "assets/drinkingfountain.png"
}),
wc: new n({
iconUrl: "assets/toilets.png"
}),
jeu: new n({
iconUrl: "assets/playground.png"
}),
parking: new n({
iconUrl: "assets/car.png"
}),
tour: new n({
iconUrl: "assets/tower.png"
}),
zoo: new n({
iconUrl: "assets/zoo.png"
}),
serre: new n({
iconUrl: "assets/frog-2.png"
}),
picnic: new n({
iconUrl: "assets/picnic-2.png"
})
};
this.$.map.addLayer(this.poiGroup);
for (var i = 0; i < e.length; i++) {
var s = new L.Marker(new L.LatLng(e[i].lat, e[i].long), {
icon: t[e[i].type].texte in r ? r[t[e[i].type].texte] : r["default"]
});
this.poiGroup.addLayer(s), function(e, t) {
s.on("click", function(n) {
e.$.poiPopup.setPopup(e.zoo, t), e.$.poiPopup.show(n);
});
}(this, i);
}
this.$.poiButton.setDisabled(!1);
},
setupLegendItem: function(e, t) {
var n = t.index, r = this.zoo.parcours, i = r[n], s = t.item;
if (s) return s.$.parcours.setContent(i.nom), s.$.color.applyStyle("background-color", i.couleur), !0;
},
sortLegend: function() {
this.zoo.parcours.sort(function(e, t) {
return e.nom < t.nom ? -1 : e.nom > t.nom ? 1 : 0;
});
},
clearEnclosStyle: function() {
var e = {
fillColor: "brown",
stroke: !0,
color: "brown",
opacity: .6,
weight: 5,
fillOpacity: .2
};
for (var t = 0; t < enyo.zoo.animaux.length; t++) for (var n = 0; n < enyo.zoo.animaux[t].enclos.length; n++) ;
}
});

// Card.js

enyo.kind({
name: "CardPanel",
classes: "onyx wide enyo-unselectable",
kind: "FittableRows",
components: [ {
kind: "onyx.Toolbar",
components: [ {
name: "nom",
content: "Animal"
} ]
}, {
kind: "Scroller",
name: "scroller",
fit: !0,
components: [ {
classes: "card-border",
components: [ {
kind: "Scroller",
name: "imageScroller",
vertical: "hidden",
components: [ {
kind: "Repeater",
name: "list",
onSetupItem: "setupItem",
classes: "card-images-container",
showing: !0,
components: [ {
kind: "Image",
name: "image",
classes: "card-image",
ontap: "showImages"
} ]
} ]
}, {
name: "description",
classes: "card-description",
content: "",
allowHtml: !0
}, {
kind: "onyx.Groupbox",
classes: "card-groupbox-details",
components: [ {
kind: "onyx.GroupboxHeader",
content: "D\u00e9tails"
}, {
kind: "FittableColumns",
fit: !0,
components: [ {
content: "Nom scientifique",
classes: "label",
fit: !0
}, {
name: "sciName",
content: ""
} ]
}, {
kind: "FittableColumns",
fit: !0,
components: [ {
content: "Classe",
classes: "label",
fit: !0
}, {
name: "class",
content: ""
} ]
}, {
kind: "FittableColumns",
fit: !0,
components: [ {
content: "Cat\u00e9gorie",
classes: "label",
fit: !0
}, {
name: "category",
content: ""
} ]
}, {
kind: "FittableColumns",
fit: !0,
components: [ {
content: "Ordre",
classes: "label",
fit: !0
}, {
name: "ordre",
content: ""
} ]
}, {
kind: "FittableColumns",
fit: !0,
components: [ {
content: "Long\u00e9vit\u00e9",
classes: "label",
fit: !0
}, {
name: "longevite",
content: ""
} ]
}, {
kind: "FittableColumns",
fit: !0,
components: [ {
content: "Gestation",
classes: "label",
fit: !0
}, {
name: "gestation",
content: ""
} ]
}, {
kind: "FittableColumns",
fit: !0,
components: [ {
content: "Poids",
classes: "label",
fit: !0
}, {
name: "poids",
content: ""
} ]
}, {
kind: "FittableColumns",
fit: !0,
components: [ {
content: "Zones",
classes: "label",
fit: !0
}, {
name: "zones",
content: ""
} ]
}, {
kind: "FittableColumns",
fit: !0,
components: [ {
content: "Lieux",
classes: "label",
fit: !0
}, {
name: "lieux",
content: ""
} ]
} ]
} ]
} ]
}, {
kind: "onyx.Toolbar",
classes: "enyo-unselectable",
layoutKind: "FittableColumnsLayout",
components: [ {
classes: "card-toolbar",
components: [ {
kind: "onyx.Button",
content: "Retour",
classes: "button",
ontap: "hide"
}, {
kind: "onyx.Button",
content: "Enclos",
classes: "button",
ontap: "showEnclos"
} ]
} ]
} ],
create: function() {
this.inherited(arguments);
},
updateCard: function(e) {
this.$.scroller.scrollToTop(), this.owner.$.map.clearEnclosStyle();
var t = this.owner.zoo;
this.animal = e, this.$.nom.setContent(e.nom);
var n = "";
for (var r = 0; r < e.categorie.length; r++) n += r ? ", " : "", n += enyo.zoo.texte.categorie[e.categorie[r]].texte;
var i = "";
for (var r = 0; r < e.zone.length; r++) i += r ? ", " : "", i += enyo.zoo.texte.zone[e.zone[r]].texte;
e.image.length > 0 ? this.$.list.show() : this.$.list.hide(), this.$.list.setCount(e.image.length), this.$.description.setContent(e.description), this.$.sciName.setContent(e.nom_scientifique), this.$.class.setContent(enyo.zoo.texte.classe[e.classe].texte), this.$.category.setContent(n), this.$.ordre.setContent(enyo.zoo.texte.ordre[e.ordre].texte), this.$.longevite.setContent(e.longevite), this.$.gestation.setContent(e.duree_gestation), this.$.poids.setContent(e.poids), this.$.zones.setContent(i), this.$.lieux.setContent(e.details), this.owner.$.image.updateImage(e);
},
setBack: function(e) {
this.origin = e;
},
show: function() {
this.owner.$.contentPanels.setIndex(1);
},
hide: function() {
enyo.Panels.isScreenNarrow() && this.origin.name == "menu" ? this.owner.$.mainPanels.setIndex(0) : this.owner.$.contentPanels.setIndex(0);
},
showEnclos: function(e, t) {
var n = this.owner.zoo, r = this.owner.$.map.map, i = {
fillColor: "purple",
stroke: !0,
color: "pink",
opacity: 1,
weight: 5,
fillOpacity: 1
};
for (var s = 0; s < this.animal.enclos.length; s++) r._layers["enclos" + this.animal.enclos[s]].setStyle(i);
this.owner.$.contentPanels.setIndex(0);
},
showImages: function(e, t) {
this.owner.$.cardPanels.setIndex(1);
},
setupItem: function(e, t) {
var n = t.index, r = this.animal.image, i = r[n], s = t.item;
if (s) return s.$.image.setSrc(enyo.zoo.param.image + i), !0;
}
});

// Image.js

enyo.kind({
name: "ImagePanel",
classes: "onyx enyo-unselectable image-body",
kind: "FittableRows",
components: [ {
kind: "onyx.Toolbar",
name: "header",
showing: !0,
components: [ {
name: "nom",
content: "Images"
} ]
}, {
name: "carousel",
kind: "ImageCarousel",
fit: !0
}, {
kind: "onyx.Toolbar",
name: "footer",
classes: "enyo-unselectable",
layoutKind: "FittableColumnsLayout",
showing: !0,
components: [ {
classes: "image-toolbar",
components: [ {
kind: "onyx.Button",
content: "Retour fiche",
classes: "button",
ontap: "showCard"
} ]
} ]
} ],
create: function() {
this.inherited(arguments);
},
rendered: function() {
this.inherited(arguments);
},
showCard: function(e, t) {
this.owner.$.cardPanels.setIndex(0);
},
updateImage: function(e) {
var t = enyo.zoo;
this.animal = e;
var n = [];
for (var r = 0; r < e.image.length; r++) n.push(enyo.zoo.param.image + e.image[r]);
this.$.carousel.setImages(n), this.$.nom.setContent(e.nom);
},
showFullScreen: function(e, t) {}
});

// PoiPopup.js

enyo.kind({
name: "PoiPopup",
components: [ {
kind: "onyx.Popup",
name: "popup",
modal: !1,
centered: !1,
floating: !0,
scrim: !1,
classes: "enyo-unselectable map-popup",
components: [ {
classes: "popup-light",
name: "container",
components: [ {
name: "title",
content: "Poi"
}, {
kind: "Image",
name: "image",
src: "",
showing: !1
}, {
name: "text",
content: "",
className: "item-secondary",
showing: !1
} ]
}, {
classes: "popup-tip-container",
name: "tip",
showing: !0,
components: [ {
classes: "popup-light-tip"
} ]
} ]
} ],
handlers: {
ondragstart: "drag"
},
drag: function(e, t) {
return !0;
},
rendered: function() {
this.inherited(arguments), this.$.popup.removeClass("onyx-popup");
},
setPopup: function(e, t) {
this.$.title.setContent(enyo.zoo.poi[t].nom);
},
show: function(e) {
var t = this.$.popup;
t.show();
if (!t.centered) {
var n = this.owner.owner.$.mainPanels.index ? 0 : this.owner.owner.$.menu.getBounds().width, r = e.target._map;
if (!e.target._icon) var i = r.layerPointToContainerPoint(e.layerPoint); else {
var i = r.layerPointToContainerPoint(r.latLngToLayerPoint(e.target._latlng));
i.x += n;
}
var s = {
top: parseInt(t.getComputedStyleValue("margin-top").replace(/px/g, "")),
right: parseInt(t.getComputedStyleValue("margin-right").replace(/px/g, "")),
left: parseInt(t.getComputedStyleValue("margin-left").replace(/px/g, "")),
bottom: parseInt(t.getComputedStyleValue("margin-bottom").replace(/px/g, ""))
}, o = {
top: parseInt(t.getComputedStyleValue("padding-top").replace(/px/g, "")),
right: parseInt(t.getComputedStyleValue("padding-right").replace(/px/g, "")),
left: parseInt(t.getComputedStyleValue("padding-left").replace(/px/g, "")),
bottom: parseInt(t.getComputedStyleValue("padding-bottom").replace(/px/g, ""))
}, u = t.getBounds(), a = u.width + o.left + o.right + s.left + s.right, f = u.height + o.top + o.bottom + s.top + s.bottom, l = {
x: 0,
y: 0
};
i.y < f && (l.y = f - i.y);
var c = this.parent.$.map.getBounds().width;
i.x < a / 2 + n && (l.x = a / 2 + n - i.x), c + n < a / 2 + i.x && (l.x = -(a / 2 + i.x - (c + n))), t.setBounds({
left: i.x - a / 2 + l.x,
top: i.y - f + l.y
}, "px"), l.y *= -1, l.x *= -1, r.panBy(l);
}
},
setCentered: function(e) {
this.$.popup.setProperty("scrim", e), this.$.popup.setProperty("centered", e), this.$.tip.setShowing(!e);
}
});

// AnimalPopup.js

enyo.kind({
name: "AnimalPopup",
components: [ {
kind: "onyx.Popup",
name: "popup",
modal: !1,
centered: !1,
floating: !0,
scrim: !1,
classes: "enyo-unselectable map-animal-popup",
components: [ {
classes: "popup-light",
components: [ {
name: "title",
classes: "map-animal-popup-title",
content: "Enclos"
}, {
kind: "onyx.Groupbox",
name: "noAnimal",
classes: "map-animal-popup-groupbox",
showing: !1,
components: [ {
content: "Enclos vide.",
classes: "map-animal-popup-empty"
} ]
}, {
kind: "onyx.Groupbox",
name: "groupbox",
classes: "map-animal-popup-groupbox",
showing: !0,
components: [ {
kind: "Scroller",
name: "scroller",
classes: "map-animal-popup-list",
components: [ {
kind: "Repeater",
name: "list",
onSetupItem: "setupItem",
components: [ {
name: "item",
classes: "animal-item",
onclick: "animalTap",
components: [ {
kind: "Image",
src: "",
name: "icon",
classes: "animal-icon"
}, {
classes: "animal-text",
components: [ {
name: "name",
classes: "animal-name",
content: ""
}, {
name: "region",
classes: "item-secondary",
content: ""
} ]
} ]
} ]
} ]
} ]
} ]
}, {
classes: "popup-tip-container",
name: "tip",
showing: !0,
components: [ {
classes: "popup-light-tip"
} ]
} ]
} ],
handlers: {
ondragstart: "drag"
},
drag: function(e, t) {
return !0;
},
create: function() {
this.inherited(arguments);
},
rendered: function() {
this.inherited(arguments), this.$.popup.removeClass("onyx-popup"), this.parent.$.centeredCheckbox.setValue(this.$.popup.centered), this.parent.$.centeredCheckbox.setDisabled(!1);
},
setPopup: function(e, t) {
this.$.title.setContent("Enclos " + enyo.zoo.enclos[t].numero), this.animals = this.getAnimals(enyo.zoo.animaux, enyo.zoo.enclos[t].id), this.sortAnimals(), this.$.list.setCount(this.animals.length), this.$.noAnimal.setShowing(this.animals.length ? !1 : !0), this.$.groupbox.setShowing(this.animals.length ? !0 : !1), this.animals.length > 0 && this.$.list.getControls()[0].$.item.applyStyle("border-top", "none");
},
getAnimals: function(e, t) {
var n = [];
for (var r = 0; r < e.length; r++) for (var i = 0; i < e[r].enclos.length; i++) e[r].enclos[i] == t && n.push(e[r]);
return n;
},
setupItem: function(e, t) {
var n = t.index, r = this.animals, i = r[n], s = t.item;
if (s) {
s.$.name.setContent(i.nom);
var o = "";
for (var n = 0; n < i.zone.length; n++) o += n ? " / " : "", o += enyo.zoo.texte.zone[i.zone[n]].texte;
return s.$.region.setContent(o), i.image.length > 0 ? s.$.icon.setSrc(enyo.zoo.param.image + i.image[0]) : s.$.icon.setSrc("assets/logo2.png"), !0;
}
},
sortAnimals: function() {
this.animals.sort(function(e, t) {
return e.nom < t.nom ? -1 : e.nom > t.nom ? 1 : 0;
});
},
animalTap: function(e, t) {
this.$.popup.hide(), this.owner.owner.$.image.updateImage(this.animals[t.index]), this.owner.owner.$.card.updateCard(this.animals[t.index]), this.owner.owner.$.card.setBack(this.parent), this.owner.owner.$.card.show();
},
show: function(e) {
var t = this.$.popup;
t.show();
if (!t.centered) {
var n = this.owner.owner.$.mainPanels.index ? 0 : this.owner.owner.$.menu.getBounds().width, r = e.target._map;
if (!e.target._icon) var i = r.layerPointToContainerPoint(e.layerPoint); else {
var i = r.latLngToLayerPoint(e.target._latlng);
i.x += n;
}
var s = {
top: parseInt(t.getComputedStyleValue("margin-top").replace(/px/g, "")),
right: parseInt(t.getComputedStyleValue("margin-right").replace(/px/g, "")),
left: parseInt(t.getComputedStyleValue("margin-left").replace(/px/g, "")),
bottom: parseInt(t.getComputedStyleValue("margin-bottom").replace(/px/g, ""))
}, o = {
top: parseInt(t.getComputedStyleValue("padding-top").replace(/px/g, "")),
right: parseInt(t.getComputedStyleValue("padding-right").replace(/px/g, "")),
left: parseInt(t.getComputedStyleValue("padding-left").replace(/px/g, "")),
bottom: parseInt(t.getComputedStyleValue("padding-bottom").replace(/px/g, ""))
}, u = t.getBounds(), a = u.width + o.left + o.right + s.left + s.right, f = u.height + o.top + o.bottom + s.top + s.bottom, l = {
x: 0,
y: 0
};
i.y < f && (l.y = f - i.y);
var c = this.parent.$.map.getBounds().width;
i.x < a / 2 + n && (l.x = a / 2 + n - i.x), c + n < a / 2 + i.x && (l.x = -(a / 2 + i.x - (c + n))), t.setBounds({
left: i.x - a / 2 + l.x,
top: i.y - f + l.y
}, "px"), l.y *= -1, l.x *= -1, r.panBy(l);
}
},
setCentered: function(e) {
this.$.popup.setProperty("scrim", e), this.$.popup.setProperty("centered", e), this.$.tip.setShowing(!e);
}
});
