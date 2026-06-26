# 开发参考（演示页）

本目录为 **Vben / 组件能力演示**，已通过后台菜单 **「开发参考」**（`sys_menu` 目录 `dev-ref`）挂载。

| 页面 | 是否需要后端 API |
| --- | --- |
| 表单 / 查询 / 字典 / 菜单 / Vxe / 富文本 / 微信 | 否（纯前端） |
| 文件上传 | 使用已有 `system/oss` 上传接口 |
| SSE 推送 | `/system/sse/*`（演示桩，未接真实长连接） |
| API 加解密 | `/test/api/encrypt/*` |
| 更新记录 | 读取前端仓库 CHANGELOG.md |

上线前若不需要，可删除本目录，并执行菜单清理或隐藏「开发参考」目录。

已有数据库补菜单：执行仓库根目录 `bin/sql/patch_dev_reference_menu.sql`。
