import piexif
from PIL import Image
from pathlib import Path
import os

base_url = os.environ.get("BASE_URL", "https://the-vertex-puzzle.vercel.app")
image_path = Path(__file__).resolve().parent.parent / "public" / "mountain.jpg"
input_path = image_path
output_path = image_path

try:
	img = Image.open(input_path)

	comment_bytes = f"{base_url}/api/vertex".encode()
	exif_dict = {"Exif": {piexif.ExifIFD.UserComment: comment_bytes}}
	exif_bytes = piexif.dump(exif_dict)

	img.save(output_path, "jpeg", exif=exif_bytes)
	print(f"EXIF metadata added to {output_path}")
except Exception as error:
	print(f"Could not update {output_path}: {error}")
	raise