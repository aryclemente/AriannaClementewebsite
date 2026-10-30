import asyncio
import os
import edge_tts

VOICE = "es-VE-PaolaNeural"
OUTPUT_DIR = os.path.abspath("assets/videos/public/audio")
os.makedirs(OUTPUT_DIR, exist_ok=True)

TRACKS = [
    {
        "id": "scene1_problem",
        "text": "Caso de estudio: Unidad Educativa Colegio Gonzaga. Durante la auditoría inicial de la plataforma, identificamos un ecosistema digital heredado y fragmentado en doce páginas dispersas. El sitio presentaba una navegación confusa, pérdida de identidad institucional y una ausencia total de mecanismos para canalizar donaciones en sus campañas benéficas."
    },
    {
        "id": "scene2_architecture",
        "text": "Como Solutions Architect, lideré una reestructuración estratégica completa. Sintetizamos las doce páginas legadas en cinco páginas maestras orientadas a conversión. Construimos una propuesta integral en Figma basada en el manual de marca oficial con azul marino e inserciones en oro, e implementamos un sistema de diseño desacoplado sobre WordPress y Tailwind CSS."
    },
    {
        "id": "scene3_p1_home",
        "text": "Comenzamos con la Página de Inicio: diseñada como una puerta de entrada dinámica de cero fricción. Comunica el impacto institucional, destaca accesos prioritarios al reproductor de la radio y ubica el llamado a donar en la cabecera para máxima visibilidad."
    },
    {
        "id": "scene3_p2_educativa",
        "text": "En la Propuesta Educativa, transformamos un texto denso en una interfaz interactiva dividida en cuatro ejes pedagógicos claros. Los padres de familia pueden explorar el Modelo Ignaciano y descargar directamente el Proyecto Curricular Institucional."
    },
    {
        "id": "scene3_p3_nosotros",
        "text": "La sección Sobre Nosotros rescata el legado del colegio con galerías fotográficas en alta resolución, una línea de tiempo histórica y pestañas dinámicas que demuestran la fuerza formativa en tecnología, música, deportes y artes."
    },
    {
        "id": "scene3_p4_actualidad",
        "text": "En Actualidad, creamos un centro multimedia que integra el reproductor en vivo de Gonzaga Radio y un sistema ágil de noticias institucionales para conectar a toda la comunidad escolar."
    },
    {
        "id": "scene3_p5_financiamiento",
        "text": "La página de Financiamiento fue el gran salto estratégico: diseñamos un embudo de donaciones sin fricción para campañas críticas como Agua y Electricidad, facilitando los aportes familiares y enlazando con más de tres mil quinientos exalumnos y voluntarios."
    },
    {
        "id": "scene4_results_outro",
        "text": "El resultado es una plataforma moderna y escalable, respaldada por ocho eventos de conversión en Google Analytics 4 para auditar cada fase de la recaudación, y complementada con un plan de capacitación grabado para el equipo interno. Ingeniería digital con propósito por Arianna Clemente."
    }
]

async def generate():
    for track in TRACKS:
        audio_path = os.path.join(OUTPUT_DIR, f"{track['id']}.mp3")
        vtt_path = os.path.join(OUTPUT_DIR, f"{track['id']}.vtt")
        print(f"Generating {track['id']}...")
        communicate = edge_tts.Communicate(track['text'], VOICE, rate="+3%")
        submaker = edge_tts.SubMaker()
        with open(audio_path, "wb") as file:
            async for chunk in communicate.stream():
                if chunk["type"] == "audio":
                    file.write(chunk["data"])
                elif chunk["type"] == "WordBoundary":
                    submaker.feed(chunk)
        srt_path = os.path.join(OUTPUT_DIR, f"{track['id']}.srt")
        with open(srt_path, "w", encoding="utf-8") as file:
            file.write(submaker.get_srt())
        print(f"Done: {track['id']}.mp3 & .srt")

if __name__ == "__main__":
    asyncio.run(generate())
