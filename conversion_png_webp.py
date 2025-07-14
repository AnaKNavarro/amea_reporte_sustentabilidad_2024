#pip install Pillow
import os
from PIL import Image

# Directorio donde se encuentran las imágenes PNG
input_dir = 'img'

# Calidad de la compresión WEBP (0-100). 80 es un buen balance.
quality = 80

print(f"Buscando imágenes .png en el directorio '{input_dir}'...")

if not os.path.exists(input_dir):
    print(f"El directorio '{input_dir}' no existe.")
    exit()

# Recorrer todos los archivos en el directorio de entrada
for filename in os.listdir(input_dir):
    if filename.lower().endswith('.png'):
        # Construir la ruta completa del archivo de entrada y salida
        input_path = os.path.join(input_dir, filename)
        output_path = os.path.join(input_dir, os.path.splitext(filename)[0] + '.webp')

        try:
            # Abrir la imagen PNG
            with Image.open(input_path) as img:
                # Convertir y guardar como WEBP
                img.save(output_path, 'webp', quality=quality)
                print(f"Convertido: {filename} -> {os.path.basename(output_path)}")

            # Opcional: Si quieres eliminar los archivos PNG originales después de la conversión,
            # descomenta la siguiente línea. ¡Haz una copia de seguridad antes!
            # os.remove(input_path)

        except Exception as e:
            print(f"Error al convertir {filename}: {e}")

print("\n¡Conversión completada!")