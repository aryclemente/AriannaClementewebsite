import asyncio
import os
import edge_tts

VOICE = "es-VE-PaolaNeural"
OUTPUT_DIR = os.path.abspath("assets/videos/public/audio")
os.makedirs(OUTPUT_DIR, exist_ok=True)

TRACKS = [
    {
        "id": "cep_scene1_concept",
        "text": "Caso de estudio: Centro de Espiritualidad y Pastoral de la Compañía de Jesús en Venezuela. Como arquitecta y diseñadora web, asumí el reto de concebir desde cero su presencia digital. Aplicando los fundamentos visuales del manual institucional Oasis, diseñé una interfaz sobria, accesible y alineada al carisma ignaciano. La arquitectura web en WordPress creció de siete a once páginas funcionales, incorporando el directorio de casas de retiro, el calendario de ejercicios espirituales y un gestor dinámico para subsidios de oración."
    },
    {
        "id": "cep_scene3_p1_slider_map",
        "text": "En la portada principal, optimizamos la navegación y destacamos las novedades más recientes y los próximos retiros. El componente estrella es el mapa interactivo vectorial de Venezuela: un desarrollo a medida que conecta y georreferencia las seis redes apostólicas del país, desplegando al instante coordinadores y obras al interactuar con cada región."
    },
    {
        "id": "cep_scene3_p2_casas_galeria",
        "text": "El directorio de Casas de Retiro, como Quebrada de La Virgen en Miranda y San Javier del Valle en Mérida, incorpora galerías fotográficas inmersivas de alta resolución, fichas de contacto directo y navegación fluida entre sedes."
    },
    {
        "id": "cep_scene3_p3_recursos_meta",
        "text": "Para la sección de Recursos Pastorales, implementamos un motor de búsqueda instantáneo filtrado por oraciones, lecturas y reflexiones. Además, auditamos la integración de Instagram en tiempo real y configuramos el enrutamiento para formularios institucionales seguros."
    },
    {
        "id": "cep_scene4_delivery_outro",
        "text": "La sostenibilidad del proyecto quedó garantizada facilitando talleres presenciales in situ para el equipo pastoral y entregando la Guía Oficial del Administrador. Un despliegue culminado al cien por ciento con solvencia y autonomía digital para la institución. Arianna Clemente, arquitectura web e ingeniería digital."
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
