<template>
  <div class="wrapper">
    <div class="imgbox">
      <img src="@/images/error400.jpg" alt="error400">
    </div>
  </div>
</template>


<style scoped>
  .wrapper{
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 100vh;
  }
  .imgbox{
    position: relative;
    width: 700px;
    height: 500px;
  }
  img{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>
