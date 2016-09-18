<template lang="pug">
    mdl-card(:supporting-text="postBody" class="clanboard-post")
</template>

<script lang="babel">
    export default {
        props: {
            postBody: {
                default: 'loading...'
            }
        }
    }
</script>

<style lang="sass">
    .clanboard-post {
        min-height: 0;
        width: auto;
    }
</style>
