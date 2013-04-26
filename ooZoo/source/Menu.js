/*
 * Copyright (c) 2012, ooZoo by Cyril Morales.
 *
 * This work is made available under the terms of the Creative Commons Attribution-ShareAlike 3.0 license, 
 * http://creativecommons.org/licenses/by-sa/3.0/ .
 *
 */

enyo.kind({
	name: "MenuPanel",
	classes: "onyx enyo-unselectable",
	events: {
		onLoaded: ""
	},
	components: [
		{kind: "WebService", name:"wsTexte", url: "http://zoo.cyrilmoral.es/texte.php", onResponse: "texteResponse", onError: "texteError"},
		{kind: "WebService", name:"site", url: "http://zoo.cyrilmoral.es/sitezoomtp.php", handleAs: "text", onResponse: "siteResponse", onError: "siteError"},
		{kind: "FittableRows", classes: "enyo-fit", components: [
			{kind: "onyx.Toolbar", classes: "menu-header", components: [
				{kind: "Image", src: "assets/logo.png", classes: "menu-header-logo"}
			]},
			{kind: "onyx.Toolbar", classes: "menu-group", layoutKind: "FittableColumnsLayout", noStretch: true, components: [
					{kind: "Group", name: "menuGroupButton", classes: "menu-group-menu", defaultKind: "onyx.Button", highlander: true, components: [
						{kind: "onyx.Button", active: true, classes: "button menu-group-button", value: 0, ontap: "gotoMenuPanel", components: [
							{kind: "onyx.Icon", classes: "icon", src: "assets/menu-icon-news.png"}
						]},
						{kind: "onyx.Button", classes: "button menu-group-button", value: 1, ontap: "gotoMenuPanel", components: [
							{kind: "onyx.Icon", classes: "icon", src: "assets/menu-icon-animals.png"}
						]},
						{kind: "onyx.Button", classes: "button menu-group-button", value: 2, ontap: "gotoMenuPanel", components: [
							{kind: "onyx.Icon", classes: "icon", src: "assets/menu-icon-info.png"}
						]}
					]},
					{kind: "onyx.Button", classes: "button menu-group-button", value: "map", ontap: "gotoMapPanel", components: [
						{kind: "onyx.Icon", classes: "icon", src: "assets/menu-icon-map.png"}
					]}
			]},
			{kind: "Panels", name:"menuPanels", fit:true, arrangerKind: "CarouselArranger", wrap: false, classes: "menu-panel menu-panels", components: [
				{kind: "Scroller", classes: "enyo-fit", components: [
					{classes: "menu-border", components: [
						{kind: "onyx.Groupbox", classes: "menu-news-groupbox", components: [
							{kind: "onyx.GroupboxHeader", content: "À la une"},
							{kind: "FittableRows", components: [
								{kind: "Image", name: "imageFirstNews", classes: "menu-news-image-first", src: ""},
								{name: "titleFirstNews", classes: "menu-news-title", content: ""},
								{name: "contentFirstNews", classes: "item-secondary", content: ""}
							]}
						]},
						{kind: "Repeater", name: "newsList", onSetupItem: "setupNewsItem", components: [
							{name: "newsDate", classes: "label menu-news-date", content: ""},
							{name: "newsTitle", classes: "menu-news-title", content: ""},
							{name: "newsContent", classes: "item-secondary", content: "", allowHtml: true}
						]}
					]}
				]},
				{kind: "FittableRows", classes: "enyo-fit", components: [
					{kind: "FittableRows", classes: "menu-animal-search", components: [
						{kind: "onyx.InputDecorator", name: "searchInputContainer", classes: "menu-animal-search-input", showing: true, components: [
							{kind: "onyx.Input", style: "width: 100%;", name: "searchInput", value: "", placeholder: "Rechercher", oninput: "animalSearchInput"}
						]},
						{kind: "FittableColumns", name: "searchPickerContainer", classes: "menu-animal-search-selection", showing: true, components: [
							{content: "Afficher", classes: "label menu-animal-search-selection-label"},
							{kind: "onyx.PickerDecorator", fit: true, classes: "menu-animal-search-selection-picker", components: [
								{},
								{kind: "onyx.Picker", name: "zonePicker", onSelect: "zoneSelected", components: [
									{content: "Tous", active: true}
								]}
							]}
						]}
						// {kind: "onyx.Button", content: "Pré-sélection", ontap: "showPopup", popup: "selectPopup"}
					]},
					{kind: "List", name: "animalList", classes: "menu-animal-list", rowsPerPage: 10, fit: true, multiSelect: false, onSetupItem: "setupAnimal", components: [
						{name: "divider", classes: "menu-animal-divider"},
						{name: "animal", classes: "animal-item", ontap: "animalTap", components: [
							{kind: "Image", src: "assets/logo2.png", name: "avatar", classes: "animal-icon"},
							{classes: "animal-text", components: [
								{name: "name", classes: "animal-name", content: ""},
								{name: "region", classes: "item-secondary", content: ""}
							]}
						]}
					]}
				]},
				{kind: "Scroller", name: "scrollerInfo", classes: "enyo-fit", components: [
					{kind: "FittableRows", classes: "item-secondary", components: [
						{kind: "gts.DividerDrawer", caption: "Venir au zoo", classes: "gts-DividerDrawer", open: false, components:[
							{kind: "FittableRows", classes: "info-content", components: [
								{content: "Vous êtes en voiture", classes: "info-name"},
								{content: "Parc zoologique de Montpellier"},
								{content: "50, avenue Agropolis"},
								{content: "34090 Montpellier"},
								{content: "Un parking gratuit est à votre disposition devant l'entrée du parc zoologique.", style: "font-weight: bold;"},
								{tag: "br"},
								{content: "Vous êtes en transports en commun", classes: "info-name"},
								{content: "Depuis l'arrêt de Tram \"Saint-Eloi\" (ligne 1), prendre le bus \"La Navette\" (ligne 13), direction Universités, et descendre devant l'entrée du parc zoologique (arrêt \"zoo\")."},
							]}
						]},
						{kind: "gts.DividerDrawer", caption: "Les tarifs", classes: "gts-DividerDrawer", open: false, components:[
							{kind: "FittableRows", classes: "info-content", components: [
								{content: "Le parc zoologique est gratuit !", classes: "info-name"},
								{content: "Le plan du parc est à 0,50 €."}
							]}
							// {content: "Les tarifs de la serre amazonienne"},
							// {allowHtml: true, content: "<table>" + 
								// "<tr><th>Tarifs individuels</th><th>Tarif normal</th><th>Tarif Pass Agglo</th></tr>" + 
								// "<tr><td>Adultes (18 ans et +)</td><td>6,50€</td><td>5,50€</td></tr>" + 
								// "<tr><td>Adultes (18 ans et +)</td><td>6,50€</td><td>5,50€</td></tr>" + 
								// "</table>"}
						]},
						{kind: "gts.DividerDrawer", caption: "Les horaires", classes: "gts-DividerDrawer", open: false, components:[
							{kind: "FittableRows", classes: "info-content", components: [
								{allowHtml: true, content: "<table>" +
								"<tr><th>Périodes</th><th>Horaires</th></tr>" +
								"<tr><td>Du début des vacances de Pâques (toutes zones) jusqu'à la fin des vacances de Toussaint</td><td>10h - 18h30</td></tr>" +
								"<tr><td>Après les vacances de Toussaint jusqu'au début des vacances de Pâques (toutes zones)</td><td>9h - 17h</td></tr>" +
								"</table>"}
							]}
						]},
						{kind: "gts.DividerDrawer", caption: "Se restaurer", classes: "gts-DividerDrawer", open: false, components:[
							{kind: "FittableRows", classes: "info-content", components: [
								{content: "Le restaurant de la serre amazonienne", classes: "info-name"},
								{content: "Le restaurant l'Amazoone s'étend sur deux niveaux. Il permet d'avoir une vue panoramique sur l'ensemble de la serre et plus particulièrement sur l'enclos des sakis à face blanche et des tamarins. Le restaurant a une capacité de 96 places à l'intérieur et une terrasse extérieure de 80 places. Contact : 04 67 29 88 35"},
								{content: "Les tables de pique-nique", classes: "info-name"},
								{content: "Tout au long de votre parcours dans le parc, vous pourrez profiter de nombreuses tables de pique-nique. Pensez à jeter vos déchets dans les poubelles et à faire le bon tri !"}
							]}
						]},
						{kind: "gts.DividerDrawer", caption: "Règlement intérieur", classes: "gts-DividerDrawer", open: false, components:[
							{kind: "FittableRows", classes: "info-content", components: [
								{content: "Merci de respecter cet espace de nature et le bien-être des animaux"},
								{allowHtml: true, content: "<ul><li>Ne pas fumer</li><li>Ne pas nourrir les animaux</li><li>Ne pas pratiquer de sport (tricyles pour les enfants autorisés)</li><li>Circuler uniquement à pied</li><li>Aucun animal n'est autorisé à entrer, même tenu en laisse</li><li>Ne pas jeter vos déchets à terre</li><li>Ne pas jeter de projectiles sur les animaux</li><li>Rester calme devant les enclos</li><li>Ne pas cueillir la végétation</li></ul>"},
								{content: "Les enfants des groupes scolaires et centres de vacances ou de loisirs doivent impérativement être sous surveillance de leurs accompagnateurs et respecter le précédent règlement."}
							]}
						]},
						{kind: "gts.DividerDrawer", caption: "Accès handicapés", classes: "gts-DividerDrawer", open: false, components:[
							{kind: "FittableRows", classes: "info-content", components: [
								{content: "Le parc zoologique", classes: "info-name"},
								{allowHtml: true, content: "Il est accessible à moins de 70%. Certaines zones, notamment celles des ours et des lions, sont difficiles d'accès (pente forte).<br />Nous vous proposons ce parcours afin que votre visite soit le plus agréable possible.<br />Notez que les zones plates ne sont pas lisses dans tout le parc. Des améliorations sont prévues."},
								{content: "La serre amazonienne", classes: "info-name"},
								{allowHtml: true, content: "Elle est totalement équipée et accessible à 100%."}
							]}							
						]}
					]}
				]}
			]},
			{kind: "onyx.Toolbar", classes: "menu-group", components: [
				{classes: "menu-toolbar-about", fit: true, components: [
					{kind: "onyx.Button", classes: "button", content: "Crédits", ontap: "showPopup", popup: "aboutPopup"}
				]}
			]}
		]},
		{kind: "onyx.Popup", name: "selectPopup", centered: false, modal: false, floating: true, scrim: false, classes:"popup-light select-popup", components: [
			{content: "coucou"}
		]},
		{kind: "onyx.Popup", name: "aboutPopup", centered: true, modal: true, floating: true, scrim: true, classes:"popup-light about-popup", components: [
			{content: "Développé par Cyril Moralès", classes: "item-secondary"},
			{kind: "onyx.Groupbox", classes: "about-popup-groupbox", components: [
				{kind: "FittableColumns", fit: true, value: "http://twitter.com/cyrilmorales", ontap: "openLink", components: [
					{content: "Twitter", classes: "label", fit: true},
					{content: "@cyrilmorales"}
				]},
				{kind: "FittableColumns", fit: true, value: "http://cyrilmoral.es", ontap: "openLink", components: [
					{content: "Site web", classes: "label", fit: true},
					{content: "cyrilmoral.es"}
				]}
			]},
			{content: "En collaboration avec la ville de Montpellier", classes: "item-secondary"},
			{kind: "Image", src: "assets/montpellier.png", style: "width: 200px; height: 67px;"}
		]}
	],
	create: function() {
		this.inherited(arguments);
		
		if (enyo.ville) {
			this.$.searchInputContainer.hide();
			this.$.searchPickerContainer.show();
		}
		else {
			this.$.searchInputContainer.show();
			this.$.searchPickerContainer.hide();
		}
		this.$.site.send();
		this.$.wsTexte.send();
	},
	gotoMenuPanel: function(inSender, inEvent) {
		if (inSender.value != "map") {
			this.$.menuPanels.setIndex(inSender.value);
		}
		else {
			this.owner.$.contentPanels.setIndex(0);
			if (enyo.Panels.isScreenNarrow()) {
				this.parent.setIndex(this.parent.index ? 0 : 1);
			}
		}
	},
	gotoMapPanel: function(inSender, inEvent) {
		this.owner.$.contentPanels.setIndex(0);
		if (enyo.Panels.isScreenNarrow()) {
			this.parent.setIndex(this.parent.index ? 0 : 1);
		}
	},
	siteResponse: function(inSender, inData) {
		this.feeds = parseBrevesZoo(inData.data);
 		var feedUne = parseUneZoo(inData.data);

		localStorage.setItem("actus", JSON.stringify(this.feeds));
		localStorage.setItem("actusUne", JSON.stringify(feedUne));

 		this.$.imageFirstNews.setSrc(feedUne.image);
 		this.$.titleFirstNews.setContent(feedUne.titre);
 		this.$.contentFirstNews.setContent(feedUne.texte);
 		this.$.newsList.setCount(this.feeds.length > 4 ? 4 : this.feeds.length);
	},
	siteError: function(inSender, inData) {
		this.feeds = JSON.parse(localStorage.getItem("actus"));
		var feedUne = JSON.parse(localStorage.getItem("actusUne"));
		if (this.feeds !== null && feedUne !== null) {
	 		this.$.imageFirstNews.setSrc(feedUne.image);
	 		this.$.titleFirstNews.setContent(feedUne.titre);
	 		this.$.contentFirstNews.setContent(feedUne.texte);
	 		this.$.newsList.setCount(this.feeds.length > 4 ? 4 : this.feeds.length);
 		}
		else {
			console.log("ajax site error");
		}
	},
	texteError: function(inSender, inData) {
		enyo.zoo["texte"] = JSON.parse(localStorage.getItem("texte"));
		if (enyo.zoo["texte"] !== null) {
			var zones = [];
			for (var item in enyo.zoo.texte.zone) {
				zones.push({content: enyo.zoo.texte.zone[item].texte});
			}
			this.$.zonePicker.createComponents(zones, {owner: this});
		}
		else {
			console.log("ajax texte error");
		}
	},
	texteResponse: function(inSender, inData) {
		enyo.zoo["texte"] = inData.data.reponse;
		localStorage.setItem("texte", JSON.stringify(inData.data.reponse));
		var zones = [];
		for (var item in enyo.zoo.texte.zone) {
			zones.push({content: enyo.zoo.texte.zone[item].texte});
		}
		this.$.zonePicker.createComponents(zones, {owner: this});
	},
	setupAnimal: function(inSender, inEvent) {
		var i = inEvent.index;
		var data = this.filter ? this.filtered : this.animals;
		var item = data[i];

		this.$.name.setContent(item.nom);
		this.$.region.setContent(item.zones);
		if (item.images.length > 0) {
			this.$.avatar.setSrc(enyo.zoo.imagefull + item.images[0]);
		}
		else {
			this.$.avatar.setSrc("assets/logo2.png");
		}

		var d = item.nom[0];
		var prev = data[i - 1];
		var showd = d != (prev && prev.nom[0]);
		this.$.divider.setContent(d);
		this.$.divider.canGenerate = showd;
		this.$.animal.applyStyle("border-top", showd ? "none" : null);
	},
	animalSearchInput: function(inSender) {
		enyo.job(this.id + ":search", enyo.bind(this, "filterAnimalList", inSender.getValue()), 200);
	},
	filterAnimalList: function(inFilter) {
		if (inFilter != this.filter) {
			this.filter = inFilter;
			this.filtered = this.generateFilteredData(inFilter);
			this.$.animalList.setCount(this.filtered.length);
			this.$.animalList.reset();
		}
	},
	generateFilteredData: function(inFilter) {
		function noAccent(chaine) {
			var tmp = chaine.replace(/[àâä]/gi, "a");
			tmp = tmp.replace(/[éèêë]/gi, "e");
			tmp = tmp.replace(/[îï]/gi, "i");
			tmp = tmp.replace(/[ôö]/gi, "o");
			tmp = tmp.replace(/[ùûü]/gi, "u");

			return tmp;
		}

		var re = new RegExp("^" + noAccent(inFilter), "i");
		var r = [];
		for (var i=0, d; d=this.animals[i]; i++) {
			if (d.nom.match(re) || d.classe.match(re) || d.zones.match(re)) {
				r.push(d);
			}
		}
		return r;
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
	setAnimalList: function() {
		this.animals = enyo.zoo.animaux;
		this.sortAnimals();
		this.$.animalList.setCount(this.animals.length);
		this.$.animalList.reset();
	},
	animalTap: function(inSender, inEvent) {
		var data = this.filter ? this.filtered : this.animals;
		this.owner.$.image.updateImage(data[inEvent.index]);
		this.owner.$.card.updateCard(data[inEvent.index]);
		this.owner.$.card.setBack(this);
		if (enyo.Panels.isScreenNarrow()) {
			this.owner.$.mainPanels.setIndex(this.parent.index ? 0 : 1);
		}
		this.owner.$.card.show();
	},
	showPopup: function(inSender, inEvent) {
		var p = this.$[inSender.popup];
		if (p) {
			p.show();
		}
	},
	openLink: function(inSender, inEvent) {
		if (!this.linkDisabled)
			window.open(inSender.value, "_blank");
	},
	setupNewsItem: function(inSender, inEvent) {
		var i = inEvent.index;
		var data = this.feeds;
		var feed = data[i];
		var item = inEvent.item;

		var month = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Décembre"];
		var date = feed.date.split('/');

		if (item) {
			item.$.newsDate.setContent(date[0] + " " + month[parseInt(date[1], 10) - 1] + " " + date[2]);
			item.$.newsTitle.setContent(feed.titre);
			item.$.newsContent.setContent(feed.texte);

			return true;
		}
	},
	zoneSelected: function(inSender, inEvent) {
		var content = ("Tous" == inEvent.selected.content) ? "" : inEvent.selected.content;
		this.$.searchInput.setValue(content);
		this.animalSearchInput(this.$.searchInput);
	}
});
