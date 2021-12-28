<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto+Condensed');

:root {
  --color-primary    : #526E2DFF;
  --color-secondary  : #24325FFF;
  --color-tertiary   : #B7E4F9FF;
  --color-quaternary : #00b3cb;
}

@font-face {
  font-family  : 'Get Schwifty';
  src          : url('./fonts/GetSchwifty-Regular.woff2') format('woff2'),
  url('./fonts/GetSchwifty-Regular.woff') format('woff');
  font-weight  : normal;
  font-style   : normal;
  font-display : swap;
}


* {
  box-sizing : border-box;
  padding    : 0;
  margin     : 0;
}

html, body {
  font-family : 'Roboto', sans-serif;
}

.btn {
  cursor          : pointer;
  border          : 1px solid var(--color-secondary);
  background      : var(--color-secondary);
  color           : white;
  padding         : .5em 1.25em;
  text-decoration : none;
  transition      : all .3s ease-in-out;
  font-weight     : 700;
}

.btn:hover {
  background : white;
  color      : var(--color-secondary);
}
</style>
