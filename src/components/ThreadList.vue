<template lang="pug">
    div
        ul
            li(v-for="thread in threads")
                thread-thumbnail(:thread="thread")
</template>

<script lang="babel">
    import io from 'socket.io-client';
    import ThreadThumbnail from './ThreadThumbnail.vue';

    const socket = io();

    export default {
        components: { ThreadThumbnail },
        data: function() {
            return { threads: [] };
        },
        methods: {
            onNewThread(data) {
                this.threads.push(data);
            }
        },
        route: {
            activate: function() {
                this.$http.get('/api/thread').then((res) => {
                    this.threads = res.body;
                });

                socket.on('new-thread', this.onNewThread.bind(this));
            }
        }
    }
</script>
