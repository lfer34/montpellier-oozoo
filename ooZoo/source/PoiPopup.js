/*
 * Copyright (c) 2012, ooZoo by Cyril Morales.
 *
 * This work is made available under the terms of the Creative Commons Attribution-ShareAlike 3.0 license, 
 * http://creativecommons.org/licenses/by-sa/3.0/ .
 *
 */

enyo.kind({
	name: "PoiPopup",
	components: [
		{kind: "onyx.Popup", name: "popup", modal: true, centered: false, floating: true, scrim: false, classes:"enyo-unselectable map-popup", components: [
			{classes: "popup-light", name: "container", components: [
				{name: "title", content: "Poi"},
				{kind: "Image", name: "image", src: "", showing: false},
				{name: "text", content: "", className: "item-secondary", showing: false}
			]},
			{classes: "popup-tip-container", name: "tip", showing: true, components: [
				{classes: "popup-light-tip"}
			]}
		]}
	],
	handlers: {
		ondragstart: "drag"
	},
	drag: function(inSender, inEvent) {
		return true;
	},
	rendered: function() {
		this.inherited(arguments);

		this.$.popup.removeClass("onyx-popup");
	},
	setPopup: function(zoo, id) {
		this.$.title.setContent(enyo.zoo.poi[id].nom);
	},
	show: function(inEvent) {
		var p = this.$.popup;
		p.show();
		if (!p.centered) {
			var left = this.owner.owner.$.mainPanels.index ? 0 : this.owner.owner.$.menu.getBounds().width;
			var map = inEvent.target._map;
			if (!inEvent.target._icon) {
				var click = map.layerPointToContainerPoint(inEvent.layerPoint);
			}
			else {
				var click = map.layerPointToContainerPoint(map.latLngToLayerPoint(inEvent.target._latlng));
				click.x += left;
			}
			var margin = {
				top: parseInt(p.getComputedStyleValue("margin-top").replace(/px/g,"")),
				right: parseInt(p.getComputedStyleValue("margin-right").replace(/px/g,"")),
				left: parseInt(p.getComputedStyleValue("margin-left").replace(/px/g,"")),
				bottom: parseInt(p.getComputedStyleValue("margin-bottom").replace(/px/g,""))
			};
			var padding = {
				top: parseInt(p.getComputedStyleValue("padding-top").replace(/px/g,"")),
				right: parseInt(p.getComputedStyleValue("padding-right").replace(/px/g,"")),
				left: parseInt(p.getComputedStyleValue("padding-left").replace(/px/g,"")),
				bottom: parseInt(p.getComputedStyleValue("padding-bottom").replace(/px/g,""))
			};
			var bounds = p.getBounds();
			var width = bounds.width + padding.left + padding.right + margin.left + margin.right;
			var height = bounds.height + padding.top + padding.bottom + margin.top + margin.bottom;
			var move = {x: 0, y: 0};
			if (click.y < height) {
				move.y = height - click.y;
			}
			var container = this.parent.$.map.getBounds().width;
			if (click.x < (width / 2) + left) {
				move.x = (width / 2) + left - click.x;
			}
			if (container + left < (width / 2) + click.x) {
				move.x = -((width / 2) + click.x - (container + left));
			}
			p.setBounds({
				left: (click.x - ((width) / 2) + move.x),
				top: (click.y - height + move.y)
			}, "px");
			move.y *= -1;
			move.x *= -1;
			map.panBy(move);
		}
	},
	setCentered: function(inValue) {
		this.$.popup.setProperty("scrim", inValue);
		this.$.popup.setProperty("centered", inValue);
		this.$.tip.setShowing(!inValue);
	}
});