<template lang="pug">
    div
        main
            h1(@click="link") Clanboard
            router-view
</template>

<script lang="babel">
    export default {
        methods: {
            link: function() {
                this.$route.router.go({ name: 'home' });
            }
        }
    }
</script>

<style lang="sass" scoped>
    h1 {
        margin-left: 20px;
        cursor: pointer;
    }
</style>
