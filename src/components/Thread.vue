<template lang="jade">
    new-post
    ul
        li(v-for="post in posts | orderBy '_id' -1") {{ post.body }}
</template>

<script lang="babel">
    import NewPost from './NewPost.vue'

    import io from 'socket.io-client'
    let socket = io()

    export default {
        components: { NewPost },
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
