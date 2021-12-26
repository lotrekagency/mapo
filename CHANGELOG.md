# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-alpha.6](https://github.com/lotrekagency/mapo/compare/v1.0.0-alpha.5...v1.0.0-alpha.6) (2021-12-26)


### Bug Fixes

* **uikit:** fix sidebar footer items not collapsing on mini variant ([04c510e](https://github.com/lotrekagency/mapo/commit/04c510ee87bd7b74161725c366e2eac2bd3efe9f))
* **uikit:** fix sidebar items not collapsing on mini variant ([67a9524](https://github.com/lotrekagency/mapo/commit/67a9524b17b6cbdf455b8e6f56f7cc0674b1dbed))
* various css fixes ([658c363](https://github.com/lotrekagency/mapo/commit/658c3636e869f0a2bd53efe41295cf87d6af3962))
* **list:** fix v-menu position on large screens ([41bd08d](https://github.com/lotrekagency/mapo/commit/41bd08d36d85e685a755c7e0de97bbb05a24c03d))
* **list:** fixed v-menu filter positioning ([e99848e](https://github.com/lotrekagency/mapo/commit/e99848e0beb2df124db1ba9968696bbe8ee7b683))
* **list:** fixed v-menu position for filters ([cb95260](https://github.com/lotrekagency/mapo/commit/cb9526085d536ff7b468316b1d2571c7ae9509d8))
* **list:** load page from query params ([88dea98](https://github.com/lotrekagency/mapo/commit/88dea98063cdab79c9c518fe0e3bf8d3c90f0161))
* **list:** refactoring for injected elements and FE pagination ([f9c968e](https://github.com/lotrekagency/mapo/commit/f9c968e0edf87654df60781d7d2d465d15e40ab9))
* **list:** removed lock to BE pagination if items in list are less than itemsPerPage ([3fe34e0](https://github.com/lotrekagency/mapo/commit/3fe34e0d1438a0980e8819070f9b158ad3b6e0b8))
* **uikit:** better handle detail component lang switches ([5297e49](https://github.com/lotrekagency/mapo/commit/5297e4956536b382600c250f5c797c8db5e58f84))
* **uikit:** fix detailfield not reading conf value changes ([5628268](https://github.com/lotrekagency/mapo/commit/5628268e4e78201523eba60adaf17286dfb38c8b))
* **uikit:** fix lang changhe in detail component ([32494f7](https://github.com/lotrekagency/mapo/commit/32494f7d094f7e9cebc14f7524ad716eb89fd6d7))
* **uikit:** fix positioning of element in list component and subcomponents ([887c3b6](https://github.com/lotrekagency/mapo/commit/887c3b6aae52d1a3494ebcc01f0f155f21373f9c))
* **uikit:** set endpoint to default null in detail field ([5c9296c](https://github.com/lotrekagency/mapo/commit/5c9296c81f8667319699e933f528c4c05a1f541d))
* fixed v-model with datepicker filter ([ef4634e](https://github.com/lotrekagency/mapo/commit/ef4634e8ad0719ec2991a8c40a87191c0e32d7ec))
* load saved date range into datepicker ([eb94dd5](https://github.com/lotrekagency/mapo/commit/eb94dd5686b9fed16e0f39bf122c767d8bd1017b))


### Features

* **core:** reject promise for crud methods if no endpoint was passed during configuration ([bb8d447](https://github.com/lotrekagency/mapo/commit/bb8d4474efe41af5d7f38dbcd47731133d6ba154))
* **list:** added support to offline items ([495fd1f](https://github.com/lotrekagency/mapo/commit/495fd1f30cd0adc228b48ca4384b9df572e69216))
* **list:** handle multisort ([41feb88](https://github.com/lotrekagency/mapo/commit/41feb88ec15be5cc9afbcdf3d2dea23142301153))
* **uikit:** add possibility to remove icon from sidebar ([106d85f](https://github.com/lotrekagency/mapo/commit/106d85f576cdc9e6438b48fa8e695315cac2262b))
* **uikit:** added langChange event to detail component ([70d3430](https://github.com/lotrekagency/mapo/commit/70d3430694e67dfcd65539a3d474847123e05db5))
* **uikit:** added possibility to change detail component current lang fromprop ([1993aa7](https://github.com/lotrekagency/mapo/commit/1993aa74a66768eea319f41a41878916544adcbb))
* **uikit:** added possibility to override field container class in detail component with key class in field configuration ([afe1e52](https://github.com/lotrekagency/mapo/commit/afe1e522683d08c5e63650e55dbe2f9a9404e681))
* **uikit:** added seopreview field ([03e52fe](https://github.com/lotrekagency/mapo/commit/03e52fed08e60c8b43226856a8d05d4c724ad9b2))
* **uikit:** added v-model to Detail Component, now you can bind the payload externally from detail field. ([a50b082](https://github.com/lotrekagency/mapo/commit/a50b08261d6b8eba3e5b6f1ea2f1f4bb0d591b8e))
* **uikit:** display errors on tinymce component also with red label shake animation ([2c9e158](https://github.com/lotrekagency/mapo/commit/2c9e158090ee1f770518ad755437171a1b16afbd))
* **uikit:** newsidebar built with vuetify components to better support theming ([9cc237f](https://github.com/lotrekagency/mapo/commit/9cc237fa7dcfe193edc0fd9cb90e3bbbb103931d))





# [1.0.0-alpha.5](https://github.com/lotrekagency/mapo/compare/v1.0.0-alpha.4...v1.0.0-alpha.5) (2021-12-20)


### Bug Fixes

* **uikit:** fix list component http call with no pagination at all ([ebe4b61](https://github.com/lotrekagency/mapo/commit/ebe4b617f3be5ccb70c10c041c81868e9ee6b828))


### Features

* added search field on list component ([0c845e2](https://github.com/lotrekagency/mapo/commit/0c845e26e30afed66b351cc7a0f940f9a20e0943))
* select all option on list component ([588d2c5](https://github.com/lotrekagency/mapo/commit/588d2c57ca5fd36477cf1ee3c33e2289eb979acf))
* slot for selected items' counter ([0551b5e](https://github.com/lotrekagency/mapo/commit/0551b5e916f25fc740a0cae58c5548ab0c6e35ff))





# [1.0.0-alpha.4](https://github.com/lotrekagency/mapo/compare/v1.0.0-alpha.3...v1.0.0-alpha.4) (2021-10-25)


### Bug Fixes

* Display corret version of mapo in index page ([22ae4cf](https://github.com/lotrekagency/mapo/commit/22ae4cf55f1f3c6fcda64b085fe3c13c416bafb8))





# [1.0.0-alpha.3](https://github.com/lotrekagency/mapo/compare/v1.0.0-alpha.2...v1.0.0-alpha.3) (2021-10-25)


### Bug Fixes

* Corrected load order of modules to prevent missing mapo components in some circumstances ([4fa16fb](https://github.com/lotrekagency/mapo/commit/4fa16fb549ee0e6368fe724c8305ffc789d5c2fc))
