/*
 * Copyright (c) 2012, ooZoo by Cyril Morales.
 *
 * This work is made available under the terms of the Creative Commons Attribution-ShareAlike 3.0 license, 
 * http://creativecommons.org/licenses/by-sa/3.0/ .
 *
 */

enyo.kind({
	name: "ImagePanel",
	classes: "onyx enyo-unselectable image-body",
	kind: "FittableRows",
	components: [
		{kind: "onyx.Toolbar", name: "header", showing: true, components: [
			{name: "nom", content: "Images"}
		]},
		{name:"carousel", kind:"ImageCarousel", fit:true},
		{kind: "onyx.Toolbar", name: "footer", classes: "enyo-unselectable", layoutKind: "FittableColumnsLayout", showing: true, components: [
			{classes: "image-toolbar", components: [
				{kind: "onyx.Button", content: "Retour fiche", classes: "button", ontap: "showCard"}
			]}
		]}
	],
	create: function() {
		this.inherited(arguments);

	},
	rendered: function() {
		this.inherited(arguments);
	},
	showCard: function(inSender, inIndex) {
		this.owner.$.cardPanels.setIndex(0);
	},
	updateImage: function(inAnimal) {
		this.animal = inAnimal;

		var tab = [];
		for (var i = 0; i < inAnimal.images.length; i++) {
			tab.push(enyo.zoo.imagefull + inAnimal.images[i]);
		}
		this.$.carousel.setImages(tab);
		this.$.nom.setContent(inAnimal.nom);
	},
	showFullScreen: function(inSender, inIndex) {
		// if (this.$.header.showing) {
			// this.$.header.hide();
			// this.$.footer.hide();
			// this.$.insert.addClass("image-insert");
		// }
		// else {
			// this.$.header.show();
			// this.$.footer.show();
			// this.$.insert.removeClass("image-insert");
		// }
	}
});
