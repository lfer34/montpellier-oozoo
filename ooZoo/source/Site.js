/*
This file is part of Zoo Lunaret.

Zoo Lunaret is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Zoo Lunaret is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with Zoo Lunaret.  If not, see <http://www.gnu.org/licenses/>.
*/

function parseBrevesZoo(site) {
	var feeds = new Array();
    	// Selectionne la zone des breves
    	var debut = site.indexOf('<div class="breveListe">');
    	var fin = debut;
    	for (var i = 0; i < 5; i++) {
    		fin = site.indexOf('</div>', fin + 6);
    	}
		 // Cree l'arbre
		 var div = document.createElement('div');
		 div.innerHTML = site.substring(debut, fin + 6);
		 var child = div.firstChild;

		// Parse l'arbre
		while (child) {
			var text = "";
			if (child.nodeType == 1) {
				var child2 = child.firstChild;
				while (child2) {
					if (child2.nodeType == 1) {
						if (child2.nodeName == "H5") {
							if (child2.hasChildNodes()) {
								var title = child2.firstChild.nodeValue.replace(/^\s+/g,'').replace(/\s+$/g,'');
							}
						}
						if (child2.nodeName == "P" && child2.getAttribute("class") == "date") {
							if (child2.hasChildNodes()) {
								var date = child2.firstChild.nodeValue.replace(/^\s+/g,'').replace(/\s+$/g,'').substring(3);
							}
						}
						else if (child2.nodeName == "P") {
							if (child2.hasChildNodes()) {
								var child3 = child2.firstChild;
								while (child3) {
									if (child3.nodeType == 1) {
										if (child3.nodeName == "STRONG") {
											if (child3.hasChildNodes()) {
												text += "<strong>" + child3.firstChild.nodeValue + "</strong>";
											}
										}
										else if (child3.nodeName == "A") {
											if (child3.hasChildNodes()) {
												text += "<a href=\"" + child3.getAttribute("href") + "\">" + child3.firstChild.nodeValue + "</a>";
											}
										}
									}
									else {
										text += child3.nodeValue.replace(/"/g,'');
									}
									child3 = child3.nextSibling;
								}
							}
						}
					}
					child2 = child2.nextSibling;
				}
				feeds.push({"titre": title, "date": date, "texte": text});
			}							
			child = child.nextSibling;
		}
		
		return (feeds);
	}
	

function parseUneZoo(site) {
	var feed = new Object();

// Selectionne la zone des breves
    	var debut = site.indexOf('<div class="breveAccueilImage">');
    	debut = site.indexOf('src="', debut);
    	var fin = debut + 5;
    	fin = site.indexOf('"', fin);
    	var image = "http://zoo.montpellier.fr" + site.substring(debut + 5, fin);
		
    	// Selectionne la zone des breves
    	debut = site.indexOf('<h5>', fin);
    	fin = debut;
    	for (var i = 0; i < 2; i++) {
    		fin = site.indexOf('</div>', fin + 6);
    	}
		 // Cree l'arbre
		 var div = document.createElement('div');
		 div.innerHTML = "<div>" + site.substring(debut, fin + 6);
		 var child = div.firstChild;

		// Parse l'arbre
		while (child) {
			var text = "";
			if (child.nodeType == 1) {
				var child2 = child.firstChild;
				while (child2) {
					if (child2.nodeType == 1) {
						if (child2.nodeName == "H5") {
							if (child2.hasChildNodes()) {
								var child3 = child2.firstChild;
								while (child3) {
									if (child3.nodeType == 1) {
										if (child3.nodeName == "A") {
											if (child3.hasChildNodes()) {
												var link = child3.getAttribute("href");
												var title = child3.firstChild.nodeValue.replace(/^\s+/g,'').replace(/\s+$/g,'');
											}
										}
									}
									else {
										var title = child3.nodeValue.replace(/^\s+/g,'').replace(/\s+$/g,'');
									}
									child3 = child3.nextSibling;
								}
							}
						}
						if (child2.nodeName == "P") {
							if (child2.hasChildNodes()) {
								var child3 = child2.firstChild;
								while (child3) {
									if (child3.nodeType == 1) {
										if (child3.nodeName == "STRONG") {
											if (child3.hasChildNodes()) {
												text += "<strong>" + child3.firstChild.nodeValue + "</strong>";
											}
										}
										else if (child3.nodeName == "A") {
											if (child3.hasChildNodes()) {
												text += "<a href=\"" + child3.getAttribute("href") + "\">" + child3.firstChild.nodeValue + "</a>";
											}
										}
									}
									else {
										text += child3.nodeValue.replace(/"/g,'');
									}
									child3 = child3.nextSibling;
								}
							}
						}
					}
					child2 = child2.nextSibling;
				}
				feed = {"titre": title, "lien": link, "image": image, "texte": text};
			}							
			child = child.nextSibling;
		}
		
		return (feed);
	}