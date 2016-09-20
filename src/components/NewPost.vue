<template lang="pug">
    div
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
            return { postBody: '' };
        },
        props: ['threadId'],
        events: {
            submitPost: function() {
                if (this.postBody) {
                    this.$http.post('/api/post', {
                        body: this.postBody,
                        thread: this.threadId
                    }).then(() => {
                        this.postBody = '';
                    });
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
