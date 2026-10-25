<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <main class="home-screen">
    <div class="ambient ambient-left"></div>
    <div class="ambient ambient-right"></div>

    <div class="content">
      <p class="eyebrow">Desafio visual</p>
      <h1>
        Padrão em
        <span class="jogo">JOGO</span>
      </h1>
      <p class="subtitle">
        Descubra qual peça completa a sequência antes do tempo acabar.
      </p>
    </div>

    <RouterLink to="/app" class="jogar-link">
      <button class="jogar" type="button">JOGAR</button>
    </RouterLink>
  </main>
</template>

<style scoped>
:global(html),
:global(body),
:global(main),
:global(#app) {
  width: 100%;
  min-height: 100%;
  margin: 0;
}

:global(body) {
  background: #0b1020;
}

.home-screen {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background:
    radial-gradient(circle at 15% 20%, rgba(251, 180, 180, 0.2), transparent 20%),
    radial-gradient(circle at 80% 15%, rgba(164, 248, 210, 0.18), transparent 25%),
    linear-gradient(135deg, #0b1020 0%, #111827 45%, #1a2338 100%);
}

.ambient {
  position: absolute;
  width: 28rem;
  height: 28rem;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.4;
}

.ambient-left {
  left: -8rem;
  bottom: -6rem;
  background: rgba(129, 140, 248, 0.28);
}

.ambient-right {
  right: -9rem;
  top: -6rem;
  background: rgba(52, 211, 153, 0.22);
}

.content {
  position: relative;
  z-index: 2;
  max-width: 42rem;
  text-align: left;
  padding: 2rem 2.5rem;
}

.eyebrow {
  margin: 0 0 0.75rem;
  font-size: 0.82rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #dfe7ff;
  opacity: 0.8;
}

h1 {
  margin: 0;
  font-size: clamp(2.6rem, 5vw, 5rem);
  line-height: 0.95;
  letter-spacing: -0.06em;
  font-weight: 900;
  color: #f8fbff;
}

.jogo {
  display: block;
  font-size: clamp(3rem, 6vw, 6rem);
  background: linear-gradient(135deg, #ffea9d 0%, #abf2cb 54%, #e9e9ff 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.subtitle {
  margin-top: 1.25rem;
  max-width: 30rem;
  font-size: 1.08rem;
  line-height: 1.7;
  color: rgba(237, 242, 255, 0.8);
}

.jogar-link {
  position: absolute;
  right: clamp(1.5rem, 5vw, 4rem);
  bottom: clamp(1.5rem, 5vw, 4rem);
  z-index: 3;
  text-decoration: none;
}

.jogar {
  width: 150px;
  height: 120px;
  border: none;
  cursor: pointer;
  color: #1a1f2b;
  background: linear-gradient(135deg, #ffea9d, #ffd76c 52%, #f7c75b);
  border-radius: 18px 30px 18px 30px;
  box-shadow: 0 18px 35px rgba(255, 214, 108, 0.35);
  font-size: 1.25rem;
  font-weight: 900;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  transform: rotate(-8deg);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.jogar:hover {
  transform: translateY(-2px) rotate(-8deg) scale(1.03);
  box-shadow: 0 22px 38px rgba(255, 214, 108, 0.42);
}

@media (max-width: 600px) {
  .content {
    padding: 1.5rem 1.25rem 6rem;
    text-align: center;
  }

  .subtitle {
    margin-left: auto;
    margin-right: auto;
  }

  .jogar-link {
    right: 50%;
    bottom: 2rem;
    transform: translateX(50%);
  }
}
</style>
