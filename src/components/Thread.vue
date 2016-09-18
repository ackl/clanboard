<template lang="jade">
    new-post
    ul.clanboard-thread
        li(v-for="post in posts | orderBy '_id' -1")
            post(:post-body="post.body")
</template>

<script lang="babel">
    import NotifyModule from 'notifyjs'
    import NewPost from './NewPost.vue'
    import Post from './Post.vue'
    import io from 'socket.io-client'

    let socket = io()
    const Notify = NotifyModule.default

    export default {
        components: { NewPost, Post },
        data: () => {
            return { posts: [] }
        },
        activate: function (done) {
            this.initNotify();

            this.$http.get('/api/posts').then((res) => {
                this.posts = res.body
                done()
            })

            socket.on('new-post', this.onNewPost.bind(this));
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
            }
        }
    }
</script>

<style lang="sass">
.clanboard-thread {
    list-style-type: none;
    padding: 0;
    width: 50%;
    margin: 20px auto;
}
</style>
