<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  TrendingUp,
  Users,
  CalendarClock,
  Wallet,
} from "lucide-vue-next";

interface BenefitsProps {
  icon: string;
  title: string;
  description: string;
}

const benefitList: BenefitsProps[] = [
  {
    icon: "wallet",
    title: "Revenu Récurrent Garanti",
    description:
      "Convertissez vos clients en abonnés et sécurisez un revenu mensuel prévisible.",
  },
  {
    icon: "trendingUp",
    title: "Panier Moyen +10%",
    description:
      "Les abonnés dépensent 10% de plus et sont plus ouverts aux nouveautés.",
  },
  {
    icon: "users",
    title: "Fidélisation Naturelle",
    description:
      "90% de renouvellement après 3 mois. Vos clients deviennent vos ambassadeurs.",
  },
  {
    icon: "calendarClock",
    title: "Meilleure Gestion",
    description:
      "Optimisez vos stocks et votre personnel grâce aux données de fréquentation.",
  },
];

const iconMap: Record<string, any> = {
  trendingUp: TrendingUp,
  users: Users,
  calendarClock: CalendarClock,
  wallet: Wallet,
};
</script>

<template>
  <section id="benefits" class="container py-24 sm:py-32">
    <div class="grid lg:grid-cols-2 place-items-center lg:gap-24">
      <div>
        <h2 class="text-lg text-primary mb-2 tracking-wider">Bénéfices</h2>

        <h2 class="text-3xl md:text-4xl font-bold mb-4">
          Développez Votre Commerce avec les Abonnements
        </h2>
        <p class="text-xl text-muted-foreground mb-8">
          Les commerces utilisant Abonne-moi constatent une augmentation moyenne de 30% de leur chiffre d'affaires après
          6 mois d'utilisation.
        </p>
      </div>

      <div class="grid lg:grid-cols-2 gap-4 w-full">
        <Card v-for="({ icon, title, description }, index) in benefitList" :key="title"
          class="bg-muted/50 dark:bg-card hover:bg-background dark:hover:bg-background transition-all delay-75 group/number">
          <CardHeader>
            <div class="flex justify-between">
              <component class="size-8 mb-6 text-primary" :is="iconMap[icon]" />

              <span
                class="text-5xl text-muted-foreground/15 font-medium transition-all delay-75 group-hover/number:text-muted-foreground/30">0{{
                  index + 1
                }}</span>
            </div>

            <CardTitle>{{ title }}</CardTitle>
          </CardHeader>

          <CardContent class="text-muted-foreground">
            {{ description }}
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
</template>
