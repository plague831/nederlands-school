/**
 * Стрічка «NEDERLANDS» у hero: два перехилені кільця з текстом, що
 * нескінченно тече по колу. Анімація на SMIL (<animate>), а не на CSS,
 * бо анімується атрибут startOffset у <textPath>.
 */

/** Довжина одного проходу тексту по колу. */
const LOOP_LENGTH = 1142.71;

const RIBBON_TEXT = 'NEDERLANDS · NEDERLANDS · NEDERLANDS · NEDERLANDS ·';

/** Еліпс, по якому тече текст. */
const RIBBON_PATH = 'M 120 310 A 240 112 0 1 1 600 310 A 240 112 0 1 1 120 310';

type RibbonProps = {
  pathId: string;
  className: string;
  /** Поворот кільця: `rotate(кут 360 310)`. */
  transform: string;
  duration: string;
  /** Дві копії тексту, зсунуті на довжину кола, дають безшовний потік. */
  passes: readonly { from: number; to: number }[];
};

function Ribbon({ pathId, className, transform, duration, passes }: RibbonProps) {
  return (
    <g className={className} transform={transform}>
      {passes.map((pass) => (
        <text key={pass.from}>
          <textPath
            href={`#${pathId}`}
            startOffset={String(pass.from)}
            textLength={String(LOOP_LENGTH)}
            lengthAdjust="spacing"
          >
            {RIBBON_TEXT}
            <animate
              attributeName="startOffset"
              from={String(pass.from)}
              to={String(pass.to)}
              dur={duration}
              repeatCount="indefinite"
            />
          </textPath>
        </text>
      ))}
    </g>
  );
}

export function RibbonArt() {
  return (
    <svg className="ribbon-projection" viewBox="0 0 720 620">
      <defs>
        <path id="ribbon-forward" d={RIBBON_PATH} />
        <path id="ribbon-backward" d={RIBBON_PATH} />
      </defs>

      <Ribbon
        pathId="ribbon-forward"
        className="ribbon ribbon-forward"
        transform="rotate(-42 360 310)"
        duration="11s"
        passes={[
          { from: -LOOP_LENGTH, to: 0 },
          { from: 0, to: LOOP_LENGTH },
        ]}
      />

      <Ribbon
        pathId="ribbon-backward"
        className="ribbon ribbon-backward"
        transform="rotate(42 360 310)"
        duration="13s"
        passes={[
          { from: 0, to: -LOOP_LENGTH },
          { from: LOOP_LENGTH, to: 0 },
        ]}
      />
    </svg>
  );
}
