export function generateRandomHexColor() {
	// Randomize hue (0 to 360 degrees)
	const h = Math.floor(Math.random() * 360); // H: Hue, 0-360

	// Randomize saturation (50% to 100%)
	const s = Math.floor(Math.random() * 50) + 50; // S: Saturation, 50%-100%

	// Randomize lightness (40% to 60%) to avoid too dark or too light colors
	const l = Math.floor(Math.random() * 20) + 40; // L: Lightness, 40%-60%

	// Convert HSL to RGB
	const [r, g, b] = HSLToRGB(h, s, l);

	// Convert RGB to HEX and return it
	return rgbToHex(r, g, b);
}

// HSL to RGB conversion function
function HSLToRGB(h: number, s: number, l: number) {
	let r, g, b;
	h = h / 360; // Normalize the hue to [0, 1]
	s = s / 100; // Normalize saturation to [0, 1]
	l = l / 100; // Normalize lightness to [0, 1]

	if (s === 0) {
		r = g = b = l; // Gray
	} else {
		let temp1 = l < 0.5 ? l * (1 + s) : l + s - l * s;
		let temp2 = 2 * l - temp1;
		const temp3 = (h + 1 / 3) % 1;
		const temp4 = (h + 2 / 3) % 1;

		r = hueToRGB(temp2, temp1, temp3);
		g = hueToRGB(temp2, temp1, h);
		b = hueToRGB(temp2, temp1, temp4);
	}

	return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function hueToRGB(temp2: number, temp1: number, temp3: number) {
	if (temp3 < 0) temp3 += 1;
	if (temp3 > 1) temp3 -= 1;
	if (temp3 < 1 / 6) return temp2 + (temp1 - temp2) * 6 * temp3;
	if (temp3 < 1 / 2) return temp1;
	if (temp3 < 2 / 3) return temp2 + (temp1 - temp2) * (2 / 3 - temp3) * 6;
	return temp2;
}

// RGB to HEX conversion function
function rgbToHex(r: number, g: number, b: number) {
	return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

// Convert a number to a 2-digit hex value
function toHex(num: number) {
	const hex = num.toString(16);
	return hex.length === 1 ? '0' + hex : hex;
}
