<template lang="jade">
    new-post
    ul
        li(v-for="post in posts") {{ post.body }}
</template>

<script lang="babel">
    import io from 'socket.io-client'
    import NewPost from './NewPost.vue'

    let socket = io()

    export default {
        data: () => {
            return { posts: [] }
        },
        components: { NewPost },
        activate: function (done) {
            socket.on('new-post', (data) => {
                this.posts = data
            })
            this.$http.get('/api/posts').then((res) => {
                this.posts = res.body
                done()
            })
        }
    }
</script>
