# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-alpha.7](https://github.com/lotrekagency/mapo/compare/v1.0.0-alpha.6...v1.0.0-alpha.7) (2022-01-13)


### Bug Fixes

* **detail:** fix v-card content margin on detail component ([f07d5c1](https://github.com/lotrekagency/mapo/commit/f07d5c1581e71407e79fce95c8dc10109196ed0b))
* **detail:** remove lang swtch if only one lang is selected ([35cf58a](https://github.com/lotrekagency/mapo/commit/35cf58aa17ce4350f983643a8182fdf795dd4abb))
* **detail:** remove v-container from detail component to fix sizing ([2947652](https://github.com/lotrekagency/mapo/commit/29476528a6c13325c4da49a3e2aa842302e6bd04))
* **list:** fix search box for very small displays ([edf7287](https://github.com/lotrekagency/mapo/commit/edf7287c6974b8bb1412d9e0fb8bc4b1f1b48480))
* **media:** fix reset on media dialog ([3727502](https://github.com/lotrekagency/mapo/commit/3727502b59c9fa809b4dbc139b0cd01198008a18))
* **media:** reset media dialog after close ([5aded79](https://github.com/lotrekagency/mapo/commit/5aded794dbfb5482119db45bfb975e7241f86f15))
* **mediamanager:** better display of folder path in media manager ([bdc5692](https://github.com/lotrekagency/mapo/commit/bdc569264164e61af1c210aeb1c5da9d5b21220a))
* **mediamanager:** better ui for selection ([2307d38](https://github.com/lotrekagency/mapo/commit/2307d38a5a4e0fe838b5f9173692e132fe69e3be))
* **mediamanager:** fix backbutton background in media editor ([315d9df](https://github.com/lotrekagency/mapo/commit/315d9df2a9021ee1ea1328b4d959f0fd5f652f47))
* **mediamanager:** fix corb errors loading image preview in mediamanager ([7f34e34](https://github.com/lotrekagency/mapo/commit/7f34e34dfdfe4380d1704c0c8dda0a507676aeae))
* **mediamanager:** fix DOMException: The play() request was interrupted ([89a2a3e](https://github.com/lotrekagency/mapo/commit/89a2a3e1bb47178245ca7d131bdfedbcbcc41c17))
* **mediamanager:** fix editor opening ([3888652](https://github.com/lotrekagency/mapo/commit/3888652b0441cd17f0468db57fd895afd97a3625))
* **mediamanager:** make editing animation smooth ([81bd34b](https://github.com/lotrekagency/mapo/commit/81bd34b04d0d561317a1928dcdc796adc539350b))
* **mediamanager:** minor fixes to mediamanager ui ([a7b6089](https://github.com/lotrekagency/mapo/commit/a7b6089c38af9a6079bd8bebfeddd2dcff0b2c75))
* **mediamanager:** prevent media type check fail if no media type present ([2ee88fe](https://github.com/lotrekagency/mapo/commit/2ee88fed81d527434cf854e68ff8210247b2cf39))
* **mediamanagerdialog:** better positioning on small device of media manager dialog content ([9da147c](https://github.com/lotrekagency/mapo/commit/9da147c7e2d356da7f74e2edcbf05c5dafcbd94d))
* **sidebar:** fix nested SidebarListItems not triggering active class when the list-item is not a link ([9e92971](https://github.com/lotrekagency/mapo/commit/9e929710e74946c1470c29c007d780a1e712170b))
* **tinymce:** added missing al text to image tag ([55a3926](https://github.com/lotrekagency/mapo/commit/55a39261b3e449381d974eaa1b328a46dffb6f51))
* **uikit:** fix some content disposition in main layout ([1e9c79b](https://github.com/lotrekagency/mapo/commit/1e9c79b6b80d781c5aded10800c9df255b6ef8e8))


### Features

* **media:** added mime type filtering ([da01658](https://github.com/lotrekagency/mapo/commit/da016585d450143f6419d98a7f53ee5ec8cf7358))
* **media:** added search input ([a1ac6ae](https://github.com/lotrekagency/mapo/commit/a1ac6aef8d28a248431cd80955c5a1446f41f608))
* **media:** selection prop 2-way binded ([e87f21c](https://github.com/lotrekagency/mapo/commit/e87f21c085e0cf0a61a99025d9f5e7970285ab72))
* **mediafield:** update media field to handle files ([5158108](https://github.com/lotrekagency/mapo/commit/51581086d96e09af31471721f0ea32df3fe58e09))
* **mediamanager:** added audio playback for audio files ([6aec9f7](https://github.com/lotrekagency/mapo/commit/6aec9f7b749c5002832fd194d565742b99a4b700))
* **mediamanager:** added icon for media that are not images ([d77f17b](https://github.com/lotrekagency/mapo/commit/d77f17b2d77db7bf4dc387be0b6d3892a4772b02))
* **mediamanager:** added link to img shortcut button in editor ([1dd446f](https://github.com/lotrekagency/mapo/commit/1dd446f76df1d3a7e71fdefb81ad60de1fdb4e93))
* **mediamanager:** added the possibility to change the media file using same url of the old file ([f21f383](https://github.com/lotrekagency/mapo/commit/f21f383b6f3f0176f806688a50ebff93a53d3203))
* **mediamanager:** added video preview for video mime types ([55fc423](https://github.com/lotrekagency/mapo/commit/55fc423c03265fb2c17bc42f1be0ba511928267c))
* **mediamanager:** many ui enhancements for mediamanager ([30ab3ff](https://github.com/lotrekagency/mapo/commit/30ab3ff89dc0ff3b9a210cfd32e2a874dfc073a6))
* **mediamanager:** media folders manager graphic enhancements ([0e8e7ec](https://github.com/lotrekagency/mapo/commit/0e8e7ec35482d043c42c88c38c9d32c8fa8e54e9))
* **sidebar:** added spidermenu for nested routes ([084029d](https://github.com/lotrekagency/mapo/commit/084029de717f29412b045fe703c4cfbd19353400))
* **tinymce:** added callback to manage video and documents insertions with mapomedia plugin ([b4e6f63](https://github.com/lotrekagency/mapo/commit/b4e6f6362e025010614e7ca8351a9d1e3af08650))





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
