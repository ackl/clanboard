<template lang="jade">
    new-post
    ul.clanboard-thread
        li(v-for="post in posts | orderBy '_id' -1")
            post(:post-body="post.body")
</template>

<script lang="babel">
    import NewPost from './NewPost.vue'
    import Post from './Post.vue'

    import io from 'socket.io-client'
    let socket = io()

    export default {
        components: { NewPost, Post },
        data: () => {
            return { posts: [] }
        },
        activate: function (done) {
            this.$http.get('/api/posts').then((res) => {
                this.posts = res.body
                done()
            })
            socket.on('new-post', (data) => {
                this.posts.push(data)
            })
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
