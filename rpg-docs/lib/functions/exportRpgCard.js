//CONSTANTS ------------------------------------------------------------------------------------------------------------------------------------------------------
var stats = {
	"strength":{"name":"Strength"},
	"dexterity":{"name":"Dexterity"},
	"constitution":{"name":"Constitution"},
	"intelligence":{"name":"Intelligence"},
	"wisdom":{"name":"Wisdom"},
	"charisma":{"name":"Charisma"},
	"strengthSave":{"name":"Strength Save"},
	"dexteritySave":{"name":"Dexterity Save"},
	"constitutionSave":{"name":"Constitution Save"},
	"intelligenceSave":{"name":"Intelligence Save"},
	"wisdomSave":{"name":"Wisdom Save"},
	"charismaSave":{"name":"Charisma Save"},
	"acrobatics":{"name":"Acrobatics"},
	"animalHandling":{"name":"Animal Handling"},
	"arcana":{"name":"Arcana"},
	"athletics":{"name":"Athletics"},
	"deception":{"name":"Deception"},
	"history":{"name":"History"},
	"insight":{"name":"Insight"},
	"intimidation":{"name":"Intimidation"},
	"investigation":{"name":"Investigation"},
	"medicine":{"name":"Medicine"},
	"nature":{"name":"Nature"},
	"perception":{"name":"Perception"},
	"performance":{"name":"Performance"},
	"persuasion":{"name":"Persuasion"},
	"religion":{"name":"Religion"},
	"sleightOfHand":{"name":"Sleight of Hand"},
	"stealth":{"name":"Stealth"},
	"survival":{"name":"Survival"},
	"initiative":{"name":"Initiative"},
	"hitPoints":{"name":"Hit Points"},
	"armor":{"name":"Armor"},
	"dexterityArmor":{"name":"Dexterity Armor Bonus"},
	"speed":{"name":"Speed"},
	"proficiencyBonus":{"name":"Proficiency Bonus"},
	"ki":{"name":"Ki Points"},
	"sorceryPoints":{"name":"Sorcery Points"},
	"rages":{"name":"Rages"},
	"rageDamage":{"name":"Rage Damage"},
	"expertiseDice":{"name":"Expertise Dice"},
	"superiorityDice":{"name":"Superiority Dice"},
	"carryMultiplier": {"name": "Carry Capacity Multiplier"},
	"level1SpellSlots":{"name":"level 1 Spell Slots"},
	"level2SpellSlots":{"name":"level 2 Spell Slots"},
	"level3SpellSlots":{"name":"level 3 Spell Slots"},
	"level4SpellSlots":{"name":"level 4 Spell Slots"},
	"level5SpellSlots":{"name":"level 5 Spell Slots"},
	"level6SpellSlots":{"name":"level 6 Spell Slots"},
	"level7SpellSlots":{"name":"level 7 Spell Slots"},
	"level8SpellSlots":{"name":"level 8 Spell Slots"},
	"level9SpellSlots":{"name":"level 9 Spell Slots"},
	"d6HitDice":{"name":"d6 Hit Dice"},
	"d8HitDice":{"name":"d8 Hit Dice"},
	"d10HitDice":{"name":"d10 Hit Dice"},
	"d12HitDice":{"name":"d12 Hit Dice"},
	"acidMultiplier":{"name":"Acid damage", "group": "Weakness/Resistance"},
	"bludgeoningMultiplier":{
		"name":"Bludgeoning damage", "group": "Weakness/Resistance",
	},
	"coldMultiplier":{
		"name":"Cold damage", "group": "Weakness/Resistance",
	},
	"fireMultiplier":{
		"name":"Fire damage", "group": "Weakness/Resistance",
	},
	"forceMultiplier":{
		"name":"Force damage", "group": "Weakness/Resistance",
	},
	"lightningMultiplier":{
		"name":"Lightning damage", "group": "Weakness/Resistance",
	},
	"necroticMultiplier":{
		"name":"Necrotic damage", "group": "Weakness/Resistance",
	},
	"piercingMultiplier":{
		"name":"Piercing damage", "group": "Weakness/Resistance",
	},
	"poisonMultiplier":{
		"name":"Poison damage", "group": "Weakness/Resistance",
	},
	"psychicMultiplier":{
		"name":"Psychic damage", "group": "Weakness/Resistance",
	},
	"radiantMultiplier":{
		"name":"Radiant damage", "group": "Weakness/Resistance",
	},
	"slashingMultiplier":{
		"name":"Slashing damage", "group": "Weakness/Resistance",
	},
	"thunderMultiplier":{
		"name":"Thunder damage", "group": "Weakness/Resistance",
	},
};

