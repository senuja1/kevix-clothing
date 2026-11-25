import av
import cv2
import numpy as np
import os
import struct
from fractions import Fraction
from PIL import Image

SRC_VIDEO = r"c:\Users\senuj\Downloads\gemini_generated_video_3fb25e13.mp4"
OUT_DIR = os.path.join("public", "hero")
SCRATCH_DIR = r"C:\Users\senuj\.gemini\antigravity\brain\f1db5128-7618-454b-a4f4-0d6cc001d8c2\scratch"
os.makedirs(OUT_DIR, exist_ok=True)
os.makedirs(SCRATCH_DIR, exist_ok=True)


def smoothstep(t: float) -> float:
    t = max(0.0, min(1.0, t))
    return t * t * (3.0 - 2.0 * t)


def load_source_frames(path: str):
    container = av.open(path)
    v_stream = container.streams.video[0]
    fps = int(round(float(v_stream.average_rate)))
    frames = [f.to_ndarray(format="rgb24") for f in container.decode(video=0)]
    container.close()
    return frames, fps


def make_seamless_loop(frames, fade_frames: int = 12):
    """Crossfade the final fade_frames into frame 0 for a seamless ambient loop."""
    n = len(frames)
    out = [f.copy() for f in frames]
    target = frames[0].astype(np.float32)
    for k in range(fade_frames):
        idx = n - fade_frames + k
        alpha = smoothstep((k + 1) / (fade_frames + 1))
        blended = (1.0 - alpha) * frames[idx].astype(np.float32) + alpha * target
        out[idx] = np.clip(blended, 0, 255).astype(np.uint8)
    return out


def render_mobile_frame(frame_rgb: np.ndarray, idx: int, total: int, out_w=720, out_h=1280) -> np.ndarray:
    """
    Create a seamless 9:16 portrait frame (720x1280) from a 16:9 (1280x720) source:
    - Frames 0..14: Uncropped KVX CLOTHING opening (800px center crop scaled to 720px wide)
      feathered cleanly over a dark blurred vertical studio backdrop (zero visible seams).
    - Frames 14..42: Smooth cinematic push-in to full-bleed 9:16 portrait runway (405px crop).
    - Frames 42..222: Full-bleed edge-to-edge 9:16 portrait runway models.
    - Frames 222..239: Smooth ease-out returning to frame 0 opening for seamless loop.
    """
    src_h, src_w, _ = frame_rgb.shape
    cx = src_w / 2.0

    # Determine zoom progress z in [0, 1]: 0 = wide opening (800px), 1 = full-bleed 9:16 (405px)
    if idx <= 14:
        z = 0.0
    elif idx < 42:
        z = smoothstep((idx - 14) / (42 - 14))
    elif idx <= total - 18:
        z = 1.0
    else:
        z = 1.0 - smoothstep((idx - (total - 18)) / 18.0)

    full_bleed_crop_w = src_h * (out_w / out_h)  # 405.0
    opening_crop_w = 820.0
    crop_w = opening_crop_w + (full_bleed_crop_w - opening_crop_w) * z

    x1 = max(0, int(round(cx - crop_w / 2.0)))
    x2 = min(src_w, int(round(cx + crop_w / 2.0)))
    cropped = frame_rgb[:, x1:x2]

    scale = out_w / cropped.shape[1]
    fg_h = min(out_h, int(round(src_h * scale)))
    fg = cv2.resize(cropped, (out_w, fg_h), interpolation=cv2.INTER_LANCZOS4)

    if fg_h >= out_h:
        return fg[:out_h, :out_w]

    # Ambient dark monochrome studio vertical extension (no hard seams)
    fb_x1 = int(round(cx - full_bleed_crop_w / 2.0))
    fb_x2 = int(round(cx + full_bleed_crop_w / 2.0))
    bg_crop = frame_rgb[:, fb_x1:fb_x2]
    # Blur at small resolution for speed & ultra-smooth cinema falloff
    bg_small = cv2.resize(bg_crop, (180, 320), interpolation=cv2.INTER_AREA)
    bg_blur = cv2.GaussianBlur(bg_small, (0, 0), sigmaX=14, sigmaY=14)
    bg = cv2.resize(bg_blur, (out_w, out_h), interpolation=cv2.INTER_LINEAR).astype(np.float32) * 0.55

    # Vertical cosine-feathered alpha mask so the centerpiece melts into the studio backdrop
    feather = max(24, int(round(min(110, (out_h - fg_h) * 0.45))))
    mask = np.ones((fg_h, 1, 1), dtype=np.float32)
    ramp = np.linspace(0.0, 1.0, feather, dtype=np.float32)
    ramp = 0.5 - 0.5 * np.cos(np.pi * ramp)
    mask[:feather, 0, 0] = ramp
    mask[-feather:, 0, 0] = ramp[::-1]

    y0 = (out_h - fg_h) // 2
    y1 = y0 + fg_h
    canvas = bg.copy()
    canvas[y0:y1] = fg.astype(np.float32) * mask + bg[y0:y1] * (1.0 - mask)
    return np.clip(canvas, 0, 255).astype(np.uint8)


