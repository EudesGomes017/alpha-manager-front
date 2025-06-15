<template>
  <div class="flex items-center gap-3 p-2">
    <Avatar class="h-8 w-8">
      <AvatarImage src="/avatars/default.png" />
      <AvatarFallback>US</AvatarFallback>
    </Avatar>
    <div class="flex flex-col">
      <span class="text-sm font-medium">Usuário</span>
      <span class="text-xs text-muted-foreground">admin@alpha.com</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
</script>