var saves = {
	strengthSave: "Strength Save",
	dexteritySave: "Dexterity Save",
	constitutionSave: "Constitution Save",
	intelligenceSave: "Intelligence Save",
	wisdomSave: "Wisdom Save",
	charismaSave: "Charisma Save",
};

var skills = {
	acrobatics: "Acrobatics",
	animalHandling: "Animal Handling",
	arcana: "Arcana",
	athletics: "Athletics",
	deception: "Deception",
	history: "History",
	insight: "Insight",
	intimidation: "Intimidation",
	investigation: "Investigation",
	medicine: "Medicine",
	nature: "Nature",
	perception: "Perception",
	performance: "Performance",
	persuasion: "Persuasion",
	religion: "Religion",
	sleightOfHand: "Sleight of Hand",
	stealth: "Stealth",
	survival: "Survival",
	initiative: "Initiative",
};

var operations = {
	base: {name: "Base Value: "},
	proficiency: {name: "Proficiency"},
	add: {name: "+"},
	mul: {name: "×"},
	min: {name: "Min: "},
	max: {name: "Max: "},
	advantage: {name: "Advantage"},
	disadvantage: {name: "Disadvantage"},
	passiveAdd: {name: "Passive Bonus: "},
	fail: {name: "Automatically Fail"},
};

var proficiencyValues = {
	0: "Not Proficient",
	0.5: "Half Prof. Bonus",
	1: "Proficient",
	2: "Double Prof. Bonus",
}

//HELPERS ------------------------------------------------------------------------------------------------------------------------------------------------------
var ordinal = function(number) {
	if (typeof number !== "number") return number;

	number = number.toFixed(); //round to integer
	var string = number.toString();
	var last = string[string.length-1];

	if (last == "1") {
		return string + "st";
	}
	if (last == "2") {
		return string + "nd";
	}
	if (last == "3") {
		return string + "rd";
	}
	return string + "th"
}

var prepareForCard = function(string) {
	return string.replace(/\n/g, "");
}

var materialNeedsGp = function(string) {
	if (!string) return false;
	gpRegExp = /\b[0-9]+ ?(cp|sp|gp)\b/i;
	return gpRegExp.test(string);
}

var spellComponents =  function(spell){
	var components = "";
	if (spell.components.verbal){
		components += "V";
	}
	if (spell.components.somatic){
		components += components ? ", S" : "S";
	}
	if (spell.components.material){
		components += components ? ", M" : "M";
		if (materialNeedsGp(spell.components.material)) {components += "gp";}
	}
	if (spell.components.concentration){
		components += components ? ", C" : "C";
	}
	return components;
}

var operationName = function(effect){
	if (
		effect.operation === "proficiency" ||
		effect.operation === "conditional"
	) return null;
	if (stats[effect.stat] && stats[effect.stat].group === "Weakness/Resistance")
		return null;
	if (effect.operation === "add" && evaluateEffect(effect.charId, effect) < 0)
		return null;
	return operations[effect.operation] &&
		operations[effect.operation].name || "No Operation";
}

var statValue = function(effect){
	if (
		effect.operation === "advantage" ||
		effect.operation === "disadvantage" ||
		effect.operation === "fail"
	){
		return null;
	}
	if (effect.operation === "proficiency"){
		if (effect.value == 0.5 || effect.calculation == 0.5)
			return "Half Proficiency";
		if (effect.value == 1   || effect.calculation == 1)
			return "Proficiency";
		if (effect.value == 2   || effect.calculation == 2)
			return "Double Proficiency";
	}
	if (effect.operation === "conditional"){
		return effect.calculation || effect.value;
	}
	if (stats[effect.stat] && stats[effect.stat].group === "Weakness/Resistance"){
		if (effect.value === 0.5) return "Resistance";
		if (effect.value === 2)   return "Vulnerability";
		if (effect.value === 0)   return "Immunity";
	}
	var value = evaluateEffect(effect.charId, effect);
	if (_.isNumber(value)) return value;
	return effect.calculation || effect.value;
}

