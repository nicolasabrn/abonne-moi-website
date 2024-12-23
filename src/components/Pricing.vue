<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Check } from "lucide-vue-next";

enum PopularPlan {
  NO = 0,
  YES = 1,
}

interface PlanProps {
  title: string;
  popular: PopularPlan;
  price: number;
  description: string;
  buttonText: string;
  benefitList: string[];
}

const plans: PlanProps[] = [
  {
    title: "Starter",
    popular: 0,
    price: 29,
    description:
      "Idéal pour les petits commerces qui débutent avec les abonnements.",
    buttonText: "Commencer gratuitement",
    benefitList: [
      "Jusqu'à 50 abonnés",
      "QR Code illimités",
      "Interface de scan",
      "Paiements Stripe",
      "Support par email",
    ],
  },
  {
    title: "Pro",
    popular: 1,
    price: 79,
    description:
      "Pour les commerces qui veulent développer leur base d'abonnés.",
    buttonText: "Essai gratuit de 14 jours",
    benefitList: [
      "Abonnés illimités",
      "Formules personnalisées",
      "Analyses avancées",
      "Support prioritaire",
      "Multi-points de vente",
    ],
  },
  {
    title: "Entreprise",
    popular: 0,
    price: 199,
    description:
      "Solution sur mesure pour les grandes enseignes et franchises.",
    buttonText: "Contactez-nous",
    benefitList: [
      "Tout du plan Pro",
      "API personnalisée",
      "Intégration CRM",
      "Support dédié 24/7",
      "Formation équipe",
    ],
  },
];
</script>

<template>
  <section class="container py-24 sm:py-32">
    <h2 class="text-lg text-primary text-center mb-2 tracking-wider">
      Tarifs
    </h2>

    <h2 class="text-3xl md:text-4xl text-center font-bold mb-4">
      Une offre adaptée à chaque commerce
    </h2>

    <h3 class="md:w-1/2 mx-auto text-xl text-center text-muted-foreground pb-14">
      Commencez gratuitement et évoluez avec nous. Commission de 5% sur les transactions.
    </h3>

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-4">
      <Card v-for="{
        title,
        popular,
        price,
        description,
        buttonText,
        benefitList,
      } in plans" :key="title" :class="{
        'drop-shadow-xl shadow-black/10 dark:shadow-white/10 border-[1.5px] border-primary lg:scale-[1.1]':
          popular === PopularPlan?.YES,
      }">
        <CardHeader>
          <CardTitle class="pb-2">
            {{ title }}
          </CardTitle>

          <CardDescription class="pb-4">{{ description }}</CardDescription>

          <div>
            <span class="text-3xl font-bold">{{ price }}€</span>
            <span class="text-muted-foreground"> /mois</span>
          </div>
        </CardHeader>

        <CardContent class="flex">
          <div class="space-y-4">
            <span v-for="benefit in benefitList" :key="benefit" class="flex">
              <Check class="text-primary mr-2" />
              <h3>{{ benefit }}</h3>
            </span>
          </div>
        </CardContent>

        <CardFooter>
          <Button :variant="popular === PopularPlan?.NO ? 'secondary' : 'default'" class="w-full">
            {{ buttonText }}
          </Button>
        </CardFooter>
      </Card>
    </div>
  </section>
</template>
