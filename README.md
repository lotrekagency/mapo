# camomilla-backoffice

## Build Setup

### install dependencies
$ yarn install

### install dependencies of example project
$ cd example
$ yarn install

### serve with hot reload at localhost:3000
$ yarn dev

### to install this module in a nuxt project
$ yarn add git+ssh://git@gitlab.com:lotrekdevteam/camomilla/camomilla-backoffice.git

## Lavorare sul progetto

### Come contribuire al progetto
Una volta clonato in locale il progetto, create un branch seguendo la seguente sintassi:

`feature/<nome branch>`

Una volta che avete finalizzato il lavoro sul branch, create una merge request (PR) 
con Gabriele Baldi [feature logica] o Andrea Morosi [feature grafica] come Assignee. 
Se una feature dovesse essere particolarmente completa, utilizzate la voce Reviewer per 
assegnare la merge request alla seconda figura.


### Documentazione componenti
Scrivere nella parte logica dei componenti sviluppati un minimo di documentazione.
A breve abiliteremo StorybookJS per favorire una migliore documentazione.


### Come fare per scrivere impostazioni e configurazioni
La libreria non ha un normale nuxt.config.js, quindi per inserire configurazioni è 
necessario scriverle nel file defaults.js, localizzato nella root del pannello; la sintassi 
è come quella standard di un qualsiasi nuxt.config.js.

Mentre per quanto riguardano i moduli e plugin, fare riferimento al file module.js, sempre 
localizzato come defaults.js.


### Riferimento e URL a risorse

Per l\'URL di riferimento al pannello, usare l\'alias bossanova. Per esempio volete 
accedere ad una risorsa SCSS dalla parte logica di un componente dovrete fare così:

`@import "~bossamodule/assets/custom-style.scss";`


## Risorse  esterne

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
