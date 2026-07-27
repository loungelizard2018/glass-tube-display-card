from __future__ import annotations

import base64
import io
import math
import pathlib
import urllib.request

from PIL import Image, ImageChops, ImageDraw, ImageEnhance, ImageFilter, ImageOps

ROOT = pathlib.Path(__file__).resolve().parents[1]
DIST_ASSETS = ROOT / "dist" / "assets"
PANEL_JS = ROOT / "panel-asset.js"
ANALOG_BASE_URL = (
    "https://raw.githubusercontent.com/loungelizard2018/"
    "analog-gauge-card/main/dist/assets/base.webp"
)


def fetch_reference() -> Image.Image:
    request = urllib.request.Request(
        ANALOG_BASE_URL,
        headers={"User-Agent": "glass-tube-display-card-build/0.3.6"},
    )
    with urllib.request.urlopen(request, timeout=45) as response:
        return Image.open(io.BytesIO(response.read())).convert("RGBA")


def make_texture(width: int, height: int) -> Image.Image:
    # Monochrome multi-scale relief. This deliberately avoids browser SVG
    # turbulence, which produced coloured RGB noise in v0.3.5.
    fine = Image.effect_noise((width, height), 28).convert("L")
    medium = Image.effect_noise((width, height), 18).convert("L").filter(
        ImageFilter.GaussianBlur(1.1)
    )
    broad = Image.effect_noise((width, height), 12).convert("L").filter(
        ImageFilter.GaussianBlur(4.5)
    )
    noise = Image.blend(fine, medium, 0.32)
    noise = Image.blend(noise, broad, 0.13)
    noise = ImageOps.autocontrast(noise, cutoff=1)

    detail_lut = [
        max(0, min(255, round(128 + (value - 128) * 0.115)))
        for value in range(256)
    ]
    detail = noise.point(detail_lut)

    gradient = Image.new("L", (width, height))
    pixels = gradient.load()
    for y in range(height):
        level = round(31 - 13 * (y / max(1, height - 1)))
        for x in range(width):
            pixels[x, y] = level

    texture = ImageChops.add(gradient, detail, scale=1.0, offset=-128)

    # Mild product-style top illumination and edge vignette.
    light = Image.new("L", (width, height), 0)
    ld = ImageDraw.Draw(light)
    ld.ellipse(
        (-width * 0.18, -height * 0.38, width * 0.94, height * 0.48),
        fill=8,
    )
    light = light.filter(ImageFilter.GaussianBlur(height * 0.12))
    texture = ImageChops.add(texture, light)

    vignette = Image.new("L", (width, height), 0)
    vd = ImageDraw.Draw(vignette)
    vd.rectangle((0, 0, width, height), fill=10)
    vd.ellipse(
        (width * 0.08, height * 0.02, width * 0.92, height * 0.92),
        fill=0,
    )
    vignette = vignette.filter(ImageFilter.GaussianBlur(height * 0.14))
    texture = ImageChops.subtract(texture, vignette)
    return Image.merge("RGB", (texture, texture, texture)).convert("RGBA")


def build_panel(reference: Image.Image) -> Image.Image:
    width, height = 1000, 760
    canvas = Image.new("RGBA", (width, height), (0, 0, 0, 0))

    shadow = Image.new("L", (width, height), 0)
    shadow_draw = ImageDraw.Draw(shadow)
    shadow_draw.rounded_rectangle(
        (15, 10, width - 15, height - 20), radius=44, fill=220
    )
    shadow = shadow.filter(ImageFilter.GaussianBlur(15))
    shadow_layer = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    shadow_layer.putalpha(shadow)
    shifted = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    shifted.alpha_composite(shadow_layer, (0, 8))
    canvas.alpha_composite(shifted)

    body_mask = Image.new("L", (width, height), 0)
    mask_draw = ImageDraw.Draw(body_mask)
    mask_draw.rounded_rectangle(
        (18, 10, width - 18, height - 22), radius=43, fill=255
    )
    body = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    body.paste(make_texture(width, height), (0, 0), body_mask)
    canvas.alpha_composite(body)

    draw = ImageDraw.Draw(canvas)
    draw.rounded_rectangle(
        (18, 10, width - 18, height - 22),
        radius=43,
        outline=(2, 2, 2, 255),
        width=5,
    )
    draw.rounded_rectangle(
        (24, 16, width - 24, height - 28),
        radius=38,
        outline=(92, 92, 90, 170),
        width=2,
    )
    draw.rounded_rectangle(
        (28, 20, width - 28, height - 32),
        radius=34,
        outline=(204, 202, 196, 70),
        width=1,
    )
    draw.arc(
        (32, 10, width - 32, 85),
        180,
        360,
        fill=(224, 222, 214, 105),
        width=2,
    )
    draw.arc(
        (34, height - 100, width - 34, height - 17),
        0,
        180,
        fill=(0, 0, 0, 245),
        width=6,
    )

    # Rectangular equivalent of the Analog Gauge recessed bezel.
    draw.rounded_rectangle(
        (44, 34, width - 44, height - 46),
        radius=27,
        outline=(0, 0, 0, 245),
        width=7,
    )
    draw.rounded_rectangle(
        (50, 40, width - 50, height - 52),
        radius=22,
        outline=(96, 96, 93, 105),
        width=2,
    )
    draw.rounded_rectangle(
        (54, 44, width - 54, height - 56),
        radius=19,
        outline=(4, 4, 4, 245),
        width=3,
    )
    draw.line((70, 49, width - 70, 49), fill=(190, 188, 182, 35), width=1)
    return canvas


def build_screw(reference: Image.Image) -> Image.Image:
    width, height = reference.size
    centre_x = round(width * 0.136)
    centre_y = round(height * 0.107)
    crop_size = round(min(width, height) * 0.105)
    half = crop_size // 2
    screw = reference.crop(
        (centre_x - half, centre_y - half, centre_x + half, centre_y + half)
    ).resize((96, 96), Image.Resampling.LANCZOS)

    mask = Image.new("L", (96, 96), 0)
    pixels = mask.load()
    for y in range(96):
        for x in range(96):
            radius = math.hypot(x - 47.5, y - 47.5)
            pixels[x, y] = max(0, min(255, round((50 - radius) / 6 * 255)))
    mask = mask.filter(ImageFilter.GaussianBlur(0.65))
    screw.putalpha(mask)
    return screw


def data_uri(path: pathlib.Path) -> str:
    encoded = base64.b64encode(path.read_bytes()).decode("ascii")
    return f"data:image/webp;base64,{encoded}"


def main() -> None:
    reference = fetch_reference()
    DIST_ASSETS.mkdir(parents=True, exist_ok=True)

    panel_path = DIST_ASSETS / "glass-tube-panel.webp"
    screw_path = DIST_ASSETS / "glass-tube-screw.webp"
    build_panel(reference).save(panel_path, "WEBP", quality=76, method=6)
    build_screw(reference).save(screw_path, "WEBP", quality=88, method=6)

    PANEL_JS.write_text(
        "export const PANEL_ASSET_URI = " + repr(data_uri(panel_path)) + ";\n"
        "export const SCREW_ASSET_URI = " + repr(data_uri(screw_path)) + ";\n",
        encoding="utf-8",
    )
    print(
        f"Generated {panel_path.relative_to(ROOT)} and "
        f"{screw_path.relative_to(ROOT)} from Analog Gauge base.webp."
    )


if __name__ == "__main__":
    main()
