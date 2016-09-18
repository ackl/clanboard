<template lang="jade">
    mdl-card(:supporting-text="postBody")
</template>

<script lang="babel">
    export default {
        props: {
            postBody: {
                default: 'loading...'
            }
        }
    }
</script>
