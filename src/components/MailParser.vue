<template>
  <div>
    <div>
      <p>This tool will help parse Canadian mailing addresses providing they're all in one cell.</p>
      <span>Cut/paste mail addresses below (one on each line). Click PARSE ADDRESSES when ready.</span>
    </div>
    <div class="codemirror-container">
      <textarea class="form-control" rows="8" v-model="code"></textarea>
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
        <th class="preview-row">#</th>
        <th align="left">mail_address1</th>
        <th align="left">mail_city</th>
        <th align="left">mail_prov</th>
        <th align="left">mail_postal</th>
        <th align="left">mail_country</th>
        <th align="left">other</th>
      </tr>
      <tr 
        :key="index"
        v-for="(value, index) in parsedMailArray">
        <td class="preview-row">{{index+1}}</td>
        <td>{{value.mail_address1}}</td>
        <td>{{value.mail_city}}</td>
        <td>{{value.mail_prov}}</td>
        <td>{{value.mail_postal}}</td>
        <td>{{value.mail_country}}</td>
        <td>{{value.other}}</td>
      </tr>
    </table>
    <button type="button" class="btn btn-primary" :disabled="numberOfParsedAddresses === 0" @click="downloadCSV">
      Export CSV
    </button>
  </div>
</template>

<script>
import ContactParser from 'contact-parser';
import {convertArrayOfObjectsToCSV, downloadCSV} from '../helpers';

export default {
  name: 'MailParser',
  computed: {
    numberOfParsedAddresses() {
      return this.parsedMailArray.length;
    }
  },
  methods: {
    makeArrayFromNewline(addressStrings) {
      return addressStrings.split('\n');
    },
    async submitCode() {
      let addressArray = this.makeArrayFromNewline(this.code);
      this.parsedMailArray = await this.parseAddresses(addressArray);
      this.CSVData = this.convertToCSV(this.parsedMailArray);
    },
    async parseAddresses(mailArray) {
      let parser = new ContactParser();
      let parsedMailArray = [];

      mailArray.forEach(address => {
        let parsed = parser.parse(address);
        let obj = {
          mail_address1: parsed.address,
          mail_address2: '',
          mail_city: parsed.city,
          mail_prov: parsed.province,
          mail_postal: parsed.postal,
          mail_country: parsed.country,
          other: `${parsed.name} ${parsed.email} ${parsed.phone} ${
            parsed.website
          }`
        };
        parsedMailArray.push(obj);
      });
      return parsedMailArray;
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
.codemirror-container .form-control {
  font-size: 14px;
}
.codemirror-container {
  border: 1px solid #c9c9c9;
  border-radius: 3px;
  margin-bottom: 10px;
  font-size: 14px;
}
.right-align {
  display: flex;
  justify-content: flex-end;
}
table.preview {
  overflow-y: scroll;
  height: 200px;
  display: block;
  border-collapse: collapse;
  font-size: 14px;
  resize: both;

  background-color: #ffffff;
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
  width: 28px;
}
</style>
