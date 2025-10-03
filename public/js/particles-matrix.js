// Matrix Rain (canvas-based) — columns of falling glyphs with highlighted head
(function () {
	const container = document.getElementById("particles-js");
	if (!container) return;

	// Tweakable configuration
	const MATRIX_CONFIG = {
		fontSize: 10,                 // px height of characters and row step
		fontFamily: '"Press Start 2P", monospace', // canvas font family
		speedMin: 0.1,               // min rows per frame
		speedMax: 0.2,               // max rows per frame
		trailFadeAlpha: 0.8,         // background fade per frame (higher = shorter trails)
		headOpacity: 0.01,            // 0..1 opacity for the white head
		trailGlow: 8,                 // glow blur for green trail
		resetChance: 0.035,           // probability to restart a column after it leaves screen
		charChangeEveryFrames: 3,     // how many frames between character changes (1 = every frame)
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
		for (let i = 0; i < columns; i++) {
			// keep existing y if present, otherwise randomize start
			drops[i] = oldDrops && i < oldDrops.length ? oldDrops[i] : Math.floor(Math.random() * rows);
			// per-column speed in rows per frame
			speeds[i] = MATRIX_CONFIG.speedMin + Math.random() * (MATRIX_CONFIG.speedMax - MATRIX_CONFIG.speedMin);
			headChars[i] = chars[(Math.random() * chars.length) | 0];
			trailChars[i] = headChars[i];
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
				trailChars[col] = headChars[col];
				headChars[col] = chars[(Math.random() * chars.length) | 0];
			}

			// trail: draw previous char in green one row behind
			const trailY = (drops[col] - 1) * fontSize;
			if (trailY >= 0) {
				ctx.shadowBlur = MATRIX_CONFIG.trailGlow;
				ctx.shadowColor = "#00ff00";
				ctx.fillStyle = "#00ff00";
				ctx.fillText(trailChars[col], x, trailY);
			}

			// head: bright white highlight
			ctx.shadowBlur = 0;
			ctx.fillStyle = `rgba(255,255,255,${MATRIX_CONFIG.headOpacity})`;
			ctx.fillText(headChars[col], x, y);

			// advance drop; when off-screen, occasionally reset to top
			drops[col] += speeds[col];
			if (y > (canvas.height / dpr) + fontSize && Math.random() < MATRIX_CONFIG.resetChance) {
				drops[col] = 0;
				speeds[col] = MATRIX_CONFIG.speedMin + Math.random() * (MATRIX_CONFIG.speedMax - MATRIX_CONFIG.speedMin);
				// give a fresh start character
				headChars[col] = chars[(Math.random() * chars.length) | 0];
				trailChars[col] = headChars[col];
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
