# Glass Tube Display Card

A responsive alphanumeric glass-tube display for Home Assistant dashboards. It recreates layered cathodes, orange glow, honeycomb mesh, high-gloss glass envelopes, tube bases and exposed contacts while also supporting letters and separately rendered punctuation tubes.

## Features

- Digits `0–9` and uppercase letters `A–Z`
- Additional glyphs: `- _ / \\ + = ? ! %`
- Decimal point, comma, colon, semicolon and degree sign as separate miniature tubes
- Open wire-cathode comma with restrained multi-stage glow
- Static text or live Home Assistant entity/attribute values
- Configurable prefix, suffix, decimal places and decimal separator
- Automatic padding and overflow handling
- Responsive scaling without leaving its dashboard column
- Free-standing construction or optional black instrument panel
- Self-contained rectangular enclosure matching the related Analog Gauge Card product family
- Optional recessed black Phillips mounting screws
- Configurable glow, core, glass, mesh, circuit board and panel colours
- Standard Home Assistant tap actions
- No external runtime dependencies in the distributed bundle

## Installation with HACS

1. Open **HACS → Dashboard**.
2. Open the three-dot menu and choose **Custom repositories**.
3. Add `https://github.com/loungelizard2018/glass-tube-display-card` as category **Dashboard**.
4. Install **Glass Tube Display Card**.
5. Reload Home Assistant when prompted and refresh the browser without cache.

HACS installs `glass-tube-display-card.js` and automatically registers exactly one dashboard resource under:

```text
/hacsfiles/glass-tube-display-card/glass-tube-display-card.js
```

Do not add a second `/local/community/...` resource for a HACS installation. If an older manual resource exists, delete it once and retain only the HACS-managed `/hacsfiles/...` entry.

## Manual installation

1. Copy `glass-tube-display-card.js` to `/config/www/glass-tube-display-card/`.
2. Add `/local/glass-tube-display-card/glass-tube-display-card.js` as a **JavaScript Module** under **Settings → Dashboards → Resources**.
3. Refresh the browser without cache.

## Minimal live value

```yaml
type: custom:glass-tube-display-card
entity: sensor.living_room_temperature
decimals: 1
unit: "°C"
min_characters: 5
```

The decimal separator and degree sign are rendered in their own glass tubes. The `C` uses a full-size alphanumeric tube.

## Reference CPU-temperature card

```yaml
type: custom:glass-tube-display-card
entity: sensor.bigpool_cpu_temperature
decimals: 1
decimal_separator: comma
unit: "°C"
title: "CPU TEMPERATURE"
subtitle: "BIGPOOL SERVER"
min_characters: 5
max_characters: 8
mounting: panel
screws: true
separator_style: mini_tube
show_blank_tubes: true
show_cathode_stack: true
max_width: 1000
tube_gap: 7
brightness: 1
glass_opacity: 0.62
mesh_opacity: 0.38
tube_color: "#ff5000"
core_color: "#fff1cf"
glass_tint: "#dff6ff"
```

## Static punctuation test

```yaml
type: custom:glass-tube-display-card
text: "48,0 °C"
title: "GLASS TUBE DISPLAY"
mounting: panel
screws: true
separator_style: mini_tube
max_width: 1000
```

The comma is rendered as one open wire cathode in the lower third of its tube. It has no filled area, detached dot, loop or question-mark shape.

## Static alphanumeric display

```yaml
type: custom:glass-tube-display-card
text: "NIXIE 26,41"
title: "GLASS TUBE DISPLAY"
subtitle: "ALPHANUMERIC CATHODE ARRAY"
min_characters: 10
max_characters: 14
```

## Optional panel and screws

```yaml
type: custom:glass-tube-display-card
entity: sensor.bigpool_cpu_temperature
decimals: 1
unit: "°C"
title: "CPU TEMPERATURE"
mounting: panel
screws: true
max_width: 900
```

The panel is an inline, self-contained rectangular SVG surface. It does not reuse the Analog Gauge `base.webp`, so it cannot expose any round dial, scale, needle or gear geometry.

The shorthand below enables both the black panel and the four screws:

```yaml
screwed: true
```

## Clock example

Create a Home Assistant template sensor that provides the required time string, then display it directly:

```yaml
type: custom:glass-tube-display-card
entity: sensor.glass_tube_clock
min_characters: 6
max_characters: 6
separator_style: mini_tube
mounting: free
```

Example template sensor:

```yaml
template:
  - sensor:
      - name: Glass Tube Clock
        unique_id: glass_tube_clock
        state: "{{ now().strftime('%H:%M:%S') }}"
```

## Character model

Full-size tubes support:

```text
0123456789
ABCDEFGHIJKLMNOPQRSTUVWXYZ
- _ / \\ + = ? ! %
```

The following characters are deliberately not drawn inside a full-size tube. They receive a separate narrow tube:

```text
. , : ; °
```

Accented Latin letters are reduced to their base letter. Unsupported characters are shown as `?`. Letter cathodes are uppercase by design.

## Configuration reference

The full set of options is documented in the examples and source defaults. Existing configurations remain backward compatible across the current release series.
