<template lang="pug">
.mdl-card.mdl-shadow--2dp.chatchan-post
  slot(name='title' v-if='title')
    .mdl-card__title
      h2.mdl-card__title-text {{title}}
  slot(name='subtitle' v-if='subtitle')
    .mdl-card__subtitle-text {{{subtitle}}}
  slot(name='supporting-text' v-if='supportingText')
    .mdl-card__supporting-text {{supportingText}}
  slot(name='media' v-if='media')
    .mdl-card__media
      img(:src='media')

</template>

<script>
const slots = [
    'title',
    'subtitle',
    'supportingText',
    'media',
    'actions',
    'menu'
]

export default {
    computed: {
        isActionsURL() {
            if (typeof this.actions === 'string') {
                return this.actions.match(/^(https?:)?\/\//) !== null
            }

            return false
        },
        supportingText() {
            return this.post.body
        },
        subtitle() {
            const formattedDate = new Date(this.post.created_at)
                .toString()
                .split(' ')
                .slice(0, 5)
                .join(' ')

            return `
                <span class="post-timestamp">${formattedDate}</span>
                <span class="post-id">${this.post._id}</span>
            `
        }
    },
    props: {
        title: {
            type: String,
            default: true
        },
        menu: {
            default: true
        },
        actions: {
            type: String,
            default: true
        },
        actionsTarget: {
            default: '_self',
            type: String
        },
        actionsText: String,
        media: {
            default: true,
            type: String
        },
        subtitle: {
            default: true,
            type: String
        },
        supportingText: {
            default: true,
            type: String
        },
        post: {
            default: true
        }
    },
    compiled() {
        slots.forEach((slot, pos) => {
            if (this[slot] === true) {
                const el = this.$el.children[pos]
                if (!el || !el.attributes.getNamedItem('slot')) {
                    this[slot] = ''
                }
            }
        })
    },
    methods: {
        triggerMenuEvent() {
            this.$dispatch(this.menu)
        },
        triggerActionsEvent() {
            this.$dispatch(this.actions)
        }
    }
}
</script>

<style lang="sass">
.chatchan-post {
    min-height: 0;
    width: auto;

    .mdl-card__subtitle-text {
        padding: 0 1rem;
        opacity: 0.7;

        .post-timestamp {
            float: left;
        }

        .post-id {
            float: right;
        }
    }

    .mdl-card__supporting-text {
        white-space: pre-wrap;
    }
}

.mdl-card:hover {
    .mdl-card__subtitle-text {
        opacity: 1;
    }
}
</style>
