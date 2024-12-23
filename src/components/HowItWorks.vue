<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface HowItWorksProps {
  badgeTitle: string;
  title: string;
  description: string;
  image: string;
}

const HowItWorksList: HowItWorksProps[] = [
  {
    badgeTitle: "Étape 1",
    title: "Créez vos formules",
    description:
      "Définissez vos formules d'abonnement selon vos besoins : quotidien, hebdomadaire, mensuel... Ajoutez des restrictions horaires ou journalières pour une flexibilité totale.",
    image: "create-sub.png",
  },
  {
    badgeTitle: "Étape 2",
    title: "Proposez vos abonnements",
    description:
      "Partagez vos formules d'abonnement directement en boutique ou intégrez-les à votre site internet. Nous gérons automatiquement les paiements via Stripe.",
    image: "sell-subs.png",
  },
  {
    badgeTitle: "Étape 3",
    title: "Vos clients s'abonnent",
    description:
      "Vos clients choisissent leur formule et reçoivent instantanément leur QR code personnel. Plus besoin de carte de fidélité physique !",
    image: "payment.png",
  },
  {
    badgeTitle: "Étape 4",
    title: "Scannez et validez",
    description:
      "À chaque visite, scannez simplement le QR code de vos clients. Notre application vérifie instantanément leurs droits et décompte automatiquement leur utilisation.",
    image: "scan.png",
  },
];
</script>

<template>
  <section id="how-it-works" class="container py-24 sm:py-32">
    <div class="text-center mb-12">
      <h2 class="text-lg text-primary text-center mb-2 tracking-wider">
        Comment ça marche
      </h2>

      <h2 class="text-3xl md:text-4xl text-center font-bold">
        Simple pour vous, simple pour vos clients
      </h2>
    </div>

    <div class="lg:w-[80%] mx-auto relative">
      <div v-for="({ badgeTitle, title, description, image }, index) in HowItWorksList" :key="title"
        :class="['flex mb-16 items-center gap-8', { 'flex-row-reverse': index % 2 !== 0 }]">
        <Card class="flex-1 bg-muted/50 dark:bg-card">
          <CardHeader>
            <div class="pb-4">
              <Badge variant="default" class="text-base py-1 px-4">{{ badgeTitle }}</Badge>
            </div>

            <CardTitle class="text-2xl">
              {{ title }}
            </CardTitle>
          </CardHeader>

          <CardContent class="text-muted-foreground text-lg">
            {{ description }}
          </CardContent>
        </Card>

        <div class="flex-1 relative">
          <div class="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5 rounded-full blur-3xl"></div>
          <img :src="image" :alt="`${title}`" class="relative w-full max-w-[300px] mx-auto rounded-sm" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.gradient-blur {
  filter: blur(100px);
  transform: translateZ(0);
}
</style>
