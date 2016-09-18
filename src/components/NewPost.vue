<template lang="jade">
    mdl-card(
        actions="submitPost"
        actions-text="Submit"
        title="New post"
        class="clanboard-new-post"
    )
        mdl-textfield(textarea :value.sync="postBody" rows="5" slot="supporting-text")
</template>

<script lang="babel">
    export default {
        data: function () {
            return { postBody: '' }
        },
        events: {
            submitPost: function () {
                this.$http.post('/api/posts', {body: this.postBody}).then((res) => {
                    console.log("Post submitted.");
                    this.postBody = '';
                }, (res) => {
                    console.log("Post submission failed.")
                })
            }
        }
    }
</script>

<style lang="sass">
.clanboard-new-post {
    margin: auto;
}
</style>
