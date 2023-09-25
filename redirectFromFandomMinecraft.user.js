// ==UserScript==
// @name         Redirect Fandom Minecraft wiki to Minecraft.wiki
// @namespace    https://github.com/NicholasDJM/RedirectFromFandomMinecraft
// @version      1.1.2
// @description  Attempts to redirect to the equivalent page on Minecraft.wiki.
// @author       Nicholas Miller
// @updateURL    https://raw.githubusercontent.com/NicholasDJM/RedirectFromFandomMinecraft/main/redirectFromFandomMinecraft.user.js
// @downloadURL  https://raw.githubusercontent.com/NicholasDJM/RedirectFromFandomMinecraft/main/redirectFromFandomMinecraft.user.js
// @match        https://minecraft.fandom.com/wiki/*
// @match        https://minecraft-archive.fandom.com/wiki/*
// @icon         https://icons.duckduckgo.com/ip2/minecraft.wiki.ico
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
	"use strict";
	/**
	* @param {string | undefined} href - Set the page URL. Leave blank to get the current URL.
	* @returns string or undefined.
	*/
	const href = href => {
		const url = new URL(window.location);
		if (href && url.searchParams.get("redirect") !== "false") {
			url.searchParams.append("redirect", "false");
			history.replaceState("", "", url);
			window.location.href = href;
		} else {
			return window.location.href;
		}
	};
	switch (href()) {
		case "https://minecraft.fandom.com/wiki/Minecraft_Wiki": {
			href("https://minecraft.wiki");
			break;
		}
		case "https://minecraft-archive.fandom.com/wiki/Minecraft_Wiki": {
			href("https://minecraft.wiki");
			break;
		}
		default: {
			if (href().split("https://minecraft.fandom.com/wiki/").length > 1) {
				href("https://minecraft.wiki/w/" + href().split("https://minecraft.fandom.com/wiki/")[1]);
			}
			if (href().split("https://minecraft-archive.fandom.com/wiki/").length > 1) {
				href("https://minecraft.wiki/w/" + href().split("https://minecraft-archive.fandom.com/wiki/")[1]);
			}
		}
	}
})();