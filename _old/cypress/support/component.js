// ***********************************************************
// This example support/component.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";

// Alternatively you can use CommonJS syntax:
// require('./commands')

import { mount } from "cypress/vue2";
import Vue from "vue";
import Vuetify from "vuetify";
import VueI18n from "vue-i18n";
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import "vuetify/dist/vuetify.min.css";
import injectMapo from "../../packages/@mapomodule/core/index";
import vuetifyConfig from "../../packages/@mapomodule/uikit/defaults/vuetify";
import enUsTrans from "../../packages/@mapomodule/uikit/translations/en-US";
import itITTrans from "../../packages/@mapomodule/uikit/translations/it-IT";
import injectStore from "../../packages/@mapomodule/store/index"


const i18nConfig = {
    locale: "en-US",
    messages: { "en-US": enUsTrans, "it-IT": itITTrans },
};

Vue.use(Vuetify, vuetifyConfig);
Vue.use(VueI18n, i18nConfig);
Vue.use(Vuex);
Vue.use(VueRouter);


injectMapo({ $axios: {} }, (_, plugin) => (Vue.prototype.$mapo = plugin));

Cypress.Commands.add("mount", (component, options={}) => {
    // get the element that our mounted component will be injected into
    // const root = document.getElementById("__cy_root");

    // // add the v-application class that allows Vuetify styles to work
    // if (!root.classList.contains("v-application")) {
    //     root.classList.add("v-application");
    //     root.classList.add("v-application--is-ltr");
    //     root.classList.add("theme--dark");
    // }

    // // add the data-attribute — Vuetify selector used for popup elements to attach to the DOM
    // root.setAttribute("data-app", "true");

    // root.setAttribute("style", "display: block");
    // options.custom = options.custom || {} 
    // options.custom.store = options.custom.store || {}
    // options.custom.router = options.custom.router || {}
    // options.custom.router.routes = options.custom.router.routes || []
    let store

    function registerModule( moduleName, module ){
        store = new Vuex.Store({modules: {[moduleName]: module}})
    }
    injectStore({ store: { registerModule }})

    return mount(component, {
        vuetify: new Vuetify(vuetifyConfig),
        i18n: new VueI18n(i18nConfig),
        router: new VueRouter({routes: []}),
        store,
        ...options,
    });
});

// Example use:
// cy.mount(MyComponent)