//ACTUAL EXPORTING FUNCTIONS ------------------------------------------------------------------------------------------------------------------------------------------------------
exportFeatureRpgCard = function(featureId, charId) {
	var feature = Features.findOne(featureId);
	var character = Characters.findOne(charId);
	if (!feature) return;
	if (!character) return;
	var charName = character.name;

	profocienciesCursor = Proficiencies.find({"parent.id": featureId}, {sort: {type: -1}});
	effectsCursor = Effects.find({"parent.id": featureId});

	var card = {};
	card.contents = [];
	card.tags = ["feature", charName];

	card.title = feature.name;
	card.icon = "rosa-shield"; //TODO: support icons if they get added later
	card.contents.push("subtitle | Feature");


	if (effectsCursor.count() || profocienciesCursor.count()){
		card.contents.push("rule");
	}

	effectsCursor.forEach(function (effect) {
		statName = stats[effect.stat] && stats[effect.stat].name || "No Stat";
		card.contents.push("property | " + statName + " | " + operationName(effect) + statValue(effect));
	});
	profocienciesCursor.forEach(function(proficiency) {
		if (proficiency.type == "skill") {
			var name = skills[proficiency.name];
		}
		else if (proficiency.type == "save") {
			var name = saves[proficiency.name];
		}
		else {
			var name = proficiency.name;
		}
		if (proficiencyValues[proficiency.value] != undefined) {
			proficiencyValue = proficiencyValues[proficiency.value];
		} else {
			proficiencyValue = "No Operation";
		}

		card.contents.push("property | " + name + " | " + proficiencyValue);
	});

	card.contents.push("rule");

	if (feature.description) {
		card.contents.push("fill");
		var markedDownDescription = marked(feature.description);
		card.contents.push( "text | " + prepareForCard(markedDownDescription) ); //for now just output the raw Markdown.
		card.contents.push("fill");
	}

	return card;
}

exportItemRpgCard = function(itemId, charId) {
	var item = Items.findOne(itemId);
	var character = Characters.findOne(charId);
	if (!item) return;
	if (!character) return;
	var charName = character.name;

	attacksCursor = Attacks.find({"parent.id": itemId});
	effectsCursor = Effects.find({"parent.id": itemId});

	var card = {};
	card.contents = [];
	card.tags = ["item", charName];

	if (attacksCursor.count()) {
		card.tags.push("weapon"); //if it has attacks it's probably a weapon
	}

	card.title = item.name;
	card.icon = "swap-bag"; //TODO: change to mixed-swords if it has an attack / drink-me if it is "Potion..." / shiny-purse if it requires attunement / etc.
	//TODO: support icons if they get added later

	var weightAndValue = ""
	if (item.weight) { weightAndValue += item.weight + (item.weight==1 ? " lb, " : " lbs, "); }
	if (item.value) { weightAndValue += valueString(item.value); }

	card.contents.push("subtitle | " + weightAndValue);

	attacksCursor.forEach(function (attack) {
		card.contents.push("rule");

		//TODO: maybe parse these to result in something like "Strength or Dexterity" or "Dexterity + 2" rather than just a straight "+X"
		card.contents.push("property | Damage | " + evaluateString(charId, attack.damage));
		card.contents.push("property | Modifier | " + evaluateSigned(charId, attack.attackBonus));
		if (attack.details) {
			card.contents.push("property | Properties | " + attack.details);
		}
	});

	if (effectsCursor.count() > 0) {
		card.contents.push("rule");
		effectsCursor.forEach(function(effect) {
			statName = stats[effect.stat] && stats[effect.stat].name || "No Stat";
			card.contents.push("property | " + statName + " | " + operationName(effect) + statValue(effect));
		});
	}
	
	card.contents.push("rule");

	if (item.description) {
		card.contents.push("fill");
		var markedDownDescription = marked(item.description);
		card.contents.push( "text | " + prepareForCard(markedDownDescription) ); //for now just output the raw Markdown.
		card.contents.push("fill");
	}

	return card;
}

