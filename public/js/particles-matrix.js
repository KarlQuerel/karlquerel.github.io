// Matrix Rain (canvas-based) — columns of falling glyphs with highlighted head
(function () {
	const container = document.getElementById("particles-js");
	if (!container) return;

	// Tweakable configuration
	const MATRIX_CONFIG = {
		fontSize: 15,                 // px height of characters and row step
		fontFamily: '"Press Start 2P", monospace', // canvas font family
		speedMin: 0.03,               // min rows per frame
		speedMax: 0.08,               // max rows per frame
		trailFadeAlpha: 10,         // background fade per frame (higher = shorter trails)
		headOpacity: 1,            // 0..1 opacity for the white head
		trailGlow: 0.05,                 // glow blur for green trail
		resetChance: 0.8,           // probability to restart a column after it leaves screen
		charChangeEveryFrames: 15,     // how many frames between character changes (1 = every frame)
		trailLength: 20000,             // number of characters in the trail
	};

	const canvas = document.createElement("canvas");
	canvas.style.position = "absolute";
	canvas.style.top = "0";
	canvas.style.left = "0";
	canvas.style.width = "100%";
	canvas.style.height = "100%";
	canvas.style.pointerEvents = "none";
	container.appendChild(canvas);

	const ctx = canvas.getContext("2d");

	const chars = (
		"0123456789" +
		"ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
		"abcdefghijklmnopqrstuvwxyz" +
		"!@#$%^&*()-_+={}[]|\\:;'\"<>,.?/`~"
	).split("");

	let dpr = Math.max(window.devicePixelRatio || 1, 1);
	let fontSize = MATRIX_CONFIG.fontSize; // logical pixels
	let columnWidth = fontSize; // will be refined after measuring
	let columns = 0;
	let rows = 0;
	let drops = [];
	let speeds = [];
	let headChars = [];
	let trailChars = [];
	let charHistory = []; // Store character history for each column
	let frame = 0;

	function resize() {
		const w = container.clientWidth || window.innerWidth;
		const h = container.clientHeight || window.innerHeight;

		canvas.width = Math.floor(w * dpr);
		canvas.height = Math.floor(h * dpr);
		canvas.style.width = w + "px";
		canvas.style.height = h + "px";

		ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
		ctx.font = `${fontSize}px ${MATRIX_CONFIG.fontFamily}`;
		ctx.textBaseline = "top";

		// Measure glyph width to keep columns aligned for this font
		const sampleWidth = Math.ceil(ctx.measureText("M").width) || fontSize;
		columnWidth = sampleWidth;

		columns = Math.floor(w / columnWidth);
		rows = Math.ceil(h / fontSize);

		const oldDrops = drops;
		drops = new Array(columns);
		speeds = new Array(columns);
		headChars = new Array(columns);
		trailChars = new Array(columns);
		charHistory = new Array(columns);
		for (let i = 0; i < columns; i++) {
			// Always start from the top of the screen
			drops[i] = 0;
			// per-column speed in rows per frame
			speeds[i] = MATRIX_CONFIG.speedMin + Math.random() * (MATRIX_CONFIG.speedMax - MATRIX_CONFIG.speedMin);
			headChars[i] = chars[(Math.random() * chars.length) | 0];
			trailChars[i] = headChars[i];
			charHistory[i] = [headChars[i]]; // Initialize with current character
		}
	}

	function drawFrame() {
		frame++;
		// translucent fill for trails (higher alpha = shorter trails)
		ctx.fillStyle = `rgba(0, 0, 0, ${MATRIX_CONFIG.trailFadeAlpha})`;
		ctx.fillRect(0, 0, canvas.width / dpr, canvas.height / dpr);

		for (let col = 0; col < columns; col++) {
			const x = col * columnWidth;
			const y = drops[col] * fontSize;

			// update characters at configurable rate
			if (frame % MATRIX_CONFIG.charChangeEveryFrames === 0) {
				// Add new character to history
				charHistory[col].unshift(chars[(Math.random() * chars.length) | 0]);
				// Keep only the trail length
				if (charHistory[col].length > MATRIX_CONFIG.trailLength) {
					charHistory[col].pop();
				}
			}

			// Draw the trail characters
			for (let i = 0; i < charHistory[col].length; i++) {
				const trailY = y - (i * fontSize);
				if (trailY >= -fontSize && trailY <= canvas.height / dpr) {
					const alpha = Math.max(0, 1 - (i / MATRIX_CONFIG.trailLength));
					
					if (i === 0) {
						// Head character - bright white
						ctx.shadowBlur = 0;
						ctx.fillStyle = `rgba(255,255,255,${MATRIX_CONFIG.headOpacity})`;
					} else {
						// Trail characters - green with fading opacity
						ctx.shadowBlur = MATRIX_CONFIG.trailGlow;
						ctx.shadowColor = "#00ff00";
						ctx.fillStyle = `rgba(0,255,0,${alpha * 0.8})`;
					}
					
					ctx.fillText(charHistory[col][i], x, trailY);
				}
			}

			// advance drop; when off-screen, occasionally reset to top
			drops[col] += speeds[col];
			if (y > (canvas.height / dpr) + fontSize && Math.random() < MATRIX_CONFIG.resetChance) {
				drops[col] = 0;
				speeds[col] = MATRIX_CONFIG.speedMin + Math.random() * (MATRIX_CONFIG.speedMax - MATRIX_CONFIG.speedMin);
				// give a fresh start character
				charHistory[col] = [chars[(Math.random() * chars.length) | 0]];
			}
		}

		requestAnimationFrame(drawFrame);
	}

	resize();
	window.addEventListener("resize", resize);

	// start with a dark background
	ctx.fillStyle = "#000";
	ctx.fillRect(0, 0, canvas.width / dpr, canvas.height / dpr);

	requestAnimationFrame(drawFrame);
})();
