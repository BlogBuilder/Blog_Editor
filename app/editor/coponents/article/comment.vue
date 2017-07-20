<template>
    <div class="media">
        <a class="pull-left" href="javascript:;">
            <img class="todo-userpic" width="27" height="27"
                 :src="'http://cdn.qulongjun.cn/avator/'+model.photo+'.png'" alt="author">
        </a>
        <div class="media-body todo-comment">
            <div class="todo-comment-btn">
                <button type="button" class="btn btn-sm btn-circle green btn-outline" @click="reply(model)">回 复</button>
                <button type="button" class="btn btn-sm btn-circle red btn-outline" @click="deleteReply(model)">删 除
                </button>
            </div>

            <p class="todo-comment-head">
                <span class="todo-comment-username">{{model.name}}</span>
                &nbsp;
                <span class="todo-comment-date">{{model.create_time}}</span>
            </p>
            <p class="todo-text-color" v-html="model.content">
            </p>
            <!-- 嵌套回复 -->
            <items v-for='model in model.children' :model='model'></items>
        </div>
    </div>
</template>
<style>
    .media {
        overflow: auto;
    }
</style>
<script>
    export default{
        name: "items",
        props: {
            model: Object
        },
        methods: {
            reply: function (item) {
                const me = this;
                var obj = me.$parent;
                while (!(obj.replyObj)) {
                    obj = obj.$parent;
                }
                obj.replyObj = item;
                const pos = jQuery("#replyEditor").offset().top;
                $("html,body").animate({scrollTop: pos}, 400);
            },
            deleteReply(model){
                const me = this;
                confirm({
                    content: "即将删除评论：" + model.content + "",
                    success: () => {
                        me.$http.get("/api/comment/delete", {
                            params: {
                                id: model.id
                            }
                        }).then(response => {
                            const data = response.data;
                            codeState(data.code, {
                                200(){
                                    alert("评论删除成功！");
                                    var obj = me.$parent;
                                    while (!(obj.fetchComment)) {
                                        obj = obj.$parent;
                                    }
                                    obj.fetchComment(obj.details.id);
                                }
                            })
                        }, response => {
                            serverErrorInfo();
                        });
                    }
                });
            }
        }
    }
</script>