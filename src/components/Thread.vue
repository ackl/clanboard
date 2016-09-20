<template lang="pug">
    new-post
    ul.clanboard-thread
        li(v-for="post in posts | orderBy '_id' -1")
            post(:post="post")
</template>

<script lang="babel">
    import io from 'socket.io-client'
    import NewPost from './NewPost.vue'
    import NotifyModule from 'notifyjs'
    import Post from './Post.vue'

    const socket = io()
    const Notify = NotifyModule.default

    export default {
        components: {
            NewPost,
            Post
        },
        data: () => ({
            posts: []
        }),
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
            }
        },
        route: {
            activate: function () {
                this.initNotify();

                this.$http.get('/api/posts').then((res) => {
                    this.posts = res.body;
                })

                socket.on('new-post', this.onNewPost.bind(this));
            }
        }
    }
</script>

<style lang="sass">
@import "../scss/media-query";

.clanboard-thread {
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
