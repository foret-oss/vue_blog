<template>
    <div>
        <div class="drafts">
              <h3>{{ Drafts.title }}</h3>
              <div class="markdown-body" v-html="Drafts.content"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: "drafts.vue",
    data(){
        return {
            Drafts: {
               title: "",
               content: '嘻嘻~~什么都没有呢',
            }
        }
    },

    created(){
        if(JSON.parse(window.sessionStorage.getItem("Drafts"))){
            this.Drafts = JSON.parse(window.sessionStorage.getItem("Drafts"));
            var markdown_It = require("markdown-it");
            var md = new markdown_It();
            var result = md.render(this.Drafts.content);
            this.Drafts.content = result;
        }
    }
}
</script>

<style scoped>
.drafts{
    box-shadow: 2px 2px 4px rgba(0, 0, 0, .12), 2px 2px 6px rgba(0, 0, 0, .04);
    padding-bottom: 15px;
    margin-top: 250px;
}

</style>