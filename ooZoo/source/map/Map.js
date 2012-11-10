/*
 * Copyright (c) 2012, ooZoo by Cyril Morales.
 *
 * This work is made available under the terms of the Creative Commons Attribution-ShareAlike 3.0 license, 
 * http://creativecommons.org/licenses/by-sa/3.0/ .
 *
 */

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
	drag: function(inSender, inEvent) {
		return true;
	},
	rendered: function() {
		this.inherited(arguments);

		var osm = new L.TileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");
		var cloudMade = new L.TileLayer("http://{s}.tile.cloudmade.com/78eab727fd024b2a9b889e3236c70394/68943/256/{z}/{x}/{y}.png", {
			maxZoom: 18
		});
		var watercolor = new L.StamenTileLayer("watercolor");
		var osm = new L.TileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
			maxZoom: 18
		});
		var bingLayer = new L.BingLayer(this.bingCredentials, {
			maxZoom: 20
		});

		this.mapsLayer = {
			"cloudmade": cloudMade,
			"watercolor": watercolor,
			"osm": osm,
			"bing": bingLayer
		};

		this.map = new L.Map(this.id, {
			center: new L.LatLng(this.latitude, this.longitude),
			zoom: this.zoom,
			layers: [this.mapsLayer[this.layer]],
			zoomControl : false,
			attributionControl: false,
			scrollWheelZoom: true
		});
		this.doLoaded();
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
	addLayer: function(layer) {
		this.map.addLayer(layer);
	},
	removeLayer: function(layer) {
		this.map.removeLayer(layer);
	},
	setMaxBounds: function(bounds) {
		this.map.setMaxBounds(bounds);
	},
	invalidateSize: function(animate) {
		this.map.invalidateSize(animate);
	},
	getScrollWheelZoom: function(inValue) {
		return this.map.scrollWheelZoom;
	},
	setScrollWheelZoom: function(inValue) {
		this.map.scrollWheelZoom(inValue);
	}
});
