import av
import os
import struct
import shutil
from fractions import Fraction

video_dir = os.path.join("public", "videos")
videos = ["reel_01.mp4", "reel_02.mp4", "reel_03.mp4", "campaign_feature.mp4"]

for name in videos:
    in_path = os.path.join(video_dir, name)
    temp_path = os.path.join(video_dir, f"temp_{name}")

    in_container = av.open(in_path)
    in_video = in_container.streams.video[0]
    in_audio = in_container.streams.audio[0] if len(in_container.streams.audio) > 0 else None

    # Open output container with faststart enabled so moov atom is placed at the start of the MP4 file
    out_container = av.open(
        temp_path,
        mode="w",
        options={"movflags": "faststart"}
    )

    fps = 30
    out_video = out_container.add_stream("libx264", rate=fps)
    out_video.width = in_video.width
    out_video.height = in_video.height
    out_video.pix_fmt = "yuv420p"
    out_video.options = {
        "crf": "24",
        "preset": "fast",
        "profile": "main",
        "level": "3.1",
        "maxrate": "1200k",
        "bufsize": "2400k",
        "movflags": "+faststart"
    }

    out_audio = None
    if in_audio is not None:
        out_audio = out_container.add_stream("aac", rate=44100)
        out_audio.bit_rate = 128000

    # Transcode video frames
    frame_idx = 0
    for packet in in_container.demux():
        if packet.stream.type == "video":
            for frame in packet.decode():
                frame.pts = frame_idx
                frame.time_base = Fraction(1, fps)
                frame_idx += 1
                for out_pkt in out_video.encode(frame):
                    out_container.mux(out_pkt)
        elif packet.stream.type == "audio" and out_audio is not None:
            for frame in packet.decode():
                frame.pts = None
                for out_pkt in out_audio.encode(frame):
                    out_container.mux(out_pkt)

    # Flush encoders
    for out_pkt in out_video.encode(None):
        out_container.mux(out_pkt)
    if out_audio is not None:
        for out_pkt in out_audio.encode(None):
            out_container.mux(out_pkt)

    in_container.close()
    out_container.close()

    shutil.move(temp_path, in_path)
    print(f"Optimized {name}: {os.path.getsize(in_path)} bytes")

# Verify MP4 box layout and codec
for name in videos:
    path = os.path.join(video_dir, name)
    with open(path, "rb") as f:
        data = f.read()
    print(f"=== {name} ({len(data)} bytes) ===")
    pos = 0
    while pos + 8 <= len(data):
        size, btype = struct.unpack(">I4s", data[pos:pos+8])
        print(f"  box {btype.decode(errors='ignore')} at offset {pos}, size {size}")
        if size == 0:
            break
        if size == 1:
            size = struct.unpack(">Q", data[pos+8:pos+16])[0]
        pos += size

