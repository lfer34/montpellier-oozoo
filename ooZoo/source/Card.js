/*
 * Copyright (c) 2012, ooZoo by Cyril Morales.
 *
 * This work is made available under the terms of the Creative Commons Attribution-ShareAlike 3.0 license, 
 * http://creativecommons.org/licenses/by-sa/3.0/ .
 *
 */

enyo.kind({
	name: "CardPanel",
	classes: "onyx wide enyo-unselectable",
	kind: "FittableRows",
	components: [
		{kind: "onyx.Toolbar", components: [
			{name: "nom", content: "Animal"}
		]},
		{kind: "Scroller", name: "scroller", fit: true, components: [
			{classes: "card-border", components: [
				{kind: "Scroller", name: "imageScroller", vertical: "hidden", components: [
					{kind: "Repeater", name: "list", onSetupItem: "setupItem", classes: "card-images-container", showing: true, components: [
						{kind: "Image", name: "image", classes: "card-image", ontap: "showImages"}
					]}
				]},
				{name: "description", classes: "card-description", content: "", allowHtml: true},
				{kind: "onyx.Groupbox", classes: "card-groupbox-details", components: [
					{kind: "onyx.GroupboxHeader", content: "Détails"},
					{kind: "FittableColumns", fit: true, components: [
						{content: "Nom scientifique", classes: "label", fit: true},
						{name: "sciName", content: ""}
					]},
					{kind: "FittableColumns", fit: true, components: [
						{content: "Classe", classes: "label", fit: true},
						{name: "class", content: ""}
					]},
					{kind: "FittableColumns", fit: true, components: [
						{content: "Catégorie", classes: "label", fit: true},
						{name: "category", content: ""}
					]},
					{kind: "FittableColumns", fit: true, components: [
						{content: "Ordre", classes: "label", fit: true},
						{name: "ordre", content: ""}
					]},
					{kind: "FittableColumns", fit: true, components: [
						{content: "Longévité", classes: "label", fit: true},
						{name: "longevite", content: ""}
					]},
					{kind: "FittableColumns", fit: true, components: [
						{content: "Gestation", classes: "label", fit: true},
						{name: "gestation", content: ""}
					]},
					{kind: "FittableColumns", fit: true, components: [
						{content: "Poids", classes: "label", fit: true},
						{name: "poids", content: ""}
					]},
					{kind: "FittableColumns", fit: true, components: [
						{content: "Zones", classes: "label", fit: true},
						{name: "zones", content: ""}
					]},
					{kind: "FittableColumns", fit: true, components: [
						{content: "Lieux", classes: "label", fit: true},
						{name: "lieux", content: ""}
					]}
				]}
			]}
		]},
		{kind: "onyx.Toolbar", classes: "enyo-unselectable", layoutKind: "FittableColumnsLayout", components: [
			{classes: "card-toolbar", components: [
				{kind: "onyx.Button", content: "Retour", classes: "button", ontap: "hide"},
				{kind: "onyx.Button", content: "Enclos", classes: "button", ontap: "showEnclos"}
			]}
		]}
	],
	create: function() {
		this.inherited(arguments);

	},
	updateCard: function(inAnimal) {
		this.$.scroller.scrollToTop();
		this.owner.$.map.clearEnclosStyle();
		this.animal = inAnimal;
		this.$.nom.setContent(inAnimal.nom);
		
		if (inAnimal.images.length > 0) {
			this.$.list.show();
		}
		else {
			this.$.list.hide();
		}

		this.$.list.setCount(inAnimal.images.length);
		this.$.description.setContent(inAnimal.description);
		this.$.sciName.setContent(inAnimal.nom_scientifique);
		this.$.class.setContent(inAnimal.classe);
		this.$.category.setContent(inAnimal.categories);
		this.$.ordre.setContent(inAnimal.ordre);
		this.$.longevite.setContent(inAnimal.longevite);
		this.$.gestation.setContent(inAnimal.gestation.duree);
		this.$.poids.setContent(inAnimal.poids);
		this.$.zones.setContent(inAnimal.zones);
		this.$.lieux.setContent(inAnimal.zones_detail);

		this.owner.$.image.updateImage(inAnimal);
	},
	setBack: function(inPanel) {
		this.origin = inPanel;
	},
	show: function() {
		this.owner.$.contentPanels.setIndex(1);
	},
	hide: function() {
		if (enyo.Panels.isScreenNarrow() && this.origin.name == "menu") {
			this.owner.$.mainPanels.setIndex(0);
		}
		else {
			this.owner.$.contentPanels.setIndex(0);
		}
	},
	showEnclos: function(inSender, inIndex) {
		var zoo = this.owner.zoo;
		var map = this.owner.$.map.map;
		var highlightStyle = {
			fillColor: 'purple',
			stroke: true,
			color: 'pink',
			opacity: 1,
			weight: 5,
			fillOpacity: 1
		};
		for (var i = 0; i < this.animal.enclos.length; i++) {
			map._layers["enclos" + this.animal.enclos[i]].setStyle(highlightStyle);
		}
		this.owner.$.contentPanels.setIndex(0);
	},
	showImages: function(inSender, inIndex) {
		this.owner.$.cardPanels.setIndex(1);
	},
	setupItem: function(inSender, inEvent) {
		var i = inEvent.index;
		var data = this.animal.images;
		var image = data[i];
		var item = inEvent.item;

		if (item) {
			item.$.image.setSrc(enyo.zoo.imagefull + image);

			return true;
		}
	}
});
