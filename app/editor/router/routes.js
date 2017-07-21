// 文章
import Article from '../coponents/article/Article.vue'
import ArticleCreate from '../coponents/article/create.vue'
import ArticleList from '../coponents/article/list.vue'
import ArticleChange from '../coponents/article/change.vue'


import Category from '../coponents/category/Category.vue'
import CategoryCreate from '../coponents/category/create.vue'
import CategoryList from '../coponents/category/list.vue'
import CategoryChange from '../coponents/category/change.vue'

import Tag from '../coponents/tag/Tag.vue'
import TagCreate from '../coponents/tag/create.vue'
import TagList from '../coponents/tag/list.vue'
import TagChange from '../coponents/tag/change.vue'


//路由映射
var routes = [
    {
        path: "/article",
        name: "article",
        component: Article,
        children: [
            {
                path: "create",
                name: "create",
                component: ArticleCreate
            }, {
                path: "list",
                name: "list",
                component: ArticleList
            }, {
                path: "change",
                name: "change",
                component: ArticleChange
            }
        ]
    },
    {
        path: "/category",
        name: "category",
        component: Category,
        children: [
            {
                path: "create",
                name: "create",
                component: CategoryCreate
            }, {
                path: "list",
                name: "list",
                component: CategoryList
            }, {
                path: "change",
                name: "change",
                component: CategoryChange
            }
        ]
    }, {
        path: "/tag",
        name: "tag",
        component: Tag,
        children: [
            {
                path: "create",
                name: "create",
                component: TagCreate
            }, {
                path: "list",
                name: "list",
                component: TagList
            }, {
                path: "change",
                name: "change",
                component: TagChange
            }
        ]
    }
];

module.exports = routes;