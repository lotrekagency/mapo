<template>
	<div>
		<v-card
			width="600"
			class="mx-auto"
		>
			<v-card-actions>
				<v-btn @click="mmdialog = true" outlined>New Selection</v-btn>
			</v-card-actions>

			<v-carousel v-model="page">

				<v-carousel-item class="page" v-for="(pageMedias, i) in paginatedMedias" :key="i" position="center center">
					
					<v-container class="fill-height pa-0 ma-1">
						<v-row v-for="row in rows" :key="row"  align="center" align-content="stretch"  justify="center">
							<v-col v-for="col in cols" :key="col">
								<MediaElement v-model="pageMedias[getIndexFromGrid(row, col)]" :aspect-ratio="1" rm-add-btn/>
							</v-col>
						</v-row>
					</v-container>
				</v-carousel-item>
			</v-carousel>
		</v-card>

		<media-manager-dialog
			v-model="mmdialog"
			select="multi"
			v-on:selectionChange="update"
		>
		</media-manager-dialog>
	</div>
</template>

<script>
export default {
  data() {
    return {
			child_medias: [],

      page: 0,
			mmdialog: false,
    };
  },

	props: {
		medias: {
			type: Array,
			default: () => [],
		},
		cols: {
			type: Number,
			default: 2,
		},
		rows: {
			type: Number,
			default: 2,
		}
	},

	model: {
		prop: "medias",
		event: "changed-selection"
	},

	mounted(){
		if(this.medias) this.child_medias=this.medias
	},

	computed: {
		mediasPerPage(){
			return this.cols * this.rows
		},
		pages(){
			return Math.ceil(
				this.child_medias.length / this.mediasPerPage
			)
		},
		paginatedMedias(){
			var array = new Array(this.pages);
			for(let i=0; i<array.length; i++){
				array[i] = 
					this.child_medias.slice(i*this.mediasPerPage, (i+1)*this.mediasPerPage)
			}
			return array
		}
	},

	methods: {
		getIndexFromGrid(row, col){
			return ((row-1)*(this.cols)) + col-1;
		},
		update(selection){
			this.child_medias=selection
			this.$emit("changed-selection", selection)
		}
	},

	watch: {
		medias(val){
			this.child_medias=val
		}
	}
};
</script>