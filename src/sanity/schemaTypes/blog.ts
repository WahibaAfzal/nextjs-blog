export default {
    name: 'blog',
    type:'document',
    title: 'Blog',
    fields : [
        {
            name: 'title',
            type: 'string',
            tilte: 'Title of blog article',
        },
        {
            name: 'slug',
            type: 'slug',
            tilte: 'slug of your blog article',
            options: {
                source:'title'
            }
        },
        {
            name: 'titleImage',
            type: 'image',
            tilte: 'Tilte Image',
        },
        {
            name: 'smalDescription',
            type: 'text',
            tilte: 'Small Description',
        },
        {
            name: 'content',
            type: 'array',
            tilte: 'Content',
            of:[
                {
                    type:'block',
                }
            ]
        },
    ]
}