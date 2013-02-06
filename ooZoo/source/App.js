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
		{kind: "WebService", name:"data", url: "http://zoo.cyrilmoral.es/data.asp", onResponse: "dataResponse", onError: "dataError"},
		{kind: "FittableRows", classes: "enyo-fit", components: [
			{kind: "Panels", name: "mainPanels", classes: "panels enyo-fit", fit: true, realtimeFit: false, arrangerKind: "CollapsingArranger", onTransitionFinish:"updateMap", components: [
				{kind: "MenuPanel", name: "menu", classes: "menu-panel"},
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
		enyo.zoo["param"] = {
			"image": "http://www.palmsnipe.cat/wp7/img/large/"
		};
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

		this.$.data.send();
	},
	dataResponse: function(inRequest, inResponse) {
		// this.zoo = inResponse.data;
		this.createData(inResponse.data);
		this.$.map.drawMap();
		this.$.menu.setAnimalList();
	},
	createData: function(inData) {
		this.zoo = new Object();
		
		function createEnclos(data) {
			var enclos = [];
			var tmp = [];
			for (var i = 0; i < data.length; i++) {
				var tmp = data[i].polygone.replace(/\], \[/gi, ",").replace(/, /gi, " ").replace(/[\]\[]/gi, "").split(",");
				var tab = [];
				for (pt in tmp) {
					var point = tmp[pt].split(' ');
					tab.push({lat: parseFloat(point[0]), long: parseFloat(point[1])});
				}
				enclos.push({
					"id": data[i].id,
					"numero": data[i].num,
					"polygone": tab});
			}
			return enclos;
		}
		function createAnimaux(inData) {
			var animal = [];
			for (var i = 0; i < inData.animal.length; i++) {
				var categorie = [];
				for (var j = 0; j < inData.categorie.length; j++) {
					if (inData.categorie[j].id_animal == inData.animal[i].id) {
						categorie.push(inData.categorie[j].id_categorie);
					}
				}
				var enclos = [];
				for (var j = 0; j < inData.enclos.length; j++) {
					if (inData.enclos[j].id_animal == inData.animal[i].id) {
						enclos.push(inData.enclos[j].id_enclos);
					}
				}
				var image = [];
				for (var j = 0; j < inData.image.length; j++) {
					if (inData.image[j].id_animal == inData.animal[i].id) {
						image.push(inData.image[j].fichier);
					}
				}
				var zone = [];
				for (var j = 0; j < inData.zone.length; j++) {
					if (inData.zone[j].id_animal == inData.animal[i].id) {
						zone.push(inData.zone[j].id_zone);
					}
				}
				animal.push({
					"id": inData.animal[i].id,
					"classe": inData.animal[i].classe,
					"description": inData.animal[i].description,
					"details": inData.animal[i].details_zone,
					"duree_gestation": inData.animal[i].duree_gestation,
					"famille": inData.animal[i].famille,
					"longevite": inData.animal[i].longevite,
					"nb_gestation": inData.animal[i].nb_gestation,
					"nom": inData.animal[i].nom,
					"nom_scientifique": inData.animal[i].nom_scientifique,
					"ordre": inData.animal[i].ordre,
					"poids": inData.animal[i].poids,
					"categorie": categorie,
					"enclos": enclos,
					"image": image,
					"zone": zone
					});
			}
			return animal;
		}
		function createPoi(inData) {
			var data = new Object();
			for (var i = 0; i < inData.length; i++) {
				data[inData[i].id] = {
					"Lat": inData[i].Lat,
					"Long": inData[i].Long,
					"nom": inData[i].nom,
					"texte": inData[i].texte,
					"type": inData[i].type};
			}
			return data;
		}
		function createTexte(inData) {
			var categorie = new Object();
			var classe = new Object();
			var famille = new Object();
			var ordre = new Object();
			var poi = new Object();
			var zone = new Object();
			for (var i = 0; i < inData.categorie.length; i++) {
				categorie[inData.categorie[i].id] = {
					"texte": inData.categorie[i].texte};
			}
			for (var i = 0; i < inData.classe.length; i++) {
				classe[inData.classe[i].id] = {
					"texte": inData.classe[i].texte};
			}
			for (var i = 0; i < inData.famille.length; i++) {
				famille[inData.famille[i].id] = {
					"texte": inData.famille[i].texte};
			}
			for (var i = 0; i < inData.ordre.length; i++) {
				ordre[inData.ordre[i].id] = {
					"texte": inData.ordre[i].texte};
			}
			for (var i = 0; i < inData.poi.length; i++) {
				poi[inData.poi[i].id] = {
					"texte": inData.poi[i].texte};
			}
			for (var i = 0; i < inData.zone.length; i++) {
				zone[inData.zone[i].id] = {
					"texte": inData.zone[i].texte};
			}
			
			var data = {
				"categorie": categorie,
				"classe": classe,
				"famille": famille,
				"ordre": ordre,
				"poi": poi,
				"zone": zone
				};
			return data;
		}
		
		var enclos = createEnclos(inData.zoo.enclos);
		var enclosVue = inData.zoo.enclos_vue;
		var animaux = createAnimaux(inData.zoo.animaux);
		// var poi = createPoi(inData.zoo.poi);
		var poi = inData.zoo.poi;
		var texte = createTexte(inData.zoo.texte);
			
		enyo.zoo["animaux"] = animaux;
		enyo.zoo["enclos"] = enclos;
		enyo.zoo["enclos_vue"] = enclosVue;
		enyo.zoo["poi"] = poi;
		enyo.zoo["texte"] = texte;
	},
	dataError: function(inSender, inData) {
		// console.log(inData);
		this.$.errorPopup.show();
	}
});