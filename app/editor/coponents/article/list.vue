<template lang="html">
    <div class="row">
        <div class="col-md-12">
            <!-- BEGIN TODO SIDEBAR -->
            <div class="todo-ui">
                <div class="todo-sidebar">
                    <div class="portlet light ">
                        <div class="portlet-title">
                            <div class="caption" data-toggle="collapse" data-target=".todo-project-list-content">
                                <span class="caption-subject font-green-sharp bold uppercase">分类 </span>
                            </div>

                        </div>
                        <div class="portlet-body todo-project-list-content">
                            <div class="todo-project-list">
                                <ul class="nav nav-stacked">
                                    <li class="active" @click="searchByCategory(0)">
                                        <a href="javascript:;" class="font-green">全部文章 </a>
                                    </li>
                                    <li>
                                        <a href="javascript:;" @click="searchByCategory(-1)" class="font-red">未分类文章 </a>
                                    </li>
                                    <hr>
                                    <template v-for="item in categoryList">
                                        <li>
                                            <a href="javascript:;" :class="item.state==0?'font-yellow':''" @click="searchByCategory(item.id)">{{item.name}}</a>
                                        </li>
                                    </template>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div class="portlet light ">
                        <div class="portlet-title">
                            <div class="caption" data-toggle="collapse"
                                 data-target=".todo-project-list-content-search">
                                <span class="caption-subject font-green-sharp bold uppercase">搜索 </span>
                                <span class="caption-helper visible-sm-inline-block visible-xs-inline-block">click to view</span>
                            </div>
                        </div>
                        <div class="portlet-body todo-project-list-content todo-project-list-content-search">
                            <form onkeydown="if(event.keyCode==13)return false;">
                                <div class="todo-project-list">
                                    <div class="form-group form-md-line-input has-info">
                                        <div class="input-group-control">
                                            <input type="text" class="form-control" placeholder="Search"
                                                   id="search_text" @keyup.enter="inputSearch($event)">
                                            <label for="search_text">关键字</label>
                                        </div>
                                    </div>
                                    <div class="form-group form-md-checkboxes">
                                        <div class="form-group form-md-radios">
                                            <label>显示状态</label>
                                            <div class="md-radio-list">
                                                <div class="md-radio has-success">
                                                    <input type="radio" id="view_state1" name="view_state" value="1"
                                                           v-model="search.view_state"
                                                           class="view_state1" @change="searchByState(1)">
                                                    <label for="view_state1">
                                                        <span></span>
                                                        <span class="check"></span>
                                                        <span class="box"></span> 公开可见 </label>
                                                </div>
                                                <div class="md-radio has-info">
                                                    <input type="radio" id="view_state2" name="view_state" value="0"
                                                           v-model="search.view_state"
                                                           class="md-radiobtn"  @change="searchByState(0)">
                                                    <label for="view_state2">
                                                        <span></span>
                                                        <span class="check"></span>
                                                        <span class="box"></span> 私密可见 </label>
                                                </div>
                                                <div class="md-radio has-error">
                                                    <input type="radio" id="view_state3" name="view_state" value="-1"
                                                           v-model="search.view_state"
                                                           class="md-radiobtn"  @change="searchByState(-1)">
                                                    <label for="view_state3">
                                                        <span></span>
                                                        <span class="check"></span>
                                                        <span class="box"></span> 回收站 </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="portlet light ">
                        <div class="portlet-title">
                            <div class="caption" data-toggle="collapse"
                                 data-target=".todo-project-list-content-tags">
                                <span class="caption-subject font-green-sharp bold uppercase">标签 </span>
                            </div>
                        </div>
                        <div class="portlet-body todo-project-list-content todo-project-list-content-tags">
                            <div class="todo-project-list">
                                <ul class="nav nav-pills nav-stacked">
                                    <li>
                                        <a href="javascript:;" class="font-green" @click="searchByTags(0)">全部 </a>
                                    </li>
                                    <template v-for="item in tagList">
                                        <li>
                                            <a href="javascript:;" @click="searchByTags(item.id)">{{item.name}} </a>
                                        </li>
                                    </template>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- END TODO SIDEBAR -->
                <!-- BEGIN TODO CONTENT -->
                <div class="todo-content">
                    <div class="portlet light ">
                        <!-- PROJECT HEAD -->
                        <div class="portlet-title">
                            <div class="caption">
                                <i class="icon-bar-chart font-green-sharp hide"></i>
                                <span class="caption-subject font-green-sharp bold uppercase">文章列表</span>
                            </div>

                        </div>
                        <!-- end PROJECT HEAD -->
                        <div class="portlet-body">
                            <div class="row">
                                <div class="col-md-5 col-sm-4">
                                    <div class="todo-tasklist">
                                        <template v-for="(item,index) in articleList">
                                            <div :class="index!=0?'todo-tasklist-item todo-tasklist-item-border-green':'todo-tasklist-item todo-tasklist-item-border-green active'"
                                                 @click="fetchDetails(item,$event)">
                                                <img class="todo-userpic pull-left"
                                                     src="../../images/avatar/touxiang2.jpg" width="27px" height="27px">
                                                <div class="todo-tasklist-item-title">{{item.title}} <span
                                                        class="badge badge-default">{{item.category?item.category.name:"未分类"}}</span>
                                                </div>
                                                <div class="todo-tasklist-item-text">
                                                    {{item.summary}}
                                                </div>
                                                <hr style="margin:5px;">
                                                <div class="todo-tasklist-controls pull-right">
                                                      <span class="todo-tasklist-date">
                                                          <i class="fa fa-calendar"></i> {{item.create_time}}</span>
                                                    <span class="todo-tasklist-date">
                                                          <i class="fa fa-comments-o"></i> {{item.comment_num}}  </span>
                                                    <span class="todo-tasklist-date">
                                                          <i class="fa fa-folder-open-o"></i> {{item.view_count}}  </span>
                                                </div>

                                            </div>
                                        </template>
                                    </div>
                                    <div class="M-box pull-right" style="margin-top:10px; "></div>
                                </div>
                                <div class="todo-tasklist-devider"></div>
                                <div class="col-md-7 col-sm-8">
                                    <form action="#" class="form-horizontal">
                                        <!-- TASK HEAD -->
                                        <div class="form">
                                            <div class="form-group">
                                                <div class="col-md-8 col-sm-8">
                                                    <div class="todo-taskbody-user">

                                                        <span class="todo-username pull-left">{{details.title}}
                                                            <span class="badge badge-default">{{details.category?details.category.name:"未分类"}}</span>
                                                            <span class="badge badge-warning"
                                                                  v-if="details.view_state==1">私密可见</span>
                                                            <span class="badge badge-danger"
                                                                  v-if="details.view_state==-1">回收站</span>
                                                        </span>


                                                    </div>
                                                </div>
                                                <div class="col-md-4 col-sm-4">
                                                    <div class="todo-taskbody-date pull-right">
                                                        <div class="btn-group btn-group-circle">
                                                            <button type="button" class="btn green" @click="readArticle(details)">阅读</button>
                                                            <button type="button"
                                                                    class="btn btn-circle-right green dropdown-toggle"
                                                                    data-toggle="dropdown" aria-expanded="false">
                                                                <i class="fa fa-angle-down"></i>
                                                            </button>
                                                            <ul class="dropdown-menu" role="menu">
                                                                <li>
                                                                    <router-link
                                                                            :to="{path:'/article_change',query:{id:details.id}}">
                                                                        <span class="title">修改文章</span></router-link>
                                                                </li>
                                                                <li>
                                                                    <a href="javascript:;"> 分享文章 </a>
                                                                </li>
                                                                <li>
                                                                    <a href="javascript:;"
                                                                       @click="dustbin(details)">
                                                                        移至回收站 </a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="mt-element-ribbon">
                                                <div class="ribbon ribbon-right ribbon-vertical-right ribbon-shadow ribbon-border-dash-vert ribbon-color-success uppercase">
                                                    <div class="ribbon-sub ribbon-bookmark"></div>
                                                    <i :class="details.stick==1?'fa fa-star font-yellow-lemon':'fa fa-star'"></i>
                                                </div>
                                                <div class="ribbon ribbon-right ribbon-vertical-right ribbon-shadow ribbon-border-dash-vert ribbon-color-danger uppercase">
                                                    <div class="ribbon-sub ribbon-bookmark"></div>
                                                    <i :class="details.recommend==1?'fa fa-heart font-yellow-lemon':'fa fa-heart'"></i>
                                                </div>
                                                <div style="padding:10px">
                                                    <blockquote class="bg-grey-cararra">
                                                        <em style="font-size:14px;">
                                                            {{details.summary}}
                                                        </em>
                                                        <small class="text-right">
                                                            <cite title="摘要" v-if="details.type!=5">摘要</cite>
                                                            <cite :title="details.quote_author" v-if="details.type==5">{{details.quote_author}}</cite>
                                                        </small>
                                                    </blockquote>
                                                    <hr/>
                                                    <div v-html="details.content"></div>
                                                </div>
                                            </div>
                                            <hr/>
                                            <ul class="list-inline">
                                                <li>标签：</li>
                                                <template v-for="item in details.tag">
                                                    <li><span class="label label-success"> {{item.name}} </span></li>
                                                </template>
                                            </ul>
                                            <hr>
                                            <ul class="list-inline">
                                                <li>素材：</li>
                                                <template v-if="details.type==1">
                                                    <template v-for="(item,index) in details.materials">
                                                        <li><a target="_blank" :href="item.material"><span class="label label-info">素材{{index+1}}</span></a></li>
                                                    </template>
                                                </template>
                                                <li v-if="details.type==5">无素材</li>
                                                <li v-if="details.type==2||details.type==3||details.type==4">
                                                    <a target="_blank" :href="details.materials.material"><span class="label label-info">查看</span></a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="tabbable-line">
                                            <ul class="nav nav-tabs ">
                                                <li class="active">
                                                    <a href="#tab_1" data-toggle="tab"> 评论 </a>
                                                </li>
                                            </ul>
                                            <div class="tab-content">
                                                <div class="tab-pane active" id="tab_1">
                                                    <!-- TASK COMMENTS -->
                                                    <div class="form-group">
                                                        <div class="col-md-12">
                                                            <div class="media-list">
                                                                <template v-for="comment in commentList">
                                                                    <item :model="comment"></item>
                                                                </template>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <!-- END TASK COMMENTS -->
                                                    <!-- TASK COMMENT FORM -->
                                                    <div class="form-group">
                                                        <div class="col-md-12">
                                                            <ul class="media-list">
                                                                <li class="media">
                                                                    <div class="media-body">
                                                                        <div class="alert alert-success"
                                                                             v-show="replyObj.id">
                                                                            <strong>回复</strong> {{replyObj.name}} 于
                                                                            {{replyObj.create_time}} 的评论:
                                                                            <button type="button" class="btn default"
                                                                                    style="float: right;line-height: 100%"
                                                                                    @click="cancelReply">
                                                                                取 消
                                                                            </button>
                                                                        </div>
                                                                        <div id="replyEditor">

                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                            <button type="button"
                                                                    class="pull-right btn btn-sm btn-circle green"
                                                                    @click="reply">
                                                                &nbsp; 提 交 &nbsp; </button>
                                                        </div>
                                                    </div>
                                                    <!-- END TASK COMMENT FORM -->
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- END TODO CONTENT -->
            </div>
        </div>
        <!-- END PAGE CONTENT-->
    </div>
