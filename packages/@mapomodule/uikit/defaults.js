import colors from 'vuetify/es5/util/colors'

export default {
    customVariables: ['@mapomodule/uikit/assets/variables.scss'],
    theme: {
        dark: true,
        themes: {
            dark: {
                primary: '#309A00',
                accent: colors.grey.darken3,
                secondary: colors.amber.darken3,
                info: colors.teal.lighten1,
                warning: colors.amber.base,
                error: '#FF5252',
                success: colors.green.accent3
            },
            light: {
                primary: '#309A00',
                accent: colors.indigo.accent1,
                secondary: colors.amber.accent2,
                info: colors.teal.lighten1,
                warning: colors.amber.base,
                error: '#FF5252',
                success: colors.green.accent3
            }
        }
    },
    treeShake: false
}