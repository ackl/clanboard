<template lang="pug">
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
        data: function() {
            return { postBody: '' }
        },
        events: {
            submitPost: function() {
                if (this.postBody) {
                    this.$http.post('/api/posts', {
                        body: this.postBody
                    }).then(() => {
                        console.log("Post submitted.");
                        this.postBody = '';
                    }, () => {
                        console.log("Post submission failed.")
                    })
                }
            }
        }
    }
</script>

<style lang="sass" scope>
@import "../scss/media-query";
.mdl-textfield {
    width: 90%;
}

.mdl-textfield,
.clanboard-new-post {
    margin: auto;
}

.clanboard-new-post {
    width: 100%;

    @include mq(tablet) {
        width: 50%;
    }
}
</style>
