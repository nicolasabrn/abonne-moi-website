<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  QrCode,
  CreditCard,
  Store,
  CalendarClock,
  BarChart3,
  Scan,
  Users,
  ShieldCheck,
} from "lucide-vue-next";

interface FeaturesProps {
  icon: string;
  title: string;
  description: string;
}

const featureList: FeaturesProps[] = [
  {
    icon: "qrCode",
    title: "QR Code Intelligent",
    description:
      "Système de QR code unique pour identifier vos clients et gérer leurs abonnements en toute simplicité depuis votre ordinateur ou votre smartphone.",
  },
  {
    icon: "creditCard",
    title: "Paiements Sécurisés",
    description:
      "Nous gérons les paiements pour vous, vous n'avez plus à vous soucier de la gestion des paiements, des litiges ou de la sécurité des paiements.",
  },
  {
    icon: "store",
    title: "Multi-Commerce",
    description:
      "Solution adaptée à tous types de commerces. Parmi nos clients : boulangeries, bars, instituts de beauté et bien plus encore.",
  },
  {
    icon: "calendarClock",
    title: "Abonnements Flexibles",
    description:
      "Créez des formules personnalisées : par jour, par semaine, par mois, avec des restrictions horaires ou journalières.",
  },
  {
    icon: "barChart3",
    title: "Analyses Détaillées",
    description:
      "Suivez vos performances, analysez les habitudes de vos clients et optimisez vos offres d'abonnement.",
  },
  {
    icon: "scan",
    title: "Scan Instantané",
    description:
      "Interface de scan rapide et intuitive pour vérifier les droits d'accès de vos clients en temps réel.",
  },
];

const iconMap: Record<string, any> = {
  qrCode: QrCode,
  creditCard: CreditCard,
  store: Store,
  calendarClock: CalendarClock,
  barChart3: BarChart3,
  scan: Scan,
  users: Users,
  shieldCheck: ShieldCheck,
};
</script>

<template>
  <section id="features" class="container py-24 sm:py-32">
    <h2 class="text-lg text-primary text-center mb-2 tracking-wider">
      Fonctionnalités
    </h2>

    <h2 class="text-3xl md:text-4xl text-center font-bold mb-4">
      Une solution complète pour Votre Commerce
    </h2>

    <h3 class="md:w-1/2 mx-auto text-xl text-center text-muted-foreground mb-8">
      Créez vos formules d'abonnement, définissez vos règles et nous gérons le reste.
    </h3>

    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="{ icon, title, description } in featureList" :key="title">
        <Card class="h-full bg-background border-0 shadow-none">
          <CardHeader class="flex justify-center items-center">
            <div class="bg-primary/20 p-2 rounded-full ring-8 ring-primary/10 mb-4">
              <component :is="iconMap[icon]" class="size-6 text-primary" />
            </div>

            <CardTitle>
              {{ title }}
            </CardTitle>
          </CardHeader>

          <CardContent class="text-muted-foreground text-center">
            {{ description }}
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
</template>

<style lang="less" scoped></style>
