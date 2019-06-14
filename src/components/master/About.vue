<template>
  <div :class="$options.name">
    <LayoutDefault>
      <router-view/>
    </LayoutDefault>
  </div>
</template>

<script>
import LayoutDefault from "../layout/LayoutDefault.vue";

export default {
  name: `About`,
  
  components: {
    LayoutDefault,
  },
  data () {
    return {
    }
  },

  mounted () {
  },

  created(){
  },

  methods: {
    metaPush(){    
        var m = document.createElement('meta'); 
        m.name = 'description'; 
        m.content = 'demo meta pushed'; 
        window.document.head.appendChild(m);
    }
  }
};
</script>

<style lang="scss">
@import '~normalize.css';
@import '~reset-css/_reset.scss';

* {
  box-sizing: border-box;
}

html body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
}
</style>
