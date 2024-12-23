<script setup lang="ts">
import { Marquee } from "@selemondev/vue3-marquee";
import "@selemondev/vue3-marquee/dist/style.css";

import {
  Wine,
  Footprints,
  Scissors,
  Coffee,
  Croissant,
  Beer,
  Sparkles,
  Sandwich,
  Dumbbell,
  Flower2,
} from "lucide-vue-next";

interface ClientProps {
  icon: string;
  name: string;
  location: string;
}

const clients: ClientProps[] = [
  {
    icon: "wine",
    name: "La Cave du Coin",
    location: "Cachan",
  },
  {
    icon: "footprints",
    name: "Élégance Chaussures",
    location: "Courbevoie",
  },
  {
    icon: "sparkles",
    name: "Beauty Nails",
    location: "Neuilly-sur-Seine",
  },
  {
    icon: "coffee",
    name: "Le Petit Café",
    location: "Paris 11ème",
  },
  {
    icon: "croissant",
    name: "Boulangerie Martin",
    location: "Boulogne",
  },
  {
    icon: "beer",
    name: "Le Comptoir",
    location: "Levallois",
  },
  {
    icon: "scissors",
    name: "Coiffure & Style",
    location: "Asnières",
  },
  {
    icon: "sandwich",
    name: "Le Gourmet",
    location: "Paris 15ème",
  },
  {
    icon: "dumbbell",
    name: "FitClub",
    location: "Puteaux",
  },
  {
    icon: "flower2",
    name: "Fleurs & Passion",
    location: "Saint-Cloud",
  },
  {
    icon: "coffee",
    name: "Café des Arts",
    location: "Paris 6ème",
  },
  {
    icon: "wine",
    name: "Vins & Terroirs",
    location: "Suresnes",
  },
  {
    icon: "croissant",
    name: "La Tradition",
    location: "Clichy",
  },
  {
    icon: "sparkles",
    name: "Institut Beauté",
    location: "Paris 17ème",
  },
  {
    icon: "beer",
    name: "Brasserie du Marché",
    location: "Issy",
  },
  {
    icon: "shoe",
    name: "Chaussures Design",
    location: "La Défense",
  },
  {
    icon: "scissors",
    name: "Le Salon",
    location: "Paris 8ème",
  },
  {
    icon: "flower2",
    name: "Au Jardin Fleuri",
    location: "Rueil",
  },
  {
    icon: "sandwich",
    name: "Saveurs & Co",
    location: "Paris 9ème",
  },
  {
    icon: "dumbbell",
    name: "Sport Studio",
    location: "Nanterre",
  },
];

const iconMap: Record<string, any> = {
  wine: Wine,
  footprints: Footprints,
  scissors: Scissors,
  coffee: Coffee,
  croissant: Croissant,
  beer: Beer,
  sparkles: Sparkles,
  sandwich: Sandwich,
  dumbbell: Dumbbell,
  flower2: Flower2,
};
</script>

<template>
  <section id="clients" class="max-w-[90%] mx-auto pb-24 sm:pb-32">
    <h2 class="text-lg md:text-xl text-center mb-2 text-primary tracking-wider">Ils nous font confiance</h2>
    <h3 class="text-3xl md:text-4xl text-center font-bold mb-12">
      Rejoignez plus de 50 commerces
    </h3>

    <div class="mx-auto">
      <Marquee class="gap-[4rem]" :pauseOnHover="true" :fade="true" :duration="100" innerClassName="gap-[4rem]">
        <div v-for="{ icon, name, location } in clients" :key="name">
          <div
            class="flex items-center min-w-[300px] bg-muted/50 dark:bg-card rounded-lg p-4 hover:bg-muted/80 transition-colors">
            <component :is="iconMap[icon]" class="mr-4 text-primary size-8 shrink-0" />
            <div class="min-w-[200px]">
              <div class="font-medium text-xl whitespace-nowrap">{{ name }}</div>
              <div class="text-sm text-muted-foreground">{{ location }}</div>
            </div>
          </div>
        </div>
      </Marquee>
    </div>
  </section>
</template>

<style scoped>
.v3-marquee {
  --duration: 100s !important;
}
</style>
