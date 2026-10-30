import asyncio
import os
import edge_tts

VOICE = "es-VE-PaolaNeural"
OUTPUT_DIR = os.path.abspath("assets/videos/public/audio/cide")
os.makedirs(OUTPUT_DIR, exist_ok=True)

TRACKS = [
    {
        "id": "cide_act1_problematica",
        "text": "Caso de estudio: Gestión técnica y desarrollo de plugin WordPress para el Centro de Investigación y Desarrollo CIDE. A diferencia de crear un portal desde cero, el reto aquí era de gestión y soporte sobre una infraestructura ya existente. Su sistema anterior de certificados estaba colapsado por almacenar archivos PDF en un sitio secundario, obligando al equipo a duplicar la información de cada evento y dependiendo exclusivamente de correos vía SMTP. Cuando un correo rebotaba, el participante quedaba desatendido, generando horas de resolución manual y cuellos de botella."
    },
    {
        "id": "cide_act2_solucion",
        "text": "Para resolverlo de forma definitiva, diseñé y programé un plugin personalizado para WordPress integrado al sitio principal en cidelatam.org. La solución incluyó una interfaz de consulta pública y conexión directa a la base de datos, permitiendo validar certificados en tiempo real tanto por cédula o documento de identidad, como por el código único del certificado. Además, elaboré video tutoriales formativos para el equipo de gestión y guías paso a paso para que los estudiantes descarguen sus credenciales de manera autónoma."
    },
    {
        "id": "cide_act3_walkthrough",
        "text": "En el sistema desplegado en producción, los participantes acceden a una interfaz intuitiva y responsiva. Con solo ingresar su número de documento o el ID de certificación, el motor consulta los registros al instante, verifica la autenticidad académica y habilita la descarga directa del certificado en alta resolución. Todo el proceso ocurre en segundos en el navegador, liberando por completo el servidor de correo y garantizando disponibilidad continua las veinticuatro horas."
    },
    {
        "id": "cide_act4_resultados",
        "text": "Los resultados transformaron la operación de CIDE: cien por ciento de autoservicio para los participantes, eliminación total de las incidencias manuales por correos rebotados y descanso operativo del servidor SMTP. Una actualización técnica enfocada en resolver problemas reales con código limpio y escalable. Arianna Clemente, diseño y desarrollo web."
    }
]

async def generate_single(track):
    audio_path = os.path.join(OUTPUT_DIR, f"{track['id']}.mp3")
    srt_path = os.path.join(OUTPUT_DIR, f"{track['id']}.srt")

    for attempt in range(5):
        try:
            print(f"Generating {track['id']} (attempt {attempt + 1})...")
            communicate = edge_tts.Communicate(track['text'], VOICE, rate="+3%")
            submaker = edge_tts.SubMaker()
            with open(audio_path, "wb") as file:
                async for chunk in communicate.stream():
                    if chunk["type"] == "audio":
                        file.write(chunk["data"])
                    elif chunk["type"] == "WordBoundary":
                        submaker.feed(chunk)
            with open(srt_path, "w", encoding="utf-8") as file:
                file.write(submaker.get_srt())
            print(f"Done: {track['id']}.mp3 & .srt")
            return
        except Exception as e:
            print(f"Attempt {attempt + 1} failed: {e}")
            await asyncio.sleep(2)
    raise RuntimeError(f"Failed to generate {track['id']} after multiple attempts")

async def generate():
    for track in TRACKS:
        await generate_single(track)
        await asyncio.sleep(1)

if __name__ == "__main__":
    asyncio.run(generate())
