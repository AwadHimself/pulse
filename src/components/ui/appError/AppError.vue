<template>
  <section class="error">
    <div>
      <iconify-icon icon="lucide:triangle-alert" class="error__icon" />
      <h1 class="error__code">404</h1>
      <p class="error__msg">Page not found</p>
      <div class="error-footer">
        <p class="error-footer__text">You'll find lots to explore on the home page.</p>
        <RouterLink to="/">
          <Button class="max-w-36"> Back to homepage </Button>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.error {
  margin-left: auto;
  margin-right: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  padding: 2.5rem; // 10 (tailwind scale)
  text-align: center;
  margin-top: -5rem; // -mt-20
  min-height: 90vh;

  &__icon {
    font-size: 3.5rem; // text-7xl
    color: #ef4444; // assuming "text-destructive" is a red tone
  }

  &__code {
    font-weight: 800;
    font-size: 3.5rem;
    color: #a1a1aa; // assuming "text-secondary" is a gray tone
  }

  &__msg {
    font-size: 1.875rem; // text-3xl
    font-weight: 800;
    color: #0f172a; // assuming "text-primary" is a dark tone
  }

  &-footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1.25rem; // gap-5
    margin-top: 1.5rem; // mt-6
    font-weight: 300;

    &__text {
      font-size: 1.125rem; // text-lg
      color: #6b7280; // assuming "text-muted-foreground"
    }
  }
}

p {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}
</style>
