<template>
  <div>
    <div class="select-container">
        <div class="row">
          <div class="col-md-3 col-sm-12">
            <div>Select event date: <input @input="populateDays(startDate)" class="date-select" type="date" v-model="startDate"></div>
          </div>
          <div class="col-md-4 col-sm-12">
            Select event type:
            <div class="input-group mb-3">
              <select class="custom-select" v-model="type">
                <option selected value="agm">AGM</option>
                <option value="budget">Budget</option>
              </select>
            </div>
          </div>
        </div>
    </div>
    <div v-show="startDate && type==='agm'">
      <hr>
      <div><strong>AGM Date</strong>: {{ startDateFormatted }}</div>
      <div class="date-div"><strong>Pre-Consent</strong>: {{ formatDay(preConsentDate) }}<input id="preConsent" class="date-select" type="date" v-model="preConsentDate"></div>
      <div class="date-div"><strong>Pre-Notice</strong>:{{ formatDay(preNoticeDate) }}<input class="date-select" type="date" v-model="preNoticeDate"></div>
      <div class="date-div"><strong>Notice Of Service</strong>: {{ formatDay(serviceOfNoticeDate) }} <input class="date-select" type="date" v-model="serviceOfNoticeDate"></div>
      <hr>
      We are excited to be serving notice and collecting electronic proxies for your upcoming Annual General Meeting on <strong>{{ startDateFormatted }}</strong>. Please find the service agreement attached below. Please return the signed service agreement at your earliest convenience.
      <br><br>
      Just a couple of things before we start:
      <br><br>
      <ul>
        <li>Your pre-consent campaign is scheduled to begin: <strong>{{ formatDay(preConsentDate) }}</strong></li>
        <li>Your pre-notice is also scheduled for: <strong>{{ formatDay(preNoticeDate) }}</strong></li>
        <li>Service of Notice is scheduled for <strong>{{ formatDay(serviceOfNoticeDate) }}</strong></li>
      </ul>
      Please advise if these dates are OK.
      <br><br>
      Here’s what we’ll need from you in the coming weeks:
      <br><br>
      <table class="table">
        <thead>
          <tr>
            <th scope="col" width="100px">Item #</th>
            <th scope="col">Description</th>
            <th scope="col" width="220px">Due Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>
              <p>Owner name, emails, and mailing addresses in our data format</p>
              <p><strong>*Note: that if you have owner data in a format of your own, you are free to send this to us instead.</strong></p>          
            </td>
            <td><strong>{{ subtractDays(this.preConsentDate, 3) }}</strong></td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>
                <p>Review and approve the consent email that will be sent to owners</p>
                <p>Approve the number of pages that we estimate your condo corporation sends out each year.</p>
                <p>Notify owners to expect emails from GetQuorum.</p>
                <p><strong>*Note: we will not be able to move along with the campaign if we do not receive your approval of the above items</strong></p>
            </td>
            <td><strong>{{ subtractDays(this.preConsentDate, 1) }}</strong></td>
          </tr>           
          <tr>
            <th scope="row">3</th>
            <td>
              <p>Provide us with all necessary pre-notice documents</p>
              <p>Review and approve the Pre-Notice email that will be sent to owners</p>
              <p><strong>*Note: we will not be able to proceed with the campaign if we do not receive your approval of the above items</strong></p>
            </td>
            <td><strong>{{ subtractDays(this.preNoticeDate, 3) }}</strong></td>
          </tr>
          <tr>
            <th scope="row">4</th>
            <td>
              <p>The meeting notice package, combined into a single PDF or DOC, in the order to be printed.</p>
              <p>The hardcopy version of the package will be printed double-sided in black-ink on white paper. Please provide instructions if you’d like it printed differently.</p>
            </td>
            <td><strong>{{ subtractDays(this.serviceOfNoticeDate, 3) }}</strong></td>
          </tr>
          <tr>
            <th scope="row">5</th>
            <td>
                <p>Review and approve the online proxy and package download tool</p>
                <p>Review and approve the notice e-mail that will be sent to owners</p>
                <p>Review and approve AGM package printing instructions</p>
                <p><strong>*Note: we will not be able to move along with the campaign if we do not receive your approval of the above items</strong></p>
            </td>
            <td><strong>{{ subtractDays(this.serviceOfNoticeDate, 1) }}</strong></td>
          </tr>                  
        </tbody>
      </table>
      
      <p>Please confirm this timeline works for your schedule and feel free to get in touch with additional questions.</p>
      <p>Please advise us on the cut off time with regards to your owners being able to submit electronic proxies for the meeting. From experience, we see that property managers typically set the cut off time to be at 12PM on the day of the AGM, but feel free to set your own.</p>
      <p>Please note that all <strong>documents must be received by 4 PM</strong> on the days scheduled above, otherwise they may not be processed until the next business day.</p>
      <p>We look forward to working with you.</p>
    </div>
    <div v-show="startDate && type==='budget'">
      <hr>
      <p>Your pre-consent campaign is scheduled for <strong>{{ subtractDays(this.startDate, 7) }}</strong>.</p>
      <p>Budget distribution is scheduled for <strong>{{ startDateFormatted }}</strong>.  Please advise if this date is OK.</p>
      <p>Here’s what we’ll need from you in the coming weeks:</p>

      <table class="table">
        <thead>
          <tr>
            <th scope="col" width="100px">Item #</th>
            <th scope="col">Description</th>
            <th scope="col" width="220px">Due Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>
              <p>Owner name, emails, and mailing addresses in our data format</p>
              <p>If you have owner data in a format of your own, you are free to send this to us instead as well. Please ensure that the data includes:
                <ul>
                  <li>unit numbers</li>
                  <li>owner names</li>
                  <li>e-mail addresses</li>
                  <li>mailing addresses</li>
                  <li>monthly fees ($)</li>
                </ul>
              </p>    
            </td>
            <td>{{ subtractDays(this.startDate, 10) }}</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>
                <p>Review and approve the consent email that will be sent to owners</p>
                <p>Approve the number of pages that we estimate your condo corporation sends out each year.</p>
                <p>Notify owners to expect emails from GetQuorum.</p>
                <p><strong>*Note: we will not be able to move along with the campaign if we do not receive your approval of the above items</strong></p>
            </td>
            <td>{{ subtractDays(this.startDate, 8) }}</td>
          </tr>  
          <tr>
            <th scope="row">3</th>
            <td>
              <p>Budget template with what you'd like to distribute. The cover letter in DOC, with all other documents combined into a single PDF in the order to be printed.</p>
              <p>The hardcopy version of the package will be printed double-sided in black-ink on white paper. Please provide instructions if you’d like it printed differently.</p>
            </td>
            <td>{{ subtractDays(this.startDate, 3) }}</td>
          </tr>                 
        </tbody>
      </table>
      Please confirm this timeline works for your schedule and feel free to get in touch with additional questions.
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'Timeline',
  computed: {
    startDateFormatted() {
      return moment(this.startDate).format('dddd, MMMM DD, YYYY');
    }
  },
  data() {
    return {
      startDate: '',
      preConsentDate: '',
      preNoticeDate: '',
      serviceOfNoticeDate: '',
      type: 'agm'
    };
  },
  methods: {
    subtractDays(date, days) {
      return moment(date)
        .subtract(days, 'days')
        .format('dddd, MMMM D, YYYY');
    },
    formatDay(date) {
      return moment(date).format('dddd, MMMM D, YYYY');
    },
    checkDate(date) {
      if (date === '') {
        return date;
      } else {
        return this.formatDay(date);
      }
    },
    populateDays(date) {
      this.preConsentDate = this.subtractDays(date, 42);
      this.preNoticeDate = this.subtractDays(date, 35);
      this.serviceOfNoticeDate = this.subtractDays(date, 15);
    }
  }
};
</script>

<style scoped>
.textarea {
  width: 100%;
  min-height: 200px;
}
.date-div {
  padding: 10px 5px 10px 0px;
}
.date-select {
  height: calc(2.25rem + 2px);
  padding: 10px 5px 10px 15px;
  line-height: 1.5;
  color: #495057;
  vertical-align: middle;
  background-size: 8px 10px;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  -webkit-appearance: none;
}
</style>
