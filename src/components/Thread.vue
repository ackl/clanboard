<template lang="pug">
    div
        p {{ threadId }}
        new-post(v-ref:box :thread-id="threadId")
        ul.chatchan-thread
            li(v-for="post in posts | orderBy '_id' -1")
                post(:post="post" v-on:reply="addReply")
</template>

<script lang="babel">
    import io from 'socket.io-client';
    import NewPost from './NewPost.vue';
    import NotifyModule from 'notifyjs';
    import Post from './Post.vue';

    const socket = io();
    const Notify = NotifyModule.default;

    export default {
        components: {
            NewPost,
            Post
        },
        data: function() {
            return {
                threadId: this.$route.params.threadId,
                posts: []
            };
        },
        methods: {
            onNewPost(data) {
                this.posts.push(data);
                const { body } = data;

                new Notify('New post', {
                    body,
                    notifyShow: () => console.log('notification shown')
                }).show();
            },
            initNotify() {
                if (Notify.needsPermission) {
                    if (Notify.isSupported()) {
                        Notify.requestPermission();
                    }
                }
            },
            addReply(data) {
                this.$refs.box.postBody += `>>${data}`;
            }
        },
        route: {
            activate: function() {
                this.initNotify();

                this.$http.get(`/api/thread/${this.threadId}/post`)
                    .then((res) => {
                        this.posts = res.body
                    });

                socket.on(`new-post-${this.threadId}`, this.onNewPost.bind(this));
            }
        }
    }
</script>

<style lang="sass">
    @import "../scss/media-query";

    .chatchan-thread {
        list-style-type: none;
        padding: 0;
        margin: 20px auto;

        @include mq(tablet) {
            width: 50%;
        }

        li {
            margin-bottom: 1rem;
        }
    }
</style>
