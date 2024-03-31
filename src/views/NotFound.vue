<template>
  <div class="container">
    <img src="../assets/illustration-empty.svg" alt="no invoices" />
    <h2>This page could not be found</h2>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 30px;

  margin: 150px auto 0 auto;

  @media (min-width: 900px) {
    margin: 0 auto;
  }
}
</style>
