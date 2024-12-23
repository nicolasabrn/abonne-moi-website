<script setup lang="ts">
import { QrCode } from "lucide-vue-next";
import Separator from "./ui/separator/Separator.vue";
</script>

<template>
  <footer id="footer" class="container py-24 pb-16 sm:py-32 sm:pb-24">
    <div class="p-10 bg-muted/50 dark:bg-card border rounded-2xl">
      <div class="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-x-12 gap-y-8">
        <div class="col-span-full xl:col-span-2">
          <a href="#" class="flex font-bold items-center">
            <QrCode
              class="bg-gradient-to-tr from-primary via-primary/70 to-primary rounded-lg w-9 h-9 mr-2 border text-white p-1" />

            <h3 class="text-2xl">Abonne-moi</h3>
          </a>
          <p class="mt-4 text-muted-foreground">
            La solution d'abonnement pour les commerces de proximité
          </p>
        </div>

        <div class="flex flex-col gap-2">
          <h3 class="font-bold text-lg">Produit</h3>
          <div>
            <a href="#features" class="opacity-60 hover:opacity-100">
              Fonctionnalités
            </a>
          </div>

          <div>
            <a href="#pricing" class="opacity-60 hover:opacity-100">
              Tarifs
            </a>
          </div>

          <div>
            <a href="#faq" class="opacity-60 hover:opacity-100">
              FAQ
            </a>
          </div>
        </div>

        <!-- <div class="flex flex-col gap-2">
          <h3 class="font-bold text-lg">Ressources</h3>
          <div>
            <a href="#" class="opacity-60 hover:opacity-100">
              Guide d'utilisation
            </a>
          </div>

          <div>
            <a href="#" class="opacity-60 hover:opacity-100">
              API Documentation
            </a>
          </div>

          <div>
            <a href="#" class="opacity-60 hover:opacity-100">
              Blog
            </a>
          </div>
        </div> -->

        <div class="flex flex-col gap-2">
          <h3 class="font-bold text-lg">Support</h3>
          <div>
            <a href="mailto:tech@abonne-moi.com" class="opacity-60 hover:opacity-100">
              Contact
            </a>
          </div>
        </div>

        <!-- End of grid columns -->
      </div>

      <Separator class="my-6" />
      <section class="text-center text-muted-foreground">
        <h3>
          &copy; 2024 Abonne-moi - Tous droits réservés
        </h3>
      </section>
    </div>
  </footer>
</template>
