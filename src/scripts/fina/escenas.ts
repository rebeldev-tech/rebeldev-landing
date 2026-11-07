// Demos de Servicios y escena de WhatsApp de Producto (wa): líneas de tiempo en pausa con las etiquetas p1, p2…,
// el final de cada paso.
// El CSS de cada escena es su estado final (sin JS); por eso lo que aparece usa fromTo, que pinta el inicio al crearse.
import { gsap } from '../motion';
import { pasos as pasosWa } from '../../data/rebelbot';

type TL = gsap.core.Timeline;
type Q = (e: string) => HTMLElement[];

const consulta = (root: HTMLElement): Q => (e) => Array.from(root.querySelectorAll<HTMLElement>(`[data-e="${e}"]`));
const nueva = () => gsap.timeline({ paused: true, defaults: { duration: 0.5, ease: 'power3.out' } });
const pausa = (tl: TL, etiqueta: string, d = 0.35) => tl.to({}, { duration: d }).addLabel(etiqueta);
// Objetos nuevos en cada uso: GSAP guarda y modifica los vars de cada tween.
const pop = () => [{ autoAlpha: 0, scale: 0.4 }, { autoAlpha: 1, scale: 1, ease: 'back.out(2)', duration: 0.4 }] as const;

// Un dato que viaja por una vía: un tramo corto del trazo que avanza.
function viaje(tl: TL, el: Element, at: gsap.Position, inverso = false, d = 0.7) {
  return tl
    .set(el, { visibility: 'visible' }, at)
    .fromTo(el, { drawSVG: inverso ? '100% 100%' : '0% 0%' }, { drawSVG: inverso ? '0% 12%' : '88% 100%', duration: d, ease: 'power1.inOut', immediateRender: false }, '<')
    .set(el, { visibility: 'hidden' });
}

function hasta(cursor: HTMLElement, el: Element) {
  const r = el.getBoundingClientRect(), c = cursor.getBoundingClientRect();
  return { x: r.left + r.width / 2 - c.left, y: r.top + r.height / 2 - c.top };
}

