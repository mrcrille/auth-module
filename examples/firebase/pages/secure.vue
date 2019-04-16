<template>
  <div>
    <b-alert show variant="warning">This is a secure page!</b-alert>
    <b-row>
      <b-col md="8">
        <b-card title="State">
          <pre>{{ state }}</pre>
        </b-card>
      </b-col>
      <b-col md="4">
        <b-card title="Scopes" class="mb-2">
          <b-list-group>
            <b-list-group-item>User {{ $auth.hasScope('user') }}</b-list-group-item>
            <b-list-group-item>Test {{ $auth.hasScope('test') }}</b-list-group-item>
            <b-list-group-item>Admin {{ $auth.hasScope('admin') }}</b-list-group-item>
          </b-list-group>
        </b-card>
        <b-card title="token">{{ $auth.getToken($auth.$state.strategy) || '-' }}</b-card>
      </b-col>
    </b-row>
    <hr>
    <b-btn-group>
      <b-button @click="$auth.fetchUser()">Fetch User</b-button>
      <b-button @click="$auth.logout()">Logout</b-button>
    </b-btn-group>
  </div>
</template>

<script>
export default {
  middleware: ["auth"],
  computed: {
    state() {
      return JSON.stringify(this.$auth.$state, undefined, 2);
    }
  }
};
</script>