</template>
<script type="es6">
    import E from 'wangeditor';
    import item from './comment.vue'
    import {changeURLPara, removeURLPara, redictURL} from '../../../global/js/js-utils'

    import '../../style/list.css'

    const rowCount = localStorage.getItem("rowCount") || 10;
    var replyEditor=null;

    export default {
        components: {
            "item": item
        },
        data () {
            return {
                categoryList: [],
                tagList: [],
                currentPage: 1,
                condition: "",
                articleList: [],
                details: {},
                search: {},
                commentList: [],
                replyObj: {
                    user: {}
                }
            };
        },
        watch:{
          '$route':'_initArticle'
        },
        mounted () {
            const me = this;
            me._initArticle();
            me.initData();
        },
        methods: {
            initData () {
                const me = this;
                me._initCategory();
                me._initTag();
                me._initEditor();
            },
            _initArticle(){
                const me = this;
                if(!me.currentPage)me.currentPage=1;
                me._updateCondition();
                me.fetchData(me.currentPage);
                me.fetchPages();
            },
            _updateCondition(){
                const me = this;
                const query = me.$route.query;
                me.condition = jQuery.param(query);
                if(!me.condition){
                    me.condition="";
                }
            },
            _initCategory(){
                const me = this;
                me.$http.get("/api/category/list").then((response)=> {
                    const data = response.data;
                    me.categoryList = data.results;
                },()=> {
                    serverErrorInfo();
                });
            },
            _initTag(){
                const me = this;
                me.$http.get("/api/tag/list").then(function (response) {
                    const data = response.data;
                    me.tagList = data.results;
                }, function () {
                    serverErrorInfo();
                });
            },
            _initEditor(){
                replyEditor = new E('#replyEditor');
                replyEditor.customConfig.uploadImgServer = '/api/file/upload';
                replyEditor.create();
            },
            fetchData (pageNum) {
                const me = this;
                this.$http.get('/api/article/list', {
                    params: {
                        rowCount: rowCount,
                        currentPage: pageNum,
                        condition: me.condition
                    }
                }).then((response) => {
                    const data = response.data;
                    me.articleList = data.results;
                    data.results.length > 0 ? me.renderDetail(data.results[0].id) : null;
                }, (response) => {
                    serverErrorInfo();
                });
            },
            fetchPages () {
                const me = this;
                me.$http.get('/api/article/list', {
                    params: {
                        rowCount: rowCount,
                        currentPage: 1,
                        condition: me.condition
                    }
                }).then((response) => {
                    const data = response.data;
                    jQuery(".M-box").pagination({
                        pageCount: data.totalPage,
                        coping: true,
                        homePage: '首页',
                        endPage: '末页',
                        prevContent: '上页',
                        nextContent: '下页',
                        callback: function (data) {
                            me.fetchData(data.getCurrent(), rowCount, me.condition);
                            me.currentPage = data.getCurrent();
                        }
                    });
                }, (response) => {
                    serverErrorInfo();
                });
            },
            fetchDetails (item, e) {
                const me = this;
                const dom = $(e.target).hasClass('todo-tasklist-item') ? $(e.target) : $(e.target).parents('.todo-tasklist-item');
                dom.siblings(" .todo-tasklist-item.active").removeClass('active');
                dom.addClass("active");
                me.renderDetail(item.id);
            },
            fetchComment (id) {
                const me = this;
                me.$http.get("/api/comment/list", {
                    params: {
                        id: id
                    }
                }).then(function (response) {
                    const data = response.data;
                    me.commentList = data.results;
                }, function () {
                    serverErrorInfo();
                })
            },
            renderDetail (id) {
                const me = this;
                me.$http.get("/api/article/findById", {
                    params: {
                        id: id
                    }
                }).then(function (response) {
                    const data = response.data;
                    me.details = data;
                    me.fetchComment(id);
                }, function () {
                    serverErrorInfo();
                })
            },
            dustbin (item) {
                const me = this;
                confirm({
                    content: "是否将文章【" + item.title + "】移至回收站？",
                    success: function () {
                        me.$http.post("/api/article/dustbin", {
                            id: item.id,
                        }).then(function (response) {
                            const data = response.data;
                            codeState(data.code, {
                                200: function () {
                                    me._initArticle(me.currentPage);
                                    alert("删除成功！");
                                }
                            })
                        }, function () {
                            serverErrorInfo();
                        })
                    }
                })
            },
            readArticle(item){
                switch (item.type){
                    case 1:
                        window.open("http://blog.qulongjun.cn/detail/gallery?id="+item.id);
                        break;
                    case 2:
                        window.open("http://blog.qulongjun.cn/detail/standard?id="+item.id);
                        break;
                    case 3:
                        window.open("http://blog.qulongjun.cn/detail/video?id="+item.id);
                        break;
                    case 4:
                        window.open("http://blog.qulongjun.cn/detail/audio?id="+item.id);
                        break;
                    case 5:
                        window.open("http://blog.qulongjun.cn/detail/quote?id="+item.id);
                        break;
                }
            },
            searchByCategory (id) {
                const me = this;
                if (id) {
                    me.$router.push(redictURL(me.$route.fullPath, "/article/list", "add", "category", id));
                } else {
                    me.$router.push(redictURL(me.$route.fullPath, "/article/list", "remove", "category"));
                }
            },
            searchByTags (id) {
                const me = this;
                if (id) {
                    me.$router.push(redictURL(me.$route.fullPath, "/article/list", "add", "tag", id));
                } else {
                    me.$router.push(redictURL(me.$route.fullPath, "/article/list", "remove", "tag"));
                }
            },
            searchByState(state){
                const me = this;
                if (state!=null&&state!=undefined) {
                    me.$router.push(redictURL(me.$route.fullPath, "/article/list", "add", "state", state));
                } else {
                    me.$router.push(redictURL(me.$route.fullPath, "/article/list", "remove", "state"));
                }
            },
            inputSearch(event){
                const me = this;
                if (event.target.value) {
                    me.$router.push(redictURL(me.$route.fullPath, "/article/list", "add", "key", event.target.value));
                } else {
                    me.$router.push(redictURL(me.$route.fullPath, "/article/list", "remove", "key"));
                }
            },
            reply(){
                const me = this;
                const info = {
                    name:"【作者回复】",
                    content: replyEditor.txt.html(),
                    id: me.details.id,
                    photo:  Math.floor(Math.random() * 824),
                    parent: me.replyObj.id ? me.replyObj.id : ""
                };
                me.$http.post("/api/comment/create", info).then(response => {
                    var data = response.data;
                    codeState(data.code, {
                        200: function () {
                            alert("评论回复成功！");
                            replyEditor.txt.html('<p><br></p>');//清空编辑器
                            me.cancelReply();
                            me.fetchComment(me.details.id);
                        }
                    })
                }, response => {
                    serverErrorInfo();
                })

            },
            cancelReply(){
                const me = this;
                me.replyObj = {
                    user: {}
                };
            }
        }
    }
</script>
