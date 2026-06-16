'use client';

import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useContext,
  createContext,
  CSSProperties,
} from 'react';

// ── Easing ────────────────────────────────────────────────────────────────────
const Easing = {
  linear: (t: number) => t,
  easeInQuad: (t: number) => t * t,
  easeOutQuad: (t: number) => t * (2 - t),
  easeInCubic: (t: number) => t * t * t,
  easeOutCubic: (t: number) => { const u = t - 1; return u * u * u + 1; },
  easeInOutCubic: (t: number) =>
    t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  easeInQuart: (t: number) => t * t * t * t,
  easeOutQuart: (t: number) => { const u = t - 1; return 1 - u * u * u * u; },
  easeInOutQuart: (t: number) => {
    if (t < 0.5) return 8 * t * t * t * t;
    const u = t - 1;
    return 1 - 8 * u * u * u * u;
  },
  easeInExpo: (t: number) => (t === 0 ? 0 : Math.pow(2, 10 * (t - 1))),
  easeOutExpo: (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
  easeInSine: (t: number) => 1 - Math.cos((t * Math.PI) / 2),
  easeOutSine: (t: number) => Math.sin((t * Math.PI) / 2),
  easeInOutSine: (t: number) => -(Math.cos(Math.PI * t) - 1) / 2,
  easeOutBack: (t: number) => {
    const c1 = 1.70158, c3 = c1 + 1;
    const u = t - 1;
    return 1 + c3 * u * u * u + c1 * u * u;
  },
  easeInBack: (t: number) => {
    const c1 = 1.70158, c3 = c1 + 1;
    return c3 * t * t * t - c1 * t * t;
  },
  easeOutElastic: (t: number) => {
    const c4 = (2 * Math.PI) / 3;
    if (t === 0) return 0;
    if (t === 1) return 1;
    return Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
  },
};

// ── Core helpers ──────────────────────────────────────────────────────────────
const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

function interpolate(
  input: number[],
  output: number[],
  ease: ((t: number) => number) | ((t: number) => number)[] = Easing.linear
) {
  return (t: number): number => {
    if (t <= input[0]) return output[0];
    if (t >= input[input.length - 1]) return output[output.length - 1];
    for (let i = 0; i < input.length - 1; i++) {
      if (t >= input[i] && t <= input[i + 1]) {
        const span = input[i + 1] - input[i];
        const local = span === 0 ? 0 : (t - input[i]) / span;
        const easeFn = Array.isArray(ease) ? ease[i] || Easing.linear : ease;
        return output[i] + (output[i + 1] - output[i]) * easeFn(local);
      }
    }
    return output[output.length - 1];
  };
}

function animate({
  from = 0,
  to = 1,
  start = 0,
  end = 1,
  ease = Easing.easeInOutCubic,
}: {
  from?: number;
  to?: number;
  start?: number;
  end?: number;
  ease?: (t: number) => number;
}) {
  return (t: number): number => {
    if (t <= start) return from;
    if (t >= end) return to;
    const local = (t - start) / (end - start);
    return from + (to - from) * ease(local);
  };
}

// ── Timeline context ──────────────────────────────────────────────────────────
interface TimelineCtx {
  time: number;
  duration: number;
}
const TimelineContext = createContext<TimelineCtx>({ time: 0, duration: 28 });
const useTime = () => useContext(TimelineContext).time;
const useTimeline = () => useContext(TimelineContext);

// ── Sprite ────────────────────────────────────────────────────────────────────
interface SpriteCtx {
  localTime: number;
  progress: number;
  duration: number;
  visible: boolean;
}
const SpriteContext = createContext<SpriteCtx>({
  localTime: 0,
  progress: 0,
  duration: 0,
  visible: true,
});
const useSprite = () => useContext(SpriteContext);

interface SpriteProps {
  start?: number;
  end?: number;
  children: React.ReactNode | ((ctx: SpriteCtx) => React.ReactNode);
  keepMounted?: boolean;
}

function Sprite({ start = 0, end = Infinity, children, keepMounted = false }: SpriteProps) {
  const { time } = useTimeline();
  const visible = time >= start && time <= end;
  if (!visible && !keepMounted) return null;

  const duration = end - start;
  const localTime = Math.max(0, time - start);
  const progress =
    duration > 0 && isFinite(duration) ? clamp(localTime / duration, 0, 1) : 0;
  const value: SpriteCtx = { localTime, progress, duration, visible };

  return (
    <SpriteContext.Provider value={value}>
      {typeof children === 'function' ? children(value) : children}
    </SpriteContext.Provider>
  );
}

// ── Helpers (from automation-helpers.jsx) ─────────────────────────────────────
const AUTO_FONT = "'Helvetica Neue', Helvetica, Arial, sans-serif";

const rnd = (i: number, salt = 0) => {
  const x = Math.sin(i * 127.1 + salt * 311.7 + 13.37) * 43758.5453;
  return x - Math.floor(x);
};

const lerpN = (a: number, b: number, t: number) => a + (b - a) * t;

interface RevealTextProps {
  t: number;
  start?: number;
  stagger?: number;
  charDur?: number;
  exitAt?: number;
  exitDur?: number;
  text: string;
  style?: CSSProperties;
}

function RevealText({
  t,
  start = 0,
  stagger = 0.03,
  charDur = 0.5,
  exitAt = Infinity,
  exitDur = 0.5,
  text,
  style = {},
}: RevealTextProps) {
  const exitP = Easing.easeInCubic(clamp((t - exitAt) / exitDur, 0, 1));
  const baseOpacity = style.opacity != null ? Number(style.opacity) : 1;
  const lines = String(text).split('\n');
  let ci = 0;
  return (
    <div
      style={{
        position: 'absolute',
        textAlign: 'center',
        fontFamily: AUTO_FONT,
        color: 'var(--ink)',
        whiteSpace: 'nowrap',
        ...style,
        opacity: baseOpacity * (1 - exitP),
        transform: `translate(-50%, ${-16 * exitP}px)`,
      }}
    >
      {lines.map((line, li) => (
        <div key={li}>
          {Array.from(line).map((c) => {
            const i = ci++;
            const p = Easing.easeOutCubic(
              clamp((t - start - i * stagger) / charDur, 0, 1)
            );
            return (
              <span
                key={i}
                style={{
                  display: 'inline-block',
                  whiteSpace: 'pre',
                  opacity: p,
                  transform: `translateY(${(1 - p) * 0.45}em)`,
                }}
              >
                {c}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
}

interface CapsLabelProps {
  t: number;
  text: string;
  x: number;
  y: number;
  start?: number;
  exitAt?: number;
  size?: number;
  opacity?: number;
}

function CapsLabel({
  t,
  text,
  x,
  y,
  start = 0,
  exitAt = Infinity,
  size = 24,
  opacity = 0.55,
}: CapsLabelProps) {
  const inP = Easing.easeOutCubic(clamp((t - start) / 0.5, 0, 1));
  const outP = Easing.easeInCubic(clamp((t - exitAt) / 0.5, 0, 1));
  if (inP <= 0 || outP >= 1) return null;
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: `translate(-50%, ${(1 - inP) * 10}px)`,
        fontFamily: AUTO_FONT,
        fontSize: size,
        fontWeight: 500,
        letterSpacing: '0.34em',
        paddingLeft: '0.34em',
        textTransform: 'uppercase',
        color: 'var(--ink)',
        opacity: opacity * inP * (1 - outP),
        whiteSpace: 'nowrap',
      }}
    >
      {text}
    </div>
  );
}

interface PlateProps {
  t: number;
  x: number;
  y: number;
  w: number;
  h: number;
  start?: number;
  exitAt?: number;
  max?: number;
}

function Plate({ t, x, y, w, h, start = 0, exitAt = Infinity, max = 0.92 }: PlateProps) {
  const inP = Easing.easeOutCubic(clamp((t - start) / 0.6, 0, 1));
  const outP = Easing.easeInCubic(clamp((t - exitAt) / 0.6, 0, 1));
  if (inP <= 0 || outP >= 1) return null;
  return (
    <div
      style={{
        position: 'absolute',
        left: x - w / 2,
        top: y - h / 2,
        width: w,
        height: h,
        opacity: max * inP * (1 - outP),
        background: 'radial-gradient(closest-side, var(--bg) 42%, transparent 100%)',
      }}
    />
  );
}

// ── Scenes (from automation-scenes.jsx) ───────────────────────────────────────
const FIELD_END = 13.8;

function FieldScene({ density = 60, motion = 1 }: { density?: number; motion?: number }) {
  return (
    <Sprite start={0} end={FIELD_END}>
      {({ localTime: t }) => {
        const N = Math.round(density);
        const cols = 10;
        const spacing = 76;
        const rows = Math.ceil(N / cols);
        const x0 = 960 - ((cols - 1) * spacing) / 2;
        const y0 = 540 - ((rows - 1) * spacing) / 2;

        const scanEnv =
          animate({ from: 0, to: 1, start: 8.1, end: 8.5 })(t) *
          (1 - Easing.easeInQuad(clamp((t - 10.8) / 0.6, 0, 1)));
        const gridW = (cols - 1) * spacing;
        const gridH = (rows - 1) * spacing;
        const scanX = interpolate(
          [8.2, 10.7],
          [x0 - 150, x0 + gridW + 150],
          Easing.easeInOutSine
        )(t);

        const dots: React.ReactNode[] = [];
        for (let i = 0; i < N; i++) {
          let cx = 140 + rnd(i, 1) * 1640;
          let cy = 110 + rnd(i, 2) * 860;
          if (Math.abs(cx - 960) < 440 && Math.abs(cy - 540) < 180) {
            cy = cy < 540 ? cy - 240 : cy + 240;
          }
          cy = clamp(cy, 50, 1030);

          const s0 = 10 + rnd(i, 3) * 44;
          const isCircle = rnd(i, 4) > 0.5;
          const outlined = rnd(i, 5) > 0.62;
          const baseOp = 0.25 + rnd(i, 6) * 0.6;

          const appear = rnd(i, 7) * 1.4;
          const opIn = clamp((t - appear) / 0.4, 0, 1);
          const scaleIn = Easing.easeOutBack(clamp((t - appear) / 0.55, 0, 1));
          if (opIn <= 0) continue;

          const sp = 0.5 + rnd(i, 8) * 0.9;
          const ph = rnd(i, 9) * 6.283;
          const amp = (8 + rnd(i, 10) * 20) * motion;
          const jx = Math.sin(t * sp * 1.7 + ph) * amp;
          const jy = Math.cos(t * sp * 1.3 + ph * 1.7) * amp;

          const mStart = 5.6 + rnd(i, 11) * 1.2;
          const m = Easing.easeInOutQuart(clamp((t - mStart) / 1.5, 0, 1));
          const col = i % cols;
          const row = Math.floor(i / cols);
          let x = lerpN(cx + jx, x0 + col * spacing, m);
          let y = lerpN(cy + jy, y0 + row * spacing, m);
          const size = lerpN(s0, 16, m);
          const radPct = lerpN(isCircle ? 50 : 8, 16, m);
          let op = lerpN(baseOp, 0.85, m) * opIn;

          const wave =
            scanEnv > 0
              ? Math.exp(-Math.pow((x - scanX) / 110, 2)) * scanEnv
              : 0;
          op = clamp(op + wave * 0.5 * m, 0.04, 1);
          const pScale = 1 + wave * 0.2 * m;

          const ex = Easing.easeInCubic(
            clamp((t - (11.9 + col * 0.08 + rnd(i, 12) * 0.15)) / 0.7, 0, 1)
          );
          x = lerpN(x, 2140, ex);
          op *= 1 - ex;
          if (op <= 0.01) continue;

          const fillPct = Math.round((outlined ? m : 1) * 100);
          dots.push(
            <div
              key={i}
              style={{
                position: 'absolute',
                left: x - size / 2,
                top: y - size / 2,
                width: size,
                height: size,
                borderRadius: radPct + '%',
                background: `color-mix(in srgb, var(--ink) ${fillPct}%, transparent)`,
                border: outlined
                  ? `2px solid color-mix(in srgb, var(--ink) ${Math.round((1 - m) * 100)}%, transparent)`
                  : 'none',
                opacity: op,
                transform: `scale(${scaleIn * pScale})`,
              }}
            />
          );
        }

        return (
          <div style={{ position: 'absolute', inset: 0 }}>
            {dots}
            {scanEnv > 0.01 && (
              <div
                style={{
                  position: 'absolute',
                  left: scanX - 1,
                  top: y0 - 90,
                  width: 2,
                  height: gridH + 180,
                  background:
                    'linear-gradient(to bottom, transparent, var(--ink) 10%, var(--ink) 90%, transparent)',
                  opacity: 0.4 * scanEnv,
                }}
              />
            )}
            <Plate t={t} x={960} y={530} w={1240} h={500} start={0.7} exitAt={4.9} />
            <CapsLabel t={t} text="Automação com IA" x={960} y={388} start={0.8} exitAt={4.9} />
            <RevealText
              t={t}
              start={1.15}
              exitAt={4.9}
              text={'Todo dia,\nmil tarefas espalhadas.'}
              style={{
                left: 960,
                top: 448,
                fontSize: 86,
                fontWeight: 700,
                letterSpacing: '-0.025em',
                lineHeight: 1.12,
              }}
            />
            <Plate t={t} x={960} y={540} w={1100} h={380} start={6.5} exitAt={11.2} />
            <RevealText
              t={t}
              start={6.8}
              exitAt={11.2}
              text={'A IA enxerga o padrão.'}
              style={{ left: 960, top: 482, fontSize: 96, fontWeight: 700, letterSpacing: '-0.025em' }}
            />
          </div>
        );
      }}
    </Sprite>
  );
}

function PipelineScene({ motion = 1 }: { motion?: number }) {
  return (
    <Sprite start={13.4} end={19.8}>
      {({ localTime: t, duration: D }) => {
        const fade = 1 - Easing.easeInCubic(clamp((t - (D - 0.6)) / 0.6, 0, 1));
        const lineIn = Easing.easeOutQuart(clamp((t - 0.1) / 0.9, 0, 1));

        const shapes: React.ReactNode[] = [];
        const rings: { k: number; rAge: number }[] = [];
        const K = 14;
        const TRAVEL = 3.0;
        let pulse = 0;
        for (let k = 0; k < K; k++) {
          const birth = 0.2 + k * 0.45;
          const age = t - birth;
          if (age < 0) continue;
          const u = age / TRAVEL;
          const x = -50 + u * 2020;

          const crossT = birth + TRAVEL * ((960 + 50) / 2020);
          const rAge = t - crossT;
          if (rAge > 0) {
            pulse = Math.max(pulse, Math.exp(-5 * rAge));
            if (rAge < 0.85) rings.push({ k, rAge });
          }
          if (x > 1990) continue;

          const crossed = x >= 960;
          const conv = clamp(x / 960, 0, 1);
          const yOff =
            (rnd(k, 2) - 0.5) * 180 * (1 - conv) +
            Math.sin(t * 2 + k * 1.3) * 24 * motion * (1 - conv);
          const size = crossed ? 20 : 16 + rnd(k, 3) * 22;
          const pop = crossed ? 1 + 0.35 * Math.exp(-6 * Math.max(0, t - crossT)) : 1;

          shapes.push(
            <div
              key={k}
              style={{
                position: 'absolute',
                left: x - size / 2,
                top: 540 + yOff - size / 2,
                width: size,
                height: size,
                borderRadius: crossed ? '14%' : '50%',
                background: crossed ? 'var(--ink)' : 'transparent',
                border: crossed ? 'none' : '2px solid var(--ink)',
                opacity: crossed ? 0.95 : 0.65,
                transform: `scale(${pop})`,
              }}
            />
          );
        }

        const procEntry = Easing.easeOutBack(clamp((t - 0.4) / 0.5, 0, 1));
        const procH = 210 * (1 + 0.18 * pulse * motion);

        return (
          <div style={{ position: 'absolute', inset: 0, opacity: fade }}>
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: 539,
                width: 1920,
                height: 2,
                background: 'var(--ink)',
                opacity: 0.14 * lineIn,
                transform: `scaleX(${lineIn})`,
                transformOrigin: 'left',
              }}
            />
            {shapes}
            {rings.map(({ k, rAge }) => {
              const rs = 26 + rAge * 150;
              return (
                <div
                  key={'ring' + k}
                  style={{
                    position: 'absolute',
                    left: 960 - rs / 2,
                    top: 540 - rs / 2,
                    width: rs,
                    height: rs,
                    borderRadius: '50%',
                    border: '2px solid var(--ink)',
                    opacity: 0.45 * (1 - rAge / 0.85),
                  }}
                />
              );
            })}
            <div
              style={{
                position: 'absolute',
                left: 954,
                top: 540 - procH / 2,
                width: 12,
                height: procH,
                background: 'var(--ink)',
                borderRadius: 6,
                opacity: 0.55 + 0.45 * clamp(pulse, 0, 1),
                transform: `scaleY(${procEntry})`,
              }}
            />
            <CapsLabel t={t} text="Capturar" x={430} y={690} start={1.0} />
            <CapsLabel t={t} text="Decidir" x={960} y={690} start={1.9} />
            <CapsLabel t={t} text="Agir" x={1480} y={690} start={2.8} />
            <RevealText
              t={t}
              start={3.6}
              text={'E executa por você.'}
              style={{ left: 960, top: 248, fontSize: 84, fontWeight: 700, letterSpacing: '-0.025em' }}
            />
          </div>
        );
      }}
    </Sprite>
  );
}

function ScaleScene({ motion = 1 }: { motion?: number }) {
  return (
    <Sprite start={19.7} end={25.0}>
      {({ localTime: t, duration: D }) => {
        const fade = 1 - Easing.easeInCubic(clamp((t - (D - 0.8)) / 0.8, 0, 1));
        const cols = 23,
          rows = 13,
          sp = 82;
        const x0 = 960 - ((cols - 1) * sp) / 2;
        const y0 = 540 - ((rows - 1) * sp) / 2;
        const ccx = (cols - 1) / 2;
        const ccy = (rows - 1) / 2;

        const cells: React.ReactNode[] = [];
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const d = Math.max(Math.abs(c - ccx), Math.abs(r - ccy));
            const born = 0.15 + d * 0.16;
            const ap = Easing.easeOutBack(clamp((t - born) / 0.4, 0, 1));
            if (ap <= 0) continue;
            const isC = d === 0;
            const s = isC ? 20 : 9;
            const op =
              (isC ? 0.95 : 0.3 + 0.06 * Math.sin(t * 2.4 * motion + d * 0.9)) *
              clamp((t - born) / 0.3, 0, 1);
            cells.push(
              <div
                key={r + '-' + c}
                style={{
                  position: 'absolute',
                  left: x0 + c * sp - s / 2,
                  top: y0 + r * sp - s / 2,
                  width: s,
                  height: s,
                  background: 'var(--ink)',
                  borderRadius: 2,
                  opacity: op,
                  transform: `scale(${ap})`,
                }}
              />
            );
          }
        }

        const count = Math.floor(
          interpolate([0.5, 1.8], [1, 12480], Easing.easeOutExpo)(t)
        );
        const countIn = Easing.easeOutCubic(clamp((t - 0.5) / 0.5, 0, 1));

        return (
          <div style={{ position: 'absolute', inset: 0, opacity: fade }}>
            {cells}
            <Plate t={t} x={960} y={540} w={1150} h={520} start={0.4} max={0.94} />
            <div
              style={{
                position: 'absolute',
                left: 960,
                top: 392,
                transform: `translate(-50%, ${(1 - countIn) * 30}px)`,
                opacity: countIn,
                fontFamily: AUTO_FONT,
                fontSize: 190,
                fontWeight: 700,
                letterSpacing: '-0.03em',
                color: 'var(--ink)',
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {count.toLocaleString('pt-BR')}
            </div>
            <RevealText
              t={t}
              start={2.0}
              text={'tarefas automatizadas'}
              style={{ left: 960, top: 626, fontSize: 52, fontWeight: 400, letterSpacing: '-0.02em', opacity: 0.65 }}
            />
            <CapsLabel t={t} text="e contando" x={960} y={730} start={2.3} size={20} opacity={0.45} />
          </div>
        );
      }}
    </Sprite>
  );
}

function ClosingScene({ text = 'Trabalho no piloto automático.' }: { text?: string }) {
  return (
    <Sprite start={24.5} end={35}>
      {({ localTime: t, duration: D }) => {
        const fade = 1 - Easing.easeInQuad(clamp((t - (D - 1.2)) / 1.2, 0, 1));
        const markIn = (i: number) =>
          Easing.easeOutBack(clamp((t - 0.25 - i * 0.16) / 0.45, 0, 1));
        const markOp = (i: number) => clamp((t - 0.25 - i * 0.16) / 0.3, 0, 1);
        return (
          <div style={{ position: 'absolute', inset: 0, opacity: fade }}>
            <div
              style={{
                position: 'absolute',
                left: 960,
                top: 392,
                transform: 'translateX(-50%)',
                display: 'flex',
                alignItems: 'center',
                gap: 34,
              }}
            >
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  border: '2.5px solid var(--ink)',
                  opacity: 0.9 * markOp(0),
                  transform: `scale(${markIn(0)})`,
                }}
              />
              <div
                style={{
                  width: 22,
                  height: 22,
                  background: 'var(--ink)',
                  borderRadius: 3,
                  opacity: 0.9 * markOp(1),
                  transform: `scale(${markIn(1)}) rotate(${t * 26}deg)`,
                }}
              />
              <div
                style={{
                  width: 30,
                  height: 3,
                  background: 'var(--ink)',
                  opacity: 0.9 * markOp(2),
                  transform: `scaleX(${markIn(2)})`,
                }}
              />
            </div>
            <RevealText
              t={t}
              start={0.75}
              text={text}
              style={{ left: 960, top: 472, fontSize: 100, fontWeight: 700, letterSpacing: '-0.03em' }}
            />
            <CapsLabel t={t} text="Automação com IA" x={960} y={648} start={2.0} />
          </div>
        );
      }}
    </Sprite>
  );
}

// ── Main export ────────────────────────────────────────────────────────────────
const DURATION = 35;
const CANVAS_W = 1920;
const CANVAS_H = 1080;

export function AutomationAnimation() {
  const [time, setTime] = useState(0);
  const [scale, setScale] = useState(1);
  const rafRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const step = (ts: number) => {
      if (lastTsRef.current == null) lastTsRef.current = ts;
      const dt = (ts - lastTsRef.current) / 1000;
      lastTsRef.current = ts;
      setTime((t) => (t + dt) % DURATION);
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const measure = () => setScale(el.clientWidth / CANVAS_W);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const ctxValue = useMemo(() => ({ time, duration: DURATION }), [time]);

  return (
    <section
      id="resultados"
      className="vignette relative overflow-hidden"
      style={{ background: '#050505' }}
    >
      <div className="pointer-events-none absolute inset-0 bg-dotgrid opacity-60" />
      <div
        ref={containerRef}
        style={{ position: 'relative', width: '100%', height: CANVAS_H * scale }}
      >
        <TimelineContext.Provider value={ctxValue}>
          <div
            style={
              {
                position: 'absolute',
                top: 0,
                left: 0,
                width: CANVAS_W,
                height: CANVAS_H,
                transform: `scale(${scale})`,
                transformOrigin: 'top left',
                '--ink': '#ececec',
                '--bg': '#050505',
              } as CSSProperties
            }
          >
            <FieldScene density={40} motion={0.3} />
            <PipelineScene motion={0.3} />
            <ScaleScene motion={0.3} />
            <ClosingScene text="Trabalho no piloto automático." />
          </div>
        </TimelineContext.Provider>
      </div>
    </section>
  );
}
