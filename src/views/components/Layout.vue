<template>
  <div class="body-class">
    <div class="back-class"></div>
    <div class="container">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Layout',
  methods: {
    goBack() {
      this.$router.go(-1) // 返回到上一个页面
    }
  }
}
</script>

<style>
.body-class {
  background-color: #F3F7FF;
  border-bottom: 1px solid transparent; /* 添加透明边框 */
  min-height: 95vh;
}

.back-class {
  display: flex;
  align-items: center;
  height: 60px;
  font-family: PingFangSC;
  color: #000000;
  cursor: pointer;
  font-weight: 400;
  font-size: 14px;
  font-style: normal;
  text-decoration: none;
  text-align: left;
  margin: 0% 10% 0% 10%;
}

.container {
  font-family: PingFangSC;
  background-color: #FFFFFF;
  margin: 0% 10% 2% 10%;
  border: 0px solid #303133;
  border-radius: 15px;
  padding: 1.5% 1.5% 1.5% 1.5%;
}
</style>
