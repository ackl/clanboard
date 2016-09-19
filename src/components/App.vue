<template lang="pug">
    main
        h1 Clanboard
        thread
</template>

<script lang="babel">
    import Thread from './Thread.vue'

    export default {
        components: { Thread }
    }
</script>

<style lang="sass" scoped>
h1 {
    margin-left: 20px;
}
</style>
