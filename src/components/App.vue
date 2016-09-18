<template lang="jade">
    new-post
    ul
        li(v-for="post in posts") {{ post.body }}
</template>

<script lang="babel">
    import socket from 'socket.io'
    import NewPost from './NewPost.vue'

    export default {
        data: () => {
            return { posts: [] }
        },
        components: { NewPost },
        activate: (done) => {
            socket.io().on('new-post', function(data) {
                this.posts = data
            })
            this.$http.get('/api/posts').then((res) => {
                this.posts = res.body
                done()
            })
        }
    }
</script>
