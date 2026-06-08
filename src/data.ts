import { ServiceItem, ProcessStage } from "./types";

export interface ParadoxProblem {
  id: string;
  title: string;
  description: string;
}

export const servicesData: ServiceItem[] = [
  {
    id: "01",
    title: "Diseño Web",
    subtitle: "ESTRUCTURA DE ALTO NIVEL",
    description: "Presencias digitales construidas para transmitir claridad, autoridad y valor desde el primer segundo.",
    deliverables: [
      "Diseño responsive de alta precisión",
      "Experiencias inmersivas optimizadas para conversión orgánica",
      "Contraste estético premium y control del foco de lectura"
    ]
  },
  {
    id: "02",
    title: "Sistemas de Contenido",
    subtitle: "JERARQUÍA TEMPORAL",
    description: "Estructuras visuales que ordenan cómo tu marca es entendida en el tiempo.",
    deliverables: [
      "Arquitectura de la información bajo criterios de alta reputación",
      "Modelado de distribución de contenido interactivo",
      "Redacción orientada a conversión para todos los canales: web, redes sociales y email"
    ]
  },
  {
    id: "03",
    title: "Creativos para redes",
    subtitle: "CONSISTENCIA PERMANENTE",
    description: "Piezas diseñadas para consistencia, no solo estética.",
    deliverables: [
      "Directrices adaptadas a canales corporativos de distribución",
      "Sistemas de diseño que definen cómo tu marca se percibe, siempre",
      "Estructuras visuales equilibradas que retienen atención selectiva"
    ]
  },
  {
    id: "04",
    title: "Embudos y conversión",
    subtitle: "FLUJOS SIN FRICCIÓN",
    description: "Sistemas que guían la decisión sin fricción ni presión.",
    deliverables: [
      "Embudo de conversión con carga instantánea y micro-interacciones sutiles",
      "Optimización heurística del checkout y puntos de contacto del comprador",
      "Criterio de claridad absoluta para guiar decisiones de alto valor"
    ]
  },
  {
    id: "05",
    title: "Lead Magnets",
    subtitle: "DEMOSTRACIÓN DE EXPERTISE",
    description: "Materiales que demuestran expertise sin necesidad de explicarlo.",
    deliverables: [
      "Recursos que hacen que el prospecto llegue a la llamada ya convencido",
      "Materiales que atraen prospectos con intención real de compra", 
      "Diseño de recursos descargables con estándar de publicación impresa"
    ]
  },
  {
    id: "06",
    title: "Automatización e IA",
    subtitle: "INFRAESTRUCTURA PERSISTENTE",
    description: "Infraestructura para que tu comunicación funcione incluso cuando no estás presente.",
    deliverables: [
      "Ingeniería de integraciones y automatizado sin dependencias ruidosas",
      "Sistemas de respuesta inteligente adaptado a tu voz",
      "Identidades digitales que representan tu negocio las 24 horas"
    ]
  }
];

export const paradoxProblems: ParadoxProblem[] = [
  {
    id: "01",
    title: "Te comparan por precio, no por valor",
    description: "Si tu presencia no comunica nivel, eres una opción más."
  },
  {
    id: "02",
    title: "Tu comunicación no sostiene lo que haces",
    description: "Redes sociales sin estructura generan atención, no percepción."
  },
  {
    id: "03",
    title: "Tu negocio se ve más pequeño de lo que es",
    description: "Y eso afecta decisiones antes de cualquier conversación."
  }
];

export const processStages: ProcessStage[] = [
  {
    step: "01",
    title: "Entendimiento",
    duration: "Fase Uno",
    description: "Analizamos cómo eres percibido hoy vs cómo deberías ser percibido.",
    concept: "ANÁLISIS DE BRECHA"
  },
  {
    step: "02",
    title: "Dirección",
    duration: "Fase Dos",
    description: "Definimos estructura, mensaje y jerarquía de percepción.",
    concept: "MAPA DE AUTORIDAD"
  },
  {
    step: "03",
    title: "Construcción",
    duration: "Fase Tres",
    description: "Diseñamos la presencia digital como un sistema coherente.",
    concept: "INGENIERÍA VISUAL"
  },
  {
    step: "04",
    title: "Activación",
    duration: "Fase Cuatro",
    description: "Lanzamos un entorno donde tu valor deja de ser negociable.",
    concept: "POSICIONAMIENTO REAL"
  }
];

export const philosophyCopy = {
  quote: "No se trata de verse bien. Se trata de ser percibido correctamente.",
  emphasis: "El diseño no es decoración. Es una herramienta de posicionamiento."
};
