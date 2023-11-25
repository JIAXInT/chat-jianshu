import { onMounted, onBeforeUnmount, ref } from 'vue';

const name = "techBlog"

// 定义修改网页标题的函数
function usePageTitle(title) {
    const originTitle = ref(document.title);

  // 在组件挂载时设置网页标题
  onMounted(() => {
    document.title = title +'-'+ name;
  });

  // 在组件卸载前恢复原始网页标题
  onBeforeUnmount(() => {
    document.title = originTitle.value;
  });
}

export default usePageTitle;