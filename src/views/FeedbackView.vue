<template>
  <div class="feedback-container">
    <div class="feedback-box">
      <p class="feedback-message" v-html="gameStore.feedbackMessage"></p>
    </div>

    <div class="game-controls">
      <RouterLink to="/app" class="nav-link">
        <button class="recomecar-button" @click="gameStore.startGame()">RECOMEÇAR</button>
      </RouterLink>

      <RouterLink to="/" class="nav-link">
        <button class="sair-button" @click="gameStore.endGame()">SAIR</button>
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { useGameStore } from '../stores/gameStore'
import { RouterLink } from 'vue-router'

const gameStore = useGameStore()
</script>

<style scoped>
.feedback-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 24px;
  position: relative;
  overflow: hidden;
  background:
    radial-gradient(circle at 15% 20%, rgba(251, 180, 180, 0.18), transparent 22%),
    radial-gradient(circle at 85% 10%, rgba(255, 234, 157, 0.16), transparent 24%),
    radial-gradient(circle at 15% 100%, rgba(171, 242, 203, 0.14), transparent 25%),
    linear-gradient(135deg, #0b1020 0%, #111827 42%, #1d2438 100%);
  font-family: 'Arial', sans-serif;
}

.feedback-box {
  background: linear-gradient(135deg, rgba(171, 242, 203, 0.95), rgba(198, 255, 223, 0.82));
  border-radius: 18px;
  padding: 32px 28px;
  text-align: center;
  box-shadow: 0 18px 32px rgba(6, 18, 25, 0.18);
  width: min(420px, 88%);
  border: 2px solid rgba(255, 255, 255, 0.22);
}

.feedback-message {
  margin: 0;
  font-size: clamp(1.3rem, 2vw, 1.8rem);
  font-weight: 900;
  letter-spacing: 0.08em;
  line-height: 1.32;
  text-transform: uppercase;
  color: #0a392f;
}

.game-controls {
  display: flex;
  justify-content: center;
  gap: 16px;
  width: 100%;
  max-width: 380px;
  margin-top: 28px;
  flex-wrap: wrap;
}

.nav-link {
  text-decoration: none;
}

.recomecar-button,
.sair-button {
  padding: 14px 24px;
  border-radius: 12px;
  border: none;
  font-size: 1.05rem;
  font-weight: 800;
  cursor: pointer;
  transition: transform 0.2s ease, filter 0.2s ease;
  color: #0d1726;
}

.recomecar-button {
  background: linear-gradient(135deg, #ffea9d, #ffd76c);
  box-shadow: 0 14px 25px rgba(255, 214, 108, 0.28);
}

.sair-button {
  background: linear-gradient(135deg, #fbb4b4, #f7a2a2);
  box-shadow: 0 14px 25px rgba(251, 180, 180, 0.25);
}

.recomecar-button:hover,
.sair-button:hover {
  transform: translateY(-2px);
  filter: brightness(1.02);
}

@media (max-width: 480px) {
  .feedback-box {
    padding: 26px 20px;
  }

  .game-controls {
    flex-direction: column;
    align-items: stretch;
  }

  .nav-link {
    width: 100%;
  }

  .recomecar-button,
  .sair-button {
    width: 100%;
  }
}
</style>
