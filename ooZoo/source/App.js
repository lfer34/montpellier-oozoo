/*
 * Copyright (c) 2012, ooZoo by Cyril Morales.
 *
 * This work is made available under the terms of the Creative Commons Attribution-ShareAlike 3.0 license, 
 * http://creativecommons.org/licenses/by-sa/3.0/ .
 *
 */

enyo.kind({
	name: "App",
	classes: "onyx",
	published: {
		map: false
	},
	components: [
		{kind: "Signals", ondeviceready: "deviceReady"},
		{kind: "WebService", name:"wsAnimaux", url: "http://zoo.cyrilmoral.es/animaux.php", onResponse: "animauxResponse", onError: "wsAnimauxError"},
		{kind: "WebService", name:"wsEnclos", url: "http://zoo.cyrilmoral.es/enclos.php", onResponse: "enclosResponse", onError: "wsEnclosError"},
		{kind: "WebService", name:"wsPoi", url: "http://zoo.cyrilmoral.es/poi.php", onResponse: "poiResponse", onError: "wsPoiError"},
		{kind: "FittableRows", classes: "enyo-fit", components: [
			{kind: "Panels", name: "mainPanels", classes: "panels enyo-fit", fit: true, realtimeFit: false, arrangerKind: "CollapsingArranger", onTransitionFinish:"updateMap", components: [
				{kind: "MenuPanel", name: "menu"},
				{kind: "Panels", name: "contentPanels", classes: "panels enyo-fit", arrangerKind: "CardArranger", draggable: false, components: [
					{kind: "MapPanel", name: "map", onLoaded: "mapLoaded"},
					{kind: "Panels", name: "cardPanels", classes: "panels enyo-fit", arrangerKind: "CardArranger", draggable: false, components: [
						{kind: "CardPanel", name: "card"},
						{kind: "ImagePanel", name: "image"}
					]}
				]}
			]}
		]},
		{kind: "onyx.Popup", name: "errorPopup", centered: true, modal: false, floating: true, scrim: true, classes:"popup-light", components: [
			{content: "Impossible d'établir la connexion avec la base de données.", classes: "item-secondary", style: "color: red;"}
		]}
	],
	create: function() {
		this.inherited(arguments);

		enyo.zoo = new Object();
	},
	rendered: function() {
		this.inherited(arguments);

	},
	deviceReady: function() {
		
	},
	updateMap: function(inSender, inEvent) {
		if (inEvent.originator.name == "mainPanels" && inSender.getControls()[inEvent.toIndex].name == "contentPanels" && this.map == true) {
			this.$.map.$.map.invalidateSize(true);
		}
		else if (inEvent.originator.name == "menuPanels") {
			inEvent.originator.parent.container.$.menuGroupButton.getControls()[inEvent.toIndex].setActive(true);
		}
	},
	mapLoaded: function() {
		this.map = true;
		this.$.map.drawZoo();

		if (enyo.ville) {
			// Gestion du multitouch sur les ecrans de la ville
			if (uniTouch !== undefined) {
				document.addEventListener("pinchzoomin", function(evt) {
					enyo.$.app.$.map.map.zoomIn();
				});
				document.addEventListener("pinchzoomout", function(evt) {
					enyo.$.app.$.map.map.zoomOut();
				});
			}
			this.$.map.map.touchZoom.enable();
			// Desactive les liens
			function manageLinks(event) {
				return false;
			}
			document.onclick = manageLinks;
			this.$.menu.linkDisabled = true;

			// enyo.$.addStyles('cursor: url("assets/blank.png"), default !important;');
		}

		this.$.wsAnimaux.send();
		this.$.wsEnclos.send();
		this.$.wsPoi.send();
	},
	animauxResponse: function(inRequest, inResponse) {
		enyo.zoo["animaux"] = inResponse.data.reponse.animaux;
		enyo.zoo["imagefull"] = inResponse.data.reponse.path_image_full;

		localStorage.setItem("animaux", JSON.stringify(inResponse.data.reponse.animaux));
		localStorage.setItem("imagefull", JSON.stringify(inResponse.data.reponse.path_image_full));

		this.$.menu.setAnimalList();
	},
	enclosResponse: function(inRequest, inResponse) {
		enyo.zoo["enclos"] = inResponse.data.reponse;
		localStorage.setItem("enclos", JSON.stringify(inResponse.data.reponse));
		this.$.map.drawEnclos();
	},
	poiResponse: function(inRequest, inResponse) {
		enyo.zoo["poi"] = inResponse.data.reponse;
		localStorage.setItem("poi", JSON.stringify(inResponse.data.reponse));
		this.$.map.drawPoi();
	},
	wsPoiError: function(inSender, inData) {
		enyo.zoo["poi"] = JSON.parse(localStorage.getItem("poi"));
		if (enyo.zoo["poi"] !== null) {
			this.$.map.drawPoi();
		}
		else {
			this.$.errorPopup.show();
		}
	},
	wsAnimauxError: function(inSender, inData) {
		enyo.zoo["animaux"] = JSON.parse(localStorage.getItem("animaux"));
		enyo.zoo["imagefull"] = JSON.parse(localStorage.getItem("imagefull"));
		if (enyo.zoo["animaux"] !== null && enyo.zoo["imagefull"] != null) {
			this.$.menu.setAnimalList();
		}
		else {
			this.$.errorPopup.show();
		}
	},
	wsEnclosError: function(inSender, inData) {
		enyo.zoo["enclos"] = JSON.parse(localStorage.getItem("enclos"));
		if (enyo.zoo["enclos"] !== null) {
			this.$.map.drawEnclos();
		}
		else {
			this.$.errorPopup.show();
		}
	}
});