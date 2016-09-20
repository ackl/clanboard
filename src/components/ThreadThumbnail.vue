<template lang="pug">
    div
        .chatchan-thumbnail(@click="link")
            p {{ thread.title }}
            p {{ thread._id }}
</template>

<script lang="babel">
    export default {
        props: ['thread'],
        methods: {
            link: function() {
                this.$route.router.go({
                    name: 'thread',
                    params: { threadId: this.thread._id }
                });
            }
        }
    }
</script>

<style lang="sass">
    .chatchan-thumbnail {
        cursor: pointer;
    }
</style>
