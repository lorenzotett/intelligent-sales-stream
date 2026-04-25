import { useLang } from "./LanguageContext";

const COPY = {
  en: {
    diagnostic: {
      sectionEyebrow: "AI Revenue Diagnostic",
      sectionTitle: "Find out how much money you're losing — in 60 seconds.",
      sectionSub: "Answer a few quick questions. We'll calculate your lost revenue and the AI systems that recover it.",
      openCta: "Open the diagnostic",
      navItem: "Diagnostic",
    },
    promo: {
      title: "Want to know how much revenue you're leaving on the table?",
      sub: "Take the free 60-second AI Revenue Diagnostic. Get your custom report instantly.",
      cta: "Run my free diagnostic",
      dismiss: "Not now",
    },
    cookies: {
      title: "We value your privacy",
      body: "We use cookies to make the site work, remember your language and understand how visitors use it. You can accept all, reject non-essential, or read our privacy policy.",
      accept: "Accept all",
      reject: "Reject non-essential",
      manage: "Privacy policy",
    },
    privacy: {
      title: "Privacy Policy",
      updated: "Last updated",
      intro:
        "This Privacy Policy explains how Cooverly (\"we\", \"us\") collects, uses and protects information when you visit cooverly.com or use our services.",
      sections: [
        {
          h: "1. Data we collect",
          p: "We collect (a) information you provide directly — for example when you complete the AI Revenue Diagnostic or contact us via WhatsApp, email or our forms (name, business details, lead-flow figures, contact details); and (b) technical data automatically — IP address, browser, device, pages visited and interactions, gathered through cookies and similar technologies.",
        },
        {
          h: "2. How we use your data",
          p: "We use the data to: deliver and improve the diagnostic and our services, generate your personalized revenue report, contact you about your request, send commercial communications where you've consented, comply with legal obligations, and prevent fraud or abuse.",
        },
        {
          h: "3. Legal basis (GDPR)",
          p: "We process your data based on your consent, the performance of a contract you request, our legitimate interest in running and improving Cooverly, and compliance with legal obligations.",
        },
        {
          h: "4. Cookies",
          p: "Essential cookies are required for the site to function (e.g. remembering your language and consent choice). Analytics cookies help us understand traffic. You can accept or reject non-essential cookies in the consent banner and change your choice at any time by clearing your browser storage for this site.",
        },
        {
          h: "5. Sharing",
          p: "We do not sell your data. We share it only with trusted processors strictly necessary to operate the service (hosting, analytics, communication tools), under data-processing agreements, and with authorities when required by law.",
        },
        {
          h: "6. Retention",
          p: "We keep your data only as long as necessary for the purposes above or as required by law, then delete or anonymize it.",
        },
        {
          h: "7. Your rights",
          p: "You can request access, rectification, deletion, restriction, portability and objection to processing of your personal data, and withdraw consent at any time. Contact us at hello@cooverly.com.",
        },
        {
          h: "8. International transfers",
          p: "Some processors may be located outside the EU/EEA. In that case, we rely on adequate safeguards such as Standard Contractual Clauses.",
        },
        {
          h: "9. Contact",
          p: "Cooverly · hello@cooverly.com · +34 625 19 88 29 · Spain & USA · EU Division: Digitalizzato (Italy).",
        },
      ],
      back: "Back to home",
    },
  },
  es: {
    diagnostic: {
      sectionEyebrow: "Diagnóstico de Ingresos IA",
      sectionTitle: "Descubre cuánto dinero estás perdiendo — en 60 segundos.",
      sectionSub: "Responde unas preguntas rápidas. Calculamos tus ingresos perdidos y los sistemas de IA que los recuperan.",
      openCta: "Abrir el diagnóstico",
      navItem: "Diagnóstico",
    },
    promo: {
      title: "¿Quieres saber cuántos ingresos estás dejando sobre la mesa?",
      sub: "Haz el Diagnóstico de Ingresos IA gratis (60 segundos). Recibe tu informe personalizado al instante.",
      cta: "Hacer mi diagnóstico gratis",
      dismiss: "Ahora no",
    },
    cookies: {
      title: "Valoramos tu privacidad",
      body: "Usamos cookies para que el sitio funcione, recordar tu idioma y entender cómo se usa. Puedes aceptar todas, rechazar las no esenciales o leer nuestra política de privacidad.",
      accept: "Aceptar todo",
      reject: "Rechazar no esenciales",
      manage: "Política de privacidad",
    },
    privacy: {
      title: "Política de Privacidad",
      updated: "Última actualización",
      intro:
        "Esta Política de Privacidad explica cómo Cooverly (\"nosotros\") recopila, utiliza y protege la información cuando visitas cooverly.com o utilizas nuestros servicios.",
      sections: [
        {
          h: "1. Datos que recopilamos",
          p: "Recopilamos (a) información que tú nos facilitas directamente — por ejemplo al completar el Diagnóstico de Ingresos IA o contactarnos por WhatsApp, email o nuestros formularios (nombre, datos del negocio, cifras de tu flujo de leads, datos de contacto); y (b) datos técnicos de forma automática — dirección IP, navegador, dispositivo, páginas visitadas e interacciones, mediante cookies y tecnologías similares.",
        },
        {
          h: "2. Cómo usamos tus datos",
          p: "Usamos los datos para: prestar y mejorar el diagnóstico y nuestros servicios, generar tu informe personalizado de ingresos, contactarte sobre tu solicitud, enviarte comunicaciones comerciales si has consentido, cumplir obligaciones legales y prevenir fraude o abuso.",
        },
        {
          h: "3. Base legal (RGPD)",
          p: "Tratamos tus datos en base a tu consentimiento, la ejecución de un contrato que solicitas, nuestro interés legítimo en operar y mejorar Cooverly, y el cumplimiento de obligaciones legales.",
        },
        {
          h: "4. Cookies",
          p: "Las cookies esenciales son necesarias para el funcionamiento del sitio (por ejemplo, recordar tu idioma y tu decisión sobre cookies). Las cookies de analítica nos ayudan a entender el tráfico. Puedes aceptar o rechazar las no esenciales en el banner y cambiar tu elección en cualquier momento borrando el almacenamiento del navegador para este sitio.",
        },
        {
          h: "5. Compartición",
          p: "No vendemos tus datos. Solo los compartimos con encargados de tratamiento estrictamente necesarios para operar el servicio (hosting, analítica, herramientas de comunicación), bajo acuerdos de tratamiento de datos, y con autoridades cuando la ley lo exija.",
        },
        {
          h: "6. Conservación",
          p: "Conservamos tus datos solo el tiempo necesario para los fines anteriores o el que exija la ley, y luego los eliminamos o anonimizamos.",
        },
        {
          h: "7. Tus derechos",
          p: "Puedes solicitar acceso, rectificación, supresión, limitación, portabilidad y oposición al tratamiento de tus datos personales, y retirar el consentimiento en cualquier momento. Contáctanos en hello@cooverly.com.",
        },
        {
          h: "8. Transferencias internacionales",
          p: "Algunos encargados pueden estar fuera del EEE. En ese caso aplicamos garantías adecuadas como las Cláusulas Contractuales Tipo.",
        },
        {
          h: "9. Contacto",
          p: "Cooverly · hello@cooverly.com · +34 625 19 88 29 · España & USA · División EU: Digitalizzato (Italia).",
        },
      ],
      back: "Volver al inicio",
    },
  },
} as const;

export function useExtras() {
  const { lang } = useLang();
  return COPY[lang];
}