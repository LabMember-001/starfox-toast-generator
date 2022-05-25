document.addEventListener('DOMContentLoaded', (event) => {
	function getchar() {
		var sfxselector = document.getElementById("sfgen-characterselect");
		var sfxstring = sfxselector.options[sfxselector.selectedIndex].value;
		return sfxstring;
	}

	function getstring() {
		
		if (document.getElementById("sfgen-textselect").value == '') {

			var sfx_items = [
"Let´s take it to ´em, Fox!",
`Slippy, watch out!
Bogey on your tail!`,
"Let´s see how you handle our new ships!",
"Something´s wrong with the G-Diffuser!",
"Things are starting to heat up!",
"They´re on me! I´m getting careless.",
"Never give up! Trust your instincts!",
"Let´s see what you´ve got.",
"You´ve got an enemy on your tail!",
			];
			var random_selected = sfx_items[Math.floor(Math.random() * sfx_items.length)];
			return random_selected;
		} else {
			return document.getElementById("sfgen-textselect").value;
		}
	}

	document.getElementById("sfgen-demo-gen").addEventListener("click", function() {
		sfgen.queue(getchar(), getstring() );
	}); 

		sfgen.startup();
	setTimeout(function(){
		sfgen.queue("slippy", "Enemy shield analyzed!");
	}, 200);
	setTimeout(function(){
		sfgen.queue("peppy", "Never give up! Trust your instincts! ");
	}, 3400);
	setTimeout(function(){
		sfgen.queue("falco", "I guess it´s your turn to be thankful.");
	}, 7600);
	setTimeout(function(){
		sfgen.queue("fox", "We´re heading out! All aircraft report.");
	}, 12100);
});