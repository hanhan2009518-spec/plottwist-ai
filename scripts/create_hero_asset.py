from __future__ import annotations

import math
import os
import struct
import zlib


WIDTH = 1200
HEIGHT = 900


def clamp(value: float) -> int:
    return max(0, min(255, int(value)))


def mix(a: tuple[int, int, int], b: tuple[int, int, int], t: float) -> tuple[int, int, int]:
    return tuple(clamp(a[i] + (b[i] - a[i]) * t) for i in range(3))


def rect(buffer: list[list[tuple[int, int, int]]], x: int, y: int, w: int, h: int, color: tuple[int, int, int]) -> None:
    for yy in range(max(0, y), min(HEIGHT, y + h)):
        row = buffer[yy]
        for xx in range(max(0, x), min(WIDTH, x + w)):
            row[xx] = color


def soft_rect(buffer: list[list[tuple[int, int, int]]], x: int, y: int, w: int, h: int, color: tuple[int, int, int], alpha: float) -> None:
    for yy in range(max(0, y), min(HEIGHT, y + h)):
        row = buffer[yy]
        for xx in range(max(0, x), min(WIDTH, x + w)):
            row[xx] = mix(row[xx], color, alpha)


def write_png(path: str, pixels: list[list[tuple[int, int, int]]]) -> None:
    raw_rows = []
    for row in pixels:
        raw_rows.append(b"\x00" + b"".join(bytes(pixel) for pixel in row))
    raw = b"".join(raw_rows)

    def chunk(tag: bytes, data: bytes) -> bytes:
        return struct.pack(">I", len(data)) + tag + data + struct.pack(">I", zlib.crc32(tag + data) & 0xFFFFFFFF)

    png = b"\x89PNG\r\n\x1a\n"
    png += chunk(b"IHDR", struct.pack(">IIBBBBB", WIDTH, HEIGHT, 8, 2, 0, 0, 0))
    png += chunk(b"IDAT", zlib.compress(raw, 9))
    png += chunk(b"IEND", b"")

    with open(path, "wb") as file:
        file.write(png)


def main() -> None:
    top = (10, 10, 22)
    bottom = (37, 22, 58)
    pixels: list[list[tuple[int, int, int]]] = []

    for y in range(HEIGHT):
        t = y / (HEIGHT - 1)
        row = []
        for x in range(WIDTH):
            base = mix(top, bottom, t)
            glow = math.exp(-(((x - 930) / 360) ** 2 + ((y - 180) / 280) ** 2))
            lime = math.exp(-(((x - 180) / 240) ** 2 + ((y - 720) / 230) ** 2))
            color = mix(base, (130, 71, 229), glow * 0.34)
            color = mix(color, (183, 243, 66), lime * 0.16)
            row.append(color)
        pixels.append(row)

    # Main creator dashboard shell.
    soft_rect(pixels, 96, 86, 1008, 690, (255, 255, 255), 0.08)
    rect(pixels, 96, 86, 1008, 5, (183, 243, 66))
    soft_rect(pixels, 126, 126, 948, 90, (7, 8, 18), 0.72)

    # Timeline lanes and cards.
    lane_colors = [(124, 58, 237), (6, 182, 212), (251, 113, 133), (183, 243, 66)]
    for index, y in enumerate([258, 382, 506, 630]):
        soft_rect(pixels, 142, y, 916, 74, (255, 255, 255), 0.08)
        rect(pixels, 164, y + 16, 10, 42, lane_colors[index])
        soft_rect(pixels, 198, y + 18, 250 + index * 48, 12, (255, 255, 255), 0.70)
        soft_rect(pixels, 198, y + 44, 560 - index * 52, 10, (255, 255, 255), 0.28)

    # Side cards.
    soft_rect(pixels, 698, 250, 330, 164, (124, 58, 237), 0.20)
    soft_rect(pixels, 732, 286, 160, 18, (255, 255, 255), 0.72)
    soft_rect(pixels, 732, 330, 252, 10, (255, 255, 255), 0.32)
    soft_rect(pixels, 732, 360, 214, 10, (255, 255, 255), 0.24)

    soft_rect(pixels, 698, 444, 330, 184, (183, 243, 66), 0.16)
    soft_rect(pixels, 732, 482, 210, 18, (255, 255, 255), 0.72)
    soft_rect(pixels, 732, 526, 248, 10, (255, 255, 255), 0.30)
    soft_rect(pixels, 732, 556, 188, 10, (255, 255, 255), 0.23)

    # Phone preview.
    soft_rect(pixels, 154, 152, 212, 412, (4, 5, 11), 0.88)
    rect(pixels, 178, 190, 164, 250, (21, 14, 36))
    soft_rect(pixels, 196, 210, 128, 184, (124, 58, 237), 0.45)
    rect(pixels, 206, 410, 106, 10, (183, 243, 66))
    soft_rect(pixels, 190, 462, 142, 16, (255, 255, 255), 0.55)
    soft_rect(pixels, 190, 496, 100, 12, (255, 255, 255), 0.25)

    # Header text bars.
    soft_rect(pixels, 404, 150, 360, 26, (255, 255, 255), 0.78)
    soft_rect(pixels, 404, 190, 512, 12, (255, 255, 255), 0.35)

    out_dir = os.path.join("public", "visuals")
    os.makedirs(out_dir, exist_ok=True)
    write_png(os.path.join(out_dir, "creator-board.png"), pixels)


if __name__ == "__main__":
    main()
