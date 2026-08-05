// deck-tweaks.jsx — Tweaks panel wired to the deck's CSS variables.
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#E1E51A",
  "displayFont": "Figtree"
}/*EDITMODE-END*/;

const ACCENT_SOFT = {
  "#E1E51A": "#F4F5C9",
  "#137A53": "#E6F2EC",
  "#2563EB": "#E7EEFD",
  "#5B49E0": "#ECE9FB",
  "#0E7490": "#E2F1F5"
};

const ACCENT_INK = {
  "#E1E51A": "#6E7200",
  "#137A53": "#137A53",
  "#2563EB": "#2563EB",
  "#5B49E0": "#5B49E0",
  "#0E7490": "#0E7490"
};

const FONT_STACKS = {
  "Figtree": '"Figtree", sans-serif',
  "Space Grotesk": '"Space Grotesk", sans-serif',
  "Manrope": '"Manrope", sans-serif'
};

const FONT_HREF = {
  "Space Grotesk": "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&display=swap",
  "Manrope": "https://fonts.googleapis.com/css2?family=Manrope:wght@500;600;700&display=swap"
};

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => {
    const r = document.documentElement;
    r.style.setProperty("--accent", t.accent);
    r.style.setProperty("--accent-soft", ACCENT_SOFT[t.accent] || "#F4F5C9");
    r.style.setProperty("--accent-ink", ACCENT_INK[t.accent] || t.accent);
  }, [t.accent]);

  React.useEffect(() => {
    const stack = FONT_STACKS[t.displayFont] || FONT_STACKS["Figtree"];
    document.documentElement.style.setProperty("--font-display", stack);
    document.documentElement.style.setProperty("--font-body", stack);
    const href = FONT_HREF[t.displayFont];
    if (href) {
      const id = "tweak-font-" + t.displayFont.replace(/\s+/g, "-");
      if (!document.getElementById(id)) {
        const l = document.createElement("link");
        l.id = id; l.rel = "stylesheet"; l.href = href;
        document.head.appendChild(l);
      }
    }
  }, [t.displayFont]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Theme" />
      <TweakColor label="Accent" value={t.accent}
        options={["#E1E51A", "#137A53", "#2563EB", "#5B49E0", "#0E7490"]}
        onChange={(v) => setTweak("accent", v)} />
      <TweakSection label="Typography" />
      <TweakRadio label="Font" value={t.displayFont}
        options={["Figtree", "Space Grotesk", "Manrope"]}
        onChange={(v) => setTweak("displayFont", v)} />
    </TweaksPanel>
  );
}

ReactDOM.createRoot(document.getElementById("tweaks-root")).render(<App />);
