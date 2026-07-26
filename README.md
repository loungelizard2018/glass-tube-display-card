# Glass Tube Display Card

A responsive alphanumeric glass-tube display for Home Assistant dashboards. It recreates the layered cathodes, orange glow, honeycomb mesh, glass reflections, tube bases and exposed circuit board of vintage Nixie-style equipment while also supporting letters and separately rendered punctuation tubes.

## Features

- Digits `0–9` and uppercase letters `A–Z`
- Additional glyphs: `- _ / \\ + = ? ! %`
- Decimal point, comma, colon, semicolon and degree sign as separate miniature tubes
- Static text or live Home Assistant entity/attribute values
- Configurable prefix, suffix, decimal places and decimal separator
- Automatic padding and overflow handling
- Responsive scaling without leaving its dashboard column
- Free-standing construction or optional black instrument panel
- Optional black cross-head mounting screws matching the related Analog Gauge Card style
- Configurable glow, core, glass, mesh, circuit board and panel colours
- Standard Home Assistant tap actions
- No external runtime dependencies and no build step

## Installation with HACS

1. Open **HACS → Dashboard**.
2. Open the three-dot menu and choose **Custom repositories**.
3. Add `https://github.com/loungelizard2018/glass-tube-display-card` as category **Dashboard**.
4. Install **Glass Tube Display Card**.
5. Reload Home Assistant when prompted and refresh the browser without cache.

HACS loads `glass-tube-display-card.js` from the repository root and normally registers the dashboard resource automatically.

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

The decimal point and degree sign are rendered in their own miniature glass tubes. The `C` uses a full-size alphanumeric tube.

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

| Option | Default | Purpose |
|---|---:|---|
| `entity` | — | Home Assistant entity to display |
| `attribute` | — | Optional entity attribute instead of its state |
| `text` | — | Static text when no entity is used |
| `prefix`, `suffix` | empty | Characters added before or after the value |
| `title`, `subtitle` | empty | Optional captions above the tubes |
| `unit` | empty | Unit appended after the value |
| `unit_separator` | one space | Characters inserted before `unit` |
| `decimals` | automatic | Numeric decimal places from `0` to `8` |
| `decimal_separator` | `auto` | `auto`, `dot` or `comma` |
| `unavailable_text`, `unknown_text` | `----` | Replacement text for missing states |
| `min_characters` | `0` | Minimum number of full-size tube positions |
| `max_characters` | `12` | Maximum number of full-size tube positions, up to `40` |
| `pad` | `left` | Add blank positions on the `left` or `right` |
| `pad_character` | space | Character used for padding |
| `overflow` | `left` | Keep the left or right side when the value is too long |
| `show_blank_tubes` | `true` | Show physical empty tubes for spaces |
| `show_cathode_stack` | `true` | Show faint inactive cathodes behind the lit glyph |
| `separator_style` | `mini_tube` | `mini_tube` or `bare` punctuation |
| `align` | `center` | `left`, `center` or `right` |
| `mounting` | `free` | `free` or `panel` |
| `screws` | `false` | Show four black cross-head screws |
| `screwed` | `false` | Shorthand for panel plus screws |
| `max_width` | `920` | Maximum card width in pixels |
| `tube_gap` | `8` | Requested gap between tubes |
| `tube_color` | `#ff6a00` | Main cathode glow colour |
| `core_color` | `#ffd0a3` | Hot inner cathode colour |
| `glass_tint` | `#d7edff` | Glass reflection tint |
| `glass_opacity` | `0.72` | Glass body opacity |
| `mesh_opacity` | `0.34` | Honeycomb mesh opacity |
| `pcb_color` | `#131713` | Circuit-board colour |
| `panel_color` | `#090a0b` | Main panel colour |
| `panel_edge` | `#22262a` | Upper panel edge colour |
| `brightness` | `1` | Overall brightness multiplier |
| `animate` | `true` | Animate value changes |
| `animation_speed` | `420` | Animation duration in milliseconds |
| `tap_action` | more-info | Home Assistant action configuration |

## Tap actions

Supported actions are `more-info`, `navigate`, `url`, `toggle`, `call-service` and `none`.

```yaml
tap_action:
  action: navigate
  navigation_path: /lovelace/system
```

## Development check

```bash
npm run check
```

## Licence

MIT
