<template lang="pug">
    mdl-card(:supporting-text="post.body" class="clanboard-post")
</template>

<script lang="babel">
    export default {
        props: [ 'post' ]
    }
</script>

<style lang="sass">
    .clanboard-post {
        min-height: 0;
        width: auto;
    }
</style>
