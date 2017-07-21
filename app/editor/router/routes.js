// 文章
import Article from '../coponents/article/Article.vue'
import ArticleCreate from '../coponents/article/create.vue'
import ArticleList from '../coponents/article/list.vue'
import ArticleChange from '../coponents/article/change.vue'


import Category from '../coponents/category/Category.vue'
import CategoryCreate from '../coponents/category/create.vue'
import CategoryList from '../coponents/category/list.vue'
import CategoryChange from '../coponents/category/change.vue'



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
    }
];

module.exports = routes;