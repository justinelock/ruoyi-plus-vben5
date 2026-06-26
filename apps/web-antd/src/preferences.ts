import { defineOverridesPreferences } from '@vben/preferences';

/**
 * @description 项目配置文件
 * 只需要覆盖项目中的一部分配置，不需要的配置不用覆盖，会自动使用默认配置
 * 为了防止有人看不懂 这里用各国语言加了注释
 *
 * !!! 更改配置后请清空缓存 localStorage
 * !!! Please clear the localStorage cache after changing the configuration
 * !!! 更改配置後請清空緩存 localStorage
 * !!! 設定を変更した後は、localStorageキャッシュをクリアしてください
 * !!! 구성을 변경한 후에는 localStorage 캐시를 지우십시오
 * !!! Por favor, borre la caché de localStorage después de cambiar la configuración
 * !!! Veuillez effacer le cache localStorage après avoir modifié la configuration
 * !!! Bitte leeren Sie den localStorage-Cache nach Änderung der Konfiguration
 * !!! Si prega di cancellare la cache di localStorage dopo aver modificato la configurazione
 * !!! Пожалуйста, очистите кэш localStorage после изменения конфигурации
 * !!! Por favor, limpe o cache do localStorage após alterar a configuração
 * !!! Vui lòng xóa bộ nhớ cache localStorage sau khi thay đổi cấu hình
 * !!! โปรดล้างแคช localStorage หลังจากเปลี่ยนการกำหนดค่า
 * !!! Harap bersihkan cache localStorage setelah mengubah konfigurasi
 * !!! يرجى مسح ذاكرة التخزين المؤقت localStorage بعد تغيير التكوين
 * !!! Yapılandırmayı değiştirdikten sonra lütfen localStorage önbelleğini temizleyin
 * !!! Wis de localStorage-cache na het wijzigen van de configuratie
 * !!! Proszę wyczyścić pamięć podręczną localStorage po zmianie konfiguracji
 */
export const overridesPreferences = defineOverridesPreferences({
  // overrides
  app: {
    /**
     * antdv-next改为mix模式
     * - 后端路由 通过菜单管理进行配置
     * - 前端路由 直接在`apps/web-antd/src/router/routes/modules`新增文件并默认导出即可
     * 然后路由会进行合并
     */
    accessMode: 'mixed',
    /**
     * 不需要refresh token 由后端处理
     */
    enableRefreshToken: false,
    /**
     * 这里可以设置默认头像 url链接或vite导入的图片链接
     */
    // defaultAvatar: '',
    /**
     * 在这里设置应用标题
     */
    name: import.meta.env.VITE_APP_TITLE,
    /**
     * 不支持modal模式 需要改动的地方太多
     * 1. 正常重新登录后不会再触发接口请求 即触发登录超时的页面为空数据
     * 2. 切换租户登录后不会重新加载菜单
     */
    // loginExpiredMode: 'modal',
  },
  footer: {
    /**
     * 不显示footer
     */
    enable: false,
  },
  tabbar: {
    /**
     * 标签tab 持久化 关闭
     */
    persist: false,
    // styleType: 'card',
  },
  theme: {
    /** 默认主题模式 */
    mode: 'light',
    /**
     * 按钮水波纹样式
     */
    buttonWaveMode: 'Default',
    /**
     * 浅色sidebar
     */
    semiDarkSidebar: false,
    /**
     * 圆角大小 换算比例为1.6px = 0.1radius
     * 这里为6px 与antd保持一致
     */
    radius: '0.375',
    // 这些颜色和antd默认颜色保持一致 即hex -> hsl
    // 错误色
    colorDestructive: 'hsl(359, 100%, 65%)',
    // 主题色
    colorPrimary: 'hsl(215, 100%, 54%)',
    // 成功色
    colorSuccess: 'hsl(100, 77%, 44%)',
    // 警告色
    colorWarning: 'hsl(40, 96%, 53%)',
  },
  /**
   * ---------------------------------------------------------------------------
   * 菜单切换 / 页面路由过渡动画（点击侧边栏打开页面时的效果）
   * ---------------------------------------------------------------------------
   * 【改这里】本文件 `transition` 段为项目级默认，覆盖 Vben 框架默认值。
   *
   * 相关文件（排查或自定义时对照）：
   * - 本文件：apps/web-antd/src/preferences.ts（项目覆盖配置，优先改这里）
   * - 框架默认：packages/@core/preferences/src/config.ts（默认 name: fade-slide）
   * - CSS 定义：packages/@core/base/design/src/css/transition.css
   * - 渲染位置：packages/effects/layouts/src/basic/content/content.vue（<Transition>）
   * - 逻辑封装：packages/effects/layouts/src/hooks/index.ts（getTransitionName）
   * - 偏好设置 UI：右上角齿轮 → 动画 → 页面切换动画（会写入 localStorage，可能覆盖本配置）
   *
   * name 可选值（内置）：
   * - fade        纯淡入淡出，无位移（后台管理推荐，观感最稳）
   * - fade-slide  旧页向右滑出，新页从左侧滑入（Vben 框架默认）
   * - fade-up     自下而上滑入
   * - fade-down   自上而下滑入
   *
   * 自定义动画：在 transition.css 新增 .xxx-enter-active 等类名，再把 name 设为 'xxx'。
   *
   * !!! 修改后请重启 pnpm dev:antd，并清空浏览器 localStorage（键名含 vben/preferences）
   *     否则偏好面板或历史缓存可能仍用旧动画。
   * ---------------------------------------------------------------------------
   */
  transition: {
    /** 是否启用页面切换过渡动画；false 则菜单跳转无动画 */
    enable: true,
    /** 页面切换时的全屏 loading（与顶部进度条独立） */
    loading: false,
    /**
     * 过渡动画名称，对应 transition.css 中的 CSS 类前缀
     * @see packages/@core/base/design/src/css/transition.css
     */
    name: 'fade',
    /** 顶部 NProgress 进度条（路由跳转时顶部细条，与 transition 动画无关） */
    progress: true,
  },
  /**
   * !!! 更改配置后请清空浏览器缓存
   * 在这里更换logo
   * source可选值：
   * 1. 本地public目录下的图片 需要加上/ 比如：/logo.png
   * 2. 网络图片链接
   * 3. vite导入的图片 import xxx from 'xxx.png'
   *
   * !!! 更改配置后请清空浏览器缓存
   */
  logo: {
    enable: true,
    source: '/plus-vben.png',
  },
});
