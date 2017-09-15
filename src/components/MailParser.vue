<template>
  <div>
    <div>
      <p>This tool will help parse Canadian postal codes from single cell mailing addresses.</p>
      <span>1. Cut/paste mail addresses below (one on each line). Click PARSE ADDRESSES when ready.</span>
    </div>

    <div class="codemirror-container">
      <codemirror :options="editorOption" v-model="code"></codemirror>
    </div>

    <button type="button" class="btn btn-primary" @click="submitCode">Parse Addresses</button>
    <button type="button" class="btn btn-primary" @click="resetAll">
      Reset
    </button>

    <br /><br />
    <div>
      <span>2. Preview and download</span> <span v-show="numberOfParsedAddresses > 0">
        ({{ numberOfParsedAddresses }} Records)
      </span>
    </div>

    <table class="preview">
      <tr v-show="numberOfParsedAddresses > 0">
        <th class="preview-row"></th>
        <th align="left">mail_address1</th>
        <th align="left">mail_postal</th>
      </tr>
      <tr v-for="(value, index) in parsedMailArray">
        <td class="preview-row">{{index+1}}</td>
        <td>{{value.mail_address1}}</td>
        <td>{{value.mail_postal}}</td>
      </tr>
    </table>
    <button type="button" class="btn btn-primary" :disabled="numberOfParsedAddresses === 0" @click="downloadCSV">
      Export CSV
    </button>
  </div>
</template>

<script>
import {codemirror} from 'vue-codemirror';
import {convertArrayOfObjectsToCSV, downloadCSV} from '../helpers';
import _ from 'lodash';

export default {
  name: 'mail-parser',
  components: {
    codemirror
  },
  computed: {
    numberOfParsedAddresses() {
      return this.parsedMailArray.length;
    }
  },
  methods: {
    makeArrayFromNewline(addressStrings) {
      return addressStrings.split('\n');
    },
    submitCode() {
      let addressArray = this.makeArrayFromNewline(this.code);
      let parsedMailArray = [];

      addressArray.forEach((address) => {
        let maildata = {
          full_address: address.trim(),
          mail_address1: '',
          mail_postal: ''
        };
        let postalMatches = maildata.full_address.match(/([0-9]{5})|([a-z][0-9][a-z] ?[0-9][a-z][0-9])/gi) || [];

        // Check if there's a match
        if (postalMatches.length > 0) {
          maildata.mail_postal = postalMatches[0];
          maildata.mail_address1 = _.replace(maildata.full_address, maildata.mail_postal, '');
        } else {
          maildata.mail_postal = 'Not Found';
          maildata.mail_address1 = maildata.full_address;
        }
        parsedMailArray.push(maildata);
      });
      this.parsedMailArray = parsedMailArray;
      this.CSVData = this.convertToCSV(parsedMailArray);
    },
    convertToCSV(objectArray) {
      let CSVData = convertArrayOfObjectsToCSV(objectArray);
      return CSVData;
    },
    downloadCSV() {
      downloadCSV('export.csv', this.CSVData);
    },
    resetAll() {
      this.code = '';
      this.parsedMailArray = [];
      this.CSVData = '';
    }
  },
  data() {
    return {
      code: '',
      parsedMailArray: [],
      CSVData: '',
      editorOption: {
        tabSize: 4,
        styleActiveLine: true,
        line: true,
        mode: 'text/html',
        lineWrapping: true,
        readOnly: false
      }
    };
  }
};
</script>

<style scoped>
.codemirror-container {
  border: 1px solid #c9c9c9;
  border-radius: 3px;
  margin-bottom:10px;
}
.right-align {
  display: flex;
  justify-content:flex-end;
}
table.preview {
   overflow-y:scroll;
   height:200px;
   display:block;
   border-collapse:collapse;

   background-color: #FFFFFF;
   border: 1px solid #c9c9c9;
   border-radius: 3px;
   margin: 0 0 20px 0;
}

.preview-row {
  color: #999;
  border-right: 1px solid #ddd;
  border-bottom: none;
  background-color: #f7f7f7;
  text-align: right;
  width:28px;
}
</style>
