/*
 * Copyright (c) 2012, ooZoo by Cyril Morales.
 *
 * This work is made available under the terms of the Creative Commons Attribution-ShareAlike 3.0 license, 
 * http://creativecommons.org/licenses/by-sa/3.0/ .
 *
 */

enyo.kind({
	name: "MapPanel",
	classes: "wide enyo-unselectable",
	events: {
		onLoaded: ""
	},
	handlers: {
		onresize: "resized"
	},
	components: [
		{kind: "FittableRows", classes: "enyo-fit", components: [
			{kind: "Map", name: "map", layer: "bing", bingCredentials: "AqwmKr40FdqD4Ntpo_ik3UOKXqG4uT5niPKJDhXkdNJhDqvwyscuJtWhZ72QVWAI", fit: true, onLoaded: "setMap"},
			{kind: "onyx.Toolbar", layoutKind: "FittableColumnsLayout", noStretch: true, components: [
				{kind: "onyx.Grabber", name: "grab", ontap: "grabMap"},
				{kind: "onyx.Button", name: "menu", content: "Menu", classes: "button", ontap: "grabMap", showing: false},
				{classes: "map-toolbar-group-button", fit: true, components: [
					{kind: "onyx.Button", classes: "button map-toolbar-zoom-button", ontap: "btnZoomOut", components: [
						{kind: "onyx.Icon", classes: "icon", src: "assets/menu-icon-less.png"}
					]},
					{kind: "onyx.Button", classes: "button map-toolbar-zoom-button", ontap: "btnZoomIn", components: [
						{kind: "onyx.Icon", classes: "icon", src: "assets/menu-icon-more.png"}
					]}
				]},
				{kind: "onyx.Button", classes: "button", content: "Options", ontap: "showPopup", popup: "optionsPopup"}
			]}
		]},
		{kind: "onyx.Popup", name: "optionsPopup", modal: true, floating: true, classes:"enyo-unselectable popup-light map-options-popup", components: [
			{kind: "FittableColumns", fit: true, components: [
				{content: "Popup centrée", classes: "label map-options-label", fit: true},
				{kind:"onyx.Checkbox", name: "centeredCheckbox", classes: "checkbox", checked: false, onchange:"popupCenteredChanged", disabled: true}
			]},
			{kind: "FittableColumns", fit: true, components: [
				{content: "Points d'intérêt", classes: "label map-options-label", fit: true},
				{kind:"onyx.ToggleButton", name: "poiButton", classes: "map-options-toggle-button", onChange:"poiChanged", onContent: "Oui", offContent: "Non", value: true, disabled: true}
			]},
			{kind: "FittableColumns", fit: true, components: [
				{content: "Parcours", classes: "label map-options-label", fit: true},
				{kind:"onyx.ToggleButton", name: "parcoursButton", classes: "map-options-toggle-button", onChange:"wayChanged", onContent: "Oui", offContent: "Non", value: true, disabled: true}
			]},
			{kind: "FittableColumns", fit: true, components: [
				{content: "Carte", classes: "label map-options-map-label", fit: true},
				{kind: "onyx.PickerDecorator", components: [
					{classes: "map-options-map-picker"},
					{kind: "onyx.Picker", name: "mapPicker", onSelect: "mapSelected", components: [
						{content: "OpenStreetMap", value: "osm"},
						{content: "CloudMade", value: "cloudmade"},
						{content: "WaterColor", value: "watercolor"},
						{content: "Bing Maps", value: "bing", active: true}
					]}
				]}
			]}
		]},
		{kind: "onyx.Popup", name: "legendPopup", modal: false, floating: true, classes:"enyo-unselectable popup-light map-legend-popup", components: [
			{content: "Légende des parcours", classes: "map-legend-popup-title"},
				{kind: "Scroller", name: "scroller", classes: "map-legend-popup-list", strategyKind: "TouchScrollStrategy", components: [
					{kind: "Repeater", name: "legendList", onSetupItem: "setupLegendItem", components: [
						{name: "item", classes: "map-legend-popup-item", onclick: "animalTap", components: [
							{name: "color", classes: "map-legend-popup-color"},
							{name: "parcours", content: "", classes: "map-legend-popup-text"}
						]}
					]}
				]}
		]},
		{kind: "AnimalPopup", name: "animalPopup"},
		{kind: "PoiPopup", name: "poiPopup"}
	],
	create: function() {
		this.inherited(arguments);

		this.resized();
		var picker = this.$.mapPicker.components;
		var i = 0;
		while (i < picker.length && picker[i].active != true)
			i++;
		this.currentLayer = picker[i].value;
	},
	resized: function() {
		this.$.grab.setShowing(!enyo.Panels.isScreenNarrow());
		this.$.menu.setShowing(enyo.Panels.isScreenNarrow());
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

		var bounds = new L.LatLngBounds(new L.LatLng(43.634212, 3.860836), new L.LatLng(43.650733, 3.896198));
		this.$.map.setMaxBounds(bounds);

		this.drawZoo();
		this.drawParcours();
		// this.doLoaded();
	},
	showPopup: function(inSender, inEvent) {
		var p = this.$[inSender.popup];
		if (p) {
			p.show();
		}
	},
	showLegend: function(inEvent) {
		var p = this.$.legendPopup;
		if (p) {
			p.show();
		}
	},
	mapSelected: function(inSender, inEvent) {
		var layers = this.$.map.getMapsLayer();
		this.$.map.addLayer(layers[inEvent.selected.value]);
		this.$.map.removeLayer(layers[this.currentLayer]);
		this.currentLayer = inEvent.selected.value;
	},
	wayChanged: function(inSender, inEvent) {
		if (inSender.getValue() == true) {
			this.$.map.addLayer(this.parcoursGroup);
		}
		else {
			this.$.map.removeLayer(this.parcoursGroup);
		}
	},
	poiChanged: function(inSender, inEvent) {
		if (inSender.getValue() == true) {
			this.$.map.addLayer(this.poiGroup);
		}
		else {
			this.$.map.removeLayer(this.poiGroup);
		}
	},
	popupCenteredChanged: function(inSender, inEvent) {
		this.$.animalPopup.setCentered(inSender.getValue());
		this.$.poiPopup.setCentered(inSender.getValue());
	},
	drawMap: function() {
		this.drawEnclos();
		this.drawPointsDeVue();
		this.drawPoi();
	},
	drawZoo: function() {
		var tab = new Array();
		for (var i = 0; i < limiteZoo.length; i++) {
			tab.push(new L.LatLng(limiteZoo[i].lat, limiteZoo[i].lon));
		}
		var polygon = new L.Polygon(tab, {
			fillColor: 'brown',
			stroke: true,
			color: 'black',
			opacity: 0.8,
			weight: 5,
			fillOpacity: 0,
			clickable: false
		});
		this.$.map.addLayer(polygon);
	},
	drawEnclos: function() {
		for (var i = 0; i < enyo.zoo.enclos.length; i++) {
			var tab = new Array();
			for (var j = 0; j < enyo.zoo.enclos[i].polygone.length; j++) {
				tab.push(new L.LatLng(enyo.zoo.enclos[i].polygone[j].lat, enyo.zoo.enclos[i].polygone[j].long));
			}
			var polygon = new L.Polygon(tab, {
				fillColor: 'brown',
				stroke: true,
				color: 'brown',
				opacity: 0.6,
				weight: 5,
				fillOpacity: 0.2
			});
			polygon._leaflet_id = 'enclos' + enyo.zoo.enclos[i].id;
			this.$.map.addLayer(polygon);
			(function(panel, zoo, id) {
				polygon.on('click', function(e) {
					panel.$.animalPopup.setPopup(zoo, id);
					panel.$.animalPopup.show(e);
				});
			})(this, enyo.zoo, i);
		}
	},
	drawParcours: function() {
		this.parcoursGroup = new L.LayerGroup();
		this.$.map.addLayer(this.parcoursGroup);
		var tab = [];
		for (var i = 0; i < parcours.length; i++) {
			var tab2 = [];
			for (var k = 0; k < parcours[i].length; k++) {
				tab2.push(new L.LatLng(parcours[i][k].lat, parcours[i][k].lon));
			}
			tab.push(tab2);
			var multiPolyline = new L.MultiPolyline(tab, {
				color: 'green',
				weight: 3,
				clickable: false,
       			opacity: 0.8
    		});
			this.parcoursGroup.addLayer(multiPolyline);
		}
		this.$.parcoursButton.setDisabled(false);
	},
	drawPointsDeVue: function() {
		var pdv = enyo.zoo.enclos_vue;
		this.pointsDeVueGroup = new L.LayerGroup();
		this.$.map.addLayer(this.pointsDeVueGroup);
		for (var i = 0; i < pdv.length; i++) {
			var circle = new L.Circle( new L.LatLng(pdv[i].lat, pdv[i].long), 2, {
				fillColor: 'red',
				stroke: false,
 				fillOpacity: 1,
				clickable: false
			});
			this.pointsDeVueGroup.addLayer(circle);
		}
		// this.$.parcoursButton.setDisabled(false); A MODIFIER
	},
	drawPoi: function() {
		this.poiGroup = new L.LayerGroup();
		var poi = enyo.zoo.poi;
		var type = enyo.zoo.texte.poi;
		var Icon = L.Icon.extend({
			options:{
				shadowUrl: null,
				iconSize: new L.Point(32, 37),
				className: "map-icon"
			}
		});
		var icons = {
			"default": new Icon({iconUrl: "assets/default.png"}),
			"secours": new Icon({iconUrl: "assets/firstaid.png"}),
			"eau": new Icon({iconUrl: "assets/drinkingfountain.png"}),
			"wc": new Icon({iconUrl: "assets/toilets.png"}),
			"jeu": new Icon({iconUrl: "assets/playground.png"}),
			"parking": new Icon({iconUrl: "assets/car.png"}),
			"tour": new Icon({iconUrl: "assets/tower.png"}),
			"zoo": new Icon({iconUrl: "assets/zoo.png"}),
			"serre": new Icon({iconUrl: "assets/frog-2.png"}),
			"picnic": new Icon({iconUrl: "assets/picnic-2.png"})
		};

		this.$.map.addLayer(this.poiGroup);
		for (var i = 0; i < poi.length; i++) {
			var marker = new L.Marker(new L.LatLng(poi[i].lat, poi[i].long), {
				icon: type[poi[i].type].texte in icons ? icons[type[poi[i].type].texte] : icons["default"]
			});
			this.poiGroup.addLayer(marker);
			(function(panel, id) {
				marker.on('click', function(e) {
					panel.$.poiPopup.setPopup(panel.zoo, id);
					panel.$.poiPopup.show(e);
				});
			})(this, i);
		}
		this.$.poiButton.setDisabled(false);
	},
	setupLegendItem: function(inSender, inEvent) {
		var i = inEvent.index;
		var data = this.zoo.parcours;
		var parcours = data[i];
		var item = inEvent.item;

		if (item) {
			item.$.parcours.setContent(parcours.nom);
			item.$.color.applyStyle("background-color", parcours.couleur);
			return true;
		}
	},
	sortLegend: function() {
		this.zoo.parcours.sort(function(a, b) {
			if (a.nom < b.nom)
				return -1;
			else if (a.nom > b.nom)
				return 1;
			else
				return 0; });
	},
	clearEnclosStyle: function() {
		var defaultStyle = {
			fillColor: 'brown',
			stroke: true,
			color: 'brown',
			opacity: 0.6,
			weight: 5,
			fillOpacity: 0.2
		};
		for (var i = 0; i < enyo.zoo.animaux.length; i++) {
			for (var j = 0; j < enyo.zoo.animaux[i].enclos.length; j++) {
				// console.log(enyo.zoo.animaux[i].enclos[j]); A REVOIR
				// this.map._layers["enclos" + enyo.zoo.animaux[i].enclos[j]].setStyle(defaultStyle);
			}
		}
	}
});
