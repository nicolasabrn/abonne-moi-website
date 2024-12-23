<script setup lang="ts">
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQProps {
  question: string;
  answer: string;
  value: string;
}

const FAQList: FAQProps[] = [
  {
    question: "Comment fonctionne le système de QR code ?",
    answer: "Chaque abonné reçoit un QR code unique lié à son abonnement. Lors de sa visite dans votre commerce, il vous suffit de scanner ce code avec notre application pour vérifier ses droits et valider son passage.",
    value: "item-1",
  },
  {
    question: "Quels types d'abonnements puis-je créer ?",
    answer: "Vous pouvez créer des abonnements très flexibles : quotidiens, hebdomadaires, mensuels, avec des restrictions horaires ou journalières. Par exemple : '1 café par jour', '3 passages par semaine', 'Accès illimité le matin', etc.",
    value: "item-2",
  },
  {
    question: "Comment sont gérés les paiements ?",
    answer: "Nous utilisons Stripe pour gérer tous les paiements de manière sécurisée. Les paiements sont automatiquement prélevés et vous êtes payé directement sur votre compte bancaire, moins notre commission de 5%.",
    value: "item-3",
  },
  {
    question: "Puis-je gérer plusieurs points de vente ?",
    answer: "Oui, vous pouvez gérer plusieurs points de vente depuis un seul compte.",
    value: "item-4",
  },
  {
    question: "Comment sont gérées les statistiques ?",
    answer: "Notre tableau de bord vous permet de suivre en temps réel le nombre d'abonnés actifs, les passages quotidiens, les revenus générés, et d'identifier les formules les plus populaires pour optimiser votre offre.",
    value: "item-5",
  },
  {
    question: "Combien ça coûte ?",
    answer: "Nous ne facturons rien. Vous pouvez utiliser notre application gratuitement et sans engagement, seuls 5% de commission sont prélevés sur les paiements",
    value: "item-6",
  }
];
</script>

<template>
  <section id="faq" class="container md:w-[700px] py-24 sm:py-32">
    <div class="text-center mb-8">
      <h2 class="text-lg text-primary text-center mb-2 tracking-wider">FAQ</h2>

      <h2 class="text-3xl md:text-4xl text-center font-bold">
        Questions Fréquentes
      </h2>
    </div>

    <Accordion type="single" collapsible class="AccordionRoot">
      <AccordionItem v-for="{ question, answer, value } in FAQList" :key="value" :value="value">
        <AccordionTrigger class="text-left"> {{ question }} </AccordionTrigger>

        <AccordionContent>{{ answer }}</AccordionContent>
      </AccordionItem>
    </Accordion>

    <h3 class="font-medium mt-4 text-center">
      Vous avez d'autres questions ?
      <a href="mailto:tech@abonne-moi.com" class="text-primary underline hover:text-primary/80">
        Contactez-nous
      </a>
    </h3>
  </section>
</template>
