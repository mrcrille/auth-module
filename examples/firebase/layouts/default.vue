<template>
  <div>
    <b-navbar toggleable="md" variant="light">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand to="/">Nuxt.js</b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item v-bind:to="localePath('index')" exact>Home</b-nav-item>
          <b-nav-item v-bind:to="localePath('public')">Public</b-nav-item>
          <b-nav-item v-bind:to="localePath('secure')">Secure</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto ml-right-none">
          <b-nav-item-dropdown v-bind:text="locale.name" right>
            <b-dropdown-item v-for="locale in availableLocales" v-bind:key="locale.code" v-bind:to="switchLocalePath(locale.code)" >{{ locale.name }}</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
        <b-navbar-nav class="ml-2">
          <template v-if="$auth.$state.loggedIn">
            <b-nav-item-dropdown :text="$auth.user.name" right>
              <b-dropdown-item @click="$auth.logout()">Logout</b-dropdown-item>
            </b-nav-item-dropdown>
            <b-img :src="picture" class="mt-1" rounded="circle" width="30px" height="30px"/>
          </template>
          <template v-else>
            <b-dropdown-item to="/login">Login</b-dropdown-item>
          </template>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <b-container class="mt-4">
      <nuxt/>
    </b-container>
  </div>
</template>

<script>
import dotProp from "dotprop";

export default {
  computed: {
    locale() {
      return this.$i18n.locales.filter(i => i.code == this.$i18n.locale)[0];
    },
    availableLocales() {
      return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale);
    },
    picture() {
      return (
        dotProp(this.$auth.user, "picture") || // OpenID
        dotProp(this.$auth.user, "picture.data.url") || // Facebook graph API
        dotProp(this.$auth.user, "avatar_url")
      ); // GitHub
    }
  }
};
</script>