exportSpellRpgCard = function(spellId, charId) {
	var spell = Spells.findOne(spellId);
	var character = Characters.findOne(charId);
	if (!spell) return;
	if (!character) return;
	var charName = character.name;

	attacksCursor = Attacks.find({"parent.id": spellId});

	var card = {};
	card.contents = [];
	card.tags = ["spell", spell.school, charName];

	card.title = spell.name;
	card.icon = "book-cover"; //TODO: change depending on spell school/level?
	//TODO: support icons if they get added later

	if (spell.level == 0) {
		var schoolAndLevel = spell.school + " cantrip";
		card.tags.push("cantrip");
	} else {
		var schoolAndLevel = ordinal(spell.level) + " level " + spell.school;
		card.tags.push(ordinal(spell.level) + " level");
	}
	if (spell.ritual) {
		schoolAndLevel += " (ritual)";
		card.tags.push("ritual")
	}

	card.contents.push("subtitle | " + schoolAndLevel);

	card.contents.push("rule");

	if (spell.castingTime)	{ card.contents.push("property | Casting time | "	+ spell.castingTime);	}
	if (spell.range)		{ card.contents.push("property | Range | "			+ spell.range);			}
	if (spell.duration)		{ card.contents.push("property | Duration | "		+ spell.duration);		}
	if (spellComponents(spell))	{ card.contents.push("property | Components | "		+ spellComponents(spell));	}
	if (spell.castingTime || spell.range || spell.duration || spellComponents(spell)) {card.contents.push("rule"); } //only add the second rule if a property was listed

	attacksCursor.forEach(function (attack) {
		//TODO: maybe parse these to result in something like "Strength or Dexterity" or "Dexterity + 2" rather than just a straight "+X"
		card.contents.push("property | Damage | " + evaluateString(charId, attack.damage));
		card.contents.push("property | Modifier | " + evaluateSigned(charId, attack.attackBonus));
		if (attack.details) {
			card.contents.push("property | Properties | " + attack.details);
		}
		card.contents.push("rule");
	});

	if (spell.description) {
		var description = "";
		var atHigherLevels = ""
		var breakpoint = spell.description.toUpperCase().indexOf("AT HIGHER LEVELS")
		if(breakpoint != -1) { //i.e. if one was found
			description = spell.description.substring(0, breakpoint);
			description = description.replace(/[*_]{0-3}$/, "");

			atHigherLevels = spell.description.substring(breakpoint);
			atHigherLevels = atHigherLevels.replace(/at higher levels[\W]?[*_]{0-3}/i, ""); //remove "at higher levels" at the start, along with punctuation and **Markdown**.
			atHigherLevels = atHigherLevels.replace(/^\W*?\s+/, ""); //remove punctuation and whitespace after "at higher levels"
		} else {
			description = spell.description;
		}

		card.contents.push("fill");
		var markedDownDescription = marked(description);
		card.contents.push( "text | " + prepareForCard(markedDownDescription) ); //for now just output the raw Markdown.
		card.contents.push("fill");

		if (atHigherLevels) {
			card.contents.push("section | At higher levels");
			//card.contents.push("text | " + converter.makeHtml(atHigherLevels));
			card.contents.push("text | " + atHigherLevels); //for now just output the raw Markdown.
		}
	}

	return card;
}

exportRpgCards = function(charId) { //export important things to rpg-cards: features, items, spells.
	var cards = [];
	var card;
	Features.find({"charId": charId}).forEach((feature) => {
		card = null; //reset card
		card = exportFeatureRpgCard(feature._id, charId);
		if (card) cards.push(card);
	});
	Items.find({"charId": charId}).forEach((item) => {
		card = null; //reset card
		card = exportItemRpgCard(item._id, charId);
		if (card) cards.push(card);
	});
	Spells.find({"charId": charId}).forEach((spell) => {
		card = null; //reset card
		card = exportSpellRpgCard(spell._id, charId);
		if (card) cards.push(card);
	});
	console.log(cards);
	console.log(JSON.stringify(cards));
}
