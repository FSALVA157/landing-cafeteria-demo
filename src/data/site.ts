// Café Julia es una marca de demostración. Todo lo marcado con TODO
// (enlaces, dirección, horario, teléfono, precios) es de prueba y hay
// que reemplazarlo antes de publicar.

export const site = {
	name: 'Café Julia',
	title: 'Café Julia · Café de especialidad en Madrid',
	description:
		'Café de especialidad tostado en pequeños lotes, un origen nuevo cada semana y mesas para quedarte. Sin reserva, abierto todos los días.',
	// TODO: quitar cuando el sitio deje de ser una demo.
	noindex: true,
};

export const links = {
	directions: 'https://maps.example.com/cafe-julia', // TODO
	shop: 'https://tienda.example.com/cafe-julia', // TODO
	instagram: 'https://instagram.com/cafejulia', // TODO
	instagramHandle: '@cafejulia',
};

export const contact = {
	street: 'Calle Ejemplo 27', // TODO
	postalCode: '28004', // TODO
	city: 'Madrid', // TODO
	phone: '+34 910 000 000', // TODO
	phoneHref: 'tel:+34910000000', // TODO
	// TODO: horario real.
	hours: [
		{ days: 'Lunes a viernes', time: '8:00 a 20:00', opens: '08:00', closes: '20:00', schema: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] },
		{ days: 'Sábado y domingo', time: '9:00 a 20:00', opens: '09:00', closes: '20:00', schema: ['Saturday', 'Sunday'] },
	],
};

export const nav = [
	{ label: 'Inicio', href: '#inicio' },
	{ label: 'El lugar', href: '#lugar' },
	{ label: 'Menú', href: '#menu' },
	{ label: 'Grano', href: '#grano' },
	{ label: 'Visítanos', href: '#visitanos' },
];

// TODO: precios de demostración.
export const menu = [
	{
		title: 'Espresso',
		note: 'Doble por defecto, con el blend de la casa.',
		items: [
			{ name: 'Espresso', price: '1,80' },
			{ name: 'Cortado', price: '1,90' },
			{ name: 'Cappuccino', price: '2,90' },
			{ name: 'Latte', price: '3,10' },
			{ name: 'Flat white', price: '3,20' },
		],
	},
	{
		title: 'Filtrados',
		note: 'Con el origen de la semana.',
		items: [
			{ name: 'V60', price: '3,80' },
			{ name: 'Cold brew', price: '3,60' },
			{ name: 'Chemex para dos', price: '7,40' },
		],
	},
	{
		title: 'Sin café',
		note: 'Para quien viene acompañando.',
		items: [
			{ name: 'Té en hebras', price: '2,60' },
			{ name: 'Chocolate caliente', price: '3,30' },
			{ name: 'Matcha latte', price: '3,90' },
		],
	},
	{
		title: 'Para acompañar',
		note: 'Lo que haya en la vitrina del día.',
		items: [
			{ name: 'Croissant de mantequilla', price: '2,40' },
			{ name: 'Cookie de chocolate y sal', price: '2,70' },
			{ name: 'Banana bread', price: '3,20' },
			{ name: 'Tostada de masa madre con aguacate y huevo', price: '6,90' },
		],
	},
];

export const faq = [
	{
		q: '¿Hay que reservar?',
		a: 'No. Llegas y te sientas donde haya sitio: mesa, sofá o barra.',
	},
	{
		q: '¿Puedo ir a trabajar con el portátil?',
		a: 'Sí. Hay enchufes en las mesas junto al ventanal. Los fines de semana te pedimos compartir mesa si hay gente esperando.',
	},
	{
		q: '¿El café de especialidad es más caro?',
		a: 'Menos de lo que piensas: un espresso cuesta 1,80 € y un latte 3,10 €. Tienes el menú completo más arriba.',
	},
	{
		q: '¿Qué es un filtrado?',
		a: 'Café preparado gota a gota, más ligero y aromático que un espresso. Si no sabes cuál pedir, pregunta en barra y te lo explicamos.',
	},
	{
		q: '¿Tenéis leche sin lactosa o vegetal?',
		a: 'Sí. Avena y almendra sin coste extra, y también leche sin lactosa.',
	},
	{
		// TODO: confirmar opciones sin gluten.
		q: '¿Hay opciones sin gluten?',
		a: 'Depende de la vitrina del día. Pregunta en barra y te decimos qué hay.',
	},
	{
		q: '¿Puedo pedir para llevar?',
		a: 'Sí, cualquier bebida del menú. Si traes tu taza, la llenamos.',
	},
	{
		q: '¿Vendéis el café en grano?',
		a: 'Sí, en la barra y en la tienda online. En grano o molido para tu cafetera.',
	},
];
