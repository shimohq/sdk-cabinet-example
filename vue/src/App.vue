<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {}
</script>

<style>
html {
  height: 100%;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", Helvetica, Tahoma, Arial, "Microsoft YaHei", 微软雅黑, 黑体, Heiti, sans-serif, SimSun, 宋体, serif;
  height: 100%;
}

.page-base {
  min-width: 1280px;
}

.cur-pointer {
  cursor: pointer;
}

.editor-container {
  background: #f7f7f7;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  position: relative;
}

.editor, .sm-editor {
  height: 100%;
}

/* Custom shimo editor */

.sm-editor-scroller {
  height: calc(100vh - 106px)!important;
}

.sm-toolbar {
  position: relative;
  z-index: 1;
}

.sm-toolbar::after {
  box-shadow: 0 1px 2px 1px #d9d9d9;
  content: ' ';
  display: block;
  height: 0;
  width: 100%;
}

#shark-toolbar {
  height: 44px;
}

#shark-menubar p {
  font-size: inherit;
  line-height: 2.33333;
}

/* Override shimo styles */
.bs-btn.btn:before {
  display: none;
}

/* Override MajesticAdmin's style */

.brand-logo-mini {
  max-height: 24px;
  padding: 0!important;
  max-width: 24px;
}

.brand-logo-mini img {
  height: 100%!important;
}

.table-of-content .new-doc-directory.close {
  float: none;
  font-size: inherit;
  font-weight: inherit;
  line-height: inherit;
  color: inherit;
  text-shadow: none;
  opacity: inherit;
}

.sidebar .nav.sub-menu .nav-item {
  position: relative;
}

.spinner {
  left: 50%;
  margin-left: -50%;
  position: absolute;
  top: 0;
  z-index: 0;
}
</style>
