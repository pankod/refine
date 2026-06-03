```json title="/locales/zh-CN/common.json"
{
  "pages": {
    "login": {
      "title": "登录您的账户",
      "signin": "登录",
      "signup": "注册",
      "divider": "或",
      "fields": {
        "email": "电子邮件",
        "password": "密码"
      },
      "errors": {
        "validEmail": "无效的电子邮件地址",
        "requiredEmail": "电子邮件为必填项",
        "requiredPassword": "密码为必填项"
      },
      "buttons": {
        "submit": "登录",
        "forgotPassword": "忘记密码？",
        "noAccount": "没有账户？",
        "rememberMe": "记住我"
      }
    },
    "forgotPassword": {
      "title": "忘记密码？",
      "fields": {
        "email": "电子邮件"
      },
      "errors": {
        "validEmail": "无效的电子邮件地址",
        "requiredEmail": "电子邮件为必填项"
      },
      "buttons": {
        "submit": "发送重置说明"
      }
    },
    "register": {
      "title": "注册您的账户",
      "fields": {
        "email": "电子邮件",
        "password": "密码"
      },
      "errors": {
        "validEmail": "无效的电子邮件地址",
        "requiredEmail": "电子邮件为必填项",
        "requiredPassword": "密码为必填项"
      },
      "buttons": {
        "submit": "注册",
        "haveAccount": "已有账户？"
      }
    },
    "updatePassword": {
      "title": "更新密码",
      "fields": {
        "password": "新密码",
        "confirmPassword": "确认新密码"
      },
      "errors": {
        "confirmPasswordNotMatch": "密码不匹配",
        "requiredPassword": "密码为必填项",
        "requiredConfirmPassword": "确认密码为必填项"
      },
      "buttons": {
        "submit": "更新"
      }
    },
    "error": {
      "info": "您可能忘记将 {{action}} 组件添加到 {{resource}} 资源中。",
      "404": "抱歉，您访问的页面不存在。",
      "resource404": "您确定已创建 {{resource}} 资源吗？",
      "backHome": "返回首页"
    }
  },
  "actions": {
    "list": "列表",
    "create": "创建",
    "edit": "编辑",
    "show": "查看"
  },
  "buttons": {
    "create": "创建",
    "save": "保存",
    "logout": "退出",
    "delete": "删除",
    "edit": "编辑",
    "cancel": "取消",
    "confirm": "您确定吗？",
    "filter": "筛选",
    "clear": "清除",
    "refresh": "刷新",
    "show": "查看",
    "undo": "撤销",
    "import": "导入",
    "clone": "克隆",
    "notAccessTitle": "您没有权限访问"
  },
  "warnWhenUnsavedChanges": "您确定要离开吗？您有未保存的更改。",
  "notifications": {
    "success": "成功",
    "error": "错误（状态码：{{statusCode}}）",
    "undoable": "您有 {{seconds}} 秒的时间撤销",
    "createSuccess": "成功创建 {{resource}}",
    "createError": "创建 {{resource}} 时出错（状态码：{{statusCode}}）",
    "deleteSuccess": "成功删除 {{resource}}",
    "deleteError": "删除 {{resource}} 时出错（状态码：{{statusCode}}）",
    "editSuccess": "成功编辑 {{resource}}",
    "editError": "编辑 {{resource}} 时出错（状态码：{{statusCode}}）",
    "importProgress": "导入中：{{processed}}/{{total}}"
  },
  "loading": "加载中",
  "tags": {
    "clone": "克隆"
  },
  "dashboard": {
    "title": "仪表盘"
  },
  "posts": {
    "posts": "文章",
    "fields": {
      "id": "编号",
      "title": "标题",
      "category": "分类",
      "status": {
        "title": "状态",
        "published": "已发布",
        "draft": "草稿",
        "rejected": "已拒绝"
      },
      "content": "内容",
      "createdAt": "创建时间"
    },
    "titles": {
      "create": "创建文章",
      "edit": "编辑文章",
      "list": "文章列表",
      "show": "查看文章"
    }
  },
  "table": {
    "actions": "操作"
  },
  "documentTitle": {
    "default": "refine",
    "suffix": " | Refine",
    "post": {
      "list": "文章 | Refine",
      "show": "#{{id}} 查看文章 | Refine",
      "edit": "#{{id}} 编辑文章 | Refine",
      "create": "创建新文章 | Refine",
      "clone": "#{{id}} 克隆文章 | Refine"
    }
  },
  "autoSave": {
    "success": "已保存",
    "error": "自动保存失败",
    "loading": "保存中...",
    "idle": "等待更改"
  }
}
```
