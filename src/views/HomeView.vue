<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <main>
    <div class="content">
      <h1>Padrão em <br> <img src="/images/padroes.png" alt=""><span class="jogo">JOGO</span></h1>
    </div>

    <RouterLink to="/app" class="jogar-link">
      <button class="jogar">JOGAR</button>
    </RouterLink>
  </main>
</template>

<style>
html, body, main, #app{
  width: 100%;
  height: 100%;
}
main {
  background: radial-gradient(circle at 1px 5px, #faadad4f 150px, transparent 0px), radial-gradient(circle at 1px 100vh, #AAF1CB5C 20vh, transparent 0px), url(../../public/images/lampada.png) no-repeat 40vw center;
  background-repeat: no-repeat, no-repeat, no-repeat;
}

/* Posicionamento: título no topo-esquerdo e botão no canto inferior-direito */
main { position: relative; }

main .content { position: absolute; top: 6vh; left: 4vh; z-index: 2; }

main h1{
  font-size: 1.5rem;
  font-weight: bold;
  /*margin: 0vw 0vw 0vw 13vw;*/
  position: relative;
  top: 40vh;
  left: 5vh;

}

main h1 span.jogo { font-size: 3rem; }

main .jogar-link { position: absolute; right: 6vh; bottom: 6vh; z-index: 3; }

main button.jogar {
  /* triangular visual: clip-path + fallback de imagem */
  background: url(../../public/images/play.png) no-repeat center center;
  background-size: contain;
  background-color: transparent;
  color: #878787;
  font-weight: bold;
  width: 140px;
  height: 120px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  clip-path: polygon(0 0, 100% 50%, 0 100%);
  -webkit-clip-path: polygon(0 0, 100% 50%, 0 100%);
}



/* Ajustes para mobile */
@media (max-width: 480px) {
  main .content { top: 4vh; left: 4vw; }
  main h1 { font-size: 1.4rem; }
  main h1 span.jogo { font-size: 2.6rem; }
  main .jogar-link { right: 4vw; bottom: 4vh; }
  main button.jogar { width: 110px; height: 96px; }
}

</style>