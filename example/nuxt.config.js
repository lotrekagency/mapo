
export default {
  buildModules: [
    'mapomodule'
  ],
  mapo: {
    integrations: {
      camomilla: {
        location: "@mapomodule/integrations-camomilla-api",
        configuration: {
          api: {
            target: 'http://localhost:8000',
            syncCamomillaSession: true,
            headers: {
              "x-Forwarded-Host": 'localhost'
            }
          }
        }
      },
    }
  }
}
