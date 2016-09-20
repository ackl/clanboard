<template lang="pug">
    div
        ul
            li(v-for="thread in threads")
                thread-thumbnail(:thread="thread")
</template>

<script lang="babel">
    import ThreadThumbnail from './ThreadThumbnail.vue'
    import io from 'socket.io-client'

    let socket = io()

    export default {
        components: { ThreadThumbnail },
        data: function () {
            return { threads: [] }
        },
        methods: {
            onNewThread(data) {
                this.threads.push(data);
            }
        },
        route: {
            activate: function () {
                this.$http.get('/api/threads').then((res) => {
                    this.threads = res.body;
                });

                socket.on('new-thread', this.onNewThread.bind(this));
            }
        }
    }
</script>
