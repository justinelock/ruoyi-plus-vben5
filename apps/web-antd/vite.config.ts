import { defineConfig } from '@vben/vite-config';

// 自行取消注释来启用按需导入功能
// import { AntdvNextResolver } from '@antdv-next/auto-import-resolver'
// import Components from 'unplugin-vue-components/vite';

export default defineConfig(async () => {
  return {
    application: {},
    vite: {
      plugins: [
        // Components({
        //   dirs: [], // 默认会导入src/components目录下所有组件 不需要
        //   dts: './types/components.d.ts', // 输出类型文件
        //   resolvers: [
        //     AntdvNextResolver({
        //       // 需要排除Button组件 全局已经默认导入了
        //       exclude: ['Button'],
        //     }),
        //   ],
        // }),
      ],
      server: {
        proxy: {
          // 统一走 Traefik 网关（勿直连 8091/8092）；业务路由见 bin/traefik/dynamic.yaml
          '/api': {
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ''),
            target: 'http://127.0.0.1:28080',
            ws: true,
          },
        },
      },
    },
  };
}) as any;
