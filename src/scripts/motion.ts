import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

(window as Window & { __motionReady?: boolean }).__motionReady = true;

export const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Scroll suave con Lenis, sincronizado con ScrollTrigger. Se omite con movimiento reducido.
export const lenis = reducedMotion ? null : new Lenis({ anchors: true, lerp: 0.12 });
if (lenis) {
	lenis.on('scroll', ScrollTrigger.update);
	gsap.ticker.add((time) => lenis.raf(time * 1000));
	gsap.ticker.lagSmoothing(0);
}

// Revelado al entrar en pantalla.
const revealObserver = new IntersectionObserver(
	(entries) => {
		for (const entry of entries) {
			if (!entry.isIntersecting) continue;
			entry.target.classList.add('is-visible');
			revealObserver.unobserve(entry.target);
		}
	},
	{ rootMargin: '0px 0px -10% 0px' },
);
document.querySelectorAll('[data-reveal]').forEach((el) => revealObserver.observe(el));
