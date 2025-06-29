import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

export default function FAQ() {
  const faqs = [
    {
      question: "¿Necesito conocimientos técnicos para usar AutoBiz.AI?",
      answer: "No, AutoBiz.AI está diseñado para ser completamente intuitivo. Solo necesitas responder algunas preguntas sobre tu negocio y nuestra IA se encarga del resto. No requiere conocimientos de programación, diseño o marketing técnico."
    },
    {
      question: "¿Cuánto tiempo tarda en crear mi negocio digital?",
      answer: "El proceso completo toma entre 5-10 minutos. Nuestra IA genera tu landing page, secuencias de email, y automatizaciones en tiempo real. Una vez completado, puedes hacer ajustes y personalizar según tus necesidades."
    },
    {
      question: "¿Puedo personalizar el contenido generado por la IA?",
      answer: "Absolutamente. El contenido generado por IA es tu punto de partida. Puedes editar textos, cambiar colores, añadir tu logo, modificar imágenes y ajustar cualquier elemento para que refleje perfectamente tu marca y estilo."
    },
    {
      question: "¿Cómo funciona la integración con sistemas de pago?",
      answer: "Integramos con Stripe y PayPal de forma nativa. Una vez configures tu cuenta, los pagos se procesan automáticamente y el dinero llega directamente a tu cuenta. También manejamos facturación automática y gestión de suscripciones."
    },
    {
      question: "¿Qué tipo de soporte ofrecen?",
      answer: "Ofrecemos soporte por email en todos los planes, chat en vivo para usuarios Pro, y soporte telefónico 24/7 para usuarios Business. También tenemos una base de conocimientos completa y tutoriales en video."
    },
    {
      question: "¿Puedo usar mi propio dominio?",
      answer: "Sí, en los planes Pro y Business puedes conectar tu propio dominio. Te guiamos paso a paso en el proceso de configuración. Si no tienes dominio, también podemos ayudarte a registrar uno nuevo."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Preguntas Frecuentes
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Resolvemos las dudas más comunes sobre AutoBiz.AI
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border border-gray-200 rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">¿No encuentras la respuesta que buscas?</p>
            <Button 
              className="bg-primary hover:bg-primary/90 text-white"
              onClick={() => window.open('mailto:support@autobiz.ai?subject=Consulta de Soporte', '_blank')}
            >
              Contactar Soporte
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
