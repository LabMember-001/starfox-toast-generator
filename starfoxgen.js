const sfgen = { 
	/* Default Configuration */
	name: "Starfox Generator",
	remove_delay: 5000,
	already_active: false,
	currently_running: false,
	allow_multiple: true,
	auto_close: true, //5s
	image_size: 44, //spritesheet tile size
	image_scale: 1.5, //scale up image by X%
	text_speed: 50, //ms
	characters: {
		noise: {
			name: "",
			x: [0, -44],
			y: [0, 0],
		},
		james: {
			name: "???",
			x: [0, -44],
			y: [-44, -44],
		},
		rob: {
			name: "Rob",
			x: [0, -44],
			y: [-88, -88],
		},
		bill: {
			name: "Bill",
			x: [0, -44],
			y: [-176, -176],
		},
		kat: {
			name: "Kat",
			x: [0, -44],
			y: [-220, -220],
		},
		wolf: {
			name: "Wolf",
			x: [-176, -220],
			y: [0, 0],
		},
		andrew: {
			name: "Andrew",
			x: [-176, -220],
			y: [-44, -44],
		},
		leon: {
			name: "Leon",
			x: [-176, -220],
			y: [-88, -88],
		},
		pigma: {
			name: "Pigma",
			x: [-176, -220],
			y: [-132, -132],
		},
		andross: {
			name: "Andross",
			x: [-176, -220],
			y: [-176, -176],
		},
		fox: {
			name: "Fox",
			x: [-88, -132],
			y: [-44, -44],
		},
		falco: {
			name: "Falco",
			x: [-88, -132],
			y: [-88, -88],
		},
		peppy: {
			name: "Peppy",
			x: [-88, -132],
			y: [-132, -132],
		},
		slippy: {
			name: "Slippy",
			x: [-88, -132],
			y: [-176, -176],			
		},
		general_pepper: {
			name: "Pepper",
			x: [-88, -132],
			y: [-220, -220],			
		},
	},
	/* Functions */
	startup: function () {
		if (sfgen.already_active == true) {
			console.log("ALREADY RUNNING SFGEN INSTANCE");
			return;
		}
		sfgen.already_active = true;
		var _style = document.createElement("style");
		_style.textContent = `

			@font-face {
			  font-family: advanced-pixel-7;
			  src: url('advanced-pixel-7/advanced-pixel-7.ttf');
			}
			@font-face {
			  font-family: all-aircraft-report;
			  src: url('all-aircraft-report/all-aircraft-report.otf');
			}

			#toast-container {
				position: absolute;
				display: block;
				width: ${ 20 + 175 * sfgen.image_scale}px;
				left: calc(50% - ${(175 * sfgen.image_scale)/2}px);
				top: 50px;
				z-index: 99999;
				-webkit-user-select: none;
				user-select: none;
			}
			.toaster {
				display: flex;
				width: ${ 175 * sfgen.image_scale}px;
				height: ${(sfgen.image_size * sfgen.image_scale) + (5 * sfgen.image_scale)}px;
				margin: 20px auto;
			}
			.toaster-text-container {
				display: flex;
				height: 100%;
				flex-direction: column;
				padding-bottom: 5px;
				overflow-y: clip;
				flex: 1 1 100%;
				width: 100%;
			}
			.toaster-name {
				font-family: all-aircraft-report;
				font-size: ${ 8 * sfgen.image_scale}px;
				font-weight: bold;
				text-transform: uppercase;
				letter-spacing: 2px;
				color: yellow;
				margin-left: 5px;
				text-shadow: 1px 1px 0 #000,-1px 1px 0 #000,1px -1px 0 #000,-1px -1px 0 #000,0px 1px 0 #000,0px -1px 0 #000,-1px 0px 0 #000,1px 0px 0 #000,2px 2px 0 #000,-2px 2px 0 #000,2px -2px 0 #000,-2px -2px 0 #000,0px 2px 0 #000,0px -2px 0 #000,-2px 0px 0 #000,2px 0px 0 #000,1px 2px 0 #000,-1px 2px 0 #000,1px -2px 0 #000,-1px -2px 0 #000,2px 1px 0 #000,-2px 1px 0 #000,2px -1px 0 #000,-2px -1px 0 #000;
			}
			.toaster-text {
				font-family: advanced-pixel-7;
				font-size: ${ 16 * sfgen.image_scale}px;
				font-size: normal;
				line-height: 0.8;
				letter-spacing: 0.5px;
				color: #ffffffe8;
				height: 100%;
				margin: auto auto auto 10px;
				padding: 0 5px;
				background: #181331d4;
				width: 80%;
				white-space: pre-wrap;
				/*word-break: break-all;*/
				overflow-y: hidden;
				overflow-wrap: break-word;
			}
			.toaster-image {
				width: ${sfgen.image_size * sfgen.image_scale}px;
				height: ${sfgen.image_size * sfgen.image_scale}px;
				/*margin-top: ${ 5 * sfgen.image_scale}px;*/
				margin: auto;
				background-image: url('1461.png');
				background-position-x: left;
				background-position-y: top;
				background-size: 800%;
				flex: 1 0 ${sfgen.image_size * sfgen.image_scale}px;
				image-rendering: crisp-edges;
			}
	`;
		document.head.appendChild(_style);

		var _container = document.createElement("div");
		_container.setAttribute("id", "toast-container");
		document.body.appendChild(_container);
	},
	queue: function(_char = "fox", _text = "default text") {
		if (sfgen.already_active == false) {
			console.log("MUST RUN STARTUP FIRST");
			return;
		}
		if (sfgen.allow_multiple == false && sfgen.currently_running == true) {
			console.log("already running " + Date.now() );
			return;
		}
		sfgen.currently_running = true;
		sfgen.generate(_char, _text);
	},
	generate: function (_char = "fox", _text = "default text") { //add characters and text input here
		var _container = document.getElementById("toast-container");
		var unique_number = new Uint32Array(1);
		window.crypto.getRandomValues(unique_number);
		var _id = "toast-" + unique_number;
		var _toast = document.createElement("div");
		_toast.setAttribute("class", "toaster");
		_toast.setAttribute("id", _id);

		var _character = sfgen.characters[_char];

		_toast.innerHTML = `
			<div class="toaster-text-container">
				<span class="toaster-name">${_character['name']}</span>
				<span class="toaster-text">${_text}</span>
			</div>
		`;
		_container.prepend(_toast);

		var _image = document.createElement("div");
		_image.setAttribute("class", "toaster-image");
		_image.setAttribute("id", "image-" + _id);
		_image.innerHTML = `
			<style>
				#image-${_id} { 
					background-position-x: ${_character['x'][0] * sfgen.image_scale}px;
					background-position-y: ${_character['y'][0] * sfgen.image_scale}px;
					animation: 
						${_id}_noise 0.1s steps(1) 0s infinite,
						${_id}_flicker 0.15s steps(1) 0.3s infinite,
						${_id}_height 0.2s ease-in 0s 1;
				}

				#image-${_id}.finished { 
					background-position-x: ${_character['x'][0] * sfgen.image_scale}px;
					background-position-y: ${_character['y'][0] * sfgen.image_scale}px;
					animation: none;
				}

				#${_id} .toaster-text {
					color: #ffffffe8;
					height: 0px;
					animation: 
						${_id}_text_height 0.1s ease-in 0.2s 1,
						${_id}_text_color 0.4s steps(1) 0s 1;
				}

				#${_id} .toaster-name {
					color: yellow;
					animation:
						${_id}_name 0.25s steps(1) 0s 1;
				}

				@keyframes ${_id}_flicker {
					0% {
						background-position-x: ${_character['x'][0] * sfgen.image_scale}px;
						background-position-y: ${_character['y'][0] * sfgen.image_scale}px;		
					}
					50% {
						background-position-x: ${_character['x'][1] * sfgen.image_scale}px;
						background-position-y: ${_character['y'][1] * sfgen.image_scale}px;
					}
					100% {
						background-position-x: ${_character['x'][0] * sfgen.image_scale}px;
						background-position-y: ${_character['y'][0] * sfgen.image_scale}px;
					}
				}
				@keyframes ${_id}_noise {
					0% {
						background-position-x: ${sfgen.characters.noise.x[0] * sfgen.image_scale}px;
						background-position-y: ${sfgen.characters.noise.y[0] * sfgen.image_scale}px;		
					}
					50% {
						background-position-x: ${sfgen.characters.noise.x[1] * sfgen.image_scale}px;
						background-position-y: ${sfgen.characters.noise.y[1] * sfgen.image_scale}px;
					}
					100% {
						background-position-x: ${sfgen.characters.noise.x[0] * sfgen.image_scale}px;
						background-position-y: ${sfgen.characters.noise.y[0] * sfgen.image_scale}px;
					}
				}
				@keyframes ${_id}_height {
					from {
						background-position-x: 0px;
						background-position-y: 0px;
						height: ${2 * sfgen.image_scale}px;
					}
					to {
						background-position-x: 0px;
						background-position-y: 0px;
						height: ${sfgen.image_size * sfgen.image_scale}px;
					}
				}
				@keyframes ${_id}_text_height {
					from {
						height: ${2 * sfgen.image_scale}px;
					}
					to {
						height: ${sfgen.image_size * sfgen.image_scale}px;
					}
				}
				@keyframes ${_id}_text_color {
					from {
						color: #0000;
					}
					to {
						color: #ffffffe8;
					}
				}
				@keyframes ${_id}_name {
					from {
						color: #0000;
						text-shadow: none;
					}
					to {
						color: yellow;
						text-shadow: 1px 1px 0 #000,-1px 1px 0 #000,1px -1px 0 #000,-1px -1px 0 #000,0px 1px 0 #000,0px -1px 0 #000,-1px 0px 0 #000,1px 0px 0 #000,2px 2px 0 #000,-2px 2px 0 #000,2px -2px 0 #000,-2px -2px 0 #000,0px 2px 0 #000,0px -2px 0 #000,-2px 0px 0 #000,2px 0px 0 #000,1px 2px 0 #000,-1px 2px 0 #000,1px -2px 0 #000,-1px -2px 0 #000,2px 1px 0 #000,-2px 1px 0 #000,2px -1px 0 #000,-2px -1px 0 #000;
					}
				}
			</style>
		`;
		_toast.prepend(_image);

		setTimeout(function(){
			document.getElementById(_id).getElementsByClassName("toaster-text")[0].style.height = `${(sfgen.image_size * sfgen.image_scale)}px`;
		}, 250);

		document.getElementById(_id).getElementsByClassName("toaster-text")[0].innerHTML = '';

		for (var i = 0; i < _text.length+1; i++) {
			var _letter = document.createElement('span');
			_letter.textContent = _text[i];
			_letter.setAttribute('style', 'opacity: 0');
			document.getElementById(_id).getElementsByClassName("toaster-text")[0].appendChild(_letter);
		}

		function integerTimeout(i, last = false) {
			setTimeout(function() {
				if (document.getElementById(_id)) {
					document.getElementById(_id).getElementsByClassName("toaster-text")[0].querySelectorAll('span')[i].setAttribute('style', '');
					if (last == true) {
						setTimeout(function(){
							if (document.getElementById(_id)) {
								document.getElementById("image-"+_id).classList.add("finished");
							}
						}, 500);
						if (sfgen.auto_close == true) {
							setTimeout(function(){
								sfgen.close(_id);
							}, 1300);
						}
					}
				}
			}, (450 + (i * sfgen.text_speed)) );
		}

		for (var i = 0; i < _text.length+1; i++) {
			if (i == _text.length) {
				integerTimeout(i, last = true);
			} else {
				integerTimeout(i);
			}
		}

		_toast.addEventListener("click", function() {
			if (_toast.getAttribute("data-clicked") != 1) {
				sfgen.close(_id);
			}
			if (!_toast.getAttribute("data-clicked")) {
				_toast.setAttribute("data-clicked", 1);
			}
		});
	},
	close: function(_id = "") {
		if (document.getElementById(_id)) {
			var _id2 = document.getElementById(_id);
			var _id2_image = document.getElementById("image-"+_id)
			_id2_image.innerHTML = `
				<style>
					#${_id} .toaster-name {
						color: #0000;
						text-shadow: none;
					}

					#${_id} .toaster-text {
						color: #0000;
						animation: ${_id}_remove_height 0.15s ease-out 0s 1;
						margin: auto;
						height: 0px;
					}

					#image-${_id} { 
						background-position-x: ${sfgen.characters.noise.x[0] * sfgen.image_scale}px;
						background-position-y: ${sfgen.characters.noise.y[0] * sfgen.image_scale}px;
						animation: ${_id}_remove_flicker 0.3s steps(1) 0s infinite, ${_id}_remove_height 0.1s ease-out 0s 1;
						/*height: 0px;*/
					}

					@keyframes ${_id}_remove_flicker {
						0% {
							background-position-x: ${sfgen.characters.noise.x[0] * sfgen.image_scale}px;
							background-position-y: ${sfgen.characters.noise.y[0] * sfgen.image_scale}px;		
						}
						50% {
							background-position-x: ${sfgen.characters.noise.x[1] * sfgen.image_scale}px;
							background-position-y: ${sfgen.characters.noise.y[1] * sfgen.image_scale}px;
						}
						100% {
							background-position-x: ${sfgen.characters.noise.x[0] * sfgen.image_scale}px;
							background-position-y: ${sfgen.characters.noise.y[0] * sfgen.image_scale}px;
						}
					}

					@keyframes ${_id}_remove_height {
						from {
							height: ${sfgen.image_size * sfgen.image_scale}px;
						}
						to {
							height: ${2 * sfgen.image_scale}px;
						}
					}
				</style>
			`;

			//	_id2_image.style.height = `${(sfgen.image_size * sfgen.image_scale)}px`;
			//	_id2_image.style.width = `${(sfgen.image_size * sfgen.image_scale)}px`;

			setTimeout(function(){
				_id2_image.style.height = `0px`;
				_id2_image.style.width = `0px`;
				_id2.getElementsByClassName("toaster-text")[0].style.height = `0px`;
			}, 100);

			setTimeout(function(){
				_id2_image.style.background = "#0000";
			}, 100);

			if (document.getElementById(_id)) {
				sfgen.remove(_id, 250);
			}
		}
		return false;
	},
	remove: function(_id = "", _delay = sfgen.remove_delay) {
		if (document.getElementById(_id)) {
			//sfgen.close();
			setTimeout(function(){
				if (document.getElementById(_id)) {
					document.getElementById(_id).remove();
				}
				sfgen.currently_running = false;
			}, _delay);
		}
	}
};