export const escenas: Record<string, (root: HTMLElement) => TL> = {
  medida(root) {
    const q = consulta(root), tl = nueva();
    tl.fromTo(q('notas'), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.01 })
      .fromTo(q('nota'), { autoAlpha: 0, y: 18, rotation: (i) => [-4, 3, -2][i] }, { autoAlpha: 1, y: 0, stagger: 0.18 }, 0)
      .fromTo(q('flecha'), { scaleX: 0 }, { scaleX: 1, transformOrigin: '0% 50%', duration: 0.3, stagger: 0.18 }, 0.3)
      .fromTo(q('lento'), { autoAlpha: 0, y: -6 }, { autoAlpha: 1, y: 0 }, '>+0.1');
    pausa(tl, 'p1');
    tl.to(q('notas'), { autoAlpha: 0, y: -24, duration: 0.4 }, 'p1')
      .fromTo(q('piezas'), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.01 }, 'p1+=0.25')
      .fromTo(q('pieza'), { autoAlpha: 0, scale: 0.7, y: 20 }, { autoAlpha: 1, scale: 1, y: 0, ease: 'back.out(1.6)', stagger: 0.12 }, '<');
    pausa(tl, 'p2');
    tl.to(q('piezas'), { autoAlpha: 0, scale: 0.92, duration: 0.35 }, 'p2')
      .fromTo(q('app'), { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0 }, 'p2+=0.2')
      .fromTo(q('menu'), { autoAlpha: 0, x: -12 }, { autoAlpha: 1, x: 0, stagger: 0.1 }, '<0.2')
      .fromTo(q('fila'), { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, stagger: 0.12 }, '<0.2')
      .fromTo(q('viernes'), ...pop());
    pausa(tl, 'p3');
    tl.fromTo(q('nuevo'), { autoAlpha: 0, x: -28 }, { autoAlpha: 1, x: 0, duration: 0.7, ease: 'expo.out' }, 'p3')
      .fromTo(q('sigue'), { autoAlpha: 0, y: 6 }, { autoAlpha: 1, y: 0 }, '<0.4');
    return pausa(tl, 'p4');
  },

  auto(root) {
    const q = consulta(root), tl = nueva();
    const ok = q('ok'), raya = q('raya'), textos = q('tarea').map((t) => t.firstElementChild!), [ficha] = q('ficha');
    const mover = (left: string) => ({ left, duration: 0.6, ease: 'power2.inOut' });
    tl.fromTo(q('nodo'), { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, stagger: 0.08 })
      .fromTo(q('linea'), { scaleX: 0 }, { scaleX: 1, transformOrigin: '0% 50%', duration: 0.6 }, 0.2)
      .fromTo(ficha, { autoAlpha: 0, scale: 0.6, left: '12.5%' }, { autoAlpha: 1, scale: 1, left: '12.5%', ease: 'back.out(2)' }, 0.7)
      .fromTo(ok[0], ...pop(), '>-0.1')
      .fromTo(q('tareas'), { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0 }, '<');
    pausa(tl, 'p1');
    tl.to(ficha, mover('37.5%'), 'p1+=0.1')
      .fromTo(ok[1], ...pop())
      .fromTo(raya[0], { scaleX: 0 }, { scaleX: 1, duration: 0.3 }, '<')
      .to(textos[0], { opacity: 0.5, duration: 0.3 }, '<')
      .to(ficha, mover('62.5%'))
      .fromTo(ok[2], ...pop())
      .fromTo(raya[1], { scaleX: 0 }, { scaleX: 1, duration: 0.3 }, '<')
      .to(textos[1], { opacity: 0.5, duration: 0.3 }, '<')
      .fromTo(raya[2], { scaleX: 0 }, { scaleX: 1, duration: 0.3 }, '<0.3')
      .to(textos[2], { opacity: 0.5, duration: 0.3 }, '<');
    pausa(tl, 'p2');
    tl.to(q('tareas'), { autoAlpha: 0, y: -10, duration: 0.3 }, 'p2')
      .to(ficha, mover('87.5%'), 'p2')
      .fromTo(ok[3], ...pop())
      .fromTo(q('avisos'), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.01 }, '<')
      .fromTo(q('aviso'), { autoAlpha: 0, x: 30 }, { autoAlpha: 1, x: 0, stagger: 0.2 }, '<');
    pausa(tl, 'p3');
    tl.to(q('avisos'), { autoAlpha: 0, y: -10, duration: 0.3 }, 'p3')
      .fromTo(q('bitacora'), { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0 }, 'p3+=0.2')
      .fromTo(q('log'), { autoAlpha: 0, x: -10 }, { autoAlpha: 1, x: 0, stagger: 0.15 }, '<0.15');
    return pausa(tl, 'p4');
  },

  wa(root) {
    const q = consulta(root), tl = nueva();
    const [typing] = q('typing'), enlinea = q('enlinea'), escribe = q('escribe'), datos = q('dato');
    const msgs = q('paso').map((b) => Array.from(b.querySelectorAll<HTMLElement>('.chat > *')));
    // Cada mensaje vuelve a su display propio (burbuja, botones, tarjeta): se lee antes de ocultarlos.
    const disp = msgs.map((l) => l.map((m) => getComputedStyle(m).display));
    gsap.set(msgs.flat(), { display: 'none' });
    gsap.set(typing, { display: 'none' });

    msgs.forEach((lista, k) => {
      lista.forEach((m, i) => {
        const kind = pasosWa[k].chat[i]?.kind;
        const bot = kind === 'out' || kind === 'agent';
        if (bot) {
          tl.set(typing, { display: 'flex' })
            .set(enlinea, { autoAlpha: 0 }, '<')
            .set(escribe, { autoAlpha: 1 }, '<')
            .to({}, { duration: 0.55 })
            .set(typing, { display: 'none' })
            .set(enlinea, { autoAlpha: 1 }, '<')
            .set(escribe, { autoAlpha: 0 }, '<');
        }
        tl.set(m, { display: disp[k][i] })
          .fromTo(m, { height: 0, autoAlpha: 0, y: 10 }, { height: 'auto', autoAlpha: 1, y: 0, duration: 0.4, immediateRender: false })
          .to({}, { duration: bot ? 0.15 : 0.3 });
      });
      datos.filter((d) => Number(d.dataset.paso) === k)
        .forEach((d, j) => tl.fromTo(d, { autoAlpha: 0, x: 14 }, { autoAlpha: 1, x: 0, duration: 0.4 }, j ? '<0.12' : '>'));
      pausa(tl, `p${k + 1}`, 0.2);
    });
    return tl;
  },

  web(root) {
    const q = consulta(root), tl = nueva();
    const [win] = q('win'), [cursor] = q('cursor'), boton = q('reservar')[1];
    const ir = hasta(cursor, boton);
    tl.fromTo(win, { autoAlpha: 0, y: 20, xPercent: 12 }, { autoAlpha: 1, y: 0, xPercent: 12 })
      .fromTo(q('pub'), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.01 }, 0)
      .fromTo(q('menu'), { autoAlpha: 0, y: -8 }, { autoAlpha: 1, y: 0 }, 0.3)
      .fromTo(q('hero'), { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0 }, '<0.15');
    pausa(tl, 'p1');
    tl.fromTo(q('tarjeta'), { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, stagger: 0.1 }, 'p1')
      .fromTo(cursor, { autoAlpha: 0, x: 0, y: 0 }, { autoAlpha: 1, x: 0, y: 0, duration: 0.2 })
      .to(cursor, { x: ir.x, y: ir.y, duration: 0.8, ease: 'power2.inOut' })
      .to(boton, { scale: 0.9, duration: 0.12, yoyo: true, repeat: 1, ease: 'power1.inOut' })
      .fromTo(q('toast'), { autoAlpha: 0, y: -8 }, { autoAlpha: 1, y: 0 });
    pausa(tl, 'p2');
    tl.to(q('pub'), { autoAlpha: 0, duration: 0.35 }, 'p2')
      .fromTo(q('adm'), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.35 }, 'p2+=0.2')
      .fromTo(q('fila'), { autoAlpha: 0, x: -10 }, { autoAlpha: 1, x: 0, stagger: 0.12 }, '<');
    pausa(tl, 'p3');
    tl.to(win, { xPercent: 0, scale: 0.94, duration: 0.7, ease: 'power3.inOut' }, 'p3')
      .fromTo(q('movil'), { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.7 }, 'p3+=0.3');
    return pausa(tl, 'p4');
  },

  api(root) {
    const q = consulta(root), tl = nueva();
    const pkts = q('pkt');
    tl.fromTo(q('canal'), { autoAlpha: 0, x: -12 }, { autoAlpha: 1, x: 0, stagger: 0.1 })
      .fromTo(q('via'), { drawSVG: '0% 0%' }, { drawSVG: '0% 100%', duration: 0.6, stagger: 0.1 }, 0.2)
      .fromTo(q('base'), { autoAlpha: 0, scale: 0.94 }, { autoAlpha: 1, scale: 1 }, 0.3);
    [0, 1, 2].forEach((i) => viaje(tl, pkts[i], 1 + i * 0.2));
    pausa(tl, 'p1');
    // El de la app llega sin dirección: se frena antes de entrar.
    tl.set(pkts[1], { visibility: 'visible' }, 'p1')
      .fromTo(pkts[1], { drawSVG: '0% 0%' }, { drawSVG: '68% 80%', duration: 0.6, ease: 'power1.in', immediateRender: false }, 'p1')
      .fromTo(q('x'), ...pop())
      .fromTo(q('nota'), { autoAlpha: 0, y: 6 }, { autoAlpha: 1, y: 0, duration: 0.35 }, '<')
      .set(pkts[1], { visibility: 'hidden' }, '+=0.3');
    viaje(tl, pkts[0], '>');
    tl.fromTo(q('guardado'), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 });
    pausa(tl, 'p2');
    tl.to([...q('x'), ...q('nota')], { autoAlpha: 0, duration: 0.3 }, 'p2')
      .fromTo(q('boveda'), { autoAlpha: 0, height: 0 }, { autoAlpha: 1, height: 'auto', duration: 0.5 }, 'p2+=0.1');
    pausa(tl, 'p3');
    tl.fromTo(q('canal-nuevo'), { autoAlpha: 0, x: -16 }, { autoAlpha: 1, x: 0 }, 'p3')
      .fromTo(q('via-nueva'), { drawSVG: '0% 0%' }, { drawSVG: '0% 100%', duration: 0.6 }, 'p3+=0.2');
    viaje(tl, pkts[3], '>');
    tl.fromTo(q('pruebas'), { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0 });
    return pausa(tl, 'p4');
  },

  int(root) {
    const q = consulta(root), tl = nueva();
    const [mano] = q('mano'), [alerta] = q('alerta'), [reintenta] = q('reintenta'), [listo] = q('listo');
    const [wa] = q('pkt-wa');
    tl.fromTo(q('nodo'), { autoAlpha: 0, scale: 0.85 }, { autoAlpha: 1, scale: 1, stagger: 0.08 })
      .fromTo(mano, { autoAlpha: 0, left: '17%', top: '27%' }, { autoAlpha: 1, left: '17%', top: '27%', duration: 0.3 })
      .to(mano, { left: '83%', top: '21%', duration: 0.9, ease: 'power2.inOut' })
      .to(mano, { left: '83%', top: '79%', duration: 0.8, ease: 'power2.inOut' }, '+=0.25');
    pausa(tl, 'p1');
    tl.to(mano, { autoAlpha: 0, duration: 0.3 }, 'p1')
      .fromTo(q('hub'), { autoAlpha: 0, scale: 0.5 }, { autoAlpha: 1, scale: 1, ease: 'back.out(1.8)' }, 'p1')
      .fromTo(q('via'), { drawSVG: '0% 0%' }, { drawSVG: '0% 100%', duration: 0.5, stagger: 0.1 }, '<0.2');
    pausa(tl, 'p2');
    viaje(tl, wa, 'p2', true);
    tl.addLabel('reparte');
    ['ventas', 'fact', 'hoja'].forEach((id, i) => viaje(tl, q(`pkt-${id}`)[0], `reparte+=${i * 0.08}`));
    tl.fromTo(q('tag'), { autoAlpha: 0, y: -4 }, { autoAlpha: 1, y: 0, stagger: 0.12 });
    pausa(tl, 'p3');
    tl.set(alerta, { visibility: 'visible' }, 'p3')
      .fromTo(alerta, { drawSVG: '0% 0%' }, { drawSVG: '0% 100%', duration: 0.5, immediateRender: false }, 'p3')
      .fromTo(reintenta, { autoAlpha: 0, y: 6 }, { autoAlpha: 1, y: 0, duration: 0.35 });
    viaje(tl, q('pkt-fact')[0], '+=0.5');
    tl.to(alerta, { autoAlpha: 0, duration: 0.3 })
      .to(reintenta, { autoAlpha: 0, duration: 0.3 }, '<')
      .fromTo(listo, { autoAlpha: 0, y: 6 }, { autoAlpha: 1, y: 0, duration: 0.35 }, '<0.1');
    return pausa(tl, 'p4');
  },

  ux(root) {
    const q = consulta(root), tl = nueva();
    const [cursor] = q('cursor'), [nombre] = q('nombre'), sel = q('sel'), boton = q('f')[4];
    const a = hasta(cursor, nombre.parentElement!), b = hasta(cursor, sel[0].parentElement!);
    const c = hasta(cursor, sel[1].parentElement!), d = hasta(cursor, boton);
    const ir = (p: { x: number; y: number }, duration = 0.5) => ({ x: p.x, y: p.y, duration, ease: 'power2.inOut' });
    tl.fromTo(q('lio'), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 })
      .fromTo(q('marca'), { autoAlpha: 0, scale: 0.5 }, { autoAlpha: 1, scale: 1, ease: 'back.out(2)', stagger: 0.25 }, '>0.1');
    pausa(tl, 'p1');
    tl.to(q('lio'), { autoAlpha: 0, duration: 0.35 }, 'p1')
      .fromTo(q('boceto'), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.01 }, 'p1+=0.2')
      .fromTo(q('b'), { scaleX: 0 }, { scaleX: 1, duration: 0.45, stagger: 0.1 }, '<');
    pausa(tl, 'p2');
    tl.to(q('boceto'), { autoAlpha: 0, duration: 0.35 }, 'p2')
      .fromTo(q('final'), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.01 }, 'p2+=0.15')
      .fromTo(q('f'), { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, stagger: 0.1 }, '<');
    pausa(tl, 'p3');
    tl.fromTo(cursor, { autoAlpha: 0, x: 0, y: 0 }, { autoAlpha: 1, x: 0, y: 0, duration: 0.2 }, 'p3')
      .to(cursor, ir(a, 0.6))
      .fromTo(nombre, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2 })
      .to(cursor, ir(b))
      .fromTo(sel[0], { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2 })
      .to(cursor, ir(c, 0.45))
      .fromTo(sel[1], { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2 })
      .to(cursor, ir(d))
      .to(boton, { scale: 0.94, duration: 0.12, yoyo: true, repeat: 1 })
      .fromTo(q('hecho'), { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0 });
    return pausa(tl, 'p4');
  },
};