def encode_mp4(frames, out_path: str, fps: int, crf: str = "24", maxrate: str = "1900k", bufsize: str = "3800k"):
    h, w, _ = frames[0].shape
    container = av.open(out_path, mode="w", options={"movflags": "faststart"})
    stream = container.add_stream("libx264", rate=fps)
    stream.width = w
    stream.height = h
    stream.pix_fmt = "yuv420p"
    stream.codec_context.gop_size = fps * 2
    stream.options = {
        "crf": crf,
        "preset": "medium",
        "profile": "main",
        "level": "3.1",
        "maxrate": maxrate,
        "bufsize": bufsize,
    }

    for i, rgb in enumerate(frames):
        vf = av.VideoFrame.from_ndarray(rgb, format="rgb24")
        vf.pts = i
        vf.time_base = Fraction(1, fps)
        for pkt in stream.encode(vf):
            container.mux(pkt)

    for pkt in stream.encode(None):
        container.mux(pkt)
    container.close()


def encode_webm(frames, out_path: str, fps: int, crf: str = "34", bitrate: int = 0):
    h, w, _ = frames[0].shape
    container = av.open(out_path, mode="w")
    stream = container.add_stream("libvpx-vp9", rate=fps)
    stream.width = w
    stream.height = h
    stream.pix_fmt = "yuv420p"
    stream.bit_rate = bitrate
    stream.codec_context.gop_size = fps * 2
    stream.options = {
        "crf": crf,
        "deadline": "good",
        "cpu-used": "4",
        "row-mt": "1",
    }

    for i, rgb in enumerate(frames):
        vf = av.VideoFrame.from_ndarray(rgb, format="rgb24")
        vf.pts = i
        vf.time_base = Fraction(1, fps)
        for pkt in stream.encode(vf):
            container.mux(pkt)

    for pkt in stream.encode(None):
        container.mux(pkt)
    container.close()


def verify_faststart(path: str):
    with open(path, "rb") as f:
        data = f.read()
    pos = 0
    boxes = []
    while pos + 8 <= len(data):
        size, btype = struct.unpack(">I4s", data[pos:pos + 8])
        boxes.append(btype.decode(errors="ignore"))
        if size == 0:
            break
        if size == 1:
            size = struct.unpack(">Q", data[pos + 8:pos + 16])[0]
        pos += size
    moov_idx = boxes.index("moov") if "moov" in boxes else -1
    mdat_idx = boxes.index("mdat") if "mdat" in boxes else -1
    print(f"  {os.path.basename(path)}: {len(data) / 1024:.1f} KB | boxes={boxes} | faststart={moov_idx < mdat_idx}")


def main():
    print("Loading source frames...")
    raw_frames, fps = load_source_frames(SRC_VIDEO)
    print(f"Loaded {len(raw_frames)} frames at {fps} fps ({raw_frames[0].shape[1]}x{raw_frames[0].shape[0]})")

    # 1. Desktop frames (1280x720) with seamless loop
    desktop_frames = make_seamless_loop(raw_frames, fade_frames=12)

    # Save matching crisp desktop posters (JPEG + WebP)
    Image.fromarray(desktop_frames[0]).save(os.path.join(OUT_DIR, "kvx_runway_hero.jpg"), quality=88, optimize=True)
    Image.fromarray(desktop_frames[0]).save(os.path.join(OUT_DIR, "kvx_runway_hero.webp"), quality=84, method=6)

    # 2. Mobile portrait frames (720x1280)
    print("Rendering mobile portrait frames (720x1280)...")
    mobile_frames = [render_mobile_frame(f, i, len(desktop_frames)) for i, f in enumerate(desktop_frames)]

    # Save matching crisp mobile posters (JPEG + WebP) + preview frames
    Image.fromarray(mobile_frames[0]).save(os.path.join(OUT_DIR, "kvx_runway_hero_mobile.jpg"), quality=88, optimize=True)
    Image.fromarray(mobile_frames[0]).save(os.path.join(OUT_DIR, "kvx_runway_hero_mobile.webp"), quality=84, method=6)
    for idx in [0, 24, 60, 120, 180]:
        Image.fromarray(mobile_frames[idx]).save(os.path.join(SCRATCH_DIR, f"mob_{idx:03d}.jpg"), quality=88)

    # 3. Encode Desktop MP4 & WebM
    print("Encoding desktop MP4 (H.264 faststart)...")
    desk_mp4 = os.path.join(OUT_DIR, "kvx_runway_hero.mp4")
    encode_mp4(desktop_frames, desk_mp4, fps=fps, crf="24", maxrate="1900k", bufsize="3800k")
    verify_faststart(desk_mp4)

    print("Encoding desktop WebM (VP9)...")
    desk_webm = os.path.join(OUT_DIR, "kvx_runway_hero.webm")
    encode_webm(desktop_frames, desk_webm, fps=fps, crf="35", bitrate=0)
    print(f"  {os.path.basename(desk_webm)}: {os.path.getsize(desk_webm) / 1024:.1f} KB")

    # 4. Encode Mobile MP4 & WebM
    print("Encoding mobile MP4 (H.264 faststart)...")
    mob_mp4 = os.path.join(OUT_DIR, "kvx_runway_hero_mobile.mp4")
    encode_mp4(mobile_frames, mob_mp4, fps=fps, crf="25", maxrate="1400k", bufsize="2800k")
    verify_faststart(mob_mp4)

    print("Encoding mobile WebM (VP9)...")
    mob_webm = os.path.join(OUT_DIR, "kvx_runway_hero_mobile.webm")
    encode_webm(mobile_frames, mob_webm, fps=fps, crf="36", bitrate=0)
    print(f"  {os.path.basename(mob_webm)}: {os.path.getsize(mob_webm) / 1024:.1f} KB")

    print("DONE!")


if __name__ == "__main__":
    main()
