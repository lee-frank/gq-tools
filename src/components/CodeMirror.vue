<template>
  <div class="codemirror-container">
    <codemirror
      :disabled="isDisabled"
      :code="computeToString"
      :options="editorOption"
      @change="onChange($event)">
    </codemirror>
  </div>
</template>

<script>
import {codemirror} from 'vue-codemirror';

export default {
  name: 'codeMirror',
  components: {
    codemirror
  },
  props: {
    isDisabled: Boolean,
    codeArray: Array
  },
  computed: {
    computeToString () {
      return this.codeArray.join('\n');
    }
  },
  data () {
    return {
      editorOption: {
        tabSize: 4,
        styleActiveLine: true,
        line: true,
        mode: 'text/html',
        lineWrapping: true,
        readOnly: this.isDisabled
      }
    };
  },
  methods: {
    onChange (value) {
      let array = []; // If empty, emit an empty array
      if (value !== '') {
        array = value.split('\n');
      }
      this.$emit('update', array);
    }
  }
};
</script>

<style>
.CodeMirror {
  border: 1px solid #c9c9c9;
}
/* Limit height of textarea */
.CodeMirror.cm-s-default.CodeMirror-wrap {
  height: 100%;
}
</style>
