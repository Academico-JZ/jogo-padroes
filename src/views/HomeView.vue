<script setup>
</script>

<template>
  <main>
    <h1>Padrão em <br> <img src="/images/padroes.png" alt=""><span class="jogo">JOGO</span></h1>
    <p><button class="jogar">JOGAR</button></p>
  </main>
</template>

<style>
html, body, main, #app{
  width: 100%;
  height: 100%;
}
main {
  /*background: radial-gradient(#faadad4f,#faadad4f),url(../../public/images/lampada.png) no-repeat;
  background-size: 3vw 3vw, auto 50vh;
  width: 100%;
  height: 100%;*/
  background: radial-gradient(circle at 1px 5px, #faadad4f 150px, transparent 0px), radial-gradient(circle at 1px 100vh, #AAF1CB5C 20vh, transparent 0px), url(../../public/images/lampada.png) no-repeat 40vw center;
  background-repeat: no-repeat, no-repeat, no-repeat;
}

main h1{
  font-size: 1.5rem;
  font-weight: bold;
  /*margin: 0vw 0vw 0vw 13vw;*/
  position: relative;
  top: 40vh;
  left: 5vh;
}

main h1 span.jogo {
  font-size: 3rem;

}




main button.jogar {
  font-weight: bold;
  color: #878787;
  background: url(../../public/images/play.png) no-repeat;
  background-size: 100% auto ;
  padding: 20px 20px 20px 10px ;
  min-height: 133px;
  min-width: 116px;
  vertical-align: middle;
  text-align: left;
}

main p {
    /*margin:  30vw 60vw 65vw ;*/
    position: relative;
    top: 65vh;
    left: 24vh;
}

</style>

git config --global user.email "academicojz@gmail.com"