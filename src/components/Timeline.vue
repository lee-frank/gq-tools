<template>
  <div>
    Select an AGM Date: <input type="date" v-model="startDate">
    <div v-show="startDate">
      <hr>
      <div><strong>AGM Date</strong>: {{ agmDate }}</div>
      <div><strong>Pre-Consent</strong>: {{ preconsentDate }}</div>
      <div><strong>Pre-Notice</strong>: {{ prenoticeDate }}</div>
      <div><strong>Notice Of Service</strong>: {{ serviceDate }}</div>
      <hr>
      We are excited to be serving notice and collecting electronic proxies for your upcoming Annual General Meeting on <strong>{{ agmDate }}</strong>. Please find the service agreement attached below. Please return the signed service agreement at your earliest convenience.
      <br><br>
      Just a couple of things before we start:
      <br><br>
      <ul>
        <li>Your pre-consent campaign is scheduled to begin: <strong>{{ preconsentDate }}</strong></li>
        <li>Your pre-notice is also scheduled for: <strong>{{ prenoticeDate }}</strong></li>
        <li>Service of Notice is scheduled for <strong>{{ serviceDate }}</strong></li>
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
            <td>{{ preconsentOwnerDataDeadline }}</td>
            
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>
              <p>Provide us with all necessary pre-notice documents</p>
              <p>Review and approve the Pre-Notice email that will be sent to owners</p>
              <p><strong>*Note: we will not be able to proceed with the campaign if we do not receive your approval of the above items</strong></p>
            </td>
            <td>{{ prenoticeDateDeadline }}</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>
              <p>The meeting notice package, combined into a single PDF or DOC, in the order to be printed.</p>
              <p>The hardcopy version of the package will be printed double-sided in black-ink on white paper. Please provide instructions if you’d like it printed differently.</p>
            </td>
            <td>{{ serviceDateDeadline }}</td>
          </tr>
          <tr>
            <th scope="row">4</th>
            <td>
                <p>Review and approve the consent email that will be sent to owners</p>
                <p>Approve the number of pages that we estimate your condo corporation sends out each year.</p>
                <p>Notify owners to expect emails from GetQuorum.</p>
                <p><strong>*Note: we will not be able to move along with the campaign if we do not receive your approval of the above items</strong></p>
            </td>
            <td>{{ preconsentApprovalDeadline }}</td>
          </tr> 
          <tr>
            <th scope="row">5</th>
            <td>
                <p>Review and approve the online proxy and package download tool</p>
                <p>Review and approve the notice e-mail that will be sent to owners</p>
                <p>Review and approve AGM package printing instructions</p>
                <p><strong>*Note: we will not be able to move along with the campaign if we do not receive your approval of the above items</strong></p>
            </td>
            <td>{{ serviceDateApproval }}</td>
          </tr>                  
        </tbody>
      </table>
      
      <p>Please confirm this timeline works for your schedule and feel free to get in touch with additional questions.</p>
      <p>Please advise us on the cut off time with regards to your owners being able to submit electronic proxies for the meeting. From experience, we see that property managers typically set the cut off time to be at 12PM on the day of the AGM, but feel free to set your own.</p>
      <p>Please note that all documents must be received by 4 PM on the days scheduled above, otherwise they may not be processed until the next business day.</p>
      <p>We look forward to working with you.</p>
      </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'Timeline',
  computed: {
    agmDate() {
      return moment(this.startDate).format('dddd, MMMM DD, YYYY');
    },
    serviceDate() {
      return moment(this.startDate)
        .subtract(15, 'days')
        .format('dddd, MMMM DD, YYYY');
    },
    preconsentDate() {
      return moment(this.prenoticeDate)
        .subtract(7, 'days')
        .format('dddd, MMMM DD, YYYY');
    },
    preconsentOwnerDataDeadline() {
      return moment(this.preconsentDate)
        .subtract(3, 'days')
        .format('dddd, MMMM DD, YYYY');
    },
    preconsentApprovalDeadline() {
      return moment(this.preconsentDate)
        .subtract(1, 'days')
        .format('dddd, MMMM DD, YYYY');
    },

    prenoticeDate() {
      return moment(this.startDate)
        .subtract(35, 'days')
        .format('dddd, MMMM DD, YYYY');
    },
    prenoticeDateDeadline() {
      return moment(this.prenoticeDate)
        .subtract(3, 'days')
        .format('dddd, MMMM DD, YYYY');
    },
    serviceDateDeadline() {
      return moment(this.serviceDate)
        .subtract(3, 'days')
        .format('dddd, MMMM DD, YYYY');
    },
    serviceDateApproval() {
      return moment(this.startDate)
        .subtract(1, 'days')
        .format('dddd, MMMM DD, YYYY');
    }
  },
  data() {
    return {
      startDate: ''
    };
  }
};
</script>

<style scoped>
.textarea {
  width: 100%;
  min-height: 200px;
}
</style>
