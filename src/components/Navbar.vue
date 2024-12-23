<script lang="ts" setup>
import { ref } from "vue";

import { useColorMode } from "@vueuse/core";
const mode = useColorMode();
mode.value = "dark";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { QrCode, Menu } from "lucide-vue-next";
import ToggleTheme from "./ToggleTheme.vue";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/toast/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface RouteProps {
  href: string;
  label: string;
}

const routeList: RouteProps[] = [
  {
    href: "/#benefits",
    label: "Avantages"
  },
  {
    href: "/#features",
    label: "Fonctionnalités",
  },
  {
    href: "/#how-it-works",
    label: "Comment ça marche ?",
  },
  {
    href: "/#faq",
    label: "FAQ",
  },
];

const isOpen = ref<boolean>(false);

const { toast } = useToast();

const industries = [
  "Boulangerie",
  "Cave à vin",
  "Café / Bar",
  "Restaurant",
  "Institut de beauté",
  "Autre"
];

const formData = ref({
  name: '',
  industry: '',
  email: '',
  phone: ''
});

const isLoading = ref(false);
const showForm = ref(false);

function validatePhone(phone: string) {
  if (!phone) return true; // Vide est ok si l'email est rempli
  const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
  return phoneRegex.test(phone);
}

function validateEmail(email: string) {
  if (!email) return true; // Vide est ok si le téléphone est rempli
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

async function handleSubmit() {
  // Vérifier qu'au moins un moyen de contact est fourni
  if (!formData.value.email && !formData.value.phone) {
    toast({
      variant: "destructive",
      title: "Erreur de validation",
      description: "Veuillez fournir au moins un moyen de contact (email ou téléphone)"
    });
    return;
  }

  // Valider le téléphone s'il est rempli
  if (formData.value.phone && !validatePhone(formData.value.phone)) {
    toast({
      variant: "destructive",
      title: "Erreur de validation",
      description: "Numéro de téléphone invalide (format français)"
    });
    return;
  }

  // Valider l'email s'il est rempli
  if (formData.value.email && !validateEmail(formData.value.email)) {
    toast({
      variant: "destructive",
      title: "Erreur de validation",
      description: "Format d'email invalide"
    });
    return;
  }

  isLoading.value = true;
  try {
    await fetch('https://automation.nicolasaubrun.com/webhook/abonne-moi/new-lead', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData.value)
    });

    showForm.value = false;
    formData.value = { name: '', industry: '', email: '', phone: '' };

    toast({
      title: "Demande envoyée !",
      description: "Nous vous contacterons très prochainement."
    });
  } catch (error) {
    toast({
      variant: "destructive",
      title: "Erreur",
      description: "Une erreur est survenue. Veuillez réessayer."
    });
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <header :class="{
    'shadow-light': mode === 'light',
    'shadow-dark': mode === 'dark',
    'w-[90%] md:w-[70%] lg:w-[75%] lg:max-w-screen-xl top-5 mx-auto sticky border z-40 rounded-2xl flex justify-between items-center p-2 bg-card shadow-md': true,
  }">
    <a href="/" class="font-bold text-lg flex items-center">
      <QrCode
        class="bg-gradient-to-tr from-primary via-primary/70 to-primary rounded-lg w-9 h-9 mr-2 border text-white p-1" />
      Abonne-moi
    </a>
    <!-- Mobile -->
    <div class="flex items-center lg:hidden">
      <Sheet v-model:open="isOpen">
        <SheetTrigger as-child>
          <Menu @click="isOpen = true" class="cursor-pointer" />
        </SheetTrigger>

        <SheetContent side="left" class="flex flex-col justify-between rounded-tr-2xl rounded-br-2xl bg-card">
          <div>
            <SheetHeader class="mb-4 ml-4">
              <SheetTitle class="flex items-center">
                <a href="/" class="flex items-center">
                  <QrCode
                    class="bg-gradient-to-tr from-primary/70 via-primary to-primary/70 rounded-lg size-9 mr-2 border text-white p-1" />
                  Abonne-moi
                </a>
              </SheetTitle>
            </SheetHeader>

            <div class="flex flex-col gap-2">
              <Button v-for="{ href, label } in routeList" :key="label" as-child variant="ghost"
                class="justify-start text-base">
                <a @click="isOpen = false" :href="href">
                  {{ label }}
                </a>
              </Button>
            </div>
          </div>

          <SheetFooter class="flex-col sm:flex-col justify-start items-start">
            <Separator class="mb-2" />
            <ToggleTheme />
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>

    <!-- Desktop -->
    <NavigationMenu class="hidden lg:block">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Button v-for="{ href, label } in routeList" :key="label" as-child variant="ghost"
              class="justify-start text-base">
              <a :href="href">
                {{ label }}
              </a>
            </Button>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>

    <div class="hidden lg:flex items-center gap-4">
      <ToggleTheme />
      <div class="relative flex gap-2">
        <Button @click="showForm = !showForm" variant="outline" class="font-semibold">
          S'inscrire
        </Button>

        <Button href="https://app.abonne-moi.com" variant="default" class="font-semibold">
          Se connecter
        </Button>

        <Card v-if="showForm" class="absolute right-0 top-12 w-80 p-4 z-50">
          <form @submit.prevent="handleSubmit" class="space-y-4">
            <span class="text-sm text-muted-foreground mb-8">
              Nous créons les comptes clients avec vous pour vous aider à prendre en main l'outil. Laissez-nous
              un moyen de vous contacter.
            </span>
            <div>
              <Input v-model="formData.name" placeholder="Nom de votre entreprise" required />
            </div>
            <div>
              <Select v-model="formData.industry" required>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez votre industrie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem v-for="industry in industries" :key="industry" :value="industry">
                    {{ industry }}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Input v-model="formData.email" type="email" placeholder="Email" />
            </div>
            <div>
              <Input v-model="formData.phone" type="tel" placeholder="Téléphone (format français)" />
            </div>
            <p class="text-xs text-muted-foreground">Au moins un moyen de contact est requis</p>
            <Button type="submit" class="w-full" :disabled="isLoading">
              {{ isLoading ? 'Envoi...' : 'Envoyer' }}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  </header>
</template>

<style scoped>
.shadow-light {
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.085);
}

.shadow-dark {
  box-shadow: inset 0 0 5px rgba(255, 255, 255, 0.141);
}
</style>
