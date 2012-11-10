/*
 * Copyright (c) 2012, ooZoo by Cyril Morales.
 *
 * This work is made available under the terms of the Creative Commons Attribution-ShareAlike 3.0 license, 
 * http://creativecommons.org/licenses/by-sa/3.0/ .
 *
 */

enyo.kind({
	name: "AnimalPopup",
	components: [
		{kind: "onyx.Popup", name: "popup", modal: false, centered: false, floating: true, scrim: false, classes:"enyo-unselectable map-animal-popup", components: [
			{classes: "popup-light", components: [
				{name: "title", classes: "map-animal-popup-title", content: "Enclos"},
				{kind: "onyx.Groupbox", name: "noAnimal", classes: "map-animal-popup-groupbox", showing: false, components: [
					{content: "Enclos vide.", classes: "map-animal-popup-empty"}
				]},
				{kind: "onyx.Groupbox", name: "groupbox", classes: "map-animal-popup-groupbox", showing: true, components: [
					{kind: "Scroller", name: "scroller", classes: "map-animal-popup-list", components: [
						{kind: "Repeater", name: "list", onSetupItem: "setupItem", components: [
							{name: "item", classes: "animal-item", onclick: "animalTap", components: [
								{kind: "Image", src: "", name: "icon", classes: "animal-icon"},
								{classes: "animal-text", components: [
									{name: "name", classes: "animal-name", content: ""},
									{name: "region", classes: "item-secondary", content: ""}
								]}
							]}
						]}
					]}
				]}
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
	create: function() {
		this.inherited(arguments);

	},
	rendered: function() {
		this.inherited(arguments);
		this.$.popup.removeClass("onyx-popup");
		this.parent.$.centeredCheckbox.setValue(this.$.popup.centered);
		this.parent.$.centeredCheckbox.setDisabled(false);
	},
	setPopup: function(zoo, id) {
		this.$.title.setContent("Enclos " + enyo.zoo.enclos[id].numero);
		this.animals = this.getAnimals(enyo.zoo.animaux, enyo.zoo.enclos[id].id);
		this.sortAnimals();
		this.$.list.setCount(this.animals.length);
		this.$.noAnimal.setShowing(this.animals.length ? false : true);
		this.$.groupbox.setShowing(this.animals.length ? true : false);
		if (this.animals.length > 0) {
			this.$.list.getControls()[0].$.item.applyStyle("border-top", "none");
		}
	},
	getAnimals: function(animals, id) {
		var tab = [];
		for (var i = 0; i < animals.length; i++) {
			for (var j = 0; j < animals[i].enclos.length; j++) {
				if (animals[i].enclos[j] == id) {
					tab.push(animals[i]);
				}
			}
		}
		return tab;
	},
	setupItem: function(inSender, inEvent) {
		var i = inEvent.index;
		var data = this.animals;
		var animal = data[i];
		var item = inEvent.item;

		if (item) {
			item.$.name.setContent(animal.nom);
			var zones = "";
			for (var i = 0; i < animal.zone.length; i++) {
				zones += i ? " / " : "";
				zones += enyo.zoo.texte.zone[animal.zone[i]].texte;
			}
			item.$.region.setContent(zones);
			if (animal.image.length > 0) {
				item.$.icon.setSrc(enyo.zoo.param.image + animal.image[0]);
			}
			else {
				item.$.icon.setSrc("assets/logo2.png");
			}

			return true;
		}
	},
	sortAnimals: function() {
		this.animals.sort(function(a, b) {
			if (a.nom < b.nom)
				return -1;
			else if (a.nom > b.nom)
				return 1;
			else
				return 0; });
	},
	animalTap: function(inSender, inEvent) {
		this.$.popup.hide();
		this.owner.owner.$.image.updateImage(this.animals[inEvent.index]);
		this.owner.owner.$.card.updateCard(this.animals[inEvent.index]);
		this.owner.owner.$.card.setBack(this.parent);
		this.owner.owner.$.card.show();
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
				var click = map.latLngToLayerPoint(inEvent.target._latlng);
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