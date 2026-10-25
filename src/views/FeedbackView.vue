<template>
  <div class="game-page-container">
    <div class="game-header">
      <div class="time-display">{{ formatTime(gameStore.timeLeft) }}</div>
      <div class="score-display">
        {{ gameStore.correctAnswers }} ACERTO{{ gameStore.correctAnswers === 1 ? '' : 'S' }}
      </div>
    </div>

    <div class="panel pattern-section">
      <p class="instruction">Escolha o item que completa a sequência:</p>
      <div class="pattern-display">
        <template v-for="(item, index) in gameStore.currentPattern" :key="index">
          <div v-if="item === '?'