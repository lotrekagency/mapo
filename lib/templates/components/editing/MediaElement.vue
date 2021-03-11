<template>
    <v-row>
        <v-col cols="12">
            <v-card
            >
                <v-img
                    v-if="media"
                    :src="media.file"
                    aspect-ratio="1"
                >

                </v-img>


                <v-btn
                    v-else
                    block
                    text
                    height=300
                    @click="editing=true"
                >
                    <v-icon x-large>mdi-plus-box</v-icon>
                </v-btn>




                <media-manager-dialog
                    v-model="editing"
                    select="single"
                    v-on:selectionChange="update"
                >
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            v-on="on"
                            v-bind="attrs"

                            v-if="media"
                            absolute
                            fab
                            bottom
                            right
                            class="mb-10"
                        >
                            <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                    </template>
                </media-manager-dialog>
            </v-card>
        </v-col>
        

    </v-row>
</template>

<script>
export default{
    data(){
        return{
            editing: false,
        }
    },

   model: {
        prop: 'media',
        event: 'changed-media'
    },

    mounted(){
        console.log(this.media)
    },

    props: {
        media: {
            type: Object,
        },
    },


    methods: {
        update(selection){
            this.media=selection
            this.$emit("changed-media", selection);
        }
    },
}
</script>


